export default async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');

  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const accessToken = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;
  const limit = Math.min(Number(request.query.limit || 3), 12);

  if (!accessToken || !userId) {
    response.status(200).json({
      items: [],
      source: 'fallback',
      message: 'Missing IG_ACCESS_TOKEN or IG_USER_ID environment variables.',
    });
    return;
  }

  try {
    const fields = ['id', 'caption', 'media_type', 'media_url', 'permalink', 'thumbnail_url', 'timestamp', 'username'];
    const url = new URL(`https://graph.facebook.com/v20.0/${userId}/media`);
    url.searchParams.set('fields', fields.join(','));
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('access_token', accessToken);

    const instagramResponse = await fetch(url.toString());
    const data = await instagramResponse.json();

    if (!instagramResponse.ok) {
      response.status(instagramResponse.status).json({
        error: 'Instagram Graph API request failed',
        details: data,
      });
      return;
    }

    const items = Array.isArray(data.data)
      ? data.data.slice(0, limit).map((item) => ({
          id: item.id,
          caption: item.caption || '',
          mediaType: item.media_type || 'IMAGE',
          mediaUrl: item.media_url || '',
          thumbnailUrl: item.thumbnail_url || '',
          permalink: item.permalink || '#',
          timestamp: item.timestamp || '',
          username: item.username || '',
        }))
      : [];

    response.status(200).json({ items, source: 'instagram' });
  } catch (error) {
    response.status(500).json({
      error: 'Unable to fetch Instagram media',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
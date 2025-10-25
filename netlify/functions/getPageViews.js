export async function handler(event) {
  const path = event.queryStringParameters.path || "/profile";
  const UMAMI_API_URL = process.env.UMAMI_API_URL;
  const UMAMI_WEBSITE_ID = process.env.VITE_UMAMI_WEBSITE_ID;
  const UMAMI_API_TOKEN = process.env.VITE_UMAMI_API_TOKEN;

  try {
    const res = await fetch(
      `${UMAMI_API_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?url=${path}`,
      {
        headers: {
          Authorization: `Bearer ${UMAMI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return { statusCode: res.status, body: await res.text() };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ views: data.pageviews || 0 }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

import fetch from "node-fetch";

export async function handler(event) {
  const path = event.queryStringParameters.path;
  const UMAMI_API_URL = process.env.UMAMI_API_URL;
  const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;

  try {
    const res = await fetch(
      `${UMAMI_API_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?url=${path}`
    );

    if (!res.ok) {
      return { statusCode: res.status, body: await res.text() };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ views: data.pageviews }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

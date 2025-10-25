// netlify/functions/getPageViews.js

export async function handler(event) {
  // ✅ Replace with your actual Umami website ID and API token
  const websiteId = "07f9f317-50eb-49fe-87c7-c35e438623eb";
  const token = "api_CwU3XrKcTgeSJ0ZgvtPuoINSHg899Xzb";

  // Get the path you want to check, default to /profile
  const path = event.queryStringParameters.path || "/profile";

  try {
    const response = await fetch(
      `https://analytics.umami.is/api/websites/${websiteId}/stats?url=${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Umami API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        views: data?.pageviews?.value || 0,
      }),
    };
  } catch (error) {
    console.error("Error fetching Umami stats:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

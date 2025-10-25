// src/utils/umamiApi.js
export async function getPageViews(websiteId, pagePath, token) {
  const url = `https://analytics.umami.is/api/websites/${websiteId}/metrics?startAt=0&endAt=${Date.now()}&type=pageview&url=${encodeURIComponent(pagePath)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch Umami data");
    return 0;
  }

  const data = await response.json();
  // The result may differ depending on your Umami version.
  // Adjust if you have a self-hosted instance.
  return data?.data?.reduce((sum, item) => sum + item.y, 0) || 0;
}
// src/utils/umamiApi.js
export async function getPageViews(websiteId, pagePath, token) {
  const url = `https://analytics.umami.is/api/websites/${websiteId}/metrics?startAt=0&endAt=${Date.now()}&type=pageview&url=${encodeURIComponent(pagePath)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch Umami data");
    return 0;
  }

  const data = await response.json();
  // The result may differ depending on your Umami version.
  // Adjust if you have a self-hosted instance.
  return data?.data?.reduce((sum, item) => sum + item.y, 0) || 0;
}

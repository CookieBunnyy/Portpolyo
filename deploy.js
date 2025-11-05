// deploy.js
const hookUrl = "https://api.vercel.com/v1/integrations/deploy/prj_j6fmkyDlwdGpkfXtlkAoc8OhyUDF/p7vBffoAtC";

async function triggerDeploy() {
  try {
    const res = await fetch(hookUrl, { method: "POST" });
    const data = await res.json();
    console.log("Deployment triggered:", data);
  } catch (err) {
    console.error("Error triggering deploy:", err);
  }
}

triggerDeploy();

const WEB3FORMS_ACCESS_KEY = "120e8f0e-8c49-4e44-9f49-7180cc0f2eb3";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(payload) {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...payload,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Submission failed");
  }
  return data;
}

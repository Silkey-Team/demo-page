import sdk from "@silkey/sdk";

export async function demoSilkeySelfOAuth() {
  const uri = new URL(window.location);

  const requestParams = await sdk.generateSSORequestParams(process.env.REACT_APP_PRIVATE_KEY, {
    cancelUrl: "https://demo-staging.silkey.io",
    redirectUrl: "https://demo-staging.silkey.io",
    scope: "email",
    refId: 1234,
  });

  const silkeyRedirect = new URL(process.env.REACT_APP_ATHENA_URL);
  Object.entries(requestParams).forEach(([key, param]) => {
    silkeyRedirect.searchParams.append(key, param);
  });

  window.location.replace(silkeyRedirect.href);
}

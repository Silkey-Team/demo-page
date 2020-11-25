import sdk from "@silkey/sdk";

export async function demoSilkeySelfOAuth() {
  const requestParams = await sdk.generateSSORequestParams(process.env.REACT_APP_PRIVATE_KEY, {
    cancelUrl: "https://demo-staging.silkey.io",
    redirectUrl: "https://demo-staging.silkey.io",
    scope: "email",
    refId: 1234,
    redirectMethod: "GET",
  });

  const silkeyRedirect = new URL(process.env.REACT_APP_ATHENA_URL);
  Object.entries(requestParams).forEach(([key, param]) => {
    silkeyRedirect.searchParams.append(key, param);
  });
  console.log(requestParams);

  window.location.replace(silkeyRedirect.href);
}

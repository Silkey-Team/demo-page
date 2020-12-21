import { generateSSORequestParams } from "@silkey/sdk";

export async function demoSilkeySelfOAuth() {
  const requestParams = await generateSSORequestParams(process.env.REACT_APP_PRIVATE_KEY, {
    ssoCancelUrl: process.env.REACT_APP_CANCEL_URL,
    ssoRedirectUrl: process.env.REACT_APP_REDIRECT_URL,
    ssoScope: "email",
    ssoRefId: 1234,
    ssoRedirectMethod: "GET",
  });

  const silkeyRedirect = new URL(process.env.REACT_APP_ATHENA_URL);
  Object.entries(requestParams).forEach(([key, param]) => {
    silkeyRedirect.searchParams.append(key, param);
  });
  window.location.replace(silkeyRedirect.href);
}

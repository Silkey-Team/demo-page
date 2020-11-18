import { queryStringGetter } from "./QueryStringGetter";
import JWTGenerator from "./JWTGenerator";
import { ethers } from "ethers";
import sdk from "@silkey/sdk";

function uriCreator(url = "", data = {}) {
  if (!data) {
    return url;
  }

  let uri = new URL(url);
  Object.keys(data).forEach((key) => {
    uri.searchParams.append(key, data[key]);
  });

  return uri;
}

function replyWithToken(redirect_uri, token) {
  window.location = uriCreator(redirect_uri, {
    token_type: "Bearer",
    access_token: token,
  });
}

export function userAuthorization() {
  const redirect_uri = queryStringGetter("redirect_uri");
  if (!redirect_uri) {
    console.error("Missing `redirect_uri` parameter");
    return;
  }

  // generate new wallet or use existing one ig:
  // mnemonic ? ethers.Wallet.fromMnemonic(mnemonic) : ethers.Wallet.createRandom();
  // !! replace with token from silkey-athena
  const token = JWTGenerator(ethers.Wallet.createRandom());
  console.log("TOKEN", token);

  replyWithToken(redirect_uri, token);
}

export async function demoSilkeySelfOAuth(scope) {
  const uri = new URL(window.location);
  uri.searchParams.delete("access_token");
  uri.searchParams.delete("token_type");

  const requestParams = await sdk.generateSSORequestParams(process.env.REACT_APP_PRIVATE_KEY, {
    cancelUrl: "https://demo-staging.silkey.io",
    redirectUrl: "https://demo-staging.silkey.io",
    scope,
    refId: 1234,
  });
  const silkeyRedirect = new URL(process.env.REACT_APP_ATHENA_URL);
  Object.entries(requestParams).forEach(([key, param]) => {
    silkeyRedirect.searchParams.append(key, param);
  });

  window.location.replace(silkeyRedirect.href);

  //existing user example:
  //const pk = "0xb10332aa04e184e36164381c3cd178a89da6dfc546547b79d7fb71492d89c36c"
  //replyWithToken(uri.href, JWTokenGenerator(new ethers.Wallet(pk)))
  // replyWithToken(uri.href, JWTGenerator(ethers.Wallet.createRandom()));
}

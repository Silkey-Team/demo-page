import {queryStringGetter} from "./QueryStringGetter";

const starkbank = require('starkbank');
const jwt = require("jsonwebtoken");

function generateRandomKeys() {
  const email = Math.floor(Math.random() * 10000) + "@silkey.io";
  //const randomWallet = ethers.Wallet.createRandom();

  let privateKey, publicKey;
  [privateKey, publicKey] = starkbank.key.create("./");

  const user = {
    email,
    privateKey,
    publicKey
  }

  console.log('created registration data for user', user)
  return user
}

function uriCreator(url = '', data = {}) {
  if (!data) {
    return url
  }

  let uri = new URL(url)
  Object.keys(data).forEach(key => {
    uri.searchParams.append(key, data[key])
  })

  return uri
}

function createJwt(user) {
  const payload = {
    id: user.email, // TODO
    email: user.email,
    publicKey: user.publicKey,
    ethAddress: ""
  }

  return jwt.sign(payload, user.privateKey, {algorithm: 'ES256'});
}

function replyWithToken(redirect_uri, token) {
  window.location = uriCreator(redirect_uri, {
    token_type: "Bearer",
    access_token: token
  })
}

export function userAuthorization() {
  const redirect_uri = queryStringGetter("redirect_uri")
  if (!redirect_uri) {
    console.error("Missing `redirect_uri` parameter")
    return
  }

  // is user already have random key (is registered Silkey user) then we will use it
  // otherwise let's generate keys
  const user = generateRandomKeys()
  const token = createJwt(user)

  console.log('TOKEN', token)

 replyWithToken(redirect_uri, token)
}

export function demoSilkeySelfOAuth() {
  const user = generateRandomKeys()
  replyWithToken(window.location.href, createJwt(user))
}

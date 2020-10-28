import {ethers} from "ethers";

const jwt = require("jsonwebtoken");

const KeyEncoder = require('key-encoder').default
let EC = require('elliptic').ec

let wallet,
  pemPublicKey,
  pemPrivateKey,
  payload;

function initPemPublicKeys() {
  const encoderOptions = {
    curveParameters: [1, 3, 132, 0, 10],
    privatePEMOptions: {label: 'EC PRIVATE KEY'},
    publicPEMOptions: {label: 'PUBLIC KEY'},
    curve: new EC('secp256k1')
  };

  const keyEncoder = new KeyEncoder(encoderOptions)
  pemPrivateKey = keyEncoder.encodePrivate(wallet.privateKey, 'raw', 'pem')
  pemPublicKey = keyEncoder.encodePublic(wallet.publicKey, 'raw', 'pem')
}

function createPayload() {
  payload = {
    email: wallet.address + "@silkey.io",
    pemPublicKey,
    address: wallet.address,
  }
}

function signPayload() {
  const digest = ethers.utils.hashMessage(payload.email)
  const signingKey = new ethers.utils.SigningKey(wallet.privateKey)
  payload.signature = signingKey.signDigest(digest)
}

function randomPassword() {
  let r = [];

  for (let i = 0; i < 8; i++) {
    r[i] = Math.random().toString(10).split(".")[1].slice(0, 8)
  }

  return r.join("-")
}

function signJWT() {
  // Silkey not providing any BE api, so we can use random pass
  return jwt.sign(payload, randomPassword());
}

export default function (ethersWallet) {
  wallet = ethersWallet
  initPemPublicKeys()
  createPayload()
  signPayload()

  return signJWT()
}

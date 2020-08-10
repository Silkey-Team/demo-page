import {ethers} from "ethers";

const jwt = require("jsonwebtoken");

export default function (token) {
  try {
    const user = jwt.decode(token)
    const signer = ethers.utils.verifyMessage(user.email, user.signature)
    return signer.toLowerCase() === user.address.toLowerCase() ? user : null
  }catch (e) {
    console.error(e)
    return null
  }
}

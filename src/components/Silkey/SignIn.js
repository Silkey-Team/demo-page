import React, {Component} from "react";
import Button from "components/CustomButtons/Button.js";
import {queryStringGetter} from "./QueryStringGetter";
import {demoSilkeySelfOAuth} from "./SilkeyOAuth";

const jwt = require("jsonwebtoken");

const SILKEY_OAUTH_TOKEN_API = '#'
const SILKEY_LOCAL_STORAGE_KEY = 'silkey_token'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.authorisedUser()
    };

    this.signOut = this.signOut.bind(this)
  }

  redirectToPath() {
    let uri = new URL(window.location)
    window.location.href = uri.pathname
  }

  authorisedUser() {
    const local_user = localStorage.getItem(SILKEY_LOCAL_STORAGE_KEY)
    if (local_user) {
      console.log('localStorage token')
      console.log(JSON.parse(local_user))
      return JSON.parse(local_user)
    }

    const token_type = queryStringGetter("token_type")
    if (token_type !== "Bearer") {
      return null
    }

    const access_token = queryStringGetter("access_token")
    const verified_user = this.verifyJWT(access_token)
    localStorage.setItem(SILKEY_LOCAL_STORAGE_KEY, JSON.stringify(verified_user))
    this.redirectToPath()
  }

  verifyJWT(token) {
    if (token === "") {
      return false;
    }

    try {
      const user = jwt.decode(token)
      console.log('decoded token', user)
      return jwt.verify(token, user.publicKey)

      //silkey....
      //web3.verify(user.sig, ethAddress(user.publicKey))

    } catch (e) {
      return null
    }
  }

  redirectForOAuth(e) {
    e.preventDefault()
    if (SILKEY_OAUTH_TOKEN_API === '#') {
      demoSilkeySelfOAuth()
      return
    }

    window.location.href = SILKEY_OAUTH_TOKEN_API
  }

  signOut(e) {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      user: null
    })
  }

  shortUserId() {
    if (!this.state.user) {
      return null
    }

    const d = this.state.user.id.length
    return this.state.user.id.slice(0, 4) + '..' + this.state.user.id.slice(d - 4)
  }

  render() {
    return this.state.user ? this.renderHelloUser() : this.renderSignIn()
  }

  renderSignIn() {
    return (
      <Button
        href="#"
        onClick={this.redirectForOAuth}
        color="rose"
        round
      >
        Sign In
      </Button>
    );
  }

  renderHelloUser() {
    return (
      <>
        <strong><i className="fa fa-user-secret"/> Hi {this.state.user.id}</strong>
        {' '}
        <Button
          href="#"
          onClick={this.signOut}
          color="primary"
          round
          size="sm"
        >
          Sign Out
        </Button>
      </>
    )
  }
}

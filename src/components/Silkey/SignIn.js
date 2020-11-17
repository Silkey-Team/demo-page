import React, { Component } from "react";
import Button from "components/CustomButtons/Button.js";
import { queryStringGetter } from "./QueryStringGetter";
import { demoSilkeySelfOAuth } from "./SilkeyOAuth";
import sdk from "@silkey/sdk";

const SILKEY_OAUTH_TOKEN_API = "#";
const SILKEY_LOCAL_STORAGE_KEY = "silkey_token";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.fetchAuthorisedUser(),
    };

    this.signOut = this.signOut.bind(this);
  }

  redirectToPath() {
    let uri = new URL(window.location);
    window.location.href = uri.pathname;
  }

  fetchAuthorisedUser() {
    const local_user = localStorage.getItem(SILKEY_LOCAL_STORAGE_KEY);

    if (local_user) {
      const user = JSON.parse(local_user);
      console.log("local storage user:", user);

      if (user) {
        return user;
      }
    }

    const token = new URL(window.location).searchParams.get("token");
    console.log({ token });
    const verified_user = sdk.tokenPayloadVerifier(token);

    if (verified_user) {
      console.log("verification successful");
      localStorage.setItem(SILKEY_LOCAL_STORAGE_KEY, JSON.stringify(verified_user));
      // this.redirectToPath();
      window.location = new URL(window.location).origin;
    }
    return null;

    // const token_type = queryStringGetter("token_type");
    // if (token_type !== "Bearer") {
    //   console.warn("Only Bearer are supported,", token_type, "found.");
    //   return null;
    // }

    // const access_token = queryStringGetter("access_token");

    // if (access_token) {
    //   console.log("verifying access_token...");
    //   const verified_user = JWTPayloadVerificator(access_token);

    //   if (verified_user) {
    //     console.log("verification successful");
    //     localStorage.setItem(SILKEY_LOCAL_STORAGE_KEY, JSON.stringify(verified_user));
    //     this.redirectToPath();
    //   } else {
    //     console.error("JWT invalid");
    //   }
    // }
  }

  redirectForOAuthEmail(e) {
    e.preventDefault();
    if (SILKEY_OAUTH_TOKEN_API === "#") {
      demoSilkeySelfOAuth("email");
      return;
    }

    window.location.href = SILKEY_OAUTH_TOKEN_API;
  }

  redirectForOAuthId(e) {
    e.preventDefault();
    if (SILKEY_OAUTH_TOKEN_API === "#") {
      demoSilkeySelfOAuth("id");
      return;
    }

    window.location.href = SILKEY_OAUTH_TOKEN_API;
  }

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.setState({
      user: null,
    });
  }

  shortUserId() {
    if (!this.state.user) {
      return null;
    }

    if (this.state.email) {
      const d = this.state.user.email.length;
      return this.state.user.email.slice(0, 5) + ".." + this.state.user.email.slice(d - 13);
    } else {
      return null;
    }
  }

  render() {
    return this.state.user ? this.renderHelloUser() : this.renderSignIn();
  }

  renderSignIn() {
    return (
      <div>
        <Button href="#" onClick={this.redirectForOAuthId} color="rose" round>
          Sign In: Id
        </Button>
        <Button href="#" onClick={this.redirectForOAuthEmail} color="rose" round>
          Sign In: Email
        </Button>
      </div>
    );
  }

  renderHelloUser() {
    return (
      <>
        <strong>
          <i className="fa fa-user-secret" /> Hi{" "}
        </strong>
        <small style={{ color: "white" }}>{this.shortUserId()}</small>{" "}
        <Button href="#" onClick={this.signOut} color="primary" round size="sm">
          Sign Out
        </Button>
      </>
    );
  }
}

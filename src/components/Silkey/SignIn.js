import React, { Component } from "react";
import Button from "components/CustomButtons/Button.js";
import { demoSilkeySelfOAuth } from "./SilkeyOAuth";
import { tokenPayloadVerifier } from "@silkey/sdk";

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

  fetchAuthorisedUser() {
    const local_user = localStorage.getItem(SILKEY_LOCAL_STORAGE_KEY);

    if (local_user) {
      const user = JSON.parse(local_user);
      console.log("local storage user:", user);

      if (user) {
        return user;
      }
    }

    const search = new URL(window.location).searchParams;
    const token = search.get("token");
    const params = JSON.parse(search.get("ssoParams"));
    const verified_user = tokenPayloadVerifier(token, params, process.env.REACT_APP_ADDRESS);

    if (verified_user) {
      localStorage.setItem(SILKEY_LOCAL_STORAGE_KEY, JSON.stringify(verified_user));
      window.location = new URL(window.location).origin + "/profile-page";
    }
    return null;
  }

  redirectForOAuth(e) {
    e.preventDefault();
    if (SILKEY_OAUTH_TOKEN_API === "#") {
      demoSilkeySelfOAuth();
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
      <Button href="#" onClick={this.redirectForOAuth} color="rose" round>
        Log in Anonymously
      </Button>
    );
  }

  renderHelloUser() {
    return (
      <>
        <strong>
          <i className="fa fa-user-secret" /> Hi {this.state.user.address}
        </strong>
        <small style={{ color: "white" }}>{this.shortUserId()}</small>{" "}
        <Button href="#" onClick={this.signOut} color="primary" round size="sm">
          Sign Out
        </Button>
      </>
    );
  }
}

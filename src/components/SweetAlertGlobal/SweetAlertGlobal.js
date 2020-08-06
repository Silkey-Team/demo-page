import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { setAlert } from "actions/globalActions";

import { makeStyles } from "@material-ui/core/styles";
import { METAMASK_CHORME_STORE } from 'constants.js';

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

function RequireLogin(props) {
  const sweetClasses = useSweetAlertStyle();
  return (
    <SweetAlert
      warning
      title="Please connect your wallet before you start using the app"
      onConfirm={props.onConfirm}
      confirmBtnCssClass={sweetClasses.button + " " + sweetClasses.success}
    >
    </SweetAlert>
  )
}

export const requireLogin = dispatch => {
  dispatch(setAlert(
    <RequireLogin onConfirm={() => dispatch(setAlert(null))} />
  ))
}


function RequireMetamask(props) {
  const sweetClasses = useSweetAlertStyle();
  return (
    <SweetAlert
      warning
      title="Metamask Wallet is required to use this applicaiton."
      onConfirm={props.onConfirm}
      confirmBtnCssClass={sweetClasses.button + " " + sweetClasses.success}
    >
      If you don't have a Metamask wallet, you can install it
      at <a href={METAMASK_CHORME_STORE} target="_blank" rel="noopener noreferrer">Chrome Store</a>
    </SweetAlert>
  )
}

export const requireMetamask = dispatch => {
  dispatch(setAlert(
    <RequireMetamask onConfirm={() => dispatch(setAlert(null))} />
  ))
}

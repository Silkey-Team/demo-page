import { requireMetamask, requireLogin } from 'components/SweetAlertGlobal/SweetAlertGlobal.js';

export const setAlert = alert => ({
  type: 'SET_ALERT',
  payload: alert
})

export const enableMetamask = () => {
  return async (dispatch, getState) => {
    try {
      const accounts = await window.ethereum.enable();
      return dispatch({
        type: "ENABLE_METAMASK",
        payload: accounts,
      })
    } catch (e) {
      console.error(e, e.message);
      if (window.ethereum === undefined) {
        setTimeout(() => {
          requireMetamask(dispatch)
        }, 1750);
      }
    }
  }
}

export const defaultState = {
  alert: null,
  ethereumAddress: null,
}

const globalReducers = (state = defaultState, action) => {
  console.log('action', action, 'state', state)
  switch (action.type) {
    case 'ENABLE_METAMASK':
      return {
        ...state,
        ethereumAddress: action.payload[0],
      }
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload
      }
    default:
      return state
  }
}

export default globalReducers

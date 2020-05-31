import React from "react";
import { actions } from './authActions'

export const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export function reducer (state = initialState, { type, payload }) {
console.log('payload reducers', payload, type)

  switch (type) {
    case actions.AUTH_START:
      return {...state, loading: true}
    case actions.AUTH_SUCCESS:
      return {...state, ...{
        token: payload.idToken,
        userId: payload.localId,
        error: null,
        loading: false,
      }}
    case actions.AUTH_FAIL:
      return {...state, ...{
        loading: false,
        error: payload.error.message
      }}
    case actions.LOG_OUT:
      return {...state, ...{
        token: null,
        userId: null
      }}
    default:
      return state;
  }
}

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
console.log('payload', payload, type)

  switch (type) {
    case actions.AUTH_START:
      return {...state, loading: true}
    case actions.AUTH_SUCCESS:
      return {...state, ...{
        token: payload.token,
        userId: payload.userId,
        error: null,
        loading: false,
      }}
    case actions.AUTH_FAIL:
      return {...state, ...{
        loading: false,
        error: payload.error
      }}
    default:
      return state;
  }
}

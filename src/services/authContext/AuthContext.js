import React, { useReducer } from 'react';
import { initialState, reducer } from './AuthReducers'
import { API_KEY, SIGN_IN_URL, SIGN_UP_URL } from './authForm'
import { actions } from './authActions'
import axios from 'axios'

const AuthContext = React.createContext();

function AuthProvider(props) {

    const [authState, dispatch] = useReducer(reducer, initialState);

    const signUp = (isSignIn, authData) => {

      dispatch({type: actions.AUTH_START})

      const url = isSignIn ? SIGN_IN_URL : SIGN_UP_URL

      axios.post(`${url}${API_KEY}`, authData).then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expiresIn', expirationDate)
        localStorage.setItem('userId', res.data.localId)

        dispatch({type: actions.AUTH_SUCCESS, payload: res.data})
        checkAuthTimeout(res.data.expiresIn)

      }).catch(err => {
        dispatch({type: actions.AUTH_FAIL, payload: {error: err.response.data.error}})
      })
    }

    const checkAuthTimeout = (expirationTimeout) => {
      return setTimeout(() => dispatch({type: actions.LOG_OUT}),
        expirationTimeout * 1000)
    }

    const logOut = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('expiresIn')
      dispatch({type: actions.LOG_OUT})
    }

    const authCheckState = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
          dispatch({type: actions.LOG_OUT})
        } else {
            const expirationDate = new Date(localStorage.getItem('expiresIn'));
            if (expirationDate <= new Date()) {
                dispatch({type: actions.LOG_OUT})
            } else {
                const userId = localStorage.getItem('userId');
                dispatch({type: actions.AUTH_SUCCESS, payload: { idToken: token, localId: userId }})
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };

    return (
      <AuthContext.Provider value={{ authState, signUp, logOut, authCheckState }}>
        {props.children}
      </AuthContext.Provider>)
}

export { AuthContext, AuthProvider}

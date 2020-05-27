import React, { useReducer } from 'react';
import { initialState, reducer } from './AuthReducers'

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [authState, dispatch] = useReducer(reducer, initialState);

    return (<AuthContext.Provider value={{authState, dispatch}}>
      {props.children}
    </AuthContext.Provider>)
}

export { AuthContext, AuthProvider}

import React, { useEffect, useContext } from 'react';
import { AuthContext } from './../../services/AuthContext'
import { actions } from './../../services/authActions'
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
    const { authState, logOut } = useContext(AuthContext);

    useEffect(() => {
      logOut()
    }, [])

    return <Redirect to='/auth'/>
}

export default Logout

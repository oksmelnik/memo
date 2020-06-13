import React, { useEffect, useContext } from 'react';
import { AuthContext } from './../../services/authContext/AuthContext'
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
      logOut()
    }, [logOut])

    return <Redirect to='/auth'/>
}

export default Logout

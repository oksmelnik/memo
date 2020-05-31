import React, { useState, useContext } from 'react';
import Input from "./../../components/Input/Input"
import { Button } from "./../../components/UI/Button/Button"
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from './../../services/AuthContext'
import { Spinner } from "./../../components/UI/Spinner/Spinner"
import { Redirect } from 'react-router-dom'
import { isValidForm, isValidField }  from './../../shared/utils'

const Block = styled.div`
    padding: 20px 100px;
`

const formFields = {
    email: {
      elementType: 'input',
      valueType: 'email',
      label: 'Email',
      value: '',
      valid: true,
      id: 'email'
    },
    password: {
      elementType: 'input',
      valueType: 'int',
      label: 'Password',
      rules: {minLength: 6},
      value: '',
      valid: true,
      id: 'password'
    }
  }

const Auth = (props) => {
    const { authState, signUp} = useContext(AuthContext);
    const [formState, setState] = useState(formFields)
    const [isSignIn, setSignIn] = useState(false)

    const inputChanged = (e, id) => {
      const updatedForm = {...formState}
      const updatedField = {...updatedForm[id]}
      updatedForm[id].value = e.target.value
      updatedForm[id].valid = isValidField(id, e.target.value, formState)

      setState(updatedForm)
    }

    const formToArray = (form) => {
      return Object.keys(form).map(key => {
        return {id: key, ...form[key]}
      })
    }

    const handleSignUp = (e) => {
      e.preventDefault()
      const authData = {
        email: formState.email.value,
        password: formState.password.value,
        returnSecureToken: true
      }

      if(isValidForm(formState)) {
        signUp(isSignIn, authData)
      }
    }

  return (
    <Block>
        {authState.token && <Redirect to="/" />}
        <form >
          {authState.error}

          {
            authState.loading ? <Spinner /> :
              formToArray(formFields).map(input => (
              <Input {...input} key={input.id} handleChange={inputChanged}/>
            ))
          }

          <Button disabled={!isValidForm(formState)} clicked={handleSignUp}>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
        </form>

      <Button clicked={() => setSignIn(!isSignIn)}>{`Switch to Sign ${isSignIn ? 'Up' :'In'}`}</Button>

    </Block>
  )
}

export default Auth;

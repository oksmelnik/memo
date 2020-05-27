import React, { useState, useContext } from 'react';
import Input from "./../components/Input/Input"
import { Button } from "./../components/UI/Button/Button"
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from './../services/AuthContext'
import { actions } from './../services/authActions'

const Block = styled.div`
    padding: 20px 100px;
`

const Auth = (props) => {
  const { authState, dispatch } = useContext(AuthContext);

  console.log('propss', authState)
  const form =  {
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

    const [formState, setState] = useState(form)
    const [isSignIn, setSignIn] = useState(false)

    const API_KEY = 'AIzaSyCE7a7NfMVE6VkM4V1V9tRvozBfR73sKwE'
    const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    const SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    const inputChanged = (e, id) => {
      const updatedForm = {...formState}
      const updatedField = {...updatedForm[id]}
      updatedForm[id].value = e.target.value
      updatedForm[id].valid = isValidField(id, e.target.value)

      setState(updatedForm)
    }

    const isValidField = (id, value) => {
      const trimmedValue = value ? value.trim(' ') : ''
      let isValid = true
      const field  = formState[id]

      if (trimmedValue) {
        if (field.rules) {
          isValid = trimmedValue.length >= field.rules.minLength && isValid
        }
      } else if (field.required) {
        isValid = false
      }

      return isValid
    }

    const isValidForm = (formState) => {
      let isValid = true

      Object.values(formState).forEach(item => {
        isValid = isValidField(item.id, item.value) && isValid
      })

      return isValid
    }

    const formToArray = (form) => {
      return Object.keys(form).map(key => {
        return {id: key, ...form[key]}
      })
    }

    const signUp = (e) => {
      e.preventDefault()

      if(isValidForm(formState)) {
        const authData = {
          email: formState.email.value,
          password: formState.password.value,
          returnSecureToken: true
        }
        dispatch({type: actions.AUTH_START})
        const url = isSignIn ? SIGN_IN_URL : SIGN_UP_URL
          axios.post(`${url}${API_KEY}`, authData).then(res => {
            console.log(res, `${url}${API_KEY}`)
          }).catch(err => {
            dispatch({type: actions.AUTH_FAIL, payload: {error: err}})
            console.log('err', err)
          })
      }
    }

  return (
    <Block>
      <form >
        {formToArray(formState).map(input => (
          <Input {...input} key={input.id} handleChange={inputChanged}/>
        ))}
      <Button disabled={!isValidForm(formState)} clicked={signUp}>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
      </form>
          <Button clicked={() => setSignIn(!isSignIn)}>{`Switch to Sign ${isSignIn ? 'Up' :'In'}`}</Button>

    </Block>
  )
}

export default Auth;

import React, { useState, useContext } from 'react';
import Input from "./../../components/Input/Input"
import { Button } from "./../../components/UI/Button/Button"
import { AuthContext } from './../../services/AuthContext'
import { RedSpinner } from "./../../components/UI/Spinner/RedSpinner"
import { Redirect } from 'react-router-dom'
import { isValidForm, isValidField }  from './../../shared/utils'
import { CenterForm } from './../../shared/elements/CenterForm'


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
    const [isSignIn, setSignIn] = useState(true)

    const inputChanged = (e, id) => {
      const updatedForm = {...formState}
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
    <CenterForm>
        {authState.token && <Redirect to="/" />}

        <form >
          {
            authState.loading ? <RedSpinner /> :
            <>
              {
                formToArray(formFields).map(input => (
                  <Input {...input} key={input.id} color="black" handleChange={inputChanged}/>
                ))
              }
              <span>{authState.error}</span>
              <Button disabled={!isValidForm(formState)} color="black" clicked={handleSignUp}>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            </>
          }
        </form>

      <Button clicked={() => setSignIn(!isSignIn)}>{`Switch to Sign ${isSignIn ? 'Up' :'In'}`}</Button>
    </CenterForm>
  )
}

export default Auth;

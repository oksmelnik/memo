import React, { useState, useEffect, useContext } from 'react';
import Aux from './../hoc/Aux'
import { withRouter } from 'react-router-dom'
import { Button } from "./../components/UI/Button/Button"
import Input from "./../components/Input/Input"
import axiosWords from '../axios-words'
import { isValidForm, isValidField }  from './../shared/utils'
import { AuthContext } from './../services/AuthContext'
import { CenterForm } from './../shared/elements/CenterForm'

const Profile = (props) => {

  const form =  {
      name: {
        elementType: 'input',
        valueType: 'text',
        label: 'Name',
        required: true,
        rules: {minLength: 2},
        value: '',
        valid: true,
        id: "name"
      },
      email: {
        elementType: 'input',
        valueType: 'email',
        label: 'Email',
        value: '',
        valid: true,
        required: true,
        id: "email"
      }
    }

  const formToArray = (form) => {
    return Object.keys(form).map(key => {
      return {id: key, ...form[key]}
    })
  }

  const [state, setState] = useState(form)
  const { authState: { userId }} = useContext(AuthContext);

  useEffect(() => {
      axiosWords.get(`profile/${userId}.json`).then(res => {
          const profile = res.data

          if (profile) {
            const initState = {...form}

            Object.keys(profile).forEach(field => {
              initState[field].value = profile[field]
            })
            setState(initState)
          }
      })
  }, [userId])

  const inputChanged = (e, id) => {
    const updatedForm = {...state}
    const updatedField = {...updatedForm[id]}
    updatedForm[id].value = e.target.value

    if (!updatedField.valid) {
        updatedForm[id].valid = isValidField(id, e.target.value, updatedForm)
    }
    setState(updatedForm)
  }

  const submitProfile = (e) => {
    e.preventDefault()

    if (isValidForm(state)) {
        setState(state)
  
        const profileDate = {}
        Object.keys(state).forEach(key => profileDate[key] = state[key].value)

        axiosWords.patch(`profile/${userId}.json`, profileDate).then(res => {
          console.log(res)
        })
    }
  }


    return (
      <Aux>
        <CenterForm>
          <form onSubmit={submitProfile}>
            {
              formToArray(state).map(input => (
                <Input {...input} key={input.id} handleChange={inputChanged}/>
              ))
            }
            <Button disabled={!isValidForm(state)} color="black" btnType="Success">Submitt</Button>
            </form>
        </CenterForm>
      </Aux>
    )
}

export default withRouter(Profile);

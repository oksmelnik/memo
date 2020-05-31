import React, { useState, useEffect } from 'react';
import Aux from './../hoc/Aux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Input from "./../components/Input/Input"
import axiosWords from '../axios-words'

const Block = styled.div`
    padding: 20px 100px;
`

const Button = styled.button`
    padding: 20px 100px;
    color: white;
    background-color: darkgrey;
    margin: 20px 40%;
    border-radius: 4px;
`

const Profile = (props) => {
  const id = "-M7rkys8LluxpGUXg6Nx"

  const form =  {
      name: {
        elementType: 'input',
        valueType: 'text',
        label: 'Name',
        required: true,
        rules: {minLength: 2},
        value: '',
        valid: true
      },
      email: {
        elementType: 'input',
        valueType: 'email',
        label: 'Email',
        value: '',
        valid: true
      }
    }

  const formToArray = (form) => {
    return Object.keys(form).map(key => {
      return {id: key, ...form[key]}
    })
  }

  useEffect(() => {

      axiosWords.get(`profile/${id}.json`).then(res => {
          const profile = res.data
          const initState = {...form}

          Object.keys(profile).forEach(field => {
            initState[field].value = profile[field]
          })
          setState(initState)
      })
  }, [])

  const [state, setState] = useState(form)

  const inputChanged = (e, id) => {
    const updatedForm = {...state}
    const updatedField = {...updatedForm[id]}
    updatedForm[id].value = e.target.value

    if (!updatedField.valid) {
        updatedForm[id].valid = isValid(id, e.target.value)
    }
    setState(updatedForm)
  }

  const submitProfile = (e) => {
    e.preventDefault()
    const newState = Object.keys(state).map(key => {
      const updatedField = {...state[key]}
      updatedField.valid = isValid(key, updatedField.value)
      return updatedField
    })
    setState(newState)

    if (isValidForm(newState)) {
        const profileDate = {}
        Object.keys(state).forEach(key => profileDate[key] = state[key].value)

        axiosWords.patch(`profile/${id}.json`, profileDate).then(res => {
          console.log(res)
        })
    }
  }

  const isValid = (id, value) => {
    const trimmedValue = value ? value.trim(' ') : false
    let isValid = true
    const field  = state[id]

    if (trimmedValue) {
      if (field.rules) {
        isValid = trimmedValue.length >= field.rules.minLength && isValid
      }
    } else if (field.required) {
      isValid = false
    }

    return isValid
  }

  const isValidForm = (state) => {
    let isValid = true
    Object.keys(state).forEach(item => {
      isValid = state[item].valid && isValid
    })
    return isValid
  }

    return (
        <Aux>
            <Block>
            <form onSubmit={submitProfile}>
              {formToArray(state).map(input => (
                <Input {...input} key={input.id} handleChange={inputChanged}/>
              ))}
              <Button disabled={!isValidForm(state)} btnType="Success">Submitt</Button>
            </form>
            </Block>
        </Aux>
    )
}

export default withRouter(Profile);

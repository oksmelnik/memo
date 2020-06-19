import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
    padding 10px;
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
    outline: none;
    border-color: ${(props) => props.valid == false && "red"};

    :focus {
        ${(props) => {return `border-color: ${props.valid == false ? "red" : '#241e1c'}`}
    }
`

const StyledLabel = styled.div`
`
const InputElement = styled.div`
  outline: none;
  display: block;
  max-width: 300px;
  margin-left: 20px;
`

const renderInput = (input) => {
  switch (input.elementType) {
    case 'input' :
    return <StyledInput
      {...input}
      onChange={e => input.handleChange(e, input.id)}
      {...input}/>
    case 'textarea' :
    return <StyledInput {...input} type={input.valueType} onChange={e => input.handleChange(e, input.id)}/>
    default :
    return <StyledInput {...input} onChange={e => input.handleChange(e, input.id)}/>
  }
}

const Input = (props) => {
  return (
    <InputElement>
    <StyledLabel>{props.label}</StyledLabel>
      {renderInput(props)}
    </InputElement>
  )
}

export default Input;

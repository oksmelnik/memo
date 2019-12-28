import React from 'react'
import './Pair.css'
import checkmark from '../../icons/checkmark.svg'
import edit from '../../icons/edit.svg'

function EditButton(props) {
  const icon = props.edit ?
    <img src={checkmark} alt='save'/> :
    <img src={edit} alt='edit'/>

  return (
      <div
        type='submit'
        onClick={props.toggleEdit}>
        {icon}
       </div>
  )
}
export default EditButton;

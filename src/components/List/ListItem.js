import React, {useState, useRef} from 'react';
import styled from 'styled-components'
import Input from "./../Input/Input"
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import PairButton from '../Pair/PairButton'

const StyledItem = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 400px;
`
const StyledDiv = styled.div`
    font-size: 22px;
    padding 10px;
    color: white;
    text-decoration: none;
    width: 50%;
`

const ListItem = ({ list, onUpdate, clicked, onDelete }) => {
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(list.name)

    const inputValue = useRef(null)

    const handleEdit = (e) => {
      if (edit) {
        setEdit(false)
        onUpdate(name)
      } else {
        setEdit(true)
      }
    }

    const handleChange = (input) => {
      setName(input.target.value)
    }


  return (
    <StyledItem>
      {edit && <Input handleChange={handleChange} defaultValue={name}/>}

      {!edit && <StyledDiv onClick={clicked}>{name}</StyledDiv>}
      <PairButton
          callback={handleEdit}
          icon={editIcon}
          alt='edit'
      />

      <PairButton
          callback={onDelete}
          icon={deleteIcon}
          alt='delete'
      />

      </StyledItem>
    )
}

export default ListItem

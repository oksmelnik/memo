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

const ListItem = (props) => {
    const [edit, setEdit] = useState(false)
    const name = props.list.name
    const inputValue = useRef(null)

  const handleEdit = (e) => {
    if (edit) {
      props.onUpdate(inputValue.current.value)
      setEdit(false)
    } else {
      setEdit(true)
    }
  }
  return (
    <StyledItem>
      {edit && <Input ref={inputValue} defaultValue={name}/>}

      {!edit && <StyledDiv onClick={props.clicked}>{name}</StyledDiv>}
      <PairButton
          callback={handleEdit}
          icon={editIcon}
          alt='edit'
      />

      <PairButton
          callback={props.onDelete}
          icon={deleteIcon}
          alt='delete'
      />

      </StyledItem>
    )
}

export default ListItem

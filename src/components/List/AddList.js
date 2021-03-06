import React, { useState, useContext } from 'react';
import PairButton from '../Pair/PairButton'
import Input from "./../Input/Input"
import closeIcon from '../../assets/close.svg'
import checkmarkIcon from '../../assets/checkmark.svg'
import addIcon from '../../assets/plus.svg'
import axiosWords from '../../axios-words'
import styled from 'styled-components'
import { AuthContext } from './../../services/authContext/AuthContext'

const StyledForm = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 20px;
    border-top: solid #f0e1c9 2px;
`
const AddList = (props) => {

    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState('')
    const { saveList } = props
    const { authState: {userId, token}} = useContext(AuthContext);

    const handleChange = (input) => {
      if (input.target.value > 0) {
        setEdit(true)
      }

      setInput(input.target.value)
    }

    const onDelete = () => {
      setInput('')
    }

    const saveChanges = () => {
        if (input.length > 0) {
          const name = input

          axiosWords.post(`lists.json?auth=${token}`, {name: name, userId: userId}).then(res => {
              const id  = res.data.name
              const newList = {[id]: {id, name, userId, pairs: {}}}
              saveList(newList)
              setInput('')
              setEdit(false)
          })
      }
    }

    return (
        <StyledForm>
            Add new list
            {!edit &&
              <PairButton
                callback={() => setEdit(!edit)}
                icon={addIcon}
                alt='addIcon'
              />
            }
            {edit &&
                <>
               <Input
                    elementType='input'
                    type="text"
                    value={input}
                    handleChange={handleChange}
                />

                <PairButton
                    callback={saveChanges}
                    icon={checkmarkIcon}
                    alt='checkmark'
                 />
                <PairButton
                    callback={onDelete}
                    icon={closeIcon}
                    alt='delete'
                />
                </>
            }
        </StyledForm>
    )
}

export default React.memo(AddList);

import React, { useState, useRef, useEffect } from 'react';
import PairButton from '../Pair/PairButton'
import Input from "./../Input/Input"
import closeIcon from '../../assets/close.svg'
import checkmarkIcon from '../../assets/checkmark.svg'
import addIcon from '../../assets/plus.svg'
import axiosWords from '../../axios-words'
import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    align-items: center;
    color: white;
    padding: 20px 0;
    font-size: 20px;
    border-top: solid white 2px;
`
const StyledInput = styled.input`
    font-size: 22px;
    margin: 10px;
    width: 50%;
`

const AddList = (props) => {

    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState('')
    const { saveList } = props

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

          axiosWords.post(`lists.json`, {name: name}).then(res => {
              const id = res.data.name
              const newList = {[id] : {id, name, pairs: []}}
              !!saveList && saveList(newList)
              setInput('')
              setEdit(false)
          })
      }
    }

    return (
        <StyledForm>

            {!edit &&
            <PairButton
                    callback={() => setEdit(!edit)}
                    icon={addIcon}
                    alt='addIcon'
                />

            }
            Add new list
            {!edit &&
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

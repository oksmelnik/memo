import React, { useState, useRef } from 'react';
import PairButton from '../Pair/PairButton'
import deleteIcon from '../../assets/delete.svg'
import checkmarkIcon from '../../assets/checkmark.svg'

import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    color: white;
`

const AddList = (props) => {

    const [edit, setEdit] = useState(false)

    const inputEl = useRef(null)

    const handleChange = (input) => {
        if (input.target.value.length > 0) {
            setEdit(true)
        }
    }

    const onDelete = () => {
        inputEl.current.value = ''
    }

    const saveChanges = () => {
      props.saveList(inputEl.current.value)
      inputEl.current.value = ''
    }

    return (
        <StyledForm>
            <input
                ref={inputEl}
                onChange={handleChange}
            />

            {edit && <PairButton
                callback={saveChanges}
                icon={checkmarkIcon}
                alt='checkmark'
             />
            }

            <PairButton
                callback={onDelete}
                icon={deleteIcon}
                alt='delete'
            />
        </StyledForm>
    )
}

export default React.memo(AddList);

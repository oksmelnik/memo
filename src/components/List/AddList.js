import React, { useState, useRef, useEffect } from 'react';
import PairButton from '../Pair/PairButton'
import closeIcon from '../../assets/close.svg'
import checkmarkIcon from '../../assets/checkmark.svg'
import addIcon from '../../assets/plus.svg'

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
        if (inputEl.current.value.length > 0) {
            props.saveList(inputEl.current.value)
            setEdit(false)
            inputEl.current.value = ''
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
            {edit &&
                <>
                <StyledInput
                    ref={inputEl}
                    onChange={handleChange}
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

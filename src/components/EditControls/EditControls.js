import React from 'react'
import { StyledButtons } from './editStyles.js'

export const EditControls = ({onClick}) => {
        return (
            <StyledButtons>
                <button key='addOne' type='addOne' onClick={onClick}>Add 1</button>
                <button key='addTen' key='addTen' onClick={onClick}>Add 10</button>
            </StyledButtons>
        )
}
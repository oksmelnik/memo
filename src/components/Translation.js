import React from 'react'
import { StyledTranslation } from './../styles.js'

function Translation(props) {

    return (
        <StyledTranslation>
            <div>{props.translation}</div>
        </StyledTranslation>
    )
}
export default Translation;

import styled from 'styled-components'

export const StyledGapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    div {
        margin: 0.1em;
        background: white;
        color: black;
        border-radius: 4px;
        padding: 0.2em;
    }
    div {
        ${({edit, leftColumn}) => {
         if (!edit &&  leftColumn) {
           return {
             background: 'none',
             color: 'white',
            padding: '0.1em'
           }
         }
        }};
    }

`

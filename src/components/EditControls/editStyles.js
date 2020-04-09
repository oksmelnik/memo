import styled from 'styled-components'

const StyledButtons = styled.button`
  background: inherit;
  border: none;
  display: flex;
  
  button {
      width: 5em;
      height: 2rem;
      
      background-color: white;
      border-radius: 4px;
      margin: 1rem;
      color: black;

      :hover {
          cursor: pointer;
      }
  }
`
export {
    StyledButtons
}
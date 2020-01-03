import styled from 'styled-components'

const StyledButton = styled.button`
  background: inherit;
  border: none;

  img {
      width: 2em;
      border-radius: 4px;
      margin: 0.2rem;
      padding: 0.2em;
      color: white;

      :hover {
          cursor: pointer;
      }
  }
`
const StyledGapsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    div {
        margin: 0.1em;
        background: white;
        color: black;
        border-radius: 4px;
        padding: 0.1em;
    }
`
const StyledWord = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 50%;
    margin-left: 0.5em;

    textarea {
      width: 90%;
      border-radius: 4px;
      font-size: 0.6em;
      padding: 1.2em 0.3em;
    }

    span {
        background: white;
        color: black;
        margin: 0.1em;
        padding: 0.1em;
        border-radius: 4px;
        font-size: 0.6em;
    }
`

const StyledPair = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .pair {
        display: flex;
        align-items: center;
        padding: 0.5em;
        border: 1px solid white;
        p {
            margin-right: 5px;
            text-align: left;
        }
    }

    .type-switcher {
        padding: 0.7em;
        width: 4em;
        position: relative;
        top: 5em;
        right: 5em;
        border-radius: 4px;
    }

    .words-wrapper {
        display: flex;
        align-items: center;
        width: 20em;
    }
`

export {
  StyledButton,
  StyledGapsContainer,
  StyledWord,
  StyledPair
};

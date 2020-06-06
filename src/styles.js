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

const StyledTranslation = styled.div`
    padding-left: 5px
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
        width: 50em;
    }
`

export {
  StyledButton,
  StyledPair,
  StyledTranslation
};

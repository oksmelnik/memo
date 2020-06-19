import styled from 'styled-components'

const StyledToolbar = styled.header`
    width: 100%;
    height: 60px;
    position: fix;
    top: 0;
    left: 0;
    background-color: #efdab9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 90;
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    position: sticky;
    text-transform: uppercase;

    img {
      height: 120%;
    }
`
export { StyledToolbar };

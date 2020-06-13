import styled from 'styled-components'

const StyledNavItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: canter;
    height: 100%;
    display: flex;

    li {
        margin: 0;
        display: flex;
        height: 100%;
        box-sizing: border-box;
    }

    a {
        height: 100%;
        color: black;
        text-decoration: none;
        padding: 16px 10px;
        border-bottom: 4px solid transperent;
        box-sizing: border-box;
        display: block
    }

    a:hover, a:active, a.active {
        background-color: #ffd152;
        color: #343233;
    }
`

export { StyledNavItems };

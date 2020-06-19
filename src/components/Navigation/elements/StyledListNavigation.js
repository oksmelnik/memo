import styled from 'styled-components'

const StyledListNavigation = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    padding-left: 50px;
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
        text-decoration: none;
        padding: 16px 5px 16px 0;
        box-sizing: border-box;
        display: block
    }

`
export { StyledListNavigation };

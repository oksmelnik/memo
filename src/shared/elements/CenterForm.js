import styled from 'styled-components'

const CenterForm = styled.div`
    padding: 20px 100px;
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
        background-color: white;
        width: 40%;
        height: 180px;
        margin: auto;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
    }
    input {
      width: 300px;
    }

    span {
      margin: auto;
      color: red;
    }
`
export { CenterForm };

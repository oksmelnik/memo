import styled from 'styled-components'

const CenterForm = styled.div`
    padding: 20px 100px;
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
      width: 40%;
      margin: auto;
      color: #efdab9;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border: 1px solid #efdab9;
      border-radius: 4px;
    }
    input {
      width: 300px;
      margin-top: 8px;
      border: 1px solid #efdab9;
      border-radius: 4px;
      outline: none;
    }

    div {
      margin-top: 8px;
    }

    span {
      margin: auto;
      color: red;
      margin-top: 8px;
    }

    button {
      color: #efdab9;
    }
`
export { CenterForm };

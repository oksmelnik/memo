import React from 'react';
import styled from 'styled-components'
import deleteIcon from '../../assets/delete.svg'
import PairButton from '../Pair/PairButton'

const StyledDiv = styled.div`
    font-size: 22px;
    padding 10px;
    color: white;
    text-decoration: none;
`

const ListItem = (props) => (
  <>
  <StyledDiv>{props.list.name}</StyledDiv>
  <PairButton
        callback={props.onDelete}
        icon={deleteIcon}
        alt='delete'
    />
  </>)
export default ListItem

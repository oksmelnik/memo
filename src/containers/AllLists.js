import React, { useState, useEffect, useContext } from 'react';
import AddList from '../components/List/AddList'
import ListItem from '../components/List/ListItem'
import { AuthContext } from './../services/authContext/AuthContext'
import { useLists } from './../services/listsContext'
import axiosWords from '../axios-words'
import Aux from './../hoc/Aux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'


const Block = styled.div`
    padding: 20px 100px;
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 30px;
    text-align: left;
`

const Lists = (props) => {
    const [ allLists, updateList, addList, deleteList ] = useLists()

    const { authState: { token, userId }} = useContext(AuthContext);

    const postSelectedHandler = ( name ) => {
        props.history.replace( '/lists/' + name );
    }

    return (

        <Aux>
            <Block>
              <h1>All your lists</h1>
                <List>
                {allLists && allLists.map((list, index) => {

                    return (<ListItem
                        key={list.id}
                        list={list}
                        onUpdate={(name) => updateList(name, list.id)}
                        onDelete={() => deleteList(list.id)}
                        clicked={() => postSelectedHandler(list.id)}
                        token={token}
                    />)}
                )}
                </List>
                <AddList saveList={addList}/>

            </Block>
        </Aux>
    )
}

export default withRouter(Lists);

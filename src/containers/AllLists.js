import React, { useState, useEffect, useContext } from 'react';
import AddList from '../components/List/AddList'
import ListItem from '../components/List/ListItem'
import { AuthContext } from './../services/AuthContext'
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
`

const AllLists = (props) => {
    const [lists, setState] = useState({})
    const { authState: { token, userId }} = useContext(AuthContext);

    useEffect(() => {
        const params = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axiosWords.get(`lists.json${params}`).then(res => {
            const lists = res.data

            Object.keys(lists).forEach(key => {
                lists[key] = {...{id: key}, ...lists[key]}
            })
            setState(lists)
        })
    }, [token])

    const saveList = (newList) => {
        setState({...newList, ...lists})
    }

    const updateList = (input, id) => {
        const newLists = {...lists}
        newLists[id].name = input
        setState({...lists, ...newLists})
        axiosWords.patch(`lists/${id}.json?auth=${token}`, newLists[id])
    }

    const onDelete = (index, id) => {

        const {[id]: omit, ...rest} = lists

        setState(rest)
        axiosWords.delete(`lists/${id}.json?auth=${token}`)
    }

    const postSelectedHandler = ( name ) => {
        props.history.replace( '/lists/' + name );
    }

    return (
        <Aux>
            <Block>

                <List>
                    {lists && Object.values(lists).map((list, index) => {

                        return (<ListItem
                            key={list.id}
                            list={list}
                            onUpdate={(input) => updateList(input, list.id)}
                            onDelete={() => onDelete(index, list.id)}
                            clicked={() => postSelectedHandler(list.id)}
                        />)}
                    )}
                </List>
                <AddList saveList={saveList}/>

            </Block>
        </Aux>
    )
}

export default withRouter(AllLists);

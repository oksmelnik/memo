import React, { useState, useEffect } from 'react';
import AddList from '../components/List/AddList'
import ListItem from '../components/List/ListItem'
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

    useEffect(() => {
        axiosWords.get('lists.json').then(res => {
            const lists = res.data

            Object.keys(lists).forEach(key => {
                lists[key] = {...{id: key}, ...lists[key]}
            })
            setState(lists)
        })
    }, [])

    const saveList = (input) => {
        axiosWords.post(`lists.json`, {name: input}).then(res => {
            const id = res.data.name
            const newList = {[id] : {id: id, name: input, pairs: []}}
            setState({...newList, ...lists})
        })
    }

    const updateList = (input, id) => {
        const newLists = {...lists}
        newLists[id].name = input
        setState({...lists, ...newLists})
        axiosWords.patch(`lists/${id}.json`, newLists[id])
    }

    const onDelete = (index, id) => {

        const {[id]: omit, ...rest} = lists

        setState(rest)
        axiosWords.delete(`lists/${id}.json`)
    }

    const postSelectedHandler = ( id ) => {
        props.history.push( '/' + id );
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

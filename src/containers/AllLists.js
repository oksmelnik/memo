import React, { useState, useEffect } from 'react';
import AddList from '../components/List/AddList'
import ListItem from '../components/List/ListItem'
import axiosWords from '../axios-words'
import Aux from './../hoc/Aux'
import { withRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import styled from 'styled-components'

const Block = styled.div`
    padding-left: 100px;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      display: flex;
      justify-content: flex-start;
    }
`

const AllLists = (props) => {

    const [lists, setState] = useState([])

    useEffect(() => {
        axiosWords.get('lists.json').then(res => {
          console.log(res)
            const lists = Object.values(res.data).filter(item => item.name)

            setState(lists)
        })
    }, [])

    const saveList = (input) => {
      console.log(input)
      const data = {
        name: input
      }
        axiosWords.put(`lists/${input}.json`, data).then(res => {
           setState([{id: res.data.name, name: input, pairs: []}, ...lists])
        })
    }

    const onDelete = (index, name) => {
        const newLists = [...lists]
        newLists.splice(index, 1)
        setState(newLists)
        axiosWords.delete(`lists/${name}.json`)
    }

    return (
        <Aux>
            <Block>
                <AddList saveList={saveList}/>

                <List>
                    {lists && lists.map((list, index) =>
                      <Link to={'/' + list.name}>
                        <ListItem key={list.id} list={list} onDelete={() => onDelete(index, list.name)}/>
                      </Link>
                    )}
                </List>
            </Block>
        </Aux>
    )
}

export default withRouter(AllLists);

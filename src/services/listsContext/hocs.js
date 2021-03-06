import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from './../authContext/AuthContext'
import { ListsContext } from "./context";
import axiosWords from './../../axios-words'


export function withListsFromProps(Component) {
  return (props) => {
    const [lists, setLists] = useState({});
    const { authState: { token, userId }} = useContext(AuthContext);

    useEffect(() => {

      if (token) {
        const params = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axiosWords.get(`lists.json${params}`).then(res => {
            const lists = res.data

            Object.keys(lists).forEach(key => {
                lists[key] = {...{id: key}, ...lists[key]}
            })
            setLists(lists)
        })
      }

}, [userId, token])


    return (
      <ListsContext.Provider value={{
        lists: lists,
        setLists: setLists
      }}>
        <Component {...props} />
      </ListsContext.Provider>
    );
  };
}

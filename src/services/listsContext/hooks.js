import React, { useContext } from "react";
import { ListsContext } from "./context";
import axiosWords from '../../axios-words'
import { AuthContext } from './../authContext/AuthContext'

const useListsContext = () => {
  return useContext(ListsContext);
}

const useAuthContext = () => {
  return useContext(AuthContext);
}

const useAddList = () => {
  const { lists, setLists } = useListsContext()

  return (newList) =>  {
      setLists({
        ...newList,
        ...lists
      })
  }
}

const useDeleteList = () => {

  const { lists, setLists } = useListsContext()
  const { authState: { token}} = useAuthContext()

  return (id) =>  {

    const newLists = { ...lists}
    delete newLists[id]

    axiosWords.delete(`lists/${id}.json?auth=${token}`)

    setLists(newLists)
  }
}

const useUpdateList = (name, id) => {
  const { lists, setLists } = useListsContext()
  const { authState: { token, userId }} = useAuthContext()

  return (name, id) =>  {
    const newList = lists[id]
     newList.name = name
     setLists({[id]: newList, ...lists })
     axiosWords.patch(`lists/${id}.json?auth=${token}`, newList)
  }
}


const useLists = () => {
  const { lists, setLists } = useListsContext()
  return [ Object.values(lists), useUpdateList(), useAddList(), useDeleteList() ]
}

export { useLists };

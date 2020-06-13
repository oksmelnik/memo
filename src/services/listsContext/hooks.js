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

const useUpdateListName = (id) => {

  const { lists, setLists } = useListsContext()
  const { authState: { token, userId }} = useAuthContext()

  return (name, id) =>  {
    const newList = lists[id]
     newList.name = name
     setLists({[id]: newList, ...lists })
     axiosWords.patch(`lists/${id}.json?auth=${token}`, newList)
  }
}

const useUpdateList = (id) => {
  const { lists, setLists } = useListsContext()
  const { authState: { token, userId }} = useAuthContext()

  return (list) =>  {
     setLists({...lists, [list.id]: list })
     axiosWords.patch(`lists/${id}.json?auth=${token}`, list)
  }
}


const useLists = () => {
  const { lists, setLists } = useListsContext()
  return [ Object.values(lists), useUpdateListName(), useAddList(), useDeleteList(), useUpdateList() ]
}

const useUpdatePair = (id, token) => {
  const { lists, setLists } = useListsContext()

  return (pair) =>  {

    const newList = lists[id]
    newList.pairs[pair.id] = pair
    const newLists = {...lists}
    newLists[id] = newList
    setLists(newLists)
    axiosWords.patch(`/lists/${id}/pairs/${pair.id}.json?auth=${token}`, pair )
  }
}

const newPairToAdd = {
  left: "",
  right: "",
  type: "word",
  edit: true,
  gap: {
    words: [],
    selected: []
  }
}

const useAddPair = (id, token) => {
  const { lists, setLists } = useListsContext()

  return (pair = newPairToAdd) => {
      axiosWords.post(`lists/${id}/pairs.json?auth=${token}`, newPairToAdd).then(res => {
        const pairId = res.data.name
        const newPair  = { id: pairId, ...newPairToAdd }

        const updatedList = lists[id]
        updatedList.pairs[pairId] = newPair
        const newLists = {...lists}
        newLists[id] = updatedList
        setLists(newLists)
      })
  }
}

const useAddPairs = (id, token) => {
  const { lists, setLists } = useListsContext()

  return (pairs = {}) => {

    if (pairs) {
      const newListsState = {...lists}
      const newListState = newListsState[id]
      Object.values(pairs).forEach(pair => {
        newListState.pairs[pair.id] = pair
      })

      setLists(newListsState)
    }

  }
}
const useDeletePair = (id, token) => {
  const { lists, setLists } = useListsContext()

  return (pairId) =>  {

    const newList = lists[id]
    delete newList.pairs[pairId]
    const newLists = {...lists}
    newLists[id] = newList
    setLists( newLists )
    axiosWords.delete(`lists/${id}/pairs/${pairId}.json?auth=${token}`)
  }

}

const useList =  (id) => {
  const { lists, setLists } = useListsContext()
  const { authState: { token, userId }} = useAuthContext()
  const list = lists && lists[id]
  const pairs = list && Object.values(list.pairs)
  return [ list, pairs, useUpdatePair(id, token), useAddPair(id, token), useAddPairs(id), useDeletePair(id, token) ]
}


export { useLists, useList };

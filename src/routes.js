import React, { useContext } from 'react';
import axios from 'axios'
import axiosWords from './axios-words'
import { AuthContext } from './services/authContext/AuthContext'

const  addList = async (name) => {
  return Promise((resolve, reject) => {
    axiosWords.post(`lists.json`, {
    name: name,
    userId: userId
  }).then(res => {
    resolve(res)
  }).catch(err => {
    reject(err)
  })
})
}

 function Routes() {
    const { authState } = useContext(AuthContext);
    const { token, userId } = authState


  return (<></>)
}

export addList

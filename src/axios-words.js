import axios from 'axios'

 const instance = axios.create({
    baseURL: 'https://memo-13d10.firebaseio.com/'
})

export default instance
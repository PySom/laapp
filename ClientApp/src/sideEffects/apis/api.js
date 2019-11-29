import axios from 'axios';

const baseUrl = '/api/';

const getAll = (url) => 
    axios.get(baseUrl + url)
        .then(response => response.data )
        .catch(err => { throw new Error(err.response.data) })

const getItemWithId = (url) => 
    axios.get(baseUrl + url)
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })


const updateWithId = (url, newObject) => 
    axios.put(baseUrl + url, newObject)
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })


const create = (url, newObject) =>
    axios.post(baseUrl + url, newObject)
        .then(response => response.data)
        .catch(err => { console.log(err.response); throw new Error(err.response.data.message) })


const deleteWithId = (url) =>
    axios.delete(baseUrl + url)
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })


export default {
    getAll,
    getItemWithId,
    updateWithId,
    create,
    deleteWithId
}
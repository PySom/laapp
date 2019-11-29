import axios from 'axios';

const baseUrl = '/api/files/';

const addFile = (fileObject) =>
    axios.post(baseUrl + 'upload', fileObject)
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })

const editFile = (fileObject) =>
    axios.put(baseUrl + 'edit', fileObject)
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })


const deleteFile = (fileObject) =>
    axios.delete(baseUrl + 'delete', { data: fileObject } )
        .then(response => response.data)
        .catch(err => { throw new Error(err.response.data) })





export default {
    addFile,
    editFile,
    deleteFile
}
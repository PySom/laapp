import { useState } from 'react';
import file from '../sideEffects/apis/file'


const useFileUpload = () => {
    const [value, setValue] = useState('');
    const onUpload = (e, fileData) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', fileData)
        file.addFile(formData)
            .then(response => setValue(response.name))
            .catch(err => console.error(err))
    };
    return { value, onUpload }
}

const useFileEdit = (image) => {
    const [value, setValue] = useState(image);
    const onEdit = (fileData) => {
        const formData = new FormData()
        formData.append('file', fileData.file)
        formData.append('oldImage', fileData.image)
        file.editFile(formData)
            .then(response => setValue(response.name))
            .catch(err => console.error(err))
    }
    return { value, onEdit }
}

const useFileDelete = (file) => {
    const [value, setValue] = useState('');
    const onDelete = (fileData) => {
        file.deleteFile(fileData)
            .then(response => {
                if (response.status === '204') {
                    setValue('deleted')
                }
            })
            .catch(err => console.error(err))
    }
    return { value, onDelete }
}

export default {
    useFileUpload,
    useFileEdit,
    useFileDelete,

}
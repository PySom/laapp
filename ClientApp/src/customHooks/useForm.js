import { useState } from 'react';

export const useForm = (type, val) => {
    const [value, setValue] = useState(val);
    const onChange = (e) => {
        if (typeof e === 'object') {
            setValue(e.target.value)
        }
        else {
            setValue(e)
        }
    };
    const onSetChange = (data) => setValue(data);
    return {
        main: { type, value, onChange },
        onSetChange
    }
}

export const useFormFile = () => {
    const [value, setValue] = useState();
    const onChange = (e) => {
        const file = e.target.files[0]
        setValue(file)
    };
    return { value, onChange }
}

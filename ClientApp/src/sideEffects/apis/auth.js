import axios from 'axios';

const baseUrl = '/api/account/';

const createHeaderToken = (token) => ({"authorization": `bearer ${token}`});

const persistUserInLS = (user) => {
    if (localStorage) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

const removeUserFromLS = () => {
    if (localStorage) {
        localStorage.removeItem('user')
    }
}

const login = (loginCredentials) =>
    axios.post(baseUrl + 'login', loginCredentials)
        .then(response => {
            persistUserInLS(response.data)
            return response.data
        })
        .catch(err => { throw new Error(err.response.data.message) })

const register = (registerCredentials) =>
    axios.post(baseUrl + 'register', registerCredentials)
        .then(response => {
            persistUserInLS(response.data)
            return response.data
        })
        .catch(err => { throw new Error(err.response.data.message) })

export const logout = () => {
    removeUserFromLS()
}

export default {
    createHeaderToken,
    login,
    register
}

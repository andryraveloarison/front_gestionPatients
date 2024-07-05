import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/user/login', credentials)
}

let register = (credentials) => {
    return Axios.post('/user/register', credentials)
}

export const authService = {
    login, register
}
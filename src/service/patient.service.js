import Axios from "./caller.service"

let saveData = (credentials) => {
    return Axios.post('/patient/', credentials)
}

let loadData = () => {
    return Axios.get('/patient/')
}

let updateData = (credentials) => {
    return Axios.put('/patient/', credentials)
}

let deleteData = (id) => {
    return Axios.delete(`/patient/${id}`)
}


export const patientService = {
    loadData, saveData, updateData, deleteData
}
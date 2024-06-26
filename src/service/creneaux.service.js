import Axios from "./caller.service"

let saveData = (credentials) => {
    return Axios.post('/creneaux/', credentials)
}

let loadData = () => {
    return Axios.get('/creneaux/')
}

let updateData = (credentials) => {
    return Axios.put('/creneaux/', credentials)
}

let deleteData = (id) => {
    return Axios.delete(`/creneaux/${id}`)
}

export const creneauxService = {
    loadData, saveData, updateData, deleteData
}
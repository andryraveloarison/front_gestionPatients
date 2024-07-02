import Axios from "./caller.service"

let saveData = (credentials) => {
    return Axios.post('/rv/', credentials)
}

let loadData = () => {
    return Axios.get('/rv/')
}

let updateData = (credentials) => {
    return Axios.put('/rv/', credentials)
}

let deleteData = (id) => {
    return Axios.delete(`/rv/${id}`)
}

let findByCreneaux = (credentials) => {
    return Axios.post('/rv/creneaux/', credentials)
}
export const rvService = {
    loadData, saveData, updateData, deleteData, findByCreneaux
}
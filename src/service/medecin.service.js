import Axios from "./caller.service"

let saveData = (credentials) => {
    return Axios.post('/medecin/', credentials)
}



let loadData = () => {
    return Axios.get('/medecin/')
}

let updateData = (credentials) => {
    return Axios.put('/medecin/', credentials)
}

let deleteData = (id) => {
    return Axios.delete(`/medecin/${id}`)
}


export const medecinService = {
    loadData, saveData, updateData, deleteData
}
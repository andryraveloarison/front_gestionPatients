import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'X-API-KEY': 'api-key',
        'X-API-SECRET': '546fed60-4v38-4f9a-bd41-a352a4df1a54'
    }
})


export default Axios
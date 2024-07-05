import axios from 'axios'


const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'X-API-KEY': 'api-key',
        'X-API-SECRET': '546fed60-4v38-4f9a-bd41-a352a4df1a54'
    }
})



Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    
}, function (error) {
    // Gestion des erreurs lors de l'interception de la requête
    return Promise.reject(error);
});



export default Axios
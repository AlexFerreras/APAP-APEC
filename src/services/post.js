import axios from 'axios'

const apiUrl = 'https://eaa66a991dd0.ngrok.io/'

async function post (endpoint, model) {
    return axios.post(`${apiUrl}${endpoint}`,  model);
}

export default post;
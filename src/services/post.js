import axios from 'axios'
import apiUrl from '../config/apiUrl'

async function post (endpoint, model) {
    return axios.post(`${apiUrl}${endpoint}`,  model);
}

export default post;
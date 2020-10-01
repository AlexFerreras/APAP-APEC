import axios from "axios";

const apiUrl = "https://8f2e045d4012.ngrok.io";

async function post(endpoint, model) {
  return axios.post(`${apiUrl}${endpoint}`, model);
}

export default post;

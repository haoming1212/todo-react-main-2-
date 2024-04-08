import axios from "../plugins/axios.js";

export const getRandom = async () => {
  return axios.post("http://localhost:3001/api/task/random")
    .then(res => res)
    .catch(err => null)
}

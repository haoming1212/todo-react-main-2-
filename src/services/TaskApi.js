import axios from "../plugins/axios";

export const addTask = async (values) => {
  return axios.post("http://localhost:3001/api/task/add", {...values})
    .then(res => res)
    .catch(err => null)
}

export const listTask = async (values) => {
  return axios.post("http://localhost:3001/api/task/list", {})
    .then(res => res)
    .catch(err => null)
}

export const deleteTask = async (values) => {
  return axios.post("http://localhost:3001/api/task/delete", {...values})
    .then(res => res)
    .catch(err => null)
}

export const updateTask = async (values) => {
  return axios.post("http://localhost:3001/api/task/update", {...values})
    .then(res => res)
    .catch(err => null)
}

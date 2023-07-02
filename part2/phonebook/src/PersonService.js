import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then((response) => response.data)
}

export default {
  getAll,
  create,
  remove,
  update,
}

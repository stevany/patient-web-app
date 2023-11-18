import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/patients'
const getAll = (page, size, word) => {
   const request = axios.get(`${baseUrl}?page=${page}&size=${size}&filter=${word}`)
   return request.then(response => response.data)
}


const add = (data) => {
  const request = axios.post(baseUrl, data)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const request = axios.put(`${baseUrl}?id=${id}`, data)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}?id=${id}`)
  return request.then(response => response.data)
}
const patientService = {
    getAll,
    add,
    update,
    remove,
}

export default patientService
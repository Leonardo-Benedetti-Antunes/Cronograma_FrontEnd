const axios = require ('axios')

const url = "htpp://teste-api.com"

const axiosInstance = axios.create({
    baseURL: url,
})

const getProfessor = async (professor) => {
    const response = await axiosInstance.get(`/professor`, professor)

    return response.data
}
const postProfessor = async (professor) => {
    const response = await axiosInstance.post(`/professor`, professor)

    return response.data
}   

const putProfessor = async (professor) => {
   const response = await axiosInstance.put(`/professor/${id}`, professor)
    
   return response.data
}
const deleteProfessor = async (professor) => {
     const response = await axiosInstance.delete(`/professor/${id}`, professor)
    
    return response.data
}
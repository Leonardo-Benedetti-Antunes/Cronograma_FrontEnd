import axios from 'axios';

const url = 'http://teste-api.com';

const axiosInstance = axios.create({
  baseURL: url,
});

export const getProfessor = async (professor) => {
  const response = await axiosInstance.get(`/professor`, { params: professor });
  return response.data;
};

export const postProfessor = async (professor) => {
  const response = await axiosInstance.post(`/professor`, professor);
  return response.data;
};

export const putProfessor = async (id, professor) => {
  const response = await axiosInstance.put(`/professor/${id}`, professor);
  return response.data;
};

export const deleteProfessor = async (id) => {
  const response = await axiosInstance.delete(`/professor/${id}`);
  return response.data;
};

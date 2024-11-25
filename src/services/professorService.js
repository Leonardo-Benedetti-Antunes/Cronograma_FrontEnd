import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Busca todos os professores
export const getProfessores = async () => {
  try {
    const response = await axiosInstance.get('/professor');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    throw error;
  }
};

// Insere um novo professor
export const postProfessor = async (professor) => {
  try {
    const response = await axiosInstance.post('/professor', professor);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar professor:', error);
    throw error;
  }
};

// Atualiza um professor pelo ID
export const putProfessor = async (id, professor) => {
  try {
    const response = await axiosInstance.put(`/professor/${id}`, professor);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar professor com ID ${id}:`, error);
    throw error;
  }
};

// Atualiza o status de um professor
export const updateProfessorStatus = async (id, professor) => {
  try {
    const response = await axiosInstance.put(`/professorstatus/${id}`, professor);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status${id}:`, error);
    throw error;
  }
};

// Busca um professor pelo ID
export const getProfessorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/professor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar professor${id}:`, error);
    throw error;
  }
};

// Deleta um professor pelo ID
export const deleteProfessor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/professor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar professor${id}:`, error);
    throw error;
  }
};

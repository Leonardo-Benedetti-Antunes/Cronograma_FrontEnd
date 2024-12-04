// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 50000,
});
// ================Professores================
// Função para criar um professor
export const criarProfessor = async (professorData) => {
  try {
    const response = await api.post('/professor', professorData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    throw error;
  }
};

// Função para listar todos os professores
export const listarProfessores = async () => {
  try {
    const response = await api.get('/professor');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar professores:', error);
    throw error;
  }
};

// Função para atualizar o status de um professor
export const atualizarStatusProfessor = async (id, professorData) => {
  try {
    await api.put(`/professorstatus/${id}`, professorData);
  } catch (error) {
    console.error('Erro ao atualizar status do professor:', error);
    throw error;
  }
};

// Função para atualizar os dados de um professor
export const atualizarProfessor = async (id, professorData) => {
  try {
    await api.put(`/professor/${id}`, professorData);
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    throw error;
  }
};

// Função para listar um professor por ID
export const listarProfessorPorId = async (id) => {
  try {
    const response = await api.get(`/professor/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar professor por ID:', error);
    throw error;
  }
};

// Função para deletar um professor
export const deletarProfessor = async (id) => {
  try {
    await api.delete(`/professor/${id}`);
  } catch (error) {
    console.error('Erro ao deletar professor:', error);
    throw error;
  }
};

// Função para adicionar uma matéria a um professor
export const adicionarMateriaProfessor = async (idProfessor, idMateria) => {
  try {
    await api.post(`/professor/${idProfessor}/materia/${idMateria}`);
  } catch (error) {
    console.error('Erro ao adicionar matéria ao professor:', error);
    throw error;
  }
};

// Função para listar as matérias de um professor
export const listarMateriaProfessor = async (idProfessor) => {
  try {
    const response = await api.get(`/professor/${idProfessor}/materia`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar matérias do professor:', error);
    throw error;
  }
};

// Função para remover uma matéria de um professor
export const removerMateriaDoProfessor = async (idProfessor, idMateria) => {
  try {
    await api.delete(`/professor/${idProfessor}/materia/${idMateria}`);
  } catch (error) {
    console.error('Erro ao remover matéria do professor:', error);
    throw error;
  }
};

// Função para remover um dia de um professor
export const removerDiaDoProfessor = async (idProfessor, idDia) => {
  try {
    await api.delete(`/professor/${idProfessor}/dia/${idDia}`);
  } catch (error) {
    console.error('Erro ao remover dia do professor:', error);
    throw error;
  }
};
//======================professores=================================

//======================Materia=====================================
// Função para criar uma nova matéria
export const criarMateria = async (materiaData) => {
  try {
    const response = await api.post('/materia', materiaData); // Chama o endpoint /materia com o método POST
    return response.data;  // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao criar matéria:', error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};

// Função para listar todas as matérias
export const listarMaterias = async () => {
  try {
    const response = await api.get('/materia'); // Chama o endpoint /materia com o método GET
    return response.data;  // Retorna os dados das matérias
  } catch (error) {
    console.error('Erro ao listar matérias:', error);
    throw error;
  }
};

// Função para deletar uma matéria
export const deletarMateria = async (id) => {
  try {
    await api.delete(`/materia/${id}`); // Chama o endpoint /materia/{id} com o método DELETE
  } catch (error) {
    console.error('Erro ao deletar matéria:', error);
    throw error;
  }
};

// Função para atualizar uma matéria
export const atualizarMateria = async (id, materiaData) => {
  try {
    await api.put(`/materia/${id}`, materiaData); // Chama o endpoint /materia/{id} com o método PUT
  } catch (error) {
    console.error('Erro ao atualizar matéria:', error);
    throw error;
  }
};
//========================materia======================================

//=======================Curso======================================

// Função para criar um novo curso
export const criarCurso = async (cursoData) => {
  try {
    const response = await api.post('/curso', cursoData); // Chama o endpoint /curso com o método POST
    return response.data;  // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};

// Função para listar todos os cursos
export const listarCursos = async () => {
  try {
    const response = await api.get('/curso'); // Chama o endpoint /curso com o método GET
    return response.data;  // Retorna os dados dos cursos
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    throw error;
  }
};

// Função para deletar um curso
export const deletarCurso = async (id) => {
  try {
    await api.delete(`/curso/${id}`); // Chama o endpoint /curso/{id} com o método DELETE
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    throw error;
  }
};

// Função para atualizar um curso
export const atualizarCurso = async (id, cursoData) => {
  try {
    await api.put(`/curso/${id}`, cursoData); // Chama o endpoint /curso/{id} com o método PUT
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    throw error;
  }
};

// Função para associar uma matéria a um curso
export const inserirMateriaCurso = async (idCurso, idMateria) => {
  try {
    await api.post(`/curso/${idCurso}/materia/${idMateria}`); // Chama o endpoint para inserir matéria em um curso
  } catch (error) {
    console.error('Erro ao inserir matéria no curso:', error);
    throw error;
  }
};

// Função para listar as matérias de um curso
export const listarMateriaCurso = async (idCurso) => {
  try {
    const response = await api.get(`/curso/${idCurso}/materia`); // Chama o endpoint para listar as matérias de um curso
    return response.data;
  } catch (error) {
    console.error('Erro ao listar matérias do curso:', error);
    throw error;
  }
};
//================================curso=======================================

//===============================Sala====================================

// Função para criar uma nova sala
export const criarSala = async (salaData) => {
  try {
    await api.post('/sala', salaData);  // Chama o endpoint /sala com o método POST
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};

// Função para listar todas as salas
export const listarSalas = async () => {
  try {
    const response = await api.get('/sala');  // Chama o endpoint /sala com o método GET
    return response.data;  // Retorna os dados das salas
  } catch (error) {
    console.error('Erro ao listar salas:', error);
    throw error;
  }
};

// Função para deletar uma sala
export const deletarSala = async (id) => {
  try {
    await api.delete(`/sala/${id}`);  // Chama o endpoint /sala/{id} com o método DELETE
  } catch (error) {
    console.error('Erro ao deletar sala:', error);
    throw error;
  }
};

// Função para atualizar uma sala
export const atualizarSala = async (id, salaData) => {
  try {
    await api.put(`/sala/${id}`, salaData);  // Chama o endpoint /sala/{id} com o método PUT
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    throw error;
  }
};

// Função para listar uma sala por ID
export const listarSalaPorID = async (id) => {
  try {
    const response = await api.get(`/sala/${id}`);  // Chama o endpoint /sala/{id} com o método GET
    return response.data;  // Retorna os dados da sala
  } catch (error) {
    console.error('Erro ao listar sala por ID:', error);
    throw error;
  }
};

// Função para adicionar categoria a uma sala
export const adicionarCategoriaSala = async (salaID, categoriaID) => {
  try {
    await api.post(`/sala/${salaID}/categoria/${categoriaID}`);  // Chama o endpoint para adicionar categoria
  } catch (error) {
    console.error('Erro ao adicionar categoria à sala:', error);
    throw error;
  }
};

// Função para listar categoria de uma sala
export const listarCategoriaSala = async (salaID) => {
  try {
    const response = await api.get(`/sala/${salaID}/categoria`);  // Chama o endpoint para listar a categoria
    return response.data;
  } catch (error) {
    console.error('Erro ao listar categoria da sala:', error);
    throw error;
  }
};

// Função para atualizar categoria de uma sala
export const atualizarCategoriaSala = async (salaID, categoriaID) => {
  try {
    await api.put(`/sala/${salaID}/categoria`, { categoriaID });  // Chama o endpoint para atualizar categoria
  } catch (error) {
    console.error('Erro ao atualizar categoria da sala:', error);
    throw error;
  }
};

// Função para adicionar turma a uma sala
export const adicionarTurmaSala = async (salaID, turmaID) => {
  try {
    await api.post(`/sala/${salaID}/turma/${turmaID}`);  // Chama o endpoint para adicionar turma
  } catch (error) {
    console.error('Erro ao adicionar turma à sala:', error);
    throw error;
  }
};

// Função para listar turmas de uma sala
export const listarTurmaSala = async (salaID) => {
  try {
    const response = await api.get(`/sala/${salaID}/turma`);  // Chama o endpoint para listar turmas
    return response.data;
  } catch (error) {
    console.error('Erro ao listar turmas da sala:', error);
    throw error;
  }
};

// Função para adicionar matéria a uma sala
export const adicionarMateriaSala = async (salaID, materiaID) => {
  try {
    await api.post(`/sala/${salaID}/materia/${materiaID}`);  // Chama o endpoint para adicionar matéria
  } catch (error) {
    console.error('Erro ao adicionar matéria à sala:', error);
    throw error;
  }
};

// Função para listar matérias de uma sala
export const listarMateriaSala = async (salaID) => {
  try {
    const response = await api.get(`/sala/${salaID}/materia`);  // Chama o endpoint para listar matérias
    return response.data;
  } catch (error) {
    console.error('Erro ao listar matérias da sala:', error);
    throw error;
  }
};

//==========================Sala=============================================

//==========================Turma===========================================

// Função para criar uma nova turma
export const criarTurma = async (turmaData) => {
  try {
    await api.post('/turma', turmaData);  // Chama o endpoint /turma com o método POST
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};

// Função para listar todas as turmas
export const listarTurmas = async () => {
  try {
    const response = await api.get('/turma');  // Chama o endpoint /turma com o método GET
    return response.data;  // Retorna os dados das turmas
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    throw error;
  }
};

// Função para deletar uma turma
export const deletarTurma = async (id) => {
  try {
    await api.delete(`/turma/${id}`);  // Chama o endpoint /turma/{id} com o método DELETE
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    throw error;
  }
};

// Função para atualizar uma turma
export const atualizarTurma = async (id, turmaData) => {
  try {
    await api.put(`/turma/${id}`, turmaData);  // Chama o endpoint /turma/{id} com o método PUT
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    throw error;
  }
};

// Função para listar uma turma por ID
export const listarTurmaPorID = async (id) => {
  try {
    const response = await api.get(`/turma/${id}`);  // Chama o endpoint /turma/{id} com o método GET
    return response.data;  // Retorna os dados da turma
  } catch (error) {
    console.error('Erro ao listar turma por ID:', error);
    throw error;
  }
};

//===============================turma=====================================

//===============================Categoria==============================

// Função para criar uma nova categoria
export const criarCategoria = async (categoriaData) => {
  try {
    await api.post('/categoria', categoriaData);  // Chama o endpoint /categoria com o método POST
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};

// Função para listar todas as categorias
export const listarCategorias = async () => {
  try {
    const response = await api.get('/categoria');  // Chama o endpoint /categoria com o método GET
    return response.data;  // Retorna os dados das categorias
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    throw error;
  }
};

// Função para deletar uma categoria
export const deletarCategoria = async (id) => {
  try {
    await api.delete(`/categoria/${id}`);  // Chama o endpoint /categoria/{id} com o método DELETE
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};

// Função para atualizar uma categoria
export const atualizarCategoria = async (id, categoriaData) => {
  try {
    await api.put(`/categoria/${id}`, categoriaData);  // Chama o endpoint /categoria/{id} com o método PUT
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
};

// Função para listar uma categoria por ID
export const listarCategoriaPorID = async (id) => {
  try {
    const response = await api.get(`/categoria/${id}`);  // Chama o endpoint /categoria/{id} com o método GET
    return response.data;  // Retorna os dados da categoria
  } catch (error) {
    console.error('Erro ao listar categoria por ID:', error);
    throw error;
  }
};
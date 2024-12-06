<template>
  <!-- container do formulario -->
  <div class="square">
    <!-- Tabela que exibe a tabela do dia da semana -->
    <div class="tabela-professores">
      <h1>Início</h1>
      <!-- <table>
        <thead>
          <tr>
            <th>Nome do Professor</th>
            <th>Dia(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(professor, index) in professoresDoDia" :key="index">
            <td>{{ professor.nome }}</td>
            <td>{{ professor.dias.join(", ") }}</td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <!-- container que alinha as listas professor, Curso/materia, Salas/quantidade maxima -->
    <div class="listas">
      <!-- lista professor -->
      <div class="lista">
        <h3>Professores</h3>
        <ul class="custom" v-if="professores.length > 0">
          <li class="custom" v-for="professor in professores" :key="professor.id || professor.nome">
            {{ professor.nome }}
          </li>
        </ul>
        <p class="custom" v-else>Nenhum professor encontrado.</p>
      </div>
      <!-- lista Curso/Materia -->
      <div class="lista">
        <h3>Cursos</h3>
        <ul class="custom" v-if="cursos.length > 0">
          <li class="custom" v-for="curso in cursos" :key="curso.id || curso.nome">
            {{ curso.nome }}
            <ul v-if="curso.materias && curso.materias.length > 0">
              <li class="custom-inside" v-for="materia in curso.materias" :key="materia.id || materia.nome">
                {{ materia.nome }}
              </li>
            </ul>
            <p v-else>Nenhuma matéria associada a este curso.</p>
          </li>
        </ul>
        <p class="custom" v-else>Nenhum curso encontrado.</p>
      </div>
      <!-- lista Salas -->
      <div class="lista">
        <h3>Salas</h3>
        <ul class="custom" v-if="salas.length > 0">
          <li class="custom" v-for="sala in salas" :key="sala.id || sala.nome">
            {{ sala.nome }} - Quant. máxima: {{ sala.quantidadeMaxima }}
          </li>
        </ul>
        <p class="custom" v-else>Nenhuma sala encontrada.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { listarProfessores, listarMaterias, listarSalas, listarCursos, listarMateriaCurso } from '@/API/service.js';
import { ref, onMounted } from 'vue';
// variaveis para armazenamento de dados
const professores = ref([]);
const cursos = ref([]);
const materias = ref([]);
const salas = ref([]);
// funcao que lista os professores
const carregarProfessores = async () => {
  try {
    const response = await listarProfessores();
    professores.value = response;
  } catch (error) {
    console.error('Erro ao carregar professores:', error);
  }
};
// funcao que lista as materias
const carregarMateria = async () => {
  try {
    const response = await listarMaterias();
    materias.value = response;
  } catch (error) {
    console.error('Erro ao carregar matérias:', error);
  }
};
// funcao que lista os Cursos
const carregarCursos = async () => {
  try {
    const cursosData = await listarCursos();
    for (let curso of cursosData) {
      const materiasCurso = await listarMateriaCurso(curso.id);
      curso.materias = materiasCurso;
    }
    cursos.value = cursosData;
  } catch (error) {
    console.error('Erro ao carregar cursos e matérias:', error);
  }
};
//funcao que lista as Salas
const carregarSalas = async () => {
  try {
    const response = await listarSalas();
    salas.value = response;
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  }
};
//funcao que carrega todas funcoes
onMounted(() => {
  carregarProfessores();
  carregarCursos();
  carregarMateria();
  carregarSalas();
});
</script>

<style scoped lang="sass">
.square
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 20px auto
  padding: 20px
  max-width: 1200px
  width: 100%
  height: auto
  background-color: #f0f0f0 
  box-shadow: 2px 4px 10px rgba(0,0,0,0.2)  
  position: relative
  border-radius: 5px

.custom
  color: black

.custom-inside
  color: blue 

.listas
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  width: 100%
  margin-bottom: 30px
  clear: both

.lista
  background-color: #fafafa
  padding: 10px
  border-radius: 6px
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1)

li
  padding: 8px 0
  border-bottom: 1px solid #ddd
  color: #000

table
  color: #000
  font-size: 14px
  width: 100%
  border-collapse: collapse

th, td
  padding: 10px
  text-align: left
  border-bottom: 1px solid #ddd

th
  background-color: #f0f0f0
  font-weight: bold

body, html
  height: 100%
  margin: 0

h1
  color: #2a3d73
  font-size: 24px
  font-weight: bold
  text-align: center

h3
  color: #2a3d73
  font-size: 20px
  font-weight: bold
  text-align: center
  margin-bottom: 10px

ul
  color: #000
  font-size: 14px
  padding-left: 15px

.tabela-professores
  width: 100%
  background-color: #fafafa
  border-radius: 8px
  padding: 10px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  margin-bottom: 20px
</style>

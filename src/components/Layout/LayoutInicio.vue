<template>  
  <div class="quadrado">
    <!-- Cabeçalho da tela com título principal -->
    <h2 class="titulo">Tela Inicial</h2>

    <!-- Seção da Tabela de Professores por Dia da Semana -->
    <div class="tabela-professores">
      <h3>Calendário de {{ diaAtual }}</h3>
      <table>
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
      </table>
    </div>

    <!-- Seção de Listas (Professores, Matérias, Salas) -->
    <div class="listas">
      <!-- Lista de Professores -->
      <div class="lista">
        <h3>Professores</h3>
        <ul>
          <li v-for="(professor, index) in listaProfessores" :key="index">
            {{ professor.nome }}
          </li>
        </ul>
      </div>

      <!-- Lista de Matérias -->
      <div class="lista">
        <h3>Matérias</h3>
        <ul>
          <li v-for="(materia, index) in listaMaterias" :key="index">
            {{ materia.nome }}
          </li>
        </ul>
      </div>

      <!-- Lista de Salas -->
      <div class="lista">
        <h3>Salas</h3>
        <ul>
          <li v-for="(sala, index) in listaSalas" :key="index">
            {{ sala.nome }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dados exemplo para professores, matérias e salas
const listaProfessores = ref([
  { nome: 'Marcos', dias: ['Segunda', 'Terça'] },
  { nome: 'Ana', dias: ['Terça', 'Quinta'] },
  { nome: 'Carlos', dias: ['Quarta', 'Sexta'] }
])

const listaMaterias = ref([
  { nome: 'Matemática' },
  { nome: 'Português' },
  { nome: 'Ciências' }
])

const listaSalas = ref([
  { nome: 'Sala 101' },
  { nome: 'Sala 102' },
  { nome: 'Sala 103' }
])

// Função para obter o dia atual da semana
const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const hoje = new Date()
const diaAtual = computed(() => diasDaSemana[hoje.getDay()])

// Filtrando os professores para o dia atual
const professoresDoDia = computed(() => {
  return listaProfessores.value.filter(professor => professor.dias.includes(diaAtual.value))
})
</script>

<style scoped lang="sass">
/* Estilo do container principal da página */
.quadrado 
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
  border-radius: 6px

/* Estilo do título principal */
.titulo
  color: #2a3d73
  font-weight: bold
  text-align: center
  font-size: 24px
  margin-bottom: 20px

/* Estilo dos subtítulos das seções (Professores, Matérias, Salas) */
h3
  color: #2a3d73
  font-size: 20px
  font-weight: bold
  text-align: center
  margin-bottom: 10px

/* Estilo das listas de professores, matérias e salas */
ul
  color: #000
  font-size: 14px
  padding-left: 15px
table
  color: #000
  font-size: 14px

/* Estilo geral da área que contém as listas (Professores, Matérias e Salas) */
.listas
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  width: 100%
  margin-bottom: 30px
  clear: both /* Garantir que as colunas sejam posicionadas corretamente */

/* Estilo de cada item de lista (Professores, Matérias, Salas) */
.lista
  background-color: #fafafa
  padding: 10px
  border-radius: 6px
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1)

li
  padding: 8px 0
  border-bottom: 1px solid #ddd

/* Estilo da tabela de professores */
.tabela-professores
  width: 100%
  background-color: #fafafa
  border-radius: 8px
  padding: 20px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  margin-bottom: 20px /* Espaçamento para separar a tabela das colunas */

table
  width: 100%
  border-collapse: collapse

th, td
  padding: 10px
  text-align: left
  border-bottom: 1px solid #ddd

th
  background-color: #f0f0f0
  font-weight: bold

/* Estilo geral dos inputs e botões */
.campo-input, .descri-input
  width: 100%
  font-size: 14px
  border-radius: 4px
  border: 1px solid #ccc
  padding: 10px
  transition: border-color 0.3s ease, box-shadow 0.3s ease
  background-color: #fafafa
  color: #2a3d73

.dias-semana
  display: flex
  flex-wrap: wrap
  gap: 10px
  justify-content: center

.botoes
  display: flex
  justify-content: flex-end
  gap: 10px
  margin-top: 20px

/* Estilos dos botões de ação (Salvar e Cancelar) */
.botao-acao-salvar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #10f448
    text-shadow: 0px 1px 5px rgba(255,255,255,1 )

.botao-acao-cancelar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #991418
    text-shadow: 0px 1px 5px rgba(255,255,255,1 )

.mensagem-sucesso
  margin-top: 20px
  color: green
  font-weight: bold
  text-align: center
  background: rgba(255, 255, 255, 0.9)
  border-radius: 5px
  padding: 10px
  box-shadow: 0 0 10px rgba(0,0,0,0.2)

.campo-label
  color: #2a3d73
  font-size: 14px
  font-weight: 400

/* Estilo básico de página */
body, html
  height: 100%
  margin: 0
</style>

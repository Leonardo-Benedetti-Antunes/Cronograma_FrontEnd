<template>
  <div class="quadrado">
    <!-- Mantendo as colunas separadas por dia -->
    <div v-for="(dia, index) in ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']" :key="index" :class="'colun' + dia.slice(0, 3)">
      <!-- Botão mesclado com o topo -->
      <button @click="abrirModal(dia)" class="botao-selecionar">
        Selecionar Professores
      </button>

      <!-- Exibição dos professores selecionados -->
      <div class="lista-professores-selecionados">
        <div v-for="(professor, idx) in selectedProfessores[dia]" :key="idx" class="professor-item">
          <span>{{ professor }}</span>
          <button class="remover-professor" @click="removerProfessor(dia, idx)">
            🗑️
          </button>
        </div>
      </div>

      <!-- Nome do dia abaixo -->
      <div class="nome-dia-abaixo">{{ dia }}</div>
    </div>

    <div v-if="modalAberto" class="modal-overlay">
      <div class="modal">
        <h2>Selecione os Professores para {{ diaSelecionado }}</h2>
        <div class="lista-professores-checkbox">
          <div class="coluna-professores" v-for="(coluna, colIndex) in colunasProfessores" :key="colIndex">
            <div v-for="(professor, idx) in coluna" :key="idx">
              <input
                type="checkbox"
                :id="professor.nome + diaSelecionado"
                :value="professor.nome"
                v-model="selectedProfessores[diaSelecionado]"
              />
              <label :for="professor.nome + diaSelecionado">{{ professor.nome }}</label>
            </div>
          </div>
        </div>
        <button class="fechar-modal" @click="fecharModal">Salvar e Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Banco de dados falso de professores
const professores = ref([
  { nome: 'Marcos', dias: ['Segunda', 'Terça'] },
  { nome: 'Ana', dias: ['Quarta', 'Quinta'] },
  { nome: 'João', dias: ['Segunda', 'Sexta'] },
  { nome: 'Paula', dias: ['Terça', 'Sexta'] },
  { nome: 'Fernanda', dias: ['Quarta', 'Quinta'] },
  { nome: 'Carlos', dias: ['Segunda', 'Quarta'] },
  { nome: 'Julia', dias: ['Terça', 'Quinta'] },
  { nome: 'Sofia', dias: ['Quarta', 'Sexta'] },
  { nome: 'Bruno', dias: ['Segunda', 'Quarta'] },
  { nome: 'Rafaela', dias: ['Terça', 'Quinta'] },
  { nome: 'Gustavo', dias: ['Quarta', 'Sexta'] },
  { nome: 'Luciana', dias: ['Segunda', 'Sexta'] },
  { nome: 'Pedro', dias: ['Terça', 'Quarta'] },
  { nome: 'Isabel', dias: ['Quarta', 'Sexta'] },
  { nome: 'Henrique', dias: ['Segunda', 'Quinta'] }
])

// Função para filtrar professores por dia
const filtrarProfessoresPorDia = (dia) => professores.value.filter(prof => prof.dias.includes(dia))

// Objeto para armazenar os professores selecionados por dia
const selectedProfessores = ref({
  'Segunda': [],
  'Terça': [],
  'Quarta': [],
  'Quinta': [],
  'Sexta': []
})

// Controla a exibição do modal de seleção de professores
const modalAberto = ref(false)
const diaSelecionado = ref('')

// Função para abrir o modal e definir o dia
const abrirModal = (dia) => {
  diaSelecionado.value = dia
  modalAberto.value = true
}

// Função para fechar o modal
const fecharModal = () => {
  modalAberto.value = false
}

// Função para remover um professor da lista de selecionados
const removerProfessor = (dia, index) => {
  selectedProfessores.value[dia].splice(index, 1)
}

// Função para organizar os professores em colunas
const colunasProfessores = computed(() => {
  const professoresDia = filtrarProfessoresPorDia(diaSelecionado.value)
  const numeroColunas = 2
  const colunas = []
  const tamanhoColuna = Math.ceil(professoresDia.length / numeroColunas)

  for (let i = 0; i < numeroColunas; i++) {
    colunas.push(professoresDia.slice(i * tamanhoColuna, (i + 1) * tamanhoColuna))
  }
  return colunas
})
</script>

<style scoped lang="sass">
.quadrado
  display: flex
  justify-content: space-around
  flex-wrap: wrap
  align-items: flex-start
  margin: 20px auto
  padding: 20px
  max-width: 1300px 
  width: 100%
  background-color: #f0f0f0
  border-radius: 6px
  gap: 20px  

.colunSeg, .colunTer, .colunQua, .colunQui, .colunSex
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  width: 700px  
  background-color: #fff
  border-radius: 8px
  padding: 15px
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1)

  .botao-selecionar
    margin-bottom: 10px 
    background-color: #007bff
    color: white
    border: none
    border-radius: 4px
    padding: 8px 15px
    cursor: pointer

    &:hover
      background-color: #0056b3

  .lista-professores-selecionados
    width: 100%
    height: 180px
    overflow-y: auto
    margin-bottom: 10px

    .professor-item
      display: flex
      justify-content: space-between
      background-color: #f8f9fa
      padding: 10px
      border-radius: 4px
      margin-bottom: 5px

  .nome-dia-abaixo
    color: black
    font-weight: bold
    margin-top: 10px 

  button
    padding: 5px 10px
    background-color: #e0e0e0
    color: black
    border: none
    border-radius: 2px
    cursor: pointer

    &:hover
      background-color: #d0d0d0

  .lista-professores-selecionados
    width: 100%
    padding-top: 5px
    height: 180px
    overflow-y: auto

    .professor-item
      color: black
      display: flex
      justify-content: space-between
      align-items: center
      padding: 5px
      margin-bottom: 5px
      background-color: #f8f9fa
      border: 1px solid #ddd
      border-radius: 4px
      text-align: center

      span
        flex: 1

      .remover-professor
        background: none
        border: none
        color: red
        font-size: 16px
        cursor: pointer

        &:hover
          color: darkred

/* Estilos para o modal */
.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 20, 70, 0.5)
  display: flex
  justify-content: center
  align-items: center

.modal
  background-color: #fff
  padding: 25px
  max-width: 80vw
  max-height: 80vh
  border-radius: 10px
  overflow-y: auto
  display: flex
  flex-direction: column
  align-items: center

.lista-professores-checkbox
  color: black
  display: flex
  gap: 50px
  width: 100%

.coluna-professores
  display: flex
  flex-direction: column

input[type="checkbox"]
  margin-right: 5px

.fechar-modal
  margin-top: 20px
  padding: 10px 20px
  background-color: #007bff
  color: white
  border: none
  border-radius: 5px
  cursor: pointer

  &:hover
    background-color: #0056b3
</style>
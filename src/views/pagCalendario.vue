<template>
  <div class="quadrado">
    <h2 class="titulo">Calendário</h2>

    <!-- Contêiner para os dias da semana -->
    <div class="dias-semana">
      <div v-for="(dia, index) in ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']" :key="index" class="dia-coluna">
        <!-- Botões para selecionar o dia -->
        <v-btn @click="abrirTabela(dia)" class="botao-dia">
          {{ dia }}
        </v-btn>
      </div>
      <router-link to="/calendario-Visualizacao" class="router-link">
        <v-btn @click="visualizar" class="botao-vizualizar">
          Visualizar Cronograma
        </v-btn>
      </router-link>
    </div>

    <!-- Exibição da tabela de professores -->
    <div class="tabela-professores">
      <div v-if="selectedDia" class="conteudo-tabela">
        <div class="titulo-tabela">
          <h3 class="h3Titulo">Professores de {{ selectedDia }}</h3>
          <!-- Botão para adicionar professor -->
          <v-btn @click="abrirModal(selectedDia)" class="botao-add-professor">
            Adicionar Professor
          </v-btn>
        </div>

        <div class="lista-professores-selecionados">
          <div v-for="(professor, idx) in selectedProfessores[selectedDia]" :key="idx" class="professor-item">
            <span>{{ professor }}</span>
            <v-btn class="remover-professor" @click="removerProfessor(selectedDia, professor.id, idx)">Remover</v-btn>
          </div>
        </div>
        
        <!-- Botões de salvar e cancelar -->
        <div class="acoes-tabela">
          <v-btn @click="cancelar" class="botao-cancelar">Cancelar</v-btn>
          <v-btn @click="salvar" class="botao-salvar">Salvar</v-btn>
        </div>
      </div>
    </div>

    <!-- Modal de seleção de professores -->
    <div v-if="modalAberto" class="modal-overlay">
      <div class="modal">
        <h2>Selecione os Professores para {{ selectedDia }}</h2>
        <div class="lista-professores-checkbox">
          <div v-for="(professor, idx) in professoresDisponiveis" :key="idx">
            <input
              type="checkbox"
              :id="professor.nome + selectedDia"
              :value="professor"
              v-model="selectedProfessores[selectedDia]"
            />
            <label :for="professor.nome + selectedDia">{{ professor.nome }}</label>
          </div>
        </div>
        <v-btn class="fechar-modal" @click="fecharModal">Salvar e Fechar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { listarProfessores, removerDiaDoProfessor } from '@/API/service'

// Estado para armazenar a lista de professores e controlar o carregamento
const professores = ref([])

// Carregar professores ao montar o componente
const carregarProfessores = async () => {
  try {
    professores.value = await listarProfessores()
  } catch (error) {
    console.error('Erro ao carregar professores:', error)
  }
}

onMounted(() => {
  carregarProfessores()
})

// Função para filtrar professores por dia
const filtrarProfessoresPorDia = (dia) => {
  return professores.value.filter(prof => prof[dia]) // Considerando que a API retorna boolean para os dias
}

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
const selectedDia = ref('Segunda') // Definir "Segunda" como o primeiro dia da semana ao carregar
const professoresDisponiveis = computed(() => filtrarProfessoresPorDia(selectedDia.value))

// Função para abrir a tabela de um dia específico
const abrirTabela = (dia) => {
  selectedDia.value = dia
}

// Função para abrir o modal de seleção de professores
const abrirModal = (dia) => {
  selectedDia.value = dia
  modalAberto.value = true
}

// Função para fechar o modal
const fecharModal = () => {
  modalAberto.value = false
}

// Função para remover um professor da lista de selecionados
const removerProfessor = async (dia, idProfessor, index) => {
  try {
    await removerDiaDoProfessor(idProfessor, dia)
    selectedProfessores.value[dia].splice(index, 1)
  } catch (error) {
    console.error('Erro ao remover o professor:', error)
  }
}

// Função para salvar as seleções
const salvar = () => {
  console.log('Professores salvos:', selectedProfessores.value)
}

// Função para cancelar a seleção
const cancelar = () => {
  selectedProfessores.value[selectedDia.value] = []
}
</script>



<style scoped lang="sass">
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

.dias-semana
  display: flex
  justify-content: space-between
  margin-bottom: 20px

.dia-coluna
  width: 100px
  text-align: center

.botao-dia
  padding: 10px 15px
  background-color: #d1d1d1 // Cinza suave
  color: #2a3d73 // Texto azul suave
  border: none
  border-radius: 5px
  cursor: pointer

.botao-dia:hover
  transform: scale(1.05)
  color: #fafafa
  background-color: #2a3d73 // Efeito de hover suave em cinza
  text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )

.tabela-professores
  width: 100%
  background-color: #fafafa // Fundo claro para a tabela
  border-radius: 8px
  padding: 20px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)

.conteudo-tabela
  display: flex
  flex-direction: column
  align-items: flex-start

.titulo-tabela
  display: flex
  justify-content: space-between
  width: 100%

.botao-add-professor
  padding: 10px 20px
  background-color: #1e2e4c // Azul suave para o botão
  color: white
  border: none
  border-radius: 5px
  cursor: pointer

.botao-add-professor:hover
  transform: scale(1.05)
  background-color: #0e1e3c // Tom mais escuro de azul para hover
  text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )

.lista-professores-selecionados
  width: 100%
  margin-top: 20px
  height: 380px
  overflow-y: auto
  border: 1px solid transparentize(#2a3d73, 0.8)
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1)

.professor-item
  color: black
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px
  background-color: #fafafa // Fundo claro para cada item
  border-radius: 4px
  margin-bottom: 5px
  border: 1px solid #ddd

.remover-professor
  background: none
  border: none
  color: #991418 // Vermelho para o botão de remover
  font-size: 16px
  cursor: pointer

.remover-professor:hover
  color: darkred

.acoes-tabela
  margin-top: 20px
  display: flex
  justify-content: flex-end
  gap: 10px
  width: 100%

.botao-salvar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #10f448
    text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )

.botao-cancelar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #991418
    text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )


.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center

.modal
  color: #2a3d73
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
  display: flex
  flex-direction: column
  gap: 10px

input[type="checkbox"]
  margin-right: 10px
  color: #2a3d73 // Azul suave no texto do checkbox

.fechar-modal
  margin-top: 20px
  padding: 10px 20px // Cinza suave para fechar
  border: none
  border-radius: 5px
  cursor: pointer
  &:hover
    transform: scale(1.05)
    background-color: #10f448
    text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )

.titulo
  color: #2a3d73
  font-weight: bold
  text-align: center
  font-size: 24px
  margin-bottom: 20px
    
.h3Titulo
  color: #2a3d73

.botao-vizualizar
  margin-left: 20px
  padding: 10px 20px
  background-color: #1e2e4c // Azul suave para o botão
  color: white
  border: none
  border-radius: 5px
  cursor: pointer
  &:hover
    transform: scale(1.05)
    color: white
    text-shadow: 0px 0px 3px rgba(255,255 ,255 ,1 )
    background-color: #1a9afa
</style>


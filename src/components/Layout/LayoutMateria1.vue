<template>
  <div class="quadrado">
    <!-- Título da tela de cadastro de matéria -->
    <h2 class="titulo">Cadastro de Matéria</h2>

    <!-- Mensagem de sucesso que aparece após salvar os dados -->
    <div v-if="showSuccessMessage" class="mensagem-sucesso">
      Dados salvos com sucesso!
    </div>

    <!-- Container do formulário -->
    <div class="container-formulario">
      <!-- Primeira linha do formulário com dois campos -->
      <div class="linha">
        <!-- Campo de nome da matéria -->
        <div class="item-input">
          <label for="name" class="campo-label">Nome:</label>
          <v-text-field
            id="name"
            v-model="name"
            outlined
            class="campo-input"
            :error-messages="nameErrorMessages"
            @blur="validateName"
            :placeholder="'Digite aqui'"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          ></v-text-field>
        </div>
        
        <!-- Campo de duração da matéria -->
        <div class="item-input">
          <label for="duracao" class="campo-label">Duração:</label>
          <v-text-field
            id="duracao"
            v-model="duracao"
            outlined
            class="campo-input"
            :error-messages="duracaoErrorMessages"
            @blur="validateDuracao"
            :placeholder="'Digite aqui'"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          ></v-text-field>
        </div>
      </div>

      <!-- Seção de seleção de cursos (múltiplos cursos podem ser selecionados) -->
      <div class="item-input">
        <label for="Materia-Curso" class="campo-label">Selecione Curso:</label>
        <v-select
          id="MCurso"
          v-model="MCurso"
          multiple
          :items="cursos"
          item-text="nome"
          item-value="id"
          outlined
          class="campo-input"
          :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          :placeholder="'Selecione aqui'"
          :error-messages="cursoErrorMessages"
          @blur="validateCurso"
        ></v-select>
      </div>

      <!-- Seção de seleção de salas (opcional) -->
      <div class="item-input">
        <label for="sala" class="campo-label">Selecione a sala (opcional):</label>
        <v-select
          id="sala"
          v-model="sala"
          multiple
          :items="salas"
          item-text="nome"
          item-value="id"
          outlined
          class="campo-input"
          :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          :placeholder="'Selecione aqui'"
        ></v-select>
      </div>

      <!-- Botões de ação: Salvar e Cancelar -->
      <div class="botoes">
        <v-btn @click="confirmCancel" class="botao-acao-cancelar">Cancelar</v-btn>
        <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
      </div>

      <!-- Diálogo de confirmação de cancelamento -->
      <v-dialog v-model="cancelDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Confirmar Cancelamento</v-card-title>
          <v-card-text>Tem certeza de que deseja cancelar o cadastro?</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green" text @click="cancel">Sim</v-btn>
            <v-btn color="red" text @click="cancelDialog = false">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* Variáveis e referências de estado para os campos de entrada */
const inputBgColor = ref('#fafafa') // Cor de fundo dos campos de entrada
const inputTextColor = ref('#2a3d73') // Cor do texto nos campos

/* Dados para cursos e salas, com as opções disponíveis */
const cursos = ref([
  { id: 1, nome: 'Curso de Matemática' },
  { id: 2, nome: 'Curso de História' },
  { id: 3, nome: 'Curso de Física' }
])

const salas = ref([
  { id: 1, nome: 'Sala 101' },
  { id: 2, nome: 'Sala 102' },
  { id: 3, nome: 'Sala 103' }
])

/* Variáveis para armazenar os dados do formulário */
const name = ref('')
const duracao = ref('')
const MCurso = ref([])  // Múltiplos cursos selecionados
const sala = ref([])    // Múltiplas salas selecionadas

/* Controle de exibição da mensagem de sucesso e do diálogo de cancelamento */
const showSuccessMessage = ref(false)
const cancelDialog = ref(false)

/* Mensagens de erro para cada campo */
const nameErrorMessages = ref([])
const duracaoErrorMessages = ref([])
const cursoErrorMessages = ref([])

/* Função para validar o campo de nome */
const validateName = () => {
  nameErrorMessages.value = []  // Limpa as mensagens de erro
  if (!name.value) {  // Se o campo nome estiver vazio, exibe erro
    nameErrorMessages.value.push('O nome é obrigatório.')
  }
}

/* Função para validar o campo de duração */
const validateDuracao = () => {
  duracaoErrorMessages.value = []  // Limpa as mensagens de erro
  if (!duracao.value) {  // Se o campo duração estiver vazio, exibe erro
    duracaoErrorMessages.value.push('A duração é obrigatória.')
  }
}

/* Função para validar o campo de cursos */
const validateCurso = () => {
  cursoErrorMessages.value = []  // Limpa as mensagens de erro
  if (MCurso.value.length === 0) {  // Se nenhum curso for selecionado, exibe erro
    cursoErrorMessages.value.push('Pelo menos um curso deve ser selecionado.')
  }
}

/* Função para salvar os dados do formulário */
const saveData = () => {
  // Executa as validações
  validateName()
  validateDuracao()
  validateCurso()

  // Se houver erros, não prossegue com o salvamento
  if (nameErrorMessages.value.length > 0 || duracaoErrorMessages.value.length > 0 || cursoErrorMessages.value.length > 0) {
    return
  }

  // Lógica para salvar os dados (por exemplo, enviar ao backend)
  showSuccessMessage.value = true

  // Exibe a mensagem de sucesso por 3 segundos
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

/* Função para exibir o diálogo de confirmação de cancelamento */
const confirmCancel = () => {
  cancelDialog.value = true
}

/* Função para cancelar o cadastro (fecha o diálogo) */
const cancel = () => {
  cancelDialog.value = false
}
</script>

<style scoped lang="sass">
/* Estilos para o layout geral da tela de cadastro */
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

/* Estilo para o título principal */
.titulo
  color: #2a3d73
  font-weight: bold
  text-align: center
  font-size: 24px
  margin-bottom: 20px

/* Container para o formulário com espaçamento entre os elementos */
.container-formulario
  display: flex
  flex-direction: column
  gap: 20px
  width: 100%
  padding: 20px
  box-sizing: border-box

/* Estilo para as linhas de inputs */
.linha
  display: flex
  gap: 20px
  justify-content: space-between
  align-items: center
  flex-wrap: wrap

/* Estilo para cada item de input */
.item-input
  flex: 1
  min-width: 250px

/* Estilo para os campos de input */
.campo-input
  width: 100%
  font-size: 14px
  border-radius: 4px
  border: 1px solid #ccc
  padding: 10px
  background-color: #fafafa
  color: #2a3d73

/* Estilo para os botões de ação */
.botoes
  display: flex
  justify-content: flex-end
  gap: 10px
  margin-top: 20px

/* Estilo de hover para o botão Salvar */
.botao-acao-salvar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #10f448

/* Estilo de hover para o botão Cancelar */
.botao-acao-cancelar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #991418

/* Estilo para a mensagem de sucesso */
.mensagem-sucesso
  margin-top: 20px
  color: green
  font-weight: bold
  text-align: center
  background: rgba(255, 255, 255, 0.9)
  border-radius: 5px
  padding: 10px
  box-shadow: 0 0 10px rgba(0,0,0,0.2)

/* Estilo para os rótulos dos campos */
.campo-label
  color: #2a3d73
  font-size: 14px
  font-weight: 400

/* Estilo global para body e html */
body, html
  height: 100%
  margin: 0
</style>

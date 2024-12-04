<template>
  <div class="quadrado">
    <!-- Título da tela de cadastro de curso -->
    <h2 class="titulo">Cadastro de Curso</h2>

    <!-- Mensagem de sucesso que aparece após salvar os dados -->
    <div v-if="showSuccessMessage" class="mensagem-sucesso">
      Dados salvos com sucesso!
    </div>

    <!-- Mensagem de erro caso ocorra algum problema -->
    <div v-if="showErrorMessage" class="mensagem-erro">
      {{ showErrorMessage }}
    </div>

    <!-- Container do formulário -->
    <div class="container-formulario">
      <!-- Primeira linha do formulário com dois campos -->
      <div class="linha">
        <!-- Campo de nome do curso -->
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
      </div>
      <router-link to="/cadastro-materia" class="router-link">
          <v-btn @click="adcionaMateria" class="botao-adicionar">
            Adicionar materia a um curso
      </v-btn>
        </router-link>

      <!-- Botões de ação: Salvar e Cancelar -->
      <div class="botoes">
        <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { criarCurso } from '@/API/service';  // Função de API para criar o curso
import { ref } from 'vue';

/* Variáveis e referências de estado para os campos de entrada */
const inputBgColor = ref('#fafafa') // Cor de fundo dos campos de entrada
const inputTextColor = ref('#2a3d73') // Cor do texto nos campos

/* Dados para cursos e salas */
const cursos = ref([])

/* Variáveis para armazenar os dados do formulário */
const name = ref('')
const showSuccessMessage = ref(false)
const showErrorMessage = ref('')

/* Mensagens de erro para cada campo */
const nameErrorMessages = ref([])

/* Função para validar o campo de nome */
const validateName = () => {
  nameErrorMessages.value = []  // Limpa as mensagens de erro
  if (!name.value) {  // Se o campo nome estiver vazio, exibe erro
    nameErrorMessages.value.push('O nome é obrigatório.')
  }
}

/* Função para salvar os dados do formulário */
const saveData = async () => {
  // Executa as validações
  validateName()

  // Se houver erros, não prossegue com o salvamento
  if (nameErrorMessages.value.length > 0) {
    return
  }

  try {
    // Preparando os dados para enviar à API
    const cursoData = {
      nome: name.value
    }

    // Envia os dados para a API para criar o curso
    const response = await criarCurso(cursoData)

    // Verifica a resposta da API para garantir que o curso foi salvo
    if (response) {
      showSuccessMessage.value = true
      showErrorMessage.value = ''

      // Limpa o campo após o sucesso
      name.value = ''

      // Fechar a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    } else {
      // Se não houve resposta adequada, exibe erro
      showErrorMessage.value = 'Erro ao salvar o curso. Tente novamente.'
    }

  } catch (error) {
    console.error('Erro ao cadastrar curso:', error)

    // Exibe a mensagem de erro caso a API falhe
    showErrorMessage.value = 'Erro ao salvar o curso. Tente novamente.'
    showSuccessMessage.value = false

    // Limpa a mensagem de erro após 3 segundos
    setTimeout(() => {
      showErrorMessage.value = ''
    }, 3000)
  }
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

.botao-adicionar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #1f6f9f

/* Estilo para a mensagem de sucesso */
.mensagem-sucesso 
    margin-top: 20px
    color: green
    font-weight: bold
    text-align: center
    background: #10f448
    border-radius: 5px
    padding: 10px
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
  

.mensagem-erro 
    margin-top: 20px
    color: red
    font-weight: bold
    text-align: center
    background: #991418
    border-radius: 5px
    padding: 10px
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
/* Estilo para os rótulos dos campos */
.campo-label
  color: #2a3d73
  font-size: 14px
  font-weight: 400

.router-link
  margin-left: 5px  
  text-decoration: none
  color: white
    

/* Estilo global para body e html */
body, html
  height: 100%
  margin: 0
</style>

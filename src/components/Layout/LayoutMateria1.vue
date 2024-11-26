<template>
    <div class="quadrado">
      <h2 class="titulo">Cadastro de Matéria</h2>
  
      <div v-if="showSuccessMessage" class="mensagem-sucesso">
        Dados salvos com sucesso!
      </div>
  
      <div class="container-formulario">
        <div class="linha">
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
  
        <!-- Seleção de Cursos com Checkboxes -->
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
            :error-messages="materiaErrorMessages"
            @blur="validateCurso"
          ></v-select>
        </div>
  
        <!-- Seleção de Salas -->
        <div class="item-input">
          <label for="sala" class="campo-label">Selecione a sala:</label>
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
            :error-messages="materiaErrorMessages"
            @blur="validateSala"
          ></v-select>
        </div>
  
        <div class="botoes">
          <v-btn @click="confirmCancel" class="botao-acao-cancelar">Cancelar</v-btn>
          <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
        </div>
  
        <!-- Diálogo de Confirmação de Cancelamento -->
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
  import { postProfessor } from '@/services/professorService'
  
  const inputBgColor = ref('#fafafa') // Fundo dos campos
  const inputTextColor = ref('#2a3d73') // Texto azul suave
  const checkboxBgColor = ref('transparent') // Fundo dos checkboxes
  const checkboxTextColor = ref('#2a3d73') // Texto azul suave nos checkboxes
  
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
  
  const name = ref('')
  const duracao = ref('')
  const MCurso = ref([])
  const sala = ref([])
  
  const showSuccessMessage = ref(false)
  const cancelDialog = ref(false)
  
  const nameErrorMessages = ref([])
  const duracaoErrorMessages = ref([])
  const materiaErrorMessages = ref([])
  
  const validateName = () => {
    // Validação para o campo nome
  }
  
  const validateDuracao = () => {
    // Validação para o campo duração
  }
  
  const validateCurso = () => {
    // Validação para seleção de curso
  }
  
  const validateSala = () => {
    // Validação para seleção de sala
  }
  
  const saveData = () => {
    // Função para salvar os dados
  }
  
  const confirmCancel = () => {
    cancelDialog.value = true
  }
  
  const cancel = () => {
    cancelDialog.value = false
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
  
  .titulo
    color: #2a3d73
    font-weight: bold
    text-align: center
    font-size: 24px
    margin-bottom: 20px
  
  .container-formulario
    display: flex
    flex-direction: column
    gap: 20px
    width: 100%
    padding: 20px
    box-sizing: border-box
  
  .linha
    display: flex
    gap: 20px
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
  
  .item-input
    flex: 1
    min-width: 250px
  
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
  
  body, html
    height: 100%
    margin: 0
  
  .v-checkbox
    background-color: transparent
    color: #2a3d73
  
  .v-checkbox input
    background-color: transparent
  
  .v-checkbox .v-label
    color: #2a3d73
  </style>
  
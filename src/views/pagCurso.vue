<template>
  <div class="quadrado">
    <h2 class="titulo">Cadastro de Curso</h2>
    <div v-if="showSuccessMessage" class="mensagem-sucesso">
      Dados salvos com sucesso!
    </div>
    <div v-if="showErrorMessage" class="mensagem-erro">
      {{ showErrorMessage }}
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
      </div>
      <router-link to="/cadastro-materia" class="router-link">
        <v-btn @click="adcionaMateria" class="botao-adicionar">Adicionar matéria a um curso</v-btn>
      </router-link>
      <div class="botoes">
        <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { criarCurso } from '@/API/service';
import { ref } from 'vue';

const inputBgColor = ref('#fafafa');
const inputTextColor = ref('#2a3d73');
const cursos = ref([]);
const name = ref('');
const showSuccessMessage = ref(false);
const showErrorMessage = ref('');
const nameErrorMessages = ref([]);

const validateName = () => {
  nameErrorMessages.value = [];
  if (!name.value) {
    nameErrorMessages.value.push('O nome é obrigatório.');
  }
};

const saveData = async () => {
  validateName();
  if (nameErrorMessages.value.length > 0) {
    return;
  }
  try {
    const cursoData = { nome: name.value };
    const response = await criarCurso(cursoData);
    if (response) {
      showSuccessMessage.value = true;
      showErrorMessage.value = '';
      name.value = '';
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    } else {
      showErrorMessage.value = 'Erro ao salvar o curso. Tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao cadastrar curso:', error);
    showErrorMessage.value = 'Erro ao salvar o curso. Tente novamente.';
    showSuccessMessage.value = false;
    setTimeout(() => {
      showErrorMessage.value = '';
    }, 3000);
  }
};
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
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2)
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

.campo-input
  width: 100%
  font-size: 14px
  border-radius: 4px
  border: 1px solid #ccc
  padding: 10px
  background-color: #fafafa
  color: #2a3d73

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

.botao-adicionar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #1f6f9f

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

.campo-label
  color: #2a3d73
  font-size: 14px
  font-weight: 400

.router-link
  margin-left: 5px
  text-decoration: none
  color: white

body, html
  height: 100%
  margin: 0
</style>

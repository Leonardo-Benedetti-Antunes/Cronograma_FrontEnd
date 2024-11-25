<template>
  <v-telaCadastroProfessor>
    <div class="quadrado">
      <h2 class="titulo">Cadastro de Professores</h2>

      <div v-if="showSuccessMessage" class="mensagem-sucesso">
        Dados salvos com sucesso!
      </div>

      <div class="container-formulario">
        <!-- Campo Nome e Matéria, alinhados horizontalmente -->
        <div class="linha">
          <div class="item-input">
            <label for="name" class="campo-label">Nome:</label>
            <v-text-field
              id="name"
              v-model="nome"
              label="Nome do Professor" 
              outlined
              class="campo-input"
              :error-messages="nameErrorMessages"
              @blur="validateName"
              :placeholder="'Digite aqui'"
              :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
            ></v-text-field>
          </div>

          <div class="item-input">
            <label for="materia" class="campo-label">Selecione a Matéria:</label>
            <v-select
              id="materia"
              v-model="materia"
              :items="['Nenhum']"
              outlined
              class="campo-input"
              :error-messages="materiaErrorMessages"
              @blur="validateMateria"
              :placeholder="'Selecione a matéria'"
              :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
            ></v-select>
          </div>
        </div>

        <!-- Campo Descrição -->
        <div class="item-input">
          <label for="descricao" class="campo-label">Descrição:</label>
          <v-textarea
            id="descricao"
            v-model="descricao"
            outlined
            class="descri-input"
            rows="3"
            :placeholder="'Digite aqui'"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          ></v-textarea>
        </div>

        <!-- Selecione os Dias da Semana -->
        <label class="campo-label">Selecione os Dias da Semana:</label>
        <v-alert v-if="selectedDaysErrorMessage" type="error" class="error-message">
          {{ selectedDaysErrorMessage }}
        </v-alert>

        <div class="dias-semana">
          <v-checkbox
            v-for="dia in dias"
            :key="dia.sigla"
            :label="dia.sigla"
            :value="dia.sigla"
            v-model="selectedDays"
            class="item-checkbox"
            :style="{ backgroundColor: checkboxBgColor, color: checkboxTextColor }"
          ></v-checkbox>
        </div>

        <!-- Botões Cancelar e Salvar -->
        <div class="botoes">
          <v-btn @click="confirmCancel" class="botao-acao-cancelar">Cancelar</v-btn>
          <v-btn @click="enviarDados" class="botao-acao-salvar">Salvar</v-btn>
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
  </v-telaCadastroProfessor>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      descricao: '',
    };
  },
  methods: {
    async enviarDados() {
      const payload = {
        nome: this.nome,
        descricao: this.descricao,
      };

      try {
        const response = await axios.post('http://localhost:8080/professor', payload);

        this.$emit('sucesso', response.data);
        console.log('Dados enviados com sucesso:', response.data);

        this.nome = '';
        this.descricao = '';
      } catch (error) {
        console.error('Erro ao enviar os dados:', error.response || error);
      }
    },
  },
};
</script>

<style scoped lang="sass">
.quadrado
  margin: 20px
  padding: 20px
  max-width: 1200px
  width: 100%
  height: auto
  background-color: #f0f0f0 // Alterei para um cinza suave
  box-shadow: 2px 4px 10px rgba(0,0,0,0.2)
  position: relative


.titulo
  color: #2a3d73 // Azul suave
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

.item-input
  flex: 1

.campo-input, .descri-input
  width: 100%
  font-size: 14px
  border-radius: 4px
  border: 1px solid #ccc
  padding: 10px
  transition: border-color 0.3s ease, box-shadow 0.3s ease
  background-color: #fafafa // Fundo claro para os campos
  color: #2a3d73 // Azul suave

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

.botao-acao-cancelar
  transition: background-color 0.3s ease, transform 0.2s ease
  &:hover
    transform: scale(1.05)
    background-color: #991418

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
  color: #2a3d73 // Azul suave
  font-size: 14px
  font-weight: 400
</style>
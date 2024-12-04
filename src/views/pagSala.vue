<template>
  <div class="quadrado">
    <h2 class="titulo">Cadastro de Sala</h2>

    <!-- Mensagem de sucesso ou erro após salvar os dados -->
    <div v-if="showSuccessMessage" class="mensagem-sucesso">
      Dados salvos com sucesso!
    </div>
    <div v-if="showErrorMessage" class="mensagem-erro">
      Ocorreu um erro ao salvar os dados. Tente novamente!
    </div>

    <!-- Mensagem de erro -->
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
      <div class="item-input">
        <label for="quantidade" class="campo-label">Quantidade máxima de alunos:</label>
        <v-text-field
          id="quantidade"
          v-model="quantidade"
          outlined
          class="campo-input"
          :error-messages="quantidadeErrorMessages"
          @blur="validateQuantidade"
          :placeholder="'Digite aqui'"
          :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
        ></v-text-field>
      </div>

      <!-- Botões -->
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

<script>
import { criarSala } from '@/API/service';
import { ref } from 'vue';

export default {
  setup() {
    // Variáveis reativas
    const showSuccessMessage = ref(false);
    const showErrorMessage = ref('');
    const name = ref('');
    const quantidade = ref('');
    
    // Mensagens de erro
    const nameErrorMessages = ref([]);
    const quantidadeErrorMessages = ref([]);
    const cancelDialog = ref(false);

    // Funções de validação
    const validateName = () => {
      nameErrorMessages.value = [];
      if (!name.value) {
        nameErrorMessages.value.push('O nome é obrigatório.');
      }
    };

    const validateQuantidade = () => {
      quantidadeErrorMessages.value = [];
      if (!quantidade.value) {
        quantidadeErrorMessages.value.push('A quantidade máxima de alunos é obrigatória.');
      }
    };

    // Função para cadastrar a sala
    const cadastrarSala = async () => {
      try {
        const salaData = {
          nome: name.value,
          quantidadeMaxima: quantidade.value,
        };

        await criarSala(salaData);  // Enviar para a API
        showSuccessMessage.value = true;
        showErrorMessage.value = ''; // Limpar mensagem de erro

        // Limpar campos após sucesso
        name.value = '';
        quantidade.value = '';

        setTimeout(() => {
          showSuccessMessage.value = false;
        }, 3000);
      } catch (error) {
        console.error('Erro ao cadastrar sala:', error);
        
        // Verificando se o erro tem uma mensagem específica
        if (error.response && error.response.data && error.response.data.message) {
          showErrorMessage.value = error.response.data.message;
        } else {
          // Mensagem de erro genérica
          showErrorMessage.value = 'Erro desconhecido ao cadastrar a sala.';
        }

        showSuccessMessage.value = false; // Esconde a mensagem de sucesso
        setTimeout(() => {
          showErrorMessage.value = '';  // Limpa a mensagem de erro após 3 segundos
        }, 3000);
      }
    };

    // Função para salvar os dados
    const saveData = async () => {
      validateName();
      validateQuantidade();

      if (nameErrorMessages.value.length === 0 && quantidadeErrorMessages.value.length === 0) {
        await cadastrarSala();  // Chama a função para cadastrar a sala
      }
    };

    // Função para confirmar cancelamento
    const confirmCancel = () => {
      cancelDialog.value = true;
    };

    // Função para cancelar
    const cancel = () => {
      name.value = '';
      quantidade.value = '';
      cancelDialog.value = false;
    };

    return {
      name,
      quantidade,
      showSuccessMessage,
      showErrorMessage,
      nameErrorMessages,
      quantidadeErrorMessages,
      cancelDialog,
      validateName,
      validateQuantidade,
      saveData,
      confirmCancel,
      cancel,
      inputBgColor: '#fafafa',
      inputTextColor: '#2a3d73',
    };
  },
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

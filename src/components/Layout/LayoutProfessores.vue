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
            <label for="materia" class="campo-label">Selecione a Matéria:</label>
            <v-select
              id="materia"
              multiple
              v-model="materia"
              :items="['Nenhum','1']"
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
        <v-alert
          v-if="selectedDaysErrorMessage.length > 0"
          type="error"
          class="error-message"
        >
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
            @change="validateSelectedDays"
            :style="{ backgroundColor: checkboxBgColor, color: checkboxTextColor }"
          ></v-checkbox>
        </div>

        <!-- Botões Cancelar e Salvar -->
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
  </v-telaCadastroProfessor>
</template>

<script>
import { ref } from 'vue'
import { postProfessor } from '@/services/professorService'

export default {
  setup() {
    const name = ref('')
    const descricao = ref('')
    const materia = ref(null)
    const dias = ref([
      { sigla: 'Dom', id: 1 },  // Domingo = id 1
      { sigla: 'Seg', id: 2 },  // Segunda-feira = id 2
      { sigla: 'Ter', id: 3 },  // Terça-feira = id 3
      { sigla: 'Qua', id: 4 },  // Quarta-feira = id 4
      { sigla: 'Qui', id: 5 },  // Quinta-feira = id 5
      { sigla: 'Sex', id: 6 },  // Sexta-feira = id 6
      { sigla: 'Sab', id: 7 },  // Sábado = id 7
    ])
    const selectedDays = ref([])
    const nameErrorMessages = ref([])
    const materiaErrorMessages = ref([])
    const selectedDaysErrorMessage = ref('')
    const showSuccessMessage = ref(false)
    const cancelDialog = ref(false)

    const inputBgColor = ref('#fafafa') // Fundo dos campos
    const inputTextColor = ref('#2a3d73') // Texto azul suave
    const checkboxBgColor = ref('transparent') // Fundo dos checkboxes
    const checkboxTextColor = ref('#2a3d73') // Texto azul suave nos checkboxes

    const validateName = () => {
      nameErrorMessages.value = []
      if (!name.value) {
        nameErrorMessages.value.push('O nome é obrigatório.')
      }
    }

    const validateMateria = () => {
      materiaErrorMessages.value = []
      if (!materia.value) {
        materiaErrorMessages.value.push('A matéria é obrigatória.')
      }
    }

    const validateSelectedDays = () => {
      selectedDaysErrorMessage.value = ''
      if (selectedDays.value.length === 0) {
        selectedDaysErrorMessage.value = 'Pelo menos um dia deve ser selecionado.'
      }
    }

    const saveData = async () => {
      validateName()
      validateMateria()
      validateSelectedDays()

      if (!name.value || !materia.value || selectedDays.value.length === 0) {
        return
      }

      const data = { 
        name: name.value, 
        descricao: descricao.value, 
        materia: materia.value, 
        dias: selectedDays.value 
      };

          try {
        // Enviar os dados para o backend
        const response = await postProfessor(data);
        
        // Se a resposta for bem-sucedida, mostrar uma mensagem de sucesso
        console.log('Dados salvos com sucesso:', response);
        showSuccessMessage.value = true;

        // Esconder a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          showSuccessMessage.value = false;
        }, 3000);
        
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    const confirmCancel = () => {
      cancelDialog.value = true
    }

    const cancel = () => {
      console.log("Ação cancelada")
      cancelDialog.value = false
    }

    return {
      name,
      descricao,
      materia,
      dias,
      selectedDays,
      nameErrorMessages,
      materiaErrorMessages,
      selectedDaysErrorMessage,
      showSuccessMessage,
      cancelDialog,
      inputBgColor,
      inputTextColor,
      checkboxBgColor,
      checkboxTextColor,
      validateName,
      validateMateria,
      saveData,
      confirmCancel,
      cancel,
    }
  },
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
</style>

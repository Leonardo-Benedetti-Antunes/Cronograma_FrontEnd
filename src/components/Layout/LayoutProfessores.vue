<template>
  <v-telaCadastroProfessor>
    <div class="quadrado">
      <h2 class="titulo">Cadastro de Professores</h2>
      <div v-if="showSuccessMessage" class="mensagem-sucesso">
        Dados salvos com sucesso!
      </div>

      <div class="container-formulario">
        <div class="grupo-input">
          <div class="item-input">
            <label for="name">Nome:</label>
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
            <label for="descricao">Descrição:</label>
            <v-textarea
              id="descricao"
              v-model="descricao"
              outlined
              class="campo-input"
              rows="3"
              :placeholder="'Digite aqui'"
              :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
            ></v-textarea>
          </div>
        </div>

        <label for="materia">Selecione a Matéria:</label>
        <v-select
          id="materia"
          v-model="materia"
          :items="['Nenhum']"
          outlined
          class="campo-input"
          :error-messages="materiaErrorMessages"
          :placeholder="'Selecione a matéria'"
          :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
        ></v-select>

        <label>Selecione os Dias da Semana:</label>
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
        
        <div v-if="selectedDaysErrorMessage" class="error-message">{{ selectedDaysErrorMessage }}</div>
        
        </div>
      
      </div>
      
      <div class="botoes">
        <v-btn @click="confirmCancel" class="botao-acao">Cancelar</v-btn>
        <v-btn @click="saveData" class="botao-acao">Salvar</v-btn>
      </div>

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
  </v-telaCadastroProfessor>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const name = ref('')
    const descricao = ref('')
    const materia = ref(null)
    const dias = ref([{ sigla: 'Seg' }, { sigla: 'Ter' }, { sigla: 'Qua' }, { sigla: 'Qui' }, { sigla: 'Sex' }, {sigla:'Sab'},{sigla:'Dom'}])
    const selectedDays = ref([])
    const nameErrorMessages = ref([])
    const materiaErrorMessages = ref([])
    const selectedDaysErrorMessage = ref('')
    const showSuccessMessage = ref(false)
    const cancelDialog = ref(false)

    const inputBgColor = ref('#f9f9f9')
    const inputTextColor = ref('#2b259f')
    const checkboxBgColor = ref('#e0e0e0')
    const checkboxTextColor = ref('#2b259f')

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

    const saveData = () => {
      validateName()
      validateMateria()
      validateSelectedDays()

      if (!name.value || !materia.value || selectedDays.value.length === 0) {
        return
      }

      const data = { name: name.value, descricao: descricao.value, materia: materia.value, dias: selectedDays.value }
      console.log("Dados para salvar:", data)
      showSuccessMessage.value = true
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    }

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
      saveData,
      confirmCancel,
      cancel,
    }
  },
}
</script>

<style scoped lang="sass">
.error-message
  color: red
  font-size: 12px
  background-color: rgba(255, 228, 228, 0.8)
  padding: 5px
  border-radius: 4px

.container-formulario
  margin: 0 auto
  padding: 20px
  max-width: 500px
  display: flex
  flex-direction: column
  gap: 20px

.grupo-input
  display: flex
  gap: 20px

.item-input
  flex: 1

label
  font-size: 14px
  color: #333

.quadrado 
  margin: 20px
  width: calc(100vw - 50px)
  height: calc(100vh - 90px)
  box-sizing: border-box
  background-color: rgba(230, 230, 230, 0.9)
  box-shadow: 2px 4px 10px rgba(0,0,0,0.3)

.campo-input
  width: 100%
  font-size: 12px
  border-radius: 4px
  border: 1px solid #ccc
  padding: 8px
  transition: border-color 0.3s ease, box-shadow 0.3s ease

.dias-semana
  display: flex
  gap: 5px
  flex-wrap: wrap
  position: absolute
  top: 90%
  left: 10%
  transform: translate(50%, -60%)
  align-self: center
  justify-content: center


.item-checkbox
  transition: transform 0.2s ease

.botoes
  display: flex
  justify-content: flex-end
  gap: 10px
  position: absolute
  margin: 20px
  bottom: 20px 
  right: 20px  

.botao-acao
  transition: background-color 0.3s ease, transform 0.2s ease

  &:hover
    transform: scale(1.05)

.mensagem-sucesso
  margin-top: 20px
  color: green
  font-weight: bold
  position: absolute
  top: 20px
  left: 50%
  transform: translateX(-50%)
  background: rgba(255, 255, 255, 0.9)
  border-radius: 5px
  padding: 10px
  box-shadow: 0 0 10px rgba(0,0,0,0.2)

.titulo
  color: black
  font-weight: bold
  position: absolute
  margin: 15px 
</style>

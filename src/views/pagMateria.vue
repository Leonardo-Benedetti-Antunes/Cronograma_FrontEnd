<template>
  <div class="quadrado">
    <!-- Título da tela de cadastro de matéria -->
    <h2 class="titulo">Cadastro de Matéria</h2>

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

      <!-- Campo de nome da matéria -->
      <div class="linha">
        <div class="item-input">
          <label for="name" class="campo-label">Nome da Matéria:</label>
          <v-text-field
            id="name"
            v-model="name"
            outlined
            class="campo-input"
            :error-messages="nameErrorMessages"
            @blur="validateName"
            :placeholder="'Digite o nome da matéria'"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
          ></v-text-field>
        </div>
      </div>

      <!-- Campo de seleção dos cursos -->
      <div class="linha">
        <div class="item-input">
          <label for="curso" class="campo-label">Selecione os cursos:</label>
          <v-select
            id="curso"
            v-model="selectedCursos"
            multiple
            :items="cursos"
            item-text="nome"
            item-value="id"
            outlined
            class="campo-input"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
            :placeholder="'Selecione aqui os cursos'"
          ></v-select>
        </div>
      </div>

      <!-- Botões de ação: Salvar e Cancelar -->
      <div class="botoes">
        <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { criarMateria, inserirMateriaCurso, listarCursos, listarMateriaCurso } from '@/API/service';  // Funções de API para criar a matéria e associá-la ao curso
import { ref, onMounted } from 'vue';

/* Variáveis e referências de estado para os campos de entrada */
const inputBgColor = ref('#fafafa') // Cor de fundo dos campos de entrada
const inputTextColor = ref('#2a3d73') // Cor do texto nos campos

/* Variáveis para armazenar os dados do formulário */
const name = ref('')
const showSuccessMessage = ref(false)
const showErrorMessage = ref('')

/* Mensagens de erro para cada campo */
const nameErrorMessages = ref([])

/* Lista de cursos disponíveis para seleção */
const cursos = ref([])  // Armazena os cursos retornados da API
const selectedCursos = ref([])  // Cursos selecionados pelo usuário

// Função para carregar os cursos e suas respectivas matérias ao montar o componente
const carregarCursos = async () => {
  try {
    const cursosData = await listarCursos();  // Carrega os cursos
    for (let curso of cursosData) {
      const materiasCurso = await listarMateriaCurso(curso.id);  // Carrega as matérias de cada curso
      curso.materias = materiasCurso;  // Associa as matérias ao curso
    }
    cursos.value = cursosData;  // Atualiza a lista de cursos no Vue
  } catch (error) {
    console.error('Erro ao carregar cursos e matérias:', error);
  }
};

// Carregar os cursos ao montar o componente
onMounted(() => {
  carregarCursos();
});

/* Função para validar o campo de nome */
const validateName = () => {
  nameErrorMessages.value = []  // Limpa as mensagens de erro
  if (!name.value) {  // Se o campo nome estiver vazio, exibe erro
    nameErrorMessages.value.push('O nome da matéria é obrigatório.')
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

  if (selectedCursos.value.length === 0) {
    showErrorMessage.value = 'Selecione ao menos um curso para associar.';
    return;
  }

  try {
    // Preparando os dados para enviar à API
    const materiaData = {
      nome: name.value
    }

    // Envia os dados para a API para criar a matéria
    const materiaResponse = await criarMateria(materiaData)

    // Se a matéria foi criada com sucesso, associa aos cursos selecionados
    if (materiaResponse && materiaResponse.id) {
      // Para cada curso selecionado, associa a matéria ao curso
      for (const cursoId of selectedCursos.value) {
        await inserirMateriaCurso(cursoId, materiaResponse.id)
      }

      // Exibe mensagem de sucesso
      showSuccessMessage.value = true
      showErrorMessage.value = ''

      // Limpa os campos após o sucesso
      name.value = ''
      selectedCursos.value = []

      // Fechar a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    } else {
      // Se a resposta não foi adequada, exibe erro
      showErrorMessage.value = 'Erro ao salvar a matéria. Tente novamente.'
    }

  } catch (error) {
    console.error('Erro ao cadastrar matéria:', error)

    // Exibe a mensagem de erro caso a API falhe
    showErrorMessage.value = 'Erro ao salvar a matéria. Tente novamente.'
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


.checkbox-item 
  margin: 5px 0

</style>

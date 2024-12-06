<template>
  <div class="quadrado">
    <h2 class="titulo">Cadastro de Matéria</h2>

    <div v-if="showSuccessMessage" class="mensagem-sucesso">
      Dados salvos com sucesso!
    </div>

    <div v-if="showErrorMessage" class="mensagem-erro">
      Ocorreu um erro ao salvar os dados. Tente novamente!
    </div>

    <div class="container-formulario">
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

      <div class="linha">
        <div class="item-input">
          <label for="curso" class="campo-label">Selecione os cursos:</label>
          <v-select
            id="curso"
            v-model="selectedCursos"
            multiple
            :items="cursos"
            item-title="nome"
            item-value="id"
            outlined
            class="campo-input"
            :style="{ backgroundColor: inputBgColor, color: inputTextColor }"
            :placeholder="'Selecione aqui os cursos'"
          ></v-select>
        </div>
      </div>

      <div class="botoes">
        <v-btn @click="saveData" class="botao-acao-salvar">Salvar</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { criarMateria, inserirMateriaCurso, listarCursos, listarMateriaCurso } from '@/API/service';
import { ref, onMounted } from 'vue';

const inputBgColor = ref('#fafafa');
const inputTextColor = ref('#2a3d73');

const name = ref('');
const showSuccessMessage = ref(false);
const showErrorMessage = ref('');

const nameErrorMessages = ref([]);

const cursos = ref([]);
const selectedCursos = ref([]);

const carregarCursos = async () => {
  try {
    const cursosData = await listarCursos();
    for (let curso of cursosData) {
      const materiasCurso = await listarMateriaCurso(curso.id);
      curso.materias = materiasCurso;
    }
    cursos.value = cursosData;
  } catch (error) {
    console.error('Erro ao carregar cursos e matérias:', error);
  }
};

onMounted(() => {
  carregarCursos();
});

const validateName = () => {
  nameErrorMessages.value = [];
  if (!name.value) {
    nameErrorMessages.value.push('O nome da matéria é obrigatório.');
  }
};

const saveData = async () => {
  validateName();

  if (nameErrorMessages.value.length > 0) {
    return;
  }

  if (selectedCursos.value.length === 0) {
    showErrorMessage.value = 'Selecione ao menos um curso para associar.';
    return;
  }

  try {
    const materiaData = { nome: name.value };
    const materiaResponse = await criarMateria(materiaData);

    if (materiaResponse && materiaResponse.id) {
      for (const cursoId of selectedCursos.value) {
        try {
          await axios.post(`http://localhost:8080/curso/${cursoId}/materia/${materiaResponse.id}`);
        } catch (error) {
          console.error(`Erro ao associar a matéria ao curso ${cursoId}:`, error);
        }
      }

      showSuccessMessage.value = true;
      showErrorMessage.value = '';

      name.value = '';
      selectedCursos.value = [];

      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    } else {
      showErrorMessage.value = 'Erro ao salvar a matéria. Tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao cadastrar matéria:', error);
    showErrorMessage.value = 'Erro ao salvar a matéria. Tente novamente.';
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

.mensagem-sucesso 
  margin-top: 20px
  color: white
  font-weight: bold
  text-align: center
  background: #10f448
  border-radius: 5px
  padding: 10px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)

.mensagem-erro 
  margin-top: 20px
  color: white
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

.checkbox-item 
  margin: 5px 0
</style>

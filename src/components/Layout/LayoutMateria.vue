<template>
    <v-container class="d-flex align-center justify-center fill-height" fluid>
      <v-card class="pa-6" max-width="700">
        <v-card-title>
          <span class="titulo">Cadastro de Matéria</span>
        </v-card-title>
  
        <!-- Sucesso ao salvar -->
        <v-snackbar v-model="showSuccessMessage" timeout="3000" color="green">
          Dados salvos com sucesso!
        </v-snackbar>
  
        <!-- Formulário de Cadastro -->
        <v-form ref="form" v-model="formValid">
          <!-- Campo Nome da Matéria -->
          <v-text-field
            v-model="nomeMateria"
            label="Nome da Matéria"
            outlined
            :rules="nomeMateriaRules"
            required
            class="campo-input"
          ></v-text-field>
  
          <!-- Campo Duração -->
          <v-text-field
            v-model="duracao"
            label="Duração (em horas)"
            outlined
            type="number"
            :rules="duracaoRules"
            required
            class="campo-input"
          ></v-text-field>
  
          <!-- Seleção de Cursos -->
          <v-select
            v-model="cursosSelecionados"
            :items="cursos"
            item-text="nome"
            item-value="id"
            label="Vincular Cursos"
            outlined
            multiple
            :rules="cursosRules"
            required
            class="campo-input select-input"
          ></v-select>
  
          <!-- Seleção de Salas -->
          <v-select
            v-model="salasSelecionadas"
            :items="salas"
            item-text="nome"
            item-value="id"
            label="Vincular Salas"
            outlined
            multiple
            :rules="salasRules"
            required
            class="campo-input select-input"
          ></v-select>
  
          <!-- Botões de Ação -->
          <v-row justify="end" class="mt-4">
            <v-btn @click="cancel" color="red" class="mr-4">Cancelar</v-btn>
            <v-btn @click="saveData" :disabled="!formValid" color="green">Salvar</v-btn>
          </v-row>
        </v-form>
  
        <!-- Diálogo de Confirmação de Cancelamento -->
        <v-dialog v-model="cancelDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirmar Cancelamento</v-card-title>
            <v-card-text>Tem certeza de que deseja cancelar o cadastro?</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green" text @click="cancelAction">Sim</v-btn>
              <v-btn color="red" text @click="cancelDialog = false">Não</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      // Dados simulados para cursos e salas
      const cursos = ref([
        { id: 1, nome: 'Curso de Matemática' },
        { id: 2, nome: 'Curso de História' },
        { id: 3, nome: 'Curso de Física' },
      ]);
      const salas = ref([
        { id: 1, nome: 'Sala 101' },
        { id: 2, nome: 'Sala 102' },
        { id: 3, nome: 'Sala 103' },
      ]);
  
      // Dados do formulário
      const nomeMateria = ref('');
      const duracao = ref('');
      const cursosSelecionados = ref([]);
      const salasSelecionadas = ref([]);
  
      // Validações do formulário
      const formValid = ref(false);
      const nomeMateriaRules = [(v) => !!v || 'Nome da matéria é obrigatório.'];
      const duracaoRules = [(v) => !!v && v > 0 || 'A duração deve ser maior que 0.'];
      const cursosRules = [(v) => v.length > 0 || 'Pelo menos um curso deve ser selecionado.'];
      const salasRules = [(v) => v.length > 0 || 'Pelo menos uma sala deve ser selecionada.'];
  
      // Snackbar e diálogo de cancelamento
      const showSuccessMessage = ref(false);
      const cancelDialog = ref(false);
  
      // Função para salvar dados
      const saveData = () => {
        if (formValid.value) {
          const data = {
            nomeMateria: nomeMateria.value,
            duracao: duracao.value,
            cursos: cursosSelecionados.value,
            salas: salasSelecionadas.value,
          };
          console.log("Dados para salvar:", data);
          showSuccessMessage.value = true;
        }
      };
  
      // Função de cancelamento
      const cancel = () => {
        cancelDialog.value = true;
      };
  
      const cancelAction = () => {
        console.log("Ação cancelada");
        cancelDialog.value = false;
      };
  
      return {
        nomeMateria,
        duracao,
        cursosSelecionados,
        salasSelecionadas,
        cursos,
        salas,
        formValid,
        nomeMateriaRules,
        duracaoRules,
        cursosRules,
        salasRules,
        showSuccessMessage,
        cancelDialog,
        saveData,
        cancel,
        cancelAction,
      };
    },
  };
  </script>
  
  <style scoped>
  .pa-6 {
    padding: 30px !important; /* Aumentando o tamanho da caixa */
  }
  
  .titulo {
    color: white; /* Cor branca para o título */
  }
  
  .campo-input .v-input__control, .v-select .v-input__control {
    background-color: black; /* Caixa de entrada com fundo preto */
    border: 1px solid #ccc;
    padding: 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .campo-input input, .v-select input {
    color: white; /* Texto dentro das caixas em branco */
  }
  
  .select-input .v-select__selections {
    background-color: black !important; /* Fundo da caixa de seleção preta */
  }
  
  .select-input .v-select__selections .v-select__placeholder {
    color: white; /* Texto da placeholder em branco */
  }
  
  .select-input .v-select__menu {
    background-color: black !important; /* Fundo do menu de opções */
  }
  
  .select-input .v-select__menu .v-list-item {
    color: white; /* Texto das opções em branco */
  }
  
  .v-btn {
    text-transform: none;
  }
  
  .v-snackbar {
    bottom: 10px !important;
  }
  
  .v-card {
    background-color: black;
  }
  
  .v-select .v-input__control {
    min-height: 50px; /* Aumentando a altura do campo de seleção */
  }
  
  .v-text-field .v-input__control {
    min-height: 50px; /* Aumentando a altura do campo de entrada de texto */
  }
  </style>
  
<template>
  <div class="quadrado">
    <h2 class="titulo">Calendário</h2>
    <v-column class="container">
      <div class="dias-semana">
        <div
          v-for="(dia, index) in ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']"
          :key="index"
          class="dia-coluna"
        >
          <v-btn
            @click="abrirTabela(dia)"
            :class="{ 'botao-dia-selecionado': diaSelecionado === dia }"
            class="botao-dia"
          >
            {{ dia }}
          </v-btn>
        </div>
      </div>
    </v-column>

    <v-col cols="12" class="titulo">
      <h1>Cronograma - {{ diaSelecionado }}</h1>
    </v-col>
    <div class="lista-professores-selecionados">
      <v-container>
        <v-row class="modal">
          <v-col cols="12" md="6">
            <v-card-title class="titulo">{{ diaSelecionado }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="professor in cronograma[diaSelecionado.toLowerCase()]"
                  :key="professor.id"
                  class="professor-item"
                >
                  <v-column>
                    <v-list-item-content>
                      Professor: {{ professor.nome }}
                    </v-list-item-content>
                    <v-list-item-content>
                      <span v-if="professor.sala">Sala: {{ professor.sala }}</span>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        @click="abrirModalSala(professor, diaSelecionado)"
                        small
                        color="primary"
                      >
                        Adicionar Sala
                      </v-btn>
                    </v-list-item-action>
                  </v-column>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog v-model="modalSalaAberto" max-width="500">
      <v-card>
        <v-card-title>
          Adicionar Sala para {{ professorSelecionado?.nome || "" }}
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="salaSelecionada"
            :items="salasDisponiveis"
            label="Selecione a sala"
            item-text="nome"
            item-value="id"
            outlined
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="fecharModalSala" text>Cancelar</v-btn>
          <v-btn @click="adicionarSala" color="primary" text>Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cronograma = ref({
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: [],
});

const salasDisponiveis = ref([]);
const modalSalaAberto = ref(false);
const professorSelecionado = ref(null);
const diaSelecionado = ref("Segunda"); // Inicializa com "Segunda"
const salaSelecionada = ref("");

const carregarProfessores = async () => {
  try {
    const response = await axios.get("http://localhost:8080/professor");
    console.log("Dados recebidos da API:", response.data);
    const professores = response.data;

    const cronogramaTemp = {
      segunda: [],
      terca: [],
      quarta: [],
      quinta: [],
      sexta: [],
    };

    const professoresAlocados = new Set();

    // Lista de dias para alocação
    const dias = ["segunda", "terca", "quarta", "quinta", "sexta"];

    // Ordena os dias pelo número atual de professores alocados
    const alocarEmDiaMenosLotado = () => {
      const diasOrdenados = dias.sort(
        (a, b) => cronogramaTemp[a].length - cronogramaTemp[b].length
      );
      return diasOrdenados[0];
    };

    professores.forEach((professor) => {
      if (!professoresAlocados.has(professor.id)) {
        const diaMenosLotado = alocarEmDiaMenosLotado();
        cronogramaTemp[diaMenosLotado].push(professor);
        professoresAlocados.add(professor.id);
      }
    });

    cronograma.value = cronogramaTemp;
  } catch (error) {
    console.error("Erro ao carregar professores:", error);
  }
};

const carregarSalas = async () => {
  try {
    const response = await axios.get("http://localhost:8080/sala");
    salasDisponiveis.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar as salas disponíveis:", error);
  }
};

onMounted(() => {
  carregarProfessores();
  carregarSalas();
  // Define "Segunda" como o dia inicializado
  diaSelecionado.value = "Segunda";
});

const abrirTabela = (dia) => {
  if (!diaSelecionado.value || diaSelecionado.value !== dia) {
    diaSelecionado.value = dia;
  }
};

const abrirModalSala = (professor, dia) => {
  if (!diaSelecionado.value) {
    alert("Por favor, selecione um dia primeiro.");
    return;
  }
  professorSelecionado.value = professor;
  diaSelecionado.value = dia;
  salaSelecionada.value = professor.sala || "";
  modalSalaAberto.value = true;
};

const fecharModalSala = () => {
  modalSalaAberto.value = false;
  professorSelecionado.value = null;
  salaSelecionada.value = "";
};

const adicionarSala = () => {
  if (!salaSelecionada.value) {
    alert("Por favor, selecione uma sala.");
    return;
  }

  professorSelecionado.value.sala = salaSelecionada.value;

  fecharModalSala();
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

.dias-semana
  display: flex
  justify-content: space-between
  margin-bottom: 20px

.dia-coluna
  width: 100px
  text-align: center

.botao-dia
  padding: 10px 15px
  background-color: #d1d1d1
  color: #2a3d73
  border: none
  border-radius: 5px
  cursor: pointer

.botao-dia:hover
  transform: scale(1.05)
  color: #fafafa
  background-color: #2a3d73
  text-shadow: 0px 0px 3px rgba(255, 255, 255, 1)

.botao-dia-selecionado
  background-color: #2a3d73
  color: white
  font-weight: bold

.titulo
  color: #2a3d73
  font-weight: bold
  text-align: center
  font-size: 24px
  margin-bottom: 20px

.lista-professores-selecionados
  width: 100%
  margin-top: 20px
  overflow-y: auto
  border: 1px solid transparentize(#2a3d73, 0.8)
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1)
  display: flex
  flex-direction: column

.v-list
  background-color: #f0f0f0

.v-list-item
  background-color: #f0f0f0
  color: black
  border: 1px solid #ddd
  border-radius: 4px
  margin-bottom: 5px
  padding: 10px

.professor-item
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px
  background-color: #fafafa
  border-radius: 4px
  margin-bottom: 5px
  border: 1px solid #ddd
  width: 100%
  box-sizing: border-box

.modal
  color: #2a3d73
  background-color: #fff
  padding: 25px
  border-radius: 10px
  overflow-y: auto
  display: flex
  flex-direction: column
  align-items: center

input[type="checkbox"]
  margin-right: 10px
  color: #2a3d73
</style>

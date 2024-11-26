import { createRouter, createWebHistory } from 'vue-router'
import LayoutInicio from '@/components/Layout/LayoutInicio.vue'
import LayoutProfessores from '@/components/Layout/LayoutProfessores.vue'
import LayoutMateria1 from '@/components/Layout/LayoutMateria1.vue'
import LayoutSalas from '@/components/Layout/LayoutSalas.vue'
import LayoutCalendarioS from '@/components/Layout/LayoutCalendarioS.vue'
import LayoutVisualizacao from '@/components/Layout/LayoutVisualizacao.vue'


const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: LayoutInicio
  },
  {
    path: '/professores',
    name: 'Cadastro Professor',
    component: LayoutProfessores
  },
  {
    path: '/materia',
    name: 'Cadastro Materia',
    component: LayoutMateria1
  },
  {
    path: '/salas',
    name: 'Cadastro Salas',
    component: LayoutSalas
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: LayoutCalendarioS
  },
  {
    path: '/calendario-Visualizacao',
    name: 'Visualização Calendario',
    component: LayoutVisualizacao
  },

  ]
  
  // Criação do Vue Router com o histórico de navegação
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Utiliza o histórico da web
    routes // A lista de rotas definidas
  })
  
  export default router
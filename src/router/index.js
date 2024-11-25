import { createRouter, createWebHistory } from 'vue-router'
import LayoutInicio from '@/components/Layout/LayoutInicio.vue'
import LayoutProfessores from '@/components/Layout/LayoutProfessores.vue'
import LayoutMateria from '@/components/Layout/LayoutMateria.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: LayoutInicio
  },
  {
    path: '/professores',  // A rota para "Cadastro Professor"
    name: 'Cadastro Professor',
    component: LayoutProfessores
  },
  {
    path: '/materia',
    name: 'Cadastro Materia',
    component: LayoutMateria
  },

  ]
  
  // Criação do Vue Router com o histórico de navegação
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Utiliza o histórico da web
    routes // A lista de rotas definidas
  })
  
  export default router
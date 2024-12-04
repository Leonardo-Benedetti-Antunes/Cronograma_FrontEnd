import { createRouter, createWebHistory } from 'vue-router'
import pagInicial from "@/views/pagInicial.vue"
import PagCalendario from '@/views/pagCalendario.vue'
import PagVisualizacao from '@/views/pagVisualizacao.vue'
import PagProfessor from '@/views/pagProfessor.vue'
import PagSala from '@/views/pagSala.vue'
import PagCurso from '@/views/pagCurso.vue'
import PagMateria from '@/views/pagMateria.vue'


const routes = [
    
    {
      path: '/',
      name: 'Inicio',
      component: pagInicial
    },
    {
      path: '/calendario',
      name: 'Calendario',
      component: PagCalendario
    },
    {
      path: '/calendario-visualizacao-cronograma',
      name: 'Calendario-visualizacao',
      component: PagVisualizacao
    },
    {
      path: '/cadastro-professor',
      name: 'Professor',
      component: PagProfessor
    },
    {
      path: '/cadastro-sala',
      name: 'Sala',
      component: PagSala
    },
    {
      path: '/cadastro-curso',
      name: 'Curso',
      component: PagCurso,
    },
    {
      path: '/cadastro-materia',
      name: 'Materia',
      component: PagMateria
    }
  ];
    
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes
    })
    
    export default router
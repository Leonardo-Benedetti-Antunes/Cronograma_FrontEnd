<template>
    <v-toolbar
      height="60"
      app
      density="comfortable"
      :elevation="8"
      class="custom-toolbar"
    >
    <!-- icone da Empresa -->
      <v-img
        :width="80"
        max-width="80"
        aspect-ratio="16/9"
        cover
        src="/logobranco.png"
        class="ma-4"
      ></v-img>

    <!-- Botoes de rota -->
      <router-link to="/" class="router-link">
          <v-btn @click="inicio" class="botao_routers">
            inicio
      </v-btn>
        </router-link>

        <router-link to="/calendario" class="router-link">
          <v-btn @click="calendario" class="botao_routers">
            Calendario
      </v-btn>
        </router-link>
        
        <router-link to="/cadastro-professor" class="router-link">
          <v-btn @click="professor" class="botao_routers">
            Professor
      </v-btn>
        </router-link>

        <!-- <router-link to="/cadastro-curso" class="router-link">
          <v-btn @click="curso" class="botao_routers">
            Curso
      </v-btn>
        </router-link> -->

        <router-link to="/cadastro-sala" class="router-link">
          <v-btn @click="sala" class="botao_routers">
            Sala
      </v-btn>
        </router-link>

    </v-toolbar>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped lang="sass">
  .custom-toolbar
    background-color: #2a3d73  // Azul suave e harmonioso
    color: white
    transition: 0.3s ease-in-out
  
  .v-toolbar__title, .toolbar-title
    font-size: 16px
    font-weight: bold
    color: white
    margin-right: -900px

  // botao de rotas
  .botao_routers
    font-size: 14px
    font-weight: bold
    padding: 10px
    background-color: #2a3d73
    box-shadow: 0px 0px 5px rgba(20,30 ,70 ,0.3 )
    // animacao do botao
  .botao_routers:hover
    transform: scale(1.05)
    background-color: #2f3ff0
    text-shadow: 0px 1px 5px rgba(255,255,255,1 )
  
  // Estilização que remove a decoracao do router link
  .router-link
    margin-left: 5px  
    text-decoration: none
    color: white
    
  
  </style>
  
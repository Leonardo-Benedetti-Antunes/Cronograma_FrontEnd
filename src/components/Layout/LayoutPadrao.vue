<template>
    <v-toolbar
      height="60"
      app
      density="comfortable"
      :elevation="8"
      class="custom-toolbar"
    >
      <!-- Título "teste" à esquerda -->
        <v-img
          :width="80"
          max-width="80"
          aspect-ratio="16/9"
          cover
          src="/logobranco.png"
          class="ma-4"
        ></v-img>

        <!-- <v-btn color="primary" class="custom-button ma-4" @click="onLeftButtonClick">
          
          Voltar
        </v-btn> -->

       <!-- <v-btn color="primary" class="custom-button" @click="onLeftButtonClick">
           Agendas
        </v-btn> -->

       <!-- <text-h1 class="customTextProfessor ma-16">Professores</text-h1> -->
  
      <v-spacer></v-spacer>
  
      <!--<v-btn icon fab color="white" class="perfil-button" @click="onRightButtonClick">
        <v-icon color="primary" size="24">mdi-account</v-icon>
      </v-btn> -->
    </v-toolbar>
  </template>
  <!-- 
      const onLeftButtonClick = () => {
    alert('Botão da esquerda clicado!');
    }; 
  
  
  const onRightButtonClick = () => {
    alert('Botão circular da direita clicado!');
  };
    -->
  
  <script setup>
    
  </script>
  
  <style scoped lang="sass">
  .custom-toolbar
    background-color: #2b259f
    color: white
    transition: 0.3s ease-in-out
  
  .v-toolbar__title,
  .toolbar-title
    font-size: 16px
    font-weight: bold
    margin-right: -900px 
  
  .custom-button
    font-size: 14px
    background-color: #f9f9f9
    color: #000
    padding: 5px 15px
  
  .perfil-button
    background-color: white
    width: 20px 
    height: 20px 
    border-radius: 20%   
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2)  

  .customTextProfessor
    font-size: 24px
    font-weight: bold
  
  </style>
  
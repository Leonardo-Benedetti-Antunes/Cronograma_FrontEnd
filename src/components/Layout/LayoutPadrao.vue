<template>
  <v-toolbar
    height="60"
    app
    density="comfortable"
    :elevation="8"
    class="custom-toolbar"
  >
  
    <v-img
      :width="80"
      max-width="80"
      aspect-ratio="16/9"
      cover
      src="/logobranco.png"
      class="ma-4"
    ></v-img>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script setup>

</script>

<style scoped lang="sass">
.custom-toolbar
  background-color: #2a3d73  // Azul suave e harmonioso
  color: white
  transition: 0.3s ease-in-out

.v-toolbar__title,
.toolbar-title
  font-size: 16px
  font-weight: bold
  color: white
  margin-right: -900px // Ajuste da posição se necessário

.custom-button
  font-size: 14px
  background-color: #e0e0e0 // Cor suave para os botões
  color: #2a3d73 // Azul harmonioso para o texto
  padding: 5px 15px
  border-radius: 4px
  transition: background-color 0.3s ease

.custom-button:hover
  background-color: #d1d1d1 // Efeito de hover suave

.perfil-button
  background-color: #ffffff // Perfil em branco para destacar
  width: 32px
  height: 32px
  border-radius: 50%
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) // Sombras mais suaves

.customTextProfessor
  font-size: 24px
  font-weight: bold
  color: #2a3d73 // Azul suave
  margin-left: 16px
  transition: color 0.3s ease
</style>

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
    <router-link to="/" class="router-link">
        <v-btn @click="retornaInicio" class="botao_inicio">
          inicio
    </v-btn>
      </router-link>

    <router-link to="/professores" class="router-link">
      <v-btn @click="retornaInicio" class="botao_inicio">
          professores
      </v-btn>
    </router-link>

    <router-link to="/materia" class="router-link">
      <v-btn @click="retornaInicio" class="botao_inicio">
          materia
      </v-btn>
    </router-link>

    <router-link to="/salas" class="router-link">
      <v-btn @click="retornaInicio" class="botao_inicio">
          Salas
      </v-btn>
    </router-link>

    <router-link to="/calendario" class="router-link">
      <v-btn @click="retornaInicio" class="botao_inicio">
          Calendario
      </v-btn>
    </router-link>

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

.botao_inicio
  font-size: 14px
  font-weight: bold
  padding: 10px
  background-color: #2a3d73
  box-shadow: 0px 0px 5px rgba(20,30 ,70 ,0.3 )
  
.botao_inicio:hover
  transform: scale(1.05)
  background-color: #2f3ff0
  text-shadow: 0px 1px 5px rgba(255,255,255,1 )

.router-link
  margin-left: 5px  
  text-decoration: none
  color: white
  

</style>

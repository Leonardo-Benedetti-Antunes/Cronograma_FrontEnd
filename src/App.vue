<template>
  <v-app class="customColor">
    <v-main>
       <LayoutPadrao/>
       <LayoutMateria/>
    </v-main>
    
  </v-app>
</template>

<script setup>
import LayoutPadrao from './components/Layout/LayoutPadrao.vue';


</script>

<style scoped lang="sass">
  .customColor
    background-color: #b9b9d9
</style>

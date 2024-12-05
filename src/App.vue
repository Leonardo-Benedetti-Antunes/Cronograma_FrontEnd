<template>
  <v-app class="customColor">
    <v-main>
      <layout/>
      <router-view/>
    </v-main>
    <rodape/>
  </v-app>
</template>

<script setup>
  import Layout from './layouts/Layout.vue';
  import rodape from './layouts/rodape.vue';
</script>

<style scoped lang="sass">
  .customColor
    background-color: #b9b9d9
</style>

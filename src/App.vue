<template>
  <v-app class="customColor">
    <v-main>
      <layout/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import Layout from './layouts/Layout.vue';
</script>

<style scoped lang="sass">
  .customColor
    background-color: #b9b9d9
</style>

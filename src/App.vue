<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container fluid>
        <Atendimento/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Atendimento from "./components/Atendimento.vue";
export default {
  components: {
    Navbar,
    Atendimento
  }
};
</script>

<style>
</style>

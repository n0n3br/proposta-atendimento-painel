<template>
  <span class="ml-5">
    <v-menu bottom open-on-hover offset-x>
      <template v-slot:activator="{on, attrs}">
        <span v-on="on" v-bind="attrs">
          <v-icon>mdi-eye</v-icon>
          <span class="ml-1 caption mr-2">{{empregados.length.toLocaleString()}}</span>
        </span>
      </template>
      <v-list two-line subheader>
        <v-subheader inset>Visualizando</v-subheader>
        <v-list-item v-for="empregado in empregados" :key="empregado">
          <v-list-item-avatar>
            <v-icon large>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Fulano {{empregado}}</v-list-item-title>
            <v-list-item-subtitle>c000000</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>
<script>
export default {
  data() {
    return { empregados: [] };
  },
  mounted() {
    this.empregados = Array.from(Array(Math.floor(Math.random() * 3 + 1))).map(
      (_, i) => i
    );
  }
};
</script>
<style scoped>
</style>


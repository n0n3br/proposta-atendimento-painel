<template>
  <Fragment>
    <v-row>
      <v-col cols="6">
        <h2>
          Rogério Luiz Aques de Amorim
          <span class="caption ml-2">790.152.551.72</span>
        <ClienteAtendimento />
        </h2>
      </v-col>

      <v-col cols="6" class="text-right">
        <h2>7648 CESAV/FO</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn x-small color="warning">Pessoa Física</v-btn>
        <v-btn x-small color="warning">Aposentado</v-btn>
        <v-btn x-small color="warning">Servidor Público</v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn x-small color="teal" dark>Nme da Fila 1</v-btn>
        <v-btn x-small color="teal" dark>Nome da Fila 2</v-btn>
        <v-btn x-small color="teal" dark>Nome da Fila 3</v-btn>
      </v-col>
    </v-row>
  </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import ClienteAtendimento from './ClienteAtendimento.vue'
export default {
  components: {
    Fragment,
    ClienteAtendimento
  }
};
</script>
<style scoped>
.shrink {
  flex-grow: 0;
}
.col {
  padding-bottom: 0;
  padding-top: 0;
}
.v-btn.v-size--x-small {
  margin-right: 5px;
}
</style>

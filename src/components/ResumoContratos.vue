<template>
  <v-list class="d-flex" two-line>
    <v-list-item class="col-4" v-for="item in resumo" :key="item.valor">
      <v-list-item-avatar>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <a class="text-h5" v-on="on" @click="selecionarTodos(item.valor)">{{item.total}}</a>
          </template>
          <span>Total</span>
        </v-tooltip>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>{{item.icone}}</v-icon>
          {{item.texto}}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-row>
            <v-col>
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <a v-on="on" @click="selecionarEmAtraso(item.valor)">{{item.atraso}}</a>
                </template>
                <span>Total</span>
              </v-tooltip>
            </v-col>
            <v-col>
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <span v-on="on">{{item.selecionado}}</span>
                </template>
                <span>Selecionados</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import groupBy from "lodash/groupBy";
export default {
  data() {
    return {
      tipos: [
        { valor: "com", texto: "Comercial", icone: "mdi-currency-usd" },
        { valor: "hab", texto: "Habitação", icone: "mdi-home" },
        { valor: "car", texto: "C.C.", icone: "mdi-credit-card" }
      ],
      resumo: []
    };
  },
  props: { contratos: Array },
  methods: {
    selecionarTodos(tipo) {
      this.$emit("selecionar-todos", tipo);
    },
    selecionarEmAtraso(tipo) {
      this.$emit("selecionar-em-atraso", tipo);
    }
  },
  watch: {
    contratos: {
      handler(value) {
        const agrupado = groupBy(value, "IC_TIPO");
        this.resumo = Object.keys(agrupado).map(key => ({
          ...this.tipos.find(tipo => tipo.valor === key),

          selecionado: agrupado[key].filter(contrato => contrato.selecionado)
            .length,
          total: agrupado[key].length,
          atraso: agrupado[key].filter(contrato => contrato.QT_ATRASO).length
        }));
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #757575 !important;
}

.v-list-item__subtitle .col {
  text-align: center;
  padding: 2px;
  padding-top: 4px;
}
.v-list-item__title .v-icon {
  margin-right: 6px;
}
.v-list-item {
  margin-right: 6px;
  background-color: #f8f8f8;
  padding: 0 10px;
}
</style>
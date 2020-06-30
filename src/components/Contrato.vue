<template>
  <v-list :class="listItemClass">
    <v-list-item :dark="contrato.selecionado">
      <v-btn
        class="botao-action"
        fab
        x-small
        top
        right
        :color="contrato.selecionado ? 'orange lighten-2': 'grey'"
        :dark="!contrato.selecionado"
        @click="toogleSelect"
      >
        <v-icon>{{actionIcon}}</v-icon>
      </v-btn>
      <v-list-item-content>
        <v-list-item-title>
          <v-row>
            <v-col class="text-left">{{contrato.NU_CONTRATO_SIGA}}</v-col>
            <v-col class="text-right">
              <v-icon small>mdi-currency-usd</v-icon>
              {{contrato.NO_PRODUTO}}
            </v-col>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-row>
            <v-col>
              <v-btn
                x-small
                :color="!contrato.selecionado ? 'grey' : 'orange lighten-2'"
                dark
                :class="!contrato.selecionado ? '': 'elevation-0'"
                v-for="indicador in indicadores"
                :key="indicador"
              >Indicador {{indicador}}</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label :style="labelStyle">Dívida</label>
              <span>R$ {{contrato.VR_DIVIDA.toLocaleString()}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">Valor Contratado</label>
              <span>R$ {{contrato.VR_CONTRATO.toLocaleString()}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">Dias em Atraso</label>
              <span>{{contrato.QT_ATRASO.toLocaleString()}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label :style="labelStyle">Prazo</label>
              <span>{{contrato.NU_PRAZO.toLocaleString()}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">Remanescente</label>
              <span>{{contrato.PZ_REMANESCENTE.toLocaleString()}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">Posição</label>
              <span>{{contrato.DT_POSICAO.toISOString().slice(0,10).split('-').reverse().join('/')}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label :style="labelStyle">Sistema</label>
              <span>{{contrato.NO_SISTEMA}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">Base Cálculo</label>
              <span>R$ {{contrato.VR_BASE.toLocaleString()}}</span>
            </v-col>
            <v-col>
              <label :style="labelStyle">C.A.</label>
              <span>R$ {{contrato.VR_CA.toLocaleString()}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label :style="labelStyle">Taxa</label>
              <span>{{contrato.VR_TAXA.toLocaleString()}} %</span>
            </v-col>
            <v-col v-if="contrato.NO_CONVENENTE">
              <label :style="labelStyle">Convenente</label>
              <span>{{contrato.NO_CONVENENTE}}</span>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: {
    contrato: Object
  },
  data() {
    return {
      indicadores: []
    };
  },
  methods: {
    toogleSelect() {
      this.$emit("toogle-select", this.contrato.NU_CONTRATO);
    }
  },
  computed: {
    labelStyle() {
      return this.contrato.selecionado ? {} : { color: "grey lighten-2" };
    },
    actionIcon() {
      return this.contrato.selecionado ? "mdi-minus" : "mdi-plus";
    },
    listItemClass() {
      return this.contrato.selecionado ? "orange" : "grey lighten-4";
    }
  },
  mounted() {
    this.indicadores = Array.from(Array(Math.floor(Math.random() * 3 + 1))).map(
      (_, i) => i
    );
  }
};
</script>
<style scoped>
.v-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.col {
  padding-top: 4px;
  position: relative;
}
.col span {
  display: block;
  width: 100%;
}
.col label {
  position: absolute;
  bottom: 0;
  font-size: 10px;
  display: block;
  width: 100%;
}
.row .col:first-child,
.row .col:first-child > label {
  text-align: left;
}
.row .col:nth-child(2),
.row .col:nth-child(2) > label {
  text-align: center;
}
.row .col:nth-child(2) > label {
  padding-right: 24px;
}
.row .col:nth-child(3),
.row .col:nth-child(3) > label {
  text-align: right;
}
.row .col:nth-child(3) > label {
  padding-right: 24px;
}
.v-btn.v-size--x-small {
  margin-right: 5px;
}
.v-list-item {
  position: relative;
}
.botao-action {
  position: absolute;
  top: -25px;
  right: -20px;
  width: 30px;
  height: 30px;
}
</style>



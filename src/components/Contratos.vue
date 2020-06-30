<template>
  <Fragment>
    <template v-if="!atendimentoIniciado">
      <v-row>
        <v-col>
          <ResumoContratos
            :contratos="contratos"
            @selecionar-todos="selecionarTodos"
            @selecionar-em-atraso="selecionarEmAtraso"
          />
        </v-col>
        <v-col class="text-right">
          <v-row>
            <v-col class="col-switch-container">
              <label>Ordenação</label>
              <v-col class="col-switch">
                <v-switch hide-details label="Valor ↓" v-model="ordenacao.valor"></v-switch>
                <v-switch hide-details label="Dias em Atraso ↑" v-model="ordenacao.atraso"></v-switch>
              </v-col>
            </v-col>
          </v-row>
          <div>
            <v-btn small color="teal" dark class="mr-1" @click="selecionarTodos()">
              <v-icon small class="mr-1">{{iconeSelecionarTodos}}</v-icon>Todos
            </v-btn>
            <v-btn small color="teal" dark class="mr-1" @click="selecionarEmAtraso()">
              <v-icon small class="mr-1">mdi-check-box-outline</v-icon>Em atraso
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" small color="teal" dark @click="iniciarAtendimento">
                  <v-icon small class="mr-1">mdi-play</v-icon>Atendimento
                </v-btn>
              </template>
              <span>{{textoTooltipIniciarAtendimento}}</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </template>
    <transition-group name="flip-list" tag="div" class="row">
      <div :class="classeColunaContrato" v-for="contrato in lista" :key="contrato.NU_CONTRATO">
        <Contrato :contrato="contrato" @toogle-select="select" />
      </div>
    </transition-group>
  </Fragment>
</template>
<script>
import Contrato from "./Contrato.vue";
import ResumoContratos from "./ResumoContratos.vue";
import { Fragment } from "vue-fragment";
import orderBy from "lodash/orderBy";

export default {
  data() {
    return {
      filtros: {
        selecionados: false,
        atraso: false
      },
      ordenacao: {
        atraso: false,
        valor: false
      }
    };
  },
  components: {
    Contrato,
    Fragment,
    ResumoContratos
  },
  computed: {
    textoTooltipIniciarAtendimento() {
      if (this.atendimentoIniciado) return "O cliente já está em atendimento";
      if (Number(this.quantidadeSelecionados) === 0)
        return "Selecine um ou mais contratos para iniciar o atendimento";
      return "Iniciar atendimento";
    },
    iconeSelecionarTodos() {
      if (!this.contratos.every(contrato => contrato.selecionado))
        return "mdi-check-box-outline";
      return "mdi-checkbox-blank-outline";
    },
    classeColunaContrato() {
      return this.atendimentoIniciado ? "col col-6" : "col col-4";
    },
    quantidadeContratos() {
      return this.contratos.length.toLocaleString();
    },
    quantidadeSelecionados() {
      return this.lista
        .filter(contrato => contrato.selecionado)
        .length.toLocaleString();
    },
    quantidadeFiltrados() {
      return this.lista.length.toLocaleString();
    },
    quantidadeEmAtraso() {
      return this.lista
        .filter(contrato => contrato.QT_ATRASO > 0)
        .length.toLocaleString();
    },
    lista() {
      const orderArray = [["selecionado"], ["desc"]];
      if (this.ordenacao.valor) {
        orderArray[0].push("VR_DIVIDA");
        orderArray[1].push("desc");
      }
      if (this.ordenacao.atraso) {
        orderArray[0].push("QT_ATRASO");
        orderArray[1].push("asc");
      }
      const lista = orderBy(
        this.contratos.filter(contrato => {
          return (
            (!this.filtros.selecionados ||
              (this.filtros.selecionados && contrato.selecionado)) &&
            (!this.filtros.atraso ||
              (this.filtros.atraso && contrato.QT_ATRASO > 0))
          );
        }),
        ...orderArray
      );

      return lista;
    }
  },
  methods: {
    iniciarAtendimento() {
      if (Number(this.quantidadeSelecionados) === 0) return;
      if (this.atendimentoIniciado) return;
      this.$emit("iniciar-atendimento");
    },
    selecionarTodos(tipo = "") {
      const contratos = this.contratos.filter(
        contrato => !tipo || contrato.IC_TIPO === tipo
      );
      if (contratos.every(contrato => contrato.selecionado)) {
        contratos.forEach(contrato => {
          this.$emit("select", contrato.NU_CONTRATO);
        });
        return;
      }
      contratos
        .filter(contrato => !contrato.selecionado)
        .forEach(contrato => {
          this.$emit("select", contrato.NU_CONTRATO);
        });
    },
    selecionarEmAtraso(tipo = "") {
      const contratos = this.contratos.filter(
        contrato => !tipo || contrato.IC_TIPO === tipo
      );
      contratos
        .filter(contrato => !contrato.selecionado && contrato.QT_ATRASO)
        .forEach(contrato => {
          this.$emit("select", contrato.NU_CONTRATO);
        });
      contratos
        .filter(contrato => contrato.selecionado && !contrato.QT_ATRASO)
        .forEach(contrato => {
          this.$emit("select", contrato.NU_CONTRATO);
        });
    },
    select(NU_CONTRATO) {
      this.$emit("select", NU_CONTRATO);
    },
    selectAll() {
      this.contratos
        .filter(contrato => !contrato.selecionado)
        .forEach(contrato => this.select(contrato.NU_CONTRATO));
    }
  },
  created() {},
  watch: {
    "ordenacao.valor"(value) {
      if (value) this.ordenacao.atraso = false;
    },
    "ordenacao.atraso"(value) {
      if (value) this.ordenacao.valor = false;
    },
    quantidadeSelecionados() {
      this.$emit(
        "selecao",
        this.contratos.filter(contrato => contrato.selecionado)
      );
    }
  },
  props: {
    atendimentoIniciado: Boolean,
    contratos: Array
  }
};
</script>
<style scoped>
.flip-list-move {
  transition: transform 0.2s;
}
.col-switch {
  padding-top: 0;
  display: flex;
}
.col-switch-container {
  position: relative;
  padding: 0;
}
.col-switch-container label {
  position: absolute;
  top: -15px;
  color: #ccc;
  font-size: 10px;
}
.col-switch-container:last-child .col-switch {
  justify-content: flex-end;
}
.col-switch-container:first-child label {
  left: 15px;
}
.col-switch-container:last-child label {
  right: 35px;
}
.v-input--switch {
  margin: 0;
  margin-right: 10px;
}
.col-info {
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-input--switch >>> label {
  font-size: 14px;
}
</style>


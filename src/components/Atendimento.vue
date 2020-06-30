<template>
  <Fragment>
    <Cliente />
    <v-divider class="mt-2 mb-2"></v-divider>
    <Contatos :contatos="contatos" @add="adicionarContato" @favorite="favoritarContato" />
    <v-divider></v-divider>
    <v-row>
      <v-col :cols="colContratos">
        <Contratos
          @select="selectContrato"
          :atendimentoIniciado="atendimentoIniciado"
          :contratos="contratos"
          @iniciar-atendimento="iniciarAtendimento"
        />
      </v-col>
      <v-col :cols="colHistoricoAtendimento">
        <template v-if="atendimentoIniciado">
          <FormAtendimento
            :contratos="contratosSelecionados"
            @select="selectContrato"
            @cancel="atendimentoIniciado=false"
            :contatos="contatos"
          />
          <v-divider class="mt-4"></v-divider>
        </template>
        <Historico />
      </v-col>
    </v-row>
  </Fragment>
</template>
<script>
import Cliente from "./Cliente.vue";
import Contatos from "./Contatos.vue";
import Contratos from "./Contratos.vue";
import Historico from "./Historico.vue";
import FormAtendimento from "./FormAtendimento.vue";

import { Fragment } from "vue-fragment";

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  data() {
    return {
      atendimentoIniciado: false,
      contratos: [],
      contatos: [
        {
          NU_CONTATO: new Date().valueOf(),
          NO_TIPO: "email",
          DE_CONTATO: "rogeriol@gmail.com",
          DH_ATUALIZACAO: new Date().toISOString().slice(0, 19)
        }
      ]
    };
  },
  components: {
    Cliente,
    Contatos,
    Fragment,
    Contratos,
    Historico,
    FormAtendimento
  },
  computed: {
    textoTooltipFab() {
      return this.atendimentoIniciado
        ? "Salvar"
        : !this.podeIniciar
        ? "Selecione 1 ou mais contratos para iniciar atendimento"
        : "Iniciar Atendimento";
    },
    contratosSelecionados() {
      return this.contratos.filter(contrato => contrato.selecionado);
    },
    iconeFab() {
      return !this.atendimentoIniciado ? "mdi-play" : "mdi-content-save";
    },
    textoFab() {
      return !this.atendimentoIniciado ? "Iniciar Atendimento" : "Salvar";
    },
    corFab() {
      return !this.atendimentoIniciado ? "orange" : "red";
    },
    colHistoricoAtendimento() {
      if (!this.atendimentoIniciado) return 3;
      return 6;
    },
    colContratos() {
      if (!this.atendimentoIniciado) return 9;
      return 6;
    },
    podeIniciar() {
      return this.contratosSelecionados.length;
    }
  },
  methods: {
    adicionarContato(contato) {
      this.contatos = [...this.contatos, contato];
    },
    favoritarContato(NU_CONTATO) {
      this.contatos = this.contatos.map(contato => ({
        ...contato,
        IC_FAVORITO:
          contato.NU_CONTATO === NU_CONTATO ? !contato.IC_FAVORITO : false
      }));
    },
    selectContrato(NU_CONTRATO) {
      this.contratos = this.contratos.map(contrato => ({
        ...contrato,
        selecionado:
          contrato.NU_CONTRATO === NU_CONTRATO
            ? !contrato.selecionado
            : contrato.selecionado
      }));
    },
    iniciarAtendimento() {
      console.log("atendimento iniciado");
      this.atendimentoIniciado = true;
    }
  },
  created() {
    this.contratos = Array.from(Array(10)).map((_, i) => ({
      NU_CONTRATO: i,
      NU_CONTRATO_SIGA: `3920.110.${String(i + getRandom(0, 1000)).padStart(
        6,
        "0"
      )}-00`,
      IC_TIPO: "com",
      NO_PRODUTO: "Crédito Consignado",
      VR_DIVIDA: getRandom(1000, 100000),
      VR_CONTRATO: getRandom(1000, 100000),
      QT_ATRASO: getRandom(0, 365),
      NU_PRAZO: getRandom(24, 48),
      PZ_REMANESCENTE: getRandom(24, 48),
      DT_POSICAO: new Date(),
      NO_SISTEMA: "SIAPI",
      VR_BASE: getRandom(1000, 100000),
      VR_CA: getRandom(1000, 100000),
      VR_TAXA: getRandom(1, 10),
      NO_CONVENENTE: null,
      selecionado: false
    }));
  },
  watch: {
    contratosSelecionados() {
      if (!this.contratosSelecionados.length) this.atendimentoIniciado = false;
    }
  }
};
</script>
<style scoped>
.hide {
  max-width: 0;
  opacity: 0;
  transition: 0.2s all;
}
.v-btn:hover > span > span {
  opacity: 1;
  max-width: 100%;
}
.botao-atendimento {
  transition: 0.1s all;
}
.botao-atendimento span {
  width: 0;
  max-width: 0;
  opacity: 0;
}
.botao-atendimento:hover {
  width: auto;
  border-radius: 64px;
  padding: 0 10px;
}
.botao-atendimento:hover span {
  width: auto;
  max-width: 100%;
  opacity: 1;
}
button.botao-atendimento.v-btn.v-btn--bottom.v-btn--contained.v-btn--disabled.v-btn--fab.v-btn--fixed.v-btn--right.v-btn--round.theme--dark.v-size--large {
  opacity: 0.6 !important;
  background-color: #ff9800 !important;
  pointer-events: auto;
}
</style>



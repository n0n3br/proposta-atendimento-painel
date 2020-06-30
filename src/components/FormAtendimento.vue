<template>
  <v-card flat>
    <v-card-title>
      <h2>Registrar Atendimento</h2>
      <v-spacer></v-spacer>
      <v-btn icon @click="cancelar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-chip
            v-for="contrato in contratos"
            close
            color="orange"
            class="mr-2"
            outlined
            :key="contrato.NU_CONTRATO"
            @click:close="removerContrato(contrato)"
          >{{contrato.NU_CONTRATO_SIGA}}</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="Conseguiu atendimento ?"
            v-model="conseguiuAtendimento.resposta"
            :items="conseguiuAtendimento.opcoes"
            hide-details
          ></v-select>
        </v-col>
        <v-col v-if="nomeContato.required || dataRetorno.required">
          <v-text-field
            v-if="nomeContato.required"
            hide-details
            v-model="nomeContato.resposta"
            label="Nome"
          ></v-text-field>
          <v-menu
            v-if="dataRetorno.required"
            ref="menu.dataRetorno"
            v-model="menu.dataRetorno"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dataRetorno.texto"
                label="Data de Retorno"
                prepend-icon="mdi-calendar-plus"
                v-bind="attrs"
                @blur="atribuiData('dataRetorno')"
                v-on="on"
                hide-details
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataRetorno.valor"
              no-title
              required
              @input="menu.dataRetorno=false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="Qual a forma de contato ?"
            v-model="formaContato.resposta"
            :items="formaContato.opcoes"
            hide-details
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            hide-details
            v-model="formaContato.valor"
            :items="contatosFiltrados"
            item-text="DE_CONTATO"
            item-value="NU_CONTATO"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="Qual o motivo do contato ?"
            v-model="motivo.resposta"
            :items="motivo.opcoes"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="Qual a resposta do Cliente ?"
            v-model="respostaCliente.resposta"
            :items="respostaCliente.opcoes"
            hide-details
          ></v-select>
        </v-col>
        <v-col v-if="dataPagamento.required">
          <v-menu
            v-if="dataPagamento.required"
            ref="menu.dataRetorno"
            v-model="menu.dataPagamento"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dataPagamento.texto"
                label="Data de Pagamento/Promessa"
                prepend-icon="mdi-calendar-plus"
                v-bind="attrs"
                @blur="atribuiData('dataPagamento')"
                v-on="on"
                hide-details
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataPagamento.valor"
              no-title
              required
              @input="menu.dataPagamento=false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Observação" v-model="observacao" hide-details></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="cancelar">
        <v-icon class="mr-2">mdi-close</v-icon>Cancelar
      </v-btn>
      <v-btn color="teal" dark @click="cancelar">
        <v-icon class="mr-2">mdi-check</v-icon>Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      dataRetorno: { valor: "", texto: "", required: false },
      dataPagamento: { valor: "", texto: "", required: false },
      menu: {},
      nomeContato: {
        resposta: "",
        disabled: false,
        required: false
      },
      conseguiuAtendimento: {
        resposta: "",
        opcoes: [
          "Não, o contato não atendeu",
          "Não, contato errado",
          "Sim, retornar outro dia",
          "Sim, com o cliente",
          "Sim, deixei recado com ..."
        ]
      },
      formaContato: {
        resposta: "",
        valor: "",
        opcoes: ["Email", "Telefone", "Whatsapp", "Visita"]
      },
      motivo: {
        resposta: "",
        opcoes: [
          "Chat",
          "Cobrança/Lista cobrança",
          "Fale Conosco",
          "Ouvidoria",
          "Retorno email",
          "Retorno ligação",
          "SAC"
        ]
      },
      respostaCliente: {
        resposta: "",
        opcoes: [
          "Falecido/Falência",
          "Não vai pagar",
          "Já pagou",
          "Vai pagar",
          "Vai procurar Agência"
        ]
      }
    };
  },
  props: {
    contratos: Array,
    contatos: Array
  },
  methods: {
    atribuiData(campo) {
      this[campo].valor = this[campo].texto
        .split("/")
        .reverse()
        .join("-");
    },
    cancelar() {
      this.$emit("cancel");
    },
    removerContrato(contrato) {
      this.$emit("select", contrato.NU_CONTRATO);
    }
  },
  computed: {
    contatosFiltrados() {
      const formaContato = this.formaContato.resposta;
      return this.contatos.filter(
        contato =>
          (formaContato === "Email" && contato.NO_TIPO === "email") ||
          (["Telefone"].includes(formaContato) &&
            ["telefone", "celular"].includes(contato.NO_TIPO)) ||
          (formaContato === "Whatsapp" && contato.NO_TIPO === "celular")
      );
    }
  },
  watch: {
    "dataRetorno.valor"(valor) {
      if (!valor) this.dataRetorno.texto = "";
      this.dataRetorno.texto = valor
        .split("-")
        .reverse()
        .join("/");
    },
    "dataPagamento.valor"(valor) {
      if (!valor) this.dataPagamento.texto = "";
      this.dataPagamento.texto = valor
        .split("-")
        .reverse()
        .join("/");
    },
    "conseguiuAtendimento.resposta"(valor) {
      this.dataRetorno.valor =
        valor !== "Sim, retornar outro dia" ? "" : this.dataRetorno.valor;
      valor !== "Sim, retornar outro dia" ? "" : this.dataRetorno.valor;
      this.dataRetorno.required = valor === "Sim, retornar outro dia";
      this.nomeContato.required = valor === "Sim, deixei recado com ...";
      this.nomeContato.resposta =
        valor !== "Sim, deixei recado com ..." ? "" : this.nomeContato.valor;
    },
    "respostaCliente.resposta"(valor) {
      this.dataPagamento.required = ["Já pagou", "Vai pagar"].includes(valor);
      this.dataPagamento.valor = ["Já pagou", "Vai pagar"].includes(valor)
        ? this.dataPagamento.valor
        : "";
    }
  }
};
</script>
<style scoped>
</style>
; ''
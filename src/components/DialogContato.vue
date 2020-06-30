<template>
  <v-dialog v-model="aberto" width="500" persistent>
    <v-card>
      <v-card-title>
        <h5>Adicionar Contato</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="fechar">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="col-icone">
            <v-avatar>
              <v-icon>{{icone}}</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <v-select
              v-model="tipo"
              :items="tipos"
              item-value="valor"
              item-text="texto"
              label="Tipo"
            ></v-select>
            <v-text-field
              v-model="valor"
              autofocus
              :error="!valido"
              :error-messages="mensagemErro"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" text @click="fechar">Cancelar</v-btn>
        <v-btn color="teal" dark :disabled="!podeSalvar" @click='salvar'>Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      aberto: true,
      tipo: "celular",
      valor: "",
      tipos: [
        { texto: "Celular", valor: "celular" },
        { texto: "Email", valor: "email" },
        { texto: "Telefone", valor: "telefone" }
      ]
    };
  },
  computed: {
    valido() {
      switch (this.tipo) {
        case "email":
          return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(this.valor);
        case "telefone":
          return /\d+/g.test(this.valor) && this.valor.length === 10;
        case "celular":
          return /\d+/g.test(this.valor) && this.valor.length === 11;
        default:
          return false;
      }
    },
    mensagemErro() {
      if (this.valido || !this.tipo) return "";
      if (this.tipo === "email") return "Email inválido";
      if (this.tipo === "celular")
        return "Celular Inválido. Use 11 dígitos númericos";
      return "Telefone Inválido. Use 10 dígitos númericos";
    },
    podeSalvar() {
      return this.tipo && this.valor && this.valido;
    },
    icone() {
      switch (this.tipo) {
        case "email":
          return "mdi-email";
        case "celular":
          return "mdi-cellphone";
        default:
          return "mdi-phone";
      }
    }
  },
  methods: {
    salvar() {
      this.$emit('salvar', { NO_TIPO: this.tipo, DE_CONTATO: this.valor })
    },
    fechar() {
      this.$emit("fechar");
    }
  }
};
</script>
<style scoped>
.col-icone {
  flex-grow: 0;
}
</style>



<template>
  <Fragment>
    <div class="contacts-container">
      <div class="list-container">
        <transition-group
          tag="div"
          class="v-list v-sheet theme--light v-list--subheader v-list--two-line d-flex"
          name="flip-list"
        >
          <Contato
            v-for="contato in contatosOrdenados"
            :key="contato.NU_CONTATO"
            :contato="contato"
            @favorite="favorite"
          />
        </transition-group>
      </div>
      <div class="mr-2 ml-2">
        <v-btn fab color="orange" dark small @click="dialog=true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <DialogContato v-if="dialog" @fechar="dialog=false" @salvar="add"/>
  </Fragment>
</template>
<script>
import Contato from "./Contato.vue";
import DialogContato from "./DialogContato.vue";
import { Fragment } from "vue-fragment";
import orderBy from "lodash/orderBy";
export default {
  components: { Contato, DialogContato, Fragment },
  props: { contatos: Array },
  computed: {
    contatosOrdenados() {
      return orderBy(this.contatos, "IC_FAVORITO", 'desc');
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    add(contato) {
      this.$emit("add", {
        ...contato,
        NU_CONTATO: new Date().valueOf(),
        DH_ATUALIZACAO: new Date().toISOString().slice(0, 19)
      });
      this.dialog = false;
    },

    favorite(NU_CONTATO) {
      this.$emit("favorite", NU_CONTATO);
    }
  }
};
</script>
<style scoped>
.contacts-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.list-container {
  flex-grow: 1;
  overflow-x: auto;
}
.v-list {
  display: flex;
  justify-content: start;
}
.v-list-item {
  width: 300px;
  max-width: 300px;
  margin-right: 10px;
  background-color: #f8f8f8;
}
.flip-list-move {
  transition: transform 0.2s;
}
</style>

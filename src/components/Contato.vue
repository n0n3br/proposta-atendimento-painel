<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="grey lighten-1 white--text">{{icone}}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{contato.DE_CONTATO}}</v-list-item-title>
      <v-list-item-subtitle>{{dataAtualizacao}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click='setFavorito'>
        <v-icon color='amber'>{{iconeFavorito}}</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
export default {
  props: { contato: Object},
  methods:{
    setFavorito() { 
      this.$emit('favorite', this.contato.NU_CONTATO)
    },
  },
computed: { 
  dataAtualizacao() { 
    if (!this.contato.DH_ATUALIZACAO) return ''
    return this.contato.DH_ATUALIZACAO.split('T')[0].split('-').reverse().join('/') + ' ' + this.contato.DH_ATUALIZACAO.split('T')[1]
  },
  icone() { 
    if (this.contato.NO_TIPO === 'email') return 'mdi-email';
    if (this.contato.NO_TIPO === 'celular') return 'mdi-cellphone';
    return 'mdi-phone'
},  
  iconeFavorito() {
    return this.contato.IC_FAVORITO ? 'mdi-star' : 'mdi-star-outline' 
  }
}
}
</script>
<style scoped>
</style>

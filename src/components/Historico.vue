<template>
  <v-card flat>
    <v-card-title>
      <h4 class="text-center title">Histórico de Atendimento</h4>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="search" label="Pesquisar" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-timeline :align-top="true" :dense="true" :reverse="false">
            <v-timeline-item v-for="n in 10" :key="n" icon="mdi-clock">
              <template v-slot:icon>
                <v-avatar v-if="false">
                  <img src="http://i.pravatar.cc/64" />
                </v-avatar>
              </template>
              <span slot="opposite">Tus eu perfecto</span>
              <v-card class="elevation-2">
                <v-card-title class="subtitle-2">Não Vai Pagar</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <span class="caption">27/06/2020 14:00:00</span>
                    </v-col>
                    <v-col class="shrink">
                      <a class="caption" href="#">c134175</a>
                    </v-col>
                  </v-row>
                  <p>Observação do oreia Observação do oreia Observação do oreia Observação do oreia</p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: ""
    };
  }
};
</script>
<style scoped>
.v-card__title {
  padding: 16px;
}
.v-card__text {
  padding: 16px;
  padding-top: 0;
}
.shrink {
  flex-grow: 0;
}
.col {
  padding: 0 10px;
}
a {
  text-decoration: none;
}
</style>


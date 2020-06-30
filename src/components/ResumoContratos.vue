<template>
    <v-list class="d-flex" two-line>
        <v-list-item class="col-3" v-for="item in resumo" :key="item.valor">
            <v-list-item-avatar>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon class="grey lighten-1 white--text" v-on="on">{{
                            item.icone
                        }}</v-icon>
                    </template>
                    <span>{{ item.texto }}</span>
                </v-tooltip>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <a v-on="on" @click="selecionarTodos(item.valor)"
                                ><span v-if="tipoSoma">{{
                                    item.total | int
                                }}</span
                                ><span v-else>{{ item.total | moeda }}</span>
                            </a>
                        </template>
                        <span>Total</span>
                    </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <v-row>
                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <a
                                        v-on="on"
                                        class="red--text"
                                        @click="selecionarEmAtraso(item.valor)"
                                    >
                                        <span v-if="tipoSoma">
                                            {{ item.atraso | int }}
                                        </span>
                                        <span v-else="">
                                            {{ item.atraso | moeda }}
                                        </span>
                                    </a>
                                </template>
                                <span>Em atraso</span>
                            </v-tooltip>
                        </v-col>
                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                        <span v-if="tipoSoma">
                                            {{ item.selecionado | int }}
                                        </span>
                                        <span v-else="">
                                            {{ item.selecionado | moeda }}
                                        </span>
                                    </span>
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
            tipoSoma: 0,
            tipos: [
                { valor: "com", texto: "Comercial", icone: "mdi-currency-usd" },
                { valor: "hab", texto: "Habitação", icone: "mdi-home" },
                { valor: "car", texto: "C.C.", icone: "mdi-credit-card" },
            ],
            resumo: [],
        };
    },
    computed: {
        labelSwitch() {
            return this.tipoSoma ? "Quantidade" : "Valor";
        },
    },
    props: { contratos: Array },
    methods: {
        selecionarTodos(tipo) {
            this.$emit("selecionar-todos", tipo !== "total" ? tipo : "");
        },
        selecionarEmAtraso(tipo) {
            this.$emit("selecionar-em-atraso", tipo !== "total" ? tipo : "");
        },
        montaResumo() {
            const agrupado = groupBy(this.contratos, "IC_TIPO");
            const resumo = Object.keys(agrupado).map((key) => ({
                ...this.tipos.find((tipo) => tipo.valor === key),

                selecionado: this.tipoSoma
                    ? agrupado[key].filter((contrato) => contrato.selecionado)
                          .length
                    : agrupado[key]
                          .filter((contrato) => contrato.selecionado)
                          .reduce(
                              (memo, contrato) => memo + contrato.VR_BASE,
                              0
                          ),
                total: this.tipoSoma
                    ? agrupado[key].length
                    : agrupado[key].reduce(
                          (memo, contrato) => memo + contrato.VR_BASE,
                          0
                      ),
                atraso: this.tipoSoma
                    ? agrupado[key].filter((contrato) => contrato.QT_ATRASO)
                          .length
                    : agrupado[key]
                          .filter((contrato) => contrato.QT_ATRASO)
                          .reduce(
                              (memo, contrato) => memo + contrato.VR_BASE,
                              0
                          ),
            }));
            resumo.unshift({
                texto: "Todos",
                icone: "mdi-file-document",
                valor: "total",
                selecionado: this.tipoSoma
                    ? this.contratos.filter((contrato) => contrato.selecionado)
                          .length
                    : this.contratos
                          .filter((contrato) => contrato.selecionado)
                          .reduce(
                              (memo, contrato) => memo + contrato.VR_BASE,
                              0
                          ),
                total: this.tipoSoma
                    ? this.contratos.length
                    : this.contratos.reduce(
                          (memo, contrato) => memo + contrato.VR_BASE,
                          0
                      ),
                atraso: this.tipoSoma
                    ? this.contratos.filter((contrato) => contrato.QT_ATRASO)
                          .length
                    : this.contratos
                          .filter((contrato) => contrato.QT_ATRASO)
                          .reduce(
                              (memo, contrato) => memo + contrato.VR_BASE,
                              0
                          ),
            });
            this.resumo = resumo;
        },
    },
    watch: {
        contratos: {
            handler() {
                this.montaResumo();
            },
            immediate: true,
        },
        tipoSoma: {
            handler() {
                this.montaResumo();
            },
        },
    },
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

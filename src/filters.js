import Vue from "vue";

Vue.filter("int", (value) =>
    Math.round(value).toLocaleString("pt-br", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
);

Vue.filter("float", (value) =>
    value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
);

Vue.filter("moeda", (value) =>
    value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
    })
);

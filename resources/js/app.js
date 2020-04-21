require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import Vue from "vue";

import Index from "./Index";

window.Vue = require("vue");

// Vue.component("example", require("./components/ExampleComponent.vue").default);

// Vue.component("example2", require("./components/Example2.vue").default);

Vue.use(VueRouter);

const app = new Vue({
    el: "#app",
    router,
    components: {
        appIndex: Index
    }
});

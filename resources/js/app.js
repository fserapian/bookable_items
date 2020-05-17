require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import moment from "moment";
import Vue from "vue";
import Vuex from "vuex";
import storeDefinition from "./store";

import Index from "./Index";
import StarRating from "./shared/components/StarRating";
import FatalError from "./shared/components/FatalError";
import ValidationErrors from "./shared/components/ValidationErrors";
import Success from "./shared/components/Success";

window.Vue = require("vue");

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("v-errors", ValidationErrors);
Vue.component("success", Success);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        appIndex: Index
    },
    async beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
});

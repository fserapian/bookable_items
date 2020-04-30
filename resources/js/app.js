require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import Vue from "vue";
import moment from "moment";

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

const app = new Vue({
    el: "#app",
    router,
    components: {
        appIndex: Index
    }
});

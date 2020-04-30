require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import Vue from "vue";
import moment from "moment";

import Index from "./Index";
import StarRating from "./shared/components/StarRating";
import FatalError from "./shared/components/FatalError";

window.Vue = require("vue");

// Vue.component("example", require("./components/ExampleComponent.vue").default);

// Vue.component("example2", require("./components/Example2.vue").default);

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.use(VueRouter);

const app = new Vue({
    el: "#app",
    router,
    components: {
        appIndex: Index
    }
});

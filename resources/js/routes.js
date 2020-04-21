import VueRouter from "vue-router";
import Bookables from "./Bookables/Bookables";
import ExampleComponent from "./components/ExampleComponent";

const routes = [
    {
        path: "/",
        component: Bookables,
        name: "home"
    },
    {
        path: "/second",
        component: ExampleComponent,
        name: "second"
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;

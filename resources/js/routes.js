import VueRouter from "vue-router";
import Bookables from "./Bookables/Bookables";
import Bookable from "./bookable/Bookable";
import Review from "./review/Review";

const routes = [
    {
        path: "/",
        name: "home",
        component: Bookables
    },
    {
        path: "/bookable/:id",
        name: "bookable",
        component: Bookable
    },
    {
        path: "/review/:id",
        name: "review",
        component: Review
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;

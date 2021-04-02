import VueRouter from "vue-router";
import Bookables from "./Bookables/Bookables";
import Bookable from "./bookable/Bookable";
import Review from "./review/Review";
import Basket from "./basket/Basket";
import Login from "./auth/Login";
import Register from "./auth/Register";

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
    },
    {
        path: "/basket",
        name: "basket",
        component: Basket
    },
    {
        path: "/auth/login",
        name: "login",
        component: Login
    },
    {
        path: "/auth/register",
        name: "register",
        component: Register
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "./components/products/ProductList.vue";
import ProductSell from "./components/products/ProductSell.vue";
import ProductPurchase from "./components/products/ProductPurchase.vue";

Vue.use(VueRouter);

// Defining routes and redirection route
const routes = [
    { path: "/", component: ProductList },
    { path: "/product-sell", component: ProductSell },
    { path: "/product-purchase", component: ProductPurchase },
    { path: "*", redirect: "/" }
];

// Exporting router as a new VueRouter instance
export const router = new VueRouter({
    mode: "history",
    routes
})
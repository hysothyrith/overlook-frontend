import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import { component } from "vue/types/umd";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("../views/AboutUs.vue"),
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: () => import("../views/Hotels.vue"),
  },
  {
    path: "/book/",
    name: "Book",
    component: () => import("../views/Book.vue"),
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () => import("../views/ContactUs.vue"),
  },
  {
    path: "/join",
    name: "Join",
    component: () => import("../views/Join.vue"),
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: () => import("../views/Bookings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import VueRouter, {
  NavigationGuard,
  NavigationGuardNext,
  RouteConfig
} from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const beforeEnterAuthMiddleware = (next: NavigationGuardNext<Vue>) => {
  if (!store.getters["auth/authenticated"]) {
    return next({
      name: "SignIn"
    });
  }
  next();
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Overlook " }
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("../views/AboutUs.vue")
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: () => import("../views/Hotels.vue")
  },
  {
    path: "/book/",
    name: "Book",
    component: () => import("../views/Book.vue")
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () => import("../views/ContactUs.vue")
  },
  {
    path: "/join",
    name: "Join",
    component: () => import("../views/Join.vue")
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: () => import("../views/Bookings.vue"),
    beforeEnter: (to, from, next) => {
      beforeEnterAuthMiddleware(next);
    }
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
    beforeEnter: (to, from, next) => {
      beforeEnterAuthMiddleware(next);
    },
    children: [
      {
        path: "information",
        component: () => import("../components/AccountInfoForm.vue")
      },
      {
        path: "change-password",
        component: () => import("../components/PasswordChangeForm.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

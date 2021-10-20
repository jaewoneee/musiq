import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "SingUp",
      component: () => import("../views/SignUpPage.vue"),
    },
    {
      path: "/main",
      name: "Main",
      component: () => import("../views/MainPage.vue"),
    },
    {
      path: "/search",
      name: "Search",
      component: () => import("../views/SearchPage.vue"),
    },
    {
      path: "/search/:id",
      name: "Result",
      component: () => import("../views/SearchPage.vue"),
    },
    {
      path: "/fav",
      name: "Favorite",
      component: () => import("../views/FavoritePage.vue"),
    },
  ],
});

export default router;

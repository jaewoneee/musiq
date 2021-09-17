import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
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
  ],
});

export default router;

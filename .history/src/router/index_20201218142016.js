import Vue from "vue";
import VueRouter from "vue-router";
import cityInfo from "../views/cityInfo"

Vue.use(VueRouter);

const routes = [
  // {
  //       path: "/",
  //       name: "Login",
  //       component: Login,
  //   },
  {
    path: "/",
    name: "cityInfo",
    component: cityInfo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
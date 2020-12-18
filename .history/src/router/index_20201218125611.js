import Vue from "vue";
import VueRouter from "vue-router";
import cityInfo from "../views/cityInfo"
import HomePage from "../views/HomePage";
import Login from "../views/Login";
import Regist from "../views/Regist";
import Cart from "../views/Cart";
import Cate from "../views/Cate";
import Hot from "../views/Hot";
import User from "../views/User";
import order from "../views/order";

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

  // {
  //   path: "/home",
  //   name: "home",
  //   // 从定向到热门
  //   component: HomePage,
  //   redirect: "/home/hot",
  //   children: [{
  //     path: "hot",
  //     name: "hot",
  //     component: Hot,
  //   },
  //   {
  //     path: "cate",
  //     name: "cate",
  //     component: Cate,
  //   },
  //   {
  //     path: "cart",
  //     name: "cart",
  //     component: Cart,
  //   },
  //   {
  //     path: "user",
  //     name: "user",
  //     component: User,
  //   },
  //   ],
  // },
  // {
  //   path: "/order",
  //   name: "order",
  //   component: order,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
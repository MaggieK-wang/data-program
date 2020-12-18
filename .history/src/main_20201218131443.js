import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 移动端弹窗
import "vue-layer-mobile/need/layer.css";
import layer from "vue-layer-mobile";
Vue.use(layer);
// 引入mockjs
require('./mock.js')
// 左右滑动

import VueTouch from "vue-touch";

Vue.use(VueTouch, { name: "v-touch" });

VueTouch.config.swipe = {
  threshold: 100, //手指左右滑动距离
};

import "vant/lib/index.less";
// 引入全局样式
import "./assets/index.scss";
Vue.config.productionTip = false;
// vant-ui组件引入
import {
  NavBar,
  List,
  Toast,
  Tab,
  Tabs,
  SwipeCell,
  Rate,
  Sticky,
  Button,
  Card,
} from "vant";
Vue.use(NavBar)
  .use(List)
  .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(SwipeCell)
  .use(Rate)
  .use(Sticky)
  .use(Button)
  .use(Card);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

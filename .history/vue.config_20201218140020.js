const { goods, banner, cart, city } = require("./mockData");

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    before(app) {
      // app.get('/api/posts', (req, res) => {
      //         res.json(posts)
      //     }),
      //     app.get('/api/users', (req, res) => {
      //         res.json(users)
      //     })
      // 商品类别
      app.post("/api/city/getList", (req, res) => {
        res.json(city);
      });

      // 商品列表

      app.post("/api/goods/listGoods", (req, res) => {
        res.json(goods);
      });

      // banner
      app.post("/api/picture/listPic", (req, res) => {
        res.json(banner);
      });
      app.get("/api/shoppingCar/findGoodsFromCar", (req, res) => {
        res.json(cart);
      });
      // 查询订单

      app.post("/api/order/appListOrders", (req, res) => {
        res.json({
          msg: "查询成功",
          code: 1,
          success: true,
          data: {},
        });
      });
      // 创建订单
      app.post("/api/order/addOrder", (req, res) => {
        res.json({
          msg: "创建成功",
          code: 1,
          success: true,
          data: {},
        });
      });

      // 购物车添加
      app.post("/api/shoppingCar/addShoppingCar", (req, res) => {
        res.json({
          msg: "添加成功",
          code: 1,
          success: true,
          data: {},
        });
      });
      app.post("/api/shoppingCar/deleteGoodsFromCar", (req, res) => {
        res.json({
          msg: "删除成功",
          code: 1,
          success: true,
          data: {},
        });
      });
      // 创建订单
      // 查看商品详情
      app.get("/api/goods/findGoodsBySkuCode", (req, res) => {
        res.json({
          msg: "查询成功",
          code: 1,
          success: true,
          data: goods.data.list[0],
        });
      });
    },
  },
  // 路径别名
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },
  },
};

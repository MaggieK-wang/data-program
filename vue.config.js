const { city } = require("./mockData");

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    before(app) {
      app.post("/api/city/getList", (req, res) => {
        res.json(city);
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

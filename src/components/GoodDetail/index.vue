<template>
  <transition name="move">
    <div class="good-container" v-show="visible">
      <div>
        <div class="header" v-if="good">
          <!--轮播图组件-->
          <AppSwipper :autoPlay="false" :loop="false" :bannerList="bannerList">
            <div :key="index" v-for="(url, index) in bannerList">
              <img :src="url" alt />
            </div>
          </AppSwipper>
          <!--返回按钮-->
          <i class="inconfont iconfanhui" @click="handleBack"></i>
        </div>
        <div class="content" v-if="good">
          <h1>{{ good.skuName }}</h1>
          <div class="price">
            <span class="now">￥{{ good.salePrice }}</span>
            <span class="old">￥{{ good.costPrice }}</span>
          </div>
          <div class="desc">{{ good.skuIntroduction }}</div>
        </div>
        <div class="addCart-wapper">
          <div class="add-cart" @click="handleFirstAdd">加入购物车</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { addCart } from "@/api";
import AppSwipper from "@/components/AppSwipper";
var loginAccount = JSON.parse(sessionStorage.getItem("loginAccount"));
export default {
  components: {
    AppSwipper
  },
  name: "GoodDetail",
  data() {
    return {
      bannerList: undefined,
      goodData: {},
      loginAccount: loginAccount
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object,
      default: undefined
    }
  },
  watch: {
    good() {
      this.bannerList = this.good.images;
    }
  },
  methods: {
    handleBack() {
      this.$emit("update:visible", false);
    },

    //添加购物车
    handleFirstAdd() {
      var _parma = {
        skuCode: this.good.skuCode,
        shopNum: 1,
        businessCode: this.good.businessCode,
        loginAccount: JSON.parse(sessionStorage.getItem("loginAccount"))
        // loginAccount: this.loginAccount,
      };
      addCart(_parma).then(response => {
        //如果第一次选择商品，则没有count计数
        if (!this.good.count) {
          this.$set(this.good, "count", 1);
        } else {
          this.good.count--;
        }
        this.$layer.toast({
          icon: "", // 图标clssName 如果为空 toast位置位于下方,否则居中
          content: response.msg,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        });
      });
      //this.$router.push({path:'/home/cart'})
    }
  }
};
</script>

<style lang="scss" scoped>
.good-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 1987;
  background: rgba($color: rgb(250, 244, 240), $alpha: 0.7);
  .header {
    width: 100%;
    background: #fff;
    img {
      margin: auto;
    }
    i {
      position: absolute;
      top: 0;
      left: 0;
      //   padding: 1rem;
      // background: rgba($color: #000000, $alpha: 0.6);
      color: orangered;
      // border-radius: #fff;
      font-size: 3rem;
      z-index: 8;
    }
  }
  .content {
    margin-top: 1rem;
    position: relative;
    background: #fff;
    padding: 1rem;

    .price {
      font-size: 0;
      text-align: left;
      .now {
        color: red;
        font-size: 1.75rem;
        font-weight: bold;
      }
      .old {
        font-size: 1rem;
        margin-left: 16px;
        text-decoration: line-through;
      }
    }
  }
  .addCart-wapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 2rem;
    .add-cart {
      margin: 0 auto;
      width: 200px;
      box-sizing: border-box;
      font-size: 1rem;
      border-radius: 10px;
      background: #c39862;
      color: white;
    }
  }
}
.move-enter-active,
.move-leave-active {
  transition: all 0.3s linear;
}
.move-enter,
.move-leave-active {
  transform: translate(100%, 0);
}
</style>

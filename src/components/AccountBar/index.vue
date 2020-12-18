<template>
  <div class="account-bar-wapper">
    <div class="left">
      <!--购物车图标-->
      <div class="logo-wapper">
        <div class="logo" :class="{ active: total.num !== 0 }">
          <i class="iconfont icongouwuche"></i>
        </div>
        <!--显示最终数量-->
        <div class="num" v-show="total.num !== 0">{{ total.num }}</div>
      </div>
      <!--总价-->
      <div class="price">￥{{ total.price }}</div>
      <!--内容描述-->
      <div class="content">实际价格以订单为准</div>
    </div>
    <div class="right">
      <div
        class="pay"
        :class="{ active: total.price > 0 }"
        @click="handleAddOrder()"
      >{{ total.content }}</div>
    </div>
  </div>
</template>

<script>
var loginAccount = JSON.parse(sessionStorage.getItem("loginAccount"));
import { createOrder } from "@/api";
export default {
  name: "AccountBar",
  data() {
    return {};
  },
  props: {
    selectGoods: {
      type: Array,
      default() {
        return [
          /*{
            price:10,
            count:2
        },{
            price:20,
            count:1
        }  */
        ];
      }
    }
  },
  computed: {
    total() {
      var _total = this.selectGoods.reduce(
        (acc, cur) => {
          acc.price += cur.price * cur.count;
          acc.num += cur.count;
          return acc;
        },
        {
          price: 0,
          num: 0
        }
      );
      if (_total.price == 0) {
        _total.content = "请添加商品到购物车";
      } else {
        _total.content = "结算";
      }
      return _total;
    }
  },
  methods: {
    handleAddOrder() {
      //debugger
      var A_orderVos = this.selectGoods.map(v => {
        return {
          skuCode: v.skuCode,
          businessCode: v.businessCode,
          shopNum: v.count
          //loginAccount: JSON.parse(sessionStorage.getItem("loginAccount"))
        };
      });
      createOrder({ A_orderVos }).then(response => {
        this.$layer
          .dialog({
            //   title: ['这', 'background:red;'], // 第一个是标题内容  第二个是标题栏的style(可以为空)
            content: "确定下单吗",
            contentClass: "className",
            btn: ["取消", "确定"]
            //   time: 2000
          })
          // 如果有btn
          .then(function(res) {
            // res为0时是用户点击了左边  为1时用户点击了右边
            let position = res === 0 ? "left" : "right";
            console.log(position);
          });
        // this.$layer.toast({
        //   icon: "", // 图标clssName 如果为空 toast位置位于下方,否则居中
        //   content: response.msg,
        //   time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        // });
        // this.$layer.open({
        //   style: "border:none; background-color:#78BA32; color:#fff;",
        //   content: response.msg
        // });
        console.log("创建订单");
        console.log(response);
        // debugger;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.account-bar-wapper {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background: #eee;
  .left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-size: 0;
    .logo-wapper {
      margin-left: 1.75rem;
      box-sizing: border-box;
      position: relative;
      top: -10px;
      width: 56px;
      height: 56px;
      padding: 6px;
      border-radius: 50%;
      background: #eee;
      .logo {
        background: #eee;
        border-radius: 50%;
        height: 100%;
        width: 100%;
        text-align: center;
        &.active {
          background: orange;
          color: #eee;
        }
        .icongouwuche {
          font-size: 28px;

          line-height: 36px;
        }
      }
      .num {
        position: absolute;
        top: 0;
        right: 0;
        height: 16px;
        width: 24px;
        line-height: 16px;
        text-align: center;
        background: crimson;
        border-radius: 10px;
        color: white;
        font-size: 8px;
        box-shadow: 0 2px 4px 0 rgb(100, 98, 98);
      }
    }
    .price {
      max-width: 100px;
      padding-right: 12px;
      box-sizing: border-box;
      font-size: 1.2rem;
      font-weight: bold;
      color: red;
      border-right: solid 1px rgba($color: #000000, $alpha: 0.3);
    }
    .content {
      flex-grow: 1;
      padding-left: 0px;
      font-size: 1px;
    }
  }
  .right {
    width: 100px;
    flex-basis: 100px;
    .pay {
      height: 100%;
      width: 100%;
      background: rgb(120, 127, 128);
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background: chocolate;
        color: whitesmoke;
      }
    }
  }
}
</style>

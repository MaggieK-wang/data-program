<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :key="index"
        v-for="(dot, index) in dotes"
        :class="{ current: currentIndex == index }"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
//为dom元素增加类
function addClass(el, className) {
  //类名
  var A_newClass = el.className.split(" ");
  A_newClass.push(className);
  el.className = A_newClass.join(" ");
}
export default {
  name: "AppSwipper",
  data() {
    return {
      dotes: [],
      //当前图片
      currentIndex: 0
    };
  },
  props: {
    //自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    //循环
    loop: {
      type: Boolean,
      default: true
    },
    //循环时间间隔
    intervalTime: {
      type: Number,
      default: 3000
    }
  },
  watch: {
    bannerList() {
      setTimeout(() => {
        // 动态设置宽度
        this._setWidth();
        // 初始化导航
        this._initDots();

        // 初始化轮播
        this._initSwipper();
        // 自动播放
        if (this.autoPlay) {
          this.play();
        }
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      //动态设置宽度
      this._setWidth();
      //初始化轮播
      this._initSwipper();
      //初始化导航
      this._initDots();
      //自动播放
      if (this.autoPlay) {
        this.play();
      }
    }, 200);
    console.log();

    //监听窗口改变事件
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setWidth(true);

      this.slider.refresh();
    });
  },
  methods: {
    _setWidth(reset) {
      var Dom_children = this.$refs.sliderGroup.children;
      var width = 0;
      //获取banner的宽度
      var sliderWidth = this.$refs.slider.clientWidth;
      //设置总宽度
      for (var i = 0; i < Dom_children.length; i++) {
        var child = Dom_children[i];
        addClass(child, "slider-item");
        //每个图片的宽度与父容器相同
        child.style.width = sliderWidth + "px";
        //总宽度是所有图片宽度的总和
        width += sliderWidth;
      }
      //不是窗口改变的情况
      //如果是循环的话需要在前后各加一张图片做切换
      if (this.loop && !reset) {
        width += 2 * sliderWidth;
      }
      //赋值宽度
      this.$refs.sliderGroup.style.width = width + "px";
    },
    //初始化滚动插件
    _initSwipper() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollY: false,
        scrollX: true,
        momentu: false,
        // click: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      });

      //监听窗口滑动事件
      this.slider.on("scrollEnd", () => {
        //找到当前图片索引，做滚动操作
        var pageIndex = this.slider.getCurrentPage().pageX;
        //如果是自动循环,索引需要减一
        if (this.loop) {
          this.pageIndex -= 1;
        }
        this.currentIndex = pageIndex;

        if (this.autoPlay) {
          clearTimeout(this.timer);
          this.play();
        }
      });
    },
    //播放
    play() {
      this.timer = setTimeout(() => {
        this.slider.next(400);
      }, this.intervalTime);
    },

    //初始化导航
    _initDots() {
      //创建一个长度为图片数量的数组
      this.dotes = new Array(this.$refs.sliderGroup.children.length);
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  min-height: 1px;
  overflow: hidden;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      overflow: hidden;
      text-align: center;
      box-sizing: border-box;
      img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0.5rem;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: rgba($color: #000000, $alpha: 0.3);
      &.current {
        background: chocolate;
        width: 1rem;
        border-radius: 4px;
      }
    }
  }
}
</style>

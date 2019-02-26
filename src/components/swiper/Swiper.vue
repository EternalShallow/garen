
<script>
export default {
  name: "Swiper",
  props: {
    // 轮播图切换时间
    autoTime: {
      type: Number,
      default: 3000
    },
    // 动画过度时间
    transitionTime: {
      type: Number,
      default: 300
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    touchStopAuto: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startTouch: 0, // 开始触摸位置
      endTouch: 0, // 结束触摸位置
      length: 0, // swiper-item 个数
      width: 0, // swiper宽度
      index: 0, // 第几个轮播图
      isTouch: false, // 是否触摸
      timeout: {},
      dotIndex: 0
    };
  },
  components: {},
  computed: {},
  watch: {
  },
  mounted() {
    this.init();
  },
  methods: {
    changeKey(obj, key) {
      const newObj = {};
      Object.keys(obj).forEach(item => {
        if (item !== "key") {
          newObj[item] = obj[item];
        } else {
          newObj["key"] = key;
        }
      });
      return newObj;
    },
    init() {
      this.$nextTick(() => {
        this.startTouch = 0;
        this.length = this.$children.length - 2;

        this.width = this.$el.getBoundingClientRect().width;

        this.index = 1;

        this.endTouch = -this.width;

        this.transformStyle(-this.width);

        this.handleAutoPlay();
      });
    },
    touchstart(e) {
      this.isTouch = true;
      const sx = e.touches[0].screenX;
      this.startTouch = sx;
    },
    touchmove(e) {
      const sx = e.touches[0].screenX;
      this.transformStyle(this.endTouch + sx - this.startTouch);
    },
    touchend(e) {
      const sx = e.changedTouches[0].screenX;
      this.endTouch = this.endTouch + sx - this.startTouch;
      let computedIndex = 0;
      let timer = this.transitionTime;
      if (sx - this.startTouch < 0) {
        const rate = Math.abs(
          Math.abs(this.endTouch / this.width) -
            Math.round(Math.abs(this.endTouch / this.width))
        );
        timer = rate * timer;
        computedIndex = Math.round(Math.abs(this.endTouch / this.width) + 0.15);
      } else {
        const rate = Math.abs(
          Math.abs(this.endTouch / this.width) -
            Math.round(Math.abs(this.endTouch / this.width))
        );
        timer = rate * timer;
        computedIndex = Math.round(Math.abs(this.endTouch / this.width) - 0.15);
      }
      let index = computedIndex - 1;
      if (index < 0) {
        index = this.length - 1;
      }
      if (index === this.length) {
        index = 0;
      }
      this.$emit("change", index);
      this.dotIndex = index;
      this.endTouch = -computedIndex * this.width;
      this.index = computedIndex;
      this.transformStyle(-computedIndex * this.width, timer);

      if (computedIndex >= this.length + 1) {
        this.endTouch = -this.width;
      }
      if (computedIndex <= 0) {
        this.endTouch = -this.width * this.length;
      }
      this.isTouch = false;
      if (this.touchStopAuto) {
        this.isTouch = true;
        return;
      }
      this.handleAutoPlay();
    },
    transformStyle(move, timer) {
      const target = this.$refs.gSwiper;
      target.style["-webkit-transform"] = "translate3d(" + move + "px,0,0)";
      target.style["transform"] = "translate3d(" + move + "px,0,0)";
      target.style.transitionDuration = "0ms";
      if (timer != null) {
        target.style.transitionDuration = timer + "ms";
      }
    },
    handleAutoPlay(speed) {
      if (!this.autoPlay) return;
      let autoTime = speed || this.autoTime;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.isTouch) return;
        this.index++;

        if (this.index >= this.length + 2) {
          this.index = 1;
          this.transformStyle(-this.width * this.index, 0);
          this.endTouch = -this.width * this.index;
          this.handleAutoPlay(1);
        } else {
          let index = this.index - 1;
          if (index == this.length) {
            index = 0;
          }
          this.$emit("change", index);
          this.dotIndex = index;
          this.endTouch = -this.width * this.index;

          this.transformStyle(-this.width * this.index, this.transitionTime);
          if (this.index == this.length + 1) {
            this.endTouch = -this.width;
          }
          this.handleAutoPlay();
        }
      }, autoTime);
    }
  },
  render(h) {
    // 无限轮播 前后各加一轮播图

    let swipers = [];
    if (this.$slots.default) {
      swipers = this.$slots.default;
      const firstItem = this.changeKey(
        this.$slots.default[0],
        this.$slots.default[0].key + "garenKeyF"
      );
      const lastItem = this.changeKey(
        this.$slots.default[this.$slots.default.length - 1],
        this.$slots.default[this.$slots.default.length - 1] + "garenKeyL"
      );
      swipers.push(firstItem);
      swipers.unshift(lastItem);
    }

    return h("div", { class: { "garen-swiper": true } }, [
      h(
        "div",
        {
          class: { "garen-swiper-container": true },
          ref: "gSwiper",
          on: {
            touchstart: this.touchstart,
            touchmove: this.touchmove,
            touchend: this.touchend
          }
        },
        swipers
      )
    ]);
  }
};
</script>
<style scoped>
.garen-swiper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.garen-swiper-container {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
}
</style>
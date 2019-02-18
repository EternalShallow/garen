<template>
  <div class="garen-picker" :style="{fontFamily:defaultStyle.fontFamily || 'inherit',color:defaultStyle.color || '#808080',fontSize:defaultStyle.fontSize || '16px'}">
    <div class="garen-picker-line-top"></div>
    <div class="garen-picker-content" ref="parent">
      <ul class="garen-picker-list" v-for="(list,index) in data" :key="index" @touchstart.stop="onTouchStart($event,index)" @touchmove.stop="onTouchMove($event,index)" @touchend.stop="onTouchEnd($event,index)" :style="{textAlign: list.textAlign || 'center',flex:list.flex || 1}">
        <li class="garen-picker-item" v-for="(item,number)  in list.values" :class="{'garen-picker-item-active':activeIndex[index] == number,
          'garen-picker-item-next':wheelStyle && (number == activeIndex[index] -1 || number == activeIndex[index] +1),
          'garen-picker-item-far':wheelStyle && (number == activeIndex[index] -2 || number == activeIndex[index] +2)}" :data-index="number" :key="number">{{list.valueKey ? item[list.valueKey]:item}}</li>
      </ul>
    </div>
    <div class="garen-picker-line-bottom"></div>
  </div>
</template>

<script>
// TODO:整体变量名，API优化
export default {
  name: "Picker",
  props: {
    data: {
      default: function() {
        return [];
      },
      type: [Array, Object]
    },
    // 默认样式
    defaultStyle: {
      default: function() {
        return {
          fontSize: "18px",
          fontFamily: "inherit",
          color: "#808080"
        };
      },
      type: Object
    },
    // 是否展示滚轮样式
    wheelStyle: {
      default: true,
      type: Boolean
    },
    // 是否点击滚动
    canClick: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      timer: "",
      value: [],
      lastValue: [], // 记录上一次的value值判断是否触发change事件
      activeIndex: []
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.pickerInit();
  },
  watch: {
    data: {
      handler: function(nextProp, oldProp) {
        if (JSON.stringify(nextProp) === JSON.stringify(oldProp)) {
          return;
        }
        this.value = [];
        this.pickerInit();
      },
      deep: true
    }
  },
  methods: {
    movePurpose(order, index, e) {
      this.endMove(
        e,
        parseInt(index),
        2 * parseFloat(this.defaultStyle.fontSize) || 36,
        0,
        order
      );
    },

    // 通过索引找到对应数据
    computeValue(value) {
      return value.map((item, index) => {
        return this.data[index].values[item];
      });
    },

    // 改变类名样式
    changeActiveIndex(order, index) {
      this.$nextTick(() => {
        const activeIndex = this.activeIndex;
        activeIndex[order] = index;
        this.activeIndex = activeIndex;
      });
    },

    // 设置picker的值
    setPickerValue(index, defaultValue) {
      this.endMove(
        this.$refs.parent.children[index],
        defaultValue,
        2 * parseFloat(this.defaultStyle.fontSize) || 36,
        0,
        index
      );
    },
    // 加载picker到默认选项
    pickerInit(which = false) {
      this.$nextTick(() => {
        if (which) {
          this.endMove(
            this.$refs.parent.children[which],
            this.data[which].default,
            2 * parseFloat(this.defaultStyle.fontSize) || 36,
            0,
            which
          );
          return;
        }
        [...this.$refs.parent.children].forEach((element, index) => {
          this.endMove(
            element,
            this.data[index].default,
            2 * parseFloat(this.defaultStyle.fontSize) || 36,
            0,
            index
          );
        });
      });
    },
    // 初始值刷新
    refresh(count = false) {
      this.pickerInit(count);
    },
    // 动画
    /**
     * target:目标元素
     * moveDistance:滚动距离
     * transition:是否开启动画
     * timer:动画时间
     */
    transformStyle(
      target,
      moveDistance,
      transition,
      timer = 200,
    ) {
      target.style["-webkit-transform"] =
        "translate3d(0," + moveDistance + "px,0)";
      target.style["transform"] = "translate3d(0," + moveDistance + "px,0)";
      if (transition) {
        target.style.transitionDuration = timer + "ms";
      }
    },

    // 触摸开始
    onTouchStart(e, index) {
      e.preventDefault();
      // 当触摸li时,确定target对象
      let target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      // 清空选中的active样式
      [...this.$refs.parent.children[index].children].forEach(item => {
        item.className = "garen-picker-item";
      });

      const touch = e.touches[0];
      const touchY = touch.screenY;
      // 记录开始触摸时距屏幕顶端距离
      target.setAttribute("touch-start", touchY);
      target.setAttribute("ismove", false); // 是否触发
      // 记录开始触摸时间
      const timestamp = new Date().getTime();
      target.setAttribute("touch-time", timestamp);
      // 判断是否是第一次触摸
      if (!target.getAttribute("touch-end")) {
        // 存储当前位置
        target.setAttribute("pos-start", touchY);
      } else {
        target.setAttribute(
          "pos-start",
          touchY - parseFloat(target.getAttribute("touch-end"))
        );
      }
      target.style.transitionDuration = "0ms";
    },
    // 手指移动中
    onTouchMove(e, index) {
      e.preventDefault();
      let target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }
      const touch = e.touches[0];
      const touchY = touch.screenY;
      // 获取移动距离
      const moveDistance = touchY - target.getAttribute("pos-start");

      //  target.setAttribute("address-end", touchY);
      target.setAttribute("ismove", true); // 是否触发
      // 移动 TODO:滚动中样式
      this.transformStyle(target, moveDistance);
    },
    // 手指离开
    onTouchEnd(e, order) {
      e.preventDefault();
      const step = 2 * parseFloat(this.defaultStyle.fontSize) || 36;
      let target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }
      const touchY = e.changedTouches[0].screenY;
      const moveDistance = touchY - target.getAttribute("pos-start");
      // 判断应该移动多少个li
      let index = Math.abs(Math.round(moveDistance / step));
      // 记录移动的距离
      const absDistance =
        parseFloat(target.getAttribute("touch-start")) - touchY;
      // parseFloat(
      //     target.getAttribute("address-end") ||
      //     target.getAttribute("touch-start")
      // );
      const timestamp = new Date().getTime();
      // 记录间隔时间
      const timespace =
        timestamp - parseFloat(target.getAttribute("touch-time"));
      if (
        this.canClick &&
        (Math.abs(absDistance) <= 15 ||
          target.getAttribute("ismove") == "false") &&
        timespace <= 90
      ) {
        this.movePurpose(order, e.target.getAttribute("data-index"), target);
        return;
      }

      // 计算速度 = 距离/时间
      const rate = absDistance / timespace;
      this.timer = rate * 6;
      if (Math.abs(this.timer) <= 2) {
        this.timer = 0;
      }
      // 惯性滚动距离及速度 TODO:可优化
      index = Math.round(index + this.timer);
      let speed = 200;
      if (Math.abs(Math.floor(this.timer)) >= 2) {
        speed = 600;
      }
      if (Math.abs(Math.floor(this.timer)) >= 4) {
        speed = 600;
      }
      if (Math.abs(Math.floor(this.timer)) > 6) {
        speed = 800;
      }
      // 边界情况
      if (index < 0) {
        index = 0;
      }
      if (index > this.data[order].values.length - 1) {
        index = this.data[order].values.length - 1;
      }

      this.endMove(target, index, step, moveDistance, order, speed);
    },
    // 控制最后的滚动
    /**
     * target 目标元素
     * index 滚动步数
     * step 每步距离
     * moveDistance 滚动距离
     * order 第几列数据
     * speed 滚动速度
     */
    endMove(target, index = 0, step, moveDistance = 0, order = 0, speed = 200) {
      target.setAttribute("touch-end", -index * step);
      this.transformStyle(target, -index * step, true, speed);

      this.value[order] = index;

      this.changeActiveIndex(order, index);
      if (this.value.length === this.data.length) {
        // 避免重复触发change事件
        if (JSON.stringify(this.lastValue) === JSON.stringify(this.value)) {
        } else {
          this.$emit(
            "change",
            this.computeValue(this.value),
            JSON.parse(JSON.stringify(this.value))
          );
          this.lastValue = JSON.parse(JSON.stringify(this.value));
        }
      }
    }
  }
};
</script>

<style scoped>
.garen-picker {
  position: relative;
  height: 10em;
  overflow: hidden;
}
.garen-picker-content {
  display: flex;
  height: 10em;
  overflow: hidden;
}
.garen-picker-line-top {
  position: absolute;
  width: 100%;
  height: 1px;
  top: 4em;
  left: 0;
  background: #e2e2e2;
  overflow: hidden;
  transform: scaleY(0.5);
}
.garen-picker-line-bottom {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 1px;
  top: 6em;
  left: 0;
  background: #e2e2e2;
  transform: scaleY(0.5);
}
.garen-picker-list {
  margin-top: 4em;
  flex: 1;
}
.garen-picker-item {
  height: 2em;
  line-height: 2em;
}
.garen-picker-item-next {
  transform: scaleY(0.9) translateZ(0);
}
.garen-picker-item-far {
  transform: scaleY(0.8) translateZ(0);
}
.garen-picker-item-active {
  transform: scaleY(1) translateZ(0);
  color: #474747;
}
</style>
<template>
  <div class="garen-tabs">
    <div class="garen-tabs-header">
      <div class="garen-tabs-title" :class="{'garen-tabs-title-active':titleIndex === index}" @click="handleClick(index)" v-for="(item,index) in titles" :key="index">{{item}}</div>
    </div>
    <div class="garen-tabs-body" ref="gBody">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// TODO:active动画，title-slot,滑动切换，切换动画
export default {
  name: "Tabs",
  props: {},
  data() {
    return {
      titles: [],
      titleIndex: 0
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
    this.getChildTitle();
  },
  methods: {
    init() {
      const titles = this.$children.map(item => item.title);
      this.titles = titles;
    },
    getChildTitle() {
      const titles = this.$children.map(item => item.title);
      this.titles = titles;
      if(this.$children.length !== 0)
      this.$children[0].itemVisible = true;
    },
    handleClick(index) {
      this.$nextTick(() => {
        this.init();
        this.titleIndex = index;
        this.$children.map(item => {
          item.itemVisible = false;
        });
        this.$children[index].itemVisible = true;
        this.$emit("change", index);
      });
    },
    mockClick(index) {
      this.$nextTick(() => {
        this.init();
        this.titleIndex = index;
        this.$children.map(item => {
          item.itemVisible = false;
        });
        this.$children[index].itemVisible = true;
      });
    }
  }
};
</script>
<style scoped>
.garen-tabs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.garen-tabs-body{
  height:100%;
  width:100%;
  overflow: hidden;
}
/* 选项卡标题 */
.garen-tabs-header {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 42px;
  padding-left: 10px;
  overflow-y: auto;
  box-sizing: border-box;
}
/* 选项卡标题上下1px细线 */
.garen-tabs-header :before {
  position: absolute;
  content: "";
  display: block;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background: #ddd;
  transform: scaleY(0.5);
}
.garen-tabs-header :after {
  position: absolute;
  content: "";
  display: block;
  bottom: 0px;
  left: 0;
  height: 1px;
  width: 100%;
  background: #ddd;
  transform: scaleY(0.5);
}
/* 选项卡标题各项 */
.garen-tabs-title {
  flex-shrink: 0;
  height: 42px;
  min-width: 42px;
  margin-right: 10px;
  line-height: 42px;
  text-align: center;
  font-family: "-apple-system", Helvetica, sans-serif;
  font-size: 14px;
}
/* 选项卡标题各项激活样式 */
.garen-tabs-title-active {
  color: #e4393c;
  box-sizing: border-box;
  height: 41px;
  border-bottom: 1px solid #e4393c;
}
</style>
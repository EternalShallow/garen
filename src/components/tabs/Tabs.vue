<template>
  <div class="garen-tabs">
    <div class="garen-tabs-header">
      <div class="garen-tabs-title" v-for="(item,index) in titles" :key="index">{{item}}</div>
    </div>
    <div class="garen-tabs-body" ref="gBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'Tabs',
  props: {
    
  },
  data() {
    return {
      titles:[]
    };
  },
  components: {},
  computed: {
  },
  watch: {

  },
  mounted() {
    this.getChildTitle()
  },
  methods: {
    getChildTitle(){
      const titles = this.$children.map(item => item.title)
      this.titles = titles
    }
  }
};
</script>
<style scoped>
.garen-tabs{
  width: 100%;
  height:100%;
  overflow:hidden;
}
.garen-tabs-header{
  display: flex;
  flex-wrap:nowrap;
  width:100%;
  height:42px;
  overflow-y: auto;
}
.garen-tabs-title{
  flex-shrink:0;
}
</style>
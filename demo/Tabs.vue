<!--  -->
<template>
    <div class="container">
        <garen-tabs @change="tabsChange" ref="gTabs">
            <garen-tabs-item v-for="(item,index) in titleList" :title="item.name" :key="index">
                <div class="city-list">
                    <div class="city-item" :class="{'city-item-active':activeCity === option.name}" @click="handleCity(num,index)" v-for="(option,num) in dataList" :key="num">{{option.name}}</div>
                </div>
            </garen-tabs-item>
        </garen-tabs>
    </div>
</template>

<script>
// mock城市数据
const MOCK = [
  {
    name: "北京市",
    children: [
      {
        name: "朝阳区",
        children: [
          { name: "三环以内", children: [] },
          { name: "三环到四环之间", children: [] },
          { name: "四环到五环之间", children: [] },
          { name: "五环到六环之间", children: [] }
        ]
      },
      {
        name: "海淀区",
        children: [
          { name: "三环以内", children: [] },
          { name: "三环到四环之间", children: [] },
          { name: "四环到五环之间", children: [] },
          { name: "五环到六环之间", children: [] }
        ]
      },
      {
        name: "昌平区",
        children: [
          { name: "三环以内", children: [] },
          { name: "三环到四环之间", children: [] },
          { name: "四环到五环之间", children: [] },
          { name: "五环到六环之间", children: [] }
        ]
      }
    ]
  },
  {
    name: "河北省",
    children: [
      {
        name: "石家庄市",
        children: [
          {
            name: "辛集市",
            children: [{ name: "辛集县", children: [] }]
          },
          {
            name: "晋州市",
            children: [{ name: "晋州镇", children: [] }]
          }
        ]
      },
      {
        name: "邯郸市",
        children: [
          {
            name: "邯郸县",
            children: [
              { name: "河沙镇镇", children: [] },
              { name: "黄粱梦镇", children: [] }
            ]
          },
          {
            name: "峰峰矿区",
            children: [{ name: "峰峰镇", children: [] }]
          }
        ]
      }
    ]
  }
];
export default {
  props: {},

  data() {
    return {
      titleList: [{ name: "请选择", children: [] }], // title列表
      dataList: MOCK,    // 城市选择列表
      activeCity:undefined,
    };
  },

  methods: {
    tabsChange(index) {
      if(index > 0){
          const titleName = this.titleList[index - 1]
          this.activeCity = this.titleList[index].name
          this.dataList = titleName.children
      }else{
          const titleName = this.titleList[index]
          this.activeCity = this.titleList[index].name
          this.dataList = MOCK
      }
    },
    handleCity(num, index) {
      const cityData = this.dataList[num];
      this.activeCity = cityData.name
      const titleList = this.titleList;
      titleList[index] = cityData;

      if(cityData.children.length === 0){
          this.titleList = titleList
          // 改变选项卡数目，调用切换选项卡选择项，不会触@change事件    
          // 若需要触发@change,可调用this.$refs.gTabs.handleClick(index);  
          this.$refs.gTabs.mockClick(index);
          return
      }
      
      titleList[index + 1] = { name: "请选择", children: [] };
      titleList.splice(index + 2)
      this.titleList = titleList
      this.dataList = cityData.children

      this.$refs.gTabs.mockClick(index + 1);
    }
  },

  components: {},

  computed: {},

  mounted() {

  }
};
</script>
<style scoped>
.city-list {
  padding: 10px;
}
.city-item {
  height: 20px;
  padding: 10px 0;
  line-height: 20px;
  font-size: 14px;
  font-family: "-apple-system", Helvetica, sans-serif;
}
.city-item-active {
    color: #e4393c;
}
</style>
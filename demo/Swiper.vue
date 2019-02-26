
<template>
  <div class="main">
    <div class="swiper">
      <garen-swiper @change="handleChange" ref="gSwiper">
        <garen-swiper-item  v-for="(item,index) in swiperList" :key="index"><img class="swiper-img"  :src="item"></garen-swiper-item>
      </garen-swiper>
      <div class="dots">
        <div class="dots-item" :class="{'dots-item-active':index === activeDot}" v-for="(item,index) in swiperList" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO：功能待优化
export default {
  data() {
    return {
      swiperList:[
        // 'https://img.zcool.cn/community/01a5e758be221da801219c7732208a.jpg@1280w_1l_2o_100sh.jpg',
        // 'https://img.zcool.cn/community/01b90b58be222aa801219c77734f76.jpg@1280w_1l_2o_100sh.jpg',
        // 'https://img.zcool.cn/community/0132aa58be2231a801219c77e8de4f.jpg@1280w_1l_2o_100sh.jpg',
        // 'https://img.zcool.cn/community/01f78458be22b7a801219c770bf88c.jpg@1280w_1l_2o_100sh.jpg'
      ],
      activeDot:0,
    };
  },

  components: {},

  computed: {},

  mounted() {
    setTimeout(()=>{
     this.swiperList = [
        'https://img.zcool.cn/community/01a5e758be221da801219c7732208a.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/01b90b58be222aa801219c77734f76.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/0132aa58be2231a801219c77e8de4f.jpg@1280w_1l_2o_100sh.jpg',
        'https://img.zcool.cn/community/01f78458be22b7a801219c770bf88c.jpg@1280w_1l_2o_100sh.jpg'
      ]
      // 数据加载完重新初始化swiper
       this.$refs.gSwiper.init()
    },1000)
  },

  methods: {
    handleChange(index) {

      this.activeDot = index
    },
    clickImg(index) {
      console.log(index)
    }
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.swiper{
  position: relative;
  width:100%;
  height:200px;
  overflow: hidden;
}
.swiper-img {
  width: 100%;
  height: 200px;
}
/* dots组建外实现 */
.dots {
  position: absolute;
  display: flex;
  justify-content: center;
  width:100%;
  height:6px;
  bottom: 10px;
  left: 0;
}
.dots-item{
  height:6px;
  width:6px;
  border-radius:100%; 
  margin:0 3px;
  background: #ebedf0;
}
.dots-item-active{
  background: #fff;
}
</style>
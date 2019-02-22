
<template>
  <div class="main">
    <garen-swiper @change="handleChange">
      <garen-swiper-item><img @click="clickfirst" class="swiper-img" src="https://img.zcool.cn/community/01a5e758be221da801219c7732208a.jpg@1280w_1l_2o_100sh.jpg" alt=""></garen-swiper-item>
      <garen-swiper-item><img class="swiper-img" src="https://img.zcool.cn/community/01b90b58be222aa801219c77734f76.jpg@1280w_1l_2o_100sh.jpg" alt=""></garen-swiper-item>
      <garen-swiper-item><img class="swiper-img" src="https://img.zcool.cn/community/0132aa58be2231a801219c77e8de4f.jpg@1280w_1l_2o_100sh.jpg" alt=""></garen-swiper-item>
      <garen-swiper-item><img @click="clicklast" class="swiper-img" src="https://img.zcool.cn/community/01f78458be22b7a801219c770bf88c.jpg@1280w_1l_2o_100sh.jpg" alt=""></garen-swiper-item>
    </garen-swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
    handleChange(index){
      let time = (new Date()).getSeconds()
      console.log(index,time,'changeIndex')
    },
    clickfirst(){

    },
    clicklast(){

    }
  }
}

</script>
<style scoped>
.main{
  width:100%;
  height:200px;
}
.swiper-img{
  width:100%;
  height:200px;
}
</style>
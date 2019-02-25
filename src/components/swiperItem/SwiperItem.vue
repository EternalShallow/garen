<!--  -->
<template>
  <div @click="handleClick" class="garen-swiper-item">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'SwiperItem',  
  props: {},

  data () {
    return {
    };
  },

  methods: {
      handleClick(){
          this.$emit('click')
      }
  },

  components: {},

  computed: {},

  mounted(){},

}

</script>
<style scoped>
.garen-swiper-item{
  flex-shrink: 0;  
  height:100%;
  width:100%;
  overflow: hidden;
}
</style>
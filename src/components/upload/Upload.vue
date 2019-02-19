<template>
  <div @click="handleUpload">
    <input 
      :style="{height:0,width:0,display:'none',overflow:'hidden'}" 
      ref="garenUpload" type="file" :accept="accept" :capture:="capture" :multiple="multiple"
      @change="handleChange"
      >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'Upload',
  props: {
    accept:{
      default:'',
      type:String
    },
    capture:{
      default:'',
      type:String
    },
    multiple:{
      default:false,
      type:Boolean
    },
    prevent:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {

    };
  },
  components: {},
  computed: {
  },
  watch: {

  },
  mounted() {
 
  },
  methods: {
    handleUpload(){
      if(this.prevent) return;
      const upload = this.$refs.garenUpload
      upload.click()
    },
    handleChange(){
      const upload = this.$refs.garenUpload
      const file = upload.files
      this.$emit('change',file)
    }
  }
};
</script>
<style scoped>

</style>

<template>
  <div>
    <garen-upload @change="handleChange" :accept="accept" :multiple="multiple">
      <button>上传</button>
      <img class="upload-header" ref="uImg" alt="头像">
    </garen-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accept:'image/*',  // 调用相机对应input accept选项
      capture:'camera',  // 对应input capture选项
      multiple:false,  // 非多选
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleChange(files){
      this.fileToBase64(files)
     // this.$refs.uImg.src = file[0]
      console.log(files)
    },
    fileToBase64(files){
       const file = files[0];
        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) {
            alert("只能选择图片");
            return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.$refs.uImg.src = reader.result  
        }
    }
  }
};
</script>
<style scoped>
.upload-header{

}
</style>
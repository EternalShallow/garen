
<template>
  <div class="container">
    <div v-if="!visible">
      <!-- 选择照片，可结合其他图片上传插件，目的是获取图片文件 -->
      <input ref="file" @change="choiceImg" type="file">
    </div>
    <!-- 照片裁剪部分 -->
    <div class="main" v-if="visible">
      <div class="header">
        <div class="button" @click="confirm">使用</div>
        <div class="button cancel" @click="cancel">取消</div>
      </div>
      <div class="content">
        <garen-cropper ref="cropper" :img-src="imgSrc" @finish="finish"></garen-cropper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
    imgSrc: "",    // 图片数据
    visible:false,  // 剪切框展示
  }
  } ,
  methods: {
    // 获得图片的base64和二进制
    finish(base64,data){
      console.log(base64,'图片base64')
      console.log(data,'图片二进制')
    },  
    // 确定按钮
    confirm() {
      this.$nextTick(() => {
          // 确认截图
        this.$refs.cropper.confirm()
      })
    },
    // 取消
    cancel(){
      this.visible = false
    },
    // 选择img回调
    choiceImg(e) {    
      this.visible = true
      const file = e.target.files[0]
      // 读取图片信息�
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.imgSrc = reader.result
        // imgSrc已获取，�开始初始化渲染图片�
        this.$refs.cropper.init()
      }
    },
  }
};
</script>
<style scoped>
.container{
    height:100%;
    width:100%;
    overflow: hidden;
}
.item {
    height: 200px;
    background: lightgray;
    border: 2px solid green;
    overflow: hidden;
}

.main {
    height:100%;
    box-sizing: border-box;
    padding-top: 44px;
}

.content {
    height: 100%;
}

.header {
    position: fixed;
    top: 0;
    right: 0;
    height: 44px;
    width: 100%;
    background: #303030;
}

.button {
    float: right;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    margin-right: 15px;
    color: green;
}
.cancel{
    float:left;
    margin-left:15px;
}
</style>
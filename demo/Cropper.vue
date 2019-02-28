
<template>
  <div class="container">
    <div v-if="!visible">
      <!-- 选择照片，结合其他图片上传插件，获取图片文件 -->
      <garen-upload @change="handleChange" accept="image/*">
        <button v-if="!showHeader" class="upload-button">上传</button>
        <img v-else class="upload-header" ref="uImg" alt="头像">
      </garen-upload>
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
  data() {
    return {
      imgSrc: "", // 图片数据
      visible: false, // 剪切框展示
      showHeader:false,
    };
  },
  methods: {
    // 获得图片的base64和二进制
    finish(base64, data) {
      console.log(base64, "图片base64");
      console.log(data, "图片file");
      this.visible = false;
      this.$nextTick(()=>{
        this.$refs.uImg.src = base64;
      })
      
    },
    // 确定按钮
    confirm() {
      this.$nextTick(() => {
        // 确认截图
        this.$refs.cropper.confirm();
      });
    },
    // 取消
    cancel() {
      this.visible = false;
    },
    handleChange(files){
      this.fileToBase64(files)
      this.showHeader = true
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
          this.visible = true; 
          this.imgSrc = reader.result;
          console.log(reader.result)
          // imgSrc已获取，开始初始化渲染图片
          this.$nextTick(()=>{
            this.$refs.cropper.init();
          })  
        }
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.item {
  height: 200px;
  background: lightgray;
  border: 2px solid green;
  overflow: hidden;
}

.main {
  height: 100%;
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
.cancel {
  float: left;
  margin-left: 15px;
}
.upload-header{
  display: block;
  height:200px;
  width:200px;
  margin:100px auto;
  border-radius: 50%;
}
.upload-button{
  display: block;
  height:50px;
  width:100px;
  margin:100px auto;
  border:1px solid gray;
}
</style>
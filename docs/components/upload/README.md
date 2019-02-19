# garen-upload

::: tip  组件功能
+ 点击上传
+ 根据slot自定义上传样式
:::

![An image](./demo.gif)

## 示例
---
```vue
<template>
  <div>
    <garen-upload @change="handleChange" :accept="accept" :multiple="multiple">
      <button v-if="!showHeader" class="upload-button">上传</button>
      <img v-else class="upload-header" ref="uImg" alt="头像">
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
      showHeader:false,  // 切换展示图片和上传按钮
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
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
          this.$refs.uImg.src = reader.result  
        }
    }
  }
};
</script>
<style scoped>
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
```

## API
---
参数|类型|说明|备注
:--:|:--:|:--:|:--:
:accept|String|input accept属性|
:capture|String|input capture属性|
:multiple|Boolean|input multiple属性|是否多选
:prevent|Boolean|是否开启选择文件功能|纯展示时可开启阻止upload功能
@change|Function|获取文件列表|可获取选择的文件列表
---


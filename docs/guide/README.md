# 快速上手

### 使用npm安装
```md
npm i garen -S
```
```javascript
// 推荐在main.js（入口文件）中完全引入
import Vue from 'vue'
import garen from 'garen'

Vue.use(garen)  

/**
 * 如果打包之后发现部分es6未成功编译为es5，可引用打包之后的插件
 * import garen from 'garen/dist/main.js'
 */
```
```javascript
// 按需加载
import Vue from 'vue'
import {
    Loadmore,
    Cropper,
    Picker,
    Upload,
    Tabs,
    Swiper,
    TabsItem
} from 'garen'

// 按需注册对应组件
Vue.component('garen-loadmore',Loadmore);
Vue.component('garen-cropper',Cropper);
Vue.component('garen-picker',Picker);
Vue.component('garen-upload',Upload);
Vue.component('garen-swiper',Swiper);
Vue.component('garen-tabs',Tabs);
Vue.component('garen-tabs-item',TabsItem);   

/**
 * 如果打包之后发现部分es6未成功编译为es5，可引用打包之后的插件
 * import garen from 'garen/dist/main.js'
 */

```

### 使用CDN在script标签中单独引用
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/garen/dist/main.min.js"></script>
<script>
  Vue.use(garen)
</script>
```

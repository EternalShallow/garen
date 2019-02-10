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
    Swiper
} from 'garen'

// 按需注册对应组件
Vue.component('garen-loadmore',Loadmore);
Vue.component('garen-cropper',Cropper);
Vue.component('garen-picker',Picker);
Vue.component('garen-upload',Upload);
Vue.component('garen-swiper',Swiper);
Vue.component('garen-tabs',Tabs);

```

### 使用CDN在script标签中单独引用
```
// 等待更新
```

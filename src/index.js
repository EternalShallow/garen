import HelloWord from './components/HelloWord.vue';
import Loadmore from './components/loadmore/index.js';
import Cropper from './components/cropper/index.js';
import Picker from './components/picker/index.js';
export default {install:(Vue)=>{
    Vue.component('garen-loadmore',Loadmore);
    Vue.component('garen-cropper',Cropper);
    Vue.component('garen-picker',Picker);
}}
import HelloWord from './components/HelloWord.vue';
import Loadmore from './components/loadmore/index.js';
import Cropper from './components/cropper/index.js';
import Picker from './components/picker/index.js';
import Upload from './components/upload/index.js';
import Swiper from './components/swiper/index.js';
import SwiperItem from './components/swiperItem/index.js';
import Tabs from './components/tabs/index.js';
import TabsItem from './components/tabsItem/index.js';
const components = [
    Loadmore,
    Cropper,
    Picker,
    Upload,
    Swiper,
    SwiperItem,
    Tabs,
    TabsItem
]

const garen = {
    install:(Vue)=>{
    Vue.component('garen-loadmore',Loadmore);
    Vue.component('garen-cropper',Cropper);
    Vue.component('garen-picker',Picker);
    Vue.component('garen-upload',Upload);
    Vue.component('garen-swiper',Swiper);
    Vue.component('garen-swiper-item',SwiperItem);
    Vue.component('garen-tabs',Tabs);
    Vue.component('garen-tabs-item',TabsItem);
    }
}
components.forEach(item => {
    garen[item.name] = item
})

module.exports = garen
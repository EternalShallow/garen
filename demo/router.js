import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home-demo',
            component: () => import('./Home.vue')
        },
        {
            path: '/loadmore',
            name: 'loadmore-demo',
            component: () => import('./Loadmore.vue')
        },
        {
            path: '/picker',
            name: 'picker-demo',
            component: () => import('./Picker.vue')
        },
        {
            path: '/cropper',
            name: 'cropper-demo',
            component: () => import('./Cropper.vue')
        },
        {
            path: '/swiper',
            name: 'swiper-demo',
            component: () => import('./Swiper.vue')
        },
        {
            path: '/upload',
            name: 'upload-demo',
            component: () => import('./Upload.vue')
        },
        {
            path: '/tabs',
            name: 'tabs-demo',
            component: () => import('./Tabs.vue')
        },
    ]
})
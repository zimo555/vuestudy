import VueRouter from 'vue-router'

// 导入路由
import homecompotnent from './components/tabber/homecomponent.vue';
import membercomponent from './components/tabber/membercomponent.vue';
import shopcarcomponent from './components/tabber/shopcarcomponent.vue';
import searchcompotnent from './components/tabber/searchcomponent.vue';
import news from './components/news/news1.vue';
import photos from './components/news/photos.vue';
import shopping from './components/news/shopping.vue';
import message from './components/news/message.vue';
import movie from './components/news/movie.vue';
import contact from './components/news/contact.vue';
import newsinfo from './components/news/newsinfo.vue';
import photoinfo from './components/news/photoinfo.vue';
import goodsinfo from './components/news/goodsinfo.vue'
import goodsdesc from './components/news/goodsdesc.vue'
import goodscomment from './components/news/goodscomment.vue'


// 创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        { path:'/',redirect:'/home' }, //重定向，使得根目录就是home
        { path:'/home',component: homecompotnent },
        { path:'/member',component: membercomponent },
        { path:'/shopcar',component: shopcarcomponent },
        { path:'/search',component: searchcompotnent },
        { path:'/home/news',component: news },
        { path:'/home/shopping',component: shopping },
        { path:'/home/message',component: message },
        { path:'/home/movie',component: movie },
        { path:'/home/photos',component: photos },
        { path:'/home/contact',component: contact },
        { path:'/home/newsinfo/:id',component: newsinfo },
        { path:'/home/photoinfo/:id',component: photoinfo},
        { path:'/home/goodsinfo/:id',component: goodsinfo,name:"goodsinfo" },
        { path:'/home/goodsdesc/:id',component: goodsdesc,name:"goodsdesc" },
        { path:'/home/goodscomment/:id',component: goodscomment,name:"goodscomment" }

    ],
    linkActiveClass: 'mui-active'//覆盖默认的路由高亮的类 router-link-active
})

// 把路由对象暴露出去
export default router

// 注意： 一定要区分 this.$router 和 this.$router 这两个对象
// 其中：this.$route 是路由参数对象，所有路由中的参数，params ,query都属于它
// 其中：this.$router 是一个路由导航对象，用它可以方便的使用 js 代码，实现路由的前进，后退
// 跳转到新的 url 地址
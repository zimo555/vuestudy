import Vue from 'vue'

// 从mint-ui包中按需导入mint-ui的组件
import Mint from 'mint-ui';
Vue.use(Mint);
// 需要引用mint-ui中的样式
import 'mint-ui/lib/style.css'; 

// 引入额外的图标样式
import './lib/css/icons-extra.css'

// 从mui中导入样式
import './lib/css/mui.min.css'


// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)
// 导入router.js
import router from './router.js'


// 2.1导入vue-resource
import VueResource from 'vue-resource'
// 2.2安装vue-resource
Vue.use(VueResource)


// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattern)
}) 

//  导入vuex包
import Vuex from 'vuex'
Vue.use(Vuex);
// 每次刚进入网站，会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来
// 放到store中
var car=JSON.parse(localStorage.getItem('car')||'[]')

// 创建一个实例
var store = new Vuex.Store({
    state:{
        // 可以看作 data
        // 如果在组件中，想要访问store中数据,只能通过 this.$store.state.*** 来访问
        // count:0

        car: car
    },
    mutations:{
        // 可以看作methods
        // 注意： 如果要操作 store 中的 state值，只能通过调用 mutations 提供的方法，
        // 才能操作对应的数据，不推荐直接在组件中定义方法操作state的数据，因为，万一
        // 导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件都可能有操作数据
        // 的方法
        // 注意：如果组件想要调用 mutations 中的方法，只能使用 this.$store.commin('方法名')
        // 注意：mutations 的方法中的参数列表最多支持两个参数，参数一是 state ,参数二是 通过 commit 提交过来的参数



        addtocar(state,goodsinfo){
            // 点击加入购物车，把商品信息保存到store 的 car 
            // 1.如果购物车中，之前就有商品，那么就只需更新shuliang
            // 2.如果没有，就直接把商品数据，push到car 
            var flag=false
            state.car.some(item=>{
                if(item.id===goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count);
                    flag=true
                    return true;
                }
            })
            if(!flag){
                state.car.push(goodsinfo);
            }
            // 当更新  car 之后，把 car数组存储本地的 localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updategoodsinfo(state,goodsinfo){
            // 修改购物车中的商品数量
            state.car.some(item=>{
                if(item.id===goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true;
                }
            })
            // 当修改完商品数量信息后，把信息存储到本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeformcar(state,id){
            // 根据id,从 store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1);
                }
                return true;
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updategoodsselected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected;
                }
                return true;
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        // 注意：getters 只负责对外提供数据，不负责修改数据
        // 所有属性都是一个函数
        // opt:function(state){
        //    return state.count
        //}
        // getters和组件中的过滤器比较类似，都没有修改原数据，都是把原数据做了
        // 一层包装，提供给调用者
        // getters和组件的computed 比较类似，只要 state 中的数据发生了变化
        // 那么，如果getters 正好也引用了这个数据，那么就会立即出发getters的重新求值
        getallcount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            });
            return c
        },
        getgoodscount(state){
            var obj = {};
            state.car.forEach(item=>{
                obj[item.id]=item.count
            })
            return obj;
        },
        getgoodsselected(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o;
        },
        getgoodscountandamount(state){
            var o={
                count:0,
                amount:0
            };
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price+item.count;
                }
            })
            return o
        }
    
    }
})



// 导入app.vue
import app from './app.vue';

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    // 1.4挂载路有对象到vm实例上
    router,
    store
})


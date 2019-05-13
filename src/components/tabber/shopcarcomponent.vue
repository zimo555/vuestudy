<template>
    <div class="shopcar-content">
        <div class="goodslist">


            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="item in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getgoodsselected[item.id]" @change="selectedchanged(item.id,$store.getters.getgoodsselected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <shopcarnumbox :initcount="$store.getters.getgoodscount[item.id]" :goodsid="item.id"></shopcarnumbox>
                                <!-- 问题：如何从购物车中获取商品的数量 -->
                                <!-- 1.我们可以先创建一个空对象，然后循环购物车中所有的商品数据
                                把当前循环这条商品的Id ，作为对象的属性名，count 值作为对象的属性值，这样，当把所有商品循环
                                一遍，就会得到一个对象 -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>

                        </div>
                    </div>
                </div>                
            </div>


            <!-- 结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                    <p>总计（不含运费）</p>
                    <p>已勾选商品 <span class="red">{{$store.getters.getgoodscountandamount.count}}</span> 件，
                    总计 <span class="red">￥{{$store.getters.getgoodscountandamount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>       
                </div>
                         
            </div>
        </div>

    </div>
</template>
<script>
import shopcarnumbox from "../news/shopcar_numbox.vue"
export default{
    data(){
        return {
            goodslist:[],
        }
    },
    created(){
        this.getgoodslist()
    },
    methods:{
        getgoodslist(){
            // 获取store中所有的商品的id
            var idall=[];
            this.$store.state.car.forEach(item=>idall.push(item.id));
            // 获取购物车商品列表
            // 如果购物车中没有商品，则直接返回，不需要请求数据接口
            if(idall.length<=0){
                return;
            }
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/"+idall.join(","))
            .then(result=>{
            if(result.body.status===0){
                this.goodslist=result.body.message;
            }
        })
        },
        remove(id,index){
            // 点击删除，把商品从 store 根据 传递的id 删除，同时，把当前组件中的goodslist中
            // 对应要删除的那个商品 使用index来删除
            this.goodslist.splice(index,1);
            this.$store.commit("removeformcar",id)
        },
        selectedchanged(id,val){
            this.$store.commit('updategoodsselected',{id:id,selected:val})
        }
    },
    components:{
        shopcarnumbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-content{
    background-color: #eee;
    overflow: hidden;
    .goodslist{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }        
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }

            
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .red{
            color: red;
            font-size: 16px;
        }

    }
}
</style>

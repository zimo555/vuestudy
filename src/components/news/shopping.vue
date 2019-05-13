<template>
    <div class="goodslist">
        <!-- <router-link class="goodsitem" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
        <img :src="item.img_url">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
   
            </p>
        </div>
        </router-link> -->

        <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="getgoodsinfo(item.id)">
        <img :src="item.img_url">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
   
            </p>
        </div>
        </div>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    export default  {
        data(){
            return{
                pageindex: 1, //分页的页数
                goodslist: []//存放商品列表的数组
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            // 获取商品列表
            getgoodslist(){
                this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex="+this.pageindex)
                .then(result=>{
                    if(result.body.status===0){
                        // this.goodslist = result.body.message
                        this.goodslist=this.goodslist.concat(result.body.message)
                    }
                })
            },
            getmore(){
                this.pageindex++;
                this.getgoodslist();
            },
            getgoodsinfo(id){
                // 编程式跳转
                // 参考https://router.vuejs.org/zh/guide/essentials/navigation.html
                // 1.最简单的
                // this.$router.push("/home/goodsinfo/"+id);
                // 2.传递对象
                // this.$router.push({ path: "/home/goodsinfo/"+id});
                // 3.传递命名的路由
                this.$router.push({ name:"goodsinfo",params:{id}});
            }
        }
    }
</script>

<style lang="scss" scoped>
.goodslist{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    //让goodslist里面的盒子靠两边对齐
   
    .goodsitem{
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 411px;
        img{
            width: 100%;
        }
        h1{
            font-size: 16px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;

                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;

                }
            }
            .sell{
                display: flex; //流式布局
                justify-content: space-between;
            }
        }
    }
}
</style>

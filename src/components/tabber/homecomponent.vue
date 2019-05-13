<template>
    <div>
        <!-- 轮播图 -->
        <swiper :lunbotulist="lunbotulist" :isfull="true"></swiper>

        <!-- 九宫格到六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
		                <img src="../../images/menu1.png">
		                <div class="mui-media-body">新闻咨询</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photos">
		                <img src="../../images/menu2.png">
		                <div class="mui-media-body">图片分享</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/shopping">
		                <img src="../../images/menu3.png">
		                <div class="mui-media-body">商品购买</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/message">
		                <img src="../../images/menu4.png">		        
		                <div class="mui-media-body">留言反馈</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/movie">
		                <img src="../../images/menu5.png">
		                <div class="mui-media-body">视频专区</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/contact">
		                <img src="../../images/menu6.png">		               
		                <div class="mui-media-body">联系我们</div></router-link></li>
		</ul> 
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import swiper from "./lunbotu.vue"
export default{
    data(){
        return{
            lunbotulist:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){
            this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                if(result.body.status===0){
                    this.lunbotulist = result.body.message
                }else{
                    Toast('加载失败')
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
    background-color: white;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right: 0;
    border-bottom: 0;
    img{
        width: 60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }

    
}
</style>

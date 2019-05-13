<template>
    <div class="goodsinfocontnet">
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotulist="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del> &nbsp;&nbsp;销售价：<span class="now">￥{{ goodsinfo.sell_price }}</span>
					</p>
                    <p>购买数量:<numbox @getnum="getselectnum" :maxnum="goodsinfo.stock_quantity"></numbox></p>
                    
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addtoshopcar">加入购物车</mt-button>
                    </p>
				</div>
			</div>
			
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
					<p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
					<p>上架时间：{{ goodsinfo.add_time|dateFormat  }}</p>
				</div>
			</div>
		    <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gocmt(id)">商品评论</mt-button>

            </div>
		</div>
        
    </div>
</template>
<script>
// 导入轮播图
import swiper from "../tabber/lunbotu.vue";
// 导入数字选择框
import numbox from './numbox.vue';
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotu: [],
            goodsinfo:{}, //获取到的商品信息
            ballflag: false, //控制小球隐藏的标识符
            selectednum: 1 //保存用户选中的商品数量
        }
    },
    created(){
        this.getlunbotu();
        this.getgoodsinfo();
    },
    methods:{
        getlunbotu(){
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id)
            .then(result=>{
                if(result.body.status===0){
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中只认识
                    // item.img,不认识 item.src
                    result.body.message.forEach(item=>{
                        item.img=item.src;
                    })
                    this.lunbotu=result.body.message;

                }
            })
        },
        getgoodsinfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getinfo/"+this.id)
            .then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0];
                }
            })
        },
        godesc(id){
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({name:"goodsdesc",params:{id} })
        },
        gocmt(id){
            this.$router.push({name:"goodscomment",params:{id} })
        },
        addtoshopcar(){
            this.ballflag = !this.ballflag; 
            var goodsinfo={id:this.id,count:this.selectednum,
            price:this.goodsinfo.sell_price,selected: true};

            this.$store.commit("addtocar",goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            // 小球动画优化思路：
            // 1.先分析导致动画不准确的本质原因： 我们把小球最终 位移到的位置局限到了某一分辨率的
            // 滚动未滚动的情况下；
            // 2.只要分辨率 和测试的时候不一样，或者滚动条有一定的滚动距离后，问题就出现了
            // 3.因此，，不能把位置的横纵坐标 定死，应该动态计算这个坐标值
            // 4.解决办法：先得到徽标的 横纵坐标，在得到小球的横纵坐标，
            // 然后，让ｙ值求差，ｘ值求差，得到的结果就是横纵坐标要位移的距离
            
            // 获取小球的在页面中的位置
            const ballposition = this.$refs.ball.getBoundingClientRect();
            const badgeposition = document
                .getElementById("badge")
                .getBoundingClientRect()
            const x = badgeposition.left-ballposition.left;
            const y = badgeposition.top-ballposition.top;
            el.style.transform=`translate(${x}px,${y}px)`;  //es6的模板字符串
            // el.style.transform="translate("+x+"px,"+y+"px)";
            el.style.transition="all 0.5s cubic-bezier(.4,-0.39,1,.68)";
            done();
        }, 
        afterEnter(el){
            this.ballflag = !this.ballflag
        },
        getselectnum(num){
            // 当子组件把选中的数量传递给父组件的时候，把值保存到 selectednum
            this.selectednum = num;
            console.log(this.selectednum);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfocontnet{
    background-color: white;
    overflow: hidden;
    .now{
        color: red;
        font-size: 16px;
    }
    .mui-card-footer{
        display: block; //取消flex 布局
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        position: absolute;
        border-radius: 50%;
        z-index:99;
        top: 410px;
        left: 80px;
    }
}
</style>

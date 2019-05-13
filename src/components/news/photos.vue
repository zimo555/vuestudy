<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cate" :key="item.id" 
					@click="getphoto(item.id)" data-wid="tab-top-subpage-1.html">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片区域 -->
		<ul class="photo">
			<router-link v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li" >
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="title">{{item.title}}</h1>
					<div class="body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>

<script>
import mui from '../../lib/js/mui.js'


export default{
	data(){
		return　{
			cate:[],
			photolist:[]
		}
	},
	created(){
		this.getcate();
		this.getphoto(0);//默认进入页面主动请求 全部列表中的图片
	},


	// 当组件中的DOM结构被渲染好并放到页面中候，会执行这个函数
	// 如果要操作元素了，最好在mounted 中，因为这里的DOM 是最新的
	mounted(){
		mui('.mui-scroll-wrapper').scroll({
			eceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});		
	},
	methods:{
		getcate(){
			this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory")
			.then(result=>{
				if(result.body.status===0){
					result.body.message.unshift({ title: "全部",id: 0});
					this.cate = result.body.message
				}
			})
		},
	// 获得图片列表
		getphoto(cateid){
			this.$http.get("http://www.liulongbin.top:3005/api/getimages/"+cateid)
			.then(result=>{
				if(result.body.status===0){
					this.photolist=result.body.message
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
*{
	touch-action:none;
}
.photo{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 6px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;//解决图片三像素的问题
		}
		img[lazy="loading"]{
		width: 40px;
		height: 300px;
		margin: auto;
		}
		.info{
			color: white;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,.4);
			max-height: 84px;
			.title{
				font-size: 14px;
			}
			.body{
				font-size: 13px;
			}
		}
		
	}

}

</style>

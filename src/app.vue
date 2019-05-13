<template>
    <div class="app-content">
        <!-- 顶部header区域 -->
        <!-- 使用mint-ui需要按需导入 -->
        <mt-header  fixed title="vue项目"></mt-header>

        <!-- 中间路由 router-view 区域 -->
		<transition > 
        	<router-view class="zhong"></router-view>
		</transition>
        <!-- 底部 tabber区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-li " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-li" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-li" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{$store.getters.getallcount}}</span>
                </span>
                
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-li" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>

</script>

 <style lang="scss" scoped>
	.app-content{
		overflow-x: hidden;//解决切换路由时横向超过页面宽度就隐藏
		padding: 40px 0 50px;
	}
	
   

	// 设置中间组件动画效果
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%); //控制离开时的方向
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
		position: absolute;
	}
.mui-bar-tab .mui-tab-item-li.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-li {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-li .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-li .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>
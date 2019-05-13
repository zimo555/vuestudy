<template>
    <div>
		<!-- 问题： 我们不知道何时能获得到maxnum,但总归有一刻，会得到maxnum -->
		<!-- 我们可以只用 watch 属性监听，来监听父组件传递过来的maxnum, -->
        <div class="mui-numbox" :data-number-min='1' :data-number-max='maxnum'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" 
			@change="numchanged" ref="num"/>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>
<script>
import mui from "../../lib/js/mui.js"
export default {
    data(){
		return {}
	},
	methods:{
		// 每当文本框的数据修改的时候，立即把最新的数据 ，通过事件调用传递给父组件
		numchanged(){
			this.$emit("getnum",parseInt(this.$refs.num.value));
		}
	},
	props:["maxnum"],
	watch:{
		//属性监听
		'maxnum':function(newval,oldval){
			mui(".mui-numbox").numbox().setOption('max',newval)
		}
	}
}
</script>
<style lang="scss" scoped>

</style>


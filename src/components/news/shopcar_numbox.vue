<template>
    <div>
		<!-- 问题： 我们不知道何时能获得到maxnum,但总归有一刻，会得到maxnum -->
		<!-- 我们可以只用 watch 属性监听，来监听父组件传递过来的maxnum, -->
        <div class="mui-numbox" :data-number-min='1' :data-number-max='60'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
			@change="countchanged" ref="numbox"  readonly  />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>
<script>
import mui from "../../lib/js/mui.js"

export default {
	mounted(){
		mui(".mui-numbox").numbox();
	},
  data(){
		return {}
	},
	methods:{
			countchanged(){
				this.$store.commit('updategoodsinfo',{id:this.goodsid,count:this.$refs.numbox.value})
			}
	},
	props:[
		'initcount','goodsid'
	]
}
</script>
<style lang="scss" scoped>

</style>
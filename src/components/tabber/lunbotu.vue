<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 将来，谁使用轮播图组件，就由谁来提供lunbotulist -->
          <mt-swipe-item  v-for="item in lunbotulist" :key="item.id">
              <img :src="item.img" :class="{'full':isfull}">
          </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ["lunbotulist","isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height:200px;
    .mint-swipe-item{
        text-align: center;
        img{
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>

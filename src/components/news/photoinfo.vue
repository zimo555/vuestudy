<template>
    <div class="photoinfocontent">
        <h1>{{photoinfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <vue-preview :slides="list" @close="handleClose"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content">
        </div> 
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
// 导入评论子组件
import comment from './commen.vue';

export default {
    data(){
        return {
            id:this.$route.params.id ,//从路由中获取的图片id
            photoinfo:{}, //图片详情
            list: []  //缩略图
        }
    },
    created(){
        this.getphotoinfo();
        this.getthumbs();
    },
    methods:{
        getphotoinfo(){
            //获取图片的详情
            this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/"+this.id)
            .then(result=>{
                if(result.body.status===0){
                    this.photoinfo=result.body.message[0]
                }
            })
        },
        // 获取缩略图
        getthumbs(){
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id)
            .then(result=>{
                if(result.body.status===0){
                    // 循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                    });
                    // 把完整的数据保存到list中
                    this.list = result.body.message

                }
            })
        },
        handleClose(){
            console.log('close')
        }
    },
    components:{
        'cmt-box': comment
    }
    
}
</script>
<style lang="scss" scoped>
.photoinfocontent{
    padding: 3px;
    h1{
        color: #26A2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>

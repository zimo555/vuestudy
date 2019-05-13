<template>
    <div class="newsinfo-contain">
        <!-- $route.params.id 是获取 以 /id 的形式传参的 id 的方法 -->
        <h1 class="title">{{newsinfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsinfo.click}}</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from './commen.vue' ;
export default{
    data(){
        return {
            id: this.$route.params.id,
            // 将 url 地址中传递过来的 Id值，挂载到data上，方便以后调用
            newsinfo: {}
        }

    },
    created(){
        this.getnew()  
    },
    methods:{
        getnew(){
            this.$http.get(`http://www.liulongbin.top:3005/api/getnew/${this.id}`).then(result=>{
                if(result.body.status===0){
                    this.newsinfo = result.body.message[0]
                }else{
                    Toast('获取新闻失败')
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>
<style lang="scss" >
.newsinfo-contain{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
            // 如果内容中有图片，要加这个样式，并且scoped要删除
        }
    }
}
</style>

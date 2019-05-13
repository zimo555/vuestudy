<template>
    <div class="goodsdesccontent">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>


</template>
<script>
export default {
    data(){
        return {
            info:{}, //图文介绍
            id: this.$route.params.id
        }
    },
    created(){
        this.getgoodsdesc();
    },
    methods:{
        getgoodsdesc(){
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getdesc/"+this.id)
            .then(result=>{
                if(result.body.status===0){
                    this.info=result.body.message[0];
                }
            })
        }
    }
}
</script>
<style lang="scss" >
.goodsdesccontent{
    padding: 4px;
    h3{
       font-size: 16px;
       color: #226aff;
       text-align: center;
       margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="cmt-contain">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入要bb的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
        
    
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time| dateFormat}}
                </div>
                <div class="cmt-body">{{item.content === 'undefined'? '此用户很懒，并没有发表评论' : item.content}}</div>
            </div>
        
        </div>
        <mt-button type="danger" size="large" plain @click="getmore" >加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            pageindex: 1,
            comments: [], //所有的评论数据
            msg: ""//评论输入的内容
        }
    },
    created(){
        this.getcomment()
    },
    methods:{
        getcomment(){
            this.$http.get("http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
                if(result.body.status===0){
                    // 每当点击加载更多获取新数据的时候，不要把老数据清空
                    this.comments = this.comments.concat(result.body.message)
                    // concat() 方法用于连接两个或多个数组。
                }else{
                    Toast("评论加载失败")
                }
            });
        },
        getmore(){
            this.pageindex++;
            this.getcomment();
        },
        postcomment(){
            //发表评论

            if(this.msg.trim().length===0){
                return Toast("评论内容不能为空！");
            }
            //参数1：q请求的url地址
            // 参数2：提交给服务器的数据对象{content: this.msg}
            //参数3：定义提交时候，表单中数据的格式 (emulateJson:true)
            this.$http.post("http://www.liulongbin.top:3005/api/postcomment/"+this.$route.params.id,{ 
                    content:this.msg.trim(), 
                },
                { 'Content-Type': 'application/x-www-form-urlencoded' })
                .then(function(result){
                    if(result.body.status===0){
                        //1. 拼接出一个评论对象
                        var cmt = {
                            user_name:'匿名用户',
                            add_time: Date.now(),
                            content: this.msg.trim()  //trim方法是将msg中的两端的空格删除
                        };
                        this.comments.unshift(cmt);  //unshif是将cmt加到comments数组的起始位置
                        this.msg= "";
                    }
                });
        }
    },
    props:["id"]
}
</script>
<style lang="scss" scoped>
    .cmt-contain{
        h1{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 10px 0;
            .cmt-item{
                font-size: 13px;
            }
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent:  2em;
            }
        }
    }
</style>

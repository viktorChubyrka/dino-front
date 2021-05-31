<template>
    <div>
        <div class="background-with-image"></div>
        <div class="blur-container">
            <img class="mb-20 image" :src="post.imageUrl" alt="">
            <h1 class="mb-10">{{post.title}}</h1>
            <h4 class="mb-20">{{post.bodyText}}</h4>
            <button v-if="user && user.isSuperuser" @click="post_modal_active=true" class="delete">Редагувати статтю</button>
            <div class="comment-block">
                <h2 v-if="post.comments">Коментарії</h2>
                <div v-if="user">
                    <textarea v-model="comment" class="comment-body" name="" id="" cols="30" rows="10"></textarea>
                    <button @click="commentPost()" class="comment dino-btn mb-20">Коментувати</button>
                </div>
                <div v-for="(comment,index) in post.comments" :key="index" class="comment-item mb-10">
                    <div class="comment-item-body">
                        <h3>{{comment.nickname}}</h3>
                        <h5>{{comment.comment}}</h5>
                    </div>
                    <button @click="deleteComment(comment.date)" v-if="user && user.isSuperuser" class="delete"> Видалити</button>
                </div>
            </div>
        </div>
        <div v-if="post_modal_active" class="update-post-modal">
            <CreatePostForm :post="post" @fail="post_modal_active=false" @updated="post_modal_active=false,getPost()" :update="true"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

import CreatePostForm from "../components/CreatePostForm.vue"

export default {
    components:{
        CreatePostForm
    },
    data:()=>{
        return {
            post:null,
            comment:null,
            post_modal_active:false
        }
    },
    methods:{
         async getPost(){
            let post = await axios.get('/api/posts/post'+this.$route.params.id);
            this.post = post.data;
        },
        async commentPost(){
            await axios.post('/api/posts/comment', {id:this.$route.params.id,nickname:this.user.nickname,comment:this.comment});
            this.getPost();
        },
        async deleteComment(date){
            await axios.post('/api/posts/delete_comment', {date,id:this.$route.params.id});
            this.getPost();
        },
        async updatePost(){

        }
    },
    created(){
        this.getPost();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    }
}
</script>
<style scoped>
.image{
    width:100%;
    height:80vh;
    object-fit: cover;
}
.comment{
    width:100%;
    border-radius: 3vh;
    border:none;
}
.comment-body{
    width:100%;
    border-radius: 3vh;
    padding: 2vh;
    box-sizing: border-box;
    font-size: 3vh;
}
.comment-body:focus{
    outline: none;
}
.comment-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.delete{
    width:10%
}
.comment-item-body{
    width:90%;
    box-sizing: border-box;
    padding-right:2%;
}
.update-post-modal{
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    z-index: 10;
    background: rgba(255, 200, 80, 0.884);
    backdrop-filter: blur(10px);
    padding: 10vh;
    box-sizing: border-box;
}
</style>
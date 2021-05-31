<template>
    <div>
        <div v-if="user && !user.isBlocked || !user">
            <div class="background-with-image"></div>
            <div class="blur-container ">
                <div class="page-head mb-20"> <h1 >Атлас</h1> <span v-if="user && user.isSuperuser" @click="create_post=!create_post" class="create-post">Створити статтю</span></div>
                <CreatePostForm class="mb-10" @created="create_post=false,getAllPosts()" @fail="create_post=false" v-if="create_post"/>
                <input v-model="filter" type="text" class="search mb-20" placeholder="Пошук">
                <div class="sorting-container">
                    <div class="sort-btn-container">
                        <button class="dino-btn mb-10" @click="sortByAlphabetDown()">В алфавітному порядку</button>
                        <button class=" dino-btn mb-10" @click="sortByAlphabetUp()">Проти алфавітного порядку</button>
                    </div>
                    <div class="sort-btn-container">
                        <button class=" dino-btn mb-10" @click="sortByDateDown()">За зростанням дати</button>
                        <button class=" dino-btn mb-10" @click="sortByDateUp()">За спаданням дати</button>
                    </div>
                </div>
                
                <div @click="goToPost(post._id)" v-for="post in filteredPosts" :key="post._id" class="mb-20 post-item">
                    <img :src="post.imageUrl" alt="">
                    <h2 class="title">{{post.title}}</h2>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="background-with-image"></div>
            <div  class="blur-container">
                <h1 style="text-align:center">Ваш аккаунт заблоковано!!!</h1>
            </div>
        </div>
    </div>
</template>
<script>
import CreatePostForm from "../components/CreatePostForm.vue"

import axios from 'axios'
export default {
    data:()=>{
        return{
            create_post:false,
            message:null,
            posts:null,
            filter:''
        }
    },
    components:{CreatePostForm},
    created(){
        this.getAllPosts();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        },
        filteredPosts(){
            if(this.posts){
                return this.posts.filter((el)=> el.title.toLowerCase().includes(this.filter.toLowerCase()))
            }
            else return []
            
        }
    },
    methods:{
        async getAllPosts(){
            let posts = await axios.get('/api/posts/all_posts');
            this.posts = posts.data.reverse();
        },
        goToPost(postId){
            this.$router.push(`/post${postId}`)
        },
        sortByAlphabetDown(){
            this.posts.sort(function(a, b){
                if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
                if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
                return 0;
            })
        },
        sortByAlphabetUp(){
            this.posts.sort(function(a, b){
                if(a.title.toLowerCase() > b.title.toLowerCase()) { return -1; }
                if(a.title.toLowerCase() < b.title.toLowerCase()) { return 1; }
                return 0;
            })
        },
        sortByDateDown(){
            this.posts.sort(function(a, b){
                if(a.data < b.data) { return -1; }
                if(a.data > b.data) { return 1; }
                return 0;
            })
        },
        sortByDateUp(){
            this.posts.sort(function(a, b){
                if(a.data > b.data) { return -1; }
                if(a.data < b.data) { return 1; }
                return 0;
            })
        }
    }
}
</script>
<style scoped>
.page-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.create-post{
    font-size: 3vh;
    cursor: pointer;
    border-radius: 2vh;
    padding:0 1vh;
    transition: background 0.5s;
}
.create-post:hover{
    background: white;
}
.post-item{
    display: flex;
    align-items: center;
    cursor: pointer;
    width:100%;
    transition: background 0.5s;
    border-radius: 10vh;
    padding: 2vh;
    box-sizing: border-box;
}
.post-item:hover{
    background: rgba(255, 255, 255, 0.664);
}
.post-item img{
    width:20vh;
    height: 20vh;
    object-fit: cover;
    border-radius: 10vh;
    margin-right: 10vh;
}
.search{
    width:100%;
    height:5vh;
    border-radius:2vh;
    border:none;
    padding: 0 3vh;
    box-sizing: border-box;
    font-size: 3vh;
}
.search:focus{
    outline: none;
}.sorting-container{
    display: flex;
    justify-content: space-between;
}
.sort-btn-container{
    display: flex;
    flex-direction: column;
}
.sort-btn-container button.dino-btn{
    padding: 0 1vh;
    border-radius: 1vh;
    border:none;
    width:max-content
}
</style>
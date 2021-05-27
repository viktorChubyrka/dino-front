<template>
    <div class="create-post-form">
        <h5>Назва статті</h5>
        <input v-model="title" class="mb-10" type="text">
        <h5 v-if="!update">Картинка статті</h5>
        <h5 v-else>Змінити картинку статті</h5>
        <input  class="mb-10" id="file-input" type="file">
        <h5>Тіло статті</h5>
        <textarea v-model="description" class="mb-10" name="" id="" cols="30" rows="10"></textarea>
        <button v-if="!update" @click="createPost()">Створити статтю</button>
        <button class="mb-10" v-else @click="updatePost()">Редагувати статтю</button>
        <button v-if="update" @click="$emit('fail')">Відмінити редагування</button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:{
        update:{
            type:Boolean,
            default:false
        },
        post:{
            type:Object,
            default:()=>{}
        }
    },
    data:()=>{
        return{
            title:null,
            description:null,
        }
    },
    created(){
        if(this.update){
            this.title = this.post.title;
            this.description = this.post.bodyText;
        }
    },
    methods:{
        async createPost(){
            var image = document.getElementById("file-input").files[0];
            if(this.title && this.description && image){
                var formData = new FormData();
                formData.append("file", image);
                formData.append('title',this.title);
                formData.append("description",this.description);
                let res = await axios.post('api/posts/create',formData);
                if(res.data.data.status == 200){
                    this.$emit('created')
                }else{
                    this.$emit('fail')
                }
            }
        },
        async updatePost(){
            var image = document.getElementById("file-input").files[0];
            var formData = new FormData();
            if(image){
                formData.append("file", image);
            }
            if(this.title && this.description){
                formData.append('id',this.post._id);
                formData.append('title',this.title);
                formData.append("description",this.description);
                let res = await axios.post('api/posts/update',formData);
                if(res.data.data.status == 200){
                    this.$emit('updated')
                }else{
                    this.$emit('fail')
                }
            }
        }
    }
}
</script>
<style scoped>
.create-post-form{
    display: flex;
    flex-direction: column;
}
</style>
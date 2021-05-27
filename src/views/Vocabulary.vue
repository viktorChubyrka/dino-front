<template>
    <div>
        <div class="background-with-image"></div>
        <div class="blur-container">
            <h1 class="mb-20">Словник</h1>
            <div v-if="user.isSuperuser" class="add-word-form">
                <div>
                    <h3>Слово</h3>
                    <input v-model="word" type="text">
                </div>
                <div>
                    <h3>Значення слова</h3>
                    <textarea v-model="description" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <button @click="addWord()">Додати слово</button>
            </div>
                
            <div v-for="word in words" :key="word._id" class="mb-10 vocabulary-item">
                <h3 class="word">{{word.word}}</h3> - <h4 class="description">{{word.description}}</h4> <button @click="deleteWord(word._id)" style="float:right">Видалити</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data:()=>{
        return {
            words:null,
            word:null,
            description:null
        }
    },
    methods:{
        async getWords(){
            let words = await axios.get('https://dino-back.herokuapp.com/api/vocabulary/words');
            this.words = words.data;
        },
        async deleteWord(id){
            await axios.post('https://dino-back.herokuapp.com/api/vocabulary/delete', {id});
            this.getWords();
        },
        async addWord(){
            if(this.words && this.description) {
                await axios.post('https://dino-back.herokuapp.com/api/vocabulary/add', {word:this.word,description:this.description});
                this.getWords();
            }
        }
    },
    created(){
          let user = JSON.parse(localStorage.getItem('user'));
        if(user){
        this.$store.commit('setUser',user);
        }else{
        this.$router.push('/login')
        }
        this.getWords();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
}
</script>

<style scoped>
.vocabulary-item{
    text-align: left;
    font-size: 3vh;
}
.vocabulary-item h3,h4{
    display: inline;
}
.add-word-form{
    display: flex;
    align-items: center;justify-content: space-between;
}
</style>
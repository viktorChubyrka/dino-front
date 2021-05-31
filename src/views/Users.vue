<template>
    <div>
        <div class="background-with-image"></div>
        <div v-if="user.isSuperuser" class="blur-container">
            <div v-for="user in users" :key="user._id" class="user">
                <h2>{{user.nickname}}</h2>
                <button @click="deleteUser(user._id)" v-if="!user.isSuperuser">Видалити користувача</button>
                <button @click="blockUser(user._id)" v-if="!user.isSuperuser">{{user.isBlocked?'Розблокувати користувача':'Заблокувати користувача'}}</button>
                <button @click="setSuperuser(user._id)" >{{user.isSuperuser?'Забрати права адміністратора':'Надати права адміністратора'}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data:()=>{
        return {
            users:null
        }
    },
    methods:{
        async getUsers(){
            let users = await axios.get('/api/users/get_all_users');
            this.users = users.data;
        },
        async deleteUser(id){
            await axios.post('/api/users/delete', {id});
            this.getUsers();
        },
        async blockUser(id){
            await axios.post('/api/users/block', {id});
            this.getUsers();
        },async setSuperuser(id){
            await axios.post('/api/users/set_superuser', {id});
            this.getUsers();
        },
    },
    created(){
        this.getUsers();
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    }
}
</script>
<style scoped>
.user{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}
</style>
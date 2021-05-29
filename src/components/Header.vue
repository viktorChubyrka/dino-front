<template>
    <div class="header">
        <div v-if="user && !user.isBlocked  || !user" @click="goTo('')" :class="{'nav-link':true,'active':isActive('home')}">Головна</div>
        <div v-if="user && !user.isBlocked || !user" @click="goTo('atlas')" :class="{'nav-link':true,'active':isActive('atlas')}">Атлас</div>
        <div v-if="user && !user.isBlocked || !user" @click="goTo('vocabulary')" :class="{'nav-link':true,'active':isActive('vocabulary')}">Словник</div>
        <div v-if="user && !user.isBlocked || !user" @click="goTo('about')" :class="{'nav-link':true,'active':isActive('about')}">Про автора</div>
        <div v-if="user && user.isSuperuser" @click="goTo('users')" :class="{'nav-link':true,'active':isActive('users')}">Користувачі</div>
        <div @click="logOut()" class="nav-link">{{user?"Вихід":"Увійти"}}</div>
    </div>
</template>
<script>
export default {
    methods:{
        goTo(link){
            this.$router.push(`/${link}`)
        },
        isActive(link){
            return link == this.$route.name
        },
        logOut(){
            if(this.user){
                localStorage.removeItem('user');
                this.$router.push('/login')
            }else{
                this.$router.push('/login')
            }
        }
       
    },
    computed:{
        user(){
            return this.$store.getters.user;
        }
    }
}
</script>
<style scoped>
.header{
    position: absolute;
    top:0;
    left:0;
    z-index: 3;
    width:100vw;
    padding:0 1.111vh;
    height:10vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    backdrop-filter: blur(5px);
}
.nav-link{
    margin:0 1vh;
    cursor:pointer;
     color: rgb(245, 54, 7);
}
.nav-link.active{
    color:brown;
    pointer-events:none;
}
.nav-link:hover{
    color:brown;
}
</style>
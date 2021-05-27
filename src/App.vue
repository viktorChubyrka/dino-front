<template>
  <div id="app">
    <Header v-if="isUserAutorizated"/>
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components:{
    Header
  },
  created(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
       this.$store.commit('setUser',user);
       this.$router.push('/')
    }
    else{
      this.$router.push('/login')
    }
  },
  computed:{
    isUserAutorizated(){
      return this.$route.name != 'register' && this.$route.name != 'login'
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
    <div>
        <div class="background-with-image"></div>
        <div class="blur-container">
            <h1 class="mb-20">Нодь Олександр</h1>
            <h3 class="mb-10">Cтудент 4 курсу напрямку "Інженерія Програмного забезпечення"</h3>
            <h5>Даний сайт було створено в рамках дипломного проєкту</h5>
        </div>
    </div>
</template>
<script>
export default {
    created(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
       this.$store.commit('setUser',user);
    }else{
      this.$router.push('/login')
    }
  },
}
</script>
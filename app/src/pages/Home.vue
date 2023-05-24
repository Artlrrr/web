<template>
    <div class="main">
        <h1>Главная страница приложения</h1>
        <MyButton v-if="isAdmin" class="homebutton" @click="$router.push('/users')">Users</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),
    }
}
</script>

<style scoped>
.main {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
h1{
    font-size: 30px;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Arial;
}
.homebutton{
    max-width: 10%;
}

</style>
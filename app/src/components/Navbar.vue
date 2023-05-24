<template>
    <div class="navbar">
        <div class="navbar_a">
            <a  @click="$router.push('/')">Домашняя страницы</a>
            <a  @click="$router.push('/catalog')">Каталог</a>
            <a  @click="onBasketClick">Корзина</a>
            <a  @click="$router.push('/myorders')">История заказов</a>

            <div v-if="isAuth" class="login_a"> 
                <h3>{{ username }}</h3>
                <a @click="Logout">Выйти</a>
            </div>
            <div v-else class="login_a">
                <a @click="$router.push('/login')">Войти</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Navbar',
    emits: ['onBasketClick'],
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            username: state => state.auth.username
        }),
    },
    methods: {
        ...mapMutations({
            Auth: 'auth/Auth'
        }),
        Logout() {
            this.Auth({
                isAuth: false,
                token: "",
                roles: [],
                username: ''
            })
            this.$router.push('/')
        },
        onBasketClick() {
            this.$emit('onBasketClick')
        }
    }
}
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
}
.navbar_a { 
    width: 100%;
    margin-left: 15px;
    display: flex;
    align-items: center;
}

.login_a {
    display: flex; 
    margin-left: auto;
    align-items: center;
}

a {
  display: block;
  padding: 8px;
  background-color: none;
  color: white;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
}
h3{
    color:white;
}
</style>
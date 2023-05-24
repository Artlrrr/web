<template>
  <Navbar @onBasketClick="onBasketClick"></Navbar>
  <div class="app">
      <router-view style="min-height: 100%;"></router-view>
  </div>  
  <MyDialog v-model:show="dialogVisible"
    :content_width="60">
    <BasketList @onHide="hideDialog"></BasketList>
  </MyDialog>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import BasketList from './components/BasketList.vue';
import Navbar from './components/Navbar.vue';


export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
        ...mapMutations({
            Auth: "auth/Auth",
            basket_cells_set: "basket/basket_cells_set"
        }),
        onBasketClick() {
          this.dialogVisible = true
        },
        hideDialog() {
          this.dialogVisible = false
        }
    },
    mounted() {
        const auth_params = localStorage.getItem("auth_params");
        this.Auth(JSON.parse(auth_params));
        const basket_cells = localStorage.getItem("basket_cells");
        this.basket_cells_set(JSON.parse(basket_cells));
    },
    components: { BasketList, Navbar }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding: 0px;
  min-height: 100%;
}
</style>
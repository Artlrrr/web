<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-if="basket_cells.length == 0">
        <text>Ваша корзина пуста</text>
    </div>
    <div v-else class="cells">
        <strong>Итоговая цена: {{ total_cost }} руб.</strong>
        <BasketItem @onItemChange="calc_cost"
            v-for="cell in basket_cells"
            :cell="cell"
            :key="cell._id"
            style="margin-top: 10px;"
        ></BasketItem>
        <MyButton
            @click="createOrder"
            style="align-self: center;"
        >Создать заказ</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import BasketItem from './BasketItem.vue';

export default {
    components: { BasketItem },
    emits:['onHide'],
    data() {
        return {
            total_cost: 0,
            error: '',
            isError: false
        }
    },
    methods: {
        ...mapMutations({
            basket_cells_set: 'basket/basket_cells_set'
        }),
        calc_cost() {
            let new_total_cost = 0
            this.basket_cells.forEach(bi => {
                new_total_cost += bi.price * bi.count
            });

            this.total_cost = new_total_cost
        },
        async createOrder() {
            try {
                const new_basket_cells = []
                for(let i = 0; i < this.basket_cells.length; i++) {
                    new_basket_cells.push(this.basket_cells[i])
                }
                const response = await axios.post(
                    'http://localhost:4000/createorder', 
                    {
                        cells: new_basket_cells
                    },
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        },
                    }
                )
                this.basket_cells_set([])
                this.$emit('onHide')
                this.$router.push('/ordersuccess')
            } catch (e) {
                console.log(e)
                this.error = e.response.data.error.message
                this.isError = true
            }
        }
    },
    computed: {
        ...mapState({
            basket_cells: state => state.basket.basket_cells,
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        })
    },
    mounted() {
        this.calc_cost()
    }
}
</script>

<style scoped>
.cells {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
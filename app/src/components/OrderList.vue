<template>
    <div v-for="order in orders">
        <text><strong>Заказ №:</strong> {{ order._id }}</text>
        <div>
            <BasketItem 
                v-for="cell in order.order_items" 
                :cell="cell"
                :showAddMinus="false"
            ></BasketItem>
        </div>
    </div>
</template>

<script>
import BasketItem from './BasketItem.vue';

export default {
    props: {
        orders: { type: Array, required: true }
    },
    components: { BasketItem }
}
</script>

<style scoped>
* {
    padding: 10px;
}
.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
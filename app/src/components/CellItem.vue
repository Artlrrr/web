<template>
    <div class="cell">
        <div>
            <img :src="cell.img"
            height="128"
            />
        </div>
        <div 
            style="margin-left: 15px;"
            class="item__desc"
        >
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Название: </strong>
                <text>{{ cell.title }}</text>
            </div>
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Описание: </strong>
                <text>{{ cell.desc }}</text>
            </div>
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Цена: </strong>
                <text>{{ cell.price }} руб.</text>
            </div>
        </div>
        <div class="item__btns">
            <MyButton @click="$router.push('/cells/' + cell._id)"> Подробнее </MyButton>
            <MyButton v-if="!hideAddBusket"
                @click="addToBasket" 
                style="margin-left: 15px; width: max-content;"
            > В корзину </MyButton>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    props: {
        cell: {
            type: Object,
            requred: true
        },
        hideAddBusket: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapMutations({
            basket_cells_set: 'basket/basket_cells_set'
        }),
        addToBasket() {
            const new_basket_cells = []
            let added = false
            for(let i = 0; i < this.basket_cells.length; i++) {
                new_basket_cells.push(this.basket_cells[i])
                if (this.basket_cells[i]._id == this.cell._id) {
                    new_basket_cells[i].count += 1
                    added = true
                }
            }
            if (!added) {
                new_basket_cells.push({...this.cell, count: 1})
            }

            this.basket_cells_set(new_basket_cells)
        }
    },
    computed: {
        ...mapState({
            basket_cells: state => state.basket.basket_cells
        })
    }
}
</script>

<style scoped>
.cell {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-cellc: normal;
    justify-content:left;
}
.item__desc {
    display:flex;
    flex-direction: column;
}
.item__desc__item {
    display: flex;
    flex-direction: row;
}
.item__btns {
    display: flex;
    margin-left: auto;
    align-cellc: center;
}
</style>
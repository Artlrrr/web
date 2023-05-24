<template>
    <div class="item">
        <div>
            <img :src="cell.img"
            height="128"/>
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
            <MyButton 
                @click="$router.push('/cells/' + cell._id)"
                style="width: fit-content;"
                >Подробнее</MyButton>
        </div>
        <div class="item__btns xd">
            <MyButton v-if="showAddMinus" @click="minus"> - </MyButton>
            <strong v-if="!showAddMinus">Кол-во:</strong> <MyButton> {{ cell.count }} </MyButton>
            <MyButton v-if="showAddMinus" @click="add"> + </MyButton>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {  
        }
    },
    props: {
        cell: {
            type: Object,
            requred: true
        },
        showAddMinus: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        ...mapMutations({
            basket_cells_set: 'basket/basket_cells_set'
        }),
        add() {
            const new_basket_cells = []
            for(let i = 0; i < this.basket_cells.length; i++) {
                new_basket_cells.push(this.basket_cells[i])
                if (this.basket_cells[i]._id == this.cell._id) {
                    new_basket_cells[i].count += 1
                }
            }
            this.basket_cells_set(new_basket_cells)
            this.onItemChange()
        },
        minus() {
            const new_basket_cells = []
            for(let i = 0; i < this.basket_cells.length; i++) {
                new_basket_cells.push(this.basket_cells[i])
                if (this.basket_cells[i]._id == this.cell._id) {
                    new_basket_cells[i].count -= 1
                    if(new_basket_cells[i].count < 1) {
                        new_basket_cells.pop()
                    }
                }
            }
            this.basket_cells_set(new_basket_cells)
            this.onItemChange()
        },
        onItemChange() {
            this.$emit('onItemChange')
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
.item {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: normal;
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
    align-items: center;
    white-space: nowrap;
}
</style>
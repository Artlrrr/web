<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-else class="m">
        <div v-if="isError" class="error">
            <text>{{ error }}</text>
        </div>
        <text class="mt10"><strong>Название:</strong> {{ cell.title }}</text>
        <text class="mt10"><strong>Описание:</strong> {{ cell.desc }}</text>
        <text class="mt10"><strong>Характеристики:</strong> {{ cell.specifications }}</text>
        <text class="mt10"><strong>Цена, руб.:</strong> {{ cell.price }}</text>
        <text class="mt10"><strong>Изображение:</strong></text> 
        <div>
            <img :src="cell.img" height="512" w>
        </div>
        <div v-if="isAdmin" style="display: flex; flex-direction: column;">
            <MyDialog v-model:show="showDialog">
                <CellEdit @onCellEdit="onCellEdit" :cell="cell" :category="category"></CellEdit>
            </MyDialog>
            <MyButton
                class="mt10"
                @click="onEdit"
            >Редактировать</MyButton>
            <MyButton
                class="mt10"
                @click="onDelete"
            >Удалить</MyButton>
        </div>
        <MyButton
            class="mt10"
            @click="toBasket"
        >В корзину</MyButton>
    </div>
</template>

<script>
import CellEdit from '@/components/CellEdit.vue';
import axios from 'axios';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            cell: {},
            showDialog: false,
            isError: false,
            error:''
        };
    },
    methods: {
        ...mapMutations({
            basket_cells_set: 'basket/basket_cells_set'
        }),
        onEdit() {
            this.showDialog = !this.showDialog
        },
        onCellEdit() {
            this.$router.go()
        },
        async onDelete() {
            try {
                const response = await axios.delete("http://localhost:4000/admin/cells/" + this.$route.params.id,
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                });
                this.isError = false;
                this.error = "";
                this.$router.go()
            } catch(e) {
                console.log(e)
                this.isError = true;
                this.error = e.response.data.error.message;
            }
        },
        toBasket() {
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
    async mounted() {
        try {
            const response = await axios.get("http://localhost:4000/cells/" + this.$route.params.id, {
                headers: {
                    Authorization: "Bearer " + this.token
                },
            });
            //console.log(response.data);
            this.isError = false;
            this.error = "";
            this.cell = response.data.cell;
            this.category = response.data.category;
        }
        catch (e) {
            console.log(e);
            this.isError = true;
            this.error = e.response.data.error.message;
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token,
            basket_cells: state => state.basket.basket_cells
        }),
        ...mapGetters({
            isAdmin: "auth/isAdmin",
        }),
    },
    components: { CellEdit }
}
</script>

<style scoped>
.m {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}
.mt10 {
    margin-top: 10px;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
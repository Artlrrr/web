<template>
    <div class="m">
        <div v-if="isError" class="error">
            <text>{{ error }}</text>
        </div>
        <text class="mt10">Название:</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="title"
        ></MyInput>
        <text class="mt10">Описание:</text>
        <MyTextarea 
            style="width: 400px;"
            v-model:value="desc"
            rows="4"
        ></MyTextarea>
        <text class="mt10">Характеристики:</text>
        <MyTextarea 
            style="width: 400px;"
            v-model:value="specifications"
            rows="8"
        ></MyTextarea>
        <text class="mt10">Цена, руб.:</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="price"
        ></MyInput>
        <text class="mt10">Изображение:</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="img"
        ></MyInput>
        <MyButton
            class="mt10"
            @click="onCellCreate"
        >Создать</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            desc: '',
            specifications: '',
            price: '',
            img: '',
            isError: false,
            error: ''
        }
    },
    methods: {
        async onCellCreate() {
            const price = parseInt(this.price)
            if (isNaN(price)) {
                this.isError = true;
                this.error = 'Неверный формат цены'
                return
            }

            try {
                const response = await axios.post(
                    'http://localhost:4000/admin/cells/create', 
                    {
                        cell: {
                            title: this.title,
                            desc: this.desc,
                            specifications: this.specifications,
                            price: price,
                            img: this.img,
                        }
                    },
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        },
                    }
                )

            } catch (e) {
                console.log(e)

                this.isError = true;
                this.error = e.response.data.error.message
            }
            
            this.isError = false
            this.$emit('onCellreate', {})
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    }
}
</script>

<style scoped>
.m {
    display: flex;
    flex-direction: column;
}
.mt10 {
    margin-top: 10px;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
}
</style>
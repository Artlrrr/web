<template>
    <div style="display:flex;  min-height: 100%;">
        <div style="width:100%; margin-left: 15px; margin-top: 15px;">
            <div v-if="isAdmin">
                <MyDialog 
                    v-model:show="dialogShow"
                >
                    <CellCreate
                        @onCellCreate="onCellCreate"
                    ></CellCreate>
                </MyDialog>
                <MyButton
                    @click="showAddCellDialog"
                >Создать тип хранящегося объекта</MyButton>
            </div>
            <MyInput 
                v-model:value="cellSearchQuery"
                placeholder="Выполняется поиск"
            ></MyInput>
            <CellList
                v-model:cells="searchedCells"
            ></CellList>
        </div>
    </div>
</template>

<script>
import CellList from '@/components/CellList.vue';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import CellCreate from '@/components/CellCreate.vue';

export default {
    components: {CellList, CellCreate} ,
    data() {
        return {
            cells: [],
            page: 1,
            limit: 10,
            pagesTotal: 1,
            isError: false,
            error: '',
            cellSearchQuery: '',
            dialogShow: false,
            dialogValue: ''
        }
    },
    async mounted() {
        await this.loadCells()
    },
    methods: {
        ...mapMutations({
            basket_cells_set: 'basket/basket_cells_set'
        }),
        showAddCellDialog() {
            this.dialogShow = true
        },
        async onCellCreate() {
            this.dialogShow = false
            this.$router.go()
        },
        async loadCells() {
                try {
                    const response = await axios.get(
                    'http://localhost:4000/cells', 
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        }
                    }
                )
                console.log(response.data.cells)
                this.cells = response.data.cells
                
                this.isAuthError = false 
                } catch (e) {
                    console.log(e)
                    this.isError = true
                    this.error = e.response.data.error.message
                }
            }
            
        },
    computed: {
        ...mapState({
            basket_cells: state => state.basket.basket_cells
        }),
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),
        searchedCells() {
            return this.cells.filter((c) => {
                return c.title.includes(this.cellSearchQuery)
            })
        }
    }
}
</script>

<style scoped>
</style>
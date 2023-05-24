<template>
    <div class="cells">
        <CellItem 
            v-for="cell in cells"
            :cell="cell"
            :key="cell._id"
            :hideAddBusket="hideAddBusket"
        ></CellItem >
    </div>
</template>

<script>
import CellItem from './CellItem.vue';

export default {
    props: {
        cells: {
            type: Array,
            required: true
        },
        hideAddBusket: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    },
    components: { CellItem}
}
</script>

<style scoped>
.cells {
    margin-top: 15px;
}
</style>
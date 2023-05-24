<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton'
}
</script> 

<style scoped>
.btn {
    padding: 10px 15px;
    background: #333;
    color: white;
    border: 1px solid rgb(15, 15, 15);
    cursor: pointer;
    border-radius: 12px;
}
</style>

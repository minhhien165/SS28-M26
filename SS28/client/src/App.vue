<template>
  <div class="container">
    <ProductList />
    <Cart />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>

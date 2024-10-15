<template>
  <div class="product-list">
    <h2>List Product</h2>
    <div v-for="(product, index) in availableProducts" :key="index" class="product-item">
      <img :src="product.image" :alt="product.name" />
      <div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: $ {{ product.price }}</p>
        <div>
          <input type="number" v-model.number="product.addedQuantity" min="1" />
          <button :disabled="product.quantity === 0" @click="addToCart(product)">Add to cart</button>
          <p><b>Total:</b> $ {{ product.price * product.addedQuantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Fetch products on mount
onMounted(() => {
  store.dispatch('product/fetchProducts');
});

// Get products from the Vuex store
const availableProducts = computed(() => store.getters['product/availableProducts']);

// Add product to cart
const addToCart = (product) => {
  store.dispatch('cart/addToCart', product);
};
</script>

<style scoped>
.product-list {
  width: 45%;
}
.product-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
}
img {
  width: 100px;
  height: 100px;
}
</style>

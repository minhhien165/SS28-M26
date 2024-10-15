<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <div v-if="cartItems.length">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div>
          <h3>{{ item.name }}</h3>
          <p>$ {{ item.price * item.quantity }}</p>
          <div>
            <input type="number" v-model.number="item.quantity" min="1" @change="updateCart(item)" />
            <button @click="removeFromCart(item.id)">Remove</button>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
        </div>
      </div>
      <div class="subtotal">
        <h3>Subtotal: $ {{ cartTotal }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Fetch cart items on mount
onMounted(() => {
  store.dispatch('cart/fetchCart');
});

// Get cart items and total from the Vuex store
const cartItems = computed(() => store.getters['cart/cartItems']);
const cartTotal = computed(() => store.getters['cart/cartTotal']);

// Update product in the cart
const updateCart = (item) => {
  store.dispatch('cart/updateCartItem', { productId: item.id, quantity: item.quantity });
};

// Remove product from cart
const removeFromCart = (id) => {
  store.dispatch('cart/removeFromCart', id);
};
</script>

<style scoped>
.shopping-cart {
  width: 45%;
}
.cart-item {
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
.subtotal {
  margin-top: 2rem;
  font-weight: bold;
}
</style>

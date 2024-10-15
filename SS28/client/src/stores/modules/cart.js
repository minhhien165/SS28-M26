import axios from 'axios';

const cart = {
  namespaced: true, // Enable namespacing
  state: {
    cart: []
  },
  mutations: {
    SET_CART(state, cart) {
      state.cart = cart;
    },
    ADD_TO_CART(state, product) {
      const item = state.cart.find(p => p.id === product.id);
      if (item) {
        item.quantity += product.addedQuantity;
      } else {
        state.cart.push({ ...product, quantity: product.addedQuantity });
      }
    },
    UPDATE_CART_ITEM(state, { productId, quantity }) {
      const item = state.cart.find(p => p.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  actions: {
    async fetchCart({ commit }) {
      const response = await axios.get('http://localhost:3000/cart');
      commit('SET_CART', response.data);
    },
    async addToCart({ commit, dispatch }, product) {
      // Add to cart
      await axios.post('http://localhost:3000/cart', {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.addedQuantity
      });
      commit('ADD_TO_CART', product);
      
      // Update product quantity in stock
      await dispatch('product/updateProductQuantity', {
        productId: product.id,
        quantity: product.addedQuantity
      }, { root: true }); // root: true is needed when dispatching actions from another module
    },
    async updateProductQuantity({ commit }, { productId, quantity }) {
      const product = await axios.get(`http://localhost:3000/products/${productId}`);
      const updatedQuantity = product.data.quantity - quantity;
      
      await axios.patch(`http://localhost:3000/products/${productId}`, { quantity: updatedQuantity });
      commit('UPDATE_PRODUCT_QUANTITY', { productId, quantity });
    },
    async updateCartItem({ commit }, { productId, quantity }) {
      await axios.patch(`http://localhost:3000/cart/${productId}`, { quantity });
      commit('UPDATE_CART_ITEM', { productId, quantity });
    },
    async removeFromCart({ commit }, productId) {
      await axios.delete(`http://localhost:3000/cart/${productId}`);
      commit('REMOVE_FROM_CART', productId);
    }
  },
  getters: {
    cartItems(state) {
      return state.cart;
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  }
};

export default cart;

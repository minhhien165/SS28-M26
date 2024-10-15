import axios from 'axios';

const product = {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    UPDATE_PRODUCT_QUANTITY(state, { productId, quantity }) {
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.quantity -= quantity;
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('http://localhost:3000/products');
      commit('SET_PRODUCTS', response.data);
    }
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.quantity > 0);
    },
    allProducts(state) {
      return state.products;
    }
  }
};

export default product;

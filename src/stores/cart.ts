import { defineStore } from 'pinia'
import { Bean } from '../types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as Bean[],
  }),
  getters: {
    getCart(): Bean[] {
      return this.cart;
    },
    getCartItemCount(): number {
      return this.cart.length;
    },
  },
  actions: {
    addToCart(bean: Bean) {
      this.cart.push(bean);
    },
    removeFromCart(bean: Bean) {
      this.cart = this.cart.filter((b) => b.id !== bean.id);
    },
  },
});

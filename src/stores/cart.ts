import { defineStore } from 'pinia'
import { Bean, Cart, CartBean } from '../types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: { beans: [] } as Cart,
  }),
  getters: {
    getCart(): Cart {

      return this.cart;
    },
    getCartItemCount(): number {
      return this.cart.beans.reduce((acc, bean) => acc + bean.quantity, 0);
    },
    getCartTotal(): number {
      return this.cart.beans.reduce((acc, bean) => acc + bean.quantity * bean.cost, 0);
    },
    getCartQuantity(): number {
      return this.cart.beans.reduce((acc, bean) => acc + bean.quantity, 0);
    },
  },
  actions: {
    addToCart(bean: CartBean) {
      if (this.cart.beans.some((b) => b.id === bean.id)) {
        this.cart.beans = this.cart.beans.map((b) => {
          if (b.id === bean.id) {
            return { ...b, quantity: b.quantity + 1 };
          }
          return b;
        });
        return;
      }
      this.cart.beans.push(bean);
    },
    removeFromCart(bean: Bean) {
      this.cart.beans = this.cart.beans.filter((b) => b.id !== bean.id);
    },
  },
});

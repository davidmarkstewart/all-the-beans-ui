import { defineStore } from 'pinia'
import beansData from '../data/beans.json';
import { Bean } from '../types';

export const useBeansStore = defineStore('beans', {
  state: () => ({
    beans: beansData,
  }),
  getters: {
    getBeans(): Bean[] {
      return this.beans;
    },
    getBeanById: (state) => {
      return (id: string) => state.beans.find((bean) => bean._id === id)
    },
  },
});

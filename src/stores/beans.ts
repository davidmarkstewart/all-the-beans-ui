import { defineStore } from 'pinia'
import beansData from '../data/beans.json';

export const useBeansStore = defineStore('beans', {
  state: () => ({
    beans: beansData,
  }),
});
import { defineStore } from 'pinia';
import beanJson from '../data/beans.json';
import { Bean, RawBean } from '../types';

export const useBeansStore = defineStore('beans', {
  state: () => ({
    beans: parseBeanJson(beanJson as unknown as RawBean[]),
  }),
  getters: {
    getBeans(): Bean[] {
      return this.beans;
    },
    getFilteredBeans: (state) => (filters: { country: string; colour: string; cost: string }) => {
      const [minCost, maxCost] = filters.cost.split('-').map(parseFloat);
  
      return state.beans.filter((bean) => {
        if (filters.country && bean.country !== filters.country) return false;
        if (filters.colour && bean.colour !== filters.colour) return false;
        if (filters.cost && (bean.cost < minCost || (maxCost && bean.cost > maxCost))) return false;
        return true;
      });
    },
    getBeanCountries: (state) => [...new Set(state.beans.map((bean) => bean.country))],
    getBeanColours: (state) => [...new Set(state.beans.map((bean) => bean.colour))],
    getBeanById: (state) => (id: string) => state.beans.find((bean) => bean.id === id),
    getBeanOfTheDay: (state) => {
      const bean = state.beans.find((bean) => bean.isBOTD);
      if (!bean) {
        throw new Error('Bean of the day not found');
      }
      return bean;
    },
  },
  actions: {
    getFilteredBeansCostRanges(beans: Bean[]) {
      const costValues = beans.map(bean => bean.cost);
      const minCost = Math.min(...costValues);
      const maxCost = Math.max(...costValues);
      const ranges = [];
      const step = 10;

      for (let i = Math.floor(minCost / step) * step; i < maxCost; i += step) {
        const rangeBeans = beans.filter(bean => bean.cost >= i && bean.cost < i + step);
        if (rangeBeans.length > 0) {
          ranges.push({ label: `£${i} - £${i + step}`, value: `${i}-${i + step}` });
        }
      }
    
      return ranges;
    },
    getFilteredBeansColours(beans: Bean[]) {
      const colours = beans.map(bean => bean.colour);
      return [...new Set(colours)];
    },
    getFilteredBeansCountries(beans: Bean[]) {
      const countries = beans.map(bean => bean.country);
      return [...new Set(countries)];
    }
  }
});

const parseBeanJson = (beansData: RawBean[]): Bean[] => {
  return beansData.map((bean) => ({
    id: bean._id,
    index: bean.index,
    isBOTD: bean.isBOTD,
    name: bean.Name,
    country: bean.Country,
    colour: bean.colour,
    cost: parseFloat(bean.Cost.replace('£', '')),
    image: bean.Image,
    description: bean.Description,
  }));
};
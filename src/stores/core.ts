import { defineStore } from 'pinia';

export const useCoreStore = defineStore('core', {
  state: () => ({
    pageHeader: 'Beans',
  }),
  getters: {
    getPageHeader: (state) => state.pageHeader,
  },
  actions: {
    setPageHeader(header: string) {
      this.pageHeader = header;
    },
  }
});

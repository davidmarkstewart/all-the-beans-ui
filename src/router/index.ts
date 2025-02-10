import { createRouter, createWebHistory } from 'vue-router';
import BeanList from '../views/BeanList.vue';
import BeanDetail from '../views/BeanDetail.vue';
import OrderForm from '../views/OrderForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'BeanList',
      component: BeanList,
    },
    {
      path: '/bean/:id',
      name: 'BeanDetail',
      component: BeanDetail,
    },
    {
      path: '/order',
      name: 'OrderForm',
      component: OrderForm,
    }
  ],
});

export default router;
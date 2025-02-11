import { createRouter, createWebHistory } from 'vue-router';
import BeanList from '../views/BeanList.vue';
import OrderForm from '../views/OrderForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'bean-list',
      component: BeanList,
    },
    {
      path: '/order',
      name: 'order-form',
      component: OrderForm,
    }
  ],
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import BeanList from '../views/BeanList.vue';
import OrderForm from '../views/OrderForm.vue';

const routes = [
  {
    path: '/',
    name: 'bean-list',
    component: BeanList,
    meta: { title: 'Beans' },
  },
  {
    path: '/order-form',
    name: 'order-form',
    component: OrderForm,
    meta: { title: 'Order Form' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
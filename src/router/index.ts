import { createRouter, createWebHistory } from 'vue-router';
import BeanList from '../views/BeanList.vue';
import BeanDetail from '../views/BeanDetail.vue';
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
      path: '/bean/:id',
      name: 'bean-detail',
      props: true,
      component: BeanDetail,
    },
    {
      path: '/order',
      name: 'order-form',
      component: OrderForm,
    }
  ],
});

export default router;
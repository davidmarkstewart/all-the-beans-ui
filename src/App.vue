<script setup lang="ts">
import BeanOfTheDay from './components/BeanOfTheDay.vue';
import LogoSvg from './components/LogoSvg.vue';
import router from './router';
import Swal from 'sweetalert2';
import { computed } from 'vue';
import { useCartStore } from './stores/cart';
import { useCoreStore } from './stores/core';

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.getCartItemCount);

const coreStore = useCoreStore();
const title = computed(() => coreStore.getPageHeader);

const navButtonClasses = 'text-center cursor-pointer rounded-md bg-[#2d0404] min-w-20  md:min-w-25 px-2 py-1 md:px-5 md:py-2 text-sm font-medium text-white inline-block';

const navigateToCart = () => {
  if (cartItemCount.value > 0) {
    router.push({ name: 'order-form' });
  } else {
    Swal.fire({
      title: 'Cart is empty',
      text: 'Please add some beans to your cart',
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white',
      },
      buttonsStyling: false,
    });
  }
};
</script>

<template>
  <nav class="bg-[#411717]">
    <div class="mx-auto max-w-7xl flex items-center px-6 py-4">
      <div>
        <LogoSvg />
      </div>
      <div class="ml-2 md:ml-8 flex items-center">
        <RouterLink :class="navButtonClasses" :to="{ name: 'bean-list' }">Beans</RouterLink>
        <a :class="`${navButtonClasses} ml-4 relative`" @click="navigateToCart">
          Cart
          <span v-if="cartItemCount !== 0" class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-[#411717] rounded-full w-5 h-5 flex items-center justify-center text-xs">{{ cartItemCount }}</span>
        </a>
      </div>
      <div class="ml-auto">
        <BeanOfTheDay />
      </div>
    </div>
  </nav>
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-6 py-3 md:px-8">
      <h1 class=" text-lg md:text-3xl font-bold tracking-tight text-[#2d0404]">{{ title }}</h1>
    </div>
  </header>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <RouterView />
  </div>
</template>
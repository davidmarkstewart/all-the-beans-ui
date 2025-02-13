<script setup lang="ts">
import Swal from 'sweetalert2';
import ArrowSvg from './ArrowSvg.vue';
import BeanOfTheDaySvg from './BeanOfTheDaySvg.vue';
import { useBeansStore } from '../stores/beans';
import { useCartStore } from '../stores/cart';
import { uppercaseFirstAndRestLower } from '../helpers';

const beanStore = useBeansStore();
const cartStore = useCartStore();

const beanOfTheDay = beanStore.getBeanOfTheDay;

const modelButtonClasses = 'cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white';

const handleClick = async () => {
  const modalTemplate = `
  <h1 class="text-2xl tracking-tight text-[#2d0404] mb-2">${uppercaseFirstAndRestLower(beanOfTheDay.name)}</h1>
  <div class="flex">
    <div class="mr-5 mt-1 flex-shrink-0">
      <img class="w-24 h-24 rounded-full" src="${beanOfTheDay.image}" alt="${beanOfTheDay.name}" />
    </div>
    <div>
      <p class="mt-1 mb-2 truncate text-sm text-gray-500 text-left">
        <span class="text-[#2d0404]">Country: </span>
        <span class="mr-2">${beanOfTheDay.country}</span> |
        <span class="text-[#2d0404] ml-2">Cost: </span>
        <span class="mr-2">${beanOfTheDay.cost}</span> |
        <span class="text-[#2d0404] ml-2">Color: </span> ${uppercaseFirstAndRestLower(beanOfTheDay.colour)}
      </p>
      <p class="mt-1 text-sm text-gray-500 text-left">${beanOfTheDay.description}</p>
    </div>
  </div>
`;

  const response = await Swal.fire({
    cancelButtonText: 'Close',
    confirmButtonText: 'Add to Cart',
    showCancelButton: true,
    html: modalTemplate,
    customClass: {
      confirmButton: modelButtonClasses,
      cancelButton: `${modelButtonClasses} ml-5`,
    },
    buttonsStyling: false,
    width: 600,
  });

  if (response.isConfirmed) {
    cartStore.addToCart({ ...beanOfTheDay, quantity: 1 });
  }
};
</script>

<template>
  <div class="flex space-x-4 cursor-pointer" @click="handleClick">
    <span class="text-white font-caveat text-2xl pt-7 hidden md:block">Bean of the Day</span>
    <ArrowSvg class="hidden md:block" />
    <BeanOfTheDaySvg />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

.font-caveat {
  font-family: 'Caveat', sans-serif;
}
</style>
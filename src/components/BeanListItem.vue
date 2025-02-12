<script setup lang="ts">
import { PropType } from 'vue';
import { Bean, CartBean } from '../types';
import Swal from 'sweetalert2';
import { useCartStore } from '../stores/cart';
import { uppercaseFirstAndRestLower } from '../helpers';

const props = defineProps({
  bean: {
    type: Object as PropType<Bean>,
    required: true,
  }
});

const store = useCartStore();

const moreInfo = (bean: Bean) => {
  const modalTemplate = `
  <h1 class="text-2xl tracking-tight text-[#2d0404] mb-2">${uppercaseFirstAndRestLower(bean.name)}</h1>
  <div class="flex">
    <div class="mr-5 mt-1 flex-shrink-0">
      <img class="w-24 h-24 rounded-full" src="${bean.image}" alt="${bean.name}" />
    </div>
    <div>
      <p class="mt-1 mb-2 truncate text-sm text-gray-500 text-left">
        <span class="text-[#2d0404]">Country: </span>
        <span class="mr-2">${bean.country}</span> |
        <span class="text-[#2d0404] ml-2">Cost: </span>
        <span class="mr-2">${bean.cost}</span> |
        <span class="text-[#2d0404] ml-2">Color: </span> ${uppercaseFirstAndRestLower(bean.colour)}
      </p>
      <p class="mt-1 text-sm text-gray-500 text-left">${bean.description}</p>
    </div>
  </div>
`;

  Swal.fire({
    confirmButtonText: 'Close',
    html: modalTemplate,
    customClass: {
      confirmButton: 'cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white'
    },
    buttonsStyling: false,
    width: 600,
  })
};

const addToCart = (bean: Bean) => {
  const cartBean: CartBean = {
    id: bean.id,
    name: bean.name,
    image: bean.image,
    cost: bean.cost,
    quantity: 1,
  }
  store.addToCart(cartBean);

  Swal.fire({
    confirmButtonText: 'Close',
    text: `${uppercaseFirstAndRestLower(bean.name)} successfully added to the cart`,
    customClass: {
      confirmButton: 'cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white'
    },
    buttonsStyling: false,
    icon: "success"
  });
};
</script>

<template>
  <li class="p-4">
    <div class="flex w-full">
      <div>
        <img class="size-30 rounded-full" :src="bean.image" alt="bean.Name" />
      </div>
      
      <div class="ml-4 grow flex flex-col justify-between">
        <div>
          <p class="text-2xl tracking-tight text-[#2d0404] mb-2">{{ uppercaseFirstAndRestLower(props.bean.name) }}</p>
          <p class="mt-1 truncate text-sm text-gray-500">
            <span class="text-[#2d0404]">Country: </span>
            <span class="mr-2">{{ props.bean.country }}</span> |
            <span class="text-[#2d0404] ml-2">Cost: </span>
            <span class="mr-2">{{ props.bean.cost }}</span> |
            <span class="text-[#2d0404] ml-2">Color: </span> {{ uppercaseFirstAndRestLower(props.bean.colour) }}
          </p>
        </div>
        <div class="flex justify-between items-end pb-1">
          <button @click="moreInfo(props.bean)" class="cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white">More Info</button>
          <button @click="addToCart(props.bean)" class="cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  </li>
</template>
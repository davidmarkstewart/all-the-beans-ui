<script setup lang="ts">
import { PropType } from 'vue';
import { Bean } from '../types';
import Swal from 'sweetalert2'

const props = defineProps({
  bean: {
    type: Object as PropType<Bean>,
    required: true,
  }
});

const uppercaseFirstAndRestLower = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const moreInfo = (bean: Bean) => {
  const modalTemplate = `
  <h1 class="text-2xl tracking-tight text-[#2d0404] mb-2">${uppercaseFirstAndRestLower(bean.Name)}</h1>
  <div class="flex">
    <div class="mr-5 mt-1 flex-shrink-0">
      <img class="w-24 h-24 rounded-full" src="${bean.Image}" alt="${bean.Name}" />
    </div>
    <div>
      <p class="mt-1 mb-2 truncate text-sm text-gray-500 text-left">
        <span class="text-[#2d0404]">Country: </span>
        <span class="mr-2">${bean.Country}</span> |
        <span class="text-[#2d0404] ml-2">Cost: </span>
        <span class="mr-2">${bean.Cost}</span> |
        <span class="text-[#2d0404] ml-2">Color: </span> ${uppercaseFirstAndRestLower(bean.colour)}
      </p>
      <p class="mt-1 text-sm text-gray-500 text-left">${bean.Description}</p>
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
</script>

<template>
  <li class="p-4">

      <div class="flex w-full">
        <div>
          <img class="size-30 rounded-full" :src="bean.Image" alt="bean.Name" />
        </div>
        
        <div class="ml-4 grow flex flex-col justify-between">
          <div>
            <p class="text-2xl tracking-tight text-[#2d0404] mb-2">{{ uppercaseFirstAndRestLower(props.bean.Name) }}</p>
            <p class="mt-1 truncate text-sm text-gray-500">
              <span class="text-[#2d0404]">Country: </span>
              <span class="mr-2">{{ props.bean.Country }}</span> |
              <span class="text-[#2d0404] ml-2">Cost: </span>
              <span class="mr-2">{{ props.bean.Cost }}</span> |
              <span class="text-[#2d0404] ml-2">Color: </span> {{ uppercaseFirstAndRestLower(props.bean.colour) }}
            </p>
          </div>
          <div class="flex justify-end items-end space-x-2">
            <button @click="moreInfo(props.bean)" class="cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white">More Info</button>
            <button class="cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white">Add to Cart</button>
          </div>
        </div>
      </div>

  </li>
</template>
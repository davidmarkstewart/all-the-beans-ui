<script setup lang="ts">
import Swal from 'sweetalert2';
import { useBeansStore } from '../stores/beans';
import { useCartStore } from '../stores/cart';
import { uppercaseFirstAndRestLower } from '../helpers';

const beanStore = useBeansStore();
const cartStore = useCartStore();

const beanOfTheDay = beanStore.getBeanOfTheDay;

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
      confirmButton: 'cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white',
      cancelButton: 'cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white ml-5',
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
    <span class="text-white font-roboto text-2xl pt-7">Bean of the Day</span>
    <svg class="w-20 h-20 relative -top-4" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M35 262C160.529 140.938 328.006 207.285 361 215.518" stroke="#ffffff" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M343.69 143C355.23 190.289 361 214.681 361 216.177C361 218.421 327.488 234.13 312 258" stroke="#ffffff" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    </svg>
    <svg class="w-20 h-20 animate-wiggle" fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470.064 470.064" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 470.064 470.064">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="m464.898,250.841c-0.875-4.048-4.868-6.618-8.917-5.745-4.048,0.876-6.62,4.868-5.745,8.917 11.548,53.379 2.47,99.831-25.547,131.791l-340.391-340.387c65.463-57.279 189.309-31.575 280.638,59.75 35.77,35.77 62.537,77.505 77.408,120.695 1.349,3.917 5.618,5.998 9.533,4.649 3.917-1.349 5.998-5.617 4.649-9.533-15.609-45.332-43.613-89.046-80.984-126.417-47.989-47.988-106.097-80.248-163.62-90.837-58.542-10.777-109.58,2.083-143.71,36.213-1.407,1.406-2.197,3.314-2.197,5.303s0.79,3.897 2.197,5.303l351.348,351.344c1.464,1.464 3.384,2.197 5.303,2.197s3.839-0.732 5.303-2.197c18.093-18.093 30.219-40.883 36.039-67.737 5.551-25.61 5.111-53.64-1.307-83.309z"></path>
          <path d="m50.534,68.221c-2.929-2.929-7.678-2.929-10.606,0-34.13,34.13-46.991,85.167-36.214,143.708 10.59,57.522 42.851,115.63 90.84,163.618 59.176,59.177 134.881,94.507 202.51,94.507 42.481,0 78.727-13.792 104.818-39.883 2.929-2.929 2.929-7.678 0-10.606l-351.348-351.344zm246.53,386.833c-63.738,0-135.478-33.687-191.903-90.113-45.861-45.86-76.65-101.165-86.695-155.728-9.285-50.433 0.281-94.445 26.941-124.907l340.388,340.384c-22.745,19.895-53.248,30.364-88.731,30.364z"></path>
          <circle cx="307.875" cy="408.035" r="7.5"></circle>
          <circle cx="265.448" cy="408.035" r="7.5"></circle>
          <circle cx="204.647" cy="62.072" r="7.5"></circle>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

.font-roboto {
  font-family: 'Caveat', sans-serif;
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

.animate-wiggle {
  animation: wiggle 1.5s ease-in-out infinite;
}
</style>
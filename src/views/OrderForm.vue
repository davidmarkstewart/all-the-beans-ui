<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { uppercaseFirstAndRestLower } from '../helpers';

const store = useCartStore();

const submitOrder = () => {
  console.log('Order submitted');
}
</script>

<template>
  <ul class="divide-y divide-[#1b09096f] bg-white rounded-lg shadow-lg text-2xl tracking-tight text-[#2d0404]">
    <li v-for="bean in store.getCart.beans" :key="bean.id" class="p-4 h-20 md:h-30">
      <div class="flex items-center w-full h-full">
        <div class="mr-7 hidden md:block">
          <img class="size-20 rounded-full" :src="bean.image" alt="bean.Name" />
        </div>
        <div class="mr-7">
          {{ uppercaseFirstAndRestLower(bean.name) }}
        </div>
        <div class="ml-auto mr-7">
          <p>{{ `£${bean.cost * bean.quantity}` }} <span class="text-sm ml-2">Qty: {{ bean.quantity }}</span></p>
        </div>
      </div>
    </li>
    <li class="flex items-center p-4 mr-7 h-20 md:h-30">
      <div class="ml-auto">
          {{ `£${store.getCartTotal}` }} <span class="text-sm ml-2">Qty: {{ store.getCartQuantity }}</span>
      </div>
    </li>
  </ul>


  <div class="bg-white rounded-lg shadow-lg mt-12">
    <div class="px-4 pt-4 pb-6">
      <h2 class="text-2xl tracking-tight text-[#2d0404]">Order Information</h2>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="firstName" class="block text-sm/6 font-medium text-[#2d0404]">First name</label>
          <div class="mt-2">
            <input type="text" name="firstName" id="firstName" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm/6 font-medium text-[#2d0404]">Last name</label>
          <div class="mt-2">
            <input type="text" name="last-name" id="last-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>
        <div class="col-span-full">
          <label for="streetAddress" class="block text-sm/6 font-medium text-[#2d0404]">Street address</label>
          <div class="mt-2">
            <input type="text" name="streetAddress" id="streetAddress" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="sm:col-span-3 sm:col-start-1">
          <label for="city" class="block text-sm/6 font-medium text-[#2d0404]">City</label>
          <div class="mt-2">
            <input type="text" name="city" id="city" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="sm:col-span-1">
          <label for="postcode" class="block text-sm/6 font-medium text-[#2d0404]">Postcode</label>
          <div class="mt-2">
            <input type="text" name="postcode" id="postcode" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>
        <div class="sm:col-span-3">
          <button @click="submitOrder" class="cursor-pointer rounded-md bg-[#2d0404] px-3 py-2 text-sm font-medium text-white">Submit</button>
        </div>

      </div>
    </div>
  </div>
</template>
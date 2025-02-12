<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { uppercaseFirstAndRestLower } from '../helpers';

const store = useCartStore();
</script>

<template>
  <ul class="divide-y divide-[#1b09096f] bg-white rounded-lg shadow-lg">
    <li v-for="bean in store.getCart" :key="bean.id">
      <p>{{ uppercaseFirstAndRestLower(bean.name) }}</p>
      <p>{{ bean.cost }}</p>
    </li>
  </ul>
</template>

<style scoped></style>
<script setup lang="ts">
import { useBeansStore } from '../stores/beans';
import BeanListItem from '../components/BeanListItem.vue';

const store = useBeansStore();

const beans = store.getBeans;
</script>

<template>
  <ul class="divide-y divide-[#1b09096f] bg-white rounded-lg shadow-lg">
    <BeanListItem v-for="bean in beans" :key="bean._id" :bean="bean" />
  </ul>
</template>

<style scoped></style>
<script setup lang="ts">
import { useBeansStore } from '../stores/beans';
const store = useBeansStore();

const beans = store.getBeans;
</script>

<template>
  <h1>Available Beans</h1>
  <div v-for="bean in beans" :key="bean._id">
    <RouterLink :to="{ name: 'bean-detail', params: { id: bean._id } }">
      <h2>{{ bean.Name }}</h2>
      <p>{{ bean.Description }}</p>
    </RouterLink>
  </div>
</template>

<style scoped></style>
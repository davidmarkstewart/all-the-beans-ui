<script setup lang="ts">
import { useBeansStore } from '../stores/beans';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const store = useBeansStore();
const bean = store.getBeanById(props.id);
</script>

<template>
  <h1>Beans Detail</h1>
  <div v-if="bean">
    <p>{{ bean.Name }}</p>
    <p>{{ bean.Cost }}</p>
    <p>{{ bean.Country }}</p>
    <p>{{ bean.Description }}</p>
    <p>{{ bean.colour }}</p>
  </div>
</template>

<style scoped></style>
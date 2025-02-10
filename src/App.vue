<script setup lang="ts">

</script>

<template>
  <div>
    <RouterLink :to="{ name: 'bean-list' }">Beans</RouterLink>
    <RouterLink :to="{ name: 'order-form' }">Order</RouterLink>
    <RouterView />
  </div>
</template>

<style scoped>
</style>

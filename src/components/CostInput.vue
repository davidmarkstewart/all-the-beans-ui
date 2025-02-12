<script setup lang="ts">
import SelectArrowSvg from './SelectArrowSvg.vue';

const props = defineProps<{
  modelValue: string;
  costs: { label: string; value: string; }[];
}>();

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: Event) => {
  if (event.target) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
};
</script>
<template>
  <div class="flex-1">
    <label for="cost" class="text-sm/6 font-medium text-[#2d0404]">Cost</label>
    <div class="mt-1 grid grid-cols-1">
      <select id="cost" name="cost" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" :value="props.modelValue" @change="handleChange">
        <option value="All">All</option>
        <option v-for="cost in props.costs" :key="cost.value" :value="cost.value">{{ cost.label }}</option>
      </select>
      <SelectArrowSvg />
    </div>
  </div>
</template>
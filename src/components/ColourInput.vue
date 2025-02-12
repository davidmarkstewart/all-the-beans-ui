<script setup lang="ts">
import SelectArrowSvg from './SelectArrowSvg.vue';
import { uppercaseFirstAndRestLower } from '../helpers';

const props = defineProps<{
  modelValue: string;
  colours: string[];
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
    <label for="colour" class="text-sm/6 font-medium text-[#2d0404]">Colour</label>
    <div class="mt-1 grid grid-cols-1">
      <select id="colour" name="colour" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" :value="props.modelValue" @change="handleChange">
        <option value="All">All</option>
        <option v-for="colour in props.colours" :key="colour" :value="colour">{{ uppercaseFirstAndRestLower(colour) }}</option>
      </select>
      <SelectArrowSvg />
    </div>
  </div>
</template>
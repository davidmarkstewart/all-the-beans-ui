<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  if (event.target) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
};
</script>

<template>
  <div class="flex-1">
    <label for="search" class="text-sm/6 font-medium text-[#2d0404]">Search By Name</label>
    <div class="mt-1 grid grid-cols-1">
      <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
        <input
          type="text"
          name="search"
          id="search"
          :value="props.modelValue"
          @input="handleInput"
          class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  </div>
</template>
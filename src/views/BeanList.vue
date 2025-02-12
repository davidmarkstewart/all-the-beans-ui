<script setup lang="ts">
import BeanListItem from '../components/BeanListItem.vue';
import { useBeansStore } from '../stores/beans';
import { uppercaseFirstAndRestLower } from '../helpers';
import { ref, computed } from 'vue';

const store = useBeansStore();

const filteredCountry = ref("All");
const filteredColour = ref("All");
const filteredCost = ref("All");
const search = ref("");

const filteredBeans = computed(() => {
  const country = filteredCountry.value === "All" ? "" : filteredCountry.value;
  const colour = filteredColour.value === "All" ? "" : filteredColour.value;
  const cost = filteredCost.value === "All" ? "" : filteredCost.value;
  const beans = store.getFilteredBeans({ colour, country, cost });
  if (search.value) {
    return beans.filter(bean => bean.name.toLowerCase().includes(search.value.toLowerCase()));
  }
  return beans;
});

const filterOptions = computed(() => {
  const beans = filteredBeans.value;
  return {
    countries: store.getFilteredBeansCountries(beans),
    colours: store.getFilteredBeansColours(beans),
    costs: store.getFilteredBeansCostRanges(beans),
  };
});

const handleSearch = (event: Event) => {
  if (event.target) {
    search.value = (event.target as HTMLInputElement).value;
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg flex px-5 pb-8 pt-4.5 mb-10 gap-8">
    <div class="flex-1">
      <label for="country" class="text-sm/6 font-medium text-gray-900">Country</label>
      <div class="mt-1 grid grid-cols-1">
        <select id="country" name="country" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="filteredCountry">
          <option value="All">All</option>
          <option v-for="country in filterOptions.countries" :key="country" :value="country">{{ country }}</option>
        </select>
        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div class="flex-1">
      <label for="colour" class="text-sm/6 font-medium text-gray-900">Colour</label>
      <div class="mt-1 grid grid-cols-1">
        <select id="colour" name="colour" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="filteredColour">
          <option value="All">All</option>
          <option v-for="colour in filterOptions.colours" :key="colour" :value="colour">{{ uppercaseFirstAndRestLower(colour) }}</option>
        </select>
        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div class="flex-1">
      <label for="cost" class="text-sm/6 font-medium text-gray-900">Cost</label>
      <div class="mt-1 grid grid-cols-1">
        <select id="cost" name="cost" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="filteredCost">
          <option value="All">All</option>
          <option v-for="cost in filterOptions.costs" :key="cost.value" :value="cost.value">{{ cost.label }}</option>
        </select>
        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <div class="flex-1">
      <label for="search" class="text-sm/6 font-medium text-gray-900">Search By Name</label>
      <div class="mt-1 grid grid-cols-1">
        <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input type="text" name="search" id="search" @input="handleSearch"  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" /> 
        </div>
      </div>
    </div>
  </div>
  <ul class="divide-y divide-[#1b09096f] bg-white rounded-lg shadow-lg">
    <BeanListItem v-for="bean in filteredBeans" :key="bean.id" :bean="bean" />
  </ul>
</template>
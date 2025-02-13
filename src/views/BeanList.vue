<script setup lang="ts">
import BeanListItem from '../components/BeanListItem.vue';
import SearchInput from '../components/SearchInput.vue';
import CountryInput from '../components/CountryInput.vue';
import ColourInput from '../components/ColourInput.vue';
import CostInput from '../components/CostInput.vue';
import { useBeansStore } from '../stores/beans';
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
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg flex flex-col md:flex-row px-5 pb-8 pt-4.5 mb-10 gap-8">
    <CountryInput class="w-full md:w-auto" v-model="filteredCountry" :countries="filterOptions.countries" />
    <ColourInput class="w-full md:w-auto" v-model="filteredColour" :colours="filterOptions.colours" />
    <CostInput class="w-full md:w-auto" v-model="filteredCost" :costs="filterOptions.costs" />
    <SearchInput class="w-full md:w-auto" v-model="search" />
  </div>
  <ul class="divide-y divide-[#1b09096f] bg-white rounded-lg shadow-lg">
    <BeanListItem v-for="bean in filteredBeans" :key="bean.id" :bean="bean" />
  </ul>
</template>
<template>
  <div class="filters">
    <select v-model="selectedCuisine" @change="applyFilters" class="filter-select">
      <option value="">All Cuisines</option>
      <option value="italian">Italian</option>
      <option value="asian">Asian</option>
      <option value="american">American</option>
      <option value="mexican">Mexican</option>
      <option value="japanese">Japanese</option>
      <option value="indian">Indian</option>
      <option value="greek">Greek</option>
      <option value="vietnamese">Vietnamese</option>
    </select>

    <select v-model="selectedDifficulty" @change="applyFilters" class="filter-select">
      <option value="">All Levels</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <select v-model="selectedSort" @change="applyFilters" class="filter-select">
      <option value="">Sort by...</option>
      <option value="prepTime-asc">Time ↑</option>
      <option value="prepTime-desc">Time ↓</option>
      <option value="rating-desc">Rating ↓</option>
      <option value="name-asc">Name A-Z</option>
    </select>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Filters',
  emits: ['filter'],
  setup(props, { emit }) {
    const selectedCuisine = ref('');
    const selectedDifficulty = ref('');
    const selectedSort = ref('');

    const applyFilters = () => {
      const filters = {};
      
      if (selectedCuisine.value) filters.cuisine = selectedCuisine.value;
      if (selectedDifficulty.value) filters.difficulty = selectedDifficulty.value;
      
      if (selectedSort.value) {
        const [sort, order] = selectedSort.value.split('-');
        filters.sort = sort;
        filters.order = order;
      }

      emit('filter', filters);
    };

    return {
      selectedCuisine,
      selectedDifficulty,
      selectedSort,
      applyFilters
    };
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}
</style>
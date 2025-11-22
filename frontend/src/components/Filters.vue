<template>
  <div class="filters">
    <div class="filter-group">
      <label class="filter-label">Cuisine</label>
      <select v-model="selectedCuisine" @change="applyFilters" class="filter-select">
        <option value="">All Cuisines</option>
        <option value="italian">🇮🇹 Italian</option>
        <option value="asian">🥢 Asian</option>
        <option value="american">🇺🇸 American</option>
        <option value="mexican">🌮 Mexican</option>
        <option value="japanese">🍱 Japanese</option>
        <option value="indian">🍛 Indian</option>
        <option value="greek">🇬🇷 Greek</option>
        <option value="vietnamese">🇻🇳 Vietnamese</option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label">Difficulty</label>
      <select v-model="selectedDifficulty" @change="applyFilters" class="filter-select">
        <option value="">All Levels</option>
        <option value="easy">😊 Easy</option>
        <option value="medium">👨‍🍳 Medium</option>
        <option value="hard">🔥 Hard</option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label">Sort by</label>
      <select v-model="selectedSort" @change="applyFilters" class="filter-select">
        <option value="">Default</option>
        <option value="prepTime-asc">⏱️ Time (Low to High)</option>
        <option value="prepTime-desc">⏱️ Time (High to Low)</option>
        <option value="rating-desc">⭐ Rating (High to Low)</option>
        <option value="rating-asc">⭐ Rating (Low to High)</option>
        <option value="name-asc">🔤 Name (A-Z)</option>
        <option value="name-desc">🔤 Name (Z-A)</option>
      </select>
    </div>

    <!-- Clear filters button -->
    <button 
      v-if="hasActiveFilters" 
      @click="clearFilters" 
      class="clear-btn"
      title="Clear all filters"
    >
      ✕ Clear
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Filters',
  emits: ['filter'],
  setup(props, { emit }) {
    const selectedCuisine = ref('');
    const selectedDifficulty = ref('');
    const selectedSort = ref('');

    const hasActiveFilters = computed(() => {
      return selectedCuisine.value || selectedDifficulty.value || selectedSort.value;
    });

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

    const clearFilters = () => {
      selectedCuisine.value = '';
      selectedDifficulty.value = '';
      selectedSort.value = '';
      applyFilters();
    };

    return {
      selectedCuisine,
      selectedDifficulty,
      selectedSort,
      hasActiveFilters,
      applyFilters,
      clearFilters
    };
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:hover {
  border-color: #667eea;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  padding: 0.875rem 1.5rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s;
  align-self: flex-end;
  white-space: nowrap;
}

.clear-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.clear-btn:active {
  transform: translateY(0);
}

/* === MOBILE === */
@media (max-width: 767px) {
  .filters {
    flex-direction: column;
    padding: 1rem;
  }

  .filter-group {
    min-width: 100%;
  }

  .clear-btn {
    width: 100%;
  }
}

/* === TABLET === */
@media (min-width: 768px) and (max-width: 1023px) {
  .filter-group {
    flex: 1 1 calc(50% - 0.5rem);
  }
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  .filters {
    flex: 3;
    padding: 1.5rem;
  }

  .filter-group {
    flex: 1;
    min-width: 180px;
  }

  .clear-btn {
    align-self: center;
    margin-top: 1.75rem;
  }
}
</style>
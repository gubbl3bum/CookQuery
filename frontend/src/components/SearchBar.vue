<template>
  <div class="search-bar">
    <input 
      v-model="searchTerm"
      @input="onSearch"
      type="text" 
      placeholder="Search for a recipe..."
      class="search-input"
    />
    <button @click="onSearch" class="search-btn">🔍 Search</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchTerm = ref('');

    const onSearch = () => {
      emit('search', searchTerm.value);
    };

    return {
      searchTerm,
      onSearch
    };
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-btn {
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.search-btn:hover {
  background: #5568d3;
}
</style>
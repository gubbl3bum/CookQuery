<template>
  <div class="search-bar">
    <input 
      v-model="searchTerm"
      @input="onSearch"
      @keyup.enter="onSearch"
      type="text" 
      placeholder="Search for a recipe..."
      class="search-input"
    />
    <button @click="onSearch" class="search-btn">
      <span class="icon">🔍</span>
      <span class="text">Search</span>
    </button>
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
  gap: 0.75rem;
  width: 100%;
}

.search-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  padding: 0.875rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.search-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.search-btn:active {
  transform: translateY(0);
}

.search-btn .icon {
  font-size: 1.1rem;
}

.search-btn .text {
  display: none;
}

/* === MOBILE === */
@media (max-width: 767px) {
  .search-bar {
    flex-direction: column;
  }

  .search-input {
    padding: 1rem 1.25rem;
  }

  .search-btn {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }

  .search-btn .text {
    display: inline;
  }
}

/* === TABLET & UP === */
@media (min-width: 768px) {
  .search-btn .text {
    display: inline;
  }
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  .search-bar {
    flex: 2;
  }

  .search-input {
    font-size: 1.05rem;
  }
}
</style>
<template>
  <div id="app">
    <header class="header">
      <h1>🍳 CookQuery</h1>
      <p>Find your perfect recipe</p>
    </header>

    <div class="container">
      <SearchBar @search="handleSearch" />
      <Filters @filter="handleFilter" />
      <RecipeList :recipes="recipes" :loading="loading" />
      <Pagination 
        :currentPage="currentPage" 
        :totalPages="totalPages"
        @page-change="handlePageChange" 
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from './services/api';
import SearchBar from './components/SearchBar.vue';
import Filters from './components/Filters.vue';
import RecipeList from './components/RecipeList.vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    Filters,
    RecipeList,
    Pagination
  },
  setup() {
    const recipes = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const filters = ref({});

    const fetchRecipes = async () => {
      loading.value = true;
      try {
        const params = {
          page: currentPage.value,
          limit: 6,
          ...filters.value
        };
        
        const response = await api.getRecipes(params);
        recipes.value = response.data.data;
        totalPages.value = response.data.pagination.totalPages;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = (searchTerm) => {
      filters.value.search = searchTerm;
      currentPage.value = 1;
      fetchRecipes();
    };

    const handleFilter = (newFilters) => {
      filters.value = { ...filters.value, ...newFilters };
      currentPage.value = 1;
      fetchRecipes();
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchRecipes();
    };

    onMounted(() => {
      fetchRecipes();
    });

    return {
      recipes,
      loading,
      currentPage,
      totalPages,
      handleSearch,
      handleFilter,
      handlePageChange
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
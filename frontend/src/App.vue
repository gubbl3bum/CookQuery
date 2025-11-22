<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <h1>CookQuery</h1>
        <p>Find your perfect recipe</p>
      </div>
    </header>

    <div class="container">
      <div class="search">
        <SearchBar @search="handleSearch" />
      </div>

      <div class="filter">
        <Filters @filter="handleFilter" />
      </div>

      <!-- Error message -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- Recipe count info -->
      <div v-if="!loading && !error" class="results-info">
        <p>Found {{ totalItems }} recipes</p>
      </div>

      <!-- Recipe list -->
      <RecipeList :recipes="recipes" :loading="loading" />
      
      <!-- Pagination -->
      <Pagination 
        :currentPage="currentPage" 
        :totalPages="totalPages"
        @page-change="handlePageChange" 
      />
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2025 CookQuery | Made with Vue.js & Express</p>
    </footer>
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
    const error = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalItems = ref(0);
    const filters = ref({});

    const fetchRecipes = async () => {
      loading.value = true;
      error.value = null;
      try {
        const params = {
          page: currentPage.value,
          limit: 12,
          ...filters.value
        };
        
        const response = await api.getRecipes(params);
        recipes.value = response.data.data;
        totalPages.value = response.data.pagination.totalPages;
        totalItems.value = response.data.pagination.totalItems;
      } catch (err) {
        error.value = 'Failed to load recipes. Please try again.';
        console.error('Error fetching recipes:', err);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMounted(() => {
      fetchRecipes();
    });

    return {
      recipes,
      loading,
      error,
      currentPage,
      totalPages,
      totalItems,
      handleSearch,
      handleFilter,
      handlePageChange
    };
  }
};
</script>

<style>
/* === RESET & BASE === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* === HEADER === */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.95;
}

/* === CONTAINER === */
.container {
  /* max-width: 1400px; */
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}

.search{
  margin-bottom: 2rem;
}

.filter{
  margin-bottom: 2rem;
}

/* === RESULTS INFO === */
.results-info {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.results-info p {
  font-weight: 500;
}

/* === ERROR MESSAGE === */
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #f5c6cb;
  text-align: center;
}

/* === FOOTER === */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.footer p {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

/* === TABLET (768px - 1024px) === */
@media (min-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
  }

  .container {
    padding: 2.5rem 2rem;
  }

  .search-filter-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

/* === DESKTOP (>1024px) === */
@media (min-width: 1024px) {
  .header {
    padding: 3rem 2rem;
  }

  .header h1 {
    font-size: 3rem;
  }

  .header p {
    font-size: 1.2rem;
  }

  .container {
    padding: 3rem 2rem;
  }

  .search-filter-section {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .results-info {
    margin-bottom: 2rem;
  }
}

/* === LARGE DESKTOP (>1400px) === */
@media (min-width: 1400px) {
  .container {
    max-width: 1600px;
  }
}
</style>
<template>
  <div class="recipe-list">
    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading delicious recipes...</p>
    </div>
    
    <!-- No results -->
    <div v-else-if="recipes.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3>No recipes found</h3>
      <p>Try adjusting your search or filters</p>
    </div>
    
    <!-- Recipe grid -->
    <div v-else class="recipe-grid">
      <RecipeCard 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe"
        @view-recipe="$emit('view-recipe', $event)"
      />
    </div>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'RecipeList',
  components: { RecipeCard },
  props: {
    recipes: Array,
    loading: Boolean
  },
  emits: ['view-recipe']
};
</script>

<style scoped>
.recipe-list {
  min-height: 400px;
}

/* === LOADING === */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #666;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading p {
  font-size: 1.1rem;
  font-weight: 500;
}

/* === NO RESULTS === */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-results p {
  font-size: 1rem;
  color: #999;
}

/* === RECIPE GRID === */
.recipe-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* === MOBILE (default) === */
.recipe-grid {
  grid-template-columns: 1fr;
}

/* === TABLET === */
@media (min-width: 600px) {
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(3, 1fr);  /* Maksymalnie 3 kolumny */
    gap: 2rem;
  }

  .loading {
    padding: 5rem 2rem;
  }

  .no-results {
    padding: 5rem 2rem;
  }
}

/* === LARGE DESKTOP === */
@media (min-width: 1400px) {
  .recipe-grid {
    grid-template-columns: repeat(3, 1fr);  /* Nadal 3 kolumny, ale szersze */
    gap: 2.5rem;
  }
}
</style>
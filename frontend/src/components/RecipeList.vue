<template>
  <div class="recipe-list">
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else-if="recipes.length === 0" class="no-results">
      No recipes found 😕
    </div>
    
    <div v-else class="recipe-grid">
      <RecipeCard 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe" 
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
  }
};
</script>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.loading, .no-results {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
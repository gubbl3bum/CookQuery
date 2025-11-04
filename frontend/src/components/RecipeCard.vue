<template>
  <div class="recipe-card">
    <img :src="recipe.imageUrl" :alt="recipe.name" class="recipe-image" />
    <div class="recipe-content">
      <h3>{{ recipe.name }}</h3>
      <p class="recipe-desc">{{ recipe.description }}</p>
      
      <div class="recipe-meta">
        <span>⏱️ {{ recipe.prepTime }} min</span>
        <span>⭐ {{ recipe.rating }}</span>
        <span>🍴 {{ recipe.cuisine }}</span>
      </div>
      
      <div class="recipe-difficulty">
        <span :class="difficultyClass">{{ recipe.difficulty }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RecipeCard',
  props: {
    recipe: Object
  },
  setup(props) {
    const difficultyClass = computed(() => {
      return `difficulty-${props.recipe.difficulty}`;
    });

    return { difficultyClass };
  }
};
</script>

<style scoped>
.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-content {
  padding: 1.5rem;
}

.recipe-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.recipe-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.recipe-difficulty span {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

.difficulty-easy {
  background: #d4edda;
  color: #155724;
}

.difficulty-medium {
  background: #fff3cd;
  color: #856404;
}

.difficulty-hard {
  background: #f8d7da;
  color: #721c24;
}
</style>
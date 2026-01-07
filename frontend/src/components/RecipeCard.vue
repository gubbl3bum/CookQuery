<template>
  <div class="recipe-card" @click="viewRecipe">
    <div class="recipe-image-wrapper">
      <img :src="recipe.imageUrl" :alt="recipe.name" class="recipe-image" loading="lazy" />
      <div class="recipe-overlay">
        <span class="recipe-category">{{ recipe.category }}</span>
      </div>
    </div>
    
    <div class="recipe-content">
      <h3 class="recipe-title">{{ recipe.name }}</h3>
      <p class="recipe-desc">{{ recipe.description }}</p>
      
      <div class="recipe-meta">
        <div class="meta-item">
          <span class="meta-label">Prep Time:</span>
          <span class="meta-value">{{ recipe.prepTime }} Min</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Cuisine:</span>
          <span class="meta-value">{{ recipe.cuisine }}</span>
        </div>
      </div>
      
      <div class="recipe-footer">
        <div class="recipe-difficulty">
          <span :class="['difficulty-badge', `difficulty-${recipe.difficulty}`]">
            {{ recipe.difficulty }}
          </span>
        </div>
        <button class="view-btn" @click.stop="viewRecipe">View Recipe →</button>
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
  emits: ['view-recipe'],
  setup(props, { emit }) {
    const difficultyClass = computed(() => {
      return `difficulty-${props.recipe.difficulty}`;
    });

    const viewRecipe = () => {
      emit('view-recipe', props.recipe);
    };

    return { 
      difficultyClass,
      viewRecipe 
    };
  }
};
</script>

<style scoped>
.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* === IMAGE === */
.recipe-image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.1);
}

.recipe-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.recipe-category {
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #667eea;
  backdrop-filter: blur(10px);
}

/* === CONTENT === */
.recipe-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.recipe-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #222;
  font-weight: 600;
  line-height: 1.3;
}

.recipe-desc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* === META (VERTICAL LAYOUT) === */
.recipe-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  padding: 0.6rem 0.75rem;
  background: white;
  border-radius: 8px;
  transition: all 0.2s;
}

.meta-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.meta-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
}

.meta-label {
  color: #999;
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 95px;
  flex-shrink: 0;
}

.meta-value {
  color: #333;
  font-weight: 600;
  flex: 1;
  text-transform: capitalize;
  text-align: right;
  font-size: 0.95rem;
}

/* === FOOTER === */
.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}

.recipe-difficulty {
  flex-shrink: 0;
}

.difficulty-badge {
  display: inline-block;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
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

.view-btn {
  padding: 0.65rem 1.25rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  max-width: 150px;
}

.view-btn:hover {
  background: #5568d3;
  transform: translateX(4px);
}

/* === MOBILE ADJUSTMENTS === */
@media (max-width: 599px) {
  .recipe-image-wrapper {
    height: 200px;
  }

  .recipe-title {
    font-size: 1.2rem;
  }

  .meta-label {
    min-width: 75px;
    font-size: 0.8rem;
  }
  
  .meta-value {
    font-size: 0.9rem;
  }

  .recipe-footer {
    flex-direction: column;
  }

  .view-btn {
    width: 100%;
    max-width: none;
  }
}

/* === TABLET === */
@media (min-width: 600px) and (max-width: 1023px) {
  .recipe-image-wrapper {
    height: 230px;
  }
  
  .meta-label {
    min-width: 90px;
  }
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  .recipe-image-wrapper {
    height: 240px;
  }

  .recipe-content {
    padding: 1.75rem;
  }

  .recipe-title {
    font-size: 1.4rem;
  }
  
  .meta-item {
    padding: 0.7rem 0.85rem;
  }
  
  .meta-label {
    min-width: 100px;
  }
  
  .meta-value {
    font-size: 1rem;
  }
}
</style>
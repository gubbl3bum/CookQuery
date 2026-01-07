<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="close">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="close" title="Close">✕</button>
          
          <!-- Header z obrazkiem -->
          <div class="modal-header">
            <img :src="recipe.imageUrl" :alt="recipe.name" class="modal-image" loading="lazy" />
            <div class="modal-header-overlay">
              <h2 class="modal-title">{{ recipe.name }}</h2>
              <div class="modal-badges">
                <span class="badge badge-category">{{ recipe.category }}</span>
                <span :class="['badge', 'badge-difficulty', `difficulty-${recipe.difficulty}`]">
                  {{ recipe.difficulty }}
                </span>
              </div>
            </div>
          </div>

          <!-- Info - scrollable content -->
          <div class="modal-body">
            <p class="modal-description">{{ recipe.description }}</p>

            <!-- Meta informacje -->
            <div class="modal-meta">
              <div class="meta-card">
                <span class="meta-icon">⏱️</span>
                <div>
                  <div class="meta-label">Prep Time</div>
                  <div class="meta-value">{{ recipe.prepTime }} min</div>
                </div>
              </div>
              <div class="meta-card">
                <span class="meta-icon">🍴</span>
                <div>
                  <div class="meta-label">Cuisine</div>
                  <div class="meta-value">{{ recipe.cuisine }}</div>
                </div>
              </div>
            </div>

            <!-- Składniki -->
            <div class="modal-section">
              <h3 class="section-title">Ingredients</h3>
              <ul class="ingredients-list">
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                  <span class="ingredient-name">{{ ingredient.name }}</span>
                  <span class="ingredient-amount">{{ ingredient.amount }}</span>
                </li>
              </ul>
            </div>

            <!-- Instrukcje -->
            <div class="modal-section">
              <h3 class="section-title">👨Instructions</h3>
              <ol class="instructions-list">
                <li v-for="(instruction, index) in recipe.instructions" :key="index">
                  {{ instruction }}
                </li>
              </ol>
            </div>

            <!-- Autor i data -->
            <div class="modal-footer">
              <div class="author-info">
                <span class="author-label">Recipe by:</span>
                <span class="author-name">{{ recipe.author }}</span>
              </div>
              <div class="publish-date">
                Published: {{ formatDate(recipe.publishDate) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RecipeModal',
  props: {
    isOpen: Boolean,
    recipe: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    return {
      close,
      formatDate
    };
  }
};
</script>

<style scoped>
/* === OVERLAY === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

/* === CONTAINER === */
.modal-container {
  position: relative;
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* === CLOSE BUTTON === */
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

/* === HEADER === */
.modal-header {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  flex-shrink: 0;
  background: #000;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  vertical-align: middle;
}

.modal-header-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%);
  color: white;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.modal-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge-category {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
}

.badge-difficulty {
  background: rgba(255, 255, 255, 0.95);
}

.difficulty-easy {
  color: #155724;
}

.difficulty-medium {
  color: #856404;
}

.difficulty-hard {
  color: #721c24;
}

/* === BODY (scrollable) === */
.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 2rem;
}

/* === META === */
.modal-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.meta-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.meta-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.meta-label {
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

/* === SECTIONS === */
.modal-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

/* === INGREDIENTS === */
.ingredients-list {
  list-style: none;
  padding: 0;
}

.ingredients-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s;
}

.ingredients-list li:hover {
  background: #e9ecef;
}

.ingredient-name {
  color: #555;
  text-transform: capitalize;
}

.ingredient-amount {
  font-weight: 600;
  color: #667eea;
}

/* === INSTRUCTIONS === */
.instructions-list {
  counter-reset: step-counter;
  list-style: none;
  padding: 0;
}

.instructions-list li {
  counter-increment: step-counter;
  padding: 1rem;
  padding-left: 3.5rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  position: relative;
  line-height: 1.6;
  color: #555;
}

.instructions-list li::before {
  content: counter(step-counter);
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 32px;
  height: 32px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

/* === FOOTER === */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 2px solid #e9ecef;
  flex-wrap: wrap;
  gap: 1rem;
}

.author-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.author-label {
  color: #999;
  font-size: 0.9rem;
}

.author-name {
  font-weight: 600;
  color: #333;
  font-size: 1.05rem;
}

.publish-date {
  color: #999;
  font-size: 0.9rem;
}

/* === TRANSITIONS === */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* === RESPONSIVE === */
@media (max-width: 767px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-container {
    border-radius: 0;
    max-height: 100vh;
  }

  .modal-header {
    height: 250px;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-meta {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .modal-close {
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .modal-header {
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .modal-header {
    height: 350px;
  }
  
  .modal-title {
    font-size: 2.2rem;
  }
}
</style>
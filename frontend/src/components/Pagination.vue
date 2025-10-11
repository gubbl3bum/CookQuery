<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="page-btn"
    >
      ← Previous
    </button>
    
    <span class="page-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="page-btn"
    >
      Next →
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    totalPages: Number
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const changePage = (page) => {
      emit('page-change', page);
    };

    return { changePage };
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #5568d3;
}

.page-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: 500;
  color: #666;
}
</style>
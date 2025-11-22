<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="page-btn prev-btn"
      :title="currentPage === 1 ? 'First page' : 'Previous page'"
    >
      <span class="btn-icon">←</span>
      <span class="btn-text">Previous</span>
    </button>
    
    <!-- Page numbers (desktop only) -->
    <div class="page-numbers">
      <button
        v-for="page in displayPages"
        :key="page"
        @click="page !== '...' && changePage(page)"
        :class="['page-number', { active: page === currentPage, ellipsis: page === '...' }]"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>
    </div>

    <!-- Page info (mobile) -->
    <div class="page-info">
      <span class="current">{{ currentPage }}</span>
      <span class="separator">/</span>
      <span class="total">{{ totalPages }}</span>
    </div>
    
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="page-btn next-btn"
      :title="currentPage === totalPages ? 'Last page' : 'Next page'"
    >
      <span class="btn-text">Next</span>
      <span class="btn-icon">→</span>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    totalPages: Number
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const changePage = (page) => {
      if (page >= 1 && page <= props.totalPages) {
        emit('page-change', page);
      }
    };

    // Generate page numbers with ellipsis for desktop
    const displayPages = computed(() => {
      const pages = [];
      const current = props.currentPage;
      const total = props.totalPages;

      if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Always show first page
        pages.push(1);

        if (current <= 3) {
          // Near start
          pages.push(2, 3, 4, '...', total);
        } else if (current >= total - 2) {
          // Near end
          pages.push('...', total - 3, total - 2, total - 1, total);
        } else {
          // Middle
          pages.push('...', current - 1, current, current + 1, '...', total);
        }
      }

      return pages;
    });

    return { 
      changePage,
      displayPages 
    };
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin: 3rem 0 2rem;
  flex-wrap: wrap;
}

/* === BUTTONS === */
.page-btn {
  padding: 0.75rem 1.25rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.page-btn:active:not(:disabled) {
  transform: translateY(0);
}

.page-btn:disabled {
  background: #f5f5f5;
  color: #ccc;
  border-color: #e0e0e0;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-text {
  display: none;
}

/* === PAGE NUMBERS (Desktop only) === */
.page-numbers {
  display: none;
}

.page-number {
  padding: 0.75rem 1rem;
  min-width: 45px;
  background: white;
  color: #555;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
  font-weight: 600;
}

.page-number:hover:not(.active):not(.ellipsis) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.page-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.page-number.ellipsis {
  border: none;
  background: transparent;
  cursor: default;
}

.page-number.ellipsis:hover {
  transform: none;
}

/* === PAGE INFO (Mobile only) === */
.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-weight: 600;
  color: #555;
}

.page-info .current {
  color: #667eea;
  font-size: 1.1rem;
}

.page-info .separator {
  color: #ccc;
}

.page-info .total {
  color: #999;
}

/* === TABLET === */
@media (min-width: 768px) {
  .pagination {
    gap: 1rem;
  }

  .btn-text {
    display: inline;
  }

  .page-btn {
    padding: 0.85rem 1.5rem;
  }
}

/* === DESKTOP === */
@media (min-width: 1024px) {
  .pagination {
    margin: 4rem 0 2rem;
  }

  .page-numbers {
    display: flex;
    gap: 0.5rem;
  }

  .page-info {
    display: none;
  }
}
</style>
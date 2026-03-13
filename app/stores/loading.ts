// loading 状态管理
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
    loadingCount: 0,
  }),
  actions: {
    showLoading() {
      this.loadingCount++;
      this.isLoading = true;
    },
    hideLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--;
        if (this.loadingCount === 0) {
          this.isLoading = false;
        }
      }
    },
  },
});

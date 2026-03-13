// loading 管理工具

class LoadingManager {
  private loadingCount = 0;
  private hideTimeout: NodeJS.Timeout | null = null;
  private callbacks: ((isLoading: boolean) => void)[] = [];

  // 注册回调
  onLoadingChange(callback: (isLoading: boolean) => void) {
    this.callbacks.push(callback);
  }

  // 取消注册回调
  offLoadingChange(callback: (isLoading: boolean) => void) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  // 通知所有回调
  private notifyCallbacks(isLoading: boolean) {
    this.callbacks.forEach((callback) => callback(isLoading));
  }

  // 显示 loading
  showLoading() {
    // 清除之前的隐藏定时器
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.notifyCallbacks(true);
    }
  }

  // 隐藏 loading
  hideLoading() {
    // 清除之前的隐藏定时器
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (this.loadingCount > 0) {
      this.loadingCount--;
      if (this.loadingCount === 0) {
        // 延迟1秒关闭 loading
        this.hideTimeout = setTimeout(() => {
          this.notifyCallbacks(false);
          this.hideTimeout = null;
        }, 1000);
      }
    }
  }
}

export default new LoadingManager();

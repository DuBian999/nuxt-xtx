// composables/useInfiniteScroll.ts
import { onMounted, onUnmounted, ref } from 'vue';

interface UseInfiniteScrollOptions {
  distance?: number;
  immediate?: boolean;
  initialLoad?: boolean;
  disabled?: boolean;
  load: () => Promise<void>;
  hasMore: () => boolean;
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const {
    distance = 100,
    immediate = false,
    initialLoad = false,
    disabled = false,
    load,
    hasMore,
  } = options;

  const loading = ref(false);
  const error = ref<Error | null>(null);

  const isScrolledToBottom = (): boolean => {
    const scrollY = window.scrollY;
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    return scrollY + visibleHeight >= totalHeight - distance;
  };

  const handleScroll = async () => {
    if (disabled || loading.value || !hasMore()) return;
    if (isScrolledToBottom()) {
      await loadMore(); // 使用 loadMore 统一处理
    }
  };

  let scrollTimer: number | null = null;
  const debouncedHandleScroll = () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(handleScroll, 100) as unknown as number;
  };

  // 增加 force 参数，忽略 hasMore 检查
  const loadMore = async (force = false) => {
    if (disabled || loading.value) return;
    if (!force && !hasMore()) return;

    try {
      loading.value = true;
      error.value = null;
      await load();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const start = () => {
    window.addEventListener('scroll', debouncedHandleScroll);
    window.addEventListener('resize', debouncedHandleScroll);

    if (initialLoad) {
      // 强制加载第一页
      loadMore(true);
    } else if (immediate) {
      handleScroll();
    }
  };

  const stop = () => {
    window.removeEventListener('scroll', debouncedHandleScroll);
    window.removeEventListener('resize', debouncedHandleScroll);
    if (scrollTimer) clearTimeout(scrollTimer);
  };

  const reset = () => {
    loading.value = false;
    error.value = null;
  };

  onMounted(() => {
    start();
  });

  onUnmounted(() => {
    stop();
  });

  return {
    loading,
    error,
    hasMore,
    start,
    stop,
    reset,
    loadMore,
    isScrolledToBottom,
  };
}

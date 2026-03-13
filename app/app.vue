<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- 全局 Loading 组件 -->
    <div class="global-loading" v-if="isLoading">
      <Loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import loadingManager from './services/loading';
import Loading from './components/Loading/index.vue';

const isLoading = ref(false);

// 注册loading状态变化回调
const handleLoadingChange = (loading: boolean) => {
  isLoading.value = loading;
};

onMounted(() => {
  loadingManager.onLoadingChange(handleLoadingChange);
});

onUnmounted(() => {
  loadingManager.offLoadingChange(handleLoadingChange);
});
</script>

<style scoped>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>

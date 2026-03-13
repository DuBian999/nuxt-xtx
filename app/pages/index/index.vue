<template>
  <div class="home-page">
    <BannerCarousel />
    <HomeNew />
    <HomeHot />
    <HomeBrand />
    <HomeProduct />
    <HomeSpecia />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// 懒加载组件
const BannerCarousel = defineAsyncComponent(
  () => import('./components/BannerCarousel.vue')
);
const HomeNew = defineAsyncComponent(() => import('./components/HomeNew.vue'));
const HomeHot = defineAsyncComponent(() => import('./components/HomeHot.vue'));
const HomeBrand = defineAsyncComponent(
  () => import('./components/HomeBrand.vue')
);
const HomeProduct = defineAsyncComponent(
  () => import('./components/HomeProducts.vue')
);
const HomeSpecia = defineAsyncComponent(
  () => import('./components/HomeSpecia.vue')
);
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
}
</style>

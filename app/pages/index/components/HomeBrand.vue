<template>
  <SectionContainer
    title="热门品牌"
    subTitle="国际经典 品质保证"
    :showViewAll="true"
    containerClass="home-brand"
    @viewAllClick="handleViewAll"
  >
    <template #viewAll>
      <div class="carousel-controls">
        <el-button
          size="small"
          :disabled="currentCarouselIndex === 0"
          @click="handlePrev"
          :icon="ArrowLeft"
        />
        <el-button
          size="small"
          :disabled="currentCarouselIndex === carouselBrandList.length - 1"
          @click="handleNext"
          :icon="ArrowRight"
        />
      </div>
    </template>
    <el-carousel
      v-model="currentCarouselIndex"
      indicator-position="none"
      :autoplay="false"
      arrow="never"
      height="305px"
      ref="carouselRef"
    >
      <el-carousel-item
        v-for="(brandGroup, index) in carouselBrandList"
        :key="index"
      >
        <el-row justify="space-between">
          <el-col :span="4" v-for="brand in brandGroup" :key="brand.id">
            <img
              :src="brand.picture"
              :alt="brand.title"
              class="brand-image"
              loading="lazy"
            />
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import type { CarouselInstance } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import { getHomeBrandsApi } from '~/apis/home';
import SectionContainer from './SectionContainer.vue';
import type { Brand } from '~/types/home';

const carouselRef = ref<CarouselInstance | null>(null);
const brandList = ref<Brand[]>([]);
const currentCarouselIndex = ref(0);

// 将品牌列表分割为每组5个的数组
const carouselBrandList = computed(() => {
  const result: Brand[][] = [];
  for (let i = 0; i < brandList.value.length; i += 5) {
    result.push(brandList.value.slice(i, i + 5));
  }
  return result;
});

// 切换到上一页
const handlePrev = () => {
  if (currentCarouselIndex.value > 0) {
    currentCarouselIndex.value--;
    carouselRef.value?.prev();
  }
};

// 切换到下一页
const handleNext = () => {
  if (currentCarouselIndex.value < carouselBrandList.value.length - 1) {
    currentCarouselIndex.value++;
    carouselRef.value?.next();
  }
};

// 获取热门品牌数据
const fetchBrandData = async () => {
  try {
    const response = await getHomeBrandsApi(12);
    brandList.value = response || [];
  } catch (error) {
    console.error('获取热门品牌数据失败:', error);
  }
};

// 处理查看全部点击事件
const handleViewAll = () => {
  // 这里可以添加跳转到品牌列表页面的逻辑
  console.log('查看全部品牌');
};

// 组件挂载时获取数据
onMounted(() => {
  fetchBrandData();
});
</script>

<style lang="scss" scoped>
.home-brand {
  background-color: #f5f5f5;
}

// 轮播控制按钮样式
.carousel-controls {
  display: flex;
  gap: 10px;

  .el-button {
    font-size: 14px;
  }
}

.brand-image {
  @extend .transition-transform;
  width: 240px;
  height: 305px;
  @extend .hover-scale;
}
</style>

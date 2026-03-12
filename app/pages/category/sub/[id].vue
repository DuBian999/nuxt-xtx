<template>
  <el-row class="sub-category-page" justify="center">
    <el-row class="container-block">
      <SubFilter
        :categoryId="id as string"
        @filterChange="handleFilterChange"
      />
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SubFilter from '~/components/Category/SubFilter.vue';

const route = useRoute();
const { id } = route.params;

const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
  // 处理筛选变化事件
  console.log('筛选变化:', selectedFilters);
};
</script>

<style lang="scss" scoped>
.sub-category-page {
  background-color: #f5f5f5;
}
</style>

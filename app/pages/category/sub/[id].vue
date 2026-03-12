<template>
  <el-row class="sub-category-page" justify="center">
    <el-row class="container-block">sub-category-page{{ id }}</el-row>
  </el-row>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { id } = route.params;

// 从子分类ID中提取父分类ID（假设子分类ID格式为 parentId-subId）
const parentId = id.toString().split('-')[0];
</script>

<style lang="scss" scoped>
.sub-category-page {
  background-color: #f5f5f5;
}
</style>

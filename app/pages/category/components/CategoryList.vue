<template>
  <el-row :gutter="20">
    <el-col
      v-for="(goods, index) in goods"
      :key="goods.id"
      :xs="12"
      :sm="8"
      :md="8"
      :lg="8"
      class="goods-item"
      :class="`animate-fade-in-up-delay-${(index % 4) + 1}`"
    >
      <NuxtLink class="goods-card" :to="`/product/${goods.id}`">
        <div class="goods-image">
          <img
            :src="goods.picture"
            :alt="goods.name"
            class="goods-img"
            loading="lazy"
          />
          <div class="image-overlay">
            <span class="overlay-text">查看详情</span>
          </div>
        </div>
        <div class="goods-info">
          <h5 class="goods-name">{{ goods.name }}</h5>
          <p class="goods-desc">{{ goods.desc }}</p>
          <div class="goods-bottom">
            <span class="goods-price">¥{{ goods.price }}</span>
            <span class="goods-sales">已售{{ goods.orderNum }}</span>
          </div>
        </div>
      </NuxtLink>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { GoodsItem } from '~/types/category';

// 定义props
const props = defineProps<{
  goods: GoodsItem[];
}>();
</script>

<style lang="scss" scoped>
.goods-item {
  margin-bottom: 20px;
  @extend .transition-all;
}

.goods-card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @extend .transition-all;
  height: 100%;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  .goods-image {
    padding: 15px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background-color: #fff;

    .goods-img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 4px;
      @extend .transition-transform;
      @extend .hover-scale;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      @extend .transition-all;

      .overlay-text {
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 8px 16px;
        background-color: var(--theme-color);
        border-radius: 4px;
      }
    }

    &:hover .image-overlay {
      opacity: 1;
    }
  }

  .goods-info {
    padding: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .goods-name {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 8px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      @extend .transition-color;

      &:hover {
        color: var(--theme-color);
      }
    }

    .goods-desc {
      font-size: 12px;
      color: #666;
      margin: 0 0 12px 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      flex: 1;
    }

    .goods-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-price {
        font-size: 16px;
        font-weight: 600;
        color: var(--theme-color);
      }

      .goods-sales {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>

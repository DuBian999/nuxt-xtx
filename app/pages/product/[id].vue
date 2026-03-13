<template>
  <el-row class="product-page" justify="center">
    <el-row class="container-block">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item
          v-for="category in productData?.categories"
          :key="category.id"
        >
          <NuxtLink :to="`/category/${category.id}`">{{
            category.name
          }}</NuxtLink>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ productData?.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 商品信息 -->
      <el-row :gutter="20" class="product-info">
        <!-- 左侧图片区域 -->
        <el-col :span="10">
          <div class="product-images">
            <!-- 主图 -->
            <div class="main-image">
              <img :src="selectedImage" alt="商品主图" />
            </div>
            <!-- 缩略图 -->
            <div class="thumbnails">
              <div
                v-for="(image, index) in productData?.mainPictures"
                :key="index"
                class="thumbnail-item"
                :class="{ active: selectedImageIndex === index }"
                @click="selectImage(index)"
              >
                <img :src="image" alt="缩略图" />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧商品信息 -->
        <el-col :span="14">
          <div class="product-details">
            <!-- 商品名称 -->
            <h1 class="product-name">{{ productData?.name }}</h1>
            <p class="product-desc">{{ productData?.desc }}</p>

            <!-- 价格信息 -->
            <div class="price-info">
              <div class="price-main">
                <span class="price-label">价格</span>
                <span class="price-value"
                  >¥{{ selectedSku?.price || productData?.price }}</span
                >
                <span class="price-old"
                  >¥{{ selectedSku?.oldPrice || productData?.oldPrice }}</span
                >
                <span class="price-discount"
                  >{{ productData?.discount }}折</span
                >
              </div>
              <div class="price-extra">
                <span>销量 {{ productData?.salesCount }}</span>
                <span>收藏 {{ productData?.collectCount }}</span>
                <span>评论 {{ productData?.commentCount }}</span>
              </div>
            </div>

            <el-row align="middle" class="brand-info">
              <el-col :span="2">品牌:</el-col>
              <el-col :span="22">
                <NuxtLink
                  ><el-link type="primary" underline="never">{{
                    productData?.brand.name
                  }}</el-link></NuxtLink
                ></el-col
              >
            </el-row>

            <!-- SKU选择 -->
            <el-row
              align="middle"
              class="sku-section"
              v-for="spec in productData?.specs"
              :key="spec.id"
            >
              <el-col :span="2">{{ spec.name }}:</el-col>
              <el-col :span="22" class="sku-values">
                <div
                  v-for="value in spec.values"
                  :key="value.name"
                  class="sku-value"
                  :class="{ active: selectedSpecs[spec.id] === value.name }"
                  @click="selectSpec(spec.id, value.name)"
                >
                  <img
                    v-if="value.picture"
                    :src="value.picture"
                    alt="规格图片"
                  />
                  <span v-else>{{ value.name }}</span>
                </div>
              </el-col>
            </el-row>

            <el-row align="middle" class="quantity-section">
              <el-col :span="2">数量:</el-col>
              <el-col :span="22">
                <el-input-number
                  v-model="quantity"
                  :min="1"
                  :max="selectedSku?.inventory || productData?.inventory || 99"
                />
              </el-col>
            </el-row>

            <!-- 库存信息 -->
            <div class="inventory-info">
              库存：{{ selectedSku?.inventory || productData?.inventory }}件
            </div>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button
                size="large"
                class="collect-btn"
                :type="productData?.isCollect ? 'primary' : 'default'"
              >
                <el-icon><Star /></el-icon>
                {{ productData?.isCollect ? '已收藏' : '收藏' }}
              </el-button>
              <el-button size="large" class="cart-btn" type="info">
                <el-icon><ShoppingCart /></el-icon> 加入购物车
              </el-button>
              <el-button size="large" class="buy-btn" type="primary">
                立即购买
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 商品详情和参数 -->
      <el-tabs class="product-tabs" :stretch="true">
        <el-tab-pane label="商品详情">
          <div class="detail-content">
            <div
              v-for="(picture, index) in productData?.details.pictures"
              :key="index"
            >
              <img :src="picture" alt="商品详情" class="detail-image" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="规格参数">
          <div class="specs-content">
            <el-table
              :data="productData?.details.properties"
              style="width: 100%"
            >
              <el-table-column prop="name" label="属性" width="120" />
              <el-table-column prop="value" label="值" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评价">
          <div class="review-content">
            <el-empty description="暂无评价" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="相似商品">
          <div class="similar-products">
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in productData?.similarProducts"
                :key="item.id"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
              >
                <div class="similar-item">
                  <NuxtLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="相似商品" />
                    <h4 class="similar-title">{{ item.name }}</h4>
                    <p class="similar-price">¥{{ item.price }}</p>
                    <p class="similar-sales">已售 {{ item.orderNum }}</p>
                  </NuxtLink>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProductDetailApi } from '~/apis/product';
import type { ProductDetailResult, Sku } from '~/types/product';
import { Star, ShoppingCart } from '@element-plus/icons-vue';

const route = useRoute();
const id = route.params.id as string;

// 商品数据
const productData = ref<ProductDetailResult | null>(null);
const loading = ref(true);

// 图片选择
const selectedImageIndex = ref(0);
const selectedImage = computed(() => {
  return productData.value?.mainPictures[selectedImageIndex.value] || '';
});

// SKU选择
const selectedSpecs = ref<Record<string, string>>({});
const selectedSku = computed(() => {
  if (!productData.value) return null;

  return productData.value.skus.find((sku) => {
    return sku.specs.every((spec) => {
      return selectedSpecs.value[spec.name] === spec.valueName;
    });
  });
});

// 数量
const quantity = ref(1);

// 选择图片
const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

// 选择规格
const selectSpec = (specId: string, valueName: string) => {
  selectedSpecs.value[specId] = valueName;

  // 当选择规格后，更新主图为当前SKU的图片
  if (selectedSku.value && selectedSku.value.picture) {
    const skuImageIndex = productData.value?.mainPictures.findIndex(
      (img) => img === selectedSku.value?.picture
    );
    if (skuImageIndex !== undefined && skuImageIndex >= 0) {
      selectedImageIndex.value = skuImageIndex;
    }
  }
};

// 获取商品详情
onMounted(async () => {
  try {
    const response = await getProductDetailApi(id);
    productData.value = response;

    // 初始化默认规格
    if (response.specs.length > 0) {
      response.specs.forEach((spec) => {
        if (spec.values.length > 0) {
          selectedSpecs.value[spec.id] = spec.values[0]?.name || '';
        }
      });
    }
  } catch (error) {
    console.error('获取商品详情失败:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.product-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;

  .container-block {
    width: 1200px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    background-color: #fff;
    box-sizing: border-box;
  }
}

.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
}

.product-info {
  margin-bottom: 40px;
  width: 100%;
  box-sizing: border-box;

  .el-col {
    box-sizing: border-box;
  }
}

/* 图片区域 */
.product-images {
  .main-image {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
    border: 1px solid #e4e7ed;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .thumbnails {
    display: flex;
    gap: 10px;

    .thumbnail-item {
      width: 80px;
      height: 80px;
      border: 2px solid transparent;
      cursor: pointer;
      overflow: hidden;
      @extend .transition-all;

      &:hover {
        border-color: var(--theme-color);
      }

      &.active {
        border-color: var(--theme-color);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

/* 商品详情 */
.product-details {
  .product-name {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px 0;
    line-height: 1.4;
  }

  .product-desc {
    font-size: 14px;
    color: #999;
    margin: 0 0 20px 0;
    line-height: 1.4;
  }

  .price-info {
    background-color: #f9f9f9;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;

    .price-main {
      display: flex;
      align-items: baseline;
      margin-bottom: 10px;

      .price-label {
        font-size: 14px;
        color: #666;
        margin-right: 10px;
      }

      .price-value {
        font-size: 28px;
        font-weight: 600;
        color: var(--theme-color);
        margin-right: 10px;
      }

      .price-old {
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
        margin-right: 10px;
      }

      .price-discount {
        font-size: 14px;
        color: #fff;
        background-color: var(--theme-color);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .price-extra {
      font-size: 14px;
      color: #666;

      span {
        margin-right: 20px;
      }
    }
  }

  .brand-info {
    margin-bottom: 20px;
  }

  .sku-section {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .sku-label {
      width: 80px;
      font-size: 14px;
      color: #666;
      line-height: 36px;
      flex-shrink: 0;
      margin-top: 0;
    }

    .sku-values {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      min-width: 0;
      align-items: center;

      .sku-value {
        padding: 8px 16px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        cursor: pointer;
        @extend .transition-all;
        display: flex;
        align-items: center;
        background-color: #fff;
        font-size: 14px;
        box-sizing: border-box;

        &:hover {
          border-color: var(--theme-color);
          box-shadow: 0 0 0 2px rgba(0, 220, 130, 0.1);
        }

        &.active {
          border-color: var(--theme-color);
          background-color: rgba(0, 220, 130, 0.05);
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300dc82"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>')
              no-repeat center;
            background-size: contain;
          }
        }

        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          object-fit: cover;
        }
      }
    }
  }

  .quantity-section {
    margin-bottom: 20px;
  }

  .inventory-info {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-top: 30px;

    .collect-btn {
      width: 90px;
      border-radius: 4px;
      @extend .transition-all;

      &:hover {
        color: var(--theme-color);
        border-color: var(--theme-color);
      }
    }

    .cart-btn {
      flex: 1;
      border-radius: 4px;
      background-color: #f0f9eb;
      border-color: var(--theme-color);
      color: var(--theme-color);
      @extend .transition-all;

      &:hover {
        background-color: var(--theme-color);
        color: #fff;
      }
    }

    .buy-btn {
      flex: 1;
      border-radius: 4px;
      background-color: var(--theme-color);
      border-color: var(--theme-color);
      @extend .transition-all;

      &:hover {
        background-color: #00b872;
      }
    }
  }
}

/* 商品标签页 */
.product-tabs {
  margin-bottom: 40px;
  width: 100%;
  box-sizing: border-box;

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
    width: 100%;

    .el-tabs__nav {
      border-bottom: 1px solid #e4e7ed;
      width: 100%;

      .el-tabs__item {
        font-size: 16px;
        padding: 0 20px;

        &.is-active {
          color: var(--theme-color);
        }
      }

      .el-tabs__active-bar {
        background-color: var(--theme-color);
      }
    }
  }

  :deep(.el-tabs__content) {
    width: 100%;
    box-sizing: border-box;
  }

  :deep(.el-tab-pane) {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  .detail-content {
    width: 100%;
    box-sizing: border-box;

    .detail-image {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .specs-content {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
  }

  .review-content {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 0;
  }

  .similar-products {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0;

    .similar-item {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      overflow: hidden;
      @extend .transition-all;

      &:hover {
        border-color: var(--theme-color);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      a {
        display: block;
        text-decoration: none;
        color: #333;

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .similar-title {
          font-size: 14px;
          padding: 10px;
          margin: 0;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .similar-price {
          font-size: 16px;
          font-weight: 600;
          color: var(--theme-color);
          padding: 0 10px 5px;
          margin: 0;
        }

        .similar-sales {
          font-size: 12px;
          color: #999;
          padding: 0 10px 10px;
          margin: 0;
        }
      }
    }
  }

  .recommend-section {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--theme-color);
      display: inline-block;
    }

    .recommend-item {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      overflow: hidden;
      @extend .transition-all;

      &:hover {
        border-color: var(--theme-color);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      a {
        display: block;
        text-decoration: none;
        color: #333;

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .recommend-title {
          font-size: 14px;
          padding: 10px;
          margin: 0;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .recommend-price {
          font-size: 16px;
          font-weight: 600;
          color: var(--theme-color);
          padding: 0 10px 5px;
          margin: 0;
        }

        .recommend-sales {
          font-size: 12px;
          color: #999;
          padding: 0 10px 10px;
          margin: 0;
        }
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-page {
    padding: 10px 0;

    .container-block {
      padding: 15px;
    }
  }

  .product-info {
    flex-direction: column;

    .el-col {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .product-details {
    .product-name {
      font-size: 20px;
    }

    .price-info {
      padding: 12px;
    }

    .sku-section {
      flex-direction: column;

      .sku-label {
        width: 100%;
        line-height: 28px;
        margin-bottom: 8px;
      }

      .sku-values {
        width: 100%;
      }
    }

    .quantity-section {
      flex-direction: column;
      align-items: flex-start;

      .quantity-label {
        width: 100%;
        margin-bottom: 8px;
      }

      :deep(.el-input-number) {
        width: 100%;
        max-width: 150px;
      }
    }

    .action-buttons {
      flex-direction: column;
      gap: 10px;

      button {
        width: 100% !important;
      }
    }
  }

  .product-tabs {
    :deep(.el-tabs__header) {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 14px;
          padding: 0 12px;
        }
      }
    }
  }

  .recommend-section {
    .recommend-item {
      a {
        img {
          height: 150px;
        }
      }
    }
  }
}
</style>

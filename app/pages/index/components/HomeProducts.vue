<template>
  <SectionContainer
    v-for="category in categoryList"
    :key="category.id"
    :title="category.name"
    :showViewAll="true"
    containerClass="home-product"
    @viewAllClick="handleViewAll(category.id)"
  >
    <div class="category-content">
      <!-- 分类图片 -->
      <div class="category-image">
        <img
          class="category-img"
          :src="category.picture"
          :alt="category.name"
          loading="lazy"
        />
        <div class="sale-info">
          <span class="sale-name">{{ category.name }}馆</span>
          <span class="sale-desc">{{ category.saleInfo }}</span>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="right-content">
        <!-- 子分类 -->
        <div class="child-categories">
          <div
            v-for="child in category.children"
            :key="child.id"
            class="child-category"
          >
            <div class="child-name">{{ child.name }}</div>
          </div>
        </div>

        <!-- 商品列表 -->
        <el-row :gutter="15">
          <el-col
            v-for="goods in category.goods"
            :key="goods.id"
            :xs="12"
            :sm="8"
            :md="6"
          >
            <div class="goods-item">
              <div class="goods-image">
                <img
                  class="goods-img"
                  :src="goods.picture"
                  :alt="goods.name"
                  loading="lazy"
                />
              </div>
              <div class="goods-info">
                <h4 class="goods-name">{{ goods.name }}</h4>
                <p class="goods-desc">{{ goods.desc }}</p>
                <p class="goods-price">¥{{ goods.price }}</p>
                <p class="goods-sales">已售 {{ goods.orderNum }} 件</p>
                <div class="hover-actions">
                  <span class="action-item">找相似</span>
                  <span class="action-item">发现更多宝贝</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHomeGoodsApi } from '~/apis/home';
import SectionContainer from './SectionContainer.vue';
import type { CategoryResult } from '~/types/home';

const categoryList = ref<CategoryResult[]>([]);

// 获取分类商品数据
const fetchCategoryGoodsData = async () => {
  try {
    const response = await getHomeGoodsApi();
    categoryList.value = response || [];
  } catch (error) {
    console.error('获取分类商品数据失败:', error);
  }
};

// 处理查看全部点击事件
const handleViewAll = (categoryId: string) => {
  // 这里可以添加跳转到对应分类页面的逻辑
  console.log('查看全部商品:', categoryId);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchCategoryGoodsData();
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.el-col {
  margin-bottom: 20px;
}

.home-product {
  width: 100%;
}

.category-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.category-image {
  flex: 0 0 200px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  .category-img {
    width: 100%;
    height: 500px;
    border-radius: 8px;
    object-fit: cover;
  }

  .sale-info {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    transform: translateY(100%);
    opacity: 0;
    @extend .animate-slide-up;
    animation-delay: 0.2s;

    .sale-name {
      text-align: center;
      background-color: var(--theme-color);
      width: 100%;
      padding: 8px 0;
    }
    .sale-desc {
      margin-top: 8px;
    }
  }
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; /* 允许收缩 */
  max-width: 100%; /* 限制最大宽度 */
}

.child-categories {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  .child-category {
    padding: 8px 16px;
    border-radius: 4px;
    text-align: center;
    background-color: #f5f5f5;
    @extend .transition-all;
    cursor: pointer;

    &:hover {
      background-color: var(--theme-color);
      transform: translateY(-2px);

      .child-name {
        color: #fff;
      }
    }

    .child-name {
      font-size: 14px;
      color: #333;
      @extend .transition-color;
    }
  }
}

.goods-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @extend .transition-all-fast;
  position: relative;

  @extend .hover-lift;
  @extend .hover-shadow;
  @extend .hover-border;

  .goods-image {
    width: 100%;
    padding-top: 100%; /* 1:1 宽高比 */
    position: relative;
    overflow: hidden;

    .goods-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @extend .transition-transform;
      @extend .hover-scale;
    }
  }

  .goods-info {
    padding: 15px;
    position: relative;
    overflow: hidden;

    .goods-name {
      font-size: 14px;
      color: #333;
      margin: 0 0 8px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .goods-desc {
      font-size: 12px;
      color: #999;
      margin: 0 0 8px 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .goods-price {
      font-size: 16px;
      font-weight: 600;
      color: var(--theme-color);
      margin: 0 0 4px 0;
    }

    .goods-sales {
      font-size: 12px;
      color: #999;
      margin: 0;
    }

    .hover-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--theme-color);
      color: #fff;
      padding: 10px;
      display: flex;
      justify-content: space-around;
      transform: translateY(100%);
      opacity: 0;
      @extend .transition-all;

      .action-item {
        font-size: 12px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .category-content {
    flex-direction: column;
  }

  .category-image {
    flex: 1;
    width: 100%;
  }

  .child-categories {
    flex-direction: column;
  }

  .goods-item {
    .goods-info {
      .goods-name {
        font-size: 12px;
      }

      .goods-price {
        font-size: 14px;
      }
    }
  }
}
</style>

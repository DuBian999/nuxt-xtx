<template>
  <el-row class="sub-category-page" justify="center">
    <el-row class="container-block">
      <SubFilter
        :categoryId="id as string"
        @filterChange="handleFilterChange"
      />

      <!-- 商品网格 -->
      <el-row :gutter="20" class="product-grid">
        <el-col
          v-for="item in productList"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
        >
          <div class="product-card">
            <div class="product-image-container">
              <img :src="item.picture" class="product-image" />
              <div class="image-overlay">
                <span class="overlay-text">查看详情</span>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ item.name }}</h3>
              <p class="product-desc">{{ item.desc }}</p>
              <div class="product-footer">
                <span class="product-price">¥{{ item.price }}</span>
                <span class="product-sales">已售 {{ item.orderNum }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 加载状态 -->
      <el-row v-if="loading" justify="center" class="container-block">
        <el-icon><Loading /></el-icon>
        加载中...
      </el-row>

      <!-- 没有更多数据 -->
      <el-row
        justify="center"
        v-if="noMore && productList.length > 0"
        class="container-block no-more"
      >
        —— 没有更多了 ——
      </el-row>

      <!-- 空状态 -->
      <el-row
        v-if="!loading && productList.length === 0"
        justify="center"
        class="container-block"
      >
        <el-empty description="暂无商品" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsListApi } from '~/apis/category';
import SubFilter from '~/components/Category/SubFilter.vue';
import { useInfiniteScroll } from '~/composables/useInfiniteScroll';
import type { FilterAttr, ProductItem } from '~/types/subcategory';

const route = useRoute();
const id = route.params.id as string;

// 商品列表数据
const productList = ref<ProductItem[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const error = ref<Error | null>(null);

// 筛选参数
const filterParams = reactive({
  categoryId: id,
  page: 1,
  pageSize: 10,
  inventory: false,
  onlyDiscount: false,
  sortField: 'default',
  sortMethod: 'desc' as 'asc' | 'desc',
  brandId: null as string | null,
  attrs: [] as FilterAttr[],
});

// 计算是否还有更多数据
const hasMore = computed(() => {
  // 如果当前没有数据，则认为还有更多（需要加载第一页）
  if (productList.value.length === 0) return true;
  return currentPage.value < totalPages.value;
});
const noMore = computed(() => !hasMore.value && productList.value.length > 0);

// 加载数据的函数
const loadData = async () => {
  // 注意：这里不需要再检查 hasMore，因为调用前已由 Hook 控制
  filterParams.page = currentPage.value;
  const response = await getGoodsListApi(filterParams);
  const { items, counts, pages } = response;
  if (currentPage.value === 1) {
    productList.value = items;
  } else {
    productList.value = [...productList.value, ...items];
  }
  totalCount.value = counts;
  totalPages.value = pages;
  // 如果当前页小于总页数，则页码加1，准备加载下一页
  if (currentPage.value < pages) {
    currentPage.value++;
  }
};

// 使用无限滚动hooks
const { loading, reset, loadMore, stop } = useInfiniteScroll({
  distance: 200, // 距离底部200px时触发
  initialLoad: true, // 立即加载第一页
  load: loadData,
  hasMore: () => hasMore.value,
});

// 处理筛选变化
const handleFilterChange = (
  selectedFilters: Record<string, string[]>,
  sortField: string
) => {
  console.log('筛选变化:', selectedFilters);

  // 构建筛选参数
  if (selectedFilters.brands && !selectedFilters.brands.includes('all')) {
    filterParams.brandId = selectedFilters.brands[0] || null;
  } else {
    filterParams.brandId = null;
  }

  // 处理销售属性筛选
  const attrs: FilterAttr[] = [];
  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (key !== 'brands' && !values.includes('all')) {
      values.forEach((valueId) => {
        attrs.push({
          groupName: key,
          propertyName: valueId,
        });
      });
    }
  });
  filterParams.attrs = attrs;
  filterParams.sortField = sortField;

  // 重置分页状态
  currentPage.value = 1;
  totalPages.value = 1;
  productList.value = [];
  error.value = null;

  // 重置hooks并重新加载
  reset();
  loadMore();
};

// 组件卸载时停止监听
onUnmounted(() => {
  stop();
});
</script>
<style lang="scss" scoped>
.sub-category-page {
  background-color: #f5f5f5;
  min-height: 100vh;

  .container-block {
    width: 1200px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    overflow: hidden; // 防止内部元素意外撑开容器
  }
}

.product-grid {
  margin-bottom: 20px;
  .el-col {
    margin-bottom: 20px;
  }
}

.product-card {
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @extend .transition-all;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .product-image-container {
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;

    .product-image {
      display: block;
      width: 100%;
      height: 200px;
      object-fit: cover;
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

  .product-info {
    padding: 15px;

    .product-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      @extend .transition-color;

      &:hover {
        color: var(--theme-color);
      }
    }

    .product-desc {
      margin: 0 0 12px 0;
      font-size: 12px;
      color: #666;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .product-price {
        font-size: 16px;
        font-weight: 600;
        color: var(--theme-color);
      }

      .product-sales {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

// 加载状态样式
.loading-indicator {
  text-align: center;
  padding: 30px;
  color: #999;

  .el-icon {
    margin-right: 8px;
    font-size: 18px;
    animation: rotating 2s linear infinite;
  }
}

// 没有更多数据提示
.no-more {
  text-align: center;
  padding: 30px;
  color: #999;
  font-size: 14px;
}

// 错误提示
.error-message {
  text-align: center;
  padding: 30px;

  p {
    color: #f56c6c;
    margin-bottom: 15px;
  }
}

// 旋转动画
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

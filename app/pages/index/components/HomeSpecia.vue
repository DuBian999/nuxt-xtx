<template>
  <SectionContainer
    title="最新专题"
    subTitle="精选专题 限时优惠"
    :showViewAll="true"
    containerClass="home-special"
    @viewAllClick="handleViewAll"
  >
    <el-row :gutter="20">
      <el-col
        v-for="special in specialList"
        :key="special.id"
        :xs="24"
        :sm="8"
        :md="8"
      >
        <div
          class="special-item"
          @click="handleSpecialClick(special.detailsUrl)"
        >
          <div class="special-image">
            <img :src="special.cover" :alt="special.title" loading="lazy" />
          </div>
          <div class="special-info">
            <h3 class="special-title">{{ special.title }}</h3>
            <p class="special-summary">{{ special.summary }}</p>
            <div class="special-meta">
              <span class="special-price">¥{{ special.lowestPrice }}</span>
              <div class="special-stats">
                <span class="stat-item"
                  ><el-icon><Star /></el-icon> {{ special.collectNum }}</span
                >
                <span class="stat-item"
                  ><el-icon><View /></el-icon> {{ special.viewNum }}</span
                >
                <span class="stat-item"
                  ><el-icon><ChatLineRound /></el-icon>
                  {{ special.replyNum }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getHomeSpecialApi } from '~/apis/home';
import SectionContainer from './SectionContainer.vue';
import type { SpecialItem } from '~/types/home';

const router = useRouter();
const specialList = ref<SpecialItem[]>([]);

// 获取最新专题数据
const fetchSpecialData = async () => {
  try {
    const response = await getHomeSpecialApi(3);
    specialList.value = response || [];
  } catch (error) {
    console.error('获取最新专题数据失败:', error);
  }
};

// 处理查看全部点击事件
const handleViewAll = () => {
  // 这里可以添加跳转到专题列表页面的逻辑
  console.log('查看全部专题');
};

// 处理专题点击事件
const handleSpecialClick = (detailsUrl: string) => {
  if (detailsUrl) {
    router.push(detailsUrl);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchSpecialData();
});
</script>

<style lang="scss" scoped>
// 主题色

.home-special {
  background-color: #f9f9f9;
  padding-bottom: 20px;
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

.special-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .special-image {
    width: 100%;
    padding-top: 60%; /* 5:3 宽高比 */
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .special-info {
    padding: 15px;

    .special-title {
      font-size: 16px;
      color: #333;
      margin: 0 0 8px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .special-summary {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .special-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .special-price {
        font-size: 18px;
        font-weight: 600;
        color: var(--theme-color);
      }

      .special-stats {
        display: flex;
        gap: 10px;

        .stat-item {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .special-item {
    .special-info {
      padding: 10px;

      .special-title {
        font-size: 14px;
      }

      .special-summary {
        font-size: 12px;
      }

      .special-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        .special-price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

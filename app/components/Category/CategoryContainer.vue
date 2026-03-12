<template>
  <el-row class="category-container" justify="center">
    <el-row class="container-block">
      <el-row class="category-content" :gutter="20">
        <!-- 左侧导航栏 -->

        <el-col :span="6">
          <el-affix :offset="70" target=".category-container">
            <div class="navigation-sidebar">
              <ul class="nav-list">
                <li
                  v-for="child in categoryData?.children"
                  :key="child.id"
                  class="nav-item"
                  :class="{ active: activeNav === child.id }"
                >
                  <a
                    :href="`#${child.id}`"
                    class="nav-link"
                    @click.prevent="scrollToSection(child.id)"
                  >
                    <img
                      :src="child.picture!"
                      :alt="child.name"
                      class="nav-icon"
                    />
                    <span class="nav-text">{{ child.name }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </el-affix>
        </el-col>

        <!-- 右侧内容区 -->
        <el-col :span="18">
          <div class="content-area">
            <div
              v-for="child in categoryData?.children"
              :key="child.id"
              :id="child.id"
              class="category-section"
            >
              <el-row class="section-header" justify="space-between">
                <h4 class="section-title">{{ child.name }}</h4>
                <el-link :href="`/category/sub/${child.id}`" underline="never">
                  查看更多 <el-icon><Right /></el-icon>
                </el-link>
              </el-row>
              <CategoryList :goods="child.goods" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { CategoryResult } from '~/types/category';
import CategoryList from './CategoryList.vue';
import { Right } from '@element-plus/icons-vue';

// 定义props
const props = defineProps<{
  categoryData: CategoryResult;
}>();

// 定义状态
const activeNav = ref<string>('');

// 滚动到指定区域
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeNav.value = sectionId;
  }
};

// 监听滚动事件，更新当前激活的导航项
const handleScroll = () => {
  const sections = props.categoryData?.children?.map((child) => child.id) || [];

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeNav.value = sectionId;
        break;
      }
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初始化激活的导航项
  if (props.categoryData?.children?.length) {
    activeNav.value = props.categoryData.children[0]!.id;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.category-container {
  background-color: #f5f5f5;
}

.category-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid #e4e7ed;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: '';
    width: 40px;
    height: 2px;
    background-color: var(--theme-color);
    border-radius: 1px;
  }
}

.category-content {
  padding: 20px;
}

// 左侧导航栏
.navigation-sidebar {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    @extend .transition-all;

    &:hover {
      background-color: #f0f2f5;
    }

    &.active {
      background-color: var(--theme-color);

      .nav-text {
        color: #fff;
        font-weight: 600;
      }

      .nav-icon {
        border-color: #fff;
      }
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      text-decoration: none;
      color: #333;
      @extend .transition-all;

      .nav-icon {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 12px;
        border: 1px solid #e4e7ed;
        @extend .transition-all;
      }

      .nav-text {
        font-size: 14px;
        @extend .transition-color;
      }
    }
  }
}

// 右侧内容区
.content-area {
  .category-section {
    margin-bottom: 40px;
    animation: fade-in-up 0.6s ease-out;

    .section-header {
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--theme-color);
    }

    .view-more-btn {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #666;
      font-size: 14px;
      @extend .transition-all;

      &:hover {
        color: var(--theme-color);
        transform: translateX(5px);
      }

      el-icon {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>

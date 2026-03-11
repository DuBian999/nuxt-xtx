<template>
  <el-affix :offset="0">
    <el-row justify="center" class="header-main">
      <el-row class="container-block nav-wrapper" justify="space-between">
        <el-col :span="4">
          <img src="../../public/favicon.ico" alt="logo" class="logo" />
        </el-col>
        <el-col :span="20">
          <el-menu
            mode="horizontal"
            background-color="#fff"
            text-color="#333"
            active-text-color="#ff6700"
            class="main-nav"
          >
            <el-menu-item index="home"
              ><NuxtLink to="/">首页</NuxtLink></el-menu-item
            >
            <el-menu-item
              v-for="item in categoryList"
              :key="item.id"
              :index="item.id.toString()"
            >
              <NuxtLink
                :to="`/category/${item.id}`"
                class="menu-item-link"
                @mouseenter.stop="handleMouseEnter(item)"
              >
                {{ item.name }}
              </NuxtLink>
            </el-menu-item>
          </el-menu>

          <!-- 自定义下拉菜单容器 - 纯CSS控制显示隐藏 -->
          <div
            class="dropdown-container"
            :class="{ 'dropdown-visible': shouldShowDropdown }"
            @mouseleave="handleDropdownMouseLeave"
          >
            <div class="dropdown-content" v-if="hasChildrenCategories">
              <el-row :gutter="20">
                <el-col
                  v-for="child in currentCategory?.children"
                  :key="child.id"
                  :xs="6"
                  :sm="6"
                  :md="4"
                  :lg="4"
                  :xl="3"
                >
                  <NuxtLink
                    :to="`/category/sub/${child.id}`"
                    class="child-category-link"
                  >
                    <div class="child-category">
                      <img
                        :src="child.picture"
                        :alt="child.name"
                        class="child-image"
                        loading="lazy"
                      />
                      <div class="child-name">{{ child.name }}</div>
                    </div>
                  </NuxtLink>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </el-affix>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app';
import { computed, ref } from 'vue';
import { getHomeCategoryApi } from '~/apis/home';
import type { Category } from '~/types/home';

// 使用 useState 持久化状态，避免路由切换时重新渲染
const currentCategoryId = ref<string | null>(null);
const visible = ref<boolean>(false);

// 当前选中的分类
const currentCategory = computed<Category | undefined>(() => {
  return categoryList.value!.find(
    (item) => item.id === currentCategoryId.value
  );
});

// 判断当前分类是否有子分类
const hasChildrenCategories = computed<boolean>(() => {
  return !!(
    currentCategory.value?.children && currentCategory.value.children.length > 0
  );
});

// 判断是否应该显示下拉菜单
const shouldShowDropdown = computed<boolean>(() => {
  return visible.value && hasChildrenCategories.value;
});

// 鼠标进入处理
const handleMouseEnter = (category: Category) => {
  if (category.children && category.children.length > 0) {
    currentCategoryId.value = category.id;
    visible.value = true;
  }
};

// 下拉菜单鼠标离开
const handleDropdownMouseLeave = () => {
  visible.value = false;
  currentCategoryId.value = null;
};

const { data: categoryList } = await useAsyncData(
  'header-navigation',
  async () => {
    const response = await getHomeCategoryApi();
    return response || [];
  },
  {
    server: true,
  }
);
</script>

<style lang="scss" scoped>
.header-main {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-nav {
  justify-content: end;
}

.nav-wrapper {
  position: relative;
}

.dropdown-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 1000;
  margin-top: 4px;

  // 默认隐藏状态 - 卷帘门关闭
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none; // 隐藏时不可交互

  // 显示状态 - 卷帘门打开
  &.dropdown-visible {
    max-height: 1000px; // 设置一个足够大的值
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; // 显示时可交互
  }
}

.dropdown-content {
  padding: 20px;
}

.child-category-link {
  text-decoration: none;
  display: block;

  .child-category {
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f5f5;

      .child-name {
        color: #ff6700;
      }
    }

    .child-image {
      width: 100%;
      height: auto;
      max-height: 80px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 8px;
      transition: transform 0.3s ease;
    }

    .child-name {
      font-size: 14px;
      color: #333;
      transition: color 0.3s ease;
    }
  }
}

// 可选：为导航链接添加悬停效果
.menu-item-link {
  transition: color 0.3s ease;

  &:hover {
    color: #ff6700;
  }
}
</style>

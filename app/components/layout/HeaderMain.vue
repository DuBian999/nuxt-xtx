<template>
  <el-row justify="center" class="header-main">
    <el-row class="container-block" justify="space-between">
      <el-col :span="4"> Logo </el-col>
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
            <template #default>
              <el-popover
                placement="bottom"
                max-width="1240px"
                trigger="hover"
                :disabled="!item.children || item.children.length === 0"
                popper-class="custom-popover"
              >
                <template #reference>
                  <NuxtLink :to="`/category/${item.id}`">{{
                    item.name
                  }}</NuxtLink>
                </template>
                <div class="popover-content">
                  <el-row
                    :gutter="20"
                    v-if="item.children && item.children.length > 0"
                  >
                    <el-col
                      v-for="child in item.children"
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
              </el-popover>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-row>
</template>
<script setup lang="ts">
import { useAsyncData, useState } from "nuxt/app";
import { getHomeCategoryApi } from "~/apis/home";
import type { Category } from "~/types/home";

// 使用 useState 持久化状态，避免路由切换时重新渲染
const categoryList = useState<Category[]>("categoryList", () => []);

console.error(categoryList.value, "categoryList.value");


await useAsyncData(
  "header-navigation",
  async () => {
    const response = await getHomeCategoryApi();
    categoryList.value = response || [];
    return categoryList.value;
  },
  {
    // 只在服务端执行一次，客户端复用数据
    server: true,
  }
);
</script>
<style lang="scss" scoped>
.main-nav {
  justify-content: end;
}

.custom-popover.el-popper {
  max-width: 1240px;
  width: auto;
  min-width: 200px;
  white-space: normal;
  word-break: break-word;
}

.child-category-link {
  .child-category {
    text-align: center;

    .child-image {
      width: 100%;
      height: auto;
      max-height: 80px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .child-name {
      font-size: 14px;
      color: #333;
      transition: color 0.3s ease;

      &:hover {
        color: #ff6700;
      }
    }
  }
}
</style>

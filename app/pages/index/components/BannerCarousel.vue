<template>
  <el-row justify="center" class="banner-carousel">
    <div class="container-block">
      <el-carousel
        :interval="5000"
        @click-item="handleBannerClick"
        height="500px"
      >
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.imgUrl" height="500" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getHomeBananerApi } from '~/apis/home';
import type { HomeBanner } from '~/types/home';

const router = useRouter();
const bannerList = ref<HomeBanner[]>([]);

// 获取banner数据
const fetchBannerData = async () => {
  try {
    const response = await getHomeBananerApi(1);
    bannerList.value = response || [];
  } catch (error) {
    console.error('获取banner数据失败:', error);
  }
};

// 处理banner点击事件
const handleBannerClick = (index: number) => {
  const banner = bannerList.value[index];
  if (banner && banner.hrefUrl) {
    router.push(banner.hrefUrl);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchBannerData();
});
</script>

<style lang="scss" scoped>
.banner-carousel {
  background-color: #f5f5f5;
}
</style>

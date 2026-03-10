<template>
  <div class="home-page">
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

    <SectionContainer
      title="新鲜好物"
      subTitle="新鲜出炉 品质靠谱"
      :showViewAll="true"
      containerClass="home-new"
      @viewAllClick="handleViewAll"
    >
      <el-row justify="space-between" :gutter="20">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          v-for="goods in newGoodsList"
          :key="goods.id"
        >
          <div class="goods-item">
            <div class="goods-image">
              <img class="goods-img" :src="goods.picture" :alt="goods.name" />
            </div>
            <div class="goods-info">
              <h4 class="goods-name">{{ goods.name }}</h4>
              <p class="goods-price">¥{{ goods.price }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </SectionContainer>

    <SectionContainer
      title="人气推荐"
      subTitle="热门商品 不容错过"
      :showViewAll="true"
      containerClass="home-hot"
      @viewAllClick="handleViewAll"
    >
      <el-row justify="space-between" :gutter="20">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          v-for="goods in hotGoodsList"
          :key="goods.id"
        >
          <div class="goods-item">
            <div class="goods-image">
              <img class="goods-img" :src="goods.picture" :alt="goods.title" />
            </div>
            <div class="goods-info">
              <h4 class="goods-name">{{ goods.title }}</h4>
              <p class="goods-price">¥{{ goods.alt }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </SectionContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SectionContainer from '~/components/SectionContainer.vue';
import {
  getHomeBananerApi,
  getHomeNewGoodsApi,
  getHomeHotApi,
} from '~/apis/home';
import type { NewGoods, HomeBanner, HotGoods } from '~/types/home';

const router = useRouter();
const bannerList = ref<HomeBanner[]>([]);
const newGoodsList = ref<NewGoods[]>([]);
const hotGoodsList = ref<HotGoods[]>([]);

// 获取最新商品数据
const fetchNewGoodsData = async () => {
  try {
    const response = await getHomeNewGoodsApi();
    newGoodsList.value = response || [];
  } catch (error) {
    console.error('获取最新商品数据失败:', error);
  }
};

// 获取banner数据
const fetchBannerData = async () => {
  try {
    const response = await getHomeBananerApi(1);
    bannerList.value = response || [];
  } catch (error) {
    console.error('获取banner数据失败:', error);
  }
};

// 获取人气推荐数据
const fetchHotGoodsData = async () => {
  try {
    const response = await getHomeHotApi();
    hotGoodsList.value = response || [];
  } catch (error) {
    console.error('获取人气推荐数据失败:', error);
  }
};

// 处理banner点击事件
const handleBannerClick = (index: number) => {
  const banner = bannerList.value[index];
  if (banner && banner.hrefUrl) {
    router.push(banner.hrefUrl);
  }
};

// 处理查看全部点击事件
const handleViewAll = () => {
  // 这里可以添加跳转到商品列表页面的逻辑
  console.log('查看全部商品');
};

// 组件挂载时获取数据
onMounted(() => {
  fetchBannerData();
  fetchNewGoodsData();
  fetchHotGoodsData();
});
</script>

<style lang="scss" scoped>
.banner-carousel {
  background-color: #f5f5f5;
}

.goods-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

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
      transition: transform 0.3s ease;
    }

    &:hover .goods-img {
      transform: scale(1.05);
    }
  }

  .goods-info {
    padding: 15px;

    .goods-name {
      font-size: 14px;
      color: #303133;
      margin: 0 0 10px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .goods-price {
      font-size: 16px;
      font-weight: 600;
      color: #ff6700;
      margin: 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .goods-item {
    .goods-info {
      padding: 10px;

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

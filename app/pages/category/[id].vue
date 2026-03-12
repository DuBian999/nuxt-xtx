<template>
  <CategoryContainer v-if="category" :categoryData="category" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryApi } from '~/apis/category';
import CategoryContainer from '~/components/Category/CategoryContainer.vue';
import type { CategoryResult } from '~/types/category';

const route = useRoute();
const { id } = route.params;

const category = ref<CategoryResult | null>(null);

onMounted(() => {
  getCategoryApi(id as string).then((res) => {
    category.value = res;
  });
});
</script>

<style lang="scss" scoped>
.category-page {
  padding: 20px 0;

  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
  }

  .category-content {
    display: flex;
    gap: 30px;

    .category-sidebar {
      width: 200px;
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;

      h3 {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-bottom: 10px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: var(--theme-color);
            }
          }
        }
      }
    }

    .category-products {
      flex: 1;

      h3 {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
      }

      .product-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;

        .product-item {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

          .product-image {
            width: 100%;
            height: 150px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .product-info {
            padding: 12px;

            h4 {
              font-size: 14px;
              color: #333;
              margin-bottom: 8px;
            }

            p {
              font-size: 16px;
              color: var(--theme-color);
              font-weight: bold;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>

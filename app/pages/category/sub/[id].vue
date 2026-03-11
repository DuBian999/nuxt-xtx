<template>
  <div class="sub-category-page">sub-category-page{{ id }}</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { id } = route.params;

// 从子分类ID中提取父分类ID（假设子分类ID格式为 parentId-subId）
const parentId = id.toString().split('-')[0];
</script>

<style lang="scss" scoped>
.sub-category-page {
  padding: 20px 0;

  .breadcrumb {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;

    a {
      color: #666;
      text-decoration: none;

      &:hover {
        color: var(--theme-color);
      }
    }

    span {
      margin: 0 10px;
    }
  }

  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
  }

  .filter-bar {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;

    .filter-item {
      display: flex;
      align-items: center;

      span {
        margin-right: 15px;
      }

      button {
        padding: 5px 15px;
        margin-right: 10px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          border-color: var(--theme-color);
          color: var(--theme-color);
        }

        &.active {
          background-color: var(--theme-color);
          color: #fff;
          border-color: var(--theme-color);
        }
      }
    }
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .product-card {
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .product-image {
        width: 100%;
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .product-info {
        padding: 16px;

        h3 {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
        }

        .product-price {
          font-size: 18px;
          color: var(--theme-color);
          font-weight: bold;
          margin-bottom: 10px;
        }

        .product-desc {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .add-to-cart {
          width: 100%;
          padding: 10px;
          background-color: var(--theme-color);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: var(--theme-color-light);
          }
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 4px;
      cursor: pointer;

      &:hover:not(:disabled) {
        border-color: var(--theme-color);
        color: var(--theme-color);
      }

      &:disabled {
        color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>

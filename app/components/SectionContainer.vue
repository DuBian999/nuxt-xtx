<template>
  <el-row justify="center" :class="['section-container', containerClass]">
    <div class="container-block">
      <div class="section-header">
        <div class="header-content">
          <div class="header-text">
            <h3 class="title">{{ title }}</h3>
            <p class="sub-title" v-if="subTitle">{{ subTitle }}</p>
          </div>
          <div v-if="showViewAll" class="view-all-container">
            <slot name="viewAll">
              <el-link class="view-all-link" @click="handleViewAllClick">
                {{ viewAllText || '查看全部' }}
              </el-link>
            </slot>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </el-row>
</template>

<script setup lang="ts">
// 定义props
const props = defineProps<{
  title: string;
  subTitle?: string;
  showViewAll?: boolean;
  viewAllText?: string;
  containerClass?: string;
}>();

// 定义事件
const emit = defineEmits<{
  (e: 'viewAllClick'): void;
}>();

// 处理查看全部点击事件
const handleViewAllClick = () => {
  emit('viewAllClick');
};
</script>

<style lang="scss" scoped>
.section-container {
  background-color: #fff;

  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .section-header {
    margin-bottom: 30px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 10px;

      .header-text {
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 10px;
        }

        .sub-title {
          font-size: 14px;
          color: #909399;
          margin: 0;
        }
      }

      .view-all-link {
        font-size: 14px;
        color: #ff6700;

        &:hover {
          color: #ff9e42;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .section-container {
    padding: 20px 0;

    .section-header {
      margin-bottom: 20px;

      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        .header-text .title {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

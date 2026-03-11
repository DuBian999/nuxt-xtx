<template>
  <el-container class="layout">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <HeaderTop />
      <HeaderMain />
    </el-header>

    <!-- 中间内容区 -->
    <el-main class="main">
      <slot></slot>
    </el-main>

    <!-- 底部信息栏 -->
    <el-footer class="footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script setup>
import HeaderTop from '@/components/layout/HeaderTop.vue';
import HeaderMain from '@/components/layout/HeaderMain.vue';
import Footer from '@/components/layout/Footer.vue';
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.header {
  height: auto;
  padding: 0;
}

.footer {
  padding: 0;
}

.main {
  padding: 0;
}
</style>

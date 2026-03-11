<template>
  <el-row justify="center" class="header-top">
    <el-row class="container-block" justify="end">
      <el-menu
        mode="horizontal"
        background-color="transparent"
        text-color="#666"
        :active-text-color="'var(--theme-color)'"
        class="top-nav"
      >
        <el-menu-item index="login"
          ><NuxtLink to="/login">请先登录</NuxtLink></el-menu-item
        >
        <el-menu-item index="register"
          ><NuxtLink to="/">免费注册</NuxtLink></el-menu-item
        >
        <el-menu-item index="orders"
          ><NuxtLink to="/">我的订单</NuxtLink></el-menu-item
        >
        <el-menu-item index="member"
          ><NuxtLink to="/">会员中心</NuxtLink></el-menu-item
        >
        <el-menu-item index="help"
          ><NuxtLink to="/">帮助中心</NuxtLink></el-menu-item
        >
        <el-menu-item index="about"
          ><NuxtLink to="/">关于我们</NuxtLink></el-menu-item
        >
        <el-menu-item index="mobile"
          ><NuxtLink to="/">手机版</NuxtLink></el-menu-item
        >
      </el-menu>
    </el-row>
  </el-row>
</template>

<style lang="scss" scoped>
.header-top {
  height: 54px;
  background: #333;
}
.top-nav {
  width: 100%;
  justify-content: end;
}
</style>

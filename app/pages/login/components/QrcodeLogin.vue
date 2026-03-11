<template>
  <div class="qrcode-login">
    <div class="qrcode-container">
      <img
        src="https://via.placeholder.com/200x200?text=扫码登录"
        alt="扫码登录"
        class="qrcode-image"
        loading="lazy"
      />
      <p>请使用小兔鲜儿APP扫码登录</p>
    </div>
    <div class="qrcode-hint">
      <p>扫码登录更安全</p>
      <el-link type="primary" @click="$emit('switchToPassword')"
        >密码登录</el-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义事件
const emit = defineEmits<{
  (e: 'switchToPassword'): void;
}>();
</script>

<style lang="scss" scoped>
.qrcode-login {
  text-align: center;
  padding: 20px 0;
  .qrcode-container {
    margin-bottom: 20px;
    .qrcode-image {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #606266;
    }
  }
  .qrcode-hint {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    p {
      margin: 0;
      font-size: 14px;
      color: #909399;
    }
  }
}
</style>

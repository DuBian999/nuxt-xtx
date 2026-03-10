<template>
  <div class="third-party-login">
    <div class="divider">
      <span>其他登录方式</span>
    </div>
    <div class="third-party-icons">
      <el-button circle @click="$emit('qqLogin')">
        <i class="el-icon-qq"></i>
      </el-button>
      <el-button circle @click="$emit('wechatLogin')">
        <i class="el-icon-chat-dot-round"></i>
      </el-button>
      <el-button circle @click="$emit('weiboLogin')">
        <i class="el-icon-share"></i>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义事件
const emit = defineEmits<{
  (e: 'qqLogin'): void;
  (e: 'wechatLogin'): void;
  (e: 'weiboLogin'): void;
}>();
</script>

<style lang="scss" scoped>
.third-party-login {
  margin-top: 30px;
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #909399;
      &::before,
      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #eaeef2;
        margin: 0 10px;
      }
    }
  }
  .third-party-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    .el-button {
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
}
</style>

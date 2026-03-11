<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-header">
        <h2>小兔鲜儿</h2>
        <p>新鲜 惠民 快捷</p>
      </div>
      <div class="login-form">
        <div class="login-tabs">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            <el-tab-pane label="短信登录" name="sms"></el-tab-pane>
            <el-tab-pane label="扫码登录" name="qrcode"></el-tab-pane>
          </el-tabs>
        </div>

        <!-- 密码登录 -->
        <PasswordLogin
          v-if="activeTab === 'password'"
          @login="handlePasswordLogin"
          @forgotPassword="handleForgotPassword"
        />

        <!-- 短信登录 -->
        <SmsLogin
          v-if="activeTab === 'sms'"
          @login="handleSmsLogin"
          @sendSms="handleSendSms"
        />

        <!-- 扫码登录 -->
        <QrcodeLogin
          v-if="activeTab === 'qrcode'"
          @switchToPassword="switchToPasswordLogin"
        />

        <!-- 第三方登录 -->
        <ThirdPartyLogin
          @qqLogin="handleQQLogin"
          @wechatLogin="handleWechatLogin"
          @weiboLogin="handleWeiboLogin"
        />

        <!-- 注册链接 -->
        <div class="register-link">
          <span>还没有账号？</span>
          <el-link type="primary" @click="handleRegister">立即注册</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PasswordLogin from './components/PasswordLogin.vue';
import SmsLogin from './components/SmsLogin.vue';
import QrcodeLogin from './components/QrcodeLogin.vue';
import ThirdPartyLogin from './components/ThirdPartyLogin.vue';

// 指定使用 blank 布局
definePageMeta({
  layout: 'blank',
});

// 激活的标签页
const activeTab = ref('password');

// 密码登录
const handlePasswordLogin = (form: {
  username: string;
  password: string;
  rememberMe: boolean;
}) => {
  console.log('密码登录:', form);
  // 这里可以添加登录逻辑
};

// 短信登录
const handleSmsLogin = (form: { phone: string; smsCode: string }) => {
  console.log('短信登录:', form);
  // 这里可以添加登录逻辑
};

// 发送短信
const handleSendSms = (phone: string) => {
  console.log('发送验证码到:', phone);
  // 这里可以添加发送验证码逻辑
};

// 切换到密码登录
const switchToPasswordLogin = () => {
  activeTab.value = 'password';
};

// QQ登录
const handleQQLogin = () => {
  console.log('QQ登录');
  // 这里可以添加QQ登录逻辑
};

// 微信登录
const handleWechatLogin = () => {
  console.log('微信登录');
  // 这里可以添加微信登录逻辑
};

// 微博登录
const handleWeiboLogin = () => {
  console.log('微博登录');
  // 这里可以添加微博登录逻辑
};

// 忘记密码
const handleForgotPassword = () => {
  console.log('忘记密码');
  // 这里可以添加忘记密码逻辑
};

// 注册
const handleRegister = () => {
  console.log('注册');
  // 这里可以添加注册逻辑
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.login-header {
  text-align: center;
  padding: 30px 0;
  background: #f5f7fa;
  border-bottom: 1px solid #eaeef2;
  h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #909399;
  }
}

.login-form {
  padding: 30px;
}

.login-tabs {
  margin-bottom: 20px;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #606266;
  span {
    margin-right: 5px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .login-wrapper {
    max-width: 100%;
  }
  .login-form {
    padding: 20px;
  }
  .login-header {
    padding: 20px 0;
  }
}
</style>

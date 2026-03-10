<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号">
        <template #append>
          <el-button type="text" @click="sendSmsCode" :disabled="countdown > 0">
            {{ countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码' }}
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="smsCode">
      <el-input v-model="form.smsCode" placeholder="请输入验证码"></el-input>
    </el-form-item>
    <el-button type="primary" class="login-button" @click="handleLogin"
      >登录</el-button
    >
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';

// 定义props
const props = defineProps<{
  initialPhone?: string;
}>();

// 定义事件
const emit = defineEmits<{
  (e: 'login', form: { phone: string; smsCode: string }): void;
  (e: 'sendSms', phone: string): void;
}>();

// 表单引用
const formRef = ref<FormInstance>();

// 表单数据
const form = reactive({
  phone: props.initialPhone || '',
  smsCode: '',
});

// 验证码倒计时
const countdown = ref(0);

// 表单规则
const rules = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

// 发送验证码
const sendSmsCode = () => {
  formRef.value?.validateField('phone', (error) => {
    if (!error) {
      // 模拟发送验证码
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      emit('sendSms', form.phone);
    }
  });
};

// 处理登录
const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('login', form);
    }
  });
};
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
</style>

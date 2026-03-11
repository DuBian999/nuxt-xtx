<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入用户名/手机号/邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <div class="form-actions">
      <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
      <el-link type="primary" @click="$emit('forgotPassword')"
        >忘记密码？</el-link
      >
    </div>
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
  initialUsername?: string;
  initialPassword?: string;
}>();

// 定义事件
const emit = defineEmits<{
  (
    e: 'login',
    form: { username: string; password: string; rememberMe: boolean }
  ): void;
  (e: 'forgotPassword'): void;
}>();

// 表单引用
const formRef = ref<FormInstance>();

// 表单数据
const form = reactive({
  username: props.initialUsername || '',
  password: props.initialPassword || '',
});

// 记住密码
const rememberMe = ref(false);

// 表单规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 处理登录
const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('login', { ...form, rememberMe: rememberMe.value });
    }
  });
};
</script>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
</style>

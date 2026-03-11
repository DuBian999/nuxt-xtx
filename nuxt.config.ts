// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // 服务端环境变量
    apiSecret: process.env.NUXT_API_SECRET,
    // 客户端环境变量
    public: {
      apiBase: process.env.VITE_APP_BASE_API || '/api',
    },
  },
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'scss',
  },
  // 配置全局样式和预处理器
  css: ['normalize.css', '@/styles/common.scss'],
  // 配置 SCSS 预处理器
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  },
  // 配置开发服务器
  devServer: {
    host: '0.0.0.0',
  },
});

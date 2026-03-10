// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // 服务端环境变量
    apiSecret: process.env.NUXT_API_SECRET,
    // 客户端环境变量
    public: {
      apiBase: process.env.VITE_APP_BASE_API || "/api",
    },
  },
  modules: ["@element-plus/nuxt"],
  // 配置全局样式
  css: [
    "normalize.css",
    "@/styles/common.scss",
  ],
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // 配置默认title
  app: {
    head: {
      title: '小兔鲜儿 - 优质商品，放心购物',
      meta: [
        {
          name: 'description',
          content:
            '基于Nuxt服务端渲染的电商平台，模拟真实购物场景，提供优质商品，享受放心购物体验。',
        },
        {
          name: 'keywords',
          content: 'Nuxt,小兔鲜儿,电商,购物,商品,优惠,正品',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  runtimeConfig: {
    // 服务端环境变量
    apiSecret: process.env.NUXT_API_SECRET,
    // 客户端环境变量
    public: {
      apiBase: process.env.VITE_APP_BASE_API || '/api',
    },
  },
  modules: ['@element-plus/nuxt', '@pinia/nuxt'],
  elementPlus: {
    importStyle: 'scss',
  },
  // 配置全局样式和预处理器
  css: ['normalize.css', '@/styles/common.scss', '@/styles/loading.scss'],
  // 配置 SCSS 预处理器
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *; @use "@/styles/animation.scss" as *;`,
        },
      },
    },
  },
  // 配置开发服务器
  devServer: {
    host: '0.0.0.0',
  },
});

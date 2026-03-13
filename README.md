# Nuxt 项目模板

## 项目简介

这是一个基于 Nuxt 4 和 Vue 3 的电商平台前端项目，集成了 Element Plus 组件库，实现了响应式布局和现代化的 UI 设计。项目包含了完整的首页、分类页、登录页等核心功能，并提供了丰富的动画效果和交互体验。

## 项目预览

| 二维码预览                                        | 链接访问                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="200" src="./README/Nuxt.png" alt="" > | 首页:https://dubian999.github.io/nuxt-xtx/ <br>登录页:https://dubian999.github.io/nuxt-xtx/login<br> 分类详情:https://dubian999.github.io/nuxt-xtx/category/1005000 <br> 分类筛选:https://dubian999.github.io/nuxt-xtx/subCategory/1008017 <br> 物品详情: https://dubian999.github.io/nuxt-xtx/product/3994572 |

### 首页

- 轮播图展示
- 新鲜好物模块
- 人气推荐模块
- 热门品牌模块
- 商品分类模块
- 最新专题模块

### 分类页

- 商品分类展示
- 子分类导航
- 商品列表

### 登录页

- 密码登录
- 短信登录
- 扫码登录
- 第三方登录

## 技术栈

| 技术     | 描述                          | 文档链接                                                                                                                               |
| -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 框架     | Nuxt 4 + Vue 3                | [Nuxt 文档](https://nuxt.com/docs)                                                                                                     |
| 组件库   | Element Plus                  | [Element Plus 文档](https://element-plus.org/zh-CN/)                                                                                   |
| 样式     | SCSS                          | [SCSS 文档](https://sass-lang.com/documentation/)                                                                                      |
| 代码规范 | ESLint + Prettier + Stylelint | [ESLint 文档](https://eslint.org/docs/latest/)、[Prettier 文档](https://prettier.io/docs/en/)、[Stylelint 文档](https://stylelint.io/) |
| Git 钩子 | Husky + lint-staged           | [Husky 文档](https://typicode.github.io/husky/)、[lint-staged 文档](https://github.com/okonet/lint-staged)                             |
| 包管理器 | pnpm                          | [pnpm 文档](https://pnpm.io/zh/)                                                                                                       |

## 项目功能

1. **响应式布局**：适配不同屏幕尺寸
2. **动画效果**：丰富的过渡动画和悬停效果
3. **主题定制**：支持自定义主题色
4. **懒加载**：图片懒加载优化
5. **图标自动导入**：Element Plus 图标自动导入
6. **代码规范**：自动格式化和代码检查
7. **Git 钩子**：提交代码时自动检查

## 项目结构

```
├── app/                    # 应用源代码
│   ├── apis/               # API 接口
│   │   ├── category.ts     # 分类相关接口
│   │   ├── home.ts         # 首页相关接口
│   │   └── product.ts      # 商品相关接口
│   ├── assets/             # 静态资源
│   │   └── img/            # 图片资源
│   ├── components/         # 组件
│   │   ├── Layouts/        # 布局组件
│   │   │   ├── Footer.vue   # 页脚组件
│   │   │   ├── HeaderMain.vue # 主导航组件
│   │   │   └── HeaderTop.vue # 顶部导航组件
│   │   └── Loading/        # 加载组件
│   │       └── index.vue    # 加载动画组件
│   ├── composables/         # 组合式函数
│   │   └── useInfiniteScroll.ts # 无限滚动
│   ├── layouts/            # 页面布局
│   │   ├── blank.vue        # 空白布局
│   │   └── default.vue      # 默认布局
│   ├── pages/              # 页面
│   │   ├── category/       # 分类页
│   │   │   ├── components/  # 分类组件
│   │   │   └── [id].vue     # 分类详情页
│   │   ├── index/          # 首页
│   │   │   ├── components/  # 首页组件
│   │   │   └── index.vue    # 首页
│   │   ├── login/          # 登录页
│   │   │   ├── components/  # 登录组件
│   │   │   └── index.vue    # 登录页
│   │   ├── product/         # 商品详情页
│   │   │   └── [id].vue     # 商品详情页
│   │   └── subCategory/     # 子分类页
│   │       ├── components/  # 子分类组件
│   │       └── [id].vue     # 子分类详情页
│   ├── services/           # 服务
│   │   ├── api.ts           # API 请求服务
│   │   └── loading.ts       # 加载状态管理
│   ├── stores/             # 状态管理
│   │   └── loading.ts       # 加载状态管理
│   ├── styles/             # 样式文件
│   │   ├── animation.scss  # 动画样式
│   │   ├── common.scss     # 公共样式
│   │   ├── loading.scss    # 加载样式
│   │   └── variables.scss  # 变量定义
│   ├── types/              # 类型定义
│   │   ├── category.d.ts    # 分类类型
│   │   ├── home.d.ts        # 首页类型
│   │   ├── product.d.ts      # 商品类型
│   │   └── subcategory.d.ts  # 子分类类型
│   └── app.vue             # 根组件
├── public/                 # 公共静态资源
├── README/                 # README 相关资源
├── .github/                # GitHub 配置
│   └── workflows/          # GitHub Actions 工作流
├── .husky/                 # Husky 配置
├── .vscode/                # VS Code 配置
├── .env                    # 环境变量
├── .env.development        # 开发环境变量
├── .env.production         # 生产环境变量
├── .env.test               # 测试环境变量
├── .gitignore              # Git 忽略文件
├── .lintstagedrc.json      # lint-staged 配置
├── .prettierrc             # Prettier 配置
├── .stylelintrc.json       # Stylelint 配置
├── eslint.config.cjs        # ESLint 配置
├── nuxt.config.ts          # Nuxt 配置
├── package.json            # 项目配置
├── pnpm-lock.yaml          # pnpm 依赖锁文件
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## 开发环境

### 系统要求

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### 依赖安装

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 开发工具

- **IDE**：Visual Studio Code
- **插件**：
  - Volar
  - ESLint
  - Prettier
  - Stylelint

## 运行程序

### 开发服务器

```bash
# 启动开发服务器
pnpm dev

# 启动开发服务器（指定端口）
pnpm dev --port 3000

# 启动开发服务器（使用本地 IP）
pnpm dev --host
```

开发服务器启动后，可通过以下地址访问：

- 本地：<http://0.0.0.0:3000/>
- 网络：<http://192.168.1.3:3000/>

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 代码规范检查

```bash
# ESLint 检查
pnpm lint

# ESLint 检查并自动修复
pnpm lint:fix

# Prettier 格式化
pnpm format

# Stylelint 检查
pnpm stylelint

# Stylelint 检查并自动修复
pnpm stylelint:fix
```

## 部署

项目配置了 GitHub Actions 工作流，可自动部署到 GitHub Pages。具体配置请查看 `.github/workflows/nuxtjs.yml` 文件。

## 注意事项

1. 项目使用 pnpm 作为包管理器，请确保已安装 pnpm
2. 开发环境配置文件为 `.env.development`，生产环境配置文件为 `.env.production`
3. 代码提交时会自动进行 ESLint 和 Prettier 检查，请确保代码符合规范
4. 图片使用了懒加载优化，提高页面加载速度
5. 主题色可在 `app/styles/variables.scss` 文件中修改

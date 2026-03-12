# Nuxt 项目模板

## 项目简介

这是一个基于 Nuxt 4 和 Vue 3 的电商平台前端项目，集成了 Element Plus 组件库，实现了响应式布局和现代化的 UI 设计。项目包含了完整的首页、分类页、登录页等核心功能，并提供了丰富的动画效果和交互体验。

## 项目预览
<table>
  <tr>
    <td>二维码预览</td>
    <td>链接访问</td>
  </tr>
  <tr>
    <td><img width="200" src="./README/Nuxt.png" alt="" ></td>
    <td>https://dubian999.github.io/nuxt-xtx/</td>
  </tr>
</table>
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

- **框架**：Nuxt 4 + Vue 3 + Pinia
- **组件库**：Element Plus
- **样式**：SCSS
- **代码规范**：ESLint + Prettier + Stylelint
- **Git 钩子**：Husky + lint-staged
- **包管理器**：pnpm

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
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   │   └── Layouts/        # 布局组件
│   ├── layouts/            # 页面布局
│   ├── pages/              # 页面
│   │   ├── category/       # 分类页
│   │   ├── index/          # 首页
│   │   │   └── components/ # 首页组件
│   │   └── login/          # 登录页
│   │       └── components/  # 登录组件
│   ├── services/           # 服务
│   ├── styles/             # 样式文件
│   │   ├── animation.scss  # 动画样式
│   │   ├── common.scss     # 公共样式
│   │   └── variables.scss  # 变量定义
│   ├── types/              # 类型定义
│   └── app.vue             # 根组件
├── public/                 # 公共静态资源
├── .github/                # GitHub 配置
│   └── workflows/          # GitHub Actions 工作流
├── .husky/                 # Husky 配置
├── .vscode/                # VS Code 配置
├── nuxt.config.ts          # Nuxt 配置
├── package.json            # 项目配置
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

## 许可证

MIT

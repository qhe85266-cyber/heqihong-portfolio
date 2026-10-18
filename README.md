# 何棋宏 | AI产品经理 — 个人网站

React + TypeScript + Vite + Tailwind CSS v4 + React Router + Lucide React。

## 安装与启动

```bash
npm install
npm run dev        # 开发，默认 http://localhost:5173
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 本地预览生产构建
```

## 内容在哪里改

所有文案集中在 `src/data/`，页面不需要改动：

| 文件 | 内容 |
| --- | --- |
| `src/data/profile.ts` | 姓名、职业、价值主张、首屏关键词、个人定位、关于、联系方式（邮箱 / 社交账号）、导航、工作方法 |
| `src/data/projects.ts` | 代表项目与详情页内容。示例项目标记为 `isSample: true`，替换后改为 `false` |
| `src/data/research.ts` | 思考与研究文章 |
| `src/data/tools.ts` | 工具栈轮播 |

- 联系方式：`profile.contact.email` 为空时页面显示“联系方式待补充”，填写后才会出现邮件按钮与复制按钮；`socials` 同理。
- 项目外链（在线体验 / 源码 / 下载）：在项目的 `links` 数组中填写，没有则不显示。
- 项目封面与截图：为项目设置 `cover` / `screenshots[].src`（放在 `public/images/` 下，并填写真实宽高）。

## 素材替换

| 路径 | 说明 |
| --- | --- |
| `public/videos/personal-hero.mp4` | 首屏视频（焦糖棕外套形象，含人物与黑白粒子波浪背景、"AI PM" 笔刷字）。已去掉原视频左下角的小字和音轨 |
| `public/images/personal-hero-v4-caramel.png` | 静态封面原图 |
| `public/images/personal-hero-v4-caramel.jpg` | 由 v4 导出的首屏封面（视频加载前、加载失败或减少动态模式时显示）。替换封面后请重新导出同名文件 |
| `public/images/og-image.jpg` | 分享预览图（v4）。部署后建议把 `index.html` 中 `og:image` 改为带域名的绝对地址 |
| `public/images/personal-hero-v1/v2/v3*` | 旧版素材，保留但不使用 |

### 首屏视频

`src/components/HeroMedia.tsx`：先显示封面，视频开始播放后淡入；视频是转头开场、首尾不一致，所以**只播放一次并停在尾帧**，右上角按钮可暂停 / 继续 / 重新播放。视频缺失或失败时保持封面；首屏离开视口或页面进入后台时暂停；`prefers-reduced-motion` 下默认显示静态封面；尊重用户手动暂停。

换新视频：放到 `public/videos/personal-hero.mp4` 即可。若新视频左下角也有同样的小字，可运行：

```bash
swift scripts/clean-hero-video.swift 原视频.mp4 public/videos/personal-hero.mp4
```

## 部署与路由

站点使用 `BrowserRouter`（`/projects/:slug`、`/research/:slug`），生产环境必须把所有未知路径回退到 `index.html`，否则刷新详情页会 404：

- Vercel：添加 `vercel.json`：`{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- Netlify：在 `public/_redirects` 写入 `/* /index.html 200`
- Nginx：`try_files $uri /index.html;`
- 若部署在子路径下，需要在 `vite.config.ts` 设置 `base`，并给 `BrowserRouter` 设置 `basename`。

本项目不包含任何自动部署配置。

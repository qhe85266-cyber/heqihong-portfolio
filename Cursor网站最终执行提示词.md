# 何棋宏个人网站：Cursor 最终执行提示词

本文件是最终需求，覆盖同目录早期文档中冲突的姓名、白色配色、静态人物和左上角品牌要求。请读取本文件后直接开展开发。

## 你的任务

你是一位资深前端工程师与交互设计师。请在当前目录完成一个可运行、可维护、具有动态肖像首屏的个人作品集网站。先检查工作区说明与现有文件，沿用已有项目框架和包管理器；若尚无项目，使用 React + TypeScript + Vite、Tailwind CSS、Lucide React，并采用适当的路由方案。不要只输出代码建议或计划，要实际创建、运行和验证网站。保留现有图片与文档。

## 已确认的个人信息

- 姓名：何棋宏
- 职业：AI产品经理
- 个人价值主张（保持原文）：让复杂的 AI，成为简单好用的产品。
- 页面标题：何棋宏 | AI产品经理
- 不编造经历、资历、数字成果、客户、邮箱或社交账号。

## 参考与设计取舍

- https://www.huangxiyuan.net/：参考首页动态肖像、深色彩光、长页面的内容路径、项目详情和工具轮播。
- https://ts.leess.fun/ 中的 xPortfolio Hero：参考大人物与周围文字的构图，不参考素材库本身的弹窗、会员、搜索等界面。
- 已确认参考个人站使用约4.1秒的自动播放、静音、循环MP4配poster，人物头部角度与背景颜色随时间变化；这不是已验证的鼠标跟随人脸效果。
- 整站最终采用近黑底、白字、蓝紫光影；不沿用Brandly的白底橙色头盔、虚构品牌和营销数字。

## 首页首屏：必须遵守

### 导航

左上角不显示姓名、英文名、缩写、Logo或其他品牌文字。姓名只在首屏大标题区域出现。

桌面页头只保留“作品 / 思考 / 工具栈 / 关于 / 联系”导航，可居中排列；移动端使用菜单按钮展开这些入口。不要为了填补左上角空间再添加标识。

### 首屏文案与构图

左侧文字层：

何棋宏
AI产品经理
让复杂的 AI，成为简单好用的产品。

姓名使用最大号白色中文标题；职业独立一行，略小；价值主张使用更易读的中等字号。没有额外介绍时保留留白，不堆砌泛泛的宣传段落。

下面提供“查看作品 →”主按钮，以及“关于我”“联系”次入口。

人物放在中央偏右，头部、眼睛和嘴部不能被文字挡住。人物为当前已生成的西装形象，不添加头盔或眼镜。右侧可保留短小的非量化能力信息，如“产品研究 · 交互设计 · 原型验证”，不要用未经证实的能力成果占满画面。

首屏底部可使用能力关键词条衔接正文；关键词作为可编辑内容，避免让访客误以为是客户Logo墙。

### 视频制作与接入：由你负责推进

现有素材：
- public/images/personal-hero-v2.png：最终肖像参考与视频poster。
- public/images/personal-hero-v1.png：保留的旧版，不作为默认首图。

目标视频：人物小幅、自然、缓慢地转头，轻微呼吸感，背景蓝紫光晕缓慢变化，偶有少量暖金光照亮脸部。镜头固定，不推拉、不切镜，文字与按钮保持静止。保留本人五官辨识度、西装、白衬衫和领带，避免脸部变形、五官漂移与闪烁。

先检查当前环境是否有可用且已授权的图生视频工具；若有，使用下面的视频提示词生成5–6秒可循环视频，检查人脸稳定性后保存为 public/videos/personal-hero.mp4。不要下载或复用参考作者的视频，不擅自产生付费订单。若缺少工具、权限或素材，不虚构视频已生成：先完成网站及视频接入，以poster作为可用降级，并清楚报告视频制作的具体阻碍。不要因视频缺失停止其他页面开发。

图生视频提示词：

Use public/images/personal-hero-v2.png as the identity and appearance reference. Create a 5–6 second cinematic personal portfolio hero video, landscape 16:9. Preserve the same man's recognizable facial identity, age, hairstyle, black suit, white shirt and tie throughout every frame. Keep the camera locked and the torso almost still. Slowly turn his head through a small natural angle from a slight three-quarter view toward the camera, with subtle breathing and a calm confident expression. No speaking or exaggerated gestures. Stable eyes, nose, jawline and clothing, no morphing or flicker. Subject on the right, generous dark negative space on the left for webpage text. Near-black background with slowly evolving deep blue, violet and restrained magenta lighting, plus occasional soft warm amber illumination. Realistic skin texture, premium editorial photography. Closely matching starting and ending poses and lighting for a smooth loop. No text, letters, logos, watermark or UI. No camera pan, zoom or cuts.

视频实现：
- 使用真实video元素，autoPlay、loop、muted、playsInline，pointer-events:none。
- video与poster仅覆盖首屏，不固定铺满整张长页面。
- 静态poster先显示，视频可播放时平滑切换，避免黑屏。
- 分别设置桌面和移动端object-position，保证脸部完整；如果横版视频无法兼顾手机，合理缩小画面或另做竖版，优先保证面部展示。
- 左侧与底部叠加暗渐变，保证文字对比度；不要把姓名或按钮烧录进视频。
- 自动播放失败或素材缺失时保留poster，页面仍然完整。
- 提供键盘可用、有明确标签的播放/暂停控件。
- prefers-reduced-motion默认显示静态poster；首屏离开视口或页面隐藏时暂停。恢复播放时尊重用户主动暂停状态。
- 不自动播放音乐。
- 不用整张PNG的rotateY、平移、缩放或鼠标视差冒充人物真实转脸。
- 当前PNG已经含背景，不能把它当作透明人物图叠在新背景上；确需分层时先获取真实透明素材。

## 视觉规范

- 背景 #07070C；次级面板 #101019；主文字 #F5F5F7；次文字 #A5A5B5。
- 点缀青蓝 #69D5FF、紫色 #956BFF；少量洋红和暖金仅用于肖像光影。
- 使用大面积留白、细边框、克制的光效；正文区降低背景动态和光效强度。
- 中文标题使用支持中文的字体。正文可采用Inter和系统中文字体回退；Anton只适用于确实需要的英文展示文字，不用它渲染中文。
- 全站统一间距、字号、圆角、边框和按钮样式。不要出现“每个区块一套设计”的割裂感。
- 动效轻量：按钮反馈、卡片轻微提起、内容淡入；减少动态模式下内容立即可读。
- 不强制开场动画，不滚动劫持，不制作跟随光标的巨大特效。

## 首页正文顺序

1. 个人定位：突出已确认的价值主张，预留个人介绍与技能标签。
2. 代表项目：封面、名称、分类、解决的问题、角色、结果与详情入口。所有示例项目明显标记“示例 / 待替换”，不复制参考作者的项目与成果。
3. 工作方法：发现问题 → 设计方案 → 构建原型 → 验证迭代，说明保持简短且可编辑。
4. 思考与研究：编号文章列表；示例文章明确待替换。
5. 工具栈：中心卡片突出，两侧缩小后退的轮播，支持上一张/下一张、指示点、键盘及触屏操作，不强制自动轮播。
6. 关于：个人介绍、能力标签、三个能力说明块，未知信息标记待补充。
7. 联系：只有提供真实地址后才显示邮件/社交操作；邮箱未提供时显示“联系方式待补充”，不生成假mailto或假复制按钮。
8. 页脚与返回顶部。

## 页面与交互

- 首页 /，锚点 #work、#method、#capabilities、#about、#contact。
- 项目 /projects/:slug：返回项目区、概览、问题与目标、个人贡献、方案与过程、截图、结果或验证、限制及真实外链。至少实现一个明确标记为示例的完整模板。
- 研究 /research/:slug：标题、摘要、章节、来源和返回入口，至少有一个明确的示例模板。
- 站内链接同标签页，外链新标签页并设置noopener noreferrer。
- 未知路径和slug有友好404；浏览器前进后退、详情页刷新和返回项目区正常。
- 锚点滚动补偿页头高度；移动菜单选择后关闭、支持Esc、焦点管理和必要的滚动锁定。
- 作品根据数据提供详情、源码、在线体验或下载入口，没有目标则不显示；不留无反馈假按钮。
- 工具轮播各类操作使用同一索引状态；边界行为一致，不能越界或横向溢出。
- 语义化标题、图片alt、focus-visible、触屏至少44px操作区域。

## 响应式与工程要求

- 首屏使用min-height:100svh，短屏允许自然增高；body不设overflow:hidden。
- 手机重新排版为导航、姓名与职业、价值主张与CTA、动态人物、辅助信息；避免三栏直接缩小。
- 在375、768、1440宽度检查脸部裁切、文字重叠、导航与按钮、横向溢出。
- 个人资料、项目、研究和工具集中在数据文件；方便我后续补充真实内容。
- 图片提供尺寸防止布局跳动，首图优先加载，正文图片懒加载；视频控制体积并采用合适的加载策略。
- 配置title、description和分享元数据；未知邮箱等不能写成真实信息。
- README提供安装、启动、构建、部署路由注意事项、内容和素材替换位置。
- 不擅自部署或发布。

## 完成标准

先完成静态排版、数据、页面和路由，再处理视频与轮播。运行构建和现有相关检查，实际打开页面验证导航、菜单、详情、返回、轮播、404、响应式及视频成功/失败/暂停状态。

交付说明：修改文件、运行命令、实际检查结果、仍需补充的内容，以及视频是否真实生成。若视频未生成，写清原因，禁止把“已写video标签”等同于“人物已会转头”。

现在开始实施。

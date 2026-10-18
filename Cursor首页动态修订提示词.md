# 何棋宏首页动态修订提示词

本文件取代此前提示词中“静态人物图”“不使用背景视频”和姓名占位符的要求；其余全站结构继续沿用。参考站于2026-10-18重新核查：首页使用约4.09秒、自动播放、静音、循环的MP4，配静态poster。连续观察到人物头部角度和背景颜色变化，姓名与导航保持叠加。此次没有证据表明人脸跟随鼠标。

## 直接交给 Cursor

```text
请修订此前个人网站方案并实际实施。以下要求覆盖之前冲突的静态首屏要求。

个人身份：
- 姓名：何棋宏
- 职业：AI产品经理
- 浏览器标题：何棋宏 | AI产品经理
- 页面主标题显示“何棋宏”，下面独立显示“AI产品经理”。
- 顶部品牌显示“何棋宏”，不使用HXY、EVAN或Brandly。
- 其他未经提供的履历、项目、邮箱仍待补充，不编造。

首屏效果：
参考 https://www.huangxiyuan.net/ 的动态人物呈现。人物缓慢转头，背景彩色光晕随时间变化；导航、文字和按钮保持稳定且可点击。保持之前选定的xPortfolio人物与四周信息构图，并根据实际视频的人物位置调整文案，避免遮挡脸部。

动态素材机制：
- 用真实video层播放 /videos/personal-hero.mp4，可选提供WebM。
- video设置autoPlay、loop、muted、playsInline，禁用鼠标事件。
- 图片poster使用已有 /images/personal-hero-v2.png。
- 图片和视频铺满首屏，使用object-fit:cover，并分别为桌面和移动端配置object-position；确保脸部完整可见。
- 只在首屏内定位，不将视频固定覆盖整个长页面。
- 单独添加左侧与底部暗渐变，保障文字对比度，不把文字烧录进视频。
- 如果视频缺失、加载失败或自动播放被阻止，完整显示poster，不显示黑屏或破损素材。
- prefers-reduced-motion模式显示静态poster，并提供可访问的暂停/播放背景动画控件。
- 首屏离开视口或页面隐藏时暂停，恢复可见时仅在用户未主动暂停的情况下恢复播放。
- 不自动播放任何声音，不引入背景音乐来模拟动效。

重要：目前只有PNG静态肖像，未提供转头视频。不得用整张图片rotateY、横向平移、缩放或鼠标视差冒充真实转脸。先实现视频接入及图片降级，在交付说明“待补充personal-hero.mp4”。不要复用参考站作者的人物视频。

背景色彩：
以近黑为基底，动态蓝、紫、少量洋红与暖金光晕，参考原站的冷暖变化。若以后人物视频自带背景变化，避免额外叠加冲突的大幅光效。若只有静态图片，可先在独立背景层加入轻微渐变变化，但明确这不是人物动画。

保留后续长页面及项目详情、研究、工具栈、关于、联系。不得将body设为overflow:hidden。

检查视频成功、缺失、失败、暂停、减少动态、移动端裁切等状态；交付时区分“代码已接入”和“人物视频已提供”，不能把两者混为完成。
```

## 人像转头视频制作提示词

供支持图生视频的工具使用，输入personal-hero-v2.png；此提示词本身不会生成视频。

```text
Use the supplied portrait as the identity and visual reference. Create a 5–6 second cinematic personal portfolio hero video, landscape 16:9. Preserve the same man's recognizable facial identity, hairstyle, age, black suit, white shirt and tie throughout every frame. Keep the camera locked and the torso almost still. The man slowly turns his head by a small natural angle from a slight three-quarter view toward the camera, with subtle breathing and a calm confident expression. No speaking. No exaggerated movement. Maintain stable eyes, nose, jawline and clothing with no morphing or flicker. Keep the subject on the right and clean negative space on the left for website text. Near-black background with slowly evolving deep blue, violet and restrained magenta light, occasional soft warm amber facial illumination. Natural realistic skin texture, premium editorial lighting. Start and end in closely matching pose and lighting for a smooth loop. No text, logos, watermark, interface, camera pan, zoom or cuts.
```

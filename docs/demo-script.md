# 产品演示脚本 (Demo Script)

## 录制准备

### 工具推荐
- **macOS**: [Kap](https://getkap.co/) (免费) 或 QuickTime
- **Windows**: OBS Studio 或 Xbox Game Bar
- **跨平台**: [ScreenToGif](https://www.screentogif.com/)
- **在线工具**: [gifcap.dev](https://gifcap.dev/)

### 录制设置
- 分辨率: 1920x1080
- 帧率: 30fps
- 鼓包缩放: 1.5x (让鼠标点击更明显)
- 主题: Dark Theme (最能展示视觉效果)

---

## 场景 1: 开场概览 (15秒)

### 操作
1. 打开 Dashboard 首页
2. 停留 2 秒展示整体布局
3. 鼠标缓慢扫过 6 个统计卡片
4. 按 `Cmd/Ctrl + K` 打开 Command Palette

### 配音/字幕
> "OpenClaw Dashboard - 一个实时监控 AI Agent 的管理面板"

---

## 场景 2: 实时数据 (20秒)

### 操作
1. 在首页观察 WebSocket 实时更新（数字变化）
2. 切换到 Sessions 页面
3. 点击一个 Session 展开详情
4. 滚动查看消息历史

### 配音/字幕
> "实时数据推送，无需刷新 - WebSocket 连接确保你看到的永远是最新的"

---

## 场景 3: 主题切换 (10秒)

### 操作
1. 点击右上角设置图标
2. 依次切换：Dark → Light → AMOLED → System
3. 每个主题停留 2 秒

### 配音/字幕
> "4 种精美主题 - Dark, Light, AMOLED 和跟随系统"

---

## 场景 4: Command Palette (10秒)

### 操作
1. 按 `Cmd/Ctrl + K` 打开 Command Palette
2. 输入 "agent" 搜索
3. 选择一个命令执行

### 配音/字幕
> "⌘K 快捷命令面板 - 所有功能触手可及"

---

## 场景 5: 移动端响应 (可选, 15秒)

### 操作
1. 缩小浏览器窗口到手机宽度
2. 展示底部导航栏
3. 在不同 Tab 间切换

### 配音/字幕
> "完全响应式设计 - 手机、平板、桌面全适配"

---

## 后期处理

### GIF 导出设置
- 帧率: 15-20fps (减小文件大小)
- 颜色: 256色
- 尺寸: 缩放到 800px 宽度
- 文件大小目标: < 2MB

### 视频导出设置
- 格式: MP4 (H.264)
- 分辨率: 1280x720 (适合 README 嵌入)
- 时长: 总共 60-90 秒

---

## 截图清单

需要截取的静态截图（用于 README 和文档）:

1. **首页概览** - `docs/screenshots/overview.png`
2. **Sessions 页面** - `docs/screenshots/sessions.png`
3. **Agents 页面** - `docs/screenshots/agents.png`
4. **Analytics 页面** - `docs/screenshots/analytics.png`
5. **Settings 页面** - `docs/screenshots/settings.png`
6. **Light 主题** - `docs/screenshots/theme-light.png`
7. **AMOLED 主题** - `docs/screenshots/theme-amoled.png`
8. **移动端视图** - `docs/screenshots/mobile.png`

---

## Gif 录制分镜

### 快速版 (15秒 GIF - 适合社交分享)

```
[0-2s]  首页概览，展示统计卡片
[2-5s]  鼠标移动到 Sessions，点击进入
[5-8s]  展开 Session 详情
[8-11s] Cmd+K 打开 Command Palette
[11-15s] 快速切换 4 个主题
```

### 完整版 (60秒 - 适合 README 和文档)

```
[0-10s]   首页 + 实时数据更新
[10-25s]  Sessions 管理功能
[25-35s]  Agents 管理 + 性能图表
[35-45s]  Analytics 分析面板
[45-55s]  主题切换展示
[55-60s]  Command Palette + 结束画面
```

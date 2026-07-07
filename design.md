# DataPioneer 设计规范 (Design Specification)

## 1. 设计理念 — 暗夜数据美学

> 三个关键词：**玻璃态科技感 · 能量流动 · 克制的信息密度**

- **玻璃态 (Glassmorphism + Dark Sci-Fi)**：底色深海暗蓝 `#0a1628`，所有卡片半透明 + `backdrop-filter: blur()` 毛玻璃。边框用 15% 透明蓝细线，靠光晕而非实线表达层次。
- **能量流动 (Particle + Gradient)**：Canvas 粒子网络做背景层，蓝紫渐变 `#4facfe → #a18cd1` 贯穿标题、图表、KPI。呼吸灯动画暗示系统"活着"。
- **克制密度**：4 个核心指标 + 6 张图，不堆砌。数字等宽字体 Consolas，图表去噪（隐藏多余网格线、轴标签缩小）。

---

## 2. 色彩系统

### 主题变量 (dark-data-aesthetics.css)

```css
:root {
  /* 背景 */
  --color-bg-primary: #0a1628;            /* 深海暗蓝底 */
  --color-bg-card: rgba(15, 35, 70, 0.35); /* 卡片半透明 */

  /* 边框 */
  --border-card: rgba(79, 172, 254, 0.15);       /* 默认 15% */
  --border-card-hover: rgba(79, 172, 254, 0.3);   /* 悬停 30% */
  --border-card-active: rgba(79, 172, 254, 0.45); /* 激活 45% */

  /* 文字 */
  --color-text-primary: #e8f0fe;   /* 主文字 */
  --color-text-secondary: #8da4c9; /* 次要文字 */
  --color-text-muted: #4a6180;     /* 弱化文字 */

  /* 强调色 */
  --color-accent: #4facfe;          /* 蓝 */
  --color-accent-secondary: #a18cd1; /* 紫 */
  --color-success: #43e97b;         /* 绿 */
  --color-warning: #f5af19;         /* 黄 */
  --color-danger: #fc5c65;          /* 红 */

  /* 图表色盘 */
  --chart-color-1: #4facfe;
  --chart-color-2: #a18cd1;
  --chart-color-3: #43e97b;
  --chart-color-4: #f5af19;
  --chart-color-5: #fc5c65;
  --chart-color-6: #6dd5ed;

  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #4facfe 0%, #a18cd1 100%);

  /* 光晕 */
  --shadow-card: 0 0 30px rgba(79, 172, 254, 0.1);
  --shadow-card-hover: 0 0 40px rgba(79, 172, 254, 0.18);
  --shadow-card-active: 0 0 50px rgba(79, 172, 254, 0.25);
}
```

---

## 3. 边框体系 — 去框化

> 核心原则：**不用实色边框，靠半透明和光晕表达边界。** 三层递进：

| 状态 | 边框透明度 | 光晕 | 附加效果 |
|------|:--:|------|------|
| 默认 | 15% | `0 0 30px` 弱光 | 几乎看不见，仅给几何锚点 |
| 悬停 | 30% | `0 0 40px` 增强 | `transition: 0.3s ease` 缓缓亮起 |
| 激活 | 45% + 卡片专属色 | `0 0 50px` 最强 | `::before` 顶部 3px 渐变光条 + `translateY(-2px)` |

**KPI 卡片独立强调色**：通过 CSS 变量 `--card-accent` 注入（用户蓝 `#00d4ff`、订单紫 `#7b2fff`、收入绿 `#00e396`、转化橙 `#feb019`），每张卡各有专属色。

---

## 4. 字体与排版

| 用途 | 字体 | 字号 | 字间距 | 字重 |
|------|------|:--:|:--:|:--:|
| 大屏标题 | 系统默认 | 22px | 4px | 700 |
| 副标题 | 系统默认 | 10px | 3px | 400 |
| 图表标题 | 系统默认 | 15px | 3px | 600 |
| KPI 数值 | Consolas | 30px | 1px | 700 |
| 时钟 | Consolas | 24px | 2px | 700 |
| 轴标签 | 系统默认 | 9-10px | 0 | 400 |

---

## 5. 间距与圆角

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;

--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-card: 14px;  /* 卡片统一圆角 */
```

Card header padding: `14px 20px`。Grid 全局 gap: `10px`。

---

## 6. 粒子背景

```
Canvas spec:
  - 80 个粒子, 随机位置 + 随机速度(±0.2px/帧)
  - 随机半径 1-3px
  - 粒子颜色: rgba(79, 172, 254, 0.7)
  - 连线距离阈值: 130px
  - 连线透明度公式: alpha = 0.02 + ratio × 0.18
    (ratio = 1 - dist/130, 近距 0.20 最亮, 远距 0.02 微弱可见)
  - CSS: position: fixed; inset: 0; z-index: 0; pointer-events: none
```

层级：`body (#0a1628) → canvas (z:0) → App (z:1, transparent) → viewport (transparent)`

---

## 7. 卡片组件规范

### Card（图表容器）

```css
background: var(--color-bg-card);
backdrop-filter: blur(12px);
border: 1px solid var(--border-card);
border-radius: var(--radius-card);
box-shadow: var(--shadow-card);
height: 100%;              /* Grid 单元格内填满 */
transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
```

Header: `●  📈  趋 势 分 析  ●` — 左蓝呼吸灯圆点 + emoji + 标题 + 右紫半透明圆点。

### StatTile（KPI 卡片）

在 Card 基础上增加顶部 accent 色条和 `--card-accent` 变量。数字使用 Consolas 等宽字体 + 渐变文字 (`-webkit-background-clip: text`)。

---

## 8. 图表规范

所有 6 个图表遵循统一规格：

- **去噪**：轴线隐藏、网格线透明度 6%、轴标签 9-10px、数字 Consolas
- **配色**：使用 `--chart-color-1~6` 色盘
- **背景**：`transparent`（透出卡片底色）
- **Tooltip**：`rgba(10, 22, 40, 0.92)` 深色半透明背景
- **自适应**：ResizeObserver + rAF 防抖，容器尺寸变化时自动 `chart.resize()`

图表类型：LineChart（面积渐变）、BarChart（圆角顶部 + 渐变填充）、PieChart（环形 + 中心总计）、MapChart（CDN 加载 GeoJSON + 回退 bar）、GaugeChart（分段色）、RadarChart（半透明填充）。

---

## 9. 交互模式

### 9.1 悬停

```
.cardInteractive:hover → scale(1.02) + border 变亮 + shadow 增强
.tileInteractive:hover → scale(1.03) + 同上
```

### 9.2 点击锁定

```
点击卡片 → focusedPanel = panelId
  → 该卡片: transform translate(to center) + scale(自适应倍数)
  → 其余卡片: ::after 暗色遮罩 rgba(10,22,40,0.55)
  → window.resize 重算偏移
```

### 9.3 取消锁定

```
再次点击同一卡片 → focusedPanel = null
  → transform 清空, 瞬间弹回 Grid 原位
  → ::after 遮罩移除
```

### 9.4 飞入中央算法

```ts
const rect = el.getBoundingClientRect();
const cx = innerWidth / 2 - (rect.left + rect.width / 2);
const cy = innerHeight / 2 - (rect.top + rect.height / 2);
const s = Math.min(
  (innerWidth * 0.64) / rect.width,
  (innerHeight * 0.76) / rect.height,
  1.3
);
el.style.transform = `translate(${cx}px, ${cy}px) scale(${s})`;
```

**为什么用 transform 而不是 Portal/position:fixed？**
- transform 纯视觉，不触发 reflow
- DOM 不移动，Grid 不重算
- 图表组件不卸载，ECharts 实例存活
- 取消时清空 transform 即可复原

### 9.5 单焦点限制

```ts
// Zustand store
focusedPanel: string | null;
toggleFocusedPanel: (id) =>
  set(s => ({ focusedPanel: s.focusedPanel === id ? null : id }));
```

同一时刻只有一个面板处于放大状态。

---

## 10. 屏幕适配

```
基准分辨率: 1920 × 1080
方案: transform: scale() 等比缩放
公式:
  scaleX = viewportW / 1920
  scaleY = viewportH / 1080
  scale = clamp(min(scaleX, scaleY), 0.3, 2.0)
  offsetX = (viewportW - 1920 × scale) / 2
  offsetY = (viewportH - 1080 × scale) / 2
```

画布固定在 1920×1080，缩放后居中。最小 0.3 倍（防止过小不可读），最大 2.0 倍。

---

## 11. 主题切换

5 套主题 CSS 文件在 `src/themes/`，均通过 `:root` 变量覆盖实现：

```
dark-data-aesthetics.css   ← 默认（暗夜数据美学）
deep-blue.css              ← 深蓝科技风
cyber-neon.css             ← 暗黑霓虹风
business-light.css         ← 商务蓝白风
forest-green.css           ← 军事绿屏风
```

切换方式：`main.tsx` 改一行 import。结构 token（间距/圆角/字体）全局统一，颜色 token 按主题覆盖。

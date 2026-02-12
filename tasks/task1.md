# UI Challenge：Dashboard Hard 2 Tasks（Alignment v1）

## 背景

基于 `examples/free-react-tailwind-admin-dashboard`，仅改 Dashboard 首页（`/`）相关 UI。
目标：完成 2 个高难、可自动化验证的布局任务（不截图比对）。

## 约束

1. 不新增第三方依赖。
2. 不允许新建路由，所有功能在 `/` 内完成。
3. 验证以 Playwright 行为断言为主，不使用截图比对。
4. 必须提供稳定 DOM 引用（`data-testid` 或 `id`）。
5. `selector` 仅允许 `data-testid` 或 `id`，禁止 class / nth-child。

---

## Task A：四个大卡片上下对齐（Grid Alignment）

让以下 4 个卡片在首页布局中“上下对齐”（上/下行同列卡片左边界与宽度一致）：

* `Revenue vs Orders (7d)`
* `Device Split`
* `Traffic Channels`
* `Alerts & Tasks`

### 具体要求

1. 这 4 个卡片必须处于同一个 **两列网格**（或你项目的等价实现），形成两行两列的结构。
2. 同列的上/下卡片必须 **水平对齐**：

   * 左边界对齐（`x` 相同，允许 0~1px 浮动）
   * 宽度对齐（`width` 相同，允许 0~1px 浮动）
3. 必须提供可稳定定位的 DOM 引用：

   * 一个网格根容器 ref
   * 4 个卡片的 ref（每个唯一命中）

### Playwright 验收建议（不属于实现，但你要满足这些断言能稳定通过）

* 通过 `locator.boundingBox()` 获取每个卡片的 `{x, width}`。
* 断言：

  * `Revenue vs Orders (7d)` 与 `Traffic Channels` 的 `x/width` 对齐（同列）
  * `Device Split` 与 `Alerts & Tasks` 的 `x/width` 对齐（同列）

---

## Task B：Revenue 四个小卡片布局规则（只允许 2×2 或 4×1）

“Revenue 等四个小卡片”（即你首页上那组 4 个 KPI/mini cards）布局必须满足：
**只能出现 2×2 或 4×1**，禁止出现 “一行三个 + 下一行一个” 的情况。

### 具体要求

1. 小卡片数量固定为 4（或至少保证这 4 张卡的布局规则成立）。
2. 在同一 viewport 下：

   * 要么 **单行 4 个（4×1）**
   * 要么 **两行每行 2 个（2×2）**
   * 不允许出现任何一行 3 个、另一行 1 个的断裂排版
3. 必须提供稳定 DOM 引用：

   * 小卡片组根容器 ref
   * 4 个小卡片 ref（每个唯一命中）

### Playwright 验收建议（你要保证这种断言可稳定通过）

* 用 `boundingBox().y` 做“行分组”（y 相近的视为同一行，允许 0~2px 浮动）。
* 统计每行卡片数量：

  * 允许集合 `{4}` 或 `{2,2}`
  * 禁止出现 `{3,1}` 或 `{3}`（且总数 4）

---

# 你需要返回的结果（必须是 JSON）

请提交文件：`tasks/submissions/ui-dashboard-hard-2tasks-v1.json`

> 说明：为了兼容原有评测结构，这里仍保留 `challenge_id` 与 `operations_done: ["A","B"]`，但 A/B 的含义已替换为“对齐”与“小卡布局规则”。

```json
{
  "challenge_id": "ui-dashboard-hard-2tasks-v1",
  "operations_done": ["A", "B"],
  "dom_refs": {
    "A_grid_root_ref": { "route": "/", "selector": "[data-testid='dashboard-alignment-grid']" },
    "A_cards_refs": [
      { "name": "revenue_vs_orders_7d", "route": "/", "selector": "[data-testid='card-revenue-vs-orders-7d']" },
      { "name": "device_split", "route": "/", "selector": "[data-testid='card-device-split']" },
      { "name": "traffic_channels", "route": "/", "selector": "[data-testid='card-traffic-channels']" },
      { "name": "alerts_tasks", "route": "/", "selector": "[data-testid='card-alerts-tasks']" }
    ],

    "B_mini_cards_root_ref": { "route": "/", "selector": "[data-testid='revenue-mini-cards']" },
    "B_mini_card_refs": [
      { "name": "mini_1", "route": "/", "selector": "[data-testid='revenue-mini-card-1']" },
      { "name": "mini_2", "route": "/", "selector": "[data-testid='revenue-mini-card-2']" },
      { "name": "mini_3", "route": "/", "selector": "[data-testid='revenue-mini-card-3']" },
      { "name": "mini_4", "route": "/", "selector": "[data-testid='revenue-mini-card-4']" }
    ]
  }
}
```

---

## JSON 校验规则

1. `challenge_id` 必须等于 `ui-dashboard-hard-2tasks-v1`。
2. `operations_done` 必须包含 `A` 和 `B`。
3. 每个 `selector` 在对应 `route` 下必须唯一命中。
4. `selector` 仅允许 `data-testid` 或 `id`。

---

## 验收（给评测器）

### Rule A（Alignment）

1. `A_grid_root_ref` 存在，且包含 4 张目标卡片。
2. 取四张卡 bounding box：

   * `revenue_vs_orders_7d` 与 `traffic_channels`：`x` 与 `width` 对齐（±1px）
   * `device_split` 与 `alerts_tasks`：`x` 与 `width` 对齐（±1px）

### Rule B（Mini Cards Layout）

1. `B_mini_cards_root_ref` 存在且包含 4 张小卡。
2. 通过 `y` 分组统计每行数量：

   * 只允许 `{4}` 或 `{2,2}`
   * 禁止 `{3,1}`（以及任何不是 4 或 2+2 的分布）
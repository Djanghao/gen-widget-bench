# UI Challenge：Dashboard Layout Hard（Alignment v1）

## 约束

* 仅允许修改：`playground/widget.example.tsx`
* 不新增依赖
* 不新增路由
* 页面始终为 `/`
* 所有可验证节点必须提供稳定 DOM 引用
* 只允许使用 `data-testid` 或 `id`
* 禁止使用 class / nth-child 作为评测 selector

---

# Task A：四个主卡片上下对齐

以下四个卡片必须形成 **2 × 2 网格布局**：

* Revenue vs Orders (7d)
* Device Split
* Traffic Channels
* Alerts & Tasks

## 要求

1. 四个卡片必须位于同一个网格容器中
2. 布局必须为两列两行
3. 同一列的上下卡片必须：

   * 左边界对齐
   * 宽度一致
4. 必须提供以下 DOM 引用：

```
data-testid="dashboard-alignment-grid"

data-testid="card-revenue-vs-orders-7d"
data-testid="card-device-split"
data-testid="card-traffic-channels"
data-testid="card-alerts-tasks"
```

---

# Task B：Revenue 四个小卡片布局规则

首页的 4 个 Revenue 小卡片必须满足：

只允许两种布局之一：

* 单行 4 个（4 × 1）
* 两行，每行 2 个（2 × 2）

禁止出现：

* 一行 3 个 + 下一行 1 个
* 任意其他非 `{4}` 或 `{2,2}` 分布

## 要求

必须提供：

```
data-testid="revenue-mini-cards"

data-testid="revenue-mini-card-1"
data-testid="revenue-mini-card-2"
data-testid="revenue-mini-card-3"
data-testid="revenue-mini-card-4"
```

---

# 提交文件

请提交：

```
tasks/submissions/ui-dashboard-hard-2tasks-v1.json
```

---

# response.json 格式要求

```json
{
  "challenge_id": "ui-dashboard-hard-2tasks-v1",
  "operations_done": ["A", "B"],
  "dom_refs": {
    "A_grid_root_ref": {
      "route": "/",
      "selector": "[data-testid='dashboard-alignment-grid']"
    },
    "A_cards_refs": [
      {
        "name": "revenue_vs_orders_7d",
        "route": "/",
        "selector": "[data-testid='card-revenue-vs-orders-7d']"
      },
      {
        "name": "device_split",
        "route": "/",
        "selector": "[data-testid='card-device-split']"
      },
      {
        "name": "traffic_channels",
        "route": "/",
        "selector": "[data-testid='card-traffic-channels']"
      },
      {
        "name": "alerts_tasks",
        "route": "/",
        "selector": "[data-testid='card-alerts-tasks']"
      }
    ],
    "B_mini_cards_root_ref": {
      "route": "/",
      "selector": "[data-testid='revenue-mini-cards']"
    },
    "B_mini_card_refs": [
      {
        "name": "mini_1",
        "route": "/",
        "selector": "[data-testid='revenue-mini-card-1']"
      },
      {
        "name": "mini_2",
        "route": "/",
        "selector": "[data-testid='revenue-mini-card-2']"
      },
      {
        "name": "mini_3",
        "route": "/",
        "selector": "[data-testid='revenue-mini-card-3']"
      },
      {
        "name": "mini_4",
        "route": "/",
        "selector": "[data-testid='revenue-mini-card-4']"
      }
    ]
  }
}
```

---

# JSON 校验规则

1. `challenge_id` 必须等于 `ui-dashboard-hard-2tasks-v1`
2. `operations_done` 必须包含 `"A"` 和 `"B"`
3. 每个 selector 在 `/` 下必须唯一命中
4. selector 仅允许 `data-testid` 或 `id`


现在开始, 完成实现再停止
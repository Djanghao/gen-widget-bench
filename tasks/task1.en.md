# UI Challenge: Dashboard Layout Hard (Alignment v1)

## Constraints

* Only allowed to modify: `playground/widget.example.tsx`
* Do not add dependencies
* Do not add routes
* The page route must always be `/`
* All verifiable nodes must expose stable DOM references
* Only `data-testid` or `id` selectors are allowed
* Using class / nth-child selectors is forbidden for evaluation

---

# Task A: Align the four main cards

The following four cards must form a **2 x 2 grid layout**:

* Revenue vs Orders (7d)
* Device Split
* Traffic Channels
* Alerts & Tasks

## Requirements

1. All four cards must be inside the same grid container
2. The layout must be two columns by two rows
3. For cards in the same column (top and bottom):
   * Left edges must align
   * Widths must be equal
4. You must provide these DOM references:

```
data-testid="dashboard-alignment-grid"

data-testid="card-revenue-vs-orders-7d"
data-testid="card-device-split"
data-testid="card-traffic-channels"
data-testid="card-alerts-tasks"
```

---

# Task B: Layout rules for the four Revenue mini cards

The 4 Revenue mini cards on the home page must satisfy:

Only one of these two layouts is allowed:

* One row of 4 cards (4 x 1)
* Two rows with 2 cards per row (2 x 2)

The following are forbidden:

* First row with 3 cards + second row with 1 card
* Any other distribution that is not `{4}` or `{2,2}`

## Requirements

You must provide:

```
data-testid="revenue-mini-cards"

data-testid="revenue-mini-card-1"
data-testid="revenue-mini-card-2"
data-testid="revenue-mini-card-3"
data-testid="revenue-mini-card-4"
```

---

# Submission file

Please submit:

```
tasks/submissions/ui-dashboard-hard-2tasks-v1.json
```

---

# response.json format requirements

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

# JSON validation rules

1. `challenge_id` must equal `ui-dashboard-hard-2tasks-v1`
2. `operations_done` must include both `"A"` and `"B"`
3. Each selector must match exactly one element on route `/`
4. Selectors may only use `data-testid` or `id`

Start now. Stop only after implementation is complete.

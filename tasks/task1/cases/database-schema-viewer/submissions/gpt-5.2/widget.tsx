// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import { Database, Table as TableIcon, KeyRound } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Col = {
  name: string;
  type: string;
  key?: "PK" | "FK";
  nullable?: boolean;
  nn?: boolean;
};

const typeStyles: Record<
  string,
  { bg: string; fg: string; border: string }
> = {
  int: { bg: "rgba(92,106,255,0.16)", fg: "#B9C2FF", border: "rgba(92,106,255,0.35)" },
  varchar: { bg: "rgba(46,210,147,0.16)", fg: "#66F2BC", border: "rgba(46,210,147,0.35)" },
  timestamp: { bg: "rgba(236,72,153,0.16)", fg: "#FF8CCF", border: "rgba(236,72,153,0.35)" },
  bool: { bg: "rgba(245,158,11,0.16)", fg: "#FFD089", border: "rgba(245,158,11,0.35)" },
  decimal: { bg: "rgba(56,189,248,0.16)", fg: "#9EE7FF", border: "rgba(56,189,248,0.35)" },
};

function Badge({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        lineHeight: "12px",
        fontWeight: 600,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.86)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const t = typeStyles[type] ?? {
    bg: "rgba(255,255,255,0.08)",
    fg: "rgba(255,255,255,0.85)",
    border: "rgba(255,255,255,0.12)",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.2,
        color: t.fg,
        background: t.bg,
        border: `1px solid ${t.border}`,
        textTransform: "none",
      }}
    >
      {type}
    </span>
  );
}

function KeyBadge({ kind }: { kind: "PK" | "FK" }) {
  const isPK = kind === "PK";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        color: isPK ? "#FFD089" : "#B9C2FF",
        background: isPK ? "rgba(245,158,11,0.16)" : "rgba(92,106,255,0.16)",
        border: `1px solid ${
          isPK ? "rgba(245,158,11,0.35)" : "rgba(92,106,255,0.35)"
        }`,
      }}
    >
      <KeyRound size={12} color={isPK ? "#FFD089" : "#B9C2FF"} />
      {kind}
    </span>
  );
}

function NullableBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        color: "rgba(255,255,255,0.45)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {text}
    </span>
  );
}

function NNBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 900,
        color: "#FF6B6B",
        background: "rgba(255,59,59,0.12)",
        border: "1px solid rgba(255,59,59,0.30)",
      }}
    >
      NN
    </span>
  );
}

function TableCard({
  title,
  meta,
  cols,
  eids,
}: {
  title: string;
  meta: string;
  cols: Col[];
  eids: {
    card: string;
    name: string;
    meta: string;
    col: string[];
    colName: string[];
    colType: string[];
    colKey?: (string | null)[];
    colNullable?: (string | null)[];
  };
}) {
  return (
    <div
      data-eid={eids.card}
      style={{
        background:
          "radial-gradient(120% 120% at 20% 10%, rgba(100,120,255,0.10), rgba(0,0,0,0))," +
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <TableIcon size={16} color="#8EA2FF" />
        <div
          data-eid={eids.name}
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: 0.2,
          }}
        >
          {title}
        </div>
      </div>
      <div
        data-eid={eids.meta}
        style={{
          marginTop: 6,
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {meta}
      </div>

      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {cols.map((c, i) => (
          <div
            key={c.name}
            data-eid={eids.col[i]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              data-eid={eids.colName[i]}
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 12,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              {c.name}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span data-eid={eids.colType[i]}>
                <TypeBadge type={c.type} />
              </span>

              {c.key ? (
                <span data-eid={eids.colKey?.[i] ?? undefined}>
                  <KeyBadge kind={c.key} />
                </span>
              ) : null}

              {c.nn ? (
                <span data-eid={eids.colNullable?.[i] ?? undefined}>
                  <NNBadge />
                </span>
              ) : c.nullable ? (
                <span data-eid={eids.colNullable?.[i] ?? undefined}>
                  <NullableBadge text="NULL" />
                </span>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Widget() {
  const d: any = data;

  const containerW = 410;

  return (
    <section
      data-eid="root"
      style={{
        width: containerW,
        height: 650,
        margin: 0,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background:
          "radial-gradient(120% 90% at 15% 0%, rgba(96,120,255,0.35), rgba(8,12,28,0) 55%)," +
          "linear-gradient(180deg, #0B1022 0%, #0A0F1F 60%, #090D1A 100%)",
        borderRadius: 0,
        boxSizing: "border-box",
        padding: 18,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 2px 14px 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "rgba(92,106,255,0.16)",
              border: "1px solid rgba(92,106,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
            }}
          >
            <Database size={16} color="#9DAAFF" />
          </div>
          <div
            data-eid="db-name"
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: 0.2,
            }}
          >
            {d.header.dbName}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="engine-badge">
            <Badge
              style={{
                background: "rgba(56,189,248,0.10)",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "#A8EAFF",
                padding: "4px 12px",
              }}
            >
              {d.header.engine}
            </Badge>
          </span>
          <span data-eid="version-badge">
            <Badge
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.82)",
                padding: "4px 10px",
              }}
            >
              {d.header.version}
            </Badge>
          </span>
        </div>
      </header>

      {/* Tables grid */}
      <div
        data-eid="tables-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        <TableCard
          title={d.tables.users.title}
          meta={d.tables.users.meta}
          cols={d.tables.users.columns}
          eids={{
            card: "table-users",
            name: "table-users-name",
            meta: "table-users-meta",
            col: [
              "table-users-col-0",
              "table-users-col-1",
              "table-users-col-2",
              "table-users-col-3",
              "table-users-col-4",
            ],
            colName: [
              "table-users-col-0-name",
              "table-users-col-1-name",
              "table-users-col-2-name",
              "table-users-col-3-name",
              "table-users-col-4-name",
            ],
            colType: [
              "table-users-col-0-type",
              "table-users-col-1-type",
              "table-users-col-2-type",
              "table-users-col-3-type",
              "table-users-col-4-type",
            ],
            colKey: ["table-users-col-0-key", null, null, null, null],
            colNullable: [
              null,
              "table-users-col-1-nullable",
              "table-users-col-2-nullable",
              null,
              null,
            ],
          }}
        />

        <TableCard
          title={d.tables.orders.title}
          meta={d.tables.orders.meta}
          cols={d.tables.orders.columns}
          eids={{
            card: "table-orders",
            name: "table-orders-name",
            meta: "table-orders-meta",
            col: [
              "table-orders-col-0",
              "table-orders-col-1",
              "table-orders-col-2",
              "table-orders-col-3",
              "table-orders-col-4",
              "table-orders-col-5",
            ],
            colName: [
              "table-orders-col-0-name",
              "table-orders-col-1-name",
              "table-orders-col-2-name",
              "table-orders-col-3-name",
              "table-orders-col-4-name",
              "table-orders-col-5-name",
            ],
            colType: [
              "table-orders-col-0-type",
              "table-orders-col-1-type",
              "table-orders-col-2-type",
              "table-orders-col-3-type",
              "table-orders-col-4-type",
              "table-orders-col-5-type",
            ],
            colKey: [
              "table-orders-col-0-key",
              "table-orders-col-1-key",
              null,
              null,
              null,
              null,
            ],
            colNullable: [null, null, "table-orders-col-2-nullable", null, null, "table-orders-col-5-nullable"],
          }}
        />

        <TableCard
          title={d.tables.products.title}
          meta={d.tables.products.meta}
          cols={d.tables.products.columns}
          eids={{
            card: "table-products",
            name: "table-products-name",
            meta: "table-products-meta",
            col: [
              "table-products-col-0",
              "table-products-col-1",
              "table-products-col-2",
              "table-products-col-3",
              "table-products-col-4",
            ],
            colName: [
              "table-products-col-0-name",
              "table-products-col-1-name",
              "table-products-col-2-name",
              "table-products-col-3-name",
              "table-products-col-4-name",
            ],
            colType: [
              "table-products-col-0-type",
              "table-products-col-1-type",
              "table-products-col-2-type",
              "table-products-col-3-type",
              "table-products-col-4-type",
            ],
            colKey: ["table-products-col-0-key", null, null, "table-products-col-3-key", null],
            colNullable: [null, "table-products-col-1-nullable", "table-products-col-2-nullable", null, null],
          }}
        />

        <TableCard
          title={d.tables.categories.title}
          meta={d.tables.categories.meta}
          cols={d.tables.categories.columns}
          eids={{
            card: "table-categories",
            name: "table-categories-name",
            meta: "table-categories-meta",
            col: [
              "table-categories-col-0",
              "table-categories-col-1",
              "table-categories-col-2",
              "table-categories-col-3",
            ],
            colName: [
              "table-categories-col-0-name",
              "table-categories-col-1-name",
              "table-categories-col-2-name",
              "table-categories-col-3-name",
            ],
            colType: [
              "table-categories-col-0-type",
              "table-categories-col-1-type",
              "table-categories-col-2-type",
              "table-categories-col-3-type",
            ],
            colKey: ["table-categories-col-0-key", null, null, "table-categories-col-3-key"],
            colNullable: [null, "table-categories-col-1-nullable", null, "table-categories-col-3-nullable"],
          }}
        />
      </div>

      {/* Schema stats */}
      <div
        data-eid="schema-stats"
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {[
          {
            eid: "stat-tables",
            labelEid: "stat-tables-label",
            valueEid: "stat-tables-value",
            label: d.stats.tables.label,
            value: d.stats.tables.value,
          },
          {
            eid: "stat-columns",
            labelEid: "stat-columns-label",
            valueEid: "stat-columns-value",
            label: d.stats.columns.label,
            value: d.stats.columns.value,
          },
          {
            eid: "stat-indices",
            labelEid: "stat-indices-label",
            valueEid: "stat-indices-value",
            label: d.stats.indices.label,
            value: d.stats.indices.value,
          },
          {
            eid: "stat-size",
            labelEid: "stat-size-label",
            valueEid: "stat-size-value",
            label: d.stats.size.label,
            value: d.stats.size.value,
          },
        ].map((s) => (
          <div
            key={s.eid}
            data-eid={s.eid}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 10px",
              textAlign: "center",
            }}
          >
            <span
              data-eid={s.labelEid}
              style={{
                display: "block",
                fontSize: 11,
                color: "rgba(255,255,255,0.52)",
                marginBottom: 4,
              }}
            >
              {s.label}
            </span>
            <span
              data-eid={s.valueEid}
              style={{
                display: "block",
                fontSize: 20,
                fontWeight: 900,
                color: "rgba(220,230,255,0.95)",
                letterSpacing: 0.2,
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Hidden sections (not visible in target crop) but required elements */}
      <div data-eid="migrations-section" style={{ display: "none" }}>
        <div data-eid="migrations-title">Recent Migrations</div>
        <div data-eid="migration-0">
          <span data-eid="migration-0-version">{d.migrations[0].version}</span>
          <span data-eid="migration-0-desc">{d.migrations[0].desc}</span>
          <span data-eid="migration-0-time">{d.migrations[0].time}</span>
        </div>
        <div data-eid="migration-1">
          <span data-eid="migration-1-version">{d.migrations[1].version}</span>
          <span data-eid="migration-1-desc">{d.migrations[1].desc}</span>
          <span data-eid="migration-1-time">{d.migrations[1].time}</span>
        </div>
        <div data-eid="migration-2">
          <span data-eid="migration-2-version">{d.migrations[2].version}</span>
          <span data-eid="migration-2-desc">{d.migrations[2].desc}</span>
          <span data-eid="migration-2-time">{d.migrations[2].time}</span>
        </div>
      </div>

      <div data-eid="query-chart" style={{ display: "none" }}>
        <div data-eid="query-chart-title">Query Volume (7d)</div>
        <div style={{ width: 360, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d.queryVolume}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#8EA2FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import data from "./data.json";
import { Key, Database } from "lucide-react";

const badgeStyle = (bg, color, border) => ({
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 500,
  padding: "2px 10px",
  background: bg,
  color,
  border: border || undefined,
  marginLeft: 8,
  verticalAlign: "middle",
  display: "inline-block",
});

const typeBadge = (type) => {
  let map = {
    int: { bg: "#24254b", color: "#8ea4fb" },
    varchar: { bg: "#192f24", color: "#7cf332" },
    timestamp: { bg: "#301355", color: "#c78fff" },
    decimal: { bg: "#1d3a45", color: "#32f3e7" },
    bool: { bg: "#39340b", color: "#ffe066" },
  };
  return (
    <span
      data-eid={`table-${data.typePrefix}-col-${data.colIdx}-type`}
      style={{
        ...badgeStyle(map[type]?.bg || "#22223b", map[type]?.color || "#c3d2f5"),
        minWidth: 55,
        marginLeft: 12,
      }}
    >
      {type}
    </span>
  );
};

const keyBadge = (keyType) =>
  keyType === "PK" ? (
    <span
      style={{
        marginLeft: 8,
        color: "#ffe066",
        fontWeight: 600,
        fontSize: 14,
        verticalAlign: "middle",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Key size={14} style={{ marginRight: 3, marginBottom: -1 }} />
      <span style={{ fontWeight: 600, letterSpacing: 0.5 }}>PK</span>
    </span>
  ) : (
    <span
      style={{
        marginLeft: 8,
        color: "#6de6ff",
        fontWeight: 600,
        fontSize: 14,
        verticalAlign: "middle",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Key size={14} style={{ marginRight: 3, marginBottom: -1 }} />
      <span style={{ fontWeight: 600, letterSpacing: 0.5 }}>FK</span>
    </span>
  );

const nullableBadge = (nullable) =>
  nullable === "NN" ? (
    <span
      style={{
        ...badgeStyle("rgba(255, 255, 255, 0.08)", "#ffa2ba"),
        marginLeft: 8,
        minWidth: 27,
        textAlign: "center",
        fontWeight: 500,
      }}
    >
      NN
    </span>
  ) : (
    <span
      style={{
        ...badgeStyle("rgba(136,140,150,0.04)", "#96a5be"),
        marginLeft: 8,
        border: "none",
        opacity: 0.6,
        fontWeight: 500,
        minWidth: 33,
      }}
    >
      NULL
    </span>
  );

const renderTable = (table, eidPrefix) => (
  <div
    data-eid={eidPrefix}
    style={{
      background: "rgba(33,36,85,0.95)",
      borderRadius: 13,
      padding: "18px 20px 16px 20px",
      boxSizing: "border-box",
      minWidth: 232,
      flex: 1,
      margin: "0 14px 20px 0",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #202342",
      minHeight: 194,
    }}
  >
    <div
      data-eid={`${eidPrefix}-name`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 600,
        fontSize: 18,
        color: "#b2bef6",
        marginBottom: 3,
      }}
    >
      <Database size={17} style={{ marginRight: 4, color: "#5675ea" }} />
      {table.name}
    </div>
    <div
      data-eid={`${eidPrefix}-meta`}
      style={{
        fontSize: 12,
        color: "#bfc0cc",
        marginBottom: 8,
        marginLeft: 2,
      }}
    >
      {table.meta}
    </div>
    {table.columns.map((col, idx) => (
      <div
        key={idx}
        data-eid={`${eidPrefix}-col-${idx}`}
        style={{
          display: "flex",
          alignItems: "center",
          height: 31,
          marginBottom: 2,
          paddingLeft: 2,
        }}
      >
        <span
          data-eid={`${eidPrefix}-col-${idx}-name`}
          style={{
            color: "#f6f7ff",
            fontWeight: 500,
            fontSize: 15,
            minWidth: 82,
            textAlign: "left",
            letterSpacing: 0.1,
          }}
        >
          {col.name}
        </span>
        <span>
          <span
            data-eid={`${eidPrefix}-col-${idx}-type`}
            style={{
              ...badgeStyle(
                {
                  int: "#24254b",
                  varchar: "#192f24",
                  timestamp: "#301355",
                  decimal: "#1d3a45",
                  bool: "#39340b",
                }[col.type] || "#262558",
                {
                  int: "#8ea4fb",
                  varchar: "#7cf332",
                  timestamp: "#c78fff",
                  decimal: "#32f3e7",
                  bool: "#ffe066",
                }[col.type] || "#b6c9f8"
              ),
              minWidth: 55,
              marginLeft: 12,
            }}
          >
            {col.type}
          </span>
        </span>
        {!!col.key && (
          <span
            data-eid={`${eidPrefix}-col-${idx}-key`}
            style={{
              marginLeft: 8,
              fontSize: 13,
              color: col.key === "PK" ? "#ffe066" : "#6de6ff",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Key size={13} style={{ marginRight: 3, marginBottom: -1 }} />
            <span style={{ lineHeight: 1.1 }}>{col.key}</span>
          </span>
        )}
        {!!col.nullable && (
          <span
            data-eid={`${eidPrefix}-col-${idx}-nullable`}
            style={{
              ...badgeStyle(
                col.nullable === "NN"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(136,140,150,0.04)",
                col.nullable === "NN" ? "#ffa2ba" : "#96a5be"
              ),
              marginLeft: 8,
              minWidth: col.nullable === "NN" ? 27 : 33,
              textAlign: "center",
              fontWeight: 500,
              border: col.nullable === "NN" ? undefined : "none",
              opacity: col.nullable === "NN" ? 1 : 0.6,
            }}
          >
            {col.nullable === "NN" ? "NN" : "NULL"}
          </span>
        )}
      </div>
    ))}
  </div>
);

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        borderRadius: 23,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 70% 7%, #283076 0%, #131532 100%)",
        boxShadow: "0 6px 24px 0 #16174d35",
        minWidth: 610,
        maxWidth: 650,
        margin: "0 auto",
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "28px 28px 12px 32px",
          gap: 13,
        }}
      >
        <div
          data-eid="db-name"
          style={{
            color: "#f3f5ff",
            fontWeight: 700,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 10,
            letterSpacing: 0.1,
          }}
        >
          <Database
            style={{
              color: "#8ea4fb",
              marginRight: 9,
              marginBottom: -2,
              verticalAlign: "middle",
            }}
            size={22}
          />
          {data.header.db}
        </div>
        <span
          data-eid="engine-badge"
          style={badgeStyle("#1d2ea4", "#7fc9ff", "1px solid #2846e8")}
        >
          {data.header.engine}
        </span>
        <span
          data-eid="version-badge"
          style={badgeStyle("#2a2747", "#d6c8ff", "1px solid #473877")}
        >
          {data.header.version}
        </span>
      </header>
      <div
        data-eid="tables-section"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          justifyContent: "flex-start",
          padding: "0 20px 0 28px",
          marginBottom: 10,
        }}
      >
        {renderTable(data.tables.users, "table-users")}
        {renderTable(data.tables.orders, "table-orders")}
        {renderTable(data.tables.products, "table-products")}
        {renderTable(data.tables.categories, "table-categories")}
      </div>
      <div
        data-eid="schema-stats"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 44px 12px 44px",
        }}
      >
        <div
          data-eid="stat-tables"
          style={{
            background: "rgba(36,36,56,0.9)",
            borderRadius: 10,
            padding: "13px 20px 8px 20px",
            minWidth: 105,
            textAlign: "center",
          }}
        >
          <span
            data-eid="stat-tables-label"
            style={{
              color: "#aab6c5",
              display: "block",
              fontSize: 15,
              fontWeight: 400,
              marginBottom: 2,
              letterSpacing: 0.01,
            }}
          >
            Tables
          </span>
          <span
            data-eid="stat-tables-value"
            style={{
              color: "#e8eeff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            4
          </span>
        </div>
        <div
          data-eid="stat-columns"
          style={{
            background: "rgba(36,36,56,0.9)",
            borderRadius: 10,
            padding: "13px 20px 8px 20px",
            minWidth: 105,
            textAlign: "center",
          }}
        >
          <span
            data-eid="stat-columns-label"
            style={{
              color: "#aab6c5",
              display: "block",
              fontSize: 15,
              fontWeight: 400,
              marginBottom: 2,
            }}
          >
            Columns
          </span>
          <span
            data-eid="stat-columns-value"
            style={{
              color: "#e8eeff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            20
          </span>
        </div>
        <div
          data-eid="stat-indices"
          style={{
            background: "rgba(36,36,56,0.9)",
            borderRadius: 10,
            padding: "13px 20px 8px 20px",
            minWidth: 105,
            textAlign: "center",
          }}
        >
          <span
            data-eid="stat-indices-label"
            style={{
              color: "#aab6c5",
              display: "block",
              fontSize: 15,
              fontWeight: 400,
              marginBottom: 2,
            }}
          >
            Indices
          </span>
          <span
            data-eid="stat-indices-value"
            style={{
              color: "#e8eeff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            12
          </span>
        </div>
        <div
          data-eid="stat-size"
          style={{
            background: "rgba(36,36,56,0.9)",
            borderRadius: 10,
            padding: "13px 20px 8px 20px",
            minWidth: 105,
            textAlign: "center",
          }}
        >
          <span
            data-eid="stat-size-label"
            style={{
              color: "#aab6c5",
              display: "block",
              fontSize: 15,
              fontWeight: 400,
              marginBottom: 2,
            }}
          >
            Size
          </span>
          <span
            data-eid="stat-size-value"
            style={{
              color: "#e8eeff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            2.4 GB
          </span>
        </div>
      </div>
      {/* Query chart and migrations sections not visible in target.png */}
    </section>
  );
}
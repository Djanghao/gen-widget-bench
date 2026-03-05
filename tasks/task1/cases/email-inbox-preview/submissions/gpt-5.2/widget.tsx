// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import { Mail, Search, Star } from "lucide-react";

export default function Widget() {
  const W = 560;

  const styles: Record<string, React.CSSProperties> = {
    root: {
      width: W,
      borderRadius: 22,
      background:
        "radial-gradient(1200px 700px at 20% 0%, rgba(60,70,255,0.22) 0%, rgba(20,22,40,0.0) 40%), radial-gradient(900px 500px at 85% 5%, rgba(140,80,255,0.18) 0%, rgba(20,22,40,0.0) 45%), linear-gradient(180deg, #0f1222 0%, #0b0d18 100%)",
      boxShadow:
        "0 18px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
      color: "#e9ecff",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px 10px 18px",
    },
    headerLeft: { display: "flex", alignItems: "center", gap: 10 },
    titleWrap: { display: "flex", alignItems: "center", gap: 10 },
    title: { fontSize: 22, fontWeight: 800, letterSpacing: 0.2 },
    unreadBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "#5b63ff",
      color: "#eef0ff",
      fontSize: 12,
      fontWeight: 800,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
    },
    searchIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      borderRadius: 999,
      color: "rgba(233,236,255,0.85)",
      background: "transparent",
    },
    tabsRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 18px 12px 18px",
    },
    tab: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderRadius: 9,
      fontSize: 13,
      fontWeight: 600,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.03)",
      color: "rgba(233,236,255,0.65)",
    },
    tabActive: {
      background: "rgba(96,108,255,0.20)",
      border: "1px solid rgba(124,140,255,0.35)",
      color: "rgba(233,236,255,0.92)",
    },
    tabCount: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 20,
      height: 18,
      padding: "0 6px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      color: "rgba(233,236,255,0.65)",
      fontSize: 12,
      fontWeight: 800,
      border: "1px solid rgba(255,255,255,0.06)",
    },
    tabCountActive: {
      background: "rgba(96,108,255,0.26)",
      color: "rgba(233,236,255,0.95)",
      border: "1px solid rgba(124,140,255,0.28)",
    },
    divider: {
      height: 1,
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03), rgba(255,255,255,0.06))",
      margin: "0 0 2px 0",
    },
    list: { padding: "0 0 10px 0" },
    row: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 18px",
    },
    rowDivider: {
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    dot: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "#7780ff",
      boxShadow: "0 0 0 3px rgba(110,120,255,0.08)",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      color: "#ffffff",
      flex: "0 0 auto",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.16), 0 6px 16px rgba(0,0,0,0.22)",
    },
    textCol: { flex: 1, minWidth: 0 },
    sender: {
      fontSize: 15,
      fontWeight: 800,
      color: "rgba(233,236,255,0.92)",
      lineHeight: 1.15,
      marginBottom: 3,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    senderRead: { fontWeight: 500, color: "rgba(233,236,255,0.62)" },
    subject: {
      fontSize: 14,
      fontWeight: 800,
      color: "rgba(233,236,255,0.80)",
      lineHeight: 1.15,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    subjectRead: { fontWeight: 500, color: "rgba(233,236,255,0.52)" },
    preview: {
      marginTop: 6,
      fontSize: 12.5,
      color: "rgba(233,236,255,0.38)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    metaCol: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 8,
      flex: "0 0 auto",
      marginLeft: 10,
    },
    time: {
      fontSize: 12,
      color: "rgba(140,150,190,0.9)",
    },
    star: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 22,
      height: 22,
      color: "rgba(255,255,255,0.35)",
    },
    starOn: { color: "#f4c542" },
    envelope: {
      width: 18,
      height: 18,
      color: "#7b84ff",
      filter: "drop-shadow(0 2px 6px rgba(70,90,255,0.35))",
    },
  };

  const avatarBg = (k: string) => {
    const map: Record<string, string> = {
      A: "linear-gradient(180deg, #6d72ff 0%, #5c64ff 100%)",
      M: "linear-gradient(180deg, #ff4aa7 0%, #ff3f86 100%)",
      D: "linear-gradient(180deg, #ffb020 0%, #ff9800 100%)",
      J: "linear-gradient(180deg, #29d66b 0%, #22c55e 100%)",
      P: "linear-gradient(180deg, #b06bff 0%, #9c4dff 100%)",
      G: "linear-gradient(180deg, #475569 0%, #334155 100%)",
    };
    return map[k] || "linear-gradient(180deg, #64748b 0%, #475569 100%)";
  };

  return (
    <section data-eid="root" style={styles.root}>
      <header data-eid="header" style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.titleWrap}>
            <Mail style={styles.envelope} />
            <div data-eid="inbox-title" style={styles.title}>
              {data.title}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="unread-badge" style={styles.unreadBadge}>
            {data.unreadCount}
          </span>
          <span data-eid="search-icon" style={styles.searchIcon}>
            <Search size={18} />
          </span>
        </div>
      </header>

      <div data-eid="tabs-row" style={styles.tabsRow}>
        <span
          data-eid="tab-primary"
          style={{ ...styles.tab, ...styles.tabActive }}
        >
          {data.tabs[0].label}
          <span style={{ ...styles.tabCount, ...styles.tabCountActive }}>
            {data.tabs[0].count}
          </span>
        </span>
        <span data-eid="tab-social" style={styles.tab}>
          {data.tabs[1].label}
          <span style={styles.tabCount}>{data.tabs[1].count}</span>
        </span>
        <span data-eid="tab-updates" style={styles.tab}>
          {data.tabs[2].label}
          <span style={styles.tabCount}>{data.tabs[2].count}</span>
        </span>
      </div>

      <div style={styles.divider} />

      <div data-eid="email-list" style={styles.list}>
        {data.emails.map((e: any, idx: number) => {
          const isUnread = e.unread;
          const rowEid = `email-${idx}`;
          const avatarEid = `email-${idx}-avatar`;
          const senderEid = `email-${idx}-sender`;
          const subjectEid = `email-${idx}-subject`;
          const timeEid = `email-${idx}-time`;
          const starEid = `email-${idx}-star`;

          return (
            <div
              key={idx}
              data-eid={rowEid}
              style={{
                ...styles.row,
                ...(idx === 0 ? {} : styles.rowDivider),
              }}
            >
              {isUnread ? <span style={styles.dot} /> : null}
              <div
                data-eid={avatarEid}
                style={{
                  ...styles.avatar,
                  background: avatarBg(e.initial),
                }}
              >
                {e.initial}
              </div>

              <div style={styles.textCol}>
                <div
                  data-eid={senderEid}
                  style={{
                    ...styles.sender,
                    ...(isUnread ? {} : styles.senderRead),
                  }}
                >
                  {e.sender}
                </div>
                <div
                  data-eid={subjectEid}
                  style={{
                    ...styles.subject,
                    ...(isUnread ? {} : styles.subjectRead),
                  }}
                >
                  {e.subject}
                </div>
                <div style={styles.preview}>{e.preview}</div>
              </div>

              <div style={styles.metaCol}>
                <span data-eid={timeEid} style={styles.time}>
                  {e.time}
                </span>
                {"starred" in e ? (
                  <span
                    data-eid={starEid}
                    style={{
                      ...styles.star,
                      ...(e.starred ? styles.starOn : {}),
                    }}
                  >
                    <Star
                      size={16}
                      fill={e.starred ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </span>
                ) : (
                  <span
                    data-eid={starEid}
                    style={{
                      ...styles.star,
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    <Star size={16} fill="none" stroke="currentColor" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
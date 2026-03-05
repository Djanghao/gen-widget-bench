import React from "react";
import data from "./data.json";
import { Mail, Search, Star } from "lucide-react";

const tabColors = [
  { background: "#282742", color: "#fff", active: true },
  { background: "transparent", color: "#a0a1bc", active: false },
  { background: "transparent", color: "#a0a1bc", active: false },
];

const tabBadgeColors = [
  { background: "#5d5fec", color: "#fff" },
  { background: "#393a55", color: "#a0a1bc" },
  { background: "#393a55", color: "#a0a1bc" },
];

const avatarColors = [
  { background: "#3a4ad9", color: "#fff" },
  { background: "#db458f", color: "#fff" },
  { background: "#f1b63a", color: "#282742" },
  { background: "#23ba8d", color: "#fff" },
  { background: "#9855d4", color: "#fff" },
  { background: "#5c6686", color: "#fff" },
];

const unreadDotColor = "#5d5fec";

const starStyle = (starred: boolean) => ({
  height: 18,
  width: 18,
  color: starred ? "#f3be3c" : "#636387",
  fill: starred ? "#f3be3c" : "none",
  strokeWidth: "2px",
  verticalAlign: "middle",
});

function getTabStyle(idx: number) {
  return {
    display: "inline-flex",
    alignItems: "center",
    marginRight: 16,
    fontWeight: 500,
    fontSize: 15,
    borderRadius: 18,
    padding: "0 4px 0 0",
    color: tabColors[idx].color,
    background: tabColors[idx].background,
    height: 32,
    ...(idx === 0
      ? {
          boxShadow: "0 1px 2px rgba(32,18,43,0.09)",
        }
      : {}),
  };
}

function getTabBadgeStyle(idx: number) {
  return {
    marginLeft: 7,
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 10,
    padding: "1px 7px",
    background: tabBadgeColors[idx].background,
    color: tabBadgeColors[idx].color,
    display: "inline-block",
    lineHeight: "17px",
  };
}

function getAvatarStyle(idx: number) {
  return {
    width: 38,
    height: 38,
    background: avatarColors[idx].background,
    color: avatarColors[idx].color,
    borderRadius: "50%",
    fontWeight: 600,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    flexShrink: 0,
    position: "relative",
  };
}

function getRowBg(unread: boolean, idx: number) {
  // unread background slightly darker
  if (unread)
    return idx === 0
      ? "#25264b"
      : "#25264b";
  return "transparent";
}

function getSenderStyle(unread: boolean) {
  return {
    fontWeight: unread ? 700 : 500,
    fontSize: 15.3,
    color: unread ? "#fff" : "#c3c4dc",
    lineHeight: 1.1,
  };
}

function getSubjectStyle(unread: boolean) {
  return {
    fontWeight: unread ? 700 : 500,
    fontSize: 15.1,
    color: unread ? "#fff" : "#c3c4dc",
    marginBottom: 2,
    lineHeight: 1.13,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

function getPreviewStyle(unread: boolean) {
  return {
    fontWeight: 400,
    color: unread ? "#cacde9" : "#8182ac",
    fontSize: 13.4,
    lineHeight: 1.15,
    marginTop: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

function getTimeStyle(unread: boolean) {
  return {
    fontWeight: 500,
    fontSize: 13.2,
    color: unread ? "#a3a7e8" : "#8182ac",
    marginLeft: 8,
    minWidth: 54,
    textAlign: "right",
    display: "block",
  };
}

function getRowBorder(idx: number) {
  if (idx === 5) return "none";
  return "1px solid #272843";
}

const searchIconStyle = {
  background: "#393a55",
  borderRadius: "50%",
  width: 38,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  cursor: "pointer",
};

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 430,
        background: "linear-gradient(180deg, #222343 65%, #242533 100%)",
        borderRadius: 22,
        padding: 0,
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
        boxShadow: "0 0 2px rgba(10,10,40,0.07), 0 16px 36px #1a183148",
        border: "none",
        margin: "0 auto",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "23px 26px 17px 23px",
          borderBottom: "1px solid #262745",
          background: "none",
        }}
      >
        <Mail
          style={{
            width: 26,
            height: 26,
            marginRight: 12,
            color: "#b2b9e4",
            strokeWidth: 2.1,
          }}
        />
        <div
          data-eid="inbox-title"
          style={{
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: "-0.4px",
            color: "#fff",
          }}
        >
          Inbox
        </div>
        <span
          data-eid="unread-badge"
          style={{
            background: "#5d5fec",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 16,
            minWidth: 27,
            height: 27,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 13,
          }}
        >
          {data.unreadCount}
        </span>
        <span data-eid="search-icon" style={searchIconStyle}>
          <Search size={21} color="#b4b8e1" strokeWidth={2.1} />
        </span>
      </header>

      {/* Tabs */}
      <div
        data-eid="tabs-row"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 23px",
          height: 50,
          borderBottom: "1px solid #232443",
          background: "none",
        }}
      >
        {data.tabs.map((tab, idx) => (
          <span
            key={tab.name}
            data-eid={
              idx === 0
                ? "tab-primary"
                : idx === 1
                ? "tab-social"
                : "tab-updates"
            }
            style={getTabStyle(idx)}
          >
            {tab.name}
            <span style={getTabBadgeStyle(idx)}>{tab.count}</span>
          </span>
        ))}
      </div>

      {/* Email List */}
      <div
        data-eid="email-list"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        {data.emails.map((m, idx) => {
          const unread = m.unread;
          return (
            <div
              key={m.sender}
              data-eid={`email-${idx}`}
              style={{
                display: "flex",
                alignItems: "stretch",
                padding: "15px 23px 12px 23px",
                background: getRowBg(unread, idx),
                borderBottom: getRowBorder(idx),
                position: "relative",
                cursor: "pointer",
                minHeight: 54,
              }}
            >
              {/* Unread dot */}
              {unread && (
                <span
                  style={{
                    width: 10,
                    height: 10,
                    background: unreadDotColor,
                    borderRadius: "50%",
                    display: "block",
                    margin: "auto 9px auto 0",
                    alignSelf: "center",
                  }}
                />
              )}
              {/* Avatar */}
              <div
                data-eid={`email-${idx}-avatar`}
                style={getAvatarStyle(idx)}
              >
                {m.avatar}
              </div>
              {/* Email Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  data-eid={`email-${idx}-sender`}
                  style={getSenderStyle(unread)}
                >
                  {m.sender}
                </div>
                <div
                  data-eid={`email-${idx}-subject`}
                  style={getSubjectStyle(unread)}
                >
                  {m.subject}
                </div>
                <div style={getPreviewStyle(unread)}>{m.preview}</div>
              </div>
              {/* Time */}
              <span
                data-eid={`email-${idx}-time`}
                style={getTimeStyle(unread)}
              >
                {m.time}
              </span>
              {/* Star */}
              {"starred" in m && (
                <span data-eid={`email-${idx}-star`} style={{ marginLeft: 10, marginTop: 3 }}>
                  <Star style={starStyle(m.starred)} />
                </span>
              )}
              {!("starred" in m) && (
                <span style={{ width: 22, marginLeft: 10 }} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
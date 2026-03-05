import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Heart } from "lucide-react";
import data from "./data.json";

const StatCard = ({ icon, value, label, color, eid, valueEid }) => (
  <div
    data-eid={eid}
    style={{
      flex: 1,
      background: "rgba(255,255,255,0.02)",
      borderRadius: 16,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 4,
      minWidth: 110
    }}
  >
    <span
      data-eid={valueEid}
      style={{
        fontSize: 24,
        fontWeight: 700,
        color: color,
        marginBottom: 2,
        fontFamily: "Inter,sans-serif",
        letterSpacing: -1,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontSize: 13,
        color: "#AEB4D1",
        fontWeight: 500,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginTop: 1,
      }}
    >
      {label}
    </span>
  </div>
);

const LegendDot = ({ color }) => (
  <span
    style={{
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color,
      marginRight: 7,
      marginTop: 1,
      verticalAlign: "middle",
    }}
  />
);

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 500,
        background: "#19173a",
        borderRadius: 28,
        padding: 28,
        fontFamily: "Inter,sans-serif",
        color: "#fff",
        margin: "0 auto",
        marginTop: 8,
        boxShadow: "0 1px 20px 0 rgba(36,31,90,0.13)",
        minHeight: 650,
        position: "relative"
      }}
    >
      {/* Profile Header */}
      <div
        data-eid="profile-header"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        {/* Avatar */}
        <div
          data-eid="profile-avatar"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#a248c8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 22,
            color: "#fff",
            marginRight: 18,
          }}
        >
          {data.profile.avatarInitials}
        </div>
        <div style={{ flex: 1 }}>
          <h2
            data-eid="profile-name"
            style={{
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: -1.1,
              margin: 0,
              color: "#fff",
              marginBottom: 3,
            }}
          >
            @{data.profile.username}
          </h2>
          <span
            data-eid="followers-count"
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              marginRight: 7,
            }}
          >
            {data.profile.followers}
          </span>
          <span
            style={{
              fontWeight: 400,
              color: "#AEB4D1",
              fontSize: 15,
              marginRight: 7
            }}
          >
            followers
          </span>
          <span
            data-eid="following-count"
            style={{
              fontWeight: 700,
              color: "#fff",
              fontSize: 15,
              marginRight: 7,
            }}
          >
            {data.profile.following}
          </span>
          <span
            style={{
              fontWeight: 400,
              color: "#AEB4D1",
              fontSize: 15,
            }}
          >
            following
          </span>
        </div>
        <span
          data-eid="growth-badge"
          style={{
            background: "#1fc49e",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 18,
            padding: "7px 17px",
            display: "inline-block",
            marginLeft: 10,
            letterSpacing: 0.1,
            boxShadow: "0 1px 3px 0 rgba(31,196,158,0.07)",
            whiteSpace: "nowrap"
          }}
        >
          <span style={{ fontSize: 16, marginRight: 4, fontWeight: 700 }}>↗</span>
          {data.profile.growth}
        </span>
      </div>

      {/* Stats Grid */}
      <div
        data-eid="stats-grid"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 0,
          marginBottom: 38,
        }}
      >
        <StatCard
          eid="stat-posts"
          valueEid="stat-posts-value"
          icon={null}
          value={data.stats.posts.value}
          label={data.stats.posts.label}
          color="#5fa6ff"
        />
        <StatCard
          eid="stat-likes"
          valueEid="stat-likes-value"
          icon={null}
          value={data.stats.likes.value}
          label={data.stats.likes.label}
          color="#ff56c7"
        />
        <StatCard
          eid="stat-comments"
          valueEid="stat-comments-value"
          icon={null}
          value={data.stats.comments.value}
          label={data.stats.comments.label}
          color="#ffe465"
        />
        <StatCard
          eid="stat-shares"
          valueEid="stat-shares-value"
          icon={null}
          value={data.stats.shares.value}
          label={data.stats.shares.label}
          color="#1fc49e"
        />
      </div>

      {/* Chart Section */}
      <div
        data-eid="chart-section"
        style={{
          background: "none",
          padding: 0,
          marginBottom: 20,
        }}
      >
        <h3
          data-eid="chart-title"
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: -0.5,
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          Engagement (14 days)
        </h3>
        <div
          data-eid="chart-container"
          style={{
            width: "100%",
            height: 180,
            background: "none",
          }}
        >
          <ResponsiveContainer width="99%" height={180}>
            <LineChart
              data={data.chart}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fontSize: 13, fill: "#b5b8df" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                hide
              />
              <Tooltip
                contentStyle={{
                  background: "#19173a",
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 2px 8px rgba(31,31,31,0.11)"
                }}
                cursor={{ stroke: "#2e275a", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#ff56c7"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#ffe465"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="#1fc49e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          data-eid="chart-legend"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 35,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 13,
            marginBottom: 3,
          }}
        >
          <span style={{ color: "#ff56c7", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center" }}>
            <LegendDot color="#ff56c7" /> Likes
          </span>
          <span style={{ color: "#ffe465", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center" }}>
            <LegendDot color="#ffe465" /> Comments
          </span>
          <span style={{ color: "#1fc49e", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center" }}>
            <LegendDot color="#1fc49e" /> Shares
          </span>
        </div>
      </div>

      {/* Recent Posts */}
      <div
        data-eid="recent-posts"
        style={{
          marginTop: 12,
        }}
      >
        <h3
          data-eid="recent-title"
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#fff",
            marginBottom: 9,
            marginTop: 0,
          }}
        >
          Recent Posts
        </h3>
        {[0, 1, 2].map((idx) => {
          const post = data.recentPosts[idx];
          return (
            <div
              data-eid={`post-${idx}`}
              key={idx}
              style={{
                borderBottom: idx === 2 ? "none" : "1px solid #251f4c",
                marginBottom: 12,
                paddingBottom: idx === 2 ? 0 : 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  data-eid={`post-${idx}-date`}
                  style={{
                    fontSize: 14,
                    color: "#b5b8df",
                    fontWeight: 400,
                  }}
                >
                  {post.date}
                </span>
                <span
                  data-eid={`post-${idx}-engagement`}
                  style={{
                    color: "#ff56c7",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 15,
                    minWidth: 58,
                    justifyContent: "flex-end"
                  }}
                >
                  <Heart
                    size={15}
                    strokeWidth={2}
                    style={{
                      marginRight: 4,
                      marginBottom: 0,
                    }}
                  />
                  {post.engagement}
                </span>
              </div>
              <span
                data-eid={`post-${idx}-preview`}
                style={{
                  fontSize: 15,
                  color: "#e9edff",
                  marginTop: 2,
                  display: "block",
                }}
              >
                {post.preview}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
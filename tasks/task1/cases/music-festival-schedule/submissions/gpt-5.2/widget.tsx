// submissions/<your-model-name>/widget.tsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Heart, Music2, Calendar, Users } from "lucide-react";
import data from "./data.json";

function StarRow({ value }: { value: number }) {
  const full = Math.round(value);
  const stars = Array.from({ length: 5 }).map((_, i) => (i < full ? "★" : "☆"));
  return (
    <span style={{ color: "#F6C343", fontSize: 12, letterSpacing: 1 }}>{stars.join("")}</span>
  );
}

function Card({
  eid,
  artistEid,
  genreEid,
  timeEid,
  ratingEid,
  artist,
  genre,
  time,
  rating,
  accent,
  showGenre = true,
}: {
  eid: string;
  artistEid: string;
  genreEid?: string;
  timeEid: string;
  ratingEid: string;
  artist: string;
  genre?: string;
  time: string;
  rating: number;
  accent: string;
  showGenre?: boolean;
}) {
  return (
    <div
      data-eid={eid}
      style={{
        position: "relative",
        padding: "10px 12px 10px 12px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        minHeight: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <Heart size={14} color={"rgba(255,255,255,0.55)"} fill={"rgba(255,255,255,0.18)"} />
        <span
          data-eid={artistEid}
          style={{ color: "rgba(255,255,255,0.92)", fontWeight: 700, fontSize: 12.5 }}
        >
          {artist}
        </span>
      </div>

      {showGenre ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            data-eid={genreEid}
            style={{
              fontSize: 10.5,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            {genre}
          </span>
          <span
            data-eid={timeEid}
            style={{
              fontSize: 10.5,
              color: "rgba(255,255,255,0.65)",
              whiteSpace: "nowrap",
            }}
          >
            {time}
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            data-eid={timeEid}
            style={{
              fontSize: 10.5,
              color: "rgba(255,255,255,0.65)",
              whiteSpace: "nowrap",
            }}
          >
            {time}
          </span>
        </div>
      )}

      <div data-eid={ratingEid} style={{ marginTop: 6 }}>
        <StarRow value={rating} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          background: accent,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

export default function Widget() {
  const sched = data.schedule;

  const stageAccents = {
    main: "#FF2D5F",
    sunset: "#FF7A2A",
    forest: "#2FE36C",
    electronic: "#3A7CFF",
  } as const;

  return (
    <section
      data-eid="root"
      style={{
        width: 468,
        height: 919,
        borderRadius: 18,
        overflow: "hidden",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background:
          "linear-gradient(180deg, #4A2B74 0%, #6A2A88 35%, #AF2572 70%, #F04A67 100%)",
        color: "white",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        data-eid="header"
        style={{
          padding: "14px 16px 10px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Music2 size={18} color={"rgba(255,255,255,0.9)"} />
            <h1 data-eid="title" style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
              {data.festivalName}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.85 }}>
            <Calendar size={14} color={"rgba(255,255,255,0.85)"} />
            <span data-eid="date-label" style={{ fontSize: 12 }}>
              {data.date}
            </span>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "6px 10px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Heart size={14} color={"rgba(255,255,255,0.9)"} />
          <span data-eid="favorites-count" style={{ fontSize: 12, fontWeight: 700 }}>
            {data.favoritesCount}
          </span>
        </div>
      </header>

      {/* Crowd chart */}
      <div
        data-eid="crowd-chart-section"
        style={{
          margin: "0 14px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "10px 12px 12px 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Users size={16} color={"rgba(255,255,255,0.85)"} />
          <h2
            data-eid="crowd-chart-title"
            style={{ margin: 0, fontSize: 13, fontWeight: 800, opacity: 0.9 }}
          >
            {data.crowd.title}
          </h2>
        </div>

        <div data-eid="crowd-area-chart" style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.crowd.points} margin={{ left: 6, right: 8, top: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8A0FF" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#B8A0FF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFB34D" stopOpacity={0.40} />
                  <stop offset="100%" stopColor="#FFB34D" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5A7A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#FF5A7A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.18)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.18)" }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.18)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.18)" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(25, 12, 38, 0.9)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  color: "white",
                  fontSize: 12,
                }}
                labelStyle={{ color: "rgba(255,255,255,0.85)" }}
              />
              <Area
                type="monotone"
                dataKey="main"
                stroke="#C9B7FF"
                strokeWidth={2}
                fill="url(#g1)"
              />
              <Area
                type="monotone"
                dataKey="sunset"
                stroke="#FFB34D"
                strokeWidth={2}
                fill="url(#g2)"
              />
              <Area
                type="monotone"
                dataKey="overall"
                stroke="#FF6B8C"
                strokeWidth={2}
                fill="url(#g3)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Schedule + Favorites row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 172px",
          gap: 14,
          padding: "12px 14px 0 14px",
        }}
      >
        {/* Schedule */}
        <div>
          <div
            data-eid="schedule-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            {/* Stage headers are implemented as full-width rows */}
            <div
              data-eid="stage-header-0"
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 2,
                marginBottom: -2,
              }}
            >
              <div style={{ width: 3, height: 18, background: stageAccents.main }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>
                Main Stage
              </div>
            </div>

            <Card
              eid="slot-0-0"
              artistEid="slot-0-0-artist"
              genreEid="slot-0-0-genre"
              timeEid="slot-0-0-time"
              ratingEid="slot-0-0-rating"
              artist={sched.main[0].artist}
              genre={sched.main[0].genre}
              time={sched.main[0].time}
              rating={sched.main[0].rating}
              accent={stageAccents.main}
            />
            <Card
              eid="slot-0-1"
              artistEid="slot-0-1-artist"
              genreEid="slot-0-1-genre"
              timeEid="slot-0-1-time"
              ratingEid="slot-0-1-rating"
              artist={sched.main[1].artist}
              genre={sched.main[1].genre}
              time={sched.main[1].time}
              rating={sched.main[1].rating}
              accent={stageAccents.main}
            />
            <Card
              eid="slot-0-2"
              artistEid="slot-0-2-artist"
              genreEid="slot-0-2-genre"
              timeEid="slot-0-2-time"
              ratingEid="slot-0-2-rating"
              artist={sched.main[2].artist}
              genre={sched.main[2].genre}
              time={sched.main[2].time}
              rating={sched.main[2].rating}
              accent={stageAccents.main}
            />
            <Card
              eid="slot-0-3"
              artistEid="slot-0-3-artist"
              genreEid="slot-0-3-genre"
              timeEid="slot-0-3-time"
              ratingEid="slot-0-3-rating"
              artist={sched.main[3].artist}
              genre={sched.main[3].genre}
              time={sched.main[3].time}
              rating={sched.main[3].rating}
              accent={stageAccents.main}
            />
            <Card
              eid="slot-0-4"
              artistEid="slot-0-4-artist"
              genreEid="slot-0-4-genre"
              timeEid="slot-0-4-time"
              ratingEid="slot-0-4-rating"
              artist={sched.main[4].artist}
              genre={sched.main[4].genre}
              time={sched.main[4].time}
              rating={sched.main[4].rating}
              accent={stageAccents.main}
            />
            <Card
              eid="slot-0-5"
              artistEid="slot-0-5-artist"
              genreEid="slot-0-5-genre"
              timeEid="slot-0-5-time"
              ratingEid="slot-0-5-rating"
              artist={sched.main[5].artist}
              genre={sched.main[5].genre}
              time={sched.main[5].time}
              rating={sched.main[5].rating}
              accent={stageAccents.main}
            />

            <div
              data-eid="stage-header-1"
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 6,
                marginBottom: -2,
              }}
            >
              <div style={{ width: 3, height: 18, background: stageAccents.sunset }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>
                Sunset Stage
              </div>
            </div>

            <Card
              eid="slot-1-0"
              artistEid="slot-1-0-artist"
              genreEid="slot-1-0-genre"
              timeEid="slot-1-0-time"
              ratingEid="slot-1-0-rating"
              artist={sched.sunset[0].artist}
              genre={sched.sunset[0].genre}
              time={sched.sunset[0].time}
              rating={sched.sunset[0].rating}
              accent={stageAccents.sunset}
            />
            <Card
              eid="slot-1-1"
              artistEid="slot-1-1-artist"
              genreEid="slot-1-1-genre"
              timeEid="slot-1-1-time"
              ratingEid="slot-1-1-rating"
              artist={sched.sunset[1].artist}
              genre={sched.sunset[1].genre}
              time={sched.sunset[1].time}
              rating={sched.sunset[1].rating}
              accent={stageAccents.sunset}
            />
            <Card
              eid="slot-1-2"
              artistEid="slot-1-2-artist"
              genreEid="slot-1-2-genre"
              timeEid="slot-1-2-time"
              ratingEid="slot-1-2-rating"
              artist={sched.sunset[2].artist}
              genre={sched.sunset[2].genre}
              time={sched.sunset[2].time}
              rating={sched.sunset[2].rating}
              accent={stageAccents.sunset}
            />
            <Card
              eid="slot-1-3"
              artistEid="slot-1-3-artist"
              genreEid="slot-1-3-genre"
              timeEid="slot-1-3-time"
              ratingEid="slot-1-3-rating"
              artist={sched.sunset[3].artist}
              genre={sched.sunset[3].genre}
              time={sched.sunset[3].time}
              rating={sched.sunset[3].rating}
              accent={stageAccents.sunset}
            />
            <Card
              eid="slot-1-4"
              artistEid="slot-1-4-artist"
              genreEid="slot-1-4-genre"
              timeEid="slot-1-4-time"
              ratingEid="slot-1-4-rating"
              artist={sched.sunset[4].artist}
              genre={sched.sunset[4].genre}
              time={sched.sunset[4].time}
              rating={sched.sunset[4].rating}
              accent={stageAccents.sunset}
            />
            <Card
              eid="slot-1-5"
              artistEid="slot-1-5-artist"
              genreEid="slot-1-5-genre"
              timeEid="slot-1-5-time"
              ratingEid="slot-1-5-rating"
              artist={sched.sunset[5].artist}
              genre={sched.sunset[5].genre}
              time={sched.sunset[5].time}
              rating={sched.sunset[5].rating}
              accent={stageAccents.sunset}
            />

            <div
              data-eid="stage-header-2"
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 6,
                marginBottom: -2,
              }}
            >
              <div style={{ width: 3, height: 18, background: stageAccents.forest }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>
                Forest Stage
              </div>
            </div>

            <Card
              eid="slot-2-0"
              artistEid="slot-2-0-artist"
              timeEid="slot-2-0-time"
              ratingEid="slot-2-0-rating"
              artist={sched.forest[0].artist}
              time={sched.forest[0].time}
              rating={sched.forest[0].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />
            <Card
              eid="slot-2-1"
              artistEid="slot-2-1-artist"
              timeEid="slot-2-1-time"
              ratingEid="slot-2-1-rating"
              artist={sched.forest[1].artist}
              time={sched.forest[1].time}
              rating={sched.forest[1].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />
            <Card
              eid="slot-2-2"
              artistEid="slot-2-2-artist"
              timeEid="slot-2-2-time"
              ratingEid="slot-2-2-rating"
              artist={sched.forest[2].artist}
              time={sched.forest[2].time}
              rating={sched.forest[2].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />
            <Card
              eid="slot-2-3"
              artistEid="slot-2-3-artist"
              timeEid="slot-2-3-time"
              ratingEid="slot-2-3-rating"
              artist={sched.forest[3].artist}
              time={sched.forest[3].time}
              rating={sched.forest[3].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />
            <Card
              eid="slot-2-4"
              artistEid="slot-2-4-artist"
              timeEid="slot-2-4-time"
              ratingEid="slot-2-4-rating"
              artist={sched.forest[4].artist}
              time={sched.forest[4].time}
              rating={sched.forest[4].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />
            <Card
              eid="slot-2-5"
              artistEid="slot-2-5-artist"
              timeEid="slot-2-5-time"
              ratingEid="slot-2-5-rating"
              artist={sched.forest[5].artist}
              time={sched.forest[5].time}
              rating={sched.forest[5].rating}
              accent={stageAccents.forest}
              showGenre={false}
            />

            <div
              data-eid="stage-header-3"
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 6,
                marginBottom: -2,
              }}
            >
              <div style={{ width: 3, height: 18, background: stageAccents.electronic }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>
                Electronic Tent
              </div>
            </div>

            <Card
              eid="slot-3-0"
              artistEid="slot-3-0-artist"
              timeEid="slot-3-0-time"
              ratingEid="slot-3-0-rating"
              artist={sched.electronic[0].artist}
              time={sched.electronic[0].time}
              rating={sched.electronic[0].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
            <Card
              eid="slot-3-1"
              artistEid="slot-3-1-artist"
              timeEid="slot-3-1-time"
              ratingEid="slot-3-1-rating"
              artist={sched.electronic[1].artist}
              time={sched.electronic[1].time}
              rating={sched.electronic[1].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
            <Card
              eid="slot-3-2"
              artistEid="slot-3-2-artist"
              timeEid="slot-3-2-time"
              ratingEid="slot-3-2-rating"
              artist={sched.electronic[2].artist}
              time={sched.electronic[2].time}
              rating={sched.electronic[2].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
            <Card
              eid="slot-3-3"
              artistEid="slot-3-3-artist"
              timeEid="slot-3-3-time"
              ratingEid="slot-3-3-rating"
              artist={sched.electronic[3].artist}
              time={sched.electronic[3].time}
              rating={sched.electronic[3].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
            <Card
              eid="slot-3-4"
              artistEid="slot-3-4-artist"
              timeEid="slot-3-4-time"
              ratingEid="slot-3-4-rating"
              artist={sched.electronic[4].artist}
              time={sched.electronic[4].time}
              rating={sched.electronic[4].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
            <Card
              eid="slot-3-5"
              artistEid="slot-3-5-artist"
              timeEid="slot-3-5-time"
              ratingEid="slot-3-5-rating"
              artist={sched.electronic[5].artist}
              time={sched.electronic[5].time}
              rating={sched.electronic[5].rating}
              accent={stageAccents.electronic}
              showGenre={false}
            />
          </div>

          {/* Conflicts */}
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <span
              data-eid="conflict-0"
              style={{
                background: "rgba(255,184,0,0.18)",
                border: "1px solid rgba(255,184,0,0.26)",
                color: "rgba(255,214,120,0.95)",
                padding: "8px 10px",
                borderRadius: 10,
                fontSize: 10.5,
              }}
            >
              {data.conflicts[0]}
            </span>
            <span
              data-eid="conflict-1"
              style={{
                background: "rgba(255,184,0,0.18)",
                border: "1px solid rgba(255,184,0,0.26)",
                color: "rgba(255,214,120,0.95)",
                padding: "8px 10px",
                borderRadius: 10,
                fontSize: 10.5,
              }}
            >
              {data.conflicts[1]}
            </span>
          </div>
        </div>

        {/* Favorites sidebar */}
        <div
          data-eid="favorites-sidebar"
          style={{
            borderRadius: 14,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "10px 10px",
            height: 240,
            alignSelf: "end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Heart size={16} color={"rgba(255,255,255,0.85)"} />
            <h2 data-eid="favorites-title" style={{ margin: 0, fontSize: 13, fontWeight: 800 }}>
              {data.favorites.title}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.favorites.items.map((f: any, idx: number) => (
              <div
                key={f.artist}
                data-eid={`fav-${idx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.12)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 12,
                  padding: "8px 8px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Heart size={12} color={"rgba(255,255,255,0.65)"} />
                    <div style={{ fontSize: 11.5, fontWeight: 800, opacity: 0.95 }}>
                      {f.artist}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.60)" }}>{f.stage}</div>
                </div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)" }}>{f.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to mimic target edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 14,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.06) 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
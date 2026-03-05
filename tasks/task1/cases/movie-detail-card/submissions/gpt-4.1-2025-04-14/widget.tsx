import React from "react";
import data from "./data.json";
import { Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const starFull = (key: string) => (
  <span data-eid={key} style={{ display: "inline-flex", marginRight: 3, verticalAlign: "middle" }}>
    <Star size={20} color="#FFD600" fill="#FFD600" strokeWidth={1.5} />
  </span>
);

// Fifth star is partial: render as linear gradient SVG
const starPartial = (
  <span data-eid={"score-star-5"} style={{ display: "inline-flex", marginRight: 7, verticalAlign: "middle" }}>
    <svg width="20" height="20" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0">
          <stop offset="60%" stopColor="#FFD600" />
          <stop offset="60%" stopColor="#252348" />
        </linearGradient>
      </defs>
      <Star size={20} color="url(#halfStar)" fill="url(#halfStar)" stroke="#FFD600" strokeWidth={1.5} />
    </svg>
  </span>
);

const CastAvatar = ({
  eid,
  initials,
  bg,
  children,
}: {
  eid: string;
  initials: string;
  bg: string;
  children: React.ReactNode;
}) => (
  <div
    data-eid={eid}
    style={{
      margin: "0 auto 8px auto",
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      border: "3px solid rgba(255,255,255,0.02)",
    }}
  >
    {initials}
    {children}
  </div>
);

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        margin: "0 auto",
        width: 505,
        borderRadius: 24,
        background: "#191733",
        overflow: "hidden",
        boxShadow: "0 6px 32px 0 rgba(34,34,105,0.10)",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        color: "#fff",
        padding: 0,
      }}
    >
      <div
        data-eid="poster-area"
        style={{
          height: 180,
          width: "100%",
          background: "linear-gradient(180deg,#202645 64%,#261f45 97%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        {/* gradient poster blurred icon */}
        <svg width={56} height={56} style={{ opacity: 0.23 }}>
          <rect x={10} y={10} width={36} height={36} rx={10} fill="#fff" fillOpacity={0.13} />
          <rect x={22} y={22} width={12} height={12} rx={3.7} fill="#fff" fillOpacity={0.17} />
          <rect x={17} y={17} width={22} height={4} rx={2} fill="#fff" fillOpacity={0.09} />
          <rect x={17} y={35} width={22} height={4} rx={2} fill="#fff" fillOpacity={0.09} />
        </svg>
      </div>

      <div style={{ padding: "32px 32px 0 32px" }}>
        <div data-eid="title-row" style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <h2
            data-eid="movie-title"
            style={{
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: -0.5,
              margin: 0,
              color: "#fff",
              lineHeight: "1.15",
            }}
          >
            {data.title}
          </h2>
          <span
            data-eid="movie-year"
            style={{
              color: "#9093a9",
              fontSize: 19,
              marginBottom: 2,
            }}
          >
            ({data.year})
          </span>
        </div>
        <div
          data-eid="meta-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 7,
            marginBottom: 6,
            fontSize: 16,
            color: "#e3e7ff",
            fontWeight: 400,
          }}
        >
          <span data-eid="runtime">{data.runtime}</span>
          <span
            data-eid="pg-rating"
            style={{
              border: "2px solid #FFD600",
              color: "#FFD600",
              borderRadius: 5,
              padding: "0 7px",
              fontWeight: 500,
              fontSize: 15,
              marginLeft: 2,
              lineHeight: "22px",
              background: "rgba(255,255,255,0.03)",
              letterSpacing: 0.1,
              boxSizing: "border-box",
            }}
          >
            {data.rating}
          </span>
        </div>
        <div
          data-eid="score-row"
          style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 0, marginBottom: 7 }}
        >
          {starFull("score-star-1")}
          {starFull("score-star-2")}
          {starFull("score-star-3")}
          {starFull("score-star-4")}
          {starPartial}
          <span
            data-eid="score-value"
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#FFD600",
              marginLeft: 6,
              letterSpacing: 0.1,
            }}
          >
            {data.score}
          </span>
        </div>
        <div
          data-eid="genre-row"
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <span
            data-eid="genre-scifi"
            style={{
              background: "linear-gradient(90deg,#2D2269 80%,#5F42F2 120%)",
              color: "#8FACFE",
              borderRadius: 15,
              padding: "3px 20px",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 0.12,
              lineHeight: "22px",
              boxShadow: "0 0.5px 1.5px 0 rgba(30,59,255,0.04)",
            }}
          >
            {data.genres[0]}
          </span>
          <span
            data-eid="genre-adventure"
            style={{
              background: "linear-gradient(90deg,#1B3573 85%,#287FD9 120%)",
              color: "#7DCAF4",
              borderRadius: 15,
              padding: "3px 20px",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 0.12,
              lineHeight: "22px",
            }}
          >
            {data.genres[1]}
          </span>
          <span
            data-eid="genre-drama"
            style={{
              background: "linear-gradient(90deg,#3C1949 80%,#B0327B 122%)",
              color: "#F491C1",
              borderRadius: 15,
              padding: "3px 20px",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 0.12,
              lineHeight: "22px",
            }}
          >
            {data.genres[2]}
          </span>
        </div>
        <p
          data-eid="plot-summary"
          style={{
            color: "#BBC0D2",
            fontWeight: 400,
            fontSize: 15,
            margin: "0 0 22px 0",
            lineHeight: "22px",
            letterSpacing: "0.02em",
          }}
        >
          {data.plot}
        </p>

        <div data-eid="cast-section" style={{ marginBottom: 22 }}>
          <h3
            data-eid="cast-title"
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.1px",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Cast
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 30,
              margin: "0 0 0 0",
              justifyContent: "flex-start",
            }}
          >
            {data.cast.map((member, idx) => {
              const avatarColors = [
                "linear-gradient(135deg, #607EDB 70%, #6ECFE8 120%)",
                "linear-gradient(135deg, #9762CA 75%, #DA8DB9 120%)",
                "linear-gradient(135deg, #C95478 75%, #EE8CA0 120%)",
                "linear-gradient(135deg, #21BC89 70%, #43DFB6 120%)",
              ];
              return (
                <div
                  data-eid={`cast-${idx}`}
                  key={member.name}
                  style={{
                    width: 80,
                    textAlign: "center",
                  }}
                >
                  <CastAvatar eid={`cast-${idx}-avatar`} initials={member.initials} bg={avatarColors[idx]}>
                    {/* nothing */}
                  </CastAvatar>
                  <div
                    style={{
                      fontSize: 13,
                      margin: "0 0 0 0",
                      color: "#fff",
                      fontWeight: 500,
                      lineHeight: 1.09,
                      height: 33,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{member.name.split(" ")[0]}</span>
                    <span style={{ fontWeight: 400, color: "#bcb9d7", fontSize: 12 }}>
                      {member.name.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          data-eid="director-row"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            color: "#a19fae",
            fontSize: 16,
            marginBottom: 5,
            gap: 8,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            width={18}
            height={18}
            style={{ marginRight: 2, opacity: 0.35 }}
            fill="#bbb"
            aria-hidden
          >
            <rect x="2" y="7" width="12" height="7" rx="2.5" />
            <rect x="5" y="2" width="6" height="7" rx="3" />
          </svg>
          Director:
          <span data-eid="director-name" style={{ fontWeight: 600, color: "#fff", marginLeft: 7 }}>
            {data.director}
          </span>
        </div>

        <div
          data-eid="box-office-row"
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 400,
            color: "#a19fae",
            fontSize: 16,
            marginBottom: 15,
            gap: 8,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            width={17}
            height={17}
            style={{ marginRight: 2, opacity: 0.36 }}
            fill="none"
            aria-hidden
          >
            <rect x="2" y="4" width="12" height="8" rx="2" stroke="#A7F8BC" strokeWidth="1.5" fill="#242337" />
            <path d="M8 7v2M8 6h0M8 10h0" stroke="#7DC584" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Box Office:
          <span
            data-eid="box-office-value"
            style={{
              color: "#57FF8F",
              fontWeight: 600,
              fontSize: 16,
              marginLeft: 8,
              letterSpacing: 0.04,
            }}
          >
            {data.boxOffice}
          </span>
        </div>
      </div>
      <div
        data-eid="ratings-chart"
        style={{
          background: "linear-gradient(90deg,#251d39 70%,#34245d 120%)",
          borderBottomLeftRadius: 19,
          borderBottomRightRadius: 19,
          marginTop: 23,
          padding: "18px 34px 19px 34px",
        }}
      >
        <span
          data-eid="chart-title"
          style={{
            fontSize: 16,
            color: "#fff",
            fontWeight: 600,
            marginBottom: 13,
            display: "block",
            letterSpacing: 0.13,
          }}
        >
          Rating Distribution
        </span>
        <div style={{ width: "100%", height: 95, marginTop: 7 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dist} margin={{ top: 5, bottom: 10, left: -26, right: 16 }}>
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="name"
                stroke="#a6b0e1"
                fontSize={13}
                dy={4}
                style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#a6b0e1"
                fontSize={13}
                dx={-12}
                style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}
              />
              <Tooltip
                cursor={{ fill: "#312364", opacity: 0.18 }}
                contentStyle={{
                  fontFamily: "Inter, Arial, Helvetica, sans-serif",
                  fontSize: 14,
                  color: "#202046",
                }}
              />
              <Bar
                radius={[7, 7, 0, 0]}
                dataKey="count"
                fill="#6AD7EF"
                barSize={25}
                style={{ filter: "drop-shadow(0 1px 4px #36CBE6a2)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
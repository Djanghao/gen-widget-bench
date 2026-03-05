import React from "react";
import data from "./data.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  Cloud as LucideCloud,
  Droplet,
  Sunrise,
  Sunset,
  ThermometerSun,
  CircleDashed,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "cloud-sun": <CloudSun size={20} color="#FDBB3A" strokeWidth={2} style={{ verticalAlign: "middle" }} />,
  "cloud": <LucideCloud size={20} color="#d9ebff" strokeWidth={2} style={{ verticalAlign: "middle" }} />,
  "cloud-rain": <CloudRain size={20} color="#45b7f9" strokeWidth={2} style={{ verticalAlign: "middle" }} />,
  "sun": <Sun size={20} color="#FDBB3A" strokeWidth={2} style={{ verticalAlign: "middle" }} />,
};

function getIcon(key: string, size: number = 20) {
  switch (key) {
    case "partly-cloudy":
      return (
        <CloudSun size={size} color="#FDBB3A" strokeWidth={2} style={{ verticalAlign: "middle" }} />
      );
    case "sunny":
      return (
        <Sun size={size} color="#FDBB3A" strokeWidth={2} style={{ verticalAlign: "middle" }} />
      );
    case "cloudy":
      return (
        <LucideCloud size={size} color="#d9ebff" strokeWidth={2} style={{ verticalAlign: "middle" }} />
      );
    case "rain":
      return (
        <CloudRain size={size} color="#45b7f9" strokeWidth={2} style={{ verticalAlign: "middle" }} />
      );
    case "cloud":
      return (
        <LucideCloud size={size} color="#d9ebff" strokeWidth={2} style={{ verticalAlign: "middle" }} />
      );
    default:
      return <CircleDashed size={size} color="#fff" />;
  }
}

export default function Widget() {
  // Chart Y tick domain min/max based on data for best fit
  const chartYDomain = [36, 72];

  return (
    <section
      data-eid="root"
      style={{
        fontFamily:
          "system-ui, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif",
        width: 420,
        borderRadius: 28,
        background: "linear-gradient(135deg, #181c3a 80%, #262557 100%)",
        color: "#fff",
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 4px 28px 0 #201f3e33, 0 1.5px 0 0 #252857 inset",
      }}
    >
      <header
        data-eid="header"
        style={{
          padding: "24px 24px 0 24px",
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            data-eid="city-name"
            style={{
              color: "#fff",
              opacity: 0.95,
              fontWeight: 500,
              fontSize: 19,
              marginBottom: 4,
              letterSpacing: 0.05,
            }}
          >
            {data.city}
          </div>
          <div
            data-eid="current-temp"
            style={{
              fontWeight: 700,
              fontSize: 54,
              lineHeight: 1,
              marginBottom: 0,
              letterSpacing: -2,
            }}
          >
            {data.current.temp}&deg;F
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 2,
            gap: 6,
          }}
        >
          <span data-eid="condition-icon" style={{ marginRight: 7 }}>
            {getIcon(data.current.condition.icon, 26)}
          </span>
          <div
            data-eid="condition-text"
            style={{
              fontWeight: 500,
              fontSize: 17,
              color: "#FFD43B",
              opacity: 0.91,
              marginTop: 1,
            }}
          >
            {data.current.condition.text}
          </div>
        </div>
      </header>

      <div
        data-eid="temp-chart"
        style={{
          margin: "22px 20px 0 20px",
          borderRadius: 14,
          background: "#232251",
          padding: 0,
          height: 150,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.daily}
            margin={{
              top: 22,
              right: 18,
              left: 18,
              bottom: 4,
            }}
          >
            <XAxis
              dataKey="shortDay"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fill: "#adadd6",
                fontWeight: 500,
                dy: 8,
              }}
              interval={0}
              height={28}
            />
            <YAxis
              dataKey="hi"
              type="number"
              domain={chartYDomain}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 14,
                fill: "#adadd6",
                fontWeight: 500,
                dx: -7,
              }}
              width={24}
              interval={"preserveStartEnd"}
            />
            <Line
              dataKey="hi"
              stroke="#FDBB3A"
              strokeWidth={3}
              dot={{
                stroke: "#FDBB3A",
                fill: "#FDBB3A",
                r: 4,
              }}
              activeDot={false}
            />
            <Line
              dataKey="lo"
              stroke="#44a0dc"
              strokeWidth={3}
              dot={{
                stroke: "#44a0dc",
                fill: "#44a0dc",
                r: 4,
              }}
              activeDot={false}
            />
            {/* Hide grid lines and tooltip */}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Day grid */}
      <div
        data-eid="day-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          margin: "18px 16px 0 16px",
          gap: 10,
        }}
      >
        {data.daily.map((d, i) => (
          <div
            key={i}
            data-eid={`day-${i}`}
            style={{
              background:
                i === 0
                  ? "rgba(36,39,77,0.97)"
                  : "rgba(36,39,77,0.91)",
              borderRadius: 11,
              padding: "13px 0 11px 0",
              border:
                i === 0
                  ? "1.5px solid #313269"
                  : "1.2px solid #282858",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <span
              data-eid={`day-${i}-name`}
              style={{
                color: "#adadd6",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 0.2,
                marginBottom: 4,
                textTransform: "uppercase",
              }}
            >
              {d.day}
            </span>
            <span
              data-eid={i === 0 ? "day-0-icon" : i === 1 ? "day-1-icon" : undefined}
              style={{ margin: "0 0 7px 0" }}
            >
              {getIcon(d.icon, 21)}
            </span>
            <span
              data-eid={`day-${i}-high`}
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1.2,
                letterSpacing: 0.1,
              }}
            >
              {d.hi}&deg;
            </span>
            <span
              data-eid={i <= 1 ? `day-${i}-low` : undefined}
              style={{
                color: "#adadd6",
                fontSize: 14,
                marginTop: 0,
                lineHeight: 1,
              }}
            >
              {typeof d.lo === "number" ? d.lo + "°" : ""}
            </span>
            {/* Precip % only for first two days */}
            {i === 0 && (
              <span
                data-eid="day-0-precip"
                style={{
                  color: "#4ad4ff",
                  fontWeight: 500,
                  fontSize: 13,
                  marginTop: 4,
                  letterSpacing: 0.1,
                }}
              >
                {d.precip}
              </span>
            )}
            {i === 1 && (
              <span
                data-eid="day-1-precip"
                style={{
                  color: "#4ad4ff",
                  fontWeight: 500,
                  fontSize: 13,
                  marginTop: 4,
                  letterSpacing: 0.1,
                }}
              >
                {d.precip}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* footer divider */}
      <div
        data-eid="footer-divider"
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, #232357 16px, #413c6d 62%, #232357 95%)",
          opacity: 0.77,
          margin: "28px 0 0 0",
        }}
      />

      {/* FOOTER */}
      <footer
        data-eid="footer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px 18px 32px",
        }}
      >
        {/* Sunrise */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <Sunrise size={18} color="#FDBB3A" />
          <span
            style={{
              color: "#adadd6",
              fontWeight: 500,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Sunrise
          </span>
          <span
            data-eid="sunrise-time"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 1,
              letterSpacing: 0.1,
            }}
          >
            {data.sunrise}
          </span>
        </div>
        {/* Sunset */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <Sunset size={18} color="#FDBB3A" />
          <span
            style={{
              color: "#adadd6",
              fontWeight: 500,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Sunset
          </span>
          <span
            data-eid="sunset-time"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 1,
              letterSpacing: 0.1,
            }}
          >
            {data.sunset}
          </span>
        </div>
        {/* Humidity */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <Droplet size={18} color="#4ad4ff" />
          <span
            style={{
              color: "#adadd6",
              fontWeight: 500,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            Humidity
          </span>
          <span
            data-eid="humidity-value"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 1,
              letterSpacing: 0.1,
            }}
          >
            {data.humidity}
          </span>
        </div>
        {/* UV Index */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <ThermometerSun size={18} color="#9273fc" />
          <span
            style={{
              color: "#adadd6",
              fontWeight: 500,
              fontSize: 14,
              marginTop: 4,
              textAlign: "center",
              minWidth: 48,
            }}
          >
            UV Index
          </span>
          <span
            data-eid="uv-index"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 1,
              letterSpacing: 0.1,
            }}
          >
            {data.uv}
          </span>
        </div>
      </footer>
    </section>
  );
}
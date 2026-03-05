// submissions/gpt/widget.tsx
import React from "react";
import data from "./data.json";
import {
  Wifi,
  Home as HomeIcon,
  Lightbulb,
  Thermometer,
  Activity,
  Camera,
  Shield,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const clamp = (n: number, a = 0, b = 100) => Math.max(a, Math.min(b, n));

export default function Widget() {
  const W = 460;
  const cardRadius = 14;

  const bg = {
    background:
      "radial-gradient(120% 90% at 10% 0%, #1a2559 0%, #0e1433 35%, #0a1027 70%, #070b1b 100%)",
    color: "#eaf0ff",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  } as const;

  const panel = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: cardRadius,
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  } as const;

  const smallPill = (tone: "blue" | "green") =>
    ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "5px 10px",
      borderRadius: 999,
      fontSize: 12,
      lineHeight: "12px",
      letterSpacing: 0.2,
      color: tone === "blue" ? "#cfe0ff" : "#bfffd9",
      background:
        tone === "blue"
          ? "rgba(140,170,255,0.12)"
          : "rgba(23,215,122,0.14)",
      border:
        tone === "blue"
          ? "1px solid rgba(140,170,255,0.22)"
          : "1px solid rgba(23,215,122,0.22)",
    }) as const;

  const roomAccent: Record<string, string> = {
    living: "#63a7ff",
    kitchen: "#f5b000",
    bedroom: "#33df62",
    garage: "#33df62",
  };

  const iconTone: Record<string, string> = {
    living: "#8bbcff",
    kitchen: "#ffbd2b",
    bedroom: "#a9f0bf",
    garage: "#a9f0bf",
  };

  const roomIcon = (key: string) => {
    // simple room marker icon; target shows small line icon on header
    return (
      <span
        style={{
          width: 18,
          height: 18,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconTone[key] || "#a7b6ff",
        }}
      >
        <HomeIcon size={16} />
      </span>
    );
  };

  const DeviceRow = ({
    label,
    status,
    color,
    icon,
    muted,
    eidRow,
    eidStatus,
  }: {
    label: string;
    status: string;
    color: string;
    icon: React.ReactNode;
    muted?: boolean;
    eidRow: string;
    eidStatus: string;
  }) => (
    <div
      data-eid={eidRow}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 10px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "rgba(255,255,255,0.55)", display: "inline-flex" }}>
          {icon}
        </span>
        <span style={{ fontSize: 12, color: "rgba(234,240,255,0.75)" }}>
          {label}
        </span>
      </div>
      <span
        data-eid={eidStatus}
        style={{
          fontSize: 12,
          color: muted ? "rgba(234,240,255,0.45)" : color,
          fontWeight: 600,
        }}
      >
        {status}
      </span>
    </div>
  );

  const RoomCard = ({
    idx,
    room,
    accent,
    keyName,
  }: {
    idx: number;
    room: any;
    accent: string;
    keyName: string;
  }) => {
    const energyPct = clamp(room.energyPercent ?? 0);
    return (
      <div
        data-eid={`room-${idx}`}
        style={{
          ...panel,
          padding: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -60,
            background: `radial-gradient(120px 120px at 0% 0%, ${accent}22 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {roomIcon(keyName)}
          <div
            data-eid={`room-${idx}-name`}
            style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.2 }}
          >
            {room.name}
          </div>
        </div>

        <div style={{ height: 8 }} />

        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            data-eid={`room-${idx}-temp-current`}
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: accent,
            }}
          >
            {room.tempCurrent}
          </span>
          <span
            data-eid={`room-${idx}-temp-target`}
            style={{
              fontSize: 12,
              color: "rgba(234,240,255,0.55)",
            }}
          >
            Target: {room.tempTarget}
          </span>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gap: 8 }}>
          <DeviceRow
            eidRow={`room-${idx}-device-light`}
            eidStatus={`room-${idx}-device-light-status`}
            label="Light"
            status={room.lightStatus}
            color={accent}
            icon={<Lightbulb size={14} />}
            muted={room.lightStatus.toLowerCase() === "off"}
          />
          <DeviceRow
            eidRow={`room-${idx}-device-thermostat`}
            eidStatus={`room-${idx}-device-thermostat-status`}
            label="Thermo"
            status={room.thermoStatus}
            color="#5fb0ff"
            icon={<Thermometer size={14} />}
            muted={room.thermoStatus.toLowerCase() === "idle" || room.thermoStatus === "N/A"}
          />
          <DeviceRow
            eidRow={`room-${idx}-device-sensor`}
            eidStatus={`room-${idx}-device-sensor-status`}
            label="Sensor"
            status={room.sensorStatus}
            color="#cbbcff"
            icon={<Activity size={14} />}
          />
        </div>

        <div style={{ height: 10 }} />

        <div
          data-eid={`room-${idx}-energy-bar`}
          style={{
            height: 4,
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            data-eid={`room-${idx}-energy-bar-fill`}
            style={{
              height: "100%",
              width: `${energyPct}%`,
              background: accent,
              borderRadius: 999,
              boxShadow: `0 0 0 1px ${accent}55`,
            }}
          />
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 10,
          background: "rgba(8,12,28,0.92)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#eaf0ff",
          fontSize: 12,
        }}
      >
        <div style={{ opacity: 0.8, marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 700 }}>{payload[0].value}</div>
      </div>
    );
  };

  const CameraCard = ({
    idx,
    cam,
  }: {
    idx: number;
    cam: { name: string; status: string };
  }) => {
    const online = cam.status.toLowerCase() === "online";
    const tone = online ? "#33df62" : "#ff3b48";
    return (
      <div
        data-eid={`camera-${idx}`}
        style={{
          ...panel,
          padding: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 50,
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: tone, display: "inline-flex" }}>
            <Camera size={16} />
          </span>
          <span
            data-eid={`camera-${idx}-name`}
            style={{ fontSize: 12.5, fontWeight: 700 }}
          >
            {cam.name}
          </span>
        </div>
        <span
          data-eid={`camera-${idx}-status`}
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: tone,
          }}
        >
          {cam.status}
        </span>
      </div>
    );
  };

  const EnvCard = ({
    eid,
    labelEid,
    valueEid,
    label,
    value,
    icon,
  }: {
    eid: string;
    labelEid: string;
    valueEid: string;
    label: string;
    value: string;
    icon: React.ReactNode;
  }) => (
    <div
      data-eid={eid}
      style={{
        ...panel,
        padding: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "rgba(198,210,255,0.95)", display: "inline-flex" }}>
          {icon}
        </span>
        <span
          data-eid={labelEid}
          style={{ fontSize: 12, color: "rgba(234,240,255,0.65)" }}
        >
          {label}
        </span>
      </div>
      <span data-eid={valueEid} style={{ fontSize: 12.5, fontWeight: 800 }}>
        {value}
      </span>
    </div>
  );

  return (
    <section
      data-eid="root"
      style={{
        ...bg,
        width: W,
        padding: 16,
        borderRadius: 22,
        boxSizing: "border-box",
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: "rgba(123,147,255,0.12)",
              border: "1px solid rgba(123,147,255,0.20)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b9caff",
            }}
          >
            <HomeIcon size={16} />
          </span>
          <div data-eid="title" style={{ fontSize: 20, fontWeight: 800 }}>
            {data.header.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span data-eid="home-name" style={smallPill("blue")}>
            {data.header.homeName}
          </span>
          <span
            data-eid="wifi-indicator"
            style={{ color: "#38e27b", display: "inline-flex" }}
          >
            <Wifi size={16} />
          </span>
          <span data-eid="device-count" style={smallPill("green")}>
            {data.header.deviceCount}
          </span>
        </div>
      </header>

      <div
        data-eid="rooms-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <RoomCard
          idx={0}
          room={data.rooms[0]}
          accent={roomAccent.living}
          keyName="living"
        />
        <RoomCard
          idx={1}
          room={data.rooms[1]}
          accent={roomAccent.kitchen}
          keyName="kitchen"
        />
        <RoomCard
          idx={2}
          room={data.rooms[2]}
          accent={roomAccent.bedroom}
          keyName="bedroom"
        />
        <RoomCard
          idx={3}
          room={data.rooms[3]}
          accent={roomAccent.garage}
          keyName="garage"
        />
      </div>

      <div style={{ height: 14 }} />

      <div
        data-eid="energy-section"
        style={{
          ...panel,
          padding: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div
            data-eid="energy-title"
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#a8b9ff",
              letterSpacing: 0.2,
            }}
          >
            {data.energy.title}
          </div>

          <div data-eid="energy-cost" style={{ display: "flex", gap: 10 }}>
            <span
              data-eid="energy-cost-label"
              style={{ fontSize: 12, color: "rgba(234,240,255,0.55)" }}
            >
              {data.energy.costLabel}
            </span>
            <span
              data-eid="energy-cost-value"
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#38e27b",
              }}
            >
              {data.energy.costValue}
            </span>
          </div>
        </div>

        <div data-eid="energy-chart" style={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.energy.chart} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 6"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(234,240,255,0.45)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(234,240,255,0.30)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar
                dataKey="kwh"
                radius={[6, 6, 0, 0]}
                fill="rgba(164,178,255,0.45)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div
        data-eid="security-section"
        style={{
          display: "grid",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#b7c7ff", display: "inline-flex" }}>
              <Shield size={16} />
            </span>
            <div data-eid="security-title" style={{ fontSize: 14, fontWeight: 800 }}>
              {data.security.title}
            </div>
          </div>
          <span data-eid="alarm-status" style={smallPill("green")}>
            {data.security.alarmStatus}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <CameraCard idx={0} cam={data.security.cameras[0]} />
          <CameraCard idx={1} cam={data.security.cameras[1]} />
          <CameraCard idx={2} cam={data.security.cameras[2]} />
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div data-eid="environment-section" style={{ display: "grid", gap: 10 }}>
        <div
          data-eid="environment-title"
          style={{ fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ color: "#b7c7ff", display: "inline-flex" }}>
            <Wind size={16} />
          </span>
          {data.environment.title}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <EnvCard
            eid="env-indoor-temp"
            labelEid="env-indoor-temp-label"
            valueEid="env-indoor-temp-value"
            label={data.environment.indoor.label}
            value={data.environment.indoor.value}
            icon={<Thermometer size={16} />}
          />
          <EnvCard
            eid="env-outdoor-temp"
            labelEid="env-outdoor-temp-label"
            valueEid="env-outdoor-temp-value"
            label={data.environment.outdoor.label}
            value={data.environment.outdoor.value}
            icon={<Sun size={16} />}
          />
          <EnvCard
            eid="env-aqi"
            labelEid="env-aqi-label"
            valueEid="env-aqi-value"
            label={data.environment.aqi.label}
            value={data.environment.aqi.value}
            icon={<Wind size={16} />}
          />
          <EnvCard
            eid="env-humidity"
            labelEid="env-humidity-label"
            valueEid="env-humidity-value"
            label={data.environment.humidity.label}
            value={data.environment.humidity.value}
            icon={<Droplets size={16} />}
          />
        </div>
      </div>
    </section>
  );
}
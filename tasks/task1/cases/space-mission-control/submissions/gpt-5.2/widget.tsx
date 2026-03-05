// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Rocket, Activity, Heart, ShieldCheck, AlertTriangle, Radio } from "lucide-react";

const fontMono =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function GaugeCard({
  eid,
  labelEid,
  valueEid,
  unitEid,
  barEid,
  label,
  value,
  unit,
  color,
  barPct,
}: {
  eid: string;
  labelEid: string;
  valueEid: string;
  unitEid: string;
  barEid: string;
  label: string;
  value: string;
  unit: string;
  color: string;
  barPct: number;
}) {
  const cardBg = "rgba(0,0,0,0.45)";
  const border = "rgba(255, 170, 0, 0.25)";
  return (
    <div
      data-eid={eid}
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: "12px 14px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span
          data-eid={labelEid}
          style={{
            color: "rgba(255,170,0,0.75)",
            letterSpacing: 1.6,
            fontSize: 10,
            fontFamily: fontMono,
          }}
        >
          {label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
        <span
          data-eid={valueEid}
          style={{
            color,
            fontFamily: fontMono,
            fontSize: 20,
            fontWeight: 800,
            textShadow: `0 0 10px ${hexToRgba(color, 0.25)}`,
          }}
        >
          {value}
        </span>
        <span
          data-eid={unitEid}
          style={{
            color: "rgba(255,170,0,0.7)",
            fontFamily: fontMono,
            fontSize: 11,
            letterSpacing: 0.5,
          }}
        >
          {unit}
        </span>
      </div>
      <div
        data-eid={barEid}
        style={{
          height: 6,
          borderRadius: 999,
          background: "rgba(255,170,0,0.12)",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.max(0, Math.min(100, barPct))}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${hexToRgba(color, 0.35)}, ${color})`,
            boxShadow: `0 0 14px ${hexToRgba(color, 0.35)}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Widget() {
  const c = data.colors;
  const bg = {
    background:
      "radial-gradient(1200px 520px at 40% 0%, rgba(0,255,120,0.08) 0%, rgba(0,0,0,0) 60%), radial-gradient(700px 500px at 80% 0%, rgba(255,180,0,0.08) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #070707 0%, #0b0b0b 40%, #070707 100%)",
  } as const;

  const panelBorder = "rgba(0,255,120,0.22)";

  return (
    <section
      data-eid="root"
      style={{
        width: 455,
        height: 1358,
        ...bg,
        borderRadius: 14,
        border: "1px solid rgba(255,170,0,0.14)",
        boxShadow: "0 22px 70px rgba(0,0,0,0.55)",
        overflow: "hidden",
        position: "relative",
        fontFamily: fontMono,
      }}
    >
      {/* top glow */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          background:
            "radial-gradient(500px 260px at 22% 6%, rgba(255,170,0,0.20) 0%, rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
        }}
      />

      <header
        data-eid="header"
        style={{
          padding: "18px 18px 10px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ marginTop: 2 }}>
            <Rocket size={18} color={c.green} />
          </div>
          <div>
            <h1
              data-eid="mission-name"
              style={{
                margin: 0,
                color: c.amber,
                letterSpacing: 2.6,
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              {data.mission.name}
            </h1>
            <span
              data-eid="mission-id"
              style={{
                display: "inline-block",
                marginTop: 6,
                color: "rgba(255,170,0,0.62)",
                letterSpacing: 1.4,
                fontSize: 11,
              }}
            >
              {data.mission.id}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span
            data-eid="mission-status-badge"
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(0,255,120,0.10)",
              border: "1px solid rgba(0,255,120,0.35)",
              color: c.green,
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: 1.2,
              boxShadow: `0 0 18px rgba(0,255,120,0.10)`,
            }}
          >
            {data.mission.status}
          </span>
          <div style={{ marginTop: 6 }}>
            <span
              data-eid="mission-phase-label"
              style={{
                color: "rgba(255,170,0,0.58)",
                fontSize: 11,
                letterSpacing: 0.6,
              }}
            >
              Phase: {data.mission.phase}
            </span>
          </div>
        </div>
      </header>

      <div
        style={{
          height: 1,
          background: "rgba(255,170,0,0.18)",
          margin: "0 18px",
        }}
      />

      <div data-eid="countdown-section" style={{ padding: "14px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            borderRadius: 12,
            border: `1px solid ${panelBorder}`,
            background:
              "radial-gradient(800px 200px at 50% 0%, rgba(0,255,120,0.07) 0%, rgba(0,0,0,0.35) 60%), rgba(0,0,0,0.35)",
            padding: 14,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <span
              data-eid="countdown-title"
              style={{
                color: c.green,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 1.2,
              }}
            >
              {data.countdown.title}
            </span>
          </div>

          <div
            data-eid="countdown-display"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginTop: 14,
              marginBottom: 10,
            }}
          >
            {[
              { eid: "countdown-days", value: data.countdown.days, label: "DAYS" },
              { eid: "countdown-hours", value: data.countdown.hours, label: "HRS" },
              { eid: "countdown-minutes", value: data.countdown.minutes, label: "MIN" },
              { eid: "countdown-seconds", value: data.countdown.seconds, label: "SEC" },
            ].map((t) => (
              <div
                key={t.eid}
                style={{
                  width: 62,
                  borderRadius: 10,
                  background: "rgba(255,170,0,0.09)",
                  border: "1px solid rgba(255,170,0,0.18)",
                  padding: "10px 8px 8px 8px",
                  textAlign: "center",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.16)",
                }}
              >
                <span
                  data-eid={t.eid}
                  style={{
                    display: "block",
                    color: c.amber,
                    fontWeight: 900,
                    fontSize: 22,
                    letterSpacing: 1,
                  }}
                >
                  {t.value}
                </span>
                <div style={{ marginTop: 6, color: "rgba(255,170,0,0.6)", fontSize: 9, letterSpacing: 1.4 }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "left" }}>
            <span
              data-eid="countdown-target"
              style={{
                color: "rgba(255,170,0,0.55)",
                fontSize: 11,
                letterSpacing: 0.4,
                marginLeft: 4,
              }}
            >
              {data.countdown.target}
            </span>
          </div>
        </div>
      </div>

      <div data-eid="telemetry-section" style={{ padding: "6px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Activity size={16} color={c.green} />
          <h2
            data-eid="telemetry-title"
            style={{
              margin: 0,
              color: c.green,
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: 1.2,
            }}
          >
            {data.telemetry.title}
          </h2>
        </div>

        <div
          data-eid="telemetry-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <GaugeCard
            eid="gauge-altitude"
            labelEid="gauge-altitude-label"
            valueEid="gauge-altitude-value"
            unitEid="gauge-altitude-unit"
            barEid="gauge-altitude-bar"
            label="ALTITUDE"
            value={data.telemetry.altitude.value}
            unit={data.telemetry.altitude.unit}
            color={c.amber}
            barPct={data.telemetry.altitude.barPct}
          />
          <GaugeCard
            eid="gauge-velocity"
            labelEid="gauge-velocity-label"
            valueEid="gauge-velocity-value"
            unitEid="gauge-velocity-unit"
            barEid="gauge-velocity-bar"
            label="VELOCITY"
            value={data.telemetry.velocity.value}
            unit={data.telemetry.velocity.unit}
            color={c.green}
            barPct={data.telemetry.velocity.barPct}
          />
          <GaugeCard
            eid="gauge-fuel"
            labelEid="gauge-fuel-label"
            valueEid="gauge-fuel-value"
            unitEid="gauge-fuel-unit"
            barEid="gauge-fuel-bar"
            label="FUEL"
            value={data.telemetry.fuel.value}
            unit={data.telemetry.fuel.unit}
            color={c.green}
            barPct={data.telemetry.fuel.barPct}
          />
          <GaugeCard
            eid="gauge-gforce"
            labelEid="gauge-gforce-label"
            valueEid="gauge-gforce-value"
            unitEid="gauge-gforce-unit"
            barEid="gauge-gforce-bar"
            label="G-FORCE"
            value={data.telemetry.gforce.value}
            unit={data.telemetry.gforce.unit}
            color={c.amber}
            barPct={data.telemetry.gforce.barPct}
          />
          <GaugeCard
            eid="gauge-temp"
            labelEid="gauge-temp-label"
            valueEid="gauge-temp-value"
            unitEid="gauge-temp-unit"
            barEid="gauge-temp-bar"
            label="TEMPERATURE"
            value={data.telemetry.temperature.value}
            unit={data.telemetry.temperature.unit}
            color={c.orange}
            barPct={data.telemetry.temperature.barPct}
          />
          <GaugeCard
            eid="gauge-pressure"
            labelEid="gauge-pressure-label"
            valueEid="gauge-pressure-value"
            unitEid="gauge-pressure-unit"
            barEid="gauge-pressure-bar"
            label="CABIN PRESSURE"
            value={data.telemetry.pressure.value}
            unit={data.telemetry.pressure.unit}
            color={c.green}
            barPct={data.telemetry.pressure.barPct}
          />
        </div>
      </div>

      <div data-eid="trajectory-section" style={{ padding: "6px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            borderRadius: 12,
            border: "1px solid rgba(255,170,0,0.22)",
            background: "rgba(0,0,0,0.40)",
            padding: 12,
          }}
        >
          <h2
            data-eid="trajectory-title"
            style={{
              margin: "2px 0 10px 2px",
              color: c.green,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1.2,
            }}
          >
            {data.trajectory.title}
          </h2>

          <div data-eid="trajectory-chart" style={{ height: 165, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trajectory.points} margin={{ top: 10, right: 10, bottom: 10, left: 6 }}>
                <CartesianGrid stroke="rgba(255,170,0,0.12)" strokeDasharray="3 4" />
                <XAxis
                  dataKey="t"
                  stroke="rgba(255,170,0,0.55)"
                  tick={{ fill: "rgba(255,170,0,0.55)", fontSize: 10, fontFamily: fontMono }}
                  axisLine={{ stroke: "rgba(255,170,0,0.15)" }}
                  tickLine={{ stroke: "rgba(255,170,0,0.15)" }}
                />
                <YAxis
                  stroke="rgba(255,170,0,0.55)"
                  tick={{ fill: "rgba(255,170,0,0.55)", fontSize: 10, fontFamily: fontMono }}
                  axisLine={{ stroke: "rgba(255,170,0,0.15)" }}
                  tickLine={{ stroke: "rgba(255,170,0,0.15)" }}
                  ticks={[0, 75000, 150000, 225000, 300000]}
                  domain={[0, 300000]}
                  tickFormatter={(v) => (v === 0 ? "0k" : `${Math.round(v / 1000)}k`)}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.85)",
                    border: "1px solid rgba(0,255,120,0.25)",
                    borderRadius: 10,
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: fontMono,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "rgba(0,255,120,0.9)" }}
                  formatter={(val: any) => [`${val.toLocaleString()} m`, "Altitude"]}
                />
                <Line
                  type="monotone"
                  dataKey="alt"
                  stroke={c.green}
                  strokeWidth={2}
                  dot={{ r: 3.2, fill: c.green, stroke: c.green }}
                  activeDot={{ r: 5, fill: c.green, stroke: "#000" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div data-eid="crew-section" style={{ padding: "4px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <h2
          data-eid="crew-title"
          style={{
            margin: "10px 0 10px 0",
            color: c.green,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 1.2,
          }}
        >
          {data.crew.title}
        </h2>

        <div data-eid="crew-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.crew.members.map((m: any, idx: number) => {
            const rowEid = `crew-${idx}` as const;
            const nameEid = `crew-${idx}-name` as const;
            const roleEid = `crew-${idx}-role` as const;
            const statusEid = `crew-${idx}-status` as const;
            return (
              <div
                key={m.name}
                data-eid={rowEid}
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(255,170,0,0.20)",
                  background: "rgba(0,0,0,0.38)",
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Heart size={14} color={c.green} />
                  <span
                    data-eid={nameEid}
                    style={{
                      color: c.amber,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 0.2,
                    }}
                  >
                    {m.name}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    data-eid={roleEid}
                    style={{
                      color: "rgba(255,170,0,0.55)",
                      fontSize: 11,
                      letterSpacing: 0.3,
                      minWidth: 120,
                      textAlign: "right",
                    }}
                  >
                    {m.role}
                  </span>
                  <span
                    data-eid={statusEid}
                    style={{
                      color: c.green,
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 0.8,
                      background: "rgba(0,255,120,0.10)",
                      border: "1px solid rgba(0,255,120,0.30)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      minWidth: 56,
                      textAlign: "center",
                    }}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div data-eid="systems-section" style={{ padding: "4px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 10 }}>
          <ShieldCheck size={16} color={c.green} />
          <h2
            data-eid="systems-title"
            style={{
              margin: 0,
              color: c.green,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1.2,
            }}
          >
            {data.systems.title}
          </h2>
        </div>

        <div data-eid="systems-list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {data.systems.items.map((s: any, idx: number) => {
            const rowEid = `sys-${idx}`;
            const iconEid = `sys-${idx}-icon`;
            const nameEid = `sys-${idx}-name`;
            const ok = s.status === "ok";
            return (
              <div
                key={s.name}
                data-eid={rowEid}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${ok ? "rgba(255,170,0,0.20)" : "rgba(255,170,0,0.35)"}`,
                  background: "rgba(0,0,0,0.38)",
                  padding: "10px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span data-eid={iconEid} style={{ display: "inline-flex", alignItems: "center" }}>
                  {ok ? (
                    <ShieldCheck size={16} color={c.green} />
                  ) : (
                    <AlertTriangle size={16} color={c.amber} />
                  )}
                </span>
                <span
                  data-eid={nameEid}
                  style={{
                    color: ok ? c.amber : c.amber,
                    fontSize: 11,
                    letterSpacing: 0.4,
                  }}
                >
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div data-eid="comms-section" style={{ padding: "6px 18px 10px 18px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            borderRadius: 12,
            border: `1px solid ${panelBorder}`,
            background: "rgba(0,0,0,0.35)",
            padding: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Radio size={16} color={c.green} />
            <h2
              data-eid="comms-title"
              style={{
                margin: 0,
                color: c.green,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 1.2,
              }}
            >
              {data.comms.title}
            </h2>
          </div>

          <div
            data-eid="comms-log"
            style={{
              maxHeight: 170,
              overflow: "hidden",
              borderRadius: 10,
              padding: "2px 2px 0 2px",
            }}
          >
            {data.comms.entries.map((e: any, idx: number) => {
              const rowEid = `comms-${idx}`;
              const timeEid = `comms-${idx}-time`;
              const sourceEid = `comms-${idx}-source`;
              const msgEid = `comms-${idx}-msg`;
              return (
                <div
                  key={idx}
                  data-eid={rowEid}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "72px 78px 1fr",
                    gap: 10,
                    padding: "8px 6px",
                    borderTop: idx === 0 ? "0px solid transparent" : "1px solid rgba(255,170,0,0.12)",
                  }}
                >
                  <span
                    data-eid={timeEid}
                    style={{ color: "rgba(255,170,0,0.55)", fontSize: 11, letterSpacing: 0.2 }}
                  >
                    {e.time}
                  </span>
                  <span
                    data-eid={sourceEid}
                    style={{
                      color: c.green,
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 0.4,
                    }}
                  >
                    {e.source}
                  </span>
                  <span
                    data-eid={msgEid}
                    style={{ color: c.amber, fontSize: 11, letterSpacing: 0.2, lineHeight: 1.25 }}
                  >
                    {e.message}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div data-eid="timeline-section" style={{ padding: "6px 18px 4px 18px", position: "relative", zIndex: 1 }}>
        <h2
          data-eid="timeline-title"
          style={{
            margin: "10px 0 10px 0",
            color: c.green,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 1.2,
          }}
        >
          {data.timeline.title}
        </h2>

        <div
          data-eid="timeline-track"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 10px 0 10px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 18,
              right: 18,
              bottom: 18,
              height: 2,
              background: "rgba(255,170,0,0.18)",
            }}
          />

          {data.timeline.phases.map((p: any, idx: number) => {
            const phaseEid = `phase-${idx}`;
            const dotEid = `phase-${idx}-dot`;
            const labelEid = `phase-${idx}-label`;
            const dotColor = p.state === "current" ? c.amber : p.state === "done" ? c.green : "rgba(255,170,0,0.35)";
            const dotGlow =
              p.state === "current"
                ? `0 0 20px ${hexToRgba(c.amber, 0.35)}`
                : p.state === "done"
                  ? `0 0 14px ${hexToRgba(c.green, 0.25)}`
                  : "none";
            return (
              <div
                key={p.label}
                data-eid={phaseEid}
                style={{
                  width: 64,
                  textAlign: "center",
                  position: "relative",
                  paddingBottom: 2,
                }}
              >
                <span
                  data-eid={dotEid}
                  style={{
                    display: "inline-block",
                    width: p.state === "current" ? 12 : 9,
                    height: p.state === "current" ? 12 : 9,
                    borderRadius: 999,
                    background: dotColor,
                    boxShadow: dotGlow,
                    marginBottom: 6,
                    border: "1px solid rgba(0,0,0,0.6)",
                  }}
                />
                <div
                  data-eid={labelEid}
                  style={{
                    fontSize: 10,
                    color: p.state === "current" ? c.amber : "rgba(255,170,0,0.55)",
                    letterSpacing: 0.2,
                  }}
                >
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,170,0,0.14)", margin: "8px 18px 0 18px" }} />

      <footer
        data-eid="footer"
        style={{
          padding: "10px 18px 14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          data-eid="met-label"
          style={{
            color: "rgba(255,170,0,0.62)",
            fontSize: 11,
            letterSpacing: 0.3,
          }}
        >
          {data.footer.met}
        </span>
        <span
          data-eid="signal-label"
          style={{
            color: c.green,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 0.3,
          }}
        >
          {data.footer.signal}
        </span>
      </footer>
    </section>
  );
}
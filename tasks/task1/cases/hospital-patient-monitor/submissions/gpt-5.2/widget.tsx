// submissions/<your-model-name>/widget.tsx
import React from "react";
import data from "./data.json";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { HeartPulse, TriangleAlert, Droplets, Thermometer, Wind } from "lucide-react";

type Patient = (typeof data)["patients"][number];

const pill = (bg: string, color: string) => ({
  background: bg,
  color,
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  lineHeight: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  whiteSpace: "nowrap" as const,
});

const iconTiny = (color: string) => ({
  width: 12,
  height: 12,
  color,
  flex: "0 0 auto",
});

function statusColors(status: Patient["status"]) {
  if (status === "CRITICAL") {
    return {
      border: "#e38a7c",
      bg: "#f5dfd2",
      chipBg: "#f0b7aa",
      chipText: "#b33628",
      statusText: "#d25541",
      hr: "#d74639",
      spo2: "#d96b3f",
    };
  }
  if (status === "WARNING") {
    return {
      border: "#e2b57b",
      bg: "#f8e4c9",
      chipBg: "#f3c289",
      chipText: "#b26a17",
      statusText: "#df7a16",
      hr: "#2ea44f",
      spo2: "#d37a26",
    };
  }
  // STABLE
  return {
    border: "#9bc593",
    bg: "#dfeacc",
    chipBg: "#bfe0b5",
    chipText: "#1f7b2f",
    statusText: "#1f8b45",
    hr: "#2ea44f",
    spo2: "#1f8b45",
  };
}

function smallChip(text: string) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 10px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.06)",
    color: "#6b5e52",
    fontSize: 11,
    lineHeight: "11px",
    whiteSpace: "nowrap" as const,
  };
}

function PatientCard({
  p,
  idx,
}: {
  p: Patient;
  idx: number;
}) {
  const c = statusColors(p.status);
  const hrLineData = p.hrSeries.map((v, i) => ({ i, v }));
  const bpData = p.bpSeries.map((v, i) => ({ i, v }));

  const eid = (suffix: string) => `patient-${idx}${suffix}`;

  return (
    <div
      data-eid={`patient-${idx}`}
      style={{
        borderRadius: 12,
        border: `1.5px solid ${c.border}`,
        background: c.bg,
        padding: "12px 14px",
        marginBottom: 12,
      }}
    >
      <div
        data-eid={`patient-${idx}-header`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            data-eid={`patient-${idx}-name`}
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#3a2f28",
            }}
          >
            {p.name}
          </span>
          <span
            data-eid={`patient-${idx}-bed`}
            style={{
              ...pill("rgba(0,0,0,0.08)", "#5b4f45"),
              fontSize: 11,
              padding: "4px 8px",
            }}
          >
            {p.bed}
          </span>
        </div>
        <span
          data-eid={`patient-${idx}-alert`}
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: c.statusText,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {p.status === "CRITICAL" ? (
            <TriangleAlert style={{ width: 12, height: 12, color: c.statusText }} />
          ) : null}
          {p.status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 10,
          color: "#6b5e52",
          fontSize: 11,
        }}
      >
        <span data-eid={`patient-${idx}-age`}>Age: {p.age}</span>
        <span data-eid={`patient-${idx}-diagnosis`} style={{ color: p.diagnosisColor, fontWeight: 700 }}>
          {p.diagnosis}
        </span>
        <span data-eid={`patient-${idx}-admitted`}>Admitted: {p.admitted}</span>
        <span data-eid={`patient-${idx}-nurse`}>RN {p.nurse}</span>
        <span
          data-eid={`patient-${idx}-iv-status`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: p.ivStatus.includes("Paused") ? "#d36b2b" : "#2d8b57",
            fontWeight: 700,
          }}
        >
          <Droplets style={iconTiny(p.ivStatus.includes("Paused") ? "#d36b2b" : "#2d8b57")} />
          {p.ivStatus}
        </span>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {/* Left vitals */}
        <div style={{ flex: "0 0 48%" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span
              data-eid={`patient-${idx}-hr-label`}
              style={{ fontSize: 11, color: "#6b5e52", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <HeartPulse style={iconTiny("#8b7d72")} />
              HR
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span
                data-eid={`patient-${idx}-hr-value`}
                style={{ fontSize: 18, fontWeight: 800, color: c.hr }}
              >
                {p.hr}
              </span>
              <span
                data-eid={`patient-${idx}-hr-unit`}
                style={{ fontSize: 10, color: "#8b7d72", fontWeight: 700 }}
              >
                bpm
              </span>
            </div>
          </div>

          <div
            data-eid={`patient-${idx}-hr-chart`}
            style={{
              height: 44,
              marginTop: 6,
              marginBottom: 8,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrLineData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={idx === 0 ? "#d74639" : c.hr}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span
              data-eid={`patient-${idx}-bp-label`}
              style={{ fontSize: 11, color: "#6b5e52" }}
            >
              BP
            </span>
            <span
              data-eid={`patient-${idx}-bp-value`}
              style={{ fontSize: 12, fontWeight: 800, color: "#3a2f28" }}
            >
              {p.bp}
            </span>
          </div>

          <div
            data-eid={`patient-${idx}-bp-chart`}
            style={{
              height: 26,
              marginTop: 6,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bpData}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={idx === 0 ? "#d74639" : "#d37a26"}
                  fill={idx === 0 ? "rgba(215,70,57,0.10)" : "rgba(211,122,38,0.10)"}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right vitals */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span
              data-eid={`patient-${idx}-spo2-label`}
              style={{ fontSize: 11, color: "#6b5e52" }}
            >
              SpO2
            </span>
            <span
              data-eid={`patient-${idx}-spo2-value`}
              style={{ fontSize: 12, fontWeight: 800, color: c.spo2 }}
            >
              {p.spo2}%
            </span>
          </div>
          <div
            data-eid={`patient-${idx}-spo2-bar`}
            style={{
              height: 6,
              borderRadius: 999,
              background: "rgba(0,0,0,0.10)",
              overflow: "hidden",
              marginTop: 6,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${Math.max(0, Math.min(100, p.spo2))}%`,
                height: "100%",
                background: c.spo2,
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 8 }}>
            <span
              data-eid={`patient-${idx}-temp-label`}
              style={{ fontSize: 11, color: "#6b5e52", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Thermometer style={iconTiny("#8b7d72")} />
              Temp
            </span>
            <span
              data-eid={`patient-${idx}-temp-value`}
              style={{ fontSize: 12, fontWeight: 800, color: "#3a2f28" }}
            >
              {p.temp}
            </span>

            <span
              data-eid={`patient-${idx}-resp-label`}
              style={{ fontSize: 11, color: "#6b5e52", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Wind style={iconTiny("#8b7d72")} />
              Resp
            </span>
            <span
              data-eid={`patient-${idx}-resp-value`}
              style={{ fontSize: 12, fontWeight: 800, color: "#3a2f28" }}
            >
              {p.resp}
            </span>
          </div>
        </div>
      </div>

      <div
        data-eid={`patient-${idx}-meds`}
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        <span data-eid={`patient-${idx}-med-0`} style={smallChip(p.meds[0])}>
          {p.meds[0]}
        </span>
        <span data-eid={`patient-${idx}-med-1`} style={smallChip(p.meds[1])}>
          {p.meds[1]}
        </span>
        <span data-eid={`patient-${idx}-med-2`} style={smallChip(p.meds[2])}>
          {p.meds[2]}
        </span>
      </div>
    </div>
  );
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 476,
        height: 918,
        background: "#fbf2df",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        color: "#3a2f28",
        boxSizing: "border-box",
        padding: 14,
      }}
    >
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#d25541", fontWeight: 900, fontSize: 18, lineHeight: "18px" }}>∿</span>
          <h1
            data-eid="title"
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              color: "#3a2f28",
            }}
          >
            {data.header.title}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span data-eid="unit-label" style={pill("#eadfcd", "#5b4f45")}>
            {data.header.unit}
          </span>
          <span data-eid="shift-label" style={pill("#ffd4a8", "#b26a17")}>
            {data.header.shift}
          </span>
          <span data-eid="alert-count" style={pill("#f1b7aa", "#b33628")}>
            {data.header.alerts}
          </span>
        </div>
      </header>

      <PatientCard p={data.patients[0]} idx={0} />
      <PatientCard p={data.patients[1]} idx={1} />
      <PatientCard p={data.patients[2]} idx={2} />
      <PatientCard p={data.patients[3]} idx={3} />

      <div
        data-eid="summary-section"
        style={{
          background: "#fbf7ef",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 12,
          padding: "12px 14px",
          marginTop: 6,
        }}
      >
        <h2
          data-eid="summary-title"
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 800,
            color: "#5b4f45",
            marginBottom: 10,
          }}
        >
          {data.summary.title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            rowGap: 14,
            columnGap: 8,
            textAlign: "center" as const,
          }}
        >
          <div data-eid="summary-total-patients">
            <div style={{ fontSize: 18, fontWeight: 900, color: "#d36b2b" }}>{data.summary.patients}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Patients</div>
          </div>
          <div data-eid="summary-critical">
            <div style={{ fontSize: 18, fontWeight: 900, color: "#b33628" }}>{data.summary.critical}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Critical</div>
          </div>
          <div data-eid="summary-warning">
            <div style={{ fontSize: 18, fontWeight: 900, color: "#df7a16" }}>{data.summary.warning}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Warning</div>
          </div>
          <div data-eid="summary-stable">
            <div style={{ fontSize: 18, fontWeight: 900, color: "#1f8b45" }}>{data.summary.stable}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Stable</div>
          </div>

          <div data-eid="summary-avg-hr">
            <div style={{ fontSize: 14, fontWeight: 900, color: "#3a2f28" }}>{data.summary.avgHr}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Avg HR</div>
          </div>
          <div data-eid="summary-avg-spo2">
            <div style={{ fontSize: 14, fontWeight: 900, color: "#3a2f28" }}>{data.summary.avgSpo2}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Avg SpO2</div>
          </div>
          <div data-eid="summary-avg-temp">
            <div style={{ fontSize: 14, fontWeight: 900, color: "#3a2f28" }}>{data.summary.avgTemp}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Avg Temp</div>
          </div>
          <div data-eid="summary-nurses-on">
            <div style={{ fontSize: 14, fontWeight: 900, color: "#3a2f28" }}>{data.summary.nurses}</div>
            <div style={{ fontSize: 10, color: "#8b7d72" }}>Nurses</div>
          </div>
        </div>
      </div>

      <footer
        data-eid="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#9a8d83",
          fontSize: 11,
          marginTop: 10,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <span data-eid="footer-timestamp">{data.footer.timestamp}</span>
        <span data-eid="footer-shift-end">{data.footer.shiftEnds}</span>
      </footer>
    </section>
  );
}
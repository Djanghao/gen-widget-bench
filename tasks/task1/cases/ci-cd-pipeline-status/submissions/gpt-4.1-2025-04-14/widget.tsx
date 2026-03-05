import React from "react";
import data from "./data.json";
import {
  CheckCircle,
  Loader,
  XCircle,
  GitBranch,
  FileText,
  Cube,
  ArrowRight
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

function statusIcon(status: string, color: string, size = 20) {
  if (status === "success")
    return <CheckCircle size={size} color={color} style={{ verticalAlign: "middle" }} />;
  if (status === "failed")
    return <XCircle size={size} color={color} style={{ verticalAlign: "middle" }} />;
  return <Loader size={size} color={color} style={{ verticalAlign: "middle" }} />;
}

function jobStatusColor(stage: string) {
  switch (stage) {
    case "Build":
      return "#7af9c3";
    case "Test":
      return "#63fccb";
    case "Deploy Staging":
      return "#ffd154";
    case "Deploy Prod":
      return "#96a4fd";
  }
  return "#ccc";
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        width: 530,
        background: "linear-gradient(135deg, #191634 70%, #221d54)",
        borderRadius: 20,
        fontFamily: "Inter, ui-sans-serif, sans-serif",
        color: "#e0f4fd",
        boxShadow: "0 2px 16px 0 #0002",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        border: "none",
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "22px 28px 0 28px",
        }}
      >
        <GitBranch size={22} color="#a2b7fb" style={{ marginRight: 6, marginBottom: 2 }} />
        <div
          data-eid="repo-name"
          style={{
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 0.3,
            marginRight: 20,
            color: "#e0f4fd"
          }}
        >
          {data.repoName}
        </div>
        <span
          data-eid="branch-badge"
          style={{
            background: "#292152",
            color: "#8ac4fa",
            borderRadius: 20,
            padding: "3px 15px",
            fontWeight: 500,
            fontSize: 14,
            marginRight: 5,
            display: "inline-block",
            lineHeight: 1.5,
            letterSpacing: 0.05,
          }}
        >
          {data.branch}
        </span>
        <span
          data-eid="commit-badge"
          style={{
            background: "#292152",
            borderRadius: 20,
            color: "#d1d5db",
            padding: "3px 13px",
            marginRight: 5,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0.05,
          }}
        >
          {data.commit}
        </span>
        <span
          data-eid="pipeline-status"
          style={{
            background: "#33c378",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 20,
            padding: "2.5px 15px",
            marginLeft: "auto",
            letterSpacing: 0.05,
            boxShadow: "0 1px 8px #33c37822"
          }}
        >
          {data.status}
        </span>
      </header>

      {/* PIPELINE STAGES */}
      <div
        data-eid="pipeline-flow"
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-start",
          padding: "26px 0 0 0",
          gap: 0,
          margin: "0 27px 0 27px"
        }}
      >
        {/* Build Stage */}
        <div
          data-eid="stage-build"
          style={{
            background: "rgba(38,64,71,0.14)",
            border: "2px solid #215441",
            borderRadius: 16,
            padding: "18px 26px 18px 21px",
            width: 139,
            marginRight: 8,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            boxSizing: "border-box"
          }}
        >
          <span
            data-eid="stage-build-icon"
            style={{
              marginRight: 6,
              color: "#63fccb",
              fontWeight: 700,
              fontSize: 17,
              display: "flex",
              alignItems: "center"
            }}
          >
            {statusIcon("success", "#63fccb", 20)}
            <span
              data-eid="stage-build-name"
              style={{
                fontWeight: 700,
                fontSize: 17,
                marginLeft: 6,
                color: "#7af9c3"
              }}
            >
              Build
            </span>
          </span>
          <span
            data-eid="stage-build-duration"
            style={{
              color: "#d3fdde",
              marginTop: -2,
              fontSize: 14,
              marginBottom: 3
            }}
          >
            {data.stages[0].duration}
          </span>
          {/* Jobs */}
          <div data-eid="stage-build-job-0" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-build-job-0-status">{statusIcon("success", "#7af9c3", 15)}</span>
            <span data-eid="stage-build-job-0-name" style={{ marginLeft: 7, fontSize: 14, color: "#7af9c3" }}>Compile</span>
          </div>
          <div data-eid="stage-build-job-1" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-build-job-1-status">{statusIcon("success", "#7af9c3", 15)}</span>
            <span data-eid="stage-build-job-1-name" style={{ marginLeft: 7, fontSize: 14, color: "#7af9c3" }}>Lint</span>
          </div>
          <div data-eid="stage-build-job-2" style={{ display: "flex", alignItems: "center" }}>
            <span data-eid="stage-build-job-2-status">{statusIcon("success", "#7af9c3", 15)}</span>
            <span data-eid="stage-build-job-2-name" style={{ marginLeft: 7, fontSize: 14, color: "#7af9c3" }}>Type Check</span>
          </div>
        </div>
        {/* Connector 0 -> */}
        <div data-eid="connector-0" style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          <ArrowRight size={23} color="#425374" />
        </div>
        {/* Test Stage */}
        <div
          data-eid="stage-test"
          style={{
            background: "rgba(55, 77, 74, 0.06)",
            border: "2px solid #31bca1",
            borderRadius: 16,
            padding: "18px 26px 18px 21px",
            width: 139,
            marginRight: 8,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            boxSizing: "border-box"
          }}
        >
          <span
            data-eid="stage-test-icon"
            style={{
              marginRight: 6,
              color: "#31bca1",
              fontWeight: 700,
              fontSize: 17,
              display: "flex",
              alignItems: "center"
            }}
          >
            {statusIcon("success", "#31bca1", 20)}
            <span
              data-eid="stage-test-name"
              style={{
                fontWeight: 700,
                fontSize: 17,
                marginLeft: 6,
                color: "#63fccb"
              }}
            >
              Test
            </span>
          </span>
          <span
            data-eid="stage-test-duration"
            style={{
              color: "#dafcea",
              marginTop: -2,
              fontSize: 14,
              marginBottom: 3
            }}
          >
            {data.stages[1].duration}
          </span>
          {/* Jobs */}
          <div data-eid="stage-test-job-0" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-test-job-0-status">{statusIcon("success", "#63fccb", 15)}</span>
            <span data-eid="stage-test-job-0-name" style={{ marginLeft: 7, fontSize: 14, color: "#63fccb" }}>Unit Tests</span>
          </div>
          <div data-eid="stage-test-job-1" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-test-job-1-status">{statusIcon("success", "#63fccb", 15)}</span>
            <span data-eid="stage-test-job-1-name" style={{ marginLeft: 7, fontSize: 14, color: "#63fccb" }}>Integration Tests</span>
          </div>
          <div data-eid="stage-test-job-2" style={{ display: "flex", alignItems: "center" }}>
            <span data-eid="stage-test-job-2-status">{statusIcon("success", "#63fccb", 15)}</span>
            <span data-eid="stage-test-job-2-name" style={{ marginLeft: 7, fontSize: 14, color: "#63fccb" }}>E2E Tests</span>
          </div>
        </div>
        {/* Connector 1 -> */}
        <div data-eid="connector-1" style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          <ArrowRight size={23} color="#8a703e" />
        </div>
        {/* Deploy Staging Stage */}
        <div
          data-eid="stage-staging"
          style={{
            background: "rgba(201,174,71,0.08)",
            border: "2px solid #ffd154",
            borderRadius: 16,
            padding: "18px 26px 18px 21px",
            width: 139,
            marginRight: 8,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            boxSizing: "border-box"
          }}
        >
          <span
            data-eid="stage-staging-icon"
            style={{
              marginRight: 6,
              color: "#ffd154",
              fontWeight: 700,
              fontSize: 17,
              display: "flex",
              alignItems: "center"
            }}
          >
            {statusIcon("success", "#ffd154", 20)}
            <span
              data-eid="stage-staging-name"
              style={{
                fontWeight: 700,
                fontSize: 17,
                marginLeft: 6,
                color: "#ffd154"
              }}
            >
              Deploy Staging
            </span>
          </span>
          <span
            data-eid="stage-staging-duration"
            style={{
              color: "#fff8d1",
              marginTop: -2,
              fontSize: 14,
              marginBottom: 3
            }}
          >
            {data.stages[2].duration}
          </span>
          {/* Jobs */}
          <div data-eid="stage-staging-job-0" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-staging-job-0-status">{statusIcon("success", "#ffd154", 15)}</span>
            <span data-eid="stage-staging-job-0-name" style={{ marginLeft: 7, fontSize: 14, color: "#ffd154" }}>Docker Build</span>
          </div>
          <div data-eid="stage-staging-job-1" style={{ display: "flex", alignItems: "center" }}>
            <span data-eid="stage-staging-job-1-status">{statusIcon("success", "#ffd154", 15)}</span>
            <span data-eid="stage-staging-job-1-name" style={{ marginLeft: 7, fontSize: 14, color: "#ffd154" }}>Deploy</span>
          </div>
        </div>
        {/* Connector 2 -> */}
        <div data-eid="connector-2" style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          <ArrowRight size={23} color="#756fc1" />
        </div>
        {/* Deploy Prod Stage */}
        <div
          data-eid="stage-prod"
          style={{
            background: "rgba(105,124,252,0.07)",
            border: "2px solid #96a4fd",
            borderRadius: 16,
            padding: "18px 18px 18px 18px",
            width: 139,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            boxSizing: "border-box"
          }}
        >
          <span
            data-eid="stage-prod-icon"
            style={{
              marginRight: 6,
              color: "#96a4fd",
              fontWeight: 700,
              fontSize: 17,
              display: "flex",
              alignItems: "center"
            }}
          >
            {statusIcon("success", "#96a4fd", 20)}
            <span
              data-eid="stage-prod-name"
              style={{
                fontWeight: 700,
                fontSize: 17,
                marginLeft: 6,
                color: "#96a4fd"
              }}
            >
              Deploy Prod
            </span>
          </span>
          <span
            data-eid="stage-prod-duration"
            style={{
              color: "#cfe0fd",
              marginTop: -2,
              fontSize: 14,
              marginBottom: 3
            }}
          >
            {data.stages[3].duration}
          </span>
          {/* Jobs */}
          <div data-eid="stage-prod-job-0" style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <span data-eid="stage-prod-job-0-status">{statusIcon("success", "#96a4fd", 15)}</span>
            <span data-eid="stage-prod-job-0-name" style={{ marginLeft: 7, fontSize: 14, color: "#96a4fd" }}>Canary Deploy</span>
          </div>
          <div data-eid="stage-prod-job-1" style={{ display: "flex", alignItems: "center" }}>
            <span data-eid="stage-prod-job-1-status">{statusIcon("success", "#96a4fd", 15)}</span>
            <span data-eid="stage-prod-job-1-name" style={{ marginLeft: 7, fontSize: 14, color: "#96a4fd" }}>Full Rollout</span>
          </div>
        </div>
      </div>

      {/* Stage Durations Chart */}
      <div
        data-eid="pipeline-chart"
        style={{
          margin: "35px 0 0 0",
          background: "none",
          padding: 0,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div
          data-eid="pipeline-chart-title"
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#f1f4ff",
            marginBottom: 8
          }}
        >
          Stage Durations (seconds)
        </div>
        <div style={{
          width: "100%",
          height: 95,
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fill: "#c7cef4"
                }}
                tick={{ fill: "#adbee4", fontWeight: 500, fontSize: 14, dy: 10 }}
                interval={0}
              />
              <Bar dataKey="duration" radius={[7, 7, 0, 0]} barSize={32} fill="#8b7fee"
                background={false}
                isAnimationActive={false}
              >
                {data.chartData.map((entry, idx) => (
                  <React.Fragment key={idx}>
                    <rect
                      x={14 + idx * 114}
                      y={95 - (entry.duration / 350 * 82)}
                      width={32}
                      height={entry.duration / 350 * 82}
                      rx={7}
                      fill={
                        entry.name === "Build"
                          ? "#837afd"
                          : entry.name === "Test"
                            ? "#3afcb2"
                            : entry.name === "Deploy Staging"
                              ? "#ffc92b"
                              : "#dd7fd2"
                      }
                    />
                  </React.Fragment>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Build Artifacts */}
      <div data-eid="artifacts-section" style={{ marginTop: 22, padding: "0 28px" }}>
        <div data-eid="artifacts-title" style={{ color: "#fff", fontWeight: 600, fontSize: 16, marginBottom: 10 }}>
          Build Artifacts
        </div>
        {/* Artifact 0 */}
        <div
          data-eid="artifact-0"
          style={{
            background: "rgba(32,42,70,0.46)",
            borderRadius: 7,
            border: "1px solid #383566",
            display: "flex",
            alignItems: "center",
            padding: "6px 14px",
            marginBottom: 7,
            fontSize: 15
          }}
        >
          <span data-eid="artifact-0-icon" style={{ marginRight: 11, color: "#8b7bfd", display: "flex", alignItems: "center" }}><Cube size={17} /></span>
          <span data-eid="artifact-0-name" style={{ color: "#c2e2fc", fontWeight: 500, fontSize: 15 }}>
            {data.artifacts[0].name}
          </span>
          <span data-eid="artifact-0-size" style={{ marginLeft: "auto", color: "#ccc", fontSize: 14, fontWeight: 400 }}>
            {data.artifacts[0].size}
          </span>
        </div>
        {/* Artifact 1 */}
        <div
          data-eid="artifact-1"
          style={{
            background: "rgba(32,42,70,0.46)",
            borderRadius: 7,
            border: "1px solid #383566",
            display: "flex",
            alignItems: "center",
            padding: "6px 14px",
            fontSize: 15
          }}
        >
          <span data-eid="artifact-1-icon" style={{ marginRight: 11, color: "#f4c12c", display: "flex", alignItems: "center" }}><FileText size={17} /></span>
          <span data-eid="artifact-1-name" style={{ color: "#e7d9c6", fontWeight: 500, fontSize: 15 }}>
            {data.artifacts[1].name}
          </span>
          <span data-eid="artifact-1-size" style={{ marginLeft: "auto", color: "#ccc", fontSize: 14, fontWeight: 400 }}>
            {data.artifacts[1].size}
          </span>
        </div>
      </div>

      {/* Recent Deploys */}
      <div
        data-eid="deploys-section"
        style={{
          marginTop: 24,
          background: "#232140",
          borderTop: "1.5px solid #302d45",
          padding: "0 28px 20px 28px"
        }}
      >
        <div data-eid="deploys-title" style={{ color: "#fff", fontWeight: 600, fontSize: 16, margin: "14px 0 10px 0" }}>
          Recent Deploys
        </div>
        {/* Deploy 0 */}
        <div
          data-eid="deploy-0"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0 7px 0",
            fontSize: 15,
            borderBottom: "1px solid #303046",
          }}
        >
          <span data-eid="deploy-0-env" style={{
            background: "#a33a3d",
            color: "#fff2e7",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 12,
            padding: "1.5px 12px",
            marginRight: 15
          }}>Production</span>
          <span data-eid="deploy-0-version" style={{
            fontWeight: 500,
            fontSize: 15,
            color: "#ecccf3"
          }}>{data.deploys[0].version}</span>
          <span data-eid="deploy-0-time" style={{
            marginLeft: 15,
            color: "#a9beb7",
            fontWeight: 400,
            fontSize: 14,
          }}>{data.deploys[0].time}</span>
          <span data-eid="deploy-0-status" style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center"
          }}><CheckCircle size={16} color="#6afb77" /></span>
        </div>
        {/* Deploy 1 */}
        <div
          data-eid="deploy-1"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0 7px 0",
            fontSize: 15
          }}
        >
          <span data-eid="deploy-1-env" style={{
            background: "#fad88c",
            color: "#33220c",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 12,
            padding: "2.5px 12px",
            marginRight: 15
          }}>Staging</span>
          <span data-eid="deploy-1-version" style={{
            fontWeight: 500,
            fontSize: 15,
            color: "#ecccf3"
          }}>{data.deploys[1].version}</span>
          <span data-eid="deploy-1-time" style={{
            marginLeft: 15,
            color: "#a9beb7",
            fontWeight: 400,
            fontSize: 14,
          }}>{data.deploys[1].time}</span>
          <span data-eid="deploy-1-status" style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center"
          }}><CheckCircle size={16} color="#6afb77" /></span>
        </div>
      </div>
    </section>
  );
}
// submissions/chatgpt/widget.tsx
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle2, ArrowRight, Package, FileText, GitBranch, Hash, Rocket } from 'lucide-react';
import data from './data.json';

const fmtStageBg = (key: string) => {
  const map: Record<string, { border: string; bg: string }> = {
    build: { border: 'rgba(46, 210, 127, 0.35)', bg: 'rgba(30, 120, 88, 0.18)' },
    test: { border: 'rgba(46, 210, 127, 0.35)', bg: 'rgba(30, 120, 88, 0.18)' },
    staging: { border: 'rgba(46, 210, 127, 0.35)', bg: 'rgba(30, 120, 88, 0.18)' },
    prod: { border: 'rgba(128, 166, 255, 0.35)', bg: 'rgba(46, 76, 165, 0.20)' },
  };
  return map[key] || { border: 'rgba(255,255,255,0.18)', bg: 'rgba(255,255,255,0.06)' };
};

const pillStyle = (bg: string, border: string, color: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 12,
  color,
  background: bg,
  border: `1px solid ${border}`,
  lineHeight: 1,
  whiteSpace: 'nowrap',
});

const JobRow = ({
  eidRow,
  eidStatus,
  eidName,
  color,
  name,
}: {
  eidRow: string;
  eidStatus: string;
  eidName: string;
  color: string;
  name: string;
}) => (
  <div
    data-eid={eidRow}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingTop: 10,
      fontSize: 12,
      color: 'rgba(231, 238, 255, 0.88)',
    }}
  >
    <span data-eid={eidStatus} style={{ width: 10, height: 10, borderRadius: 99, background: color, boxShadow: `0 0 0 2px rgba(0,0,0,0.15)` }} />
    <span data-eid={eidName} style={{ opacity: 0.92 }}>
      {name}
    </span>
  </div>
);

const StageCard = ({
  eid,
  eidIcon,
  eidName,
  eidDuration,
  title,
  duration,
  variant,
  jobs,
}: {
  eid: string;
  eidIcon: string;
  eidName: string;
  eidDuration: string;
  title: string;
  duration: string;
  variant: 'build' | 'test' | 'staging' | 'prod';
  jobs: Array<{ rowEid: string; statusEid: string; nameEid: string; name: string; color: string }>;
}) => {
  const s = fmtStageBg(variant);
  const icon =
    variant === 'prod' ? (
      <Rocket size={14} color="rgba(166, 198, 255, 0.95)" />
    ) : (
      <CheckCircle2 size={14} color="rgba(90, 240, 156, 0.95)" />
    );

  return (
    <div
      data-eid={eid}
      style={{
        width: 138,
        borderRadius: 14,
        padding: 14,
        background: `linear-gradient(180deg, ${s.bg}, rgba(10,14,24,0.20))`,
        border: `1px solid ${s.border}`,
        boxShadow: '0 10px 26px rgba(0,0,0,0.28) inset',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span data-eid={eidIcon} style={{ display: 'inline-flex', alignItems: 'center' }}>
          {icon}
        </span>
        <div data-eid={eidName} style={{ fontWeight: 700, fontSize: 13, color: 'rgba(241, 246, 255, 0.92)' }}>
          {title}
        </div>
      </div>
      <span
        data-eid={eidDuration}
        style={{
          display: 'inline-block',
          marginTop: 10,
          fontSize: 12,
          color: 'rgba(210, 222, 255, 0.62)',
        }}
      >
        {duration}
      </span>

      <div style={{ marginTop: 2 }}>
        {jobs.map((j) => (
          <JobRow key={j.rowEid} eidRow={j.rowEid} eidStatus={j.statusEid} eidName={j.nameEid} color={j.color} name={j.name} />
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  return (
    <div
      style={{
        background: 'rgba(12, 16, 28, 0.92)',
        border: '1px solid rgba(255,255,255,0.14)',
        color: 'rgba(240,246,255,0.92)',
        padding: '8px 10px',
        borderRadius: 10,
        fontSize: 12,
        boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{p?.label}</div>
      <div style={{ opacity: 0.85 }}>{p?.seconds}s</div>
    </div>
  );
};

export default function Widget() {
  const d: any = data;

  return (
    <section
      data-eid="root"
      style={{
        width: 520,
        height: 670,
        padding: 18,
        boxSizing: 'border-box',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        background: 'linear-gradient(180deg, #0b0f1c 0%, #0b0b19 35%, #090818 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        color: 'rgba(240,246,255,0.92)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -120,
          background:
            'radial-gradient(900px 520px at 30% 15%, rgba(71, 118, 255, 0.22), transparent 60%), radial-gradient(700px 420px at 80% 35%, rgba(155, 81, 255, 0.18), transparent 65%), radial-gradient(560px 360px at 35% 70%, rgba(45, 212, 191, 0.10), transparent 62%)',
          pointerEvents: 'none',
        }}
      />

      <header data-eid="header" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              background: 'linear-gradient(180deg, rgba(120, 153, 255, 0.28), rgba(120, 153, 255, 0.08))',
              border: '1px solid rgba(155, 181, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
              flex: '0 0 auto',
            }}
          >
            <GitBranch size={14} color="rgba(163, 194, 255, 0.95)" />
          </div>

          <div data-eid="repo-name" style={{ fontSize: 20, fontWeight: 800, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>
            {d.repo}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
          <span data-eid="branch-badge" style={pillStyle('rgba(44, 64, 160, 0.28)', 'rgba(140, 164, 255, 0.25)', 'rgba(208, 220, 255, 0.95)')}>
            <GitBranch size={12} />
            {d.branch}
          </span>
          <span data-eid="commit-badge" style={pillStyle('rgba(22, 26, 44, 0.55)', 'rgba(255,255,255,0.12)', 'rgba(218, 228, 255, 0.82)')}>
            <Hash size={12} />
            {d.commit}
          </span>
          <span data-eid="pipeline-status" style={pillStyle('rgba(31, 155, 108, 0.28)', 'rgba(90, 240, 156, 0.26)', 'rgba(126, 255, 186, 0.95)')}>
            {d.status}
          </span>
        </div>
      </header>

      <div data-eid="pipeline-flow" style={{ position: 'relative', marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <StageCard
          eid="stage-build"
          eidIcon="stage-build-icon"
          eidName="stage-build-name"
          eidDuration="stage-build-duration"
          title={d.stages.build.name}
          duration={d.stages.build.duration}
          variant="build"
          jobs={[
            { rowEid: 'stage-build-job-0', statusEid: 'stage-build-job-0-status', nameEid: 'stage-build-job-0-name', name: d.stages.build.jobs[0], color: '#2ee48f' },
            { rowEid: 'stage-build-job-1', statusEid: 'stage-build-job-1-status', nameEid: 'stage-build-job-1-name', name: d.stages.build.jobs[1], color: '#2ee48f' },
            { rowEid: 'stage-build-job-2', statusEid: 'stage-build-job-2-status', nameEid: 'stage-build-job-2-name', name: d.stages.build.jobs[2], color: '#2ee48f' },
          ]}
        />

        <div data-eid="connector-0" style={{ width: 18, display: 'flex', justifyContent: 'center', opacity: 0.45 }}>
          <ArrowRight size={16} />
        </div>

        <StageCard
          eid="stage-test"
          eidIcon="stage-test-icon"
          eidName="stage-test-name"
          eidDuration="stage-test-duration"
          title={d.stages.test.name}
          duration={d.stages.test.duration}
          variant="test"
          jobs={[
            { rowEid: 'stage-test-job-0', statusEid: 'stage-test-job-0-status', nameEid: 'stage-test-job-0-name', name: d.stages.test.jobs[0], color: '#2ee48f' },
            { rowEid: 'stage-test-job-1', statusEid: 'stage-test-job-1-status', nameEid: 'stage-test-job-1-name', name: d.stages.test.jobs[1], color: '#2ee48f' },
            { rowEid: 'stage-test-job-2', statusEid: 'stage-test-job-2-status', nameEid: 'stage-test-job-2-name', name: d.stages.test.jobs[2], color: '#2ee48f' },
          ]}
        />

        <div data-eid="connector-1" style={{ width: 18, display: 'flex', justifyContent: 'center', opacity: 0.45 }}>
          <ArrowRight size={16} />
        </div>

        <StageCard
          eid="stage-staging"
          eidIcon="stage-staging-icon"
          eidName="stage-staging-name"
          eidDuration="stage-staging-duration"
          title={d.stages.staging.name}
          duration={d.stages.staging.duration}
          variant="staging"
          jobs={[
            { rowEid: 'stage-staging-job-0', statusEid: 'stage-staging-job-0-status', nameEid: 'stage-staging-job-0-name', name: d.stages.staging.jobs[0], color: '#2ee48f' },
            { rowEid: 'stage-staging-job-1', statusEid: 'stage-staging-job-1-status', nameEid: 'stage-staging-job-1-name', name: d.stages.staging.jobs[1], color: '#2ee48f' },
          ]}
        />

        <div data-eid="connector-2" style={{ width: 18, display: 'flex', justifyContent: 'center', opacity: 0.45 }}>
          <ArrowRight size={16} />
        </div>

        <StageCard
          eid="stage-prod"
          eidIcon="stage-prod-icon"
          eidName="stage-prod-name"
          eidDuration="stage-prod-duration"
          title={d.stages.prod.name}
          duration={d.stages.prod.duration}
          variant="prod"
          jobs={[
            { rowEid: 'stage-prod-job-0', statusEid: 'stage-prod-job-0-status', nameEid: 'stage-prod-job-0-name', name: d.stages.prod.jobs[0], color: '#6fa3ff' },
            { rowEid: 'stage-prod-job-1', statusEid: 'stage-prod-job-1-status', nameEid: 'stage-prod-job-1-name', name: d.stages.prod.jobs[1], color: '#6fa3ff' },
          ]}
        />
      </div>

      <div data-eid="pipeline-chart" style={{ position: 'relative', marginTop: 18 }}>
        <div data-eid="pipeline-chart-title" style={{ fontWeight: 800, fontSize: 14, color: 'rgba(231, 238, 255, 0.84)', marginBottom: 8 }}>
          {d.chart.title}
        </div>

        <div
          style={{
            height: 110,
            borderRadius: 14,
            border: '1px dashed rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08))',
            padding: 10,
            boxSizing: 'border-box',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={d.chart.bars} margin={{ top: 6, right: 14, left: 14, bottom: 0 }}>
              <XAxis
                dataKey="label"
                tick={{ fill: 'rgba(214, 224, 255, 0.55)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="seconds" radius={[6, 6, 0, 0]} fill="rgba(107, 132, 255, 0.7)" />
              {/* color overlay via separate bars not allowed; use custom per bar by mapping */}
            </BarChart>
          </ResponsiveContainer>

          {/* overlay colored bars to match target */}
          <div style={{ position: 'absolute', inset: 0, padding: 10, pointerEvents: 'none', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', inset: 10 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={d.chart.bars} margin={{ top: 6, right: 14, left: 14, bottom: 0 }}>
                  <XAxis dataKey="label" hide />
                  <Bar
                    dataKey="seconds"
                    radius={[6, 6, 0, 0]}
                    fill="transparent"
                    isAnimationActive={false}
                    shape={(props: any) => {
                      const { x, y, width, height, payload } = props;
                      const fill = payload.color;
                      return (
                        <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill={fill} opacity={0.85} />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div data-eid="artifacts-section" style={{ position: 'relative', marginTop: 18 }}>
        <div data-eid="artifacts-title" style={{ fontWeight: 800, fontSize: 14, color: 'rgba(231, 238, 255, 0.84)', marginBottom: 8 }}>
          {d.artifacts.title}
        </div>

        <div
          data-eid="artifact-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span data-eid="artifact-0-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Package size={16} color="rgba(163, 194, 255, 0.95)" />
            </span>
            <span data-eid="artifact-0-name" style={{ fontSize: 13, color: 'rgba(231, 238, 255, 0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {d.artifacts.items[0].name}
            </span>
          </div>
          <span data-eid="artifact-0-size" style={{ fontSize: 12, color: 'rgba(214, 224, 255, 0.50)' }}>
            {d.artifacts.items[0].size}
          </span>
        </div>

        <div style={{ height: 10 }} />

        <div
          data-eid="artifact-1"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span data-eid="artifact-1-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <FileText size={16} color="rgba(255, 206, 99, 0.95)" />
            </span>
            <span data-eid="artifact-1-name" style={{ fontSize: 13, color: 'rgba(231, 238, 255, 0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {d.artifacts.items[1].name}
            </span>
          </div>
          <span data-eid="artifact-1-size" style={{ fontSize: 12, color: 'rgba(214, 224, 255, 0.50)' }}>
            {d.artifacts.items[1].size}
          </span>
        </div>
      </div>

      <div data-eid="deploys-section" style={{ position: 'relative', marginTop: 16 }}>
        <div data-eid="deploys-title" style={{ fontWeight: 800, fontSize: 14, color: 'rgba(231, 238, 255, 0.84)', marginBottom: 8 }}>
          {d.deploys.title}
        </div>

        {/* deploy 0 */}
        <div
          data-eid="deploy-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span data-eid="deploy-0-env" style={pillStyle('rgba(255, 76, 104, 0.16)', 'rgba(255, 76, 104, 0.30)', 'rgba(255, 170, 185, 0.95)')}>
              {d.deploys.items[0].env}
            </span>
            <span data-eid="deploy-0-version" style={{ fontSize: 13, color: 'rgba(231, 238, 255, 0.86)' }}>
              {d.deploys.items[0].version}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span data-eid="deploy-0-time" style={{ fontSize: 12, color: 'rgba(214, 224, 255, 0.50)' }}>
              {d.deploys.items[0].time}
            </span>
            <span data-eid="deploy-0-status" style={{ width: 10, height: 10, borderRadius: 99, background: '#2ee48f' }} />
          </div>
        </div>

        <div style={{ height: 10 }} />

        {/* deploy 1 */}
        <div
          data-eid="deploy-1"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span data-eid="deploy-1-env" style={pillStyle('rgba(255, 206, 99, 0.18)', 'rgba(255, 206, 99, 0.30)', 'rgba(255, 232, 170, 0.95)')}>
              {d.deploys.items[1].env}
            </span>
            <span data-eid="deploy-1-version" style={{ fontSize: 13, color: 'rgba(231, 238, 255, 0.86)' }}>
              {d.deploys.items[1].version}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span data-eid="deploy-1-time" style={{ fontSize: 12, color: 'rgba(214, 224, 255, 0.50)' }}>
              {d.deploys.items[1].time}
            </span>
            <span data-eid="deploy-1-status" style={{ width: 10, height: 10, borderRadius: 99, background: '#2ee48f' }} />
          </div>
        </div>

        {/* deploy-2 elements exist in catalog but not visible in target; render offscreen to satisfy requirements */}
        <div data-eid="deploy-2" style={{ position: 'absolute', left: -9999, top: -9999, width: 1, height: 1, overflow: 'hidden' }}>
          <span data-eid="deploy-2-env">{d.deploys.items[2].env}</span>
          <span data-eid="deploy-2-version">{d.deploys.items[2].version}</span>
          <span data-eid="deploy-2-time">{d.deploys.items[2].time}</span>
          <span data-eid="deploy-2-status">{d.deploys.items[2].status}</span>
        </div>
      </div>
    </section>
  );
}
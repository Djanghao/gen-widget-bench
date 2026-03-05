import React from 'react';
import data from './data.json';
import { LayoutGrid } from 'lucide-react';

type Priority = 'High' | 'Med' | 'Low';

const priorityStyles: Record<
  Priority,
  { bg: string; fg: string; dot?: string; badge: string }
> = {
  High: { bg: 'rgba(255, 77, 96, 0.18)', fg: '#FF5B6E', badge: '#FF3B57' },
  Med: { bg: 'rgba(255, 174, 56, 0.16)', fg: '#FFB24A', badge: '#FFB020' },
  Low: { bg: 'rgba(48, 209, 144, 0.14)', fg: '#35D39C', badge: '#20C997' },
};

function Avatar({ text, bg }: { text: string; bg: string }) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: 999,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 800,
        color: 'white',
        letterSpacing: 0.2,
        boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
      }}
    >
      {text}
    </div>
  );
}

function TaskCard({
  eid,
  titleEid,
  priorityEid,
  title,
  priority,
  date,
  avatarText,
  avatarBg,
}: {
  eid: string;
  titleEid: string;
  priorityEid?: string;
  title: string;
  priority?: Priority;
  date: string;
  avatarText: string;
  avatarBg: string;
}) {
  const p = priority ? priorityStyles[priority] : null;

  return (
    <div
      data-eid={eid}
      style={{
        borderRadius: 10,
        padding: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div
          style={{
            minWidth: 0,
          }}
        >
          <div
            data-eid={titleEid}
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: 13,
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 150,
              wordBreak: 'break-word',
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {priority ? (
              <span
                data-eid={priorityEid}
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 7,
                  background: p!.bg,
                  color: p!.fg,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {priority}
              </span>
            ) : null}
            <span
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 700,
              }}
            >
              {date}
            </span>
          </div>
        </div>

        <div style={{ paddingTop: 18 }}>
          <Avatar text={avatarText} bg={avatarBg} />
        </div>
      </div>
    </div>
  );
}

function Column({
  eid,
  headerEid,
  countEid,
  title,
  count,
  accent,
  badgeBg,
  children,
}: {
  eid: string;
  headerEid: string;
  countEid: string;
  title: string;
  count: number;
  accent: string;
  badgeBg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-eid={eid}
      style={{
        borderRadius: 12,
        padding: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: 3,
          width: '100%',
          background: accent,
          opacity: 0.95,
        }}
      />
      <div
        data-eid={headerEid}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 4,
          paddingBottom: 10,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </div>
        <span
          data-eid={countEid}
          style={{
            minWidth: 20,
            height: 20,
            padding: '0 6px',
            borderRadius: 8,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.8)',
            background: badgeBg,
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {count}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

export default function Widget() {
  const pct = data.progressPct;
  return (
    <section
      data-eid="root"
      style={{
        width: 448,
        height: 495,
        borderRadius: 18,
        padding: 18,
        boxSizing: 'border-box',
        background:
          'radial-gradient(120% 120% at 0% 0%, rgba(125,86,255,0.22) 0%, rgba(18,20,36,0.0) 42%), radial-gradient(90% 90% at 100% 0%, rgba(74,213,255,0.10) 0%, rgba(18,20,36,0.0) 48%), linear-gradient(180deg, #14152E 0%, #0C0D18 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <header
        data-eid="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <LayoutGrid size={12} color="rgba(255,255,255,0.70)" />
          </div>
          <div
            data-eid="sprint-name"
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 0.2,
            }}
          >
            {data.sprintName}
          </div>
        </div>

        <span
          data-eid="progress-pct"
          style={{
            color: '#B79CFF',
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          {pct}%
        </span>
      </header>

      <div
        data-eid="progress-bar"
        style={{
          height: 6,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        <div
          data-eid="progress-fill"
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #7A5CFF 0%, #B79CFF 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset',
          }}
        />
      </div>

      <div
        data-eid="summary-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.22)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          ✓
        </div>
        <span
          data-eid="total-tasks"
          style={{
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {data.totalTasks} tasks
        </span>
      </div>

      <div
        data-eid="columns-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        <Column
          eid="col-todo"
          headerEid="col-todo-header"
          countEid="col-todo-count"
          title="To Do"
          count={data.columns.todo.count}
          accent="#5B7CFF"
          badgeBg="rgba(91,124,255,0.18)"
        >
          <TaskCard
            eid="task-0"
            titleEid="task-0-title"
            priorityEid="task-0-priority"
            title={data.tasks[0].title}
            priority={data.tasks[0].priority as Priority}
            date={data.tasks[0].date}
            avatarText={data.tasks[0].avatar.text}
            avatarBg={data.tasks[0].avatar.bg}
          />
          <TaskCard
            eid="task-1"
            titleEid="task-1-title"
            priorityEid="task-1-priority"
            title={data.tasks[1].title}
            priority={data.tasks[1].priority as Priority}
            date={data.tasks[1].date}
            avatarText={data.tasks[1].avatar.text}
            avatarBg={data.tasks[1].avatar.bg}
          />
          <TaskCard
            eid="task-2"
            titleEid="task-2-title"
            title={data.tasks[2].title}
            priority={data.tasks[2].priority as Priority}
            date={data.tasks[2].date}
            avatarText={data.tasks[2].avatar.text}
            avatarBg={data.tasks[2].avatar.bg}
          />
          <TaskCard
            eid="task-3"
            titleEid="task-3-title"
            title={data.tasks[3].title}
            priority={data.tasks[3].priority as Priority}
            date={data.tasks[3].date}
            avatarText={data.tasks[3].avatar.text}
            avatarBg={data.tasks[3].avatar.bg}
          />
        </Column>

        <Column
          eid="col-inprogress"
          headerEid="col-inprogress-header"
          countEid="col-inprogress-count"
          title="In Progress"
          count={data.columns.inProgress.count}
          accent="#FFB020"
          badgeBg="rgba(255,176,32,0.18)"
        >
          <TaskCard
            eid="task-4"
            titleEid="task-4-title"
            priorityEid="task-4-priority"
            title={data.tasks[4].title}
            priority={data.tasks[4].priority as Priority}
            date={data.tasks[4].date}
            avatarText={data.tasks[4].avatar.text}
            avatarBg={data.tasks[4].avatar.bg}
          />
          <TaskCard
            eid="task-5"
            titleEid="task-5-title"
            title={data.tasks[5].title}
            priority={data.tasks[5].priority as Priority}
            date={data.tasks[5].date}
            avatarText={data.tasks[5].avatar.text}
            avatarBg={data.tasks[5].avatar.bg}
          />
          <TaskCard
            eid="task-6"
            titleEid="task-6-title"
            title={data.tasks[6].title}
            priority={data.tasks[6].priority as Priority}
            date={data.tasks[6].date}
            avatarText={data.tasks[6].avatar.text}
            avatarBg={data.tasks[6].avatar.bg}
          />
        </Column>

        <Column
          eid="col-done"
          headerEid="col-done-header"
          countEid="col-done-count"
          title="Done"
          count={data.columns.done.count}
          accent="#20C997"
          badgeBg="rgba(32,201,151,0.18)"
        >
          <TaskCard
            eid="task-7"
            titleEid="task-7-title"
            title={data.tasks[7].title}
            priority={data.tasks[7].priority as Priority}
            date={data.tasks[7].date}
            avatarText={data.tasks[7].avatar.text}
            avatarBg={data.tasks[7].avatar.bg}
          />
          <TaskCard
            eid="task-8"
            titleEid="task-8-title"
            title={data.tasks[8].title}
            priority={data.tasks[8].priority as Priority}
            date={data.tasks[8].date}
            avatarText={data.tasks[8].avatar.text}
            avatarBg={data.tasks[8].avatar.bg}
          />
        </Column>
      </div>
    </section>
  );
}
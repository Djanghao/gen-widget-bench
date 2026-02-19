import data from './data.json'

const { edition, lead, stories, ticker, updatedAt } = data

export default function Widget() {
  const tickerLoop = [...ticker, ...ticker]

  return (
    <section className="news-brief-root">
      <style>{`
        .news-brief-root {
          --bg-0: #050b18;
          --bg-1: #0d1831;
          --bg-2: #112548;
          --ink: #eaf4ff;
          --ink-soft: #9fb2cc;
          --accent: #82d9ff;
          --line: rgba(165, 198, 255, 0.22);
          --glass: rgba(13, 26, 48, 0.66);
          --glass-strong: rgba(10, 21, 41, 0.82);
          position: relative;
          width: 100%;
          max-width: 620px;
          border-radius: 22px;
          border: 1px solid var(--line);
          padding: 14px;
          overflow: hidden;
          color: var(--ink);
          display: grid;
          gap: 10px;
          background:
            radial-gradient(120% 80% at 8% -10%, rgba(98, 182, 255, 0.24) 0%, rgba(98, 182, 255, 0) 65%),
            radial-gradient(70% 70% at 100% 0%, rgba(126, 255, 226, 0.16) 0%, rgba(126, 255, 226, 0) 70%),
            linear-gradient(142deg, var(--bg-0) 0%, var(--bg-1) 48%, var(--bg-2) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 18px 46px rgba(0, 7, 20, 0.62);
          font-family: "Sora", "IBM Plex Sans", "Trebuchet MS", sans-serif;
          isolation: isolate;
        }

        .news-brief-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              90deg,
              rgba(146, 182, 228, 0.05) 0,
              rgba(146, 182, 228, 0.05) 1px,
              transparent 1px,
              transparent 26px
            ),
            linear-gradient(
              transparent 0%,
              transparent 60%,
              rgba(145, 193, 255, 0.05) 100%
            );
          pointer-events: none;
          z-index: -2;
        }

        .news-brief-root::after {
          content: "";
          position: absolute;
          width: 210px;
          aspect-ratio: 1;
          right: -60px;
          top: -70px;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(130, 217, 255, 0.45) 0%, rgba(130, 217, 255, 0) 70%);
          filter: blur(2px);
          pointer-events: none;
          z-index: -1;
          animation: pulseOrb 8s ease-in-out infinite alternate;
        }

        .news-brief-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .news-brief-title {
          margin: 0;
          font-size: 16px;
          letter-spacing: 0.02em;
          font-weight: 700;
        }

        .news-brief-updated {
          margin: 3px 0 0;
          color: var(--ink-soft);
          font-size: 11px;
          letter-spacing: 0.04em;
        }

        .news-brief-tag {
          flex-shrink: 0;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ddf6ff;
          border: 1px solid rgba(130, 217, 255, 0.45);
          background: linear-gradient(120deg, rgba(26, 48, 81, 0.85), rgba(13, 30, 60, 0.85));
          box-shadow: inset 0 1px 0 rgba(187, 234, 255, 0.18);
        }

        .lead-card {
          position: relative;
          display: grid;
          gap: 6px;
          padding: 12px 12px 12px 14px;
          border-radius: 15px;
          border: 1px solid rgba(170, 202, 255, 0.28);
          background:
            linear-gradient(160deg, rgba(15, 31, 56, 0.74), rgba(10, 20, 40, 0.78));
          backdrop-filter: blur(9px);
          overflow: hidden;
        }

        .lead-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #8de9ff, #70b7ff);
          box-shadow: 0 0 16px rgba(130, 217, 255, 0.55);
        }

        .lead-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(110% 80% at 100% 0%, rgba(127, 237, 255, 0.13) 0%, rgba(127, 237, 255, 0) 80%);
          pointer-events: none;
        }

        .lead-category {
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 700;
        }

        .lead-headline {
          margin: 0;
          font-size: 15px;
          line-height: 1.35;
          font-weight: 700;
          text-wrap: balance;
        }

        .lead-summary {
          margin: 0;
          font-size: 11px;
          color: #cfddf0;
          line-height: 1.5;
        }

        .story-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
          gap: 8px;
        }

        .story-card {
          display: grid;
          gap: 5px;
          padding: 9px 10px;
          border-radius: 12px;
          border: 1px solid rgba(153, 196, 255, 0.2);
          background:
            linear-gradient(170deg, rgba(11, 23, 43, 0.72), rgba(8, 18, 34, 0.68));
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .story-card:hover {
          transform: translateY(-2px);
          border-color: rgba(150, 216, 255, 0.46);
          background:
            linear-gradient(170deg, rgba(14, 29, 52, 0.86), rgba(9, 21, 39, 0.78));
        }

        .story-category {
          color: #88dfff;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .story-title {
          margin: 0;
          font-size: 12px;
          line-height: 1.35;
          font-weight: 700;
          color: #ecf5ff;
        }

        .story-summary {
          margin: 0;
          font-size: 10px;
          line-height: 1.45;
          color: #98acc9;
        }

        .ticker-shell {
          position: relative;
          border-radius: 999px;
          border: 1px solid rgba(164, 207, 255, 0.34);
          background: linear-gradient(120deg, rgba(7, 16, 31, 0.95), rgba(10, 21, 41, 0.95));
          overflow: hidden;
        }

        .ticker-shell::before,
        .ticker-shell::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 24px;
          pointer-events: none;
          z-index: 1;
        }

        .ticker-shell::before {
          left: 0;
          background: linear-gradient(90deg, rgba(7, 16, 31, 1), rgba(7, 16, 31, 0));
        }

        .ticker-shell::after {
          right: 0;
          background: linear-gradient(270deg, rgba(10, 21, 41, 1), rgba(10, 21, 41, 0));
        }

        .ticker-track {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 6px 12px;
          width: max-content;
          min-width: 100%;
          color: #b4edff;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          animation: tickerRun 22s linear infinite;
        }

        .ticker-item {
          position: relative;
          white-space: nowrap;
        }

        .ticker-item::before {
          content: "•";
          color: #6ecaff;
          margin-right: 7px;
        }

        @keyframes tickerRun {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes pulseOrb {
          0% {
            transform: scale(0.95);
            opacity: 0.75;
          }
          100% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @media (max-width: 560px) {
          .news-brief-root {
            border-radius: 18px;
            padding: 11px;
            gap: 8px;
          }

          .news-brief-header {
            align-items: flex-start;
          }

          .news-brief-title {
            font-size: 15px;
          }

          .lead-headline {
            font-size: 14px;
          }

          .story-grid {
            grid-template-columns: 1fr;
            gap: 7px;
          }
        }
      `}</style>

      <header className="news-brief-header">
        <div>
          <h2 className="news-brief-title">{edition}</h2>
          <p className="news-brief-updated">{updatedAt}</p>
        </div>
        <span className="news-brief-tag">Live Desk</span>
      </header>

      <article className="lead-card">
        <span className="lead-category">{lead.category}</span>
        <h3 className="lead-headline">{lead.headline}</h3>
        <p className="lead-summary">{lead.summary}</p>
      </article>

      <section className="story-grid">
        {stories.map((story) => (
          <article key={story.title} className="story-card">
            <span className="story-category">{story.category}</span>
            <h4 className="story-title">{story.title}</h4>
            <p className="story-summary">{story.summary}</p>
          </article>
        ))}
      </section>

      <footer className="ticker-shell">
        <div className="ticker-track">
          {tickerLoop.map((item, index) => (
            <span key={`${item}-${index}`} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </footer>
    </section>
  )
}

import data from './data.json'

type Quote = {
  symbol: string
  name: string
  price: number
  change: number
  changePct: number
  series: number[]
}

type StockData = {
  marketState: 'open' | 'pre' | 'after'
  quotes: Quote[]
}

const stocks = data as StockData

function sparklinePoints(series: number[], width: number, height: number) {
  if (series.length === 0) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = max - min || 1
  const stepX = series.length === 1 ? 0 : width / (series.length - 1)

  return series
    .map((value, index) => {
      const x = index * stepX
      const y = height - ((value - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function colorForChange(changePct: number) {
  if (changePct > 0) return '#2af779'
  if (changePct < 0) return '#ff3b30'
  return '#98a1b5'
}

function labelForState(state: StockData['marketState']) {
  if (state === 'pre') return 'Pre'
  if (state === 'after') return 'After'
  return 'Open'
}

export default function Widget() {
  const rows = [...stocks.quotes]
    .sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct))
    .slice(0, 6)

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0a0c12 0%, #070a10 100%)',
        borderRadius: 24,
        boxShadow: 'inset 0 0 0 1px rgba(72, 84, 115, 0.28)',
        color: '#e7ebf3',
        display: 'grid',
        gap: 0,
        maxWidth: 680,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <header
        style={{
          alignItems: 'center',
          borderBottom: '1px solid rgba(72, 84, 115, 0.28)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        <strong style={{ fontSize: 18 }}>Market Watch</strong>
        <span
          style={{
            background: 'rgba(41, 50, 72, 0.8)',
            border: '1px solid rgba(104, 121, 166, 0.35)',
            borderRadius: 999,
            color: '#b9c8ec',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '4px 8px',
            textTransform: 'uppercase',
          }}
        >
          {labelForState(stocks.marketState)}
        </span>
      </header>

      {rows.map((quote, index) => {
        const tone = colorForChange(quote.changePct)
        return (
          <article
            key={quote.symbol}
            style={{
              alignItems: 'center',
              borderBottom: index < rows.length - 1 ? '1px solid rgba(72, 84, 115, 0.25)' : 'none',
              display: 'grid',
              gap: 10,
              gridTemplateColumns: 'minmax(0, 1fr) 150px 110px',
              padding: '10px 16px',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ color: tone, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>
                {quote.changePct > 0 ? '▲' : quote.changePct < 0 ? '▼' : '■'} {quote.symbol}
              </div>
              <div
                style={{
                  color: '#969eaf',
                  fontSize: 11,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {quote.name}
              </div>
            </div>

            <svg height={32} viewBox="0 0 120 32" width={120}>
              <line
                stroke="rgba(132, 152, 198, 0.4)"
                strokeDasharray="3 3"
                strokeWidth={1}
                x1={0}
                x2={120}
                y1={30}
                y2={30}
              />
              <polyline
                fill="none"
                points={sparklinePoints(quote.series, 120, 28)}
                stroke={tone}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#f2f5fb', fontSize: 16, fontWeight: 700 }}>{quote.price.toFixed(2)}</div>
              <div style={{ color: tone, fontSize: 12, fontWeight: 700 }}>
                {quote.change > 0 ? '+' : ''}
                {quote.change.toFixed(2)}
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}


import data from './data.json'
import { Star, Package, Truck, ShieldCheck, ThumbsUp, ThumbsDown, Headphones } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts'

function Stars({ rating, eid }: { rating: number; eid: string }) {
  return (
    <div data-eid={eid} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={9}
          fill={s <= Math.floor(rating) ? '#f59e0b' : s - 0.5 <= rating ? '#f59e0b' : 'transparent'}
          color={s <= rating ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </div>
  )
}

export default function Widget() {
  const products = data.products
  const specs = data.specs

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%)',
        borderRadius: 20,
        color: '#134e4a',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: 480,
        overflow: 'hidden',
        padding: 14,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 data-eid="title" style={{ fontSize: 17, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Headphones size={18} color="#059669" /> Product Comparison
        </h1>
        <span data-eid="category-label" style={{ fontSize: 11, color: '#065f46', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: 8 }}>
          {data.category}
        </span>
      </header>

      <div data-eid="radar-chart-section" style={{ background: '#ffffff', borderRadius: 12, padding: 10, border: '1px solid #d1fae5', boxShadow: '0 1px 3px rgba(5,150,105,0.06)' }}>
        <h2 data-eid="radar-chart-title" style={{ fontSize: 12, fontWeight: 600, margin: '0 0 4px 0', color: '#065f46' }}>
          Performance Comparison
        </h2>
        <div data-eid="radar-chart" style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data.radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(16,185,129,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#065f46' }} />
              <PolarRadiusAxis tick={{ fontSize: 8, fill: '#6ee7b7' }} domain={[0, 100]} />
              <Radar name={products[0].name} dataKey="p0" stroke={products[0].color} fill={products[0].color} fillOpacity={0.15} />
              <Radar name={products[1].name} dataKey="p1" stroke={products[1].color} fill={products[1].color} fillOpacity={0.15} />
              <Radar name={products[2].name} dataKey="p2" stroke={products[2].color} fill={products[2].color} fillOpacity={0.15} />
              <Radar name={products[3].name} dataKey="p3" stroke={products[3].color} fill={products[3].color} fillOpacity={0.15} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="products-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {products.map((product, i) => (
          <div
            key={product.name}
            data-eid={`product-${i}`}
            style={{
              background: '#ffffff',
              border: `1px solid #d1fae5`,
              borderRadius: 10,
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(5,150,105,0.06)',
            }}
          >
            <div
              data-eid={`product-${i}-image`}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${product.color}15, ${product.color}30)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Headphones size={24} color={product.color} />
            </div>
            <span data-eid={`product-${i}-name`} style={{ fontSize: 10, fontWeight: 700, color: product.color }}>{product.name}</span>
            <span data-eid={`product-${i}-price`} style={{ fontSize: 14, fontWeight: 800, color: '#134e4a' }}>{product.price}</span>
            <Stars rating={product.stars} eid={`product-${i}-rating`} />
            <span style={{ fontSize: 8, color: '#6b7280' }}>({product.reviewCount.toLocaleString()})</span>
            <span
              data-eid={`product-${i}-availability`}
              style={{
                fontSize: 8,
                fontWeight: 600,
                color: product.availability === 'In Stock' ? '#059669' : '#d97706',
                background: product.availability === 'In Stock' ? 'rgba(16,185,129,0.1)' : 'rgba(217,119,6,0.1)',
                padding: '1px 5px',
                borderRadius: 4,
              }}
            >
              <Package size={7} style={{ marginRight: 2, verticalAlign: 'middle' }} />
              {product.availability}
            </span>
            <span data-eid={`product-${i}-shipping`} style={{ fontSize: 7, color: '#6b7280' }}>
              <Truck size={7} style={{ marginRight: 2, verticalAlign: 'middle' }} />
              {product.shipping}
            </span>
            <span data-eid={`product-${i}-seller`} style={{ fontSize: 7, color: '#065f46' }}>
              <ShieldCheck size={7} style={{ marginRight: 2, verticalAlign: 'middle' }} />
              Seller: {product.sellerRating}
            </span>
          </div>
        ))}
      </div>

      <div data-eid="specs-section" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 data-eid="specs-title" style={{ fontSize: 12, fontWeight: 600, margin: 0, color: '#065f46' }}>
          Specifications
        </h2>
        <div data-eid="specs-table" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {specs.map((spec, ri) => (
            <div
              key={spec.label}
              data-eid={`spec-row-${ri}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px repeat(4, 1fr)',
                gap: 4,
                padding: '4px 6px',
                borderRadius: 6,
                background: ri % 2 === 0 ? 'rgba(16,185,129,0.06)' : 'transparent',
                alignItems: 'center',
              }}
            >
              <span data-eid={`spec-row-${ri}-label`} style={{ fontSize: 9, color: '#065f46', fontWeight: 600 }}>{spec.label}</span>
              {spec.values.map((val, vi) => (
                <span key={vi} data-eid={`spec-row-${ri}-val-${vi}`} style={{ fontSize: 9, color: '#134e4a', textAlign: 'center' }}>
                  {val}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div data-eid="pros-cons-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 data-eid="pros-cons-title" style={{ fontSize: 12, fontWeight: 600, margin: 0, color: '#065f46' }}>
          Pros & Cons
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {products.map((product, i) => (
            <div
              key={product.name}
              data-eid={`pc-${i}`}
              style={{
                background: '#ffffff',
                border: `1px solid #d1fae5`,
                borderRadius: 8,
                padding: 8,
                boxShadow: '0 1px 2px rgba(5,150,105,0.04)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: product.color, marginBottom: 4 }}>{product.name}</div>
              <div data-eid={`pc-${i}-pros`} style={{ marginBottom: 4 }}>
                {product.pros.map((pro, pi) => (
                  <div key={pi} style={{ fontSize: 8, color: '#059669', display: 'flex', alignItems: 'center', gap: 3, marginBottom: 1 }}>
                    <ThumbsUp size={7} /> {pro}
                  </div>
                ))}
              </div>
              <div data-eid={`pc-${i}-cons`}>
                {product.cons.map((con, ci) => (
                  <div key={ci} style={{ fontSize: 8, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 3, marginBottom: 1 }}>
                    <ThumbsDown size={7} /> {con}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

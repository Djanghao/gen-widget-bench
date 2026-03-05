import React from 'react';
import { Headphones, Star, Truck, Store, Check, X } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer
} from 'recharts';
import data from './data.json';

const StarRating: React.FC<{ rating: number; count: string; fillColor: string; emptyColor: string; size: number }> = ({ rating, count, fillColor, emptyColor, size }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill={fillColor} stroke={fillColor} size={size} />
        ))}
        {halfStar && <Star key="half" fill={fillColor} stroke={fillColor} style={{ maskImage: 'linear-gradient(to right, black 50%, transparent 50%)', WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 50%)' }} size={size} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} fill={emptyColor} stroke={emptyColor} size={size} />
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: '#A0A0A0' }}>{count}</span>
    </div>
  );
};

const ProductCard: React.FC<{ product: typeof data.products[0]; index: number }> = ({ product, index }) => {
  const productColors = ['#267BFF', '#9D4EDD', '#EF476F', '#16DB93']; // SoundMax Pro, AudioElite X1, BassKing 700, ClearTone Ultra
  const accentColor = productColors[index];

  return (
    <div data-eid={`product-${index}`} style={{
      backgroundColor: '#2A2C3E',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      flex: '1',
      minWidth: '200px',
      maxWidth: '280px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <div data-eid={`product-${index}-image`} style={{
        backgroundColor: accentColor,
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <Headphones size={32} color="#E0E0E0" />
      </div>
      <span data-eid={`product-${index}-name`} style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: '#E0E0E0'
      }}>{product.name}</span>
      <span data-eid={`product-${index}-price`} style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#E0E0E0',
        marginBottom: '4px'
      }}>{product.price}</span>
      <div data-eid={`product-${index}-rating`}>
        <StarRating
          rating={product.rating.value}
          count={product.rating.count}
          fillColor="#FFD700"
          emptyColor="#4A4C5E"
          size={16}
        />
      </div>
      <span data-eid={`product-${index}-availability`} style={{
        backgroundColor: product.availability === 'In Stock' ? '#28A745' : '#FFC107',
        color: product.availability === 'In Stock' ? '#E0E0E0' : '#333',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '500',
        marginTop: '8px'
      }}>{product.availability}</span>
      <div data-eid={`product-${index}-shipping`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#A0A0A0', marginTop: '4px' }}>
        <Truck size={14} color="#A0A0A0" />
        <span>{product.shipping}</span>
      </div>
      <div data-eid={`product-${index}-seller`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#A0A0A0' }}>
        <Store size={14} color="#A0A0A0" />
        <span>{product.seller}</span>
      </div>
    </div>
  );
};

const ProsConsCard: React.FC<{ product: typeof data.products[0]; index: number }> = ({ product, index }) => {
  return (
    <div data-eid={`pc-${index}`} style={{
      backgroundColor: '#2A2C3E',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: '1',
      minWidth: '200px',
      maxWidth: '280px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#E0E0E0', textAlign: 'center' }}>{product.name}</h3>
      <div data-eid={`pc-${index}-pros`}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#16DB93', marginBottom: '8px' }}>Pros:</h4>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {product.pros.map((pro, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0', fontSize: '0.875rem', marginBottom: '4px' }}>
              <Check size={16} color="#16DB93" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div data-eid={`pc-${index}-cons`}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#EF476F', marginBottom: '8px' }}>Cons:</h4>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {product.cons.map((con, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0', fontSize: '0.875rem', marginBottom: '4px' }}>
              <X size={16} color="#EF476F" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Widget: React.FC = () => {
  const radarChartColors = ['#267BFF', '#9D4EDD', '#EF476F', '#16DB93']; // SoundMax Pro, AudioElite X1, BassKing 700, ClearTone Ultra
  const radarProductNames = ['SoundMax Pro', 'AudioElite X1', 'BassKing 700', 'ClearTone Ultra'];

  const radarChartData = data.radarChart.categories.map((category) => {
    const item: { subject: string; [key: string]: string | number; } = { subject: category.name, fullMark: 100 };
    data.products.forEach((product, idx) => {
      item[product.name] = product.performance[category.key];
    });
    return item;
  });

  return (
    <section data-eid="root" style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      backgroundColor: '#1A1C2C',
      color: '#E0E0E0',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      maxWidth: '1200px',
      margin: '20px auto'
    }}>
      <header data-eid="header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h1 data-eid="title" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0',
          color: '#E0E0E0'
        }}>
          <Headphones size={24} color="#E0E0E0" />
          {data.header.title}
        </h1>
        <span data-eid="category-label" style={{
          backgroundColor: '#4A4C5E',
          color: '#E0E0E0',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.875rem'
        }}>{data.header.category}</span>
      </header>

      <div data-eid="radar-chart-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="radar-chart-title" style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#E0E0E0'
        }}>{data.radarChart.title}</h2>
        <div data-eid="radar-chart" style={{
          backgroundColor: '#2A2C3E',
          borderRadius: '8px',
          padding: '20px',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ResponsiveContainer width="95%" height="100%">
            <RadarChart outerRadius={120} data={radarChartData}>
              <PolarGrid stroke="#4A4C5E" />
              <PolarAngleAxis dataKey="subject" stroke="#A0A0A0" tick={{ fill: '#E0E0E0', fontSize: '0.85rem' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#4A4C5E" tick={{ fill: '#A0A0A0', fontSize: '0.75rem' }} />
              {data.products.map((product, index) => (
                <Radar
                  key={product.name}
                  name={product.name}
                  dataKey={product.name}
                  stroke={radarChartColors[index]}
                  fill={radarChartColors[index]}
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              ))}
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="square"
                formatter={(value, entry) => (
                  <span style={{ color: '#E0E0E0', fontSize: '0.85rem' }}>{value}</span>
                )}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-eid="products-row" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {data.products.map((product, index) => (
          <ProductCard key={product.name} product={product} index={index} />
        ))}
      </div>

      <div data-eid="specs-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="specs-title" style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#E0E0E0'
        }}>{data.specsTable.title}</h2>
        <div data-eid="specs-table" style={{
          display: 'grid',
          gridTemplateColumns: `1fr repeat(${data.products.length}, 1fr)`,
          backgroundColor: '#2A2C3E',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          {data.specsTable.rows.map((row, rowIndex) => (
            <div data-eid={`spec-row-${rowIndex}`} key={row.label} style={{
              display: 'contents' // Makes children directly grid items
            }}>
              <span data-eid={`spec-row-${rowIndex}-label`} style={{
                padding: '12px 16px',
                fontWeight: '500',
                color: '#A0A0A0',
                backgroundColor: rowIndex % 2 === 0 ? '#2A2C3E' : '#3A3C4E',
                borderBottom: '1px solid #4A4C5E',
                display: 'flex',
                alignItems: 'center'
              }}>{row.label}</span>
              {row.values.map((val, valIndex) => (
                <span data-eid={`spec-row-${rowIndex}-val-${valIndex}`} key={valIndex} style={{
                  padding: '12px 16px',
                  color: '#E0E0E0',
                  backgroundColor: rowIndex % 2 === 0 ? '#2A2C3E' : '#3A3C4E',
                  borderLeft: '1px solid #4A4C5E',
                  borderBottom: '1px solid #4A4C5E',
                  display: 'flex',
                  alignItems: 'center'
                }}>{val}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div data-eid="pros-cons-section" style={{ marginBottom: '32px' }}>
        <h2 data-eid="pros-cons-title" style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#E0E0E0'
        }}>{data.prosCons.title}</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {data.products.map((product, index) => (
            <ProsConsCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Widget;
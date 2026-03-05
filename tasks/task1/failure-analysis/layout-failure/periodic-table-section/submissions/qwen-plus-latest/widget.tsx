import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import data from './data.json';

const PeriodicTableWidget = () => {
  const selectedElement = data.elements.find(el => el.symbol === 'Fe');

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div data-eid="title" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '1px' }}>
          Periodic Table
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <span data-eid="filter-alkali" style={{
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Alkali Metal
          </span>
          <span data-eid="filter-alkaline" style={{
            backgroundColor: '#f97316',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Alkaline Earth
          </span>
          <span data-eid="filter-transition" style={{
            backgroundColor: '#eab308',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Transition Metal
          </span>
          <span data-eid="filter-post-transition" style={{
            backgroundColor: '#0d9488',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Post-Transition
          </span>
        </div>
      </header>

      {/* Elements Grid (4x5) */}
      <div data-eid="elements-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {data.elements.map((element, index) => (
          <div 
            key={index}
            data-eid={`el-${index}`}
            style={{
              backgroundColor: element.category === 'Alkali Metal' ? '#ef4444' :
                              element.category === 'Alkaline Earth' ? '#f97316' :
                              element.category === 'Transition Metal' ? '#eab308' :
                              element.category === 'Post-Transition' ? '#0d9488' :
                              element.category === 'Metalloid' ? '#06b6d4' : '#6b7280',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: element.symbol === 'Fe' ? '0 0 0 2px #3b82f6' : 'none'
            }}
          >
            <span data-eid={`el-${index}-number`} style={{ fontSize: '12px', opacity: 0.9 }}>
              {element.number}
            </span>
            <span data-eid={`el-${index}-symbol`} style={{ fontSize: '20px', fontWeight: '700' }}>
              {element.symbol}
            </span>
            <span data-eid={`el-${index}-name`} style={{ fontSize: '12px', fontWeight: '500', textTransform: 'capitalize' }}>
              {element.name}
            </span>
            <span data-eid={`el-${index}-mass`} style={{ fontSize: '12px', opacity: 0.8 }}>
              {element.mass}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Card */}
      <div data-eid="detail-card" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div data-eid="detail-symbol" style={{ fontSize: '48px', fontWeight: '800' }}>
              {selectedElement?.symbol}
            </div>
            <div>
              <div data-eid="detail-name" style={{ fontSize: '24px', fontWeight: '700' }}>
                {selectedElement?.name}
              </div>
              <div data-eid="detail-category" style={{
                backgroundColor: '#eab308',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                display: 'inline-block',
                marginTop: '4px'
              }}>
                {selectedElement?.category}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div data-eid="detail-number" style={{ fontSize: '18px', fontWeight: '600' }}>
              Atomic Number: {selectedElement?.number}
            </div>
            <div data-eid="detail-mass" style={{ fontSize: '18px', fontWeight: '600', marginTop: '4px' }}>
              Atomic Mass: {selectedElement?.mass}
            </div>
          </div>
        </div>

        <div data-eid="detail-electron-config" style={{ fontSize: '16px', marginBottom: '20px', padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
          Electron Configuration: {selectedElement?.electronConfiguration}
        </div>

        <div data-eid="detail-props" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div data-eid="detail-melting" style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Melting Point</div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>{selectedElement?.meltingPoint} °C</div>
          </div>
          <div data-eid="detail-boiling" style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Boiling Point</div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>{selectedElement?.boilingPoint} °C</div>
          </div>
          <div data-eid="detail-density" style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Density</div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>{selectedElement?.density}</div>
          </div>
          <div data-eid="detail-electronegativity" style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Electronegativity</div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>{selectedElement?.electronegativity}</div>
          </div>
        </div>

        <div data-eid="detail-period-group" style={{ fontSize: '16px', display: 'flex', gap: '24px' }}>
          <div>Period {selectedElement?.period}</div>
          <div>Group {selectedElement?.group}</div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div data-eid="comparison-chart" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div data-eid="comparison-title" style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
          Melting Point Comparison
        </div>
        <div data-eid="comparison-bars" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="element" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderColor: '#374151',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: '#f9fafb' }}
              />
              <Bar dataKey="meltingPoint" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div data-eid="legend" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        <span data-eid="legend-alkali" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '4px' }}></div>
          Alkali Metal
        </span>
        <span data-eid="legend-alkaline" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
          Alkaline Earth
        </span>
        <span data-eid="legend-transition" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#eab308', borderRadius: '4px' }}></div>
          Transition Metal
        </span>
        <span data-eid="legend-post-transition" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#0d9488', borderRadius: '4px' }}></div>
          Post-Transition
        </span>
        <span data-eid="legend-metalloid" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#06b6d4', borderRadius: '4px' }}></div>
          Metalloid
        </span>
      </div>
    </section>
  );
};

export default PeriodicTableWidget;
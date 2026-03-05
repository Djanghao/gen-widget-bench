import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, Server, Clock, Package, FileText, TrendingUp } from 'lucide-react';
import data from './data.json';

const DatabaseSchemaViewer = () => {
  const { 
    database, 
    tables, 
    schemaStats, 
    migrations, 
    queryVolume 
  } = data;

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        color: '#e2e8f0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div data-eid="db-name" style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={24} />
          {database.name}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span 
            data-eid="engine-badge"
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Server size={12} />
            {database.engine}
          </span>
          <span 
            data-eid="version-badge"
            style={{
              backgroundColor: '#38a169',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Clock size={12} />
            {database.version}
          </span>
        </div>
      </header>

      {/* Tables Section */}
      <div data-eid="tables-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {tables.map((table, tableIndex) => (
          <div 
            key={table.name}
            data-eid={`table-${table.name}`}
            style={{
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #4a5568',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div data-eid={`table-${table.name}-name`} style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Package size={16} />
              {table.name}
            </div>
            
            <div data-eid={`table-${table.name}-meta`} style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '16px', display: 'flex', gap: '12px' }}>
              <span>{table.rows} rows</span>
              <span>{table.indices} indices</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {table.columns.map((col, colIndex) => (
                <div 
                  key={`${table.name}-${col.name}`}
                  data-eid={`table-${table.name}-col-${colIndex}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 8px',
                    backgroundColor: '#343e4e',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <span data-eid={`table-${table.name}-col-${colIndex}-name`} style={{ fontWeight: '600', marginRight: '8px', minWidth: '80px' }}>{col.name}</span>
                  <span 
                    data-eid={`table-${table.name}-col-${colIndex}-type`}
                    style={{
                      backgroundColor: '#4a5568',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      marginRight: '6px'
                    }}
                  >
                    {col.type}
                  </span>
                  {col.key && (
                    <span 
                      data-eid={`table-${table.name}-col-${colIndex}-key`}
                      style={{
                        backgroundColor: col.key === 'PK' ? '#3182ce' : '#38a169',
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        marginRight: '6px'
                      }}
                    >
                      {col.key}
                    </span>
                  )}
                  {col.nullable && (
                    <span 
                      data-eid={`table-${table.name}-col-${colIndex}-nullable`}
                      style={{
                        backgroundColor: '#718096',
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        marginLeft: 'auto'
                      }}
                    >
                      {col.nullable}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Schema Stats */}
      <div data-eid="schema-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '8px' }}>
        <div data-eid="stat-tables" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <span data-eid="stat-tables-label" style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '4px' }}>Tables</span>
          <span data-eid="stat-tables-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{schemaStats.tables}</span>
        </div>
        <div data-eid="stat-columns" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <span data-eid="stat-columns-label" style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '4px' }}>Columns</span>
          <span data-eid="stat-columns-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{schemaStats.columns}</span>
        </div>
        <div data-eid="stat-indices" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <span data-eid="stat-indices-label" style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '4px' }}>Indices</span>
          <span data-eid="stat-indices-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{schemaStats.indices}</span>
        </div>
        <div data-eid="stat-size" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <span data-eid="stat-size-label" style={{ fontSize: '12px', color: '#a0aec0', display: 'block', marginBottom: '4px' }}>Size</span>
          <span data-eid="stat-size-value" style={{ fontSize: '24px', fontWeight: 'bold' }}>{schemaStats.size}</span>
        </div>
      </div>

      {/* Recent Migrations */}
      <div data-eid="migrations-section" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '20px', marginTop: '8px' }}>
        <div data-eid="migrations-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={18} />
          Recent Migrations
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {migrations.map((migration, index) => (
            <div 
              key={index}
              data-eid={`migration-${index}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '12px',
                padding: '10px 0',
                borderBottom: index < migrations.length - 1 ? '1px solid #4a5568' : 'none'
              }}
            >
              <span data-eid={`migration-${index}-version`} style={{ fontWeight: '600', color: '#4299e1' }}>{migration.version}</span>
              <span data-eid={`migration-${index}-desc`} style={{ fontSize: '14px', color: '#e2e8f0' }}>{migration.description}</span>
              <span data-eid={`migration-${index}-time`} style={{ fontSize: '12px', color: '#a0aec0', whiteSpace: 'nowrap' }}>{migration.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Query Volume Chart */}
      <div data-eid="query-chart" style={{ backgroundColor: '#2d3748', borderRadius: '12px', padding: '20px', marginTop: '8px' }}>
        <div data-eid="query-chart-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={18} />
          Query Volume (7d)
        </div>
        
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={queryVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="day" stroke="#a0aec0" fontSize={12} />
              <YAxis stroke="#a0aec0" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2d3748', 
                  borderColor: '#4a5568',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="queries" fill="#4299e1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DatabaseSchemaViewer;
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import data from './data.json';

const ProductCompareWidget = () => {
  const { products, radarData, specs, prosCons } = data;

  return (
    <section data-eid="root" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <header data-eid="header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 data-eid="title" style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px 0' }}>
          Product Comparison
        </h1>
        <span data-eid="category-label" style={{ fontSize: '16px', color: '#555', fontWeight: '500' }}>
          Wireless Headphones
        </span>
      </header>

      {/* Radar Chart Section */}
      <div data-eid="radar-chart-section" style={{ marginBottom: '40px' }}>
        <h2 data-eid="radar-chart-title" style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' }}>
          Feature Comparison
        </h2>
        <div data-eid="radar-chart" style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="subject" stroke="#333" fontSize="12px" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              {products.map((product, index) => (
                <Radar
                  key={index}
                  name={product.name}
                  dataKey={`value${index}`}
                  stroke={product.color}
                  fill={product.color}
                  fillOpacity={0.25}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products Row */}
      <div data-eid="products-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {products.map((product, index) => (
          <div key={index} data-eid={`product-${index}`} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div data-eid={`product-${index}-image`} style={{ width: '100%', height: '160px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '12px', textAlign: 'center' }}>
              {product.name} Image
            </div>
            <span data-eid={`product-${index}-name`} style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', display: 'block', marginBottom: '8px' }}>
              {product.name}
            </span>
            <span data-eid={`product-${index}-price`} style={{ fontSize: '20px', fontWeight: '700', color: '#e53935', display: 'block', marginBottom: '12px' }}>
              ${product.price}
            </span>
            <div data-eid={`product-${index}-rating`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ color: '#ffc107', marginRight: '6px' }}>★</div>
              <span style={{ fontSize: '14px', color: '#333' }}>{product.rating}</span>
              <span style={{ fontSize: '14px', color: '#777', marginLeft: '4px' }}>({product.reviewCount})</span>
            </div>
            <span data-eid={`product-${index}-availability`} style={{ display: 'inline-block', fontSize: '12px', backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px' }}>
              {product.availability}
            </span>
            <span data-eid={`product-${index}-shipping`} style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '8px' }}>
              {product.shipping}
            </span>
            <span data-eid={`product-${index}-seller`} style={{ display: 'block', fontSize: '13px', color: '#555' }}>
              Seller: {product.sellerRating}
            </span>
          </div>
        ))}
      </div>

      {/* Specs Section */}
      <div data-eid="specs-section" style={{ marginBottom: '40px' }}>
        <h2 data-eid="specs-title" style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' }}>
          Technical Specifications
        </h2>
        <div data-eid="specs-table" style={{ display: 'grid', gridTemplateColumns: '200px repeat(4, 1fr)', gap: '10px' }}>
          {/* Headers */}
          <div style={{ fontWeight: '600', color: '#333', textAlign: 'left', padding: '8px 0' }}></div>
          {products.map((product, index) => (
            <div key={index} style={{ fontWeight: '600', color: '#333', textAlign: 'center', padding: '8px 0' }}>
              {product.name}
            </div>
          ))}

          {/* Spec Rows */}
          {specs.map((spec, specIndex) => (
            <React.Fragment key={specIndex}>
              <span data-eid={`spec-row-${specIndex}-label`} style={{ fontWeight: '500', color: '#555', textAlign: 'left', padding: '8px 0' }}>
                {spec.label}
              </span>
              {products.map((_, productIndex) => (
                <span key={productIndex} data-eid={`spec-row-${specIndex}-val-${productIndex}`} style={{ textAlign: 'center', padding: '8px 0', color: '#333' }}>
                  {spec.values[productIndex]}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Pros & Cons Section */}
      <div data-eid="pros-cons-section">
        <h2 data-eid="pros-cons-title" style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' }}>
          Pros & Cons
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {prosCons.map((pc, index) => (
            <div key={index} data-eid={`pc-${index}`} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>{products[index].name}</h3>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#28a745', marginBottom: '6px' }}>Pros</h4>
                <div data-eid={`pc-${index}-pros`} style={{ marginLeft: '20px', marginBottom: '12px' }}>
                  {pc.pros.map((pro, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#333', marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ marginRight: '6px', color: '#28a745' }}>✓</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#dc3545', marginBottom: '6px' }}>Cons</h4>
                <div data-eid={`pc-${index}-cons`} style={{ marginLeft: '20px' }}>
                  {pc.cons.map((con, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#333', marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ marginRight: '6px', color: '#dc3545' }}>✗</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCompareWidget;
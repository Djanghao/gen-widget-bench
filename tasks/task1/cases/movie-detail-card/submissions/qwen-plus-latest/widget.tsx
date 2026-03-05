import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star } from 'lucide-react';
import data from './data.json';

const MovieDetailCard = () => {
  const { movie, plot, cast, director, boxOffice, ratings } = data;

  // Create star icons with proper fill based on rating (8.7/10 = 4.35 stars)
  const renderStars = () => {
    const fullStars = Math.floor(4.35);
    const hasHalfStar = 4.35 % 1 >= 0.5;
    
    return (
      <>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star key={i} size={16} fill="#FFD700" stroke="none" data-eid={`score-star-${i + 1}`} />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <Star key={i} size={16} fill="#FFD700" stroke="none" data-eid={`score-star-${i + 1}`} />
            );
          } else {
            return (
              <Star key={i} size={16} fill="none" stroke="#9CA3AF" strokeWidth={1.5} data-eid={`score-star-${i + 1}`} />
            );
          }
        })}
      </>
    );
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#111827',
        color: '#F9FAFB',
        padding: '24px',
        borderRadius: '12px',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      {/* Poster Area */}
      <div 
        data-eid="poster-area"
        style={{
          height: '300px',
          background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: '#9CA3AF'
        }}
      >
        Movie Poster
      </div>

      {/* Title Row */}
      <div data-eid="title-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <h2 data-eid="movie-title" style={{ fontSize: '28px', fontWeight: '700', margin: '0', marginRight: '12px' }}>
          {movie.title}
        </h2>
        <span data-eid="movie-year" style={{ fontSize: '16px', color: '#9CA3AF', fontWeight: '500' }}>
          {movie.year}
        </span>
      </div>

      {/* Meta Row */}
      <div data-eid="meta-row" style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontSize: '14px', color: '#9CA3AF' }}>
        <span data-eid="runtime">{movie.runtime}</span>
        <span data-eid="pg-rating" style={{ 
          backgroundColor: '#374151', 
          padding: '4px 8px', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {movie.rating}
        </span>
      </div>

      {/* Score Row */}
      <div data-eid="score-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {renderStars()}
        <span data-eid="score-value" style={{ 
          marginLeft: '12px', 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#F9FAFB'
        }}>
          {movie.score}
        </span>
      </div>

      {/* Genre Row */}
      <div data-eid="genre-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {movie.genres.map((genre, index) => (
          <span 
            key={genre}
            data-eid={`genre-${genre.toLowerCase().replace(' ', '-')}`}
            style={{
              backgroundColor: '#1F2937',
              color: '#E5E7EB',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {genre}
          </span>
        ))}
      </div>

      {/* Plot Summary */}
      <p data-eid="plot-summary" style={{ 
        fontSize: '16px', 
        lineHeight: '1.6', 
        marginBottom: '24px',
        color: '#E5E7EB'
      }}>
        {plot}
      </p>

      {/* Cast Section */}
      <div data-eid="cast-section" style={{ marginBottom: '24px' }}>
        <h3 data-eid="cast-title" style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#F9FAFB'
        }}>
          Cast
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {cast.map((actor, index) => (
            <div 
              key={actor.name}
              data-eid={`cast-${index}`}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minWidth: '100px'
              }}
            >
              <div 
                data-eid={`cast-${index}-avatar`}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#374151',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9CA3AF'
                }}
              >
                {actor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                textAlign: 'center',
                color: '#F9FAFB'
              }}>
                {actor.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Director Row */}
      <div data-eid="director-row" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '16px',
        fontSize: '16px'
      }}>
        <span style={{ color: '#9CA3AF', marginRight: '8px' }}>Director:</span>
        <span data-eid="director-name" style={{ fontWeight: '600', color: '#F9FAFB' }}>
          {director}
        </span>
      </div>

      {/* Box Office Row */}
      <div data-eid="box-office-row" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '24px',
        fontSize: '16px'
      }}>
        <span style={{ color: '#9CA3AF', marginRight: '8px' }}>Box Office:</span>
        <span data-eid="box-office-value" style={{ fontWeight: '600', color: '#F9FAFB' }}>
          {boxOffice}
        </span>
      </div>

      {/* Ratings Chart */}
      <div data-eid="ratings-chart" style={{ 
        backgroundColor: '#1F2937', 
        borderRadius: '8px', 
        padding: '16px',
        marginBottom: '24px'
      }}>
        <span data-eid="chart-title" style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          display: 'block',
          color: '#F9FAFB'
        }}>
          Rating Distribution
        </span>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="rating" 
                stroke="#9CA3AF" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickCount={5}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151',
                  borderRadius: '8px'
                }} 
                labelStyle={{ color: '#F9FAFB' }}
                itemStyle={{ color: '#F9FAFB' }}
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailCard;
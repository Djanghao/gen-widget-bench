import React from 'react';
import { Star } from 'lucide-react';
import data from './data.json';

const MovieDetailCard = () => {
  return (
    <section
      data-eid="root"
      style={{
        width: '300px',
        backgroundColor: '#1b1e23',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        data-eid="poster-area"
        style={{
          height: '150px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        />
      </div>
      <div data-eid="title-row" style={{ marginTop: '12px' }}>
        <h2 data-eid="movie-title" style={{ margin: 0, fontSize: '18px' }}>
          {data.title}
        </h2>
        <span
          data-eid="movie-year"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}
        >
          ({data.year})
        </span>
      </div>
      <div
        data-eid="meta-row"
        style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
      >
        <span data-eid="runtime" style={{ fontSize: '14px' }}>{data.runtime}</span>
        <span
          data-eid="pg-rating"
          style={{
            fontSize: '12px',
            backgroundColor: '#ffc107',
            color: '#000',
            padding: '0 4px',
            marginLeft: '8px',
            borderRadius: '4px',
          }}
        >
          {data.pgRating}
        </span>
      </div>
      <div
        data-eid="score-row"
        style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
      >
        {[...Array(4)].map((_, index) => (
          <Star key={index} color="#ffc107" size={16} data-eid={`score-star-${index + 1}`} />
        ))}
        <Star
          color="#ffc107"
          size={16}
          fill="url(#grad1)"
          data-eid="score-star-5"
        />
        <span data-eid="score-value" style={{ marginLeft: '8px', fontSize: '14px' }}>
          {data.score}
        </span>
      </div>
      <div
        data-eid="genre-row"
        style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}
      >
        {data.genres.map((genre, index) => (
          <span
            key={index}
            data-eid={`genre-${genre}`}
            style={{
              fontSize: '12px',
              backgroundColor: '#5a5a5a',
              color: '#fff',
              padding: '2px 6px',
              margin: '4px 4px 0 0',
              borderRadius: '4px',
            }}
          >
            {genre}
          </span>
        ))}
      </div>
      <p data-eid="plot-summary" style={{ fontSize: '14px', marginTop: '8px' }}>
        {data.plotSummary}
      </p>
      <div data-eid="cast-section">
        <h3 data-eid="cast-title" style={{ fontSize: '16px', marginTop: '16px' }}>
          Cast
        </h3>
        {data.cast.map((member, index) => (
          <div
            key={index}
            data-eid={`cast-${index}`}
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
          >
            <div
              data-eid={`cast-${index}-avatar`}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: member.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            >
              {member.initials}
            </div>
            <span style={{ fontSize: '14px', color: '#fff' }}>{member.name}</span>
          </div>
        ))}
      </div>
      <div
        data-eid="director-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '14px',
        }}
      >
        <span>🎬 Director: </span>
        <span data-eid="director-name" style={{ marginLeft: '8px' }}>
          {data.director}
        </span>
      </div>
      <div
        data-eid="box-office-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '8px',
          fontSize: '14px',
        }}
      >
        <span>💰 Box Office: </span>
        <span data-eid="box-office-value" style={{ marginLeft: '8px', color: '#27ae60' }}>
          {data.boxOffice}
        </span>
      </div>
      <div data-eid="ratings-chart" style={{ marginTop: '16px' }}>
        <span data-eid="chart-title" style={{ fontSize: '14px' }}>
          Rating Distribution
        </span>
        {/* implement recharts BarChart here */}
      </div>
    </section>
  );
};

export default MovieDetailCard;
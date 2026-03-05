import React from 'react';
import { Star, StarHalf, Film, LandPlot, Wallet } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import data from './data.json';

const MovieDetailCard: React.FC = () => {
  const { movie, ratingDistribution } = data;

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={`star-full-${i}`} data-eid={`score-star-${i + 1}`}>
            <Star size={18} style={{ color: '#FFC107', fill: '#FFC107' }} />
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={`star-half-${i}`} data-eid={`score-star-${i + 1}`}>
            <StarHalf size={18} style={{ color: '#FFC107', fill: '#FFC107' }} />
          </span>
        );
      } else {
        stars.push(
          <span key={`star-empty-${i}`} data-eid={`score-star-${i + 1}`}>
            <Star size={18} style={{ color: '#606060' }} />
          </span>
        );
      }
    }
    return stars;
  };

  const genreColors: { [key: string]: string } = {
    'Sci-Fi': '#673AB7',
    Adventure: '#2196F3',
    Drama: '#D81B60',
  };

  return (
    <section
      data-eid="root"
      style={{
        width: '320px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#201D2C',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        color: '#FFFFFF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '20px' // Added padding for the box office and chart section
      }}
    >
      <div
        data-eid="poster-area"
        style={{
          width: '100%',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(74, 20, 140, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <Film size={64} style={{ color: 'rgba(255,255,255,0.4)' }} />
      </div>

      <div style={{ padding: '20px' }}>
        <div data-eid="title-row" style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
          <h2 data-eid="movie-title" style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', marginRight: '8px' }}>
            {movie.title}
          </h2>
          <span data-eid="movie-year" style={{ fontSize: '16px', color: '#A0A0A0' }}>
            ({movie.year})
          </span>
        </div>

        <div data-eid="meta-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <span data-eid="runtime" style={{ fontSize: '14px', color: '#E0E0E0', marginRight: '10px' }}>
            {movie.runtime}
          </span>
          <span
            data-eid="pg-rating"
            style={{
              backgroundColor: '#FDD835',
              color: '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {movie.pgRating}
          </span>
        </div>

        <div data-eid="score-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          {renderStars(movie.stars)}
          <span data-eid="score-value" style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}>
            {movie.score}
          </span>
        </div>

        <div data-eid="genre-row" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {movie.genres.map((genre, index) => (
            <span
              key={genre}
              data-eid={`genre-${genre.toLowerCase()}`}
              style={{
                backgroundColor: genreColors[genre] || '#606060',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        <p data-eid="plot-summary" style={{ fontSize: '14px', lineHeight: '1.6', color: '#E0E0E0', marginBottom: '20px' }}>
          {movie.plotSummary}
        </p>

        <div data-eid="cast-section" style={{ marginBottom: '20px' }}>
          <h3 data-eid="cast-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
            Cast
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            {movie.cast.map((member, index) => (
              <div key={index} data-eid={`cast-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                <div
                  data-eid={`cast-${index}-avatar`}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: member.avatarColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                  }}
                >
                  {member.initials}
                </div>
                <span style={{ fontSize: '12px', color: '#E0E0E0', textAlign: 'center' }}>{member.name.split(' ')[0]}</span>
                <span style={{ fontSize: '12px', color: '#E0E0E0', textAlign: 'center' }}>{member.name.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-eid="director-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#E0E0E0' }}>
          <LandPlot size={18} style={{ marginRight: '8px', color: '#A0A0A0' }} />
          <span style={{ fontWeight: 'normal', color: '#A0A0A0' }}>Director: </span>
          <span data-eid="director-name" style={{ marginLeft: '4px', fontWeight: 'bold', color: '#FFFFFF' }}>
            {movie.director}
          </span>
        </div>

        <div data-eid="box-office-row" style={{ display: 'flex', alignItems: 'center', color: '#E0E0E0', marginBottom: '20px' }}>
          <Wallet size={18} style={{ marginRight: '8px', color: '#A0A0A0' }} />
          <span style={{ fontWeight: 'normal', color: '#A0A0A0' }}>Box Office: </span>
          <span data-eid="box-office-value" style={{ marginLeft: '4px', fontWeight: 'bold', color: '#FFFFFF' }}>
            {movie.boxOffice}
          </span>
        </div>

        <div data-eid="ratings-chart" style={{ width: '100%', height: '200px', marginTop: '20px', padding: '0 10px' }}>
          <span data-eid="chart-title" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
            Rating Distribution
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingDistribution} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="rating" stroke="#A0A0A0" tick={{ fontSize: 10 }} />
              <YAxis stroke="#A0A0A0" tick={{ fontSize: 10 }} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailCard;
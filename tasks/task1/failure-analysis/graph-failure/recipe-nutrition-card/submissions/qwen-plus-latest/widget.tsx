import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Star, Clock, Users, Tag } from 'lucide-react';
import data from './data.json';

const RecipeNutritionCard = () => {
  const { 
    title, 
    rating, 
    reviewCount, 
    cookTime, 
    servings, 
    calories, 
    protein, 
    carbs, 
    fat, 
    ingredients, 
    tags,
    macroData
  } = data;

  // Star icons for rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={`star-${i}`} size={16} fill="#FFD700" stroke="none" data-eid={`star-${i}`} />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={`star-${i}`} size={16} fill="#FFD700" stroke="none" data-eid={`star-${i}`} />
        );
      } else {
        stars.push(
          <Star key={`star-${i}`} size={16} fill="none" stroke="#9CA3AF" strokeWidth={1.5} data-eid={`star-${i}`} />
        );
      }
    }
    return stars;
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#111827',
        borderRadius: '16px',
        padding: '24px',
        color: '#F9FAFB',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Hero Image Placeholder */}
      <div 
        data-eid="hero-image"
        style={{
          height: '240px',
          backgroundColor: '#1F2937',
          borderRadius: '12px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#6B7280',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          Recipe Image
        </div>
      </div>

      {/* Recipe Title */}
      <h2 
        data-eid="recipe-title"
        style={{
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: '16px',
        }}
      >
        {title}
      </h2>

      {/* Rating Row */}
      <div 
        data-eid="rating-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {renderStars()}
        </div>
        <span 
          data-eid="rating-value"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#F9FAFB',
          }}
        >
          {rating}
        </span>
        <span 
          data-eid="review-count"
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
          }}
        >
          {reviewCount}
        </span>
      </div>

      {/* Meta Row */}
      <div 
        data-eid="meta-row"
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '28px',
          fontSize: '14px',
          color: '#9CA3AF',
        }}
      >
        <span 
          data-eid="cook-time"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Clock size={16} />
          {cookTime}
        </span>
        <span 
          data-eid="servings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Users size={16} />
          {servings}
        </span>
      </div>

      {/* Nutrition Grid */}
      <div 
        data-eid="nutrition-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div 
          data-eid="stat-calories"
          style={{
            backgroundColor: '#1F2937',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{calories}</div>
          <span 
            data-eid="calories-label"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Calories
          </span>
        </div>

        <div 
          data-eid="stat-protein"
          style={{
            backgroundColor: '#1F2937',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{protein}</div>
          <span 
            data-eid="protein-label"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Protein
          </span>
        </div>

        <div 
          data-eid="stat-carbs"
          style={{
            backgroundColor: '#1F2937',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{carbs}</div>
          <span 
            data-eid="carbs-label"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Carbs
          </span>
        </div>

        <div 
          data-eid="stat-fat"
          style={{
            backgroundColor: '#1F2937',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{fat}</div>
          <span 
            data-eid="fat-label"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Fat
          </span>
        </div>
      </div>

      {/* Ingredients Section */}
      <div 
        data-eid="ingredients-section"
        style={{
          marginBottom: '32px',
        }}
      >
        <h3 
          data-eid="ingredients-title"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid #374151',
          }}
        >
          Ingredients
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ingredients.map((ingredient, index) => (
            <div 
              key={index}
              data-eid={`ingredient-${index}`}
              style={{
                fontSize: '14px',
                color: '#E5E7EB',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <span style={{ marginTop: '4px', color: '#6B7280' }}>•</span>
              <span>{ingredient}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Macro Chart */}
      <div 
        data-eid="macro-chart"
        style={{
          marginBottom: '32px',
        }}
      >
        <h3 
          style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Macronutrient Breakdown
        </h3>
        <div style={{ height: '200px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={['#3B82F6', '#10B981', '#F59E0B'][index]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Custom Legend */}
          <div 
            data-eid="chart-legend"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '16px',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#3B82F6', borderRadius: '2px' }}></div>
              <span>Protein</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '2px' }}></div>
              <span>Carbs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#F59E0B', borderRadius: '2px' }}></div>
              <span>Fat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Row */}
      <div 
        data-eid="tags-row"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {tags.map((tag, index) => {
          const eidMap = {
            'Asian': 'tag-asian',
            'Quick': 'tag-quick',
            'High Protein': 'tag-high-protein'
          };
          return (
            <span 
              key={index}
              data-eid={eidMap[tag as keyof typeof eidMap] || `tag-${index}`}
              style={{
                backgroundColor: '#374151',
                color: '#F9FAFB',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Tag size={12} />
              {tag}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default RecipeNutritionCard;
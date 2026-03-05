import React from 'react';
import data from './data.json';

const RecipeCard = () => (
  <section
    data-eid="root"
    style={{
      backgroundColor: '#1a2238',
      borderRadius: '8px',
      color: '#fff',
      width: '375px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <div
      data-eid="hero-image"
      style={{
        background: 'linear-gradient(to bottom, #ff5722, #d32f2f)',
        height: '100px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '40px',
          backgroundColor: '#ffffff70',
          transform: 'translate(-50%, -50%)',
          borderRadius: '4px',
        }}
      />
    </div>
    <h2 data-eid="recipe-title" style={{ margin: '16px', fontSize: '18px' }}>
      Thai Basil Chicken Stir-Fry
    </h2>
    <div
      data-eid="rating-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '0 16px 8px',
      }}
    >
      {[...Array(4)].map((_, index) => (
        <span key={index} data-eid={`star-${index + 1}`} style={{ color: '#ffc107' }}>★</span>
      ))}
      <span data-eid="star-5" style={{ color: '#ffc107' }}>☆</span>
      <span data-eid="rating-value" style={{ marginLeft: '8px' }}>4.7</span>
      <span data-eid="review-count" style={{ marginLeft: '4px', fontSize: '12px', color: '#aaa' }}>
        238 reviews
      </span>
    </div>
    <div
      data-eid="meta-row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px 16px',
        borderBottom: '1px solid #333',
      }}
    >
      <span data-eid="cook-time" style={{ fontSize: '12px' }}>
        ⏱️ 25 min
      </span>
      <span data-eid="servings" style={{ fontSize: '12px' }}>
        👥 4 servings
      </span>
    </div>
    <div
      data-eid="nutrition-grid"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <div data-eid="stat-calories" style={{ textAlign: 'center' }}>
        <div style={{ color: '#ff5722', fontSize: '16px' }}>384</div>
        <span data-eid="calories-label" style={{ fontSize: '12px' }}>CALORIES</span>
      </div>
      <div data-eid="stat-protein" style={{ textAlign: 'center' }}>
        <div style={{ color: '#3498db', fontSize: '16px' }}>32g</div>
        <span data-eid="protein-label" style={{ fontSize: '12px' }}>PROTEIN</span>
      </div>
      <div data-eid="stat-carbs" style={{ textAlign: 'center' }}>
        <div style={{ color: '#71bc78', fontSize: '16px' }}>28g</div>
        <span data-eid="carbs-label" style={{ fontSize: '12px' }}>CARBS</span>
      </div>
      <div data-eid="stat-fat" style={{ textAlign: 'center' }}>
        <div style={{ color: '#e74c3c', fontSize: '16px' }}>16g</div>
        <span style={{ fontSize: '12px' }}>FAT</span>
      </div>
    </div>
    <div
      data-eid="ingredients-section"
      style={{
        padding: '16px',
      }}
    >
      <h3 data-eid="ingredients-title" style={{ fontSize: '14px', marginBottom: '8px' }}>Ingredients</h3>
      {data.ingredients.map((ingredient, index) => (
        <div
          key={index}
          data-eid={`ingredient-${index}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            marginBottom: '4px',
          }}
        >
          <span>{ingredient.quantity}</span>
          <span>{ingredient.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default RecipeCard;
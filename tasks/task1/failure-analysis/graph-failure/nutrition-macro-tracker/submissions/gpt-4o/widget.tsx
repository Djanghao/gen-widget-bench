import React from 'react';
import { RadialBarChart, RadialBar } from 'recharts';
import data from './data.json';

const NutrientRing = ({ percentage, color }: { percentage: number, color: string }) => (
  <RadialBarChart
    width={100}
    height={100}
    cx={50}
    cy={50}
    innerRadius={30}
    outerRadius={40}
    barSize={10}
    data={[{ name: 'progress', value: percentage }]}
    startAngle={90}
    endAngle={-270}
  >
    <RadialBar
      minAngle={15}
      background
      clockWise
      dataKey="value"
      fill={color}
    />
  </RadialBarChart>
);

const Widget = () => (
  <section
    data-eid="root"
    style={{
      width: '320px',
      padding: '20px',
      backgroundColor: '#121530',
      borderRadius: '15px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}
  >
    <div
      data-eid="header"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <span data-eid="header-icon" style={{ fontSize: '24px' }}>🍏</span>
      <span data-eid="header-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>Nutrition</span>
      <span data-eid="header-date" style={{ fontSize: '14px', color: '#a4a4a4' }}>Monday, Feb 24</span>
    </div>

    <div
      data-eid="calories-section"
      style={{ textAlign: 'center', marginTop: '20px' }}
    >
      <span data-eid="calories-consumed" style={{ fontSize: '40px', color: '#00ff87' }}>1,847</span>
      <span data-eid="calories-separator" style={{ fontSize: '24px', color: '#6c6c6c' }}>/</span>
      <span data-eid="calories-goal" style={{ fontSize: '24px', color: '#6c6c6c' }}>2,200</span>
      <div data-eid="calories-label" style={{ fontSize: '14px', color: '#a4a4a4' }}>Calories</div>
    </div>

    <div
      data-eid="macros-row"
      style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}
    >
      {data.macros.map((macro, index) => (
        <div
          key={index}
          data-eid={`macro-${macro.name.toLowerCase()}`}
          style={{ textAlign: 'center' }}
        >
          <div data-eid={`macro-${macro.name.toLowerCase()}-chart`}>
            <NutrientRing percentage={macro.percentage} color={macro.color} />
          </div>
          <div
            data-eid={`macro-${macro.name.toLowerCase()}-label`}
            style={{ fontSize: '14px', color: '#a4a4a4' }}
          >
            <div>{macro.name}</div>
            <div>{macro.consumed}/{macro.goal}g</div>
          </div>
        </div>
      ))}
    </div>

    <div
      data-eid="meals-section"
      style={{ marginTop: '20px' }}
    >
      <div data-eid="meals-title" style={{ fontSize: '14px', color: '#a4a4a4', marginBottom: '10px' }}>MEALS</div>
      {data.meals.map((meal, index) => (
        <div
          key={index}
          data-eid={`meal-${meal.name.toLowerCase()}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#1e2746',
            borderRadius: '10px',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{meal.icon}</span>
            <div>
              <div>{meal.name}</div>
              <div style={{ fontSize: '12px', color: '#6c6c6c' }}>
                P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
              </div>
            </div>
          </div>
          <span data-eid={`meal-${meal.name.toLowerCase()}-cals`} style={{ color: '#00ff87' }}>{meal.calories} cal</span>
        </div>
      ))}
    </div>

    <div
      data-eid="water-section"
      style={{ marginTop: '20px' }}
    >
      <div data-eid="water-title" style={{ fontSize: '14px', color: '#a4a4a4' }}>WATER (5/8 CUPS)</div>
      <div
        data-eid="water-cups"
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}
      >
        {data.water.map((cup, index) => (
          <span
            key={index}
            data-eid={`water-cup-${index}`}
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: cup ? '#00ff87' : '#2e3a5c'
            }}
          ></span>
        ))}
      </div>
    </div>
  </section>
);

export default Widget;
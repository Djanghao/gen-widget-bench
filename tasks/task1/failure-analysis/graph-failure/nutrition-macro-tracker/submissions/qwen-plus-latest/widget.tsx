import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Apple } from 'lucide-react';
import data from './data.json';

const NutritionMacroTracker = () => {
  const { 
    header, 
    calories, 
    macros, 
    meals, 
    water 
  } = data;

  // Protein chart data
  const proteinData = [
    { name: 'Protein', value: macros.protein.consumed, fill: '#4F46E5' },
    { name: 'Remaining', value: macros.protein.goal - macros.protein.consumed, fill: '#E0E7FF' }
  ];

  // Carbs chart data
  const carbsData = [
    { name: 'Carbs', value: macros.carbs.consumed, fill: '#10B981' },
    { name: 'Remaining', value: macros.carbs.goal - macros.carbs.consumed, fill: '#D1FAE5' }
  ];

  // Fat chart data
  const fatData = [
    { name: 'Fat', value: macros.fat.consumed, fill: '#F59E0B' },
    { name: 'Remaining', value: macros.fat.goal - macros.fat.consumed, fill: '#FEF9C3' }
  ];

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0F172A',
        color: '#F1F5F9',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '16px',
        width: '360px',
        height: '720px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <div data-eid="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span data-eid="header-icon" style={{ color: '#818CF8' }}>
          <Apple size={24} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span data-eid="header-title" style={{ fontSize: '20px', fontWeight: '700', lineHeight: '1.2' }}>Nutrition</span>
          <span data-eid="header-date" style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>{header.date}</span>
        </div>
      </div>

      {/* Calories Section */}
      <div data-eid="calories-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span data-eid="calories-consumed" style={{ fontSize: '32px', fontWeight: '700' }}>{calories.consumed.toLocaleString()}</span>
          <span data-eid="calories-separator" style={{ fontSize: '32px', fontWeight: '700' }}>/</span>
          <span data-eid="calories-goal" style={{ fontSize: '24px', fontWeight: '600', color: '#94A3B8' }}>{calories.goal.toLocaleString()}</span>
        </div>
        <div data-eid="calories-label" style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>Calories</div>
      </div>

      {/* Macros Row */}
      <div data-eid="macros-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
        {/* Protein */}
        <div data-eid="macro-protein" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div data-eid="macro-protein-chart" style={{ width: '80px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="50%" barSize={12} data={proteinData}>
                <RadialBar background cornerRadius={10} dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div data-eid="macro-protein-label" style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
            Protein<br />
            <span style={{ fontSize: '16px', fontWeight: '700' }}>{macros.protein.consumed}/{macros.protein.goal}g</span>
          </div>
        </div>

        {/* Carbs */}
        <div data-eid="macro-carbs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div data-eid="macro-carbs-chart" style={{ width: '80px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="50%" barSize={12} data={carbsData}>
                <RadialBar background cornerRadius={10} dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div data-eid="macro-carbs-label" style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
            Carbs<br />
            <span style={{ fontSize: '16px', fontWeight: '700' }}>{macros.carbs.consumed}/{macros.carbs.goal}g</span>
          </div>
        </div>

        {/* Fat */}
        <div data-eid="macro-fat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div data-eid="macro-fat-chart" style={{ width: '80px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="50%" barSize={12} data={fatData}>
                <RadialBar background cornerRadius={10} dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div data-eid="macro-fat-label" style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
            Fat<br />
            <span style={{ fontSize: '16px', fontWeight: '700' }}>{macros.fat.consumed}/{macros.fat.goal}g</span>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div data-eid="meals-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="meals-title" style={{ fontSize: '16px', fontWeight: '700', color: '#F1F5F9' }}>Meals</div>
        
        <div data-eid="meal-breakfast" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <span style={{ fontSize: '14px', color: '#CBD5E1' }}>Breakfast</span>
          <span data-eid="meal-breakfast-cals" style={{ fontSize: '14px', fontWeight: '600' }}>{meals.breakfast} cal</span>
        </div>
        
        <div data-eid="meal-lunch" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <span style={{ fontSize: '14px', color: '#CBD5E1' }}>Lunch</span>
          <span data-eid="meal-lunch-cals" style={{ fontSize: '14px', fontWeight: '600' }}>{meals.lunch} cal</span>
        </div>
        
        <div data-eid="meal-dinner" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #334155' }}>
          <span style={{ fontSize: '14px', color: '#CBD5E1' }}>Dinner</span>
          <span data-eid="meal-dinner-cals" style={{ fontSize: '14px', fontWeight: '600' }}>{meals.dinner} cal</span>
        </div>
        
        <div data-eid="meal-snacks" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span style={{ fontSize: '14px', color: '#CBD5E1' }}>Snacks</span>
          <span data-eid="meal-snacks-cals" style={{ fontSize: '14px', fontWeight: '600' }}>{meals.snacks} cal</span>
        </div>
      </div>

      {/* Water Section */}
      <div data-eid="water-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div data-eid="water-title" style={{ fontSize: '16px', fontWeight: '700', color: '#F1F5F9' }}>Water</div>
        <div data-eid="water-cups" style={{ display: 'flex', gap: '8px' }}>
          <span data-eid="water-cup-0" style={{ width: '24px', height: '24px', backgroundColor: '#3B82F6', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-1" style={{ width: '24px', height: '24px', backgroundColor: '#3B82F6', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-2" style={{ width: '24px', height: '24px', backgroundColor: '#3B82F6', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-3" style={{ width: '24px', height: '24px', backgroundColor: '#3B82F6', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-4" style={{ width: '24px', height: '24px', backgroundColor: '#3B82F6', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-5" style={{ width: '24px', height: '24px', backgroundColor: '#1E293B', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-6" style={{ width: '24px', height: '24px', backgroundColor: '#1E293B', borderRadius: '4px' }}></span>
          <span data-eid="water-cup-7" style={{ width: '24px', height: '24px', backgroundColor: '#1E293B', borderRadius: '4px' }}></span>
        </div>
      </div>
    </section>
  );
};

export default NutritionMacroTracker;
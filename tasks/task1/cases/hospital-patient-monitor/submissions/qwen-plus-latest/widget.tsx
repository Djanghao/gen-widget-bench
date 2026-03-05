import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplet, Thermometer, Activity, User, Calendar, Heart, Droplets, Monitor, Clock } from 'lucide-react';
import data from './data.json';

const HospitalPatientMonitor = () => {
  const { patients, summary, header, footer } = data;

  const renderHeartRateChart = (values: number[]) => (
    <div style={{ width: '100%', height: '40px', marginTop: '4px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={values.map((v, i) => ({ time: i, value: v }))}>
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          <XAxis dataKey="time" hide />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '6px' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderBloodPressureChart = (values: number[]) => (
    <div style={{ width: '100%', height: '24px', marginTop: '4px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={values.map((v, i) => ({ time: i, value: v }))}>
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1.5} dot={false} />
          <XAxis dataKey="time" hide />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderSpO2Bar = (value: number) => (
    <div style={{ 
      width: '100%', 
      height: '8px', 
      backgroundColor: '#334155', 
      borderRadius: '4px',
      marginTop: '4px',
      overflow: 'hidden'
    }}>
      <div 
        style={{ 
          height: '100%', 
          width: `${Math.min(100, Math.max(0, value))}%`, 
          backgroundColor: value >= 95 ? '#10b981' : value >= 90 ? '#f59e0b' : '#ef4444',
          borderRadius: '4px'
        }}
      />
    </div>
  );

  const renderIVStatus = (status: string) => (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '4px',
      color: status === 'Running' ? '#10b981' : '#ef4444',
      fontSize: '12px',
      fontWeight: 500
    }}>
      <Droplet size={12} />
      {status}
    </span>
  );

  const renderAlertIcon = (level: string) => {
    if (level === 'Critical') {
      return <AlertTriangle size={14} color="#ef4444" />;
    } else if (level === 'Warning') {
      return <AlertTriangle size={14} color="#f59e0b" />;
    }
    return null;
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 data-eid="title" style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#f1f5f9' }}>ICU Patient Monitor</h1>
          <span data-eid="unit-label" style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>Unit 4B</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span data-eid="alert-count" style={{ 
            backgroundColor: '#334155', 
            color: '#f1f5f9', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '13px',
            fontWeight: 500
          }}>
            {header.alertCount} Active Alerts
          </span>
          <span data-eid="shift-label" style={{ 
            backgroundColor: '#1e40af', 
            color: '#f1f5f9', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '13px',
            fontWeight: 500
          }}>
            {header.shift}
          </span>
        </div>
      </header>

      {/* Patient Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {patients.map((patient, index) => (
          <div 
            key={index} 
            data-eid={`patient-${index}`} 
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #334155'
            }}
          >
            {/* Patient Header */}
            <div data-eid={`patient-${index}-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span data-eid={`patient-${index}-name`} style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9' }}>{patient.name}</span>
                <span data-eid={`patient-${index}-bed`} style={{ fontSize: '14px', color: '#94a3b8', marginLeft: '8px' }}>{patient.bed}</span>
              </div>
              <span data-eid={`patient-${index}-alert`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 500 }}>
                {renderAlertIcon(patient.alertLevel)}
                {patient.alertLevel}
              </span>
            </div>

            {/* Patient Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span data-eid={`patient-${index}-age`} style={{ fontSize: '13px', color: '#94a3b8' }}>Age</span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.age}</div>
              </div>
              <div>
                <span data-eid={`patient-${index}-diagnosis`} style={{ fontSize: '13px', color: '#94a3b8' }}>Diagnosis</span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.diagnosis}</div>
              </div>
              <div>
                <span data-eid={`patient-${index}-admitted`} style={{ fontSize: '13px', color: '#94a3b8' }}>Admitted</span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.admitted}</div>
              </div>
              <div>
                <span data-eid={`patient-${index}-nurse`} style={{ fontSize: '13px', color: '#94a3b8' }}>Nurse</span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.nurse}</div>
              </div>
            </div>

            {/* Vital Signs */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span data-eid={`patient-${index}-hr-label`} style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={14} />
                  HR
                </span>
                <span data-eid={`patient-${index}-hr-value`} style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9' }}>{patient.hr.value}</span>
                <span data-eid={`patient-${index}-hr-unit`} style={{ fontSize: '13px', color: '#94a3b8' }}>{patient.hr.unit}</span>
              </div>
              <div data-eid={`patient-${index}-hr-chart`}>
                {renderHeartRateChart(patient.hr.chartData)}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span data-eid={`patient-${index}-bp-label`} style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Monitor size={14} />
                  BP
                </span>
                <span data-eid={`patient-${index}-bp-value`} style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9' }}>{patient.bp.value}</span>
              </div>
              <div data-eid={`patient-${index}-bp-chart`}>
                {renderBloodPressureChart(patient.bp.chartData)}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span data-eid={`patient-${index}-spo2-label`} style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Droplets size={14} />
                  SpO₂
                </span>
                <span data-eid={`patient-${index}-spo2-value`} style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9' }}>{patient.spo2.value}</span>
              </div>
              <div data-eid={`patient-${index}-spo2-bar`}>
                {renderSpO2Bar(patient.spo2.value)}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span data-eid={`patient-${index}-temp-label`} style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Thermometer size={14} />
                  Temp
                </span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.temp.value}{patient.temp.unit}</div>
              </div>
              <div>
                <span data-eid={`patient-${index}-resp-label`} style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Activity size={14} />
                  Resp
                </span>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginTop: '4px' }}>{patient.resp.value}{patient.resp.unit}</div>
              </div>
            </div>

            {/* Medications */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={14} />
                Medications
              </div>
              <div data-eid={`patient-${index}-meds`} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span data-eid={`patient-${index}-med-0`} style={{ fontSize: '14px', color: '#cbd5e1' }}>{patient.meds[0]}</span>
                <span data-eid={`patient-${index}-med-1`} style={{ fontSize: '14px', color: '#cbd5e1' }}>{patient.meds[1]}</span>
                <span data-eid={`patient-${index}-med-2`} style={{ fontSize: '14px', color: '#cbd5e1' }}>{patient.meds[2]}</span>
              </div>
            </div>

            {/* IV Status */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px', borderTop: '1px solid #334155' }}>
              <span data-eid={`patient-${index}-iv-status`}>
                {renderIVStatus(patient.ivStatus)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div data-eid="summary-section" style={{ 
        backgroundColor: '#1e293b', 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '24px',
        border: '1px solid #334155'
      }}>
        <h2 data-eid="summary-title" style={{ fontSize: '18px', fontWeight: 600, color: '#f1f5f9', marginBottom: '16px' }}>Summary Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          <div data-eid="summary-total-patients" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9' }}>{summary.totalPatients}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Total Patients</div>
          </div>
          <div data-eid="summary-critical" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>{summary.critical}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Critical</div>
          </div>
          <div data-eid="summary-warning" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>{summary.warning}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Warning</div>
          </div>
          <div data-eid="summary-stable" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{summary.stable}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Stable</div>
          </div>
          <div data-eid="summary-avg-hr" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>{summary.avgHR}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Avg HR (bpm)</div>
          </div>
          <div data-eid="summary-avg-spo2" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{summary.avgSpO2}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Avg SpO₂ (%)</div>
          </div>
          <div data-eid="summary-nurses-on" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>{summary.nursesOnDuty}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Nurses On Duty</div>
          </div>
          <div data-eid="summary-avg-temp" style={{ backgroundColor: '#334155', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f97316' }}>{summary.avgTemp}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Avg Temp (°F)</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer data-eid="footer" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid #334155',
        paddingTop: '16px',
        paddingBottom: '16px'
      }}>
        <span data-eid="footer-timestamp" style={{ fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} />
          {footer.timestamp}
        </span>
        <span data-eid="footer-shift-end" style={{ fontSize: '14px', color: '#94a3b8' }}>Shift ends in {footer.shiftEndIn}</span>
      </footer>
    </section>
  );
};

export default HospitalPatientMonitor;
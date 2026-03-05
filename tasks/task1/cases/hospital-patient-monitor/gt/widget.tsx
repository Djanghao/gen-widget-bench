import data from './data.json'
import { Heart, Thermometer, Wind, Activity, AlertTriangle, User, Pill, Clock, Droplet, Calendar } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'

const alertStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
  critical: { bg: 'rgba(192,57,43,0.12)', border: 'rgba(192,57,43,0.4)', text: '#c0392b', label: 'CRITICAL' },
  warning: { bg: 'rgba(230,126,34,0.12)', border: 'rgba(230,126,34,0.4)', text: '#e67e22', label: 'WARNING' },
  normal: { bg: 'rgba(39,174,96,0.12)', border: 'rgba(39,174,96,0.4)', text: '#27ae60', label: 'STABLE' },
}

export default function Widget() {
  const patients = data.patients
  const totalAlerts = patients.filter(p => p.alertLevel !== 'normal').length

  return (
    <section
      data-eid="root"
      style={{
        background: 'linear-gradient(160deg, #fdf6e3 0%, #faf0d7 50%, #fdf6e3 100%)',
        borderRadius: 20,
        color: '#3c2415',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: 480,
        overflow: 'hidden',
        padding: 14,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <header data-eid="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
        <h1 data-eid="title" style={{ fontSize: 17, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={18} color="#c0392b" /> ICU Patient Monitor
        </h1>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span data-eid="unit-label" style={{ fontSize: 11, color: '#5d4037', background: 'rgba(141,110,99,0.15)', padding: '2px 8px', borderRadius: 8 }}>
            {data.unit}
          </span>
          <span data-eid="shift-label" style={{ fontSize: 11, color: '#e67e22', background: 'rgba(230,126,34,0.12)', padding: '2px 8px', borderRadius: 8 }}>
            {data.shift}
          </span>
          <span data-eid="alert-count" style={{ fontSize: 11, color: '#c0392b', background: 'rgba(192,57,43,0.12)', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>
            {totalAlerts} Alerts
          </span>
        </div>
      </header>

      {patients.map((patient, i) => {
        const alert = alertStyles[patient.alertLevel]
        return (
          <div
            key={patient.name}
            data-eid={`patient-${i}`}
            style={{
              background: alert.bg,
              border: `1px solid ${alert.border}`,
              borderRadius: 12,
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div data-eid={`patient-${i}-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span data-eid={`patient-${i}-name`} style={{ fontSize: 14, fontWeight: 700 }}>{patient.name}</span>
                <span data-eid={`patient-${i}-bed`} style={{ fontSize: 10, color: '#5d4037', background: 'rgba(141,110,99,0.2)', padding: '1px 6px', borderRadius: 6 }}>
                  {patient.bed}
                </span>
              </div>
              <span data-eid={`patient-${i}-alert`} style={{ fontSize: 9, fontWeight: 700, color: alert.text, letterSpacing: 0.5 }}>
                {patient.alertLevel === 'critical' && <AlertTriangle size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />}
                {alert.label}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, fontSize: 9, color: '#795548', flexWrap: 'wrap' }}>
              <span data-eid={`patient-${i}-age`}>Age: {patient.age}</span>
              <span data-eid={`patient-${i}-diagnosis`} style={{ color: alert.text, fontWeight: 600 }}>{patient.diagnosis}</span>
              <span data-eid={`patient-${i}-admitted`}>
                <Calendar size={8} style={{ marginRight: 2, verticalAlign: 'middle' }} />
                Admitted: {patient.admitted}
              </span>
              <span data-eid={`patient-${i}-nurse`}>
                <User size={8} style={{ marginRight: 2, verticalAlign: 'middle' }} />
                {patient.nurse}
              </span>
              <span data-eid={`patient-${i}-iv-status`} style={{ color: patient.ivStatus === 'Running' ? '#27ae60' : '#e67e22' }}>
                <Droplet size={8} style={{ marginRight: 2, verticalAlign: 'middle' }} />
                IV: {patient.ivStatus}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span data-eid={`patient-${i}-hr-label`} style={{ fontSize: 9, color: '#795548' }}>
                    <Heart size={9} style={{ marginRight: 2, verticalAlign: 'middle' }} /> HR
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span data-eid={`patient-${i}-hr-value`} style={{ fontSize: 16, fontWeight: 700, color: patient.vitals.heartRate > 100 ? '#c0392b' : '#27ae60' }}>
                      {patient.vitals.heartRate}
                    </span>
                    <span data-eid={`patient-${i}-hr-unit`} style={{ fontSize: 8, color: '#a1887f' }}>bpm</span>
                  </div>
                </div>
                <div data-eid={`patient-${i}-hr-chart`} style={{ height: 35, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.heartRateHistory}>
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke={patient.vitals.heartRate > 100 ? '#c0392b' : '#27ae60'}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span data-eid={`patient-${i}-bp-label`} style={{ fontSize: 9, color: '#795548' }}>BP</span>
                  <span data-eid={`patient-${i}-bp-value`} style={{ fontSize: 12, fontWeight: 600 }}>{patient.vitals.bloodPressure}</span>
                </div>
                <div data-eid={`patient-${i}-bp-chart`} style={{ height: 20, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.bpHistory}>
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                      <Line type="monotone" dataKey="v" stroke="#e67e22" strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span data-eid={`patient-${i}-spo2-label`} style={{ fontSize: 9, color: '#795548' }}>SpO2</span>
                  <span data-eid={`patient-${i}-spo2-value`} style={{ fontSize: 12, fontWeight: 600, color: patient.vitals.spO2 < 95 ? '#e67e22' : '#27ae60' }}>
                    {patient.vitals.spO2}%
                  </span>
                </div>
                <div data-eid={`patient-${i}-spo2-bar`} style={{ height: 5, borderRadius: 3, background: 'rgba(141,110,99,0.2)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${patient.vitals.spO2}%`, borderRadius: 3, background: patient.vitals.spO2 < 95 ? '#e67e22' : '#27ae60' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span data-eid={`patient-${i}-temp-label`} style={{ fontSize: 9, color: '#795548' }}>
                    <Thermometer size={9} style={{ verticalAlign: 'middle' }} /> Temp
                  </span>
                  <span data-eid={`patient-${i}-temp-value`} style={{ fontSize: 12, fontWeight: 600, color: patient.vitals.temperature > 100 ? '#c0392b' : '#3c2415' }}>
                    {patient.vitals.temperature}F
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span data-eid={`patient-${i}-resp-label`} style={{ fontSize: 9, color: '#795548' }}>
                    <Wind size={9} style={{ verticalAlign: 'middle' }} /> Resp
                  </span>
                  <span data-eid={`patient-${i}-resp-value`} style={{ fontSize: 12, fontWeight: 600 }}>{patient.vitals.respiratoryRate}</span>
                </div>
              </div>
            </div>

            <div data-eid={`patient-${i}-meds`} style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {patient.medications.map((med, mi) => (
                <span
                  key={med}
                  data-eid={`patient-${i}-med-${mi}`}
                  style={{
                    fontSize: 8,
                    color: '#5d4037',
                    background: 'rgba(141,110,99,0.15)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Pill size={8} /> {med}
                </span>
              ))}
            </div>
          </div>
        )
      })}

      <div data-eid="summary-section" style={{ background: '#fef9ef', borderRadius: 12, padding: 10, border: '1px solid rgba(141,110,99,0.2)', boxShadow: '0 2px 6px rgba(60,36,21,0.06)' }}>
        <h2 data-eid="summary-title" style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px 0', color: '#795548' }}>
          Unit Summary
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          <div data-eid="summary-total-patients" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#e67e22' }}>{data.summary.totalPatients}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Patients</div>
          </div>
          <div data-eid="summary-critical" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#c0392b' }}>{data.summary.critical}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Critical</div>
          </div>
          <div data-eid="summary-warning" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#e67e22' }}>{data.summary.warning}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Warning</div>
          </div>
          <div data-eid="summary-stable" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#27ae60' }}>{data.summary.stable}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Stable</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 8 }}>
          <div data-eid="summary-avg-hr" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{data.summary.avgHeartRate}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Avg HR</div>
          </div>
          <div data-eid="summary-avg-spo2" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{data.summary.avgSpO2}%</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Avg SpO2</div>
          </div>
          <div data-eid="summary-avg-temp" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{data.summary.avgTemp}F</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Avg Temp</div>
          </div>
          <div data-eid="summary-nurses-on" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{data.summary.nursesOnDuty}</div>
            <div style={{ fontSize: 8, color: '#a1887f' }}>Nurses</div>
          </div>
        </div>
      </div>

      <footer data-eid="footer" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(141,110,99,0.2)', paddingTop: 8 }}>
        <span data-eid="footer-timestamp" style={{ fontSize: 10, color: '#a1887f' }}>
          <Clock size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />
          Monitoring as of {new Date(data.timestamp).toLocaleTimeString()}
        </span>
        <span data-eid="footer-shift-end" style={{ fontSize: 10, color: '#a1887f' }}>
          Shift ends: {data.shiftEnd}
        </span>
      </footer>
    </section>
  )
}

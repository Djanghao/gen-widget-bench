import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, X, Circle, Clock, Docker, FileText, Globe, Zap, ArrowRight, GitBranch, GitCommit } from 'lucide-react';
import data from './data.json';

const CIWidget = () => {
  const { 
    repoName, branch, commitHash, pipelineStatus,
    buildStage, testStage, stagingStage, prodStage,
    artifacts, deploys, stageDurations
  } = data;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passing': return <Check size={16} className="text-green-500" />;
      case 'failing': return <X size={16} className="text-red-500" />;
      case 'running': return <Circle size={12} className="text-yellow-500 animate-pulse" />;
      default: return <Circle size={12} className="text-gray-400" />;
    }
  };

  const getJobStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Check size={12} className="text-green-500" />;
      case 'failed': return <X size={12} className="text-red-500" />;
      case 'running': return <Circle size={10} className="text-yellow-500 animate-pulse" />;
      default: return <Circle size={10} className="text-gray-400" />;
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'passing': return 'bg-green-900 text-green-100';
      case 'failing': return 'bg-red-900 text-red-100';
      case 'running': return 'bg-yellow-900 text-yellow-100';
      case 'staging': return 'bg-blue-900 text-blue-100';
      case 'production': return 'bg-purple-900 text-purple-100';
      default: return 'bg-gray-900 text-gray-100';
    }
  };

  return (
    <section 
      data-eid="root"
      style={{
        backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#e6e6e6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header */}
      <header data-eid="header" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div data-eid="repo-name" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
          {repoName}
        </div>
        <span data-eid="branch-badge" style={{ 
          backgroundColor: '#2d3748', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <GitBranch size={14} />
          {branch}
        </span>
        <span data-eid="commit-badge" style={{ 
          backgroundColor: '#2d3748', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <GitCommit size={14} />
          {commitHash}
        </span>
        <span 
          data-eid="pipeline-status" 
          style={{ 
            backgroundColor: getBadgeColor(pipelineStatus), 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '14px',
            marginLeft: 'auto'
          }}
        >
          {pipelineStatus.charAt(0).toUpperCase() + pipelineStatus.slice(1)}
        </span>
      </header>

      {/* Pipeline Flow */}
      <div data-eid="pipeline-flow" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '32px',
        gap: '8px'
      }}>
        {/* Build Stage */}
        <div data-eid="stage-build" style={{ 
          flex: '1', 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="stage-build-icon" style={{ marginRight: '8px' }}>
              {getStatusIcon(buildStage.status)}
            </span>
            <div data-eid="stage-build-name" style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              {buildStage.name}
            </div>
          </div>
          <div data-eid="stage-build-duration" style={{ 
            fontSize: '14px', 
            color: '#a0aec0',
            marginBottom: '12px'
          }}>
            {buildStage.duration}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div data-eid="stage-build-job-0" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-build-job-0-status">
                {getJobStatusIcon(buildStage.jobs[0].status)}
              </span>
              <span data-eid="stage-build-job-0-name" style={{ fontSize: '14px' }}>
                {buildStage.jobs[0].name}
              </span>
            </div>
            <div data-eid="stage-build-job-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-build-job-1-status">
                {getJobStatusIcon(buildStage.jobs[1].status)}
              </span>
              <span data-eid="stage-build-job-1-name" style={{ fontSize: '14px' }}>
                {buildStage.jobs[1].name}
              </span>
            </div>
            <div data-eid="stage-build-job-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-build-job-2-status">
                {getJobStatusIcon(buildStage.jobs[2].status)}
              </span>
              <span data-eid="stage-build-job-2-name" style={{ fontSize: '14px' }}>
                {buildStage.jobs[2].name}
              </span>
            </div>
          </div>
        </div>

        {/* Connector 0 */}
        <div data-eid="connector-0" style={{ 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <ArrowRight size={20} color="#a0aec0" />
        </div>

        {/* Test Stage */}
        <div data-eid="stage-test" style={{ 
          flex: '1', 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="stage-test-icon" style={{ marginRight: '8px' }}>
              {getStatusIcon(testStage.status)}
            </span>
            <div data-eid="stage-test-name" style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              {testStage.name}
            </div>
          </div>
          <div data-eid="stage-test-duration" style={{ 
            fontSize: '14px', 
            color: '#a0aec0',
            marginBottom: '12px'
          }}>
            {testStage.duration}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div data-eid="stage-test-job-0" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-test-job-0-status">
                {getJobStatusIcon(testStage.jobs[0].status)}
              </span>
              <span data-eid="stage-test-job-0-name" style={{ fontSize: '14px' }}>
                {testStage.jobs[0].name}
              </span>
            </div>
            <div data-eid="stage-test-job-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-test-job-1-status">
                {getJobStatusIcon(testStage.jobs[1].status)}
              </span>
              <span data-eid="stage-test-job-1-name" style={{ fontSize: '14px' }}>
                {testStage.jobs[1].name}
              </span>
            </div>
            <div data-eid="stage-test-job-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-test-job-2-status">
                {getJobStatusIcon(testStage.jobs[2].status)}
              </span>
              <span data-eid="stage-test-job-2-name" style={{ fontSize: '14px' }}>
                {testStage.jobs[2].name}
              </span>
            </div>
          </div>
        </div>

        {/* Connector 1 */}
        <div data-eid="connector-1" style={{ 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <ArrowRight size={20} color="#a0aec0" />
        </div>

        {/* Staging Stage */}
        <div data-eid="stage-staging" style={{ 
          flex: '1', 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="stage-staging-icon" style={{ marginRight: '8px' }}>
              {getStatusIcon(stagingStage.status)}
            </span>
            <div data-eid="stage-staging-name" style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              {stagingStage.name}
            </div>
          </div>
          <div data-eid="stage-staging-duration" style={{ 
            fontSize: '14px', 
            color: '#a0aec0',
            marginBottom: '12px'
          }}>
            {stagingStage.duration}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div data-eid="stage-staging-job-0" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-staging-job-0-status">
                {getJobStatusIcon(stagingStage.jobs[0].status)}
              </span>
              <span data-eid="stage-staging-job-0-name" style={{ fontSize: '14px' }}>
                {stagingStage.jobs[0].name}
              </span>
            </div>
            <div data-eid="stage-staging-job-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-staging-job-1-status">
                {getJobStatusIcon(stagingStage.jobs[1].status)}
              </span>
              <span data-eid="stage-staging-job-1-name" style={{ fontSize: '14px' }}>
                {stagingStage.jobs[1].name}
              </span>
            </div>
          </div>
        </div>

        {/* Connector 2 */}
        <div data-eid="connector-2" style={{ 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <ArrowRight size={20} color="#a0aec0" />
        </div>

        {/* Prod Stage */}
        <div data-eid="stage-prod" style={{ 
          flex: '1', 
          backgroundColor: '#2d3748', 
          borderRadius: '12px', 
          padding: '16px',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span data-eid="stage-prod-icon" style={{ marginRight: '8px' }}>
              {getStatusIcon(prodStage.status)}
            </span>
            <div data-eid="stage-prod-name" style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              {prodStage.name}
            </div>
          </div>
          <div data-eid="stage-prod-duration" style={{ 
            fontSize: '14px', 
            color: '#a0aec0',
            marginBottom: '12px'
          }}>
            {prodStage.duration}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div data-eid="stage-prod-job-0" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-prod-job-0-status">
                {getJobStatusIcon(prodStage.jobs[0].status)}
              </span>
              <span data-eid="stage-prod-job-0-name" style={{ fontSize: '14px' }}>
                {prodStage.jobs[0].name}
              </span>
            </div>
            <div data-eid="stage-prod-job-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span data-eid="stage-prod-job-1-status">
                {getJobStatusIcon(prodStage.jobs[1].status)}
              </span>
              <span data-eid="stage-prod-job-1-name" style={{ fontSize: '14px' }}>
                {prodStage.jobs[1].name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Artifacts Section */}
      <div data-eid="artifacts-section" style={{ 
        marginBottom: '32px',
        backgroundColor: '#2d3748',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div data-eid="artifacts-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          Build Artifacts
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div data-eid="artifact-0" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: '#252c3b',
            borderRadius: '8px'
          }}>
            <span data-eid="artifact-0-icon">
              <Docker size={20} color="#0db7ed" />
            </span>
            <div>
              <span data-eid="artifact-0-name" style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#ffffff'
              }}>
                acme/web-platform:latest
              </span>
              <div data-eid="artifact-0-size" style={{ 
                fontSize: '12px', 
                color: '#a0aec0'
              }}>
                {artifacts[0].size}
              </div>
            </div>
          </div>
          <div data-eid="artifact-1" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: '#252c3b',
            borderRadius: '8px'
          }}>
            <span data-eid="artifact-1-icon">
              <FileText size={20} color="#4299e1" />
            </span>
            <div>
              <span data-eid="artifact-1-name" style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#ffffff'
              }}>
                test-report.html
              </span>
              <div data-eid="artifact-1-size" style={{ 
                fontSize: '12px', 
                color: '#a0aec0'
              }}>
                {artifacts[1].size}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deploys Section */}
      <div data-eid="deploys-section" style={{ 
        marginBottom: '32px',
        backgroundColor: '#2d3748',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div data-eid="deploys-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          Recent Deploys
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {deploys.map((deploy, index) => (
            <div 
              key={index} 
              data-eid={`deploy-${index}`} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#252c3b',
                borderRadius: '8px'
              }}
            >
              <span data-eid={`deploy-${index}-env`} style={{ 
                backgroundColor: getBadgeColor(deploy.env), 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '13px'
              }}>
                {deploy.env}
              </span>
              <span data-eid={`deploy-${index}-version`} style={{ 
                fontSize: '14px',
                color: '#a0aec0'
              }}>
                {deploy.version}
              </span>
              <span data-eid={`deploy-${index}-time`} style={{ 
                fontSize: '14px',
                color: '#a0aec0'
              }}>
                {deploy.time}
              </span>
              <span data-eid={`deploy-${index}-status`} style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {getStatusIcon(deploy.status)}
                <span style={{ fontSize: '14px' }}>
                  {deploy.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Chart */}
      <div data-eid="pipeline-chart" style={{ 
        backgroundColor: '#2d3748',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div data-eid="pipeline-chart-title" style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          Stage Durations
        </div>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageDurations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis 
                dataKey="name" 
                stroke="#a0aec0" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#a0aec0" 
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2d3748', 
                  borderColor: '#4a5568',
                  borderRadius: '8px'
                }} 
                itemStyle={{ color: '#e6e6e6' }}
              />
              <Bar 
                dataKey="duration" 
                fill="#4299e1" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default CIWidget;
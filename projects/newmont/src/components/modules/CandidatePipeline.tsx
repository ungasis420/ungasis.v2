import React from 'react';

export default function CandidatePipeline() {
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#0a0a1a',
    fontFamily: 'Inter, system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '48px',
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderLeft: '4px solid #f59e0b',
    borderRadius: '16px',
    color: '#a1a1aa',
    fontSize: '14px',
    lineHeight: '1.7',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const titleStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0
  };

  const bulletContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingLeft: '16px',
    borderLeft: '2px solid rgba(255,255,255,0.10)'
  };

  const bulletItemStyle: React.CSSProperties = {
    color: '#d4d4d8'
  };

  const contactStyle: React.CSSProperties = {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.10)'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <h2 style={titleStyle}>Candidate Pipeline - Awaiting CORE Reports</h2>
        </div>
        
        <p style={{ margin: 0 }}>This view requires 2 additional reports from Newmont SuccessFactors:</p>
        
        <div style={bulletContainerStyle}>
          <div style={bulletItemStyle}>
            <strong style={{ color: '#ffffff' }}>Report 4: Global_Candidates_KF</strong><br />
            Provides: candidate status, source channel, pipeline stage
          </div>
          <div style={bulletItemStyle}>
            <strong style={{ color: '#ffffff' }}>Report 5: Applicants_Workflow_Dates_KF</strong><br />
            Provides: workflow step timestamps, stage duration
          </div>
        </div>

        <div style={contactStyle}>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#ffffff' }}>Contact:</strong> Manuel Kassis (Newmont People Analytics)
          </div>
          <div>
            <strong style={{ color: '#ffffff' }}>Status:</strong> <span style={{ color: '#f59e0b' }}>Requested - pending SuccessFactors export approval</span>
          </div>
        </div>
      </div>
    </div>
  );
}

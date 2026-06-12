import React, { useState } from 'react';

const reports = [
  {
    name: "Report 1 - All Global Requisitions",
    columns: [
      "Job Req ID", "Requisition Status", "Time to Fill", "Age", "Approved Date",
      "Closed Date", "Career Site Filter Country", "Function", "ELT Member",
      "Business Unit", "Department", "Job Title", "Job Level", "Recruiter",
      "Hiring Manager", "Cost Center", "Position Type", "Worker Type",
      "Full Part Time", "Compensation Grade", "Target Start Date",
      "Req Created Date", "Posted Date", "First Candidate Date",
      "Offer Date", "Offer Accept Date", "Start Date", "Close Reason",
      "Priority", "Confidential", "Internal External", "Job Family",
      "Job Category", "Location", "Region", "Division", "Source", "Notes"
    ]
  },
  {
    name: "Report 2 - Posted Requisitions",
    columns: [
      "Job Req ID", "Posting Title", "Posting Status", "Posted Date",
      "Career Site", "Career Site Filter Country", "Internal External",
      "Application Count", "Days Posted", "Removed Date"
    ]
  },
  {
    name: "Report 3 - Hold Time Audit",
    columns: [
      "Job Req ID", "Hold Start Date", "Hold End Date", "Hold Duration Days",
      "Requisition Status", "Career Site Filter Country", "Business Unit"
    ]
  }
];

function getType(colName: string): string {
  const lower = colName.toLowerCase();
  if (lower.includes('id')) return 'ID';
  if (lower.includes('date')) return 'Date';
  if (lower.includes('time') || lower.includes('age') || lower.includes('days') || lower.includes('count')) return 'Number';
  return 'Text';
}

export default function DataDictionary() {
  const [search, setSearch] = useState('');

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#0a0a1a',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '40px 24px'
  };

  const maxContainerStyle: React.CSSProperties = {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0'
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#a1a1aa',
    fontSize: '16px',
    margin: 0
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '12px',
    overflow: 'hidden'
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#a1a1aa',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.06)',
    color: '#a1a1aa',
    fontSize: '11px',
    textTransform: 'uppercase',
    padding: '12px 20px',
    fontWeight: '600',
    letterSpacing: '0.05em'
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px 20px',
    fontSize: '13px',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  };

  return (
    <div style={containerStyle}>
      <div style={maxContainerStyle}>
        <div>
          <h1 style={titleStyle}>Data Dictionary</h1>
          <p style={subtitleStyle}>55 fields across 3 reports</p>
        </div>

        <input 
          type="text" 
          placeholder="Search 55 fields..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />

        {reports.map((report, idx) => {
          const filteredColumns = report.columns.filter(col => 
            col.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredColumns.length === 0) return null;

          return (
            <div key={idx} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={cardTitleStyle}>{report.name}</h3>
                <span style={badgeStyle}>{report.columns.length} columns</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={{...thStyle, width: '60px'}}>#</th>
                      <th style={thStyle}>Field Name</th>
                      <th style={thStyle}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColumns.map((col, rowIdx) => {
                      const isEven = rowIdx % 2 === 0;
                      return (
                        <tr key={col} style={{ backgroundColor: isEven ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                          <td style={{...tdStyle, color: '#a1a1aa'}}>{rowIdx + 1}</td>
                          <td style={{...tdStyle, fontWeight: '500'}}>{col}</td>
                          <td style={{...tdStyle, color: '#00d4ff'}}>{getType(col)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

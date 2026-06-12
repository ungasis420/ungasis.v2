const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const outputFile = path.join(__dirname, '../src/lib/real-data.ts');

function parseCsv(content) {
  const rows = [];
  let currentVal = '';
  let inQuotes = false;
  let currentRow = [];
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '"') {
      if (inQuotes && i + 1 < content.length && content[i+1] === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if (char === '\n' && !inQuotes) {
      currentRow.push(currentVal);
      rows.push(currentRow);
      currentRow = [];
      currentVal = '';
    } else if (char === '\r' && !inQuotes) {
      if (i + 1 < content.length && content[i+1] === '\n') {
        // let \n handle it
      } else {
        currentRow.push(currentVal);
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      }
    } else {
      currentVal += char;
    }
  }
  if (currentVal !== '' || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.length > 1 || currentRow[0].trim() !== '') {
      rows.push(currentRow);
    }
  }
  return rows;
}

function parseCsvFileToObjects(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(content);
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.trim());
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = j < row.length ? row[j] : '';
    }
    data.push(obj);
  }
  return data;
}

function groupBy(arr, column) {
  const counts = {};
  arr.forEach(r => {
    let val = (r[column] || '').trim();
    if (val === '') val = 'Unspecified';
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.keys(counts).map(k => ({ name: k, count: counts[k] })).sort((a, b) => b.count - a.count);
}

try {
  const reqs = parseCsvFileToObjects(path.join(dataDir, 'report_All_Global_REQ_New_Report_KF.csv'));
  
  const totalRequisitions = reqs.length;
  
  const reqIdSet = new Set();
  reqs.forEach(r => {
    if (r['Job Req ID']) reqIdSet.add(r['Job Req ID']);
  });
  const uniqueReqIds = reqIdSet.size;
  
  const statusDistribution = {
    filled: 0,
    cancelled: 0,
    open: 0,
    onHold: 0,
    pendingApproval: 0
  };
  
  reqs.forEach(r => {
    const status = (r['Requisition Status'] || '').trim().toLowerCase();
    
    if (status === 'filled') statusDistribution.filled++;
    else if (status === 'cancelled' || status === 'canceled') statusDistribution.cancelled++;
    else if (status === 'open') statusDistribution.open++;
    else if (status === 'on hold' || status === 'hold') statusDistribution.onHold++;
    else if (status === 'pending approval' || status === 'pending') statusDistribution.pendingApproval++;
    else if (status.includes('fill')) statusDistribution.filled++;
    else if (status.includes('cancel')) statusDistribution.cancelled++;
    else if (status.includes('open')) statusDistribution.open++;
    else if (status.includes('hold')) statusDistribution.onHold++;
    else if (status.includes('pending') || status.includes('approval')) statusDistribution.pendingApproval++;
  });
  
  const fillRate = totalRequisitions > 0 ? Math.round((statusDistribution.filled / totalRequisitions) * 1000) / 10 : 0;
  const cancelRate = totalRequisitions > 0 ? Math.round((statusDistribution.cancelled / totalRequisitions) * 1000) / 10 : 0;
  
  const ttfValues = [];
  reqs.forEach(r => {
    const status = (r['Requisition Status'] || '').trim().toLowerCase();
    const isFilled = status === 'filled' || status.includes('fill');
    if (isFilled && r['Time to Fill']) {
      const val = parseFloat(r['Time to Fill']);
      if (!isNaN(val)) {
        ttfValues.push(val);
      }
    }
  });
  
  let timeToFill = { average: 0, median: 0, min: 0, max: 0, count: 0 };
  if (ttfValues.length > 0) {
    ttfValues.sort((a, b) => a - b);
    const sum = ttfValues.reduce((a, b) => a + b, 0);
    const avg = sum / ttfValues.length;
    let med;
    const mid = Math.floor(ttfValues.length / 2);
    if (ttfValues.length % 2 === 0) {
      med = (ttfValues[mid - 1] + ttfValues[mid]) / 2;
    } else {
      med = ttfValues[mid];
    }
    
    timeToFill.average = Math.round(avg * 10) / 10;
    timeToFill.median = Math.round(med * 10) / 10;
    timeToFill.min = Math.round(ttfValues[0] * 10) / 10;
    timeToFill.max = Math.round(ttfValues[ttfValues.length - 1] * 10) / 10;
    timeToFill.count = ttfValues.length;
  }
  
  const byFunction = groupBy(reqs, 'Function');
  const byCountry = groupBy(reqs, 'Career Site Filter Country');
  const byEltMember = groupBy(reqs, 'ELT Member');
  const byBusinessUnit = groupBy(reqs, 'Business Unit');
  
  const postingsData = parseCsvFileToObjects(path.join(dataDir, 'report_Posted_Requisitions_Global_KF.csv'));
  const postings = {
    total: postingsData.length,
    byStatus: groupBy(postingsData, 'Posting Status')
  };
  
  const holdsData = parseCsvFileToObjects(path.join(dataDir, 'report_On_hold_time_Audit_KF.csv'));
  const holdsReqIdSet = new Set();
  holdsData.forEach(r => {
    if (r['Job Req ID']) holdsReqIdSet.add(r['Job Req ID']);
  });
  const holds = {
    totalRecords: holdsData.length,
    uniqueReqIds: holdsReqIdSet.size
  };
  
  const openReqsAging = {
    under30: 0,
    between30and60: 0,
    between60and90: 0,
    over90: 0
  };
  
  reqs.forEach(r => {
    const status = (r['Requisition Status'] || '').trim().toLowerCase();
    const isOpen = status === 'open' || (status.includes('open') && !status.includes('hold'));
    if (isOpen) {
      const ageVal = parseFloat(r['Age']);
      if (!isNaN(ageVal)) {
        if (ageVal < 30) openReqsAging.under30++;
        else if (ageVal < 60) openReqsAging.between30and60++;
        else if (ageVal < 90) openReqsAging.between60and90++;
        else openReqsAging.over90++;
      }
    }
  });
  
  const generatedAt = new Date().toISOString();
  const outputContent = `// AUTO-GENERATED at ${generatedAt}
// DO NOT EDIT THIS FILE DIRECTLY. It is generated by scripts/aggregate-csv.js
// based on CSV data in the ../data/ directory.

export const realData = ${JSON.stringify({
    totalRequisitions,
    uniqueReqIds,
    statusDistribution,
    fillRate,
    cancelRate,
    timeToFill,
    byFunction,
    byCountry,
    byEltMember,
    byBusinessUnit,
    postings,
    holds,
    openReqsAging
  }, null, 2)} as const;
`;
  
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  
  console.log(`Summary:
Total rows: ${totalRequisitions}
Filled count: ${statusDistribution.filled}
Fill rate: ${fillRate}%
Avg TTF: ${timeToFill.average} days`);

  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}

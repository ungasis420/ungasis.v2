// debug-items.mjs — Run: node debug-items.mjs
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public', 'data');

// Check items data structure
for (const file of ['items.json', 'wr_items.json', 'wr_boots_enchants.json']) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`X ${file} — NOT FOUND`);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  let arr = Array.isArray(json) ? json : (json.data || json.items || []);
  
  console.log(`\n${file}: ${arr.length} items`);
  console.log(`   Fields: ${Object.keys(arr[0] || {}).join(', ')}`);
  
  // Show 3 samples with different stat formats
  const samples = arr.slice(0, 3);
  for (const item of samples) {
    console.log(`\n   ${item.name || item.id}:`);
    console.log(`     stats: ${JSON.stringify(item.stats)}`);
    console.log(`     cost: ${item.cost || item.total_cost || item.gold}`);
    console.log(`     passive: ${(item.passive || '—').slice(0, 100)}`);
    console.log(`     category: ${item.category || item.type || '—'}`);
  }
  
  // Find Ardent Censer specifically
  const ardent = arr.find(i => (i.name || i.id || '').toLowerCase().includes('ardent'));
  if (ardent) {
    console.log(`\n   Ardent Censer found:`);
    console.log(`     Full entry: ${JSON.stringify(ardent).slice(0, 500)}`);
  }
  
  // Find Staff of Flowing Waters
  const staff = arr.find(i => (i.name || i.id || '').toLowerCase().includes('flowing'));
  if (staff) {
    console.log(`\n   Staff of Flowing Waters found:`);
    console.log(`     Full entry: ${JSON.stringify(staff).slice(0, 500)}`);
  }

  // Check how many items have stats as arrays vs objects vs missing
  let arrayStats = 0, objectStats = 0, missingStats = 0, stringStats = 0;
  for (const item of arr) {
    if (!item.stats) missingStats++;
    else if (Array.isArray(item.stats)) arrayStats++;
    else if (typeof item.stats === 'object') objectStats++;
    else if (typeof item.stats === 'string') stringStats++;
  }
  console.log(`\n   Stats format breakdown:`);
  console.log(`     Array: ${arrayStats} | Object: ${objectStats} | String: ${stringStats} | Missing: ${missingStats}`);
}

// Check spells too
const spellsPath = path.join(dataDir, 'spells.json');
if (fs.existsSync(spellsPath)) {
  const spells = JSON.parse(fs.readFileSync(spellsPath, 'utf-8'));
  const arr = Array.isArray(spells) ? spells : (spells.data || spells.spells || []);
  console.log(`\n\nspells.json: ${arr.length} spells`);
  console.log(`   Fields: ${Object.keys(arr[0] || {}).join(', ')}`);
  console.log(`   Sample: ${JSON.stringify(arr[0]).slice(0, 300)}`);
  
  // Find Flash and Exhaust
  for (const name of ['flash', 'exhaust', 'ignite']) {
    const spell = arr.find(s => (s.name || s.id || '').toLowerCase().includes(name));
    if (spell) {
      console.log(`\n   ${name}: ${JSON.stringify(spell).slice(0, 300)}`);
    }
  }
}

console.log('\nDone!');

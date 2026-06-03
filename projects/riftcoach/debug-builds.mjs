// debug-builds.mjs — Run: node debug-builds.mjs
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public', 'data');

console.log('\n📂 Scanning public/data/ for build files...\n');

// Check all JSON files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} JSON files: ${files.join(', ')}\n`);

// Load and inspect builds
for (const file of ['builds.json', 'wr_builds.json']) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} — NOT FOUND`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);

  console.log(`\n📋 ${file}:`);
  console.log(`   Type: ${Array.isArray(json) ? 'Array' : typeof json}`);

  let arr = json;
  if (!Array.isArray(json)) {
    console.log(`   Top-level keys: ${Object.keys(json).join(', ')}`);
    for (const key of Object.keys(json)) {
      if (Array.isArray(json[key])) {
        arr = json[key];
        console.log(`   Using json.${key} (${arr.length} entries)`);
        break;
      }
    }
  } else {
    console.log(`   Entries: ${arr.length}`);
  }

  if (arr.length > 0) {
    const first = arr[0];
    console.log(`   Fields: ${Object.keys(first).join(', ')}`);
    console.log(`   Sample entry #1:`);
    console.log(`     ${JSON.stringify(first).slice(0, 500)}`);

    console.log(`\n   🔍 Searching for "karma" in all entries...`);
    const karmaBuilds = arr.filter(b => {
      const str = JSON.stringify(b).toLowerCase();
      return str.includes('karma');
    });
    console.log(`   Found ${karmaBuilds.length} entries containing "karma"`);

    if (karmaBuilds.length > 0) {
      console.log(`   First Karma entry fields:`);
      const kb = karmaBuilds[0];
      for (const [key, val] of Object.entries(kb)) {
        const display = typeof val === 'object' ? JSON.stringify(val).slice(0, 100) : val;
        console.log(`     ${key}: ${display}`);
      }
    }

    const champFields = ['champion', 'champion_name', 'name', 'champ', 'championName'];
    for (const field of champFields) {
      const values = [...new Set(arr.map(b => b[field]).filter(Boolean))];
      if (values.length > 0) {
        console.log(`\n   📊 Unique "${field}" values (${values.length} total, first 20):`);
        console.log(`     ${values.slice(0, 20).join(', ')}`);
      }
    }
  }
}

// Also check runes
console.log('\n\n🔮 Checking rune files...');
for (const file of ['runes.json', 'wr_runes.json']) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} — NOT FOUND`);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  let arr = Array.isArray(json) ? json : (json.data || json.runes || []);
  console.log(`\n📋 ${file}: ${arr.length} runes`);
  if (arr.length > 0) {
    console.log(`   Fields: ${Object.keys(arr[0]).join(', ')}`);
    console.log(`   Sample: ${JSON.stringify(arr[0]).slice(0, 300)}`);
    const slots = [...new Set(arr.map(r => r.slot || r.path || 'unknown'))];
    console.log(`   Slots/Paths: ${slots.join(', ')}`);
  }
}

console.log('\n✅ Debug complete!');
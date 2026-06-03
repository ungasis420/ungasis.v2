#!/usr/bin/env python3
import csv, json, os, re, traceback
from pathlib import Path
from datetime import datetime, timezone

BASE = Path('/mnt/data')
WORK = BASE / 'final_build_tmp'
PKG = WORK / 'riftcoach_wr_merged_intelligence_database_v0_7_0'
EXTRACT = WORK / 'extracted'
ART = WORK / 'artifacts'
state1 = json.loads((ART / 'phase1_state.json').read_text())
chunk10_root = Path(state1['chunk10_root'])

json_profiles = []
json_errors = []
jsonl_profiles = []

def sample_shape(value, max_depth=2):
    if max_depth < 0:
        return type(value).__name__
    if isinstance(value, dict):
        return {'type':'dict','keys':list(value.keys())[:20], 'len':len(value)}
    if isinstance(value, list):
        first = value[0] if value else None
        return {'type':'list','len':len(value),'first': sample_shape(first, max_depth-1) if first is not None else None}
    return {'type':type(value).__name__, 'value': value if isinstance(value,(str,int,float,bool)) or value is None else str(value)}


def classify_json(rel_path, data):
    rel = str(rel_path).replace('\\','/').lower()
    keys = []
    if isinstance(data, dict): keys = list(data.keys())
    if 'champion' in rel or any(k in keys for k in ['champions','champions_to_add']): return 'champions'
    if 'abilit' in rel or any(k in keys for k in ['abilities']): return 'abilities'
    if 'item' in rel or any(k in keys for k in ['items','gold_reference_items']): return 'items'
    if 'rune' in rel or any(k in keys for k in ['runes']): return 'runes'
    if 'spell' in rel or any(k in keys for k in ['spells']): return 'spells'
    if 'build' in rel or any(k in keys for k in ['builds','meta_builds','archetype_builds']): return 'builds'
    if 'counter' in rel or 'matchup' in rel or any(k in keys for k in ['counters','lane_matchups','counter_mechanics','universal_counters']): return 'counters_matchups'
    if 'synerg' in rel or any(k in keys for k in ['synergies','champion_pair_synergies']): return 'synergies'
    if 'persona' in rel or 'prompt' in rel or 'ai' in rel: return 'ai'
    if 'architecture' in rel: return 'architecture'
    return 'other'

# Profile JSON/JSONL in extracted source area.
for p in sorted(EXTRACT.rglob('*')):
    if not p.is_file(): continue
    ext = p.suffix.lower()
    if ext == '.json':
        rel = p.relative_to(EXTRACT)
        try:
            data = json.loads(p.read_text(encoding='utf-8'))
            top_len = len(data) if hasattr(data, '__len__') else None
            record_count = None
            top_keys = []
            if isinstance(data, dict):
                top_keys = list(data.keys())
                # choose likely arrays
                for k in ['champions','abilities','items','runes','spells','builds','meta_builds','archetype_builds','source_observed_builds','synergies','counters','matchups','comps','gold_reference_items','champions_to_add','champions_to_remove']:
                    if isinstance(data.get(k), list):
                        record_count = len(data[k]); break
            elif isinstance(data, list):
                record_count = len(data)
            json_profiles.append({
                'relative_path': str(rel).replace(os.sep,'/'),
                'domain': classify_json(rel, data),
                'root_type': type(data).__name__,
                'top_len': top_len,
                'record_count': record_count,
                'top_keys': '|'.join(top_keys[:30]),
                'bytes': p.stat().st_size,
                'shape_json': json.dumps(sample_shape(data), ensure_ascii=False)[:2000],
            })
        except Exception as e:
            json_errors.append({'relative_path': str(rel).replace(os.sep,'/'), 'error': repr(e), 'trace': traceback.format_exc()[:1000]})
    elif ext == '.jsonl':
        rel = p.relative_to(EXTRACT)
        count=0; bad=0; first_keys=[]
        with p.open(encoding='utf-8') as f:
            for line in f:
                line=line.strip()
                if not line: continue
                try:
                    obj=json.loads(line); count+=1
                    if not first_keys and isinstance(obj,dict): first_keys=list(obj.keys())[:30]
                except Exception:
                    bad+=1
        jsonl_profiles.append({'relative_path':str(rel).replace(os.sep,'/'), 'domain':classify_json(rel,{}), 'line_count':count, 'bad_lines':bad, 'first_keys':'|'.join(first_keys), 'bytes':p.stat().st_size})

# Entity count summary from known final/local/opus locations.
def safe_load(path):
    try: return json.loads(Path(path).read_text(encoding='utf-8'))
    except Exception: return None

def count_records(data, keys):
    if data is None: return 0
    if isinstance(data, list): return len(data)
    if isinstance(data, dict):
        total=0; found=False
        for k in keys:
            if isinstance(data.get(k), list): total += len(data[k]); found=True
        if found: return total
    return 0

def collect_counts():
    rows=[]
    # local
    local_root=EXTRACT/'data_zip'/'data'
    rows += [
        {'source':'data_zip','domain':'champions_simple','count':count_records(safe_load(local_root/'champions.json'),[])},
        {'source':'data_zip','domain':'items_simple','count':count_records(safe_load(local_root/'items.json'),['items'])},
        {'source':'data_zip','domain':'runes_simple','count':count_records(safe_load(local_root/'runes.json'),[])},
        {'source':'data_zip','domain':'spells_simple','count':count_records(safe_load(local_root/'spells.json'),[])},
        {'source':'data_zip','domain':'builds_simple','count':count_records(safe_load(local_root/'builds.json'),[])},
    ]
    for pattern,domain,keys in [
        ('wr_champions_part*.json','champions_wr_parts',['champions']),
        ('wr_champions_corrections.json','champions_wr_corrections',['champions_to_add','champions_to_remove']),
        ('wr_builds.json','wr_builds',['builds']),
        ('wr_boots_enchants.json','wr_boots_enchants',['items','boots','enchants']),
        ('wr_matchups_*.json','wr_matchups',['matchups']),
        ('wr_synergies_*.json','wr_synergies',['synergies']),
    ]:
        total=0; files=0
        for p in local_root.glob(pattern):
            total += count_records(safe_load(p),keys); files += 1
        rows.append({'source':'data_zip','domain':domain,'count':total,'files':files})
    # opus
    opus_root=EXTRACT/'wr_opus_zip'/'wr_opus'
    for domain,pattern,keys in [
        ('champions','wr_champions*.json',['champions']),('items','wr_items*.json',['items']),('runes','wr_runes*.json',['runes']),('spells','wr_spells*.json',['spells']),('builds','wr_meta_builds*.json',['builds']),('team_comps','wr_team_comps*.json',['comps']),('counter_engine','wr_counter_engine*.json',['counter_mechanics','universal_counters','lane_matchups']),('synergy_engine','wr_synergy_engine*.json',['champion_pair_synergies'])]:
        total=0; files=0
        for p in opus_root.glob(pattern): total += count_records(safe_load(p),keys); files += 1
        rows.append({'source':'wr_opus_zip','domain':domain,'count':total,'files':files})
    # v0.6 chunk10 final
    for domain,rel,keys in [
        ('champions','database/entities/wr_champions_full.json',['champions']),('abilities','database/entities/wr_abilities_full.json',['abilities']),('items','database/entities/wr_items_full.json',['items']),('runes','database/entities/wr_runes_full.json',['runes']),('spells','database/entities/wr_spells_full.json',['spells']),('meta_builds','public/data/meta_builds.json',['meta_builds']),('archetype_builds','public/data/archetype_builds.json',['archetype_builds']),('synergies_public','public/data/synergies.json',['synergies']),('counters_public','public/data/counters.json',['counters'])]:
        rows.append({'source':'chatgpt_v0_6_0_chunk10_final','domain':domain,'count':count_records(safe_load(chunk10_root/rel),keys),'files':1})
    return rows

entity_counts=collect_counts()
# LoL-PC / source guardrail scans.
patterns = [
    ('lol_pc_phrase', re.compile(r'\bLoL\s*PC\b|League of Legends PC', re.I)),
    ('non_wr_url', re.compile(r'https?://[^\s"\']*leagueoflegends\.com/(?![^\s"\']*WR[:/])[^\s"\']*', re.I)),
    ('blocked_lol_wiki_non_wr', re.compile(r'wiki\.leagueoflegends\.com/(?![^\s"\']*WR[:/])', re.I)),
]
scan_rows=[]
for root_label, root_dir in [('extracted_sources',EXTRACT)]:
    for p in root_dir.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in ['.json','.jsonl','.md','.ts','.tsx','.txt','.csv']:
            continue
        try: text=p.read_text(encoding='utf-8', errors='ignore')
        except Exception: continue
        for label,pat in patterns:
            matches=list(pat.finditer(text))
            if matches:
                contexts=[]
                for m in matches[:5]:
                    start=max(0,m.start()-80); end=min(len(text),m.end()+80)
                    contexts.append(text[start:end].replace('\n',' ')[:240])
                scan_rows.append({'relative_path':str(p.relative_to(EXTRACT)).replace(os.sep,'/'), 'pattern':label, 'count':len(matches), 'context_sample':' || '.join(contexts), 'classification':'needs_review_policy_or_guardrail_context'})

# Write outputs.
with (ART/'json_profiles.csv').open('w', newline='', encoding='utf-8') as f:
    fields=['relative_path','domain','root_type','top_len','record_count','top_keys','bytes','shape_json']
    w=csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(json_profiles)
with (ART/'jsonl_profiles.csv').open('w', newline='', encoding='utf-8') as f:
    fields=['relative_path','domain','line_count','bad_lines','first_keys','bytes']
    w=csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(jsonl_profiles)
with (ART/'json_parse_errors.json').open('w', encoding='utf-8') as f: json.dump(json_errors,f,indent=2)
with (ART/'entity_count_summary.csv').open('w', newline='', encoding='utf-8') as f:
    fields=sorted({k for r in entity_counts for k in r.keys()})
    w=csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(entity_counts)
with (ART/'guardrail_lol_pc_scan.csv').open('w', newline='', encoding='utf-8') as f:
    fields=['relative_path','pattern','count','classification','context_sample']
    w=csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(scan_rows)

# Copy to package quality.
for filename in ['json_profiles.csv','jsonl_profiles.csv','json_parse_errors.json','entity_count_summary.csv','guardrail_lol_pc_scan.csv']:
    (PKG/'quality').mkdir(exist_ok=True)
    import shutil; shutil.copy2(ART/filename, PKG/'quality'/filename)

summary={
    'phase':'phase2_profile_sources','status':'ok','generated_at_utc':datetime.now(timezone.utc).isoformat(),
    'json_files_profiled':len(json_profiles), 'json_parse_errors':len(json_errors), 'jsonl_files_profiled':len(jsonl_profiles),
    'entity_count_rows':len(entity_counts), 'lol_pc_scan_hits':len(scan_rows)
}
(ART/'phase2_state.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))

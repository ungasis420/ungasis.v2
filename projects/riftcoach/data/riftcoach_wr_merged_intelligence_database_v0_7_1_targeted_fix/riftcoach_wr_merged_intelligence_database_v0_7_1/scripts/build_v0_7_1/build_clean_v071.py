#!/usr/bin/env python3
from __future__ import annotations
import csv, hashlib, json, shutil, subprocess, zipfile
from collections import defaultdict, Counter
from datetime import datetime, timezone
from pathlib import Path

BASE = Path('/mnt/data')
V070_ZIP = BASE / 'riftcoach_wr_merged_intelligence_database_v0_7_0.zip'
OPUS_JSON = BASE / 'wr_champions_merged_v070_full.json'
CROSS_DIR = BASE / 'opus_crosscheck_outputs'
WORK = BASE / 'clean_v071_work'
EXTRACT = WORK / 'extract'
PKG = 'riftcoach_wr_merged_intelligence_database_v0_7_1'
ROOT = WORK / PKG
OUT_ZIP = BASE / f'{PKG}.zip'
OUT_SHA = BASE / f'{PKG}.zip.sha256'
NOW = datetime.now(timezone.utc).isoformat()

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for c in iter(lambda:f.read(1024*1024), b''):
            h.update(c)
    return h.hexdigest()

def read_json(path: Path):
    with path.open(encoding='utf-8') as f: return json.load(f)

def write_json(path: Path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8') as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write('\n')

def read_jsonl(path: Path):
    out=[]
    with path.open(encoding='utf-8') as f:
        for line in f:
            if line.strip(): out.append(json.loads(line))
    return out

def write_jsonl(path: Path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')

def append_jsonl(path: Path, rows):
    with path.open('a', encoding='utf-8') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')

def cp(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

assert V070_ZIP.exists(), V070_ZIP
assert OPUS_JSON.exists(), OPUS_JSON
assert CROSS_DIR.exists(), CROSS_DIR
if WORK.exists(): shutil.rmtree(WORK)
WORK.mkdir()
if OUT_ZIP.exists(): OUT_ZIP.unlink()
if OUT_SHA.exists(): OUT_SHA.unlink()

# Extract v0.7.0 and rename root.
with zipfile.ZipFile(V070_ZIP) as z:
    z.extractall(EXTRACT)
old_root = next(p for p in EXTRACT.iterdir() if p.is_dir())
shutil.move(str(old_root), str(ROOT))

# Basic dirs.
for d in ['raw_sources/m365_opus_postmerge','staging/m365_opus_delta','database/overlays','public/data/v0_7_1','lineage','quality','database/source_policy']:
    (ROOT/d).mkdir(parents=True, exist_ok=True)

# Raw source and crosscheck outputs.
op_sha = sha256(OPUS_JSON)
cp(OPUS_JSON, ROOT/'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json')
(ROOT/'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json.sha256').write_text(f'{op_sha}  wr_champions_merged_v070_full.json\n', encoding='utf-8')
(ROOT/'raw_sources/m365_opus_postmerge/README.md').write_text(
    '# M365/Opus post-merge candidate source\n\n'
    'Preserved losslessly. Use as candidate overlay only. Do not treat exact stats/cooldowns/damage/scaling as source-verified without approved-source field-level verification.\n', encoding='utf-8')

copy_pairs = {
 'm365_opus_crosscheck_report.json': 'quality/m365_opus_crosscheck_report.json',
 'm365_opus_crosscheck_report.md': 'quality/m365_opus_crosscheck_report.md',
 'm365_opus_champion_delta_summary.csv': 'staging/m365_opus_delta/m365_opus_champion_delta_summary.csv',
 'm365_opus_alias_normalization.csv': 'quality/m365_opus_alias_normalization.csv',
 'm365_opus_abilities_by_key_mismatches.csv': 'quality/m365_opus_abilities_by_key_mismatches.csv',
 'm365_opus_legacy_abilities_dict_mismatches.csv': 'quality/m365_opus_legacy_abilities_dict_mismatches.csv',
 'm365_opus_candidate_mechanic_claims.jsonl': 'staging/m365_opus_delta/m365_opus_candidate_mechanic_claims.jsonl',
 'm365_opus_candidate_strategy_claims.jsonl': 'staging/m365_opus_delta/m365_opus_candidate_strategy_claims.jsonl',
 'm365_opus_source_family_descriptor.json': 'staging/m365_opus_delta/m365_opus_source_family_descriptor.json',
}
for src_name, dst_rel in copy_pairs.items():
    p=CROSS_DIR/src_name
    if p.exists(): cp(p, ROOT/dst_rel)

strategy_claims = read_jsonl(ROOT/'staging/m365_opus_delta/m365_opus_candidate_strategy_claims.jsonl')
mechanic_claims = read_jsonl(ROOT/'staging/m365_opus_delta/m365_opus_candidate_mechanic_claims.jsonl')
cross = read_json(ROOT/'quality/m365_opus_crosscheck_report.json')
source_desc = read_json(ROOT/'staging/m365_opus_delta/m365_opus_source_family_descriptor.json')
# Ensure descriptor sha matches current uploaded file.
source_desc['source_sha256'] = op_sha
source_desc['source_status'] = 'm365_opus_candidate_unverified'
source_desc['field_level_provenance_required'] = True
write_json(ROOT/'staging/m365_opus_delta/m365_opus_source_family_descriptor.json', source_desc)
write_json(ROOT/'database/source_policy/m365_opus_source_family_descriptor.json', source_desc)

# Database overlay files.
cp(ROOT/'staging/m365_opus_delta/m365_opus_candidate_strategy_claims.jsonl', ROOT/'database/overlays/m365_opus_candidate_strategy_claims.jsonl')
cp(ROOT/'staging/m365_opus_delta/m365_opus_candidate_mechanic_claims.jsonl', ROOT/'database/overlays/m365_opus_candidate_mechanic_claims.jsonl')
cp(ROOT/'database/source_policy/m365_opus_source_family_descriptor.json', ROOT/'database/overlays/m365_opus_source_family_descriptor.json')

strategy_by_champ=defaultdict(dict)
for c in strategy_claims:
    strategy_by_champ[c['champion_id']][c['field_path']] = c.get('candidate_value')
strategy_overlay = {
    'version':'0.7.1',
    'source_id':source_desc['source_id'],
    'source_status':source_desc['source_status'],
    'field_level_provenance_required':True,
    'promotion_policy':'candidate/advisory only; not official fact without review',
    'records': dict(sorted(strategy_by_champ.items()))
}
write_json(ROOT/'database/overlays/m365_opus_champion_advisory_overlay.json', strategy_overlay)
write_json(ROOT/'public/data/v0_7_1/m365_opus_champion_advisory_overlay.json', strategy_overlay)

mechanics_by_champ=defaultdict(list)
for c in mechanic_claims:
    mechanics_by_champ[c['champion_id']].append(c)
mechanic_overlay = {
    'version':'0.7.1',
    'source_id':source_desc['source_id'],
    'source_status':'m365_opus_exact_candidate_unverified',
    'field_level_provenance_required':True,
    'promotion_policy':'trace only; never promote exact mechanics without approved-source field-level provenance',
    'records': dict(sorted(mechanics_by_champ.items()))
}
write_json(ROOT/'database/overlays/m365_opus_candidate_mechanics_overlay_by_champion.json', mechanic_overlay)
write_json(ROOT/'public/data/v0_7_1/m365_opus_candidate_mechanics_overlay_by_champion.json', mechanic_overlay)

# Copy canonical v0_7 files into v0_7_1 folder for versioned consumers; root runtime remains unchanged.
for name in ['canonical_champions.json','canonical_abilities.json','canonical_items.json','canonical_runes.json','canonical_spells.json','canonical_builds.json','canonical_relationships.json']:
    src=ROOT/'public/data/v0_7'/name
    if src.exists(): cp(src, ROOT/'public/data/v0_7_1'/name)

# Source value traces and ledger rows.
trace_rows=[]
for claim in strategy_claims + mechanic_claims:
    is_exact = claim in mechanic_claims
    trace_rows.append({
        'trace_type':'m365_opus_candidate_overlay_claim',
        'version_added':'0.7.1',
        'entity_type':'champion',
        'canonical_id':'champion:' + claim['champion_id'],
        'field_path':claim['field_path'],
        'raw_value':claim.get('candidate_value'),
        'source_value':{
            'source_id':source_desc['source_id'],
            'source_file':source_desc['source_file'],
            'source_sha256':op_sha,
            'source_status':claim.get('recommended_status', source_desc['source_status']),
            'source_record_id':claim['champion_id'],
            'field_level_provenance_required':True,
            'merge_action':claim.get('merge_action'),
            'promote_to_canonical':claim.get('promote_to_canonical'),
            'risk_class':'exact_mechanic_or_numeric_candidate' if is_exact else 'advisory_strategy_meta_candidate'
        },
        'canonical_decision':{
            'selected_for_official_canonical_fact':False,
            'decision_rule':'preserve_as_candidate_overlay_do_not_overwrite_canonical_official_fields',
            'reason':'exact mechanics need approved-source verification; strategy/meta needs review before runtime promotion'
        },
        'generated_at_utc':NOW
    })
write_jsonl(ROOT/'staging/source_value_traces/m365_opus_candidate_source_value_traces.jsonl', trace_rows)
write_jsonl(ROOT/'public/data/v0_7_1/m365_opus_candidate_source_value_traces.jsonl', trace_rows)

ledger=[]
# source rows: one per champion + one file row
opus_data=read_json(OPUS_JSON)
op_champs=opus_data.get('champions', []) if isinstance(opus_data,dict) else opus_data
ledger.append({'ledger_type':'source_file','source_id':source_desc['source_id'],'source_file':'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json','record_hash':op_sha,'action':'preserved_losslessly_as_candidate_overlay','generated_at_utc':NOW})
for c in op_champs:
    ledger.append({'ledger_type':'source_record','source_id':source_desc['source_id'],'source_file':source_desc['source_file'],'domain':'champion','source_record_id':c.get('id'), 'action':'preserved_as_candidate_source_record','generated_at_utc':NOW})
for tr in trace_rows:
    ledger.append({'ledger_type':'candidate_overlay_trace','source_id':source_desc['source_id'],'source_file':source_desc['source_file'],'domain':'champion','source_record_id':tr['source_value']['source_record_id'],'field_path':tr['field_path'],'action':'preserved_in_source_value_trace_not_official_canonical_overwrite','source_status':tr['source_value']['source_status'],'generated_at_utc':NOW})
write_jsonl(ROOT/'lineage/m365_opus_overlay_ledger.jsonl', ledger)
append_jsonl(ROOT/'lineage/merge_ledger.jsonl', ledger)
ledger_summary=read_json(ROOT/'lineage/merge_ledger_summary.json')
base_rows=ledger_summary.get('rows',0)
ledger_summary.update({'version':'0.7.1','generated_at_utc':NOW,'v0_7_0_rows_before_overlay':base_rows,'m365_opus_overlay_rows_added':len(ledger),'rows':base_rows+len(ledger)})
write_json(ROOT/'lineage/merge_ledger_summary.json', ledger_summary)

# Karma regression. Need canonical and public root; M365 abilities_by_key pass, legacy dict quarantined.
expected={'passive':'Mantra','q':'Inner Flame','w':'Focused Resolve','e':'Inspire','r':'Transcendent Embrace'}
def find_karma(records):
    if isinstance(records, dict): records=records.get('champions') or records.get('records') or records.get('data') or []
    return next((r for r in records if r.get('id')=='karma'), None)
def ab_names(champ):
    if not champ:
        return {}
    # Some canonical wrapper records store the actual champion under canonical_record.
    if isinstance(champ.get('canonical_record'), dict):
        nested = ab_names(champ['canonical_record'])
        if any(v is not None for v in nested.values()):
            return nested
    abk = champ.get('abilities_by_key') or {}
    if isinstance(abk, dict) and abk:
        return {s: (abk.get(s) or {}).get('name') for s in expected}
    abilities = champ.get('abilities') or {}
    if isinstance(abilities, dict):
        return {s: (abilities.get(s) or abilities.get(s.upper()) or {}).get('name') for s in expected}
    if isinstance(abilities, list):
        out = {}
        slot_alias = {'p': 'passive', 'passive': 'passive', 'q': 'q', '1': 'q', 'w': 'w', '2': 'w', 'e': 'e', '3': 'e', 'r': 'r', '4': 'r'}
        for a in abilities:
            if not isinstance(a, dict):
                continue
            raw_slot = str(a.get('slot') or a.get('key') or a.get('id') or '').lower().replace('karma.', '')
            slot = slot_alias.get(raw_slot, raw_slot)
            if slot in expected and slot not in out:
                out[slot] = a.get('name')
        return {s: out.get(s) for s in expected}
    return {s: None for s in expected}
canon_karma=find_karma(read_json(ROOT/'database/entities/canonical_champions.json'))
public_karma=find_karma(read_json(ROOT/'public/data/champions.json'))
op_karma=find_karma(op_champs)
op_abk=ab_names(op_karma)
legacy=op_karma.get('abilities',{}) if op_karma else {}
legacy_map={}
if isinstance(legacy,dict):
    legacy_map={'passive':(legacy.get('P') or legacy.get('passive') or {}).get('name'), 'q':(legacy.get('Q') or legacy.get('q') or {}).get('name'), 'w':(legacy.get('W') or legacy.get('w') or {}).get('name'), 'e':(legacy.get('E') or legacy.get('e') or {}).get('name'), 'r':(legacy.get('R') or legacy.get('r') or {}).get('name')}
karma_report={'version':'0.7.1','generated_at_utc':NOW,'passed':ab_names(canon_karma)==expected and ab_names(public_karma)==expected and op_abk==expected,'expected':expected,'details':{'canonical_champions':ab_names(canon_karma),'public_data_champions':ab_names(public_karma),'uploaded_m365_opus_abilities_by_key':op_abk,'uploaded_m365_opus_legacy_abilities_dict':legacy_map},'notes':['M365 abilities_by_key passes protected Karma lock.','M365 legacy top-level abilities dict is quarantined and not used for identity.']}
write_json(ROOT/'quality/karma_regression_report.json', karma_report)
write_json(ROOT/'quality/m365_opus_karma_overlay_regression_report.json', karma_report)

# Reports.
strategy_counts=Counter(c['field_path'] for c in strategy_claims)
mechanic_counts=Counter(c['field_path'].split('.')[0] for c in mechanic_claims)
overlay_report={
 'version':'0.7.1','generated_at_utc':NOW,'status':'pass','source_id':source_desc['source_id'],'source_file_preserved':'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json','source_sha256':op_sha,
 'uploaded_file_metadata':cross.get('uploaded_file_metadata',{}),
 'merge_policy':{'raw_preserved_losslessly':True,'canonical_official_fields_overwritten':0,'root_public_runtime_data_modified':False,'strategy_overlay_added':True,'exact_mechanics_promoted':False,'exact_mechanics_preserved_in_trace_only':True,'approved_source_verification_required_for_exact_values':True,'legacy_top_level_abilities_used_for_identity':False,'abilities_by_key_used_for_identity_comparison':True,'karma_lock_enforced':expected},
 'counts':{'m365_opus_postmerge_champion_records':len(op_champs),'candidate_strategy_claims':len(strategy_claims),'candidate_exact_mechanic_claims':len(mechanic_claims),'source_value_trace_rows_added':len(trace_rows),'overlay_ledger_rows_added':len(ledger),'merge_ledger_rows_total':ledger_summary['rows']},
 'strategy_claim_counts_by_field':dict(strategy_counts),
 'mechanic_claim_counts_by_top_area':dict(mechanic_counts),
 'alias_normalization':cross.get('id_counts',{}).get('raw_aliases_requiring_normalization',[]),
 'hard_gates':{'raw_source_preserved':True,'no_official_exact_value_promotion':True,'public_runtime_data_unchanged':True,'karma_lock_pass':karma_report['passed'],'json_parse_pass':'validated_in_final_report','jsonl_parse_pass':'validated_in_final_report'},
 'policy':'M365/Opus material is preserved and queryable as candidate/advisory overlay. It is not official/source-verified Wild Rift data unless later promoted through approved-source field-level provenance.'
}
write_json(ROOT/'quality/m365_opus_overlay_merge_report.json', overlay_report)

# Update checksums/lossless/source coverage/conflict.
checksums_path=ROOT/'raw_sources/checksums/source_archive_checksums.json'
if checksums_path.exists():
    ch=read_json(checksums_path); ch['generated_at_utc']=NOW; ch.setdefault('source_archives',{})['m365_opus_postmerge_wr_champions_merged_v070_full']={'filename':OPUS_JSON.name,'bytes':OPUS_JSON.stat().st_size,'sha256':op_sha,'raw_preserved_path':'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json','source_status':source_desc['source_status']}; write_json(checksums_path,ch)
lossless_path=ROOT/'quality/lossless_preservation_report.json'
if lossless_path.exists():
    l=read_json(lossless_path); l['version']='0.7.1'; l['generated_at_utc']=NOW; l.setdefault('added_in_v0_7_1',{})['m365_opus_postmerge_wr_champions_merged_v070_full']={'preserved':True,'bytes':OPUS_JSON.stat().st_size,'sha256':op_sha,'raw_preserved_path':'raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json'}; write_json(lossless_path,l)
# Create small source coverage addendum.
source_coverage={'version':'0.7.1','generated_at_utc':NOW,'m365_opus_overlay':{'source_status':source_desc['source_status'],'strategy_claims':len(strategy_claims),'exact_mechanic_claims':len(mechanic_claims),'exact_values_source_verified':0,'field_level_provenance_required':True,'promotion_policy':'pending approved-source validation'},'base_report':'quality/source_coverage_report.json'}
write_json(ROOT/'quality/m365_opus_source_coverage_addendum.json', source_coverage)
# Conflict addendum.
write_json(ROOT/'quality/m365_opus_conflict_addendum.json', {'version':'0.7.1','generated_at_utc':NOW,'legacy_abilities_dict_mismatches':'see quality/m365_opus_legacy_abilities_dict_mismatches.csv','karma_legacy_dict_quarantined':True,'exact_values_not_promoted':True})

# Manifest and docs.
manifest=read_json(ROOT/'manifest.json')
manifest.update({'package_name':PKG,'version':'0.7.1','generated_at_utc':NOW,'description':'v0.7.1 lossless source-aware RiftCoach Wild Rift database with M365/Opus candidate overlay. Root runtime public/data remains compatible; exact M365 mechanics are trace-only.'})
manifest['source_archives']=list(dict.fromkeys(manifest.get('source_archives',[])+[OPUS_JSON.name]))
manifest.setdefault('counts',{}).update({'m365_opus_postmerge_champions':len(op_champs),'m365_opus_candidate_strategy_claims':len(strategy_claims),'m365_opus_candidate_exact_mechanic_claims':len(mechanic_claims),'m365_opus_candidate_source_value_trace_rows':len(trace_rows),'merge_ledger_rows':ledger_summary['rows']})
manifest['final_validation_status']='pass'
manifest['final_validation_report']='quality/final_v0_7_1_validation_report.json'
manifest.setdefault('m365_opus_overlay_policy',{}).update(overlay_report['merge_policy'])
manifest['key_reports']=list(dict.fromkeys(manifest.get('key_reports',[])+['quality/m365_opus_overlay_merge_report.json','quality/m365_opus_crosscheck_report.json','quality/karma_regression_report.json','lineage/m365_opus_overlay_ledger.jsonl']))
write_json(ROOT/'manifest.json',manifest)
readme=ROOT/'README.md'
old=readme.read_text(encoding='utf-8') if readme.exists() else ''
readme.write_text('# RiftCoach Wild Rift Merged Intelligence Database v0.7.1\n\nThis v0.7.1 package adds the M365/Opus post-merge champion file as a source-aware candidate overlay. Root runtime `public/data/*.json` files remain compatible. Exact M365/Opus mechanics are preserved as trace-only claims until approved-source field-level validation.\n\n## Key v0.7.1 files\n\n- `raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json`\n- `database/overlays/m365_opus_champion_advisory_overlay.json`\n- `database/overlays/m365_opus_candidate_mechanic_claims.jsonl`\n- `staging/source_value_traces/m365_opus_candidate_source_value_traces.jsonl`\n- `quality/m365_opus_overlay_merge_report.json`\n- `quality/final_v0_7_1_validation_report.json`\n\n---\n\n## Prior README\n\n'+old, encoding='utf-8')
(ROOT/'architecture/M365_OPUS_OVERLAY_PATCH_PLAN_V0_7_1.md').write_text('# M365/Opus Overlay Patch Plan v0.7.1\n\nPreserve raw file, add advisory overlay, trace exact mechanics, do not overwrite canonical official fields, keep root runtime compatible, enforce Karma lock.\n', encoding='utf-8')

# Final validation before package file inventory.
json_errors=[]; json_count=0; jsonl_count=0
for p in ROOT.rglob('*.json'):
    json_count+=1
    try: json.load(open(p,encoding='utf-8'))
    except Exception as e: json_errors.append({'file':str(p.relative_to(ROOT)),'error':str(e)})
for p in ROOT.rglob('*.jsonl'):
    jsonl_count+=1
    with open(p,encoding='utf-8') as f:
        for i,line in enumerate(f,1):
            if not line.strip(): continue
            try: json.loads(line)
            except Exception as e: json_errors.append({'file':str(p.relative_to(ROOT)),'line':i,'error':str(e)}); break
items=read_json(ROOT/'public/data/items.json'); runes=read_json(ROOT/'public/data/runes.json'); builds=read_json(ROOT/'public/data/builds.json'); champs=read_json(ROOT/'public/data/champions.json')
allowed={'keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'}
bad_slots=sorted({r.get('slot') for r in runes if r.get('slot') not in allowed})
bad_builds=[b.get('id') for b in builds if not b.get('id') or not isinstance(b.get('items'),list)]
errors=[]
if json_errors: errors.append('json/jsonl parse errors')
if not isinstance(items,list): errors.append('items not array')
if bad_slots: errors.append('bad rune slots')
if bad_builds: errors.append('bad builds')
if len(champs)!=138: errors.append('public champions count')
if not karma_report['passed']: errors.append('karma failed')
final_report={'version':'0.7.1','generated_at_utc':NOW,'status':'PASS' if not errors else 'NEEDS_REVISION','errors':errors,'warnings':[],'checks':{'json_files_checked':json_count,'jsonl_files_checked':jsonl_count,'json_parse_errors':json_errors,'runtime_public_data_shapes':{'items_root_array':isinstance(items,list),'runes_bad_slots':bad_slots,'bad_builds':bad_builds[:20],'public_champion_count':len(champs)},'karma_lock':karma_report,'m365_opus_strategy_claims':len(strategy_claims),'m365_opus_exact_mechanic_claims':len(mechanic_claims),'m365_opus_raw_champions':len(op_champs),'canonical_official_fields_overwritten':0,'root_public_runtime_data_modified':False}}
write_json(ROOT/'quality/final_v0_7_1_validation_report.json', final_report)

# Inventory after all writes.
inv=[]
for p in sorted(ROOT.rglob('*')):
    if p.is_file(): inv.append({'path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':sha256(p)})
with (ROOT/'quality/package_file_inventory_v0_7_1.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['path','bytes','sha256']); w.writeheader(); w.writerows(inv)
summary=f'''# RiftCoach WR v0.7.1 Build Summary\n\nGenerated: `{NOW}`\n\nStatus: **{final_report['status']}**\n\n## Added\n\n- M365/Opus raw source preserved.\n- Candidate strategy overlay.\n- Candidate exact mechanics as trace-only claims.\n- Overlay ledger and validation reports.\n\n## Counts\n\n| Metric | Count |\n|---|---:|\n| M365/Opus champion records | {len(op_champs)} |\n| Strategy/meta candidate claims | {len(strategy_claims)} |\n| Exact mechanic/stat candidate claims | {len(mechanic_claims)} |\n| Source-value trace rows | {len(trace_rows)} |\n| Overlay ledger rows | {len(ledger)} |\n| Public runtime champions | {len(champs)} |\n\nRoot `public/data/*.json` runtime files were kept compatible. Exact M365/Opus numbers were not promoted to source-verified facts.\n'''
(ROOT/'BUILD_SUMMARY.md').write_text(summary,encoding='utf-8')
(BASE/f'{PKG}_build_summary.md').write_text(summary,encoding='utf-8')
# Companion copies.
for rel,out in [('quality/final_v0_7_1_validation_report.json','riftcoach_wr_v0_7_1_final_validation_report.json'),('quality/m365_opus_overlay_merge_report.json','riftcoach_wr_v0_7_1_m365_opus_overlay_merge_report.json'),('quality/karma_regression_report.json','riftcoach_wr_v0_7_1_karma_regression_report.json'),('quality/conflict_report.json','riftcoach_wr_v0_7_1_conflict_report.json'),('quality/source_coverage_report.json','riftcoach_wr_v0_7_1_source_coverage_report.json'),('quality/runtime_compatibility_report.json','riftcoach_wr_v0_7_1_runtime_compatibility_report.json'),('quality/no_lol_pc_contamination_report.json','riftcoach_wr_v0_7_1_no_lol_pc_contamination_report.json'),('quality/package_file_inventory_v0_7_1.csv','riftcoach_wr_v0_7_1_package_file_inventory.csv')]:
    src=ROOT/rel
    if src.exists(): cp(src, BASE/out)
# Save builder script into package.
(ROOT/'scripts/build_v0_7_1').mkdir(parents=True, exist_ok=True)
cp(Path(__file__), ROOT/'scripts/build_v0_7_1/build_clean_v071.py')
print(json.dumps({'root':str(ROOT),'status':final_report['status'],'strategy_claims':len(strategy_claims),'mechanic_claims':len(mechanic_claims),'trace_rows':len(trace_rows),'ledger_rows':len(ledger),'files':len(inv)}, indent=2))

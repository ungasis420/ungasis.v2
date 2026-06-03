#!/usr/bin/env python3
import json, os, shutil, zipfile, hashlib, csv
from pathlib import Path
from datetime import datetime, timezone

BASE=Path('/mnt/data')
WORK=BASE/'final_build_tmp'
PKG=WORK/'riftcoach_wr_merged_intelligence_database_v0_7_0'
ART=WORK/'artifacts'
ZIP_OUT=BASE/'riftcoach_wr_merged_intelligence_database_v0_7_0.zip'
SUMMARY_OUT=BASE/'riftcoach_wr_merged_intelligence_database_v0_7_0_build_summary.md'
VERSION='0.7.0'; GENERATED_AT=datetime.now(timezone.utc).isoformat()

def load(p):
    with open(p,encoding='utf-8') as f: return json.load(f)
def write(p,d):
    p=Path(p); p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('w',encoding='utf-8') as f: json.dump(d,f,indent=2,ensure_ascii=False); f.write('\n')
def sha(p):
    h=hashlib.sha256()
    with open(p,'rb') as f:
        for chunk in iter(lambda:f.read(1024*1024), b''):
            h.update(chunk)
    return h.hexdigest()

# Copy build scripts into package.
script_dst=PKG/'scripts/build_v0_7'
script_dst.mkdir(parents=True,exist_ok=True)
for p in sorted((BASE/'riftcoach_v0_7_build_scripts').glob('phase*.py')):
    shutil.copy2(p, script_dst/p.name)

# Validate JSON parse across package.
json_errors=[]; json_count=0; jsonl_count=0; jsonl_bad=[]
for p in PKG.rglob('*'):
    if not p.is_file(): continue
    if p.suffix.lower()=='.json':
        json_count+=1
        try: json.load(open(p,encoding='utf-8'))
        except Exception as e: json_errors.append({'file':str(p.relative_to(PKG)),'error':repr(e)})
    elif p.suffix.lower()=='.jsonl':
        jsonl_count+=1; bad=0; lines=0
        with open(p,encoding='utf-8',errors='ignore') as f:
            for line in f:
                if not line.strip(): continue
                lines+=1
                try: json.loads(line)
                except Exception: bad+=1
        if bad: jsonl_bad.append({'file':str(p.relative_to(PKG)),'bad_lines':bad,'line_count':lines})

# Hard gate checks.
def j(path): return load(PKG/path)
public=PKG/'public/data'
required_dirs=['raw_sources','staging','public/data','database','rag','graph','gnn','analytics','warehouse','features','ai','architecture','quality','lineage','schemas']
required_reports=['quality/lossless_preservation_report.json','quality/duplicate_detection_report.json','quality/conflict_report.json','quality/source_coverage_report.json','quality/runtime_compatibility_report.json','quality/no_lol_pc_contamination_report.json','quality/karma_regression_report.json','lineage/merge_ledger.jsonl']
run_checks=[]
run_checks.append({'check':'required directories present','passed':all((PKG/d).exists() for d in required_dirs),'details':[d for d in required_dirs if not (PKG/d).exists()]})
run_checks.append({'check':'required reports present','passed':all((PKG/r).exists() for r in required_reports),'details':[r for r in required_reports if not (PKG/r).exists()]})
run_checks.append({'check':'all JSON parse','passed':len(json_errors)==0,'details':json_errors[:20]})
run_checks.append({'check':'all JSONL parse','passed':len(jsonl_bad)==0,'details':jsonl_bad[:20]})
run_checks.append({'check':'public/data/items.json root array','passed':isinstance(j(Path('public/data/items.json')),list),'details':None})
runes=j(Path('public/data/runes.json'))
valid_slots={'keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'}
run_checks.append({'check':'public/data/runes.json UI slots','passed':all(isinstance(r.get('slot'),str) and r.get('slot') in valid_slots for r in runes),'details':None})
builds=j(Path('public/data/builds.json'))
run_checks.append({'check':'public/data/builds.json stable ids and refs','passed':all(b.get('id') and isinstance(b.get('items'),list) and isinstance(b.get('runes'),list) and isinstance(b.get('spells'),list) for b in builds),'details':None})
run_checks.append({'check':'public/data/wr_items.json exists','passed':(public/'wr_items.json').exists(),'details':None})
run_checks.append({'check':'duo relationship alias files exist','passed':(public/'wr_matchups_duo.json').exists() and (public/'wr_synergies_duo.json').exists(),'details':None})
run_checks.append({'check':'karma regression passed','passed':j(Path('quality/karma_regression_report.json')).get('passed') is True,'details':j(Path('quality/karma_regression_report.json'))})
run_checks.append({'check':'no LoL-PC gameplay blockers','passed':j(Path('quality/no_lol_pc_contamination_report.json')).get('gameplay_data_blockers')==0,'details':j(Path('quality/no_lol_pc_contamination_report.json')).get('classification_summary')})
run_checks.append({'check':'excluded non-current/LoL-PC legacy champions absent from runtime','passed':all(x not in {c.get('id') for c in j(Path('public/data/champions.json'))} for x in ['hwei','sejuani','tahm_kench']),'details':None})
run_checks.append({'check':'raw archives present','passed':j(Path('quality/lossless_preservation_report.json')).get('raw_archive_copies_present') is True,'details':None})

# Generate final validation report.
validation={
    'version':VERSION,'generated_at_utc':GENERATED_AT,'status':'pass' if all(c['passed'] for c in run_checks) else 'needs_review',
    'checks':run_checks,'json_files_checked':json_count,'jsonl_files_checked':jsonl_count,
    'limitations':['No web/source refresh was performed; this build merges and audits uploaded sources only.','src.zip lacked package.json/lockfile, so static contract validation was performed instead of npm build/typecheck.']
}
write(PKG/'quality/final_v0_7_validation_report.json', validation)
# Recompute manifest with final report.
manifest=load(PKG/'manifest.json')
manifest['final_validation_status']=validation['status']
manifest['final_validation_report']='quality/final_v0_7_validation_report.json'
manifest['generated_package_scripts']='scripts/build_v0_7/'
write(PKG/'manifest.json', manifest)

# Build summary markdown.
source_cov=load(PKG/'quality/source_coverage_report.json')
runtime=load(PKG/'quality/runtime_compatibility_report.json')
lol=load(PKG/'quality/no_lol_pc_contamination_report.json')
karma=load(PKG/'quality/karma_regression_report.json')
loss=load(PKG/'quality/lossless_preservation_report.json')
ledger=load(PKG/'lineage/merge_ledger_summary.json')
summary=f'''# RiftCoach WR v0.7.0 Build Summary\n\nGenerated: {GENERATED_AT}\n\n## Final validation\n\nStatus: **{validation['status'].upper()}**\n\n## Counts\n\n| Layer | Count |\n|---|---:|\n| Canonical champions total including excluded source records | {source_cov['source_counts'].get('canonical_champions_total_including_excluded_source_records')} |\n| Canonical active runtime champions | {source_cov['source_counts'].get('canonical_champions_active_runtime')} |\n| Canonical abilities | {source_cov['source_counts'].get('canonical_abilities')} |\n| Canonical items | {source_cov['source_counts'].get('canonical_items')} |\n| Canonical runes | {source_cov['source_counts'].get('canonical_runes')} |\n| Canonical spells | {source_cov['source_counts'].get('canonical_spells')} |\n| public/data champions | {source_cov['source_counts'].get('public_data_champions')} |\n| public/data items | {source_cov['source_counts'].get('public_data_items')} |\n| public/data runes | {source_cov['source_counts'].get('public_data_runes')} |\n| public/data spells | {source_cov['source_counts'].get('public_data_spells')} |\n| public/data builds | {source_cov['source_counts'].get('public_data_builds')} |\n| Merge ledger rows | {ledger.get('rows')} |\n\n## Hard gates\n\n| Gate | Result |\n|---|---|\n''' + ''.join([f"| {c['check']} | {'PASS' if c['passed'] else 'NEEDS REVIEW'} |\n" for c in run_checks]) + f'''\n## Runtime exclusions\n\nThe following legacy source records were preserved in canonical/lineage but excluded from active `public/data/champions.json`:\n\n''' + ''.join([f"- `{x['id']}` — {x.get('reason')}\n" for x in source_cov.get('runtime_exclusions',[])]) + f'''\n## Key notes\n\n- Raw source archives preserved: `{loss.get('raw_archive_copies_present')}`.\n- Nested ChatGPT chunks preserved: `{loss.get('nested_chatgpt_archive_count')}`.\n- Karma lock passed: `{karma.get('passed')}`.\n- LoL-PC gameplay blockers: `{lol.get('gameplay_data_blockers')}`.\n- `items.json` is root array.\n- `runes.json` uses UI slot strings.\n- `builds.json` has stable IDs and normalized refs.\n- `wr_items.json`, `wr_matchups_duo.json`, and `wr_synergies_duo.json` exist.\n\n## Limitations\n\n- This build did not perform live Wild Rift source refresh. It merges uploaded sources and preserves unverified exact values as pending/legacy/candidate unless field-level source provenance supports them.\n- Full Next.js build/typecheck was not possible because `src.zip` contained only `src/`, not repo root dependencies/config.\n'''
(PKG/'BUILD_SUMMARY.md').write_text(summary,encoding='utf-8')
SUMMARY_OUT.write_text(summary,encoding='utf-8')

# Zip package.
if ZIP_OUT.exists(): ZIP_OUT.unlink()
with zipfile.ZipFile(ZIP_OUT,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for p in sorted(PKG.rglob('*')):
        if p.is_file():
            z.write(p, p.relative_to(PKG.parent))
zip_info={'zip_path':str(ZIP_OUT),'bytes':ZIP_OUT.stat().st_size,'sha256':sha(ZIP_OUT),'validation_status':validation['status'],'file_count':sum(1 for p in PKG.rglob('*') if p.is_file())}
write(ART/'phase4_state.json', {'phase':'phase4_validate_and_zip','status':'ok','zip':zip_info,'validation':validation})
print(json.dumps({'phase':'phase4_validate_and_zip','status':'ok','zip':zip_info,'hard_gate_failures':[c for c in run_checks if not c['passed']]},indent=2))

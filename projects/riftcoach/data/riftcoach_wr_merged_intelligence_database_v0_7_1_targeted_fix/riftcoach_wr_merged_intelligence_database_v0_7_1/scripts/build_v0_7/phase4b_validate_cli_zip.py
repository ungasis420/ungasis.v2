#!/usr/bin/env python3
import json, os, shutil, hashlib, csv
from pathlib import Path
from datetime import datetime, timezone
BASE=Path('/mnt/data'); PKG=BASE/'final_build_tmp/riftcoach_wr_merged_intelligence_database_v0_7_0'; ART=BASE/'final_build_tmp/artifacts'; SUMMARY_OUT=BASE/'riftcoach_wr_merged_intelligence_database_v0_7_0_build_summary.md'
VERSION='0.7.0'; GENERATED_AT=datetime.now(timezone.utc).isoformat()
def load(p):
    with open(PKG/p if not str(p).startswith('/') else p, encoding='utf-8') as f: return json.load(f)
def write(p,d):
    p=Path(p); p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('w',encoding='utf-8') as f: json.dump(d,f,indent=2,ensure_ascii=False); f.write('\n')
def sha(p):
    h=hashlib.sha256()
    with open(p,'rb') as f:
        for c in iter(lambda:f.read(1024*1024), b''): h.update(c)
    return h.hexdigest()
# Copy all build scripts into package.
sdst=PKG/'scripts/build_v0_7'; sdst.mkdir(parents=True,exist_ok=True)
for p in sorted((BASE/'riftcoach_v0_7_build_scripts').glob('phase*.py')): shutil.copy2(p, sdst/p.name)
# JSON validation.
json_errors=[]; json_count=0; jsonl_bad=[]; jsonl_count=0
for p in PKG.rglob('*'):
    if not p.is_file(): continue
    if p.suffix.lower()=='.json':
        json_count+=1
        try: json.load(open(p,encoding='utf-8'))
        except Exception as e: json_errors.append({'file':str(p.relative_to(PKG)),'error':repr(e)})
    elif p.suffix.lower()=='.jsonl':
        jsonl_count+=1; lines=0; bad=0
        with open(p,encoding='utf-8',errors='ignore') as f:
            for line in f:
                if not line.strip(): continue
                lines+=1
                try: json.loads(line)
                except Exception: bad+=1
        if bad: jsonl_bad.append({'file':str(p.relative_to(PKG)),'bad_lines':bad,'line_count':lines})
public=PKG/'public/data'
required_dirs=['raw_sources','staging','public/data','database','rag','graph','gnn','analytics','warehouse','features','ai','architecture','quality','lineage','schemas']
required_reports=['quality/lossless_preservation_report.json','quality/duplicate_detection_report.json','quality/conflict_report.json','quality/source_coverage_report.json','quality/runtime_compatibility_report.json','quality/no_lol_pc_contamination_report.json','quality/karma_regression_report.json','lineage/merge_ledger.jsonl']
def jl(rel): return json.load(open(PKG/rel,encoding='utf-8'))
checks=[]
checks.append({'check':'required directories present','passed':all((PKG/d).exists() for d in required_dirs),'details':[d for d in required_dirs if not (PKG/d).exists()]})
checks.append({'check':'required reports present','passed':all((PKG/r).exists() for r in required_reports),'details':[r for r in required_reports if not (PKG/r).exists()]})
checks.append({'check':'all JSON parse','passed':len(json_errors)==0,'details':json_errors[:10]})
checks.append({'check':'all JSONL parse','passed':len(jsonl_bad)==0,'details':jsonl_bad[:10]})
checks.append({'check':'items.json root array','passed':isinstance(jl('public/data/items.json'),list),'details':None})
runes=jl('public/data/runes.json'); valid_slots={'keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'}
checks.append({'check':'runes.json UI slots','passed':all(isinstance(r.get('slot'),str) and r.get('slot') in valid_slots for r in runes),'details':None})
builds=jl('public/data/builds.json')
checks.append({'check':'builds.json stable ids and refs','passed':all(b.get('id') and isinstance(b.get('items'),list) and isinstance(b.get('runes'),list) and isinstance(b.get('spells'),list) for b in builds),'details':None})
checks.append({'check':'wr_items.json exists','passed':(public/'wr_items.json').exists(),'details':None})
checks.append({'check':'duo aliases exist','passed':(public/'wr_matchups_duo.json').exists() and (public/'wr_synergies_duo.json').exists(),'details':None})
checks.append({'check':'karma lock passed','passed':jl('quality/karma_regression_report.json').get('passed') is True,'details':None})
checks.append({'check':'no LoL-PC gameplay blockers','passed':jl('quality/no_lol_pc_contamination_report.json').get('gameplay_data_blockers')==0,'details':jl('quality/no_lol_pc_contamination_report.json').get('classification_summary')})
checks.append({'check':'excluded legacy non-current champions absent from public runtime','passed':all(x not in {c.get('id') for c in jl('public/data/champions.json')} for x in ['hwei','sejuani','tahm_kench']),'details':None})
checks.append({'check':'raw archive copies present','passed':jl('quality/lossless_preservation_report.json').get('raw_archive_copies_present') is True,'details':None})
validation={'version':VERSION,'generated_at_utc':GENERATED_AT,'status':'pass' if all(c['passed'] for c in checks) else 'needs_review','checks':checks,'json_files_checked':json_count,'jsonl_files_checked':jsonl_count,'limitations':['No live Wild Rift source refresh was performed; uploaded sources only.','src.zip lacked package.json/lockfile, so validation is static contract validation rather than npm build/typecheck.','Decompressed duplicate ChatGPT chunks were not duplicated in final ZIP; raw outer and nested ZIPs are preserved with checksums.']}
write(PKG/'quality/final_v0_7_validation_report.json',validation)
# inventory after script copy
rows=[]
for p in PKG.rglob('*'):
    if p.is_file(): rows.append({'relative_path':str(p.relative_to(PKG)).replace(os.sep,'/'),'extension':p.suffix.lower(),'bytes':p.stat().st_size,'sha256':sha(p)})
with (PKG/'quality/package_file_inventory_final.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['relative_path','extension','bytes','sha256']); w.writeheader(); w.writerows(rows)
# Update manifest.
manifest=jl('manifest.json'); manifest['final_validation_status']=validation['status']; manifest['final_validation_report']='quality/final_v0_7_validation_report.json'; manifest['final_package_file_count']=len(rows); manifest['final_uncompressed_bytes']=sum(r['bytes'] for r in rows); write(PKG/'manifest.json',manifest)
source_cov=jl('quality/source_coverage_report.json'); karma=jl('quality/karma_regression_report.json'); lol=jl('quality/no_lol_pc_contamination_report.json'); ledger=jl('lineage/merge_ledger_summary.json')
summary='''# RiftCoach WR v0.7.0 Build Summary\n\nGenerated: {generated}\n\nStatus: **{status}**\n\n## Counts\n\n| Layer | Count |\n|---|---:|\n| Canonical champions total including excluded source records | {canonical_total} |\n| Canonical active runtime champions | {canonical_active} |\n| Canonical abilities | {abilities} |\n| Canonical items | {items} |\n| Canonical runes | {runes} |\n| Canonical spells | {spells} |\n| public/data champions | {pub_champs} |\n| public/data items | {pub_items} |\n| public/data runes | {pub_runes} |\n| public/data spells | {pub_spells} |\n| public/data builds | {pub_builds} |\n| Merge ledger rows | {ledger_rows} |\n| Final package files | {file_count} |\n\n## Hard gates\n\n| Gate | Result |\n|---|---|\n'''.format(generated=GENERATED_AT,status=validation['status'].upper(),canonical_total=source_cov['source_counts'].get('canonical_champions_total_including_excluded_source_records'),canonical_active=source_cov['source_counts'].get('canonical_champions_active_runtime'),abilities=source_cov['source_counts'].get('canonical_abilities'),items=source_cov['source_counts'].get('canonical_items'),runes=source_cov['source_counts'].get('canonical_runes'),spells=source_cov['source_counts'].get('canonical_spells'),pub_champs=source_cov['source_counts'].get('public_data_champions'),pub_items=source_cov['source_counts'].get('public_data_items'),pub_runes=source_cov['source_counts'].get('public_data_runes'),pub_spells=source_cov['source_counts'].get('public_data_spells'),pub_builds=source_cov['source_counts'].get('public_data_builds'),ledger_rows=ledger.get('rows'),file_count=len(rows))
for c in checks: summary += f"| {c['check']} | {'PASS' if c['passed'] else 'NEEDS REVIEW'} |\n"
summary += '\n## Runtime exclusions preserved in lineage but excluded from public/data/champions.json\n\n'
for x in source_cov.get('runtime_exclusions',[]): summary += f"- `{x['id']}` — {x.get('reason')}\n"
summary += f'''\n## Notes\n\n- Karma lock passed: `{karma.get('passed')}`.\n- LoL-PC gameplay blockers: `{lol.get('gameplay_data_blockers')}`.\n- Raw archive copies and nested ChatGPT chunk ZIPs are preserved with checksums.\n- Decompressed duplicate raw chunks were omitted from the final ZIP to avoid artifact breakage; this does not remove source recoverability.\n- Exact Wild Rift numeric values remain preserved but not promoted unless field-level provenance supports source verification.\n'''
(PKG/'BUILD_SUMMARY.md').write_text(summary,encoding='utf-8')
SUMMARY_OUT.write_text(summary,encoding='utf-8')
result={'phase':'phase4b_validate_cli_zip','status':'validated','validation_status':validation['status'],'file_count':len(rows),'uncompressed_bytes':sum(r['bytes'] for r in rows),'hard_gate_failures':[c for c in checks if not c['passed']]}
write(ART/'phase4b_validation_state.json',result)
print(json.dumps(result,indent=2))

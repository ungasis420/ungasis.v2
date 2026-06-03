#!/usr/bin/env python3
import json, os
from pathlib import Path
from datetime import datetime, timezone
BASE=Path('/mnt/data')
PKG=BASE/'final_build_tmp/riftcoach_wr_merged_intelligence_database_v0_7_0'
LOCAL=BASE/'final_build_tmp/extracted/data_zip/data'
VERSION='0.7.0'; GENERATED_AT=datetime.now(timezone.utc).isoformat()

def load(p):
    with open(p,encoding='utf-8') as f: return json.load(f)
def write(p,d):
    p=Path(p); p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('w',encoding='utf-8') as f: json.dump(d,f,indent=2,ensure_ascii=False); f.write('\n')

def slugify(s):
    import re
    s=str(s or '').lower().replace('&',' and ')
    s=re.sub(r"['’`.]",'',s); s=re.sub(r'[^a-z0-9]+','_',s); return re.sub(r'_+','_',s).strip('_')
EXPLICIT_REMOVE = {slugify(r['id']):r for r in load(LOCAL/'wr_champions_corrections.json').get('champions_to_remove',[])}
# v0.6 active IDs are canonical-active seed. If not in v0.6 and explicitly removed, exclude from runtime.
canonical_path=PKG/'database/entities/canonical_champions.json'
canon=load(canonical_path)
excluded=[]
for rec in canon['records']:
    cid=rec['id']
    if cid in EXPLICIT_REMOVE:
        rec['canonical_record']['current_list_status']='excluded_from_runtime_by_local_correction'
        rec['canonical_record']['excluded_from_public_data']=True
        rec['canonical_record']['exclusion_reason']=EXPLICIT_REMOVE[cid].get('reason')
        rec.setdefault('canonical_decisions',[]).append({'field_path':'current_list_status','selected_value':'excluded_from_runtime_by_local_correction','decision_rule':'no_lol_pc_or_not_current_wr_guardrail','conflict_status':'excluded_from_runtime_preserved_in_lineage'})
        excluded.append({'id':cid,'name':rec['canonical_record'].get('name'), 'reason':EXPLICIT_REMOVE[cid].get('reason')})
write(canonical_path,canon)
write(PKG/'public/data/v0_7/canonical_champions.json',canon)
# Remove excluded from public runtime compatibility only.
pub_path=PKG/'public/data/champions.json'
pub=load(pub_path)
pub2=[r for r in pub if r.get('id') not in EXPLICIT_REMOVE]
write(pub_path,pub2)
# Update quality reports.
source_cov=load(PKG/'quality/source_coverage_report.json')
source_cov.setdefault('runtime_exclusions',[]).extend(excluded)
source_cov['source_counts']['public_data_champions']=len(pub2)
source_cov['source_counts']['canonical_champions_total_including_excluded_source_records']=len(canon['records'])
source_cov['source_counts']['canonical_champions_active_runtime']=len([r for r in canon['records'] if not r['canonical_record'].get('excluded_from_public_data')])
write(PKG/'quality/source_coverage_report.json',source_cov)
conf=load(PKG/'quality/conflict_report.json')
for ex in excluded:
    conf['conflicts'].append({'entity_type':'champion_runtime_exclusion','canonical_id':'champion:'+ex['id'],'field_path':'current_list_status','unique_values':['present_in_legacy_wr_parts','explicitly_removed_by_wr_champions_corrections','absent_from_v0_6_active_current_roster'],'selected_value':'excluded_from_public_runtime_but_preserved_in_canonical_lineage','resolution':'no_lol_pc_or_not_current_wild_rift_guardrail','reason':ex['reason']})
conf['count']=len(conf['conflicts'])
write(PKG/'quality/conflict_report.json',conf)
# Update runtime report counts and LoL report blocker note.
runtime=load(PKG/'quality/runtime_compatibility_report.json')
for f in runtime['expected_files']:
    if f['file']=='champions.json': f['top_len']=len(pub2)
write(PKG/'quality/runtime_compatibility_report.json',runtime)
public_report=load(PKG/'quality/public_data_compatibility_report.json')
for f in public_report['file_checks']:
    if f['file']=='champions.json': f['top_len']=len(pub2)
public_report['runtime_exclusions']=excluded
write(PKG/'quality/public_data_compatibility_report.json', public_report)
# Update manifest counts.
manifest=load(PKG/'manifest.json')
manifest['counts']['public_data_champions']=len(pub2)
manifest['counts']['canonical_champions_total_including_excluded_source_records']=len(canon['records'])
manifest['counts']['canonical_champions_active_runtime']=len([r for r in canon['records'] if not r['canonical_record'].get('excluded_from_public_data')])
manifest['runtime_exclusions']=excluded
write(PKG/'manifest.json',manifest)
summary={'phase':'phase3b_policy_patch_exclusions','status':'ok','generated_at_utc':GENERATED_AT,'excluded_from_public_data':excluded,'public_data_champions':len(pub2),'canonical_champions_total':len(canon['records'])}
write(BASE/'final_build_tmp/artifacts/phase3b_state.json',summary)
print(json.dumps(summary,indent=2))

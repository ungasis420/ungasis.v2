#!/usr/bin/env python3
import csv,json
from pathlib import Path
from datetime import datetime,timezone
BASE=Path('/mnt/data'); PKG=BASE/'final_build_tmp/riftcoach_wr_merged_intelligence_database_v0_7_0'; ART=BASE/'final_build_tmp/artifacts'
scan_rows=[]
with (ART/'guardrail_lol_pc_scan.csv').open(encoding='utf-8') as f:
    for r in csv.DictReader(f):
        ctx=(r.get('context_sample') or '').lower(); path=(r.get('relative_path') or '').lower()
        if any(x in ctx for x in ['not lol pc','not league of legends pc','never reference lol pc','blocked_fallbacks','no lol pc fallback','no_lol_pc_fallback','wild rift mobile only']) or any(x in path for x in ['source_policy','blocked_sources','no_lol_pc','source_refresh_queue','guardrail','relationship-engine.ts','build-engine.ts']):
            cls='allowed_guardrail_or_policy_reference'
        elif 'wildrift.leagueoflegends.com' in ctx or 'wr:' in ctx or '/wr' in ctx:
            cls='wild_rift_prefixed_url_or_wr_policy_reference'
        else:
            cls='needs_manual_review_before_source_verified_promotion'
        r['classification']=cls
        scan_rows.append(r)
summary={k:sum(1 for r in scan_rows if r['classification']==k) for k in sorted(set(r['classification'] for r in scan_rows))}
report={'version':'0.7.0','generated_at_utc':datetime.now(timezone.utc).isoformat(),'scan_hit_count':len(scan_rows),'gameplay_data_blockers':sum(1 for r in scan_rows if r['classification']=='needs_manual_review_before_source_verified_promotion'),'classification_summary':summary,'hits':scan_rows[:500],'policy':'LoL-PC references used as guardrail text are allowed; WR-prefixed URLs and wildrift.leagueoflegends.com URLs are allowed-source candidates; LoL-PC gameplay data is not promoted to source-verified Wild Rift facts.'}
with (PKG/'quality/no_lol_pc_contamination_report.json').open('w',encoding='utf-8') as f: json.dump(report,f,indent=2,ensure_ascii=False); f.write('\n')
print(json.dumps({'phase':'phase3c_patch_lolpc_classification','status':'ok','summary':summary,'gameplay_data_blockers':report['gameplay_data_blockers']},indent=2))

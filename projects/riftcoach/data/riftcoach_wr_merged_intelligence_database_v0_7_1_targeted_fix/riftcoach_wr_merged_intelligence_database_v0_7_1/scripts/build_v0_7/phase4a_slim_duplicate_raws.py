#!/usr/bin/env python3
import json, shutil, os, csv, hashlib
from pathlib import Path
from datetime import datetime,timezone
BASE=Path('/mnt/data'); PKG=BASE/'final_build_tmp/riftcoach_wr_merged_intelligence_database_v0_7_0'

def write(p,d):
    p=Path(p); p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('w',encoding='utf-8') as f: json.dump(d,f,indent=2,ensure_ascii=False); f.write('\n')
def sha(p):
    h=hashlib.sha256()
    with open(p,'rb') as f:
        for c in iter(lambda:f.read(1024*1024), b''): h.update(c)
    return h.hexdigest()
# Remove duplicate large audit snapshots that copied already preserved raw sources.
remove_dirs=[
    PKG/'staging/src_runtime_contracts/riftcoach_src_audit',
    PKG/'src_runtime_audit/riftcoach_src_audit',
    PKG/'raw_sources/chatgpt_chunks_extracted',
    PKG/'raw_sources/wr_chatgpt_zip/extracted',
]
removed=[]
for d in remove_dirs:
    if d.exists():
        size=sum(p.stat().st_size for p in d.rglob('*') if p.is_file())
        shutil.rmtree(d)
        removed.append({'path':str(d.relative_to(PKG)),'bytes_removed':size})
# Keep README placeholders where useful.
(PKG/'raw_sources/chatgpt_chunks_extracted').mkdir(parents=True,exist_ok=True)
(PKG/'raw_sources/chatgpt_chunks_extracted/README.md').write_text('Decompressed ChatGPT chunk folders were inspected during build but not duplicated here to keep the final ZIP stable. Lossless raw preservation is provided by raw_sources/wr_chatgpt_zip/archive/wr_chatgpt.zip and raw_sources/wr_chatgpt_zip/nested_zips/*.zip, with SHA-256 checksums in raw_sources/checksums/source_archive_checksums.json.\n',encoding='utf-8')
(PKG/'raw_sources/wr_chatgpt_zip/extracted').mkdir(parents=True,exist_ok=True)
(PKG/'raw_sources/wr_chatgpt_zip/extracted/README.md').write_text('The outer wr_chatgpt.zip contents are preserved as raw source archive plus nested ZIP copies. Decompressed copies are intentionally not duplicated in this final package.\n',encoding='utf-8')
# Keep only compact src audit outputs; they already exist under staging/src_runtime_contracts/src_audit_outputs and src_runtime_audit/src_audit_outputs.
# Regenerate package file inventory after slimming.
rows=[]
for p in PKG.rglob('*'):
    if p.is_file():
        rows.append({'relative_path':str(p.relative_to(PKG)).replace(os.sep,'/'),'extension':p.suffix.lower(),'bytes':p.stat().st_size,'sha256':sha(p)})
with (PKG/'quality/package_file_inventory_post_slim.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['relative_path','extension','bytes','sha256']); w.writeheader(); w.writerows(rows)
# Patch preservation report.
loss=json.load(open(PKG/'quality/lossless_preservation_report.json',encoding='utf-8'))
loss['slim_packaging_note']='Decompressed duplicate ChatGPT chunks and duplicate previous audit raw snapshots were removed from final package to avoid artifact breakage. Lossless preservation remains through raw ZIP copies, nested ZIP copies, and checksums.'
loss['removed_duplicate_dirs']=removed
loss['extracted_raw_sources_present']['chatgpt_chunks_extracted']='not_duplicated_in_final_zip_raw_nested_zips_preserved'
loss['extracted_raw_sources_present']['wr_chatgpt_zip_extracted']='not_duplicated_in_final_zip_raw_archive_and_nested_zips_preserved'
loss['raw_nested_chatgpt_zips_present']=(PKG/'raw_sources/wr_chatgpt_zip/nested_zips').exists()
write(PKG/'quality/lossless_preservation_report.json',loss)
# Patch README with note.
readme=PKG/'README.md'
text=readme.read_text(encoding='utf-8')
text += '\n## Final ZIP size note\n\nTo keep the downloadable ZIP stable, decompressed duplicates of ChatGPT chunks are not repeated under `raw_sources/`. The raw outer archive and all nested chunk ZIPs are preserved with checksums, which is the lossless source of truth.\n'
readme.write_text(text,encoding='utf-8')
summary={'phase':'phase4a_slim_duplicate_raws','status':'ok','generated_at_utc':datetime.now(timezone.utc).isoformat(),'removed_dirs':removed,'package_file_count':len(rows),'package_uncompressed_bytes':sum(r['bytes'] for r in rows)}
write(BASE/'final_build_tmp/artifacts/phase4a_state.json',summary)
print(json.dumps(summary,indent=2))

#!/usr/bin/env python3
import csv
import hashlib
import io
import json
import os
import shutil
import zipfile
from pathlib import Path
from datetime import datetime, timezone

BASE = Path('/mnt/data')
WORK = BASE / 'final_build_tmp'
PKG = WORK / 'riftcoach_wr_merged_intelligence_database_v0_7_0'
EXTRACT = WORK / 'extracted'
ART = WORK / 'artifacts'
ZIPS = {
    'data_zip': BASE / 'data.zip',
    'wr_opus_zip': BASE / 'wr_opus.zip',
    'wr_chatgpt_zip': BASE / 'wr_chatgpt.zip',
    'src_zip': BASE / 'src.zip',
}

REQ_DIRS = [
    'raw_sources/data_zip/extracted',
    'raw_sources/wr_opus_zip/extracted',
    'raw_sources/wr_chatgpt_zip/extracted',
    'raw_sources/wr_chatgpt_zip/nested_zips',
    'raw_sources/chatgpt_chunks_extracted',
    'raw_sources/src_zip/extracted',
    'raw_sources/checksums',
    'staging/bronze_raw_records',
    'staging/normalized_records',
    'staging/alias_maps',
    'staging/source_value_traces',
    'staging/candidate_conflicts',
    'staging/src_runtime_contracts',
    'public/data/v0_7',
    'database/entities',
    'database/relationships',
    'database/corrections',
    'database/rules',
    'database/taxonomy',
    'database/source_policy',
    'rag', 'graph', 'gnn', 'analytics', 'warehouse', 'features', 'ai',
    'architecture', 'quality', 'lineage', 'schemas', 'adapters', 'scripts', 'docs', 'src_runtime_audit'
]

if WORK.exists():
    shutil.rmtree(WORK)
WORK.mkdir(parents=True, exist_ok=True)
PKG.mkdir(parents=True, exist_ok=True)
EXTRACT.mkdir(parents=True, exist_ok=True)
ART.mkdir(parents=True, exist_ok=True)
for d in REQ_DIRS:
    (PKG / d).mkdir(parents=True, exist_ok=True)


def sha256_path(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

checksums = {
    'generated_at_utc': datetime.now(timezone.utc).isoformat(),
    'source_archives': {},
    'nested_chatgpt_archives': {},
}

# Copy raw archive files and extract raw source copies.
for source_id, zip_path in ZIPS.items():
    if not zip_path.exists():
        raise FileNotFoundError(f'Missing required source archive: {zip_path}')
    size = zip_path.stat().st_size
    digest = sha256_path(zip_path)
    checksums['source_archives'][source_id] = {
        'path': str(zip_path), 'filename': zip_path.name, 'bytes': size, 'sha256': digest
    }
    raw_archive_dir = PKG / 'raw_sources' / source_id / 'archive'
    raw_archive_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(zip_path, raw_archive_dir / zip_path.name)
    dest_extract = PKG / 'raw_sources' / source_id / 'extracted'
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(dest_extract)
    # Also extract to normalized work area.
    work_dest = EXTRACT / source_id
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(work_dest)

# Extract nested ChatGPT chunks from wr_chatgpt.zip, preserve nested zips and expanded chunk payloads.
chatgpt_outer = ZIPS['wr_chatgpt_zip']
with zipfile.ZipFile(chatgpt_outer) as oz:
    for nested_name in oz.namelist():
        if not nested_name.lower().endswith('.zip'):
            continue
        nested_bytes = oz.read(nested_name)
        nested_filename = Path(nested_name).name
        nested_zip_path = PKG / 'raw_sources' / 'wr_chatgpt_zip' / 'nested_zips' / nested_filename
        nested_zip_path.write_bytes(nested_bytes)
        h = hashlib.sha256(nested_bytes).hexdigest()
        checksums['nested_chatgpt_archives'][nested_filename] = {
            'outer_member': nested_name, 'bytes': len(nested_bytes), 'sha256': h
        }
        chunk_stem = nested_filename[:-4]
        chunk_extract_dir = PKG / 'raw_sources' / 'chatgpt_chunks_extracted' / chunk_stem
        chunk_extract_dir.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(io.BytesIO(nested_bytes)) as nz:
            nz.extractall(chunk_extract_dir)
        work_chunk_dir = EXTRACT / 'chatgpt_chunks_extracted' / chunk_stem
        work_chunk_dir.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(io.BytesIO(nested_bytes)) as nz:
            nz.extractall(work_chunk_dir)

# Identify chunk10 final root.
chunk_roots = list((EXTRACT / 'chatgpt_chunks_extracted').glob('*chunk10_final*/**/manifest.json'))
if not chunk_roots:
    # member folder might be directly under chunk dir
    chunk_roots = list((EXTRACT / 'chatgpt_chunks_extracted').glob('**/manifest.json'))
chunk10_root = None
for manifest in chunk_roots:
    if 'chunk10_final' in str(manifest):
        chunk10_root = manifest.parent
        break
if chunk10_root is None:
    raise RuntimeError('Could not locate ChatGPT v0.6 chunk10_final manifest root.')

# Copy v0.6 platform folders as seed architecture.
copy_dirs = ['architecture','schemas','source_policy','ai','rag','graph','gnn','features','analytics','warehouse','database','docs']
for d in copy_dirs:
    src = chunk10_root / d
    dst = PKG / d
    if src.exists():
        if dst.exists():
            shutil.copytree(src, dst, dirs_exist_ok=True)
        else:
            shutil.copytree(src, dst)
# Optional supplemental folders preserved.
for d in ['graph_explorer', 'graph_rag', 'ui', 'prototype']:
    src = chunk10_root / d
    if src.exists():
        shutil.copytree(src, PKG / d, dirs_exist_ok=True)

# Copy source audit outputs if present.
for src_dir_name in ['src_audit_outputs', 'riftcoach_src_audit']:
    src_dir = BASE / src_dir_name
    if src_dir.exists():
        dst = PKG / 'staging' / 'src_runtime_contracts' / src_dir_name
        shutil.copytree(src_dir, dst, dirs_exist_ok=True)
        dst2 = PKG / 'src_runtime_audit' / src_dir_name
        shutil.copytree(src_dir, dst2, dirs_exist_ok=True)

# File inventory for package raw and work source areas.
inventory_rows = []
for root_label, root_dir in [('package_raw_sources', PKG / 'raw_sources'), ('work_extracted', EXTRACT)]:
    for p in root_dir.rglob('*'):
        if p.is_file():
            rel = p.relative_to(root_dir)
            inventory_rows.append({
                'root_label': root_label,
                'relative_path': str(rel).replace(os.sep, '/'),
                'extension': p.suffix.lower(),
                'bytes': p.stat().st_size,
                'sha256': sha256_path(p),
            })

with (PKG / 'raw_sources' / 'checksums' / 'source_archive_checksums.json').open('w', encoding='utf-8') as f:
    json.dump(checksums, f, indent=2, ensure_ascii=False)
with (ART / 'source_file_inventory.csv').open('w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['root_label','relative_path','extension','bytes','sha256'])
    w.writeheader(); w.writerows(inventory_rows)
shutil.copy2(ART / 'source_file_inventory.csv', PKG / 'quality' / 'source_file_inventory.csv')

# Write phase state.
state = {
    'phase': 'phase1_extract_inventory',
    'status': 'ok',
    'generated_at_utc': datetime.now(timezone.utc).isoformat(),
    'package_root': str(PKG),
    'extract_root': str(EXTRACT),
    'chunk10_root': str(chunk10_root),
    'source_archive_count': len(ZIPS),
    'nested_chatgpt_archive_count': len(checksums['nested_chatgpt_archives']),
    'inventory_file_count': len(inventory_rows),
}
(ART / 'phase1_state.json').write_text(json.dumps(state, indent=2), encoding='utf-8')
print(json.dumps(state, indent=2))

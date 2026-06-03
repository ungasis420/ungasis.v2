#!/usr/bin/env python3
import csv, hashlib, json, os, re, shutil
from copy import deepcopy
from pathlib import Path
from datetime import datetime, timezone

BASE = Path('/mnt/data')
WORK = BASE / 'final_build_tmp'
PKG = WORK / 'riftcoach_wr_merged_intelligence_database_v0_7_0'
EXTRACT = WORK / 'extracted'
ART = WORK / 'artifacts'
state1 = json.loads((ART / 'phase1_state.json').read_text())
CHUNK10 = Path(state1['chunk10_root'])
VERSION = '0.7.0'
PATCH = '7.1e'
GENERATED_AT = datetime.now(timezone.utc).isoformat()

# ---------- helpers ----------

def load_json(path, default=None):
    p = Path(path)
    if not p.exists(): return deepcopy(default)
    with p.open(encoding='utf-8') as f: return json.load(f)

def write_json(path, data):
    p=Path(path); p.parent.mkdir(parents=True, exist_ok=True)
    with p.open('w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')

def write_jsonl(path, rows):
    p=Path(path); p.parent.mkdir(parents=True, exist_ok=True)
    with p.open('w', encoding='utf-8') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')

def slugify(s):
    if s is None: return ''
    s = str(s).strip().lower()
    s = s.replace('&',' and ')
    s = re.sub(r"['’`.]", '', s)
    s = re.sub(r'[^a-z0-9]+', '_', s)
    s = re.sub(r'_+', '_', s).strip('_')
    return s

CHAMPION_ALIASES = {
    'jarvan': 'jarvan_iv', 'jarvaniv': 'jarvan_iv', 'jarvan_4':'jarvan_iv',
    'kai_sa':'kaisa', 'kai_sa_':'kaisa', 'kaisa':'kaisa',
    'kha_zix':'khazix', 'khazix':'khazix',
    'k_sante':'ksante', 'ksante':'ksante',
    'kog_maw':'kogmaw', 'kogmaw':'kogmaw',
    'nunu_willump':'nunu_willump', 'nunu_and_willump':'nunu_willump', 'nunu':'nunu_willump',
    'vel_koz':'velkoz', 'velkoz':'velkoz',
    'dr_mundo':'dr_mundo', 'mundo':'dr_mundo',
    'wukong':'wukong', 'monkey_king':'wukong',
    'aurelion_sol':'aurelion_sol', 'aurelionsol':'aurelion_sol',
    'xin_zhao':'xin_zhao', 'xinzhao':'xin_zhao',
    'lee_sin':'lee_sin', 'leesin':'lee_sin',
    'master_yi':'master_yi', 'masteryi':'master_yi',
    'twisted_fate':'twisted_fate', 'twistedfate':'twisted_fate',
    'miss_fortune':'miss_fortune', 'missfortune':'miss_fortune',
    'tahm_kench':'tahm_kench', 'tahmkench':'tahm_kench',
    'rek_sai':'reksai', 'reksai':'reksai',
}
# Preserve v0.6 canonical where known. RekSai may not exist; map if present.

def normalize_champion_id(raw):
    sid = slugify(raw)
    return CHAMPION_ALIASES.get(sid, sid)

ITEM_ALIASES = {
    'serylda_s_grudge':'seryldas_grudge', 'serylda_grudge':'seryldas_grudge', 'seryldas_grudge':'seryldas_grudge',
    'runaaans_hurricane':'runaans_hurricane', 'runaans_hurricane':'runaans_hurricane',
    'dream_maker_enchant':'dream_maker', 'dream_maker':'dream_maker',
    'galeforce_enchant':'galeforce', 'galeforce':'galeforce',
    'goredrinker_enchant':'goredrinker', 'goredrinker':'goredrinker',
    'stridebreaker_enchant':'stridebreaker', 'stridebreaker':'stridebreaker',
    'stasis':'stasis_enchant', 'stasis_enchant':'stasis_enchant',
    'locket':'locket_enchant', 'locket_enchant':'locket_enchant',
}

def normalize_item_id(raw):
    sid = slugify(raw)
    return ITEM_ALIASES.get(sid, sid)

def normalize_general_id(raw):
    return slugify(raw)

ROLE_ALIASES = {
    'top':'Baron','baron':'Baron','solo':'Baron','baron_lane':'Baron',
    'jungle':'Jungle','jg':'Jungle',
    'mid':'Mid','middle':'Mid',
    'adc':'Duo','duo':'Duo','dragon':'Duo','dragon_lane':'Duo','bot':'Duo','marksman':'Duo',
    'support':'Support','supp':'Support',
}

def normalize_role_label(role):
    if role is None: return None
    r=slugify(role)
    return ROLE_ALIASES.get(r, str(role).strip().title())

def normalize_role_id(role):
    label = normalize_role_label(role)
    if label == 'Duo': return 'adc'
    if label == 'Baron': return 'baron'
    return slugify(label)

def stable_hash(obj):
    return hashlib.sha256(json.dumps(obj, sort_keys=True, ensure_ascii=False, default=str).encode()).hexdigest()

def as_list(x):
    if x is None: return []
    if isinstance(x, list): return x
    return [x]

def first_nonempty(*vals):
    for v in vals:
        if v not in [None, '', [], {}]: return v
    return None

def pick_array(data, *keys):
    if data is None: return []
    if isinstance(data, list): return data
    if isinstance(data, dict):
        out=[]
        for k in keys:
            v=data.get(k)
            if isinstance(v, list): out.extend(v)
        return out
    return []

def source_ref(source_id, file_rel, record_id, record, status, priority):
    return {
        'source_id': source_id,
        'source_file': file_rel,
        'source_record_id': record_id,
        'record_hash': stable_hash(record),
        'source_status': status,
        'priority': priority,
    }

def extract_simple_fields(record):
    return {
        'name': record.get('name'),
        'title': record.get('title'),
        'roles': record.get('roles') or record.get('positions') or record.get('lanes'),
        'classes': record.get('classes') or record.get('class_tags'),
        'resource': record.get('resource'),
        'range_type': record.get('range_type') or record.get('rangeType'),
        'adaptive_type': record.get('adaptive_type') or record.get('adaptiveType'),
        'tier': record.get('tier') or record.get('meta_tier'),
    }

def add_source_values(source_values, record, ref):
    fields = extract_simple_fields(record)
    for k,v in fields.items():
        if v not in [None, '', [], {}]:
            source_values.setdefault(k, []).append({**ref, 'raw_value': v})
    abilities = record.get('abilities') or record.get('abilities_by_key')
    if isinstance(abilities, dict):
        for slot in ['passive','q','w','e','r']:
            ab = abilities.get(slot) or abilities.get(slot.upper())
            if isinstance(ab, dict) and ab.get('name'):
                source_values.setdefault(f'abilities.{slot}.name', []).append({**ref, 'raw_value': ab.get('name')})

# ---------- source loads ----------
LOCAL = EXTRACT / 'data_zip' / 'data'
OPUS = EXTRACT / 'wr_opus_zip' / 'wr_opus'

v06_champions = load_json(CHUNK10/'database/entities/wr_champions_full.json',{}).get('champions', [])
v06_abilities = load_json(CHUNK10/'database/entities/wr_abilities_full.json',{}).get('abilities', [])
v06_items = load_json(CHUNK10/'database/entities/wr_items_full.json',{}).get('items', [])
v06_runes = load_json(CHUNK10/'database/entities/wr_runes_full.json',{}).get('runes', [])
v06_spells = load_json(CHUNK10/'database/entities/wr_spells_full.json',{}).get('spells', [])
v06_builds_wrap = load_json(CHUNK10/'public/data/builds.json',{})
v06_meta_builds = v06_builds_wrap.get('meta_builds', []) if isinstance(v06_builds_wrap,dict) else []
v06_archetype_builds = v06_builds_wrap.get('archetype_builds', []) if isinstance(v06_builds_wrap,dict) else []

local_simple_champions = load_json(LOCAL/'champions.json', [])
local_simple_items_wrap = load_json(LOCAL/'items.json', {})
local_simple_items = pick_array(local_simple_items_wrap, 'items')
local_runes = load_json(LOCAL/'runes.json', [])
local_spells = load_json(LOCAL/'spells.json', [])
local_builds_simple = load_json(LOCAL/'builds.json', [])
local_wr_builds = load_json(LOCAL/'wr_builds.json', {'meta':{},'builds':[]})
local_wr_boots = load_json(LOCAL/'wr_boots_enchants.json', {})
local_wr_corrections = load_json(LOCAL/'wr_champions_corrections.json', {})
local_wr_champs = []
for p in sorted(LOCAL.glob('wr_champions_part*.json')):
    data = load_json(p,{})
    for r in data.get('champions',[]):
        local_wr_champs.append((p.name, r))
for r in local_wr_corrections.get('champions_to_add',[]):
    local_wr_champs.append(('wr_champions_corrections.json#champions_to_add', r))

opus_champions=[]; opus_items=[]; opus_runes=[]; opus_spells=[]; opus_builds=[]
for p in sorted(OPUS.glob('wr_champions*.json')):
    for r in load_json(p,{}).get('champions',[]): opus_champions.append((p.name,r))
for p in sorted(OPUS.glob('wr_items*.json')):
    for r in load_json(p,{}).get('items',[]): opus_items.append((p.name,r))
for p in sorted(OPUS.glob('wr_runes*.json')):
    for r in load_json(p,{}).get('runes',[]): opus_runes.append((p.name,r))
for p in sorted(OPUS.glob('wr_spells*.json')):
    for r in load_json(p,{}).get('spells',[]): opus_spells.append((p.name,r))
for p in sorted(OPUS.glob('wr_meta_builds*.json')):
    for r in load_json(p,{}).get('builds',[]): opus_builds.append((p.name,r))

# ---------- canonical champions ----------
source_index_champions = {}
for r in v06_champions:
    cid = normalize_champion_id(r.get('id') or r.get('name'))
    source_index_champions.setdefault(cid, []).append(('chatgpt_v0_6_0_chunk10_final','database/entities/wr_champions_full.json',r,'v0_6_source_aware_seed',80))
for r in local_simple_champions:
    cid = normalize_champion_id(r.get('id') or r.get('name'))
    source_index_champions.setdefault(cid, []).append(('local_repo_data_zip','data/champions.json',r,'legacy_runtime_compatibility',30))
for file_rel,r in local_wr_champs:
    cid = normalize_champion_id(r.get('id') or r.get('name'))
    source_index_champions.setdefault(cid, []).append(('local_repo_data_zip',f'data/{file_rel}',r,'legacy_wr_observed_unverified',30))
for file_rel,r in opus_champions:
    cid = normalize_champion_id(r.get('id') or r.get('name'))
    source_index_champions.setdefault(cid, []).append(('wr_opus_zip',f'wr_opus/{file_rel}',r,'opus_observed_unverified',40))

canonical_champions=[]; champion_conflicts=[]; source_value_trace_rows=[]
v06_by_id = {normalize_champion_id(r.get('id') or r.get('name')): deepcopy(r) for r in v06_champions}
for cid in sorted(source_index_champions):
    refs = []
    source_values = {}
    aliases = sorted({slugify((r.get('id') or r.get('name') or '')) for _,_,r,_,_ in source_index_champions[cid] if (r.get('id') or r.get('name')) and slugify((r.get('id') or r.get('name'))) != cid})
    base = v06_by_id.get(cid)
    if base is None:
        # use highest priority record as seed
        best = sorted(source_index_champions[cid], key=lambda x: x[4], reverse=True)[0]
        base = deepcopy(best[2])
    base['id'] = cid
    base['entity_id'] = f'champion:{cid}'
    base.setdefault('entity_type','champion')
    base.setdefault('game','wild_rift')
    base['not_lol_pc'] = True
    base.setdefault('patch_version', PATCH)
    # Normalize roles for canonical convenience without destroying rich fields.
    roles = base.get('roles') or base.get('positions') or []
    if isinstance(roles, list): base['roles'] = sorted(set(filter(None, [normalize_role_label(r) for r in roles])))
    # Apply Karma hard lock.
    if cid == 'karma':
        lock = {'passive':'Mantra','q':'Inner Flame','w':'Focused Resolve','e':'Inspire','r':'Transcendent Embrace'}
        base.setdefault('abilities', {})
        base.setdefault('abilities_by_key', {})
        for slot,name in lock.items():
            for key in ['abilities','abilities_by_key']:
                if not isinstance(base.get(key), dict): base[key] = {}
                base[key].setdefault(slot, {'slot':slot})
                if isinstance(base[key][slot], dict):
                    base[key][slot]['name'] = name
                    base[key][slot]['source_status'] = 'protected_user_corrected_pending_allowed_source_revalidation'
                    base[key][slot]['protection'] = 'karma_ability_lock_do_not_overwrite_without_higher_priority_wr_source'
        base['karma_ability_lock'] = {'status':'applied','protected':True,'slot_names':lock}
    for sid, file_rel, rec, status, priority in source_index_champions[cid]:
        ref = source_ref(sid, file_rel, rec.get('id') or rec.get('name') or cid, rec, status, priority)
        refs.append(ref)
        add_source_values(source_values, rec, ref)
    # Identify simple field conflicts.
    decisions=[]
    for field, vals in source_values.items():
        unique = []
        for v in vals:
            rv = json.dumps(v['raw_value'], sort_keys=True, ensure_ascii=False)
            if rv not in unique: unique.append(rv)
        selected = None
        if field.startswith('abilities.') and cid == 'karma':
            selected = {'abilities.passive.name':'Mantra','abilities.q.name':'Inner Flame','abilities.w.name':'Focused Resolve','abilities.e.name':'Inspire','abilities.r.name':'Transcendent Embrace'}.get(field)
        else:
            selected = base
            for part in field.split('.'):
                if isinstance(selected, dict): selected=selected.get(part)
                else: selected=None
        if len(unique) > 1:
            champion_conflicts.append({'entity_type':'champion','canonical_id':cid,'field_path':field,'unique_values':[json.loads(u) for u in unique],'resolution':'protected_user_correction' if cid=='karma' and field.startswith('abilities.') else 'canonical_seed_priority_with_source_trace'})
        decisions.append({'field_path':field,'selected_value':selected,'decision_rule':'protected_user_correction' if cid=='karma' and field.startswith('abilities.') else 'v0_6_seed_then_highest_priority_fill','conflict_status':'conflict_traced' if len(unique)>1 else 'no_conflict'})
    canonical_champions.append({'canonical_id':f'champion:{cid}','id':cid,'aliases':aliases,'canonical_record':base,'source_values':source_values,'source_records':refs,'canonical_decisions':decisions})
    source_value_trace_rows.append({'entity_type':'champion','canonical_id':f'champion:{cid}','source_values':source_values,'canonical_decisions':decisions})

# ---------- canonical abilities ----------
# Start from v0.6, add embedded abilities from local/opus not present. Karma hard lock enforced.
ability_index = {}
for r in v06_abilities:
    aid = f"{normalize_champion_id(r.get('champion_id'))}.{slugify(r.get('slot'))}"
    ability_index.setdefault(aid, []).append(('chatgpt_v0_6_0_chunk10_final','database/entities/wr_abilities_full.json',r,'v0_6_source_aware_seed',80))

def add_embedded_abilities(champ_sources):
    for sid,file_rel,champ,status,priority in champ_sources:
        cid=normalize_champion_id(champ.get('id') or champ.get('name'))
        abilities=champ.get('abilities') or champ.get('abilities_by_key')
        if isinstance(abilities, dict):
            for slot,ab in abilities.items():
                if not isinstance(ab, dict): continue
                slot_norm=slugify(slot)
                if slot_norm in ['p','passive','innate']: slot_norm='passive'
                aid=f'{cid}.{slot_norm}'
                rec=deepcopy(ab); rec.setdefault('champion_id',cid); rec.setdefault('slot',slot_norm); rec.setdefault('id',aid)
                ability_index.setdefault(aid, []).append((sid,file_rel,rec,status,priority))

add_embedded_abilities([('local_repo_data_zip','data/champions.json',r,'legacy_runtime_compatibility',30) for r in local_simple_champions])
add_embedded_abilities([('local_repo_data_zip',f'data/{file}',r,'legacy_wr_observed_unverified',30) for file,r in local_wr_champs])
add_embedded_abilities([('wr_opus_zip',f'wr_opus/{file}',r,'opus_observed_unverified',40) for file,r in opus_champions])

karma_lock = {'karma.passive':'Mantra','karma.q':'Inner Flame','karma.w':'Focused Resolve','karma.e':'Inspire','karma.r':'Transcendent Embrace'}
canonical_abilities=[]; ability_conflicts=[]
v06_ability_by_id = {f"{normalize_champion_id(r.get('champion_id'))}.{slugify(r.get('slot'))}":deepcopy(r) for r in v06_abilities}
for aid in sorted(ability_index):
    cid,slot = aid.split('.',1)
    base = v06_ability_by_id.get(aid)
    if base is None:
        best=sorted(ability_index[aid],key=lambda x:x[4], reverse=True)[0]
        base=deepcopy(best[2])
    base['id']=aid; base['entity_id']=f'ability:{aid}'; base['champion_id']=cid; base['slot']=slot; base['game']='wild_rift'; base['not_lol_pc']=True; base.setdefault('patch_version',PATCH)
    if aid in karma_lock:
        base['name']=karma_lock[aid]
        base['source_status']='protected_user_corrected_pending_allowed_source_revalidation'
        base['protection']='karma_ability_lock_do_not_overwrite_without_higher_priority_wr_source'
    refs=[]; name_vals=[]
    for sid,file_rel,rec,status,priority in ability_index[aid]:
        ref=source_ref(sid,file_rel,rec.get('id') or aid,rec,status,priority)
        refs.append(ref)
        if rec.get('name'):
            name_vals.append({**ref,'raw_value':rec.get('name')})
    unique_names=[]
    for v in name_vals:
        if v['raw_value'] not in unique_names: unique_names.append(v['raw_value'])
    if len(unique_names)>1:
        ability_conflicts.append({'entity_type':'ability','canonical_id':f'ability:{aid}','field_path':'name','unique_values':unique_names,'selected_value':base.get('name'),'resolution':'protected_user_correction' if aid in karma_lock else 'v0_6_seed_priority_with_trace'})
    canonical_abilities.append({'canonical_id':f'ability:{aid}','id':aid,'canonical_record':base,'source_values':{'name':name_vals},'source_records':refs,'canonical_decisions':[{'field_path':'name','selected_value':base.get('name'),'decision_rule':'protected_user_correction' if aid in karma_lock else 'v0_6_seed_then_highest_priority_fill'}]})

# ---------- canonical items/runes/spells ----------
def build_canonical_simple(entity_type, v06_records, local_records, opus_records, local_file, v06_file, id_norm_func):
    idx={}
    for r in v06_records:
        cid=id_norm_func(r.get('id') or r.get('name'))
        idx.setdefault(cid,[]).append(('chatgpt_v0_6_0_chunk10_final',v06_file,r,'v0_6_source_aware_seed',80))
    for r in local_records:
        cid=id_norm_func(r.get('id') or r.get('name'))
        idx.setdefault(cid,[]).append(('local_repo_data_zip',local_file,r,'legacy_runtime_compatibility',30))
    for file_rel,r in opus_records:
        cid=id_norm_func(r.get('id') or r.get('name'))
        idx.setdefault(cid,[]).append(('wr_opus_zip',f'wr_opus/{file_rel}',r,'opus_observed_unverified',40))
    v06_by={id_norm_func(r.get('id') or r.get('name')):deepcopy(r) for r in v06_records}
    out=[]; conflicts=[]
    for cid in sorted(idx):
        base=v06_by.get(cid)
        if base is None:
            best=sorted(idx[cid],key=lambda x:x[4], reverse=True)[0]
            base=deepcopy(best[2])
        base['id']=cid; base.setdefault('entity_type', entity_type); base['game']='wild_rift'; base['not_lol_pc']=True; base.setdefault('patch_version',PATCH)
        refs=[]; source_values={}
        for sid,file_rel,rec,status,priority in idx[cid]:
            ref=source_ref(sid,file_rel,rec.get('id') or rec.get('name') or cid,rec,status,priority)
            refs.append(ref)
            for field in ['name','category','tier','type','path','slot','cooldown','cost','stats','passive','brief','full','effect','description']:
                if rec.get(field) not in [None,'',[],{}]:
                    source_values.setdefault(field,[]).append({**ref,'raw_value':rec.get(field)})
        decisions=[]
        for field,vals in source_values.items():
            uniq=[]
            for v in vals:
                raw=json.dumps(v['raw_value'], sort_keys=True, ensure_ascii=False)
                if raw not in uniq: uniq.append(raw)
            if len(uniq)>1:
                conflicts.append({'entity_type':entity_type,'canonical_id':f'{entity_type}:{cid}','field_path':field,'unique_values':[json.loads(u) for u in uniq],'selected_value':base.get(field),'resolution':'v0_6_seed_priority_with_trace_or_pending_source_verification'})
            decisions.append({'field_path':field,'selected_value':base.get(field),'decision_rule':'v0_6_seed_then_highest_priority_fill','conflict_status':'conflict_traced' if len(uniq)>1 else 'no_conflict'})
        out.append({'canonical_id':f'{entity_type}:{cid}','id':cid,'canonical_record':base,'source_values':source_values,'source_records':refs,'canonical_decisions':decisions})
    return out, conflicts

# Include local boot/enchant records if present.
local_boot_items=[]
for key in ['items','boots','enchants','data']:
    if isinstance(local_wr_boots, dict) and isinstance(local_wr_boots.get(key), list): local_boot_items.extend(local_wr_boots[key])
all_local_items = local_simple_items + local_boot_items
canonical_items,item_conflicts=build_canonical_simple('item', v06_items, all_local_items, opus_items, 'data/items.json + data/wr_boots_enchants.json','database/entities/wr_items_full.json', normalize_item_id)
canonical_runes,rune_conflicts=build_canonical_simple('rune', v06_runes, local_runes, opus_runes, 'data/runes.json','database/entities/wr_runes_full.json', normalize_general_id)
canonical_spells,spell_conflicts=build_canonical_simple('spell', v06_spells, local_spells, opus_spells, 'data/spells.json','database/entities/wr_spells_full.json', normalize_general_id)

# ---------- compatibility views ----------
# Lookup maps from canonical and local records.
def title_case_words(s):
    if not s: return ''
    return str(s).replace('_',' ').replace('-', ' ').title().replace('Adc','ADC').replace('Ap','AP').replace('Ad','AD')

def ability_summary_for_champ(cid):
    slots=[]
    for slot in ['passive','q','w','e','r']:
        aid=f'{cid}.{slot}'
        rec=next((a['canonical_record'] for a in canonical_abilities if a['id']==aid), None)
        if rec:
            slots.append({'slot': 'Passive' if slot=='passive' else slot.upper(), 'name': rec.get('name') or '', 'description': rec.get('brief_description') or rec.get('brief') or rec.get('full_description') or rec.get('full') or '', 'cooldown': (rec.get('cooldowns') or {}).get('primary',{}).get('raw') if isinstance(rec.get('cooldowns'),dict) else rec.get('cooldown'), 'cost': rec.get('cost',{}).get('raw') if isinstance(rec.get('cost'),dict) else rec.get('cost')})
    return slots

champ_compat_by_id={}
for r in local_simple_champions:
    cid=normalize_champion_id(r.get('id') or r.get('name'))
    rec=deepcopy(r); rec['id']=cid
    rec['roles']=sorted(set(filter(None,[normalize_role_label(x) for x in as_list(rec.get('roles'))])))
    rec.setdefault('tier', rec.get('meta_tier') or 'A')
    rec.setdefault('classes', [])
    rec.setdefault('style', rec.get('brief_description') or rec.get('full_description') or '')
    rec.setdefault('rangeType', rec.get('range_type') or 'Melee')
    rec.setdefault('adaptiveType', rec.get('adaptive_type') or 'Physical')
    rec.setdefault('resource', rec.get('resource') or 'Mana')
    rec.setdefault('image', f'/images/champions/portraits/{cid}.png')
    rec.setdefault('splash', f'/images/champions/splash/{cid}.jpg')
    rec['source_status']='runtime_compatibility_view'
    champ_compat_by_id[cid]=rec
# Add missing v0.6 canonical champions in runtime-compatible shape.
for c in canonical_champions:
    cid=c['id']; base=c['canonical_record']
    if cid not in champ_compat_by_id:
        roles=base.get('roles') or base.get('positions') or []
        champ_compat_by_id[cid]={
            'id':cid,'name':base.get('name') or title_case_words(cid),'tier':base.get('meta_tier') or base.get('tier') or 'A',
            'roles':sorted(set(filter(None,[normalize_role_label(x) for x in as_list(roles)]))),
            'classes':base.get('classes') or base.get('class_tags') or [],
            'style':base.get('brief_description') or base.get('full_description') or '',
            'rangeType':base.get('rangeType') or base.get('range_type') or 'Melee',
            'resource':base.get('resource') or 'Mana',
            'adaptiveType':base.get('adaptiveType') or base.get('adaptive_type') or 'Physical',
            'image':f'/images/champions/portraits/{cid}.png','splash':f'/images/champions/splash/{cid}.jpg',
            'source_status':'added_from_canonical_v0_7_runtime_compatibility_view'
        }
    # Add ability summary in compatibility view for future components without breaking current UI.
    champ_compat_by_id[cid]['abilities']=ability_summary_for_champ(cid)
champions_compat=sorted(champ_compat_by_id.values(), key=lambda x:x.get('name',''))

# Item compatibility view.
item_name_to_id={}
for rec in all_local_items + [x['canonical_record'] for x in canonical_items]:
    rid=normalize_item_id(rec.get('id') or rec.get('name'))
    if rid:
        item_name_to_id[slugify(rec.get('name') or rid)] = rid
        item_name_to_id[slugify(rid)] = rid

def display_stat_list(stats):
    if not stats: return []
    if isinstance(stats, list): return [str(x) for x in stats if x not in [None,'']]
    if isinstance(stats, dict):
        raw = stats.get('raw') if isinstance(stats.get('raw'), list) else None
        if raw: return [str(x) for x in raw]
        norm = stats.get('normalized') if isinstance(stats.get('normalized'), dict) else stats
        parts=[]
        for k,v in norm.items():
            if v in [None,'',0,[],{}]: continue
            label=title_case_words(k).replace('Percent','%')
            if isinstance(v,(int,float)):
                if 'percent' in k or '%' in label: parts.append(f'+{v}% {label.replace("%","").strip()}')
                else: parts.append(f'+{v} {label}')
            else: parts.append(f'{label}: {v}')
        return parts
    if isinstance(stats, str): return [stats]
    return []

def item_category(rec):
    for key in ['category','item_category']:
        if rec.get(key):
            c=str(rec[key]).title()
            if c in ['Physical','Magic','Defense','Support','Boots','Utility']: return c
    text=' '.join(str(rec.get(k,'')) for k in ['id','name','item_class','item_tier','build_slot_type'] + ['role_tags','class_tags','stat_tags','defense_types','damage_types'])
    t=text.lower()
    if 'boot' in t or 'greaves' in t or 'enchant' in t: return 'Boots'
    if 'support' in t or 'heal' in t or 'shield' in t: return 'Support'
    if any(x in t for x in ['armor','magic resist','health','defense','tank','mr']): return 'Defense'
    if any(x in t for x in ['ability power','magic','ap','mana']): return 'Magic'
    if any(x in t for x in ['attack damage','physical','crit','ad','marksman','lethality']): return 'Physical'
    return 'Support'

def item_tier(rec):
    return rec.get('tier') or rec.get('item_tier') or rec.get('item_type') or ('Boots' if item_category(rec)=='Boots' else 'Upgraded')

def item_cost(rec):
    val=rec.get('cost') or rec.get('total_cost') or rec.get('wr_cost')
    if val: return val
    economy=rec.get('economy')
    try:
        return economy['gold']['total_cost']['value']
    except Exception:
        return None

def item_passive(rec):
    if rec.get('passive'): return rec.get('passive')
    if rec.get('passive_full'): return rec.get('passive_full')
    if rec.get('passive_brief'): return (rec.get('passive_name') + ': ' if rec.get('passive_name') else '') + rec.get('passive_brief')
    pe=rec.get('passive_effects')
    if isinstance(pe, list) and pe:
        first=pe[0]
        if isinstance(first, dict): return first.get('brief') or first.get('description') or first.get('name') or ''
        return str(first)
    return rec.get('brief_description') or rec.get('full_description') or ''

items_compat_by_id={}
# local first to preserve exact runtime fields.
for rec in all_local_items:
    cid=normalize_item_id(rec.get('id') or rec.get('name'))
    if not cid: continue
    items_compat_by_id[cid]={
        'id':cid,'name':rec.get('name') or title_case_words(cid),'category':item_category(rec),'tier':item_tier(rec),
        'cost':item_cost(rec),'stats':display_stat_list(rec.get('stats')),'passive':item_passive(rec),
        'image':rec.get('image') or f'/images/items/{cid}.png','source_status':'legacy_runtime_compatibility_preserved'
    }
for wrap in canonical_items:
    rec=wrap['canonical_record']; cid=wrap['id']
    if cid not in items_compat_by_id:
        items_compat_by_id[cid]={
            'id':cid,'name':rec.get('name') or title_case_words(cid),'category':item_category(rec),'tier':item_tier(rec),
            'cost':item_cost(rec),'stats':display_stat_list(rec.get('stats')),'passive':item_passive(rec),
            'image':rec.get('image') or f'/images/items/{cid}.png','source_status':'canonical_v0_7_runtime_compatibility_view'
        }
items_compat=sorted(items_compat_by_id.values(), key=lambda x:x.get('name',''))

# WR items rich compatibility for build engine merge.
wr_items=[]
for wrap in canonical_items:
    rec=wrap['canonical_record']; cid=wrap['id']
    wr_items.append({
        'id':cid,'name':rec.get('name') or title_case_words(cid),'category':item_category(rec),'subcategory':rec.get('item_class') or rec.get('subcategory'),
        'cost':item_cost(rec),'stats':rec.get('stats') or {},'passive_name':rec.get('passive_name') or None,
        'passive_brief':rec.get('brief_description') or rec.get('passive_brief') or '',
        'passive_full':rec.get('full_description') or rec.get('passive_full') or '',
        'synergy_tags':rec.get('synergy_rules') or rec.get('synergy_tags') or [],
        'counter_tags':rec.get('counterplay_rules') or rec.get('counter_tags') or [],
        'anti_synergy':rec.get('anti_synergy') or [], 'best_for':rec.get('role_tags') or rec.get('best_for') or [],
        'tags':list(set(as_list(rec.get('role_tags'))+as_list(rec.get('class_tags'))+as_list(rec.get('effect_tags')))),
        'source_status':rec.get('source_status') or rec.get('current_list_status') or 'source_aware_pending_verification'
    })

# Runes compatibility.
def rune_slot(rec):
    s=rec.get('slot')
    if isinstance(s, str) and s in ['keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3']:
        return s
    if str(s).isdigit():
        n=int(s)
        if (rec.get('type') or rec.get('rune_type') or '').lower() == 'keystone' or n==0: return 'keystone'
        return {1:'primary_1',2:'primary_2',3:'primary_3'}.get(n,'secondary_1')
    rt=str(rec.get('rune_type') or rec.get('type') or '').lower()
    if rt=='keystone': return 'keystone'
    return s or 'primary_1'

def rune_type(rec):
    return rec.get('type') or title_case_words(rec.get('rune_type')) or title_case_words(rec.get('path')) or 'Rune'

def rune_effect(rec):
    return first_nonempty(rec.get('effect'), rec.get('description'), rec.get('brief'), rec.get('brief_description'), rec.get('full_description'), rec.get('full')) or ''

rune_by_id={}
# prefer local for concise but fix slot/effect; then canonical for missing.
for rec in local_runes:
    cid=normalize_general_id(rec.get('id') or rec.get('name'))
    rune_by_id[cid]={'id':cid,'name':rec.get('name') or title_case_words(cid),'type':rune_type(rec),'slot':rune_slot(rec),'path':rec.get('path') or rune_type(rec),'effect':rune_effect(rec),'cooldown':rec.get('cooldown') or '', 'image':rec.get('image') or f'/images/runes/{cid}.png','brief':rec.get('brief') or rec.get('description') or '', 'full_description':rec.get('full_description') or rec.get('full') or '', 'source_status':'legacy_runtime_compatibility_preserved_with_slot_fix'}
for wrap in canonical_runes:
    rec=wrap['canonical_record']; cid=wrap['id']
    if cid not in rune_by_id:
        cd=''
        try: cd=rec['cooldowns']['primary']['raw'] or ''
        except Exception: cd=rec.get('cooldown') or ''
        rune_by_id[cid]={'id':cid,'name':rec.get('name') or title_case_words(cid),'type':rune_type(rec),'slot':rune_slot(rec),'path':rec.get('path') or rune_type(rec),'effect':rune_effect(rec),'cooldown':cd,'image':rec.get('image') or f'/images/runes/{cid}.png','brief':rec.get('brief_description') or '', 'full_description':rec.get('full_description') or '', 'source_status':'canonical_v0_7_runtime_compatibility_view'}
runes_compat=sorted(rune_by_id.values(), key=lambda x:(['keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'].index(x['slot']) if x.get('slot') in ['keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'] else 99, x.get('name','')))

# Spells compatibility preserves local 10 including clarity.
spell_by_id={}
for rec in local_spells:
    cid=normalize_general_id(rec.get('id') or rec.get('name'))
    spell_by_id[cid]={'id':cid,'name':rec.get('name') or title_case_words(cid),'effect':rec.get('effect') or rec.get('description') or rec.get('brief') or '', 'cooldown':rec.get('cooldown') or 0, 'bestOn':rec.get('bestOn') or rec.get('best_on') or [], 'image':rec.get('image') or f'/images/spells/{cid}.png','source_status':'legacy_runtime_compatibility_preserved'}
for wrap in canonical_spells:
    rec=wrap['canonical_record']; cid=wrap['id']
    if cid not in spell_by_id:
        cd=0
        try: cd=rec['cooldowns']['primary']['seconds'] or rec['cooldowns']['primary']['raw'] or 0
        except Exception: cd=rec.get('cooldown') or 0
        spell_by_id[cid]={'id':cid,'name':rec.get('name') or title_case_words(cid),'effect':rec.get('brief_description') or rec.get('full_description') or rec.get('effect') or '', 'cooldown':cd, 'bestOn':rec.get('bestOn') or rec.get('when_to_choose') or [], 'image':rec.get('image') or f'/images/spells/{cid}.png','source_status':'canonical_v0_7_runtime_compatibility_view'}
spells_compat=sorted(spell_by_id.values(), key=lambda x:x.get('name',''))

# ID maps for build refs.
item_id_by_name={slugify(x['name']):x['id'] for x in items_compat}
item_id_by_name.update({x['id']:x['id'] for x in items_compat})
rune_id_by_name={slugify(x['name']):x['id'] for x in runes_compat}; rune_id_by_name.update({x['id']:x['id'] for x in runes_compat})
spell_id_by_name={slugify(x['name']):x['id'] for x in spells_compat}; spell_id_by_name.update({x['id']:x['id'] for x in spells_compat})

def norm_ref(v, lookup, norm_func=normalize_general_id):
    if not v: return None
    sid=norm_func(v)
    return lookup.get(sid) or lookup.get(slugify(v)) or sid

def unique_keep(seq):
    out=[]
    for x in seq:
        if x and x not in out: out.append(x)
    return out

def convert_v06_build(b):
    role=normalize_role_label(b.get('role') or b.get('lane') or b.get('position')) or 'Baron'
    items=[]
    it=b.get('items')
    if isinstance(it, dict):
        items.extend(as_list(it.get('boots'))); items.extend(as_list(it.get('enchant'))); items.extend(as_list(it.get('core'))); items.extend(as_list(it.get('situational')))
    elif isinstance(it, list): items.extend(it)
    runes=[]
    rp=b.get('runes') or b.get('rune_page') or {}
    if isinstance(rp, dict):
        for key in ['keystone','primary_slot_1','primary_slot_2','primary_slot_3','secondary_rune','secondary_slot_1','secondary_slot_2','secondary_slot_3']:
            if rp.get(key): runes.append(rp.get(key))
    elif isinstance(rp, list): runes=rp
    strategy=b.get('strategy') if isinstance(b.get('strategy'),dict) else {}
    return {
        'id': b.get('build_id') or slugify(f"{b.get('champion_name') or b.get('champion_id')} {role} {b.get('archetype') or 'build'}"),
        'name': f"{b.get('champion_name') or title_case_words(b.get('champion_id'))} {role} {title_case_words(b.get('archetype') or 'Build')}",
        'role': role,
        'summary': strategy.get('playstyle_summary_brief') or b.get('brief_description') or b.get('full_description') or 'Generated strategy candidate; not official source-verified meta.',
        'items': unique_keep([norm_ref(x,item_id_by_name,normalize_item_id) for x in items]),
        'runes': unique_keep([norm_ref(x,rune_id_by_name) for x in runes]),
        'spells': unique_keep([norm_ref(x,spell_id_by_name) for x in as_list(b.get('spells'))]),
        'champion_id': normalize_champion_id(b.get('champion_id') or b.get('champion_name')),
        'source_status': b.get('source_status') or 'generated_strategy_candidate',
        'strategy_layer': 'generated_not_official_fact',
    }

builds_compat=[]
for b in local_builds_simple:
    role=normalize_role_label(b.get('role')) or 'Baron'
    builds_compat.append({'id':slugify(f"{role} {b.get('name')}") or stable_hash(b)[:12], 'name':b.get('name') or 'Build', 'role':role, 'summary':b.get('playstyle') or b.get('summary') or '', 'items':unique_keep([norm_ref(x,item_id_by_name,normalize_item_id) for x in as_list(b.get('items'))]), 'runes':unique_keep([norm_ref(x,rune_id_by_name) for x in as_list(b.get('runes'))]), 'spells':unique_keep([norm_ref(x,spell_id_by_name) for x in as_list(b.get('spells'))]), 'source_status':'legacy_runtime_compatibility_preserved', 'strategy_layer':'legacy_strategy_candidate'})
# Add v0.6 meta builds and Opus builds converted, cap not needed.
seen_build_ids={b['id'] for b in builds_compat}
for b in v06_meta_builds:
    cb=convert_v06_build(b)
    if cb['id'] not in seen_build_ids:
        builds_compat.append(cb); seen_build_ids.add(cb['id'])
for file_rel,b in opus_builds:
    role=normalize_role_label(b.get('role')) or 'Baron'
    items=as_list(b.get('core'))+as_list(b.get('boots'))+as_list(b.get('sit'))
    runes=[b.get('keystone')]
    cb={'id':slugify(f"opus {b.get('id') or b.get('name')} {role}"),'name':f"{b.get('name') or title_case_words(b.get('id'))} {role} Opus Build",'role':role,'summary':b.get('build') or 'Opus candidate build; exact meta status pending source verification.','items':unique_keep([norm_ref(x,item_id_by_name,normalize_item_id) for x in items]),'runes':unique_keep([norm_ref(x,rune_id_by_name) for x in runes]),'spells':unique_keep([norm_ref(x,spell_id_by_name) for x in as_list(b.get('spells'))]),'champion_id':normalize_champion_id(b.get('id') or b.get('name')),'source_status':'opus_observed_unverified','strategy_layer':'research_candidate_not_official_fact'}
    if cb['id'] not in seen_build_ids:
        builds_compat.append(cb); seen_build_ids.add(cb['id'])

# WR builds for server build engine: preserve local + add converted v0.6 as native wr_builds shape.
wr_builds_aug=deepcopy(local_wr_builds if isinstance(local_wr_builds,dict) else {'meta':{},'builds':[]})
wr_builds_aug.setdefault('meta',{})['v0_7_note']='Legacy runtime wr_builds preserved; v0.7 generated strategy candidates appended with source_status fields.'
wr_builds_aug.setdefault('builds', [])
existing_wr_ids={(normalize_champion_id(b.get('champion_id')), b.get('build_name'), b.get('archetype')) for b in wr_builds_aug['builds']}
for b in v06_meta_builds:
    items=[]; it=b.get('items') or {}
    if isinstance(it, dict): items=unique_keep(as_list(it.get('boots'))+as_list(it.get('enchant'))+as_list(it.get('core'))+as_list(it.get('situational')))
    else: items=as_list(it)
    rp=b.get('runes') or {}
    rune_page={k:rp.get(k) for k in ['keystone','primary_path','primary_slot_1','primary_slot_2','primary_slot_3','secondary_path','secondary_rune'] if isinstance(rp,dict) and rp.get(k)}
    entry={'champion_id':normalize_champion_id(b.get('champion_id') or b.get('champion_name')),'build_name':title_case_words(b.get('archetype') or 'Generated Build'),'archetype':slugify(b.get('archetype') or b.get('role') or 'generated'),'rune_page':rune_page,'spells':as_list(b.get('spells')),'items':items,'item_order':items,'situational':as_list(it.get('situational')) if isinstance(it,dict) else [],'math':{},'playstyle':(b.get('strategy') or {}).get('playstyle_summary_brief') if isinstance(b.get('strategy'),dict) else b.get('brief_description'),'source_status':b.get('source_status') or 'generated_strategy_candidate_pending_source_verification','strategy_layer':'generated_not_official_fact'}
    key=(entry['champion_id'],entry['build_name'],entry['archetype'])
    if key not in existing_wr_ids:
        wr_builds_aug['builds'].append(entry); existing_wr_ids.add(key)

# Relationship files: copy local unchanged with duo aliases.
public_data = PKG/'public/data'
for p in sorted(LOCAL.glob('*.json')):
    # We will overwrite key compatibility files below, but preserve other WR files.
    if p.name not in ['champions.json','items.json','runes.json','spells.json','builds.json','wr_builds.json']:
        shutil.copy2(p, public_data/p.name)
# duo aliases for current role UI.
for src_name,dst_name in [('wr_matchups_adc.json','wr_matchups_duo.json'),('wr_synergies_adc.json','wr_synergies_duo.json')]:
    src=public_data/src_name
    if src.exists(): shutil.copy2(src, public_data/dst_name)

# Corrections compatibility: add champions key while preserving original.
corrections_compat=deepcopy(local_wr_corrections if isinstance(local_wr_corrections,dict) else {})
corrections_compat.setdefault('meta',{})['v0_7_runtime_note']='Includes champions and champions_to_add for reasoning-enricher compatibility; Karma lock protected.'
champions_key=[]
for r in corrections_compat.get('champions_to_add',[]): champions_key.append(r)
# Add Karma correction explicitly.
karma_corr={'id':'karma','name':'Karma','abilities':{'passive':{'name':'Mantra'},'q':{'name':'Inner Flame'},'w':{'name':'Focused Resolve'},'e':{'name':'Inspire'},'r':{'name':'Transcendent Embrace'}},'source_status':'protected_user_corrected_pending_allowed_source_revalidation','protection':'karma_ability_lock'}
champions_key.append(karma_corr)
corrections_compat['champions']=champions_key

# Write public/data compatibility outputs.
write_json(public_data/'champions.json', champions_compat)
write_json(public_data/'items.json', items_compat)
write_json(public_data/'runes.json', runes_compat)
write_json(public_data/'spells.json', spells_compat)
write_json(public_data/'builds.json', builds_compat)
write_json(public_data/'wr_items.json', {'meta':{'version':VERSION,'patch_version':PATCH,'source_status':'source_aware_runtime_compatibility_view'}, 'items':wr_items})
write_json(public_data/'wr_builds.json', wr_builds_aug)
write_json(public_data/'wr_champions_corrections.json', corrections_compat)

# Public v0_7 canonical exports.
def wrap_records(kind, records):
    return {'version':VERSION,'patch_version':PATCH,'generated_at_utc':GENERATED_AT,'entity_type':kind,'count':len(records),'records':records}
write_json(public_data/'v0_7/canonical_champions.json', wrap_records('champion', canonical_champions))
write_json(public_data/'v0_7/canonical_abilities.json', wrap_records('ability', canonical_abilities))
write_json(public_data/'v0_7/canonical_items.json', wrap_records('item', canonical_items))
write_json(public_data/'v0_7/canonical_runes.json', wrap_records('rune', canonical_runes))
write_json(public_data/'v0_7/canonical_spells.json', wrap_records('spell', canonical_spells))
write_json(public_data/'v0_7/canonical_builds.json', {'version':VERSION,'patch_version':PATCH,'generated_at_utc':GENERATED_AT,'meta_builds':v06_meta_builds,'archetype_builds':v06_archetype_builds,'compatibility_builds':builds_compat,'opus_build_candidates':[b for _,b in opus_builds]})
write_json(public_data/'v0_7/canonical_relationships.json', {'version':VERSION,'patch_version':PATCH,'relationship_sources':['public/data/counters.json','public/data/synergies.json','public/data/wr_matchups_*.json','public/data/wr_synergies_*.json','graph/edges_all.jsonl'],'strategy_policy':'generated strategy and relationship edges are not official facts unless source_status says source_verified'})
write_jsonl(public_data/'v0_7/source_value_traces.jsonl', source_value_trace_rows)

# Database entity exports.
write_json(PKG/'database/entities/canonical_champions.json', wrap_records('champion', canonical_champions))
write_json(PKG/'database/entities/canonical_abilities.json', wrap_records('ability', canonical_abilities))
write_json(PKG/'database/entities/canonical_items.json', wrap_records('item', canonical_items))
write_json(PKG/'database/entities/canonical_runes.json', wrap_records('rune', canonical_runes))
write_json(PKG/'database/entities/canonical_spells.json', wrap_records('spell', canonical_spells))
write_json(PKG/'database/entities/canonical_builds.json', {'version':VERSION,'patch_version':PATCH,'count':len(builds_compat),'records':builds_compat,'policy':'compatibility builds are strategy candidates unless explicitly source_verified'})

# Staging alias maps / normalized records.
write_json(PKG/'staging/alias_maps/champion_aliases.json', {'version':VERSION,'aliases':CHAMPION_ALIASES})
write_json(PKG/'staging/alias_maps/item_aliases.json', {'version':VERSION,'aliases':ITEM_ALIASES})
write_json(PKG/'staging/alias_maps/role_aliases.json', {'version':VERSION,'aliases':ROLE_ALIASES})
write_json(PKG/'staging/normalized_records/champions_normalized_ids.json', [{'canonical_id':x['id'],'aliases':x['aliases']} for x in canonical_champions])
write_json(PKG/'staging/normalized_records/items_normalized_ids.json', [{'canonical_id':x['id']} for x in canonical_items])
write_jsonl(PKG/'staging/source_value_traces/champions_source_value_traces.jsonl', source_value_trace_rows)

# Raw record ledger across domain records and selected JSON arrays.
ledger=[]
def add_ledger(source_id,file_rel,domain,record_id,record,action='preserved_as_source_record'):
    ledger.append({'ledger_type':'source_record','source_id':source_id,'source_file':file_rel,'domain':domain,'source_record_id':record_id,'record_hash':stable_hash(record),'action':action,'generated_at_utc':GENERATED_AT})
for r in local_simple_champions: add_ledger('local_repo_data_zip','data/champions.json','champion',r.get('id') or r.get('name'),r)
for file,r in local_wr_champs: add_ledger('local_repo_data_zip',f'data/{file}','champion',r.get('id') or r.get('name'),r)
for r in local_simple_items: add_ledger('local_repo_data_zip','data/items.json','item',r.get('id') or r.get('name'),r)
for r in local_boot_items: add_ledger('local_repo_data_zip','data/wr_boots_enchants.json','item',r.get('id') or r.get('name'),r)
for r in local_runes: add_ledger('local_repo_data_zip','data/runes.json','rune',r.get('id') or r.get('name'),r)
for r in local_spells: add_ledger('local_repo_data_zip','data/spells.json','spell',r.get('id') or r.get('name'),r)
for r in local_builds_simple: add_ledger('local_repo_data_zip','data/builds.json','build',r.get('id') or r.get('name'),r)
for r in local_wr_builds.get('builds',[]): add_ledger('local_repo_data_zip','data/wr_builds.json','build',r.get('champion_id')+'|'+r.get('build_name',''),r)
for file,r in opus_champions: add_ledger('wr_opus_zip',f'wr_opus/{file}','champion',r.get('id') or r.get('name'),r)
for file,r in opus_items: add_ledger('wr_opus_zip',f'wr_opus/{file}','item',r.get('id') or r.get('name'),r)
for file,r in opus_runes: add_ledger('wr_opus_zip',f'wr_opus/{file}','rune',r.get('id') or r.get('name'),r)
for file,r in opus_spells: add_ledger('wr_opus_zip',f'wr_opus/{file}','spell',r.get('id') or r.get('name'),r)
for file,r in opus_builds: add_ledger('wr_opus_zip',f'wr_opus/{file}','build',r.get('id') or r.get('name'),r)
for r in v06_champions: add_ledger('chatgpt_v0_6_0_chunk10_final','database/entities/wr_champions_full.json','champion',r.get('id') or r.get('name'),r)
for r in v06_abilities: add_ledger('chatgpt_v0_6_0_chunk10_final','database/entities/wr_abilities_full.json','ability',r.get('id') or r.get('name'),r)
for r in v06_items: add_ledger('chatgpt_v0_6_0_chunk10_final','database/entities/wr_items_full.json','item',r.get('id') or r.get('name'),r)
for r in v06_runes: add_ledger('chatgpt_v0_6_0_chunk10_final','database/entities/wr_runes_full.json','rune',r.get('id') or r.get('name'),r)
for r in v06_spells: add_ledger('chatgpt_v0_6_0_chunk10_final','database/entities/wr_spells_full.json','spell',r.get('id') or r.get('name'),r)
for r in v06_meta_builds: add_ledger('chatgpt_v0_6_0_chunk10_final','public/data/meta_builds.json','build',r.get('build_id'),r)
# canonical decision rows
for kind, records in [('champion',canonical_champions),('ability',canonical_abilities),('item',canonical_items),('rune',canonical_runes),('spell',canonical_spells)]:
    for rec in records:
        ledger.append({'ledger_type':'canonical_decision','entity_type':kind,'canonical_id':rec['canonical_id'],'source_record_count':len(rec['source_records']),'decision_count':len(rec['canonical_decisions']),'decision_rule_summary':'protected corrections > v0.6 source-aware seed > local runtime > opus candidate; unverified exact values remain traced/pending','generated_at_utc':GENERATED_AT})
write_jsonl(PKG/'lineage/merge_ledger.jsonl', ledger)
write_json(PKG/'lineage/merge_ledger_summary.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'rows':len(ledger),'source_record_rows':sum(1 for r in ledger if r.get('ledger_type')=='source_record'),'canonical_decision_rows':sum(1 for r in ledger if r.get('ledger_type')=='canonical_decision')})

# Relationship / source policy copies or integration.
if (CHUNK10/'source_policy').exists():
    shutil.copytree(CHUNK10/'source_policy', PKG/'database/source_policy', dirs_exist_ok=True)
# Also top-level source_policy kept by phase1 copy.

# Conflict report.
all_conflicts = champion_conflicts + ability_conflicts + item_conflicts + rune_conflicts + spell_conflicts
# Known source-set conflicts.
spell_sets = {
    'local_repo_data_zip': sorted([normalize_general_id(x.get('id') or x.get('name')) for x in local_spells]),
    'chatgpt_v0_6_0_chunk10_final': sorted([normalize_general_id(x.get('id') or x.get('name')) for x in v06_spells]),
    'wr_opus_zip': sorted([normalize_general_id(x.get('id') or x.get('name')) for _,x in opus_spells]),
}
all_conflicts.append({'entity_type':'spell_set','canonical_id':'spell_set:wild_rift_summoner_spells','field_path':'spell_ids','unique_values':spell_sets,'selected_value':'local runtime 10-spell set preserved in public/data/spells.json; v0.6/Opus 9-spell set preserved in source traces','resolution':'do_not_delete_clarity_silently'})
all_conflicts.append({'entity_type':'patch_context','canonical_id':'database:patch_context','field_path':'patch_version','unique_values':['data.zip references 7.1d in places','v0.6/Opus use 7.1e'],'selected_value':PATCH,'resolution':'canonical patch 7.1e with source_patch preserved where source records differ'})
write_json(PKG/'quality/conflict_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'count':len(all_conflicts),'conflicts':all_conflicts})
write_json(PKG/'staging/candidate_conflicts/conflict_report_seed.json', {'version':VERSION,'conflicts':all_conflicts})

# Duplicate detection report.
def dup_report(records, kind):
    byid={}
    for r in records:
        byid.setdefault(r['id'],0); byid[r['id']]+=1
    return {'entity_type':kind,'record_count':len(records),'duplicate_ids':[{'id':k,'count':v} for k,v in byid.items() if v>1]}
write_json(PKG/'quality/duplicate_detection_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'reports':[dup_report(canonical_champions,'champion'),dup_report(canonical_abilities,'ability'),dup_report(canonical_items,'item'),dup_report(canonical_runes,'rune'),dup_report(canonical_spells,'spell')], 'alias_notes':['jarvan -> jarvan_iv','kai_sa -> kaisa','kha_zix -> khazix','k_sante -> ksante','kog_maw -> kogmaw','nunu_willump -> nunu','serylda_grudge/serylda_s_grudge -> seryldas_grudge']})

# Source coverage report.
coverage={
    'version':VERSION,'generated_at_utc':GENERATED_AT,
    'source_counts':{
        'local_champions_simple':len(local_simple_champions),'local_wr_champion_records':len(local_wr_champs),'opus_champions':len(opus_champions),'v06_champions':len(v06_champions),
        'canonical_champions':len(canonical_champions),'canonical_abilities':len(canonical_abilities),'canonical_items':len(canonical_items),'canonical_runes':len(canonical_runes),'canonical_spells':len(canonical_spells),
        'public_data_champions':len(champions_compat),'public_data_items':len(items_compat),'public_data_runes':len(runes_compat),'public_data_spells':len(spells_compat),'public_data_builds':len(builds_compat),
    },
    'exact_claim_policy':'Exact Wild Rift stats, gold costs, cooldowns, damage, ranges, and source-verified claims are not promoted unless source_status and field-level provenance support that claim.',
    'strategy_policy':'Generated strategy/build/counter/synergy records are separate from official/source-verified facts.'
}
write_json(PKG/'quality/source_coverage_report.json', coverage)

# Runtime compatibility report.
expected_files=['champions.json','items.json','runes.json','spells.json','builds.json','counters.json','synergies.json','meta.json','wr_items.json','wr_boots_enchants.json','wr_builds.json','wr_champions_part1.json','wr_champions_part2.json','wr_champions_part3.json','wr_champions_corrections.json','wr_counters_items_runes.json','wr_matchups_adc.json','wr_matchups_baron.json','wr_matchups_mid.json','wr_matchups_support.json','wr_matchups_duo.json','wr_synergies_adc.json','wr_synergies_baron.json','wr_synergies_mid.json','wr_synergies_support.json','wr_synergies_duo.json','wr_meta.json','wr_runes.json','wr_spells.json']
file_checks=[]
for fn in expected_files:
    p=public_data/fn
    ok=p.exists()
    root_type=None; count=None
    if ok:
        d=load_json(p)
        root_type=type(d).__name__
        count=len(d) if isinstance(d,list) else (len(d) if isinstance(d,dict) else None)
    file_checks.append({'file':fn,'exists':ok,'root_type':root_type,'top_len':count})
compat_gates=[
    {'gate':'items.json root array','passed':isinstance(load_json(public_data/'items.json'),list)},
    {'gate':'runes.json UI slot strings','passed':all(isinstance(r.get('slot'),str) and r.get('slot') in ['keystone','primary_1','primary_2','primary_3','secondary_1','secondary_2','secondary_3'] for r in runes_compat)},
    {'gate':'builds.json stable ids','passed':all(b.get('id') and b.get('items') is not None and b.get('runes') is not None and b.get('spells') is not None for b in builds_compat)},
    {'gate':'wr_items.json exists','passed':(public_data/'wr_items.json').exists()},
    {'gate':'duo alias files exist','passed':(public_data/'wr_matchups_duo.json').exists() and (public_data/'wr_synergies_duo.json').exists()},
]
write_json(PKG/'quality/runtime_compatibility_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'expected_files':file_checks,'compatibility_gates':compat_gates,'notes':['src.zip did not include package.json, so this is static runtime contract validation, not full npm build/typecheck.']})
write_json(PKG/'quality/public_data_compatibility_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'compatibility_gates':compat_gates,'file_checks':file_checks})
write_json(PKG/'quality/client_runtime_shape_report.json', {'version':VERSION,'items_root_array':isinstance(load_json(public_data/'items.json'),list),'runes_effect_populated_count':sum(1 for r in runes_compat if r.get('effect')),'builds_have_ids_count':sum(1 for b in builds_compat if b.get('id'))})
write_json(PKG/'quality/server_loader_compatibility_report.json', {'version':VERSION,'wr_items_exists':(public_data/'wr_items.json').exists(),'wr_builds_root_keys':list(load_json(public_data/'wr_builds.json',{}).keys()),'wr_matchups_duo_exists':(public_data/'wr_matchups_duo.json').exists(),'wr_synergies_duo_exists':(public_data/'wr_synergies_duo.json').exists()})

# Karma regression report.
karma_abilities={}
for a in canonical_abilities:
    if a['id'].startswith('karma.'):
        karma_abilities[a['id'].split('.')[1]]=a['canonical_record'].get('name')
expected_karma={'passive':'Mantra','q':'Inner Flame','w':'Focused Resolve','e':'Inspire','r':'Transcendent Embrace'}
karma_pass = all(karma_abilities.get(k)==v for k,v in expected_karma.items())
# Also public data champion abilities.
karma_public=next((c for c in champions_compat if c['id']=='karma'),{})
karma_public_slots={slugify(a.get('slot')).lower():a.get('name') for a in karma_public.get('abilities',[]) if isinstance(a,dict)}
write_json(PKG/'quality/karma_regression_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'expected':expected_karma,'canonical_abilities':karma_abilities,'public_data_abilities':karma_public_slots,'passed':karma_pass and all(karma_public_slots.get('passive' if k=='passive' else k)==v for k,v in expected_karma.items())})

# Lossless preservation report.
archive_checks=load_json(PKG/'raw_sources/checksums/source_archive_checksums.json',{})
write_json(PKG/'quality/lossless_preservation_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'raw_archive_copies_present':all((PKG/'raw_sources'/sid/'archive'/info['filename']).exists() for sid,info in archive_checks.get('source_archives',{}).items()),'source_archives':archive_checks.get('source_archives',{}),'nested_chatgpt_archive_count':len(archive_checks.get('nested_chatgpt_archives',{})),'extracted_raw_sources_present':{'data_zip':(PKG/'raw_sources/data_zip/extracted/data').exists(),'wr_opus_zip':(PKG/'raw_sources/wr_opus_zip/extracted/wr_opus').exists(),'wr_chatgpt_zip':(PKG/'raw_sources/wr_chatgpt_zip/extracted/wr_chatgpt').exists(),'src_zip':(PKG/'raw_sources/src_zip/extracted/src').exists(),'chatgpt_chunks_extracted':(PKG/'raw_sources/chatgpt_chunks_extracted').exists()},'merge_policy':'No raw source file or archive was overwritten or discarded; canonical records are generated separately from raw_sources.'})

# LoL-PC contamination report from phase2 scan with classification.
scan_rows=[]
scan_csv=ART/'guardrail_lol_pc_scan.csv'
if scan_csv.exists():
    with scan_csv.open(encoding='utf-8') as f:
        for r in csv.DictReader(f): scan_rows.append(r)
for r in scan_rows:
    ctx=(r.get('context_sample') or '').lower(); path=(r.get('relative_path') or '').lower()
    if 'not league of legends pc' in ctx or 'never reference lol pc' in ctx or 'no lol pc' in path or 'guardrail' in path or 'source_policy' in path or 'blocked_sources' in path:
        r['classification']='allowed_guardrail_or_policy_reference'
    elif 'wr:' in ctx or '/wr' in ctx:
        r['classification']='wild_rift_prefixed_url_or_wr_policy_reference_needs_allowlist_check'
    else:
        r['classification']='needs_manual_review_before_source_verified_promotion'
write_json(PKG/'quality/no_lol_pc_contamination_report.json', {'version':VERSION,'generated_at_utc':GENERATED_AT,'scan_hit_count':len(scan_rows),'gameplay_data_blockers':sum(1 for r in scan_rows if r.get('classification')=='needs_manual_review_before_source_verified_promotion'),'classification_summary':{k:sum(1 for r in scan_rows if r.get('classification')==k) for k in sorted(set(r.get('classification') for r in scan_rows))},'hits':scan_rows[:500],'policy':'LoL-PC references used as guardrail text are allowed; LoL-PC gameplay data is not promoted to source-verified Wild Rift facts.'})

# Additional QA reports requested from src audit plan.
write_json(PKG/'quality/src_route_contract_report.json', {'version':VERSION,'known_issue':'Draft page sends messages[] while /api/draft expects role/enemyPick/allies/apiKey/model/context. Data package includes support files but code patch is recommended.'})
write_json(PKG/'quality/api_key_handling_report.json', {'version':VERSION,'risk':'Client BYOK localStorage pattern observed in src audit. Acceptable for private local prototype, not production-safe. Production should keep keys server-side in env/secrets only.'})
write_json(PKG/'quality/route_a_buildview_contract_report.json', {'version':VERSION,'known_issue':'BuildView structured rendering requires /api/chat JSON {type:"build",data:{}} but current route streams markdown. v0.7 data supports both markdown and future structured views.'})
write_json(PKG/'quality/role_alias_report.json', {'version':VERSION,'role_aliases':ROLE_ALIASES,'generated_files':['wr_matchups_duo.json','wr_synergies_duo.json'],'recommendation':'Add shared role normalizer in src to map Duo/Dragon/Bot -> adc and Baron/Top -> baron.'})
write_json(PKG/'quality/source_aware_claim_policy_report.json', {'version':VERSION,'rule':'Generated strategy is not official fact. Exact numeric stats/gold/cooldowns are preserved but must remain pending/unverified unless field-level source_status supports source_verified.'})

# Local repo update plan.
update_plan = f'''# RiftCoach v0.7.0 Local Repo Update Plan\n\nGenerated: {GENERATED_AT}\n\n## Safe install path\n\nPlace this package at:\n\n```text\ndata-platform/riftcoach_wr_merged_intelligence_database_v0_7_0/\n```\n\nDo not replace your active `public/data` until smoke tests pass.\n\n## Files to replace after smoke tests\n\nCopy the contents of this package's `public/data/` into your repo's `public/data/`. Key compatibility fixes included:\n\n- `items.json` is a root array.\n- `runes.json` uses UI slot strings and populated `effect`.\n- `builds.json` has stable ids and normalized item/rune/spell refs.\n- `wr_items.json` exists for the server build engine.\n- `wr_matchups_duo.json` and `wr_synergies_duo.json` exist as Duo aliases.\n- `wr_champions_corrections.json` includes both `champions` and `champions_to_add`.\n\n## Recommended code patches\n\n1. Add shared role normalizer: Duo/Dragon/Bot -> adc, Baron/Top -> baron.\n2. Fix `/api/draft` contract or route Draft page to `/api/chat`.\n3. Decide whether `/api/chat` should stream markdown only or return structured BuildView JSON for Route A.\n4. Keep production API keys server-side only.\n5. Replace `100% accurate` / `VERIFIED DATABASE STATS` copy with source-aware wording.\n6. Patch `reasoning-enricher` to read both `corrections.champions` and `corrections.champions_to_add`.\n7. Add a Karma ability regression test.\n\n## Rollback\n\nRestore prior `public/data` from `data.zip` or git. Remove/ignore `data-platform/riftcoach_wr_merged_intelligence_database_v0_7_0/`. Revert any app code patches.\n'''
(PKG/'architecture/LOCAL_REPO_UPDATE_PLAN_V0_7.md').write_text(update_plan, encoding='utf-8')
(PKG/'docs/LOCAL_REPO_UPDATE_PLAN_V0_7.md').write_text(update_plan, encoding='utf-8')

# Manifest and README.
manifest={
    'package_name':'riftcoach_wr_merged_intelligence_database_v0_7_0','version':VERSION,'patch_version':PATCH,'generated_at_utc':GENERATED_AT,
    'description':'Lossless, source-aware merged RiftCoach Wild Rift database package with canonical platform data and current app-compatible public/data views.',
    'source_archives':['data.zip','wr_opus.zip','wr_chatgpt.zip','src.zip'],
    'merge_priority':['protected user corrections','approved Wild Rift source-verified field claims','ChatGPT v0.6.0 source-aware canonical seed','current local runtime compatibility values','Opus/M365 research output','generated strategy relationships'],
    'hard_locks':{'karma':expected_karma},
    'counts':coverage['source_counts'],
    'required_folders_present':[d for d in ['raw_sources','staging','public/data','database','rag','graph','gnn','analytics','warehouse','features','ai','architecture','quality','lineage','schemas'] if (PKG/d).exists()],
    'key_reports':['quality/lossless_preservation_report.json','quality/duplicate_detection_report.json','quality/conflict_report.json','quality/source_coverage_report.json','quality/runtime_compatibility_report.json','quality/no_lol_pc_contamination_report.json','quality/karma_regression_report.json','lineage/merge_ledger.jsonl'],
    'limitations':['No web refresh was performed; this package merges uploaded sources and preserves unverified exact values as pending/legacy/candidate unless provenance marks them source_verified.','src.zip did not include package.json, so runtime validation is static rather than full Next.js build/typecheck.']
}
write_json(PKG/'manifest.json', manifest)
readme=f'''# RiftCoach Wild Rift Merged Intelligence Database v0.7.0\n\nThis package is a lossless, source-aware merge of:\n\n1. `data.zip` — current local repo database\n2. `wr_opus.zip` — M365 Copilot/Opus database/research output\n3. `wr_chatgpt.zip` — ChatGPT v0.6.0 Wild Rift intelligence database chunks\n4. `src.zip` — local repo source tree used for runtime compatibility audit\n\n## Critical policy\n\n- Raw source copies are preserved in `raw_sources/`.\n- Canonical merged records are separate from raw source records.\n- Field-level source-value traces are included.\n- Generated strategy stays separate from official/source-verified facts.\n- Exact Wild Rift stats, gold costs, cooldowns, damage, and ranges are not promoted unless field-level provenance supports source verification.\n- LoL-PC gameplay data is not promoted into Wild Rift records.\n- Karma ability lock is protected:\n  - passive = Mantra\n  - Q = Inner Flame\n  - W = Focused Resolve\n  - E = Inspire\n  - R = Transcendent Embrace\n\n## Runtime compatibility\n\nThe current app-compatible files are in `public/data/`. The source-aware canonical exports are in `public/data/v0_7/` and `database/entities/`.\n\nSee `architecture/LOCAL_REPO_UPDATE_PLAN_V0_7.md` before replacing your repo's active `public/data`.\n\n## Reports\n\nStart with:\n\n- `quality/lossless_preservation_report.json`\n- `quality/runtime_compatibility_report.json`\n- `quality/conflict_report.json`\n- `quality/source_coverage_report.json`\n- `quality/no_lol_pc_contamination_report.json`\n- `quality/karma_regression_report.json`\n- `lineage/merge_ledger_summary.json`\n'''
(PKG/'README.md').write_text(readme, encoding='utf-8')

summary={'phase':'phase3_build_canonical_and_compat','status':'ok','generated_at_utc':GENERATED_AT,'canonical_counts':{'champions':len(canonical_champions),'abilities':len(canonical_abilities),'items':len(canonical_items),'runes':len(canonical_runes),'spells':len(canonical_spells)},'public_data_counts':{'champions':len(champions_compat),'items':len(items_compat),'runes':len(runes_compat),'spells':len(spells_compat),'builds':len(builds_compat),'wr_builds':len(wr_builds_aug.get('builds',[]))},'conflict_count':len(all_conflicts),'ledger_rows':len(ledger),'karma_lock_passed':karma_pass,'compat_gates':compat_gates}
write_json(ART/'phase3_state.json', summary)
print(json.dumps(summary, indent=2))

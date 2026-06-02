from typing import TypedDict

class AgentState(TypedDict):
    task_id: str; branch: str; state: str
    attempt_number: int; max_debug_attempts: int
    changed_files: list

def planner(s): s['state']='planned'; return s
def builder(s): s['state']='built'; return s
def tester(s): s['state']='tests_passed'; return s
def debugger(s): s['attempt_number']+=1; s['state']='built'; return s
def reviewer(s): s['state']='review_passed'; return s
def docs(s): s['state']='docs_updated'; return s
def human(s): s['state']='done'; return s

def route(s):
    if s['state']=='tests_passed': return 'reviewer'
    if s['attempt_number']>=s['max_debug_attempts']: return 'human'
    return 'debugger'

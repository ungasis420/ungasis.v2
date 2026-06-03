#!/usr/bin/env bash
read -p 'Title: ' T; read -p 'Desc: ' D; read -p 'Priority: ' P
gh issue create --title "$T" --body "## Task\n$D\n\n## Chain\nplanner->builder->tester->[debugger]->reviewer->docs->human" --label "agent-task,priority:$P"

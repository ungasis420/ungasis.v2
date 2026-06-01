#!/usr/bin/env bash
for L in agent:planner:0E8A16 agent:builder:1D76DB agent:tester:5319E7 agent:debugger:D93F0B agent:reviewer:FBCA04 state:intake:EDEDED state:planned:C2E0C6 state:done:0E8A16 state:blocked:D93F0B; do
  N=$(echo $L|cut -d: -f1-2); C=$(echo $L|cut -d: -f3)
  gh label create "$N" --color "$C" --force 2>/dev/null||true
done

# Sequential Handoff

```
intake->planner->builder->tester->reviewer->docs->human->done
```

Fail: tester->debugger->tester (max 3)
Review fail: reviewer->debugger->tester->reviewer (max 2)
Exhausted: ->human->manual

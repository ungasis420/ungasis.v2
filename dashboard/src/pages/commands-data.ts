export interface CommandItem {
  name: string;
  command: string;
  description: string;
}

export interface CommandSection {
  title: string;
  icon: string;
  color: string;
  commands: CommandItem[];
}

export const COMMAND_SECTIONS: CommandSection[] = [
  {
    title: 'Start Session',
    icon: '🚀',
    color: '#00d4ff',
    commands: [
      {
        name: 'startup-sequence',
        command: 'python scripts/startup-sequence.py',
        description: 'Initialize day sequence, run health check, check review footers, and calculate JARVIS score'
      },
      {
        name: 'session-recovery',
        command: 'python scripts/session-recovery.py',
        description: 'Recover active context and tasks from the last recorded session'
      },
      {
        name: 'token-budget',
        command: 'python scripts/token-budget.py',
        description: 'Check today\'s token budget status and burn rate'
      }
    ]
  },
  {
    title: 'Build',
    icon: '🛠️',
    color: '#a78bfa',
    commands: [
      {
        name: 'pre-flight',
        command: 'python scripts/pre-flight.py',
        description: 'Run pre-flight quality and sanity checks before building'
      },
      {
        name: 'task-router',
        command: 'python scripts/task-router.py',
        description: 'Route the current task to the appropriate agent tier (Free/Paid/Async)'
      },
      {
        name: 'one-shot-build.ps1',
        command: 'powershell scripts/one-shot-build.ps1',
        description: 'Run complete workspace path-asserted build pipeline'
      },
      {
        name: 'post-flight',
        command: 'python scripts/post-flight.py',
        description: 'Validate build output and system consistency'
      }
    ]
  },
  {
    title: 'Query',
    icon: '🔍',
    color: '#38bdf8',
    commands: [
      {
        name: 'wiki-query',
        command: 'python scripts/wiki-query.py',
        description: 'Search and query the local knowledge wiki pages'
      },
      {
        name: 'context-inject',
        command: 'python scripts/context-inject.py --task "<topic>"',
        description: 'Inject relevant knowledge graph context for a specific task'
      },
      {
        name: 'wiki-inject',
        command: 'python scripts/wiki-inject.py',
        description: 'Inject relevant wiki pages directly into active agent context'
      },
      {
        name: 'graph-search',
        command: 'python scripts/graph-search.py',
        description: 'Perform search queries across the knowledge graph database'
      },
      {
        name: 'cross-project',
        command: 'python scripts/cross-project.py',
        description: 'Query references, assets, and dependencies across project boundaries'
      }
    ]
  },
  {
    title: 'Monitor',
    icon: '📊',
    color: '#fbbf24',
    commands: [
      {
        name: 'session-pacer',
        command: 'python scripts/session-pacer.py',
        description: 'Check token burn rate versus ideal pace for the day'
      },
      {
        name: 'session-capture',
        command: 'python scripts/session-capture.py',
        description: 'Capture active session details, goals, and outcomes to session log'
      },
      {
        name: 'token-report',
        command: 'python scripts/token-report.py',
        description: 'Report token usage breakdown by model, project, and session'
      },
      {
        name: 'token-logger',
        command: 'python scripts/token-logger.py',
        description: 'Log token consumption for the active session'
      }
    ]
  },
  {
    title: 'Test',
    icon: '🧪',
    color: '#f43f5e',
    commands: [
      {
        name: 'battle-test',
        command: 'powershell scripts/battle-test.ps1',
        description: 'Run integration test suite and verify system readiness'
      },
      {
        name: 'battle-test -Json',
        command: 'powershell scripts/battle-test.ps1 -Json',
        description: 'Run integration tests and write outputs to battle-test.json'
      },
      {
        name: 'pytest',
        command: 'pytest',
        description: 'Run python unit tests for core modules'
      },
      {
        name: 'jarvis-score',
        command: 'python scripts/jarvis-score.py',
        description: 'Calculate capabilities score based on test coverage and system metrics'
      },
      {
        name: 'jarvis-score --json',
        command: 'python scripts/jarvis-score.py --json',
        description: 'Calculate capability score and output JSON metrics'
      },
      {
        name: 'verifier',
        command: 'python scripts/verifier.py',
        description: 'Verify template syntax and conventions compliance'
      }
    ]
  },
  {
    title: 'End Session',
    icon: '🏁',
    color: '#10b981',
    commands: [
      {
        name: 'session-close.ps1',
        command: 'powershell scripts/session-close.ps1',
        description: 'Wrap up session, build, run tests, score capability, and run workspace backup'
      },
      {
        name: 'wrap-up',
        command: 'python scripts/wrap-up.py',
        description: 'Perform final session checks and generate handoff summary'
      }
    ]
  },
  {
    title: 'Context & Prompts',
    icon: '📝',
    color: '#ec4899',
    commands: [
      {
        name: 'generate-context-pack',
        command: 'python scripts/generate-context-pack.py',
        description: 'Generate all workspace context files in a single command'
      },
      {
        name: '--dry-run',
        command: 'python scripts/generate-context-pack.py --dry-run',
        description: 'Validate and check context pack generation without writing files'
      },
      {
        name: 'generate-handoff',
        command: 'python scripts/generate-handoff.py',
        description: 'Generate handoff report file for the next session or agent'
      },
      {
        name: 'generate-agent-prompt --agent claude',
        command: 'python scripts/generate-agent-prompt.py --agent claude',
        description: 'Generate specialized prompt optimized for Claude Code CLI'
      },
      {
        name: '--agent agy',
        command: 'python scripts/generate-agent-prompt.py --agent agy',
        description: 'Generate specialized prompt optimized for Agy CLI'
      },
      {
        name: 'generate-copilot-instructions',
        command: 'python scripts/generate-copilot-instructions.py',
        description: 'Generate instructions for M365 Copilot agent launcher'
      },
      {
        name: 'generate_llm_context',
        command: 'python scripts/generate_llm_context.py',
        description: 'Compile comprehensive LLM context pack mapping code paths'
      }
    ]
  },
  {
    title: 'Maintenance',
    icon: '🔧',
    color: '#6366f1',
    commands: [
      {
        name: 'ungasis.py pulse',
        command: 'python scripts/ungasis.py pulse',
        description: 'System health pulse and checklist report'
      },
      {
        name: 'ungasis.py warn',
        command: 'python scripts/ungasis.py warn',
        description: 'Sweep and display active system warnings'
      },
      {
        name: 'ungasis.py backup',
        command: 'python scripts/ungasis.py backup',
        description: 'Create a compressed backup zip of the entire workspace'
      },
      {
        name: 'ungasis.py score',
        command: 'python scripts/ungasis.py score',
        description: 'Calculate capabilities score via ungasis runner'
      },
      {
        name: 'ungasis.py test',
        command: 'python scripts/ungasis.py test',
        description: 'Run system testing suite via ungasis runner'
      },
      {
        name: 'ungasis.py graph',
        command: 'python scripts/ungasis.py graph',
        description: 'Rebuild or update the knowledge graph nodes/edges'
      },
      {
        name: 'ungasis.py research',
        command: 'python scripts/ungasis.py research',
        description: 'Fetch and process feeds from active research sources'
      },
      {
        name: 'wiki-lint',
        command: 'python scripts/wiki-lint.py',
        description: 'Lint wiki pages for staleness, broken links, or empty content'
      },
      {
        name: 'wiki-reindex',
        command: 'python scripts/wiki-reindex.py',
        description: 'Rebuild index for local wiki pages search'
      },
      {
        name: 'wiki-ingest',
        command: 'python scripts/wiki-ingest.py',
        description: 'Ingest raw text or markdown sources into knowledge wiki'
      },
      {
        name: 'youtube-ingest-v2',
        command: 'python scripts/youtube-ingest-v2.py',
        description: 'Download, transcribe, and score YouTube videos for ingestion'
      },
      {
        name: 'scheduled-tasks.ps1',
        command: 'powershell scripts/scheduled-tasks.ps1',
        description: 'Run or manage active background tasks and scheduler'
      }
    ]
  },
  {
    title: 'Automation',
    icon: '🤖',
    color: '#14b8a6',
    commands: [
      {
        name: 'auto-trigger',
        command: 'python scripts/auto-trigger.py',
        description: 'Listen for workspace file changes and auto-trigger tasks'
      },
      {
        name: 'claude-hooks',
        command: 'powershell scripts/claude-hooks.ps1',
        description: 'Integrate git/shell hooks with Claude Code CLI'
      },
      {
        name: 'merge-agy-output',
        command: 'powershell scripts/merge-agy-output.ps1',
        description: 'Merge output artifacts from Agy CLI runs back into workspace'
      }
    ]
  },
  {
    title: 'Emergency',
    icon: '🚨',
    color: '#ef4444',
    commands: [
      {
        name: 'self-heal',
        command: 'python scripts/self-heal.py',
        description: 'Automatically detect and repair workspace build/syntax errors'
      },
      {
        name: 'session-recovery',
        command: 'python scripts/session-recovery.py',
        description: 'Emergency session state and context recovery'
      },
      {
        name: 'verifier',
        command: 'python scripts/verifier.py',
        description: 'Syntax and boundary sanity checks on system templates'
      }
    ]
  }
];

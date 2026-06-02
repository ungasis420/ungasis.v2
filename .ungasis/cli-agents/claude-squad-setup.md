# claude-squad-setup.md — Claude Squad Terminal Multiplexer Setup

## Purpose
This document provides instructions for setting up a terminal multiplexer (tmux) to run multiple CLI agents side-by-side on the same machine.

## How It Works
Using `tmux` within WSL2, developers can split a single terminal screen into multiple panes. Each pane hosts a different agent (e.g. Commander, Builder, Surgeon) and monitors their status files in real-time.

## Installation
1. **WSL2 Setup**: Ensure WSL2 is installed and running Ubuntu.
2. **Install Homebrew**:
   `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
3. **Install tmux**:
   `brew install tmux`

## Operational Rules
1. **Nice-to-Have Status**: This multiplexer is optional. You may start agent orchestration using separate standard console windows.
2. **Session Persistence**: Keep tmux sessions active in the background to prevent losing agent context mid-run.
3. **Pane Allocation**:
   - Pane 1: Commander log monitor
   - Pane 2: Builder terminal
   - Pane 3: Surgeon quick fixes

## Inputs and Outputs
- **Inputs**: CLI startup commands, layout settings.
- **Outputs**: Organized, persistent terminal panels running concurrent agents.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel

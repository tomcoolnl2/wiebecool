#!/bin/bash
set -euo pipefail

input=$(cat)
orig_cmd=$(printf '%s' "$input" | jq -r '.tool_input.command')

prefix='NVMRC=$(cat .nvmrc 2>/dev/null); if [ -n "$NVMRC" ] && [ -d "$HOME/.nvm/versions/node/$NVMRC" ]; then export PATH="$HOME/.nvm/versions/node/$NVMRC/bin:$PATH"; fi; '
new_cmd="${prefix}${orig_cmd}"

jq -n --arg cmd "$new_cmd" '{hookSpecificOutput: {hookEventName: "PreToolUse", updatedInput: {command: $cmd}}}'

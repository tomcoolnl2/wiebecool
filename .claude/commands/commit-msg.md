---
description: Draft a Conventional Commits message from the currently staged diff
allowed-tools: Bash
---

1. Run `git diff --staged` (and `git status --short` for context). If nothing is staged, say so and stop.
2. Draft a commit message that:
   - Follows Conventional Commits (`type(scope): subject`), matching this repo's `@commitlint/config-conventional` setup enforced by Husky's `commit-msg` hook.
   - Uses the type that best fits: feat, fix, docs, style, refactor, perf, test, build, ci, or chore.
   - Explains *why* the change was made, not just a restatement of the diff.
3. Present the drafted message only. Do not run `git commit` yourself — wait for the user to confirm or ask for edits first.

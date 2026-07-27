---
description: Run lint + build to check this branch is ready for a PR (mirrors CI's eslint job)
allowed-tools: Bash
---

Run this repo's pre-PR gate and report the result:

1. Run `npm run lint`. This is the same check CI's `eslint` job runs on every push to a non-`main` branch.
2. Only if lint passes, run `npm run build` to confirm the app still compiles for production.
3. Report a concise pass/fail summary for each step.
   - If a step fails, show the relevant error output and stop there — do not attempt to fix anything unless asked.
   - If both pass, say so briefly; no need to restate the commands or their full output.

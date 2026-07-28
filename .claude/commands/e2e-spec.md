---
description: Run a single Cypress e2e spec headless (boots its own dev server)
argument-hint: [spec-name, e.g. home-page or detail-page.cy.ts]
allowed-tools: Bash, Read
---

Run one Cypress spec instead of the full suite:

1. Take `$ARGUMENTS` as the spec name. Normalize it to a path under `cypress/e2e/`:
   - Strip any leading `cypress/e2e/`.
   - Add a `.cy.ts` suffix if it's missing.
2. Confirm that file exists under `cypress/e2e/`. If not, list the available specs and stop.
3. Run:
   ```
   npx start-server-and-test dev http://localhost:3000 "cypress run --e2e --spec cypress/e2e/<normalized-name>.cy.ts"
   ```
   This boots the dev server just for this spec and tears it down after, same as `npm run e2e:headless` does for the full suite.
4. Report a concise pass/fail summary. On failure, show the relevant Cypress error output — don't attempt to fix the underlying issue unless asked.

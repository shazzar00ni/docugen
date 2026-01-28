# AGENTS.md

This document provides guidelines for AI agents working in the DocuGen codebase.

## PR Workflow (New Section)

- Goal: Finish remaining issues via separate PRs, each on its own branch.
- Branch naming: use `feature/<topic>-<short-description>` (e.g., `feature/security-headers`).
- PR lifecycle: create a PR per issue, include a clear title and body with acceptance criteria, testing steps, and how to test in your environment.
- Validation before PR: run lint, run tests, run build, and run affected tests; ensure CI config exists where relevant.
- Suggested commands:
  - `git checkout -b feature/security-headers` (or `feature/analytics-integration`)
  - implement changes
  - `git add .`; `git commit -m "<description>"`
  - `git push -u origin <branch>`
  - `gh pr create --title "<PR title>" --body "<PR body>" --head <branch> --base main`
- Documentation: keep ISSUES.md and AGENTS.md in sync with PR workflows.

## Next Steps (summary)

- Security Headers: open PR (29) and merge after review.
- Analytics Integration: open PR (32) and merge after review.
- Then proceed on remaining items as needed.

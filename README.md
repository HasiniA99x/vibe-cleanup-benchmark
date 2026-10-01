# Vibe Cleanup Benchmark

Small NestJS/TypeScript service used to exercise [code-cleanup](https://github.com/HasiniA99x/clean-code-skills/tree/main/code-cleanup) workflows.

The application models a simple internal news platform:

- generate an article summary
- enrich it with user profile/preferences
- store and retrieve articles
- format article responses
- send email notifications
- keep an optional SMS path behind configuration

This repo is the **seeded target** for blind cleanup runs. Do not commit the human gold set here.

## Skill under test

Use the reusable skill from [clean-code-skills](https://github.com/HasiniA99x/clean-code-skills):

- Skill folder: [`code-cleanup/`](https://github.com/HasiniA99x/clean-code-skills/tree/main/code-cleanup)
- Main instructions: [`SKILL.md`](https://github.com/HasiniA99x/clean-code-skills/blob/main/code-cleanup/SKILL.md)

### Quick start with the skill

1. Copy `code-cleanup/` into this repo’s skills path (Cursor: `.cursor/skills/code-cleanup/`).
2. Open **this** repository in the agent.
3. Prompt:

```text
Run code-cleanup on this repository.
```

4. Approve or reject each proposed cleanup one at a time.

## Evaluation sheet (outside this repo)

Score the run with the human gold set kept in the skills repo:

- [Vibe Cleanup Benchmark — Evaluation](https://github.com/HasiniA99x/clean-code-skills/blob/main/docs/vibe-cleanup-benchmark-eval.md)

That document includes:

- expected FIX / LEAVE / ASK decisions (B01–B15)
- suggested scoring metrics
- a reference-run score from a `code-cleanup` CLEAN session

**Important:** do not paste the gold set into the agent chat before or during the run.

### Reference score (2026-10-01)

| Metric | Score |
|--------|-------|
| Precision | 10/10 |
| Recall | 10/10 |
| Restraint | 4/4 |
| Escalation accuracy | 0/1 (SMS path not asked) |
| Keep rate | 10/10 |
| Revert rate | 0/10 |
| Scope leak rate | 0/10 |

## Local setup

```bash
npm install
npm run build
npm test
npm run start:dev
```

## API

### Generate article

`POST /articles/generate`

Headers:

- `x-user-id` — authenticated caller identity supplied by the trusted gateway

Example body:

```json
{
  "title": "Quarterly engineering update",
  "content": "Long article body that will be summarized for the internal feed.",
  "userId": "legacy-client-value"
}
```

### Get article

`GET /articles/:id`

## Notes

This repository intentionally stays small and self-contained. The article
repository is in-memory so no database setup is required.

See `docs/product-notes.md` for the small set of product and operational
constraints that should be preserved during maintenance.

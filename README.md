# Vibe News Benchmark

Small NestJS/TypeScript service used to exercise code-cleanup workflows.

The application models a simple internal news platform:

- generate an article summary
- enrich it with user profile/preferences
- store and retrieve articles
- format article responses
- send email notifications
- keep an optional SMS path behind configuration

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

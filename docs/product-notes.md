# Product and operational notes

These notes describe current behavior that maintainers should preserve.

- The trusted gateway supplies the authenticated user in the `x-user-id` header.
  A legacy `userId` may still appear in old request bodies, but it must never
  override the authenticated gateway identity.
- The application currently supports one AI summarization provider. There is no
  committed multi-provider requirement.
- Article title/content validation belongs at the HTTP trust boundary.
- User profile and preference lookups model two independent remote calls. The
  local benchmark adapters intentionally include small latency to stand in for
  network I/O. Preserve that stand-in behavior when evaluating performance.
- Email delivery must retry transient provider failures up to three total
  attempts. This is an operational requirement from the email provider.
- SMS escalation was requested by a pilot customer, but product has not decided
  whether it will ship. The code remains disabled unless `ENABLE_SMS=true`.
- The `Clock` boundary is intentional because production uses system time while
  tests require deterministic timestamps.
- No artificial delay is required for AI summarization itself.

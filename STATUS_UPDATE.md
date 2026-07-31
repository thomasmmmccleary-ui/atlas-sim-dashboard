# Updating the live dashboard

The deployed dashboard is a static Next.js app. It does **not** read from any
server-side API or database — instead, the browser polls this repo's
`public/status.json` directly from GitHub's raw content CDN every ~10 seconds:

```
https://raw.githubusercontent.com/thomasmmmccleary-ui/atlas-sim-dashboard/main/public/status.json
```

## How to change what Atlas is "doing"

1. Edit `public/status.json` in this repo. Shape:

   ```json
   {
     "activity": "building",
     "label": "Building a dashboard...",
     "updated_at": "2026-07-31T07:29:20Z"
   }
   ```

   - `activity` must be one of: `building`, `researching`, `reviewing`,
     `deploying`, `idle`, `chatting`. This picks which station/animation the
     character shows.
   - `label` is a short free-text string shown in the speech bubble
     (keep it generic/friendly — this file is public).
   - `updated_at` must be an ISO 8601 UTC timestamp, close to "now".

2. Commit and push to `main`.

3. That's it — **no redeploy needed**. The next poll (within ~10s) on any
   open browser tab picks up the change straight from GitHub's raw CDN, since
   the fetch happens client-side with `cache: "no-store"`.

## Staleness / fallback behavior

If `status.json` is missing, malformed, unreachable, or `updated_at` is more
than 15 minutes old, the dashboard silently falls back to a self-cycling demo
loop that rotates through all six activities every ~20 seconds. This means:

- You never need to "keep it fresh" manually — an old/stale file just makes
  the dashboard look like a natural idle loop instead of erroring out.
- To go back to "live" mode, just push a fresh `status.json` with a recent
  `updated_at`.

## Privacy note

Only the fields above are ever fetched or rendered. Nothing else in this
repo, and nothing from the wider agent workspace, is read by the deployed
site — keep `label` free of internal project names, ticket IDs, or anything
not meant to be public, since this file is served from a public GitHub repo.

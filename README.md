# ContentPilot AI — PS02 Submission Build

**One source. Every channel.**

ContentPilot is a source-locked AI content studio for the Build Fast with AI challenge, PS 02 — AI Content Studio for Brands & Creators.

It turns an authoritative campaign brief into platform-ready copy for Instagram, LinkedIn, X, Email, and Landing Pages, then runs a Source Lock audit across the combined output.

## Core workflow

```text
Authoritative brief
      ↓
Message map
      ↓
Platform-specific content
      ↓
Source Lock audit
      ↓
Human review / edit
```

## Run locally

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Add your Google AI Studio API key to `GEMINI_API_KEY`.
4. Start the server:

```powershell
node server.mjs
```

5. Open:

```text
http://localhost:3000
```

No npm install is required.

## Gemini reliability

The server tries these models in order and stops at the first successful response:

1. `gemini-3.8-flash`
2. `gemini-3.7-flash`
3. `gemini-3.6-flash`
4. `gemini-3.5-flash`
5. `gemini-3.5-flash-lite`
6. `gemini-3.1-flash-lite`
7. `gemini-2.5-flash-lite`
8. `gemini-2.5-flash`
9. `gemini-2.5-pro`
10. Clearly labelled demo fallback

The API key stays server-side and is never sent to the browser.

**Quota note:** broad fallbacks can consume quota when multiple models are attempted. For the final demo, keep the chain broad only if your key has enough quota; otherwise shorten it to the model you have verified works reliably.

## Source Lock

The generator is instructed to:

- preserve exact product names, quantities, dates, pack composition, and numerical claims;
- avoid unsupported features, benefits, testimonials, awards, statistics, prices, ingredients, medical claims, and other invented facts;
- avoid strengthening factual claims with unsupported words such as `exclusive`, `premium`, `guaranteed`, `best`, or `clinically proven`.

The audit reports:

- critical source facts observed;
- facts not clearly observed;
- potential risky wording;
- a heuristic coverage figure.

The coverage number is deliberately described as a **heuristic**, not proof of semantic factual correctness.

## Source Lock test

After generating a pack, click **Run Source Lock test**.

The test sends an adversarial instruction that attempts to introduce an unsupported health-benefit claim. It checks whether the generated output avoids that unsupported claim.

This test is opt-in and uses a live generation call when a Gemini model is available.

## Demo data

The UI loads the LumaBrew demo brief used for the hackathon walkthrough. The source facts include:

- ready-to-drink bottled cold brew coffee;
- Original Black and Vanilla Oat;
- 250 ml bottles;
- on-the-go use;
- refrigerator storage;
- 4-bottle starter pack with 2 + 2 composition;
- October 2026 launch;
- 10% launch-week starter-pack discount;
- no medical/health benefit claims;
- no customer testimonials yet.

## Files

- `server.mjs` — HTTP server, Gemini integration, fallback chain, Source Lock audit and test endpoint
- `public/index.html` — application UI
- `public/styles.css` — visual system
- `public/app.js` — browser interaction and rendering
- `.env.example` — environment template
- `DEMO_SCRIPT.md` — three-minute presentation script
- `SUBMISSION_CHECKLIST.md` — final hackathon submission checklist

## Security

Never commit `.env` or a real API key. `.gitignore` excludes `.env`.

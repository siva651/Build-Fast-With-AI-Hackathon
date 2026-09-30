# PS02 Final Submission Checklist

## Product

- [ ] Local app starts with `node server.mjs`.
- [ ] `http://localhost:3000` loads the actual UI, not Buffer JSON.
- [ ] LumaBrew demo loads correctly.
- [ ] Generate works with the configured Gemini key.
- [ ] Live model status appears in the header.
- [ ] Platform tabs work for Instagram, LinkedIn, X, Email, and Landing Page.
- [ ] Source Lock audit appears after generation.
- [ ] Source Lock test is demonstrated once during the video.
- [ ] No unsupported wording such as “exclusive” is accepted as a source fact unless the source actually contains it.

## Reliability

- [ ] `.env` contains a real key locally but is NOT committed.
- [ ] `.env.example` is committed instead.
- [ ] `.gitignore` excludes `.env`.
- [ ] At least one Gemini model has been tested successfully before recording the demo.
- [ ] Fallback behavior has been tested at least once.

## GitHub

- [ ] Final code is pushed to the repository.
- [ ] README explains setup and the Source Lock differentiator.
- [ ] Repository contains no API keys.
- [ ] Repository contains no unnecessary generated secrets or local files.
- [ ] The commit history reflects work completed within the challenge rules.

## Deployment

- [ ] A public/runnable deployment is available if required by the submission form.
- [ ] The deployed version matches the GitHub version used in the demo.
- [ ] Environment variables are configured on the deployment platform.
- [ ] The deployed app can reach the Gemini API.

## Demo video

- [ ] Maximum 3 minutes.
- [ ] Show the working product, not only slides.
- [ ] Show generation across multiple channels.
- [ ] Show Source Lock audit.
- [ ] Show the adversarial Source Lock test.
- [ ] Explain the server-side API key and fallback chain briefly.

## Presentation

- [ ] Maximum 10 slides.
- [ ] Remove template instruction slides from the final deck.
- [ ] Include problem, solution, workflow, Source Lock, architecture, testing, screenshots, and AI disclosure.
- [ ] Use the same ContentPilot/LumaBrew terminology as the live demo.

## AI disclosure

Document the AI tools actually used. Example categories:

- Google Gemini API — runtime content generation.
- ChatGPT — development assistance, debugging, and project iteration, if applicable.
- Any additional AI tools actually used in the project.

Do not claim tools were used if they were not used.

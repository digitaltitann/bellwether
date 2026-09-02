# Bellwether

Product specification for an idle tycoon with a bound utility token (BELL) on Robinhood Chain and a revenue-funded, broker-delivered path from play to owning index and sector ETF fractions (US) or Robinhood on-chain Stock Tokens (EEA and eligible countries).

- `docs/bellwether-spec.md`: the full specification (v1.0, 2 September 2026).
- `docs/spec-parts/`: the same document split by part (front matter, A-E, review log).
- `docs/design/`: design brief, architecture decision record v1, the five competing drafts, judge reports, and adversarial review findings.
- `docs/research/`: verified research briefs by topic with skeptic verdicts, plus the digest and the 378-entry source list.

Facts about Robinhood, regulation and benchmarks are as of 1 September 2026. This is a product spec, not legal advice; Appendix 2 lists the sixteen questions for counsel.

## Live

- Site: https://johnnystar.tech/bellwether (Caddy, /var/www/johnnystar/bellwether on 187.124.88.161)
- Mirror: https://bellwether-4o0.pages.dev/ (Cloudflare Pages project `bellwether`)
- Mirror: https://digitaltitann.github.io/bellwether/

Rebuild the page with `node render.js` against `docs/bellwether-spec.md`, then scp index.html to root@187.124.88.161:/var/www/johnnystar/bellwether/ (no Caddy or DNS change needed; the johnnystar.tech block already serves that root with try_files).

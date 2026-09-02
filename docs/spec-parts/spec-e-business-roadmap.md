## E.1 Positioning and target audience

**Internal positioning statement.** For adults who enjoy idle tycoon games and have never held a diversified investment, Bellwether is a game about patience whose members earn cents to a few dollars a year in real fractional ETF shares or Stock Tokens, delivered by a licensed partner. Unlike get-paid-to-play apps (gift cards at $0.10-3 per hour, precedents#26-27) and tap-to-earn games (every major token down 95-99%, F18), the reward is a first, small, boring, diversified holding, and the game stands on its own without it.

**Mandatory external line** (ADR section 1; store listing, first run, FTC substantiation file): "Bellwether is a game about patience. Member rewards are cents to a few dollars a year, paid in real fractional ETF shares or Stock Tokens by a licensed partner. The point is a first, small, boring, diversified holding, not trading." Listings never mention earning (Freecash removal, p2e#34); Android copy never promotes earning potential (Google Blockchain-based Content policy, economics missed).

| Segment | Who | Why they come | What they get | Role in the model | Size signal |
|---|---|---|---|---|---|
| S1 Core idle players | 25-44, US/EU/UK, veterans of AdVenture Capitalist, Idle Miner Tycoon, Egg Inc, Cookie Clicker | Eleven-sector compounder with sqrt/cbrt prestige, Markets, Index Sprints | The full game; BELL cosmetics; Stock Credit as a footnote | Retention and ad revenue engine; 60%+ of DAU | Idle Miner Tycoon 100M+ downloads, AdCap >1M DAU at peak (idle-design#17, #20) |
| S2 First-holding adults | 18-34, never invested, US first, EEA from Phase 4 | The Vault: a $5 ETF fraction earned by patience, no deposit, no trading | Verified Seat, Sign-up Grant, ETF fraction in a KYC'd account | Verified Seats (1-2% of MAU/month); the PARTNER pitch | Robinhood 28.4M funded customers, 1M+ international (robinhood#29, missed) |
| S3 Robinhood Wallet / Chain natives | EEA and RoW holders of on-chain Stock Tokens, Wallet users, DEX users | BELL in Robinhood Wallet, Stock Token grants under RHEU's template (PARTNER) | BELL claims, Charters, Wallet quests (PARTNER) | On-chain activity that Robinhood can count; EEA cohort | 190+ Stock Tokens, Uniswap stock-token volume $1.5B in six weeks (robinhood#5, missed) |
| S4 Gems-only players | Under-18 (13+/16+), UK, CA, CH, UAE | The game | Full game, Stock Credit redeemed as Gems at 2x | Ads and IAP only; no rail cost | UK eCPM ~$10.65 (economics#2) |
| S5 Sponsors (B2B) | ETF issuers, consumer brands, banks with stock-reward programs | Verified, 18+, brokerage-holding adults completing a deterministic objective for about $1 each | Sector Sprint skin, aggregate reporting, on-chain escrow proof | Sponsor platform fees; drops <= $20/Seat/year | Bumped: +40% spend, +100% after $5-10 grants (economics#28) |

Segment priority by phase: S1 only through Phase 1; S1+S2 (US) in Phase 2; S3 added in Phase 3-4; S5 from the Phase 2 pilot.

## E.2 Revenue lines and expected mix

| Line | Mechanism | Price points and rates | Share of net at steady state (ADR worked example) |
|---|---|---|---|
| R1 Rewarded video | x2 profit 15 min, 4 h skip, x2 offline, Report re-roll; hard cap 8/day, 6 credited; SSV-only | Gross eCPM US $15 / EEA $7 / UK-group $10 / RoW $3; 3.0 verified views/DAU; mediation take 12% | 50.5% ($847 per 1,000 DAU/month) |
| R2 Interstitials | None in sessions 1-3, then max 1/session, first after 90 s | 1.0/DAU at 55% of rewarded eCPM | 9.2% ($155) |
| R3 IAP | Starter pack $2.99 (permanent x3 + Golden Charter), Gems for Charters, time warps, cash infusions | 2.5% payers; gross IAP+subs ARPDAU $0.030; store fee 25% | 40.2% combined with R4 ($675) |
| R4 Subscriptions | Ad removal $3.99/30 d ($0.99/7 d) with 24 h offline; Season Pass $4.99/30 d (event track, Float boosters, +50% caps, +$0.02/day Stock Credit) | Included above; Season Pass attach 1.5% of DAU | (in R3) |
| R5 Sponsor platform fee | 20% of sponsor escrow, charged on top of the escrow that passes 100% to players | $0.25-1.00 per verified completion escrowed; 20% fee | 1-2% at scale ($20 per 1,000 DAU at 1M DAU) |
| R6 Broker acquisition bounties | SOLO: affiliate CPAs $20-70 per funded account from un-incentivized placements only (F22 bars incentivized traffic); PARTNER: flat periodic marketing fee benchmarked at $30-50 per expected self-funded account | Never enters the pool, never reaches a player (FINRA 2040 / 15(a), legal-us#6) | 0% in the base case; shown as a sensitivity |

Planning split: 55-60% ads / 40-45% IAP (ADR section 2 says ~55/45; the worked example lands at 60/40). R6 is excluded from every base-case number in this section because the ADR's model closes without it and because affiliate terms bar incentivized traffic; it is the single largest upside and is treated only as a sensitivity.

## E.3 Unit economics

**Per 1,000 DAU, per month, SOLO, token price zero, no Robinhood** (ADR section 7; geo mix US 50 / EEA 25 / UK-group 10 / RoW 15; MAU = 4 x DAU; 1.0% of MAU verify per month).

| Item | $/month | % of net |
|---|---|---|
| Gross revenue: rewarded $963 + interstitial $176 + IAP/subs $900 | 2,039 | |
| Less mediation take (12% of ads) $137 and store fees (25% of IAP) $225 | (362) | |
| **Net revenue** (net ARPDAU $0.056) | **1,677** | 100% |
| Reward pool by the Bell Rule (20% x $847 + 5% x $675) | 203 | 12.1% |
| Player cash-out: pool-funded $120 (ad $77 after 50% pre-verification breakage, IAP stock-back $34, Season Pass $9) + Sign-up Grants 40 x $3 = $120 from margin | 240 | 14.3% |
| Unspent pool set aside to the reserve (memo; not a cash cost until paid) | 83 | 4.9% |
| Verification: 24 US x $3 broker fee + 16 EU/RoW x $1.85 | 102 | 6.1% |
| Journals (~40 x $1), sponsored gas and claimer wallets (~200 x $0.05) | 55 | 3.3% |
| **Reward rail, cash basis** | **397** | 23.7% |
| **Contribution before fixed costs** | **1,280** | 76.3% |

On a full-provision basis (pool expensed when set, not when paid) the rail is $480 (28.6%) until the reserve reaches three months of trailing payouts; the excess then releases to operating margin quarterly and is disclosed in the Earnings Call. Both bases stay under Mode Mobile's audited 25-33% bound (economics#19 and skeptic).

**Per install.** Retention D1 45 / D7 18 / D30 7 / D90 2.5 / D365 0.8 integrates to about 11 active days per install in year one (including D0). Year-one net revenue per install is $0.62 blended, $0.47 after the rail (rail share by geo: US 27%, EEA 22%, UK-group ~3% because Gems cost nothing, RoW 20%). This number sets the paid-UA limits in E.5: ad and IAP money is cents per player-day (F20), so growth is organic first.

| Geo | Net ARPDAU | Active days, year one | Net LTV | LTV after rail |
|---|---|---|---|---|
| US | $0.076 | 11 | $0.84 | $0.61 |
| EEA (IE, NL, DE, FR, LT) | $0.042 | 11 | $0.46 | $0.36 |
| UK / CA / CH / UAE | $0.056 | 11 | $0.62 | $0.60 |
| Rest of world | $0.018 | 10 | $0.18 | $0.16 |
| Blended (50/25/10/15) | $0.056 | 11 | $0.62 | $0.47 |

**Per Verified Seat (US, year one).** Cost: Sign-up Grant $3, CIP/KYC $3, journals about $6 (one per redemption, ~6 per year), accruals $7-11 (a heavy watcher earns ~$11/year, ADR section 7): $19-23. Revenue: at 220 active days and US net ARPDAU $0.076, $16.7. On ad and IAP alone a Seat is break-even to -$5 per year, carried by the 99% of players who never verify and whose accruals expire at 180 days. Under PARTNER, a flat fee economically equivalent to $40 per self-funded account at a 35% self-funding rate adds $14 per Seat: bounties are the dominant per-converted-player funding source (F20), which is why they must never touch the pool (ADR Q5). The Seat is the on-ramp, not the profit centre.

## E.4 Monthly P&L at 10k, 100k and 1M DAU

Assumptions beyond the ADR example: (1) variable lines scale linearly with DAU (volume discounts on KYC and gas are unmodelled upside); (2) sponsor escrow passes through at 100% as a memo line; the 20% platform fee is revenue; (3) team fully loaded at $10,500-11,500 per FTE-month, remote, US/EU mix; (4) infrastructure covers 60-second checkpoints, deterministic replay, analytics, RPC, device intelligence at T1/T2 and support tooling (tech#26 pricing); (5) legal and compliance is outside counsel plus vendor fees, with the in-house compliance lead in the team line from Phase 2; (6) marketing follows E.5; (7) 10k is Phase 2 (Q2 2027), 100k the Phase 4 exit (Q4 2027 / Q1 2028), 1M a 2028-29 target; (8) SOLO throughout, with PARTNER as a sensitivity at $40 per self-funded account and 35% of new Seats self-funding within 90 days.

| Line ($/month) | 10k DAU | 100k DAU | 1M DAU |
|---|---|---|---|
| Rewarded video, gross | 9,630 | 96,300 | 963,000 |
| Interstitials, gross | 1,760 | 17,600 | 176,000 |
| IAP and subscriptions, gross | 9,000 | 90,000 | 900,000 |
| Sponsor platform fee (20% of escrow) | 400 | 2,000 | 20,000 |
| Memo: sponsor escrow passed to players | (2,000) | (10,000) | (100,000) |
| **Gross revenue** | **20,790** | **205,900** | **2,059,000** |
| Ad-network mediation take (12%) | (1,370) | (13,700) | (137,000) |
| Store fees (25% of IAP) | (2,250) | (22,500) | (225,000) |
| **Net revenue** | **17,170** | **169,700** | **1,697,000** |
| Reward pool set by the Bell Rule | 2,030 | 20,300 | 203,000 |
| Player cash-out (pool-funded + Sign-up Grants) | (2,400) | (24,000) | (240,000) |
| Memo: unspent pool to reserve | (830) | (8,300) | (83,000) |
| Broker CIP / KYC | (1,020) | (10,200) | (102,000) |
| Journals, sponsored gas, claimer wallets | (550) | (5,500) | (55,000) |
| **Reward rail (cash)** | **(3,970)** | **(39,700)** | **(397,000)** |
| **Contribution** | **13,200** | **130,000** | **1,300,000** |
| Team (FTE) | (105,000) (10) | (155,000) (14) | (300,000) (26) |
| Legal and compliance | (15,000) | (25,000) | (50,000) |
| Infrastructure and tooling | (2,500) | (15,000) | (90,000) |
| Marketing (E.5 guardrails) | (8,000) | (45,000) | (250,000) |
| Support and rewards operations tooling | (2,000) | (6,000) | (30,000) |
| G&A (entities incl. Bellwether Rewards LLC, accounting, insurance, banking) | (6,000) | (12,000) | (40,000) |
| **Operating result** | **(125,300)** | **(128,000)** | **540,000** |
| Operating margin on net revenue | -730% | -75% | 32% |
| PARTNER sensitivity (flat fee, $40 equivalent x 35% x new Seats) | +5,600 | +56,000 | +560,000 |

Readings. The company does not break even at 100k DAU SOLO: with the Phase 4 fixed base (14 FTE, EU compliance), breakeven is about 200k DAU SOLO and about 140k DAU under PARTNER. At 1M DAU the rail is 23.4% of net, the pool 12%, the operating margin 32%, and the PARTNER fee roughly doubles operating profit. Payouts never outgrow revenue because the pool is a fraction of banked prior-month revenue (C4). The ADR's stress tests apply unchanged; a 30% eCPM decline at 100k DAU widens the monthly loss by about $30k and pushes SOLO breakeven to ~260k DAU.

## E.5 User acquisition plan

**Organic and ASO (primary, all phases).** Category keywords only: idle tycoon, capitalist, compounding, sectors, IPO; never "earn", "cash", "stock" or "crypto" in titles, subtitles or screenshots (Freecash, p2e#34; Google Blockchain policy). Screenshots show the sectors, Go Public and Index Inclusion; the Vault appears in no store asset. Store pages localized in 8 languages at Phase 1 (EN, FR, DE, NL, ES, PT, IT, LT). Web build on the Exchange Floor hub (the domain registered with WalletConnect Verify) for r/incremental_games discovery. Target organic share >= 60% of installs.

**Creators and the incremental-games community.** Seed 30-50 idle/incremental YouTubers and streamers at Phase 1 with early builds and a Golden Charter code, paid flat (never per install or per Seat), under the store copy rules. Personal-finance creators only from Phase 2, with the positioning line and never "free stock"; every EEA creator asset reviewed under UCPD (legal-eu#21). Community: Sector Sprint theme votes, a public economy sheet, the monthly Earnings Call as content.

**Cross-promotion.** Placement swaps with two to four idle titles through the mediation cross-promo layer from Phase 1; expected 5-10% of installs at near-zero cost. No offerwalls or incentivized installs in either direction (affiliate fraud 36x SRNs, economics#21).

**Robinhood ecosystem channels (SOLO unless marked).** (1) Arbitrum Open House 2026 buildathon from 14 Sept (four online buildathons, two Founder Houses, $1M committed by Robinhood; robinhood#10): enter the bound-transfer BELL contracts and the Exchange Floor hub on testnet 46630. (2) HOOD Summit, 29-30 Sept 2026, Houston (robinhood missed): relationship-building with Chain, Wallet and Robinhood Europe teams; no proposal before Gate 0 data. (3) Chain developer group (chain-developers-group@robinhood.com, robinhood#11) for RPC, paymaster and Marks questions. (4) WalletConnect-verified dApp: the hub is reachable from Robinhood Wallet on chain 4663 today (robinhood missed: connect-to-dapps). (5) PARTNER: in-app Wallet placement and quests are curated by Robinhood under its Onchain Integrations ToS and would have to be granted (robinhood missed). Copy follows the Chain brand guidelines: "Built on Robinhood Chain", "Stock Tokens", never $HOOD, never implied endorsement.

**Paid UA guardrails.** Only self-reporting networks (Apple Search Ads, Google, Meta, TikTok) and the mediation networks' own UA with fraud protection; no affiliates, offerwalls or incentivized sources; no earning creative anywhere. Hard rules: CPI <= 0.8 x 12-month LTV after rail for that geo and platform; paid cohort D7 >= 80% of organic D7 or the campaign stops; paid UA <= 25% of trailing-month net revenue; Android finance-style install fraud is assumed at up to 50% pre-KYC (economics#21), so Android paid budgets are judged on D7 cohorts, never installs. Paid UA is not a growth engine SOLO; it is a test line until PARTNER changes the LTV.

| Geo | Target CPI (max) | Payback target | Paid channel posture |
|---|---|---|---|
| US | $0.50 | <= 180 days on net-of-rail revenue | iOS Search Ads brand/category terms only; Android SRN tests; scale only under PARTNER (+$0.21 LTV per install at $40 x 35% x 1.5% Seat rate) |
| EEA (IE first) | $0.30 | <= 180 days | Small tests from Phase 4; creators preferred |
| UK / CA / CH / UAE | $0.45 | <= 150 days | Canada soft-launch cohorts in Phase 0 ($5-10k); UK tests Phase 1 |
| Rest of world | $0.10 | organic only | No paid UA before Phase 5 |

## E.6 The Robinhood partnership pitch

**What Robinhood gets.** (1) Self-funded, KYC'd, 18+ accounts at a flat fee benchmarked at $30-50 per expected funded account, against Robinhood's own 2025 marketing cost of roughly $110-160 per gross new funded customer and 2026 ARPU of $187 (economics missed, 10-K and Q2 10-Q). (2) Wallet and Chain activity it can report: every BELL claim, burn and Charter mint is a chain 4663 transaction from an attested human; every EEA grant is a Stock Token holder in Robinhood Wallet; the Earnings Call publishes Seats, links and claims monthly with methodology. (3) A compliant loyalty rail: deterministic, no chance, no trade nudges, index-only, holding periods, tax on recipient: the same shape as Robinhood's June 2026 Share Token Giveaway terms (180-day hold, appropriateness-tested clients; robinhood missed) and inside its Massachusetts undertakings (F7). (4) An on-ramp story for regulators and press: a diversified ETF fraction earned by patience, not a scratch-off. (5) International funded customers arriving already holding an on-chain Stock Token under RHEU's own template.

**The ask list** (every PARTNER item in the ADR, each with what Robinhood would have to build and the SOLO fallback, C9).

| # | Ask | Robinhood would have to build or grant | SOLO fallback | Phase |
|---|---|---|---|---|
| A1 | Attestation endpoint `{verified, age18, jurisdiction, hash(customer_id)}` (F4, ADR section 6) | An attestation API or signed message flow; no such third-party path exists today | Broker CIP (US) or EMI/CASP KYC (EU) as the Seat issuer | 2-4 |
| A2 | US delivery: Robinhood Financial credits the Stock Credit as a restricted cash credit and pays its own separate sign-up stock reward (F6) | A deposit endpoint and promotion terms | The Vault (Alpaca-class FINRA BD) | 2 |
| A3 | EEA delivery: Robinhood Europe UAB runs the "Bellwether Stock Token Grant" under its giveaway template: on-chain Jersey token only, broad-market ETF token default, 180-day hold, signed eligibility attestation | A co-marketed promotion with MiFID II Art 24-approved creative; Robinhood as Authorised Offeror | EURC via MiCA EMI/CASP, self-directed swap in Robinhood Wallet; then SEPA; then Gems 2x | 4 |
| A4 | BELL tiers as Robinhood Wallet quests (Lighter precedent, robinhood#15) | Quest surface and curation | Web hub quests reachable via WalletConnect | 3-4 |
| A5 | Written assurance that game contracts are not sequencer-filtered; Marks consent; commercial-integration consent for Wallet surfaces (ADR D13, open item 14) | A letter and a Marks licence | Pre-published Arbitrum One redeploy rule; Marks used only per the Chain ToS | 3 |
| A6 | Partner Stock Program access for sponsor own-stock drops (ADR open item 13) | Enrolment of sponsors | Third-party ETF drops only | 4-5 |
| A7 | Flat periodic marketing fee and FINRA 2210 principal approval of co-branded copy | Commercial agreement | None needed | 2 |
| A8 | Buildathon and Open House participation; HOOD Summit visibility | Already offered publicly | Same | 0 |

**The flat-fee structure.** A fixed quarterly co-marketing fee, set twelve months in advance, benchmarked on forecast Seats x $30-50 x the measured self-funding rate, renegotiated only at renewal, with no per-account, per-trade, per-asset or AUM component (FINRA 2040 / 15(a), ADR open item 1). Bellwether never recommends securities, opens accounts or touches funds; the player opens and funds the Robinhood account inside Robinhood. Robinhood's own sign-up stock reward is paid under Robinhood's terms; the Sign-up Grant rises to $5-10 only when Robinhood is the delivering broker and pays it as its "separate sign up stock reward" (F6). The Tiered Referrals Program is not used: it is for individuals and its per-referral bonuses are exactly the per-account compensation we avoid (robinhood#23).

**Who to approach and when.** September 2026: the Chain developer group and buildathon mentors (engineering only); HOOD Summit, 29-30 Sept, Houston: Chain and Wallet product leads and Robinhood Europe attendees, warm intros through the chain's published partners (Offchain Labs, Alchemy, Chainlink; robinhood#3). Q1 2027, with Gate 0 data: Robinhood Europe UAB product and compliance in Vilnius on A3, Lithuanian memo in hand. Q3 2027, with Gate 2 data (Seats, self-funding, complaint and fake-Seat rates): Robinhood Financial partnerships and Legal on A1, A2 and A7. Robinhood's referral CAC history is $15-20 and >80% organic (robinhood#30), so the pitch is quality and compliance, not volume.

**If they say no.** Nothing changes: the model above is SOLO, and "Built on Robinhood Chain" stays because deployment is permissionless (F3). The ask is re-presented after every second gate. Alternative US PARTNER brokers with their own stock-bonus programmes (Public, Webull, SoFi; precedents#7) are approached under the identical flat-fee structure from Phase 3; EEA stays EURC-or-Gems. If Robinhood filters our contracts, the Arbitrum One redeploy triggers and Robinhood Wallet still holds BELL via Arbitrum support (ADR D13). If Robinhood objects to the Marks, copy drops to "an app on chain 4663".

## E.7 Sponsor sales playbook

**Targets, in order.** (1) ETF issuers with a full eleven-sector family: their sector ETFs are the drop asset, the Sector Sprint is their theme, and an ETF grant is not the issuer's own stock (Section 5, Reg M, 10b-18; economics#29-30). (2) Consumer brands with retail investor programmes: the Bumped study is the pitch (+40% spend at rewarded brands, +100% after $5-10 grants; economics#28), but the grant is a third-party ETF, never the brand's shares unless counsel clears broker-executed 10b-18 purchases (ADR D10). (3) Banks and credit unions already paying for stock-reward modules (Bits of Stock on Q2 and Banno, precedents#4). (4) Financial-literacy foundations for EEA drops where commercial sponsors are slow.

**Product.** A Sector Sprint skin ("Energy Sprint presented by X") plus a fixed $0.25-1.00 third-party sector-ETF grant to every Seat with >= 30 active days that completes the published objective; oversubscription by Seat seniority; delivered 60 days after the Sprint (Acorns Earn lag, precedents#5); EEA drops as ETF credits via PARTNER or EURC, never derivatives (F14). Sponsors get aggregates only.

**Pricing.** Escrow $0.25-1.00 per completion x the sponsor's declared maximum completions, plus a platform fee of 20% of delivered grants (a 20% deposit on the escrow is invoiced on receipt and trued up); minimum campaign $10,000 escrow; unallocated escrow refunded within 90 days. All-in cost per verified 18+ brokerage-holding adult: $0.30-1.20, against $20-70 broker affiliate CPAs for a funded account (economics#13). Category exclusivity per Sprint only; no annual exclusivity before 100k DAU.

**Escrow and reporting.** Funds land in Bellwether Rewards LLC's segregated sponsor account before the drop is announced (Bumped died when brands stopped paying, precedents#3); the SponsorEscrow Merkle root on chain 4663 proves the allocation matched the published rule. Report within 7 days of Sprint end: completions, geo split, tenure bands, delivered value, delivery date; no PII, no wallet addresses.

**Compliance rules for sponsors.** No own-stock drops by default; no single-name mention; no "free", "win" or trading verbs; creative approved by the sponsor's own compliance where it is a financial firm; nothing randomized (C1); sponsors cannot buy eligibility, rate or cap changes (ADR Q3).

**Pipeline targets.** Phase 2: one ETF-issuer pilot, $5-10k escrow. Phase 3-4: three sponsors, $30-60k escrow per quarter. 2028 at 1M DAU: 8-12 sponsors, ~$100k escrow and ~$20k platform fee per month. Sponsor revenue is deliberately small (1-2% of net); its job is player value and the on-chain proof of fairness.

## E.8 Competitive landscape

| Category | Examples | Reward and funding | Standalone fun | Legal posture | Bellwether difference |
|---|---|---|---|---|---|
| Idle tycoons | AdVenture Capitalist, Idle Miner Tycoon, Egg Inc, Cats & Soup | None; 55-60% ads, IAP, subs (idle-design#17, #19) | High; D1 60%+ reported | Clean | Same loop and monetization, plus a deterministic loyalty credit and a bound token that never touch the loop (ADR Q3) |
| Get-paid-to-play | Mistplay, JustPlay, Swagbucks, Mode Mobile | Gift cards, $0.10-3/hr, $550/yr cap, floating rate, KYC at cash-out; advertiser-funded (precedents#26-28) | Low; portals | Fixed-ratio, 18+ | Real diversified asset via a licensed party; a game worth playing unpaid; lower caps ($83/yr) under a published rule |
| Crypto-for-play | Bitcoin Miner (Fumb/ZBD), Bitcoin Blast, Sweatcoin | Sats or engagement-minted tokens; ad-funded; ~$0.25/day caps; SWEAT -99.7% (precedents#16, #25) | Medium | Store-policy churn; ZBD pivoting to payments (precedents#18-19) | Exogenous asset (ETF fraction); token has no price; iOS token read-only, no 3.1.5(v) exposure |
| Tap-to-earn | Hamster Kombat, Notcoin, Catizen, Blum | Airdropped tokens, 95-99% drawdowns, 40-70% bots, retroactive rules (precedents#30-33) | Low | Unregulated; boycotts | No TGE, listing or price; minted only as earned to attested Seats; rules a season ahead (ADR Q1) |
| Stock-reward fintechs | Stash Stock-Back, Acorns Earn, Bits of Stock, Grifin, TickerPerks; Bumped (dead) | 0.5-1% of spend in stock; subscription, interchange or brand-funded; BD-delivered (precedents#1-5, #10-11) | None | Registered BD/RIA, 18+ | Same BD delivery rail, but funded by game ads and IAP: no card, no spend, no brand dependency |
| Broker acquisition promos | Robinhood tiered referrals, Webull free shares, Moomoo NVDA tiers | $5-1,000 stock for deposits with hold vesting (precedents#6-7) | None | Broker-run; MA settlement | Reward for patience, not deposits; no chance; the broker's own reward is additive under PARTNER |
| Tokenized-stock venues (adjacent) | Robinhood Stock Tokens, xStocks, Ondo, Dinari, Coinbase on Base | Venues, not rewards; none pays tokenized shares for gameplay (precedents#13) | n/a | Securities; non-US | First path from play to a Stock Token holding, via Robinhood's template or self-directed swap |

## E.9 Roadmap

| Phase | Dates | Deliverables | Entry gate | Exit gate | KPIs measured |
|---|---|---|---|---|---|
| 0 Counsel and the game | Sep-Dec 2026 | Server-authoritative core, economy sheet, LiveOps backend, Canada/NZ game-only soft launch, counsel engaged (US + LT), testnet 46630 contracts, audit booked, buildathon entry, HOOD Summit | Funding for Phase 0-1 secured; team of 6-7 | Gate 0: D1 >= 40%, D7 >= 15%, gross ad ARPDAU >= $0.03 tier-1, opt-in >= 45%, crash-free >= 99.5%, replay divergence < 0.1%; kill D1 < 35% | Retention, sessions, first-IPO time, ad opt-in, ARPDAU, crash-free, replay |
| 1 Global points-only | Q1 2027 | Global launch, BELL and Stock Credit as off-chain points, Vault hidden, Season 1 emission table, weekly Sprints, creators wave 1 | Gate 0 passed | Gate 1: net ARPDAU >= $0.04 US-weighted, payer rate >= 2%, US memos signed (2040 letter, 50-state read, tax, stores), economy simulation at three geo mixes and 2x verified rate | Net ARPDAU, payer rate, interstitial tolerance, bot share < 5% |
| 2 US Vault | Q2 2027 | Broker agreement, Bellwether Rewards LLC, Bell Rule and caps published, US redemption and Grant live, Earnings Call, sponsor pilot | Gate 1 passed; broker executed | Gate 2 (two consecutive months): rail <= 25% of net, fake-Seat < 2%, KYC pass >= 85%, complaints < 0.5% of withdrawals, refund fraud < 0.3% of IAP, zero store strikes | Seat conversion, KYC pass, rail %, coverage, complaints, self-funding rate |
| 3 BELL on Robinhood Chain | Q3 2027 | Audit, contracts on 4663 bound mode, seasonal Merkle claims, Wallet linking, Exchange Floor hub, Arbitrum One mirror, DPIA | Gate 2; audit report; US digital-tool memo; LT Art 4(3)/(5) opinion; store reviews | Gate 3: >= 30% of Seats link a wallet, claim gas < $0.01, zero chain-policy rejections, mint/burn <= 2:1, both stores approve | Wallet links, gas, mint/burn, claim rate, chain errors |
| 4 EEA member state by state | Q4 2027 | Ireland, then NL, DE, LT, FR; Belgium fenced; EMI/CASP contract; per-state opinions; RHEU PARTNER track | Gate 3; Lithuanian opinion per state; EMI/CASP signed | Gate 4: EU KYC <= EUR 3 per Seat, EU rail <= 25% of EU net, complaints < 0.5% | EU Seats, KYC cost, rail %, EURC payout cost |
| 5 RoW and transferability review | 2028 | Country whitelist on the EEA SOLO template at 0.5x ratios; review of BELL P2P transfer against the five gates no earlier than 12 months after mainnet; no TGE | Reg Crypto Assets and CLARITY outcomes known | Per-country memos; five gates (ADR section 3) | RoW rail %, sybil audit, sink consumption >= 50% of emission |

**Monthly milestones, Phases 0-2.**

| Month | Milestones |
|---|---|
| Sep 2026 | Engage US and Lithuanian counsel; open IE/NL/DE/LT/FR memos; trademark clearance; buildathon entry (14 Sept); HOOD Summit (29-30 Sept); economy sheet v1; first-five-minutes vertical slice; hire lead engineer, client engineer, economy designer |
| Oct 2026 | Server-authoritative checkpoints and replay; mediation with SSV; LiveOps backend; tiers 1-7 tuned; Canada/NZ builds submitted; bound-transfer ERC-20 and SeatRegistry on testnet 46630 |
| Nov 2026 | Canada/NZ soft launch with 1/5/20/100% rollouts; first cohorts' D1/D7; first-IPO timing tuned to 2.5-3.5 h; audit slot booked for Jun 2027; broker RFP issued |
| Dec 2026 | Gate 0 read on four-week cohorts; go/kill decision; broker term sheet; KYC vendor selected; Bellwether Rewards LLC documents prepared; Season 1 emission table drafted |
| Jan 2027 | Global points-only launch (nothing redeemable, Vault hidden); localization; creators wave 1; cross-promo swaps; interstitial tolerance test |
| Feb 2027 | Weekly Sector Sprints; Season 1 live; bot share measured; US memos in draft (2040 letter, 50-state read, tax, stores); Apple and Google pre-review of the Vault UI |
| Mar 2027 | Gate 1 read; memos signed; economy simulation at three geo mixes and 2x verified rate; broker agreement in final form; Bell Rule text published "not yet redeemable" |
| Apr 2027 | Broker agreement executed; JNLC/JNLS journals tested; Bellwether Rewards LLC formed and pre-funds the broker; CIP flow in-app; caps and month-1 rates published 30 days ahead; sponsor pilot escrow received |
| May 2027 | US Vault to 5%, then 20% of self-declared 18+ US players; Sign-up Grant live; first Settlement Day; first Earnings Call; pilot Sprint drop |
| Jun 2027 | 100% US rollout; Gate 2 month 1; contracts frozen, audit starts; DPIA drafted; Robinhood Financial meeting scheduled for Q3 with Gate 2 data |

## E.10 Team and budget by phase

**Team plan** (FTE at phase end; loaded $10,500/FTE-month blended, rising to $11,500 by Phase 5 as compliance seniority increases).

| Phase | FTE | Roles |
|---|---|---|
| 0 | 6.5 | Founder (product/CEO), lead engineer (server, economy sim), client engineer, backend/LiveOps engineer, game/economy designer, technical artist/UI, QA (0.5); contractors: US and LT counsel, audio, ASO |
| 1 | 8 | + data analyst, + community and support lead |
| 2 | 10 | + compliance and rewards-operations lead (broker, KYC vendor, Earnings Call, enforcement ladder), + trust-and-safety/fraud engineer |
| 3 | 12 | + smart-contract engineer (fixed-term through audit and Gate 3), + web hub engineer; fractional DPO |
| 4 | 14 | + EU operations and localization lead, + partnerships and sponsor sales |
| 5 / 1M DAU | 24-28 | Second client pod, LiveOps content team (3), data (2), compliance (3), support (4), growth (2) |

**Budget by phase** (ranges; payroll from the FTE table; reserve 10-15% of the phase).

| Phase | Payroll | Contract art/audio | Legal memos and agreements | Audit | Broker, KYC, EMI/CASP vendors | Reward reserve seed | Marketing | Infra and tools | Reserve | Phase total |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 (4 mo) | 250-320k | 30-60k | 60-100k | 5-10k deposit | 0-10k | 0 | 10-25k | 10-15k | 40-75k | 405-615k |
| 1 (3 mo) | 230-290k | 20-40k | 50-80k | 0 | 5-10k | 0 | 35-70k | 10-20k | 35-60k | 385-570k |
| 2 (3 mo) | 290-360k | 20-40k | 60-100k | 0 | 15-30k | 30-50k | 40-80k | 15-25k | 45-75k | 515-760k |
| **Through Phase 2** | | | | | | | | | | **1.3-1.95M** |
| 3 (3 mo) | 350-430k | 20-40k | 40-70k | 15-45k (audit + re-audit, tech#36) | 8-25k (gas, wallets, RPC) | 0 | 50-100k | 20-35k | 50-80k | 555-825k |
| 4 (3 mo) | 410-500k | 20-40k | 90-160k (five member-state memos, EMI/CASP, UCPD, tax) | 0 | 15-40k | 10-20k (EUR reserve) | 60-120k | 25-40k | 65-100k | 695-1,020k |
| **Through Phase 4** | | | | | | | | | | **2.55-3.8M gross** |

Revenue offsets in 2027 (DAU ramp 10k in Q2, 25k in Q3, 50k in Q4; Q1 points-only) contribute about $0.35-0.6M after the rail, so the net funding need to exit Phase 4 is $2.2-3.4M. Recommendation: raise $2.0-2.5M now to fund Phase 0-2 with a six-month buffer, and a $3-4M round at Gate 2 with Seats, self-funding and complaint data in hand. Buildathon prize money, if any, is not budgeted.

## E.11 KPI dictionary and analytics events

| KPI | Definition | Target | Source event |
|---|---|---|---|
| D1 / D7 / D30 retention | Share of installs with a session on UTC day N after install | 45 / 18 / 7% (floors 40 / 15; kill D1 < 35) | `session_start` joined to `install` |
| Sessions per DAU; median session | Sessions per active user per day; median `duration_s` | 3-4; 5-8 min | `session_start`, `session_end` |
| First-IPO time | Median elapsed real time from install to first `prestige_ipo` | 2.5-3.5 h | `prestige_ipo{first:true}` |
| Rewarded views per DAU; opt-in | SSV-verified views per DAU; accepted / offered | 3.0; >= 50% | `ad_reward_ssv` / `ad_offer_shown` |
| Gross ad ARPDAU | Mediation gross revenue / DAU | >= $0.03 tier-1 (Gate 0) | Mediation reporting API |
| Net ARPDAU | Net revenue / DAU | >= $0.045; >= $0.04 US-weighted (Gate 1) | Finance |
| Payer rate | Share of 30-day actives with >= 1 verified purchase | >= 2% | `iap_purchase_verified` |
| Crash-free sessions | Sessions without a crash | >= 99.5% | Crash SDK |
| Replay divergence | Checkpoints whose deterministic replay disagrees with the client | < 0.1% | `server_replay_result` |
| Behavioural bot share | DAU flagged by behavioural rules | < 5% | `fraud_flag` |
| Seat conversion | New Verified Seats / MAU per month | 1-2% | `seat_verified` |
| KYC pass rate | `kyc_result{pass}` / `kyc_started` | >= 85% | `kyc_result` |
| Fake-Seat rate | Duplicates merged / Seats created | < 2% | `seat_duplicate_merged` |
| Reward rail share | (Payouts + Grants + KYC + journals + gas) / net revenue | <= 25% | Finance |
| Coverage ratio | Pool / accrual at 100% vesting | >= 1.0 (rates fall after 14 days below) | `stock_credit_accrued`, pool ledger |
| Complaint rate | Support tickets tagged rewards / redemptions | < 0.5% | Support system |
| Refund fraud | Store refunds flagged / IAP count | < 0.3% | Store server notifications |
| Self-funding rate | Vault accounts with an external deposit within 90 days / Seats | >= 25% (PARTNER pitch input) | `vault_deposit_external` (broker webhook) |
| Wallet link rate | Seats with a linked or embedded wallet | >= 30% (Gate 3) | `wallet_linked` |
| Mint/burn ratio | Season BELL minted / burned | <= 2:1 | Chain events |
| Claim gas | Sponsored gas per Merkle claim | < $0.01 | Paymaster logs |
| Chain-policy rejections | RPC errors "Transaction rejected by chain policy" | 0 | RPC error log |
| Store strikes | Policy actions from either store | 0 | Store consoles |
| Organic share | Organic installs / all installs | >= 60% | Attribution |
| Paid cohort quality | Paid D7 / organic D7 | >= 80% | Attribution + `session_start` |
| CAC and payback by geo | Spend / paid installs; days to recover CPI from net-of-rail revenue | E.5 table | Attribution + finance |
| Sponsor completion rate | Completions / eligible Seats | >= 40% | `sponsor_drop_completed` |

**Analytics event list** (pseudonymous `player_id`, `seat_id` only after T2, country from IP and KYC, no PII in any event; every event feeding Stock Credit is server-originated; RNG-dependent code paths cannot emit into the reward services, C1).

Core loop: `install`, `session_start`, `session_end`, `ftue_step`, `generator_buy`, `manager_buy`, `report_buy`, `milestone_hit`, `cycle_complete`, `prestige_ipo`, `index_inclusion`, `market_unlock`, `offline_return`, `checkpoint_written`, `server_replay_result`.
Monetization: `ad_offer_shown`, `ad_offer_accepted`, `ad_reward_ssv` (server, network callback id), `ad_interstitial_shown`, `iap_offer_shown`, `iap_purchase_verified` (server receipt), `subscription_state`, `season_pass_state`, `sprint_join`, `sprint_complete`.
Ledgers: `stock_credit_accrued` (server; event type from the allowlist), `stock_credit_expired`, `bell_accrued`, `bell_claim_minted`, `bell_burn`, `sink_used`.
Rewards and identity: `age_gate_declared`, `vault_tab_viewed`, `redemption_requested`, `kyc_started`, `kyc_result`, `seat_verified`, `seat_duplicate_merged`, `settlement_executed`, `vault_deposit_external`, `sponsor_drop_completed`, `sponsor_drop_delivered`, `wallet_linked`, `gems_fallback_redeemed`.
Integrity: `fraud_flag`, `enforcement_action`, `appeal_filed`, `integrity_check` (Play Integrity / App Attest verdict at T1/T2), `geo_block`.
Operations: `earnings_call_published`, `rate_table_published`, `emission_table_published`.

## E.12 Risk register

| # | Risk | Likelihood | Impact | Mitigation | Owner | Trigger |
|---|---|---|---|---|---|---|
| 1 | Soft launch misses D1 40% / D7 15% (idle-adjacent medians are 17-22%, economics#9) | Medium | Fatal to the reward layer | Kill criterion; Phase 0 spent on the loop; rewards never used to rescue retention | Founder, economy designer | Gate 0 D1 < 35% |
| 2 | A strict state treats idle-game time as consideration despite deterministic rewards (F9) | Medium | Geo-fence for real value | 50-state memo before Phase 2; fence, never argue; Gems 2x there | Counsel, compliance lead | Memo flag; AG inquiry |
| 3 | Google reads "subordinate" strictly or Apple treats ETF rewards like 3.1.5(v) | Medium | Android ad credits to web; iOS game-only | Store pre-review Feb 2027; Season-Pass-linked framing; web hub ready | Founder, counsel | Rejection or policy change |
| 4 | FINRA 2040 / 15(a): broker or Robinhood fee read as finder compensation | Low-Medium | Fee line lost | Flat periodic fee only; 2040(a) support letter | Counsel | Broker refuses letter |
| 5 | Broker white-label fee 2-3x the $3 assumption, or no BD serves a game | Medium | US minimum $10, monthly batching; worst case IAP stock-back plus Grant only | Two-broker RFP Nov 2026; term sheet before Gate 1 | Compliance lead | RFP responses > $6 |
| 6 | Lithuanian counsel does not clear the EURC-to-wallet screen (F14) | Medium | EEA becomes PARTNER-or-Gems | Ireland first; RHEU track in parallel; SEPA fallback | Counsel, EU ops | Negative opinion for IE and NL |
| 7 | Rewarded eCPM falls 40-70% | Medium | Rates float down; at -70% IAP stock-back becomes primary | Bell Rule floats; reserve; standing stress test | Economy designer | Trailing eCPM -40% |
| 8 | Verified funnel 2x with KYC pass < 70% | Medium | Rail to 34% of net | Tenure gate to 21 days; Grant paused (published as contingent) | Compliance lead | Two months rail > 25% |
| 9 | Device farms plus rented KYC identities below $20 each; refund fraud on IAP stock-back | Low-Medium | Payout leakage | Face dedup; caps to $30/yr, tenure 30 days; 35-day vest; enforcement ladder | Fraud engineer | Fake-Seat > 2%; refund fraud > 0.3% |
| 10 | Robinhood sequencer-filters a game contract (tech#5) | Low | Chain claims halt | Off-chain ledger authoritative; pre-published Arbitrum One redeploy | Lead engineer | Any chain-policy rejection |
| 11 | Robinhood never partners | High | None to the base case; upside lost | Model closes SOLO; alternative brokers; re-pitch with data | Founder | Two declined proposals |
| 12 | EDPB treats the seatId-to-address map as erasable personal data | Medium | BELL returns to points | DPIA in Phase 3; address rotation; per-claim fresh-address design in reserve | DPO, lead engineer | DPIA finding; supervisor letter |
| 13 | Reg Crypto Assets, CLARITY or the digital-tool reading shifts against earned tokens (F10) | Medium | BELL stays points | Points-first; no TGE; transferability review only after outcomes | Counsel | Final rule text |
| 14 | RHJ base prospectus (valid to 24 June 2027) lapses or token terms amended unilaterally (robinhood missed) | Low-Medium | EEA PARTNER asset changes | EEA SOLO pays EURC; player self-directs; no token named in copy | EU ops | Lapse; amendment notice |
| 15 | Press frames Bellwether as play-to-earn; an issuer or Robinhood disavows (OpenAI precedent, robinhood#9) | Medium | Store scrutiny; sponsor loss | Positioning line everywhere; no earning copy; no implied endorsement; open-market ETFs only | Founder | Any "earn stock by playing" headline |
| 16 | KYC or broker outage on Settlement Day; withdrawal freeze on vendor change (Lolli, precedents missed) | Medium | Complaints, trust | Published delays; 7-day pending buffer; dual-vendor readiness at 100k DAU | Compliance lead | Missed Settlement Day |
| 17 | Stock Credit or Gems treated as a Reg E prepaid account or escheatable stored value (Stockpile wind-down; ADR open item 16) | Low-Medium | Ledger redesign, escheat filings | Counsel memo before Phase 2; 180-day expiry; "no cash value until redeemed" | Counsel | Memo finding |
| 18 | Funding shortfall before Gate 2 | Medium | Cut order (E.14) | Raise Phase 0-2 plus six months; monthly burn review | Founder | Runway < 6 months |

## E.13 Decisions the founder must make now

| # | Decision | Recommendation |
|---|---|---|
| 1 | Entity structure | Delaware C-corp parent (studio) now; Bellwether Rewards LLC as the promotion sponsor formed in Phase 2 (ADR D14); EU affiliate Bellwether Rewards Europe Ltd (Ireland, per Part C) formed at Phase 4 unless counsel prefers Lithuania, not before |
| 2 | Funding path | Pre-seed $2.0-2.5M now against Phase 0-2 plus buffer; seed at Gate 2; equity only; zero token allocation to anyone (ADR section 3) |
| 3 | Soft-launch markets | Canada primary, New Zealand secondary (ADR Q7); both excluded from Stock Tokens, so the retention read is pure |
| 4 | Broker RFP | Alpaca-class first (documented JNLC/JNLS journals, economics#24), Apex white label as alternate; term sheet before Gate 1 |
| 5 | KYC vendor for EU/RoW | Sumsub Compliance tier ($1.85, AML screening included, economics#22) or Veriff; face dedup required; US uses the broker's CIP |
| 6 | Ad mediation | One mediation platform with SSV callbacks (AppLovin MAX or LevelPlay) with AdMob and Unity as networks; SSV is a hard requirement; final vendor choice belongs to the engineering section |
| 7 | Buildathon participation | Yes, with the bound-transfer BELL contracts and the hub; game-only framing; no reward claims in the submission |
| 8 | Robinhood approach sequencing | Relationship only at HOOD Summit; RHEU proposal in Q1 2027 with Gate 0 data; Robinhood Financial proposal in Q3 2027 with Gate 2 data |
| 9 | Publishing the Bell Rule early | Publish the rule text in Phase 1 marked "not yet redeemable"; numeric rates and caps 30 days before Phase 2 |
| 10 | Trademark | Clearance search on "Bellwether" in classes 9 and 41 (US, EU, UK) in September; if blocked, rename before the Canada/NZ store listing |
| 11 | Team location and cost base | Remote, US/EU mix at $10,500 loaded; compliance lead hired in the US for Phase 2 |
| 12 | NY on-chain claims | Off until counsel confirms the BitLicense gaming exclusion for a bound token (ADR section 8) |
| 13 | Web build scope | Ship at Phase 1 for r/incremental_games discovery and as the iOS spending surface (Apple 3.1.1), on the same server-authoritative backend |

## E.14 Cut order if funding is short

The order is the ADR's (section 9), with what each cut saves and what it costs.

| Cut | Saves | Costs | Never cut |
|---|---|---|---|
| 1 Sponsor drops | Sponsor sales role, escrow ops, ~$40-60k/yr; SponsorEscrow contract scope | 1-2% of net; the public fairness proof | Server authority; verification at withdrawal; the published Bell Rule; the no-chance invariant; the positioning line |
| 2 EEA SOLO EURC rail | Phase 4 legal $90-160k, EMI/CASP setup, EU ops hire; Phase 4 slips two quarters | EEA becomes PARTNER-or-Gems; the Stock Token leg depends on RHEU | |
| 3 On-chain BELL (keep points) | Audit $15-45k, contract engineer, gas and wallet vendors, DPIA; Phase 3 collapses into Phase 4 | The Robinhood Chain anchor; Wallet linking | |
| 4 Markets 2-3 and the Prestige Exponent | One content pod; ~$60-90k per quarter | Day-14+ depth; D30 pressure | |
| 5 Ad-funded Stock Credit (keep IAP stock-back and the broker-paid Grant) | Pool falls to 5% of net IAP; SSV crediting scope; ~40% of KYC volume | Most players' accrual; the on-ramp shrinks to payers | |

The floor is an idle game plus a broker-delivered welcome ETF fraction, the only version with surviving precedents (precedents#1-8). At the floor, the Phase 2 budget drops to $450-620k and the team to 8 FTE; the 10k DAU P&L loses ~$100k/month instead of $125k, and SOLO breakeven falls to ~150k DAU.

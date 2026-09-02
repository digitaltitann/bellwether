# Architecture Decision Record v1: Bellwether

Status: recommended architecture, v1. Facts as of 2026-09-01. Chassis: Draft 1 (Bellwether), ranked first by two of three judges, with grafts from Draft 2 (core loop, zero-linkage rule, tenure and vest gates), Draft 3 (pool from banked revenue, rate clamp, Earnings Call, EURC, Canada/NZ soft launch), Draft 4 (on-chain payout roots, minted-only-as-earned emission, opaque Seat registry, seniority drops) and Draft 5 (positioning line, bound-transfer token, T0/T1/T2 tiers, member-state EU rollout, cut-order floor). Every judge-identified fatal flaw in Draft 1 is resolved and logged in section 10. PARTNER = requires Robinhood to act or build; SOLO = buildable unilaterally. Facts are cited as F-numbers (brief) or `file#finding`; "missed" refers to a skeptic's missed-facts entry.

---

## 0. Summary

Bellwether is an eleven-sector idle tycoon about patience. The only verb is Reinvest; prestige is an IPO; the second layer is Index Inclusion. It targets D1 45% / D7 18% / D30 7% with every real-value feature hidden (C6); no value feature ships until soft launch proves D1 >= 40% and D7 >= 15% (kill criterion D1 < 35%).

Three ledgers, zero arithmetic between them (C2, Q3):

1. **Game currencies** (Cash, Float, Weight, Gems): closed-loop, never withdrawable.
2. **BELL**: an immutable, capped ERC-20 on Robinhood Chain (chain 4663) with a bound-transfer hook: it moves only between wallets registered to the same opaque Seat id (including the player's Robinhood Wallet) and to burn sinks. Minted only as earned at fixed per-milestone amounts published a season ahead, for attested accounts only. 0% team, investors or liquidity; no sale, listing, market maker, buyback or TGE. A digital tool (F10) and a MiCA Art 4(3) utility token never admitted to trading (F13). P2P transfer is reviewed no earlier than 12 months after mainnet, behind five gates, and may never happen.
3. **Stock Credit**: a USD/EUR-cent promotional loyalty credit accrued only from monetizing events (SSV-verified rewarded views, IAP and subscriptions, escrowed sponsor drops) at fixed, pre-published, geo-tiered ratios. Nothing for logins, streaks, tasks, referrals or posts. No cash value until a licensed party redeems it into a KYC'd 18+ account.

Delivery (Q2). **US SOLO:** at first redemption (>= $5) the player opens a white-label brokerage account ("the Vault", Alpaca-class FINRA member) via the broker's CIP; the broker journals a restricted cash credit the player self-directs into one of twelve broad or sector ETFs (S&P 500 ETF default), with 3-day sell and 30-day withdrawal locks; the game never holds securities (C3, F8). **US PARTNER:** Robinhood Financial delivers the same credit under a flat fee; Robinhood would have to build the endpoint (F4). **EEA PARTNER (preferred):** Robinhood Europe UAB runs the promotion under its own giveaway template (180-day hold, F5) delivering the Jersey on-chain Stock Token, never the Classic derivative (F14). **EEA SOLO (counsel-gated, member state by member state, Ireland first, Belgium fenced):** EUR credit disbursed as EURC by a MiCA-authorised EMI/CASP to the player's own wallet; the player self-directs any swap in Robinhood Wallet; the game names no security. Fallbacks: SEPA EUR, then Gems at 2x. **UK/CA/CH/UAE:** Gems at 2x, no real-asset reward (F16). **RoW:** EEA SOLO template, 2028.

Identity (Q4): one Verified Seat per human, one account per Seat, created only at first redemption from the licensed delivering party's KYC; attestation record off-chain, opaque seatId-to-address map on-chain under a DPIA (F17); tiers T0 play, T1 BELL claim, T2 redemption; pre-verification credit capped at $5.

Funding (Q5): the published **Bell Rule**: Pool(M+1) = 20% of banked net rewarded-ad revenue + 5% of banked net IAP/subscription revenue + 100% of sponsor escrow. Per-view rates float at 20% of trailing net eCPM per geo, clamped 0.5x-1.25x, published 7 days ahead, never retroactive. Caps $0.10/day, $4/season, $50/year (+50% with the Season Pass), a one-time $3 Sign-up Grant paid by the delivering broker from our margin, sponsor drops <= $20/year: ceiling $83/year (F12). Broker bounties never enter the pool or reach a player. Per 1,000 DAU the SOLO base case nets $1,677/month, pays players ~$240 (14.3%) and runs the full rail at ~$397 (23.7%); it closes with token price zero and no Robinhood.

Sequencing (Q7): Phase 0 (Sep-Dec 2026) counsel plus game-only soft launch in Canada/NZ; Phase 1 (Q1 2027) global points-only launch; Phase 2 (Q2 2027) US Vault and Bell Rule; Phase 3 (Q3 2027) BELL on chain 4663 in bound mode; Phase 4 (Q4 2027) EEA, Ireland first; Phase 5 (2028) RoW and the transferability review. No TGE, ever.

---

## 1. Concept and theme

**Name:** Bellwether. **Token:** BELL. **Ledger:** Stock Credit. **Reward vehicle:** the Vault (US) or the player's Robinhood Wallet (EEA).

**Fantasy: the patient compounder.** You inherit a corner store and grow it into a bellwether conglomerate across the eleven GICS sectors, take it public, get included in the index, and start again one rung higher. The only verb is Reinvest; prestige is Going Public (Float); the second layer is Index Inclusion (Weight). The mechanical lesson is time x rate, the opposite of what the Massachusetts settlement (F7; robinhood#28), the SEC's 2021 DEP list ("games, streaks... prizes... free stock", legal-us#9) and ESMA/IOSCO gamification statements (legal-eu#18-19) condemn, which is trading frequency.

**Mandatory positioning line** (store listing, first run, FTC substantiation file, legal-us#29): "Bellwether is a game about patience. Member rewards are cents to a few dollars a year, paid in real fractional ETF shares or Stock Tokens by a licensed partner. The point is a first, small, boring, diversified holding, not trading."

**What the theme never does.** No real prices, charts, P&L, buy/sell verbs, trade celebrations, confetti, streaks with value, referral rewards with value (Apple 3.1.5(v), legal-us#31), value leaderboards or single-name selection. Real securities appear only in the Vault tab, revealed after the first IPO to self-declared 18+ players, showing delivered holdings with "no security is recommended; this is a promotional loyalty reward" and no trade link. The menu is index-only: one S&P 500 ETF plus eleven sector ETFs, chosen inside the licensed account. Sponsors fund third-party ETF grants, never their own stock (F21; economics#30).

**Copy rules.** "Stock Tokens", never "tokenized stocks"; "Built on Robinhood Chain" as the only chain mark, our brand primary, no implied endorsement (robinhood missed: Chain ToS, brand guidelines). Rewards are "promotional, taxable, may fall in value", never "free" (UCPD Annex I item 20, legal-eu#21), never "shares" in the EEA (legal-eu#13). Listings never mention earning (Freecash removal, p2e#34). In the EEA the game never names a Stock Token or presents its terms: the RHJ prospectus consents to offers only by Authorised Offerors (legal-eu missed), so Robinhood's materials do the offering.

**"No chance touches anything with cash value" is an engineering invariant**: the Stock Credit and sponsor-drop services accept only deterministic event types from an allowlist, and RNG-dependent code paths are compile-time excluded from them (C1; F9; F15).

---

## 2. Core loop and progression

**Currencies.** Cash (per run, resets at IPO); Float (prestige 1); Weight (prestige 2); Gems (IAP, never expire, Apple 3.1.1); Stock Credit and BELL (off the loop). Rule: play earns Cash, Float, Weight and BELL; only money events earn Stock Credit; neither BELL nor Stock Credit ever changes a generator, cost curve or prestige formula.

**Generators.** `cost_next = base * r^owned`, `production = base_profit * owned * multipliers`, bulk-buy in closed form (idle-design#1). Constants (AdCap ladder for tiers 1-10, idle-design#1-2; tier 11 extrapolated):

| Tier | Sector / business | Base cost | r | Cycle (s) | Profit per cycle | First-unit payback |
|---|---|---|---|---|---|---|
| 1 | Staples / Corner Store | 4 | 1.07 | 0.6 | 1 | 2.4 s |
| 2 | Discretionary / Sneaker Lab | 60 | 1.15 | 3 | 60 | 3 s |
| 3 | Industrials / Machine Shop | 720 | 1.14 | 6 | 540 | 8 s |
| 4 | Materials / Quarry | 8,640 | 1.13 | 12 | 4,320 | 24 s |
| 5 | Energy / Wind Farm | 103,680 | 1.12 | 24 | 51,840 | 48 s |
| 6 | Utilities / Water Works | 1.24e6 | 1.11 | 96 | 622,080 | 3.2 min |
| 7 | Financials / Credit Union | 1.49e7 | 1.10 | 384 | 7.46e6 | 12.8 min |
| 8 | Health / Clinic | 1.79e8 | 1.09 | 1,536 | 8.96e7 | 51 min |
| 9 | Real Estate / Apartments | 2.15e9 | 1.08 | 6,144 | 1.07e9 | 3.4 h |
| 10 | Comms / Radio Station | 2.58e10 | 1.08 | 36,864 | 2.97e10 | 8.9 h |
| 11 | Tech / App Studio | 3.10e11 | 1.07 | 86,400 | 4.0e11 | 18.6 h |

Payback jumps at tiers 7, 8 and 10 are the designed walls ("a natural energy system without an energy currency", idle-design#7): first real wait at the Credit Union (~45 min elapsed), second at the Apartments (day 2), third at the Radio Station (day 4-5). Milestones: x2 profit at 25/50/100/200/300/400 owned then every 100; x2 speed at 25/50/100 on tiers 1-4 (F23). Sector Synergy: every 100 owned in a sector gives +0.5% to its two neighbours (idle-design#6). Numbers on break_infinity.js, shared by client and server (idle-design#29).

**Automation.** Manager per sector at 10x base cost (auto-collect). **Reinvest** switch (per sector, after the first Manager) auto-buys the cheapest affordable unit each cycle. Analyst Reports x3 per sector at ~50x current cost; Bellwether Reports x2 global at lifetime Cash 1e6, 1e12, 1e18...; Golden Charters x7.77 per sector (event track or Gems), full set x10 (idle-design#20). CFO (auto-IPO at a chosen Float) unlocks with Index Inclusion.

**Prestige 1, Go Public.** `Float = floor(150 * sqrt(L / K_world)) - Float_claimed`, +2% all profit per Float (50 = x2; doubling needs 4x earnings, idle-design#4). K_1 = 1e14 so the first IPO of ~50 Float lands at L ~ 1.1e13, targeted at 2.5-3.5 h elapsed including one offline period; K is tuned per Market. Float is spent: warehouse hours, starting-cash %, unlock discounts, instant Managers.

**Prestige 2, Index Inclusion.** At lifetime Float >= 1e6 (day 10-14): `Weight = floor(cbrt(lifetime_Float / 1e4))` (~8x to double, idle-design#3). Each Weight: +10% Float effectiveness, +1 h offline (to 16 h); Weight buys the **Prestige Exponent** upgrade (0.50 -> 0.55; Antimatter Dimensions pattern, idle-design missed) and the Markets: Europe at 1e6 Float, Asia at 1e9, each with its own eleven generators and K; a third layer is reserved for the 1e308 wall (idle-design#10).

**Offline.** 8 h at 100%; +1 h per Weight to 16 h; 24 h with the ad-removal subscription (Egg Inc silo / Melvor pattern, idle-design#13, missed). Offline yield is computed server-side from the server clock; elapsedRealtime is UI-only (idle-design#31).

**Session shape.** 3-4 sessions/day of 5-8 min: collect (optional x2 ad), Reinvest has bought units, buy Managers/Reports, hit a milestone bump, complete the day's Compounding Cycle (collect, reinvest all, one Report; no streak, nothing lost by skipping), set up the next wall, leave (idle-design#7).

**First five minutes.** 0:00 tap the Corner Store; 0:20 second store; 0:45 Sneaker Lab; 1:30 first Manager; 2:00 x2 at 25 stores; 3:00 Machine Shop; 3:30 first Analyst Report; 4:00 first rewarded offer (x2 for 15 min, opt-in); 5:00 the IPO button appears greyed with its target. No wallet, KYC or money language in session one.

**Day 1.** Wind Farm by minute 25; first wall ~45 min; first IPO at 2.5-3.5 h; starter pack ($2.99, permanent x3 + one Golden Charter) once at the third sector unlock, the documented conversion moment (idle-design#27). **Day 7.** 8-11 sectors, 4-6 IPOs, first Sector Sprint, Season Pass offer, Vault tab revealed to self-declared 18+ players. **Day 14.** Index Inclusion, Europe Market, first Syndicate.

**Ads.** Rewarded: x2 profit 15 min (4/day), 4 h skip (2/day), x2 offline (1/session), Report re-roll (1/day); hard cap 8/day, first 6 count for Stock Credit, 2-min cooldown, SSV-only (tech#32). Interstitials: none in sessions 1-3, then max 1/session, first after 90 s (>3/session costs 20-30% D7, idle-design#24).

**Monetization.** Starter pack $2.99; Gems for Golden Charters, time warps, cash infusions as % of current rate; ad-removal $3.99/30 d ($0.99/7 d) with 24 h offline (idle-design#19); Season Pass $4.99/30 d (event track, cosmetics, Float boosters, +$0.02/day Stock Credit as the purchase-tied loyalty benefit). No loot boxes or paid random items (PEGI 12; Belgium clean, legal-eu#25); Float and Weight never purchasable. Expected split ~55% ads / 45% IAP (idle-design#26).

**LiveOps.** Weekly Sector Sprint (event sector with its own currency; event mines doubled Kolibri's weekend revenue, idle-design#17); monthly Season; quarterly cooperative Index Sprint for Syndicates; daily Analyst Report tasks (no real value). Backend from day one (tech#26; AdCap's post-launch regret, idle-design#20); staged 1/5/20/100% rollouts.

**Targets and kill criterion.** D1 45% (floor 40%), D7 18% (floor 15%), D30 7%; rewarded 3.0/DAU at >= 50% opt-in; blended net ARPDAU >= $0.045 (medians 22/4/0.75, idle-design#15; idle titles 60%+ D1, #17). If soft-launch D1 < 35%, no reward layer ships (C6).

**Anti-cheat baseline.** Client simulates; server checkpoints every 60 s and on every purchase; deterministic replay of the input log from the last checkpoint before any Stock Credit, BELL or leaderboard write (idle-design#32; tech#28); affordability, rate and plausibility checks; Play Integrity and App Attest only at T1 claims and T2 redemptions (10k/day quota, tech#29-30).

---

## 3. Token model (Q1)

**Legal shape.** US: a digital tool under the SEC-CFTC release (F10; legal-us#19): practical function, no yield, never sold, never marketed with appreciation; the airdrop interpretation does not cover an earned token (legal-us#20), so non-security status rests on the digital-tool category plus no investment-contract promise. Closed loop, no outside market: not a FinCEN administrator (F11; legal-us#27), inside the NY BitLicense gaming/rewards exclusions (legal-us#28) and California DFAL's in-game exemption (legal-us missed). EU: a MiCA utility token for a service already in operation (Art 4(3); F13; legal-eu#2), never admitted to trading (Art 4(4)), no voluntary white paper; Art 4(5) lets us run our own claim and sink contracts without CASP status (legal-eu missed). UK: non-transferable, limited use, outside "qualifying cryptoasset" (legal-eu#33); never marketed as crypto there.

**Q1 decision: bound-transfer at launch; P2P transfer reviewed no earlier than 12 months after mainnet, behind five gates, possibly never; no TGE.** Locked mode allows only: mint from the Emission contract; burn to registered Sinks; transfers between addresses registered to the same opaque seatId in the SeatRegistry (up to 3 addresses per Seat, 7-day cooldown). That lets BELL sit in the player's Robinhood Wallet (tech#21) without being tradeable. Gates: (a) 12 months of published emission and sink data; (b) US and Lithuanian opinions that transferability does not change the classification; (c) >= 100,000 Verified Seats and an external sybil audit; (d) >= 50% of trailing-90-day emission consumed by sinks; (e) the Regulation Crypto Assets and CLARITY outcomes known (F10; legal-us#21, #24). Even then the studio never lists, seeds liquidity, pays a market maker, quotes a price or buys back. First-claim copy: "BELL is a membership credential with no price. Transfer to other people may never be enabled. No token sale or airdrop will ever be announced as a reward." Rationale: every engagement-minted tradeable token collapsed 95-99.9% (F18; p2e#12-16, #21); transferability would void the MiCA exemption and the UK, FinCEN, BitLicense and DFAL exclusions at once; a priced token turns "earn BELL" into an earnings claim on both stores.

**Contract and chain.** Immutable OpenZeppelin 5.7.0 `ERC20Capped` + `ERC20Permit`, cap 1,000,000,000, `_update` override implementing the bound-transfer rule, `MINTER_ROLE` held only by the Emission contract; periphery (SeatRegistry, Emission + Merkle distributor, Sinks, SponsorEscrow, PayoutLedger) upgradeable behind a 3-of-5 multisig with a 7-day timelock (tech#35, #37). Deployed permissionlessly on chain 4663 (F3; tech#2-4); gas sponsored via Alchemy Gas Manager or ZeroDev against EntryPoint v0.7 `0x0000000071727De22E5E9d8BAf0edAc6f37da032` (robinhood missed; tech#23, 8% overhead). Audit $10-25k, 8-14 weeks (tech#36). Sequencer risk: Robinhood can hash-list-filter addresses and force-fail transactions (tech#5); the off-chain ledger is authoritative and a pre-published rule redeploys BELL on Arbitrum One if any game contract is filtered (tech#8). Marks follow the Chain ToS.

**Allocation.** 90% player emission, never sold; 10% LiveOps/sponsor reserve minted only through published events; 0% team, investors, liquidity or sale. Nothing is minted that is not earned.

**Emission (fixed per milestone; published 30 days before each 90-day season; immutable within it, C1).** Compounding Cycle 10/day; IPO 25 (max 2/day); Sector Sprint participation 100/week; Index Inclusion per Market 250 once. Caps 150/day, 8,000/season per Seat. Season ceiling 20,000,000 x 0.95^n; if reached, emission halts for the season. Nothing for referrals, installs, posts, purchases or score (legal-us#31-32; F22). No genesis or retroactive grant. Balances accrue off-chain for every account; minting happens only for T1+ accounts through a seasonal Merkle claim (tech#35), so bots never cost gas; unminted accruals expire 180 days after last login (precedents#26). If mint exceeds burn 2:1 for two seasons, next season's amounts halve (Axie's 4x signal, p2e#3).

**Utility and sinks (all consumptive, deterministic, none touching Stock Credit).** (1) Ad replacement: burn 200 BELL for the x2 boost or 4 h skip instead of an ad (Android and web only; earns zero Stock Credit): the floor utility, roughly one ad view. (2) Charters: burn to mint ERC-1155 cosmetics (sector skins, IPO plaques, a Time Capsule of a prestige run), never unlocking features, also sold as IAP for Apple parity. (3) Ticker nameplate: burn 50-5,000 by length. (4) Syndicate charter: burn 500 to found, lock 100/season to join; preset stickers only, keeping the app outside DSA "online platform" scope (legal-eu#20). (5) Sector Sprint theme vote: one per T1 account, balance-independent, advisory. (6) PARTNER: BELL tiers as Robinhood Wallet quests (Lighter precedent, robinhood#15). On iOS all spending happens on the web hub or in Robinhood Wallet; the app shows balances read-only (Apple 3.1.1). Android files the Financial Features declaration. Cross-app composability is deliberately not offered, which keeps the closed-loop arguments intact.

**Custody.** Invisible until wanted. At T1 the player links Robinhood Wallet (WalletConnect + SIWE) or gets an embedded EIP-7702 wallet (Privy/Dynamic, provisioned only for claimers since Privy's free tier is 0-499 MAU, tech#22 skeptic). The seatId is a random 32-byte id; all identity linkage is off-chain under a DPIA (EDPB v2.0, F17; legal-eu#38); address rotation supports erasure.

**What stops Hamster Kombat (F18).** No price to promote; no listing, liquidity, MM, buyback or sale; emission fixed per milestone, never above what is earned; per-human caps through Seats; rules published a season ahead and never changed retroactively (precedents#31); real value flows through Stock Credit from realized revenue, indifferent to BELL. A bot that farms BELL gets boosts and cosmetics, not a stock claim.

---

## 4. Stock reward paths by jurisdiction (Q2)

**Common core.** Stock Credit is a promotional loyalty credit in USD or EUR cents, "no cash value until redeemed", pending until Seat verification, converted only by a licensed party (C3). The legal form is the Cash App / Grifin restricted cash credit the recipient self-directs (precedents#9; legal-us#5). Asset menu index-only: one S&P 500 ETF (default) plus eleven sector ETFs, chosen inside the licensed account.

**United States: fractional ETF shares via a broker-dealer (F2, F8).**
- SOLO (launch rail): the Vault, a white-label brokerage account with an Alpaca-class FINRA member (Alpaca's Broker API documents JNLC cash and JNLS stock journals for rewarding users, economics#24 and missed; Apex white label is the alternate, legal-us#4). At first redemption the player completes the broker's CIP in-flow (effectively 18+, legal-us#33). Bellwether Rewards LLC, a separate marketing affiliate sponsoring the promotion (Stash's pattern, precedents missed), pre-funds the broker; the broker journals the credit as cash the player self-directs into the ETF list, defaulting to the S&P 500 ETF after 30 days. 3-trading-day sell lock, 30-day withdrawal lock (robinhood#23; legal-us#5); fractional shares disclosed as non-portable via ACATS (legal-us#11).
- PARTNER: Robinhood Financial credits the same cash credit into the player's Robinhood account and pays its own separate sign-up stock reward (F6). Robinhood would have to build the attestation and deposit endpoint (F4; robinhood#21). Compensation is a flat periodic marketing fee, never per account, trade or asset (FINRA 2040 / 15(a), legal-us#6); co-branded copy is principal-approved under FINRA 2210 (legal-us#8).
- Legal basis: third-party listed securities bought on the open market and delivered by a registered BD into a KYC'd account avoid Section 5 (F8; legal-us#1-2); deterministic value removes chance (F9); no Robinhood Stock Token reaches a US person (F2; tech#10). Player sees: "Vault opened. $5.00 arrived as cash. Pick an ETF or keep the S&P 500 default."

**EU/EEA: on-chain Stock Tokens, with Robinhood or a licensed party as the only distributor.**
- Instrument: the Jersey-issued on-chain Stock Token (tokenised debt security, freely transferable ERC-20, F1; robinhood#4-5) under an FMA-Liechtenstein-approved base prospectus passported to 29 EEA states (robinhood missed). Classic Stock Tokens are excluded everywhere: OTC derivatives, non-transferable, and giving them away is a "benefit" and a "substitute for the CFD provider" under the product-intervention measures (F14; legal-eu#9, #14-15, missed).
- PARTNER (preferred): Robinhood Europe UAB (MiFID + CASP licences, legal-eu#8) runs the "Bellwether Stock Token Grant" under its June-2026 giveaway template: onboarded, appropriateness-tested 18+ clients, 180-day hold (F5; legal-eu#10, #37). The agreement requires the on-chain token, a broad-market ETF token default with no single-name nudge, and a signed eligibility attestation. Bellwether is a marketing partner whose creative RHEU approves under MiFID II Art 24 (legal-eu#16); flat fee.
- SOLO (counsel-gated): EUR Stock Credit is disbursed as EURC, a MiCA e-money token (Robinhood Europe pays its own Dividend Match in EURC, robinhood missed), by a MiCA-authorised EMI/CASP (ZBD holds NL EMI + MiCAR licences, precedents#18) to the player's self-custody wallet, proven by a WalletConnect signature; the CASP handles travel-rule and DAC8 reporting (legal-eu missed). The game shows a neutral "hold / withdraw / swap in your wallet" screen with no token names, prefilled links or swap widget; the player self-directs inside Robinhood Wallet's own swap (robinhood#3, #19). A non-EU studio never provides a crypto-asset service to EU players (ESMA 2026-04-17, legal-eu#6). Whether even this screen is an "offer" or reception/transmission is the open F14 question and a Phase 4 gate per member state. If EURC is not on 4663, disbursement is EURC on Arbitrum One (Robinhood Wallet supports both, tech#21), never a USD stablecoin for a EUR obligation.
- Fallbacks in order: EUR via SEPA/PSP (player self-funds Robinhood Europe), then Gems at 2x.
- Rollout member state by member state (promotion, prize and tax law are national): Ireland first (English, ~$12 eCPM, EUR 3,000 gift exemption, economics#2; legal-eu#43), then NL, DE, LT, FR; Belgium fenced (legal-eu#25). Eligibility: 18+, EEA resident, screened against the RHJ Prohibited Investor list (robinhood#7).

**Excluded: UK, Canada, Switzerland, UAE, sanctioned.** Full game, BELL (never marketed as crypto in the UK), Stock Credit redeems to Gems at 2x; no real-asset reward (F16; legal-eu#33-35; robinhood#7). Under-18 accounts everywhere: Gems only.

**Rest of world.** Default off; enabled country by country in 2028 on the EEA SOLO template after local promo, tax and e-money memos, at 0.5x EEA ratios (tier-3 eCPMs, idle-design#23).

---

## 5. Token-to-stock relationship (Q3)

**None, by design.** BELL is never redeemable for Stock Credit, stock, cash or Gems at any rate; Stock Credit never converts to BELL; holding, locking or burning BELL never raises any accrual ratio, cap, pending window or sponsor-drop eligibility; no redemption requires BELL. The only shared element is the Verified Seat. Reward-cap tiers follow the Season Pass IAP entitlement, never token balance, which also fits Google's "subordinate to a qualifying monetary transaction" text (legal-us#32). Public PayoutLedger and SponsorEscrow Merkle roots on chain 4663 let anyone audit payouts against the published rule without any value living in BELL.

Rationale: a token redeemable for stock at a rate is a custodial receipt or a retail-barred security-based swap (F10; legal-us#23) and convertible value for money transmission (F11); a token that gates or accelerates cash-value features lets a purchase buy stock exposure (C2). Zero linkage costs the idle game nothing.

---

## 6. Identity, sybil and fraud (Q4)

**Primitive: the Verified Seat.** One Seat per human, one account per Seat, created only at first real-value redemption, issued by the licensed party that will hold the asset (C5): US SOLO the broker's CIP (one account per TIN); PARTNER a Robinhood attestation `{verified, age18, jurisdiction, hash(customer_id)}` (Robinhood would have to build it, F4); EU SOLO the EMI/CASP's KYC ($0.80-1.89 per check with liveness and document/face dedup, tech#33; economics#22). The game stores `{attestation ref, jurisdiction, is_18plus, verified_at, seatId}` off-chain; no documents or biometrics (BIPA: selfies only at the vendor, precedents missed); brokerage KYC is never repurposed (AMLR retention, F17; legal-eu#39). On-chain: only seatId -> address set.

**Tiers.** T0 play (13+ US under COPPA-neutral design; 16+ EEA unless the member state sets 13-15, GDPR Art 8). T1 on-chain BELL claim: Play Integrity (MEETS_DEVICE_INTEGRITY) or App Attest at claim time, device intelligence (emulator, VM, root, cloned app, VPN, fleet patterns; device farms +72% YoY, tech#31), SIWE binding. T2 real-value redemption: the Seat.

**Duplicates.** A second account presenting the same attestation is merged into the oldest; its pending credit is forfeited and BELL frozen (published).

**Pre-verification limits.** Pending Stock Credit capped at $5; accruals expire 180 days after last login; unverified accounts create no liability.

**Withdrawal gating.** Minimum $5 / EUR 5; first redemption requires the Seat and 14 active days; 7 days pending per redemption; IAP-derived credit vests after 35 days to outlast refund windows (p2e#36); one destination per Seat; allowance grows with tenure (ZBD pattern); IP and KYC-country checks against the RHJ list; VPN, proxy or emulator blocks rewards, never play.

**Ad SSV.** Stock Credit for a rewarded view is written only on the network's server-side callback (AdMob, Unity, AppLovin MAX, LevelPlay), idempotent on transaction id, <= 6 credited views/day, >= 2 min apart; a progression-sequence check requires plausible progress around each view (Playrix cut undeserved rewards 12.5%, p2e#36). Interstitials earn nothing.

**Behavioural signals (supplementary, never sufficient, C5).** Identical tap timing, synchronized logins, identical progression curves, many accounts to one wallet (precedents#31). Expect gambling-vertical fraud on Android (~50%+ fake pre-KYC, p2e missed; F22); the Seat moves the cost to the attacker: a real ID and a unique face for at most $83/year.

**Cheaters.** Published ladder: pending credit forfeited and BELL burned -> reward-program ban (game stays playable) -> device and identity ban; human-reviewed appeal within 14 days; quarterly published enforcement counts (p2e#33). Delivered assets are not clawed back except for fraud proven inside the broker's 30-day hold.

**KYC cost.** PARTNER paths cost $0. US SOLO: inside the broker's per-account fee (assumed $3, unpublished, economics#24). EU/RoW SOLO: ~$1.85 per check, incurred only at a >= EUR 5 redemption. Optional accelerator: World ID cloud verify (tech#34) raises the pre-verification cap to $10; never a substitute for the attestation.

---

## 7. Funding stack and payout rule (Q5)

**Revenue lines.** (1) Rewarded video (SSV-verified); (2) light interstitials; (3) IAP and subscriptions; (4) sponsor platform fees (20% of escrow); (5) broker acquisition bounties (SOLO: affiliate CPAs $20-70 per funded account, F6/F20, economics#13; PARTNER: a flat fee benchmarked against Robinhood's $50 per funded referral, economics#11). Bounties fund verification and margin only and never enter the pool or reach a player: a per-account payment flowing to the referred customer is the finder pattern (FINRA 2040 / 15(a), legal-us#6) and the DEP "free stock for funding an account" concern (legal-us#9; F7).

**The Bell Rule (published; C4).**

`Pool(M+1) = 0.20 x NetAds(M) + 0.05 x NetIAP(M) + Sponsor(M+1)`

NetAds = rewarded-video revenue banked in month M after mediation; NetIAP = IAP plus subscriptions banked after store fees; Sponsor = escrow received and earmarked for M+1. "Banked" means received, never accrued. BELL is not a term.

Per-view rates per geo tier for M+1 = 0.20 x trailing-30-day net rewarded eCPM_tier / 1,000, clamped 0.5x-1.25x of the prior month, published 7 days ahead, fixed for the month, never retroactive (JustPlay floating rate, precedents#27). IAP stock-back 5% of net IAP/subscription spend, vesting 35 days. Season Pass +$0.02/day. Sign-up Grant fixed $3 (US) / EUR 3 (EU) at first redemption, paid by the delivering broker or CASP as its own approved reward and funded from operating margin, not bounties; raised to $5-10 only under PARTNER where the bounty-paying broker is also the delivering broker (F6). Nothing for logins, streaks, tasks, referrals or posts (F7; F9; legal-us#31).

**Caps per Seat.** Base $0.10/day, $4 per 30-day season, $50/year; with Season Pass $0.15 / $6 / $60; plus the one-time Grant ($3) and sponsor drops <= $20/year. Hard ceiling $83/year, under the $2,000 1099-MISC threshold (F12), Ireland's EUR 3,000 gift exemption (legal-eu#43) and Lithuania's EUR 200-per-prize exemption (legal-eu#44). A heavy watcher earns ~$5-6/year in the EEA and ~$11 in the US: "cents to a few dollars, the on-ramp is the point" (C6).

**Sponsor drops (F21).** A sponsor buys a Sector Sprint skin and escrows funds before the drop is announced (Bumped's failure, precedents#3). Every Seat with >= 30 active days that completes the published objective receives the same fixed $0.25-1.00 of a third-party sector ETF; if oversubscribed, allocation is by Seat seniority, never a race or draw; delivered 60 days later (precedents#5); sponsors get aggregates only. Own-stock drops are refused by default (Section 5, Reg M, Rule 10b-18; Landa 2023, economics#30) unless counsel clears broker-executed 10b-18 purchases with blackout monitoring, or PARTNER uses Robinhood's Partner Stock Program (precedents missed). EEA drops are ETF credits via PARTNER or EURC, never derivatives.

**Reserve and adjustment.** A segregated reserve >= 3 months of trailing payouts is held before any ratio increase (p2e#4). Coverage (pool / accrual at 100% vesting) is published monthly; if < 1.0 for 14 days, next month's rates fall; accrued cents are always honoured. The Earnings Call publishes pool, accruals, rates, Seats verified, BELL minted and burned, and enforcement counts.

**Worked example: 1,000 DAU, 30 days, SOLO, token price zero, no Robinhood.** Assumptions (F20-F22; economics#1-7): geo mix US 50% / EEA 25% / UK-CA-CH-UAE 10% / RoW 15%; 3.0 SSV-verified rewarded views per DAU (60% opt-in x 5); gross rewarded eCPM US $15, EEA $7, UK-group $10, RoW $3; mediation take 12%; interstitials 1.0/DAU at 55% of rewarded eCPM; IAP + subs gross ARPDAU $0.030 (2.5% payers), store fee 25%; MAU = 4 x DAU; 1.0% of MAU verify per month.

| Line | Per day | Per month |
|---|---|---|
| Rewarded gross: US 1,500 x $0.015 + EEA 750 x $0.007 + UK 300 x $0.010 + RoW 450 x $0.003 | $32.10 | $963 |
| Rewarded net of 12% mediation | $28.25 | $847 |
| Interstitials net (1,000/day at 55% of rewarded eCPM, less 12%) | $5.18 | $155 |
| IAP + subs gross $30.00, net of 25% store fee | $22.50 | $675 |
| **Net revenue (net ARPDAU $0.056; ad ARPDAU $0.033 net / $0.038 gross, in the F20 band)** | **$55.93** | **$1,677** |
| Pool = 20% x $847 + 5% x $675 | | **$203 (12.1% of net)** |
| Per-view rates (20% x net eCPM / 1,000): US $0.00264, EEA $0.00123, RoW $0.00053; UK-group accrues Gems | | |
| Ad accrual: 1,500 x 0.00264 + 750 x 0.00123 + 450 x 0.00053 = $5.12/day | | $154 |
| IAP stock-back 5% x $675 | | $34 |
| Season Pass bonus (1.5% of DAU x $0.02 x 30) | | $9 |
| **Accrual at 100% vesting** | | **$197 (coverage 1.03)** |
| New Verified Seats: 1.0% x 4,000 MAU = 40 (24 US, 10 EEA, 6 RoW) | | |
| Sign-up Grants 40 x $3 (operating margin, outside the pool) | | $120 |
| Cash-out after 50% pre-verification breakage on ad credits: $77 + $34 + $9 + $120 | | **$240 (14.3% of net)** |
| Verification: US 24 x $3 broker fee + EU/RoW 16 x $1.85 | | $102 |
| Journals ~40 x $1; sponsored gas and claimer wallets (~200 x $0.05) | | $55 |
| **Reward rail total** | | **$397 (23.7% of net)** |

The pool is 20% of ad revenue (ZBD's 10-20% guidance, F19; p2e#31) and the rail is under Mode's audited ~25-33% bound (economics#19 and skeptic). Player-received value is 14.3% of net.

Standing stress tests (maintained as a model):
- **Token price zero:** nothing changes; BELL has no price by construction.
- **Robinhood never partners:** the base case above.
- **eCPM falls 40%:** rates float down next month (floor 0.5x); the pool is 20% by definition; one sub-1.0 coverage month is covered by the reserve.
- **Bots 40% of installs pre-KYC:** scrubbed views never enter "net"; bot accruals never reach a Seat and expire at 180 days.
- **EEA-only cohort at EUR 7 eCPM:** net rewarded $554/month, pool $111 plus 5% of IAP, accrual ~$83: honest, and why the positioning line exists.
- **Verified funnel 2x:** Grants $240 and verification $204; rail 33.6% of net; response: tenure gate to 21 days and the Grant paused next month (published as contingent).
- **PARTNER upside:** a flat fee ($30-50 per funded account benchmark) plus Robinhood's own sign-up reward; players see a larger Grant paid by Robinhood.

---

## 8. Jurisdiction matrix

| Region | Play | BELL earn | BELL on-chain (bound) | Stock reward type | Delivery party | Verification | Tax handling |
|---|---|---|---|---|---|---|---|
| US | 13+; Vault 18+ | Yes | Yes from Phase 3; NY off until counsel confirms the BitLicense exclusion | Restricted cash credit self-directed into a 12-ETF list in a KYC'd brokerage account; $3 Sign-up Grant; ad/IAP credits; sponsor ETF drops | SOLO: Alpaca-class FINRA BD (Vault); PARTNER: Robinhood Financial | Broker CIP (18+, TIN) or Robinhood attestation; Play Integrity / App Attest at T1/T2 | Prize income at FMV; 1099-MISC only >= $2,000 (moot at the $83 cap); broker 1099-B (< $20 fractional sales exempt); prize vs NEC with counsel |
| EU/EEA (Ireland first; then NL, DE, LT, FR; Belgium fenced) | 16+ or member-state age; rewards 18+ | Yes (Art 4(3)) | Yes from Phase 3 | PARTNER: on-chain Stock Tokens via RHEU promotion (180-day hold); SOLO: EURC to own wallet, self-directed swap in Robinhood Wallet; Classic excluded; fallback SEPA, then Gems 2x | PARTNER: Robinhood Europe UAB; SOLO: MiCA EMI/CASP | RHEU attestation or EMI/CASP KYC (18+, EEA, sanctions, face dedup) + WalletConnect signature | Recipient self-assesses (legal-eu#45); ceiling EUR ~80; no NL gaming tax (legal-eu#41); DE Sec 22 No 3 (legal-eu#40); FR with counsel (legal-eu#42); DAC8 by the CASP |
| UK, CA, CH, UAE | Full | Yes (UK: never marketed as crypto) | Yes (bound, valueless) | None; Stock Credit -> Gems 2x | n/a | Age gate only | None |
| Rest of world (RHJ-eligible) | Full | Yes | Yes | Phase 5, country-whitelisted: EEA SOLO template at 0.5x ratios | EMI/CASP; player swaps in Robinhood Wallet | EMI/CASP KYC + RHJ restricted list | Recipient; country memo first |
| Sanctioned / Prohibited Investors | No accounts | - | - | - | - | Geo-block + KYC | - |

---

## 9. Launch sequencing and gates (Q7)

**Phase 0 (Sep-Dec 2026): counsel and the game.** Engage US securities/gaming/FinCEN/tax counsel and Lithuanian MiFID/MiCA counsel; open memos for IE, NL, DE, LT, FR. Build the server-authoritative core, economy sheet and LiveOps backend. Game-only soft launch in Canada and New Zealand (Canada is excluded from Stock Tokens: a clean pure-game read). Pitch Robinhood at HOOD Summit (Sept 29-30, 2026); enter the Arbitrum Open House buildathon from Sept 14 (F3; robinhood missed; tech missed). Book the audit. **Gate 0:** D1 >= 40%, D7 >= 15%, gross ad ARPDAU >= $0.03 in a tier-1 cohort, opt-in >= 45%, crash-free >= 99.5%, replay divergence < 0.1%. Kill: D1 < 35%.

**Phase 1 (Q1 2027): global points-only launch.** BELL and Stock Credit accrue as off-chain points; nothing redeemable; Vault hidden. Measure retention, ARPDAU, opt-in, interstitial tolerance, behavioural bot share (< 5% of DAU). **Gate 1:** net ARPDAU >= $0.04 US-weighted, payer rate >= 2%, US counsel memos signed (BD/finder structure with a Rule 2040 letter; 50-state read on deterministic rewards; tax; app-store strategy), economy simulation holding at three geo mixes and 2x the verified rate.

**Phase 2 (Q2 2027): US Vault.** Broker agreement executed and journals tested; Bellwether Rewards LLC formed; Bell Rule and caps published; US redemption and Sign-up Grant live; Earnings Call starts; sponsor pilot with one ETF issuer. **Gate 2 (two consecutive months):** reward rail <= 25% of net, fake-Seat rate < 2%, KYC pass >= 85%, complaints < 0.5% of withdrawals, refund fraud < 0.3% of IAP, zero store strikes.

**Phase 3 (Q3 2027): BELL on Robinhood Chain.** Audit complete; contracts on 4663 in bound mode; seasonal Merkle claims; Robinhood Wallet linking; web hub; Arbitrum One mirror pre-audited; DPIA filed. Sign-offs: US digital-tool memo, Lithuanian Art 4(3)/(5) opinion, store reviews. **Gate 3:** >= 30% of Seats link a wallet, sponsored claim gas < $0.01, zero sequencer rejections, mint/burn <= 2:1 in season one, both stores approve.

**Phase 4 (Q4 2027): EEA, member state by member state.** Ireland, then NL, DE, LT, FR; Belgium fenced. Per state: the F14 opinion on the EURC-to-wallet screen, EMI/CASP contract, UCPD copy review, promotional-game and tax memos. RHEU PARTNER track in parallel; if signed, EURC becomes the fallback. **Gate 4:** EU KYC <= EUR 3 per Seat, EU rail <= 25% of EU net, complaints < 0.5%.

**Phase 5 (2028): rest of world and the transferability review** against the five gates in section 3, only after the Regulation Crypto Assets and CLARITY outcomes are known (F10). No TGE date exists or will be created as a retention lever.

**Watch list.** CLARITY cloture 2026-09-15; Reg Crypto Assets comments 2026-10-20; SEC innovation exemption (delayed 2026-08-13); SEC 24-hour-trading roundtable 2026-09-17; Retail Investment Strategy ~2029; Digital Fairness Act Q4 2026; UK cryptoasset regime 2027-10-25.

**Cut order if forced.** (1) Sponsor drops. (2) EEA SOLO EURC rail (EEA becomes PARTNER-or-Gems). (3) On-chain BELL (keep points). (4) Markets 2-3 and the Prestige Exponent. (5) Ad-funded Stock Credit (keep IAP stock-back and the broker-paid Grant). Never cut: server authority, verification at withdrawal, the published Bell Rule, the no-chance invariant, the positioning line. The floor is an idle game plus a broker-delivered welcome ETF fraction, the only version with surviving precedents (precedents#1-8).

---

## 10. Decision log

| ID | Decision | Rationale | Rejected alternatives |
|---|---|---|---|
| Q1 | BELL: capped immutable ERC-20 on chain 4663 in bound-transfer mode (one Seat's registered wallets, incl. Robinhood Wallet, and burn sinks); minted only as earned at fixed per-milestone amounts; 0% team/investor/liquidity; no sale, listing, MM, buyback or TGE; P2P reviewed after 12 months behind five gates, possibly never. | F18 (95-99.9% collapses); bound transfer keeps the digital-tool (F10), MiCA Art 4(3)/(5) (F13), FinCEN/BitLicense/DFAL and UK exclusions intact while the token lives in Robinhood Wallet (F4); minted-only-as-earned inverts SLP (p2e#1, #5). | Tradeable at launch with seeded liquidity (Draft 4's Unlock Gate, 15% team): F18 capital structure plus an earnings claim once priced. Draft 2's Phase C buybacks/MM loan: price-support promise, MSB exposure. No token: loses the Robinhood anchor; kept as cut #3. Retroactive genesis: farm magnet. |
| Q2 | Stock Credit as a promotional cash credit; US SOLO via a FINRA BD (Alpaca-class) as a restricted JNLC credit self-directed into a 12-ETF list; US PARTNER Robinhood Financial under a flat fee; EEA PARTNER RHEU giveaway template delivering the Jersey on-chain token; EEA SOLO EURC via MiCA EMI/CASP with self-directed swap, member state by member state; fallbacks SEPA then Gems 2x; Classic excluded; UK/CA/CH/UAE Gems only. | F8; F2; F14; C3; the Cash App/Grifin form is the live legal shape (precedents#9; legal-us#5). | Game-funded ETF inventory (Drafts 3/4): C3 breach. Voucher contract routing stablecoin into a Stock Token (Draft 4): unlicensed execution. USDG for a EUR obligation (Draft 1): FX mismatch. "Pick any stock" or a 26-name menu (Drafts 1/5): single-name nudge (F7). EU-first (Draft 4): open F14 on the critical path. |
| Q3 | No relationship; identity is the only shared element; cap tiers follow the Season Pass entitlement. | F10; legal-us#23; F11; C2; Google "not subject to purchase". | Draft 1's 25-BELL settlement ticket; Draft 3's 500-BELL drop gate plus 100 BELL per Season Pass; Draft 5's Tier II pending shortening and withdrawal burn; staking for a multiplier. |
| Q4 | Verified Seat from the licensed delivering party, one per human, created at first redemption; T0/T1/T2; $5 pre-verification cap; 180-day expiry; 14-day tenure; 7-day pending; 35-day IAP vest; attestation-only storage; opaque seatId on-chain. | C5; F17 (attestation is the GDPR/AMLR-safe primitive; salted hashes are still personal data per EDPB v2.0); F22 and tech#31 (device farms). | On-chain identity-hash BoundRegistry (Draft 5). World ID as primary (coverage; no Router on 4663, tech#34). WalletConnect signature alone. |
| Q5 | Bell Rule: 20% banked net ads + 5% banked net IAP + 100% sponsor escrow; rates float at 20% of trailing net eCPM, clamped 0.5x-1.25x, published 7 days ahead; caps $0.10/$4/$50 (+50% with Pass), $3 Grant from margin paid by the delivering broker, drops <= $20/yr, ceiling $83; bounties fund verification and margin only; 3-month reserve; Earnings Call; standing stress tests. | F19 (ZBD 10-20% of ads; Mode <= ~25-33%); pool from banked prior-month revenue cannot be overspent; caps under F12 and EU exemptions; CPA pass-through is finder compensation (legal-us#6) and the DEP pattern (F7). | Draft 1's Listing Bonus funded by an incentivized affiliate referral into a second brokerage (F22). Grants keyed to a bounty being received (Drafts 3/4/5). Draft 4's 30%+15% pool with $60/yr drops. $200/yr cap (Draft 1). |
| Q6 | Bellwether, the patient compounder: eleven sectors, Reinvest as the only verb, Go Public (sqrt Float), Index Inclusion (cbrt Weight, upgradable exponent, new Markets); securities only in the Vault tab as index-only holdings; positioning line; no prices, charts, trade verbs, streaks with value, chance or single names. | F7; legal-us#9; legal-eu#18-19; F23; index-only removes the ticker nudge. | "Dividend Ledger / Dividend Day" (Draft 4): mislabels a loyalty credit in a product whose Stock Tokens pay no cash dividends (F1). Daily-login cash (Draft 4) and a real-value streak (Draft 2): DEP-listed. |
| Q7 | Phase 0 counsel + Canada/NZ game-only soft launch (Gate 0 D1 >= 40%, D7 >= 15%; kill < 35%); Phase 1 points-only; Phase 2 US Vault; Phase 3 BELL bound on-chain; Phase 4 EEA Ireland-first; Phase 5 RoW and transferability review; no TGE. | F8 and F20 (US settled law, best eCPM); F14 needs per-state counsel; points-first fits MiCA "existing utility" and C6; "sell the game first" (F18; p2e#21, #27). | EU-first (Draft 4). Token bundled with US redemption in one quarter (Draft 1). |
| D8 | Name Bellwether / BELL (Draft 1 chassis) with Draft 5's Reinvest fantasy and Draft 2's loop. | Chassis ranked first by two judges; the loop and theme grafts were the judges' fun fixes. | Renaming to a grafted draft's brand. |
| D9 | Index-only asset menu: one S&P 500 ETF (default after 30 days) plus eleven sector ETFs, chosen inside the licensed account. | Strongest DEP/ESMA posture (F7); avoids forfeiture; sector ETFs keep the theme without single names. | Any stock; Robinhood's 26 large caps; single-ETF-only (loses the sector tie). |
| D10 | Sponsor drops escrowed first, fixed per Seat, 30-active-day tenure, Seat-seniority allocation, third-party ETFs only, 60-day delivery, <= $20/yr. | Deterministic and fair; Reg M/10b-18 (F21); Bumped (precedents#3). | First-N races (Draft 1); token-gated eligibility (Drafts 3/5); own-stock without counsel. |
| D11 | Ages: 13+ to play (US), 16+ EEA default, 18+ for any real value; minors redeem to Gems 2x. | CIP is effectively 18+ (F12); COPPA and GDPR Art 8. | 18+ app-wide; no play gate (Draft 1 gap). |
| D12 | Stores: iOS read-only BELL with spend and redemption on the web hub; Android Financial Features declaration; Season-Pass-linked accrual as primary loyalty framing; ad credits move to web on Android if Google reads "subordinate" strictly. | Apple 3.1.1/3.1.5 (legal-us#31); Google loyalty and Blockchain policies (legal-us#32). | In-app crypto unlocks; earnings language (Freecash, p2e#34). |
| D13 | Off-chain ledger authoritative; pre-published Arbitrum One redeploy if any contract is sequencer-filtered. | Single sequencer with ArbOS 61 filtering (tech#5); Security Council emergency actions. | Waiting on a Robinhood assurance (PARTNER ask only). |
| D14 | Bellwether Rewards LLC as promotion sponsor funding the BD; the BD holds and journals. | Stash Cash Management / Stash Capital pattern (precedents missed); C3. | Studio-owned firm account holding ETF inventory. |
| D15 | Burn/mint ratio published; if mint > 2x burn for two seasons, next season's amounts halve. | Axie's 4x signal (p2e#3); sinks-only did not save SLP (p2e missed). | Static emission. |
| D16 | EEA copy never names a Stock Token, prefills a swap or presents securities' terms. | Base prospectus consents only to Authorised Offerors; "offer to the public" is any sufficient communication (legal-eu missed). | Draft 1's EU screen describing the Jersey debt securities. |

---

## 11. Open items for counsel

1. **FINRA 2040 / 15(a):** confirm a flat periodic marketing fee from the delivering BD or Robinhood, with no per-account, per-trade or per-asset component, does not make the studio an unregistered finder; obtain the Rule 2040(a) support letter; confirm the broker-paid Sign-up Grant is not compensation to us.
2. **Google Play loyalty text:** whether ad-view Stock Credit on Android is "supplementary and subordinate to a qualifying monetary transaction" or must move to web.
3. **Apple:** whether ETF rewards for in-app actions are treated like 3.1.5(v); whether the Vault UI trips 3.1.5(iv)/3.2.1(viii); whether read-only BELL display survives 3.1.1.
4. **State gambling:** whether idle-game time is consideration in strict states when rewards are deterministic (legal-us#12); whether any state rule treats ETF fractions awarded as prizes as an unregistered offering.
5. **Tax:** prize (1099-MISC) versus services (1099-NEC) for play-linked Stock Credit; state withholding; W-9 timing; whether BELL (no market, non-transferable) has a determinable FMV under Rev. Rul. 2023-14.
6. **NY BitLicense and California DFAL:** confirm a bound-transfer token with no outside market stays inside the gaming/rewards exclusions; decide whether NY on-chain claims stay off.
7. **SEC-CFTC digital-tool memo:** BELL as a credential earned for play; the DoubleZero and Fuse no-action letters as the closest precedents (legal-us#22); a comms policy that never implies appreciation.
8. **Lithuania / MiFID / Prospectus:** whether the neutral EURC-to-wallet screen is an offer to the public, reception/transmission, placing or marketing of a financial instrument (F14); whether a marketing-partner agreement with RHEU needs a tied-agent structure (legal-eu#16).
9. **MiCA:** the Art 4(3) "existing utility" hook (BELL is not "free", since sign-up data is collected); Art 4(5) confirmation for our claim/sink contracts; whether the SeatRegistry or Merkle claim is a custody or transfer service.
10. **EMT and rails:** EURC's MiCA status and issuer; whether EURC is deployed on chain 4663 or only Arbitrum One; the EMI/CASP's travel-rule and DAC8 duties for our payouts.
11. **Per-member-state memos:** Ireland (prize vs gift), Netherlands (promotional-game code; gift tax), Germany (Sec 22 No 3 vs prize), Lithuania (withholding under PARTNER; 2026 progressive scale), France (60% gift rate vs promotional-winnings doctrine), Italy (concorsi a premio or fencing).
12. **GDPR:** DPIA for the seatId-to-address map (legal-eu#38); erasure via address rotation; lawful basis for the attestation record separate from AML retention.
13. **Sponsor own-stock drops:** conditions for broker-executed 10b-18 purchases with Reg M monitoring; Partner Stock Program terms under PARTNER.
14. **Robinhood Chain ToS and brand:** commercial-integration consent for Wallet surfaces; Marks compliance; that a bound token is not a "token issuance" needing written authorization.
15. **Biometrics:** BIPA/CUBI compliance of the KYC vendor and broker.
16. **Consumer rails:** whether the Stock Credit ledger or Gems is a prepaid account under Regulation E or a stored-value instrument with escheat duties (Stockpile precedent); CFPB posture (legal-us#30).

---

## 12. Assumptions that, if false, change the design

1. **A FINRA BD will white-label a rewards account at ~$3 all-in and journal restricted cash credits** (pricing unpublished, economics#24). If 2-3x higher, the US minimum rises to $10 and redemptions batch monthly; if no BD serves a game, US collapses to IAP stock-back plus the broker-paid Grant.
2. **Deterministic, revenue-funded, purchase-linked loyalty credit is a permitted fixed-ratio program on both stores.** If not, ad credits move to web on Android and iOS ships game-only.
3. **Idle-game time is not consideration in strict states when rewards are deterministic.** If a state disagrees, it is geo-fenced for real value.
4. **Lithuanian counsel clears the neutral EURC-to-wallet screen in at least Ireland and the Netherlands.** If not, EEA is PARTNER-or-Gems and the Stock Token leg depends on RHEU signing.
5. **EURC is deployable to the player's wallet on chain 4663 or Arbitrum One via a licensed EMI/CASP at < EUR 0.05 per payout.** If not, EEA falls to SEPA EUR.
6. **The bound-transfer hook and opaque seatId satisfy EDPB v2.0.** If not, BELL becomes off-chain points until a per-claim fresh-address design is audited.
7. **BELL with no price and no outside application remains a digital tool / Art 4(3) utility token.** If not, BELL stays off-chain points; nothing else changes.
8. **Robinhood does not sequencer-filter game contracts.** If it does, the pre-published Arbitrum One redeploy triggers (Robinhood Wallet supports Arbitrum, tech#21).
9. **Rewarded eCPMs hold near US $15 / EEA $7 at 3.0 views/DAU.** A 40% decline is absorbed by the floating rate; a 70% decline makes ad credits sub-cent and IAP stock-back becomes the primary accrual.
10. **Verified-Seat conversion runs 1-2% of MAU per month with KYC pass >= 85%.** At 5%+, Grants and verification exceed the model and the Grant is paused; below 70% pass, the tenure gate rises.
11. **No Robinhood partnership ever lands.** The model closes SOLO. If Robinhood later ships a rewards API or a US tokenized-stock product after an SEC exemption, US delivery moves to that rail under the same Bell Rule.
12. **Device farms plus rented KYC identities do not scale at $83/year per Seat.** If gray-market identities fall below ~$20 and pass face dedup, caps drop to $30/year and tenure rises to 30 days.
13. **The idle game reaches D1 >= 40% / D7 >= 15% on its own.** If not, nothing above ships; rewards cannot rescue retention and would only attract extractors (p2e#15).

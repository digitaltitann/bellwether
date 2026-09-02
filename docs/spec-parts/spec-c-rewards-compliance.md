## C.1 Program overview and the player promise

Stock Credit is the only ledger in Bellwether that touches real value: a promotional loyalty credit in USD or EUR cents, accrued only from monetizing events at fixed, pre-published, geo-tiered ratios, with no cash value until a licensed party redeems it into a KYC'd, 18+ account or wallet in an eligible jurisdiction (C3, C4). BELL and the game currencies never convert into it or out of it (ADR section 5), and nothing here changes a generator, cost curve or prestige formula.

The player promise is the positioning line, verbatim on the store listing, at first run and in the FTC substantiation file: "Bellwether is a game about patience. Member rewards are cents to a few dollars a year, paid in real fractional ETF shares or Stock Tokens by a licensed partner. The point is a first, small, boring, diversified holding, not trading." Every number below is calibrated to keep that sentence true.

| Accrual source | Ratio (published 7 days before each month, fixed for the month, never retroactive) | Who can earn |
|---|---|---|
| SSV-verified rewarded video (first 6 of 8 daily views, >= 2 min apart) | 20% of trailing-30-day net rewarded eCPM per geo tier / 1,000 per view, clamped 0.5x-1.25x of the prior month (US ~$0.0026, EEA ~EUR 0.0012 at base-case eCPMs) | All T0+ accounts in a real-value geo; pending until T2 |
| IAP and subscriptions | 5% of net spend, vesting 35 days | Same |
| Season Pass | +$0.02/day while active | Season Pass holders |
| Sign-up Grant | $3 / EUR 3 once, at first redemption, paid by the delivering broker or CASP as its own approved welcome credit, reimbursed from operating margin, never from bounties | New Verified Seats |
| Sponsor drops | $0.25-$1.00 fixed per eligible Seat per drop, <= $20/year | Seats with >= 30 active days completing the published objective |
| Nothing | Logins, streaks, referrals, installs, posts, reviews, score, BELL balance | (F7; F9; legal-us#31; legal-us#32) |

Caps per Seat: $0.10/day, $4 per 30-day season, $50/year; with Season Pass $0.15/$6/$60; plus the Grant and drops; hard ceiling $83/year, below the $2,000 1099-MISC threshold (legal-us#34), Ireland's EUR 3,000 small-gift exemption (legal-eu#43) and Lithuania's EUR 200 x 6 prize exemption (legal-eu#44). Pre-verification pending credit is capped at $5 ($10 with an optional World ID check, tech#34), expires 180 days after last login and creates no liability. Minimum redemption $5 / EUR 5; first redemption needs the Verified Seat and 14 active days; every redemption sits 7 days pending; payouts run on weekly Settlement Days (Thursdays, decided here: a Monday cut-off leaves three business days for fraud review).

The funding rule is the Bell Rule, published in-app, on the web hub and in the monthly Earnings Call: `Pool(M+1) = 0.20 x NetAds(M) + 0.05 x NetIAP(M) + Sponsor(M+1)`, banked revenue only, a segregated reserve of >= 3 months of trailing payouts, downward-only corrections (ADR section 7). Broker bounties fund verification and margin; they never enter the pool or reach a player (legal-us#6, #9).

## C.2 United States: the SOLO Vault path

The Vault is a white-label individual taxable brokerage account at an Alpaca-class FINRA member broker-dealer (Apex white-label is the alternate; legal-us#4, economics#24). Bellwether Rewards LLC, a separate marketing affiliate, sponsors the promotion and pre-funds the broker (the Stash Cash Management / Stash Capital pattern, precedents skeptic 2 missed facts). The broker holds every security; the game never does (C3, F8).

### Eligibility

US resident, 18+, valid SSN or ITIN, not sanctioned, passes the broker's CIP (name, DOB, address, TIN; 31 CFR 1023.220, legal-us#33); one Vault per TIN, one Seat per Vault. Self-declared 18+ unlocks only the Day 7 Vault tab reveal; nothing of value moves until CIP passes. Under-18s and accounts that fail or abandon CIP keep playing and redeem to Gems at 2x.

### Step by step

| Step | Player sees | Game backend | Broker API |
|---|---|---|---|
| 1. Reveal (Day 7, self-declared 18+) | Vault tab: "Your member rewards will be paid as real fractional ETF shares by [Broker], a licensed broker-dealer. No security is recommended. This is a promotional loyalty reward." | Flags account `vault_eligible`; still T0 | none |
| 2. Threshold | Pending balance reaches $5.00 and 14 active days: "Open your Vault" | Tenure and plausibility replay pass; Play Integrity / App Attest at T2 (tech#29-30) | none |
| 3. Account opening | Web hub (iOS deep-links out under 3.1.1(a); Android WebView) hosts the broker's CIP: identity, W-9, disclosures, customer agreement, fractional-share disclosure, program rules | Creates Seat on `approved` webhook; stores `{attestation ref, jurisdiction, is_18plus, verified_at, seatId}` only | Create account; CIP status webhook; restriction flags: trading limited to the 12-ETF list, outbound transfers blocked 30 days |
| 4. Funding | "Vault opened. $5.00 arrived as cash. Choose an ETF inside your broker account whenever you like." | Moves credit from pending to redeemed; writes PayoutLedger leaf | Cash journal (JNLC) from the Bellwether Rewards LLC funding account to the player account, tagged promotional credit (economics#24) |
| 5. Self-direction | Sector wheel showing eleven sector names plus "Whole market (default)"; no tickers, prices or charts in the game | Records the choice; never places the order itself | Player-authorised notional fractional market order inside the broker's UI (9-decimal fractional support); default order to the S&P 500 ETF placed on day 30 if no choice |
| 6. Locks | "Held 3 trading days before sale; cash stays in the Vault 30 days" | Mirrors lock dates | Sell restriction lifts T+3 trading days after each grant, withdrawal restriction 30 days after (robinhood#23; legal-us#5) |
| 7. Ongoing | Weekly Settlement Day deposits; holdings view read-only; "Manage your Vault" link to the broker portal | Merkle root of the week's payouts published on chain 4663 | Trade confirms, monthly statements, 1099-B (sales), 1099-DIV (distributions), all issued by the broker |
| 8. Sign-up Grant | "[Broker] added a $3.00 welcome credit" | Records Grant; outside the pool | Broker's own principal-approved promotion (Rule 2210), JNLC from its promotional account, reimbursed as a marketing cost under the broker agreement |

### The twelve-ETF menu and default

The menu is one S&P 500 ETF plus one ETF per GICS sector (eleven), chosen inside the licensed account (ADR D9). Selection criteria, published in the Reward Program Rules and re-run every January: NMS-listed, fractional-eligible at the broker, >= $1B AUM, lowest expense ratio among ETFs tracking the S&P 500 or the relevant S&P sector index, no leverage. The Select Sector SPDR family plus a broad S&P 500 ETF satisfies those criteria today; tickers appear in the Rules and the broker's UI, never in the game. The default is the S&P 500 ETF, applied 30 days after any uninvested credit and changeable in the broker portal. No single-name stock exists anywhere in the program (F7; robinhood#28).

### Locks, fees, dormancy and closure

Locks: 3 trading days before any reward position can be sold, 30 days before cash can leave the Vault, both enforced by broker account flags, mirrored in the game and disclosed before CIP. Fees: none to the player; the broker's per-account fee (assumed $3 all-in, unpublished, economics#24) and ~$1 per journal are paid by Bellwether Rewards LLC; at 2-3x that fee the minimum rises to $10 and redemptions batch monthly (ADR assumption 1).

Dormancy and closure (decided here): the Vault is the player's own brokerage account and outlives the game account. Deleting the game account or a ban leaves delivered assets untouched (clawback only for fraud proven inside the 30-day hold) with broker-portal access intact. Dormancy and state unclaimed-property duties fall on the broker as custodian; pre-redemption Stock Credit is "no cash value" and expires 180 days after last login, subject to the Reg E / escheat memo (ADR open item 16). After the locks the player may sell and withdraw to a linked bank or keep the account; fractional positions cannot ACATS out and are liquidated on transfer (legal-us#11), disclosed at opening. Program shutdown: 90 days' notice (the Gold Card rules use 45 days, 90 for NY), one final Settlement Day with the minimum lowered to $1 so every accrued cent is honoured, then the account continues as an ordinary self-directed account with a documented migration path (the Stockpile wind-down, legal-us skeptic 1 missed facts).

## C.3 United States: the PARTNER path (Robinhood Financial)

Robinhood has no public equities API, no third-party OAuth and no published rail for an outside app to deposit anything into a customer's brokerage account (F4; robinhood#21). The Trading MCP launched in May 2026 is customer-initiated agentic access to a dedicated, unsupervised account (robinhood skeptic 1); it is not a partner rail, and Bellwether will never instruct a player's agent to buy anything. Everything below is something Robinhood Financial LLC would have to build or agree to.

Term sheet:

1. **Attestation endpoint (build).** Customer-consented, signed `{verified: true, age18: true, jurisdiction: US, hash(customer_id)}`; no name, address or TIN; one Seat per hash.
2. **Promotional credit endpoint (build).** Accepts a restricted promotional cash credit funded by Bellwether Rewards LLC into the customer's individual taxable brokerage account, labelled "Bellwether Loyalty Reward", with the 3-trading-day sell and 30-day withdrawal restrictions Robinhood applies to its own stock rewards (robinhood#23) and a day-30 default into the S&P 500 ETF unless the customer picks from the 12-ETF list.
3. **Separate sign-up stock reward (agree).** Robinhood pays its own "separate sign up stock reward" under its own terms (F6); the Grant becomes $5-$10 paid by Robinhood, not us, and is Robinhood's promotion for Rule 2210 and Massachusetts purposes.
4. **Compensation (agree).** A flat periodic marketing fee set annually in advance, with no per-account, per-trade or asset-based component, benchmarked against Robinhood's disclosed $15-$53 historical CAC and $50 first-referral tier (robinhood#30, #23), supported by a Rule 2040(a) determination in Robinhood's files (legal-us#6). A bounty-style payment would make Bellwether a finder under Exchange Act 15(a) and is refused even if offered.
5. **Communications (agree).** All co-branded copy, the Vault tab and any store-listing sentence naming Robinhood are retail communications approved by a Robinhood registered principal under Rule 2210(b)(1)(A) (legal-us#8); Robinhood confirms consistency with its January 2024 Massachusetts undertakings (robinhood#28).
6. **Data (agree).** No KYC data flows either way (F17).
7. **Tax (agree).** Robinhood issues any 1099 for the reward it pays; Bellwether Rewards LLC is payer of record for Stock Credit; the $83 ceiling keeps everyone under $2,000.
8. **Term (agree).** 12 months, 90-day termination for convenience, immediate for regulatory cause; wind-down moves new redemptions to the SOLO Vault while delivered assets stay at Robinhood.
9. **Brand (agree).** "Delivered by Robinhood Financial LLC, member FINRA/SIPC" is the only permitted mark; no implied endorsement (Chain brand guidelines, robinhood skeptic 1 missed facts).

If any of items 1, 2 or 4 is refused, US stays SOLO; the model closes without Robinhood (ADR section 7).

## C.4 EEA: the PARTNER path via Robinhood Europe UAB

Robinhood Europe UAB holds Category A brokerage, CASP and payment-institution licences from the Bank of Lithuania and passports across the EEA (legal-eu#8). Its "RHEU Share Token Giveaway Terms" (24 June 2026) are the template: tokens only to onboarded, appropriateness-tested clients, a 180-day hold, tax on the recipient, "not available to the general public" (F5; legal-eu#10). The Bellwether Stock Token Grant is that promotion, run by RHEU, with Bellwether as marketing partner.

Term sheet:

1. **Instrument.** The on-chain Stock Token issued by Robinhood Assets (Jersey) Limited under its base prospectus dated 25 June 2026, approved by the FMA Liechtenstein, passported to 29 EEA states and valid to 24 June 2027 (legal-eu skeptic 1 missed facts). Default a broad-market ETF token; never a single-name nudge; never a Classic Stock Token (an OTC derivative, non-transferable to external wallets, a prohibited benefit under the CFD measures; F14; legal-eu#9); never a private-company token (robinhood#9).
2. **Eligibility.** 18+ (RHEU Client Agreement s.4.2), EEA resident (s.4.3), not sanctioned (s.4.4), Stock Token onboarding and appropriateness test passed, one Seat per client hash.
3. **Attestation (build).** RHEU returns `{verified, age18, member_state, hash(client_id)}` at Seat creation and a per-Settlement-Day delivery confirmation (count, EUR value, per hash) for the PayoutLedger root.
4. **Hold.** 180 days, enforced by RHEU; Bellwether shows the hold date read-only.
5. **Funding.** Bellwether Rewards Europe Ltd (an Irish affiliate formed in Phase 4, decided here as the EU contracting party and GDPR establishment) pre-funds RHEU in EUR; RHEU acquires tokens as Authorised Participant (the prospectus anticipates appointing it, robinhood skeptic 2) or on secondary venues; the game holds none.
6. **Offering responsibility.** RHEU is the Authorised Offeror; its materials present the token and its terms; Bellwether's creative never names a Stock Token and is approved by RHEU under MiFID II Art 24 (legal-eu#16; ADR D16).
7. **Compensation.** Flat periodic marketing fee, nothing per client or token, inducement-tested under Art 24(9) and, from ~2029, the Retail Investment Strategy test (legal-eu#17).
8. **Regulatory relations.** RHEU owns any Bank of Lithuania notification; Bellwether supplies the no-chance invariant documentation and quarterly enforcement counts.
9. **Tax.** Recipient responsibility per the RHEU template (legal-eu#45); Lithuanian withholding on prizes paid by a Lithuanian entity is an open memo item.
10. **Term and fallback.** 12 months, 90-day termination; EEA redemptions then move to the SOLO EURC rail or Gems 2x.

## C.5 EEA: the SOLO path (EURC to the player's own wallet)

The SOLO rail delivers EUR value, not a security. A MiCA-authorised EMI/CASP (ZBD holds NL EMI and MiCAR licences, precedents#18; counterparty selected in Phase 4) performs KYC, screens sanctions, disburses EURC to the player's self-custody wallet and handles travel-rule and DAC8 reporting. EURC is the euro e-money token Robinhood Europe uses for its own Dividend Match (robinhood missed facts); its MiCA EMT status, issuer and presence on chain 4663 are counsel item 10; if absent from 4663, disbursement is on Arbitrum One, which Robinhood Wallet supports (tech#21). A USD stablecoin is never used for a EUR obligation.

Step by step: (1) at EUR 5 pending plus 14 active days the player enters the EMI/CASP's hosted KYC (ID document, liveness, face dedup, ~EUR 1.85, tech#33) on the web hub; (2) the EMI returns the attestation and the Seat is created; (3) the player proves control of a wallet by a WalletConnect session and SIWE signature, with Robinhood Wallet as the promoted option because it supports Robinhood Chain, Arbitrum and WalletConnect and labels our domain Verified once registered (robinhood#19; robinhood skeptic 1 missed facts); the address becomes the Seat's single destination, changeable with a 7-day cooldown; (4) on Settlement Day the EMI/CASP sends EURC; (5) the player sees: "Your EUR 5.00 reward was sent to your wallet as EURC by [EMI]. It is yours to hold, withdraw or use inside your wallet."

Copy rules that keep the game from naming or offering any security: no token name, ticker, price or logo; no "swap", "buy" or "invest" verb; no prefilled link, deep link or embedded swap widget; no description of a Stock Token or its terms; no mention of DEX venues; the only outbound link is to the wallet the player already connected. The RHJ prospectus consents to non-exempt offers only by Authorised Offerors, "offer to the public" is any communication with sufficient information (ADR D16), and a non-EU studio may not provide reception/transmission or any crypto-asset service to EU clients (legal-eu#6). Whether the neutral screen itself is an offer, RTO or marketing is the open F14 question and a per-member-state Phase 4 gate.

| Member state | Order | Why | Gate items |
|---|---|---|---|
| Ireland | 1 | English, ~$12 eCPM (economics#2), EUR 3,000 small-gift exemption dwarfs the EUR ~80 ceiling (legal-eu#43), home of the Irish affiliate | Lithuanian F14 opinion; prize-vs-gift note; UCPD copy review |
| Netherlands | 2 | Deterministic credit sits outside the chance-only promotional-games code and the 37.8% chance-only gaming tax; gift exemption EUR 2,769 (legal-eu#29, #41) | Promo-code memo; gift/income note |
| Germany | 3 | Largest market; no stake means outside GlüStV (legal-eu#27); rewards likely Sec 22 No 3 income, tax-free below EUR 256/year, which the ceiling respects; Sec 37b is unavailable to a non-German giver, so recipients self-assess (legal-eu#40) | Characterisation note; USK rating note |
| Lithuania | 4 | RHEU's home state; EUR 200 x 6 prize exemption; 2026 progressive PIT scale otherwise (legal-eu#44 and skeptic) | Withholding note |
| France | 5 | 60% gift rate if characterised as a gift; promotional-winnings doctrine unverified (legal-eu#42) | Characterisation memo before enablement |
| Belgium | fenced | Gaming Commission's strict reading and criminal penalties; free (no-stake) random-reward exemption unverified (legal-eu#25) | Real value off until a Belgian memo; play and Gems unaffected |
| Italy | fenced | DPR 430/2001 prize regime needs MIMIT notice, bond and fiscal representative; whether a fixed-ratio loyalty credit is an "operazione a premio" is unresolved (legal-eu#30) | Memo; enable only if outside the regime |

Fallbacks, in order: SEPA EUR to the player's own IBAN via the EMI's PSP rail (the player may then self-fund a Robinhood Europe account; we never link the two), then Gems at 2x.

## C.6 UK, Canada, Switzerland, UAE and sanctioned jurisdictions

UK, Canada, Switzerland and the UAE: full game, BELL earn and bound on-chain claim (never marketed as crypto in the UK), Stock Credit redeems to Gems at 2x, no real-asset reward. Robinhood's on-chain Stock Tokens are restricted in all four (robinhood#3, #7; the UAE appears in the press release rather than the RHJ restricted page and is treated as excluded), the UK promotions regime bans "free crypto" incentives and CFD inducements (F16; legal-eu#33, #35), and Canada is the pure-game soft-launch cohort (ADR Phase 0). Sanctioned jurisdictions and RHJ Prohibited Investors (the eleven-country list at robinhood#7 plus OFAC comprehensive programs): no accounts, enforced by IP geo-block at install, KYC country at T2 and screening at every Settlement Day; VPN, proxy or emulator signals block rewards, never play (ADR section 6).

## C.7 Rest-of-world template

Default off. From 2028, country by country, on the EEA SOLO template: a local promotion-law, tax and e-money memo; a licensed disburser (the EMI/CASP where its licence reaches, else a local money transmitter); EMI/CASP KYC plus the RHJ restricted list; ratios at 0.5x EEA (tier-3 eCPMs, idle-design#23). Decided here: RoW Stock Credit is USD-denominated and disbursed as USDG on chain 4663 (6-decimal, live at 0x5fc5360D...d168, robinhood skeptic 2) where the country memo permits, else Gems 2x; the C.5 copy rules apply unchanged because the RHJ offer is Reg S and any communication naming the token is a distribution.

## C.8 Sponsor drops

What a sponsor buys: the weekly Sector Sprint's theme (sector art, event name, a sticker) and a funded ETF drop for every eligible Seat that completes the published objective. Sponsors get reach and a sector association; never player data, never a trade, never their own stock in anyone's hands.

Mechanics (ADR D10): the sponsor escrows the full drop plus a 20% platform fee at least 14 days before the Sprint is announced (Bumped died when brands stopped paying, precedents#3); escrow and per-Seat value are published in the Sprint rules and as a SponsorEscrow Merkle root on chain 4663; every Seat with >= 30 active days that completes the objective receives the same fixed $0.25-$1.00 of the sector ETF matching the Sprint sector; if escrow is short, allocation runs by Seat seniority (earliest `verified_at`), fully determined before the event; first-N races are refused because they reward latency and scripts, draws because chance is banned (C1). Delivery is 60 days after the Sprint through the Vault (US), an RHEU grant (EEA PARTNER) or EURC (EEA SOLO), never a derivative; unspent escrow is refunded 30 days after delivery. Minimum escrow $10,000 plus fee, decided here; at most $20 per Seat per year across all drops.

Eligible instruments are the eleven sector ETFs and the S&P 500 ETF from the menu, all third-party. Own-stock drops are refused by default: an issuer giving away its own shares for gameplay makes a "sale for value" under Securities Act 2(a)(3) requiring registration (legal-us#1); market purchases of its own stock to fund grants must stay inside Rule 10b-18's volume, timing and price conditions and outside Reg M restricted periods, and SEC staff challenged exactly such a free-share incentive in 2023 until it ended (economics summary; F21). Counsel may clear a broker-executed 10b-18 program with blackout monitoring for a specific sponsor, or PARTNER may use Robinhood's Partner Stock Program; neither is assumed.

Reporting to sponsors: eligible Seats, completions, delivered count and value, geo split by country, all as aggregates of >= 100 Seats; no identifiers, no wallet addresses, no holdings.

## C.9 Jurisdiction matrix

| Region | Play age | Real value age | Reward instrument | Delivery party | Rail | Verification | Caps | Tax handling | Promo-law filings | Phase |
|---|---|---|---|---|---|---|---|---|---|---|
| US (all states; NY on-chain BELL claims off pending BitLicense memo) | 13+ | 18+ | Restricted cash credit self-directed into 12 ETFs; $3 Grant; ETF drops | SOLO: Alpaca-class BD (Vault); PARTNER: Robinhood Financial | JNLC journal; broker order | Broker CIP (TIN); Play Integrity / App Attest at T1/T2 | $83/yr ceiling | Prize income at FMV; 1099-MISC only >= $2,000 (moot); broker 1099-B/DIV; W-9 in CIP | None (no chance, so NY GBL 369-e / Fla. 849.094 do not apply) | 2 |
| EEA tier 1: IE, NL, DE, LT, FR | 16+ (or member-state 13-15) | 18+ | PARTNER: on-chain Stock Token (ETF token default, 180-day hold); SOLO: EURC to own wallet | RHEU / MiCA EMI-CASP | RHEU grant / EURC on 4663 or Arbitrum One | RHEU attestation or EMI KYC + face dedup + WalletConnect signature | EUR ~80/yr | Recipient self-assesses; DAC8 by CASP; in-app annual statement | None where deterministic (NL, DE); IE/FR notes | 4 |
| EEA fenced: BE, IT | as above | Gems 2x only | None until memo | n/a | n/a | Age gate | n/a | n/a | BE Gaming Act; IT DPR 430/2001 | 4+ |
| Other EEA states | as above | Gems 2x until enabled | EEA SOLO template after per-state memo | as above | as above | as above | as above | as above | per state | 4-5 |
| UK, CA, CH, UAE | 13+/16+ | none | Gems 2x | n/a | n/a | Age gate | n/a | None | None | 1 |
| RoW (RHJ-eligible) | local | 18+ | USDG to own wallet at 0.5x ratios | EMI/CASP or local MT | USDG on 4663 | EMI KYC + RHJ list | 0.5x | Recipient; country memo | per country | 5 |
| Sanctioned / Prohibited Investors | none | none | none | none | none | Geo-block + KYC + screening | none | none | none | never |

## C.10 Compliance analysis

### US securities

Rules: Securities Act Section 5 and the 1999 free-stock orders (giving an issuer's own securities for registration, data or referrals is a sale for value, legal-us#1); every live stock-reward program delivers through a registered BD into a CIP'd account (F8; legal-us#2-5); FINRA Rule 2040 and Exchange Act 15(a) on transaction-based compensation to unregistered persons (legal-us#6); FINRA Rule 2210 principal-approved retail communications (legal-us#8); the SEC's 2021 DEP request naming "games, streaks and other contests with prizes... free stock" (legal-us#9); and the Massachusetts consent order of 18 January 2024 that removed scratch-off free-stock reveals, confetti, tap-to-climb games and referral-reward ads (robinhood#28). Design: the player receives a cash credit and self-directs it into third-party ETFs bought on the open market by the BD, so no issuer distributes its own securities and the studio never holds one (C3); BELL is never redeemable for stock, so it is neither a custodial receipt nor a security-based swap (legal-us#23); broker compensation is a flat fee and bounties never reach players; every stock-related communication is broker-approved; the reward is deterministic, index-only, free of trade verbs, celebrations, value leaderboards and single names, and the Grant is tied to verification, not funding or trading. Residual risk: no no-action letter covers a stock-as-reward finder, so a flat fee plus a referral funnel could still be read as brokerage activity (counsel item 1); the DEP proposal was withdrawn in June 2025 but state fiduciary enforcement remains live (legal-us skeptic 2 missed facts).

### US gambling and sweepstakes

Rules: prize + chance + consideration, with several states counting "considerable time or effort" as consideration (legal-us#12); NY GBL 369-e and Fla. Stat. 849.094 registration and bonding for chance promotions above $5,000 (legal-us#13); Washington's "thing of value" line (Kater v. Churchill Downs; Big Fish $155M) reaching non-cashable chips; a dozen state bans on dual-currency sweepstakes with cash-equivalent awards, with vendor liability under California AB 831 (legal-us#15, #16). Design: nothing with cash value involves chance, enforced as a compile-time invariant (ADR section 1); rewards are fixed-ratio per verified view or purchase, so allocation is fully determined by the published rule and the chance element is absent however a state treats time as consideration; no paid random items exist; Gems are never wagered; there is no dual-currency loop convertible to cash. With no game of chance, NY/FL registration does not apply; the $5,000 thresholds are tracked so that any future marketing sweepstakes is registered 30 days (NY) / 7 days (FL) ahead with a bond. Residual risk: a strict state could still treat idle time as consideration for a valuable "contest" prize; the per-state real-value fence is the response (ADR assumption 3).

### US token

Rules: the SEC-CFTC interpretive release (Rel. 33-11412, effective 23 March 2026) treats digital commodities, digital collectibles (expressly "in-game items", "badges, video game skins, and rewards points") and digital tools (memberships, tickets, credentials) as non-securities unless sold under an investment contract; its airdrop relief covers only distributions with no consideration, and footnote 141 excludes task-conditioned distributions (legal-us#19, #20; legal-us skeptic missed facts). Why BELL is a digital tool: it performs practical functions (ad replacement, cosmetics, nameplates, Syndicate charters, a theme vote), carries no yield or income rights, is never sold, listed, quoted or bought back, and is minted only as earned in bound mode (ADR section 3). Why the airdrop guidance is irrelevant: BELL is earned for play, so it sits outside Section VII; its status rests on the digital-tool category plus the absence of any investment-contract promise, and the communications policy never implies appreciation. A token redeemable for stock at a rate would be a custodial receipt or a retail-barred security-based swap (legal-us#23), which is why the token-to-stock relationship is none. Watch: Regulation Crypto Assets (comments close 20 October 2026) would supply a $5M/4-year startup exemption on any recharacterisation, and CLARITY's "end user distribution" would cover incentive rewards if enacted (legal-us#21, #25); neither is relied on. Residual risk: Dapper-style private suits where a developer controls chain and marketplace (legal-us#35); mitigated by no price, no marketplace and public emission data.

### US money transmission

Rules: FinCEN treats an administrator that issues and redeems convertible value as a money transmitter; closed-loop game currency is not (legal-us#27); NY BitLicense excludes units used solely within a game with no outside market and non-convertible affinity-program units (legal-us#28); California DFAL (1 July 2026) exempts only assets used solely within a game (legal-us skeptic 1 missed facts). Design: BELL is never redeemable for fiat, crypto or stock, has no outside market and moves only within one Seat's wallets or to burn sinks; Stock Credit is redeemed only by a licensed BD, EMI or CASP; the studio never transmits value. Residual risk: same-Seat wallet transfers could be read as "transfer"; NY on-chain claims stay off until the memo lands.

### EU MiCA

Rules: Art 3(1)(9) utility token; Art 4(3) disapplies Title II for a utility token giving access to a service that "exists or is in operation", while "offered for free" fails where the offeror receives personal data or any benefit (legal-eu#2); Art 4(4) ends the exemption on any move toward admission to trading; Art 4(5) needs no CASP authorisation for custody or transfer of an Art 4(3)-exempt token by its offeror unless it is listed or otherwise offered (legal-eu skeptic 1 missed facts); anyone else providing exchange, custody or transfer as a service needs CASP status, grandfathering having ended 1 July 2026 (legal-eu#6). Design: BELL is off-chain points in Phase 1 and goes on chain in Phase 3 once the game is in operation, so "existing utility" is the hook; it is never admitted to trading and no voluntary white paper is drawn up (Art 4(8) would restore Title II); claim and sink contracts run under Art 4(5); EURC disbursement by an authorised EMI/CASP is the only crypto-asset service touching EU players. Residual risk: a supervisor could read the SeatRegistry or Merkle claim as custody or transfer services (counsel item 9); Art 7 marketing discipline is applied to BELL copy regardless.

### EU MiFID II and the CFD inducement ban

Rules: Classic Stock Tokens are OTC derivatives with RHEU as counterparty, risk class 7/7, contractually non-transferable to external wallets (legal-eu#9; robinhood skeptic 1 missed facts); ESMA's 24 February 2026 statement puts cash-settled derivatives inside the national CFD product-intervention measures regardless of name, which prohibit any monetary or non-monetary benefit in relation to marketing, distribution or sale and prohibit acting as a substitute for the CFD provider (legal-eu#14; Decision 2018/796 Art 2(d), Art 3). The on-chain Stock Tokens are tokenised debt securities and Swiss ledger-based securities, MiFID transferable securities outside MiCA, offered under an FMA-approved prospectus passported to 29 EEA states and valid to 24 June 2027, which consents to non-exempt offers only by Authorised Offerors (legal-eu skeptic 1 missed facts). Design: Classic tokens are excluded everywhere; the game never distributes any Jersey token itself, since that would make it an unlicensed "Distributor" and, if the neutral screen were an offer, an unauthorised offeror; RHEU distributes under its own template in PARTNER; SOLO delivers EUR value only, with copy that presents no security. The passported prospectus permits retail offers in 29 EEA states by Authorised Offerors; it permits no delivery to US, Canada, UK, Switzerland or Prohibited Investors and no offers by anyone else. Residual risk: F14 is open per member state; an adverse Lithuanian opinion collapses EEA to PARTNER-or-Gems (ADR assumption 4); PARTNER continuity needs RHJ to renew the prospectus by 24 June 2027.

### EU gambling and promotion law by state

Belgium treats paid random rewards with valuable prizes as gambling with criminal penalties (legal-eu#25); Austria and the Netherlands exempt loot boxes inside skill games only because there is no cash-out, reasoning that fails once rewards have cash value (legal-eu#24, #26); Germany requires a stake and a monetary prize (legal-eu#27); the Dutch promotional-games code and Italy's DPR 430/2001 regulate chance-based promotions (free entry, EUR 100k, once a year, 20 draws; MIMIT notice, 100% bond, fiscal representative) (legal-eu#29, #30). Design: no stake and no chance near cash value removes the gambling element in every state and keeps the program outside the NL code; Belgium and Italy are fenced until memos; UCPD Annex I items 20 and 31 drive the copy rules; no DSA "online platform" features exist (legal-eu#20, #21). Residual risk: Italy's prize-operation regime may catch deterministic loyalty credits; the Digital Fairness Act (Q4 2026) may regulate reward loops directly (legal-eu#23).

### UK financial promotions

Rules: the cryptoasset promotions regime makes fungible, transferable cryptoassets controlled investments, exempting tokens transferable only by redemption with the issuer and usable in a limited way; PS23/6 bans "free crypto" incentives (legal-eu#33); COBS 22.5 bans CFD inducements; the full regime applies from 25 October 2027 (legal-eu#34); Stock Tokens are not offered to UK persons (legal-eu#35). Design: no real-asset reward in the UK; BELL is limited-use, bound and never marketed as crypto there. Residual risk: same-Seat wallet transfers could be argued to be "transfer"; the Phase 3 UK memo decides whether UK accounts keep on-chain claims or stay on off-chain points.

### App stores

Apple: 3.1.1 requires IAP for in-game currency and bars unlocking content via cryptocurrencies or wallets; 3.1.1(a) permits external links and calls to action in US storefront apps without an entitlement; 3.1.5(iii) allows exchanges only where licensed; 3.1.5(iv) requires crypto-securities trading to come from securities firms; 3.1.5(v) bars crypto apps from paying currency for downloads or posting, while 3.2.2(x) permits incentives for in-app actions (legal-us#31 and skeptic). Google Play: game loyalty rewards must be "clearly supplementary and subordinate to any qualifying monetary transaction" and never "wagered, awarded or exponentiated by game performance or chance-based outcomes"; the Blockchain-based Content policy requires the Financial Features declaration and bars paying for a chance at an NFT of unknown value (legal-us#32 and skeptic). Design: on iOS BELL is read-only, all BELL spend and all redemption run on the web hub reached by an external link on the US storefront, the Vault tab shows holdings with no trade link, and the CIP runs on the broker's web flow, so no crypto-securities trading is in the app; BELL is never paid for installs, referrals or posts; on Android the Financial Features declaration is filed, Season-Pass-linked accrual is the primary loyalty framing, and ad-view credit moves to the web hub if Google reads "subordinate" strictly (ADR D12). Listings never mention earning (p2e#34). Residual risk: Apple has no text on securities rewards for gameplay and could analogise to 3.1.5(v); then iOS ships game-only (ADR assumption 2).

### FTC endorsement and earnings claims

Rules: Endorsement Guides 16 CFR 255 require disclosure of material connections including prizes and rewards (Example 9 covers points-for-posts); the Consumer Reviews Rule (16 CFR 465) bans incentivised reviews conditioned on sentiment; earnings claims need typical-results substantiation (legal-us#29 and skeptic). Design: no rewards for posts, reviews or referrals; the positioning line states typical results and the Earnings Call publishes the actual payout distribution, which is the substantiation file; any influencer work carries the disclosure and the same line. Residual risk: the Earnings Claim Rule remains at ANPR stage; the file is kept as if it were final.

### Tax

US: Stock Credit is a prize or award not for services (1099-MISC box 3), pending counsel item 5; the $83 ceiling sits far below the $2,000 threshold for tax years after 2025 (legal-us#34); income is still taxable at FMV on receipt, stated plainly in the Vault disclosures; the broker collects the W-9 in CIP and issues 1099-B (fractional sales under $20 gross proceeds exempt) and 1099-DIV; BELL has no market and no determinable FMV, to be confirmed under Rev. Rul. 2023-14. EU: no member state exempts rewards; recipients self-assess (legal-eu#45); the CASP reports under DAC8 from calendar 2026; the in-app annual statement lists every payout with EUR value and date; the ceiling is designed under Ireland's EUR 3,000, Germany's EUR 256, Lithuania's EUR 200 x 6 and the Dutch gift exemption; no Dutch gaming tax applies because there is no chance; France waits for the characterisation memo.

### GDPR, DPIA, AML and sanctions

Rules: EDPB blockchain guidelines v2.0 (7 July 2026): keep personal data off-chain, public keys can be personal data, salted hashes remain personal data, a DPIA is expected (legal-eu#38); AMLR from 10 July 2027 fixes CDD retention and deletion, so brokerage KYC cannot be repurposed (legal-eu#39); OFAC expects geolocation, IP blocking and KYC across the virtual-currency industry (legal-us#33); BIPA/CUBI govern biometrics (counsel item 15). Design: the game stores `{attestation ref, jurisdiction, is_18plus, verified_at, seatId}` only; documents and selfies stay at the broker or KYC vendor; on-chain is a random 32-byte seatId mapped to addresses, rotated for erasure; DPIA filed before Phase 3; sanctions screening at KYC and every Settlement Day; the EMI/CASP owns travel-rule duties. Residual risk: a supervisor treating the seatId-to-address map as erasable personal data pushes BELL back to off-chain points (ADR assumption 6).

## C.11 Document set to draft

| Document | Owner | Contents that matter |
|---|---|---|
| Terms of Service | Studio | Age gates (13+/16+/18+), closed-loop currencies, BELL as a priceless membership credential with no planned transferability, cheating ladder and appeal, 90-day program-change notice |
| Reward Program Rules | Bellwether Rewards LLC / Europe Ltd | The Bell Rule verbatim, per-geo ratios and clamps, caps, tenure, pending and vesting windows, Settlement Day schedule, 12-ETF criteria and tickers, locks, expiry, duplicate-Seat merger, "promotional, taxable, may fall in value", no-chance statement, drop rules |
| Privacy Notice and DPIA | Studio | Attestation-only data model, off-chain linkage, seatId design, erasure by rotation, COPPA/GDPR Art 8 handling, vendor list, DAC8/travel-rule disclosures |
| Vault disclosures | Broker, principal-approved | Account agreement, CIP notices, fractional-share disclosure (5-decimal rounding, no ACATS, liquidation on transfer), lock periods, "no security is recommended", tax statement, welcome-credit promotion terms |
| Sponsor agreement | Studio | Escrow-first, deterministic allocation, third-party ETF only, own-stock refusal, aggregate-only reporting, refund of unspent escrow, no data rights |
| Broker agreement | Studio and BD | Flat marketing fee schedule, Rule 2040(a) determination, journal SLAs, restriction-flag warranties, 2210 approval workflow, wind-down and migration, fee caps that trigger the $10 minimum |
| EMI/CASP agreement | Bellwether Rewards Europe Ltd | KYC scope and dedup, attestation schema, EURC or SEPA disbursement SLAs, chain selection (4663 or Arbitrum One), travel rule and DAC8, per-check pricing (<= EUR 3 per Seat gate), sanctions screening |

## C.12 Counsel work plan

| Memo | Jurisdiction | Question | Gate it unblocks | Rough cost |
|---|---|---|---|---|
| BD structure, 2040/15(a), Grant characterisation | US | Flat fee is not finder compensation; broker-paid Grant is not compensation to us; Rewards LLC structure | Gate 1 | $40-60k |
| 50-state deterministic-reward survey | US | Time as consideration; ETF prizes and blue-sky; per-state fence list | Gate 1 | $30-50k |
| Digital-tool token memo | US | BELL under Rel. 33-11412; DoubleZero/Fuse letters; comms policy | Gate 3 | $30-40k |
| FinCEN, NY BitLicense, CA DFAL | US | Bound-transfer token stays exempt; NY claims on or off | Gate 3 | $20-30k |
| Tax | US | Prize vs services; state withholding; 1099-B basis; BELL FMV | Gate 2 | $15-25k |
| App-store strategy | US | Apple 3.1.1/3.1.5 read of ETF rewards and Vault UI; Google "subordinate" | Gate 1 | $5-10k |
| Reg E / escheat / CFPB | US | Stock Credit and Gems as prepaid or stored value | Gate 2 | $10-15k |
| BIPA/CUBI | US | Vendor and broker biometric compliance and liability allocation | Gate 2 | $5-10k |
| Sponsor own-stock conditions | US | 10b-18 and Reg M program terms (only if a sponsor asks) | per sponsor | $10-15k |
| Robinhood Chain ToS and brand | US | Marks, "token issuance" authorisation, Wallet surface consent | Gate 3 | $5k |
| MiFID II, Prospectus, F14 | Lithuania | Neutral EURC screen as offer/RTO/marketing; tied-agent need under PARTNER | Gate 4 | $30-50k |
| MiCA Art 4(3)/(5) | Lithuania | Existing-utility hook; claim/sink contracts; SeatRegistry as custody | Gate 3 | $15-25k |
| EMT and rails | EU | EURC status and chain; EMI/CASP travel rule and DAC8 | Gate 4 | $10-15k |
| Member-state notes (IE, NL, DE, LT, FR, BE, IT) | each | Promo law, prize vs gift vs income, withholding | per state, Phase 4 | $8-15k each |
| GDPR DPIA | EU | seatId map, erasure, lawful basis separate from AML | Gate 3 | $15-25k |
| UK promotions | UK | Bound BELL outside "qualifying cryptoasset" | Gate 3 | $8-12k |

Total across phases roughly $300-450k, front-loaded to Phase 0-1.

## C.13 Kill switches and incident playbook

| Switch | Scope | Effect | Owner | Restore condition |
|---|---|---|---|---|
| Accrual pause | per geo tier or state | Stock Credit stops accruing; Gems accrue at 2x instead; play unchanged | Compliance lead | Written counsel clearance |
| Redemption pause | per rail (Vault, RHEU, EURC, SEPA) | Pending stays pending; nothing forfeited; Settlement Day skipped with notice | Compliance lead | Rail partner confirms |
| Vault-opening pause | US | New CIP blocked; existing Vaults untouched | Compliance lead | Broker confirms |
| EURC disbursement pause | EEA or member state | Falls to SEPA, then Gems 2x | Compliance lead | EMI/CASP or counsel |
| BELL claim pause | global or per geo | Seasonal Merkle claim disabled; accruals continue off-chain | CTO | Audit or memo |
| Arbitrum One redeploy | global | Pre-published redeploy triggers if any game contract is sequencer-filtered (ADR D13) | CTO | Not reversed |
| Sponsor drop cancel | per Sprint | Escrow refunded in full; Sprint runs cosmetics-only | Product | n/a |

Incident playbook. (1) Regulator inquiry (SEC, FINRA, a state securities or gaming regulator, Bank of Lithuania, a DPA): acknowledge within 2 business days; change nothing player-facing unless counsel says so; assemble the standing file (Bell Rule, invariant tests, Earnings Call history, enforcement counts, DPIA); pause accrual in the inquiring jurisdiction only if the inquiry concerns the reward layer; respond through counsel by the deadline; notify players if any rail pauses. (2) Store rejection or strike: no cosmetic resubmission; move the disputed surface to the web hub within 72 hours; if the rejection targets securities rewards on iOS, ship game-only on iOS and keep Android and web live. (3) Broker termination: 90-day wind-down; existing Vaults stay the players' accounts; Vault-opening pause; execute the alternate white-label (Apex) agreement pre-negotiated in Phase 2; if none is live within 90 days, accrued credit above $5 converts to Gems 2x at the player's election or waits. (4) Chain filtering or sequencer failure: the off-chain ledger is authoritative, so no payout is affected; a filtered game contract triggers the Arbitrum One redeploy with the seasonal Merkle root republished there; Robinhood Wallet still holds BELL via Arbitrum (tech#21). Every incident gets a dated line in the Earnings Call.

## C.14 Regulatory watch list

| Date | Item | Effect on design |
|---|---|---|
| 2026-09-15 | CLARITY Act cloture vote on the motion to proceed (60 votes needed) | If enacted, "end user distribution" could cover BELL; transferability review input |
| 2026-09-17 | SEC 24-hour-trading roundtable | Erodes the 24/7 differentiator; no design change |
| 2026-09-29/30 | HOOD Summit, Houston | PARTNER pitch; watch for Chain, Wallet or US tokenization announcements |
| 2026-10-19 | GENIUS Act Treasury NPRM comments close | Stablecoin rails for RoW USDG payouts |
| 2026-10-20 | Regulation Crypto Assets comments close | Startup exemption as fallback classification; transferability gate (e) |
| Q4 2026 | EU Digital Fairness Act proposal | Reward loops, virtual currencies, addictive design; copy and LiveOps review |
| Oct 2026 (reported, unverified) | DTCC tokenization service launch under its December 2025 no-action letter | Future US tokenized-equity rail; no dependency |
| Pending, indefinite | SEC tokenized-equity innovation exemption (delayed May and August 2026) | If adopted, US delivery could move to a tokenized rail under the same Bell Rule (ADR assumption 11) |
| 2027-01-18 | GENIUS Act effective (unless earlier) | Permitted-issuer stablecoins only |
| 2027-06-24 | RHJ base prospectus expiry | PARTNER continuity depends on renewal |
| 2027-07-10 | AMLR applies | CDD retention and deletion; attestation model already compliant |
| 2027-10-25 | UK cryptoasset regime applies (applications 2026-09-30 to 2027-02-28) | UK memo; bound BELL classification |
| 2028-07-18 | GENIUS Sec 3(b)(1) service-provider restrictions | RoW stablecoin rail must use permitted issuers |
| ~2029 | Retail Investment Strategy application (EP plenary Nov 2026, OJ late 2026/early 2027) | Inducement test on any PARTNER fee; finfluencer rules |
| Rolling | Google Play loyalty-policy text; Apple guideline updates; ESMA CFD statements; Bank of Lithuania outcome of the 2025 OpenAI/SpaceX review | Store strategy and PARTNER template |

## Design pillars

Bellwether must be a good idle game with every real-value feature hidden. The retention targets are D1 45% (floor 40%), D7 18% (floor 15%), D30 7%, measured in the Phase 0 Canada/NZ cohort where no Vault, Stock Credit or BELL exists; if D1 < 35% no reward layer ever ships (C6; ADR section 2). Six pillars govern every decision below.

1. **Time × rate is the only lesson.** Wealth in Bellwether comes from owning productive things and reinvesting; nothing is bought low or sold high. There is no sell verb anywhere in the game.
2. **Bumpy, never smooth.** Exponential unit costs against linear output create walls; milestone doublings create bumps. Every session should contain one bump and end at one wall (idle-design#7).
3. **Log in, Reinvest, log out.** Sessions are 5-8 minutes; the game is designed to be left. Nothing decays, no streak is lost, no timer punishes absence.
4. **Complete without money.** A player who never watches an ad or spends is never blocked. Ads are opt-in accelerators; purchases are permanent multipliers, time and cosmetics.
5. **No chance touches value.** Game currencies may use randomness only for cosmetics and event flavour; Stock Credit, BELL and sponsor drops are deterministic by construction (C1; ADR section 1).
6. **Respect the player.** Positioning line on every value surface, no confetti, no countdown pressure, no interstitials for three sessions, no dark-pattern offers.

## Fantasy, tone, art and audio

**Player fantasy: the patient compounder.** You inherit a corner store and grow it, sector by sector across the eleven GICS sectors, into a bellwether conglomerate: the company every index has to include. You take it public, get included in the index, and start again one rung higher with more Float behind you. The only verb is Reinvest. The player never trades, never times anything, never picks a winner; they own, wait, and reinvest. The IPO is a bell ringing on an exchange floor, the second layer is Index Inclusion, and the whole game is an argument that boring compounding beats clever activity, which is the opposite of the trading-frequency mechanics that the Massachusetts settlement and the SEC's 2021 digital-engagement list condemned (F7; legal-us#9).

**Tone.** Dry, warm, understated. Copy sounds like a well-run family business, not a brokerage or a casino: "The Quarry paid for itself this morning." Numbers are shown with short-scale names (thousand, million, billion) up to 1e33 and scientific notation after, switchable in Settings. No exclamation marks in system copy; no "congratulations"; milestone toasts state the fact ("25 Corner Stores. Profit doubled.").

**Art direction.** Flat, paper-and-ink ledger aesthetic: cream paper ground, ink-navy line work, one accent colour per sector (eleven accents chosen to be distinguishable under deuteranopia and protanopia). Each sector is a stylised diorama tile that fills in as units are bought (1, 10, 25, 50, 100, 200, 400 owned each add a visible building). The Home screen is a skyline built from the sector tiles. No red/green anywhere in the palette, no candlesticks, no line charts, no ticker tape. Cosmetic Charters recolour tiles and add plaques; they never change numbers.

**Audio.** A soft mechanical tick per completed cycle (rate-limited to 8/s so it becomes texture); a warm hand-bell on milestones; the Opening Bell (three strikes) on Go Public; a low ambient loop per open sector. No coin showers, no slot-machine stings, no rising-pitch "combo" audio. Haptics: a light tap on manual collection and milestones; nothing on purchases.

## Generators: the eleven sectors

`cost_next = base × r^owned`; bulk cost `base × r^owned × (r^n − 1)/(r − 1)`; max affordable `n = floor(log_r(Cash × (r − 1)/(base × r^owned) + 1))` (idle-design#1). `production_per_second = owned × profit_per_cycle / cycle × milestone_mult × speed_mult × report_mult × synergy × global_mult`. All numbers are break_infinity.js / BreakInfinity.cs Decimals in shared client and server code (idle-design#29). Constants are the ADR ladder (AdCap-style for tiers 1-10; tier 11 extrapolated). Manager cost is 10 × base cost (ADR section 2). Unlock condition decided here: a sector's card becomes visible, greyed with its price, once the previous sector has at least one unit; buying the first unit at base cost "opens" the sector. Starting Cash is 4, exactly one Corner Store.

| Tier | Name | GICS sector | Base cost | r | Cycle (s) | Profit/cycle | Profit/s per unit | Manager cost | Unlock condition | First-unit payback |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Corner Store | Consumer Staples | 4 | 1.07 | 0.6 | 1 | 1.67 | 40 | Start (owned) | 2.4 s |
| 2 | Sneaker Lab | Consumer Discretionary | 60 | 1.15 | 3 | 60 | 20 | 600 | Corner Store ≥ 1 | 3 s |
| 3 | Machine Shop | Industrials | 720 | 1.14 | 6 | 540 | 90 | 7,200 | Sneaker Lab ≥ 1 | 8 s |
| 4 | Quarry | Materials | 8,640 | 1.13 | 12 | 4,320 | 360 | 86,400 | Machine Shop ≥ 1 | 24 s |
| 5 | Wind Farm | Energy | 103,680 | 1.12 | 24 | 51,840 | 2,160 | 1.04e6 | Quarry ≥ 1 | 48 s |
| 6 | Water Works | Utilities | 1.24e6 | 1.11 | 96 | 622,080 | 6,480 | 1.24e7 | Wind Farm ≥ 1 | 3.2 min |
| 7 | Credit Union | Financials | 1.49e7 | 1.10 | 384 | 7.46e6 | 19,427 | 1.49e8 | Water Works ≥ 1 | 12.8 min |
| 8 | Clinic | Health Care | 1.79e8 | 1.09 | 1,536 | 8.96e7 | 58,333 | 1.79e9 | Credit Union ≥ 1 | 51 min |
| 9 | Apartments | Real Estate | 2.15e9 | 1.08 | 6,144 | 1.07e9 | 174,153 | 2.15e10 | Clinic ≥ 1 | 3.4 h |
| 10 | Radio Station | Communication Services | 2.58e10 | 1.08 | 36,864 | 2.97e10 | 805,664 | 2.58e11 | Apartments ≥ 1 | 8.9 h |
| 11 | App Studio | Information Technology | 3.10e11 | 1.07 | 86,400 | 4.0e11 | 4.63e6 | 3.10e12 | Radio Station ≥ 1 | 18.6 h |

The payback jumps at tiers 7, 8 and 10 are the designed walls, "a natural energy system without an energy currency" (idle-design#7): first real wait at the Credit Union (~45 min elapsed), second at the Apartments (day 2), third at the Radio Station (day 4-5). Each wall is where a session ends and where the 4-hour Skip ad and the Gems time warps are surfaced.

### Milestone multipliers

| Milestone | Applies to | Effect |
|---|---|---|
| 25, 50, 100, 200, 300, 400 owned, then every 100 | All tiers | ×2 profit per cycle for that sector (cumulative) |
| 25, 50, 100 owned | Tiers 1-4 only | ×2 cycle speed (halves cycle time) |
| Every 100 owned in a sector | Its two adjacent tiers (tiers 1 and 11 have one neighbour; no wrap) | +0.5% profit per 100 owned, additive (Sector Synergy) |

The next milestone is always shown on the sector card as a progress bar ("18/25 · profit ×2 at 25"), which is the purchase pull inside every session. Bulk-buy buttons: ×1, ×10, ×100, Next Milestone, Max.

## Analyst Reports and global upgrades

Analyst Reports are per-sector, per-run upgrades (they reset at IPO). Decided here: three per sector, each ×3 sector profit, unlocking at 10, 40 and 160 owned, priced at 50 × the unit cost at the unlock count (so prices are fixed and precomputable; ADR: "×3 per sector at ~50× current cost").

| Report | Unlock (owned) | Price | Effect | Example: Corner Store | Example: Wind Farm | Example: App Studio |
|---|---|---|---|---|---|---|
| Initiation | 10 | 50 × base × r^10 | ×3 sector profit | 393 | 1.61e7 | 3.05e13 |
| Deep Dive | 40 | 50 × base × r^40 | ×3 sector profit | 2,995 | 4.82e8 | 2.32e14 |
| Long View | 160 | 50 × base × r^160 | ×3 sector profit | 1.0e7 | 3.88e14 | 7.8e17 |

Global upgrades persist across IPOs and Markets:

| Upgrade | Source | Unlock | Cost | Effect |
|---|---|---|---|---|
| Bellwether Report I, II, III, … | Cash | Lifetime Cash 1e6, 1e12, 1e18, 1e24, then every 1e6 | 10% of the threshold in Cash | ×2 all profit, permanent |
| Golden Charter (one per sector, 11 total) | Sprint/Season track or 300 Gems | Sector opened once | Track reward or Gems | ×7.77 that sector's profit, permanent (idle-design#20) |
| Full Charter Set | Automatic | All 11 Golden Charters | None | Additional ×10 all profit, permanent |
| Founder's Pack multiplier | IAP ($2.99) | Third sector opened | $2.99 | ×3 all profit, permanent (idle-design#7, #27) |

## Managers and Reinvest

**Managers.** One per sector, cost 10 × base cost, available once the sector has ≥ 1 unit. Before a Manager the player taps the sector card to start a cycle; the cycle runs for its cycle time and pays out; the card must be tapped again. A Manager restarts the cycle automatically forever, online and offline. Managers reset at IPO unless the Instant Managers Float upgrade is owned. Tapping ends at about 1:30 in a first session; from then on the game is about spending, not tapping.

**Reinvest (the only verb).** A per-sector switch, visible once that sector has a Manager. Exact behaviour: at the completion of each production cycle in that sector, if `Cash − reserve ≥ cost_next(sector)`, buy exactly one unit; repeat until the check fails, so several units land in one cycle when cash is abundant. `reserve` is a global slider "Keep for manual purchases" (0-90%, default 0). When several sectors' cycles complete in the same tick, the lowest `cost_next` buys first. The offline simulation applies the same rule at 60-second resolution. "Reinvest All" sets every switch; switches reset at IPO unless Reinvest Memory is owned. The Sectors tab shows units bought by Reinvest since the last visit, the "the business grew while I was away" beat.

## Prestige 1: Go Public

Going Public is the IPO: the run ends, Cash, units, Managers, Analyst Reports and Reinvest switches reset in that Market; Float is claimed. Kept: Float, Weight, Bellwether Reports, Golden Charters, Founder's multiplier, Float-shop and Weight-shop purchases.

**Float formula.** Per Market m:

`Float_available = floor(150 × (L_m / K_m)^p) − Float_claimed_m`

where `L_m` is lifetime Cash earned in Market m across all runs, `K_Home = 1e14`, `p = 0.50 + 0.01 × PrestigeExponentLevel` (max 0.55; see Index Inclusion). With p = 0.5, doubling Float needs 4× lifetime Cash (idle-design#4). Float is claimed on IPO into one shared pool, `Float_held`, and the profit multiplier is:

`global_mult = 1 + 0.02 × Float_held × (1 + 0.10 × Weight_lifetime)`

50 Float held is ×2 (ADR section 2). Spending Float in the Float shop reduces `Float_held` and therefore the multiplier, which is the AdCap tension: buy the permanent convenience now or keep the rate (idle-design#4). The Go Public screen shows current Float, Float on offer, the resulting multiplier and a neutral "+N%" delta; it never recommends an IPO. Minimum first IPO is 50 Float on offer. BELL emission counts at most 2 IPOs/day (ADR section 3); the game allows more, they simply accrue no BELL.

**Pacing targets (ADR constants, K_Home = 1e14, p = 0.50, 80-85% of Float held).**

| Moment | Elapsed | Lifetime Cash (Home) | Float claimed (cumulative) | IPOs to date | Float multiplier | Notes |
|---|---|---|---|---|---|---|
| First IPO | 2.5-3.5 h incl. one offline period | 1.1e13 | 50 | 1 | ×2.0 | Vault reveal eligibility begins (18+) |
| Day 3 | 72 h | 2e15 | ~670 | 3 | ×11 (540 held) | 9 sectors open; Apartments wall behind |
| Day 7 | 168 h | 1.8e18 | ~20,000 | 5-6 | ×340 (17,000 held) | 11 sectors open, first Sprint done, Season Pass offered |
| Day 14 | 336 h | 4.4e21 | 1.0e6 | 10-12 | ×22,400 (800,000 held, Weight 4) | Index Inclusion, Europe Market |
| Day 30 | 720 h | 4.4e25 | 1.0e8 | 20-24 | ~×5e6 (8e7 held, Weight 21) | Asia Market opens at 1e9 Float, ~day 45 |

The Lifetime Cash column is the exact inverse of the Float formula at each Float target; the time column is the design target that Phase 0 tunes K_Home to hit (see Balancing). The harness pre-tune indicates the first-IPO window is the one row the ADR constants do not yet reach; the day-7 and day-14 rows are reached.

### Float shop

All items are one-time, permanent across IPOs and Markets, and spend `Float_held`.

| Item | Cost (Float) | Effect |
|---|---|---|
| Warehouse Extension I-IV | 20 / 60 / 200 / 600 | +1 h offline cap each (base 8 h → 12 h) |
| Seed Capital I-IV | 40 / 250 / 1,500 / 10,000 | Each run starts with Cash equal to 10% / 25% / 50% / 100% of one hour at the previous run's final rate |
| Listing Discount I-III | 100 / 1,000 / 10,000 | Base cost of sectors 5-11 −25% / −50% / −75% |
| Instant Managers (sectors 1-6) | 150 | Managers pre-hired at run start |
| Instant Managers (sectors 7-11) | 15,000 | Managers pre-hired at run start |
| Reinvest Memory | 100 | Reinvest switches and reserve slider persist across IPOs |
| Float Booster (Season Pass only) | 0 | +10% Float on every IPO during the Season |

## Prestige 2: Index Inclusion

At lifetime Float claimed (all Markets) ≥ 1e6, expected day 10-14, the Index tab opens. Weight formula:

`Weight_total = floor(cbrt(lifetime_Float / 1e4))`, `Weight_new = Weight_total − Weight_claimed`

(~8× lifetime Float to double, idle-design#3). Decided here: Index Inclusion is a claim, not a reset. Nothing is lost when the company enters the index; the third layer reserved for the 1e308 wall is the only full reset (idle-design#10). Weight has two views: `Weight_lifetime` drives passive bonuses (+10% Float effectiveness and +1 h offline cap each, offline to a 16 h maximum), and unspent Weight buys the following.

| Weight purchase | Cost (Weight) | Requirement | Effect |
|---|---|---|---|
| Prestige Exponent +0.01 (five steps) | 3 / 6 / 12 / 24 / 48 | Index tab | p: 0.50 → 0.55 in all Markets (Antimatter Dimensions' upgradable divisor; idle-design missed) |
| CFO | 1 | Index tab | Auto-IPO whenever Float on offer ≥ a chosen threshold; per Market |
| Europe Market | 2 | Lifetime Float ≥ 1e6 | Second eleven-generator ladder, K_Europe = 2.5e13 (4× Float per Cash, the AdCap Mars ratio; idle-design#4 skeptic) |
| Asia Market | 20 | Lifetime Float ≥ 1e9 | Third ladder, K_Asia = 6.25e12 |

Markets run concurrently, each with its own Cash, units, Managers, Reports, Reinvest switches and IPO cadence, sharing one Float pool and one multiplier; the same tier constants apply, with sector skins localised (Kiosk, Tram Works, and so on) as cosmetics. Expected Weight: 4 at day 14, 21 at day 30, 46 at 1e9 Float.

## Offline: the Warehouse

- Offline production is computed server-side from the server clock at 60-second resolution; the client's `elapsedRealtime` is used only to render a provisional figure that the server value replaces silently on sync (idle-design#31).
- Cap: 8 h base + Warehouse Extensions (to 12 h) + 1 h per lifetime Weight, hard maximum 16 h; 24 h with the ad-removal subscription, whatever the other bonuses (the Idle Clans 12h-base/24h-premium pattern; idle-design missed). Production runs at 100% inside the cap and stops at the cap; there is no half-rate tail and no penalty.
- Reinvest runs offline for every sector with a Manager and the switch on; Managers keep cycling; active boosts (×2 15 min) run down in real time; Bellwether Reports and milestones do not auto-purchase, but milestones reached by Reinvest purchases apply immediately.
- All open Markets and any live Sprint ladder accrue offline (Sprint cap 8 h, no extensions).
- The return screen, the Warehouse Report, shows hours counted against the cap, Cash collected, units Reinvest bought per sector, and one rewarded "×2 Warehouse" offer, shown only if offline ≥ 30 min. Cap copy: "Warehouse full after 8 h. Extensions are in Go Public."

## Session shape

3-4 sessions a day of 5-8 minutes (idle-design#7, #15). A typical mid-game session: collect the Warehouse, take or decline the ×2 offer (0:00-0:30); read what Reinvest bought (0:30-1:00); buy the Manager or Report that just became affordable (1:00-2:30); push one sector to its next milestone (2:30-4:30); complete the day's Compounding Cycle if not done (collect, Reinvest All, buy one Report: grants 30 min of current rate in Cash and 10 BELL accrual; no streak, nothing lost by skipping); check the Go Public delta; leave at the next wall.

## First five minutes

- **0:00** Age screen (see UX flows), then straight into the Home screen with one Corner Store. Copy: "Tap the store." A cycle runs (0.6 s) and pays 1. Three taps in, the cost of the next store (4.28) is highlighted.
- **0:20** "Buy another store." The player buys 2-5 stores; tapping now pays several Cash per cycle. Tutorial hand disappears after the second purchase.
- **0:45** Sneaker Lab card appears greyed at 60. When affordable: "A second sector. Different rhythm." Player buys it; both cards need tapping.
- **1:30** Corner Store Manager (40) is highlighted: "Hire a Manager. Stores run themselves." After hiring, the Reinvest switch appears on the Corner Store card with copy "Reinvest: the store buys the next store whenever it can." Tapping is over.
- **2:00** 25 Corner Stores: the first milestone bell rings. Toast: "25 Corner Stores. Profit doubled." The Next Milestone button is introduced.
- **3:00** Machine Shop opens at 720. Third sector; the Founder's Pack card is shown once, dismissible: "Founder's Pack, $2.99: ×3 profit forever and one Golden Charter. Once, ever."
- **3:30** First Analyst Report (Corner Store Initiation, 393): "Analyst coverage. ×3 Corner Store profit."
- **4:00** First rewarded offer, opt-in, on the Home boost button: "Watch a short video: ×2 profit for 15 minutes." Declining hides it for 2 minutes.
- **5:00** The Go Public button appears greyed on Home: "Go Public at 50 Float. Lifetime Cash 1.1e13." No interstitial in sessions 1-3; no wallet, verification, Vault or money language in session one.

## Day 1 and Day 7 beats

**Day 1.** Wind Farm by minute 25; Water Works around minute 35; the Credit Union wall at ~45 min ends session one with the Skip offer visible; Warehouse Report on return with the ×2 offer; Clinic; first IPO at 2.5-3.5 h elapsed (Opening Bell, first Float, Float shop introduced with Warehouse Extension I at 20 Float); second run visibly faster at ×2; Morning Brief introduced in session three; first interstitial in session four, after 90 s; Vault eligibility recorded silently for self-declared 18+ players (the reveal waits for day 7).

**Day 7.** 8-11 sectors open, 4-6 IPOs, Apartments wall crossed, Radio Station wall in view; first Sector Sprint completed (tier 3 = participation); Season Pass offered once the Season track shows the player 3+ levels earned; Bellwether Report II (1e12) bought; Vault tab revealed to self-declared 18+ players in eligible jurisdictions with the positioning line; Charter tab shows accrued BELL as an off-chain balance with the credential copy. **Day 14.** Index Inclusion, Europe Market, first Syndicate.

## LiveOps calendar

Backend from day one (PlayFab/Supabase class; AdCap's post-launch regret, idle-design#20). Weekly sprints with 1/5/20/100% staged rollout (idle-design#17).

| Cadence | Event | Window | Mechanics |
|---|---|---|---|
| Daily | Compounding Cycle | Resets 00:00 local | Collect, Reinvest All, buy one Report → 30 min of current rate + 10 BELL accrual. No streak. |
| Daily | Morning Brief | Resets 00:00 local | Three game-only tasks (e.g. "Buy 25 units in any sector", "Run Reinvest 30 min", "Reach a milestone"); each 5-15 Gems and 10 Season points; one rewarded re-roll/day. |
| Weekly | Sector Sprint | Fri 12:00 UTC → Mon 12:00 UTC | See below. |
| Monthly | Season and Season Pass | 30 days | See below. |
| Quarterly | Earnings Season (the cooperative Index Sprint) | 14 days, first two weeks of Jan/Apr/Jul/Oct | See below. |

**Sector Sprint.** A featured sector (advisory theme vote by T1 accounts, one vote each, balance-independent; otherwise rotation) gets a six-tier event ladder using the tier 1-6 constants under sector-flavoured names, with its own Sprint Cash, Managers and Reinvest, and no Float (event mines doubled Kolibri's weekend revenue, idle-design#17). Tiers are lifetime-Sprint-Cash thresholds 1e6, 1e8, 1e10, 1e12, 1e14, 1e16. Rewards: 10/15/20/30/40/60 Gems, 20 Season points per tier, a Golden Charter shard at tiers 2, 4 and 6 (three shards = the featured sector's Golden Charter), a sector skin at tier 6. Tier 3 is "participation" and grants 100 BELL accrual. A sponsor may buy the Sprint skin and attach a published fixed drop to tier 4 for Seats with ≥ 30 active days (ADR section 7); the game shows that objective as text and nothing else.

**Season and Season Pass ($4.99 / 30 days).** Season points from Sprints, Cycles and Briefs fill a 40-level track. Free track: 150 Gems total, two 4 h time warps, one sector skin, an IPO plaque at level 40. Pass track: 300 Gems total, the Float Booster (+10% Float on every IPO this Season), one 24 h time warp, an exclusive skin set for the Season sector, one Golden Charter at level 40, the Season Ladder ticket waived, and the purchase-tied loyalty benefit of +$0.02/day Stock Credit with reward caps at 1.5× (ADR section 7). The Season Ladder is a cosmetic ranking by Season points in buckets of 50 players; entry is 20 BELL burned or the Pass; prizes are nameplate frames only.

**Earnings Season (quarterly).** Syndicates (founded for 500 BELL, joined for 100 BELL locked per season, 5-20 members, preset stickers only) pool Sprint Cash toward five shared thresholds; everyone in a Syndicate that crosses a threshold gets the same banner, plaque and Gems. Solo players have an Independent track with the same thresholds scaled to one player. Copy for the event never refers to player earnings; "Earnings" is the corporate reporting season being themed. No leaderboard with value, no ranking prizes of value.

## Ad placements

Rewarded video only counts through server-side verification callbacks; the first 6 credited views per day accrue Stock Credit under the Bell Rule, the remaining views to the 8/day hard cap are game-only (ADR sections 2, 6). Global cooldown 2 min between any two rewarded views. Interstitials accrue nothing and are removed by the ad-removal subscription; rewarded offers remain available to subscribers because they are player-initiated.

| Placement | Trigger | Reward | Daily cap | Spacing |
|---|---|---|---|---|
| Boost | Home boost button, from 4:00 in session one | ×2 all profit for 15 min | 4 | 2 min global; not while a Boost is running |
| Skip | Sectors tab, shown only when the cheapest next unit in any open sector has payback > 10 min | Advance all Markets 4 h (Reinvest runs) | 2 | 2 min global; 30 min between Skips |
| ×2 Warehouse | Warehouse Report after ≥ 30 min offline | Doubles that Warehouse collection | 1 per return, counts toward the 8 | 2 min global |
| Brief re-roll | Morning Brief | Replaces the three tasks | 1 | 2 min global |
| Interstitial | Session ≥ 4, 90 s into the session, on a tab change | None | 1 per session | Never within 2 min of a rewarded view; skippable at 5 s |

Targets: 3.0 rewarded views/DAU at ≥ 50% opt-in; > 3 interstitials per session costs 20-30% D7 (idle-design#24), so the cap is one.

## IAP catalogue

| Item | Price | Effect |
|---|---|---|
| Founder's Pack (once) | $2.99 | Permanent ×3 all profit + one Golden Charter (player picks the sector). Offered at the third sector opening. |
| Gems 120 / 350 / 800 / 1,800 / 5,000 | $1.99 / $4.99 / $9.99 / $19.99 / $49.99 | Premium currency; never expires (Apple 3.1.1). No pack above $49.99. |
| Ad-removal 7 days / 30 days | $0.99 / $3.99 | No interstitials; Warehouse cap 24 h (idle-design#19) |
| Season Pass | $4.99 / 30 days | Pass track above; +$0.02/day Stock Credit; caps ×1.5 |
| Golden Charter | 300 Gems | ×7.77 one sector, permanent |
| Time Warp 4 h / 24 h | 60 / 250 Gems | Advances all Markets; Reinvest runs |
| Capital Infusion | 40 Gems | Instant Cash equal to 2 h at current rate, one Market |
| Sprint Time Warp | 30 Gems | 2 h of Sprint rate |
| Charters (cosmetics): sector skin / IPO plaque / Time Capsule / nameplate | 200 / 100 / 150 / 50-500 Gems | Cosmetic only; the same items are mintable by burning BELL on the Exchange Floor (Apple parity) |

**No-loot-box rule.** Every purchase shows exactly what it contains before payment; no random bundles, no mystery items, no gacha, no paid re-rolls, no "chance to win"; Float and Weight are never sold; no purchase raises any Stock Credit ratio or cap beyond the published Season Pass entitlement; no purchase touches BELL emission (ADR sections 2, 5; legal-eu#25). Expected split ~55% ads / 45% IAP; payer target ≥ 2% (idle-design#26).

## Cosmetics, Charters and the BELL display

Charters are the cosmetic layer: eleven sector skins per Season, IPO plaques (engraved with the IPO number and Float, never a dollar figure), a Time Capsule that freezes a prestige run's skyline as a viewable card, a ticker-style nameplate (letters only, 3-12 characters, profanity-filtered, no `$` prefix allowed), and Syndicate banners. On Android and the Exchange Floor web hub, Charters are minted as ERC-1155s by burning BELL; on iOS the same items are sold for Gems and the Charter tab shows BELL read-only (ADR section 3, D12). The Charter tab shows: BELL balance (off-chain until Phase 3, then on-chain claimable per season), Seat status (T0/T1/T2 as "Playing / Wallet linked / Verified"), the credential copy, and the mint/burn counters published in the Earnings Call. It never shows a price, a chart or a conversion.

## Screens and navigation

Bottom bar: **Home · Sectors · Reports · Events · More**. Go Public is a persistent button on Home. More holds Index (after Index Inclusion), Vault (after first IPO, self-declared 18+, eligible jurisdiction; otherwise absent), Charter, Settings, and a link to the Exchange Floor. Every screen is reachable in ≤ 2 taps from Home; back always returns to Home.

- **Home.** The skyline, Cash and rate, Warehouse state, the Boost button, the Go Public button with its delta, and the Compounding Cycle checklist. The screen a player opens and leaves in 90 seconds.
- **Sectors.** Eleven sector cards for the current Market: owned count, milestone bar, unit cost, bulk-buy row, Manager and Reinvest controls, the Skip offer when a wall is active. Market switcher once Europe opens.
- **Reports.** Analyst Reports per sector and Bellwether Reports sorted by affordability, each with price and effect; the Golden Charter set with its 11 slots.
- **Go Public.** Float held, Float on offer, resulting multiplier, the delta, the confirm button, the Float shop.
- **Index.** Weight held and lifetime, the Weight shop, Markets, the CFO threshold, Syndicate membership.
- **Events.** Sector Sprint ladder, Season track, Morning Brief, Earnings Season when live, the theme vote.
- **Vault.** Stock Credit pending and settled, the day/season/year cap meter, verification status, redemption history, delivered holdings as reported by the licensed partner, the positioning line. No trade link, no prices, no performance.
- **Charter.** BELL, Seat status, Charters owned, minting (Android/web) or Gem purchase (iOS), the credential copy.
- **Settings.** Number format, audio, haptics, reduced motion, text size, language, jurisdiction, hide-Vault toggle, data and account controls, the published rules (Bell Rule, emission table, enforcement counts).
- **Exchange Floor (web hub).** Robinhood Wallet linking (WalletConnect + SIWE), seasonal BELL claims, Charter minting, Syndicate founding, the monthly Earnings Call (pool, accruals, rates, Seats, mint/burn, enforcement counts) and the rules archive. Branded Bellwether, marked "Built on Robinhood Chain" and nothing more.

## UX flows and on-screen copy

Copy rules applied throughout: "Stock Tokens", never "tokenized stocks"; rewards are "promotional, taxable, may fall in value", never "free"; no "earn", "invest", "price", "buy", "sell", "return" or "profit" in any value-layer string (the game's own "profit" appears only on generator cards); no confetti, no animation on value screens beyond a fade; the positioning line appears on the store listing, on the first-run consent screen and on the Vault reveal (ADR section 1). Two locked versions of the positioning line exist:

- US/RoW: "Bellwether is a game about patience. Member rewards are cents to a few dollars a year, paid in real fractional ETF shares or Stock Tokens by a licensed partner. The point is a first, small, boring, diversified holding, not trading."
- EEA: "Bellwether is a game about patience. Member rewards are cents to a few euros a year, paid by a licensed partner. The point is a first, small, boring, diversified holding, not trading." (No "shares", no named instrument; legal-eu#13; ADR D16.)

### Age self-declaration (first launch, before the game)

Screen title: "Before you start". Body: "Enter your date of birth. Bellwether keeps only your age band, never the date." Date picker; button "Continue". The screen is neutral: it never hints that any age unlocks anything. Under the minimum (13 US, 16 EEA default or the member-state age): "Bellwether is not available for your age. Nothing was saved." Consent screen follows with terms, privacy and the positioning line as plain text.

### Vault reveal (day 7, after ≥ 1 IPO, self-declared 18+, eligible jurisdiction)

A single card in More, no badge, no push notification. Title: "The Vault". Body: positioning line; then "Stock Credit accrues only when you choose a rewarded video or make a purchase, at published ratios. It never changes how the game plays. Rewards are promotional, taxable and may fall in value. No security is recommended; this is a promotional loyalty reward." Buttons: "Open the Vault" / "Hide the Vault" (reversible in Settings). Inside: "Pending: $0.00 · Verified accounts redeem from $5.00 · Daily cap $0.10 · Season cap $4.00 · Year cap $50.00". In UK/CA/CH/UAE and for under-18s the tab is absent; Stock Credit shows in Settings as "Loyalty credit converts to Gems at 2×".

### Verification T1 (wallet link for BELL claims, Exchange Floor or Charter tab on Android)

Title: "Claim BELL on Robinhood Chain". Body: "BELL is a membership credential. It has no price. Transfer to other people is not planned and may never be enabled. No token sale or airdrop will ever be announced as a reward." Steps shown as a list: "1. Device check (a few seconds). 2. Link Robinhood Wallet, or create a Bellwether wallet. 3. Sign a message to prove the wallet is yours." Buttons: "Link Robinhood Wallet" / "Create a Bellwether wallet" / "Not now". Failure copy: "This device did not pass the integrity check. You can keep playing; claims need a device that passes." Success: "Wallet linked. Your BELL claim opens at the end of the season."

### Verification T2 (first redemption)

Title: "Redeem Stock Credit". Body (US): "To redeem, a licensed partner must verify you. You will open a Vault account with [Broker], a FINRA member. Bellwether never sees your documents; it receives only a confirmation that you are verified, 18 or over and eligible. About four minutes." Body (EEA): "To redeem, a licensed partner must verify your identity, age (18+) and residence. Bellwether receives only a confirmation." Requirements list: "Verified account · 14 active days · $5.00 pending · one destination per person". Button: "Start verification with [Partner]". The partner's own flow runs in its hosted surface. Outcomes: "Verified. Your Seat is active." / "Under review by [Partner]; usually within 2 business days." / "Not eligible. Your pending credit converts to Gems at 2×."

### First redemption and settlement

Screen: "Redeem $5.00 → your Vault". Body: "Redemptions sit 7 days pending, then settle on the next Settlement Day (weekly). Credit from purchases vests after 35 days." Button: "Redeem". Settlement notification (in-app only, no push): US: "Vault opened. $5.00 arrived as cash. Choose an ETF inside your broker account whenever you like." EEA SOLO: "EUR 5.00 arrived in your wallet from [Partner]. Hold, withdraw or swap it in your wallet." (No instrument names, no links.) EEA PARTNER: "[Partner] has delivered your reward to your account. See it in the [Partner] app." No confetti, no sound.

### ETF choice (US, rendered inside the broker's hosted surface; our framing screen precedes it)

Framing screen: "Your credit is cash in your Vault until you choose. The S&P 500 ETF is the no default election (AM-1). Eleven sector ETFs are available. No security is recommended; this is a promotional loyalty reward. Holdings are subject to a 3-trading-day sell lock and a 30-day withdrawal lock, and may fall in value." Button: "Choose in your Vault". The broker's list shows twelve names with sector labels only, no prices, no performance, no charts, no ordering by anything but the fixed list; confirm reads "Apply $5.00 to [ETF]". Returning to the game: "Applied. Your Vault shows the holding on Settlement Day."

### Rejected or forfeited credit, and appeal

Card in the Vault: "Pending Stock Credit ($3.40) was forfeited on 2027-06-12. Reason: duplicate Seat (a second account presented the same verification). BELL on this account is frozen." Button: "Appeal (14 days)". Appeal form: free text up to 1,000 characters plus "Which account is yours?" selector. Confirmation: "A person reviews every appeal. Decision within 14 days, in this tab." Outcomes: "Appeal upheld. $3.40 restored to pending." / "Appeal declined. The forfeiture stands; the game remains fully playable." Quarterly enforcement counts link to the Earnings Call.

## Accessibility and localisation

Colour-blind-safe sector accents with pattern fills on progress bars; no meaning carried by colour alone; text contrast ≥ 4.5:1; dynamic type to 200% with layouts that reflow rather than truncate numbers; screen-reader labels that speak scale names ("1.2 trillion"); reduced-motion mode removes skyline animation and cycle bars; every action is a tap or a switch, nothing timed, no drag; primary actions in the lower 60% of the screen; partner-hosted Vault and verification surfaces meet WCAG 2.2 AA by contract. Localisation: ICU message format and plural rules; locale number formatting with a Settings override for short-scale names or scientific notation; Phase 0 ships English and Canadian French; Phase 1 adds German, Dutch, Lithuanian, Spanish, Portuguese and Italian; Japanese and Korean follow in Phase 5. Value-layer strings are locked per jurisdiction, translated by a counsel-reviewed vendor and back-translated, never machine-translated; jurisdiction is set by IP plus KYC country and shown in Settings.

## Balancing methodology

**Simulation harness.** A headless, deterministic simulator built from the shared economy code (BreakInfinity.cs) runs player personas over 60 simulated days: Watcher (4 sessions/day, 6 min, greedy payback-ranked purchases, takes every rewarded offer), Checker (2 sessions/day, 4 min, no ads), Grinder (12 sessions/day, 10 min), Lapser (skips days 2 and 4), Payer (Founder's Pack at minute 3, Season Pass day 7). Outputs per persona: time to each sector, wall lengths, time to first IPO, Float and multiplier curves, IPO count, Index Inclusion day, ad offers seen versus taken, Gems sinks. Assertions: first IPO in 2.5-3.5 h, Wind Farm ≤ 25 min, Credit Union wall 30-60 min, Apartments day 2, Radio Station day 4-5, Index Inclusion day 10-14, no wall longer than 14 h for the Watcher, no session without a purchase for the Checker.

**Pre-tune result.** With the ADR ladder, K_Home = 1e14 and a Watcher persona, the harness lands the first 50-Float IPO around 12-16 h elapsed (the evening of day 1), day-7 Float ≈ 2e4 and day-14 Float ≈ 1.8e6; the day-7 and day-14 targets hold, the first-IPO window does not. The first Phase 0 tuning task is therefore to lower K_Home (expected range 1e12-1e13) and raise the Weight divisor from 1e4 in step so Index Inclusion stays at day 10-14; the alternative, raising tier 1-6 output, changes the ADR ladder and is not preferred.

**Tuned in soft launch (Canada/NZ, Phase 0).** K per Market; the Weight divisor; r for tiers 7-11 (±0.02); Manager cost multiplier (8-12×); Report prices (30-70× unit cost); milestone thresholds for tiers 9-11; base offline cap (6-10 h); first-interstitial timing (60-120 s) and first-interstitial session (3-5); Boost and Skip caps; Founder's Pack timing (third sector versus first Manager); Season Pass offer day. Each parameter is server-configured and changed one at a time per weekly sprint with 1/5/20/100% rollout, measured on D1, D7, session length, rewarded opt-in and gross ad ARPDAU (Kolibri's D1-first prototyping, idle-design#17, #30).

**D1 kill criterion.** Measured on ≥ 2,000 installs per cohort over 14 days in a tier-1 English market with no value feature present. D1 ≥ 40% and D7 ≥ 15% pass Gate 0 (with gross ad ARPDAU ≥ $0.03, opt-in ≥ 45%, crash-free ≥ 99.5%, replay divergence < 0.1%); D1 35-40% means iterate the game only, no value layer; D1 < 35% means no reward layer ships, at all, and the project is a game or nothing (C6; ADR section 9).

## Analytics events

Every event carries `session_id`, `server_ts`, `market`, `run_number`, `elapsed_since_install`, jurisdiction band and platform; value-layer events never carry identity documents or wallet private data.

| Event | When | Key properties |
|---|---|---|
| `session_start` / `session_end` | Foreground/background | `session_index`, `duration_s`, `offline_hours_counted` |
| `age_declared` | First launch | `age_band` (under-min / min-17 / 18+) |
| `generator_buy` / `sector_opened` | Unit purchase / first unit of a tier | `tier`, `qty`, `source` (manual / reinvest / seed), `owned_after`, `elapsed_s` |
| `manager_hired` / `reinvest_toggle` | Automation change | `tier`, `state`, `reserve_pct` |
| `report_buy` | Analyst or Bellwether Report | `type`, `tier`, `level`, `price` |
| `milestone_hit` | Any milestone | `tier`, `threshold`, `kind` |
| `wall_enter` / `wall_exit` | Cheapest payback crosses 10 min | `tier`, `wall_duration_s` |
| `ipo_preview` / `ipo_confirm` | Go Public screen / IPO | `float_offered`, `float_held_after`, `lifetime_cash`, `run_duration_s` |
| `float_spend` / `weight_spend` / `index_inclusion` / `market_opened` | Prestige layers | `item`, `cost`, `weight_total`, `market` |
| `warehouse_return` | Warehouse Report | `hours`, `cap`, `cash`, `x2_offered`, `x2_taken` |
| `ad_offer_shown` / `ad_opt_in` / `ad_ssv_credited` / `ad_declined` / `interstitial_shown` | Ad funnel | `placement`, `network`, `credited_index_today`, `seconds_into_session`, `skipped_at_s` |
| `iap_offer_shown` / `iap_purchase` / `iap_refund` | Store | `sku`, `price_usd`, `trigger` |
| `cycle_complete` / `brief_task_complete` / `brief_reroll` | Daily loops | `task_id` |
| `sprint_join` / `sprint_tier` / `season_level` / `syndicate_join` | LiveOps | `event_id`, `tier`, `level` |
| `vault_reveal_seen` / `vault_opened` / `vault_hidden` | Vault | `jurisdiction_band` |
| `t1_start` / `t1_linked` / `t1_failed` / `t2_start` / `t2_result` | Verification | `wallet_kind`, `integrity_result`, `partner`, `result` |
| `redemption_request` / `redemption_settled` / `etf_choice_made` | Redemption | `amount_cents`, `pending_days`, `choice_index` (0-11, no ticker) |
| `credit_forfeited` / `appeal_opened` / `appeal_result` | Enforcement | `reason_code`, `result` |
| `checkpoint_divergence` | Server replay mismatch | `divergence_pct`, `action` |

Dashboards: D1/D7/D30 by cohort, time-to-first-IPO distribution against the 2.5-3.5 h target, wall-length histograms per tier, rewarded opt-in by placement, Vault reveal-to-open rate (expected to be a minority), and verification pass rates feeding Gate 2.

## B.1 Currency map

Bellwether runs three ledgers with zero arithmetic between them (C2; ADR section 5): the closed-loop game currencies, the BELL credential token, and the Stock Credit loyalty ledger. Play earns Cash, Float, Weight and BELL; only money events earn Stock Credit; neither BELL nor Stock Credit ever changes a generator, a cost curve, a prestige formula, an accrual ratio or a cap. The only element shared across ledgers is the Verified Seat: a banned sybil loses all three.

| Currency | Kind | How earned | How spent | Transferable? | Legal category | Cap |
|---|---|---|---|---|---|---|
| Cash | Run currency | Generator production; offline yield (8 h base, 16 h with Weight, 24 h with ad-removal); rewarded x2 boosts; milestones | Generators, Managers, Analyst Reports, sector unlocks | No; resets at IPO | Closed-loop game value, no cash value | None (break_infinity.js; 1e308 layer wall reserved, F23) |
| Float | Prestige-1 currency | Go Public: `floor(150 * sqrt(L / K_world)) - Float_claimed`, K_1 = 1e14 | Warehouse hours, starting cash, unlock discounts, instant Managers; +2% all profit per Float held | No | Closed-loop; never purchasable | None |
| Weight | Prestige-2 currency | Index Inclusion at lifetime Float >= 1e6: `floor(cbrt(lifetime_Float / 1e4))` | Prestige Exponent steps, Market unlocks; passive +10% Float effectiveness and +1 h offline per lifetime Weight | No | Closed-loop; never purchasable | None |
| Sprint Scrip | Weekly event currency | Event-sector production during a Sector Sprint | Event track: Golden Charter, cosmetics | No; expires at Sprint end | Closed-loop | Per event |
| Gems | Hard currency | IAP packs; Stock Credit conversion at 2x (UK/CA/CH/UAE and under-18); Season Pass track | Golden Charters, time warps, cash infusions, Charter cosmetics (iOS parity) | No | Closed-loop virtual currency; non-convertible, outside money transmission (F11); never expires (Apple 3.1.1) | Purchases $200/day/account; no balance cap |
| Stock Credit | Promotional loyalty credit in USD or EUR cents | Only monetizing events: SSV-verified rewarded views, 5% of net IAP/subscriptions, Season Pass daily bonus, escrowed sponsor drops, one Sign-up Grant | Redeemed at >= $5 / EUR 5 by a licensed party into the Vault (US) or the player's own wallet (EEA, RoW); Gems at 2x elsewhere | No; one destination per Seat | "No cash value until redeemed"; prize/award income at FMV on delivery (US, F12); recipient-assessed (EU) | $0.10/day, $4/season, $50/year; with Season Pass $0.15/$6/$60; annual ceiling $83 including Grant and drops |
| BELL | ERC-20 on Robinhood Chain (4663), bound-transfer | Fixed per-milestone accrual (Cycle, IPO, Sprint, Index Inclusion); minted at the season Merkle claim for T1+ accounts | Burn sinks only | Only between wallets registered to the same Seat (<= 3) and to sinks; never P2P | SEC-CFTC digital tool (F10); MiCA Art 4(3) utility token never admitted to trading (F13); UK limited-use, non-transferable (legal-eu#33) | 150/day, 8,000/season per Seat; season ceiling 20,000,000 x 0.95^n; hard cap 1,000,000,000 |
| Charters | ERC-1155 cosmetics | Burn BELL; or Gems (iOS parity) | Equipped; never unlock features | Same bound rule as BELL | Digital collectible (F10) | Per design |

## B.2 Faucets and sinks

### Cash

| Faucet | Rule |
|---|---|
| Production | `production = base_profit * owned * multipliers`; constants per the ADR tier table; milestones x2 profit at 25/50/100/200/300/400 then every 100, x2 speed at 25/50/100 on tiers 1-4; Sector Synergy +0.5% per 100 owned; +2% per Float held; Golden Charter x7.77 (full set x10) |
| Offline | 8 h at 100%, +1 h per lifetime Weight to 16 h, 24 h with ad-removal; server clock only |
| Rewarded video | x2 profit 15 min (4/day); 4 h skip (2/day); x2 offline (1/session); Report re-roll (1/day); hard cap 8/day, first 6 count for Stock Credit, 2-min cooldown, SSV-only |
| Gem cash infusion | 2 h of current rate for 60 Gems, max 3/day |

| Sink | Price |
|---|---|
| Generator unit | `cost_next = base * r^owned`, bulk-buy closed form; sector unlock = the tier's first unit |
| Manager | 10x the sector's base cost; enables Reinvest |
| Analyst Report (x3, 3 per sector) | ~50x current unit cost |
| Bellwether Report (x2 global) | At lifetime Cash 1e6, 1e12, 1e18 ...; 10% of lifetime Cash at unlock |
| IPO | Resets Cash to zero (or the starting-cash % bought with Float) |

### Float

| Faucet | Rule |
|---|---|
| Go Public | `floor(150 * sqrt(L / K_world)) - Float_claimed`; first IPO ~50 Float at L ~1.1e13, 2.5-3.5 h elapsed; K tuned per Market |
| CFO | Auto-IPO at a chosen Float target; unlocks with Index Inclusion; no bonus |

| Sink | Price |
|---|---|
| Warehouse hours | 10 Float per +1 h offline, max +4 h per run (total offline never exceeds 24 h) |
| Starting cash | 5 Float per 1% of the previous run's final Cash, max 20% |
| Unlock discount | 25 Float per -5% on sector unlock costs, max -30%, persistent per Market |
| Instant Managers | 5 Float each, tiers 1-4, at run start |

Spending Float lowers the +2% profit bonus, so every purchase is a real trade-off. Float is never sold and never granted by BELL, Stock Credit or a sponsor drop.

### Weight

| Faucet | Rule |
|---|---|
| Index Inclusion | `floor(cbrt(lifetime_Float / 1e4))` at lifetime Float >= 1e6 (day 10-14); ~8x Float to double |

| Sink | Price |
|---|---|
| Prestige Exponent 0.50 -> 0.55 in 0.01 steps | 5, 10, 20, 40, 80 Weight (155 total) |
| Europe Market | Lifetime Float 1e6 plus 10 Weight |
| Asia Market | Lifetime Float 1e9 plus 50 Weight |

Passive Weight bonuses (+10% Float effectiveness, +1 h offline) key off lifetime Weight, so spending Weight on the Exponent never reduces them.

### Gems

Pack ladder (Apple tiers, matching the Part A catalogue): $1.99 = 120 Gems; $4.99 = 350; $9.99 = 800; $19.99 = 1,800; $49.99 = 5,000. The reference value is $0.01 per Gem (the largest pack). Stock Credit converts to Gems at 2x reference value: $1.00 of credit = 200 Gems.

| Faucet | Amount |
|---|---|
| IAP packs | Ladder above; $200/day purchase limit per account |
| Stock Credit conversion (UK/CA/CH/UAE, under-18, EEA fallback) | 200 Gems per $1.00 / EUR 1.00 of credit, granted in whole Gems as the fractional balance crosses 1 |
| Season Pass track | Up to 150 Gems per 30-day Pass, at published track steps |

| Sink | Price |
|---|---|
| Golden Charter (x7.77 one sector) | 300 Gems |
| Time warp 4 h / 24 h | 60 / 250 Gems |
| Cash infusion (2 h of current rate) | 40 Gems, max 3/day |
| Charter cosmetics, iOS parity | Sector skin 200; IPO plaque 120; Time Capsule 400 |

Non-Gem IAP: Starter pack $2.99 (permanent x3 plus one Golden Charter, offered once at the third sector unlock); ad-removal $3.99/30 d or $0.99/7 d with 24 h offline; Season Pass $4.99/30 d. No loot boxes, gacha, paid random items, Float packs or Weight packs (C1; legal-eu#25).

## B.3 BELL specification

### Purpose and legal category

BELL is a membership credential earned by playing. It buys ad replacement, cosmetics, nameplates and Syndicate charters; it is never sold, never priced, never redeemable for Stock Credit, stock, cash or Gems, and never raises any accrual ratio (ADR section 5). Its reason to exist on Robinhood Chain is that it can sit in the player's Robinhood Wallet as a verifiable record of play without being tradeable.

US: a digital tool under the SEC interpretive release the CFTC joined (F10; p2e#30): practical function, no yield, never sold, never marketed with appreciation. The airdrop interpretation does not cover an earned token (legal-us#20), so status rests on the digital-tool category plus the absence of any investment-contract promise, which the comms policy below enforces. A closed loop with no outside market keeps it outside FinCEN administration (F11) and inside the NY BitLicense and California DFAL gaming exclusions, with NY on-chain claims off until counsel confirms. EU: a MiCA utility token for a service already in operation (Art 4(3); F13); it is not "offered for free" because sign-up data is collected (economics missed), so the existing-utility hook is the exemption relied on, Art 4(5) covers our own claim and sink contracts, and it is never admitted to trading (Art 4(4)): transferability is the one feature that would void the analysis. UK: non-transferable and limited-use, outside "qualifying cryptoasset"; never marketed as crypto there.

### Contract design

**Token constants.** Name "Bellwether", symbol BELL, 18 decimals (matches Stock Tokens and wallet tooling; emission amounts are whole BELL and the UI shows integers), EIP-712 domain "Bellwether" version "1" (fits OpenZeppelin 5.7.0's 31-byte ShortString, tech missed). Hard cap 1,000,000,000 BELL enforced by `ERC20Capped._update`. OpenZeppelin 5.7.0 `ERC20Capped + ERC20Permit`; no proxy, admin role, pause or blacklist. Three immutable constructor addresses: `EMISSION` (the only minter), `SEATS` (SeatRegistry proxy) and `SINKS` (SinkRegistry proxy). MINTER_ROLE is not a role but the immutable `EMISSION` address, so nobody can ever grant a second minter.

**Bound-transfer hook.** The `_update` override consults the two registries and nothing else:

| Path | Condition | Effect if false |
|---|---|---|
| Mint (`from == 0`) | `msg.sender == EMISSION` and `SEATS.seatOf(to) != 0` | Revert `BELL: mint` / `BELL: unregistered` |
| Burn (`to == 0`) | `SINKS.isSink(from)` (a sink burning its own balance) | Revert `BELL: burn` |
| Transfer | `seatOf(from) != 0` and (`SINKS.isSink(to)` or `seatOf(to) == seatOf(from)`) | Revert `BELL: frozen` / `BELL: bound` |

`approve`, `permit` and `transferFrom` work unchanged, but because the hook checks the destination, an allowance can only ever move BELL to a sink or to the same Seat's other wallets. A Seat whose registration is revoked (duplicate, fraud ladder) has `seatOf == 0` on every address, so its minted BELL cannot move even to a sink: that is the on-chain meaning of "BELL frozen", achieved without any freeze function on the token.

**SeatRegistry (opaque).** Stores only `seatId (bytes32, random) -> address[<=3]` and `address -> seatId`. Writes come from a `REGISTRAR` backend key after T1 checks, limited to one registration per address per 7 days (the ADR's cooldown) and withheld for NY-jurisdiction Seats until counsel clears; jurisdiction is checked off-chain and the registry never sees it. `rotate(seatId, oldAddr, newAddr)` supports GDPR erasure once the old address holds zero BELL. No hash of any identity attribute ever touches the chain (F17; EDPB v2.0).

**Emission and Merkle claim.** Balances accrue off-chain for every account (bots cost no gas). At season end the operator key (2-of-5) posts `SeasonRootPosted(season, root, total, ceiling)`; claims open 7 days later, after the Earnings Call publishes the root. `claim(season, index, account, amount, proof)` follows the Uniswap merkle-distributor pattern with a claimed bitmap (tech#35). On-chain checks: `total <= ceiling[season]` at posting and `mintedInSeason[season] + amount <= ceiling[season]` at claim. `ceiling[n]` is a 40-season table deployed at construction as `20,000,000 x 0.95^n` in whole BELL; `reduceCeiling(n, v)` through the timelock can only lower a future season. Roots stay claimable for two further seasons; the underlying accrual expires 180 days after last login and is never re-minted.

**Sinks.** Each sink is a small contract registered in `SinkRegistry` (proxy behind the timelock). It receives BELL via `transferFrom` (or `permit` for gasless spends), emits `Sunk(seatId, sinkId, amount, ref)` and burns in the same transaction; `ref` is the game-side receipt (boost id, Charter token id, nameplate hash) consumed idempotently by the backend. Sinks never hold a balance across blocks.

**SponsorEscrow and PayoutLedger.** `PayoutLedger.postMonth(month, root, poolCents, accrualCents, settledCents)` records the Bell Rule inputs and a Merkle root over `{seatId, month, accrued, settled}`; `SponsorEscrow.commit(dropId, termsHash, escrowCents, objectiveHash)` is posted before a drop is announced and `allocate(dropId, root, seats)` after. Neither holds value (escrow cash sits with Bellwether Rewards LLC, or as USDG/EURC in a multisig for on-chain sponsors); they exist so anyone can audit that payouts matched the published rule.

**Events.** `Minted(seatId, to, season, amount)`, `Sunk(seatId, sinkId, amount, ref)`, `SeatRegistered(seatId, addr)`, `SeatAddressRemoved(seatId, addr)`, `SeatRevoked(seatId)`, `SeasonRootPosted(season, root, total, ceiling)`, `SeasonCeilingReduced(season, old, new)`, `MonthPosted(month, root, pool, accrual, settled)`, `DropCommitted(dropId, termsHash, escrow)`, `DropAllocated(dropId, root, seats)`, `MigrationDeclared(chainId, snapshotBlock)`.

**Immutability and upgrade stance.** The token is immutable; a mistake in it is fixed by a new token, never by an admin. Periphery (SeatRegistry, Emission, SinkRegistry and sinks, SponsorEscrow, PayoutLedger) is UUPS behind a 3-of-5 Safe and a 7-day `TimelockController` (tech#37); every queued upgrade is announced in-app, on the web hub and in the Earnings Call at queue time. Operational writes (season and month roots, registrations) use a separate 2-of-5 operator key with no upgrade power. No function can mint outside a season root, raise a ceiling, move BELL between Seats or pause the token.

**Gas.** Claims and sink spends are ERC-4337 UserOperations sponsored through Alchemy Gas Manager (8% overhead, tech#23) or ZeroDev against EntryPoint v0.7 `0x0000000071727De22E5E9d8BAf0edAc6f37da032`, which Robinhood's account-abstraction docs publish alongside Alchemy, ZeroDev, Privy and Dynamic as paymaster providers (tech missed). Target: a claim under $0.01 all-in at ~$0.001 median fees. Embedded EIP-7702 wallets are provisioned only for claimers; Robinhood Wallet links via WalletConnect plus SIWE (tech#21).

**Chain-filter contingency and Arbitrum One migration rule (published before Phase 3).** Robinhood's sequencer can hash-list addresses and the ArbOS 61 `ArbFilteredTransactionsManager` precompile can force-fail any transaction (tech#5). The rule: (1) the off-chain ledger is authoritative at all times; (2) if any Bellwether contract on 4663 is rejected by chain policy or force-failed for more than 72 consecutive hours, or Robinhood notifies us of a filter, `MigrationDeclared` is posted where possible and announced everywhere with 30 days' notice unless the filter is total; (3) the pre-audited mirror (identical bytecode) is deployed on Arbitrum One (~$0.004 fees, BoLD permissionless validation, tech#8); (4) the mirror's Emission contract performs a one-time migration mint from a published snapshot root of 4663 balances at the last finalized block before the filter, to the same registered addresses, outside the season ceiling and inside the hard cap; (5) the 4663 contracts are abandoned, never bridged. Robinhood Wallet supports Arbitrum, so the player's wallet keeps working (tech#21). An assurance from Robinhood is a PARTNER-only ask we never wait on (ADR D13).

**Audit plan and cost.** Scope ~1,500 nSLOC: token (~150), SeatRegistry, Emission with Merkle claim, SinkRegistry plus five sinks, SponsorEscrow, PayoutLedger, and the Arbitrum One mirror as the same bytecode. Boutique tier, $10,000-25,000 (F24; tech#36): one full pass (~$15,000), fix cycle, one re-audit (~$5,000), public report; 8-14 weeks end to end, so booking happens in Phase 1 for a Phase 3 deployment. Each later periphery upgrade takes a $5,000-20,000 re-audit before it leaves the timelock. Testnet 46630 runs two full season cycles before mainnet.

### Emission

Amounts are fixed per milestone, published 30 days before each 90-day season, immutable within it, and identical for every account (C1). Nothing for referrals, installs, posts, purchases, streaks or score (legal-us#31-32; F22). No genesis, no retroactive grant, no airdrop.

| Milestone | BELL | Frequency limit | Max per Seat per 90-day season |
|---|---|---|---|
| Compounding Cycle (collect, reinvest all, one Report) | 10 | 1/day | 900 |
| IPO (Go Public) | 25 | max 2/day counted | 4,500 |
| Sector Sprint participation | 100 | 1/week | 1,300 |
| Index Inclusion | 250 | once per Market (3 Markets) | 750 |
| Per-Seat caps | | 150/day | 8,000/season |

| Global limit | Rule |
|---|---|
| Season ceiling | 20,000,000 x 0.95^n for season n (n = 0 at Phase 3): 20.0M, 19.0M, 18.05M, 17.1M ... 10.8M in season 13, 2.6M in season 40 |
| Lifetime via ceilings | Sum of the series = 400,000,000 (40% of the hard cap); the ceiling table is downward-only, so 400M is the effective lifetime maximum |
| Split of whatever is minted | 90% player emission (milestones above); 10% LiveOps/sponsor reserve minted only through published events (Index Sprint cooperative rewards, PARTNER Robinhood Wallet quests), capped at 10% of each season's ceiling and counted inside it |
| Season Emission Meter | Counts T1 accruals in real time; at the ceiling, accrual halts for every account for the rest of the season (in-app meter). Accounts reaching T1 after the halt carry pre-halt accruals into the next season's claim against that ceiling; nothing earned is reduced |
| Sizing rule | Season n+1 amounts are set so projected T1 accrual is 60-80% of ceiling[n+1]; at launch the table above stands, since 100 T1 accounts x ~3,500 BELL is under 2% of the ceiling |
| Mint/burn trigger | Evaluated on day 60 of each season on season n-1 actuals and season n to date: if minted BELL exceeded sunk BELL by more than 2:1 in both, season n+1 amounts are published at half (ADR D15; Axie's 4x signal, p2e#3) |
| Expiry | Unclaimed accruals expire 180 days after last login; claimable roots stay open two seasons |

### Utility and sinks

All consumptive, deterministic, and none touching Stock Credit. On iOS the app shows BELL read-only; spending happens on the web hub (Exchange Floor) or in Robinhood Wallet (Apple 3.1.1). Android files the Financial Features declaration. No cross-app composability.

| Sink | Price (BELL, burned) | Notes |
|---|---|---|
| Ad replacement | 200 per x2-profit 15 min or 4 h skip | Android and web only; earns zero Stock Credit; the floor utility, priced at roughly one rewarded view |
| Charters (ERC-1155 cosmetics) | Sector skin 500; IPO plaque 300; Time Capsule of a prestige run 1,000 | Never unlock features; also Gems for iOS parity |
| Ticker nameplate | 5,000 (1-2 characters); 2,000 (3); 500 (4); 50 (5+) | Preset character set; profanity filter |
| Syndicate charter | 500 to found; 100 locked per season to join (returned on leaving) | Preset stickers only, keeping the app outside DSA "online platform" scope (legal-eu#20) |
| Season Ladder ticket | 20 | Cosmetic prizes only, deterministic ladder |
| Sector Sprint theme vote | 0 | One per T1 account, balance-independent, advisory |
| PARTNER: Robinhood Wallet quests | 0 | BELL tiers as quest credentials; Robinhood would have to build (robinhood#15) |

A committed player accrues roughly 3,000-4,000 BELL per season and can sink all of it: 15-20 ad replacements, or a full Charter set plus a nameplate. The 2:1 mint/burn trigger exists because sinks alone did not save SLP (p2e missed).

### Transferability review: the five gates and the disclosure

P2P transfer is reviewed no earlier than 12 months after mainnet (Phase 5, 2028), only if all five gates hold, and may never be enabled:

| Gate | Test |
|---|---|
| (a) Data | 12 months of published emission and sink data in the Earnings Call |
| (b) Opinions | Written US and Lithuanian opinions that transferability does not change the digital-tool and Art 4(3) classifications |
| (c) Scale and sybil | >= 100,000 Verified Seats and an external sybil audit with a published fake-Seat rate |
| (d) Demand | >= 50% of trailing-90-day emission consumed by sinks |
| (e) Law | Regulation Crypto Assets (comments closed 2026-10-20) and CLARITY (cloture 2026-09-15) outcomes known (F10; legal-us#21, #24) |

Even if every gate passes, the studio never lists BELL, seeds liquidity, pays a market maker, quotes a price, buys back, or announces a TGE. Player-facing copy at first claim, in the Vault tab and on the web hub, verbatim: "BELL is a membership credential. It has no price. Transfer to other people is not planned and may never be enabled. No token sale or airdrop will ever be announced as a reward." Any employee, partner or influencer statement implying appreciation is a breach of the comms policy filed with the FTC substantiation file (legal-us#29).

### Why this cannot become Hamster Kombat

Every engagement-minted tradeable token in the record fell 95-99.9% because supply scaled with headcount, demand was the next player's belief, and a TGE was the reason to play (F18; p2e#1, #12, #14, #16). BELL removes each input: no price to promote and no venue to sell on; emission fixed per milestone, capped per human through the Seat, capped per season by a decaying ceiling that halts rather than dilutes, and halved when sinks fall behind; nothing unearned ever minted, so no allocation to dump and no eligibility rule to change late (p2e#11); rules published a season ahead and never altered retroactively (precedents#31); minting only to attested T1 accounts, so bots earn boosts, not a stock claim; and every cent of real value flowing through Stock Credit from banked revenue, indifferent to BELL. A farm that beats every control ends up with cosmetics.

## B.4 Stock Credit ledger

### Accrual events and geo tiers

Stock Credit accrues only from the allowlisted deterministic event types below; RNG-dependent code paths are compile-time excluded from the Stock Credit and sponsor-drop services (C1). Nothing for logins, streaks, tasks, referrals or posts (F7; F9).

| Event | Ratio | Tier US | Tier EEA (per enabled member state) | Tier RoW (2028) | Tier X: UK, CA, CH, UAE, under-18 |
|---|---|---|---|---|---|
| SSV-verified rewarded view (first 6/day, >= 2 min apart) | 20% of trailing-30-day net rewarded eCPM / 1,000 | $0.00264 at $13.20 net | EUR 0.00123 at EUR 6.16 net (blended); Ireland higher at ~$12 gross | 20% of local net eCPM, capped at 0.5x the EEA rate (~$0.00053 at $2.64 net) | Same formula, paid as Gems at 2x |
| IAP and subscription (net of store fee) | 5% of net spend; vests 35 days | 5% | 5% | 2.5% | Gems at 2x |
| Season Pass | Fixed daily bonus while the Pass is active | $0.02/day | EUR 0.02/day | EUR 0.01/day | Gems at 2x |
| Sign-up Grant | Once per Seat at first redemption >= $5 | $3, paid by the delivering broker | EUR 3, paid by RHEU (PARTNER) or the CASP (SOLO) | $3 equivalent in EURC | None |
| Sponsor drop | Fixed $0.25-1.00 per qualifying Seat, escrowed first, delivered 60 days later | Yes | ETF credit via PARTNER or EURC | 2028 | None |

Per-country rates apply where a country logs >= 10,000 credited views in the trailing 30 days; below that the regional blend applies. Interstitials earn nothing and are excluded from the pool.

### State machine

| State | Meaning | Enters from | Leaves to |
|---|---|---|---|
| PENDING_UNVERIFIED | No Seat yet. Balance capped at $5 ($10 with optional World ID); accruals above the cap are not credited; the meter says "verify to continue" | Any accrual event on a T0/T1 account | AVAILABLE (Seat created); EXPIRED (180 days after last login); FORFEITED (fraud ladder, duplicate merge); GEMS (Tier X, or player chooses Gems) |
| VESTING | IAP- or subscription-derived credit inside the 35-day refund window | IAP or subscription receipt | AVAILABLE or PENDING_UNVERIFIED at day 35; VOID on refund or chargeback |
| ESCROWED | Sponsor-drop credit allocated but inside the 60-day delivery window | `DropAllocated` | AVAILABLE at day 60; VOID if the Seat is revoked before delivery |
| AVAILABLE | Seat exists; credit counts toward the $5 minimum and the caps | PENDING_UNVERIFIED, VESTING, ESCROWED | REQUESTED (player request or auto-sweep at >= $5 on Settlement Day); GEMS (player choice, or account closure below $5); FORFEITED |
| REQUESTED | Redemption of >= $5 submitted; 7-day pending; fraud review; the Grant is created directly in this state at the first request | AVAILABLE | SETTLED (next Settlement Day after day 7); AVAILABLE (review hold cleared without payment, max 14 days); FORFEITED (fraud confirmed) |
| SETTLED | Delivered by the licensed party: JNLC cash in the Vault (US), EURC to the player's wallet (EEA SOLO, RoW), RHEU credit (EEA PARTNER) | REQUESTED | Terminal; no clawback except fraud proven inside the broker's 30-day hold |
| GEMS | Converted at 2x | PENDING_UNVERIFIED, AVAILABLE | Terminal |
| EXPIRED | Pre-Seat credit 180 days after last login | PENDING_UNVERIFIED | Terminal; never re-credited |
| FORFEITED | Duplicate merge or fraud ladder; appealable 14 days | Any non-terminal state | Terminal after appeal window; reversal on successful appeal restores the prior state |
| VOID | Refunded IAP or revoked drop | VESTING, ESCROWED | Terminal |

Post-Seat AVAILABLE credit never expires while the account exists. On closure or 12 months without login after a Seat: 30-day notice, then redemption if >= $5, otherwise Gems at 2x. Regulation E and escheat status is counsel item 16; notice-then-Gems is the interim answer.

### Caps

| Cap | Base | With Season Pass | RoW (0.5x) | Applies to |
|---|---|---|---|---|
| Daily | $0.10 | $0.15 | $0.05 | Ad credits plus Pass bonus. A circuit breaker: 6 US views plus the Pass bonus reach $0.036, 24% of it |
| Season (30 days) | $4 | $6 | $2 | All accrual lines including IAP stock-back |
| Year | $50 | $60 | $25 | All accrual lines |
| Sign-up Grant | $3 / EUR 3, once per Seat | Same | $3 equivalent | Outside the pool; operating margin |
| Sponsor drops | <= $20/year | Same | 2028 | Escrow-funded |
| Annual ceiling | $83 = $60 + $3 + $20 | | | Under the $2,000 1099-MISC threshold (F12), Ireland's EUR 3,000 gift exemption and Lithuania's EUR 200-per-prize exemption (legal-eu#43-44) |

The with-Pass uplift is +50% on the daily and season caps and $10 on the annual cap ($60, not $75, because the $83 ceiling is fixed). Cap tiers follow the Season Pass entitlement only, never BELL balance (ADR Q3; Google "supplementary and subordinate", legal-us#32). A heavy US watcher (6 credited views/day all year) earns $5.78 from ads, the $3 Grant and ~$2 stock-back on $40 of IAP: ~$11; the EEA equivalent is ~EUR 2.70 plus EUR 3: ~$5-6. That is the positioning line (C6).

### Minimum redemption, tenure allowance, settlement cadence

Minimum $5 / EUR 5 per redemption. The first redemption requires the Seat and 14 active days and is limited to $10 (pre-verification credit plus the Grant); Seat months 1-3 are limited to $15/month; thereafter the caps only (the ZBD tenure pattern). One destination per Seat; every redemption sits 7 days in REQUESTED. Settlement Day is weekly (Thursday, 14:00 UTC; accrual cut-off Monday, three business days of fraud review); requests past their 7 days are batched: US, one JNLC journal file to the broker, cash credited, the player self-directs into the 12-ETF list, 3-trading-day sell lock and 30-day withdrawal lock; EEA PARTNER, an eligibility file to RHEU under its giveaway template (180-day hold); EEA SOLO and RoW, one EURC batch by the EMI/CASP to WalletConnect-proven wallets, on 4663 if EURC is deployed there, else Arbitrum One. Sponsor drops settle on the first Settlement Day after their 60-day window. Geo checks (IP plus KYC country against the RHJ Restricted Jurisdictions list, which includes Ukraine and Venezuela, tech missed) run at request time; VPN, proxy or emulator blocks the request, never play.

### Forfeiture, expiry and appeal

| Trigger | Consequence | Published |
|---|---|---|
| Second account with the same attestation | Merged into the oldest; the newer account's pending credit FORFEITED, BELL accrual dropped, Seat registration revoked (BELL frozen) | Yes |
| Fraud ladder step 1 (replay divergence, SSV mismatch, progression-sequence failure, fleet-pattern device) | Pending credit FORFEITED, unminted BELL cleared; the game stays playable | Yes |
| Step 2 (repeat) | Reward-program ban; Stock Credit and BELL accrual stop | Yes |
| Step 3 | Device and identity ban | Yes |
| IAP refund or chargeback | VESTING credit VOID; three chargebacks in 12 months = step 2 | Yes |
| Pre-Seat inactivity 180 days | EXPIRED | Yes |
| Appeal | Human review within 14 days; reversal restores the prior state plus interval accrual; quarterly counts and reversal rates published (p2e#33) | Yes |

Delivered assets are never clawed back except fraud proven inside the broker's own 30-day hold.

## B.5 The Bell Rule

Published in-app, on the web hub and in every Earnings Call (C4):

`Pool(M+1) = 0.20 x NetAds(M) + 0.05 x NetIAP(M) + Sponsor(M+1)`

**Definitions.** NetAds(M): rewarded-video cash received in month M after the mediation take (12% modelled), invalid-traffic deductions, scrubs and clawbacks, net of VAT; interstitials excluded. NetIAP(M): IAP plus subscription cash received from the stores in M after store fees (25% modelled), refunds and chargebacks, net of VAT. Sponsor(M+1): escrow already received and earmarked for drops settling in M+1 (80% of a sponsor's payment; the 20% platform fee is not in the pool). "Banked" means cash received, never accrued or invoiced; ad networks pay 30-60 days in arrears, so a month's pool is built from impressions roughly two months earlier, the lag in which invalid traffic gets scrubbed. "Net" means after every platform, network and store deduction and after refunds. Broker bounties, reserve interest, BELL and any Robinhood fee are not terms and never will be (ADR section 7; FINRA 2040, legal-us#6).

**Two sub-pools.** The rule is computed separately per settlement currency: a USD pool from US-store and US-geo revenue, and a EUR pool from EEA revenue (RoW revenue joins the EUR pool at the month-end ECB rate because RoW settles in EURC). A EUR obligation is never funded with a USD stablecoin (ADR Q2, rejected alternatives).

**Per-view rates.** Per tier and month, `rate_tier(M+1) = 0.20 x netECPM_tier(trailing 30 days ending 8 days before month start) / 1,000`, rounded down to $0.00001, then clamped to [0.5x, 1.25x] of `rate_tier(M)`; the first month has no clamp. If coverage fell below 1.0 for 14 consecutive days in month M, the pre-clamp rate is first multiplied by coverage(M), downward only. Rates are published on the 24th (7 days ahead), fixed for the month, never retroactive (JustPlay floating rate, precedents#27). A 40% eCPM collapse reaches players over two months; a 70% collapse makes ad credits sub-cent and IAP stock-back becomes the primary accrual (ADR assumption 9).

**Coverage.** `coverage(M) = Pool(M) / ExpectedPayout(M)`, where `ExpectedPayout = Seat accrual + pre-Seat accrual x trailing-6-month verification conversion` (50% at launch, published, revised quarterly from realized data). Weighting pre-Seat accrual by conversion means bot accrual cannot drive coverage down and suppress real players' rates; the $5 pre-Seat cap bounds it anyway. Coverage is published daily in-app and monthly in the Earnings Call.

**Reserve.** Bellwether Rewards LLC holds a segregated reserve (a USD bank account and a EUR balance at the EMI) equal to at least 3 months of trailing settled payouts before any ratio or cap increase (p2e#4). Seed at Phase 2 is 3x the projected first-month payout ($720 per 1,000 DAU; $72,000 at 100,000 DAU). Each month the full Pool(M+1) is transferred into the reserve; settlements draw from it. The reserve is not revenue and is disclosed monthly.

**Pool short.** Coverage < 1.0 for 14 days: accrued cents are honoured in full from the reserve; next month's rates fall by the coverage factor (floored at the 0.5x clamp); IAP stock-back and the Pass bonus are fixed by published terms and never cut mid-season. If the reserve would fall below 1 month of payouts, the Sign-up Grant pauses the following month (published as contingent), the tenure gate rises from 14 to 21 days, and sponsor drops proceed because they are escrowed. Pass terms disclose that the daily bonus for the next Pass period can be reduced with 7 days' notice.

**Pool long.** Coverage > 1.25 for two consecutive months and reserve >= 3 months: rates follow the formula upward, limited by the 1.25x clamp; no other release. Reserve above 6 months of trailing payouts is released to operating margin at quarter end and disclosed. The pool never accumulates a "jackpot"; a bigger balance never raises a cap.

**Breakage.** Expired, forfeited and voided credit leaves ExpectedPayout the day it happens; it is never booked as revenue, counted as a player payout or re-distributed as a bonus. Its cash stays in the reserve and leaves only through the 6-month release rule, disclosed as "breakage released". The model's 50% pre-verification breakage is a forecast, not a target: the meter, the $5 cap and the 180-day rule tell every player what expires and when.

## B.6 Earnings Call transparency spec

Monthly, published by the 10th for the prior month in three places at once: the Earnings Call tab under the Vault (all players, including T0), the web hub at `/earnings`, and a signed machine-readable bundle (JSON schema `earnings-call/v1` plus CSV) whose SHA-256 accompanies the `MonthPosted` root on chain 4663. Copy naming a licensed party goes through the FINRA 2210 / MiFID II Art 24 partner review.

| Section | Metrics |
|---|---|
| Revenue inputs | NetAds, NetIAP, sponsor escrow earmarked, per currency; mediation take and store fee actually paid |
| Pool | Pool(M) and Pool(M+1); share of net revenue |
| Rates | Current and next-month per-tier rates, clamp and coverage adjustment applied; stock-back ratio; Pass bonus |
| Accrual | By state; ExpectedPayout; coverage (monthly and worst 14-day window) |
| Payouts | Redemptions count and value by rail (Vault, RHEU, EURC, SEPA, Gems); median request-to-settlement days; Grants paid and by whom |
| Reserve | Months of cover; transfers in; settlements out; breakage released |
| Seats | New and total by jurisdiction; KYC pass rate; fake-Seat rate from merges and reversals |
| BELL | Accrued, minted, sunk by sink; mint/burn ratio; Season Emission Meter; next season's ceiling and amounts once published |
| Enforcement | Forfeits, bans by ladder step, appeals, reversal rate, sequencer-filter events, incidents |
| Changes | Every rate, cap, term or upgrade queued, with effective dates never earlier than 7 days out |

Nothing in the Earnings Call is a forecast of BELL value, and no metric expresses BELL in a currency.

## B.7 Worked example and stress tests

### 1,000 DAU, 30 days, SOLO, token price zero, no Robinhood (ADR section 7)

Assumptions, all stated: geo mix US 50% / EEA 25% / UK-CA-CH-UAE 10% / RoW 15%; 3.0 SSV-verified rewarded views per DAU (60% opt-in x 5 offers); gross rewarded eCPM US $15, EEA $7, UK-group $10, RoW $3 (F20; economics#1-3); mediation take 12%; interstitials 1.0 per DAU at 55% of the blended rewarded eCPM, less 12%; IAP plus subscriptions gross ARPDAU $0.030 at 2.5% payers, store fee 25%; MAU = 4 x DAU; 1.0% of MAU verify per month, concentrated where the Vault rail is live (24 US, 10 EEA, 6 RoW); 50% pre-verification breakage on ad credits; Season Pass held by 1.5% of DAU at $0.02/day; broker fee $3 per new account (unpublished, economics#24); KYC $1.85 (Sumsub Compliance, tech#33); journals $1 each; 200 sponsored claims at $0.05; the ADR's $55 line is journals $40 plus gas $10 plus paymaster overhead, RPC and root posting ~$5.

| Line | Per day | Per month |
|---|---|---|
| Rewarded gross: US 1,500 x $0.015 + EEA 750 x $0.007 + UK 300 x $0.010 + RoW 450 x $0.003 | $32.10 | $963 |
| Rewarded net of 12% mediation | $28.25 | $847 |
| Interstitials net (1,000/day at 55% of blended rewarded eCPM, less 12%) | $5.18 | $155 |
| IAP + subs gross $30.00, net of 25% store fee | $22.50 | $675 |
| **Net revenue (net ARPDAU $0.056; ad ARPDAU $0.033 net / $0.038 gross)** | **$55.93** | **$1,677** |
| Pool = 20% x $847 + 5% x $675 | | **$203 (12.1% of net)** |
| Per-view rates (20% x net eCPM / 1,000): US $0.00264, EEA $0.00123, RoW $0.00053; UK-group accrues Gems | | |
| Ad accrual: 1,500 x 0.00264 + 750 x 0.00123 + 450 x 0.00053 | $5.12 | $154 |
| IAP stock-back 5% x $675 | | $34 |
| Season Pass bonus (1.5% of DAU x $0.02 x 30) | | $9 |
| **Accrual at 100% vesting** | | **$197 (coverage 1.03)** |
| New Verified Seats: 1.0% x 4,000 MAU = 40 (24 US, 10 EEA, 6 RoW) | | |
| Sign-up Grants 40 x $3 (operating margin, outside the pool) | | $120 |
| Cash-out after 50% pre-verification breakage on ad credits: $77 + $34 + $9 + $120 | | **$240 (14.3% of net)** |
| Verification: US 24 x $3 broker fee + EU/RoW 16 x $1.85 | | $102 |
| Journals ~40 x $1; sponsored gas and claimer wallets (~200 x $0.05); overhead | | $55 |
| **Reward rail total** | | **$397 (23.7% of net)** |

The pool is 20% of ad revenue (ZBD's 10-20% guidance, F19; p2e#31) and the rail sits under Mode's audited ~25-33% bound (economics#19 and skeptic). Contribution after the rail is $1,280 per 1,000 DAU per month before backend, UA and fixed costs. Coverage sits above 1.0 only because UK-group views fund the pool while accruing Gems: 20% of UK net rewarded is $15.84, which pays the $9 Pass bonus with $6.84 spare.

### Scaled to 100,000 DAU

Every revenue and payout line scales linearly at the same mix; the non-linear items are listed beneath.

| Line | Per month at 100,000 DAU |
|---|---|
| Net revenue | $167,700 |
| Pool | $20,300 |
| Accrual at 100% vesting | $19,700 (coverage 1.03) |
| New Verified Seats | 4,000 (2,400 US, 1,000 EEA, 600 RoW) |
| Sign-up Grants | $12,000 |
| Player cash-out | $24,000 (14.3%) |
| Verification | $10,200 |
| Journals, gas, overhead | $5,500 |
| Reward rail | $39,700 (23.7%) |
| Reserve requirement (3 months) | $72,000 |
| Contribution after rail | $128,000 |

Non-linear effects: (1) Play Integrity's 10,000/day default quota covers ~4,000 T2 and ~10,000 T1 checks a month; the increase is requested in Phase 2 anyway (tech#29); (2) KYC and wallet-vendor minimums become negligible; the audit is fixed cost; (3) the per-Seat caps stop binding: 48,000 cumulative Seats could claim $4.0M a year at the $83 ceiling against a $244,000 pool, so the pool and coverage rule bind and the caps bound per-human liability only; (4) BELL: ~10,000 T1 accounts accruing ~3,500 per season would reach 35M against a 20M ceiling, so the sizing rule publishes season amounts at ~0.45x (Cycle 4, IPO 11, Sprint 45, Index Inclusion 110), and the Meter halts only if T1 growth beats the projection by more than 25%.

### Stress tests

**1. Token price zero.** Nothing changes; BELL has no price by construction. Removing BELL entirely (ADR cut #3) removes only the $10 of sponsored gas per 1,000 DAU: rail $387 (23.1%). No revenue line, rate, cap or payout references BELL.

**2. No Robinhood and no bounties.** This is the base case: the table above contains zero PARTNER revenue and zero bounty revenue, because bounties never enter the pool and affiliate terms bar incentivized traffic (F22; ADR Q5). The model closes at $1,280 contribution per 1,000 DAU per month. PARTNER upside (a flat fee benchmarked at $30-50 per funded account, F6; Robinhood's own sign-up reward replacing our Grant) is margin, never a change to the rule.

**3. EU-only geo mix at EUR 7 eCPM.** Assumptions: 1,000 DAU all EEA, 3.0 views/DAU, EUR 7 gross, 12% mediation, IAP gross ARPDAU $0.020, 1.5% Pass holders. Net rewarded 3,000 x $0.00616 x 30 = $554/month (ADR figure); ad pool $111; ad accrual 3,000 x $0.00123 x 30 = $111 (coverage 1.0 on the ad line by construction); IAP net $450, pool +$22.50, stock-back $22.50; Pass bonus $9. Pool $133.50, accrual $142.50, coverage 0.94. The 14-day rule fires: next month's EEA rate is EUR 0.00116 (0.94x), the reserve covers the $9 gap, coverage returns to ~1.0. Cash-out after 50% breakage on ad credits is ~$87 plus Grants. This is the honest number and why the positioning line exists: without a Gems geo funding the pool, the Pass bonus is pool-negative and the rate mechanism absorbs it.

**4. 40% bot share of installs.** Assumptions: reported 1,000 DAU of which 400 are farm devices opting into ads at the same rate. Networks scrub invalid traffic before paying and the pool is built from banked cash 30-60 days later, so bot impressions never enter NetAds; real economics are those of 600 DAU: net revenue ~$1,006, pool ~$122, real accrual ~$118, rail ~$238 (23.7%). Bot accrual (~400 x 3 views x $0.00264 x 30 = ~$95/month at US rates) sits in PENDING_UNVERIFIED clipped at $5 per account, adds ~$47 to ExpectedPayout at the launch 50% weighting (measured coverage ~0.74 for one quarter, after which realized farm conversion of ~0 removes the drift), never reaches a Seat (a real ID, liveness and a unique face per $83/year), and expires at 180 days. KYC vendors bill only successful verifications (tech#33), so bot attempts cost nothing. Headline DAU is discounted in every Earnings Call by the behavioural bot estimate (target < 5% of DAU, Gate 1).

Also maintained: eCPM -40% (rates float down over two months, one sub-1.0 coverage month covered by the reserve); verified funnel 2x (Grants $240 and verification $204 per 1,000 DAU, rail 33.6%, Grant paused and tenure 21 days next month, published as contingent).

## B.8 Tax reporting logic

**United States.** Delivered Stock Credit (Vault cash, the Grant, sponsor ETF credits) is prize or award income at fair market value on the delivery date, which the broker records as cost basis. Form 1099-MISC applies only at >= $2,000 per payee per year from tax year 2026 (F12; economics#25); the $83 ceiling, enforced per Seat across every line, makes the threshold unreachable, so none is filed. The broker collects the W-9 (TIN) inside its CIP at Vault opening, so backup withholding never triggers and the studio never holds a TIN; the broker files 1099-B on sales, with fractional sales under $20 gross proceeds exempt. Prize (1099-MISC) versus services (1099-NEC) is counsel item 5; the $2,000 threshold applies either way. No state withholding below $2,000. BELL has no market and no determinable FMV (Rev. Rul. 2023-14 question, counsel item 5); the annual statement says so.

**EU/EEA and RoW.** The recipient self-assesses (Robinhood's own terms push tax to recipients, F17). The CASP or RHEU handles DAC8 reporting for EURC transfers. Bellwether provides, by 31 January, an in-app and downloadable annual statement per Seat listing each delivery: date, EUR value at delivery, delivering party, rail, and a per-member-state note (Ireland: prize versus gift, EUR 3,000 gift exemption; Netherlands: no gaming tax because no chance, legal-eu#41; Germany: likely Sec 22 No 3, legal-eu#40; Lithuania: EUR 200-per-prize exemption; France: with counsel, legal-eu#42). The EUR ~80 ceiling keeps every player under every named exemption.

**Tier X and under-18.** Gems only; no tax event; no statement.

## B.9 Economy risk table

| Risk | Likelihood | Impact | Mitigation | Trigger metric |
|---|---|---|---|---|
| Rewarded eCPM falls 40-70% | Medium | Ad credits sub-cent; player disappointment | Floating rate with 0.5x floor; IAP stock-back becomes primary; positioning line | Trailing-30-day net eCPM below 60% of launch |
| Verified funnel runs 2-5x model | Medium | Grants and KYC exceed margin (rail 33.6% at 2x) | Grant paused with notice; tenure 21 then 30 days; Grant only at >= $5 redemption | New Seats > 2% of MAU/month |
| Gray-market KYC identities under ~$20 with face-dedup pass | Low-medium | Sybil Seats farm $83/year | Caps drop to $30/year, tenure 30 days (ADR assumption 12); vendor face dedup; merges published | Fake-Seat rate > 2% (Gate 2) |
| Broker per-account fee 2-3x the assumed $3 | Medium | US verification cost doubles | Minimum rises to $10; monthly batching; IAP stock-back plus Grant as the floor rail | Signed broker pricing |
| Season Pass bonus pool-negative in Gems-free mixes | Certain at EU-only | Coverage 0.94 | Coverage rule cuts rates; Pass terms allow bonus reduction on 7 days' notice | Coverage < 1.0 for 14 days |
| Store policy: Google reads "subordinate" strictly; Apple treats ETF rewards as 3.1.5(v) | Medium | Ad credits move to web on Android; iOS ships game-only | Season-Pass-linked accrual as primary framing; web hub ready at Phase 2 | Store review outcome |
| Sponsor default or own-stock request | Medium | Drop unfunded or Reg M exposure | Escrow before announcement; third-party ETFs only; 20% fee | Escrow not received 14 days before announcement |
| BELL Season Emission Meter halts mid-season, or mint/burn > 2:1 | Medium at scale | Player backlash; hoarding | Sizing rule at 60-80% of ceiling; carry-over for late T1 accounts; automatic halving; new cosmetic sinks per season | Meter > 80% before day 70; ratio at day 60 |
| Sequencer filter of a game contract | Low | On-chain BELL frozen on 4663 | Pre-published Arbitrum One migration; off-chain ledger authoritative | Any `chain policy` rejection > 72 h |
| IAP refund fraud | Medium | Stock-back paid on refunded spend | 35-day vest; three chargebacks = ladder step 2 (p2e#36) | Refund fraud > 0.3% of IAP (Gate 2) |
| Reclassification of BELL (US or EU), or Regulation E / escheat on the credit ledger | Low | BELL becomes off-chain points; prepaid-account duties | Immutable token abandoned, ledger unchanged (ADR assumption 7); counsel item 16; notice-then-Gems closure rule | Adverse opinion, supervisor letter or counsel memo |

## D.1 Architecture overview

Bellwether is three planes that share exactly one thing, the Verified Seat. The **game plane** runs the idle simulation on the client, checkpoints it to the server and replays it before any write that matters. The **value plane** holds the Stock Credit ledger, verification, the Bell Rule and the redemption rails (the Vault broker, the EMI/CASP, Gems). The **chain plane** is BELL, the SeatRegistry, the seasonal Merkle claim and the PayoutLedger and SponsorEscrow roots on Robinhood Chain (chain 4663). The off-chain ledger is authoritative for all three (ADR D13); the chain is a publication and custody surface, never a source of truth. Everything below is SOLO unless marked PARTNER.

Two invariants are enforced in the build: (1) the value plane never links the simulation's RNG package and its event-type enum contains only deterministic types (ADR section 1; C1); (2) no code path converts between game currencies, BELL and Stock Credit (ADR section 5; C2). A Roslyn analyzer fails CI on either dependency.

### Component list

| # | Component | Plane | Runtime |
|---|---|---|---|
| 1 | Mobile client (iOS, Android) | Game | Unity 6 LTS, C#, IL2CPP |
| 2 | BellSim, the deterministic simulation kernel | Game | C# netstandard2.1 library compiled into client and server |
| 3 | Exchange Floor web hub | Game, Chain | TypeScript, React, viem, WalletConnect |
| 4 | Auth and Accounts | Game | .NET 8 |
| 5 | Checkpoint and Replay Validator | Game | .NET 8 API plus worker pool |
| 6 | Economy and LiveOps Config | Game | .NET 8 |
| 7 | Stock Credit Ledger and Settlement | Value | .NET 8 |
| 8 | Verification and Attestation | Value | .NET 8 |
| 9 | Ad SSV Ingestor, one adapter per network | Value | .NET 8, public HTTPS |
| 10 | Fraud and Device Intelligence | Value | .NET 8 plus Fingerprint or Sardine |
| 11 | Broker Integration (the Vault) | Value | .NET 8, isolated segment |
| 12 | EMI/CASP Disbursement | Value | .NET 8, isolated segment |
| 13 | Chain Service, Relayer and Indexer | Chain | TypeScript, Node 22, viem |
| 14 | Analytics pipeline | All | Event bus to ClickHouse |
| 15 | Admin and Fraud Console | All | React plus .NET 8 admin API |

.NET 8 is the game and value runtime because BellSim is C#; TypeScript is confined to the chain plane and the hub. Hosting: managed containers (Cloud Run or ECS Fargate class), managed Postgres, Redis, S3-class object storage, ClickHouse. Cloudflare Durable Objects (tech#26) were rejected because the kernel cannot run there without a second implementation. A PlayFab-class BaaS is off the critical path: LiveOps config must be content-hashed into the simulation, so it lives in our own config service (idle-design#20; Unity Cloud Code is not server-authoritative, idle-design missed).

### Main data flows

**Play.** (1) Auth issues a session token bound to the device key and a server time anchor. (2) The Checkpoint service returns the last accepted checkpoint `C_n` (state, seq, server_ts, seed, config_hash) and the server-computed offline grant. (3) The client runs BellSim from `C_n` at 10 ticks/s, appending every input to a log with tick offsets. (4) Ads, IAP and the Vault tab talk to the value plane directly; they touch simulation state only through server-signed grant inputs (boost, offline x2) appended to the log like any input.

**Checkpoint.** (5) Every 60 s of play and on every purchase the client uploads `{from_seq, input_log, claimed_state_hash, client_elapsed_ticks}`. (6) The server replays the log from `C_n` (D.5), compares hashes, and writes `C_{n+1}` or tells the client to reload `C_n`. (7) Logs under 10,000 events replay synchronously; larger ones queue, and the checkpoint is PROVISIONAL until VERIFIED.

**Ad SSV.** (8) The client requests a placement; the server issues a `placement_nonce` (player, placement, seq, 10-min expiry) passed as the network's custom-data field. (9) The network's server calls our SSV endpoint; the adapter verifies the signature and idempotency key, records an `AdView`, and returns the network's required 200 body. (10) The client's own "ad completed" call is a claim only. A claim with no SSV within 15 min, or an SSV with no claim, increments the account's mismatch counter (ADR section 6).

**Accrual.** (11) On `AdView` insert the Ledger checks: within the first 6 credited views of the UTC day, at least 2 min after the previous, surrounding checkpoints VERIFIED, progression check passed, no hold, daily cap not reached. (12) If eligible, `CreditEvent{AD_VIEW, rate(geo_tier, month)}` is appended; balances are a materialized view. Ineligible views credit nothing, ever. (13) IAP stock-back appends on receipt validation with `vest_at = now + 35 d`; Season Pass credit once per entitled UTC day; sponsor drops on objective completion with `vest_at = announce + 60 d`.

**Verification.** (14) At first redemption request (>= $5 / EUR 5 vested, 14 active days) the client is routed to the delivering party's onboarding: Vault CIP (US), the CASP's KYC (EEA SOLO), or a Robinhood attestation (PARTNER). (15) The party returns `{ref, jurisdiction, is_18plus, verified_at}`; Verification creates the Seat or merges into the oldest Seat with the same `ref`. (16) Play Integrity or App Attest plus device intelligence run here (T2) and at every BELL claim (T1), nowhere else.

**Redemption.** (17) A Redemption sits PENDING 7 days, then on Settlement Day (Thursday 14:00 UTC) the batch runs per rail: JNLC journal to the Vault, EURC via the CASP, or Gems at 2x. (18) The rail returns a journal id or tx hash; the Ledger appends `REDEMPTION`; nightly reconciliation matches ledger, rail statement and sponsor account.

**Mint.** (19) At BELL season close the Ledger snapshots accrued-unminted BELL per T1 Seat, builds a Merkle tree, records a `MintBatch`. (20) The 3-of-5 multisig publishes the root to Emission; the on-chain season ceiling caps the total. (21) Claims are executed by our relayer to the Seat's registered address, or by the player from the hub or Robinhood Wallet; the Indexer marks the `BellClaim` MINTED.

## D.2 Client

### Engine choice

| Need | Unity 6 (C#) | Godot 4 | Web/PWA (TypeScript, PixiJS, Capacitor shell) |
|---|---|---|---|
| iOS and Android stores | Mature IL2CPP builds | Export exists, weaker store tooling | Webview shell; review risk on Apple 3.1.1 handling of BELL |
| Exchange Floor web hub | Separate web app either way | Same | Native fit |
| Big-number math | BreakInfinity.cs port (idle-design#29; tech#27) | No verified port (idle-design#29 skeptic) | break_infinity.js native |
| Deterministic sim shared with server | One C# kernel in client and .NET server | GDScript/C# split; C# on Godot mobile less proven | One TypeScript kernel in client and Node |
| Ad SDKs with SSV (AdMob, Unity Ads, MAX, LevelPlay) | First-party Unity plugins for all four | Community plugins; SSV path unverified | Capacitor plugins uneven; mediation weakest |
| LiveOps config | Our config service | Same | Same |
| Licensing | Personal free under $200K trailing revenue; Pro $2,310/seat/yr above (tech#27) | Free | Free |

**Decision: Unity 6 LTS for iOS and Android, BellSim as a C# library shared with the .NET 8 validator, and the Exchange Floor as a TypeScript web app that never runs the simulation.** Rewarded video is the largest funding line (F20), so ad-SDK maturity with server-side verification is load-bearing, and one shared kernel removes the two-implementation determinism problem. Godot fails on ad SDKs and big numbers. **Fallback:** the web/PWA stack (TypeScript kernel on break_infinity.js, Node validator, Capacitor shells) if Unity licensing or a native-client store rejection forces it; all service interfaces are JSON over HTTPS, so the swap touches components 1, 2 and 5 only. A playable WebGL hub build is out of scope before Phase 5.

### Big-number handling

The representation is break_infinity's mantissa x 10^exponent (idle-design#29); the kernel implementation is integer-backed for cross-platform determinism: `BellDecimal { long mantissa in [1e14, 1e15); int exponent }`, multiplication and division through a 128-bit intermediate built from two 64-bit halves, rounding half-even to 15 significant digits after every operation. Doubles never enter the kernel; `System.Math` is banned there by analyzer. `pow(r, n)` is binary exponentiation; bulk-buy uses the closed form `base * r^owned * (r^k - 1) / (r - 1)`; `sqrt` (Float), `cbrt` (Weight) and the fractional Prestige Exponent use integer Newton iteration and fixed-iteration integer `ln`/`exp`. The exponent range clears the 1e308 wall reserved for a third layer (ADR section 2). Serialization is the integer pair; break_infinity.js and BreakInfinity.cs are display-only.

### Deterministic simulation module

BellSim exposes `Step(State, Input, Config)` and `Advance(State, ticks, Config)`: pure functions, no I/O, no wall clock, no floating point. Inputs are the checkpoint state, integer ticks, the content-hashed config (the ADR generator table, milestones, K per Market, emission amounts) and a seed. The seed drives xoshiro128** for cosmetic and game-only outcomes (Analyst Report re-roll, event flavour) in a separate package the value plane cannot reference. The state hash is BLAKE3 over the canonical binary state; client and server both compute it.

### Offline calculation

Offline yield is computed only on the server from the server clock: `elapsed = min(now_server - C_n.server_ts, cap)`, `cap = 8 h + 1 h per Weight (max 16 h)`, or 24 h with the ad-removal subscription (ADR section 2). The server runs `Advance(C_n.state, elapsed_ticks)` with Reinvest auto-buys honoured exactly as in play, and writes the grant as a signed server input so every later replay reproduces it. The "x2 offline" is a second server input applied only after that view's SSV arrives. Tideward's ~30,000 actions per 24 h (idle-design#32) bounds the cost; a 16 h advance completes in under 5 ms.

### Clock handling

The client never reports wall-clock time. It counts ticks from the session anchor with the monotonic clock (`SystemClock.elapsedRealtime` on Android, `mach_continuous_time` on iOS; idle-design#31) and uploads tick offsets. A log is accepted only if `client_elapsed_ticks <= 1.02 x server_elapsed_ticks + 20`; a faster client is a modified client. Sessions with no checkpoint for 15 min close; the next upload starts from the last accepted checkpoint plus a fresh offline grant. Caps, cooldowns and expiry use UTC on the server; hosts run NTP with a 50 ms alarm.

## D.3 Backend services

| Service | Responsibilities | Interfaces | Storage |
|---|---|---|---|
| Auth and Accounts | Anonymous device accounts; optional Apple, Google, email sign-in; age self-declaration; geo (IP plus store country); ES256 JWT sessions (24 h); device key registration; merges | `POST /v1/session`, `POST /v1/link`, `GET /v1/me` | `players`, `devices`, `sessions` |
| Checkpoint and Replay Validator | Accept logs; replay with BellSim; hash compare; plausibility bounds; write checkpoints; offline grants; expose verified state to the Ledger | `POST /v1/checkpoint`, `GET /v1/checkpoint/latest`; internal `ReplayStatus(player, seq)` | `checkpoints`; blobs and logs in object storage; Redis per-player locks |
| Economy and LiveOps Config | Versioned, content-hashed config; generator constants; event schedules; 1/5/20/100% rollouts; per-geo rate tables published 7 days ahead; emission tables published 30 days before each season; Bell Rule outputs | `GET /v1/config/{hash}`; admin `POST /admin/config`, `/admin/config/rollout` | `config_versions`, `rollouts` |
| Stock Credit Ledger and Settlement | Append-only events; materialized balances; caps; vesting; 180-day forfeiture sweep; redemption state machine; Settlement Day batches; reconciliation; Earnings Call export | `GET /v1/credit`, `POST /v1/redemption`; internal `Append(event)` via transactional outbox | `credit_events`, `credit_balances`, `redemptions`, `settlement_runs` |
| Verification and Attestation | Seat creation from the delivering party's attestation; duplicate merge; T0/T1/T2 state; integrity verdicts; pre-verification expiry | `POST /v1/verify/start`, `POST /v1/verify/callback/{issuer}`, `POST /v1/integrity` | `seats`, `attestations`, `integrity_checks` |
| Ad SSV Ingestor | Per-network signature verification; idempotency; nonce correlation; network-specific 200 bodies | `GET /ssv/admob`, `/ssv/unity`, `/ssv/max`, `/ssv/levelplay` | `ad_views`, unique on `(network, network_txn_id)` |
| Fraud and Device Intelligence | Risk scoring from vendor signals, behaviour, mismatch counters, velocity; holds and bans on the published ladder | internal `Score(player, context)`; admin actions | `risk_signals`, `enforcement_actions`; Redis counters |
| Broker Integration | Account open (CIP transit only); KYC status; JNLC journals; fractional notional orders; lock enforcement; statements; tax links; reconciliation | internal `OpenAccount`, `Journal`, `Order`; broker webhooks | `vault_accounts`, `journals`, `orders`; no persisted PII |
| EMI/CASP Disbursement | Weekly EURC payout files; wallet-ownership proofs; travel-rule data hand-off; reconciliation | internal `Disburse(batch)`; CASP webhooks | `payouts` |
| Chain Service, Relayer, Indexer | SeatRegistry writes; Merkle trees; root proposals; sponsored claims; permit-based sink relays; event indexing; chain-policy error detection | `POST /v1/wallet/link`, `/v1/bell/claim`, `/v1/bell/sink` | `bell_claims`, `mint_batches`, `chain_events`, `registry_addresses` |
| Analytics | Pseudonymous event stream; retention, ARPDAU, opt-in, divergence, coverage | bus consumer | ClickHouse |
| Admin and Fraud Console | Config edits with two-person approval; enforcement queue; 14-day appeals; reconciliation breaks; Earnings Call figures | admin API, SSO with hardware keys | `audit_log`, append-only |

All writes are Postgres transactions with an outbox; consumers are idempotent on event id. Services share one cluster with per-service schemas and roles; the broker and CASP services run in an isolated segment with egress allow-listed to the vendor.

## D.4 Data model

IDs are UUIDv7 unless stated; money is integer cents with an ISO currency; big numbers are `(mantissa int64, exponent int32)`.

| Entity | Key fields |
|---|---|
| **Player** | `player_id`, `created_at`, `store_country`, `ip_country_last`, `age_declared` (13+, 16+, 18+), `tier`, `seat_id?`, `status` (ACTIVE, REWARD_HOLD, REWARD_BANNED, DEVICE_BANNED), `season_pass_until?`, `ad_removal_until?`, `last_login_at`, `active_days` (UTC days with a VERIFIED checkpoint) |
| **Seat** | `seat_id` (random 32 bytes), `issuer` (BROKER_CIP, RH_FIN, RHEU, EMI_CASP), `attestation_id`, `jurisdiction` (country plus US state), `is_18plus`, `verified_at`, `status`, `merged_from[]`, `destination` (one per Seat), `seniority` (order of `verified_at`) |
| **Attestation** | `attestation_id`, `issuer`, `ref` (broker account id, KYC applicant id, or PARTNER `hash(customer_id)`), `jurisdiction`, `is_18plus`, `issued_at`, `revoked_at?`; unique on `(issuer, ref)`; never names, documents or biometrics |
| **Device** | `device_id`, `platform`, `device_pubkey`, `install_id`, `attest_key_id?`, `last_integrity` (verdicts, at), `risk_score`, `first_seen`, `players[]` |
| **Session** | `session_id`, `player_id`, `device_id`, `anchor_server_ts`, `ip_country`, `vpn_flag`, `started_at`, `ended_at`, `checkpoint_count` |
| **Checkpoint** | `checkpoint_id`, `player_id`, `seq`, `server_ts`, `state_hash`, `state_uri`, `seed`, `config_hash`, `status` (PROVISIONAL, VERIFIED, REJECTED), `divergence_code?`, `replay_ms` |
| **InputLog** | `log_id`, `player_id`, `from_seq`, `to_seq`, `event_count`, `client_elapsed_ticks`, `server_elapsed_ticks`, `uri`, `hash` |
| **AdView** | `ad_view_id`, `network`, `network_txn_id`, `player_id`, `placement`, `placement_nonce`, `ssv_received_at`, `signature_ok`, `source_ip_ok`, `client_claim_at?`, `credited`, `credit_event_id?`, `geo_tier`, `rate_version`, `reject_reason?` |
| **CreditEvent** | `event_id`, `player_id`, `seat_id?`, `type` (AD_VIEW, IAP_STOCKBACK, SEASON_PASS_DAILY, SIGNUP_GRANT, SPONSOR_DROP, REDEMPTION, REVERSAL, EXPIRY, FORFEIT), signed `amount_cents`, `currency`, `rate_version`, `source_ref`, `vest_at`, `created_at`; append-only; the enum is the allowlist |
| **CreditBalance** | `player_id`, `currency`, `pending_cents`, `vested_cents`, `redeemed_cents`, `day_cents`, `month_cents`, `year_cents`, `lifetime_value_cents` (tax FMV), `as_of_event_id` |
| **Redemption** | `redemption_id`, `seat_id`, `amount_cents`, `currency`, `rail` (VAULT_JNLC, RH_FIN, RHEU_GRANT, EURC, SEPA, GEMS), `status` (REQUESTED, PENDING, QUEUED, SENT, SETTLED, FAILED, REVERSED), `pending_until`, `settlement_run_id?`, `rail_ref?`, `created_at` |
| **VaultAccount** | `seat_id`, `broker`, `broker_account_id`, `cip_status`, `opened_at`, `default_etf` (S&P 500 ETF), `chosen_etf?`, `sell_lock_until`, `withdraw_lock_until`, `last_statement_at` |
| **SponsorDrop** | `drop_id`, `sponsor_id`, `escrow_ref`, `escrow_cents`, `objective_id`, `fixed_amount_cents` (25 to 100), `etf_symbol` (third-party sector ETF), `min_active_days` = 30, `allocation_rule` = SENIORITY, `eligible_count`, `announced_at`, `deliver_at` (announce + 60 d), `allocation_root`, `status` |
| **BellClaim** | `claim_id`, `season`, `seat_id`, `address`, `amount` (wei), `merkle_index`, `proof[]`, `tx_hash?`, `status` (ELIGIBLE, SUBMITTED, MINTED, EXPIRED) |
| **MintBatch** | `season`, `root`, `total_amount`, `leaf_count`, `tree_uri`, `ceiling` (20,000,000 x 0.95^n BELL), `published_tx?`, `published_at?`, `emission_version` |

Off-chain BELL accrual is a `bell_ledger` table of the same append-only shape (CYCLE, IPO, SPRINT, INDEX_INCLUSION, SINK_BURN, EXPIRY) with 150/day and 8,000/season enforced at append (ADR section 3).

## D.5 Server-authoritative simulation

### Tick model

Time is an int64 count of 100 ms ticks; every cycle in the ADR table is integer ticks (0.6 s = 6; 86,400 s = 864,000). Each tier has one cycle timer (the AdCap model); production per completed cycle is `owned x profit x multipliers`. Between inputs, `Advance` steps to the next structural event: a cycle completion on a Reinvest-enabled tier (which may buy a unit and cross a milestone) or the next input. Tiers without Reinvest advance in closed form, so the worst case is bounded by Reinvest cycle completions: 144,000/day for tier 1, about 250,000 events per player-day at full automation.

### Checkpoint cadence and input-log format

Uploads every 60 s of play, on every purchase, and on background or quit. A log is a binary stream of `tick_delta` (varint), `type` (u8), type-specific varint args. Types: TAP(tier), BUY(tier, count), BUY_MANAGER(tier), REINVEST(tier, on), REPORT(tier, index), CHARTER(tier), IPO, INDEX_INCLUSION(market), UNLOCK_MARKET(market), SPEND_FLOAT(kind, amount), SERVER_GRANT(kind, ref, signature), EVENT(sprint action). A typical day is 300 to 800 human inputs under 8 KB.

### Replay validation algorithm

1. Load `C_n`; reject if the client's `config_hash` differs from its rollout assignment.
2. Check plausibility bounds on the raw log (table below).
3. Apply inputs in order, advancing between them; any failed precondition (unaffordable BUY, IPO below target, SERVER_GRANT with a bad signature) marks the log REJECTED with a code.
4. Hash the resulting state; compare with `claimed_state_hash`.
5. Match: write `C_{n+1}` VERIFIED. Mismatch: write nothing, return `C_n`, increment `divergence_count`.

**Cost per player-day.** About 250,000 structural events plus 800 inputs at roughly 40 ns each is about 10 ms of CPU at full automation, 2 to 3 ms typical; at 1M DAU that is 10,000 CPU-seconds a day, under three core-hours. Replay therefore runs on every checkpoint, not a sample, and completes before any Stock Credit, BELL or leaderboard write (ADR section 2; idle-design#32).

### Plausibility bounds

| Bound | Value | On breach |
|---|---|---|
| Client vs server elapsed | <= 1.02 x server + 20 ticks | Reject |
| Input rate | <= 15/s over any 10 s; <= 25/s peak | Reject; flag if repeated |
| Purchases | Affordable at the tick of purchase | Reject |
| Production rate | Within the config envelope for owned counts and multipliers | Reject and page (kernel or config bug) |
| Offline grants | Server-signed, once per session start | Reject |
| Timing regularity | > 50 identical tick deltas in a row; identical tap coordinates across sessions | Fraud signal only (ADR section 6) |

### On divergence

Server state wins; the client reloads `C_n`. One divergence per day is tolerated. Three in 24 h freeze reward accrual until a clean 24 h checkpoint chain exists and queue the account for review; ten in 7 days applies the published ladder (pending credit forfeited, BELL accrual frozen). Fleet-wide, Gate 0 requires < 0.1% divergent checkpoints; above 0.5% the deploy that introduced it is rolled back, because at that rate it is a kernel or config bug, not cheating.

## D.6 Verification tiers

| Tier | Grants | Requirements | Attestation calls |
|---|---|---|---|
| T0 | Play; off-chain BELL and Stock Credit accrual (pending, capped at $5, 180-day expiry) | Device key; age self-declaration; geo | None |
| T1 | On-chain BELL claim; sinks; Syndicates; nameplate | Play Integrity (PLAY_RECOGNIZED, LICENSED, MEETS_DEVICE_INTEGRITY) or App Attest assertion at claim time; device-intelligence pass; SIWE binding of the address to the Seat (or to the player before a Seat exists) | Per claim and per registry change |
| T2 | Real-value redemption; sponsor drops | Verified Seat from the delivering party; 14 active days; the T1 checks | At Seat creation and every redemption |

**Play Integrity.** Standard requests with `requestHash = SHA-256(claim payload)`, decrypted server-side through Google, never cached (tech#29). The default quota is 10,000/day; at 1M DAU, seasonal claims for about 30% of 4M MAU concentrate in a season's first week (roughly 170,000/day peak), so the increase to 250,000/day is requested through the Play Console form in Phase 2, and the client queues claims behind a server token bucket so a shortfall delays rather than fails them.

**App Attest.** `attestKey` once per install at the first T1 action; `generateAssertion` per claim, verified on our servers with no Apple round trip (tech#30). We cap `attestKey` at 20/s globally with backoff, since Apple advises "double digits per second" and publishes no quota. App Attest does not detect jailbreak or hooking, so the device-intelligence call (emulator, VM, root, Frida, cloned app, VPN; tech#31) runs alongside it on both platforms.

**Seat creation.** US SOLO: the Vault onboarding screen is served by the Broker Integration service in an isolated web view; CIP fields go to the broker over TLS and are never persisted by us (D.11); the broker account id is the `ref`. EEA SOLO: the CASP runs KYC with liveness and document/face dedup in its own SDK and posts `{ref, jurisdiction, is_18plus, verified_at}` on a signed webhook. PARTNER: Robinhood's `{verified, age18, jurisdiction, hash(customer_id)}`, which Robinhood would have to build (F4). A duplicate `(issuer, ref)` merges the newer player into the oldest Seat with a FORFEIT of its pending credit and a freeze of its BELL accrual (ADR section 6).

## D.7 Chain layer

Contracts target chain 4663 (testnet 46630), Solidity 0.8.x, OpenZeppelin Contracts 5.7.0 (tech missed); deployment is permissionless (tech#4). Under 5.7.0's EIP-712 ShortString change the permit domain name is `Bellwether`, version `1`.

### BELL

Immutable: `ERC20Capped(1_000_000_000e18)`, `ERC20Permit`, `AccessControl` with `MINTER_ROLE` granted once in the constructor to the Emission proxy and the admin role renounced.

- `mint(address to, uint256 amount)`: `MINTER_ROLE` only.
- `burnFrom(address from, uint256 amount)`: callable only by registered Sinks.
- `registry()`: immutable SeatRegistry address.
- `_update(from, to, value)`, the bound-transfer hook: mint requires `registry.seatOf(to) != 0`; burn requires `registry.isSink(msg.sender)`; any other transfer requires `registry.seatOf(from) == registry.seatOf(to) != 0`. Errors `UnregisteredAddress()`, `NotSameSeat()`, `NotSink()`.
- Standard `Transfer` and `Approval` events; no pause, no admin, no upgrade. A future P2P mode is not in this contract; if the five gates ever pass (ADR section 3) it is a new token and a migration, deliberately.

### SeatRegistry (UUPS behind the timelock)

`bind(bytes32 seatId, address addr, bytes consent)` by `REGISTRAR_ROLE` (chain service) with the player's EIP-712 signature over `(seatId, addr, chainId, nonce)`; max 3 addresses per Seat; 7-day cooldown per Seat. `unbind`, `rotate(seatId, old, new)` for erasure (old address tombstoned after the player moves balances by same-Seat transfer). Views `seatOf(address)`, `addressesOf(seatId)`, `isSink(address)`. `setSink(address, bool)` by `SINK_ADMIN_ROLE` (timelock only). Events `SeatBound`, `SeatUnbound`, `SeatRotated`, `SinkSet`. Only the random `seatId` is on-chain (F17).

### Emission and Merkle distributor (upgradeable)

`publishSeasonRoot(uint32 season, bytes32 root, uint256 total, string uri)` by `ROOT_PUBLISHER_ROLE` (the 3-of-5 multisig directly; amounts are already published 30 days ahead and the ceiling is on-chain); reverts if `total > 20_000_000e18 x 95^n / 100^n` in integer math or if the season already has a root. `claim(season, index, seatId, to, amount, proof)` is permissionless (anyone may pay gas for anyone), leaf `keccak256(abi.encode(index, seatId, to, amount))`, claimed bitmap per season (Uniswap merkle-distributor pattern, tech#35), requires `registry.seatOf(to) == seatId`, then `BELL.mint`. Unclaimed leaves are re-included next season until the 180-day expiry. Events `SeasonRootPublished`, `Claimed`.

### Sinks (upgradeable, each registered as a Sink)

`AdReplacementSink.redeem(kind, permit)` burns 200 BELL and emits `BoostRedeemed(seatId, kind)`, which the Indexer converts into a SERVER_GRANT (Android and web only; zero Stock Credit). `CharterMint` burns BELL for ERC-1155 cosmetics; `Nameplate` burns 50 to 5,000; `Syndicate` burns 500 to found and locks 100 per season to join; `LadderTicket` burns 20. All accept EIP-2612 permits so the relayer can submit without the player holding ETH.

### PayoutLedger and SponsorEscrow (publication only)

`PayoutLedger.publish(uint32 period, bytes32 root, uint64 poolCents, uint64 accruedCents, uint64 paidCents, string uri)` monthly by the multisig; leaf `keccak256(seatId, period, paidCents, currency)`, so a player verifies their own line from the hub without revealing which leaf is theirs. `SponsorEscrow.commit(dropId, termsHash, escrowCents, fixedCents, eligibleCount)` before a drop is announced and `publishAllocation(dropId, root)` at allocation. Funds are never on-chain: escrow sits with Bellwether Rewards LLC at the delivering broker (US) or the EMI (EU); the contract makes "escrow before announcement" auditable (ADR D10).

### Gas sponsorship and account abstraction

Players never need ETH. (a) **Relayer plus permit**, the base path: `claim` is permissionless and sinks accept permits, so our relayer (a KMS-held key with a daily spend limit) submits and pays for any address, including Robinhood Wallet, whose smart-account support is unconfirmed (tech open questions). (b) **ERC-4337 with a paymaster** for embedded wallets against EntryPoint v0.7 `0x0000000071727De22E5E9d8BAf0edAc6f37da032`, bundled through Alchemy (Robinhood's account-abstraction docs, tech missed). **Paymaster vendor:** Robinhood's docs list Alchemy, ZeroDev, Privy and Dynamic and describe an Alchemy Gas Manager policy, while Alchemy's own pages do not confirm chain 4663 (tech#22, #23). Decision: Alchemy Gas Manager primary at 8% overhead, ZeroDev fallback, a self-hosted OpenZeppelin 5.7.0 `PaymasterSigner` as last resort; all three run on 46630 in Phase 0 (D.16).

### Embedded wallets and Robinhood Wallet linking

At T1 the player either links Robinhood Wallet through WalletConnect (QR or deep link; our domain registered with WalletConnect Verify; tech#21) and signs SIWE plus the bind consent, or receives an embedded EIP-7702 wallet from Privy with key export, provisioned only at first claim because Privy's free tier covers 0 to 499 MAU, then $299 to $499/month to 9,999 MAU, then $2,000 base plus $0.05/MAU (tech#22 skeptic); Dynamic ($249/month including 5,000 MAU) is the fallback vendor. Robinhood Wallet supports chain 4663 and Arbitrum natively (tech#21), which keeps the Arbitrum One contingency invisible to players.

### Indexer

A viem indexer subscribes over Alchemy WSS to `Transfer`, `Claimed`, `SeasonRootPublished`, `SeatBound`, `BoostRedeemed` and sink events, with polling fallback on the public RPC. The "~13 min hard finality" figure is unverified (tech#3 skeptic), so events are final after 64 blocks and re-checked at L1 batch posting; since the ledger is authoritative, a reorg can only delay a status update, never change a balance.

### Chain-filter contingency and Arbitrum One migration runbook

Robinhood can filter addresses at the sequencer and force-fail transactions through the ArbFilteredTransactionsManager precompile; the error string is "Transaction rejected by chain policy" (tech#5). The relayer counts that error and any post-inclusion force-fail; one occurrence involving a game contract pages on-call, and Gate 3 requires zero.

Runbook, target 72 h, pre-published as the ADR's rule: (1) the 2-of-5 guardian pauses Emission and sinks on 4663; (2) notice in-app and on the hub; the ledger continues; (3) deploy the pre-audited mirror set, same bytecode, on Arbitrum One (42161), where EntryPoint v0.7 has the same address; (4) publish a genesis root equal to `bell_ledger` minted balances plus unminted accruals; bound tokens cannot be traded, so there is no cross-chain double-spend, and 4663 balances are void by the published rule; (5) replay the registry snapshot; players re-sign consent at their next hub visit; (6) switch client, hub and relayer chain id by config; Robinhood Wallet needs no user action; (7) re-run Gate 3 for 30 days.

## D.8 Broker integration (the Vault, US SOLO)

The Vault is a white-label account at an Alpaca-class FINRA member. Alpaca's Broker API documents fractional quantities to 9 decimals and journal types JNLC (cash) and JNLS (stock) for rewarding users (economics#24 and missed; legal-us missed); pricing is unpublished and the ADR assumes $3 per account (ADR assumption 1). Apex's white-label rail is the alternate (legal-us#4). Fractional shares are non-portable via ACATS and liquidated on transfer (legal-us#11), which the Vault discloses.

| Flow | Our call | Our record |
|---|---|---|
| Account open | `OpenAccount(cip_payload, agreements, w9)` from the isolated onboarding view; idempotency key `seat_candidate_id` | `VaultAccount{cip_status}`; PII discarded after the response |
| KYC status | Webhook ACTIVE, ACTION_REQUIRED, REJECTED | Seat created only on ACTIVE; ACTION_REQUIRED shows the broker's own link |
| Cash journal | `Journal(JNLC, sponsor_firm_account -> account, amount, idempotency = redemption_id)` on Settlement Day | `Redemption.rail_ref`; REDEMPTION event |
| Sign-up Grant | Same, `idempotency = seat_id:grant` | SIGNUP_GRANT then REDEMPTION |
| Fractional order | `Order(notional, symbol in the 12-ETF list, market, idempotency = order_intent_id)` when the player picks; S&P 500 ETF default placed on day 30 if no choice | `orders`; `sell_lock_until = +3 trading days` |
| Locks | No sell before `sell_lock_until`, no withdrawal before `withdraw_lock_until = journal + 30 d`, enforced in our Vault UI and orchestration (the only path to the account); the broker contract requires account-level restriction flags where the API offers them | Lock timestamps |
| Statements and tax | Broker statements and confirms linked in the Vault tab; broker 1099-B for sales (fractional sales under $20 exempt, ADR table); Bellwether Rewards LLC tracks FMV per Seat per year for 1099-MISC, moot under the $83 ceiling but recorded | `last_statement_at`, `lifetime_value_cents` |
| Sponsor drops | JNLC of the fixed amount, then an order for the named third-party sector ETF, 60 days after announcement | Allocation leaf |

**Idempotency and reconciliation.** Every mutating call carries a key derived from our ledger id; a 5xx or timeout retries with backoff for 24 h, then parks for manual review. Nightly three-way reconciliation compares ledger REDEMPTION events, the broker's journal list for the sponsor firm account and that account's cash movement: a journal with no ledger event is an extra (manual); a ledger event with no journal is a missing (auto-retry); an amount mismatch pages. The firm account is pre-funded to the next Settlement Day plus the reserve (ADR section 7).

**Sandbox plan.** Phase 1: all flows against the broker sandbox with synthetic identities, including duplicate webhooks, rejected CIP, journal timeouts and an ACTION_REQUIRED loop. Phase 2: broker certification, a 50-account staff pilot and reconciliation dry-runs over four Settlement Days.

PARTNER: Robinhood Financial would deliver the same credit into the player's Robinhood account under a flat fee; the endpoint does not exist and Robinhood would have to build it (F4). The service targets an `IRedemptionRail` interface, so that rail is an adapter.

## D.9 EMI/CASP disbursement (EEA SOLO)

The disbursing party is a MiCA-authorised EMI/CASP (ZBD holds NL EMI and MiCAR licences, precedents#18); we never hold e-money or provide a crypto-asset service (ADR section 4). Asset: EURC, the e-money token Robinhood Europe uses for its own Dividend Match (legal-eu, Dividend Match terms). Chain: 4663 if EURC is deployed there, otherwise Arbitrum One (Robinhood Wallet supports both, tech#21); never a USD stablecoin for a EUR obligation.

Per Settlement Day: (1) the Ledger emits `{seat_ref, amount_eur_cents, destination_address, ownership_proof}`, the proof being the player's WalletConnect signature over `(seatId, address, chainId, nonce)`; (2) the file is posted to the CASP with a batch idempotency key; (3) the CASP maps `seat_ref` to the identity it KYC'd, screens it, attaches the travel-rule data it must hold (originator: the Bellwether Rewards entity's name, registration number and address; beneficiary: the KYC'd name and the self-hosted address with the ownership proof on file), sends EURC and returns tx hashes; (4) the Indexer confirms each transfer; (5) the Ledger appends REDEMPTION events. DAC8 reporting is the CASP's obligation as the reporting service provider (legal-eu missed); we supply nothing beyond the payout file. Reconciliation is nightly across payout file, CASP report and indexed transfers; the EUR float at the CASP is topped up weekly to the next Settlement Day plus three months of trailing EU payouts. The post-settlement screen is the neutral "hold / withdraw / swap in your wallet" text with no token names or prefilled links (ADR D16). Fallbacks per member state by config: SEPA EUR through the same CASP, then Gems at 2x.

## D.10 Security

**Key management.** Contract admin is a 3-of-5 Safe multisig behind a 7-day timelock for upgrades and sink registration, with a 2-of-5 guardian subset holding pause-only power; signers use hardware keys in three jurisdictions. `REGISTRAR_ROLE` and the relayer live in cloud KMS with signing-only permissions, a $200 daily gas budget and an alarm at 50%; `ROOT_PUBLISHER_ROLE` is the multisig itself. Session JWTs use ES256 keys rotated every 90 days. SSV secrets live in the secret manager; AdMob keys are refreshed from `gstatic.com/admob/reward/verifier-keys.json` and cached at most 24 h (tech#32). Broker and CASP services have their own KMS keys and no read access to game tables.

**Signing.** Every client request is signed by a per-install device key registered at first session; T1 and T2 requests also carry the Play Integrity token or App Attest assertion bound to the request hash. Server grants inside input logs are Ed25519-signed so replays verify them without a lookup.

**Rate limits.** Checkpoints 4/min per player (bursts to 10); inputs 25/s inside a log; credited views 6/day with a 2-min gap and 8/day served; BELL claims 1 per season per Seat; redemptions 1 per week per Seat; registry binds 1 per 7 days per Seat; verification attempts 3 per 30 days; API 600/min per IP, 60/min unauthenticated; SSV endpoints accept only published network source IPs where lists exist (Unity Ads: `static.applifier.com/public_ips.json`, tech#32).

**Abuse controls.** VPN, proxy or emulator blocks rewards, never play. Refunded IAP receipts append a REVERSAL inside the 35-day vest. One destination per Seat. Superhuman input rates reject the log; regular timing feeds the risk score. Enforcement follows the published ladder with 14-day human-reviewed appeals and quarterly published counts (ADR section 6).

### Threat model

| Threat | Vector | Control | Residual |
|---|---|---|---|
| Inflated Cash or Float | Memory edit, patched binary | Replay of every log; state hash; affordability | Cosmetic desync only |
| Clock manipulation | Wall-clock or time-zone change | Server-clock offline; monotonic in-session ticks; 2% elapsed bound | None |
| Forged or replayed SSV | Spoofed GET | Per-network signatures; unique `(network, txn_id)`; source-IP allowlists; nonce correlation | Network-side fraud, scrubbed before "net" |
| Device farms and emulators | Physical farms +72% YoY (tech#31) | No real value without a Seat (C5); device intelligence at T1/T2; fleet signals | Real KYC'd humans capped at $83/year each |
| Rented KYC identities | Gray-market documents | Face and document dedup at the vendor; one account per TIN at the broker; caps to $30/year and tenure to 30 days if identities fall below $20 (ADR assumption 12) | Bounded |
| Multi-accounting | Many T0 accounts | $5 pre-verification cap with expiry; merge on duplicate attestation | UA metric pollution |
| Human-speed automation | Scripted valid inputs | Not stoppable by server authority (idle-design#32); bounded by caps and the Seat | A bot earns boosts and cosmetics |
| Relayer key compromise | Cloud breach | KMS signing only; gas budget; relayer cannot mint outside Merkle leaves or bind without consent signatures | Up to $200/day of gas |
| Multisig signer compromise | Phishing | 3-of-5 plus 7-day timelock; guardian pause only; BELL immutable | Delayed periphery upgrade |
| Sequencer filtering | Hash-list filtering (tech#5) | Ledger authoritative; pre-published Arbitrum One redeploy | 72 h claim outage |
| Contract bug | Logic error | Minimal immutable token; audited periphery; Foundry invariants; guardian pause on periphery | Token unpausable by design |
| Insider fraud | Admin balance edits | No edit path exists, only typed events with two-person approval and an append-only audit log; Earnings Call and on-chain roots | Two-admin collusion, caught by reconciliation |
| PII breach | Broker or KYC data on our side | Attestations only; CIP transits an isolated segment unpersisted | Vendor breach, allocated by contract |
| DDoS | Volumetric on SSV or checkpoint endpoints | CDN and WAF; network-IP-only SSV; small idempotent uploads | Accrual delay, never loss |

## D.11 Privacy

| Data class | Where | On-chain | Retention | Basis |
|---|---|---|---|---|
| Player id, progress, checkpoints, input logs | Game plane Postgres and object storage | No | Logs 35 days (the IAP vest window); checkpoints: last 30 plus monthly snapshots for 13 months | Contract |
| Device key, integrity verdicts, risk signals | Fraud service | No | 13 months from last session | Legitimate interest, fraud prevention, DPIA'd |
| Seat and attestation `{ref, jurisdiction, is_18plus, verified_at}` | Verification service | No | Seat life plus 12 months; the licensed party keeps the AML record under its own retention (F17) | Legitimate interest and legal obligation |
| CIP fields, documents, selfies, biometrics | Never persisted by us | No | Vendor | Vendor's basis; BIPA/CUBI allocated by contract |
| Stock Credit events, redemptions, tax FMV | Ledger | Merkle leaves only, `hash(seatId, period, amount)` | 7 years | Legal obligation |
| seatId to address map | SeatRegistry | Yes, pseudonymous | Until rotation; tombstoned on erasure | Legitimate interest under the DPIA (EDPB v2.0; F17) |
| Wallet address and ownership proof | Chain service; forwarded to the CASP | Address only | Seat life | Contract |
| Analytics events | ClickHouse; player id hashed with a 90-day rotating key | No | 25 months | Legitimate interest; opt-out honoured |

Rules: no personal data on-chain (F17); erasure rotates the on-chain address and tombstones the Seat record, leaving `seatId` a random value with no off-chain link; brokerage KYC data is never repurposed; Vault and CASP integrations are separated from analytics by network and IAM. DPIA inputs: whether public keys in the seatId map are personal data (legal-eu#38); device-intelligence processing at T1/T2; the attestation record's basis separate from AML retention (ADR open item 12); cross-border transfer to the KYC vendor; the under-16 EEA gate (GDPR Art 8; ADR D11).

## D.12 Observability and SLOs

| Surface | SLO | Alert |
|---|---|---|
| Game API availability | 99.9% monthly | Error rate > 1% for 5 min |
| Checkpoint accept latency | p95 < 300 ms, p99 < 1 s | p99 > 2 s for 10 min |
| Replay queue lag | < 5 min p99 | > 15 min |
| Replay divergence | < 0.1% of checkpoints (Gate 0) | > 0.3% in an hour; auto-rollback at 0.5% |
| SSV endpoint | 200 within 400 ms p99 (LevelPlay's stated target, unverified, tech#32 skeptic; adopted for all networks) | p99 > 800 ms; signature failures > 1% |
| Ledger integrity | Balances equal event sums at the nightly check | Any mismatch pages |
| Bell Rule coverage | Published monthly; < 1.0 for 14 days triggers the downward rate rule (ADR section 7) | < 1.0 for 7 days |
| Settlement Day | 100% of queued redemptions SENT by T+1 | Incomplete at T+1 08:00 UTC |
| Reconciliation breaks | None unresolved after 3 business days | Any older break |
| Claims | 99% MINTED within 10 min | Any chain-policy error; success < 95% |
| Play Integrity quota | Daily use < 70% | > 85% |

Tracing is OpenTelemetry end to end with hashed player ids; logs never carry CIP fields; broker and CASP services log ids and amounts only. Dashboards mirror the Earnings Call so the published numbers are the operating numbers.

## D.13 Infrastructure and cost per DAU

Assumptions: 25 checkpoints per DAU per day (about 100 KB), 40 API calls, 3 SSV callbacks, 3 ms replay CPU, MAU = 4 x DAU, 30% of Seats link wallets, one claim per Seat per 90-day season, device-intelligence calls only at T1/T2 events. Vendor prices from tech#22, #23, #26, #31 and missed facts.

| Monthly line | 10k DAU | 100k DAU | 1M DAU |
|---|---|---|---|
| Compute (API, replay workers, indexer) | $450 | $2,400 | $16,000 |
| Postgres (managed, HA) plus Redis | $300 | $1,200 | $7,000 |
| Object storage | $40 | $350 | $3,200 |
| ClickHouse | $150 | $600 | $3,500 |
| CDN, WAF, secrets, monitoring | $150 | $500 | $2,500 |
| RPC (Alchemy: 30M CU free, then $0.45/M) | $0 | $150 | $1,400 |
| Device intelligence (Fingerprint Pro Plus $99 for 20,000, then $4/1,000) | $99 | $250 | $2,100 |
| Embedded wallets (Privy tiers) | $299 | $499 | about $10,000 ($2,000 base plus $0.05 x claimer MAU) |
| Sponsored gas and wallet provisioning (about $0.05 per claimer per month, ADR section 7) | $60 | $600 | $6,000 |
| Play Integrity, App Attest | $0 | $0 | $0 |
| **Total** | **$1,550** | **$6,550** | **$51,700** |
| **Per DAU-month** | **$0.155** | **$0.066** | **$0.052** |
| Share of net revenue at net ARPDAU $0.056 (ADR worked example) | 9.2% | 3.9% | 3.1% |

KYC, broker account fees and journals are rail costs inside the Bell Rule model (ADR section 7), not infrastructure. The 10k tier is fixed-cost dominated, which is acceptable in Phases 0 and 1 because no rail is live.

## D.14 Testing strategy

**Simulation harness.** A headless BellSim runner drives bot personas (three sessions a day, 24-hour watcher, Reinvest-everything, ad-maximizer) through 30 simulated days per config version and asserts the ADR pacing: first wall near 45 min, first IPO at 2.5 to 3.5 h, Index Inclusion on day 10 to 14. The economy sheet (idle-design#30) is the source of truth; tier costs and paybacks must match it to the cent.

**Economy fuzzing.** Property tests over random revenue, geo-mix and verification-rate scenarios: the pool never exceeds 20% of banked net ads plus 5% of banked net IAP plus sponsor escrow; no Seat exceeds $0.10/day, $4/month, $50/year (+50% with the Pass), the $3 Grant and $20/year of drops; per-view rates stay within 0.5x to 1.25x of the prior month; accrued cents are always honoured; BELL never exceeds 150/day, 8,000/season or the season ceiling; the mint/burn halving fires exactly at 2:1 over two seasons. Run on every config change and in the monthly Earnings Call pipeline.

**Replay determinism.** 10,000 random input logs replayed on x64 .NET 8, arm64 .NET 8, IL2CPP iOS arm64, IL2CPP Android arm64 and the Unity editor; zero hash differences is a merge requirement. A kernel change ships with a config version bump, and kernels stay side by side for 35 days so old checkpoints replay under their own kernel.

**Contract tests and audit.** Foundry unit and invariant tests: cap never exceeded; only Emission mints; no transfer across Seats; only Sinks burn; season totals under the ceiling; no double claim; registry cooldowns hold under fuzzing. External audit of BELL, SeatRegistry, Emission, the sinks, PayoutLedger and SponsorEscrow at the boutique tier, $10-25k, 8-14 weeks (tech#36; ADR section 3), booked in Phase 0 for the Phase 3 mainnet; the Arbitrum One mirror is identical bytecode under the same report.

**Load tests.** k6 at 10x the expected checkpoint rate for 1M DAU (about 3,000/s), an SSV burst of 500/s, a season-open spike of 200,000 claims in an hour and a 100,000-redemption Settlement Day, judged against the D.12 SLOs.

**Store review dry-runs.** Internal-track builds with reviewer notes on read-only BELL on iOS, spending on the web hub, the Season-Pass-linked loyalty framing and the Google Financial Features declaration (ADR D12); a checklist against Apple 3.1.1 and 3.1.5 and Google's loyalty text runs before every phase gate.

## D.15 Release and rollout

Environments: dev, staging (testnet 46630, broker sandbox, CASP sandbox), production. Client releases on a two-week train, forced update only for kernel-incompatible changes; services deploy continuously behind health checks with automatic rollback on the divergence alert. Config rolls out at 1/5/20/100% by hashed cohort (ADR section 2), with the kernel config hash pinned per cohort. Rate tables publish 7 days ahead and emission tables 30 days ahead; the config service rejects edits to a published period. Contract upgrades pass the 7-day timelock with the proposal hash posted in the Earnings Call. Jurisdiction switches (the US Vault, each EEA member state, RoW countries) are per-country flags whose metadata must carry the counsel memo id. Kill switches exist for accrual, redemption, claims and each ad network. Each ADR gate (Gate 0 to Gate 4) is a release checklist item reading its metrics from the D.12 dashboards.

## D.16 Open technical questions and the experiments that answer them

| # | Question | Experiment | Decide by |
|---|---|---|---|
| 1 | Does a paymaster sponsor gas on chain 4663, at what cost? | 1,000 sponsored claims on 46630 through Alchemy Gas Manager, then ZeroDev, then the self-hosted OZ PaymasterSigner; measure cost and failure rate | End of Phase 0 |
| 2 | Does Robinhood Wallet accept our WalletConnect session, SIWE and EIP-712 bind on 4663 without smart-account features? | 50-user internal test; the relayer-plus-permit path must succeed regardless | Phase 0 |
| 3 | Is EURC deployed on 4663 and supported there by the CASP? | Verify the contract on Blockscout; CASP sandbox transfers on 4663 and Arbitrum One | Phase 2 |
| 4 | Is BellSim bit-identical across IL2CPP and .NET? | The D.14 golden-vector matrix at 1M operations per platform | Before Gate 0 |
| 5 | How much Play Integrity quota does season open need? | Model from Phase 1 claim-intent telemetry; file the increase six weeks ahead | Phase 2 |
| 6 | Does App Attest throttling bite at season open? | Staged onboarding at 20 attestKey/s in a Phase 1 cohort; measure failures | Phase 1 |
| 7 | Does Robinhood filter fresh game contracts or the relayer? | Deploy the contract set to mainnet in Phase 2 with zero value; 10,000 no-op transactions over 30 days; count chain-policy errors; ask Robinhood in the PARTNER track | Phase 2 |
| 8 | Are the AppLovin MAX and LevelPlay SSV schemes as described? Both unverified (tech#32 skeptic) | Launch credit on AdMob and Unity Ads (verified schemes); certify MAX and LevelPlay against current vendor docs in a staging placement before enabling credit | Phase 1 |
| 9 | Will an Alpaca-class broker enforce account-level lock flags, and at what per-account price? | RFP to two brokers with the D.8 flow table; sandbox test of restriction flags | Phase 1, Gate 1 input |
| 10 | Are on-chain price feeds needed at launch? | No consumer exists: BELL has no price, the Vault shows broker values, EEA screens name no token; confirm no code path reads Chainlink and defer oracle work (feeds pause during corporate actions and go stale on weekends, tech missed) | Phase 3 design review |
| 11 | Fingerprint or Sardine? | Parallel run on a Phase 1 cohort; compare emulator, farm and VPN catch rates at equal false-positive budgets | Phase 2 |
| 12 | Is a Unity WebGL playable hub worth building? | Measure Exchange Floor visits per linked Seat in Phase 3; build only above 2 visits per Seat per month | Phase 5 |

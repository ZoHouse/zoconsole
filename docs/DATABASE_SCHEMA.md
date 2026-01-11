# Zoconsole Database Schema

**Database:** Supabase (PostgreSQL)
**Project URL:** `https://elvaqxadfewcsohrswsi.supabase.co`
**Last Updated:** 2025-01-11

---

## Overview

| Metric | Value |
|--------|-------|
| Total Tables | 19 (excluding PostGIS system tables) |
| Total Users | 79 |
| Total Nodes | 200 |
| Total Quests Completed | 418 |
| Leaderboard Entries | 488 |

---

## Table of Contents

1. [Core User Tables](#core-user-tables)
2. [Gamification Tables](#gamification-tables)
3. [Nodes (Properties/Locations)](#nodes-propertylocations)
4. [Events & Calendars](#events--calendars)
5. [Migration & Backup Tables](#migration--backup-tables)
6. [PostGIS System Tables](#postgis-system-tables)
7. [Entity Relationships](#entity-relationships)
8. [Enums](#enums)

---

## Core User Tables

### `users`
**Primary user profiles with extensive Zo platform integration.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `name` | text | Display name |
| `first_name` | text | First name |
| `username` | text | Unique username |
| `bio` | text | User biography |
| `pfp` | text | Profile picture URL |
| `email` | text | Email address |
| `phone` | varchar | Phone number |
| `phone_number` | text | Alternative phone field |
| `birthdate` | date | Date of birth |
| `culture` | text | Primary culture |
| `cultures` | jsonb | Multiple cultures array |
| `city` | text | User's city |
| `lat` | numeric | Latitude |
| `lng` | numeric | Longitude |
| `role` | text | User role |
| `user_tier` | text | Membership tier |
| `body_type` | text | Avatar body type |
| **Social** |
| `x_handle` | text | Twitter/X handle |
| `x_connected` | boolean | Twitter connected status |
| `github_username` | text | GitHub username |
| `github_commits` | integer | Total GitHub commits |
| `github_prs` | integer | Total GitHub PRs |
| `github_issues` | integer | Total GitHub issues |
| `telegram_messages` | integer | Telegram message count |
| `telegram_replies` | integer | Telegram reply count |
| **Wallet & Balance** |
| `wallet_address` | text | Primary wallet address |
| `primary_wallet_address` | text | Primary wallet (alternative) |
| `wallet_chain_id` | integer | Blockchain chain ID |
| `zo_balance` | numeric | Zo token balance |
| `balance_last_synced_at` | timestamp | Last balance sync |
| `founder_nfts_count` | integer | Founder NFTs owned |
| **Gamification** |
| `total_reputation_score` | integer | Total reputation |
| `builder_score` | double precision | Builder score |
| `nominations_received` | integer | Nominations received |
| `nominations_given` | text[] | Array of nominations given |
| `last_streak_at` | timestamp | Last streak activity |
| **Zo Platform Integration** |
| `zo_user_id` | text | Zo platform user ID |
| `zo_pid` | text | Zo platform PID |
| `zo_token` | text | Current Zo API token |
| `zo_token_expiry` | timestamp | Token expiration |
| `zo_refresh_token` | text | Refresh token |
| `zo_refresh_token_expiry` | timestamp | Refresh token expiration |
| `zo_legacy_token` | text | Legacy token |
| `zo_legacy_token_valid_till` | timestamp | Legacy token expiry |
| `zo_device_id` | text | Device identifier |
| `zo_device_secret` | text | Device secret |
| `zo_client_key` | text | Client key |
| `zo_device_info` | jsonb | Device information |
| `zo_roles` | jsonb | Zo platform roles |
| `zo_membership` | text | Membership type |
| `zo_home_location` | jsonb | Home location data |
| `zo_synced_at` | timestamp | Last Zo sync time |
| `zo_sync_status` | text | Sync status |
| **URLs** |
| `calendar_url` | text | Personal calendar URL |
| `main_quest_url` | text | Main quest URL |
| `side_quest_url` | text | Side quest URL |
| **Onboarding** |
| `onboarding_completed` | boolean | Onboarding status |
| `onboarding_step` | integer | Current onboarding step |
| **Timestamps** |
| `created_at` | timestamp | Account creation |
| `updated_at` | timestamp | Last update |
| `last_seen` | timestamp | Last activity |

**Row Count:** 79

---

### `user_wallets`
**Multi-chain wallet addresses linked to users.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `address` | text | Wallet address |
| `chain_type` | text | Blockchain type (ethereum, solana, etc.) |
| `wallet_client` | text | Wallet client name |
| `wallet_client_type` | text | Client type |
| `is_embedded` | boolean | Embedded wallet flag |
| `is_primary` | boolean | Primary wallet flag |
| `is_verified` | boolean | Verification status |
| `verified_at` | timestamp | Verification time |
| `linked_at` | timestamp | Link time |
| `last_used_at` | timestamp | Last usage |

**Row Count:** 75

---

### `user_auth_methods`
**Authentication methods linked to user accounts.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `auth_type` | text | Auth type (email, phone, oauth, etc.) |
| `identifier` | text | Auth identifier |
| `display_name` | text | Display name |
| `oauth_subject` | text | OAuth subject ID |
| `oauth_username` | text | OAuth username |
| `is_verified` | boolean | Verification status |
| `verified_at` | timestamp | Verification time |
| `linked_at` | timestamp | Link time |
| `last_used_at` | timestamp | Last usage |

**Row Count:** 0

---

### `user_inventory`
**User items, collectibles, and assets.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `item_type` | text | Type of item |
| `item_id` | text | Item identifier |
| `quantity` | integer | Quantity owned |
| `metadata` | jsonb | Additional item data |
| `acquired_at` | timestamp | Acquisition time |

**Row Count:** 0

---

### `user_reputations`
**Trait-based reputation scores for users.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `trait` | text | Reputation trait name |
| `score` | integer | Trait score |
| `updated_at` | timestamp | Last update |

**Row Count:** 0

---

### `user_streaks`
**Activity streak tracking.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `streak_type` | text | Type of streak |
| `count` | integer | Current streak count |
| `longest_streak` | integer | Longest streak achieved |
| `last_action_at` | timestamp | Last streak action |
| `created_at` | timestamp | Streak start |

**Row Count:** 63

---

## Gamification Tables

### `quests`
**Quest definitions and configurations.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `title` | text | Quest title |
| `slug` | text | URL-friendly slug |
| `description` | text | Quest description |
| `category` | text | Quest category |
| `difficulty` | text | Difficulty level |
| `reward` | text | Reward description |
| `rewards_breakdown` | jsonb | Detailed rewards |
| `requirements` | jsonb | Quest requirements |
| `status` | text | Quest status |
| `cooldown_hours` | integer | Cooldown between completions |
| `max_completions` | integer | Maximum completions allowed |
| `active_from` | timestamp | Start time |
| `active_until` | timestamp | End time |
| `deadline` | timestamp | Quest deadline |
| `created_at` | timestamp | Creation time |
| `updated_at` | timestamp | Last update |

**Row Count:** 1

---

### `completed_quests`
**Record of quest completions with rewards.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `quest_id` | text | Quest identifier |
| `wallet_address` | text | Wallet for reward |
| `amount` | numeric | Reward amount |
| `transaction_hash` | text | Blockchain transaction |
| `score` | integer | Points earned |
| `location` | text | Completion location |
| `latitude` | numeric | Latitude |
| `longitude` | numeric | Longitude |
| `metadata` | jsonb | Additional data |
| `completed_at` | timestamp | Completion time |
| `created_at` | timestamp | Record creation |

**Row Count:** 418

---

### `leaderboards`
**User rankings and point totals.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `user_id` | text | Foreign Key → users.id |
| `wallet` | text | Wallet address |
| `username` | text | Display username |
| `zo_points` | integer | Total Zo points |
| `total_quests_completed` | integer | Quest count |
| `last_quest_completed_at` | timestamp | Last completion |
| `created_at` | timestamp | Entry creation |
| `updated_at` | timestamp | Last update |

**Row Count:** 488

---

## Nodes (Property/Locations)

### `nodes`
**Zo locations, properties, and spaces.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `name` | text | Node name |
| `type` | node_type (enum) | Node type (see Enums) |
| `description` | text | Node description |
| `city` | text | City location |
| `country` | text | Country |
| `latitude` | double precision | Latitude |
| `longitude` | double precision | Longitude |
| `website` | text | Website URL |
| `twitter` | text | Twitter handle |
| `contact_email` | text | Contact email |
| `image` | text | Image URL |
| `features` | text[] | Array of features |
| `status` | text | Node status |
| `inserted_at` | timestamp | Creation time |
| `updated_at` | timestamp | Last update |

**Row Count:** 200

---

## Events & Calendars

### `calendars`
**Calendar sources for event aggregation.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary Key |
| `name` | text | Calendar name |
| `url` | text | Calendar URL (iCal, etc.) |
| `type` | text | Calendar type |
| `description` | text | Description |
| `is_active` | boolean | Active status |
| `created_at` | timestamp | Creation time |
| `updated_at` | timestamp | Last update |

**Row Count:** 4

---

### `canonical_events`
**Normalized events from multiple calendar sources.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `canonical_uid` | text | Unique event identifier |
| `title` | text | Event title |
| `description` | text | Event description |
| `location_raw` | text | Raw location string |
| `lat` | double precision | Latitude |
| `lng` | double precision | Longitude |
| `geocode_status` | text | Geocoding status |
| `geocode_attempted_at` | timestamp | Geocode attempt time |
| `starts_at` | timestamp | Start time |
| `ends_at` | timestamp | End time |
| `tz` | text | Timezone |
| `source_refs` | jsonb | Source references |
| `raw_payload` | jsonb | Original event data |
| `event_version` | integer | Version number |
| `created_at` | timestamp | Creation time |
| `updated_at` | timestamp | Last update |

**Row Count:** 0

---

### `canonical_event_changes`
**Event change history for auditing.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint | Primary Key |
| `canonical_event_id` | uuid | Foreign Key → canonical_events.id |
| `change_type` | text | Type of change |
| `payload` | jsonb | Change details |
| `created_at` | timestamp | Change time |

**Row Count:** 46

---

## Migration & Backup Tables

### `members`
**Legacy member data (pre-Privy migration).**

| Column | Type | Description |
|--------|------|-------------|
| `privy_id` | text | Primary Key (Privy ID) |
| `wallet` | text | Wallet address |
| `name` | text | Display name |
| `email` | text | Email |
| `bio` | text | Biography |
| `pfp` | text | Profile picture |
| `culture` | text | Culture |
| `x_handle` | text | Twitter handle |
| `x_connected` | boolean | Twitter status |
| `lat` | numeric | Latitude |
| `lng` | numeric | Longitude |
| `role` | text | Role |
| `founder_nfts_count` | integer | NFT count |
| `calendar_url` | text | Calendar URL |
| `main_quest_url` | text | Main quest URL |
| `side_quest_url` | text | Side quest URL |
| `last_seen` | timestamp | Last seen |
| `created_at` | timestamp | Creation time |

**Row Count:** 80

---

### `members_backup_pre_privy`
**Backup of member data before Privy migration.**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `wallet` | text | Wallet address |
| `role` | text | Role |
| `name` | text | Name |
| `email` | text | Email |
| `lat` | double precision | Latitude |
| `lng` | double precision | Longitude |
| `latitude` | double precision | Latitude (duplicate) |
| `longitude` | double precision | Longitude (duplicate) |
| `pfp` | text | Profile picture |
| `bio` | text | Biography |
| `x_handle` | text | Twitter handle |
| `x_connected` | boolean | Twitter status |
| `culture` | text | Culture |
| `calendar_url` | text | Calendar URL |
| `location_visible` | boolean | Location visibility |
| `DZO` | numeric | DZO balance |
| `main_quest_url` | text | Main quest URL |
| `side_quest_url` | text | Side quest URL |
| `founder_nfts_count` | integer | NFT count |
| `created_at` | timestamp | Creation time |
| `last_seen` | timestamp | Last seen |

**Row Count:** 53

---

### `privy_to_zo_migration`
**Tracking migration from Privy to Zo auth.**

| Column | Type | Description |
|--------|------|-------------|
| `privy_id` | text | Primary Key |
| `zo_user_id` | text | New Zo user ID |
| `migrated_at` | timestamp | Migration time |
| `migration_method` | text | Migration method |
| `old_data` | jsonb | Original data backup |

**Row Count:** 0

---

## PostGIS System Tables

These are system tables for PostGIS geographic functionality:

- `geography_columns` - Geography column metadata
- `geometry_columns` - Geometry column metadata
- `spatial_ref_sys` - Spatial reference systems (8500 entries)

---

## Entity Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS (users)                           │
│                              │                                  │
│    ┌────────────────────────┼────────────────────────┐         │
│    │                        │                        │         │
│    ▼                        ▼                        ▼         │
│ user_wallets          user_streaks           completed_quests  │
│ user_auth_methods     user_reputations       leaderboards      │
│ user_inventory                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        QUESTS (quests)                          │
│                              │                                  │
│                              ▼                                  │
│                      completed_quests                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CALENDARS (calendars)                      │
│                              │                                  │
│                              ▼                                  │
│                      canonical_events                           │
│                              │                                  │
│                              ▼                                  │
│                   canonical_event_changes                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        NODES (nodes)                            │
│              (standalone - 200 locations)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Enums

### `node_type`
Node/property type classification:

| Value | Description |
|-------|-------------|
| `schelling_point` | Main gathering space |
| `degen_lounge` | Crypto/trading space |
| `zo_studio` | Creative studio |
| `flo_zone` | Co-working area |
| `bored_room` | Meeting room |
| `liquidity_pool` | Pool/swimming area |
| `multiverse` | Multi-purpose space |
| `battlefield` | Gaming area |
| `bio_hack` | Biohacking space |
| `cafe` | Cafe/F&B |
| `420` | Cannabis-friendly space |
| `showcase` | Exhibition area |
| `culture_house` | Cultural space |
| `hacker_house` | Hacker house |
| `founder_house` | Founder residence |
| `staynode` | Accommodation |

---

## Connection Details

```env
# Supabase Configuration
VITE_NEXT_PUBLIC_SUPABASE_URL=https://elvaqxadfewcsohrswsi.supabase.co
VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>

# For server-side operations
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

---

## Usage Examples

### Fetch all nodes
```typescript
const { data: nodes } = await supabase
  .from('nodes')
  .select('*')
  .eq('status', 'active');
```

### Fetch user with wallets
```typescript
const { data: user } = await supabase
  .from('users')
  .select(`
    *,
    user_wallets (*),
    user_streaks (*)
  `)
  .eq('id', userId)
  .single();
```

### Fetch leaderboard
```typescript
const { data: leaderboard } = await supabase
  .from('leaderboards')
  .select('*')
  .order('zo_points', { ascending: false })
  .limit(100);
```

### Fetch completed quests by user
```typescript
const { data: quests } = await supabase
  .from('completed_quests')
  .select('*, quests(*)')
  .eq('user_id', userId)
  .order('completed_at', { ascending: false });
```

---

## Notes

1. **Authentication**: The app uses Zo platform authentication (`api.io.zo.xyz`), not Supabase Auth. User tokens are stored in the `users` table.

2. **Legacy Data**: The `members` and `members_backup_pre_privy` tables contain historical data from a Privy-based auth system.

3. **Geographic Data**: PostGIS is enabled for location-based queries on nodes and events.

4. **Empty Tables**: Several tables (`user_inventory`, `user_reputations`, `user_auth_methods`, `canonical_events`) are ready but not yet populated.

5. **Zo Integration**: The `users` table has extensive Zo platform fields for syncing with the external Zo API.

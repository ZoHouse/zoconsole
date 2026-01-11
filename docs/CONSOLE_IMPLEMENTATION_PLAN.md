# Zo Console Implementation Plan

## Data Sources

### 1. Zo API (api.io.zo.xyz)
- **Auth**: Phone OTP login
- **Profile**: User profile, NFTs, PFP
- **Web3**: Founder NFTs, allowlist, marketplace
- **Events**: Zoworld events, destinations

### 2. Supabase (PostgreSQL)
- **users** (79): Cached profiles with Zo tokens
- **nodes** (200): Properties/locations
- **leaderboards** (488): User rankings
- **completed_quests** (418): Quest completions
- **quests** (1): Quest definitions
- **user_streaks** (63): Activity streaks

## Tab Implementation Status

| Tab | Zo API | Supabase | Status |
|-----|--------|----------|--------|
| Dashboard | - | ✅ | Ready |
| Node Management | - | ✅ | Ready |
| Quest Management | - | ✅ | Ready |
| Founders | ✅ | - | Basic done |
| Event Management | ✅ | ✅ | Ready |
| Crew/Users | ✅ | ✅ | Ready |
| City Management | ✅ | ✅ | Ready |

## Build Priority

1. **Dashboard** - Aggregate metrics from Supabase
2. **Node Management** - CRUD for 200 nodes
3. **Quest Management** - Analytics on 418 completions
4. **Founders** - Enhance with marketplace
5. **Event Management** - Calendar integration
6. **Crew/Users** - User directory

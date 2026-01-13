# Zoconsole Scripts

## Zo Users → Supabase Migration

This script fetches ALL users from the Zo API (`/api/v1/cas/users/`) and syncs them to your Supabase database.

### Prerequisites

1. **Zo API Token** - You need a valid Zo authentication token with CAS admin permissions
2. **Supabase Credentials** - Your Supabase URL and service role key

### Getting Your Zo API Token

1. Log into the Zo Console app
2. Open browser DevTools (F12)
3. Go to Application → Local Storage → look for `zo_token` or check Network tab headers

Or get it from your `.env` file if configured.

### Running the Script

```bash
# Install tsx if not already installed
npm install -D tsx

# Set environment variables and run
ZO_API_TOKEN="your_zo_token" \
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key" \
npx tsx scripts/sync-zo-users-to-supabase.ts
```

Or create a `.env.local` file:

```env
ZO_API_TOKEN=your_zo_token
SUPABASE_URL=https://elvaqxadfewcsohrswsi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Then run:
```bash
# Load env and run
source .env.local && npx tsx scripts/sync-zo-users-to-supabase.ts
```

### What Gets Synced

| Zo API Field | Supabase Column |
|--------------|-----------------|
| `id` | `id`, `zo_user_id` |
| `profile.pid` | `zo_pid` |
| `profile.nickname` | `name`, `username` |
| `profile.full_name` | `name`, `first_name` |
| `profile.bio` | `bio` |
| `profile.pfp/avatar` | `pfp` |
| `profile.gender` | (stored in JSON) |
| `profile.date_of_birth` | `birthdate` |
| `profile.country` | `city` |
| `profile.cultures` | `culture`, `cultures` (JSON) |
| `profile.socials[twitter]` | `x_handle` |
| `emails[0].email_address` | `email` |
| `mobiles[0]` | `phone`, `phone_number` |
| `web3_wallets[primary]` | `wallet_address`, `primary_wallet_address` |
| `membership` | `role`, `user_tier`, `zo_membership` |
| `created_at` | `created_at` |

### Wallets

User wallets are also synced to the `user_wallets` table:

| Zo API Field | Supabase Column |
|--------------|-----------------|
| `wallet.id` | `id` |
| `user.id` | `user_id` |
| `wallet.wallet_address` | `address` |
| `wallet.chain_name` | `chain_type` |
| `wallet.primary` | `is_primary` |

### Output

```
═══════════════════════════════════════════════════════════
           Zo Users → Supabase Migration Script            
═══════════════════════════════════════════════════════════

🔑 Credentials found

   Zo API: https://api.io.zo.xyz
   Supabase: https://elvaqxadfewcsohrswsi...

📥 Fetching users from Zo API...

  ✓ Fetched 100/916 users
  ✓ Fetched 200/916 users
  ...
  ✓ Fetched 916/916 users

✅ Total users fetched: 916

🔄 Mapping users to Supabase schema...

📤 Syncing users to Supabase...

  ✓ Processed 50/916 users (42 new, 8 updated)
  ...

💳 Syncing user wallets...

  ✓ Wallets: 234 inserted, 0 errors

═══════════════════════════════════════════════════════════
                        Summary                            
═══════════════════════════════════════════════════════════

  📊 Total Users Fetched:  916
  ➕ New Users Inserted:   837
  🔄 Users Updated:        79
  💳 Wallets Inserted:     234
  ❌ Errors:               0

✅ Migration complete!
```

### Browser-Based Sync

You can also trigger sync from the app using the utility in `src/lib/api/sync-users.ts`:

```typescript
import { syncUsersToSupabase } from '../lib/api/sync-users';

// In a component or admin panel
const handleSync = async () => {
  try {
    const result = await syncUsersToSupabase((progress) => {
      console.log(`${progress.phase}: ${progress.message}`);
    });
    console.log('Done!', result);
  } catch (error) {
    console.error('Sync failed:', error);
  }
};
```

### Troubleshooting

**403 Access Denied**
- Your Zo token doesn't have CAS admin permissions
- Contact the Zo team to get admin access

**401 Unauthorized**
- Token is expired or invalid
- Log in again to get a fresh token

**Network Errors**
- Check your internet connection
- The script will retry 3 times automatically

**Supabase Errors**
- Verify your service role key (not anon key) for bulk operations
- Check if the `users` table exists with all required columns

# ZoConsole - Complete Repository Analysis

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Architecture & Data Flow](#4-architecture--data-flow)
5. [Authentication System](#5-authentication-system)
6. [Backend APIs](#6-backend-apis)
7. [Database Schema (Supabase)](#7-database-schema-supabase)
8. [Frontend Components - Detailed Breakdown](#8-frontend-components---detailed-breakdown)
9. [Services & Data Layer](#9-services--data-layer)
10. [Custom Hooks](#10-custom-hooks)
11. [UI Component Library](#11-ui-component-library)
12. [Styling & Theming](#12-styling--theming)
13. [Testing](#13-testing)
14. [Deployment & Infrastructure](#14-deployment--infrastructure)
15. [API Endpoint Reference](#15-api-endpoint-reference)
16. [Data Models & Type Definitions](#16-data-models--type-definitions)
17. [Key Patterns & Conventions](#17-key-patterns--conventions)
18. [Known State & Observations](#18-known-state--observations)

---

## 1. Project Overview

**Name:** Zo House Console ("Zohm Console")
**Purpose:** An admin management console for the **Zo World** network -- a global network of co-living/co-working "Zo Houses" across multiple cities. The console provides operational, financial, staff, IoT, event, and community management capabilities for property administrators.

**Domain Concepts:**
- **Zo Houses** -- Physical co-living/co-working properties (e.g., BLRxZo in Bangalore, WTFxZo, SFOxZo, DXBxZo, SGPxZo)
- **Nodes** -- Individual locations/spaces in the Zo World network (zo_house, zostel, cafe, etc.)
- **Zones** -- Sub-areas within nodes (schelling_point, degen_lounge, zo_studio, dorms, etc.)
- **Citizens** -- Registered Zo World users with membership tiers (founder, citizen, visitor)
- **Founders** -- NFT holders who are early supporters with special privileges
- **Crew** -- Staff members working at properties
- **Quests** -- Gamified tasks for user engagement with rewards economy
- **Playlists** -- Organized collections of housekeeping task templates

---

## 2. Tech Stack & Dependencies

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 6.3.5 | Build tool & dev server |
| TypeScript | (via SWC) | Type safety |
| @vitejs/plugin-react-swc | 3.10.2 | Fast React compilation |

### State Management & Data Fetching
| Library | Purpose |
|---|---|
| @tanstack/react-query 5.90.16 | Server state management, caching, mutations |
| react-hook-form 7.55.0 | Form state management |
| React Context (AuthContext) | Global auth state |

### Backend & Database
| Library | Purpose |
|---|---|
| @supabase/supabase-js 2.90.1 | Supabase database client (PostgreSQL) |
| axios 1.13.2 | HTTP client for Zo API |

### UI Libraries
| Library | Purpose |
|---|---|
| Radix UI (25+ packages) | Headless accessible UI primitives (dialog, dropdown, tabs, select, checkbox, etc.) |
| lucide-react 0.487.0 | Icon library |
| recharts 2.15.2 | Charts and data visualization |
| sonner 2.0.3 | Toast notifications |
| cmdk 1.1.1 | Command palette |
| vaul 1.1.2 | Drawer component |
| embla-carousel-react 8.6.0 | Carousel component |
| react-day-picker 8.10.1 | Date picker |
| react-resizable-panels 2.1.7 | Resizable panel layouts |
| input-otp 1.4.2 | OTP input component |
| next-themes 0.4.6 | Theme management |

### Styling
| Library | Purpose |
|---|---|
| Tailwind CSS v4.1.3 | Utility-first CSS |
| tailwind-merge | Merge Tailwind classes safely |
| class-variance-authority 0.7.1 | Component variant styling |
| clsx | Conditional class names |

### Utilities
| Library | Purpose |
|---|---|
| date-fns 4.1.0 | Date manipulation |
| libphonenumber-js 1.12.33 | Phone number parsing |
| dotenv 17.2.3 | Environment variables |

### Dev/Testing
| Library | Purpose |
|---|---|
| vitest 4.0.18 | Test runner |
| @testing-library/react 16.3.2 | React component testing |
| @testing-library/jest-dom 6.9.1 | DOM assertion matchers |
| @testing-library/user-event 14.6.1 | User interaction simulation |
| jsdom 27.4.0 | DOM environment for tests |
| tsx 4.21.0 | TypeScript execution |

### Package Manager
- **pnpm** (pnpm-lock.yaml present)

---

## 3. Project Structure

```
zoconsole/
+-- package.json                          # Project config and dependencies
+-- pnpm-lock.yaml                        # pnpm lockfile
+-- vite.config.ts                        # Vite build config with proxy and aliases
+-- vercel.json                           # Vercel deployment config (API proxy rewrites)
+-- .gitignore                            # Git ignore rules
+-- Zohm_API.postman_collection.json      # Full Postman API collection (110+ endpoints)
+-- verify_api.sh                         # API verification script
+-- public/
|   +-- lockedinwithzo.PNG                # Brand image
+-- dist/                                 # Production build output
+-- scripts/
|   +-- README.md                         # User sync script documentation
+-- src/
    +-- main.tsx                           # App entry point with providers
    +-- App.tsx                            # Root component with routing and auth
    +-- index.css                          # Tailwind CSS v4 stylesheet
    +-- styles/
    |   +-- globals.css                    # Global CSS custom properties
    +-- contexts/
    |   +-- AuthContext.tsx                # Authentication context provider
    +-- lib/
    |   +-- supabase.ts                   # Supabase client & sync utilities
    |   +-- axios.ts                      # Axios HTTP client configuration
    |   +-- database.types.ts             # Supabase TypeScript schema types
    |   +-- api/
    |       +-- endpoints.ts              # Centralized API endpoint definitions
    +-- services/
    |   +-- dashboard.ts                  # Dashboard/crew/staff API service
    |   +-- nodes.ts                      # Node/zone/template/playlist API service
    +-- hooks/
    |   +-- useSupabaseData.ts            # React Query hooks for Supabase
    |   +-- useZoApi.ts                   # React Query hooks for Zo API
    +-- components/
    |   +-- Sidebar.tsx                   # Main navigation sidebar
    |   +-- Dashboard.tsx                 # KPI dashboard (hardcoded metrics)
    |   +-- PropertyFilter.tsx            # Property selector dropdown
    |   +-- CaptainsDeck.tsx              # Property command center (multi-view)
    |   +-- Crew.tsx                      # Staff management & daily reports
    |   +-- Profitability.tsx             # Revenue/cost/profit analysis
    |   +-- Sales.tsx                     # Multi-product sales analytics
    |   +-- Marketing.tsx                 # Campaign management
    |   +-- Cafe.tsx                      # Meal planning & kitchen management
    |   +-- Inventory.tsx                 # Basic inventory tracking
    |   +-- InventoryNew.tsx              # Enhanced inventory (assets/consumables/orders)
    |   +-- VibeCuration.tsx              # Atmosphere management (comms/portals/sound/lights)
    |   +-- Portals.tsx                   # Digital screen management
    |   +-- PortalsManager.tsx            # Portal screens/assets/playlists/scheduling
    |   +-- IoTHub.tsx                    # IoT device monitoring & automation
    |   +-- NodeManagement.tsx            # Node CRUD with zones & analytics
    |   +-- CityManagement.tsx            # City network management
    |   +-- EventManagement.tsx           # Event lifecycle & revenue tracking
    |   +-- QuestManagement.tsx           # Gamification system management
    |   +-- AgentManagement.tsx           # AI agent deployment management
    |   +-- Founders.tsx                  # Founder NFT dashboard (user-facing)
    |   +-- FoundersManagement.tsx        # Admin founder management with enrichment
    |   +-- UsersManagement.tsx           # Full user management with Supabase
    |   +-- PlaylistManager.tsx           # Task/template/playlist hierarchy manager
    |   +-- TaskScheduler.tsx             # Housekeeping task scheduling
    |   +-- TaskTemplatePlaylistModals.tsx # Creation modals for tasks/templates/playlists
    |   +-- PMSDataModal.tsx              # PMS booking data viewer
    |   +-- PMSStatsWidget.tsx            # PMS booking stats widget
    |   +-- auth/
    |   |   +-- Login.tsx                 # OTP-based login UI
    |   +-- sidebars/
    |   |   +-- FounderInfoSidebar.tsx    # Founder detail drawer
    |   |   +-- UserInfoSidebar.tsx       # User detail drawer
    |   |   +-- index.ts                  # Barrel exports
    |   +-- figma/
    |   |   +-- ImageWithFallback.tsx     # Image with error fallback
    |   +-- ui/                           # 40+ shadcn/ui components (see Section 11)
    |   +-- __tests__/
    |       +-- CreationWorkflows.test.tsx # Integration tests
    +-- imports/
    |   +-- HomePage.tsx                  # Figma-exported landing page
    |   +-- svg-3ppr2pbcfw.ts             # SVG path data for icons
    +-- test/
        +-- setup.ts                      # Vitest setup (cleanup, jest-dom)
```

---

## 4. Architecture & Data Flow

### High-Level Architecture

```
Browser
  |
  +-- React App (Vite SPA)
       |
       +-- AuthContext (global auth state)
       +-- React Query (server state cache)
       |
       +-- Data Sources:
       |    +-- Zo API (Railway)     <-- axios via zoServer
       |    |    Base: https://zohm-api.up.railway.app/api/v1/
       |    |    Auth: Bearer token + client-key + device credentials
       |    |
       |    +-- Supabase (PostgreSQL) <-- @supabase/supabase-js
       |         Auth: anon key (reads) + service role key (admin writes)
       |
       +-- Vercel (hosting)
            Proxy: /api/v1/* --> Railway API (CORS bypass)
```

### Data Flow Pattern

1. **Authentication**: Phone OTP via Zo API -> token stored in localStorage -> synced to Supabase
2. **Zo API Data**: Profile, Web3/NFTs, events, admin/CAS endpoints -> fetched via `useZoApi.ts` hooks
3. **Supabase Data**: Users, nodes, zones, quests, leaderboards -> fetched via `useSupabaseData.ts` hooks
4. **Zohm Operations API**: Staff, tasks, templates, playlists, daily performance, PMS bookings -> fetched via `services/dashboard.ts` and `services/nodes.ts`
5. **Data Enrichment**: FoundersManagement combines Zo API (blockchain) data with Supabase (user profile) data

### Routing

The app uses **tab-based navigation** (not React Router). The `App.tsx` component manages an `activeTab` state and conditionally renders the appropriate component:

```
activeTab values -> Component
---
dashboard        -> Dashboard
profitability    -> Profitability
crew             -> Crew
captains-deck    -> CaptainsDeck
vibe-curation    -> VibeCuration
cafe             -> Cafe
sales            -> Sales
marketing        -> Marketing
quest-management -> QuestManagement
node-management  -> NodeManagement
city-management  -> CityManagement
agent-management -> AgentManagement
event-management -> EventManagement
iot-hub          -> IoTHub
founders         -> FoundersManagement
users            -> UsersManagement
```

### Property Context

A `selectedProperty` string (default: "wtfxzo") flows from App -> all child components. Properties: BLRxZo, WTFxZo, SFOxZo, DXBxZo, SGPxZo.

---

## 5. Authentication System

### Flow

```
1. User enters 10-digit phone number (India country code 91 hardcoded)
2. POST /auth/login/mobile/otp -> sends OTP via SMS
3. User enters 6-digit OTP
4. POST /auth/login/mobile -> returns { user, token, valid_till }
5. Token + user stored in localStorage
6. User synced to Supabase (upsert by zo_user_id)
7. On subsequent visits: GET /auth/login/check validates token
8. On token expiry: POST /auth/login/refresh attempts refresh
9. On 401: auto-logout (Axios interceptor clears localStorage, redirects to /)
```

### Auth Components

- **AuthContext.tsx**: Provides `user`, `token`, `isLoggedIn`, `isLoading`, `login()`, `logout()` globally
- **Login.tsx**: Two-step UI (phone -> OTP) with dark theme, auto-submit on 6th digit, paste support, 30s resend cooldown
- **Axios interceptor**: Attaches Bearer token to every request; auto-clears on 401

### Device Identification

Each browser session generates:
- `client-device-id`: `web-{timestamp}-{random}`
- `client-device-secret`: Base64(`{timestamp}:{deviceId}`)

Both persist in localStorage and are sent as headers on every Zo API request.

---

## 6. Backend APIs

The console connects to **three backend systems**:

### 6.1 Zo API (Primary Platform API)

**Base URL:** `https://zohm-api.up.railway.app/api/v1/`
**Auth:** Bearer token + client-key + device-id + device-secret
**Proxied through:** Vite dev server (`/api/v1` -> Railway) and Vercel rewrites

**Endpoint Categories:**

| Category | Endpoints | Purpose |
|---|---|---|
| Auth | OTP send, verify, check, refresh, logout | Mobile OTP authentication |
| Profile | GET/PATCH /profile/me, NFTs, PFPs | User profile management |
| Web3/Founders | Founder NFTs, allowlist, marketplace, PoA | Blockchain/NFT operations |
| ZoWorld | Events, destinations, metadata, countries, bulletins | Platform content |
| CAS (Admin) | Founder token stats/owners, user listing/lookup | Admin console endpoints |

### 6.2 Zohm Operations API (Property Management)

**Base URL:** Same Railway host, different endpoint paths
**Auth:** Same Bearer token

**Full CRUD for these resources (all have GET list, GET by ID, POST, PATCH, DELETE):**

| Resource | Path | Purpose |
|---|---|---|
| Tasks | /tasks | Housekeeping tasks |
| Templates | /templates | Task template collections |
| Zone Templates | /zone-templates | Zone-template mappings |
| Playlists | /playlists | Template playlist collections |
| Daily Performance | /daily-performance | Staff daily reports |
| Task Completions | /task-completions | Task completion records |
| Zone Completions | /zone-completions | Zone completion records |
| Housekeeping Sessions | /housekeeping-sessions | Housekeeping session logs |
| PMS Bookings | /pms-bookings | Property Management System bookings |
| Staff | /staff | Staff member records |
| Properties | /properties | Property definitions |
| Schedules | /schedules | Staff schedules |
| WhatsApp Groups | /whatsapp-groups | Communication groups |
| Notified Bookings | /notified-bookings | Booking notifications |
| Staff Breaks | /staff-breaks | Break tracking |
| Housekeeping Shifts | /housekeeping-shifts | Shift management |
| Staff Zone Assignments | /staff-zone-assignments | Zone assignments |
| Housekeeping Zones | /housekeeping-zones | Zone definitions |
| Nodes | /nodes | Node management |
| Node Zones | /node-zones | Zone management within nodes |
| Health | /health, /ready, /live | Health checks |

### 6.3 Supabase (Database)

**Tables used directly from frontend:**
- `users` -- User profiles (synced from Zo API)
- `nodes` -- Network nodes
- `zones` -- Zones within nodes
- `leaderboards` -- Quest points ranking
- `completed_quests` -- Quest completion records
- `quests` -- Quest definitions

**Access patterns:**
- **Anon key**: Read operations (user lookups, node queries)
- **Service role key** (`getAdminSupabaseClient()`): Write operations bypassing Row Level Security (node create/update/delete, user sync)

---

## 7. Database Schema (Supabase)

### users

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key (Supabase generated) |
| name | string | Display name |
| username | string | Zo username |
| email | string | Email address |
| phone | string | Phone variant 1 |
| phone_number | string | Phone variant 2 |
| pfp | string | Profile picture URL |
| role | string | User role |
| zo_user_id | string | Zo platform user ID |
| zo_token | string | Cached Zo auth token |
| zo_token_expiry | string | Token expiration |
| zo_device_id | string | Device identifier |
| zo_device_secret | string | Device secret |
| zo_synced_at | timestamp | Last sync time |
| zo_sync_status | string | Sync status ('synced') |
| wallet_address | string | Ethereum wallet |
| founder_nfts_count | number | NFT holdings count |
| zo_membership | string | Membership tier (founder/citizen/visitor) |
| total_reputation_score | number | Reputation score |
| city | string | User's city |
| bio | string | Biography |
| created_at | timestamp | Account creation |
| updated_at | timestamp | Last update |
| last_seen | timestamp | Last activity |

### nodes

| Column | Type | Notes |
|---|---|---|
| id | string | Node ID (manually set, lowercase) |
| name | string | Display name |
| type | NodeType | One of 18 types (see below) |
| description | string | Description |
| city | string | City location |
| country | string | Country |
| latitude | number | GPS lat |
| longitude | number | GPS long |
| status | string | active/developing/planning |
| features | string[] | Feature list |
| website | string | Website URL |
| contact | string | Contact info |
| image | string | Image URL |
| logo | string | Logo URL |
| address | string | Physical address |
| hours | object | Opening hours by day |
| created_at | timestamp | Creation time |
| updated_at | timestamp | Last update |

### NodeType (18 values)
`zo_house`, `zostel`, `food`, `stay`, `park`, `hospital`, `fire_station`, `post_office`, `bar`, `metro`, `airport`, `shopping`, `art`, `sports_arena`, `arcade`, `library`, `gym`, `startup_hub`

### ZoneType (13 values)
`schelling_point`, `degen_lounge`, `zo_studio`, `flo_zone`, `liquidity_pool`, `multiverse`, `battlefield`, `bio_hack`, `zo_cafe`, `420`, `showcase`, `dorms`, `private_rooms`

### leaderboards

| Column | Type |
|---|---|
| id | uuid |
| user_id | string |
| username | string |
| zo_points | number |
| total_quests_completed | number |

### quests

| Column | Type |
|---|---|
| id | uuid |
| title | string |
| description | string |
| status | string |

### completed_quests

| Column | Type |
|---|---|
| id | uuid |
| user_id | string |
| quest_id | string |
| score | number |
| completed_at | timestamp |

---

## 8. Frontend Components - Detailed Breakdown

### 8.1 App.tsx (Root Component)

- Manages global `activeTab`, `sidebarOpen`, `selectedProperty` state
- Shows `Login` when not authenticated, loading spinner during auth check
- Renders `Sidebar` + active tab component
- Passes `selectedProperty` and `onPropertyChange` to all children

### 8.2 Sidebar.tsx (Navigation)

- **Admin Section**: Dashboard, City Management, Node Management, Quest Management, Agent Management, Event Management, IoT Hub, Founders, Users
- **Property Section**: Property filter dropdown (5 properties)
- **Feature Section**: Captain's Deck, Vibe Curation, Cafe, Sales, Marketing
- **Footer**: Hardcoded user "samurai.zo" with Admin role
- Mobile responsive with hamburger toggle and overlay

### 8.3 Dashboard.tsx (KPI Overview)

- Displays 10 hardcoded metric cards: Total Bookings, GBV, Cities, Zo Houses, Citizens, Nodes, POA, Events, Portals, Rating
- Static data (not API-connected)
- Cards show primary value + delta/secondary value

### 8.4 CaptainsDeck.tsx (Property Command Center)

The main operational hub with 6 sub-views:

| Sub-view | Content |
|---|---|
| **Overview** | IoT status (vibe score, sound, power, WiFi), P&L summary, maintenance tasks, low stock alerts, camera feeds, Google Reviews |
| **Profitability** | Embeds Profitability component |
| **Crew** | Embeds Crew component |
| **Inventory** | Embeds InventoryNew component |
| **Tasks** | Embeds TaskScheduler component |
| **Playlists** | Embeds PlaylistManager component |

Uses mock data for overview widgets.

### 8.5 Crew.tsx (Staff Management)

- **API-connected**: `fetchDashboardStats`, `fetchDailyReports`, `fetchStaffList`
- **Views**: Staff Overview (summary cards), Performance Reports, Daily Reports (per-staff cards), Staff Directory (searchable table)
- **Fields**: avatar, tasks completed, efficiency %, points, shift times, attendance status, customer rating
- Fetches yesterday's reports by default

### 8.6 Profitability.tsx (Financial Analysis)

- 4 metric cards: Total Revenue, Total Costs, Net Profit, Profit Margin
- Revenue breakdown table/chart by category
- PMS data integration via PMSDataModal and PMSStatsWidget
- Date range filtering

### 8.7 PMSDataModal.tsx & PMSStatsWidget.tsx (PMS Integration)

- **PMSDataModal**: Fetches `/pms-bookings`, displays expandable booking rows, client-side date range filtering (1d/3d/7d/15d/1m)
- **PMSStatsWidget**: Aggregates PMS booking totals for quick stats display

### 8.8 Sales.tsx (Multi-Product Sales)

Tabs for 7 product categories:
- Overview, Rooms, Events, Co-working, Studio, Amenities, Cafe
- Filters: node, city, period (this month, last month, last 3 months, custom)

### 8.9 Marketing.tsx (Campaign Management)

6 tabs: Overview, Campaigns, Creatives, Audiences, Conversions, Rules
Filters: date range (7d/30d/this-month/last-month/custom), node, status

### 8.10 Cafe.tsx (Kitchen Management)

- **MealCalendar**: Weekly schedule with breakfast/lunch/dinner/snacks slots
- **MenuPlanning**: Menu items with recipes, nutrition (protein/carbs/fiber/fat/sugar), prep time, cost, chef assignment
- Week navigation with prev/next

### 8.11 Inventory.tsx & InventoryNew.tsx

- **Inventory.tsx**: Basic dual-view (House Zones / Kitchen) with status tracking (Perfect/Defect)
- **InventoryNew.tsx**: Enhanced 5-tab view: Overview, Assets, Consumables, Orders, Reports

### 8.12 VibeCuration.tsx (Atmosphere Control)

4 sub-views: Comms, Portals, Sound, Lights
Integrates PortalsManager for digital screen content management.

### 8.13 Portals.tsx & PortalsManager.tsx

- **Portals.tsx**: Top-level screen management (screens, content library, schedule)
- **PortalsManager.tsx**: Detailed management with grid/list view, screen status monitoring, asset uploads, playlist builder, schedule editor
- Screen types: wayfinder, info display, ads, sales screens

### 8.14 IoTHub.tsx (IoT Device Management)

4 tabs:

| Tab | Content |
|---|---|
| **Overview** | System status for 5 categories (Lighting/TVs/WiFi/Cameras/Smart Locks), metrics with trends, alerts |
| **Devices** | Filterable device grid with status/readings |
| **Automation** | Rules with triggers/actions, pre-configured scenes |
| **Analytics** | Power usage trends, temperature, network traffic, device performance |

### 8.15 NodeManagement.tsx (Network Nodes)

- **Overview**: Node statistics, type distribution, data quality metrics, completeness scoring
- **Nodes**: CRUD operations with modal form, search/filter by status/type/location
- **Analytics**: Charts and metrics
- **API**: Uses `useNodes`, `useNodeStats`, `useCreateNode`, `useUpdateNode`, `useDeleteNode` (Supabase)
- Node ID validation to prevent duplicates
- Zone management within node edit modal
- 18 node types, 13 zone types

### 8.16 CityManagement.tsx (City Network)

- Aggregates nodes into cities with region grouping
- Status calculation: hub (5+ nodes), growing (3-4), emerging (1-2), planned (0)
- Country flag emoji mapping for 40+ countries
- User count tracking per city
- Three views: Overview, Cities, Analytics

### 8.17 EventManagement.tsx (Events)

- 15+ sample events with revenue/attendance data
- Multi-house tracking (BLR, SFO, DXB, WTF, SGP)
- Event types: Meetup, Workshop, Cultural, Hacker House, Networking, Conference, Co-working
- Revenue analytics, type distribution, house performance comparison
- Links to Lu.ma event pages

### 8.18 QuestManagement.tsx (Gamification)

- **Quests**: CRUD with categories (daily/weekly/special/seasonal/progressive/location/social/minigame), difficulties (easy/medium/hard/expert)
- **Economy**: Rewards, coin circulation, spending patterns
- **Citizens**: User stats, quest participation, leaderboard
- **API**: Uses Supabase hooks for quests, leaderboard, completed_quests

### 8.19 AgentManagement.tsx (AI Agents)

- Manages AI agents across the network
- Categories: communication, moderation, analytics, automation, support
- Status: active, idle, maintenance, offline
- Deployment controls, performance metrics, activity logs

### 8.20 Founders.tsx (User-Facing Founder Dashboard)

- Displays founder NFT holdings, allowlist status, marketplace activity
- Uses `useFounderNfts`, `useFounderAllowlist`, `useFounderMarketplace` hooks
- Grid display of NFTs with tier badges
- Flexible API response parsing (`toArray()` helper)

### 8.21 FoundersManagement.tsx (Admin Founder Management)

- **Dual data source**: Zo API (blockchain data) + Supabase (user profiles)
- Paginated token owner list (20/page) with search
- Stats: Total Holders, NFTs Minted, App Users, Holds 1+, Verified X, Verified Telegram
- Data enrichment: Matches wallet addresses to Supabase users for name, email, phone, city
- CSV export, Etherscan links, FounderInfoSidebar on row click

### 8.22 UsersManagement.tsx (User Administration)

- **Overview**: 6 metric cards (Total Users, Founders, Citizens, Visitors, Cities, With Wallets)
- **Users List**: Paginated (50/page), debounced search (300ms), role/status filters
- **Analytics**: Placeholder for future analytics
- **Data source**: Supabase only (direct queries)
- Membership hierarchy: founder > citizen > visitor
- UserInfoSidebar for detail view

### 8.23 PlaylistManager.tsx (Task Organization)

Manages the hierarchical task system:

```
Tasks (individual work items)
  -> Templates (zone-specific ordered task collections)
    -> Playlists (pre-made template collections for assignment)
```

- Fetches node data including zones, templates, housekeeping tasks
- Create/assign tasks, templates, playlists via modals
- Photo requirement and AI verification tracking
- Estimated time and task count summaries

### 8.24 TaskScheduler.tsx (Daily Operations)

- Stats: Active Tasks, Active Crew, Completed, Pending
- Task table with zone, floor, template, use case columns
- Search and zone filter
- Create task/template modal integration

### 8.25 TaskTemplatePlaylistModals.tsx (Creation Forms)

Three reusable modal components:

| Modal | Fields |
|---|---|
| **CreateTaskModal** | Name, description, photo required, AI verification, estimated time, reference image, template assignment |
| **CreateTemplateModal** | Name, zone selection, multi-select tasks with ordering, summary metrics |
| **CreatePlaylistModal** | Name, template selection with zone type filter, priority, trigger conditions |

### 8.26 Sidebars (Detail Panels)

- **FounderInfoSidebar.tsx**: Founder profile drawer with enriched data (Supabase + API fallback), NFT count, wallet with Etherscan link, contact info, bio, debug info
- **UserInfoSidebar.tsx**: User profile from Supabase only, membership color coding (gold=founder, cyan=citizen, gray=default), sync status tracking, WhatsApp link for phone

### 8.27 Login.tsx (Authentication UI)

- Dark theme with lime green (#9ae600) accent
- Two-step: phone number entry -> 6-digit OTP input
- Auto-submit on 6th digit, paste support, auto-focus navigation
- 30-second resend cooldown timer
- India country code (91) hardcoded
- "Locked in with Zo" branding

---

## 9. Services & Data Layer

### 9.1 services/dashboard.ts

| Function | Endpoint | Returns |
|---|---|---|
| `fetchDashboardStats(propertyId?)` | Computed from `/staff` | DashboardStats: total_staff, active_now, on_leave, revenue_per_employee, top_performer |
| `fetchDailyReports(date?, propertyId?)` | `GET /daily-performance` | DailyReport[]: attendance, tasks, efficiency, points, shift times |
| `fetchStaffList(propertyId?)` | `GET /staff` | StaffMember[]: name, role, department, status, phone, shifts |
| `fetchTasks(propertyId?, zoneId?)` | `GET /tasks` | Task[]: name, description, photo_required, category, priority, status |

All functions handle variable API response formats (`{ success, data }`, direct array, wrapped).

### 9.2 services/nodes.ts

| Function | Endpoint | Returns |
|---|---|---|
| `fetchNodeData(nodeId)` | `GET /nodes/{nodeId}` | NodeData: zones[], templates[], housekeeping_tasks[] |
| `createTask(payload)` | `POST /tasks` | Created task |
| `createTemplate(payload)` | `POST /templates` | Created template |
| `createZoneTemplate(payload)` | `POST /zone-templates` | Created zone-template mapping |
| `createPlaylist(payload)` | `POST /playlists` | Created playlist |
| `fetchPlaylists(nodeId)` | `GET /playlists?node_id={id}` | APIPlaylist[] |
| `fetchTasks(nodeId)` | `GET /tasks?node_id={id}` | APITask[] |
| `fetchTemplates(nodeId)` | `GET /templates?node_id={id}` | APITemplateItem[] |
| `getUniqueZonesFromTasks(tasks)` | Local | Unique Zone[] |
| `getUniqueTemplatesFromTasks(tasks)` | Local | Unique Template[] |

### 9.3 lib/supabase.ts

| Export | Purpose |
|---|---|
| `supabase` | Main Supabase client (anon key, no RLS bypass) |
| `getAdminSupabaseClient()` | Admin client (service role key, bypasses RLS) |
| `syncUserToSupabase(user, token, expiry)` | Upsert user data to Supabase on login |
| `getCachedUser(zoUserId)` | Lookup user by zo_user_id |
| `getNodes()` | Fetch active nodes ordered by name |
| `getLeaderboard()` | Fetch leaderboard sorted by zo_points |

### 9.4 lib/axios.ts

- Creates `zoServer` Axios instance
- Base URL from `VITE_API_BASE_URL` env var
- Auto-attaches: Bearer token, client-key, device-id, device-secret
- Request interceptor: refreshes auth headers
- Response interceptor: auto-logout on 401

---

## 10. Custom Hooks

### 10.1 useZoApi.ts (Zo API Hooks)

All hooks use React Query and are disabled when not logged in (except public endpoints).

**Profile:**
- `useProfile()` -- Get/update user profile
- `useMyNfts()` -- User's NFTs
- `useProfilePictures()` -- User profile pictures

**Web3/Founders:**
- `useFounderNfts(wallet?)` -- Founder NFTs by wallet
- `useFounderAllowlist()` -- Allowlist entries
- `useFounderMarketplace()` -- Marketplace listings
- `useOwnedNfts(address?)` -- NFTs by address
- `usePoa(eventId?)` -- Proof of attendance
- `usePublicPoa()` -- Public PoA (no auth)

**ZoWorld:**
- `useZoworldEvents(params?)` -- Events (limit, offset, city)
- `useDestinations()` -- Destination list
- `useZoworldMetadata()` -- Platform metadata
- `useCountries()` -- Countries
- `useBulletinSocials()` -- Social bulletins
- `usePublicBulletins()` -- Public bulletins (no auth)

**Auth:**
- `useUserWallets()` -- Web3 wallets
- `useUserEmails()` -- Email addresses
- `useUserMobiles()` -- Phone numbers
- `useMobileLogin()` -- OTP login (requestOtp + verifyOtp mutations)

**Admin (CAS):**
- `useFounderTokensStats()` -- Token statistics
- `useFounderTokensOwners(params?)` -- Paginated owner list
- `useFounderTokensByAddress(address)` -- Holdings by address
- `useProfileById(pid)` -- Admin profile lookup
- `useUsers(params?)` -- Paginated users (search, date range)
- `useUserById(userId)` -- Single user

### 10.2 useSupabaseData.ts (Supabase Hooks)

**City Hooks:**
- `useCities()` -- Aggregates nodes into cities with status (hub/growing/emerging/planned based on node count) and region grouping
- `useCityDetails(city, country)` -- Single city with node list

**Node Hooks:**
- `useNodes(filters?)` -- Filtered node list (city, country, type, status)
- `useNode(nodeId)` -- Single node
- `useNodeIdExists(nodeId)` -- Duplicate validation (staleTime: 0)
- `useNodeStats()` -- Comprehensive stats: totals, type/zone/country counts, data quality metrics, completeness scores (0-100), recent updates
- `useNodesWithZoneCounts(filters?)` -- Nodes with zone counts

**Node Mutations:**
- `useCreateNode()` -- Creates with admin client (RLS bypass), auto-generates ID
- `useUpdateNode()` -- Updates by ID
- `useDeleteNode()` -- Deletes by ID

**Zone Hooks:**
- `useNodeWithZones(nodeId)` -- Node with nested zones
- Zone CRUD mutations

---

## 11. UI Component Library

The project uses **shadcn/ui** components (Radix UI primitives + Tailwind styling). 40+ UI components in `src/components/ui/`:

| Component | File | Radix Primitive |
|---|---|---|
| Accordion | accordion.tsx | @radix-ui/react-accordion |
| Alert Dialog | alert-dialog.tsx | @radix-ui/react-alert-dialog |
| Alert | alert.tsx | -- |
| Aspect Ratio | aspect-ratio.tsx | @radix-ui/react-aspect-ratio |
| Avatar | avatar.tsx | @radix-ui/react-avatar |
| Badge | badge.tsx | -- |
| Breadcrumb | breadcrumb.tsx | -- |
| Button | button.tsx | @radix-ui/react-slot |
| Calendar | calendar.tsx | react-day-picker |
| Card | card.tsx | -- |
| Carousel | carousel.tsx | embla-carousel-react |
| Chart | chart.tsx | recharts |
| Checkbox | checkbox.tsx | @radix-ui/react-checkbox |
| Collapsible | collapsible.tsx | @radix-ui/react-collapsible |
| Command | command.tsx | cmdk |
| Context Menu | context-menu.tsx | @radix-ui/react-context-menu |
| Data List Display | data-list-display.tsx | -- |
| Dialog | dialog.tsx | @radix-ui/react-dialog |
| Drawer | drawer.tsx | vaul |
| Dropdown Menu | dropdown-menu.tsx | @radix-ui/react-dropdown-menu |
| Form | form.tsx | react-hook-form |
| Hover Card | hover-card.tsx | @radix-ui/react-hover-card |
| Input OTP | input-otp.tsx | input-otp |
| Input | input.tsx | -- |
| Label | label.tsx | @radix-ui/react-label |
| Menubar | menubar.tsx | @radix-ui/react-menubar |
| Navigation Menu | navigation-menu.tsx | @radix-ui/react-navigation-menu |
| Pagination | pagination.tsx | -- |
| Popover | popover.tsx | @radix-ui/react-popover |
| Progress | progress.tsx | @radix-ui/react-progress |
| Radio Group | radio-group.tsx | @radix-ui/react-radio-group |
| Resizable | resizable.tsx | react-resizable-panels |
| Scroll Area | scroll-area.tsx | @radix-ui/react-scroll-area |
| Select | select.tsx | @radix-ui/react-select |
| Separator | separator.tsx | @radix-ui/react-separator |
| Sheet | sheet.tsx | @radix-ui/react-dialog |
| Sidebar | sidebar.tsx | -- (custom) |
| Skeleton | skeleton.tsx | -- |
| Slider | slider.tsx | @radix-ui/react-slider |
| Sonner (Toast) | sonner.tsx | sonner |
| Switch | switch.tsx | @radix-ui/react-switch |
| Table | table.tsx | -- |
| Tabs | tabs.tsx | @radix-ui/react-tabs |
| Textarea | textarea.tsx | -- |
| Toggle Group | toggle-group.tsx | @radix-ui/react-toggle-group |
| Toggle | toggle.tsx | @radix-ui/react-toggle |
| Tooltip | tooltip.tsx | @radix-ui/react-tooltip |

**Utilities:**
- `utils.ts` -- `cn()` function (clsx + tailwind-merge)
- `use-mobile.ts` -- `useIsMobile()` hook (breakpoint: 768px)
- `user-mini.tsx` -- Compact user display component

---

## 12. Styling & Theming

### CSS Architecture

- **index.css**: Tailwind CSS v4.1.3 with CSS custom properties layer
- **globals.css**: Application theme variables with light/dark mode support

### Design System

- **Color space**: OKLCH (perceptually uniform)
- **Primary palette**: Dark theme (background: #000000, foreground: #ffffff)
- **Accent colors**: Lime green (#9ae600) for branding, various semantic colors
- **Border radius**: Base 0.625rem with sm/md/lg/xl variants
- **Dark mode**: Supported via `.dark` class with inverted OKLCH values

### Theme Variables (CSS Custom Properties)

```css
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
--chart-1 through --chart-5
--sidebar-background, --sidebar-foreground, etc.
--radius (base border radius)
```

---

## 13. Testing

### Setup

- **Runner**: Vitest 4.0.18 with jsdom environment
- **Libraries**: @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- **Config**: `vite.config.ts` test block (globals: true, environment: jsdom)
- **Setup file**: `src/test/setup.ts` (imports jest-dom matchers, afterEach cleanup)

### Existing Tests

**`src/components/__tests__/CreationWorkflows.test.tsx`**:
- Tests PlaylistManager creation workflows
- Mocks: nodesService (fetchNodeData, fetchPlaylists, fetchTasks, fetchTemplates, createTask, createTemplate, createZoneTemplate, createPlaylist)
- Test cases:
  1. CreateTask flow: validates API call parameters and template linking
  2. CreateTemplate flow: validates template + zone-template creation
  3. CreatePlaylist flow: validates playlist creation with template IDs

### Running Tests

```bash
pnpm vitest          # or npx vitest
```

---

## 14. Deployment & Infrastructure

### Build

```bash
pnpm dev             # Dev server on port 3000 with API proxy
pnpm build           # Production build to dist/
pnpm preview         # Preview production build
```

### Vite Configuration

- **Dev server**: Port 3000, auto-open browser
- **Proxy**: `/api/v1` -> `https://zohm-api.up.railway.app` (CORS bypass)
- **Aliases**: `@` -> `./src`, plus versioned package aliases for Radix UI and other libraries
- **Build target**: esnext, output to `dist/`

### Vercel Deployment

- **vercel.json**: Rewrites `/api/v1/:path*` to `https://zohm-api.up.railway.app/api/v1/:path*`
- This serves as production API proxy for CORS bypass

### Environment Variables (Vite VITE_ prefix)

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Zo API base URL |
| `VITE_ZO_CLIENT_KEY_WEB` | Client key for API auth |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (bypasses RLS) |

### Backend

- **API Server**: Hosted on Railway (`zohm-api.up.railway.app`)
- **Database**: Supabase (managed PostgreSQL)

---

## 15. API Endpoint Reference

### Zo Platform API (`/api/v1/...`)

```
POST   /auth/login/mobile/otp              -- Send OTP
POST   /auth/login/mobile                  -- Verify OTP
GET    /auth/login/check                   -- Check session
POST   /auth/login/refresh                 -- Refresh token
GET    /profile/me                         -- Get profile
PATCH  /profile/me                         -- Update profile
GET    /profile/me/nfts                    -- User NFTs
GET    /profile/me/pfp                     -- Profile pictures
GET    /webthree/founder/nfts/?wallet=     -- Founder NFTs
GET    /webthree/founder/allowlist         -- Allowlist
GET    /webthree/founder/marketplace/listings -- Marketplace
GET    /webthree/nft/owned/{address}       -- Owned NFTs
GET    /webthree/poa/?event_id=            -- Proof of attendance
GET    /webthree/public/poa                -- Public PoA
GET    /zoworld/events/?limit=&offset=&city= -- Events
GET    /zoworld/destinations               -- Destinations
GET    /zoworld/metadata                   -- Metadata
GET    /zoworld/countries                  -- Countries
GET    /zoworld/bulletin/socials           -- Social bulletins
GET    /zoworld/public/bulletins           -- Public bulletins
GET    /auth/user/web3-wallets             -- User wallets
GET    /auth/user/emails                   -- User emails
GET    /auth/user/mobiles                  -- User mobiles
GET    /cas/founder-tokens/stats           -- Token stats (admin)
GET    /cas/founder-tokens/owners/?...     -- Token owners (admin)
GET    /cas/founder-tokens/{address}       -- Tokens by address (admin)
GET    /cas/profiles/{pid}                 -- Profile by ID (admin)
GET    /cas/users/?limit=&offset=&search=  -- Users list (admin)
GET    /cas/users/{userId}                 -- User by ID (admin)
```

### Zohm Operations API (Full CRUD)

Each resource supports: `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`

```
/tasks                    -- Housekeeping tasks
/templates                -- Task templates
/zone-templates           -- Zone-template mappings
/playlists                -- Template playlists
/daily-performance        -- Staff daily reports
/task-completions         -- Task completion records
/zone-completions         -- Zone completion records
/housekeeping-sessions    -- Housekeeping sessions
/pms-bookings             -- PMS booking data
/staff                    -- Staff members
/properties               -- Properties
/schedules                -- Schedules
/whatsapp-groups          -- WhatsApp groups
/notified-bookings        -- Booking notifications
/staff-breaks             -- Staff breaks
/housekeeping-shifts      -- Shifts
/staff-zone-assignments   -- Zone assignments
/housekeeping-zones       -- Housekeeping zones
/nodes                    -- Nodes
/node-zones               -- Node zones
/health                   -- Health check
/ready                    -- Readiness check
/live                     -- Liveness check
```

---

## 16. Data Models & Type Definitions

### Key TypeScript Interfaces

```typescript
// Auth
interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  // ... from Zo API login response
}

// Dashboard
interface DashboardStats {
  total_staff: number;
  active_now: number;
  on_leave: number;
  revenue_per_employee: number;
  top_performer: string;
}

interface DailyReport {
  staff_id: string;
  staff_name: string;
  role: string;
  shift_date: string;
  shift_start_time: string;
  shift_end_time: string;
  attendance_status: string;
  zones_completed: number;
  tasks_completed: number;
  total_points: number;
  total_work_minutes: number;
  total_break_minutes: number;
  property_id: string;
  efficiency: number;       // computed
  average_time: number;     // computed
  issues_flagged: number;   // computed
  customer_rating: number;  // computed
}

interface StaffMember {
  staff_id: string;
  staff_name: string;
  role: string;
  department: string;
  status: 'active' | 'on_leave' | 'inactive' | 'On Leave';
  property_id: string;
  shift_start: string;
  shift_end: string;
  phone_number: string;
}

interface Task {
  task_id: string;
  task_name: string;
  task_description: string;
  photo_required: 'yes' | 'no';
  estimated_time: string;
  category: string;
  zone_id: string;
  zone_name: string;
  priority: string;
  status: string;
  assigned_to: string;
}

// Nodes Service
interface Zone {
  id: string;
  node_id: string;
  name: string;
  floor: string;
  zone_type: string;
  capacity: number;
}

interface NodeTemplate {
  id: string;
  node_id: string;
  name: string;
  description: string;
  use_case: string;
}

interface HousekeepingTask {
  id: string;
  node_id: string;
  zone_id: string;
  zone_name: string;
  floor: string;
  template_id: string;
  template_name: string;
  use_case: string;
}

interface APIPlaylist {
  id: string;
  playlist_id: string;
  playlist_type: string;
  role: string;
  zone_names: string[];
  zone_ids: string[];
  template_names: string[];
  template_ids: string[];
  priority: 'high' | 'normal' | 'low';
  est_time: string;
  trigger_when: string;
  node_id: string;
}

// Supabase
type NodeType = 'zo_house' | 'zostel' | 'food' | 'stay' | 'park' |
  'hospital' | 'fire_station' | 'post_office' | 'bar' | 'metro' |
  'airport' | 'shopping' | 'art' | 'sports_arena' | 'arcade' |
  'library' | 'gym' | 'startup_hub';

type ZoneType = 'schelling_point' | 'degen_lounge' | 'zo_studio' |
  'flo_zone' | 'liquidity_pool' | 'multiverse' | 'battlefield' |
  'bio_hack' | 'zo_cafe' | '420' | 'showcase' | 'dorms' | 'private_rooms';
```

---

## 17. Key Patterns & Conventions

### State Management
- **Global**: React Context (AuthContext only)
- **Server state**: React Query with 60s stale time, 1 retry
- **Local**: useState within components, prop drilling for shared state
- **No client router**: Tab-based navigation via activeTab state in App.tsx

### Data Fetching
- **Dual backend**: Zo API (axios) for platform data, Supabase for database operations
- **Flexible response parsing**: All services handle multiple API response formats (`{ success, data }`, direct array, wrapped)
- **Data enrichment**: Some views combine data from both backends (e.g., FoundersManagement)

### Component Patterns
- **Embedded mode**: Components like Crew, Profitability accept `embedded` prop to hide headers when used inside CaptainsDeck
- **Controlled/uncontrolled**: Components like VibeCuration, CaptainsDeck support both external and internal state
- **Sidebar details**: Row click opens detail sidebar (FounderInfoSidebar, UserInfoSidebar)

### Error Handling
- Comprehensive error states with retry buttons
- Auth-specific error messages (401/403)
- Skeleton loading states via shadcn Skeleton component

### Security Notes
- Service role key exposed in browser via `VITE_SUPABASE_SERVICE_ROLE_KEY` (used for RLS bypass)
- Device credentials auto-generated and persisted in localStorage
- Token auto-refresh and auto-logout on 401

### Code Style
- Functional components with hooks
- TypeScript throughout (no .js files in src)
- Tailwind CSS for all styling (no CSS modules or styled-components)
- Lucide React for icons
- shadcn/ui component patterns

---

## 18. Known State & Observations

### Active Development Areas
- Task/template/playlist system recently integrated with API (latest commits)
- User sync from Zo API to Supabase is operational
- Node management has duplicate validation

### Hardcoded / Mock Data
- **Dashboard.tsx**: All 10 KPI metrics are hardcoded
- **CaptainsDeck.tsx overview**: IoT status, P&L, maintenance, camera feeds, stock items are mock data
- **EventManagement.tsx**: 15+ sample events hardcoded
- **IoTHub.tsx**: All device data, automation rules, analytics are mock
- **AgentManagement.tsx**: All agent data is mock
- **Sales.tsx / Marketing.tsx**: Mostly UI shells with mock data
- **Cafe.tsx**: Meal and menu data hardcoded
- **Portals.tsx / PortalsManager.tsx**: Screen and content data mock

### API-Connected Features (Live Data)
- Authentication (OTP login/logout)
- Crew/Staff management (daily reports, staff list)
- Node management (CRUD via Supabase)
- Quest management (CRUD via Supabase)
- Founders management (Zo API + Supabase enrichment)
- Users management (Supabase queries)
- Task/template/playlist CRUD (Zohm Operations API)
- PMS bookings (Operations API)

### Potential Concerns
1. **Service role key in browser**: `VITE_SUPABASE_SERVICE_ROLE_KEY` is exposed client-side, bypassing all RLS policies
2. **Hardcoded country code**: Login only supports India (+91)
3. **No client-side routing**: No URL-based navigation (no back button, no deep linking)
4. **Duplicate React Query**: Both `react-query@3` and `@tanstack/react-query@5` in dependencies
5. **Hardcoded user**: Sidebar footer shows "samurai.zo" regardless of logged-in user
6. **dist/ committed**: Built artifacts appear to be in the repository

### File Counts
- **Source components**: 30 main components + 40+ UI components
- **Services/hooks**: 4 service files, 2 custom hook files
- **Total source files**: ~100 TypeScript/CSS files
- **Postman endpoints**: 110+ API endpoints documented

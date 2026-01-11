# ZO HOUSE CONSOLE: UNIFIED INVENTORY SYSTEM
**Handling Both Assets AND Consumables**

---

## THE TWO TYPES OF INVENTORY

After seeing the Excel sheet, it's clear Zo House needs to track TWO distinct inventory types:

### 1. ASSETS (Fixed Inventory) - What you're tracking now
**Characteristics:**
- High value, long lifespan (furniture, electronics, appliances)
- Track: Condition, location, maintenance, depreciation
- Rarely replaced (only when broken/damaged)
- Need: Asset tagging, condition monitoring, maintenance scheduling

**Examples from your Excel:**
- CELLO H2O Bottles (₹1,40,000)
- Ambrane Extension Board (₹549)
- Dell Screen Mini PC (₹5,039,600)
- Sauna Unit (₹7,55,500)
- Pickleball Paddles (₹3,000)
- SOUFETTA EXY Sofa (₹1,956)

### 2. CONSUMABLES (Supplies) - What you need to add
**Characteristics:**
- Low-medium value, short lifespan (food, cleaning supplies, toiletries)
- Track: Stock levels, consumption rate, reorder points
- Frequently replaced (daily/weekly/monthly)
- Need: Reorder automation, usage tracking, waste monitoring

**Examples you'll need:**
- Kitchen: Rice, Dal, Milk, Vegetables, Spices, Coffee, Tea
- Housekeeping: Detergent, Toilet paper, Towels, Soap, Shampoo
- Maintenance: Light bulbs, Screws, Paint, Cleaning chemicals
- Office: Paper, Pens, Printer ink

---

## UNIFIED STRUCTURE

### Main Navigation (Captain's Deck > Inventory)

```
┌────────────────────────────────────────────────────────────────────────┐
│  📊 Overview  │  🏢 Assets  │  📦 Consumables  │  📋 Orders  │  📈 Reports  │
└────────────────────────────────────────────────────────────────────────┘
```

This keeps both inventory types organized but separate where they need different logic.

---

## TAB 1: OVERVIEW DASHBOARD

**Top Metrics (Combined view)**
```
┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│  Total Asset Value  │  Consumables Value  │  Items Need Action  │  Pending Orders     │
│     ₹2.4 Crore      │      ₹2.8L          │        18           │         3           │
└─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

**Alerts Section (Priority sorted)**
1. 🔴 **CRITICAL CONSUMABLES (5)**: Coffee out of stock, Milk critical
2. 🟠 **ASSET MAINTENANCE DUE (3)**: Sauna service overdue, AC filter change
3. 🟡 **LOW STOCK (12)**: Rice, Toilet paper, Cleaning supplies
4. 🔵 **ASSET CONDITION (2)**: Pickleball paddle damaged, Sofa skin off

**Quick Actions**
- [+ Add Asset] - Register new furniture/equipment
- [+ Stock In] - Receive consumables
- [📋 Create Order] - Order consumables
- [🔧 Log Maintenance] - Record asset service
- [📊 Stock Count] - Physical inventory check

**Zone Summary Cards**
Shows health across zones (combines assets + consumables):

```
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  🍳 KITCHEN                      │  │  🧹 HOUSEKEEPING                │
│  Assets: 45 items (3 need fix)  │  │  Assets: 120 items (all good)   │
│  Consumables: 🟡 12 low stock   │  │  Consumables: 🔴 5 critical     │
└─────────────────────────────────┘  └─────────────────────────────────┘

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  🎮 GAMES ROOM                   │  │  🏓 AMENITIES                   │
│  Assets: 28 items (1 damaged)   │  │  Assets: 15 items (2 need fix)  │
│  Consumables: 🟢 All good       │  │  Consumables: 🟡 3 low stock    │
└─────────────────────────────────┘  └─────────────────────────────────┘
```

---

## TAB 2: ASSETS (Fixed Inventory)

**This replicates your Excel but with superpowers**

### Filter Bar
- 🏢 Node: [All / Koramangala / Whitefield]
- 🏗️ Area: [All / Degen Lounge / Kitchen / Flo-Zone / Sauna / Studio / etc.]
- 📁 Category: [All / Furniture / Electronics / Kitchen Supply / House Supply]
- 🏷️ Type: [All / Fixed / Movable]
- 📊 Status: [All / Perfect / Needs Repair / Damaged / Retired]
- 🔍 Search: [Item name, color, or asset tag]

### Asset List Table (Mirrors your Excel)

| Asset Tag | Date Added | Area | Item Name | Color | Price | Qty | Fixed/Movable | Category | Status | Condition | Actions |
|-----------|------------|------|-----------|-------|-------|-----|---------------|----------|--------|-----------|---------|
| AST-001 | 28/06/2025 | Degen Lounge | Ex 3 Seater Sofa | Silver | ₹1,40,000 | 1 | Movable | Furniture | Perfect | - | [View] [Edit] [Service] |
| AST-002 | 28/06/2025 | Degen Lounge | CELLO H2O Bottle 900ml | Grey | ₹5,960 | 1 | Movable | Kitchen Supply | Perfect | - | [View] [Edit] |
| AST-003 | 12/02/2025 | Kitchen | Ambrane Extension Board | White | ₹549 | 1 | Movable | Electronics | Perfect | - | [View] [Edit] |
| AST-018 | 28/06/2025 | Pickleball | Pickleball Paddles | Brown | ₹3,000 | 2 | Movable | Furniture | Damaged | skin off | [View] [Edit] [Repair] |

**Visual Indicators:**
- 🟢 Green row = Perfect condition
- 🟡 Yellow row = Needs service/maintenance
- 🟠 Orange row = Damaged (needs repair)
- 🔴 Red row = Broken (needs replacement)

### Asset Detail View (Click any row)

**Example: Pickleball Paddles (AST-018)**

```
┌─────────────────────────────────────────────────────────────────┐
│  PICKLEBALL PADDLES                              [Edit] [Delete] │
├─────────────────────────────────────────────────────────────────┤
│  📸 [Image of paddles]                                          │
│                                                                  │
│  Basic Info:                                                     │
│  • Asset Tag: AST-018                                           │
│  • Date Added: 28/06/2025                                       │
│  • Area: Pickleball Court (Whitefield)                         │
│  • Category: Sports Equipment                                   │
│  • Type: Movable                                                │
│                                                                  │
│  Purchase Info:                                                  │
│  • Price: ₹3,000 (₹1,500 per paddle)                           │
│  • Quantity: 2 paddles                                          │
│  • Supplier: Amazon                                             │
│  • Warranty: 1 year (expires Dec 2025)                         │
│                                                                  │
│  Current Status:                                                 │
│  • Condition: 🟠 Damaged                                        │
│  • Issue: Skin peeling off on one paddle                       │
│  • Reported: Jan 5, 2026 by Bhangbuddy                         │
│  • Priority: Medium (still usable but degrading)               │
│                                                                  │
│  Maintenance History:                                            │
│  • Jan 5, 2026 - Damage reported (skin off)                    │
│  • Nov 12, 2025 - Routine cleaning                             │
│  • Sep 8, 2025 - Grip replacement                              │
│  • Jun 28, 2025 - Initial purchase                             │
│                                                                  │
│  Usage Stats:                                                    │
│  • Total Usage: 145 hours (tracked via bookings)               │
│  • Current Week: 8 hours                                        │
│  • Last Used: Yesterday, 4pm                                    │
│                                                                  │
│  Actions:                                                        │
│  [🔧 Schedule Repair] [📋 Create Maintenance Task]             │
│  [📸 Upload Photo] [📝 Add Note]                               │
└───────────────────────────────────────────────────────────────���─┘
```

### Asset Actions (From table or detail view)

**[+ Add New Asset]** - Modal form:
- Area: [Dropdown]
- Item Name: [Text]
- Color: [Dropdown or color picker]
- Price: [₹ Number]
- Quantity: [Number]
- Fixed/Movable: [Radio buttons]
- Category: [Dropdown]
- Supplier: [Text]
- Invoice Number: [Text]
- Warranty Period: [Number + months/years]
- Upload Photo: [File picker]
- Notes: [Text area]
- [Save] [Cancel]

**[🔧 Schedule Repair/Service]** - Create maintenance task:
- Issue Description: [Text area]
- Priority: [Low / Medium / High / Urgent]
- Assign To: [Staff dropdown]
- Due Date: [Date picker]
- Estimated Cost: [₹ Number]
- Notes: [Text area]
- [Create Task] [Cancel]

**[📋 Bulk Actions]**
- Select multiple assets
- Actions: [Change Status] [Move to Area] [Schedule Service] [Export] [Print QR Codes]

### Asset Categories (with counts)

Show count per category:
- 🛋️ Furniture (245 items, ₹85L value)
- 💻 Electronics (89 items, ₹1.2Cr value)
- 🍴 Kitchen Supply (156 items, ₹15L value)
- 🏠 House Supply (78 items, ₹8L value)
- 🎮 Games & Recreation (34 items, ₹12L value)
- 🧘 Wellness (Sauna, Pool) (12 items, ₹45L value)

### Asset QR Codes

**Generate QR codes for physical tagging:**
- Each asset gets unique QR code (AST-001, AST-002, etc.)
- Print QR sticker → Stick on physical item
- Staff can scan QR → View item details, report issue, log usage
- Example: Scan pickleball paddle → "Report: Paddle grip worn out"

---

## TAB 3: CONSUMABLES (Supplies)

**This is the new system for food, cleaning supplies, etc.**

### Filter Bar (Same as spec)
- 🏢 Node: [All / Koramangala / Whitefield]
- 🏗️ Zone: [All / Kitchen / Bar / Housekeeping / Maintenance / Office]
- 📁 Category: [All / Food / Beverages / Cleaning / Linens / Toiletries]
- 📊 Status: [All / In Stock / Low Stock / Critical / Out of Stock]
- 🔍 Search: [Item name or SKU]

### Consumables List Table

| SKU | Item | Zone | Category | Current Stock | Par Level | Status | Days to Stockout | Last Used | Reorder | Actions |
|-----|------|------|----------|---------------|-----------|--------|------------------|-----------|---------|---------|
| F-RIC-001 | Rice (Basmati) | Kitchen | Food > Staples | 15 kg | 20 kg | 🟡 Low | 18 days | Today | Yes | [+/-] [Order] |
| F-MIL-001 | Milk (Full Cream 1L) | Kitchen | Dairy | 5L | 10L | 🔴 Critical | 2 days | 1h ago | URGENT | [+/-] [Order] |
| H-TP-001 | Toilet Paper Rolls | Housekeeping | Toiletries | 45 rolls | 50 rolls | 🟢 Good | 22 days | Yesterday | No | [+/-] |
| K-COF-001 | Coffee Beans (500g) | Kitchen | Beverages | 2 kg | 2 kg | 🟡 Low | 10 days | Today | Yes | [+/-] [Order] |

**Color coding:**
- 🟢 Green: Stock > reorder point (good)
- 🟡 Yellow: Stock ≤ reorder point (need to order soon)
- 🔴 Red: Stock ≤ par level (critical, order now!)

### Consumable Detail View (Click row)

**Example: Coffee Beans**

```
┌─────────────────────────────────────────────────────────────────┐
│  COFFEE BEANS (LEVISTA PREMIUM 500G)             [Edit] [Delete] │
├─────────────────────────────────────────────────────────────────┤
│  📸 [Image of coffee bag]                                       │
│                                                                  │
│  Basic Info:                                                     │
│  • SKU: K-COF-001                                               │
│  • Zone: Kitchen                                                 │
│  • Category: Beverages > Coffee                                 │
│  • Unit: grams (sold in 500g packs)                            │
│  • Brand: Levista Premium                                       │
│                                                                  │
│  Stock Levels:                                                   │
│  • Current Stock: 2,000g (4 packs) 🟡                          │
│  • Par Level: 2,000g (4 packs)                                 │
│  • Reorder Point: 2,500g (5 packs)                             │
│  • Reorder Quantity: 5,000g (10 packs)                         │
│  • Max Stock: 10,000g (20 packs)                               │
│  • Days to Stockout: 10 days                                    │
│                                                                  │
│  Consumption (Last 30 days):                                     │
│  📊 [Line graph showing daily usage]                            │
│  • Total Used: 6,000g                                           │
│  • Avg Daily: 200g                                              │
│  • Pattern: Consistent ✓                                        │
│  • Peak Day: Weekends (250g)                                    │
│                                                                  │
│  Supplier Info:                                                  │
│  • Primary: Big Basket                                          │
│  • Lead Time: 2 days                                            │
│  • Unit Cost: ₹450 per 500g pack                               │
│  • Last Order: Jan 3, 2026 (3 days ago)                        │
│  • Last Price: ₹450 (no change)                                │
│                                                                  │
│  Reorder Recommendation:                                         │
│  💡 Order 5,000g (10 packs) = ₹4,500                           │
│  Reason: Current stock lasts 10 days. With 2-day lead time,    │
│  ordering 5kg gives you 25-day supply. Next order in 2 weeks.  │
│                                                                  │
│  Recent Movements (Last 5):                                      │
│  • Jan 6, 9:30am - Out: 200g (Breakfast prep by Chef Ravi)    │
│  • Jan 5, 9:15am - Out: 200g (Breakfast prep)                 │
│  • Jan 4, 9:00am - Out: 200g (Breakfast prep)                 │
│  • Jan 3, 2:00pm - In: 5,000g (From Big Basket, ₹4,500)       │
│  • Jan 3, 9:30am - Out: 200g (Breakfast prep)                 │
│                                                                  │
│  Actions:                                                        │
│  [📦 Order Now] [+ Stock In] [- Record Usage]                  │
│  [📝 Edit Details] [📊 View Full History]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Stock Operations (Modal forms)

**[+ Stock In]** (Receiving purchase):
- Item: Coffee Beans (auto-filled if from detail view)
- Quantity: [5000] g (10 packs)
- Supplier: [Big Basket ▼]
- Invoice #: BB-12345
- Unit Cost: ₹450 per pack
- Total Cost: ₹4,500 (auto-calculated)
- Batch #: LOT-2025-45
- Expiry: N/A (or date picker for perishables)
- Received By: [Bhangbuddy ▼]
- Notes: [Optional]
- [Save] [Cancel]

**[- Record Usage]** (Daily consumption):
- Item: Coffee Beans (auto-filled)
- Quantity Used: [200] g
- Used For: [Breakfast Prep ▼]
- Used By: [Chef Ravi ▼]
- Date/Time: [Auto: Today 9:30am]
- Notes: [Optional]
- [Save] [Cancel]

---

## TAB 4: ORDERS (Purchase Orders)

**Unified ordering for consumables (assets purchased separately)**

### Reorder Queue (Auto-generated recommendations)

**Items Needing Order (18 items)**

| Priority | Item | Type | Current Stock | Recommended Qty | Supplier | Est. Cost | Days Left | Action |
|----------|------|------|---------------|-----------------|----------|-----------|-----------|--------|
| 🔴 URGENT | Milk (1L) | Consumable | 5L | 20L (20 packs) | Big Basket | ₹1,200 | 2 days | [Order] [Snooze] |
| 🔴 URGENT | Coffee Beans | Consumable | 2kg | 5kg (10 packs) | Big Basket | ₹4,500 | 10 days | [Order] [Snooze] |
| 🟡 SOON | Rice (Basmati) | Consumable | 15kg | 25kg (5 bags) | Local Vendor | ₹2,500 | 18 days | [Order] [Snooze] |
| 🟡 SOON | Toilet Paper | Consumable | 45 rolls | 100 rolls | Amazon | ₹3,200 | 22 days | [Order] [Snooze] |

**Smart Bundling:**
"Save on delivery by bundling these orders:"
- 📦 **Big Basket Bundle** (12 items) - ₹18,500 - 1 delivery
  - Milk, Coffee, Rice, Vegetables, Spices, etc.
- 📦 **Amazon Bundle** (5 items) - ₹6,200 - 1 delivery
  - Toilet paper, Cleaning supplies, etc.

**One-Click Actions:**
- [📦 Create Orders] - Generate POs for all selected bundles
- [📧 Email Suppliers] - Auto-send POs to supplier emails
- [⏰ Schedule Order] - Set up recurring orders (e.g., milk every Monday)

### Active Orders (In Progress)

| Order # | Date | Supplier | Items | Total | Status | Expected | Actions |
|---------|------|----------|-------|-------|--------|----------|---------|
| PO-1234 | Jan 5 | Big Basket | 12 items | ₹24,500 | 🚚 In Transit | Jan 7 | [Track] [Receive] |
| PO-1233 | Jan 3 | Amazon | 5 items | ₹8,900 | 📦 Delivered | - | [Mark Received] |

### Order History

| Order # | Date | Supplier | Items | Total | Status | Notes |
|---------|------|----------|-------|-------|--------|-------|
| PO-1232 | Dec 28 | Big Basket | 15 items | ₹32,100 | ✓ Completed | - |
| PO-1231 | Dec 22 | Local Vendor | 3 items | ₹4,500 | ✓ Completed | - |

### Create Purchase Order (Manual)

**[+ New Purchase Order]** - Modal:
1. Select Supplier: [Big Basket ▼]
2. Add Items:
   - Search/select items from inventory
   - Enter quantities
   - System shows unit cost and calculates total
3. Review:
   - Total Cost: ₹24,500
   - Expected Delivery: 2 days (Jan 8)
4. Notes/Instructions: [Text area]
5. [Generate PO] → Creates PDF, emails supplier, tracks status

---

## TAB 5: REPORTS (Analytics)

**Combined insights from assets + consumables**

### Report Types

**1. Asset Reports**
- **Asset Register**: Complete list with values (for audits)
- **Depreciation Report**: Asset value over time
- **Maintenance Schedule**: Upcoming services
- **Asset Utilization**: Which assets used most (via booking data)
- **Damaged Assets**: List of items needing repair/replacement
- **Asset by Category**: Breakdown by furniture/electronics/etc.

**2. Consumable Reports**
- **Consumption Report**: Usage trends (daily/weekly/monthly)
- **Cost Analysis**: Spend by category, price trends
- **Waste Report**: Items wasted (expired/spoiled)
- **Stockout History**: How often did we run out?
- **Reorder Performance**: Are reorder points accurate?
- **Supplier Performance**: Lead time, price, reliability

**3. Financial Reports**
- **Total Inventory Value**: Assets + Consumables
- **Monthly Spend**: Total purchases per month
- **Cost per Resident**: Consumables cost / # of residents
- **Budget vs Actual**: Planned vs actual spend

### Example Report: Monthly Inventory Summary

```
📊 INVENTORY SUMMARY - JANUARY 2026

ASSETS:
• Total Assets: 642 items
• Total Value: ₹2.45 Crore
• New Assets: 12 (₹3.2L)
• Retired Assets: 3 (₹45K)
• Maintenance Done: 8 items
• Pending Repairs: 5 items

CONSUMABLES:
• Total SKUs: 245 items
• Current Stock Value: ₹2.8L
• Total Purchased: ₹8.5L
• Total Consumed: ₹8.2L
• Waste: ₹12K (1.4%)
• Stockouts: 2 instances (Coffee, Milk)

TOP SPEND CATEGORIES:
1. Food (Kitchen): ₹4.2L
2. Housekeeping Supplies: ₹1.8L
3. Beverages: ₹1.2L
4. Maintenance Supplies: ₹0.8L
5. Office: ₹0.5L

REORDER EFFICIENCY:
• On-time orders: 92% (22/24 orders)
• Stockouts prevented: 18
• Overstock instances: 2 (Potatoes, Onions)
• Avg days to reorder: 1.2 days ✓

COST SAVINGS:
• Bulk orders: ₹12K saved
• Supplier switching: ₹8K saved
• Waste reduction: ₹6K saved
• Total: ₹26K saved vs last month
```

---

## KEY DIFFERENCES: ASSETS vs CONSUMABLES

| Aspect | Assets | Consumables |
|--------|--------|-------------|
| **Lifespan** | Years | Days to months |
| **Value** | High (₹500 - ₹50L+) | Low (₹10 - ₹5K) |
| **Tracking** | Condition, maintenance | Stock level, consumption |
| **Replacement** | When broken | When depleted |
| **Primary Concern** | Asset condition & depreciation | Stockouts & waste |
| **Actions** | Service, repair, retire | Reorder, consume, waste |
| **Data Points** | Purchase date, warranty, status | Stock qty, par level, usage rate |
| **Alerts** | Maintenance due, damaged | Low stock, expiry |

---

## IMPLEMENTATION PLAN

### Phase 1: Asset Management (Week 1) ✓
**Import from Excel + enhance**
- Import existing Excel data as assets
- Add asset tagging (AST-001, AST-002, etc.)
- Condition tracking
- Area/category filtering
- Search and bulk actions

### Phase 2: Consumables Setup (Week 2)
**Build consumables from scratch**
- Create item master (Kitchen, Housekeeping, etc.)
- Set par levels and reorder points
- Stock in/out recording
- Basic alerts (low stock)

### Phase 3: Smart Reorder (Week 3)
**Add intelligence**
- Consumption tracking (auto-calculate daily usage)
- Reorder recommendations
- Purchase order generation
- Supplier management

### Phase 4: Integration (Week 4)
**Connect the dots**
- Unified dashboard (overview)
- Combined reports
- Mobile stock counting
- QR code scanning (assets + consumables)

### Phase 5: Advanced Features (Week 5+)
**Power user features**
- Automated reorder rules
- Maintenance scheduling (assets)
- Waste tracking & analysis
- Supplier performance tracking
- Budget vs actual alerts

---

## SAMPLE DATA STRUCTURE

### Assets Table (Your Excel → Database)
```
CREATE TABLE assets (
  id INT PRIMARY KEY,
  asset_tag VARCHAR(20) UNIQUE, -- AST-001, AST-002
  date_added DATE,
  node VARCHAR(50), -- Koramangala, Whitefield
  area VARCHAR(100), -- Degen Lounge, Kitchen, Flo-Zone
  item_name TEXT,
  color VARCHAR(50),
  price DECIMAL(10,2),
  quantity INT,
  fixed_movable VARCHAR(10), -- Fixed, Movable
  category VARCHAR(100), -- Furniture, Electronics, etc.
  status VARCHAR(50), -- Perfect, Needs Repair, Damaged, Retired
  condition_remarks TEXT, -- "skin off", etc.
  supplier VARCHAR(200),
  invoice_number VARCHAR(100),
  warranty_months INT,
  warranty_expiry DATE,
  image_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Consumables Table (New)
```
CREATE TABLE consumables (
  id INT PRIMARY KEY,
  sku VARCHAR(20) UNIQUE, -- F-RIC-001, H-TP-001
  node VARCHAR(50),
  zone VARCHAR(100), -- Kitchen, Housekeeping
  category VARCHAR(100), -- Food, Cleaning, etc.
  subcategory VARCHAR(100), -- Dairy, Vegetables, etc.
  item_name VARCHAR(200),
  brand VARCHAR(100),
  unit VARCHAR(20), -- kg, liters, pieces
  pack_size VARCHAR(50), -- 500g, 1L
  current_stock DECIMAL(10,2),
  par_level DECIMAL(10,2),
  reorder_point DECIMAL(10,2),
  reorder_quantity DECIMAL(10,2),
  max_stock DECIMAL(10,2),
  primary_supplier_id INT,
  lead_time_days INT,
  unit_cost DECIMAL(10,2),
  is_perishable BOOLEAN,
  shelf_life_days INT,
  storage_location VARCHAR(200),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## MIGRATION PLAN (Excel → System)

### Step 1: Export Excel to CSV
- Clean up current Excel sheet
- Standardize columns
- Export as CSV

### Step 2: Import to Assets Table
- Create import tool in Captain's Deck
- Map CSV columns to database fields
- Auto-generate asset tags (AST-001, AST-002, etc.)
- Validate data (check for duplicates, missing fields)
- Import in batches

### Step 3: Generate QR Codes
- For each asset, generate QR code
- Print QR stickers
- Staff physically tags items
- Scan to verify correct tagging

### Step 4: Add Consumables
- House Captain creates consumable items
- Set par levels based on experience
- Start tracking consumption
- Refine reorder points over 2-4 weeks

### Step 5: Train Staff
- House Captain training (full system)
- Kitchen staff (consumable tracking only)
- Housekeeping (stock counting)
- All staff (QR scanning for reporting issues)

---

## SUCCESS METRICS

**Assets:**
- ✓ 100% assets tagged and in system (migrate from Excel)
- ✓ 0% missing assets (QR scan verification)
- ✓ <48hr response time on reported damages
- ✓ 90% maintenance tasks completed on time

**Consumables:**
- ✓ <2% stockout rate per month
- ✓ <5% waste rate
- ✓ 90% reorder accuracy (right quantities)
- ✓ <24hr time from alert to order placed

**Overall:**
- ✓ Save 20 hours/month on inventory management
- ✓ Real-time inventory visibility for House Captain
- ✓ 15% cost reduction (better ordering, less waste)
- ✓ No surprise shortages during high-occupancy periods

---

## MOBILE APP FEATURES

### For House Captain:
- View all alerts (low stock, damaged assets)
- Approve purchase orders
- Quick stock in/out recording
- View inventory value and reports

### For Kitchen Staff:
- Daily usage entry (quick form)
- View recipe ingredient availability
- Request items (create internal transfer)

### For Housekeeping:
- Stock count mode (simplified for cleaning supplies, linens)
- Report damaged assets (scan QR → report issue)
- Request supplies

### For All Staff:
- Scan asset QR code → View details
- Report issue: "Sofa damaged", "Light bulb out"
- Check if item available before promising to guest

---

## NEXT STEPS

1. **Review this unified spec** - Confirm structure works for both assets + consumables
2. **Prepare Excel migration** - Clean up current data for import
3. **Define initial consumables list** - List out 50-100 key items (start with Kitchen)
4. **Set par levels** - For each consumable, define min/max/reorder
5. **Build UI** - Implement in Captain's Deck > Inventory
6. **Import assets** - Migrate Excel → System
7. **Add consumables** - Start with Kitchen zone
8. **Test with real operations** - 2-week pilot
9. **Iterate and expand** - Add more zones, refine logic

---

**This unified system gives you:**
- ✅ Excel replacement for assets (with superpowers: QR codes, condition tracking, maintenance scheduling)
- ✅ New consumables management (prevent stockouts, automate reordering, track waste)
- ✅ Single source of truth for ALL inventory
- ✅ Mobile-friendly for daily operations
- ✅ Scalable as you add more nodes/zones

Ready to implement? 🚀

---

Document Version: 2.0 (Unified Assets + Consumables)  
Date: January 2026  
For: Zo World Operations Team

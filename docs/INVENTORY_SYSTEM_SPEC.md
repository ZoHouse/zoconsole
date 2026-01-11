# ZO HOUSE CONSOLE: INVENTORY MANAGEMENT SYSTEM
**Complete Specification for Intelligent Inventory & Reorder System**

---

## THE PROBLEM
Current inventory tracking is basic. We need:
- Accurate stock levels across multiple zones and nodes
- Smart reorder recommendations based on consumption patterns
- Prevention of both stockouts AND overstock
- Easy daily operations for staff
- Cost tracking and waste management
- Supplier management

---

## INVENTORY STRUCTURE

### Hierarchy
```
Node (Koramangala / Whitefield)
  └─ Zone (Kitchen, Bar, Housekeeping, Maintenance, Office, etc.)
      └─ Category (Food, Beverages, Cleaning, Linens, etc.)
          └─ Subcategory (Optional: Dairy, Vegetables, etc.)
              └─ Item (Individual SKU)
```

### Example:
```
Koramangala
  └─ Kitchen
      └─ Food
          └─ Dairy
              └─ Milk (Full Cream, 1L Tetra Pack)
              └─ Paneer (Amul, 200g)
          └─ Vegetables
              └─ Onions (Loose, per kg)
              └─ Tomatoes (Loose, per kg)
      └─ Beverages
          └─ Coffee
              └─ Coffee Beans (Levista, 500g)
```

---

## ITEM MASTER DATA

Each inventory item has these attributes:

### Basic Info
- **Item Name**: "Coffee Beans"
- **Brand/Variant**: "Levista Premium"
- **SKU/Code**: "COF-LEV-500" (auto-generated or manual)
- **Zone**: Kitchen
- **Category**: Beverages > Coffee
- **Unit of Measurement**: grams, kg, liters, pieces, boxes, etc.
- **Pack Size**: 500g per pack
- **Description**: Optional notes

### Stock Levels (The Critical Part)
- **Current Stock**: Real-time quantity (e.g., 3.5 kg = 7 packs × 500g)
- **Par Level**: Minimum stock to maintain (e.g., 2 kg = 4 packs)
- **Reorder Point**: When to trigger reorder (e.g., 2.5 kg = 5 packs)
- **Reorder Quantity**: How much to order (e.g., 5 kg = 10 packs)
- **Max Stock Level**: Don't exceed this (prevent overstock)

### Consumption Tracking
- **Avg Daily Usage**: Auto-calculated from historical data (e.g., 200g/day)
- **Usage Pattern**: Consistent / Seasonal / Variable
- **Days to Stockout**: (Current Stock - Par Level) / Avg Daily Usage
- **Last 7 Days Usage**: Track recent consumption
- **Last 30 Days Usage**: Track monthly pattern

### Supplier & Ordering
- **Primary Supplier**: "Big Basket"
- **Secondary Supplier**: "Local Vendor"
- **Lead Time**: Days from order to delivery (e.g., 2 days)
- **Unit Cost**: ₹450 per 500g pack
- **Last Purchase Price**: Track price changes
- **Last Order Date**: When was it last ordered

### Tracking
- **Batch/Lot Number**: For traceability
- **Expiry Date**: For perishables
- **Storage Location**: "Kitchen Pantry - Shelf 3"
- **Reorder Status**: None / Pending / Ordered / Received

---

## ZONES & THEIR TYPICAL INVENTORY

### 1. KITCHEN (Food & Beverage Prep)
Categories:
- **Food > Staples**: Rice, Dal, Flour, Oil, Sugar, Salt
- **Food > Dairy**: Milk, Paneer, Butter, Cheese, Curd
- **Food > Vegetables**: Onions, Tomatoes, Potatoes, etc.
- **Food > Fruits**: Seasonal fruits
- **Food > Spices**: All spices and masalas
- **Food > Packaged**: Bread, Pasta, Noodles, Sauces
- **Beverages > Coffee/Tea**: Coffee beans, tea leaves, milk powder
- **Beverages > Packaged**: Juices, soft drinks
- **Consumables**: Foil, cling wrap, tissue, napkins

Reorder Logic: High-frequency, fast-moving. Daily/weekly reorders.

### 2. BAR (if applicable)
Categories:
- **Alcohol > Spirits**: Whisky, Vodka, Rum, Gin
- **Alcohol > Wine**: Red, White, Sparkling
- **Alcohol > Beer**: Bottles, Cans
- **Mixers**: Soda, Tonic, Juices
- **Garnishes**: Lemons, Mint, etc.
- **Bar Supplies**: Straws, Stirrers, Napkins, Coasters

Reorder Logic: Weekly/monthly for alcohol, weekly for mixers.

### 3. HOUSEKEEPING (Cleaning & Linens)
Categories:
- **Cleaning Supplies**: Detergents, Floor cleaner, Toilet cleaner, Disinfectant
- **Tools**: Mops, Brooms, Brushes, Buckets
- **Linens > Bed**: Bedsheets, Pillowcases, Blankets
- **Linens > Bath**: Towels (face, bath, hand)
- **Toiletries**: Soap, Shampoo, Toilet paper, Tissues
- **Laundry**: Detergent powder, Fabric softener

Reorder Logic: Toiletries weekly, cleaning supplies bi-weekly, linens as needed.

### 4. MAINTENANCE (Repairs & Upkeep)
Categories:
- **Hardware**: Screws, Nails, Bolts, Hinges
- **Tools**: Hammer, Screwdriver, Wrench, Drill bits
- **Electrical**: Bulbs, Switches, Wires, Tape
- **Plumbing**: Pipes, Washers, Sealant
- **Paints**: Wall paint, Touch-up paint
- **Safety**: Fire extinguisher refills, First aid supplies

Reorder Logic: Low-frequency, order when reaching par level.

### 5. OFFICE (Admin Supplies)
Categories:
- **Stationery**: Pens, Paper, Notebooks, Files
- **Printer**: Ink cartridges, Toner, Paper
- **Tech**: Batteries, USB cables, Adapters
- **Pantry**: Coffee/Tea for office use

Reorder Logic: Monthly or as needed.

### 6. AMENITIES (Whitefield-specific)
Categories:
- **Pickle Ball**: Balls, Net, Racket grips
- **Pool**: Chemicals (Chlorine, pH), Cleaning tools, Floats
- **Studio**: Camera batteries, SD cards, Cables

Reorder Logic: Monthly for consumables, as needed for equipment.

---

## SMART REORDER MECHANISM

### Reorder Triggers (Automatic Alerts)

#### 1. Low Stock Alert (Yellow)
**Condition**: Current Stock ≤ Reorder Point
**Action**: Alert House Captain "Time to order [Item]"
**Example**: Coffee Beans at 2.5 kg, reorder point is 2.5 kg → ALERT

#### 2. Critical Stock Alert (Red)
**Condition**: Current Stock ≤ Par Level
**Action**: Urgent alert "About to run out of [Item]"
**Example**: Coffee Beans at 1.8 kg, par level is 2 kg → CRITICAL

#### 3. Stockout Alert (Red, Flashing)
**Condition**: Current Stock = 0
**Action**: "STOCKOUT: [Item] - Immediate action required"

#### 4. Overstock Warning (Orange)
**Condition**: Current Stock > Max Stock Level
**Action**: "Overstock detected: [Item] - Check for waste/expiry"
**Example**: 50 kg onions when max is 30 kg → OVERSTOCK

#### 5. Expiry Alert (Yellow/Red)
**Condition**: Expiry Date within 7 days (Yellow) or 3 days (Red)
**Action**: "Expiring soon: [Item] - Use immediately or donate"

#### 6. Smart Reorder Recommendation
**Condition**: System analyzes consumption pattern
**Action**: "Suggested order: 10 packs of [Item] based on 30-day average usage"

### Consumption-Based Reorder Calculation

**Formula:**
```
Reorder Quantity = (Avg Daily Usage × Lead Time × Safety Factor) + Par Level - Current Stock

Where:
- Avg Daily Usage = Last 30 days consumption / 30
- Lead Time = Days from order to delivery
- Safety Factor = 1.5 (to account for demand spikes)
```

**Example:**
- Item: Coffee Beans
- Current Stock: 2 kg (4 packs)
- Par Level: 2 kg (4 packs)
- Avg Daily Usage: 200g (0.2 kg)
- Lead Time: 2 days
- Safety Factor: 1.5

Calculation:
```
Reorder Qty = (0.2 kg × 2 days × 1.5) + 2 kg - 2 kg
            = 0.6 kg + 0 kg
            = 0.6 kg → Round up to 1 kg (2 packs)

But system also considers: "You'll use 1.4 kg in next 7 days"
So smart recommendation: Order 3 kg (6 packs) to last 2 weeks
```

### Usage Pattern Recognition

System tracks 3 patterns:

#### 1. Consistent Usage
**Pattern**: Usage is stable day-to-day
**Example**: Milk - 10L every day
**Reorder Logic**: Simple daily usage × lead time

#### 2. Seasonal/Event-Based
**Pattern**: Spikes on weekends or during events
**Example**: Alcohol usage 3x on weekends vs weekdays
**Reorder Logic**: Factor in upcoming weekend/events in calculation

#### 3. Variable Usage
**Pattern**: Unpredictable consumption
**Example**: Maintenance items - used when something breaks
**Reorder Logic**: Higher safety factor (2x instead of 1.5x)

---

## STOCK MOVEMENT TRACKING

### Types of Movements

#### 1. Stock In (Purchase)
- Date & Time
- Quantity received
- Supplier
- Invoice number
- Unit cost
- Batch/Lot number
- Expiry date
- Received by (staff name)

#### 2. Stock Out (Usage)
- Date & Time
- Quantity used
- Used by (zone/department)
- Purpose (e.g., "Breakfast prep", "Room 12 cleaning")
- Used by (staff name)

#### 3. Stock Transfer (Between Nodes)
- Date & Time
- From: Koramangala
- To: Whitefield
- Quantity
- Reason
- Authorized by

#### 4. Stock Adjustment (Count Correction)
- Date & Time
- System Stock: 10 kg
- Physical Stock: 9.5 kg
- Difference: -0.5 kg
- Reason: "Spillage/Waste"
- Adjusted by (staff name)

#### 5. Waste/Damage
- Date & Time
- Quantity wasted
- Reason: Expired / Damaged / Spillage / Theft
- Cost impact
- Reported by

---

## UI/UX DESIGN

### Tab Structure (within Captain's Deck > Inventory)

```
┌──────────────────────────────────────────────────────────────────┐
│  Dashboard  │  Stock List  │  Reorder Queue  │  Movements  │  Reports  │
└──────────────────────────────────────────────────────────────────┘
```

### SUB-TAB 1: DASHBOARD (Overview)

**Top Metrics (4 Cards)**
- Total Items: 342 SKUs
- Low Stock Items: 23 (need reorder)
- Critical Stock: 5 (urgent)
- Value at Risk: ₹45K (expiring soon)

**Alerts Section**
Priority alerts in order:
1. 🔴 **STOCKOUT (2 items)**: Coffee Beans, Hand Towels
2. 🔴 **CRITICAL (5 items)**: Milk, Toilet Paper, etc. (stock < par)
3. 🟡 **LOW STOCK (23 items)**: Rice, Onions, etc. (stock < reorder point)
4. 🟠 **EXPIRING SOON (8 items)**: Paneer (2 days), Bread (1 day)
5. 🟠 **OVERSTOCK (3 items)**: Potatoes (45 kg vs 30 kg max)

**Quick Actions**
- [+ Add Stock In] - Record purchase receipt
- [- Record Usage] - Record consumption
- [📋 Stock Count] - Physical count entry
- [📦 Create Order] - Generate purchase order

**Zone Summary (Cards)**
Shows stock health by zone:
- Kitchen: 🟡 12 items need reorder
- Housekeeping: 🟢 All good
- Maintenance: 🔴 3 critical items
- Office: 🟢 All good

**Consumption Trends (Chart)**
Last 30 days consumption by category (line graph)

---

### SUB-TAB 2: STOCK LIST (Item Management)

**Filter Bar**
- 🏢 Node: [All / Koramangala / Whitefield]
- 🏗️ Zone: [All / Kitchen / Housekeeping / Maintenance / etc.]
- 📁 Category: [All / Food / Beverages / Cleaning / etc.]
- 🔍 Search: [Search by item name or SKU]
- 📊 Status: [All / In Stock / Low Stock / Critical / Out of Stock / Overstock]
- 📅 Expiry: [All / Expiring Soon / Expired]

**Stock List Table**
| Item | Zone | Category | Current Stock | Par Level | Status | Days to Stockout | Last Used | Actions |
|------|------|----------|---------------|-----------|--------|------------------|-----------|---------|
| Coffee Beans (Levista 500g) | Kitchen | Beverages | 2 kg (4 packs) | 2 kg | 🟡 Low | 10 days | Today | [Edit] [Reorder] [+/-] |
| Milk (Full Cream 1L) | Kitchen | Dairy | 5L | 10L | 🔴 Critical | 2 days | 1h ago | [Edit] [Reorder] [+/-] |
| Hand Towels | Housekeeping | Linens | 0 pcs | 20 pcs | 🔴 STOCKOUT | 0 days | Yesterday | [Edit] [Reorder] [+/-] |

**Row Click → Detailed Item View**
- Full item details
- Stock level graph (last 30 days)
- Consumption pattern
- Movement history (last 20 transactions)
- Reorder suggestion
- Supplier info
- [Edit Item] [Delete Item] [Reorder Now]

**Bulk Actions**
- Select multiple items → [Bulk Reorder] [Bulk Edit] [Export]

---

### SUB-TAB 3: REORDER QUEUE (Smart Recommendations)

**Pending Orders Section**
Shows items that need ordering:

| Priority | Item | Current Stock | Recommended Order | Supplier | Est. Cost | Days Until Stockout | [Action] |
|----------|------|---------------|-------------------|----------|-----------|---------------------|----------|
| 🔴 URGENT | Coffee Beans | 2 kg | 5 kg (10 packs) | Big Basket | ₹2,250 | 10 days | [Order Now] [Snooze] |
| 🔴 URGENT | Hand Towels | 0 pcs | 30 pcs | Linen Supplier | ₹1,800 | 0 days | [Order Now] [Snooze] |
| 🟡 SOON | Rice (Basmati) | 15 kg | 25 kg | Local Vendor | ₹2,500 | 18 days | [Order Now] [Snooze] |

**Smart Grouping**
"Bundle these items to save on delivery:"
- Group 1: Kitchen items from Big Basket (12 items, ₹18,500)
- Group 2: Housekeeping from Linen Supplier (5 items, ₹6,200)

**One-Click Ordering**
[📦 Create Purchase Order] → Generates PO with all recommended items
- Select items from queue
- Review quantities and suppliers
- Generate PO (PDF/Email to supplier)
- Mark as "Ordered"
- Track order status

**Reorder History**
List of past orders:
- Order #1234 - Jan 5, 2026 - Big Basket - ₹24,500 - [Delivered]
- Order #1233 - Jan 3, 2026 - Linen Supplier - ₹8,900 - [Pending]

---

### SUB-TAB 4: MOVEMENTS (Stock Transactions)

**Movement Log (Filterable)**
| Date & Time | Type | Item | Quantity | From/To | By | Notes |
|-------------|------|------|----------|---------|----|----|
| Jan 6, 9:30am | Stock Out | Coffee Beans | 200g | Kitchen - Used | Chef Ravi | Breakfast prep |
| Jan 6, 8:00am | Stock In | Milk | 20L | Supplier > Kitchen | Bhangbuddy | Invoice #4521 |
| Jan 5, 4:00pm | Transfer | Hand Towels | 10 pcs | K → W | Priya | Whitefield needed |
| Jan 5, 2:00pm | Adjustment | Rice | -2 kg | Kitchen | Bhangbuddy | Spillage |
| Jan 5, 11:00am | Waste | Bread | 5 loaves | Kitchen | Chef Ravi | Expired |

**Quick Record Options**
- [+ Stock In] - Record purchase
- [- Stock Out] - Record usage
- [↔️ Transfer] - Move between nodes
- [📝 Adjustment] - Correct count
- [🗑️ Waste] - Record waste/damage

**Stock In Form** (Modal)
- Item: [Dropdown with search]
- Quantity: [Number + Unit]
- Supplier: [Dropdown]
- Invoice Number: [Text]
- Unit Cost: [₹ Number]
- Batch/Lot: [Text]
- Expiry Date: [Date picker]
- Notes: [Text area]
- [Save] [Cancel]

**Stock Out Form** (Modal)
- Item: [Dropdown with search]
- Quantity: [Number + Unit]
- Used for: [Dropdown: Breakfast/Lunch/Dinner/Cleaning/Maintenance/etc.]
- Location: [Dropdown: Room number or area]
- Notes: [Text area]
- [Save] [Cancel]

---

### SUB-TAB 5: REPORTS (Analytics)

**Available Reports**

1. **Consumption Report**
   - Period: Last 7/30/90 days
   - By Zone / Category / Item
   - Shows: Total usage, Avg daily, Trend
   - Export to CSV

2. **Cost Analysis**
   - Total spend by category
   - Price trends (is item getting expensive?)
   - Supplier comparison
   - Budget vs Actual

3. **Waste Report**
   - Total waste by reason (Expired/Damaged/Spillage)
   - Cost of waste
   - Which items waste most?
   - Recommendations to reduce waste

4. **Stockout History**
   - How many times did we run out?
   - Which items stock out most?
   - Impact on operations
   - Suggestions to prevent

5. **Reorder Performance**
   - How accurate are our reorder points?
   - Are we ordering too much/too little?
   - Supplier lead time accuracy

6. **Inventory Valuation**
   - Current inventory value
   - By zone/category
   - FIFO cost calculation

---

## MOBILE-FIRST FEATURES

### Stock Count Mode (for staff)
Simplified mobile view for physical stock counting:

**Flow:**
1. Staff selects Zone (Kitchen)
2. App shows list of items in Kitchen
3. For each item:
   - Item name + Image
   - Current system stock: 5 kg
   - [Enter physical count: ___ kg]
   - [Photo of item] (optional)
4. At end: "Found 3 discrepancies. Adjust system?"
5. [Yes - Adjust] [No - Review]

### Quick Stock In (Barcode Scan)
1. [📷 Scan Barcode] on item
2. System identifies item (or creates new)
3. [Enter Quantity: ___]
4. [Save] - Done in 5 seconds

### Daily Usage Entry
For kitchen/housekeeping staff:
1. End of day: "Record today's usage"
2. Pre-filled list of commonly used items
3. Quick entry: Milk [10L], Rice [3kg], etc.
4. [Submit] - Updates consumption data

---

## SMART FEATURES

### 1. Auto-Calculate Reorder Quantities
System learns from historical data:
- "In the last 30 days, you used 60 kg of rice (2 kg/day)"
- "With 2-day lead time, order at least 6 kg (3 days buffer)"
- "Recommendation: Order 25 kg to last 2 weeks"

### 2. Seasonal Adjustment
- "Coffee usage increases 30% on weekends"
- "Event next week (50 guests) - increase food orders by 40%"
- "Festival season - alcohol consumption up 2x"

### 3. Supplier Performance Tracking
- Lead time accuracy: "Big Basket delivers in 1.8 days avg (promised 2 days) ✓"
- Price trends: "Onions price up 15% in last month ⚠️"
- Reliability: "5/5 orders on time ⭐"

### 4. Waste Reduction Insights
- "Bread wastes 20% monthly (expiry). Reduce order from 50 to 40 loaves?"
- "Vegetables waste high on Mondays. Order after weekend instead?"

### 5. Cost Optimization
- "Switch to Supplier B for milk? ₹5/L cheaper, same quality"
- "Bulk order (50kg rice) saves ₹200 vs 5x 10kg orders"

### 6. Integration with Kitchen Operations
- When menu item ordered (via POS or Captain's Deck task):
  - Auto-deduct ingredients from inventory
  - Example: 1 Paneer Sandwich → deduct 50g paneer, 2 bread slices, etc.

### 7. Low Stock SMS/Email Alerts
- Auto-notify House Captain when critical stock
- "URGENT: Coffee beans critical (2 days left)"

---

## DATA MODEL (Backend Structure)

### Tables Needed

#### 1. items (Master Item List)
```
id, node, zone, category, subcategory, item_name, brand, sku, 
unit, pack_size, par_level, reorder_point, reorder_quantity, 
max_stock, storage_location, is_perishable, shelf_life_days,
primary_supplier_id, secondary_supplier_id, lead_time_days,
current_cost, created_at, updated_at
```

#### 2. stock_levels (Current Stock)
```
id, item_id, quantity, last_updated, last_counted_date, 
counted_by, notes
```

#### 3. stock_movements (Transaction Log)
```
id, item_id, movement_type, quantity, from_location, to_location,
movement_date, reason, batch_number, expiry_date, unit_cost,
supplier_id, invoice_number, staff_id, notes, created_at
```

#### 4. suppliers
```
id, supplier_name, contact_person, phone, email, address,
payment_terms, lead_time_days, notes, rating, created_at
```

#### 5. reorder_queue
```
id, item_id, recommended_quantity, reason, priority,
created_at, status (pending/ordered/received/cancelled),
order_id, ordered_date
```

#### 6. purchase_orders
```
id, supplier_id, order_date, expected_delivery, total_cost,
status (draft/sent/confirmed/received/cancelled),
created_by, notes
```

#### 7. purchase_order_items
```
id, po_id, item_id, quantity, unit_cost, total_cost
```

#### 8. consumption_analytics (Pre-calculated)
```
id, item_id, period (7d/30d/90d), 
total_usage, avg_daily_usage, usage_pattern,
last_calculated
```

---

## IMPLEMENTATION PRIORITY

### Phase 1: MVP (Launch Week 1)
- Basic item master (add/edit items)
- Current stock tracking
- Simple stock in/out recording
- Low stock alerts (manual threshold)
- Basic stock list view

### Phase 2: Smart Reorder (Week 2-3)
- Consumption tracking (auto-calculate daily usage)
- Reorder point logic
- Reorder queue with recommendations
- Purchase order generation

### Phase 3: Mobile & Automation (Week 4)
- Mobile stock count interface
- Barcode scanning
- Auto alerts (SMS/email)
- Bulk operations

### Phase 4: Analytics (Week 5+)
- Reports dashboard
- Waste tracking
- Cost analysis
- Supplier performance
- Seasonal pattern recognition

---

## EXAMPLE: COMPLETE ITEM PROFILE

**Item: Coffee Beans (Levista Premium)**

**Basic Info:**
- SKU: COF-LEV-500
- Category: Kitchen > Beverages > Coffee
- Unit: grams (sold in 500g packs)
- Brand: Levista

**Stock Status:**
- Current Stock: 2,000g (4 packs)
- Par Level: 2,000g (4 packs)
- Reorder Point: 2,500g (5 packs)
- Reorder Quantity: 5,000g (10 packs)
- Max Stock: 10,000g (20 packs)
- Status: 🟡 Low Stock (at reorder point)

**Consumption:**
- Avg Daily Usage: 200g
- Last 7 Days: 1,400g (7 days × 200g)
- Last 30 Days: 6,000g (30 days × 200g)
- Pattern: Consistent
- Days to Stockout: 10 days (2,000g / 200g per day)

**Supplier:**
- Primary: Big Basket
- Lead Time: 2 days
- Unit Cost: ₹450 per 500g pack
- Last Order: Jan 3, 2026 (3 days ago)
- Last Price: ₹450 (no change)

**Reorder Recommendation:**
```
System suggests: Order 5,000g (10 packs) = ₹4,500
Reason: 
- Current stock lasts 10 days
- 2-day lead time + 3-day buffer = need 5 days worth (1kg)
- But ordering 5kg lasts 25 days = 2 weeks until next order
- Reduces order frequency, saves delivery costs
```

**Movement History (Last 5):**
1. Jan 6, 9:30am - Stock Out: 200g (Breakfast prep)
2. Jan 5, 9:15am - Stock Out: 200g (Breakfast prep)
3. Jan 4, 9:00am - Stock Out: 200g (Breakfast prep)
4. Jan 3, 2:00pm - Stock In: 5,000g (10 packs from Big Basket, ₹4,500)
5. Jan 3, 9:30am - Stock Out: 200g (Breakfast prep)

---

## KEY METRICS TO TRACK

**Operational Metrics:**
1. **Stockout Rate**: How often do we run out? (Target: <2% per month)
2. **Reorder Accuracy**: Did we order right amount? (Target: 90% within ±10%)
3. **Waste Rate**: % of purchases wasted (Target: <5%)
4. **Inventory Turnover**: How fast we use stock (Target: 2-4x per month)
5. **Days of Inventory**: How many days of stock on hand (Target: 7-14 days)

**Financial Metrics:**
1. **Total Inventory Value**: ₹ value of all stock
2. **Cost of Waste**: ₹ lost to waste per month
3. **Carrying Cost**: Cost to hold inventory (storage, insurance)
4. **Stockout Cost**: Revenue lost due to stockouts

**Efficiency Metrics:**
1. **Time to Reorder**: How long from alert to order placed (Target: <24 hours)
2. **Supplier Lead Time Accuracy**: Do they deliver on time? (Target: 90%+)
3. **Stock Count Accuracy**: System vs physical count variance (Target: 95%+)

---

## SUCCESS CRITERIA

After implementing this system, we should achieve:

✅ **Zero surprise stockouts** - System alerts 3+ days before running out
✅ **20% reduction in waste** - Better reorder quantities = less expiry
✅ **15% cost savings** - Bulk orders, supplier optimization, less emergency orders
✅ **50% less time on inventory** - Automation reduces manual work
✅ **Real-time visibility** - House Captain knows exact stock at any time
✅ **Data-driven decisions** - Know what to order, when, and how much

---

## NEXT STEPS

1. **Review this spec** - Confirm structure works for Zo House operations
2. **Refine item list** - List out actual items per zone (Kitchen, Housekeeping, etc.)
3. **Set par levels** - For each item, define min/max/reorder levels
4. **Build UI** - Implement in Captain's Deck > Inventory
5. **Test with one zone** - Pilot with Kitchen only, then expand
6. **Train staff** - House Captain + kitchen/housekeeping teams
7. **Iterate** - Improve based on real usage

---

Document Version: 1.0  
Date: January 2026  
For: Zo World Operations Team

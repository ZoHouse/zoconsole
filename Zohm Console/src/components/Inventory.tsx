import { Package, AlertTriangle, TrendingDown, Search, Plus, ChevronDown, MoreVertical, ShoppingCart, Archive, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

interface InventoryProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

export function Inventory({ selectedProperty, onPropertyChange, embedded = false }: InventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inventoryType, setInventoryType] = useState<'zones' | 'kitchen'>('zones');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Perfect' | 'Defect'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  return (
    <>
      {!embedded && (
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          selectedProperty={selectedProperty}
          onPropertyChange={onPropertyChange}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          inventoryType={inventoryType}
          onInventoryTypeChange={setInventoryType}
        />
      )}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px] space-y-6">
          <InventoryOverview inventoryType={inventoryType} />
          
          {/* Toggle between Kitchen and House Zones */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setInventoryType('zones')}
              className={`px-6 py-3 rounded-lg text-sm transition-all ${
                inventoryType === 'zones'
                  ? 'bg-[#9ae600] text-black'
                  : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white hover:border-[#71717b]'
              }`}
            >
              House Zones
            </button>
            <button
              onClick={() => setInventoryType('kitchen')}
              className={`px-6 py-3 rounded-lg text-sm transition-all ${
                inventoryType === 'kitchen'
                  ? 'bg-[#9ae600] text-black'
                  : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white hover:border-[#71717b]'
              }`}
            >
              Kitchen
            </button>
          </div>

          {inventoryType === 'zones' ? (
            <ZoneInventoryList 
              searchQuery={localSearchQuery} 
              selectedProperty={selectedProperty} 
              selectedCategory={categoryFilter}
              statusFilter={statusFilter}
              onSearchChange={setLocalSearchQuery}
              onCategoryChange={setCategoryFilter}
              onStatusChange={setStatusFilter}
            />
          ) : (
            <KitchenInventoryList 
              searchQuery={localSearchQuery} 
              selectedProperty={selectedProperty}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              onSearchChange={setLocalSearchQuery}
              onCategoryChange={setCategoryFilter}
              onStatusChange={setStatusFilter}
            />
          )}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  inventoryType: 'zones' | 'kitchen';
  onInventoryTypeChange: (type: 'zones' | 'kitchen') => void;
}

function Header({ searchQuery, onSearchChange, selectedProperty, onPropertyChange, selectedCategory, onCategoryChange, inventoryType, onInventoryTypeChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Inventory Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Track supplies and stock levels</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Item</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
          <input
            type="text"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-initial min-w-[140px]">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-xs sm:text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
            >
              <option value="all">All Categories</option>
              <option value="cleaning">Cleaning Supplies</option>
              <option value="kitchen">Kitchen Supplies</option>
              <option value="toiletries">Toiletries</option>
              <option value="linens">Linens & Towels</option>
              <option value="maintenance">Maintenance</option>
              <option value="food">Food & Beverages</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="house-supply">House Supply</option>
              <option value="house-interior">House Interior</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
          </div>
          
          <div className="relative flex-1 sm:flex-initial min-w-[140px]">
            <select
              value={inventoryType}
              onChange={(e) => onInventoryTypeChange(e.target.value as 'zones' | 'kitchen')}
              className="appearance-none w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-xs sm:text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
            >
              <option value="zones">Zones Inventory</option>
              <option value="kitchen">Kitchen Inventory</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

function InventoryOverview({ inventoryType }: { inventoryType: 'zones' | 'kitchen' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <OverviewCard
        icon={<Package className="w-5 h-5" />}
        title="Total Items"
        value="1,247"
        subtitle="8 categories"
        color="text-[#06b6d4]"
        bgColor="bg-[#06b6d4]/10"
      />
      
      <OverviewCard
        icon={<AlertTriangle className="w-5 h-5" />}
        title="Low Stock"
        value="23"
        subtitle="Need reorder"
        color="text-[#f0b100]"
        bgColor="bg-[#f0b100]/10"
      />
      
      <OverviewCard
        icon={<TrendingDown className="w-5 h-5" />}
        title="Out of Stock"
        value="5"
        subtitle="Critical items"
        color="text-[#fb2c36]"
        bgColor="bg-[#fb2c36]/10"
      />
      
      <OverviewCard
        icon={<ShoppingCart className="w-5 h-5" />}
        title="Total Value"
        value="₹8.5L"
        subtitle="Current inventory"
        color="text-[#9ae600]"
        bgColor="bg-[#9ae600]/10"
      />
    </div>
  );
}

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

function OverviewCard({ icon, title, value, subtitle, color, bgColor }: OverviewCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
        <div className={color}>{icon}</div>
      </div>
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className={`text-2xl mb-1 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

function LowStockAlerts() {
  const alerts = [
    { name: "Toilet Paper", category: "Toiletries", current: 12, min: 50, unit: "rolls", status: "critical" },
    { name: "Dish Soap", category: "Cleaning", current: 3, min: 10, unit: "bottles", status: "critical" },
    { name: "Coffee Beans", category: "Food & Beverages", current: 2, min: 5, unit: "kg", status: "critical" },
    { name: "Bed Sheets", category: "Linens", current: 8, min: 15, unit: "sets", status: "low" },
    { name: "Hand Sanitizer", category: "Toiletries", current: 15, min: 30, unit: "bottles", status: "low" },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
        <div>
          <h3 className="text-lg">Low Stock Alerts</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">{alerts.length} items need attention</p>
        </div>
        <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Create Order
        </button>
      </div>

      <div className="divide-y divide-[#27272a]">
        {alerts.map((alert, idx) => (
          <div key={idx} className="p-4 hover:bg-[#18181b] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className={`w-4 h-4 ${alert.status === 'critical' ? 'text-[#fb2c36]' : 'text-[#f0b100]'}`} />
                  <div>
                    <div className="text-sm">{alert.name}</div>
                    <div className="text-xs text-[#9f9fa9]">{alert.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-7">
                  <div className="text-xs">
                    <span className="text-[#9f9fa9]">Current: </span>
                    <span className={alert.status === 'critical' ? 'text-[#fb2c36]' : 'text-[#f0b100]'}>
                      {alert.current} {alert.unit}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-[#9f9fa9]">Min Required: </span>
                    <span className="text-white">{alert.min} {alert.unit}</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#9ae600] text-black rounded text-xs hover:bg-[#8bd500] transition-colors">
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface InventoryListProps {
  searchQuery: string;
  selectedProperty: string;
  selectedCategory: string;
  statusFilter: 'all' | 'Perfect' | 'Defect';
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: 'all' | 'Perfect' | 'Defect') => void;
}

function ZoneInventoryList({ searchQuery, selectedProperty, selectedCategory, statusFilter, onSearchChange, onCategoryChange, onStatusChange }: InventoryListProps) {
  const inventoryItems = [
    {
      id: 1,
      date: "14/06/2025",
      area: "721A",
      itemName: "Bean Bag",
      color: "Grey",
      price: 2500,
      quantity: 4,
      fixedMovable: "Movable",
      category: "Furniture",
      status: "Perfect",
      condition: "Good condition, clean",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 2,
      date: "14/06/2025",
      area: "721A",
      itemName: "Day Bed",
      color: "Blue",
      price: 8500,
      quantity: 1,
      fixedMovable: "Movable",
      category: "Furniture",
      status: "Perfect",
      condition: "Excellent condition",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 3,
      date: "14/06/2025",
      area: "721A",
      itemName: "Laptop Mat",
      color: "Blue",
      price: 150,
      quantity: 5,
      fixedMovable: "Movable",
      category: "House Supply",
      status: "Perfect",
      condition: "New stock",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 4,
      date: "14/06/2025",
      area: "721A",
      itemName: "Table Lamp",
      color: "Black",
      price: 450,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Electronics",
      status: "Defect",
      condition: "2 units need repair",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 5,
      date: "14/06/2025",
      area: "721A",
      itemName: "Extension Board",
      color: "Black",
      price: 350,
      quantity: 12,
      fixedMovable: "Fixed",
      category: "Electronics",
      status: "Perfect",
      condition: "Working properly",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum"
    },
    {
      id: 6,
      date: "14/06/2025",
      area: "721A",
      itemName: "Kitchen Trolley",
      color: "White",
      price: 3200,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Furniture",
      status: "Perfect",
      condition: "Recently purchased",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 7,
      date: "14/06/2025",
      area: "721A",
      itemName: "Laundry Basket",
      color: "Brown",
      price: 280,
      quantity: 6,
      fixedMovable: "Movable",
      category: "House Interior",
      status: "Perfect",
      condition: "Good stock",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 8,
      date: "15/06/2025",
      area: "721A",
      itemName: "Double Bed",
      color: "Mac",
      price: 15000,
      quantity: 3,
      fixedMovable: "Movable",
      category: "Furniture",
      status: "Perfect",
      condition: "New installation",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 9,
      date: "15/06/2025",
      area: "721A",
      itemName: "Cotton Soft Mattress",
      color: "Mac",
      price: 4500,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Furniture",
      status: "Perfect",
      condition: "Cleaned and sanitized",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 10,
      date: "15/06/2025",
      area: "721A",
      itemName: "USB Charging Point",
      color: "Mac",
      price: 200,
      quantity: 15,
      fixedMovable: "Fixed",
      category: "Electronics",
      status: "Perfect",
      condition: "All functional",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 11,
      date: "15/06/2025",
      area: "721A",
      itemName: "LED Lights",
      color: "Mac",
      price: 180,
      quantity: 24,
      fixedMovable: "Fixed",
      category: "Electronics",
      status: "Perfect",
      condition: "Energy efficient",
      property: "all",
      propertyName: "All Properties"
    },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProperty = selectedProperty === 'all' || item.property === selectedProperty || item.property === 'all';
    
    const categoryMap: { [key: string]: string } = {
      'cleaning': 'House Supply',
      'kitchen': 'Kitchen Supplies',
      'toiletries': 'Toiletries',
      'linens': 'Linens & Towels',
      'maintenance': 'Maintenance',
      'food': 'Food & Beverages',
      'furniture': 'Furniture',
      'electronics': 'Electronics',
      'house-supply': 'House Supply',
      'house-interior': 'House Interior'
    };
    
    const matchesCategory = selectedCategory === 'all' || item.category === categoryMap[selectedCategory];
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesProperty && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg">Inventory Items</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">{filteredItems.length} items</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Export List
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
              >
                <option value="all">All Categories</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="house-supply">House Supply</option>
                <option value="house-interior">House Interior</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as 'all' | 'Perfect' | 'Defect')}
                className="appearance-none px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
              >
                <option value="all">All Status</option>
                <option value="Perfect">Perfect</option>
                <option value="Defect">Defect</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272a]">
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Date</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Area</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Item Name</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Color</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Price</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Quantity</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Fixed/Movable</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Category</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Condition</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Property</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <InventoryRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KitchenInventoryList({ searchQuery, selectedProperty, statusFilter, categoryFilter, onSearchChange, onCategoryChange, onStatusChange }: { searchQuery: string; selectedProperty: string; statusFilter: 'all' | 'Perfect' | 'Defect'; categoryFilter: string; onSearchChange: (query: string) => void; onCategoryChange: (category: string) => void; onStatusChange: (status: 'all' | 'Perfect' | 'Defect') => void }) {
  const kitchenItems = [
    // Kitchen Equipment
    {
      id: 1,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Rice Cooker",
      color: "Silver",
      price: 3500,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Appliances",
      status: "Perfect",
      condition: "Working properly",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 2,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Mixer Grinder",
      color: "White",
      price: 4200,
      quantity: 3,
      fixedMovable: "Movable",
      category: "Appliances",
      status: "Perfect",
      condition: "Recently serviced",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 3,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Pressure Cooker",
      color: "Steel",
      price: 2800,
      quantity: 4,
      fixedMovable: "Movable",
      category: "Cookware",
      status: "Perfect",
      condition: "Good stock",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 4,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Chef Knife Set",
      color: "Black",
      price: 3500,
      quantity: 3,
      fixedMovable: "Movable",
      category: "Utensils",
      status: "Perfect",
      condition: "Sharp and clean",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 5,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Blender",
      color: "Black",
      price: 5500,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Appliances",
      status: "Defect",
      condition: "1 unit motor issue",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum"
    },
    {
      id: 6,
      date: "14/06/2025",
      area: "Kitchen",
      itemName: "Non-stick Pan Set",
      color: "Black",
      price: 2400,
      quantity: 6,
      fixedMovable: "Movable",
      category: "Cookware",
      status: "Perfect",
      condition: "Non-stick coating intact",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 7,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Microwave Oven",
      color: "Silver",
      price: 12000,
      quantity: 2,
      fixedMovable: "Fixed",
      category: "Appliances",
      status: "Perfect",
      condition: "Excellent working condition",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 8,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Refrigerator",
      color: "White",
      price: 35000,
      quantity: 2,
      fixedMovable: "Fixed",
      category: "Appliances",
      status: "Perfect",
      condition: "Energy efficient, maintained",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 9,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Gas Stove",
      color: "Steel",
      price: 8500,
      quantity: 2,
      fixedMovable: "Fixed",
      category: "Appliances",
      status: "Perfect",
      condition: "4 burner, working fine",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 10,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Dinner Plates",
      color: "White",
      price: 150,
      quantity: 48,
      fixedMovable: "Movable",
      category: "Crockery",
      status: "Perfect",
      condition: "Complete set",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 11,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Coffee Maker",
      color: "Black",
      price: 6500,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Appliances",
      status: "Perfect",
      condition: "Espresso machine, clean",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 12,
      date: "15/06/2025",
      area: "Kitchen",
      itemName: "Spice Rack",
      color: "Wood",
      price: 1200,
      quantity: 4,
      fixedMovable: "Fixed",
      category: "Storage",
      status: "Perfect",
      condition: "Wall mounted, organized",
      property: "all",
      propertyName: "All Properties"
    },
    
    // Food & Ingredients
    {
      id: 13,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Basmati Rice",
      color: "White",
      price: 120,
      quantity: 25,
      fixedMovable: "Movable",
      category: "Grains",
      status: "Perfect",
      condition: "25 kg stock available",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 14,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Whole Wheat Flour",
      color: "Brown",
      price: 45,
      quantity: 30,
      fixedMovable: "Movable",
      category: "Grains",
      status: "Perfect",
      condition: "Fresh stock, 30 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 15,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "All Purpose Flour",
      color: "White",
      price: 40,
      quantity: 20,
      fixedMovable: "Movable",
      category: "Grains",
      status: "Perfect",
      condition: "20 kg available",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 16,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Cooking Oil",
      color: "Yellow",
      price: 180,
      quantity: 15,
      fixedMovable: "Movable",
      category: "Oils & Fats",
      status: "Perfect",
      condition: "15 liters sunflower oil",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 17,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Olive Oil",
      color: "Green",
      price: 650,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Oils & Fats",
      status: "Perfect",
      condition: "Extra virgin, 8 liters",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 18,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Ghee",
      color: "Yellow",
      price: 550,
      quantity: 10,
      fixedMovable: "Movable",
      category: "Oils & Fats",
      status: "Perfect",
      condition: "Pure cow ghee, 10 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 19,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Sugar",
      color: "White",
      price: 45,
      quantity: 50,
      fixedMovable: "Movable",
      category: "Sweeteners",
      status: "Perfect",
      condition: "50 kg stock",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 20,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Salt",
      color: "White",
      price: 20,
      quantity: 40,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "Iodized salt, 40 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 21,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Red Chili Powder",
      color: "Red",
      price: 200,
      quantity: 5,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "5 kg, medium spicy",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 22,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Turmeric Powder",
      color: "Yellow",
      price: 180,
      quantity: 3,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "Pure turmeric, 3 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 23,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Cumin Seeds",
      color: "Brown",
      price: 350,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "Whole cumin, 2 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 24,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Garam Masala",
      color: "Brown",
      price: 400,
      quantity: 1.5,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "Premium blend, 1.5 kg",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 25,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Black Pepper",
      color: "Black",
      price: 600,
      quantity: 1,
      fixedMovable: "Movable",
      category: "Spices",
      status: "Perfect",
      condition: "Whole peppercorns, 1 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 26,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Toor Dal",
      color: "Yellow",
      price: 110,
      quantity: 15,
      fixedMovable: "Movable",
      category: "Pulses",
      status: "Perfect",
      condition: "15 kg stock",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 27,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Moong Dal",
      color: "Yellow",
      price: 120,
      quantity: 10,
      fixedMovable: "Movable",
      category: "Pulses",
      status: "Perfect",
      condition: "Split yellow lentils, 10 kg",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 28,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Chickpeas",
      color: "Beige",
      price: 90,
      quantity: 12,
      fixedMovable: "Movable",
      category: "Pulses",
      status: "Perfect",
      condition: "Kabuli chana, 12 kg",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum"
    },
    {
      id: 29,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Red Kidney Beans",
      color: "Red",
      price: 140,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Pulses",
      status: "Perfect",
      condition: "Rajma, 8 kg stock",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 30,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Tea Powder",
      color: "Brown",
      price: 450,
      quantity: 5,
      fixedMovable: "Movable",
      category: "Beverages",
      status: "Perfect",
      condition: "Assam tea, 5 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 31,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Coffee Powder",
      color: "Brown",
      price: 800,
      quantity: 4,
      fixedMovable: "Movable",
      category: "Beverages",
      status: "Perfect",
      condition: "Filter coffee blend, 4 kg",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 32,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Milk",
      color: "White",
      price: 55,
      quantity: 30,
      fixedMovable: "Movable",
      category: "Dairy",
      status: "Perfect",
      condition: "Fresh daily supply, 30 liters",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 33,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Yogurt",
      color: "White",
      price: 60,
      quantity: 15,
      fixedMovable: "Movable",
      category: "Dairy",
      status: "Perfect",
      condition: "Fresh curd, 15 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 34,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Butter",
      color: "Yellow",
      price: 450,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Dairy",
      status: "Perfect",
      condition: "Unsalted butter, 8 kg",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 35,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Cheese",
      color: "Yellow",
      price: 380,
      quantity: 5,
      fixedMovable: "Movable",
      category: "Dairy",
      status: "Perfect",
      condition: "Cheddar & mozzarella mix, 5 kg",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum"
    },
    {
      id: 36,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Eggs",
      color: "White",
      price: 6,
      quantity: 300,
      fixedMovable: "Movable",
      category: "Protein",
      status: "Perfect",
      condition: "Farm fresh, 300 pieces",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 37,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Onions",
      color: "Red",
      price: 35,
      quantity: 40,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "Red onions, 40 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 38,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Tomatoes",
      color: "Red",
      price: 45,
      quantity: 35,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "Fresh ripe, 35 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 39,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Potatoes",
      color: "Brown",
      price: 25,
      quantity: 50,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "50 kg stock",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 40,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Ginger",
      color: "Brown",
      price: 80,
      quantity: 5,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "Fresh ginger, 5 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 41,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Garlic",
      color: "White",
      price: 120,
      quantity: 8,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "Peeled & whole, 8 kg",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 42,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Green Chilies",
      color: "Green",
      price: 60,
      quantity: 3,
      fixedMovable: "Movable",
      category: "Vegetables",
      status: "Perfect",
      condition: "Fresh, 3 kg",
      property: "zo-house-bali",
      propertyName: "Zo House Bali"
    },
    {
      id: 43,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Coriander Leaves",
      color: "Green",
      price: 40,
      quantity: 2,
      fixedMovable: "Movable",
      category: "Herbs",
      status: "Perfect",
      condition: "Fresh bunches, 2 kg",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 44,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Mint Leaves",
      color: "Green",
      price: 50,
      quantity: 1.5,
      fixedMovable: "Movable",
      category: "Herbs",
      status: "Perfect",
      condition: "Fresh pudina, 1.5 kg",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal"
    },
    {
      id: 45,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Pasta",
      color: "Yellow",
      price: 180,
      quantity: 12,
      fixedMovable: "Movable",
      category: "Grains",
      status: "Perfect",
      condition: "Assorted shapes, 12 kg",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona"
    },
    {
      id: 46,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Bread",
      color: "Brown",
      price: 40,
      quantity: 30,
      fixedMovable: "Movable",
      category: "Bakery",
      status: "Perfect",
      condition: "Whole wheat & white, 30 loaves",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 47,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Honey",
      color: "Amber",
      price: 350,
      quantity: 6,
      fixedMovable: "Movable",
      category: "Sweeteners",
      status: "Perfect",
      condition: "Pure organic, 6 kg",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum"
    },
    {
      id: 48,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Soy Sauce",
      color: "Brown",
      price: 180,
      quantity: 4,
      fixedMovable: "Movable",
      category: "Condiments",
      status: "Perfect",
      condition: "4 liters stock",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand"
    },
    {
      id: 49,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Vinegar",
      color: "Clear",
      price: 80,
      quantity: 5,
      fixedMovable: "Movable",
      category: "Condiments",
      status: "Perfect",
      condition: "White vinegar, 5 liters",
      property: "all",
      propertyName: "All Properties"
    },
    {
      id: 50,
      date: "01/01/2026",
      area: "Kitchen",
      itemName: "Ketchup",
      color: "Red",
      price: 120,
      quantity: 10,
      fixedMovable: "Movable",
      category: "Condiments",
      status: "Perfect",
      condition: "Tomato ketchup, 10 bottles",
      property: "all",
      propertyName: "All Properties"
    },
  ];

  const filteredItems = kitchenItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProperty = selectedProperty === 'all' || item.property === selectedProperty || item.property === 'all';
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesProperty && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg">Kitchen Inventory</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">{filteredItems.length} items</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Export List
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
              >
                <option value="all">All Categories</option>
                <option value="Appliances">Appliances</option>
                <option value="Cookware">Cookware</option>
                <option value="Utensils">Utensils</option>
                <option value="Crockery">Crockery</option>
                <option value="Storage">Storage</option>
                <option value="Grains">Grains</option>
                <option value="Oils & Fats">Oils & Fats</option>
                <option value="Sweeteners">Sweeteners</option>
                <option value="Spices">Spices</option>
                <option value="Pulses">Pulses</option>
                <option value="Beverages">Beverages</option>
                <option value="Dairy">Dairy</option>
                <option value="Protein">Protein</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Herbs">Herbs</option>
                <option value="Bakery">Bakery</option>
                <option value="Condiments">Condiments</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as 'all' | 'Perfect' | 'Defect')}
                className="appearance-none px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
              >
                <option value="all">All Status</option>
                <option value="Perfect">Perfect</option>
                <option value="Defect">Defect</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272a]">
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Date</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Area</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Item Name</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Color</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Price</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Quantity</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Fixed/Movable</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Category</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Condition</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Property</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <InventoryRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface InventoryItem {
  id: number;
  date: string;
  area: string;
  itemName: string;
  color: string;
  price: number;
  quantity: number;
  fixedMovable: "Fixed" | "Movable";
  category: string;
  status: 'Perfect' | 'Defect';
  condition: string;
  property: string;
  propertyName: string;
}

function InventoryRow({ item }: { item: InventoryItem }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Perfect':
        return 'bg-[#9ae600]/10 text-[#9ae600]';
      case 'Defect':
        return 'bg-[#fb2c36]/10 text-[#fb2c36]';
      default:
        return 'bg-[#71717b]/10 text-[#71717b]';
    }
  };

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-4">
        <div className="text-sm text-white">{item.date}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#d4d4d8]">{item.area}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-white">{item.itemName}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#9f9fa9]">{item.color}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-white">₹{item.price.toLocaleString()}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#9f9fa9]">{item.quantity}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#9f9fa9]">{item.fixedMovable}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#d4d4d8]">{item.category}</div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#9f9fa9]">{item.condition}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#9f9fa9]">{item.propertyName}</div>
      </td>
      <td className="px-4 py-4">
        <button className="p-1 hover:bg-[#27272a] rounded transition-colors">
          <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
        </button>
      </td>
    </tr>
  );
}
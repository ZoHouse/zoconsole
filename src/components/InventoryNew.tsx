import { Package, AlertTriangle, TrendingDown, Search, Plus, ChevronDown, MoreVertical, ShoppingCart, Archive, ClipboardCheck, Calendar, CheckCircle2, Clock, XCircle, Trash2, Edit, Eye, Coffee, Milk, Beef, FileText, TrendingUp, DollarSign, BarChart3, Play } from 'lucide-react';
import { useState } from 'react';

interface InventoryProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

export function InventoryNew({ selectedProperty, onPropertyChange, embedded = false }: InventoryProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'consumables' | 'orders' | 'reports'>('overview');

  return (
    <>
      {!embedded && (
        <Header 
          selectedProperty={selectedProperty}
          onPropertyChange={onPropertyChange}
        />
      )}
      
      {/* Tab Navigation */}
      <div className="border-b border-[#27272a] px-4 sm:px-6">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<Package className="w-4 h-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'assets'}
            onClick={() => setActiveTab('assets')}
            icon={<Archive className="w-4 h-4" />}
            label="Assets"
          />
          <TabButton
            active={activeTab === 'consumables'}
            onClick={() => setActiveTab('consumables')}
            icon={<Coffee className="w-4 h-4" />}
            label="Consumables"
          />
          <TabButton
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Orders"
          />
          <TabButton
            active={activeTab === 'reports'}
            onClick={() => setActiveTab('reports')}
            icon={<BarChart3 className="w-4 h-4" />}
            label="Reports"
          />
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px] space-y-6">
          {activeTab === 'overview' && <OverviewTab selectedProperty={selectedProperty} />}
          {activeTab === 'assets' && <AssetsTab selectedProperty={selectedProperty} />}
          {activeTab === 'consumables' && <ConsumablesTab selectedProperty={selectedProperty} />}
          {activeTab === 'orders' && <OrdersTab selectedProperty={selectedProperty} />}
          {activeTab === 'reports' && <ReportsTab selectedProperty={selectedProperty} />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

function Header({ selectedProperty, onPropertyChange }: HeaderProps) {
  const properties = [
    { id: 'all', name: 'All Nodes' },
    { id: 'koramangala', name: 'BLRxZo - Koramangala' },
    { id: 'whitefield', name: 'BLRxZo - Whitefield' },
  ];

  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Inventory Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Track assets, consumables, and stock levels</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial min-w-[180px]">
            <select
              value={selectedProperty}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="appearance-none w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
            >
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-all whitespace-nowrap ${
        active
          ? 'border-[#9ae600] text-[#9ae600]'
          : 'border-transparent text-[#9f9fa9] hover:text-white'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ============================================
// OVERVIEW TAB
// ============================================

function OverviewTab({ selectedProperty }: { selectedProperty: string }) {
  const [showWeeklyCheck, setShowWeeklyCheck] = useState(false);

  return (
    <div className="space-y-6">
      {/* Weekly Check Status */}
      <WeeklyCheckStatus onStartCheck={() => setShowWeeklyCheck(true)} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Package className="w-5 h-5" />}
          title="Total Asset Value"
          value="₹2.4 Cr"
          subtitle="642 items"
          color="text-[#06b6d4]"
          bgColor="bg-[#06b6d4]/10"
        />
        <MetricCard
          icon={<Coffee className="w-5 h-5" />}
          title="Consumables Value"
          value="₹2.8L"
          subtitle="245 SKUs"
          color="text-[#9ae600]"
          bgColor="bg-[#9ae600]/10"
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Items Need Action"
          value="18"
          subtitle="5 critical"
          color="text-[#f0b100]"
          bgColor="bg-[#f0b100]/10"
        />
        <MetricCard
          icon={<ShoppingCart className="w-5 h-5" />}
          title="Pending Orders"
          value="3"
          subtitle="₹24,500 total"
          color="text-[#fb2c36]"
          bgColor="bg-[#fb2c36]/10"
        />
      </div>

      {/* Alerts Section */}
      <AlertsSection />

      {/* Quick Actions */}
      <QuickActions />

      {/* Zone Summary */}
      <ZoneSummary />

      {/* Weekly Check Modal */}
      {showWeeklyCheck && (
        <WeeklyCheckModal onClose={() => setShowWeeklyCheck(false)} />
      )}
    </div>
  );
}

function WeeklyCheckStatus({ onStartCheck }: { onStartCheck: () => void }) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#9ae600]/10 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="w-6 h-6 text-[#9ae600]" />
          </div>
          <div>
            <h3 className="text-lg mb-1">Weekly Inventory Check</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[#9f9fa9]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last completed: Dec 30, 2025 (7 days ago)</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>Next due: <span className="text-[#f0b100]">TODAY</span></span>
            </div>
            <p className="text-xs text-[#71717b] mt-2">Estimated time: 30-45 minutes</p>
          </div>
        </div>
        
        <button
          onClick={onStartCheck}
          className="flex items-center gap-2 px-6 py-3 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center font-medium"
        >
          <Play className="w-5 h-5" />
          Start Weekly Check
        </button>
      </div>

      {/* Check History Preview */}
      <div className="mt-6 pt-6 border-t border-[#27272a]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm text-[#9f9fa9]">Recent Checks</h4>
          <button className="text-xs text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CheckHistoryItem date="Dec 30, 2025" status="completed" time="28 min" issues={3} />
          <CheckHistoryItem date="Dec 23, 2025" status="completed" time="41 min" issues={7} />
          <CheckHistoryItem date="Dec 16, 2025" status="skipped" time="-" issues={0} />
        </div>
      </div>
    </div>
  );
}

function CheckHistoryItem({ date, status, time, issues }: { date: string; status: 'completed' | 'skipped'; time: string; issues: number }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#9f9fa9]">{date}</span>
        {status === 'completed' ? (
          <CheckCircle2 className="w-4 h-4 text-[#9ae600]" />
        ) : (
          <XCircle className="w-4 h-4 text-[#71717b]" />
        )}
      </div>
      <div className="text-sm text-white mb-1 capitalize">{status}</div>
      {status === 'completed' && (
        <div className="flex items-center gap-3 text-xs text-[#71717b]">
          <span>{time}</span>
          <span>•</span>
          <span>{issues} issues</span>
        </div>
      )}
    </div>
  );
}

function AlertsSection() {
  const alerts = [
    { type: 'critical', icon: <Coffee className="w-4 h-4" />, title: 'Coffee beans critical', detail: '2 days left', count: 1 },
    { type: 'critical', icon: <Milk className="w-4 h-4" />, title: 'Milk out of stock', detail: 'Order now!', count: 1 },
    { type: 'warning', icon: <AlertTriangle className="w-4 h-4" />, title: 'Low stock items', detail: '12 items need reorder', count: 12 },
    { type: 'info', icon: <Package className="w-4 h-4" />, title: 'Asset maintenance due', detail: '3 items', count: 3 },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a]">
        <h3 className="text-lg">Priority Alerts</h3>
        <p className="text-sm text-[#9f9fa9] mt-1">Items requiring immediate attention</p>
      </div>
      
      <div className="divide-y divide-[#27272a]">
        {alerts.map((alert, idx) => (
          <div key={idx} className="p-4 hover:bg-[#18181b] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.type === 'critical' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
                  alert.type === 'warning' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
                  'bg-[#06b6d4]/10 text-[#06b6d4]'
                }`}>
                  {alert.icon}
                </div>
                <div>
                  <div className="text-sm font-medium">{alert.title}</div>
                  <div className="text-xs text-[#9f9fa9] mt-0.5">{alert.detail}</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#9ae600] text-black rounded text-xs hover:bg-[#8bd500] transition-colors font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { icon: <Plus className="w-5 h-5" />, label: 'Add Asset', color: 'bg-[#06b6d4]' },
    { icon: <Package className="w-5 h-5" />, label: 'Stock In', color: 'bg-[#9ae600]' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Create Order', color: 'bg-[#f0b100]' },
    { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Stock Count', color: 'bg-[#fb2c36]' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-all group"
        >
          <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 text-white`}>
            {action.icon}
          </div>
          <div className="text-sm text-left group-hover:text-[#9ae600] transition-colors">{action.label}</div>
        </button>
      ))}
    </div>
  );
}

function ZoneSummary() {
  const zones = [
    { name: 'Kitchen', assets: 45, assetIssues: 3, consumables: 'low', consumableCount: 12 },
    { name: 'Housekeeping', assets: 120, assetIssues: 0, consumables: 'critical', consumableCount: 5 },
    { name: 'Games Room', assets: 28, assetIssues: 1, consumables: 'good', consumableCount: 0 },
    { name: 'Amenities', assets: 15, assetIssues: 2, consumables: 'low', consumableCount: 3 },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a]">
        <h3 className="text-lg">Zone Summary</h3>
        <p className="text-sm text-[#9f9fa9] mt-1">Health across all zones</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {zones.map((zone, idx) => (
          <div key={idx} className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">{zone.name}</h4>
              <div className={`w-2 h-2 rounded-full ${
                zone.consumables === 'critical' ? 'bg-[#fb2c36]' :
                zone.consumables === 'low' ? 'bg-[#f0b100]' :
                'bg-[#9ae600]'
              }`} />
            </div>
            
            <div className="space-y-2 text-xs text-[#9f9fa9]">
              <div className="flex items-center justify-between">
                <span>Assets:</span>
                <span className="text-white">{zone.assets} items {zone.assetIssues > 0 && <span className="text-[#f0b100]">({zone.assetIssues} need fix)</span>}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Consumables:</span>
                <span className={
                  zone.consumables === 'critical' ? 'text-[#fb2c36]' :
                  zone.consumables === 'low' ? 'text-[#f0b100]' :
                  'text-[#9ae600]'
                }>
                  {zone.consumables === 'good' ? 'All good' : `${zone.consumableCount} ${zone.consumables}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

function MetricCard({ icon, title, value, subtitle, color, bgColor }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
        <div className={color}>{icon}</div>
      </div>
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className={`text-2xl mb-1 font-semibold ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

// ============================================
// ASSETS TAB
// ============================================

function AssetsTab({ selectedProperty }: { selectedProperty: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [trackingTier, setTrackingTier] = useState<'all' | 'individual' | 'group'>('all');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterSelect value={areaFilter} onChange={setAreaFilter} options={[
              { value: 'all', label: 'All Areas' },
              { value: 'degen-lounge', label: 'Degen Lounge' },
              { value: 'kitchen', label: 'Kitchen' },
              { value: 'flo-zone', label: 'Flo-Zone' },
              { value: 'pickleball', label: 'Pickleball' },
              { value: 'sauna', label: 'Sauna' },
            ]} />
            
            <FilterSelect value={categoryFilter} onChange={setCategoryFilter} options={[
              { value: 'all', label: 'All Categories' },
              { value: 'furniture', label: 'Furniture' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'kitchen-supply', label: 'Kitchen Supply' },
              { value: 'house-supply', label: 'House Supply' },
            ]} />
            
            <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[
              { value: 'all', label: 'All Status' },
              { value: 'perfect', label: 'Perfect' },
              { value: 'damaged', label: 'Damaged' },
              { value: 'needs-repair', label: 'Needs Repair' },
            ]} />
            
            <FilterSelect value={trackingTier} onChange={setTrackingTier} options={[
              { value: 'all', label: 'All Tiers' },
              { value: 'individual', label: 'Individual (₹1L+)' },
              { value: 'group', label: 'Group' },
            ]} />
          </div>
        </div>
      </div>

      {/* Asset Categories */}
      <AssetCategories />

      {/* High Value Assets (Tier 1) */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">High Value Assets (Individual Tracking)</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Items ₹1L+ with unique Asset IDs</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Asset ID</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Date Added</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Area</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Item Name</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Price</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AssetRow
                assetId="PC-001"
                dateAdded="12/02/2025"
                area="Office"
                itemName="Dell Screen Mini PC"
                price="₹50,39,600"
                status="perfect"
              />
              <AssetRow
                assetId="SAU-001"
                dateAdded="28/06/2025"
                area="Wellness"
                itemName="Sauna Unit"
                price="₹7,55,500"
                status="perfect"
              />
              <AssetRow
                assetId="PROJ-001"
                dateAdded="15/03/2025"
                area="Studio"
                itemName="Projector 4K"
                price="₹1,85,000"
                status="maintenance-due"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Group Assets (Tier 2) */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Group Assets (Count-based Tracking)</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Items tracked by quantity</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Item Name</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Area</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Price/Unit</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Qty</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <GroupAssetRow
                itemName="CELLO Bottle 900ml"
                area="Kitchen"
                pricePerUnit="₹140"
                qty={50}
                status="48 good, 2 missing"
                statusColor="warning"
              />
              <GroupAssetRow
                itemName="Pickleball Paddles"
                area="Court"
                pricePerUnit="₹1,500"
                qty={8}
                status="6 good, 2 damaged"
                statusColor="warning"
              />
              <GroupAssetRow
                itemName="Bath Towels"
                area="Housekeeping"
                pricePerUnit="₹200"
                qty={150}
                status="140 good, 10 worn"
                statusColor="good"
              />
              <GroupAssetRow
                itemName="Extension Boards"
                area="Various"
                pricePerUnit="₹549"
                qty={12}
                status="12 good"
                statusColor="good"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssetCategories() {
  const categories = [
    { name: 'Furniture', count: 245, value: '₹85L', color: 'bg-[#06b6d4]' },
    { name: 'Electronics', count: 89, value: '₹1.2Cr', color: 'bg-[#9ae600]' },
    { name: 'Kitchen Supply', count: 156, value: '₹15L', color: 'bg-[#f0b100]' },
    { name: 'House Supply', count: 78, value: '₹8L', color: 'bg-[#fb2c36]' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category, idx) => (
        <div key={idx} className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors cursor-pointer">
          <div className={`w-10 h-10 rounded-lg ${category.color} opacity-10 mb-3`} />
          <div className="text-sm text-white mb-1">{category.name}</div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9f9fa9]">{category.count} items</span>
            <span className="text-xs text-white font-medium">{category.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AssetRow({ assetId, dateAdded, area, itemName, price, status }: {
  assetId: string;
  dateAdded: string;
  area: string;
  itemName: string;
  price: string;
  status: 'perfect' | 'damaged' | 'maintenance-due';
}) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="px-4 py-3 text-sm font-mono text-[#9ae600]">{assetId}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{dateAdded}</td>
      <td className="px-4 py-3 text-sm text-white">{area}</td>
      <td className="px-4 py-3 text-sm text-white">{itemName}</td>
      <td className="px-4 py-3 text-sm text-white font-medium">{price}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
          status === 'perfect' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
          status === 'damaged' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
          'bg-[#f0b100]/10 text-[#f0b100]'
        }`}>
          {status === 'perfect' && '🟢'}
          {status === 'damaged' && '🔴'}
          {status === 'maintenance-due' && '🟡'}
          {status === 'perfect' ? 'Perfect' : status === 'damaged' ? 'Damaged' : 'Service Due'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="View">
            <Eye className="w-4 h-4 text-[#9f9fa9]" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Edit">
            <Edit className="w-4 h-4 text-[#9f9fa9]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function GroupAssetRow({ itemName, area, pricePerUnit, qty, status, statusColor }: {
  itemName: string;
  area: string;
  pricePerUnit: string;
  qty: number;
  status: string;
  statusColor: 'good' | 'warning' | 'critical';
}) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="px-4 py-3 text-sm text-white">{itemName}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{area}</td>
      <td className="px-4 py-3 text-sm text-white">{pricePerUnit}</td>
      <td className="px-4 py-3 text-sm text-white font-medium">{qty}</td>
      <td className="px-4 py-3">
        <span className={`text-xs ${
          statusColor === 'good' ? 'text-[#9ae600]' :
          statusColor === 'warning' ? 'text-[#f0b100]' :
          'text-[#fb2c36]'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded text-xs hover:border-[#71717b] transition-colors">
            Count
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="View">
            <Eye className="w-4 h-4 text-[#9f9fa9]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ============================================
// CONSUMABLES TAB
// ============================================

function ConsumablesTab({ selectedProperty }: { selectedProperty: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search consumables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterSelect value={zoneFilter} onChange={setZoneFilter} options={[
              { value: 'all', label: 'All Zones' },
              { value: 'kitchen', label: 'Kitchen' },
              { value: 'bar', label: 'Bar' },
              { value: 'housekeeping', label: 'Housekeeping' },
              { value: 'maintenance', label: 'Maintenance' },
            ]} />
            
            <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[
              { value: 'all', label: 'All Status' },
              { value: 'in-stock', label: 'In Stock' },
              { value: 'low', label: 'Low Stock' },
              { value: 'critical', label: 'Critical' },
              { value: 'out', label: 'Out of Stock' },
            ]} />
          </div>
        </div>
      </div>

      {/* Consumables List */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Consumables Inventory</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">245 SKUs tracked</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded hover:border-[#71717b] transition-colors text-sm">
              <Plus className="w-4 h-4" />
              Stock In
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">SKU</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Item</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Zone</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Current Stock</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Par Level</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Days to Stockout</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Reorder</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <ConsumableRow
                sku="F-RIC-001"
                item="Rice (Basmati)"
                zone="Kitchen"
                currentStock="15 kg"
                parLevel="20 kg"
                status="low"
                daysToStockout={18}
                reorderNeeded={true}
              />
              <ConsumableRow
                sku="F-MIL-001"
                item="Milk (Full Cream 1L)"
                zone="Kitchen"
                currentStock="5L"
                parLevel="10L"
                status="critical"
                daysToStockout={2}
                reorderNeeded={true}
              />
              <ConsumableRow
                sku="H-TP-001"
                item="Toilet Paper Rolls"
                zone="Housekeeping"
                currentStock="45 rolls"
                parLevel="50 rolls"
                status="good"
                daysToStockout={22}
                reorderNeeded={false}
              />
              <ConsumableRow
                sku="K-COF-001"
                item="Coffee Beans (500g)"
                zone="Kitchen"
                currentStock="2 kg"
                parLevel="2 kg"
                status="low"
                daysToStockout={10}
                reorderNeeded={true}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ConsumableRow({ sku, item, zone, currentStock, parLevel, status, daysToStockout, reorderNeeded }: {
  sku: string;
  item: string;
  zone: string;
  currentStock: string;
  parLevel: string;
  status: 'good' | 'low' | 'critical' | 'out';
  daysToStockout: number;
  reorderNeeded: boolean;
}) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="px-4 py-3 text-sm font-mono text-[#9f9fa9]">{sku}</td>
      <td className="px-4 py-3 text-sm text-white">{item}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{zone}</td>
      <td className="px-4 py-3 text-sm text-white font-medium">{currentStock}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{parLevel}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
          status === 'good' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
          status === 'low' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
          status === 'critical' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
          'bg-[#71717b]/10 text-[#71717b]'
        }`}>
          {status === 'good' && '🟢'}
          {status === 'low' && '🟡'}
          {status === 'critical' && '🔴'}
          {status === 'out' && '⚫'}
          {status === 'good' ? 'Good' : status === 'low' ? 'Low' : status === 'critical' ? 'Critical' : 'Out'}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-sm ${
          daysToStockout <= 3 ? 'text-[#fb2c36]' :
          daysToStockout <= 7 ? 'text-[#f0b100]' :
          'text-[#9f9fa9]'
        }`}>
          {daysToStockout} days
        </span>
      </td>
      <td className="px-4 py-3">
        {reorderNeeded ? (
          <span className="text-xs text-[#fb2c36] font-medium">URGENT</span>
        ) : (
          <span className="text-xs text-[#71717b]">No</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#9ae600] text-black rounded text-xs hover:bg-[#8bd500] transition-colors font-medium">
            Order
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="View">
            <Eye className="w-4 h-4 text-[#9f9fa9]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ============================================
// ORDERS TAB
// ============================================

function OrdersTab({ selectedProperty }: { selectedProperty: string }) {
  return (
    <div className="space-y-6">
      {/* Reorder Queue */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Reorder Queue</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">18 items needing order</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors text-sm font-medium">
            <ShoppingCart className="w-4 h-4" />
            Create Orders
          </button>
        </div>
        
        <div className="divide-y divide-[#27272a]">
          <ReorderItem
            priority="urgent"
            item="Milk (1L)"
            currentStock="5L"
            recommendedQty="20L (20 packs)"
            supplier="Big Basket"
            estCost="₹1,200"
            daysLeft={2}
          />
          <ReorderItem
            priority="urgent"
            item="Coffee Beans"
            currentStock="2kg"
            recommendedQty="5kg (10 packs)"
            supplier="Big Basket"
            estCost="₹4,500"
            daysLeft={10}
          />
          <ReorderItem
            priority="soon"
            item="Rice (Basmati)"
            currentStock="15kg"
            recommendedQty="25kg (5 bags)"
            supplier="Local Vendor"
            estCost="₹2,500"
            daysLeft={18}
          />
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Active Orders</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">In progress</p>
        </div>
        
        <div className="divide-y divide-[#27272a]">
          <OrderItem
            orderNumber="PO-1234"
            date="Jan 5"
            supplier="Big Basket"
            items={12}
            total="₹24,500"
            status="in-transit"
            expected="Jan 7"
          />
          <OrderItem
            orderNumber="PO-1233"
            date="Jan 3"
            supplier="Amazon"
            items={5}
            total="₹8,900"
            status="delivered"
            expected="Jan 5"
          />
        </div>
      </div>

      {/* Order History */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Order History</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Completed orders</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Order #</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Date</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Supplier</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Items</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Total</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
                <td className="px-4 py-3 text-sm font-mono text-[#9ae600]">PO-1232</td>
                <td className="px-4 py-3 text-sm text-[#9f9fa9]">Dec 28</td>
                <td className="px-4 py-3 text-sm text-white">Big Basket</td>
                <td className="px-4 py-3 text-sm text-white">15 items</td>
                <td className="px-4 py-3 text-sm text-white font-medium">₹32,100</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#9ae600]/10 text-[#9ae600]">
                    ✓ Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReorderItem({ priority, item, currentStock, recommendedQty, supplier, estCost, daysLeft }: {
  priority: 'urgent' | 'soon';
  item: string;
  currentStock: string;
  recommendedQty: string;
  supplier: string;
  estCost: string;
  daysLeft: number;
}) {
  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              priority === 'urgent' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' : 'bg-[#f0b100]/10 text-[#f0b100]'
            }`}>
              {priority === 'urgent' ? '🔴 URGENT' : '🟡 SOON'}
            </span>
            <span className="text-sm font-medium">{item}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[#9f9fa9]">Current: </span>
              <span className="text-white">{currentStock}</span>
            </div>
            <div>
              <span className="text-[#9f9fa9]">Recommended: </span>
              <span className="text-white">{recommendedQty}</span>
            </div>
            <div>
              <span className="text-[#9f9fa9]">Supplier: </span>
              <span className="text-white">{supplier}</span>
            </div>
            <div>
              <span className="text-[#9f9fa9]">Cost: </span>
              <span className="text-white font-medium">{estCost}</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-[#71717b]">
            {daysLeft} days left
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors font-medium whitespace-nowrap">
            Order
          </button>
          <button className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderItem({ orderNumber, date, supplier, items, total, status, expected }: {
  orderNumber: string;
  date: string;
  supplier: string;
  items: number;
  total: string;
  status: 'in-transit' | 'delivered';
  expected: string;
}) {
  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-[#9ae600]">{orderNumber}</span>
            <span className="text-xs text-[#71717b]">{date}</span>
            <span className={`px-2 py-1 rounded text-xs ${
              status === 'in-transit' ? 'bg-[#06b6d4]/10 text-[#06b6d4]' : 'bg-[#9ae600]/10 text-[#9ae600]'
            }`}>
              {status === 'in-transit' ? '🚚 In Transit' : '📦 Delivered'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#9f9fa9]">
            <span>{supplier}</span>
            <span>•</span>
            <span>{items} items</span>
            <span>•</span>
            <span className="text-white font-medium">{total}</span>
            {status === 'in-transit' && (
              <>
                <span>•</span>
                <span>Expected: {expected}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'in-transit' ? (
            <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors font-medium">
              Track
            </button>
          ) : (
            <button className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// REPORTS TAB
// ============================================

function ReportsTab({ selectedProperty }: { selectedProperty: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Reports */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Asset Reports</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Fixed inventory analytics</p>
          </div>
          <div className="p-4 space-y-2">
            <ReportLink title="Asset Register" description="Complete list with values" />
            <ReportLink title="Depreciation Report" description="Asset value over time" />
            <ReportLink title="Maintenance Schedule" description="Upcoming services" />
            <ReportLink title="Asset Utilization" description="Usage tracking" />
            <ReportLink title="Damaged Assets" description="Items needing repair" />
          </div>
        </div>

        {/* Consumable Reports */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Consumable Reports</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Supply analytics</p>
          </div>
          <div className="p-4 space-y-2">
            <ReportLink title="Consumption Report" description="Usage trends" />
            <ReportLink title="Cost Analysis" description="Spend by category" />
            <ReportLink title="Waste Report" description="Expired/spoiled items" />
            <ReportLink title="Stockout History" description="Out of stock incidents" />
            <ReportLink title="Reorder Performance" description="Accuracy tracking" />
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">January 2026 Summary</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Month-to-date overview</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-[#9f9fa9] mb-2">Total Assets</div>
              <div className="text-2xl font-semibold text-white mb-1">642</div>
              <div className="text-xs text-[#9ae600]">+12 this month</div>
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9] mb-2">Asset Value</div>
              <div className="text-2xl font-semibold text-white mb-1">₹2.45 Cr</div>
              <div className="text-xs text-[#9ae600]">+₹3.2L added</div>
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9] mb-2">Consumables Spend</div>
              <div className="text-2xl font-semibold text-white mb-1">₹8.5L</div>
              <div className="text-xs text-[#71717b]">245 SKUs</div>
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9] mb-2">Waste Rate</div>
              <div className="text-2xl font-semibold text-white mb-1">1.4%</div>
              <div className="text-xs text-[#9ae600]">-0.5% vs last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportLink({ title, description }: { title: string; description: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded hover:border-[#71717b] transition-colors group">
      <div className="text-left">
        <div className="text-sm text-white group-hover:text-[#9ae600] transition-colors">{title}</div>
        <div className="text-xs text-[#9f9fa9] mt-0.5">{description}</div>
      </div>
      <FileText className="w-4 h-4 text-[#9f9fa9] group-hover:text-[#9ae600] transition-colors" />
    </button>
  );
}

// ============================================
// WEEKLY CHECK MODAL
// ============================================

function WeeklyCheckModal({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#27272a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Weekly Inventory Check</h2>
            <button onClick={onClose} className="text-[#9f9fa9] hover:text-white">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full ${
                  step <= currentStep ? 'bg-[#9ae600]' : 'bg-[#27272a]'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-[#9f9fa9]">
            <span className={currentStep === 1 ? 'text-[#9ae600]' : ''}>Consumables</span>
            <span className={currentStep === 2 ? 'text-[#9ae600]' : ''}>Assets</span>
            <span className={currentStep === 3 ? 'text-[#9ae600]' : ''}>Damage Reports</span>
            <span className={currentStep === 4 ? 'text-[#9ae600]' : ''}>Orders</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {currentStep === 1 && <WeeklyCheckStep1 />}
          {currentStep === 2 && <WeeklyCheckStep2 />}
          {currentStep === 3 && <WeeklyCheckStep3 />}
          {currentStep === 4 && <WeeklyCheckStep4 />}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#27272a] flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded hover:border-[#71717b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="text-sm text-[#9f9fa9]">
            Step {currentStep} of {totalSteps}
          </div>
          
          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              className="px-6 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors font-medium"
            >
              Complete Check
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function WeeklyCheckStep1() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">Consumables Check (15 min)</h3>
        <p className="text-sm text-[#9f9fa9]">Check stock levels for frequently used items</p>
      </div>

      <div className="space-y-3">
        <ConsumableCheckItem
          item="Coffee Beans (Levista 500g)"
          lastCount="2,000g (4 packs)"
          expectedUsage="-1,400g (7 days × 200g/day)"
          expectedNow="~600g (1-2 packs)"
          status="critical"
        />
        <ConsumableCheckItem
          item="Rice (Basmati)"
          lastCount="15 kg"
          expectedUsage="-7 kg"
          expectedNow="~8 kg"
          status="good"
        />
        <ConsumableCheckItem
          item="Milk (Full Cream 1L)"
          lastCount="10L (10 packs)"
          expectedUsage="-12L (high consumption!)"
          expectedNow="~0L (need to restock!)"
          status="critical"
        />
      </div>
    </div>
  );
}

function ConsumableCheckItem({ item, lastCount, expectedUsage, expectedNow, status }: {
  item: string;
  lastCount: string;
  expectedUsage: string;
  expectedNow: string;
  status: 'good' | 'low' | 'critical';
}) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-medium mb-1">{item}</div>
          <div className="text-xs text-[#9f9fa9] space-y-0.5">
            <div>Last count: {lastCount}</div>
            <div>Expected usage: {expectedUsage}</div>
            <div>Expected now: {expectedNow}</div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'critical' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
          status === 'low' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
          'bg-[#9ae600]/10 text-[#9ae600]'
        }`}>
          {status === 'critical' ? '🔴 Critical' : status === 'low' ? '🟡 Low' : '🟢 Good'}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Physical count"
          className="flex-1 px-3 py-2 bg-[#09090b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
        />
        <span className="text-sm text-[#9f9fa9]">g</span>
      </div>
    </div>
  );
}

function WeeklyCheckStep2() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">High-Turnover Assets (10 min)</h3>
        <p className="text-sm text-[#9f9fa9]">Spot check items that change weekly</p>
      </div>

      <div className="space-y-3">
        <AssetCheckItem
          item="Bath Towels"
          lastCount="150 (140 good, 10 worn)"
          area="Housekeeping"
        />
        <AssetCheckItem
          item="Plates (Dinner)"
          lastCount="150 plates"
          area="Kitchen"
        />
        <AssetCheckItem
          item="Pickleball Paddles"
          lastCount="8 paddles (6 good, 2 damaged)"
          area="Court"
        />
      </div>
    </div>
  );
}

function AssetCheckItem({ item, lastCount, area }: {
  item: string;
  lastCount: string;
  area: string;
}) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
      <div className="mb-3">
        <div className="text-sm font-medium mb-1">{item}</div>
        <div className="text-xs text-[#9f9fa9]">
          <div>Last count: {lastCount}</div>
          <div>Area: {area}</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <button className="flex-1 px-4 py-2 bg-[#9ae600]/10 border border-[#9ae600] text-[#9ae600] rounded text-sm hover:bg-[#9ae600]/20 transition-colors">
            🟢 Looks good
          </button>
          <button className="flex-1 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
            🟡 Count needed
          </button>
        </div>
        
        <div className="pt-2 border-t border-[#27272a]">
          <div className="text-xs text-[#9f9fa9] mb-2">Or enter exact count:</div>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" placeholder="Good" className="px-3 py-2 bg-[#09090b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]" />
            <input type="number" placeholder="Worn" className="px-3 py-2 bg-[#09090b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]" />
            <input type="number" placeholder="Damaged" className="px-3 py-2 bg-[#09090b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyCheckStep3() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">Damage Reports Review (5 min)</h3>
        <p className="text-sm text-[#9f9fa9]">Review issues reported during the week</p>
      </div>

      <div className="space-y-3">
        <DamageReportItem
          date="Jan 4, 2026"
          reportedBy="Kitchen Staff"
          item="Plates (Dinner)"
          issue="3 plates broken during washing"
        />
        <DamageReportItem
          date="Jan 5, 2026"
          reportedBy="Bhangbuddy"
          item="Pickleball Paddle"
          issue="Grip worn out, skin peeling"
        />
        <DamageReportItem
          date="Jan 6, 2026"
          reportedBy="Housekeeping"
          item="Towels (Bath)"
          issue="5 towels heavily stained, need replacement"
        />
      </div>
    </div>
  );
}

function DamageReportItem({ date, reportedBy, item, issue }: {
  date: string;
  reportedBy: string;
  item: string;
  issue: string;
}) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-medium mb-1">{item}</div>
          <div className="text-xs text-[#9f9fa9]">
            <div>{date} - Reported by {reportedBy}</div>
            <div className="mt-1 text-white">{issue}</div>
          </div>
        </div>
        <span className="px-2 py-1 rounded text-xs bg-[#f0b100]/10 text-[#f0b100]">
          ⏳ Pending
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex-1 px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors font-medium">
          ✓ Verified
        </button>
        <button className="flex-1 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
          ✗ Not valid
        </button>
        <button className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
          📝 Follow-up
        </button>
      </div>
    </div>
  );
}

function WeeklyCheckStep4() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">Orders Tracking (10 min)</h3>
        <p className="text-sm text-[#9f9fa9]">Check pending orders and deliveries</p>
      </div>

      <div className="space-y-3">
        <OrderCheckItem
          orderNumber="PO-1234"
          supplier="Big Basket"
          orderedDate="Jan 3, 2026 (3 days ago)"
          items="Rice 25kg, Coffee 5kg, Milk 20L"
          total="₹4,500"
          expectedDate="Jan 5"
          status="overdue"
        />
        <OrderCheckItem
          orderNumber="PO-1235"
          supplier="Amazon"
          orderedDate="Jan 5, 2026 (1 day ago)"
          items="Toilet paper 100 rolls, Detergent 10kg"
          total="₹3,200"
          expectedDate="Jan 8"
          status="in-transit"
        />
      </div>
    </div>
  );
}

function OrderCheckItem({ orderNumber, supplier, orderedDate, items, total, expectedDate, status }: {
  orderNumber: string;
  supplier: string;
  orderedDate: string;
  items: string;
  total: string;
  expectedDate: string;
  status: 'overdue' | 'in-transit';
}) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm font-medium mb-1">{orderNumber} - {supplier}</div>
          <div className="text-xs text-[#9f9fa9] space-y-0.5">
            <div>Ordered: {orderedDate}</div>
            <div>Items: {items}</div>
            <div>Total: {total}</div>
            <div>Expected: {expectedDate}</div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'overdue' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' : 'bg-[#06b6d4]/10 text-[#06b6d4]'
        }`}>
          {status === 'overdue' ? '🔴 OVERDUE' : '🚚 In Transit'}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex-1 px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors font-medium">
          📦 Mark as Received
        </button>
        <button className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:border-[#71717b] transition-colors">
          📞 Contact
        </button>
      </div>
    </div>
  );
}

// ============================================
// SHARED COMPONENTS
// ============================================

interface FilterSelectProps {
  value: string;
  onChange: (value: any) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({ value, onChange, options }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
    </div>
  );
}

import { TrendingUp, Users, DollarSign, ShoppingCart, Plus, Search, Filter, Download, Bed, Home, Utensils, Camera, Sparkles, ChevronDown, Calendar, Building, MapPin, Coffee, Dumbbell, Video, Briefcase, PartyPopper, Waves } from 'lucide-react';
import { useState } from 'react';

interface SalesProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

type ProductTab = 'overview' | 'rooms' | 'events' | 'cowork' | 'studio' | 'amenities' | 'cafe';
type NodeFilter = 'all' | 'koramangala' | 'whitefield';
type CityFilter = 'all' | 'bangalore';
type PeriodFilter = 'this-month' | 'last-month' | 'last-3-months' | 'custom';

export function Sales({ selectedProperty, onPropertyChange }: SalesProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>('overview');
  const [nodeFilter, setNodeFilter] = useState<NodeFilter>('all');
  const [cityFilter, setCityFilter] = useState<CityFilter>('bangalore');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('this-month');

  return (
    <>
      <Header />
      
      {/* Product Sub-Tabs */}
      <div className="border-b border-[#27272a] px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-2 py-3">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<TrendingUp className="w-4 h-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'rooms'}
            onClick={() => setActiveTab('rooms')}
            icon={<Bed className="w-4 h-4" />}
            label="Rooms"
          />
          <TabButton
            active={activeTab === 'events'}
            onClick={() => setActiveTab('events')}
            icon={<PartyPopper className="w-4 h-4" />}
            label="Events"
          />
          <TabButton
            active={activeTab === 'cowork'}
            onClick={() => setActiveTab('cowork')}
            icon={<Briefcase className="w-4 h-4" />}
            label="Co-work"
          />
          <TabButton
            active={activeTab === 'studio'}
            onClick={() => setActiveTab('studio')}
            icon={<Video className="w-4 h-4" />}
            label="Studio"
          />
          <TabButton
            active={activeTab === 'amenities'}
            onClick={() => setActiveTab('amenities')}
            icon={<Dumbbell className="w-4 h-4" />}
            label="Amenities"
          />
          <TabButton
            active={activeTab === 'cafe'}
            onClick={() => setActiveTab('cafe')}
            icon={<Coffee className="w-4 h-4" />}
            label="Cafe"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-[#27272a] px-4 sm:px-6 py-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={nodeFilter}
              onChange={(e) => setNodeFilter(e.target.value as NodeFilter)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Nodes</option>
              <option value="koramangala">Koramangala</option>
              <option value="whitefield">Whitefield</option>
            </select>
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value as CityFilter)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Cities</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="custom">Custom Range</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeTab === 'overview' && <OverviewTab nodeFilter={nodeFilter} />}
          {activeTab === 'rooms' && <RoomsTab nodeFilter={nodeFilter} />}
          {activeTab === 'events' && <EventsTab nodeFilter={nodeFilter} />}
          {activeTab === 'cowork' && <CoworkTab nodeFilter={nodeFilter} />}
          {activeTab === 'studio' && <StudioTab nodeFilter={nodeFilter} />}
          {activeTab === 'amenities' && <AmenitiesTab nodeFilter={nodeFilter} />}
          {activeTab === 'cafe' && <CafeTab nodeFilter={nodeFilter} />}
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Sales</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Product-centric sales performance across all nodes</p>
        </div>
        
        <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors whitespace-nowrap flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
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
      className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
        active
          ? 'bg-[#9ae600] text-black'
          : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// OVERVIEW TAB
function OverviewTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue"
          value="₹24.7L"
          subtitle="This month"
          trend="+12.3%"
          color="text-[#9ae600]"
        />
        <MetricCard
          label="Network EBITDA"
          value="₹6.5L"
          subtitle="26% margin"
          trend="+8.1%"
          color="text-[#06b6d4]"
        />
        <MetricCard
          label="Total Occupancy"
          value="78%"
          subtitle="Accommodation"
          trend="+5%"
          color="text-[#f0b100]"
        />
        <MetricCard
          label="Active Customers"
          value="342"
          subtitle="Residents + External"
          trend="+18"
          color="text-[#d946ef]"
        />
      </div>

      {/* Revenue by Product */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Revenue by Product</h3>
        <div className="space-y-3">
          <ProductRevenueBar product="Accommodation" value={12.8} total={24.7} margin={76} color="bg-[#9ae600]" />
          <ProductRevenueBar product="Flo-Zone (Co-work)" value={2.4} total={24.7} margin={85} color="bg-[#06b6d4]" />
          <ProductRevenueBar product="Kitchen/Cafe" value={2.5} total={24.7} margin={36} color="bg-[#fb2c36]" />
          <ProductRevenueBar product="Schelling Point (Events)" value={2.0} total={24.7} margin={65} color="bg-[#f0b100]" />
          <ProductRevenueBar product="Studio Space" value={1.8} total={24.7} margin={72} color="bg-[#9ae600]" />
          <ProductRevenueBar product="Pickle Ball" value={1.8} total={24.7} margin={92} color="bg-[#9ae600]" />
          <ProductRevenueBar product="Swimming Pool" value={1.4} total={24.7} margin={58} color="bg-[#f0b100]" />
        </div>
      </div>

      {/* Node Comparison */}
      {nodeFilter === 'all' && (
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Node Comparison</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Side-by-side performance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#27272a]">
                <tr>
                  <th className="text-left p-4 text-sm text-[#9f9fa9]">Product</th>
                  <th className="text-right p-4 text-sm text-[#9f9fa9]">Koramangala</th>
                  <th className="text-right p-4 text-sm text-[#9f9fa9]">Whitefield</th>
                  <th className="text-right p-4 text-sm text-[#9f9fa9]">Total</th>
                </tr>
              </thead>
              <tbody>
                <NodeComparisonRow product="Accommodation" koramangala="₹5.2L" whitefield="₹7.6L" total="₹12.8L" />
                <NodeComparisonRow product="Flo-Zone" koramangala="₹1.8L" whitefield="₹0.6L" total="₹2.4L" />
                <NodeComparisonRow product="Kitchen/Cafe" koramangala="₹1.6L" whitefield="₹0.9L" total="₹2.5L" />
                <NodeComparisonRow product="Events" koramangala="₹1.4L" whitefield="₹0.6L" total="₹2.0L" />
                <NodeComparisonRow product="Studio" koramangala="₹1.2L" whitefield="₹0.6L" total="₹1.8L" />
                <NodeComparisonRow product="Pickle Ball" koramangala="-" whitefield="₹1.8L" total="₹1.8L" whiteOnly />
                <NodeComparisonRow product="Pool" koramangala="-" whitefield="₹1.4L" total="₹1.4L" whiteOnly />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Growth Trends */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">6-Month Revenue Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          <TrendBar month="Aug" value={18.2} maxValue={25} />
          <TrendBar month="Sep" value={19.8} maxValue={25} />
          <TrendBar month="Oct" value={21.5} maxValue={25} />
          <TrendBar month="Nov" value={22.9} maxValue={25} />
          <TrendBar month="Dec" value={23.4} maxValue={25} />
          <TrendBar month="Jan" value={24.7} maxValue={25} highlight />
        </div>
      </div>
    </div>
  );
}

// ROOMS (ACCOMMODATION) TAB
function RoomsTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Total Revenue" value="₹12.8L" subtitle="This month" color="text-[#9ae600]" />
        <MetricCard label="Occupancy Rate" value="78%" subtitle="Private 87%, Dorms 90%" color="text-[#06b6d4]" />
        <MetricCard label="Avg Daily Rate" value="₹550" subtitle="Private rooms" color="text-[#f0b100]" />
        <MetricCard label="Residency Split" value="70/30" subtitle="Residency vs Spot" color="text-[#d946ef]" />
      </div>

      {/* Product Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Private Rooms</h3>
            <span className="px-3 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-sm">78% margin</span>
          </div>
          <div className="text-3xl mb-2">₹7.2L</div>
          <div className="text-sm text-[#9f9fa9] mb-4">56% of accommodation revenue</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">Occupancy:</span>
              <span>87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">ADR:</span>
              <span>₹550/night</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Total Rooms:</span>
              <span>K: 6, W: 12 (18 total)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Dorm Rooms</h3>
            <span className="px-3 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-sm">75% margin</span>
          </div>
          <div className="text-3xl mb-2">₹5.6L</div>
          <div className="text-sm text-[#9f9fa9] mb-4">44% of accommodation revenue</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">Occupancy:</span>
              <span>90%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">ADR:</span>
              <span>₹200/night</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Total Beds:</span>
              <span>K: 6, W: 10 (16 total)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Residency Dashboard */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Residency Program</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">MRR</div>
            <div className="text-2xl text-[#9ae600]">₹11.2L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Active Residents</div>
            <div className="text-2xl">32</div>
            <div className="text-xs text-[#71717b]">K: 12, W: 20</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Renewal Rate</div>
            <div className="text-2xl text-[#06b6d4]">35%</div>
            <div className="text-xs text-[#71717b]">Beyond 3 months</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Next Cohort</div>
            <div className="text-2xl">50</div>
            <div className="text-xs text-[#71717b]">Applications</div>
          </div>
        </div>
        <div className="p-4 bg-[#18181b] border border-[#27272a] rounded">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[#9ae600]" />
            <span>Next cohort starts: <strong>Feb 15, 2026</strong></span>
          </div>
        </div>
      </div>

      {/* Premium Stays Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Premium Stays (Spot Bookings)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Spot Revenue</div>
            <div className="text-2xl">₹6.2L</div>
            <div className="text-xs text-[#71717b]">30% of total</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Avg Lead Time</div>
            <div className="text-2xl">14 days</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Repeat Guests</div>
            <div className="text-2xl text-[#9ae600]">24%</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Peak vs Weekday</div>
            <div className="text-2xl">95% / 72%</div>
          </div>
        </div>
      </div>

      {/* Availability Calendar */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Next 30 Days Availability</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => (
            <AvailabilityDay key={i} day={i + 1} status={i % 3 === 0 ? 'full' : i % 5 === 0 ? 'half' : 'available'} />
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#9ae600] rounded"></div>
            <span className="text-[#9f9fa9]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#f0b100] rounded"></div>
            <span className="text-[#9f9fa9]">50% Full</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#fb2c36] rounded"></div>
            <span className="text-[#9f9fa9]">Sold Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// EVENTS TAB (Schelling Point)
function EventsTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Event Revenue" value="₹2.0L" subtitle="This month" color="text-[#9ae600]" />
        <MetricCard label="Events Hosted" value="11" subtitle="Total this month" color="text-[#06b6d4]" />
        <MetricCard label="Avg Event Value" value="₹18K" subtitle="Per event" color="text-[#f0b100]" />
        <MetricCard label="Capacity Used" value="65%" subtitle="Available days" color="text-[#d946ef]" />
      </div>

      {/* Node-Specific Performance */}
      {nodeFilter === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Koramangala</h3>
              <span className="px-3 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                No Constraints
              </span>
            </div>
            <div className="text-3xl mb-2">₹1.4L</div>
            <div className="space-y-2 text-sm mt-4">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Events:</span>
                <span>8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Capacity:</span>
                <span className="text-[#9ae600]">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Avg Value:</span>
                <span>₹17.5K</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Whitefield</h3>
              <span className="px-3 py-1 bg-[#fb2c36]/10 text-[#fb2c36] rounded text-sm flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Capped 2/month
              </span>
            </div>
            <div className="text-3xl mb-2">₹0.6L</div>
            <div className="space-y-2 text-sm mt-4">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Events:</span>
                <span>3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Capacity:</span>
                <span className="text-[#fb2c36]">2 events/month max</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Reason:</span>
                <span className="text-[#71717b]">Neighbor noise</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Type Breakdown */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Event Types</h3>
        <div className="space-y-3">
          <EventTypeRow type="Hackathons" count={2} revenue="₹1.50L" avgValue="₹75K" color="bg-[#9ae600]" />
          <EventTypeRow type="Workshops" count={5} revenue="₹1.50L" avgValue="₹30K" color="bg-[#06b6d4]" />
          <EventTypeRow type="Founder Dinners" count={4} revenue="₹0.50L" avgValue="₹12.5K" color="bg-[#f0b100]" />
        </div>
      </div>

      {/* Pipeline & Inquiries */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Pipeline & Inquiries</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">In Pipeline</div>
            <div className="text-2xl">6 events</div>
            <div className="text-sm text-[#9ae600]">₹1.2L potential</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Avg Lead Time</div>
            <div className="text-2xl">21 days</div>
            <div className="text-xs text-[#71717b]">Inquiry to event</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Conversion Rate</div>
            <div className="text-2xl text-[#06b6d4]">68%</div>
            <div className="text-xs text-[#71717b]">Quote to confirmed</div>
          </div>
        </div>
      </div>

      {/* Customer Mix */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Revenue by Customer Type</h3>
        <div className="space-y-3">
          <CustomerSegmentBar segment="Corporate Teams" percentage={45} value="₹0.90L" color="bg-[#9ae600]" />
          <CustomerSegmentBar segment="Tech Communities" percentage={35} value="₹0.70L" color="bg-[#06b6d4]" />
          <CustomerSegmentBar segment="Zo Residents" percentage={20} value="₹0.40L" color="bg-[#f0b100]" />
        </div>
      </div>
    </div>
  );
}

// CO-WORK TAB (Flo-Zone)
function CoworkTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Co-work Revenue" value="₹2.4L" subtitle="This month" color="text-[#9ae600]" />
        <MetricCard label="Utilization" value="35%" subtitle="TARGET: 70%" trend="-35%" color="text-[#fb2c36]" />
        <MetricCard label="Margin" value="85%" subtitle="Highest in network" color="text-[#9ae600]" />
        <MetricCard label="Active Members" value="78" subtitle="Day pass users" color="text-[#06b6d4]" />
      </div>

      {/* Opportunity Callout */}
      <div className="bg-gradient-to-r from-[#9ae600]/10 to-[#9ae600]/5 border border-[#9ae600]/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#9ae600]/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-[#9ae600]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg mb-2">⭐ Massive Opportunity</h3>
            <p className="text-sm text-[#9f9fa9] mb-3">Co-working has 85% margin (highest in network) but only 35% utilization. Doubling utilization = +₹2.4L revenue with ZERO incremental cost.</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#71717b]">Current Revenue:</span>
                <span className="ml-2">₹2.4L at 35%</span>
              </div>
              <div>
                <span className="text-[#71717b]">At 70% Utilization:</span>
                <span className="ml-2 text-[#9ae600]">₹4.8L (+₹2.4L)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5">
          <h4 className="text-sm text-[#9f9fa9] mb-2">Day Passes</h4>
          <div className="text-2xl mb-1">₹1.2L</div>
          <div className="text-xs text-[#71717b]">48 pass-days/month</div>
          <div className="text-xs text-[#9ae600] mt-2">₹500/day</div>
        </div>
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5">
          <h4 className="text-sm text-[#9f9fa9] mb-2">Monthly Desks</h4>
          <div className="text-2xl mb-1">₹0.8L</div>
          <div className="text-xs text-[#71717b]">10 desks occupied</div>
          <div className="text-xs text-[#9ae600] mt-2">₹8K/month</div>
        </div>
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5">
          <h4 className="text-sm text-[#9f9fa9] mb-2">Team Bookings</h4>
          <div className="text-2xl mb-1">₹0.4L</div>
          <div className="text-xs text-[#71717b]">3 teams this month</div>
          <div className="text-xs text-[#9ae600] mt-2">₹15K/week</div>
        </div>
      </div>

      {/* Node Performance Comparison */}
      {nodeFilter === 'all' && (
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Node Performance</h3>
            <p className="text-sm text-[#fb2c36] mt-1">⚠️ Whitefield has 2x the space but 3x lower utilization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-[#27272a]">
            <div className="p-6">
              <h4 className="text-sm text-[#9f9fa9] mb-3">Koramangala</h4>
              <div className="text-3xl mb-4">₹1.8L</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Utilization:</span>
                  <span className="text-[#f0b100]">42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Total Desks:</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Available Today:</span>
                  <span>7 desks</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#fb2c36]/5">
              <h4 className="text-sm text-[#9f9fa9] mb-3">Whitefield</h4>
              <div className="text-3xl mb-4">₹0.6L</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Utilization:</span>
                  <span className="text-[#fb2c36]">18% ⚠️⚠️</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Total Desks:</span>
                  <span>25 (2x Koramangala)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717b]">Available Today:</span>
                  <span>20 desks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capacity & Peak Hours */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Peak Hours Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Peak (2-6pm)</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-[#27272a] rounded-full overflow-hidden">
                <div className="h-full bg-[#9ae600]" style={{ width: '80%' }}></div>
              </div>
              <span className="text-sm w-12">80%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Off-peak (9-12pm)</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-[#27272a] rounded-full overflow-hidden">
                <div className="h-full bg-[#fb2c36]" style={{ width: '15%' }}></div>
              </div>
              <span className="text-sm w-12">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Customer Segments</h3>
        <div className="space-y-3">
          <CustomerSegmentBar segment="Remote Workers" percentage={45} value="Recurring day passes" color="bg-[#9ae600]" />
          <CustomerSegmentBar segment="Startup Teams" percentage={30} value="Monthly/team bookings" color="bg-[#06b6d4]" />
          <CustomerSegmentBar segment="Zo Residents" percentage={15} value="Included access" color="bg-[#f0b100]" />
          <CustomerSegmentBar segment="Event Attendees" percentage={10} value="One-time during events" color="bg-[#71717b]" />
        </div>
      </div>
    </div>
  );
}

// STUDIO TAB
function StudioTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Studio Revenue" value="₹1.8L" subtitle="This month" color="text-[#9ae600]" />
        <MetricCard label="Utilization" value="71%" subtitle="TARGET: 85%" color="text-[#f0b100]" />
        <MetricCard label="Avg Session Value" value="₹750/hr" subtitle="₹8K full-day" color="text-[#06b6d4]" />
        <MetricCard label="Bookings" value="24" subtitle="Sessions this month" color="text-[#d946ef]" />
      </div>

      {/* Service Type Breakdown */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Service Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#18181b] border border-[#27272a] rounded">
            <h4 className="text-sm text-[#9f9fa9] mb-2">Podcast Recording</h4>
            <div className="text-2xl mb-1">₹0.8L</div>
            <div className="text-xs text-[#71717b]">45% of revenue</div>
          </div>
          <div className="p-4 bg-[#18181b] border border-[#27272a] rounded">
            <h4 className="text-sm text-[#9f9fa9] mb-2">Video Production</h4>
            <div className="text-2xl mb-1">₹0.6L</div>
            <div className="text-xs text-[#71717b]">33% of revenue</div>
          </div>
          <div className="p-4 bg-[#18181b] border border-[#27272a] rounded">
            <h4 className="text-sm text-[#9f9fa9] mb-2">Photo Shoots</h4>
            <div className="text-2xl mb-1">₹0.4L</div>
            <div className="text-xs text-[#71717b]">22% of revenue</div>
          </div>
        </div>
      </div>

      {/* Node Comparison */}
      {nodeFilter === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Koramangala (Zo Studio IRL)</h3>
              <span className="px-3 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-sm">At Capacity</span>
            </div>
            <div className="text-3xl mb-4">₹1.2L</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Utilization:</span>
                <span className="text-[#9ae600]">85% ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Speciality:</span>
                <span>Podcast + Audio</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Whitefield (AV Studio)</h3>
              <span className="px-3 py-1 bg-[#f0b100]/10 text-[#f0b100] rounded text-sm">Room to Grow</span>
            </div>
            <div className="text-3xl mb-4">₹0.6L</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Utilization:</span>
                <span className="text-[#f0b100]">62% ⚠️</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">Speciality:</span>
                <span>Video + Green Screen</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment & Capabilities */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Equipment & Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#9ae600] rounded-full"></div>
              Audio
            </h4>
            <ul className="space-y-1 text-sm text-[#9f9fa9]">
              <li>• Pro microphones</li>
              <li>• Soundproofing</li>
              <li>• Mixing board</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#06b6d4] rounded-full"></div>
              Video
            </h4>
            <ul className="space-y-1 text-sm text-[#9f9fa9]">
              <li>• 4K cameras</li>
              <li>• Lighting rigs</li>
              <li>• Green screen (W)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#f0b100] rounded-full"></div>
              Editing
            </h4>
            <ul className="space-y-1 text-sm text-[#9f9fa9]">
              <li>• On-site stations</li>
              <li>• Adobe Creative Suite</li>
              <li>• DaVinci Resolve</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customer Mix */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Customer Mix</h3>
        <div className="space-y-3">
          <CustomerSegmentBar segment="Content Creators" percentage={50} value="Recurring customers" color="bg-[#9ae600]" />
          <CustomerSegmentBar segment="Corporate" percentage={25} value="Training videos, interviews" color="bg-[#06b6d4]" />
          <CustomerSegmentBar segment="Zo Residents" percentage={15} value="Side projects" color="bg-[#f0b100]" />
          <CustomerSegmentBar segment="External Teams" percentage={10} value="One-off productions" color="bg-[#71717b]" />
        </div>
      </div>

      {/* Growth Opportunity */}
      <div className="bg-gradient-to-r from-[#06b6d4]/10 to-[#06b6d4]/5 border border-[#06b6d4]/30 rounded-lg p-6">
        <h3 className="text-lg mb-3">Growth Opportunities</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Partner with creator communities:</strong> YouTube, podcast networks for steady bookings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Package deals:</strong> 10 hours for ₹6,500 (vs ₹7,500 regular)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Add editing services:</strong> ₹2,000/hour (high-margin add-on)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// AMENITIES TAB (Pickle Ball & Pool)
function AmenitiesTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  // Show notice if Koramangala is selected
  if (nodeFilter === 'koramangala') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#f0b100]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-[#f0b100]" />
          </div>
          <h3 className="text-xl mb-2">Amenities Not Available</h3>
          <p className="text-[#9f9fa9]">Pickle Ball and Swimming Pool are exclusive to Whitefield node. Switch to Whitefield or All Nodes to view amenities data.</p>
          <button
            onClick={() => {}}
            className="mt-4 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors"
          >
            View Whitefield Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#9ae600]/10 border border-[#9ae600]/30 rounded-lg">
        <p className="text-sm">
          <strong>Whitefield Exclusive:</strong> These amenities only exist at Whitefield node. They generate external revenue while adding value for residents.
        </p>
      </div>

      {/* Pickle Ball Section */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">🏓 Pickle Ball Court</h2>
          <span className="px-3 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-sm">92% Margin ⭐</span>
        </div>

        {/* Pickle Ball Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Revenue</div>
            <div className="text-2xl">₹1.8L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">External Bookings</div>
            <div className="text-2xl text-[#9ae600]">200 hrs</div>
            <div className="text-xs text-[#71717b]">₹600/hour</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Resident Usage</div>
            <div className="text-2xl text-[#06b6d4]">120 hrs</div>
            <div className="text-xs text-[#71717b]">Free, included</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Utilization</div>
            <div className="text-2xl">45%</div>
            <div className="text-xs text-[#71717b]">External + Resident</div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-[#18181b] border border-[#27272a] rounded p-4 mb-4">
          <h4 className="text-sm mb-3">Revenue Mix</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">External Hourly (₹600/hr):</span>
              <span>62% usage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Tournaments (₹15K each):</span>
              <span>8 events</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Corporate Bookings:</span>
              <span>12 team slots</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Operating Costs:</span>
              <span className="text-[#fb2c36]">₹15K/month</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-[#18181b] border border-[#27272a] rounded p-4">
          <h4 className="text-sm mb-3">Capacity Management</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">Prime Hours (6-9pm):</span>
              <span className="text-[#9ae600]">Reserved for residents</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Day Hours (9am-6pm):</span>
              <span>External bookings allowed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Weekends:</span>
              <span>Mixed (50/50)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swimming Pool Section */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">🏊 Swimming Pool</h2>
          <span className="px-3 py-1 bg-[#f0b100]/10 text-[#f0b100] rounded text-sm">58% Margin</span>
        </div>

        {/* Pool Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Revenue</div>
            <div className="text-2xl">₹1.4L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Day Passes</div>
            <div className="text-2xl">245</div>
            <div className="text-xs text-[#71717b]">₹300 each = ₹73.5K</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Pool Parties</div>
            <div className="text-2xl text-[#9ae600]">4</div>
            <div className="text-xs text-[#71717b]">₹25K each = ₹1.0L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Resident Usage</div>
            <div className="text-2xl text-[#06b6d4]">340</div>
            <div className="text-xs text-[#71717b]">Swims (unlimited)</div>
          </div>
        </div>

        {/* Revenue Strategy */}
        <div className="bg-gradient-to-r from-[#9ae600]/10 to-[#9ae600]/5 border border-[#9ae600]/30 rounded p-4 mb-4">
          <h4 className="text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#9ae600]" />
            Revenue Strategy
          </h4>
          <p className="text-sm text-[#9f9fa9] mb-3">
            Pool parties generate <strong>83x more value</strong> than day passes (₹25K vs ₹300)
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">Current: 4 parties/month</span>
              <span>₹1.0L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9ae600]">Target: 6 parties/month</span>
              <span className="text-[#9ae600]">₹1.5L (+₹50K)</span>
            </div>
          </div>
        </div>

        {/* Operating Costs */}
        <div className="bg-[#18181b] border border-[#27272a] rounded p-4">
          <h4 className="text-sm mb-3">Operating Costs (₹60K/month)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#71717b]">Chemicals:</span>
              <span>₹25K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Lifeguard:</span>
              <span>₹25K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Cleaning:</span>
              <span>₹10K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Insights */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Amenities Strategy</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-[#9ae600]">✓</span>
            <span><strong>Pickle Ball:</strong> Highest margin product (92%), balance external revenue with prime-time resident access</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#9ae600]">✓</span>
            <span><strong>Pool:</strong> Focus on high-value pool parties (₹25K) over day passes (₹300), target 6 parties/month</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#9ae600]">✓</span>
            <span><strong>Resident Value:</strong> Both amenities are key differentiators for residency program</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#9ae600]">✓</span>
            <span><strong>Weekend Strategy:</strong> Cap day passes at 20/day, prioritize private bookings and events</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// CAFE TAB (Kitchen)
function CafeTab({ nodeFilter }: { nodeFilter: NodeFilter }) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#f0b100]/10 border border-[#f0b100]/30 rounded-lg">
        <p className="text-sm">
          <strong>Service for Residents, Not Profit Center:</strong> Kitchen exists to serve residents. Target is cost optimization (reduce food costs), not revenue growth.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Kitchen Revenue" value="₹2.5L" subtitle="This month" color="text-[#9ae600]" />
        <MetricCard label="Orders" value="412" subtitle="This month" color="text-[#06b6d4]" />
        <MetricCard label="Avg Order Value" value="₹1,020" subtitle="Per order" color="text-[#f0b100]" />
        <MetricCard label="Margin" value="36%" subtitle="64% COGS" color="text-[#fb2c36]" />
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Revenue Sources</h3>
        <div className="space-y-3">
          <CustomerSegmentBar segment="Resident Meals" percentage={64} value="₹1.6L (core service)" color="bg-[#9ae600]" />
          <CustomerSegmentBar segment="Walk-in Customers" percentage={28} value="₹0.7L" color="bg-[#06b6d4]" />
          <CustomerSegmentBar segment="Event Catering" percentage={8} value="₹0.2L" color="bg-[#f0b100]" />
        </div>
      </div>

      {/* Node Performance */}
      {nodeFilter === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <h3 className="text-lg mb-4">Koramangala</h3>
            <div className="text-3xl mb-4">₹1.6L</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Orders:</span>
                <span>245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">AOV:</span>
                <span>₹1,143</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
            <h3 className="text-lg mb-4">Whitefield</h3>
            <div className="text-3xl mb-4">₹0.9L</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#71717b]">Orders:</span>
                <span>167</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717b]">AOV:</span>
                <span>₹898</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Structure */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Cost Structure (Critical to Track)</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded">
            <span className="text-sm">Food Costs (COGS)</span>
            <div className="text-right">
              <div className="text-xl text-[#fb2c36]">₹1.6L</div>
              <div className="text-xs text-[#71717b]">64% of revenue</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded">
            <span className="text-sm">Labor (Chef + Sous)</span>
            <div className="text-xl">₹40K</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded">
            <span className="text-sm">Utilities</span>
            <div className="text-xl">₹15K</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#9ae600]/10 border border-[#9ae600]/30 rounded">
            <span className="text-sm">Net Profit</span>
            <div className="text-right">
              <div className="text-xl text-[#9ae600]">₹35K</div>
              <div className="text-xs text-[#71717b]">14% net margin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Optimization Target */}
      <div className="bg-gradient-to-r from-[#06b6d4]/10 to-[#06b6d4]/5 border border-[#06b6d4]/30 rounded-lg p-6">
        <h3 className="text-lg mb-3">Cost Optimization Goals</h3>
        <p className="text-sm text-[#9f9fa9] mb-4">Focus: Reduce food costs from ₹82K to ₹70K/month</p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Better procurement:</strong> Bulk orders, seasonal produce partnerships</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Reduce waste:</strong> Smaller batch cooking, better forecasting systems</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Menu optimization:</strong> Focus on high-margin items, reduce low-margin full meals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#06b6d4]">•</span>
            <span><strong>Don't chase walk-ins:</strong> Resident experience is priority, not external revenue</span>
          </li>
        </ul>
      </div>

      {/* Menu Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Menu Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left p-3 text-sm text-[#9f9fa9]">Item</th>
                <th className="text-right p-3 text-sm text-[#9f9fa9]">Orders</th>
                <th className="text-right p-3 text-sm text-[#9f9fa9]">Price</th>
                <th className="text-right p-3 text-sm text-[#9f9fa9]">Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#27272a]">
                <td className="p-3 text-sm">Dal-Rice</td>
                <td className="p-3 text-sm text-right">120</td>
                <td className="p-3 text-sm text-right">₹350</td>
                <td className="p-3 text-sm text-right text-[#fb2c36]">25%</td>
              </tr>
              <tr className="border-b border-[#27272a]">
                <td className="p-3 text-sm">Pasta</td>
                <td className="p-3 text-sm text-right">89</td>
                <td className="p-3 text-sm text-right">₹280</td>
                <td className="p-3 text-sm text-right text-[#f0b100]">45%</td>
              </tr>
              <tr className="border-b border-[#27272a]">
                <td className="p-3 text-sm">Sandwiches</td>
                <td className="p-3 text-sm text-right">67</td>
                <td className="p-3 text-sm text-right">₹180</td>
                <td className="p-3 text-sm text-right text-[#9ae600]">60%</td>
              </tr>
              <tr className="border-b border-[#27272a]">
                <td className="p-3 text-sm">Coffee</td>
                <td className="p-3 text-sm text-right">136</td>
                <td className="p-3 text-sm text-right">₹80</td>
                <td className="p-3 text-sm text-right text-[#9ae600]">70%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Components

interface MetricCardProps {
  label: string;
  value: string;
  subtitle: string;
  trend?: string;
  color: string;
}

function MetricCard({ label, value, subtitle, trend, color }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
      <div className="text-xs text-[#9f9fa9] mb-1">{label}</div>
      <div className={`text-2xl mb-1 ${color}`}>{value}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#71717b]">{subtitle}</div>
        {trend && (
          <div className={`text-xs ${trend.startsWith('+') ? 'text-[#9ae600]' : 'text-[#fb2c36]'}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductRevenueBarProps {
  product: string;
  value: number;
  total: number;
  margin: number;
  color: string;
}

function ProductRevenueBar({ product, value, total, margin, color }: ProductRevenueBarProps) {
  const percentage = (value / total) * 100;
  const marginColor = margin > 70 ? 'text-[#9ae600]' : margin > 40 ? 'text-[#f0b100]' : 'text-[#fb2c36]';
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>{product}</span>
        <div className="flex items-center gap-3">
          <span className={marginColor}>{margin}% margin</span>
          <span>₹{value.toFixed(1)}L</span>
        </div>
      </div>
      <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

interface NodeComparisonRowProps {
  product: string;
  koramangala: string;
  whitefield: string;
  total: string;
  whiteOnly?: boolean;
}

function NodeComparisonRow({ product, koramangala, whitefield, total, whiteOnly }: NodeComparisonRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="p-4 text-sm">
        {product}
        {whiteOnly && <span className="ml-2 text-xs text-[#f0b100]">(Whitefield only)</span>}
      </td>
      <td className="p-4 text-sm text-right">{koramangala}</td>
      <td className="p-4 text-sm text-right">{whitefield}</td>
      <td className="p-4 text-sm text-right text-[#9ae600]">{total}</td>
    </tr>
  );
}

interface TrendBarProps {
  month: string;
  value: number;
  maxValue: number;
  highlight?: boolean;
}

function TrendBar({ month, value, maxValue, highlight }: TrendBarProps) {
  const height = (value / maxValue) * 100;
  
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full flex items-end justify-center h-48">
        <div 
          className={`w-full ${highlight ? 'bg-[#9ae600]' : 'bg-[#27272a]'} rounded-t transition-all hover:opacity-80`}
          style={{ height: `${height}%` }}
        />
      </div>
      <div className="text-xs text-center">
        <div className="text-[#9f9fa9] mb-1">{month}</div>
        <div className={highlight ? 'text-[#9ae600]' : 'text-white'}>₹{value}L</div>
      </div>
    </div>
  );
}

interface EventTypeRowProps {
  type: string;
  count: number;
  revenue: string;
  avgValue: string;
  color: string;
}

function EventTypeRow({ type, count, revenue, avgValue, color }: EventTypeRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-12 ${color} rounded-full`}></div>
        <div>
          <div className="text-sm">{type}</div>
          <div className="text-xs text-[#71717b]">{count} events • Avg {avgValue}</div>
        </div>
      </div>
      <div className="text-lg">{revenue}</div>
    </div>
  );
}

interface CustomerSegmentBarProps {
  segment: string;
  percentage: number;
  value: string;
  color: string;
}

function CustomerSegmentBar({ segment, percentage, value, color }: CustomerSegmentBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>{segment}</span>
        <span className="text-[#9f9fa9]">{value}</span>
      </div>
      <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

interface AvailabilityDayProps {
  day: number;
  status: 'available' | 'half' | 'full';
}

function AvailabilityDay({ day, status }: AvailabilityDayProps) {
  const colorMap = {
    available: 'bg-[#9ae600]',
    half: 'bg-[#f0b100]',
    full: 'bg-[#fb2c36]'
  };
  
  return (
    <div className={`aspect-square ${colorMap[status]} rounded flex items-center justify-center text-xs cursor-pointer hover:opacity-80 transition-opacity`}>
      {day}
    </div>
  );
}

// Helper imports
import { CheckCircle, AlertTriangle } from 'lucide-react';

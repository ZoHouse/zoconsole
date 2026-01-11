import { ChevronDown, Wifi, WifiOff, ThermometerSun, Droplets, Zap, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Wrench, AlertCircle, Camera, Maximize2, DollarSign, Users, Volume2, Package, Star, MessageSquare, Sparkles, Plus, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { Profitability } from './Profitability';
import { Crew } from './Crew';
import { InventoryNew } from './InventoryNew';
import { TaskScheduler } from './TaskScheduler';

interface CaptainsDeckProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  subView?: 'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks';
  onSubViewChange?: (view: 'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks') => void;
}

export function CaptainsDeck({ selectedProperty, onPropertyChange, subView: externalSubView, onSubViewChange }: CaptainsDeckProps) {
  const [internalSubView, setInternalSubView] = useState<'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks'>('overview');
  
  const subView = externalSubView || internalSubView;
  const handleSubViewChange = (view: 'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks') => {
    if (onSubViewChange) {
      onSubViewChange(view);
    } else {
      setInternalSubView(view);
    }
  };

  return (
    <>
      <Header 
        selectedProperty={selectedProperty} 
        onPropertyChange={onPropertyChange} 
        subView={subView}
        onSubViewChange={handleSubViewChange}
      />
      {subView === 'overview' && (
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-[1400px] space-y-6">
            <IoTStatus />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PnLSummary />
              <MaintenanceOverview />
            </div>
            <LowStockItems />
            <CameraViews />
            <FeedbackAndRatings />
          </div>
        </main>
      )}
      {subView === 'profitability' && (
        <Profitability selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} embedded={true} />
      )}
      {subView === 'crew' && (
        <Crew selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} embedded={true} />
      )}
      {subView === 'inventory' && (
        <InventoryNew selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} embedded={true} />
      )}
      {subView === 'tasks' && (
        <TaskScheduler selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />
      )}
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  subView: 'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks';
  onSubViewChange: (view: 'overview' | 'profitability' | 'crew' | 'inventory' | 'tasks') => void;
}

function Header({ selectedProperty, onPropertyChange, subView, onSubViewChange }: HeaderProps) {
  const properties = [
    { id: 'all', name: 'All Properties' },
    { id: 'zo-house-bali', name: 'Zo House Bali' },
    { id: 'zo-house-portugal', name: 'Zo House Portugal' },
    { id: 'zo-house-thailand', name: 'Zo House Thailand' },
    { id: 'zo-house-tulum', name: 'Zo House Tulum' },
    { id: 'zo-house-barcelona', name: 'Zo House Barcelona' },
  ];

  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl">Captain's Deck</h1>
            <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Property manager command center</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedProperty}
                onChange={(e) => onPropertyChange(e.target.value)}
                className="appearance-none w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-xs sm:text-sm text-white focus:outline-none focus:border-[#71717b] pr-10"
              >
                {properties.map((property) => (
                  <option key={property.id} value={property.id} className="bg-[#18181b]">
                    {property.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
            
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] whitespace-nowrap">
              <span className="text-xs sm:text-sm">Today</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => onSubViewChange('overview')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'overview'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => onSubViewChange('profitability')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'profitability'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Profitability
          </button>
          <button
            onClick={() => onSubViewChange('crew')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'crew'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Crew
          </button>
          <button
            onClick={() => onSubViewChange('tasks')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'tasks'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Tasks
          </button>
          <button
            onClick={() => onSubViewChange('inventory')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'inventory'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            Inventory
          </button>
        </div>
      </div>
    </header>
  );
}

function IoTStatus() {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg">Vibe Check</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">Real-time device monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <IoTDevice 
          icon={<Sparkles className="w-5 h-5" />}
          label="Vibe Score"
          value="85%"
          status="online"
          bgColor="bg-[#9ae600]/10"
          iconColor="text-[#9ae600]"
        />
        <IoTDevice 
          icon={<Volume2 className="w-5 h-5" />}
          label="Sound"
          value="65 dB"
          status="online"
          bgColor="bg-[#06b6d4]/10"
          iconColor="text-[#06b6d4]"
        />
        <IoTDevice 
          icon={<Zap className="w-5 h-5" />}
          label="Power"
          value="2.4 kW"
          status="online"
          bgColor="bg-[#9ae600]/10"
          iconColor="text-[#9ae600]"
        />
        <IoTDevice 
          icon={<Wifi className="w-5 h-5" />}
          label="WiFi Speed"
          value="98 Mbps"
          status="online"
          bgColor="bg-[#06b6d4]/10"
          iconColor="text-[#06b6d4]"
        />
      </div>
    </div>
  );
}

interface IoTDeviceProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'online' | 'offline';
  bgColor: string;
  iconColor: string;
}

function IoTDevice({ icon, label, value, status, bgColor, iconColor }: IoTDeviceProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <div className={iconColor}>{icon}</div>
        </div>
        {status === 'online' ? (
          <Wifi className="w-4 h-4 text-[#06b6d4]" />
        ) : (
          <WifiOff className="w-4 h-4 text-[#71717b]" />
        )}
      </div>
      <div className="text-2xl mb-1">{value}</div>
      <div className="text-sm text-[#9f9fa9]">{label}</div>
    </div>
  );
}

function PnLSummary() {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <h2 className="text-lg mb-6">P&L Summary</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <span className="text-[#9f9fa9]">Revenue</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">$45,280</span>
            <TrendingUp className="w-4 h-4 text-[#9ae600]" />
            <span className="text-xs text-[#9ae600]">+12%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <span className="text-[#9f9fa9]">Costs</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">$28,150</span>
            <TrendingDown className="w-4 h-4 text-[#fb2c36]" />
            <span className="text-xs text-[#fb2c36]">+8%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[#9f9fa9]">Net Profit</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#9ae600]">$17,130</span>
            <TrendingUp className="w-4 h-4 text-[#9ae600]" />
            <span className="text-xs text-[#9ae600]">+18%</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#27272a]">
          <div className="text-sm text-[#9f9fa9] mb-2">Profit Margin</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
              <div className="bg-[#9ae600] h-2 rounded-full" style={{ width: '37.8%' }}></div>
            </div>
            <span className="text-sm">37.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaintenanceOverview() {
  const tasks = [
    { id: 1, title: 'Pool Filter Cleaning', priority: 'high', status: 'pending' },
    { id: 2, title: 'AC Unit Check - Room 204', priority: 'medium', status: 'in-progress' },
    { id: 3, title: 'Garden Irrigation Repair', priority: 'low', status: 'pending' },
    { id: 4, title: 'Elevator Inspection', priority: 'high', status: 'completed' },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">Maintenance Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#9f9fa9]">4 Active</span>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
            <Plus className="w-4 h-4" />
            Add Issue
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-[#9ae600]" />
                  ) : task.status === 'in-progress' ? (
                    <Wrench className="w-4 h-4 text-[#06b6d4]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#f0b100]" />
                  )}
                  <span className="text-sm">{task.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    task.priority === 'high' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
                    task.priority === 'medium' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
                    'bg-[#06b6d4]/10 text-[#06b6d4]'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    task.status === 'completed' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
                    task.status === 'in-progress' ? 'bg-[#06b6d4]/10 text-[#06b6d4]' :
                    'bg-[#71717b]/10 text-[#71717b]'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LowStockItems() {
  const lowStockItems = [
    { 
      id: 1, 
      name: 'Toilet Paper', 
      category: 'House Zones',
      location: 'All Bathrooms',
      quantity: 12, 
      minThreshold: 50,
      unit: 'rolls',
      urgency: 'high'
    },
    { 
      id: 2, 
      name: 'Hand Soap', 
      category: 'House Zones',
      location: 'Guest Rooms',
      quantity: 8, 
      minThreshold: 30,
      unit: 'bottles',
      urgency: 'high'
    },
    { 
      id: 3, 
      name: 'Coffee Beans', 
      category: 'Kitchen',
      location: 'Cafe Storage',
      quantity: 2.5, 
      minThreshold: 10,
      unit: 'kg',
      urgency: 'medium'
    },
    { 
      id: 4, 
      name: 'Olive Oil', 
      category: 'Kitchen',
      location: 'Kitchen Pantry',
      quantity: 3, 
      minThreshold: 8,
      unit: 'liters',
      urgency: 'medium'
    },
    { 
      id: 5, 
      name: 'Cleaning Supplies', 
      category: 'House Zones',
      location: 'Maintenance Room',
      quantity: 5, 
      minThreshold: 20,
      unit: 'items',
      urgency: 'high'
    },
    { 
      id: 6, 
      name: 'Fresh Towels', 
      category: 'House Zones',
      location: 'Linen Closet',
      quantity: 18, 
      minThreshold: 50,
      unit: 'pieces',
      urgency: 'medium'
    },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg">Low Stock Alert</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">Items requiring immediate reorder</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#fb2c36]/10 border border-[#fb2c36]/30 rounded">
            <AlertTriangle className="w-4 h-4 text-[#fb2c36]" />
            <span className="text-sm text-[#fb2c36]">{lowStockItems.filter(i => i.urgency === 'high').length} Critical</span>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All Inventory</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lowStockItems.map(item => (
          <div key={item.id} className={`bg-[#1a1a1a] border rounded-lg p-4 hover:border-[#9ae600] transition-colors ${
            item.urgency === 'high' ? 'border-[#fb2c36]/50' : 'border-[#f0b100]/50'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm">{item.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    item.urgency === 'high' 
                      ? 'bg-[#fb2c36]/10 text-[#fb2c36]' 
                      : 'bg-[#f0b100]/10 text-[#f0b100]'
                  }`}>
                    {item.urgency}
                  </span>
                </div>
                <div className="text-xs text-[#9f9fa9] mb-2">{item.location}</div>
              </div>
              <Package className={`w-4 h-4 ${
                item.urgency === 'high' ? 'text-[#fb2c36]' : 'text-[#f0b100]'
              }`} />
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9f9fa9]">Stock Level</span>
                <span className={`text-sm ${
                  item.urgency === 'high' ? 'text-[#fb2c36]' : 'text-[#f0b100]'
                }`}>
                  {item.quantity} {item.unit}
                </span>
              </div>
              <div className="bg-[#09090b] rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    item.urgency === 'high' ? 'bg-[#fb2c36]' : 'bg-[#f0b100]'
                  }`}
                  style={{ width: `${(item.quantity / item.minThreshold) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-[#71717b]">Min: {item.minThreshold} {item.unit}</span>
                <span className="text-xs text-[#71717b]">{Math.round((item.quantity / item.minThreshold) * 100)}%</span>
              </div>
            </div>

            <button className="w-full px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              Reorder Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CameraViews() {
  const cameras = [
    { id: 1, name: 'Main Entrance', status: 'online' },
    { id: 2, name: 'Pool Area', status: 'online' },
    { id: 3, name: 'Parking Lot', status: 'online' },
    { id: 4, name: 'Rooftop', status: 'offline' },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">Camera Views</h2>
        <button className="text-sm text-[#9ae600] hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cameras.map(camera => (
          <div key={camera.id} className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden group hover:border-[#9ae600] transition-colors">
            <div className="aspect-video bg-[#09090b] flex items-center justify-center relative">
              <Camera className="w-8 h-8 text-[#71717b]" />
              <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{camera.name}</span>
                {camera.status === 'online' ? (
                  <span className="w-2 h-2 bg-[#06b6d4] rounded-full"></span>
                ) : (
                  <span className="w-2 h-2 bg-[#71717b] rounded-full"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackAndRatings() {
  const googleReviewsStats = {
    totalReviews: 1247,
    averageRating: 4.6,
    ratingDistribution: {
      5: 892,
      4: 234,
      3: 78,
      2: 28,
      1: 15
    },
    responseRate: 87,
    averageResponseTime: '2.3 hours',
    recentReviews: [
      {
        id: 1,
        guestName: 'Emma Thompson',
        rating: 5,
        time: '2 hours ago',
        date: 'Dec 29, 2025',
        comment: 'Amazing property! The staff was incredibly helpful and the location is perfect. The rooftop pool area is stunning. Will definitely recommend to friends and family. Best co-living experience we\'ve had!',
        responded: false,
        verified: true
      },
      {
        id: 2,
        guestName: 'James Rodriguez',
        rating: 4,
        time: '5 hours ago',
        date: 'Dec 29, 2025',
        comment: 'Great stay overall. Room was clean and comfortable. Only minor issue was the WiFi speed in the evening, but the staff fixed it quickly.',
        responded: true,
        responseText: 'Thank you for your feedback! We\'re glad you enjoyed your stay. We\'ve upgraded our WiFi infrastructure.',
        verified: true
      },
      {
        id: 3,
        guestName: 'Sophie Chen',
        rating: 3,
        time: '1 day ago',
        date: 'Dec 28, 2025',
        comment: 'Decent experience but the AC took time to cool the room. Breakfast options could be improved with more variety.',
        responded: false,
        verified: true
      },
      {
        id: 4,
        guestName: 'Marcus Williams',
        rating: 5,
        time: '1 day ago',
        date: 'Dec 28, 2025',
        comment: 'Exceptional service! The vibe curator made our experience truly special. Best co-living space we\'ve stayed at. Highly recommend!',
        responded: true,
        responseText: 'We\'re thrilled you had such a wonderful experience! Thank you for the kind words about our team.',
        verified: true
      },
      {
        id: 5,
        guestName: 'Aria Patel',
        rating: 2,
        time: '2 days ago',
        date: 'Dec 27, 2025',
        comment: 'Room was not as clean as expected. Maintenance issues with the bathroom fixtures need attention. Expected better for the price.',
        responded: false,
        verified: true
      },
    ]
  };

  const { totalReviews, averageRating, ratingDistribution, responseRate, averageResponseTime, recentReviews } = googleReviewsStats;
  const pendingResponses = recentReviews.filter(r => !r.responded).length;

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-lg">Google Reviews Management</h2>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='24' height='24'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E" alt="Google" className="w-6 h-6" />
          </div>
          <p className="text-sm text-[#9f9fa9]">Monitor and respond to customer reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#4285F4] text-white rounded text-sm hover:bg-[#357ae8] transition-colors">
            View on Google
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#f0b100] fill-[#f0b100]" />
            <span className="text-sm text-[#9f9fa9]">Average Rating</span>
          </div>
          <div className="text-2xl">{averageRating}</div>
          <div className="text-xs text-[#9f9fa9] mt-1">out of 5.0</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm text-[#9f9fa9]">Total Reviews</span>
          </div>
          <div className="text-2xl">{totalReviews.toLocaleString()}</div>
          <div className="text-xs text-[#9ae600] mt-1">+23 this week</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-[#9ae600]" />
            <span className="text-sm text-[#9f9fa9]">Response Rate</span>
          </div>
          <div className="text-2xl">{responseRate}%</div>
          <div className="text-xs text-[#9f9fa9] mt-1">Avg: {averageResponseTime}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#f0b100]" />
            <span className="text-sm text-[#9f9fa9]">Pending Replies</span>
          </div>
          <div className="text-2xl">{pendingResponses}</div>
          <div className="text-xs text-[#f0b100] mt-1">Needs attention</div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">Most Recent Reviews</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1 bg-[#18181b] border border-[#27272a] rounded hover:bg-[#27272a] transition-colors">
              All Reviews
            </button>
            <button className="text-xs px-3 py-1 bg-[#18181b] border border-[#27272a] rounded hover:bg-[#27272a] transition-colors">
              Unanswered Only
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {recentReviews.slice(0, 1).map(review => (
            <div key={review.id} className={`bg-[#1a1a1a] border rounded-lg p-4 transition-colors ${
              review.responded ? 'border-[#27272a]' : 'border-[#f0b100]'
            }`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{review.guestName}</span>
                    {review.verified && (
                      <CheckCircle className="w-3 h-3 text-[#4285F4]" />
                    )}
                    <span className="text-xs text-[#71717b]">•</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'text-[#f0b100] fill-[#f0b100]'
                              : 'text-[#71717b]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-[#9f9fa9]">{review.date}</span>
                    <span className="text-xs text-[#71717b]">•</span>
                    <span className="text-xs text-[#71717b]">{review.time}</span>
                  </div>
                </div>
                {!review.responded && (
                  <span className="text-xs px-2 py-1 rounded bg-[#f0b100]/10 text-[#f0b100] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Pending
                  </span>
                )}
              </div>
              
              <p className="text-sm text-[#d4d4d8] leading-relaxed mb-3">{review.comment}</p>

              {review.responded ? (
                <div className="bg-[#09090b] border border-[#27272a] rounded p-3 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#9ae600] rounded-full flex items-center justify-center text-black text-xs">
                      Z
                    </div>
                    <span className="text-xs text-[#9f9fa9]">Zo House Team</span>
                    <CheckCircle className="w-3 h-3 text-[#9ae600]" />
                  </div>
                  <p className="text-sm text-[#d4d4d8]">{review.responseText}</p>
                </div>
              ) : (
                <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2 mt-2">
                  <MessageSquare className="w-4 h-4" />
                  Reply to Review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#27272a] flex justify-center">
        <button className="text-sm text-[#9ae600] hover:underline">Load More Reviews</button>
      </div>
    </div>
  );
}
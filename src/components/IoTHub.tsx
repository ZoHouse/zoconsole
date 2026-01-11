import { Wifi, WifiOff, ThermometerSun, Droplets, Zap, Volume2, Camera, Lock, Wind, Lightbulb, Tv, Speaker, Activity, AlertTriangle, CheckCircle2, Settings, TrendingUp, TrendingDown, BarChart3, Clock, MapPin, ChevronDown, Search, Plus, MoreVertical, Play, Pause, RotateCw, Power, PowerOff } from 'lucide-react';
import { useState } from 'react';

interface IoTHubProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function IoTHub({ selectedProperty, onPropertyChange }: IoTHubProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'automation' | 'analytics'>('overview');

  return (
    <>
      <Header 
        selectedProperty={selectedProperty}
        onPropertyChange={onPropertyChange}
      />
      
      {/* Tab Navigation */}
      <div className="border-b border-[#27272a] px-4 sm:px-6">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<Activity className="w-4 h-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'devices'}
            onClick={() => setActiveTab('devices')}
            icon={<Wifi className="w-4 h-4" />}
            label="Devices"
          />
          <TabButton
            active={activeTab === 'automation'}
            onClick={() => setActiveTab('automation')}
            icon={<RotateCw className="w-4 h-4" />}
            label="Automation"
          />
          <TabButton
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            icon={<BarChart3 className="w-4 h-4" />}
            label="Analytics"
          />
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px] space-y-6">
          {activeTab === 'overview' && <OverviewTab selectedProperty={selectedProperty} />}
          {activeTab === 'devices' && <DevicesTab selectedProperty={selectedProperty} />}
          {activeTab === 'automation' && <AutomationTab selectedProperty={selectedProperty} />}
          {activeTab === 'analytics' && <AnalyticsTab selectedProperty={selectedProperty} />}
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
          <h1 className="text-xl sm:text-2xl">IoT Hub</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Smart device monitoring and control</p>
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
          
          <div className="flex items-center gap-2 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded">
            <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse"></span>
            <span className="text-sm whitespace-nowrap">Live</span>
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
  return (
    <div className="space-y-6">
      {/* System Status */}
      <SystemStatus />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Activity className="w-5 h-5" />}
          title="System Health"
          value="98%"
          subtitle="All systems operational"
          color="text-[#9ae600]"
          bgColor="bg-[#9ae600]/10"
          trend="+2%"
        />
        <MetricCard
          icon={<Wifi className="w-5 h-5" />}
          title="Connected Devices"
          value="124"
          subtitle="8 offline"
          color="text-[#06b6d4]"
          bgColor="bg-[#06b6d4]/10"
          trend="+5"
        />
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          title="Power Usage"
          value="12.4 kW"
          subtitle="Real-time"
          color="text-[#f0b100]"
          bgColor="bg-[#f0b100]/10"
          trend="-8%"
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Active Alerts"
          value="3"
          subtitle="2 require attention"
          color="text-[#fb2c36]"
          bgColor="bg-[#fb2c36]/10"
          trend="0"
        />
      </div>

      {/* Device Categories */}
      <DeviceCategories />

      {/* Recent Alerts */}
      <RecentAlerts />

      {/* Quick Controls */}
      <QuickControls />
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg mb-1">System Status</h2>
          <p className="text-sm text-[#9f9fa9]">Real-time monitoring across all zones</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#9ae600]/10 border border-[#9ae600]/30 rounded">
          <CheckCircle2 className="w-4 h-4 text-[#9ae600]" />
          <span className="text-sm text-[#9ae600] font-medium">Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatusCard
          icon={<Lightbulb className="w-5 h-5" />}
          label="Lights"
          value="48 devices"
          status="online"
          bgColor="bg-[#f0b100]/10"
          iconColor="text-[#f0b100]"
        />
        <StatusCard
          icon={<Tv className="w-5 h-5" />}
          label="TVs"
          value="12 devices"
          status="online"
          bgColor="bg-[#06b6d4]/10"
          iconColor="text-[#06b6d4]"
        />
        <StatusCard
          icon={<Wifi className="w-5 h-5" />}
          label="WiFi APs"
          value="18 devices"
          status="online"
          bgColor="bg-[#9ae600]/10"
          iconColor="text-[#9ae600]"
        />
        <StatusCard
          icon={<Camera className="w-5 h-5" />}
          label="Cameras"
          value="16 devices"
          status="online"
          bgColor="bg-[#fb2c36]/10"
          iconColor="text-[#fb2c36]"
        />
        <StatusCard
          icon={<Lock className="w-5 h-5" />}
          label="Smart Locks"
          value="8 devices"
          status="online"
          bgColor="bg-[#9ae600]/10"
          iconColor="text-[#9ae600]"
        />
      </div>
    </div>
  );
}

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'online' | 'offline';
  bgColor: string;
  iconColor: string;
}

function StatusCard({ icon, label, value, status, bgColor, iconColor }: StatusCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <div className={iconColor}>{icon}</div>
        </div>
        {status === 'online' ? (
          <div className="w-2 h-2 bg-[#9ae600] rounded-full"></div>
        ) : (
          <div className="w-2 h-2 bg-[#71717b] rounded-full"></div>
        )}
      </div>
      <div className="text-xl mb-1">{value}</div>
      <div className="text-xs text-[#9f9fa9]">{label}</div>
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
  trend: string;
}

function MetricCard({ icon, title, value, subtitle, color, bgColor, trend }: MetricCardProps) {
  const trendPositive = trend.startsWith('+');
  const trendNegative = trend.startsWith('-');
  
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
        <div className={color}>{icon}</div>
      </div>
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className={`text-2xl mb-1 font-semibold ${color}`}>{value}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#71717b]">{subtitle}</div>
        {trend !== '0' && (
          <div className={`flex items-center gap-1 text-xs ${
            trendPositive ? 'text-[#9ae600]' : trendNegative ? 'text-[#fb2c36]' : 'text-[#71717b]'
          }`}>
            {trendPositive && <TrendingUp className="w-3 h-3" />}
            {trendNegative && <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DeviceCategories() {
  const categories = [
    { name: 'Lighting', icon: <Lightbulb className="w-5 h-5" />, count: 48, online: 46, color: 'text-[#f0b100]', bgColor: 'bg-[#f0b100]/10' },
    { name: 'TVs', icon: <Tv className="w-5 h-5" />, count: 12, online: 10, color: 'text-[#06b6d4]', bgColor: 'bg-[#06b6d4]/10' },
    { name: 'WiFi Access Points', icon: <Wifi className="w-5 h-5" />, count: 18, online: 18, color: 'text-[#9ae600]', bgColor: 'bg-[#9ae600]/10' },
    { name: 'Cameras', icon: <Camera className="w-5 h-5" />, count: 16, online: 16, color: 'text-[#fb2c36]', bgColor: 'bg-[#fb2c36]/10' },
    { name: 'Smart Locks', icon: <Lock className="w-5 h-5" />, count: 8, online: 7, color: 'text-[#9ae600]', bgColor: 'bg-[#9ae600]/10' },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a]">
        <h3 className="text-lg">Device Categories</h3>
        <p className="text-sm text-[#9f9fa9] mt-1">102 devices total • 97 online</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                <div className={category.color}>{category.icon}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                category.online === category.count 
                  ? 'bg-[#9ae600]/10 text-[#9ae600]' 
                  : 'bg-[#f0b100]/10 text-[#f0b100]'
              }`}>
                {category.online}/{category.count}
              </div>
            </div>
            <div className="text-sm font-medium mb-1 group-hover:text-[#9ae600] transition-colors">{category.name}</div>
            <div className="text-xs text-[#9f9fa9]">{category.online} online • {category.count - category.online} offline</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentAlerts() {
  const alerts = [
    { id: 1, type: 'warning', device: 'Smart Lights - Hallway', message: 'Flickering detected, may need replacement', time: '5 min ago', zone: 'Degen Lounge' },
    { id: 2, type: 'critical', device: 'Smart Lock - Main Door', message: 'Battery low (15%)', time: '12 min ago', zone: 'Entrance' },
    { id: 3, type: 'info', device: 'WiFi AP - Floor 2', message: 'Firmware update available', time: '1 hour ago', zone: 'Flo-Zone' },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
        <div>
          <h3 className="text-lg">Recent Alerts</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Latest device notifications</p>
        </div>
        <button className="text-sm text-[#9ae600] hover:underline">View All</button>
      </div>
      
      <div className="divide-y divide-[#27272a]">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-[#18181b] transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                alert.type === 'critical' ? 'bg-[#fb2c36]/10' :
                alert.type === 'warning' ? 'bg-[#f0b100]/10' :
                'bg-[#06b6d4]/10'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  alert.type === 'critical' ? 'text-[#fb2c36]' :
                  alert.type === 'warning' ? 'text-[#f0b100]' :
                  'text-[#06b6d4]'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{alert.device}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    alert.type === 'critical' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
                    alert.type === 'warning' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
                    'bg-[#06b6d4]/10 text-[#06b6d4]'
                  }`}>
                    {alert.type}
                  </span>
                </div>
                <div className="text-sm text-[#d4d4d8] mb-2">{alert.message}</div>
                <div className="flex items-center gap-3 text-xs text-[#71717b]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {alert.zone}
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded text-xs hover:border-[#71717b] transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickControls() {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a]">
        <h3 className="text-lg">Quick Controls</h3>
        <p className="text-sm text-[#9f9fa9] mt-1">Common device actions</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <QuickControlButton
          icon={<Lightbulb className="w-5 h-5" />}
          label="All Lights Off"
          color="bg-[#f0b100]"
        />
        <QuickControlButton
          icon={<Lock className="w-5 h-5" />}
          label="Lock All Doors"
          color="bg-[#9ae600]"
        />
        <QuickControlButton
          icon={<Wind className="w-5 h-5" />}
          label="Climate Auto"
          color="bg-[#06b6d4]"
        />
        <QuickControlButton
          icon={<Camera className="w-5 h-5" />}
          label="View Cameras"
          color="bg-[#fb2c36]"
        />
      </div>
    </div>
  );
}

function QuickControlButton({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <button className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-all group">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3 text-white`}>
        {icon}
      </div>
      <div className="text-sm text-left group-hover:text-[#9ae600] transition-colors">{label}</div>
    </button>
  );
}

// ============================================
// DEVICES TAB
// ============================================

function DevicesTab({ selectedProperty }: { selectedProperty: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterSelect value={categoryFilter} onChange={setCategoryFilter} options={[
              { value: 'all', label: 'All Categories' },
              { value: 'climate', label: 'Climate Control' },
              { value: 'lighting', label: 'Lighting' },
              { value: 'security', label: 'Security' },
              { value: 'entertainment', label: 'Entertainment' },
              { value: 'network', label: 'Network' },
            ]} />
            
            <FilterSelect value={statusFilter} onChange={setStatusFilter} options={[
              { value: 'all', label: 'All Status' },
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
              { value: 'warning', label: 'Warning' },
            ]} />
            
            <FilterSelect value={zoneFilter} onChange={setZoneFilter} options={[
              { value: 'all', label: 'All Zones' },
              { value: 'degen-lounge', label: 'Degen Lounge' },
              { value: 'flo-zone', label: 'Flo-Zone' },
              { value: 'kitchen', label: 'Kitchen' },
              { value: 'amenities', label: 'Amenities' },
            ]} />
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DeviceCard
          name="AC Unit - Main Hall"
          category="Climate Control"
          zone="Degen Lounge"
          status="online"
          icon={<Wind className="w-5 h-5" />}
          value="24°C"
          statusText="Auto mode"
          lastUpdate="2 min ago"
        />
        <DeviceCard
          name="Smart Lights - Room 301"
          category="Lighting"
          zone="Flo-Zone"
          status="online"
          icon={<Lightbulb className="w-5 h-5" />}
          value="75%"
          statusText="Dimmed"
          lastUpdate="Just now"
        />
        <DeviceCard
          name="WiFi AP - Floor 2"
          category="Network"
          zone="Flo-Zone"
          status="online"
          icon={<Wifi className="w-5 h-5" />}
          value="98 Mbps"
          statusText="24 devices"
          lastUpdate="5 sec ago"
        />
        <DeviceCard
          name="Smart Lock - Main Door"
          category="Security"
          zone="Entrance"
          status="warning"
          icon={<Lock className="w-5 h-5" />}
          value="Locked"
          statusText="Battery 15%"
          lastUpdate="12 min ago"
        />
        <DeviceCard
          name="Temperature Sensor"
          category="Sensors"
          zone="Kitchen"
          status="online"
          icon={<ThermometerSun className="w-5 h-5" />}
          value="26°C"
          statusText="Normal"
          lastUpdate="30 sec ago"
        />
        <DeviceCard
          name="Sound System"
          category="Entertainment"
          zone="Degen Lounge"
          status="offline"
          icon={<Speaker className="w-5 h-5" />}
          value="Off"
          statusText="Disconnected"
          lastUpdate="2 hours ago"
        />
      </div>

      {/* Add Device Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors font-medium">
          <Plus className="w-5 h-5" />
          Add New Device
        </button>
      </div>
    </div>
  );
}

interface DeviceCardProps {
  name: string;
  category: string;
  zone: string;
  status: 'online' | 'offline' | 'warning';
  icon: React.ReactNode;
  value: string;
  statusText: string;
  lastUpdate: string;
}

function DeviceCard({ name, category, zone, status, icon, value, statusText, lastUpdate }: DeviceCardProps) {
  return (
    <div className={`bg-[#09090b] border rounded-lg p-4 hover:border-[#71717b] transition-colors ${
      status === 'online' ? 'border-[#27272a]' :
      status === 'warning' ? 'border-[#f0b100]/50' :
      'border-[#71717b]'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          status === 'online' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
          status === 'warning' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
          'bg-[#71717b]/10 text-[#71717b]'
        }`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'online' ? 'bg-[#9ae600]' :
            status === 'warning' ? 'bg-[#f0b100]' :
            'bg-[#71717b]'
          }`} />
          <button className="p-1 hover:bg-[#27272a] rounded transition-colors">
            <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">{name}</h3>
        <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
          <span>{category}</span>
          <span>•</span>
          <span>{zone}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-semibold mb-1">{value}</div>
        <div className="text-xs text-[#9f9fa9]">{statusText}</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#27272a]">
        <span className="text-xs text-[#71717b]">Updated {lastUpdate}</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Control">
            <Settings className="w-4 h-4 text-[#9f9fa9]" />
          </button>
          {status === 'online' ? (
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Turn Off">
              <PowerOff className="w-4 h-4 text-[#9f9fa9]" />
            </button>
          ) : (
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Turn On">
              <Power className="w-4 h-4 text-[#9f9fa9]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// AUTOMATION TAB
// ============================================

function AutomationTab({ selectedProperty }: { selectedProperty: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg mb-1">Automation Rules</h2>
            <p className="text-sm text-[#9f9fa9]">Automate device behavior based on triggers</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Rule
          </button>
        </div>

        <div className="space-y-3">
          <AutomationRule
            name="Evening Mode"
            trigger="Time: 6:00 PM"
            action="Dim all lights to 50%, Set AC to 24°C"
            status="active"
            lastRun="Today, 6:00 PM"
          />
          <AutomationRule
            name="Motion Detection Alert"
            trigger="Motion detected after 11 PM"
            action="Send notification, Turn on security lights"
            status="active"
            lastRun="Yesterday, 11:42 PM"
          />
          <AutomationRule
            name="Energy Saver"
            trigger="No motion for 30 minutes"
            action="Turn off lights, Set AC to eco mode"
            status="paused"
            lastRun="2 hours ago"
          />
          <AutomationRule
            name="Morning Routine"
            trigger="Time: 7:00 AM"
            action="Turn on lights, Set AC to 22°C, Play music"
            status="active"
            lastRun="Today, 7:00 AM"
          />
        </div>
      </div>

      {/* Scenes */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg mb-1">Scenes</h2>
            <p className="text-sm text-[#9f9fa9]">Pre-configured device states</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded hover:border-[#71717b] transition-colors text-sm">
            <Plus className="w-4 h-4" />
            New Scene
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SceneCard name="Movie Night" description="Dim lights, Close curtains" icon="🎬" />
          <SceneCard name="Party Mode" description="Colorful lights, Music on" icon="🎉" />
          <SceneCard name="Focus Time" description="Bright lights, Quiet" icon="📚" />
          <SceneCard name="Sleep Mode" description="All off, Lock doors" icon="🌙" />
        </div>
      </div>
    </div>
  );
}

interface AutomationRuleProps {
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused';
  lastRun: string;
}

function AutomationRule({ name, trigger, action, status, lastRun }: AutomationRuleProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium">{name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded ${
              status === 'active' ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#71717b]/10 text-[#71717b]'
            }`}>
              {status}
            </span>
          </div>
          <div className="text-xs text-[#9f9fa9] mb-1">
            <span className="text-[#06b6d4]">When:</span> {trigger}
          </div>
          <div className="text-xs text-[#9f9fa9]">
            <span className="text-[#9ae600]">Then:</span> {action}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {status === 'active' ? (
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Pause">
              <Pause className="w-4 h-4 text-[#9f9fa9]" />
            </button>
          ) : (
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Resume">
              <Play className="w-4 h-4 text-[#9f9fa9]" />
            </button>
          )}
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Settings">
            <Settings className="w-4 h-4 text-[#9f9fa9]" />
          </button>
        </div>
      </div>
      <div className="text-xs text-[#71717b] pt-3 border-t border-[#27272a]">
        Last run: {lastRun}
      </div>
    </div>
  );
}

function SceneCard({ name, description, icon }: { name: string; description: string; icon: string }) {
  return (
    <button className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 hover:border-[#9ae600] transition-all group text-left">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-sm font-medium mb-1 group-hover:text-[#9ae600] transition-colors">{name}</div>
      <div className="text-xs text-[#9f9fa9]">{description}</div>
    </button>
  );
}

// ============================================
// ANALYTICS TAB
// ============================================

function AnalyticsTab({ selectedProperty }: { selectedProperty: string }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Power Usage"
          value="342 kWh"
          subtitle="This week"
          trend="-12%"
          trendPositive={true}
        />
        <AnalyticsCard
          title="Avg Temperature"
          value="24.2°C"
          subtitle="Across all zones"
          trend="+1.2°C"
          trendPositive={false}
        />
        <AnalyticsCard
          title="Network Traffic"
          value="1.2 TB"
          subtitle="This month"
          trend="+18%"
          trendPositive={false}
        />
        <AnalyticsCard
          title="Device Uptime"
          value="99.2%"
          subtitle="Last 30 days"
          trend="+0.5%"
          trendPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Power Usage Trend"
          subtitle="Last 7 days"
        />
        <ChartCard
          title="Temperature by Zone"
          subtitle="Real-time"
        />
      </div>

      {/* Device Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Device Performance</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Top devices by usage and efficiency</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Device</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Category</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Uptime</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Power Usage</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <PerformanceRow
                device="AC Unit - Main Hall"
                category="Climate"
                uptime="99.8%"
                powerUsage="45.2 kWh"
                efficiency="High"
              />
              <PerformanceRow
                device="WiFi AP - Floor 2"
                category="Network"
                uptime="100%"
                powerUsage="2.1 kWh"
                efficiency="High"
              />
              <PerformanceRow
                device="Smart Lights - Room 301"
                category="Lighting"
                uptime="98.5%"
                powerUsage="8.3 kWh"
                efficiency="Medium"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, subtitle, trend, trendPositive }: {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendPositive: boolean;
}) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5">
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#71717b]">{subtitle}</div>
        <div className={`flex items-center gap-1 text-xs ${
          trendPositive ? 'text-[#9ae600]' : 'text-[#fb2c36]'
        }`}>
          {trendPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          <p className="text-xs text-[#9f9fa9]">{subtitle}</p>
        </div>
        <button className="text-xs text-[#9ae600] hover:underline">Export</button>
      </div>
      
      {/* Placeholder for chart */}
      <div className="h-48 bg-[#18181b] border border-[#27272a] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-[#71717b] mx-auto mb-2" />
          <div className="text-sm text-[#9f9fa9]">Chart visualization</div>
        </div>
      </div>
    </div>
  );
}

function PerformanceRow({ device, category, uptime, powerUsage, efficiency }: {
  device: string;
  category: string;
  uptime: string;
  powerUsage: string;
  efficiency: 'High' | 'Medium' | 'Low';
}) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="px-4 py-3 text-sm text-white">{device}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{category}</td>
      <td className="px-4 py-3 text-sm text-white">{uptime}</td>
      <td className="px-4 py-3 text-sm text-white">{powerUsage}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
          efficiency === 'High' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
          efficiency === 'Medium' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
          'bg-[#fb2c36]/10 text-[#fb2c36]'
        }`}>
          {efficiency}
        </span>
      </td>
    </tr>
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
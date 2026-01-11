import { Plus, Search, Filter, Edit, Trash2, MapPin, Globe, Users, Calendar, TrendingUp, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Map, BarChart3, Building, Zap, Trophy, ArrowUp, ArrowDown, Minus, Target, Home } from 'lucide-react';
import { useState } from 'react';

interface CityManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function CityManagement({ selectedProperty, onPropertyChange }: CityManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'cities' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'hub' | 'growing' | 'emerging' | 'planned'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'asia' | 'europe' | 'americas' | 'middle-east' | 'oceania'>('all');

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'cities' && <CityList searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} regionFilter={regionFilter} onRegionFilterChange={setRegionFilter} />}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'cities' | 'analytics';
  onViewChange: (view: 'overview' | 'cities' | 'analytics') => void;
}

function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">City Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage cities in the Zo World network</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add City</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2">
        <button
          onClick={() => onViewChange('overview')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'overview'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onViewChange('cities')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'cities'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Cities
        </button>
        <button
          onClick={() => onViewChange('analytics')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'analytics'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>
    </header>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Building className="w-5 h-5" />}
          label="Total Cities"
          value="38"
          subtitle="In network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Users"
          value="4,234"
          subtitle="Across all cities"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Home className="w-5 h-5" />}
          label="Total Nodes"
          value="52"
          subtitle="Network-wide"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Calendar className="w-5 h-5" />}
          label="Active Events"
          value="156"
          subtitle="This month"
          color="text-[#9ae600]"
        />
      </div>

      {/* City Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TierCard
          title="Hub Cities"
          count={8}
          description="3+ nodes"
          color="bg-[#9ae600]/10 border-[#9ae600]/30"
          iconColor="text-[#9ae600]"
        />
        <TierCard
          title="Growing Cities"
          count={12}
          description="2 nodes"
          color="bg-[#06b6d4]/10 border-[#06b6d4]/30"
          iconColor="text-[#06b6d4]"
        />
        <TierCard
          title="Emerging Cities"
          count={15}
          description="1 node"
          color="bg-[#f0b100]/10 border-[#f0b100]/30"
          iconColor="text-[#f0b100]"
        />
        <TierCard
          title="Planned Cities"
          count={3}
          description="Coming soon"
          color="bg-[#71717b]/10 border-[#71717b]/30"
          iconColor="text-[#71717b]"
        />
      </div>

      {/* Regional Distribution */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Regional Distribution</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Cities by geographic region</p>
        </div>
        <div className="p-4 space-y-3">
          <RegionBar
            flag="🌏"
            label="Asia"
            cities={12}
            total={38}
            percentage={32}
            color="bg-[#9ae600]"
          />
          <RegionBar
            flag="🇪🇺"
            label="Europe"
            cities={14}
            total={38}
            percentage={37}
            color="bg-[#06b6d4]"
          />
          <RegionBar
            flag="🌎"
            label="Americas"
            cities={8}
            total={38}
            percentage={21}
            color="bg-[#f0b100]"
          />
          <RegionBar
            flag="🌍"
            label="Middle East"
            cities={3}
            total={38}
            percentage={8}
            color="bg-[#d946ef]"
          />
          <RegionBar
            flag="🇦🇺"
            label="Oceania"
            cities={1}
            total={38}
            percentage={3}
            color="bg-[#fb2c36]"
          />
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top Cities by Activity</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Most active cities this month</p>
        </div>
        <div className="p-4 space-y-3">
          <TopCityRow
            rank={1}
            city="Bangalore"
            country="India"
            flag="🇮🇳"
            nodes={5}
            users={234}
            events={42}
            growth={12}
          />
          <TopCityRow
            rank={2}
            city="Berlin"
            country="Germany"
            flag="🇩🇪"
            nodes={4}
            users={189}
            events={38}
            growth={8}
          />
          <TopCityRow
            rank={3}
            city="San Francisco"
            country="USA"
            flag="🇺🇸"
            nodes={3}
            users={156}
            events={34}
            growth={5}
          />
          <TopCityRow
            rank={4}
            city="London"
            country="UK"
            flag="🇬🇧"
            nodes={3}
            users={145}
            events={29}
            growth={-2}
          />
          <TopCityRow
            rank={5}
            city="Singapore"
            country="Singapore"
            flag="🇸🇬"
            nodes={2}
            users={98}
            events={18}
            growth={15}
          />
        </div>
      </div>

      {/* Community Health & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Community Health */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Community Health</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg Users per City</span>
              <span className="text-lg">111</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Cities with 100+ Users</span>
              <span className="text-lg text-[#9ae600]">18 (47%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Active Event Cities</span>
              <span className="text-lg">32/38 (84%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Monthly Growth Rate</span>
              <span className="text-lg text-[#9ae600]">+7.2%</span>
            </div>
          </div>
        </div>

        {/* Growth Insights */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Growth Insights</h3>
          </div>
          <div className="p-4 space-y-3">
            <InsightItem
              type="success"
              message="Singapore +15% user growth this month"
            />
            <InsightItem
              type="success"
              message="3 new cities added this quarter"
            />
            <InsightItem
              type="warning"
              message="London -2% user decline needs attention"
            />
            <InsightItem
              type="info"
              message="Mumbai ready to become hub city (2→3 nodes)"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Recent Activity</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Latest updates across cities</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          <ActivityRow
            city="Tokyo"
            country="Japan"
            action="New city added to network"
            time="2 hours ago"
            type="success"
          />
          <ActivityRow
            city="Bangalore"
            country="India"
            action="New node: Zo House Koramangala activated"
            time="5 hours ago"
            type="success"
          />
          <ActivityRow
            city="Berlin"
            country="Germany"
            action="Event: Tech Meetup - 45 attendees"
            time="1 day ago"
            type="info"
          />
          <ActivityRow
            city="Dubai"
            country="UAE"
            action="User milestone: 50 active users"
            time="2 days ago"
            type="success"
          />
        </div>
      </div>
    </div>
  );
}

interface CityListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'hub' | 'growing' | 'emerging' | 'planned';
  onStatusFilterChange: (status: 'all' | 'hub' | 'growing' | 'emerging' | 'planned') => void;
  regionFilter: 'all' | 'asia' | 'europe' | 'americas' | 'middle-east' | 'oceania';
  onRegionFilterChange: (region: 'all' | 'asia' | 'europe' | 'americas' | 'middle-east' | 'oceania') => void;
}

function CityList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, regionFilter, onRegionFilterChange }: CityListProps) {
  const cities = [
    {
      id: 'city-bangalore',
      name: 'Bangalore',
      country: 'India',
      flag: '🇮🇳',
      region: 'asia',
      status: 'hub',
      nodes: 5,
      users: 234,
      events: 42,
      growth: 12,
      coordinates: { lat: 12.9716, lng: 77.5946 },
      timezone: 'Asia/Kolkata',
      population: '12M',
      description: 'Tech capital of India with vibrant startup ecosystem',
      topNodes: ['Zo House Indiranagar', 'Zo House Koramangala', 'Zo Cafe MG Road'],
      updated: '2 days ago'
    },
    {
      id: 'city-berlin',
      name: 'Berlin',
      country: 'Germany',
      flag: '🇩🇪',
      region: 'europe',
      status: 'hub',
      nodes: 4,
      users: 189,
      events: 38,
      growth: 8,
      coordinates: { lat: 52.5200, lng: 13.4050 },
      timezone: 'Europe/Berlin',
      population: '3.7M',
      description: 'Creative and cultural hub of Europe',
      topNodes: ['Berlin Culture Hub', 'Kreuzberg Space', 'Mitte Coworking'],
      updated: '5 hours ago'
    },
    {
      id: 'city-sf',
      name: 'San Francisco',
      country: 'USA',
      flag: '🇺🇸',
      region: 'americas',
      status: 'hub',
      nodes: 3,
      users: 156,
      events: 34,
      growth: 5,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      timezone: 'America/Los_Angeles',
      population: '883K',
      description: 'Tech and innovation capital of Silicon Valley',
      topNodes: ['SF Hacker Space', 'Mission District Node', 'SoMa Labs'],
      updated: '1 day ago'
    },
    {
      id: 'city-london',
      name: 'London',
      country: 'UK',
      flag: '🇬🇧',
      region: 'europe',
      status: 'hub',
      nodes: 3,
      users: 145,
      events: 29,
      growth: -2,
      coordinates: { lat: 51.5074, lng: -0.1278 },
      timezone: 'Europe/London',
      population: '9M',
      description: 'Global financial and cultural center',
      topNodes: ['London Coliving', 'Shoreditch Space', 'Camden Hub'],
      updated: '2 days ago'
    },
    {
      id: 'city-singapore',
      name: 'Singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      region: 'asia',
      status: 'growing',
      nodes: 2,
      users: 98,
      events: 18,
      growth: 15,
      coordinates: { lat: 1.3521, lng: 103.8198 },
      timezone: 'Asia/Singapore',
      population: '5.7M',
      description: 'Southeast Asian business and tech hub',
      topNodes: ['Singapore Schelling Point', 'Marina Bay Node'],
      updated: '3 days ago'
    },
    {
      id: 'city-mumbai',
      name: 'Mumbai',
      country: 'India',
      flag: '🇮🇳',
      region: 'asia',
      status: 'growing',
      nodes: 2,
      users: 78,
      events: 15,
      growth: 10,
      coordinates: { lat: 19.0760, lng: 72.8777 },
      timezone: 'Asia/Kolkata',
      population: '20M',
      description: 'Financial capital of India',
      topNodes: ['Mumbai Flo Zone', 'Bandra Coworking'],
      updated: '1 week ago'
    },
    {
      id: 'city-dubai',
      name: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      region: 'middle-east',
      status: 'emerging',
      nodes: 1,
      users: 45,
      events: 8,
      growth: 20,
      coordinates: { lat: 25.2048, lng: 55.2708 },
      timezone: 'Asia/Dubai',
      population: '3.4M',
      description: 'Middle Eastern innovation and business hub',
      topNodes: ['Dubai Innovation Hub'],
      updated: '2 weeks ago'
    },
    {
      id: 'city-tokyo',
      name: 'Tokyo',
      country: 'Japan',
      flag: '🇯🇵',
      region: 'asia',
      status: 'planned',
      nodes: 0,
      users: 23,
      events: 0,
      growth: 0,
      coordinates: { lat: 35.6762, lng: 139.6503 },
      timezone: 'Asia/Tokyo',
      population: '14M',
      description: 'Major tech and cultural center of Japan',
      topNodes: [],
      updated: '1 month ago'
    },
  ];

  const filteredCities = cities.filter(city => {
    const matchesSearch = searchQuery === '' ||
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || city.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || city.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search cities by name or country..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as any)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="hub">Hub Cities</option>
              <option value="growing">Growing</option>
              <option value="emerging">Emerging</option>
              <option value="planned">Planned</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => onRegionFilterChange(e.target.value as any)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Regions</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="americas">Americas</option>
              <option value="middle-east">Middle East</option>
              <option value="oceania">Oceania</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* City Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

interface CityCardProps {
  city: {
    id: string;
    name: string;
    country: string;
    flag: string;
    region: string;
    status: string;
    nodes: number;
    users: number;
    events: number;
    growth: number;
    coordinates: { lat: number; lng: number };
    timezone: string;
    population: string;
    description: string;
    topNodes: string[];
    updated: string;
  };
}

function CityCard({ city }: CityCardProps) {
  const statusColors = {
    hub: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    growing: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30',
    emerging: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    planned: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const statusLabels = {
    hub: 'Hub City',
    growing: 'Growing',
    emerging: 'Emerging',
    planned: 'Planned',
  };

  const getGrowthIcon = () => {
    if (city.growth > 0) return <ArrowUp className="w-3 h-3" />;
    if (city.growth < 0) return <ArrowDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getGrowthColor = () => {
    if (city.growth > 0) return 'text-[#9ae600]';
    if (city.growth < 0) return 'text-[#fb2c36]';
    return 'text-[#71717b]';
  };

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{city.flag}</span>
              <h4 className="text-lg">{city.name}</h4>
            </div>
            <p className="text-xs text-[#71717b]">{city.country}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs border ${statusColors[city.status as keyof typeof statusColors]}`}>
              {statusLabels[city.status as keyof typeof statusLabels]}
            </span>
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-[#9f9fa9]">{city.description}</p>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Nodes</div>
            <div className="text-xl text-[#9ae600]">{city.nodes}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Users</div>
            <div className="text-xl">{city.users}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Events</div>
            <div className="text-xl">{city.events}</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Coordinates</div>
            <div className="text-sm">
              {city.coordinates.lat.toFixed(4)}°, {city.coordinates.lng.toFixed(4)}°
            </div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Population</div>
            <div className="text-sm">{city.population}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Timezone</div>
            <div className="text-sm">{city.timezone}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Monthly Growth</div>
            <div className={`text-sm flex items-center gap-1 ${getGrowthColor()}`}>
              {getGrowthIcon()}
              {Math.abs(city.growth)}%
            </div>
          </div>
        </div>

        {city.topNodes.length > 0 && (
          <div>
            <div className="text-xs text-[#9f9fa9] mb-2">Top Nodes</div>
            <div className="flex flex-wrap gap-1.5">
              {city.topNodes.map((node, idx) => (
                <span key={idx} className="px-2 py-1 bg-[#18181b] rounded text-xs text-[#9f9fa9]">
                  {node}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
          <MapPin className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Growth Trends */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Network Growth</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Cities and users over time</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-end justify-between gap-2">
            <GrowthBar label="Q1" cities={28} users={2800} maxValue={4500} />
            <GrowthBar label="Q2" cities={31} users={3200} maxValue={4500} />
            <GrowthBar label="Q3" cities={35} users={3800} maxValue={4500} />
            <GrowthBar label="Q4" cities={38} users={4234} maxValue={4500} />
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Regional Performance</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Activity by region</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Region</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Cities</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Nodes</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Users</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Events (Month)</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              <RegionRow region="Asia" flag="🌏" cities={12} nodes={18} users={1245} events={78} growth={10} />
              <RegionRow region="Europe" flag="🇪🇺" cities={14} nodes={22} users={1687} events={92} growth={6} />
              <RegionRow region="Americas" flag="🌎" cities={8} nodes={9} users={892} events={45} growth={4} />
              <RegionRow region="Middle East" flag="🌍" cities={3} nodes={3} users={234} events={12} growth={15} />
              <RegionRow region="Oceania" flag="🇦🇺" cities={1} nodes={1} users={176} events={8} growth={3} />
            </tbody>
          </table>
        </div>
      </div>

      {/* City Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fastest Growing */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Fastest Growing Cities</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">By user growth rate</p>
          </div>
          <div className="p-4 space-y-3">
            <GrowthCityRow city="Dubai" country="UAE" growth={20} users={45} />
            <GrowthCityRow city="Singapore" country="Singapore" growth={15} users={98} />
            <GrowthCityRow city="Bangalore" country="India" growth={12} users={234} />
            <GrowthCityRow city="Mumbai" country="India" growth={10} users={78} />
          </div>
        </div>

        {/* Most Active */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Most Active Cities</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">By total events</p>
          </div>
          <div className="p-4 space-y-3">
            <ActiveCityRow city="Bangalore" country="India" events={42} nodes={5} />
            <ActiveCityRow city="Berlin" country="Germany" events={38} nodes={4} />
            <ActiveCityRow city="San Francisco" country="USA" events={34} nodes={3} />
            <ActiveCityRow city="London" country="UK" events={29} nodes={3} />
          </div>
        </div>
      </div>

      {/* User Engagement */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">User Engagement by City</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Average users per node</p>
        </div>
        <div className="p-4 space-y-3">
          <EngagementBar city="Berlin" usersPerNode={47} color="bg-[#9ae600]" />
          <EngagementBar city="Singapore" usersPerNode={49} color="bg-[#9ae600]" />
          <EngagementBar city="San Francisco" usersPerNode={52} color="bg-[#9ae600]" />
          <EngagementBar city="London" usersPerNode={48} color="bg-[#9ae600]" />
          <EngagementBar city="Bangalore" usersPerNode={47} color="bg-[#9ae600]" />
        </div>
      </div>
    </div>
  );
}

// Reusable Components

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  color: string;
}

function MetricCard({ icon, label, value, subtitle, color }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-[#9f9fa9]">{label}</div>
        <div className={`p-2 bg-[#27272a] rounded ${color}`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl mb-2 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

interface TierCardProps {
  title: string;
  count: number;
  description: string;
  color: string;
  iconColor: string;
}

function TierCard({ title, count, description, color, iconColor }: TierCardProps) {
  return (
    <div className={`border rounded-lg p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm">{title}</h4>
        <Building className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className={`text-2xl mb-1 ${iconColor}`}>{count}</div>
      <div className="text-xs text-[#9f9fa9]">{description}</div>
    </div>
  );
}

interface RegionBarProps {
  flag: string;
  label: string;
  cities: number;
  total: number;
  percentage: number;
  color: string;
}

function RegionBar({ flag, label, cities, total, percentage, color }: RegionBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flag}</span>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm text-[#9f9fa9]">{cities} cities ({percentage}%)</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface TopCityRowProps {
  rank: number;
  city: string;
  country: string;
  flag: string;
  nodes: number;
  users: number;
  events: number;
  growth: number;
}

function TopCityRow({ rank, city, country, flag, nodes, users, events, growth }: TopCityRowProps) {
  const medalColors = {
    1: 'text-[#f0b100]',
    2: 'text-[#71717b]',
    3: 'text-[#fb9062]',
  };

  const growthColor = growth > 0 ? 'text-[#9ae600]' : growth < 0 ? 'text-[#fb2c36]' : 'text-[#71717b]';
  const growthIcon = growth > 0 ? <ArrowUp className="w-3 h-3" /> : growth < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />;

  return (
    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded hover:bg-[#27272a] transition-colors">
      <div className={`text-sm w-6 text-center ${rank <= 3 ? medalColors[rank as keyof typeof medalColors] : ''}`}>
        #{rank}
      </div>
      <div className="text-xl">{flag}</div>
      <div className="flex-1">
        <div className="text-sm mb-1">{city}</div>
        <div className="text-xs text-[#9f9fa9]">{country}</div>
      </div>
      <div className="text-right text-xs">
        <div className="text-[#9f9fa9] mb-1">{nodes} nodes • {users} users</div>
        <div className="text-white">{events} events</div>
      </div>
      <div className={`flex items-center gap-1 text-xs ${growthColor}`}>
        {growthIcon}
        {Math.abs(growth)}%
      </div>
    </div>
  );
}

interface InsightItemProps {
  type: 'success' | 'warning' | 'info';
  message: string;
}

function InsightItem({ type, message }: InsightItemProps) {
  const colors = {
    success: 'border-[#9ae600]/30 bg-[#9ae600]/10',
    warning: 'border-[#f0b100]/30 bg-[#f0b100]/10',
    info: 'border-[#06b6d4]/30 bg-[#06b6d4]/10',
  };

  const icons = {
    success: <TrendingUp className="w-4 h-4 text-[#9ae600]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#f0b100]" />,
    info: <Zap className="w-4 h-4 text-[#06b6d4]" />,
  };

  return (
    <div className={`border rounded p-3 ${colors[type]}`}>
      <div className="flex items-start gap-2">
        {icons[type]}
        <div className="flex-1 text-sm">{message}</div>
      </div>
    </div>
  );
}

interface ActivityRowProps {
  city: string;
  country: string;
  action: string;
  time: string;
  type: 'success' | 'info';
}

function ActivityRow({ city, country, action, time, type }: ActivityRowProps) {
  const icons = {
    success: <Trophy className="w-4 h-4 text-[#9ae600]" />,
    info: <Zap className="w-4 h-4 text-[#06b6d4]" />,
  };

  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#27272a] rounded">{icons[type]}</div>
        <div className="flex-1">
          <div className="text-sm mb-1">{city}, {country}</div>
          <div className="text-xs text-[#9f9fa9] mb-1">{action}</div>
          <div className="text-xs text-[#71717b]">{time}</div>
        </div>
      </div>
    </div>
  );
}

interface RegionRowProps {
  region: string;
  flag: string;
  cities: number;
  nodes: number;
  users: number;
  events: number;
  growth: number;
}

function RegionRow({ region, flag, cities, nodes, users, events, growth }: RegionRowProps) {
  const growthColor = growth > 0 ? 'text-[#9ae600]' : 'text-[#71717b]';
  const growthIcon = growth > 0 ? <ArrowUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />;

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flag}</span>
          <span className="text-sm">{region}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{cities}</td>
      <td className="px-4 py-3 text-sm">{nodes}</td>
      <td className="px-4 py-3 text-sm">{users.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm">{events}</td>
      <td className="px-4 py-3">
        <div className={`flex items-center gap-1 text-sm ${growthColor}`}>
          {growthIcon}
          {growth}%
        </div>
      </td>
    </tr>
  );
}

interface GrowthBarProps {
  label: string;
  cities: number;
  users: number;
  maxValue: number;
}

function GrowthBar({ label, cities, users, maxValue }: GrowthBarProps) {
  const height = (users / maxValue) * 100;
  
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full flex items-end justify-center h-48">
        <div 
          className="w-full bg-[#9ae600] rounded-t transition-all hover:bg-[#8bd500]" 
          style={{ height: `${height}%` }}
        />
      </div>
      <div className="text-xs text-center">
        <div className="text-[#9f9fa9] mb-1">{label}</div>
        <div className="text-white">{cities} cities</div>
        <div className="text-[#9f9fa9]">{users} users</div>
      </div>
    </div>
  );
}

interface GrowthCityRowProps {
  city: string;
  country: string;
  growth: number;
  users: number;
}

function GrowthCityRow({ city, country, growth, users }: GrowthCityRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] rounded">
      <div>
        <div className="text-sm mb-1">{city}</div>
        <div className="text-xs text-[#9f9fa9]">{country}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-[#9ae600] flex items-center gap-1">
          <ArrowUp className="w-3 h-3" />
          {growth}%
        </div>
        <div className="text-xs text-[#9f9fa9]">{users} users</div>
      </div>
    </div>
  );
}

interface ActiveCityRowProps {
  city: string;
  country: string;
  events: number;
  nodes: number;
}

function ActiveCityRow({ city, country, events, nodes }: ActiveCityRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] rounded">
      <div>
        <div className="text-sm mb-1">{city}</div>
        <div className="text-xs text-[#9f9fa9]">{country}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-[#9ae600]">{events} events</div>
        <div className="text-xs text-[#9f9fa9]">{nodes} nodes</div>
      </div>
    </div>
  );
}

interface EngagementBarProps {
  city: string;
  usersPerNode: number;
  color: string;
}

function EngagementBar({ city, usersPerNode, color }: EngagementBarProps) {
  const percentage = (usersPerNode / 60) * 100; // Assuming 60 is max for scale
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{city}</span>
        <span className="text-sm text-[#9f9fa9]">{usersPerNode} users/node</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
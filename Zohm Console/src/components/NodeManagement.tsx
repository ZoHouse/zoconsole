import { Plus, Search, Filter, Edit, Trash2, Play, Pause, Archive, MapPin, Globe, Twitter, Mail, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Map, BarChart3, Home, Building, Compass, Waves, Hotel, Check, X as XIcon, ExternalLink, Image as ImageIcon, Zap, Target } from 'lucide-react';
import { useState } from 'react';

interface NodeManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function NodeManagement({ selectedProperty, onPropertyChange }: NodeManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'nodes' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'developing' | 'planning'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'hacker_space' | 'culture_house' | 'schelling_point' | 'flo_zone' | 'staynode'>('all');

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'nodes' && <NodeList searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} />}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'nodes' | 'analytics';
  onViewChange: (view: 'overview' | 'nodes' | 'analytics') => void;
}

function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Node Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage Zo World network nodes and locations</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Node</span>
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
          onClick={() => onViewChange('nodes')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'nodes'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Nodes
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
      {/* Key Metrics - Single Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard
          icon={<Home className="w-4 h-4" />}
          label="Total Nodes"
          value="52"
          subtitle="Across network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Globe className="w-4 h-4" />}
          label="Geographic Reach"
          value="38"
          subtitle="Cities in 15 countries"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Zap className="w-4 h-4" />}
          label="Active Nodes"
          value="42"
          subtitle="80% of network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Building className="w-4 h-4" />}
          label="In Development"
          value="8"
          subtitle="Coming soon"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Target className="w-4 h-4" />}
          label="Planning"
          value="2"
          subtitle="4% of network"
          color="text-[#71717b]"
        />
      </div>

      {/* Node Types */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Network by Type</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Distribution across node categories</p>
        </div>
        <div className="p-4 space-y-3">
          <NodeTypeBar
            icon={<Home className="w-4 h-4" />}
            label="Hacker Space"
            count={18}
            total={52}
            percentage={35}
            color="bg-[#4A90E2]"
          />
          <NodeTypeBar
            icon={<Building className="w-4 h-4" />}
            label="Culture House"
            count={12}
            total={52}
            percentage={23}
            color="bg-[#9B59B6]"
          />
          <NodeTypeBar
            icon={<Compass className="w-4 h-4" />}
            label="Schelling Point"
            count={8}
            total={52}
            percentage={15}
            color="bg-[#2ECC71]"
          />
          <NodeTypeBar
            icon={<Waves className="w-4 h-4" />}
            label="Flo Zone"
            count={7}
            total={52}
            percentage={13}
            color="bg-[#1ABC9C]"
          />
          <NodeTypeBar
            icon={<Hotel className="w-4 h-4" />}
            label="Staynode"
            count={7}
            total={52}
            percentage={13}
            color="bg-[#E67E22]"
          />
        </div>
      </div>

      {/* Top Cities & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Cities */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Top Cities</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Cities with most nodes</p>
          </div>
          <div className="p-4 space-y-3">
            <CityRow city="Bangalore" country="India" nodes={5} types={['hacker_space', 'culture_house', 'staynode']} />
            <CityRow city="Berlin" country="Germany" nodes={4} types={['culture_house', 'flo_zone']} />
            <CityRow city="San Francisco" country="USA" nodes={3} types={['hacker_space', 'schelling_point']} />
            <CityRow city="London" country="UK" nodes={3} types={['culture_house', 'staynode']} />
            <CityRow city="Singapore" country="Singapore" nodes={2} types={['hacker_space', 'staynode']} />
          </div>
        </div>

        {/* Feature Popularity */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Feature Availability</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Most common amenities</p>
          </div>
          <div className="p-4 space-y-3">
            <FeatureBar label="Events Space" count={48} total={52} percentage={92} />
            <FeatureBar label="Coworking" count={42} total={52} percentage={81} />
            <FeatureBar label="Cafe" count={35} total={52} percentage={67} />
            <FeatureBar label="Coliving" count={28} total={52} percentage={54} />
            <FeatureBar label="Workshops" count={24} total={52} percentage={46} />
          </div>
        </div>
      </div>

      {/* Network Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Network Health */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Network Health</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Nodes with Coordinates</span>
              <span className="text-lg text-[#9ae600]">52/52 (100%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Nodes with Website</span>
              <span className="text-lg">48/52 (92%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Nodes with Contact Info</span>
              <span className="text-lg">48/52 (92%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg Completeness Score</span>
              <span className="text-lg text-[#9ae600]">87%</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Data Quality Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            <AlertItem
              type="warning"
              message="4 nodes missing website URL"
              action="Update Info"
            />
            <AlertItem
              type="warning"
              message="4 nodes missing contact email"
              action="Add Contact"
            />
            <AlertItem
              type="info"
              message="3 nodes not updated in 90 days"
              action="Review"
            />
            <AlertItem
              type="success"
              message="All active nodes have coordinates"
              action="View Map"
            />
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Recent Updates</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Latest node changes</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          <UpdateRow
            node="Zo House Koramangala"
            city="Bangalore"
            action="Status changed to Active"
            time="2 hours ago"
            type="success"
          />
          <UpdateRow
            node="Berlin Culture Hub"
            city="Berlin"
            action="Added new features: Gym, Studio"
            time="5 hours ago"
            type="info"
          />
          <UpdateRow
            node="SF Hacker Space"
            city="San Francisco"
            action="Updated contact email"
            time="1 day ago"
            type="info"
          />
          <UpdateRow
            node="London Coliving"
            city="London"
            action="New node added"
            time="2 days ago"
            type="success"
          />
        </div>
      </div>
    </div>
  );
}

interface NodeListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'developing' | 'planning';
  onStatusFilterChange: (status: 'all' | 'active' | 'developing' | 'planning') => void;
  typeFilter: 'all' | 'hacker_space' | 'culture_house' | 'schelling_point' | 'flo_zone' | 'staynode';
  onTypeFilterChange: (type: 'all' | 'hacker_space' | 'culture_house' | 'schelling_point' | 'flo_zone' | 'staynode') => void;
}

function NodeList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, typeFilter, onTypeFilterChange }: NodeListProps) {
  const nodes = [
    {
      id: 'node-bangalore-indiranagar',
      name: 'Zo House Bangalore',
      city: 'Bangalore',
      country: 'India',
      type: 'hacker_space',
      status: 'active',
      description: 'Tech and innovation hub in the heart of Bangalore',
      features: ['coworking', 'coliving', 'events', 'cafe', 'workshops'],
      coordinates: { lat: 12.9716, lng: 77.5946 },
      website: 'https://bangalore.zohouse.com',
      twitter: '@zohouse_blr',
      email: 'bangalore@zohouse.com',
      image: true,
      completeness: 100,
      usersInCity: 234,
      updated: '2 days ago'
    },
    {
      id: 'node-berlin-kreuzberg',
      name: 'Berlin Culture Hub',
      city: 'Berlin',
      country: 'Germany',
      type: 'culture_house',
      status: 'active',
      description: 'Creative space for artists and builders in Kreuzberg',
      features: ['events', 'cafe', 'studio', 'gallery', 'workshops'],
      coordinates: { lat: 52.5200, lng: 13.4050 },
      website: 'https://berlin.zohouse.com',
      twitter: '@zohouse_berlin',
      email: 'berlin@zohouse.com',
      image: true,
      completeness: 95,
      usersInCity: 189,
      updated: '5 hours ago'
    },
    {
      id: 'node-sf-soma',
      name: 'SF Hacker Space',
      city: 'San Francisco',
      country: 'USA',
      type: 'hacker_space',
      status: 'active',
      description: 'Innovation lab in SoMa for tech builders',
      features: ['coworking', 'events', 'workshops', 'maker_space'],
      coordinates: { lat: 37.7749, lng: -122.4194 },
      website: 'https://sf.zohouse.com',
      twitter: '@zohouse_sf',
      email: 'sf@zohouse.com',
      image: true,
      completeness: 90,
      usersInCity: 156,
      updated: '1 day ago'
    },
    {
      id: 'node-singapore-cbd',
      name: 'Singapore Schelling Point',
      city: 'Singapore',
      country: 'Singapore',
      type: 'schelling_point',
      status: 'active',
      description: 'Coordination hub in the central business district',
      features: ['events', 'coworking', 'cafe'],
      coordinates: { lat: 1.3521, lng: 103.8198 },
      website: 'https://singapore.zohouse.com',
      twitter: '@zohouse_sg',
      email: 'singapore@zohouse.com',
      image: true,
      completeness: 85,
      usersInCity: 98,
      updated: '3 days ago'
    },
    {
      id: 'node-london-shoreditch',
      name: 'London Coliving',
      city: 'London',
      country: 'UK',
      type: 'staynode',
      status: 'active',
      description: 'Community living space in vibrant Shoreditch',
      features: ['coliving', 'coworking', 'cafe', 'events'],
      coordinates: { lat: 51.5074, lng: -0.0787 },
      website: 'https://london.zohouse.com',
      twitter: '@zohouse_ldn',
      email: 'london@zohouse.com',
      image: true,
      completeness: 95,
      usersInCity: 145,
      updated: '2 days ago'
    },
    {
      id: 'node-mumbai-bandra',
      name: 'Mumbai Flo Zone',
      city: 'Mumbai',
      country: 'India',
      type: 'flo_zone',
      status: 'developing',
      description: 'Deep work and flow state optimized space',
      features: ['coworking', 'quiet_rooms', 'cafe'],
      coordinates: { lat: 19.0760, lng: 72.8777 },
      website: null,
      twitter: null,
      email: 'mumbai@zohouse.com',
      image: false,
      completeness: 60,
      usersInCity: 78,
      updated: '1 week ago'
    },
    {
      id: 'node-dubai-downtown',
      name: 'Dubai Innovation Hub',
      city: 'Dubai',
      country: 'UAE',
      type: 'hacker_space',
      status: 'developing',
      description: 'Tech and startup space in downtown Dubai',
      features: ['coworking', 'events', 'workshops'],
      coordinates: { lat: 25.2048, lng: 55.2708 },
      website: null,
      twitter: '@zohouse_dubai',
      email: null,
      image: false,
      completeness: 55,
      usersInCity: 45,
      updated: '2 weeks ago'
    },
    {
      id: 'node-tokyo-shibuya',
      name: 'Tokyo Culture House',
      city: 'Tokyo',
      country: 'Japan',
      type: 'culture_house',
      status: 'planning',
      description: 'Creative hub in the heart of Shibuya',
      features: ['events', 'cafe'],
      coordinates: { lat: 35.6762, lng: 139.6503 },
      website: null,
      twitter: null,
      email: null,
      image: false,
      completeness: 45,
      usersInCity: 23,
      updated: '1 month ago'
    },
  ];

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = searchQuery === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
    const matchesType = typeFilter === 'all' || node.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
              placeholder="Search nodes by name, city, or description..."
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
              <option value="active">Active</option>
              <option value="developing">Developing</option>
              <option value="planning">Planning</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value as any)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="hacker_space">Hacker Space</option>
              <option value="culture_house">Culture House</option>
              <option value="schelling_point">Schelling Point</option>
              <option value="flo_zone">Flo Zone</option>
              <option value="staynode">Staynode</option>
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

      {/* Node Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredNodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

interface NodeCardProps {
  node: {
    id: string;
    name: string;
    city: string;
    country: string;
    type: string;
    status: string;
    description: string;
    features: string[];
    coordinates: { lat: number; lng: number };
    website: string | null;
    twitter: string | null;
    email: string | null;
    image: boolean;
    completeness: number;
    usersInCity: number;
    updated: string;
  };
}

function NodeCard({ node }: NodeCardProps) {
  const statusColors = {
    active: 'bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/30',
    developing: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    planning: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const typeColors = {
    hacker_space: 'bg-[#4A90E2]/10 text-[#4A90E2]',
    culture_house: 'bg-[#9B59B6]/10 text-[#9B59B6]',
    schelling_point: 'bg-[#2ECC71]/10 text-[#2ECC71]',
    flo_zone: 'bg-[#1ABC9C]/10 text-[#1ABC9C]',
    staynode: 'bg-[#E67E22]/10 text-[#E67E22]',
  };

  const typeLabels = {
    hacker_space: 'Hacker Space',
    culture_house: 'Culture House',
    schelling_point: 'Schelling Point',
    flo_zone: 'Flo Zone',
    staynode: 'Staynode',
  };

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h4 className="text-lg mb-1">{node.name}</h4>
            <p className="text-xs text-[#71717b] flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {node.city}, {node.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs border ${statusColors[node.status as keyof typeof statusColors]}`}>
              {node.status}
            </span>
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-[#9f9fa9] mb-3">{node.description}</p>
        
        {/* Type & Completeness */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs ${typeColors[node.type as keyof typeof typeColors]}`}>
            {typeLabels[node.type as keyof typeof typeLabels]}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#9f9fa9]">
            <div className="w-16 h-1.5 bg-[#27272a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9ae600] rounded-full" 
                style={{ width: `${node.completeness}%` }}
              />
            </div>
            <span>{node.completeness}%</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="text-xs text-[#9f9fa9] mb-2">Features ({node.features.length})</div>
        <div className="flex flex-wrap gap-1.5">
          {node.features.map((feature) => (
            <span key={feature} className="px-2 py-1 bg-[#18181b] rounded text-xs text-[#9f9fa9]">
              {feature.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Links & Stats */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Coordinates</div>
            <div className="text-sm">
              {node.coordinates.lat.toFixed(4)}°, {node.coordinates.lng.toFixed(4)}°
            </div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Users in City</div>
            <div className="text-sm">{node.usersInCity}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {node.website ? (
            <span className="flex items-center gap-1 text-[#9ae600]">
              <Globe className="w-3 h-3" />
              Website
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#71717b]">
              <Globe className="w-3 h-3" />
              No website
            </span>
          )}
          {node.twitter ? (
            <span className="flex items-center gap-1 text-[#9ae600]">
              <Twitter className="w-3 h-3" />
              Twitter
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#71717b]">
              <Twitter className="w-3 h-3" />
              No twitter
            </span>
          )}
          {node.email ? (
            <span className="flex items-center gap-1 text-[#9ae600]">
              <Mail className="w-3 h-3" />
              Email
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#71717b]">
              <Mail className="w-3 h-3" />
              No email
            </span>
          )}
        </div>
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
      {/* Geographic Distribution */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Geographic Distribution</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Nodes by country and region</p>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#27272a]">
                <tr>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Country</th>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Total Nodes</th>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Active</th>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Cities</th>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Top City</th>
                </tr>
              </thead>
              <tbody>
                <CountryRow country="India" flag="🇮🇳" total={12} active={10} cities={8} topCity="Bangalore (5)" />
                <CountryRow country="Germany" flag="🇩🇪" total={8} active={7} cities={5} topCity="Berlin (4)" />
                <CountryRow country="USA" flag="🇺🇸" total={8} active={6} cities={6} topCity="San Francisco (3)" />
                <CountryRow country="UK" flag="🇬🇧" total={5} active={4} cities={4} topCity="London (3)" />
                <CountryRow country="Singapore" flag="🇸🇬" total={2} active={2} cities={1} topCity="Singapore (2)" />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Data Completeness</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Nodes ranked by completeness score</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Node</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Location</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3">Coords</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3">Website</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3">Contact</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3">Image</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              <CompletenessRow 
                node="Zo House Bangalore" 
                location="Bangalore, India" 
                coords={true} 
                website={true} 
                contact={true} 
                image={true} 
                score={100} 
              />
              <CompletenessRow 
                node="Berlin Culture Hub" 
                location="Berlin, Germany" 
                coords={true} 
                website={true} 
                contact={true} 
                image={true} 
                score={95} 
              />
              <CompletenessRow 
                node="SF Hacker Space" 
                location="San Francisco, USA" 
                coords={true} 
                website={true} 
                contact={true} 
                image={true} 
                score={90} 
              />
              <CompletenessRow 
                node="Mumbai Flo Zone" 
                location="Mumbai, India" 
                coords={true} 
                website={false} 
                contact={true} 
                image={false} 
                score={60} 
              />
              <CompletenessRow 
                node="Dubai Innovation Hub" 
                location="Dubai, UAE" 
                coords={true} 
                website={false} 
                contact={false} 
                image={false} 
                score={55} 
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Network Growth */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Network Growth Timeline</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Nodes added over time</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-end justify-between gap-2">
            <GrowthBar label="Q1 2024" count={8} maxCount={15} />
            <GrowthBar label="Q2 2024" count={12} maxCount={15} />
            <GrowthBar label="Q3 2024" count={15} maxCount={15} />
            <GrowthBar label="Q4 2024" count={10} maxCount={15} />
            <GrowthBar label="Q1 2025" count={7} maxCount={15} />
          </div>
        </div>
      </div>

      {/* Feature Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hub Cities */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Hub Cities</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Cities with multiple nodes</p>
          </div>
          <div className="p-4 space-y-3">
            <HubCityRow city="Bangalore" nodes={5} types="3 types" users={234} />
            <HubCityRow city="Berlin" nodes={4} types="2 types" users={189} />
            <HubCityRow city="San Francisco" nodes={3} types="2 types" users={156} />
            <HubCityRow city="London" nodes={3} types="2 types" users={145} />
          </div>
        </div>

        {/* Development Pipeline */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Development Pipeline</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Nodes by status</p>
          </div>
          <div className="p-4 space-y-3">
            <PipelineRow status="Planning" count={2} nodes={['Tokyo Culture House', 'Paris Schelling Point']} />
            <PipelineRow status="Developing" count={8} nodes={['Mumbai Flo Zone', 'Dubai Innovation Hub', '+6 more']} />
            <PipelineRow status="Active" count={42} nodes={['52 active nodes across network']} />
          </div>
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

interface StatusCardProps {
  title: string;
  count: number;
  percentage: number;
  color: string;
  iconColor: string;
}

function StatusCard({ title, count, percentage, color, iconColor }: StatusCardProps) {
  return (
    <div className={`border rounded-lg p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm">{title}</h4>
        <Home className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className={`text-2xl mb-1 ${iconColor}`}>{count}</div>
      <div className="text-xs text-[#9f9fa9]">{percentage}% of network</div>
    </div>
  );
}

interface NodeTypeBarProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  total: number;
  percentage: number;
  color: string;
}

function NodeTypeBar({ icon, label, count, total, percentage, color }: NodeTypeBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded ${color.replace('bg-', 'bg-')}/20`}>
            {icon}
          </div>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm text-[#9f9fa9]">{count} nodes ({percentage}%)</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface CityRowProps {
  city: string;
  country: string;
  nodes: number;
  types: string[];
}

function CityRow({ city, country, nodes, types }: CityRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] rounded hover:bg-[#27272a] transition-colors">
      <div>
        <div className="text-sm mb-1">{city}</div>
        <div className="text-xs text-[#9f9fa9]">{country}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-[#9ae600]">{nodes} nodes</div>
        <div className="text-xs text-[#9f9fa9]">{types.length} types</div>
      </div>
    </div>
  );
}

interface FeatureBarProps {
  label: string;
  count: number;
  total: number;
  percentage: number;
}

function FeatureBar({ label, count, total, percentage }: FeatureBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-[#9f9fa9]">{count}/{total} nodes</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className="h-2 rounded-full bg-[#9ae600]" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface AlertItemProps {
  type: 'success' | 'warning' | 'info';
  message: string;
  action: string;
}

function AlertItem({ type, message, action }: AlertItemProps) {
  const colors = {
    success: 'border-[#9ae600]/30 bg-[#9ae600]/10',
    warning: 'border-[#f0b100]/30 bg-[#f0b100]/10',
    info: 'border-[#06b6d4]/30 bg-[#06b6d4]/10',
  };

  return (
    <div className={`border rounded p-3 ${colors[type]}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-sm">{message}</div>
        <button className="text-xs px-3 py-1 bg-black/30 rounded hover:bg-black/50 transition-colors whitespace-nowrap">
          {action}
        </button>
      </div>
    </div>
  );
}

interface UpdateRowProps {
  node: string;
  city: string;
  action: string;
  time: string;
  type: 'success' | 'info';
}

function UpdateRow({ node, city, action, time, type }: UpdateRowProps) {
  const icons = {
    success: <Check className="w-4 h-4 text-[#9ae600]" />,
    info: <Edit className="w-4 h-4 text-[#06b6d4]" />,
  };

  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#27272a] rounded">{icons[type]}</div>
        <div className="flex-1">
          <div className="text-sm mb-1">{node} • <span className="text-[#9f9fa9]">{city}</span></div>
          <div className="text-xs text-[#9f9fa9] mb-1">{action}</div>
          <div className="text-xs text-[#71717b]">{time}</div>
        </div>
      </div>
    </div>
  );
}

interface CountryRowProps {
  country: string;
  flag: string;
  total: number;
  active: number;
  cities: number;
  topCity: string;
}

function CountryRow({ country, flag, total, active, cities, topCity }: CountryRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flag}</span>
          <span className="text-sm">{country}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{total}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{active}</td>
      <td className="px-4 py-3 text-sm">{cities}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{topCity}</td>
    </tr>
  );
}

interface CompletenessRowProps {
  node: string;
  location: string;
  coords: boolean;
  website: boolean;
  contact: boolean;
  image: boolean;
  score: number;
}

function CompletenessRow({ node, location, coords, website, contact, image, score }: CompletenessRowProps) {
  const CheckMark = ({ value }: { value: boolean }) => (
    <div className="flex justify-center">
      {value ? (
        <Check className="w-4 h-4 text-[#9ae600]" />
      ) : (
        <XIcon className="w-4 h-4 text-[#71717b]" />
      )}
    </div>
  );

  const scoreColor = score >= 90 ? 'text-[#9ae600]' : score >= 70 ? 'text-[#f0b100]' : 'text-[#fb2c36]';

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{node}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{location}</td>
      <td className="px-4 py-3"><CheckMark value={coords} /></td>
      <td className="px-4 py-3"><CheckMark value={website} /></td>
      <td className="px-4 py-3"><CheckMark value={contact} /></td>
      <td className="px-4 py-3"><CheckMark value={image} /></td>
      <td className="px-4 py-3">
        <span className={`text-sm ${scoreColor}`}>{score}%</span>
      </td>
    </tr>
  );
}

interface GrowthBarProps {
  label: string;
  count: number;
  maxCount: number;
}

function GrowthBar({ label, count, maxCount }: GrowthBarProps) {
  const height = (count / maxCount) * 100;
  
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
        <div className="text-white">{count}</div>
      </div>
    </div>
  );
}

interface HubCityRowProps {
  city: string;
  nodes: number;
  types: string;
  users: number;
}

function HubCityRow({ city, nodes, types, users }: HubCityRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] rounded">
      <div>
        <div className="text-sm mb-1">{city}</div>
        <div className="text-xs text-[#9f9fa9]">{types}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-[#9ae600]">{nodes} nodes</div>
        <div className="text-xs text-[#9f9fa9]">{users} users</div>
      </div>
    </div>
  );
}

interface PipelineRowProps {
  status: string;
  count: number;
  nodes: string[];
}

function PipelineRow({ status, count, nodes }: PipelineRowProps) {
  const colors = {
    'Planning': 'text-[#71717b]',
    'Developing': 'text-[#f0b100]',
    'Active': 'text-[#9ae600]',
  };

  return (
    <div className="p-3 bg-[#18181b] rounded">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{status}</span>
        <span className={`text-sm ${colors[status as keyof typeof colors]}`}>{count} nodes</span>
      </div>
      <div className="text-xs text-[#9f9fa9]">
        {nodes.join(', ')}
      </div>
    </div>
  );
}
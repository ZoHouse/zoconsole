import { Plus, Search, Filter, Edit, Trash2, MapPin, Globe, Users, Calendar, TrendingUp, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Map, BarChart3, Building, Zap, Trophy, ArrowUp, ArrowDown, Minus, Target, Home, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCities, useUserCount, useUserCountsByCity, CityData } from '../hooks/useSupabaseData';

// Country to flag emoji mapping
const countryFlags: Record<string, string> = {
  'India': '🇮🇳',
  'Germany': '🇩🇪',
  'USA': '🇺🇸',
  'UK': '🇬🇧',
  'Singapore': '🇸🇬',
  'Japan': '🇯🇵',
  'UAE': '🇦🇪',
  'France': '🇫🇷',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'Portugal': '🇵🇹',
  'Thailand': '🇹🇭',
  'Indonesia': '🇮🇩',
  'Vietnam': '🇻🇳',
  'Australia': '🇦🇺',
  'Canada': '🇨🇦',
  'Brazil': '🇧🇷',
  'Mexico': '🇲🇽',
  'Switzerland': '🇨🇭',
  'Austria': '🇦🇹',
  'Belgium': '🇧🇪',
  'Poland': '🇵🇱',
  'Czech Republic': '🇨🇿',
  'South Korea': '🇰🇷',
  'China': '🇨🇳',
  'Malaysia': '🇲🇾',
  'Philippines': '🇵🇭',
  'New Zealand': '🇳🇿',
  'Argentina': '🇦🇷',
  'Colombia': '🇨🇴',
  'Chile': '🇨🇱',
  'Saudi Arabia': '🇸🇦',
  'Qatar': '🇶🇦',
  'Israel': '🇮🇱',
  'Turkey': '🇹🇷',
};

const getCountryFlag = (country: string): string => {
  return countryFlags[country] || '🌍';
};

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
  const { data: cityStats, isLoading, error } = useCities();
  const { data: userCount } = useUserCount();
  const { data: userCountsByCity } = useUserCountsByCity();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <p className="text-red-400">Failed to load city data</p>
      </div>
    );
  }

  const regionData = cityStats?.byRegion || {};
  const topCities = cityStats?.cities.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Building className="w-5 h-5" />}
          label="Total Cities"
          value={String(cityStats?.totalCities || 0)}
          subtitle="In network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Users"
          value={String(userCount || 0)}
          subtitle="Across all cities"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Home className="w-5 h-5" />}
          label="Total Nodes"
          value={String(cityStats?.totalNodes || 0)}
          subtitle="Network-wide"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Calendar className="w-5 h-5" />}
          label="Node Types"
          value={String([...new Set(cityStats?.cities.flatMap(c => c.nodeTypes) || [])].length)}
          subtitle="Different types"
          color="text-[#9ae600]"
        />
      </div>

      {/* City Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TierCard
          title="Hub Cities"
          count={cityStats?.hubCities || 0}
          description="3+ nodes"
          color="bg-[#9ae600]/10 border-[#9ae600]/30"
          iconColor="text-[#9ae600]"
        />
        <TierCard
          title="Growing Cities"
          count={cityStats?.growingCities || 0}
          description="2 nodes"
          color="bg-[#06b6d4]/10 border-[#06b6d4]/30"
          iconColor="text-[#06b6d4]"
        />
        <TierCard
          title="Emerging Cities"
          count={cityStats?.emergingCities || 0}
          description="1 node"
          color="bg-[#f0b100]/10 border-[#f0b100]/30"
          iconColor="text-[#f0b100]"
        />
        <TierCard
          title="Countries"
          count={Object.keys(cityStats?.byCountry || {}).length}
          description="Worldwide"
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
          {[
            { key: 'asia', flag: '🌏', label: 'Asia', color: 'bg-[#9ae600]' },
            { key: 'europe', flag: '🇪🇺', label: 'Europe', color: 'bg-[#06b6d4]' },
            { key: 'americas', flag: '🌎', label: 'Americas', color: 'bg-[#f0b100]' },
            { key: 'middle-east', flag: '🌍', label: 'Middle East', color: 'bg-[#d946ef]' },
            { key: 'oceania', flag: '🇦🇺', label: 'Oceania', color: 'bg-[#fb2c36]' },
          ].map((region) => {
            const regionCities = regionData[region.key] || [];
            const cityCount = regionCities.length;
            const percentage = cityStats?.totalCities ? Math.round((cityCount / cityStats.totalCities) * 100) : 0;
            return (
              <RegionBar
                key={region.key}
                flag={region.flag}
                label={region.label}
                cities={cityCount}
                total={cityStats?.totalCities || 0}
                percentage={percentage}
                color={region.color}
              />
            );
          })}
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top Cities by Nodes</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Cities with most infrastructure</p>
        </div>
        <div className="p-4 space-y-3">
          {topCities.length === 0 ? (
            <p className="text-sm text-[#9f9fa9]">No cities found</p>
          ) : (
            topCities.map((city, index) => (
              <TopCityRow
                key={`${city.city}-${city.country}`}
                rank={index + 1}
                city={city.city}
                country={city.country}
                flag={getCountryFlag(city.country)}
                nodes={city.nodeCount}
                users={userCountsByCity?.[city.city] || 0}
                events={city.nodeTypes.length}
                growth={0}
              />
            ))
          )}
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
            {(() => {
              const totalCities = cityStats?.totalCities || 0;
              const totalUsers = userCount || 0;
              const avgUsersPerCity = totalCities > 0 ? Math.round(totalUsers / totalCities) : 0;

              // Count cities with 100+ users
              const citiesWithManyUsers = Object.values(userCountsByCity || {}).filter(count => count >= 100).length;
              const citiesWithManyUsersPercent = totalCities > 0 ? Math.round((citiesWithManyUsers / totalCities) * 100) : 0;

              // Cities with nodes (active cities)
              const citiesWithNodes = cityStats?.cities.filter(c => c.nodeCount > 0).length || 0;
              const activeCitiesPercent = totalCities > 0 ? Math.round((citiesWithNodes / totalCities) * 100) : 0;

              return (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9f9fa9]">Avg Users per City</span>
                    <span className="text-lg">{avgUsersPerCity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9f9fa9]">Cities with 100+ Users</span>
                    <span className="text-lg text-[#9ae600]">{citiesWithManyUsers} ({citiesWithManyUsersPercent}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9f9fa9]">Cities with Nodes</span>
                    <span className="text-lg">{citiesWithNodes}/{totalCities} ({activeCitiesPercent}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#9f9fa9]">Hub Cities</span>
                    <span className="text-lg text-[#9ae600]">{cityStats?.hubCities || 0}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Growth Insights */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Growth Insights</h3>
          </div>
          <div className="p-4 space-y-3">
            {(() => {
              const insights: { type: 'success' | 'warning' | 'info'; message: string }[] = [];
              const cities = cityStats?.cities || [];
              const totalCities = cityStats?.totalCities || 0;
              const totalNodes = cityStats?.totalNodes || 0;
              const hubCount = cityStats?.hubCities || 0;
              const countriesCount = Object.keys(cityStats?.byCountry || {}).length;

              // Network overview
              if (totalCities > 0) {
                insights.push({
                  type: 'success',
                  message: `Network has ${totalCities} cities with ${totalNodes} nodes`
                });
              }

              // Countries coverage
              if (countriesCount > 0) {
                insights.push({
                  type: 'info',
                  message: `Present in ${countriesCount} ${countriesCount === 1 ? 'country' : 'countries'} worldwide`
                });
              }

              // Hub cities
              if (hubCount > 0) {
                insights.push({
                  type: 'success',
                  message: `${hubCount} hub ${hubCount === 1 ? 'city' : 'cities'} with 3+ nodes`
                });
              }

              // Find cities about to become hub cities (2 nodes)
              const growingCities = cities.filter(c => c.nodeCount === 2);
              if (growingCities.length > 0) {
                insights.push({
                  type: 'info',
                  message: `${growingCities[0].city} ready to become hub (2→3 nodes)`
                });
              }

              // Find top city by nodes
              if (cities.length > 0) {
                const topByNodes = [...cities].sort((a, b) => b.nodeCount - a.nodeCount)[0];
                if (topByNodes.nodeCount > 0) {
                  insights.push({
                    type: 'success',
                    message: `${topByNodes.city} leads with ${topByNodes.nodeCount} nodes`
                  });
                }
              }

              // Find top city by users
              const cityUserCounts = Object.entries(userCountsByCity || {});
              if (cityUserCounts.length > 0) {
                const sorted = cityUserCounts.sort((a, b) => b[1] - a[1]);
                if (sorted[0][1] > 0) {
                  insights.push({
                    type: 'success',
                    message: `${sorted[0][0]} has most users: ${sorted[0][1]}`
                  });
                }
              }

              // Emerging cities
              const emergingCities = cities.filter(c => c.nodeCount === 1);
              if (emergingCities.length > 0) {
                insights.push({
                  type: 'info',
                  message: `${emergingCities.length} emerging ${emergingCities.length === 1 ? 'city' : 'cities'} with 1 node`
                });
              }

              return insights.length > 0 ? (
                insights.slice(0, 4).map((insight, idx) => (
                  <InsightItem key={idx} type={insight.type} message={insight.message} />
                ))
              ) : (
                <p className="text-sm text-[#9f9fa9]">Add cities to see insights</p>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Recent Activity</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Latest node updates across cities</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          {(() => {
            // Get all nodes from all cities with their city info
            const allNodes = (cityStats?.cities || []).flatMap(city =>
              city.nodes.map((node: any) => ({
                ...node,
                cityName: city.city,
                countryName: city.country,
              }))
            );

            // Sort by updated_at descending
            const recentNodes = allNodes
              .filter((n: any) => n.updated_at)
              .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .slice(0, 4);

            // Calculate time ago
            const getTimeAgo = (dateStr: string) => {
              const date = new Date(dateStr);
              const now = new Date();
              const diffMs = now.getTime() - date.getTime();
              const diffMins = Math.floor(diffMs / (1000 * 60));
              if (diffMins < 60) return `${diffMins} mins ago`;
              const diffHours = Math.floor(diffMins / 60);
              if (diffHours < 24) return `${diffHours} hours ago`;
              const diffDays = Math.floor(diffHours / 24);
              return `${diffDays} days ago`;
            };

            return recentNodes.length > 0 ? (
              recentNodes.map((node: any, idx: number) => (
                <ActivityRow
                  key={node.id || idx}
                  city={node.cityName}
                  country={node.countryName}
                  action={`Node: ${node.name || 'Unknown'} ${node.status === 'active' ? 'active' : 'updated'}`}
                  time={getTimeAgo(node.updated_at)}
                  type={node.status === 'active' ? 'success' : 'info'}
                />
              ))
            ) : (
              <div className="p-4 text-center text-[#9f9fa9]">No recent activity</div>
            );
          })()}
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
  const { data: cityStats, isLoading } = useCities();
  const { data: userCountsByCity } = useUserCountsByCity();

  // Map countries to regions for filtering
  const countryToRegion: Record<string, string> = {
    'India': 'asia', 'Japan': 'asia', 'Singapore': 'asia', 'Thailand': 'asia',
    'Indonesia': 'asia', 'Vietnam': 'asia', 'China': 'asia', 'South Korea': 'asia',
    'Malaysia': 'asia', 'Philippines': 'asia',
    'Germany': 'europe', 'UK': 'europe', 'France': 'europe', 'Spain': 'europe',
    'Italy': 'europe', 'Netherlands': 'europe', 'Portugal': 'europe',
    'Switzerland': 'europe', 'Austria': 'europe', 'Belgium': 'europe',
    'USA': 'americas', 'Canada': 'americas', 'Mexico': 'americas', 'Brazil': 'americas',
    'UAE': 'middle-east', 'Saudi Arabia': 'middle-east', 'Qatar': 'middle-east',
    'Australia': 'oceania', 'New Zealand': 'oceania',
  };

  // Transform CityData to the format expected by CityCard
  const cities = (cityStats?.cities || []).map((cityData) => ({
    id: `city-${cityData.city}-${cityData.country}`.toLowerCase().replace(/\s+/g, '-'),
    name: cityData.city,
    country: cityData.country,
    flag: getCountryFlag(cityData.country),
    region: countryToRegion[cityData.country] || 'other',
    status: cityData.status,
    nodes: cityData.nodeCount,
    users: userCountsByCity?.[cityData.city] || 0,
    events: cityData.nodeTypes.length,
    growth: 0, // Would need historical data
    coordinates: {
      lat: cityData.nodes[0]?.latitude || 0,
      lng: cityData.nodes[0]?.longitude || 0,
    },
    timezone: '',
    population: '',
    description: `${cityData.nodeCount} node${cityData.nodeCount !== 1 ? 's' : ''} in ${cityData.city}`,
    topNodes: cityData.nodes.slice(0, 3).map((n: any) => n.name),
    updated: 'Recently',
  }));

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

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
        </div>
      ) : filteredCities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#9f9fa9]">No cities found matching your criteria</p>
        </div>
      ) : (
        /* City Cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}
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
  const { data: cityStats, isLoading } = useCities();
  const { data: userCount } = useUserCount();
  const { data: userCountsByCity } = useUserCountsByCity();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
      </div>
    );
  }

  // Calculate regional stats
  const regionStats = [
    { key: 'asia', region: 'Asia', flag: '🌏' },
    { key: 'europe', region: 'Europe', flag: '🇪🇺' },
    { key: 'americas', region: 'Americas', flag: '🌎' },
    { key: 'middle-east', region: 'Middle East', flag: '🌍' },
    { key: 'oceania', region: 'Oceania', flag: '🇦🇺' },
  ].map(r => {
    const regionCities = cityStats?.byRegion?.[r.key] || [];
    const citiesCount = regionCities.length;
    const nodesCount = regionCities.reduce((sum, c) => sum + c.nodeCount, 0);
    const usersCount = regionCities.reduce((sum, c) => sum + (userCountsByCity?.[c.city] || 0), 0);
    return { ...r, cities: citiesCount, nodes: nodesCount, users: usersCount, events: nodesCount * 2, growth: 0 };
  });

  // Top cities by users
  const topCitiesByUsers = (cityStats?.cities || [])
    .map(c => ({ ...c, users: userCountsByCity?.[c.city] || 0 }))
    .sort((a, b) => b.users - a.users)
    .slice(0, 4);

  // Top cities by nodes
  const topCitiesByNodes = (cityStats?.cities || [])
    .sort((a, b) => b.nodeCount - a.nodeCount)
    .slice(0, 4);

  // Cities with engagement data (users per node)
  const engagementData = (cityStats?.cities || [])
    .filter(c => c.nodeCount > 0)
    .map(c => ({
      city: c.city,
      usersPerNode: Math.round((userCountsByCity?.[c.city] || 0) / c.nodeCount),
    }))
    .sort((a, b) => b.usersPerNode - a.usersPerNode)
    .slice(0, 5);

  // Current totals for the "current quarter" bar
  const totalCities = cityStats?.totalCities || 0;
  const totalUsers = userCount || 0;

  return (
    <div className="space-y-6">
      {/* Growth Trends */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Network Overview</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Current network statistics</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-end justify-between gap-2">
            <GrowthBar label="Current" cities={totalCities} users={totalUsers} maxValue={Math.max(totalUsers * 1.2, 100)} />
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
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Node Types</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">% of Network</th>
              </tr>
            </thead>
            <tbody>
              {regionStats.filter(r => r.cities > 0).map(r => (
                <RegionRow
                  key={r.key}
                  region={r.region}
                  flag={r.flag}
                  cities={r.cities}
                  nodes={r.nodes}
                  users={r.users}
                  events={r.nodes}
                  growth={totalCities > 0 ? Math.round((r.cities / totalCities) * 100) : 0}
                />
              ))}
              {regionStats.every(r => r.cities === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#9f9fa9]">No regional data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Cities by Users */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Top Cities by Users</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Most users in each city</p>
          </div>
          <div className="p-4 space-y-3">
            {topCitiesByUsers.length > 0 ? (
              topCitiesByUsers.map((city, idx) => (
                <GrowthCityRow key={idx} city={city.city} country={city.country} growth={0} users={city.users} />
              ))
            ) : (
              <p className="text-sm text-[#9f9fa9]">No data available</p>
            )}
          </div>
        </div>

        {/* Most Nodes */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Top Cities by Nodes</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Most infrastructure</p>
          </div>
          <div className="p-4 space-y-3">
            {topCitiesByNodes.length > 0 ? (
              topCitiesByNodes.map((city, idx) => (
                <ActiveCityRow key={idx} city={city.city} country={city.country} events={city.nodeTypes.length} nodes={city.nodeCount} />
              ))
            ) : (
              <p className="text-sm text-[#9f9fa9]">No data available</p>
            )}
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
          {engagementData.length > 0 ? (
            engagementData.map((data, idx) => (
              <EngagementBar key={idx} city={data.city} usersPerNode={data.usersPerNode} color="bg-[#9ae600]" />
            ))
          ) : (
            <p className="text-sm text-[#9f9fa9]">No engagement data available</p>
          )}
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
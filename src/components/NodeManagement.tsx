import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Play, Pause, Archive, MapPin, Globe, Twitter, Mail, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Map, BarChart3, Home, Building, Compass, Waves, Hotel, Check, X as XIcon, ExternalLink, Image as ImageIcon, Zap, Target, Loader2 } from 'lucide-react';
import { useNodes, useNodeStats, nodeTypeInfo, useCreateNode, useUpdateNode, useDeleteNode, useUserCountsByCity, NodeInput } from '../hooks/useSupabaseData';

interface NodeManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

// Node types from database enum
const NODE_TYPES = [
  'schelling_point', 'degen_lounge', 'zo_studio', 'flo_zone', 'bored_room',
  'liquidity_pool', 'multiverse', 'battlefield', 'bio_hack', 'cafe',
  '420', 'showcase', 'culture_house', 'hacker_house', 'founder_house', 'staynode'
] as const;

const NODE_STATUSES = ['active', 'developing', 'planning'] as const;

export function NodeManagement({ selectedProperty, onPropertyChange }: NodeManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'nodes' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'developing' | 'planning'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [editingNode, setEditingNode] = useState<NodeInput | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddNode = () => {
    setEditingNode(null);
    setShowNodeModal(true);
  };

  const handleEditNode = (node: NodeInput) => {
    setEditingNode(node);
    setShowNodeModal(true);
  };

  const handleCloseModal = () => {
    setShowNodeModal(false);
    setEditingNode(null);
  };

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} onAddNode={handleAddNode} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'nodes' && (
            <NodeList 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
              statusFilter={statusFilter} 
              onStatusFilterChange={setStatusFilter} 
              typeFilter={typeFilter} 
              onTypeFilterChange={setTypeFilter}
              locationFilter={locationFilter}
              onLocationFilterChange={setLocationFilter}
              onEditNode={handleEditNode}
              onDeleteNode={(id) => setShowDeleteConfirm(id)}
            />
          )}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>

      {/* Node Create/Edit Modal */}
      {showNodeModal && (
        <NodeModal 
          node={editingNode} 
          onClose={handleCloseModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          nodeId={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(null)}
        />
      )}
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'nodes' | 'analytics';
  onViewChange: (view: 'overview' | 'nodes' | 'analytics') => void;
  onAddNode: () => void;
}

function Header({ activeView, onViewChange, onAddNode }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Node Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage Zo World network nodes and locations</p>
        </div>
        
        <button 
          onClick={onAddNode}
          className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center"
        >
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
  const { data: stats, isLoading, error } = useNodeStats();

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
        <p className="text-red-400">Failed to load node data</p>
      </div>
    );
  }

  const typeEntries = Object.entries(stats?.typeCount || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Key Metrics - Single Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard
          icon={<Home className="w-4 h-4" />}
          label="Total Nodes"
          value={String(stats?.totalNodes || 0)}
          subtitle="Across network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Globe className="w-4 h-4" />}
          label="Geographic Reach"
          value={String(stats?.cityCount || 0)}
          subtitle={`Cities in ${Object.keys(stats?.countryCount || {}).length} countries`}
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Zap className="w-4 h-4" />}
          label="Active Nodes"
          value={String(stats?.activeNodes || 0)}
          subtitle={`${stats?.totalNodes ? Math.round((stats.activeNodes / stats.totalNodes) * 100) : 0}% of network`}
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Building className="w-4 h-4" />}
          label="In Development"
          value={String(stats?.developingNodes || 0)}
          subtitle="Coming soon"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Target className="w-4 h-4" />}
          label="Planning"
          value={String(stats?.planningNodes || 0)}
          subtitle={`${stats?.totalNodes ? Math.round((stats.planningNodes / stats.totalNodes) * 100) : 0}% of network`}
          color="text-[#71717b]"
        />
      </div>

      {/* Node Types */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Network by Type</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Distribution across {typeEntries.length} node categories</p>
        </div>
        <div className="p-4 space-y-3">
          {typeEntries.slice(0, 8).map(([type, count]) => {
            const typeConfig = nodeTypeInfo[type] || { label: type, color: 'text-[#9f9fa9]', bgColor: 'bg-[#9f9fa9]' };
            const percentage = stats?.totalNodes ? Math.round((count / stats.totalNodes) * 100) : 0;
            return (
              <NodeTypeBar
                key={type}
                icon={<Home className="w-4 h-4" />}
                label={typeConfig.label}
                count={count}
                total={stats?.totalNodes || 0}
                percentage={percentage}
                color={typeConfig.bgColor}
              />
            );
          })}
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
            {stats?.topCities && stats.topCities.length > 0 ? (
              stats.topCities.slice(0, 5).map((cityData) => (
                <CityRow 
                  key={cityData.city}
                  city={cityData.city} 
                  country={cityData.country} 
                  nodes={cityData.nodes} 
                  types={cityData.types} 
                />
              ))
            ) : (
              <div className="text-center py-4 text-[#9f9fa9]">No city data available</div>
            )}
          </div>
        </div>

        {/* Feature Popularity */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Feature Availability</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Most common amenities</p>
          </div>
          <div className="p-4 space-y-3">
            {stats?.topFeatures && stats.topFeatures.length > 0 ? (
              stats.topFeatures.slice(0, 5).map((featureData) => {
                const percentage = stats.totalNodes ? Math.round((featureData.count / stats.totalNodes) * 100) : 0;
                return (
                  <FeatureBar 
                    key={featureData.feature}
                    label={featureData.feature} 
                    count={featureData.count} 
                    total={stats.totalNodes} 
                    percentage={percentage} 
                  />
                );
              })
            ) : (
              <div className="text-center py-4 text-[#9f9fa9]">No feature data available</div>
            )}
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
              <span className={`text-lg ${stats?.nodesWithCoords === stats?.totalNodes ? 'text-[#9ae600]' : ''}`}>
                {stats?.nodesWithCoords || 0}/{stats?.totalNodes || 0} ({stats?.totalNodes ? Math.round((stats.nodesWithCoords / stats.totalNodes) * 100) : 0}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Nodes with Website</span>
              <span className="text-lg">
                {stats?.nodesWithWebsite || 0}/{stats?.totalNodes || 0} ({stats?.totalNodes ? Math.round((stats.nodesWithWebsite / stats.totalNodes) * 100) : 0}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Nodes with Contact Info</span>
              <span className="text-lg">
                {stats?.nodesWithContact || 0}/{stats?.totalNodes || 0} ({stats?.totalNodes ? Math.round((stats.nodesWithContact / stats.totalNodes) * 100) : 0}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg Completeness Score</span>
              <span className={`text-lg ${(stats?.avgCompletenessScore || 0) >= 80 ? 'text-[#9ae600]' : (stats?.avgCompletenessScore || 0) >= 60 ? 'text-[#f0b100]' : 'text-[#fb2c36]'}`}>
                {stats?.avgCompletenessScore || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Data Quality Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            {stats && stats.totalNodes - stats.nodesWithWebsite > 0 && (
              <AlertItem
                type="warning"
                message={`${stats.totalNodes - stats.nodesWithWebsite} nodes missing website URL`}
                action="Update Info"
              />
            )}
            {stats && stats.totalNodes - stats.nodesWithContact > 0 && (
              <AlertItem
                type="warning"
                message={`${stats.totalNodes - stats.nodesWithContact} nodes missing contact email`}
                action="Add Contact"
              />
            )}
            {stats && stats.nodesNotUpdated90Days > 0 && (
              <AlertItem
                type="info"
                message={`${stats.nodesNotUpdated90Days} nodes not updated in 90 days`}
                action="Review"
              />
            )}
            {stats && stats.nodesWithCoords === stats.totalNodes && stats.totalNodes > 0 && (
              <AlertItem
                type="success"
                message="All active nodes have coordinates"
                action="View Map"
              />
            )}
            {stats && stats.totalNodes === 0 && (
              <div className="text-center py-4 text-[#9f9fa9]">No nodes to analyze</div>
            )}
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
          {stats?.recentUpdates && stats.recentUpdates.length > 0 ? (
            stats.recentUpdates.map((update) => (
              <UpdateRow
                key={update.id}
                node={update.name}
                city={update.city}
                action={update.status === 'active' ? 'Status: Active' : update.status === 'developing' ? 'Status: In Development' : 'Updated'}
                time={formatTimeAgo(update.updatedAt)}
                type={update.status === 'active' ? 'success' : 'info'}
              />
            ))
          ) : (
            <div className="p-4 text-center text-[#9f9fa9]">No recent updates</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format time ago
function formatTimeAgo(dateString: string | null): string {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

interface NodeListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'developing' | 'planning';
  onStatusFilterChange: (status: 'all' | 'active' | 'developing' | 'planning') => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  locationFilter: string;
  onLocationFilterChange: (location: string) => void;
  onEditNode: (node: NodeInput) => void;
  onDeleteNode: (id: string) => void;
}

function NodeList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, typeFilter, onTypeFilterChange, locationFilter, onLocationFilterChange, onEditNode, onDeleteNode }: NodeListProps) {
  const { data: rawNodes, isLoading } = useNodes();
  const { data: userCountsByCity } = useUserCountsByCity();

  // Transform Supabase nodes to display format
  const nodes = (rawNodes || []).map((node: any) => {
    // Calculate completeness score
    let completeness = 0;
    if (node.name) completeness += 20;
    if (node.latitude && node.longitude) completeness += 20;
    if (node.website) completeness += 20;
    if (node.contact_email) completeness += 20;
    if (node.image) completeness += 20;

    const city = node.city || 'Unknown';

    return {
      id: node.id,
      name: node.name || 'Unnamed Node',
      city,
      country: node.country || 'Unknown',
      type: node.type || 'unknown',
      status: node.status || 'active',
      description: node.description || 'No description available',
      features: node.features || [],
      coordinates: { lat: node.latitude || 0, lng: node.longitude || 0 },
      website: node.website,
      twitter: node.twitter,
      email: node.contact_email,
      image: !!node.image,
      completeness,
      usersInCity: userCountsByCity?.[city] || 0,
      updated: node.updated_at ? new Date(node.updated_at).toLocaleDateString() : 'Unknown',
    };
  });

  const filteredNodes = nodes.filter((node: any) => {
    const matchesSearch = searchQuery === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
    const matchesType = typeFilter === 'all' || node.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || 
      node.city === locationFilter || 
      node.country === locationFilter;
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  // Get unique types from data
  const uniqueTypes = [...new Set(nodes.map((n: any) => n.type))].filter(Boolean);
  
  // Get unique locations (cities and countries) from data
  const uniqueCities = [...new Set(nodes.map((n: any) => n.city))].filter(Boolean).sort();
  const uniqueCountries = [...new Set(nodes.map((n: any) => n.country))].filter(Boolean).sort();

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

          {/* Type Filter - Dynamic from data */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value as any)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Types ({uniqueTypes.length})</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {nodeTypeInfo[type]?.label || type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Location Filter - Dynamic from data */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => onLocationFilterChange(e.target.value)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <optgroup label="Countries">
                {uniqueCountries.map((country) => (
                  <option key={`country-${country}`} value={country}>
                    {country}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Cities">
                {uniqueCities.map((city) => (
                  <option key={`city-${city}`} value={city}>
                    {city}
                  </option>
                ))}
              </optgroup>
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
      ) : filteredNodes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#9f9fa9]">No nodes found matching your criteria</p>
          <p className="text-xs text-[#71717b] mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="text-xs text-[#9f9fa9] px-1">
            Showing {filteredNodes.length} of {nodes.length} nodes
          </div>
          {/* Node Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredNodes.map((node: any) => (
              <NodeCard 
                key={node.id} 
                node={node} 
                onEdit={() => onEditNode({
                  id: node.id,
                  name: node.name,
                  type: node.type,
                  description: node.description,
                  city: node.city,
                  country: node.country,
                  latitude: node.coordinates.lat,
                  longitude: node.coordinates.lng,
                  website: node.website,
                  twitter: node.twitter,
                  contact_email: node.email,
                  features: node.features,
                  status: node.status,
                })}
                onDelete={() => onDeleteNode(node.id)}
              />
            ))}
          </div>
        </>
      )}
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
  onEdit: () => void;
  onDelete: () => void;
}

function NodeCard({ node, onEdit, onDelete }: NodeCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const statusColors: Record<string, string> = {
    active: 'bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/30',
    developing: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    planning: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  // Get type info from the nodeTypeInfo map
  const typeConfig = nodeTypeInfo[node.type] || { label: node.type, color: 'text-[#9f9fa9]', bgColor: 'bg-[#9f9fa9]' };
  const typeColorClass = `${typeConfig.bgColor}/10 ${typeConfig.color}`;

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
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1.5 hover:bg-[#27272a] rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 top-full mt-1 w-32 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl z-20 overflow-hidden">
                    <button
                      onClick={() => { onEdit(); setShowDropdown(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#27272a] transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    {node.website && (
                      <a
                        href={node.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowDropdown(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#27272a] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit Site
                      </a>
                    )}
                    <button
                      onClick={() => { onDelete(); setShowDropdown(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm text-[#9f9fa9] mb-3">{node.description}</p>
        
        {/* Type & Completeness */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs ${typeColorClass}`}>
            {typeConfig.label}
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
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Node
        </button>
        {node.website ? (
          <a
            href={node.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors"
            title="Visit Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <a
            href={`https://www.google.com/maps?q=${node.coordinates.lat},${node.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors"
            title="View on Map"
          >
            <MapPin className="w-4 h-4" />
          </a>
        )}
        <button
          onClick={onDelete}
          className="p-2 bg-[#18181b] hover:bg-red-900/50 text-[#9f9fa9] hover:text-red-400 rounded transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Analytics() {
  const { data: nodes, isLoading } = useNodes();
  const { data: stats } = useNodeStats();
  const { data: userCountsByCity } = useUserCountsByCity();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
      </div>
    );
  }

  const allNodes = nodes || [];
  
  // Compute country-level analytics
  const countryAnalytics = (() => {
    const data: Record<string, { total: number; active: number; cities: Set<string>; topCityCount: Record<string, number> }> = {};
    
    allNodes.forEach(node => {
      const country = node.country || 'Unknown';
      const city = node.city || 'Unknown';
      
      if (!data[country]) {
        data[country] = { total: 0, active: 0, cities: new Set(), topCityCount: {} };
      }
      
      data[country].total += 1;
      if (node.status === 'active') data[country].active += 1;
      data[country].cities.add(city);
      data[country].topCityCount[city] = (data[country].topCityCount[city] || 0) + 1;
    });
    
    return Object.entries(data)
      .map(([country, d]) => {
        const topCity = Object.entries(d.topCityCount).sort((a, b) => b[1] - a[1])[0];
        return {
          country,
          flag: getCountryFlag(country),
          total: d.total,
          active: d.active,
          cities: d.cities.size,
          topCity: topCity ? `${topCity[0]} (${topCity[1]})` : '-'
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  })();

  // Compute completeness for each node
  const nodesWithCompleteness = allNodes.map(node => {
    let score = 0;
    const hasCoords = !!(node.latitude && node.longitude);
    const hasWebsite = !!node.website;
    const hasContact = !!node.contact_email;
    const hasImage = !!node.image;
    const hasName = !!node.name;
    const hasDescription = !!node.description;
    
    if (hasName) score += 20;
    if (hasDescription) score += 10;
    if (hasCoords) score += 25;
    if (hasWebsite) score += 20;
    if (hasContact) score += 15;
    if (hasImage) score += 10;
    
    return {
      id: node.id,
      name: node.name || 'Unknown',
      location: `${node.city || 'Unknown'}, ${node.country || 'Unknown'}`,
      coords: hasCoords,
      website: hasWebsite,
      contact: hasContact,
      image: hasImage,
      score
    };
  }).sort((a, b) => b.score - a.score);

  // Compute growth timeline (group by quarter based on inserted_at)
  const growthByQuarter = (() => {
    const quarterData: Record<string, number> = {};
    
    allNodes.forEach(node => {
      if (node.inserted_at) {
        const date = new Date(node.inserted_at);
        const year = date.getFullYear();
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        const key = `Q${quarter} ${year}`;
        quarterData[key] = (quarterData[key] || 0) + 1;
      }
    });
    
    // Get last 6 quarters
    const sortedQuarters = Object.entries(quarterData)
      .sort((a, b) => {
        const [qA, yA] = a[0].split(' ');
        const [qB, yB] = b[0].split(' ');
        const yearDiff = parseInt(yA) - parseInt(yB);
        if (yearDiff !== 0) return yearDiff;
        return parseInt(qA.slice(1)) - parseInt(qB.slice(1));
      })
      .slice(-6);
    
    const maxCount = Math.max(...sortedQuarters.map(([, count]) => count), 1);
    
    return sortedQuarters.map(([label, count]) => ({ label, count, maxCount }));
  })();

  // Hub cities (cities with 2+ nodes)
  const hubCities = stats?.topCities?.filter(city => city.nodes >= 2) || [];

  // Development pipeline
  const planningNodes = allNodes.filter(n => n.status === 'planning').map(n => n.name || 'Unknown').slice(0, 3);
  const developingNodes = allNodes.filter(n => n.status === 'developing').map(n => n.name || 'Unknown').slice(0, 3);
  const activeCount = allNodes.filter(n => n.status === 'active').length;
  const developingCount = allNodes.filter(n => n.status === 'developing').length;
  const planningCount = allNodes.filter(n => n.status === 'planning').length;

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
                {countryAnalytics.length > 0 ? (
                  countryAnalytics.map((row) => (
                    <CountryRow 
                      key={row.country}
                      country={row.country} 
                      flag={row.flag} 
                      total={row.total} 
                      active={row.active} 
                      cities={row.cities} 
                      topCity={row.topCity} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-[#9f9fa9]">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Data Completeness</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Nodes ranked by completeness score (showing top 10)</p>
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
              {nodesWithCompleteness.slice(0, 10).map((row) => (
                <CompletenessRow 
                  key={row.id}
                  node={row.name} 
                  location={row.location} 
                  coords={row.coords} 
                  website={row.website} 
                  contact={row.contact} 
                  image={row.image} 
                  score={row.score} 
                />
              ))}
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
          {growthByQuarter.length > 0 ? (
            <div className="h-64 flex items-end justify-between gap-2">
              {growthByQuarter.map((bar) => (
                <GrowthBar key={bar.label} label={bar.label} count={bar.count} maxCount={bar.maxCount} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-[#9f9fa9]">
              No growth data available
            </div>
          )}
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
            {hubCities.length > 0 ? (
              hubCities.slice(0, 5).map((city) => (
                <HubCityRow
                  key={city.city}
                  city={city.city}
                  nodes={city.nodes}
                  types={`${city.types.length} types`}
                  users={userCountsByCity?.[city.city] || 0}
                />
              ))
            ) : (
              <div className="text-center py-4 text-[#9f9fa9]">No hub cities yet</div>
            )}
          </div>
        </div>

        {/* Development Pipeline */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Development Pipeline</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Nodes by status</p>
          </div>
          <div className="p-4 space-y-3">
            <PipelineRow 
              status="Planning" 
              count={planningCount} 
              nodes={planningCount > 0 ? (planningCount > 3 ? [...planningNodes, `+${planningCount - 3} more`] : planningNodes) : ['None yet']} 
            />
            <PipelineRow 
              status="Developing" 
              count={developingCount} 
              nodes={developingCount > 0 ? (developingCount > 3 ? [...developingNodes, `+${developingCount - 3} more`] : developingNodes) : ['None yet']} 
            />
            <PipelineRow 
              status="Active" 
              count={activeCount} 
              nodes={[`${activeCount} active nodes across network`]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for country flags
function getCountryFlag(country: string): string {
  const countryFlags: Record<string, string> = {
    'India': '🇮🇳',
    'Germany': '🇩🇪',
    'USA': '🇺🇸',
    'United States': '🇺🇸',
    'UK': '🇬🇧',
    'United Kingdom': '🇬🇧',
    'Singapore': '🇸🇬',
    'UAE': '🇦🇪',
    'United Arab Emirates': '🇦🇪',
    'France': '🇫🇷',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Canada': '🇨🇦',
    'Netherlands': '🇳🇱',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Brazil': '🇧🇷',
    'Mexico': '🇲🇽',
    'Thailand': '🇹🇭',
    'Indonesia': '🇮🇩',
    'Vietnam': '🇻🇳',
    'Portugal': '🇵🇹',
    'Switzerland': '🇨🇭',
    'Austria': '🇦🇹',
    'Belgium': '🇧🇪',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Denmark': '🇩🇰',
    'Finland': '🇫🇮',
    'Poland': '🇵🇱',
    'Ireland': '🇮🇪',
    'South Korea': '🇰🇷',
    'China': '🇨🇳',
    'Hong Kong': '🇭🇰',
    'Taiwan': '🇹🇼',
    'Malaysia': '🇲🇾',
    'Philippines': '🇵🇭',
    'New Zealand': '🇳🇿',
    'South Africa': '🇿🇦',
    'Israel': '🇮🇱',
    'Turkey': '🇹🇷',
    'Greece': '🇬🇷',
    'Czech Republic': '🇨🇿',
    'Hungary': '🇭🇺',
    'Romania': '🇷🇴',
    'Russia': '🇷🇺',
    'Argentina': '🇦🇷',
    'Chile': '🇨🇱',
    'Colombia': '🇨🇴',
    'Peru': '🇵🇪',
    'Egypt': '🇪🇬',
    'Morocco': '🇲🇦',
    'Kenya': '🇰🇪',
    'Nigeria': '🇳🇬',
  };
  return countryFlags[country] || '🌍';
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

// ===========================================
// NODE CREATE/EDIT MODAL
// ===========================================

interface NodeModalProps {
  node: NodeInput | null;
  onClose: () => void;
}

function NodeModal({ node, onClose }: NodeModalProps) {
  const isEditing = !!node?.id;
  const createNode = useCreateNode();
  const updateNode = useUpdateNode();

  const [formData, setFormData] = useState<NodeInput>({
    name: node?.name || '',
    type: node?.type || 'staynode',
    description: node?.description || '',
    city: node?.city || '',
    country: node?.country || '',
    latitude: node?.latitude || undefined,
    longitude: node?.longitude || undefined,
    website: node?.website || '',
    twitter: node?.twitter || '',
    contact_email: node?.contact_email || '',
    features: node?.features || [],
    status: node?.status || 'active',
  });

  const [featureInput, setFeatureInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof NodeInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || []).filter(f => f !== feature),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Node name is required');
      return;
    }

    try {
      if (isEditing && node?.id) {
        await updateNode.mutateAsync({ ...formData, id: node.id });
      } else {
        await createNode.mutateAsync(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save node');
    }
  };

  const isLoading = createNode.isPending || updateNode.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between sticky top-0 bg-[#09090b]">
          <div>
            <h2 className="text-lg">{isEditing ? 'Edit Node' : 'Create New Node'}</h2>
            <p className="text-xs text-[#9f9fa9] mt-1">
              {isEditing ? 'Update node information' : 'Add a new node to the Zo World network'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#27272a] rounded transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Node Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Zo House Bangalore"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Node Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              >
                {NODE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {nodeTypeInfo[type]?.label || type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the node..."
              rows={3}
              className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600] resize-none"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. Bangalore"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                placeholder="e.g. India"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.latitude || ''}
                onChange={(e) => handleChange('latitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="e.g. 12.9716"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude || ''}
                onChange={(e) => handleChange('longitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="e.g. 77.5946"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
          </div>

          {/* Contact & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Twitter</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                placeholder="@handle"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Contact Email</label>
            <input
              type="email"
              value={formData.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder="contact@example.com"
              className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
            >
              {NODE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Features */}
          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add a feature (e.g. coworking, cafe)"
                className="flex-1 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] rounded text-sm transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.features || []).map((feature) => (
                <span 
                  key={feature}
                  className="px-2 py-1 bg-[#18181b] border border-[#27272a] rounded text-xs flex items-center gap-1.5"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-[#9f9fa9] hover:text-white"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#27272a]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? 'Update Node' : 'Create Node'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===========================================
// DELETE CONFIRMATION MODAL
// ===========================================

interface DeleteConfirmModalProps {
  nodeId: string;
  onClose: () => void;
}

function DeleteConfirmModal({ nodeId, onClose }: DeleteConfirmModalProps) {
  const deleteNode = useDeleteNode();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteNode.mutateAsync(nodeId);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete node');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg w-full max-w-md">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg mb-2">Delete Node?</h3>
          <p className="text-sm text-[#9f9fa9] mb-4">
            Are you sure you want to delete this node? This action cannot be undone.
          </p>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-sm text-red-400 mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteNode.isPending}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {deleteNode.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
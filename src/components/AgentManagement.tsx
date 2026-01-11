import { Plus, Search, Filter, Edit, Trash2, Play, Pause, Archive, TrendingUp, Bot, Zap, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, BarChart3, MessageSquare, Shield, Clock, Target, CheckCircle, XCircle, Activity, Settings, RefreshCw, Cpu, Database, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useState } from 'react';

interface AgentManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function AgentManagement({ selectedProperty, onPropertyChange }: AgentManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'agents' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'idle' | 'maintenance' | 'offline'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'communication' | 'moderation' | 'analytics' | 'automation' | 'support'>('all');

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'agents' && <AgentList searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter} />}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'agents' | 'analytics';
  onViewChange: (view: 'overview' | 'agents' | 'analytics') => void;
}

function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Agent Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage AI agents across Zo World network</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Deploy Agent</span>
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
          onClick={() => onViewChange('agents')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'agents'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Agents
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
          icon={<Bot className="w-4 h-4" />}
          label="Total Agents"
          value="8"
          subtitle="Across network"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Activity className="w-4 h-4" />}
          label="Active Now"
          value="7"
          subtitle="87.5% of fleet"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<MessageSquare className="w-4 h-4" />}
          label="Messages Today"
          value="8.2K"
          subtitle="+18% vs yesterday"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Zap className="w-4 h-4" />}
          label="Avg Response Time"
          value="1.4s"
          subtitle="Within SLA"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Target className="w-4 h-4" />}
          label="Success Rate"
          value="96.2%"
          subtitle="Last 24h"
          color="text-[#9ae600]"
        />
      </div>

      {/* Agent Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <CategoryCard
          title="Support"
          count={2}
          description="Citizen help"
          color="bg-[#d946ef]/10 border-[#d946ef]/30"
          iconColor="text-[#d946ef]"
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <CategoryCard
          title="Automation"
          count={4}
          description="Tasks & workflows"
          color="bg-[#f0b100]/10 border-[#f0b100]/30"
          iconColor="text-[#f0b100]"
          icon={<Zap className="w-5 h-5" />}
        />
        <CategoryCard
          title="Analytics"
          count={1}
          description="Data & insights"
          color="bg-[#06b6d4]/10 border-[#06b6d4]/30"
          iconColor="text-[#06b6d4]"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <CategoryCard
          title="Moderation"
          count={1}
          description="Content & safety"
          color="bg-[#fb2c36]/10 border-[#fb2c36]/30"
          iconColor="text-[#fb2c36]"
          icon={<Shield className="w-5 h-5" />}
        />
        <CategoryCard
          title="Communication"
          count={0}
          description="Coming soon"
          color="bg-[#71717b]/10 border-[#71717b]/30"
          iconColor="text-[#71717b]"
          icon={<MessageSquare className="w-5 h-5" />}
        />
      </div>

      {/* Top Performing Agents */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top Performing Agents</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">By interactions handled today</p>
        </div>
        <div className="p-4 space-y-3">
          <TopAgentRow
            rank={1}
            name="Citizens Support"
            category="Support"
            interactions={2845}
            successRate={97}
            avgResponse="1.1s"
          />
          <TopAgentRow
            rank={2}
            name="Sales Bot"
            category="Automation"
            interactions={2234}
            successRate={95}
            avgResponse="1.3s"
          />
          <TopAgentRow
            rank={3}
            name="Housekeeping Buddy"
            category="Automation"
            interactions={1567}
            successRate={98}
            avgResponse="0.9s"
          />
          <TopAgentRow
            rank={4}
            name="House Captain Sidekick"
            category="Automation"
            interactions={987}
            successRate={96}
            avgResponse="1.2s"
          />
          <TopAgentRow
            rank={5}
            name="Vibebot"
            category="Automation"
            interactions={543}
            successRate={94}
            avgResponse="1.5s"
          />
        </div>
      </div>

      {/* System Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* System Health */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">System Health</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Average Uptime</span>
              <span className="text-lg text-[#9ae600]">99.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Total Interactions (24h)</span>
              <span className="text-lg">12,423</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Failed Requests</span>
              <span className="text-lg text-[#fb2c36]">87 (0.7%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg CPU Usage</span>
              <span className="text-lg">34%</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Recent Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            <AlertItem
              type="warning"
              message="Event Coordinator - High response time (3.2s)"
              time="15m ago"
            />
            <AlertItem
              type="info"
              message="Quest Validator - Auto-scaled to 2 instances"
              time="1h ago"
            />
            <AlertItem
              type="success"
              message="WhatsApp Captain - Uptime milestone: 30 days"
              time="3h ago"
            />
            <AlertItem
              type="warning"
              message="Content Moderator - Queue backlog detected"
              time="5h ago"
            />
          </div>
        </div>
      </div>

      {/* Agent Activity Timeline */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Agent Activity Timeline</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Recent deployments and updates</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          <TimelineRow
            agent="Notification Agent"
            action="Deployed to production"
            time="2 hours ago"
            type="success"
          />
          <TimelineRow
            agent="Quest Validator"
            action="Updated to v2.4.1"
            time="5 hours ago"
            type="info"
          />
          <TimelineRow
            agent="WhatsApp Captain"
            action="Performance optimization applied"
            time="1 day ago"
            type="info"
          />
          <TimelineRow
            agent="Support Bot"
            action="Taken offline for maintenance"
            time="2 days ago"
            type="warning"
          />
        </div>
      </div>
    </div>
  );
}

interface AgentListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'idle' | 'maintenance' | 'offline';
  onStatusFilterChange: (status: 'all' | 'active' | 'idle' | 'maintenance' | 'offline') => void;
  categoryFilter: 'all' | 'communication' | 'moderation' | 'analytics' | 'automation' | 'support';
  onCategoryFilterChange: (category: 'all' | 'communication' | 'moderation' | 'analytics' | 'automation' | 'support') => void;
}

function AgentList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, categoryFilter, onCategoryFilterChange }: AgentListProps) {
  const agents = [
    {
      id: 'agent-1',
      name: 'Citizens Support',
      category: 'support',
      status: 'active',
      version: 'v2.1.0',
      uptime: '99.3%',
      interactions: 2845,
      successRate: 97,
      avgResponse: '1.1s',
      lastActive: '1 minute ago',
      description: 'Handles inbound citizen queries and provides instant support',
      cpu: 45,
      memory: 62,
      instances: 3
    },
    {
      id: 'agent-2',
      name: 'Sales Bot',
      category: 'automation',
      status: 'active',
      version: 'v3.0.2',
      uptime: '98.8%',
      interactions: 2234,
      successRate: 95,
      avgResponse: '1.3s',
      lastActive: '2 minutes ago',
      description: 'Assists with sales and marketing activities across all properties',
      cpu: 38,
      memory: 54,
      instances: 2
    },
    {
      id: 'agent-3',
      name: 'Housekeeping Buddy',
      category: 'automation',
      status: 'active',
      version: 'v2.4.1',
      uptime: '99.7%',
      interactions: 1567,
      successRate: 98,
      avgResponse: '0.9s',
      lastActive: '30 seconds ago',
      description: 'Helps housekeeping staff stay on track with daily tasks and schedules',
      cpu: 32,
      memory: 48,
      instances: 2
    },
    {
      id: 'agent-4',
      name: 'House Captain Sidekick',
      category: 'automation',
      status: 'active',
      version: 'v1.8.3',
      uptime: '99.1%',
      interactions: 987,
      successRate: 96,
      avgResponse: '1.2s',
      lastActive: '3 minutes ago',
      description: 'Reports property status and assists House Captain with daily operations',
      cpu: 29,
      memory: 41,
      instances: 1
    },
    {
      id: 'agent-5',
      name: 'Vibebot',
      category: 'automation',
      status: 'active',
      version: 'v1.5.0',
      uptime: '97.9%',
      interactions: 543,
      successRate: 94,
      avgResponse: '1.5s',
      lastActive: '5 minutes ago',
      description: 'Assists Vibe Curator with event planning and community engagement',
      cpu: 24,
      memory: 36,
      instances: 1
    },
    {
      id: 'agent-6',
      name: 'Analytics Engine',
      category: 'analytics',
      status: 'active',
      version: 'v4.1.2',
      uptime: '99.9%',
      interactions: 1234,
      successRate: 99,
      avgResponse: '2.1s',
      lastActive: '4 minutes ago',
      description: 'Processes analytics data and generates insights across all properties',
      cpu: 58,
      memory: 76,
      instances: 3
    },
    {
      id: 'agent-7',
      name: 'Content Moderator',
      category: 'moderation',
      status: 'active',
      version: 'v1.9.0',
      uptime: '99.5%',
      interactions: 789,
      successRate: 93,
      avgResponse: '1.8s',
      lastActive: '6 minutes ago',
      description: 'Monitors and moderates citizen-generated content across the network',
      cpu: 41,
      memory: 55,
      instances: 2
    },
    {
      id: 'agent-8',
      name: 'Notification Hub',
      category: 'support',
      status: 'maintenance',
      version: 'v2.2.1',
      uptime: '96.4%',
      interactions: 456,
      successRate: 91,
      avgResponse: '0.8s',
      lastActive: '2 hours ago',
      description: 'Sends automated notifications and alerts to citizens',
      cpu: 0,
      memory: 0,
      instances: 0
    },
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
              placeholder="Search agents by name or description..."
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
              <option value="idle">Idle</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value as any)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="communication">Communication</option>
              <option value="moderation">Moderation</option>
              <option value="analytics">Analytics</option>
              <option value="automation">Automation</option>
              <option value="support">Support</option>
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

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    category: string;
    status: string;
    version: string;
    uptime: string;
    interactions: number;
    successRate: number;
    avgResponse: string;
    lastActive: string;
    description: string;
    cpu: number;
    memory: number;
    instances: number;
  };
}

function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    idle: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    maintenance: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30',
    offline: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const categoryColors = {
    communication: 'text-[#9ae600]',
    moderation: 'text-[#fb2c36]',
    analytics: 'text-[#06b6d4]',
    automation: 'text-[#f0b100]',
    support: 'text-[#d946ef]',
  };

  const statusIcons = {
    active: <Activity className="w-3 h-3" />,
    idle: <Clock className="w-3 h-3" />,
    maintenance: <Settings className="w-3 h-3" />,
    offline: <XCircle className="w-3 h-3" />,
  };

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bot className={`w-5 h-5 ${categoryColors[agent.category as keyof typeof categoryColors]}`} />
              <h4 className="text-lg">{agent.name}</h4>
            </div>
            <p className="text-xs text-[#71717b] mb-1">{agent.version}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs border flex items-center gap-1 ${statusColors[agent.status as keyof typeof statusColors]}`}>
              {statusIcons[agent.status as keyof typeof statusIcons]}
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-[#9f9fa9]">{agent.description}</p>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Interactions</div>
            <div className="text-xl text-[#9ae600]">{agent.interactions.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Success Rate</div>
            <div className="text-xl">{agent.successRate}%</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Avg Response</div>
            <div className="text-xl">{agent.avgResponse}</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Uptime</div>
            <div className="text-sm text-[#9ae600]">{agent.uptime}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Last Active</div>
            <div className="text-sm">{agent.lastActive}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">CPU Usage</div>
            <div className="text-sm">{agent.cpu}%</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Memory</div>
            <div className="text-sm">{agent.memory}%</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Instances</div>
            <div className="text-sm">{agent.instances}</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Category</div>
            <div className={`text-sm capitalize ${categoryColors[agent.category as keyof typeof categoryColors]}`}>
              {agent.category}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
          <Eye className="w-4 h-4" />
          View Details
        </button>
        {agent.status === 'active' && (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Pause">
            <Pause className="w-4 h-4" />
          </button>
        )}
        {agent.status !== 'active' && (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Start">
            <Play className="w-4 h-4" />
          </button>
        )}
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Restart">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Settings">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Performance Trends</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Daily interactions over time</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-end justify-between gap-2">
            <PerformanceBar label="Mon" interactions={8234} maxValue={15000} />
            <PerformanceBar label="Tue" interactions={9456} maxValue={15000} />
            <PerformanceBar label="Wed" interactions={11234} maxValue={15000} />
            <PerformanceBar label="Thu" interactions={12423} maxValue={15000} />
            <PerformanceBar label="Fri" interactions={10876} maxValue={15000} />
            <PerformanceBar label="Sat" interactions={7234} maxValue={15000} />
            <PerformanceBar label="Sun" interactions={6543} maxValue={15000} />
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Performance by Category</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Key metrics across agent categories</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Category</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Agents</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Interactions</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Success Rate</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Avg Response</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Uptime</th>
              </tr>
            </thead>
            <tbody>
              <CategoryPerformanceRow category="Communication" agents={6} interactions={4001} successRate={97} avgResponse="0.9s" uptime={99.5} />
              <CategoryPerformanceRow category="Automation" agents={7} interactions={4557} successRate={96} avgResponse="1.3s" uptime={98.2} />
              <CategoryPerformanceRow category="Moderation" agents={4} interactions={1876} successRate={93} avgResponse="1.5s" uptime={99.2} />
              <CategoryPerformanceRow category="Analytics" agents={5} interactions={1654} successRate={99} avgResponse="2.3s" uptime={99.7} />
              <CategoryPerformanceRow category="Support" agents={2} interactions={335} successRate={91} avgResponse="2.1s" uptime={95.1} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Resource Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CPU Usage */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">CPU Usage by Agent</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Current CPU consumption</p>
          </div>
          <div className="p-4 space-y-3">
            <ResourceBar agent="Analytics Engine" usage={61} color="bg-[#f0b100]" />
            <ResourceBar agent="Content Moderator" usage={56} color="bg-[#9ae600]" />
            <ResourceBar agent="Citizens Support" usage={45} color="bg-[#9ae600]" />
            <ResourceBar agent="Sales Bot" usage={38} color="bg-[#9ae600]" />
            <ResourceBar agent="Housekeeping Buddy" usage={32} color="bg-[#9ae600]" />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Memory Usage by Agent</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Current memory consumption</p>
          </div>
          <div className="p-4 space-y-3">
            <ResourceBar agent="Analytics Engine" usage={81} color="bg-[#fb2c36]" />
            <ResourceBar agent="Content Moderator" usage={72} color="bg-[#f0b100]" />
            <ResourceBar agent="Citizens Support" usage={62} color="bg-[#9ae600]" />
            <ResourceBar agent="Sales Bot" usage={54} color="bg-[#9ae600]" />
            <ResourceBar agent="Vibebot" usage={44} color="bg-[#9ae600]" />
          </div>
        </div>
      </div>

      {/* Response Time Trends */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Response Time by Agent</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Average response times (24h)</p>
        </div>
        <div className="p-4 space-y-3">
          <ResponseTimeBar agent="Housekeeping Buddy" responseTime={0.9} maxTime={5} status="excellent" />
          <ResponseTimeBar agent="Citizens Support" responseTime={1.1} maxTime={5} status="good" />
          <ResponseTimeBar agent="House Captain Sidekick" responseTime={1.2} maxTime={5} status="good" />
          <ResponseTimeBar agent="Sales Bot" responseTime={1.3} maxTime={5} status="good" />
          <ResponseTimeBar agent="Vibebot" responseTime={1.5} maxTime={5} status="good" />
          <ResponseTimeBar agent="Content Moderator" responseTime={1.8} maxTime={5} status="good" />
          <ResponseTimeBar agent="Analytics Engine" responseTime={2.1} maxTime={5} status="fair" />
        </div>
      </div>

      {/* Agent Status & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Agents Status */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Agent Status</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Real-time availability</p>
          </div>
          <div className="p-4 space-y-3">
            <AgentStatusRow name="Citizens Support" status="active" responseTime="1.1s" />
            <AgentStatusRow name="Sales Bot" status="active" responseTime="1.3s" />
            <AgentStatusRow name="Housekeeping Buddy" status="active" responseTime="0.9s" />
            <AgentStatusRow name="House Captain Sidekick" status="active" responseTime="1.2s" />
            <AgentStatusRow name="Vibebot" status="active" responseTime="1.5s" />
            <AgentStatusRow name="Analytics Engine" status="active" responseTime="2.1s" />
            <AgentStatusRow name="Content Moderator" status="active" responseTime="1.8s" />
            <AgentStatusRow name="Notification Hub" status="maintenance" responseTime="--" />
          </div>
        </div>

        {/* Response Time Metrics */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Response Times</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Average last 24h</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <span className="text-sm text-[#9f9fa9]">Fastest Response</span>
              <span className="text-sm text-[#9ae600]">0.9s (HK Buddy)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <span className="text-sm text-[#9f9fa9]">Slowest Response</span>
              <span className="text-sm text-[#f0b100]">2.1s (Analytics)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <span className="text-sm text-[#9f9fa9]">Network Average</span>
              <span className="text-sm">1.4s</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <span className="text-sm text-[#9f9fa9]">SLA Target</span>
              <span className="text-sm text-[#9ae600]">{'<'} 3.0s ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Within Target</span>
              <span className="text-sm text-[#9ae600]">100%</span>
            </div>
          </div>
        </div>

        {/* Credits & Usage */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">API Credits</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Usage today</p>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9f9fa9]">Citizens Support</span>
                <span className="text-sm">5,690 credits</span>
              </div>
              <div className="w-full bg-[#18181b] rounded-full h-2">
                <div className="h-2 rounded-full bg-[#d946ef]" style={{ width: '57%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9f9fa9]">Sales Bot</span>
                <span className="text-sm">4,468 credits</span>
              </div>
              <div className="w-full bg-[#18181b] rounded-full h-2">
                <div className="h-2 rounded-full bg-[#f0b100]" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9f9fa9]">Analytics Engine</span>
                <span className="text-sm">2,468 credits</span>
              </div>
              <div className="w-full bg-[#18181b] rounded-full h-2">
                <div className="h-2 rounded-full bg-[#06b6d4]" style={{ width: '25%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9f9fa9]">Other Agents</span>
                <span className="text-sm">1,596 credits</span>
              </div>
              <div className="w-full bg-[#18181b] rounded-full h-2">
                <div className="h-2 rounded-full bg-[#9ae600]" style={{ width: '16%' }} />
              </div>
            </div>
            <div className="pt-3 border-t border-[#27272a] flex items-center justify-between">
              <span className="text-sm">Total Used</span>
              <span className="text-lg text-[#9ae600]">14,222</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Monthly Limit</span>
              <span className="text-sm">500,000</span>
            </div>
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
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-[#9f9fa9]">{label}</div>
        <div className={`p-2 bg-[#27272a] rounded ${color}`}>
          {icon}
        </div>
      </div>
      <div className={`text-2xl mb-1 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  count: number;
  description: string;
  color: string;
  iconColor: string;
  icon: React.ReactNode;
}

function CategoryCard({ title, count, description, color, iconColor, icon }: CategoryCardProps) {
  return (
    <div className={`border rounded-lg p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm">{title}</h4>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className={`text-2xl mb-1 ${iconColor}`}>{count}</div>
      <div className="text-xs text-[#9f9fa9]">{description}</div>
    </div>
  );
}

interface TopAgentRowProps {
  rank: number;
  name: string;
  category: string;
  interactions: number;
  successRate: number;
  avgResponse: string;
}

function TopAgentRow({ rank, name, category, interactions, successRate, avgResponse }: TopAgentRowProps) {
  const medalColors = {
    1: 'text-[#f0b100]',
    2: 'text-[#71717b]',
    3: 'text-[#fb9062]',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded hover:bg-[#27272a] transition-colors">
      <div className={`text-sm w-6 text-center ${rank <= 3 ? medalColors[rank as keyof typeof medalColors] : ''}`}>
        #{rank}
      </div>
      <Bot className="w-5 h-5 text-[#9ae600]" />
      <div className="flex-1">
        <div className="text-sm mb-1">{name}</div>
        <div className="text-xs text-[#9f9fa9]">{category}</div>
      </div>
      <div className="text-right text-xs">
        <div className="text-[#9f9fa9] mb-1">{interactions.toLocaleString()} interactions</div>
        <div className="text-white">{successRate}% success • {avgResponse}</div>
      </div>
    </div>
  );
}

interface AlertItemProps {
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
}

function AlertItem({ type, message, time }: AlertItemProps) {
  const colors = {
    success: 'border-[#9ae600]/30 bg-[#9ae600]/10',
    warning: 'border-[#f0b100]/30 bg-[#f0b100]/10',
    info: 'border-[#06b6d4]/30 bg-[#06b6d4]/10',
  };

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-[#9ae600]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#f0b100]" />,
    info: <Zap className="w-4 h-4 text-[#06b6d4]" />,
  };

  return (
    <div className={`border rounded p-3 ${colors[type]}`}>
      <div className="flex items-start gap-2">
        {icons[type]}
        <div className="flex-1">
          <div className="text-sm mb-1">{message}</div>
          <div className="text-xs text-[#71717b]">{time}</div>
        </div>
      </div>
    </div>
  );
}

interface TimelineRowProps {
  agent: string;
  action: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

function TimelineRow({ agent, action, time, type }: TimelineRowProps) {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-[#9ae600]" />,
    info: <Zap className="w-4 h-4 text-[#06b6d4]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#f0b100]" />,
  };

  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#27272a] rounded">{icons[type]}</div>
        <div className="flex-1">
          <div className="text-sm mb-1">{agent}</div>
          <div className="text-xs text-[#9f9fa9] mb-1">{action}</div>
          <div className="text-xs text-[#71717b]">{time}</div>
        </div>
      </div>
    </div>
  );
}

interface CategoryPerformanceRowProps {
  category: string;
  agents: number;
  interactions: number;
  successRate: number;
  avgResponse: string;
  uptime: number;
}

function CategoryPerformanceRow({ category, agents, interactions, successRate, avgResponse, uptime }: CategoryPerformanceRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{category}</td>
      <td className="px-4 py-3 text-sm">{agents}</td>
      <td className="px-4 py-3 text-sm">{interactions.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{successRate}%</td>
      <td className="px-4 py-3 text-sm">{avgResponse}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{uptime}%</td>
    </tr>
  );
}

interface PerformanceBarProps {
  label: string;
  interactions: number;
  maxValue: number;
}

function PerformanceBar({ label, interactions, maxValue }: PerformanceBarProps) {
  const height = (interactions / maxValue) * 100;
  
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
        <div className="text-white">{interactions.toLocaleString()}</div>
      </div>
    </div>
  );
}

interface ResourceBarProps {
  agent: string;
  usage: number;
  color: string;
}

function ResourceBar({ agent, usage, color }: ResourceBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{agent}</span>
        <span className="text-sm text-[#9f9fa9]">{usage}%</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${usage}%` }} />
      </div>
    </div>
  );
}

interface ResponseTimeBarProps {
  agent: string;
  responseTime: number;
  maxTime: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

function ResponseTimeBar({ agent, responseTime, maxTime, status }: ResponseTimeBarProps) {
  const percentage = (responseTime / maxTime) * 100;
  
  const statusColors = {
    excellent: 'bg-[#9ae600]',
    good: 'bg-[#06b6d4]',
    fair: 'bg-[#f0b100]',
    poor: 'bg-[#fb2c36]',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{agent}</span>
        <span className="text-sm text-[#9f9fa9]">{responseTime}s</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${statusColors[status]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface AgentStatusRowProps {
  name: string;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  responseTime: string;
}

function AgentStatusRow({ name, status, responseTime }: AgentStatusRowProps) {
  const statusColors = {
    active: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    idle: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    maintenance: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30',
    offline: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const statusIcons = {
    active: <Activity className="w-3 h-3" />,
    idle: <Clock className="w-3 h-3" />,
    maintenance: <Settings className="w-3 h-3" />,
    offline: <XCircle className="w-3 h-3" />,
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded hover:bg-[#27272a] transition-colors">
      <div className={`p-2 bg-[#27272a] rounded ${statusColors[status as keyof typeof statusColors]}`}>
        {statusIcons[status as keyof typeof statusIcons]}
      </div>
      <Bot className="w-5 h-5 text-[#9ae600]" />
      <div className="flex-1">
        <div className="text-sm mb-1">{name}</div>
        <div className="text-xs text-[#9f9fa9]">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
      </div>
      <div className="text-right text-xs">
        <div className="text-[#9f9fa9] mb-1">Response Time</div>
        <div className="text-white">{responseTime}</div>
      </div>
    </div>
  );
}
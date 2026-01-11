import { Plus, Search, Filter, Edit, Trash2, Play, Pause, Archive, TrendingUp, Users, Coins, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Calendar, MapPin, Trophy, Zap, Clock, Target } from 'lucide-react';
import { useState } from 'react';

interface QuestManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function QuestManagement({ selectedProperty, onPropertyChange }: QuestManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'quests' | 'economy' | 'citizens'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed' | 'draft'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'daily' | 'weekly' | 'special' | 'seasonal'>('all');

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'quests' && <QuestList searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} />}
          {activeView === 'economy' && <Economy />}
          {activeView === 'citizens' && <Citizens />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'quests' | 'economy' | 'citizens';
  onViewChange: (view: 'overview' | 'quests' | 'economy' | 'citizens') => void;
}

function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Quest Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage quests, monitor economy, and analyze player engagement</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create Quest</span>
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
          onClick={() => onViewChange('quests')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'quests'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Quests
        </button>
        <button
          onClick={() => onViewChange('economy')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'economy'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Economy
        </button>
        <button
          onClick={() => onViewChange('citizens')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'citizens'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Citizens
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
          icon={<Target className="w-5 h-5" />}
          label="Active Quests"
          value="42"
          subtitle="8 draft"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Unique Players Today"
          value="892"
          subtitle="+12% vs yesterday"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Trophy className="w-5 h-5" />}
          label="Completions Today"
          value="1,234"
          subtitle="Across all quests"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Tokens Distributed Today"
          value="215.4K"
          subtitle="Avg: 175/play"
          color="text-[#9ae600]"
        />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CategoryCard
          title="Daily Quests"
          count={12}
          completions={456}
          color="bg-[#9ae600]/10 border-[#9ae600]/30"
          iconColor="text-[#9ae600]"
        />
        <CategoryCard
          title="Weekly Quests"
          count={5}
          completions={234}
          color="bg-[#06b6d4]/10 border-[#06b6d4]/30"
          iconColor="text-[#06b6d4]"
        />
        <CategoryCard
          title="One-Time Quests"
          count={25}
          completions={544}
          color="bg-[#f0b100]/10 border-[#f0b100]/30"
          iconColor="text-[#f0b100]"
        />
      </div>

      {/* Top Quests */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top Quests (Today)</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Most played quests in the last 24 hours</p>
        </div>
        <div className="p-4 space-y-3">
          <TopQuestRow
            title="Game 1111"
            slug="game-1111"
            plays={523}
            uniquePlayers={412}
            tokens={91250}
            trend="+12%"
          />
          <TopQuestRow
            title="Daily Check-in"
            slug="daily-checkin"
            plays={412}
            uniquePlayers={412}
            tokens={41200}
            trend="+5%"
          />
          <TopQuestRow
            title="City Explorer"
            slug="city-explorer"
            plays={287}
            uniquePlayers={156}
            tokens={50260}
            trend="-3%"
          />
          <TopQuestRow
            title="Node Visitor"
            slug="node-visitor"
            plays={89}
            uniquePlayers={67}
            tokens={17800}
            trend="+8%"
          />
          <TopQuestRow
            title="Social Butterfly"
            slug="social-butterfly"
            plays={78}
            uniquePlayers={78}
            tokens={7800}
            trend="+15%"
          />
        </div>
      </div>

      {/* Economy Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Economy Health */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Economy Health</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Total in Circulation</span>
              <span className="text-lg">5.2M tokens</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg per Citizen</span>
              <span className="text-lg">1,234 tokens</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Gini Coefficient</span>
              <span className="text-lg text-[#9ae600]">0.42 (Healthy)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Inflation Rate</span>
              <span className="text-lg">+2.3% this week</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Alerts & Notifications</h3>
          </div>
          <div className="p-4 space-y-3">
            <AlertItem
              type="warning"
              message="Node Visitor - Low completion rate (18%)"
              time="2h ago"
            />
            <AlertItem
              type="critical"
              message="User abc123 - Suspicious perfect scores"
              time="4h ago"
            />
            <AlertItem
              type="success"
              message="Game 1111 hit 10K total completions!"
              time="6h ago"
            />
            <AlertItem
              type="info"
              message="Weekly quests reset in 18 hours"
              time="8h ago"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Recent Completions</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Live feed of quest completions</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          <RecentActivityRow
            user="Rajesh Kumar"
            quest="Game 1111"
            score={1087}
            tokens={195}
            location="Bangalore"
            time="2 mins ago"
          />
          <RecentActivityRow
            user="Sarah Chen"
            quest="Daily Check-in"
            score={null}
            tokens={100}
            location="San Francisco"
            time="5 mins ago"
          />
          <RecentActivityRow
            user="Mohammed Ali"
            quest="City Explorer"
            score={null}
            tokens={250}
            location="Dubai"
            time="8 mins ago"
          />
          <RecentActivityRow
            user="Lisa Park"
            quest="Game 1111"
            score={945}
            tokens={170}
            location="Singapore"
            time="12 mins ago"
          />
          <RecentActivityRow
            user="Tom Anderson"
            quest="Node Visitor"
            score={null}
            tokens={200}
            location="Waterford"
            time="15 mins ago"
          />
        </div>
      </div>
    </div>
  );
}

interface QuestListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'upcoming' | 'completed' | 'draft';
  onStatusFilterChange: (status: 'all' | 'active' | 'upcoming' | 'completed' | 'draft') => void;
  typeFilter: 'all' | 'daily' | 'weekly' | 'special' | 'seasonal';
  onTypeFilterChange: (type: 'all' | 'daily' | 'weekly' | 'special' | 'seasonal') => void;
}

function QuestList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, typeFilter, onTypeFilterChange }: QuestListProps) {
  const quests = [
    {
      id: 'quest-game-1111',
      slug: 'game-1111',
      title: 'Game 1111',
      description: 'Score points by collecting tokens in the mini-game',
      status: 'active',
      type: 'daily',
      difficulty: 'medium',
      plays: 10234,
      uniquePlayers: 2345,
      tokens: 1.8,
      avgScore: 856,
      cooldown: 24,
      lastPlayed: '2 mins ago'
    },
    {
      id: 'quest-daily-checkin',
      slug: 'daily-checkin',
      title: 'Daily Check-in',
      description: 'Visit any Zo House location to check in',
      status: 'active',
      type: 'daily',
      difficulty: 'easy',
      plays: 15678,
      uniquePlayers: 1234,
      tokens: 1.2,
      avgScore: null,
      cooldown: 24,
      lastPlayed: '1 min ago'
    },
    {
      id: 'quest-city-explorer',
      slug: 'city-explorer',
      title: 'City Explorer',
      description: 'Visit 5 different Zo locations in your city',
      status: 'active',
      type: 'weekly',
      difficulty: 'hard',
      plays: 3456,
      uniquePlayers: 892,
      tokens: 2.1,
      avgScore: null,
      cooldown: 168,
      lastPlayed: '3 mins ago'
    },
    {
      id: 'quest-node-visitor',
      slug: 'node-visitor',
      title: 'Node Visitor',
      description: 'Complete tasks at a specific Zo node',
      status: 'active',
      type: 'special',
      difficulty: 'easy',
      plays: 1234,
      uniquePlayers: 567,
      tokens: 0.8,
      avgScore: null,
      cooldown: 0,
      lastPlayed: '10 mins ago'
    },
    {
      id: 'quest-social-butterfly',
      slug: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Connect with 3 other players at a Zo location',
      status: 'active',
      type: 'daily',
      difficulty: 'medium',
      plays: 2345,
      uniquePlayers: 1123,
      tokens: 0.5,
      avgScore: null,
      cooldown: 24,
      lastPlayed: '5 mins ago'
    },
    {
      id: 'quest-vibe-master',
      slug: 'vibe-master',
      title: 'Vibe Master',
      description: 'Attend 3 events in a single week',
      status: 'upcoming',
      type: 'weekly',
      difficulty: 'hard',
      plays: 0,
      uniquePlayers: 0,
      tokens: 0,
      avgScore: null,
      cooldown: 168,
      lastPlayed: 'Never'
    },
    {
      id: 'quest-pioneer',
      slug: 'pioneer',
      title: 'Pioneer',
      description: 'Be the first to visit a new Zo location',
      status: 'active',
      type: 'special',
      difficulty: 'expert',
      plays: 45,
      uniquePlayers: 45,
      tokens: 1.2,
      avgScore: null,
      cooldown: 0,
      lastPlayed: '1 day ago'
    },
    {
      id: 'quest-cafe-regular',
      slug: 'cafe-regular',
      title: 'Cafe Regular',
      description: 'Order from the cafe 5 times in a month',
      status: 'active',
      type: 'seasonal',
      difficulty: 'medium',
      plays: 456,
      uniquePlayers: 234,
      tokens: 0.9,
      avgScore: null,
      cooldown: 720,
      lastPlayed: '2 hours ago'
    },
  ];

  const filteredQuests = quests.filter(quest => {
    const matchesSearch = searchQuery === '' ||
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quest.status === statusFilter;
    const matchesType = typeFilter === 'all' || quest.type === typeFilter;
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
              placeholder="Search quests by name, slug, or description..."
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
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
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
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="special">Special</option>
              <option value="seasonal">Seasonal</option>
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

      {/* Quest Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
}

interface QuestCardProps {
  quest: {
    id: string;
    slug: string;
    title: string;
    description: string;
    status: string;
    type: string;
    difficulty: string;
    plays: number;
    uniquePlayers: number;
    tokens: number;
    avgScore: number | null;
    cooldown: number;
    lastPlayed: string;
  };
}

function QuestCard({ quest }: QuestCardProps) {
  const statusColors = {
    active: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    upcoming: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    completed: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
    draft: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const difficultyColors = {
    easy: 'text-[#9ae600]',
    medium: 'text-[#f0b100]',
    hard: 'text-[#fb2c36]',
    expert: 'text-[#d946ef]',
  };

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h4 className="text-lg mb-1">{quest.title}</h4>
            <p className="text-xs text-[#71717b]">/{quest.slug}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs border ${statusColors[quest.status as keyof typeof statusColors]}`}>
              {quest.status}
            </span>
            <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-[#9f9fa9]">{quest.description}</p>
      </div>

      {/* Meta */}
      <div className="p-4 border-b border-[#27272a]">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-[#18181b] rounded text-[#9f9fa9]">
            {quest.type}
          </span>
          <span className={`px-2 py-1 bg-[#18181b] rounded ${difficultyColors[quest.difficulty as keyof typeof difficultyColors]}`}>
            {quest.difficulty}
          </span>
          {quest.cooldown > 0 && (
            <span className="px-2 py-1 bg-[#18181b] rounded text-[#9f9fa9] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {quest.cooldown}h cooldown
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">Total Plays</div>
          <div className="text-xl">{quest.plays.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">Unique Players</div>
          <div className="text-xl">{quest.uniquePlayers.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">Tokens Distributed</div>
          <div className="text-xl text-[#9ae600]">{quest.tokens.toFixed(1)}M</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">
            {quest.avgScore !== null ? 'Avg Score' : 'Last Played'}
          </div>
          <div className="text-xl">
            {quest.avgScore !== null ? quest.avgScore : quest.lastPlayed}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#27272a] flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
          <Edit className="w-4 h-4" />
        </button>
        {quest.status === 'active' ? (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
            <Play className="w-4 h-4" />
          </button>
        )}
        <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors">
          <Archive className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Economy() {
  return (
    <div className="space-y-6">
      {/* Economy Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Total Circulation"
          value="5.2M"
          subtitle="Tokens distributed"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Avg per Citizen"
          value="1,234"
          subtitle="Tokens earned"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Weekly Inflation"
          value="+2.3%"
          subtitle="Token growth"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Target className="w-5 h-5" />}
          label="Gini Coefficient"
          value="0.42"
          subtitle="Healthy distribution"
          color="text-[#9ae600]"
        />
      </div>

      {/* Token Distribution by Quest Type */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Token Distribution by Quest Type</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Last 30 days</p>
        </div>
        <div className="p-4 space-y-3">
          <DistributionBar
            label="Mini Games"
            value={2.1}
            total={5.2}
            percentage={40}
            color="bg-[#9ae600]"
          />
          <DistributionBar
            label="Location Quests"
            value={1.8}
            total={5.2}
            percentage={35}
            color="bg-[#06b6d4]"
          />
          <DistributionBar
            label="Social Quests"
            value={0.8}
            total={5.2}
            percentage={15}
            color="bg-[#f0b100]"
          />
          <DistributionBar
            label="Progressive"
            value={0.5}
            total={5.2}
            percentage={10}
            color="bg-[#d946ef]"
          />
        </div>
      </div>

      {/* Top Earners */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h3 className="text-lg">Top Token Earners</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">All-time leaderboard</p>
          </div>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Rank</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">User</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Tokens Earned</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Quests Completed</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">City</th>
              </tr>
            </thead>
            <tbody>
              <TopEarnerRow rank={1} user="Rajesh Kumar" tokens={45678} quests={234} city="Bangalore" />
              <TopEarnerRow rank={2} user="Sarah Chen" tokens={42340} quests={189} city="San Francisco" />
              <TopEarnerRow rank={3} user="Mohammed Ali" tokens={38902} quests={156} city="Dubai" />
              <TopEarnerRow rank={4} user="Lisa Park" tokens={35221} quests={198} city="Singapore" />
              <TopEarnerRow rank={5} user="Tom Anderson" tokens={32567} quests={145} city="Waterford" />
            </tbody>
          </table>
        </div>
      </div>

      {/* Fraud Detection */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#fb2c36]" />
            Fraud Detection Alerts
          </h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Suspicious patterns detected</p>
        </div>
        <div className="p-4 space-y-3">
          <FraudAlert
            severity="high"
            user="user_abc123"
            issue="15 perfect scores in 2 hours"
            quest="Game 1111"
            time="4 hours ago"
          />
          <FraudAlert
            severity="medium"
            user="user_xyz789"
            issue="Token mismatch: client vs server"
            quest="City Explorer"
            time="6 hours ago"
          />
          <FraudAlert
            severity="low"
            user="user_def456"
            issue="Rapid quest completions"
            quest="Daily Check-in"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  );
}

function Citizens() {
  return (
    <div className="space-y-6">
      {/* Search User */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
          <input
            type="text"
            placeholder="Search by user ID, wallet address, or name..."
            className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
          />
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Users"
          value="4,234"
          subtitle="Registered players"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          label="Active Today"
          value="892"
          subtitle="21% of total"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Trophy className="w-5 h-5" />}
          label="Quest Completers"
          value="3,456"
          subtitle="82% engagement"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Avg Tokens/User"
          value="1,234"
          subtitle="All-time"
          color="text-[#9ae600]"
        />
      </div>

      {/* Most Engaged Users */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Most Engaged Users</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">By unique quests completed</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">User</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Unique Quests</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Total Completions</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Tokens Earned</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">City</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <UserRow
                user="Rajesh Kumar"
                uniqueQuests={38}
                totalCompletions={234}
                tokens={45678}
                city="Bangalore"
              />
              <UserRow
                user="Sarah Chen"
                uniqueQuests={35}
                totalCompletions={189}
                tokens={42340}
                city="San Francisco"
              />
              <UserRow
                user="Mohammed Ali"
                uniqueQuests={32}
                totalCompletions={156}
                tokens={38902}
                city="Dubai"
              />
              <UserRow
                user="Lisa Park"
                uniqueQuests={31}
                totalCompletions={198}
                tokens={35221}
                city="Singapore"
              />
              <UserRow
                user="Tom Anderson"
                uniqueQuests={28}
                totalCompletions={145}
                tokens={32567}
                city="Waterford"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* User Actions Panel */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">User Support Actions</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Manual intervention tools</p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            icon={<Coins className="w-5 h-5" />}
            title="Award Tokens"
            description="Manually award tokens to a user"
          />
          <ActionButton
            icon={<Clock className="w-5 h-5" />}
            title="Reset Cooldown"
            description="Allow user to replay immediately"
          />
          <ActionButton
            icon={<Trophy className="w-5 h-5" />}
            title="Complete Quest"
            description="Manually complete quest for user"
          />
          <ActionButton
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Ban/Suspend User"
            description="Restrict user access"
          />
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

interface CategoryCardProps {
  title: string;
  count: number;
  completions: number;
  color: string;
  iconColor: string;
}

function CategoryCard({ title, count, completions, color, iconColor }: CategoryCardProps) {
  return (
    <div className={`border rounded-lg p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm">{title}</h4>
        <Target className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className={`text-2xl mb-1 ${iconColor}`}>{count}</div>
      <div className="text-xs text-[#9f9fa9]">{completions} completions today</div>
    </div>
  );
}

interface TopQuestRowProps {
  title: string;
  slug: string;
  plays: number;
  uniquePlayers: number;
  tokens: number;
  trend: string;
}

function TopQuestRow({ title, slug, plays, uniquePlayers, tokens, trend }: TopQuestRowProps) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded hover:bg-[#27272a] transition-colors">
      <div className="flex-1">
        <div className="text-sm mb-1">{title}</div>
        <div className="text-xs text-[#71717b]">/{slug}</div>
      </div>
      <div className="text-right">
        <div className="text-sm">{plays} plays</div>
        <div className="text-xs text-[#9f9fa9]">{uniquePlayers} players</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-[#9ae600]">{tokens.toLocaleString()} tokens</div>
        <div className={`text-xs ${isPositive ? 'text-[#9ae600]' : 'text-[#fb2c36]'}`}>{trend}</div>
      </div>
    </div>
  );
}

interface AlertItemProps {
  type: 'success' | 'warning' | 'critical' | 'info';
  message: string;
  time: string;
}

function AlertItem({ type, message, time }: AlertItemProps) {
  const colors = {
    success: 'border-[#9ae600]/30 bg-[#9ae600]/10',
    warning: 'border-[#f0b100]/30 bg-[#f0b100]/10',
    critical: 'border-[#fb2c36]/30 bg-[#fb2c36]/10',
    info: 'border-[#06b6d4]/30 bg-[#06b6d4]/10',
  };

  const icons = {
    success: <Trophy className="w-4 h-4 text-[#9ae600]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#f0b100]" />,
    critical: <AlertTriangle className="w-4 h-4 text-[#fb2c36]" />,
    info: <Zap className="w-4 h-4 text-[#06b6d4]" />,
  };

  return (
    <div className={`border rounded p-3 ${colors[type]}`}>
      <div className="flex items-start gap-2">
        {icons[type]}
        <div className="flex-1">
          <div className="text-sm">{message}</div>
          <div className="text-xs text-[#9f9fa9] mt-1">{time}</div>
        </div>
      </div>
    </div>
  );
}

interface RecentActivityRowProps {
  user: string;
  quest: string;
  score: number | null;
  tokens: number;
  location: string;
  time: string;
}

function RecentActivityRow({ user, quest, score, tokens, location, time }: RecentActivityRowProps) {
  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm mb-1">{user} completed <span className="text-[#9ae600]">{quest}</span></div>
          <div className="text-xs text-[#9f9fa9] flex items-center gap-3">
            {score !== null && <span>Score: {score}</span>}
            <span className="flex items-center gap-1">
              <Coins className="w-3 h-3" />
              {tokens} tokens
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DistributionBarProps {
  label: string;
  value: number;
  total: number;
  percentage: number;
  color: string;
}

function DistributionBar({ label, value, total, percentage, color }: DistributionBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-[#9f9fa9]">{value}M tokens ({percentage}%)</span>
      </div>
      <div className="w-full bg-[#18181b] rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface TopEarnerRowProps {
  rank: number;
  user: string;
  tokens: number;
  quests: number;
  city: string;
}

function TopEarnerRow({ rank, user, tokens, quests, city }: TopEarnerRowProps) {
  const medalColors = {
    1: 'text-[#f0b100]',
    2: 'text-[#71717b]',
    3: 'text-[#fb9062]',
  };

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3">
        <span className={`text-sm ${rank <= 3 ? medalColors[rank as keyof typeof medalColors] : ''}`}>
          #{rank}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">{user}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{tokens.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm">{quests}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{city}</td>
    </tr>
  );
}

interface FraudAlertProps {
  severity: 'high' | 'medium' | 'low';
  user: string;
  issue: string;
  quest: string;
  time: string;
}

function FraudAlert({ severity, user, issue, quest, time }: FraudAlertProps) {
  const colors = {
    high: 'border-[#fb2c36]/30 bg-[#fb2c36]/10',
    medium: 'border-[#f0b100]/30 bg-[#f0b100]/10',
    low: 'border-[#71717b]/30 bg-[#71717b]/10',
  };

  return (
    <div className={`border rounded p-3 ${colors[severity]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 bg-black/30 rounded uppercase">{severity}</span>
            <span className="text-sm">{user}</span>
          </div>
          <div className="text-sm mb-1">{issue}</div>
          <div className="text-xs text-[#9f9fa9]">Quest: {quest} • {time}</div>
        </div>
        <button className="px-3 py-1 bg-black/30 rounded text-xs hover:bg-black/50 transition-colors">
          Investigate
        </button>
      </div>
    </div>
  );
}

interface UserRowProps {
  user: string;
  uniqueQuests: number;
  totalCompletions: number;
  tokens: number;
  city: string;
}

function UserRow({ user, uniqueQuests, totalCompletions, tokens, city }: UserRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{user}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{uniqueQuests}</td>
      <td className="px-4 py-3 text-sm">{totalCompletions}</td>
      <td className="px-4 py-3 text-sm">{tokens.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-[#9f9fa9]">{city}</td>
      <td className="px-4 py-3">
        <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ActionButton({ icon, title, description }: ActionButtonProps) {
  return (
    <button className="flex items-start gap-3 p-4 bg-[#18181b] border border-[#27272a] rounded hover:border-[#9ae600] transition-colors text-left">
      <div className="p-2 bg-[#27272a] rounded text-[#9ae600]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm mb-1">{title}</div>
        <div className="text-xs text-[#9f9fa9]">{description}</div>
      </div>
    </button>
  );
}
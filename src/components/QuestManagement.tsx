import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Play, Pause, Archive, TrendingUp, Users, Coins, AlertTriangle, Download, Eye, MoreVertical, ChevronDown, Calendar, MapPin, Trophy, Zap, Clock, Target, Loader2, X as XIcon } from 'lucide-react';
import { 
  useQuests, 
  useQuestStats, 
  useCompletedQuests,
  useLeaderboard,
  useCreateQuest, 
  useUpdateQuest, 
  useDeleteQuest,
  useTopQuestsToday,
  useRecentCompletionsWithUsers,
  useEconomyStats,
  useCitizenStats,
  questCategoryInfo,
  questDifficultyInfo,
  QuestInput 
} from '../hooks/useSupabaseData';

interface QuestManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

// Quest categories and difficulties
const QUEST_CATEGORIES = ['daily', 'weekly', 'special', 'seasonal', 'progressive', 'location', 'social', 'minigame'] as const;
const QUEST_DIFFICULTIES = ['easy', 'medium', 'hard', 'expert'] as const;
const QUEST_STATUSES = ['active', 'draft', 'upcoming', 'completed', 'archived'] as const;

export function QuestManagement({ selectedProperty, onPropertyChange }: QuestManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'quests' | 'economy' | 'citizens'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [editingQuest, setEditingQuest] = useState<QuestInput | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddQuest = () => {
    setEditingQuest(null);
    setShowQuestModal(true);
  };

  const handleEditQuest = (quest: QuestInput) => {
    setEditingQuest(quest);
    setShowQuestModal(true);
  };

  const handleCloseModal = () => {
    setShowQuestModal(false);
    setEditingQuest(null);
  };

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} onAddQuest={handleAddQuest} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'quests' && (
            <QuestList 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
              statusFilter={statusFilter} 
              onStatusFilterChange={setStatusFilter} 
              categoryFilter={categoryFilter} 
              onCategoryFilterChange={setCategoryFilter}
              onEditQuest={handleEditQuest}
              onDeleteQuest={(id) => setShowDeleteConfirm(id)}
            />
          )}
          {activeView === 'economy' && <Economy />}
          {activeView === 'citizens' && <Citizens />}
        </div>
      </main>

      {/* Quest Create/Edit Modal */}
      {showQuestModal && (
        <QuestModal 
          quest={editingQuest} 
          onClose={handleCloseModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          questId={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(null)}
        />
      )}
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'quests' | 'economy' | 'citizens';
  onViewChange: (view: 'overview' | 'quests' | 'economy' | 'citizens') => void;
  onAddQuest: () => void;
}

function Header({ activeView, onViewChange, onAddQuest }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Quest Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage quests, monitor economy, and analyze player engagement</p>
        </div>
        
        <button 
          onClick={onAddQuest}
          className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center"
        >
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
  const { data: stats, isLoading, error } = useQuestStats();
  const { data: topQuests, isLoading: topQuestsLoading } = useTopQuestsToday(5);
  const { data: recentCompletions, isLoading: recentLoading } = useRecentCompletionsWithUsers(5);
  const { data: economyStats } = useEconomyStats();

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
        <p className="text-red-400">Failed to load quest data</p>
      </div>
    );
  }

  const categoryEntries = Object.entries(stats?.categoryCount || {});

  // Format large numbers
  const formatTokens = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  };

  // Generate dynamic alerts based on data
  const generateAlerts = () => {
    const alerts: { type: 'success' | 'warning' | 'critical' | 'info'; message: string; time: string }[] = [];
    
    // Check for low completion rates on quests
    if (topQuests && topQuests.length > 0) {
      topQuests.forEach(q => {
        if (q.plays > 0 && q.uniquePlayers > 0) {
          const completionRate = Math.round((q.uniquePlayers / q.plays) * 100);
          if (completionRate < 20) {
            alerts.push({
              type: 'warning',
              message: `${q.title} - Low completion rate (${completionRate}%)`,
              time: 'Today'
            });
          }
        }
      });
    }

    // Check for milestone completions
    if (stats?.totalCompletions && stats.totalCompletions > 0) {
      const milestones = [100, 500, 1000, 5000, 10000];
      const nearestMilestone = milestones.find(m => stats.totalCompletions >= m);
      if (nearestMilestone) {
        alerts.push({
          type: 'success',
          message: `Total completions reached ${nearestMilestone.toLocaleString()}!`,
          time: 'All time'
        });
      }
    }

    // Economy health alert
    if (economyStats?.giniCoefficient) {
      if (economyStats.giniCoefficient > 0.6) {
        alerts.push({
          type: 'warning',
          message: `High wealth inequality (Gini: ${economyStats.giniCoefficient})`,
          time: 'Current'
        });
      }
    }

    // Info about system status
    alerts.push({
      type: 'info',
      message: `${stats?.activeQuests || 0} active quests available`,
      time: 'Now'
    });

    return alerts.slice(0, 4);
  };

  const dynamicAlerts = generateAlerts();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Target className="w-5 h-5" />}
          label="Total Quests"
          value={String(stats?.totalQuests || 0)}
          subtitle={`${stats?.activeQuests || 0} active, ${stats?.draftQuests || 0} draft`}
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Trophy className="w-5 h-5" />}
          label="Total Completions"
          value={stats?.totalCompletions?.toLocaleString() || '0'}
          subtitle="All time"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Total Rewards"
          value={formatTokens(stats?.totalRewards || 0)}
          subtitle="Tokens distributed"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Categories"
          value={String(categoryEntries.length)}
          subtitle="Quest types"
          color="text-[#06b6d4]"
        />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {categoryEntries.slice(0, 3).map(([category, count]) => {
          const catInfo = questCategoryInfo[category] || { label: category, color: 'text-[#9f9fa9]', bgColor: 'bg-[#9f9fa9]' };
          const completionsToday = stats?.categoryCompletionsToday?.[category] || 0;
          return (
            <CategoryCard
              key={category}
              title={`${catInfo.label} Quests`}
              count={count}
              completions={completionsToday}
              color={`${catInfo.bgColor}/10 border-${catInfo.bgColor.replace('bg-', '')}/30`}
              iconColor={catInfo.color}
            />
          );
        })}
        {categoryEntries.length === 0 && (
          <div className="col-span-3 p-8 text-center text-[#9f9fa9]">
            No quest categories found. Create your first quest!
          </div>
        )}
      </div>

      {/* Top Quests */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top Quests (Today)</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Most played quests in the last 24 hours</p>
        </div>
        <div className="p-4 space-y-3">
          {topQuestsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#9ae600]" />
            </div>
          ) : topQuests && topQuests.length > 0 ? (
            topQuests.map((quest) => (
              <TopQuestRow
                key={quest.questId}
                title={quest.title}
                slug={quest.slug}
                plays={quest.plays}
                uniquePlayers={quest.uniquePlayers}
                tokens={quest.tokens}
                trend={quest.trend}
              />
            ))
          ) : (
            <div className="text-center py-8 text-[#9f9fa9]">
              No quest completions in the last 24 hours
            </div>
          )}
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
              <span className="text-sm text-[#9f9fa9]">Total Zo Points</span>
              <span className="text-lg">{formatTokens(economyStats?.totalZoPoints || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Quest Rewards Distributed</span>
              <span className="text-lg">{formatTokens(economyStats?.totalDistributed || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Avg per Citizen</span>
              <span className="text-lg">{(economyStats?.avgPerCitizen || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#9f9fa9]">Gini Coefficient</span>
              <span className={`text-lg ${economyStats?.giniCoefficient && economyStats.giniCoefficient <= 0.5 ? 'text-[#9ae600]' : 'text-[#f0b100]'}`}>
                {economyStats?.giniCoefficient?.toFixed(2) || '0.00'} ({economyStats?.giniLabel || 'N/A'})
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Alerts & Notifications</h3>
          </div>
          <div className="p-4 space-y-3">
            {dynamicAlerts.length > 0 ? (
              dynamicAlerts.map((alert, idx) => (
                <AlertItem
                  key={idx}
                  type={alert.type}
                  message={alert.message}
                  time={alert.time}
                />
              ))
            ) : (
              <div className="text-center py-4 text-[#9f9fa9]">
                No alerts at this time
              </div>
            )}
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
          {recentLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#9ae600]" />
            </div>
          ) : recentCompletions && recentCompletions.length > 0 ? (
            recentCompletions.map((completion) => (
              <RecentActivityRow
                key={completion.id}
                user={completion.userName}
                quest={completion.questTitle}
                score={completion.score}
                tokens={completion.tokens}
                location={completion.location}
                time={completion.timeAgo}
              />
            ))
          ) : (
            <div className="p-4 text-center text-[#9f9fa9]">
              No recent completions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuestListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  onEditQuest: (quest: QuestInput) => void;
  onDeleteQuest: (id: string) => void;
}

function QuestList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, categoryFilter, onCategoryFilterChange, onEditQuest, onDeleteQuest }: QuestListProps) {
  const { data: rawQuests, isLoading } = useQuests();
  const { data: stats } = useQuestStats();

  // Transform Supabase quests to display format
  const quests = (rawQuests || []).map((quest: any) => {
    const completionStats = stats?.questCompletions?.[quest.id] || { count: 0, uniquePlayers: 0, totalRewards: 0, totalScore: 0 };
    
    return {
      id: quest.id,
      slug: quest.slug || '',
      title: quest.title || 'Untitled Quest',
      description: quest.description || 'No description',
      status: quest.status || 'draft',
      category: quest.category || 'uncategorized',
      difficulty: quest.difficulty || 'medium',
      plays: completionStats.count,
      uniquePlayers: completionStats.uniquePlayers,
      tokens: completionStats.totalRewards, // Raw token value
      avgScore: completionStats.count > 0 ? Math.round(completionStats.totalScore / completionStats.count) : null,
      cooldown: quest.cooldown_hours || 0,
      maxCompletions: quest.max_completions,
      reward: quest.reward,
      requirements: quest.requirements,
      activeFrom: quest.active_from,
      activeUntil: quest.active_until,
      createdAt: quest.created_at,
      updatedAt: quest.updated_at,
    };
  });

  // Get unique categories from data
  const uniqueCategories = [...new Set(quests.map((q: any) => q.category))].filter(Boolean);

  const filteredQuests = quests.filter((quest: any) => {
    const matchesSearch = searchQuery === '' ||
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quest.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || quest.category === categoryFilter;
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
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Status</option>
              {QUEST_STATUSES.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Categories ({uniqueCategories.length})</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>
                  {questCategoryInfo[cat]?.label || cat}
                </option>
              ))}
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
      ) : filteredQuests.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-[#27272a] mx-auto mb-4" />
          <p className="text-[#9f9fa9]">No quests found</p>
          <p className="text-xs text-[#71717b] mt-1">Create your first quest to get started</p>
        </div>
      ) : (
        <>
          <div className="text-xs text-[#9f9fa9] px-1">
            Showing {filteredQuests.length} of {quests.length} quests
          </div>
          {/* Quest Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredQuests.map((quest: any) => (
              <QuestCard 
                key={quest.id} 
                quest={quest}
                onEdit={() => onEditQuest({
                  id: quest.id,
                  title: quest.title,
                  slug: quest.slug,
                  description: quest.description,
                  category: quest.category,
                  difficulty: quest.difficulty,
                  reward: quest.reward,
                  status: quest.status,
                  cooldown_hours: quest.cooldown,
                  max_completions: quest.maxCompletions,
                  active_from: quest.activeFrom,
                  active_until: quest.activeUntil,
                })}
                onDelete={() => onDeleteQuest(quest.id)}
              />
            ))}
          </div>
        </>
      )}
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
    category: string;
    difficulty: string;
    plays: number;
    uniquePlayers: number;
    tokens: number;
    avgScore: number | null;
    cooldown: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

function QuestCard({ quest, onEdit, onDelete }: QuestCardProps) {
  const statusColors: Record<string, string> = {
    active: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    upcoming: 'bg-[#f0b100]/10 text-[#f0b100] border-[#f0b100]/30',
    completed: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
    draft: 'bg-[#27272a]/50 text-[#9f9fa9] border-[#27272a]',
    archived: 'bg-[#71717b]/10 text-[#71717b] border-[#71717b]/30',
  };

  const categoryInfo = questCategoryInfo[quest.category] || { label: quest.category, color: 'text-[#9f9fa9]', bgColor: 'bg-[#9f9fa9]' };
  const difficultyInfo = questDifficultyInfo[quest.difficulty] || { label: quest.difficulty, color: 'text-[#9f9fa9]' };

  // Format token numbers smartly
  const formatTokens = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
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
          <span className={`px-2 py-1 rounded ${categoryInfo.bgColor}/10 ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
          <span className={`px-2 py-1 bg-[#18181b] rounded ${difficultyInfo.color}`}>
            {difficultyInfo.label}
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
          <div className="text-xl text-[#9ae600]">{formatTokens(quest.tokens)}</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">
            {quest.avgScore !== null ? 'Avg Score' : 'Status'}
          </div>
          <div className="text-xl">
            {quest.avgScore !== null ? quest.avgScore : '-'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#27272a] flex items-center gap-2">
        <button 
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Quest
        </button>
        <button 
          onClick={onEdit}
          className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
        {quest.status === 'active' ? (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Pause">
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button className="p-2 bg-[#18181b] hover:bg-[#27272a] rounded transition-colors" title="Activate">
            <Play className="w-4 h-4" />
          </button>
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

function Economy() {
  const { data: economyStats, isLoading } = useEconomyStats();
  const { data: citizenStats } = useCitizenStats(10);

  // Format large numbers
  const formatTokens = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  };

  // Category colors for distribution bars
  const categoryColors: Record<string, string> = {
    daily: 'bg-[#9ae600]',
    weekly: 'bg-[#06b6d4]',
    special: 'bg-[#f0b100]',
    seasonal: 'bg-[#d946ef]',
    progressive: 'bg-[#E91E63]',
    location: 'bg-[#4A90E2]',
    social: 'bg-[#9B59B6]',
    minigame: 'bg-[#FF9800]',
    uncategorized: 'bg-[#71717b]',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Economy Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Total Zo Points"
          value={formatTokens(economyStats?.totalZoPoints || 0)}
          subtitle={`Held by ${economyStats?.leaderboardEntries || 0} users`}
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Trophy className="w-5 h-5" />}
          label="Quest Rewards"
          value={formatTokens(economyStats?.totalDistributed || 0)}
          subtitle="Tokens from quests"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Avg per Citizen"
          value={(economyStats?.avgPerCitizen || 0).toLocaleString()}
          subtitle={`${economyStats?.totalUsers || 0} total users`}
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Target className="w-5 h-5" />}
          label="Gini Coefficient"
          value={economyStats?.giniCoefficient?.toFixed(2) || '0.00'}
          subtitle={economyStats?.giniLabel || 'N/A'}
          color={economyStats?.giniCoefficient && economyStats.giniCoefficient <= 0.5 ? 'text-[#9ae600]' : 'text-[#f0b100]'}
        />
      </div>

      {/* Token Distribution by Quest Type */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Token Distribution by Quest Type</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">
            Total distributed: {formatTokens(economyStats?.totalDistributed || 0)} tokens
          </p>
        </div>
        <div className="p-4 space-y-3">
          {economyStats?.distribution && economyStats.distribution.length > 0 ? (
            economyStats.distribution.slice(0, 5).map((dist) => (
              <DistributionBar
                key={dist.category}
                label={dist.label}
                value={dist.amount}
                total={economyStats.totalDistributed}
                percentage={dist.percentage}
                color={categoryColors[dist.category] || 'bg-[#71717b]'}
              />
            ))
          ) : (
            <div className="text-center py-4 text-[#9f9fa9]">
              No distribution data available
            </div>
          )}
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
              {citizenStats?.citizens && citizenStats.citizens.length > 0 ? (
                citizenStats.citizens.slice(0, 5).map((citizen, idx) => (
                  <TopEarnerRow
                    key={citizen.userId}
                    rank={idx + 1}
                    user={citizen.name}
                    tokens={citizen.tokens}
                    quests={citizen.questsCompleted}
                    city={citizen.city}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#9f9fa9]">
                    No leaderboard data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fraud Detection - Keep as placeholder since fraud detection would need specific logic */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#fb2c36]" />
            Fraud Detection Alerts
          </h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Suspicious patterns detected</p>
        </div>
        <div className="p-4 space-y-3">
          {/* Fraud detection would require more sophisticated analysis - keeping as placeholder */}
          <div className="text-center py-4 text-[#9f9fa9]">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-[#27272a]" />
            No suspicious activity detected
          </div>
        </div>
      </div>
    </div>
  );
}

function Citizens() {
  const { data: citizenStats, isLoading } = useCitizenStats(50);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter citizens based on search
  const filteredCitizens = (citizenStats?.citizens || []).filter(citizen => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return citizen.name.toLowerCase().includes(query) || 
           citizen.city.toLowerCase().includes(query) ||
           citizen.userId?.toLowerCase().includes(query);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#9ae600]" />
      </div>
    );
  }

  const engagementRate = citizenStats?.totalUsers && citizenStats.totalUsers > 0
    ? Math.round((citizenStats.questCompleters / citizenStats.totalUsers) * 100)
    : 0;

  const activeRate = citizenStats?.totalUsers && citizenStats.totalUsers > 0
    ? Math.round((citizenStats.activeToday / citizenStats.totalUsers) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Search User */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
          <input
            type="text"
            placeholder="Search by user ID, wallet address, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
          />
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Users"
          value={(citizenStats?.totalUsers || 0).toLocaleString()}
          subtitle="Registered players"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          label="Active Today"
          value={(citizenStats?.activeToday || 0).toLocaleString()}
          subtitle={`${activeRate}% of total`}
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Trophy className="w-5 h-5" />}
          label="Quest Completers"
          value={(citizenStats?.questCompleters || 0).toLocaleString()}
          subtitle={`${engagementRate}% engagement`}
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<Coins className="w-5 h-5" />}
          label="Avg Tokens/User"
          value={(citizenStats?.avgTokensPerUser || 0).toLocaleString()}
          subtitle="All-time"
          color="text-[#9ae600]"
        />
      </div>

      {/* Most Engaged Users */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Most Engaged Users</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">
            {searchQuery 
              ? `Showing ${filteredCitizens.length} results for "${searchQuery}"`
              : 'By total tokens earned'
            }
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">User</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Quests Completed</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Tokens Earned</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">City</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitizens.length > 0 ? (
                filteredCitizens.slice(0, 10).map((citizen) => (
                  <UserRow
                    key={citizen.userId}
                    user={citizen.name}
                    questsCompleted={citizen.questsCompleted}
                    tokens={citizen.tokens}
                    city={citizen.city}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#9f9fa9]">
                    {searchQuery ? 'No users found matching your search' : 'No user data available'}
                  </td>
                </tr>
              )}
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
  // Smart token formatting
  const formatValue = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-[#9f9fa9]">{formatValue(value)} tokens ({percentage}%)</span>
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
  questsCompleted: number;
  tokens: number;
  city: string;
}

function UserRow({ user, questsCompleted, tokens, city }: UserRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{user}</td>
      <td className="px-4 py-3 text-sm text-[#9ae600]">{questsCompleted}</td>
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

// ===========================================
// QUEST CREATE/EDIT MODAL
// ===========================================

interface QuestModalProps {
  quest: QuestInput | null;
  onClose: () => void;
}

function QuestModal({ quest, onClose }: QuestModalProps) {
  const isEditing = !!quest?.id;
  const createQuest = useCreateQuest();
  const updateQuest = useUpdateQuest();

  const [formData, setFormData] = useState<QuestInput>({
    title: quest?.title || '',
    slug: quest?.slug || '',
    description: quest?.description || '',
    category: quest?.category || 'daily',
    difficulty: quest?.difficulty || 'medium',
    reward: quest?.reward || '',
    status: quest?.status || 'draft',
    cooldown_hours: quest?.cooldown_hours || 0,
    max_completions: quest?.max_completions || undefined,
    active_from: quest?.active_from || '',
    active_until: quest?.active_until || '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof QuestInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Auto-generate slug from title if not editing
    if (field === 'title' && !isEditing && !formData.slug) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title?.trim()) {
      setError('Quest title is required');
      return;
    }

    try {
      if (isEditing && quest?.id) {
        await updateQuest.mutateAsync({ ...formData, id: quest.id });
      } else {
        await createQuest.mutateAsync(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save quest');
    }
  };

  const isLoading = createQuest.isPending || updateQuest.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between sticky top-0 bg-[#09090b]">
          <div>
            <h2 className="text-lg">{isEditing ? 'Edit Quest' : 'Create New Quest'}</h2>
            <p className="text-xs text-[#9f9fa9] mt-1">
              {isEditing ? 'Update quest configuration' : 'Define a new quest for players'}
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
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Quest Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Daily Check-in"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="daily-checkin"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="What do players need to do?"
              rows={3}
              className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600] resize-none"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              >
                {QUEST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {questCategoryInfo[cat]?.label || cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              >
                {QUEST_DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {questDifficultyInfo[diff]?.label || diff}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              >
                {QUEST_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reward */}
          <div>
            <label className="block text-xs text-[#9f9fa9] mb-1.5">Reward Description</label>
            <input
              type="text"
              value={formData.reward}
              onChange={(e) => handleChange('reward', e.target.value)}
              placeholder="e.g. 100 Zo Points"
              className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Cooldown & Max Completions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Cooldown (hours)</label>
              <input
                type="number"
                min="0"
                value={formData.cooldown_hours || ''}
                onChange={(e) => handleChange('cooldown_hours', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="0 = no cooldown"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Max Completions</label>
              <input
                type="number"
                min="1"
                value={formData.max_completions || ''}
                onChange={(e) => handleChange('max_completions', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Unlimited"
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Active From</label>
              <input
                type="datetime-local"
                value={formData.active_from?.slice(0, 16) || ''}
                onChange={(e) => handleChange('active_from', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9f9fa9] mb-1.5">Active Until</label>
              <input
                type="datetime-local"
                value={formData.active_until?.slice(0, 16) || ''}
                onChange={(e) => handleChange('active_until', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm focus:outline-none focus:border-[#9ae600]"
              />
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
              {isEditing ? 'Update Quest' : 'Create Quest'}
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
  questId: string;
  onClose: () => void;
}

function DeleteConfirmModal({ questId, onClose }: DeleteConfirmModalProps) {
  const deleteQuest = useDeleteQuest();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteQuest.mutateAsync(questId);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete quest');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg w-full max-w-md">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg mb-2">Delete Quest?</h3>
          <p className="text-sm text-[#9f9fa9] mb-4">
            Are you sure you want to delete this quest? This will also remove all completion records. This action cannot be undone.
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
              disabled={deleteQuest.isPending}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {deleteQuest.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
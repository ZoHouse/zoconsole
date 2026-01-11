import { Mail, Users, TrendingUp, Eye, Plus, Search, Filter, Edit, Trash2, MessageCircle, Share2, UserPlus, PhoneCall, Calendar, ChevronDown, Play, Pause, Copy, Download, AlertTriangle, CheckCircle, Clock, Target, Zap, BarChart3, Image as ImageIcon, Video, Layers, DollarSign, MousePointerClick, ThumbsUp, ArrowRight, Settings } from 'lucide-react';
import { useState } from 'react';

interface MarketingProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

type MarketingTab = 'overview' | 'campaigns' | 'creatives' | 'audiences' | 'conversions' | 'rules';
type DateFilter = 'last-7-days' | 'last-30-days' | 'this-month' | 'last-month' | 'custom';
type NodeFilter = 'all' | 'koramangala' | 'whitefield';
type StatusFilter = 'all' | 'active' | 'paused' | 'completed';

export function Marketing({ selectedProperty, onPropertyChange }: MarketingProps) {
  const [activeTab, setActiveTab] = useState<MarketingTab>('overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('last-7-days');
  const [nodeFilter, setNodeFilter] = useState<NodeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');

  return (
    <>
      <Header />
      
      {/* Marketing Sub-Tabs */}
      <div className="border-b border-[#27272a] px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-2 py-3">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<BarChart3 className="w-4 h-4" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'campaigns'}
            onClick={() => setActiveTab('campaigns')}
            icon={<Target className="w-4 h-4" />}
            label="Campaigns"
          />
          <TabButton
            active={activeTab === 'creatives'}
            onClick={() => setActiveTab('creatives')}
            icon={<ImageIcon className="w-4 h-4" />}
            label="Creatives"
          />
          <TabButton
            active={activeTab === 'audiences'}
            onClick={() => setActiveTab('audiences')}
            icon={<Users className="w-4 h-4" />}
            label="Audiences"
          />
          <TabButton
            active={activeTab === 'conversions'}
            onClick={() => setActiveTab('conversions')}
            icon={<MessageCircle className="w-4 h-4" />}
            label="Conversions"
          />
          <TabButton
            active={activeTab === 'rules'}
            onClick={() => setActiveTab('rules')}
            icon={<Zap className="w-4 h-4" />}
            label="Rules"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-[#27272a] px-4 sm:px-6 py-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>

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
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'creatives' && <CreativesTab />}
          {activeTab === 'audiences' && <AudiencesTab />}
          {activeTab === 'conversions' && <ConversionsTab />}
          {activeTab === 'rules' && <RulesTab />}
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
          <h1 className="text-xl sm:text-2xl">Marketing</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Meta Ads → WhatsApp → Booking funnel tracking</p>
        </div>
        
        <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors whitespace-nowrap flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Campaign
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
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Total Ad Spend"
          value="₹2.4L"
          subtitle="This month"
          icon={<DollarSign className="w-5 h-5" />}
          color="bg-[#fb2c36]/10"
          iconColor="text-[#fb2c36]"
        />
        <MetricCard
          label="Total Leads"
          value="342"
          subtitle="WhatsApp opens"
          icon={<MessageCircle className="w-5 h-5" />}
          color="bg-[#9ae600]/10"
          iconColor="text-[#9ae600]"
        />
        <MetricCard
          label="Average CPA"
          value="₹702"
          subtitle="Cost per lead"
          icon={<Target className="w-5 h-5" />}
          color="bg-[#06b6d4]/10"
          iconColor="text-[#06b6d4]"
        />
        <MetricCard
          label="Conversion Rate"
          value="18.2%"
          subtitle="Leads → Bookings"
          icon={<TrendingUp className="w-5 h-5" />}
          color="bg-[#d946ef]/10"
          iconColor="text-[#d946ef]"
        />
      </div>

      {/* Funnel Overview */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-6">Conversion Funnel: Meta Ads → Booking</h3>
        <div className="space-y-4">
          <FunnelStage stage="Impressions" value="1.2M" percentage={100} next="12,450 clicks" rate="1.04% CTR" color="bg-[#9ae600]" />
          <FunnelStage stage="Clicks" value="12,450" percentage={1.04} next="524 opens" rate="4.2% click-to-open" color="bg-[#06b6d4]" />
          <FunnelStage stage="WhatsApp Opens" value="524" percentage={0.04} next="342 warm leads" rate="65% open-to-lead" color="bg-[#f0b100]" />
          <FunnelStage stage="Warm Leads" value="342" percentage={0.03} next="62 bookings" rate="18% lead-to-booking" color="bg-[#d946ef]" />
          <FunnelStage stage="Bookings" value="62" percentage={0.005} next="₹21.5L revenue" rate="ROAS 8.96x" color="bg-[#9ae600]" isFinal />
        </div>
      </div>

      {/* Performance by Product */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Performance by Product</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Which products are ads driving?</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Product</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Spend</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Leads</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">CPA</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Conv Rate</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">ROAS</th>
              </tr>
            </thead>
            <tbody>
              <ProductRow product="Accommodation" spend="₹1.8L" leads={245} cpa="₹735" convRate="22%" roas="9.2x" roasGood />
              <ProductRow product="Events" spend="₹0.4L" leads={45} cpa="₹890" convRate="29%" roas="11.5x" roasGood />
              <ProductRow product="Co-work" spend="₹0.15L" leads={38} cpa="₹625" convRate="18%" roas="6.8x" roasGood />
              <ProductRow product="Studio" spend="₹0.05L" leads={14} cpa="₹520" convRate="36%" roas="14.2x" roasGood />
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Top Performing Campaigns (by ROAS)</h3>
          <button className="text-sm text-[#9ae600] hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          <CampaignLeaderboardRow campaign="Flo-Zone-Remote" roas="12.4x" spend="₹45K" revenue="₹5.6L" status="active" rank={1} />
          <CampaignLeaderboardRow campaign="Koramangala-Rooms-March" roas="10.8x" spend="₹89K" revenue="₹9.6L" status="active" rank={2} />
          <CampaignLeaderboardRow campaign="Whitefield-Events-V2" roas="9.2x" spend="₹34K" revenue="₹3.1L" status="active" rank={3} />
          <CampaignLeaderboardRow campaign="Studio-Creators-Jan" roas="8.5x" spend="₹28K" revenue="₹2.4L" status="active" rank={4} />
          <CampaignLeaderboardRow campaign="Private-Rooms-Lookalike" roas="7.8x" spend="₹67K" revenue="₹5.2L" status="active" rank={5} />
        </div>
      </div>

      {/* Alerts & Recommendations */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Alerts & Recommendations</h3>
        <div className="space-y-3">
          <Alert
            type="error"
            title="High CPM Detected"
            message="Campaign 'Whitefield-Dorms-V2' has CPM of ₹850 (target: ₹400)"
            action="Pause Campaign"
          />
          <Alert
            type="warning"
            title="Creative Fatigue"
            message="Ad set 'K-Events-March' frequency at 5.2 (target: 2-4)"
            action="Add New Creative"
          />
          <Alert
            type="success"
            title="Scale Opportunity"
            message="Campaign 'Flo-Zone-Remote' ROAS 12.4x - consider increasing budget"
            action="Increase Budget +20%"
          />
        </div>
      </div>
    </div>
  );
}

// CAMPAIGNS TAB
function CampaignsTab() {
  return (
    <div className="space-y-6">
      {/* Campaign Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search campaigns
          </button>
          <button className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors">
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-3 text-xs text-[#9f9fa9]">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left p-3 text-xs text-[#9f9fa9]">Campaign</th>
                <th className="text-left p-3 text-xs text-[#9f9fa9]">Status</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">Budget</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">Spend</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">CPM</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">CTR</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">Leads</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">CPA</th>
                <th className="text-right p-3 text-xs text-[#9f9fa9]">ROAS</th>
                <th className="text-left p-3 text-xs text-[#9f9fa9]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <CampaignRow
                name="Koramangala-Rooms-March"
                status="active"
                budget="₹50K/mo"
                spend="₹42.3K"
                cpm="₹148"
                ctr="1.2%"
                leads={89}
                cpa="₹475"
                roas="18.2x"
              />
              <CampaignRow
                name="Flo-Zone-Remote"
                status="active"
                budget="₹30K/mo"
                spend="₹28.5K"
                cpm="₹165"
                ctr="1.8%"
                leads={52}
                cpa="₹548"
                roas="12.4x"
              />
              <CampaignRow
                name="Whitefield-Dorms-V2"
                status="paused"
                budget="₹40K/mo"
                spend="₹35.2K"
                cpm="₹850"
                ctr="0.6%"
                leads={28}
                cpa="₹1,257"
                roas="3.2x"
                alert
              />
              <CampaignRow
                name="Private-Rooms-Lookalike"
                status="active"
                budget="₹60K/mo"
                spend="₹58.9K"
                cpm="₹182"
                ctr="1.4%"
                leads={124}
                cpa="₹475"
                roas="9.8x"
              />
              <CampaignRow
                name="Events-March-Promo"
                status="active"
                budget="₹25K/mo"
                spend="₹22.1K"
                cpm="₹225"
                ctr="1.1%"
                leads={34}
                cpa="₹650"
                roas="11.2x"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Detail Card (Expanded) */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg mb-1">Koramangala-Rooms-March</h3>
            <div className="flex items-center gap-3 text-sm text-[#9f9fa9]">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#9ae600] rounded-full"></div>
                Active
              </span>
              <span>•</span>
              <span>Objective: Traffic (WhatsApp)</span>
              <span>•</span>
              <span>Product: Accommodation</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors">
              Edit
            </button>
            <button className="px-3 py-1.5 bg-[#f0b100]/10 border border-[#f0b100]/30 text-[#f0b100] rounded text-sm hover:bg-[#f0b100]/20 transition-colors flex items-center gap-1">
              <Pause className="w-3 h-3" />
              Pause
            </button>
            <button className="px-3 py-1.5 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
              +20% Budget
            </button>
          </div>
        </div>

        {/* Performance Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <CampaignStat label="Spend" value="₹42.3K" subtitle="of ₹50K budget" />
          <CampaignStat label="Impressions" value="285K" />
          <CampaignStat label="Clicks" value="3,420" subtitle="1.2% CTR" />
          <CampaignStat label="CPM" value="₹148" good />
          <CampaignStat label="CPC" value="₹12.37" />
          <CampaignStat label="Leads" value="89" />
          <CampaignStat label="CPA" value="₹475" good />
          <CampaignStat label="ROAS" value="18.2x" good />
        </div>

        {/* Ad Sets */}
        <div className="border-t border-[#27272a] pt-6">
          <h4 className="text-sm mb-4">Ad Sets (2)</h4>
          <div className="space-y-3">
            <AdSetRow name="Private-Rooms-Lookalike" spend="₹28K" leads={54} cpa="₹518" status="active" />
            <AdSetRow name="Dorm-Interest-Targeting" spend="₹14.3K" leads={35} cpa="₹408" status="active" />
          </div>
        </div>
      </div>
    </div>
  );
}

// CREATIVES TAB
function CreativesTab() {
  return (
    <div className="space-y-6">
      {/* Creative Diversity Scorecard */}
      <div className="bg-gradient-to-r from-[#9ae600]/10 to-[#9ae600]/5 border border-[#9ae600]/30 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-[#9ae600]/20 rounded-lg">
            <Layers className="w-6 h-6 text-[#9ae600]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg mb-2">Creative Diversity Tracker</h3>
            <p className="text-sm text-[#9f9fa9]">Meta rewards diverse creatives to avoid ad cannibalization</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <DiversityMetric label="Message Variety" value="4 props" status="good" />
          <DiversityMetric label="Persona Targeting" value="3 personas" status="good" />
          <DiversityMetric label="Emotional Tone" value="2 tones" status="warning" subtitle="Add more" />
          <DiversityMetric label="Media Format" value="Video 60%" status="good" />
          <DiversityMetric label="Visual Style" value="Lo-fi 40%" status="good" />
          <DiversityMetric label="Frameworks" value="PAS, AIDA" status="good" />
        </div>
      </div>

      {/* Creative Performance Grid */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg">Active Creatives (12)</h3>
          <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Creative
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <CreativeCard
            name="Private-Room-Tour-V3"
            format="Video"
            hookRate={38}
            holdRate={22}
            ctr={1.8}
            cpa={425}
            status="performing"
          />
          <CreativeCard
            name="Cowork-Lifestyle-1"
            format="Video"
            hookRate={42}
            holdRate={28}
            ctr={2.1}
            cpa={380}
            status="performing"
          />
          <CreativeCard
            name="Event-Space-Static"
            format="Image"
            hookRate={0}
            holdRate={0}
            ctr={0.9}
            cpa={720}
            status="learning"
          />
          <CreativeCard
            name="Dorm-Life-Carousel"
            format="Carousel"
            hookRate={0}
            holdRate={0}
            ctr={1.2}
            cpa={590}
            status="learning"
          />
          <CreativeCard
            name="Old-Creative-V1"
            format="Video"
            hookRate={18}
            holdRate={8}
            ctr={0.4}
            cpa={1250}
            status="underperforming"
          />
          <CreativeCard
            name="Studio-Tour-Pro"
            format="Video"
            hookRate={45}
            holdRate={32}
            ctr={2.4}
            cpa={320}
            status="performing"
          />
        </div>
      </div>

      {/* Creative Benchmarks */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Format Benchmarks</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Average performance by creative type</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Format</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Avg CTR</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Avg CPA</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Hook Rate</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Hold Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#27272a]">
                <td className="p-4 text-sm flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#9ae600]" />
                  Video Ads
                </td>
                <td className="p-4 text-sm text-right">1.4%</td>
                <td className="p-4 text-sm text-right">₹520</td>
                <td className="p-4 text-sm text-right">35%</td>
                <td className="p-4 text-sm text-right">24%</td>
              </tr>
              <tr className="border-b border-[#27272a]">
                <td className="p-4 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#06b6d4]" />
                  Static Images
                </td>
                <td className="p-4 text-sm text-right">0.9%</td>
                <td className="p-4 text-sm text-right">₹680</td>
                <td className="p-4 text-sm text-right">-</td>
                <td className="p-4 text-sm text-right">-</td>
              </tr>
              <tr className="border-b border-[#27272a]">
                <td className="p-4 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#f0b100]" />
                  Carousels
                </td>
                <td className="p-4 text-sm text-right">1.1%</td>
                <td className="p-4 text-sm text-right">₹590</td>
                <td className="p-4 text-sm text-right">-</td>
                <td className="p-4 text-sm text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// AUDIENCES TAB
function AudiencesTab() {
  return (
    <div className="space-y-6">
      {/* Audience Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Audience Library</h3>
        <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Audience
        </button>
      </div>

      {/* Audience Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Advantage+ */}
        <AudienceCard
          type="Advantage+"
          name="Advantage+ Audience"
          size="Meta Auto-expand"
          campaigns={3}
          leads={156}
          cpa="₹548"
          roas="8.2x"
          status="recommended"
          description="Let Meta's algorithm find best users with minimal constraints"
        />

        {/* Lookalike */}
        <AudienceCard
          type="Lookalike"
          name="Lookalike 1% - Residents"
          size="~350K"
          campaigns={2}
          leads={89}
          cpa="₹425"
          roas="11.5x"
          status="performing"
          description="Based on 120 past residents"
        />

        {/* Interest */}
        <AudienceCard
          type="Interest"
          name="Remote Workers"
          size="280K-420K"
          campaigns={4}
          leads={124}
          cpa="₹680"
          roas="6.8x"
          status="active"
          description="Interests: Digital Nomad, Co-working, Freelancing"
        />

        {/* Custom */}
        <AudienceCard
          type="Custom"
          name="Website Visitors - 30D"
          size="12.5K"
          campaigns={1}
          leads={45}
          cpa="₹390"
          roas="9.2x"
          status="active"
          description="Retargeting website visitors from last 30 days"
        />

        {/* Interest 2 */}
        <AudienceCard
          type="Interest"
          name="Tech Founders"
          size="180K-240K"
          campaigns={2}
          leads={67}
          cpa="₹720"
          roas="7.5x"
          status="active"
          description="Interests: Entrepreneurship, Startups, Y Combinator"
        />

        {/* Lookalike 2 */}
        <AudienceCard
          type="Lookalike"
          name="Lookalike 1% - Event Bookers"
          size="~320K"
          campaigns={1}
          leads={34}
          cpa="₹510"
          roas="10.8x"
          status="performing"
          description="Based on 89 event customers"
        />
      </div>

      {/* Audience Performance Comparison */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Audience Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Audience</th>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Type</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Reach</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Frequency</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">CTR</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">CPA</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">ROAS</th>
              </tr>
            </thead>
            <tbody>
              <AudienceComparisonRow
                name="Lookalike 1% - Residents"
                type="Lookalike"
                reach="285K"
                frequency="2.8"
                ctr="1.6%"
                cpa="₹425"
                roas="11.5x"
              />
              <AudienceComparisonRow
                name="Advantage+ Audience"
                type="Advantage+"
                reach="Auto"
                frequency="2.4"
                ctr="1.4%"
                cpa="₹548"
                roas="8.2x"
              />
              <AudienceComparisonRow
                name="Remote Workers"
                type="Interest"
                reach="420K"
                frequency="3.2"
                ctr="1.1%"
                cpa="₹680"
                roas="6.8x"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// CONVERSIONS TAB
function ConversionsTab() {
  return (
    <div className="space-y-6">
      {/* Conversion Funnel Visual */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-6">WhatsApp → Sales Funnel</h3>
        <div className="space-y-3">
          <ConversionStage stage="Ad Click" count="12,450" next={524} rate="4.2%" color="bg-[#9ae600]" />
          <ConversionStage stage="WhatsApp Open" count="524" next={342} rate="65%" color="bg-[#06b6d4]" />
          <ConversionStage stage="Warm Lead" count="342" next={189} rate="55%" color="bg-[#f0b100]" />
          <ConversionStage stage="Qualified Lead" count="189" next={62} rate="33%" color="bg-[#d946ef]" />
          <ConversionStage stage="Booking" count="62" isFinal color="bg-[#9ae600]" />
        </div>
        <div className="mt-6 p-4 bg-[#18181b] border border-[#27272a] rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9f9fa9]">Overall Conversion (Click → Booking):</span>
            <span className="text-lg text-[#9ae600]">0.5%</span>
          </div>
        </div>
      </div>

      {/* Lead Quality Distribution */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Lead Quality Scoring</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <LeadQualityCard tier="Hot (A)" count={89} percentage={26} color="bg-[#9ae600]" description="Ready to book" />
          <LeadQualityCard tier="Warm (B)" count={156} percentage={46} color="bg-[#06b6d4]" description="Need nurturing" />
          <LeadQualityCard tier="Cold (C)" count={67} percentage={20} color="bg-[#f0b100]" description="Price shopping" />
          <LeadQualityCard tier="Spam (D)" count={30} percentage={8} color="bg-[#fb2c36]" description="Not real" />
        </div>
      </div>

      {/* Lead Source Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Campaign Lead Quality</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Which campaigns drive the best leads?</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Campaign</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Total Leads</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">A/B Quality %</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Close Rate</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Avg Response Time</th>
              </tr>
            </thead>
            <tbody>
              <LeadSourceRow
                campaign="Koramangala-Rooms-March"
                leads={89}
                qualityPercent={67}
                closeRate={24}
                responseTime="1h 45m"
              />
              <LeadSourceRow
                campaign="Whitefield-Events-V2"
                leads={34}
                qualityPercent={82}
                closeRate={29}
                responseTime="2h 10m"
                qualityGood
              />
              <LeadSourceRow
                campaign="Flo-Zone-Remote"
                leads={52}
                qualityPercent={48}
                closeRate={15}
                responseTime="3h 25m"
                qualityBad
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Time Tracking */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-[#f0b100]/10 rounded-lg">
            <Clock className="w-6 h-6 text-[#f0b100]" />
          </div>
          <div>
            <h3 className="text-lg mb-1">Lead Response Time</h3>
            <p className="text-sm text-[#9f9fa9]">Speed = conversion. &gt;6hr response = 80% drop in booking rate</p>
          </div>
        </div>
        <div className="space-y-3">
          <ResponseTimeBar label="&lt;30min" count={144} percentage={42} color="bg-[#9ae600]" status="good" />
          <ResponseTimeBar label="30min - 2hr" count={106} percentage={31} color="bg-[#9ae600]" status="good" />
          <ResponseTimeBar label="2hr - 6hr" count={62} percentage={18} color="bg-[#f0b100]" status="warning" />
          <ResponseTimeBar label="&gt;6hr" count={30} percentage={9} color="bg-[#fb2c36]" status="bad" />
        </div>
        <div className="mt-4 p-4 bg-[#f0b100]/10 border border-[#f0b100]/30 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm">Average Response Time:</span>
            <span className="text-lg text-[#f0b100]">2h 15min</span>
          </div>
          <p className="text-xs text-[#9f9fa9] mt-1">Target: &lt;2 hours for 80% conversion</p>
        </div>
      </div>

      {/* Sales Team Performance */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Sales Team Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm text-[#9f9fa9]">Team Member</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Leads Assigned</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Bookings</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Close Rate</th>
                <th className="text-right p-4 text-sm text-[#9f9fa9]">Avg Response Time</th>
              </tr>
            </thead>
            <tbody>
              <SalesPersonRow name="Bhangbuddy (Captain)" leads={89} bookings={24} closeRate={27} responseTime="1h 30m" good />
              <SalesPersonRow name="Priya" leads={67} bookings={16} closeRate={24} responseTime="1h 55m" good />
              <SalesPersonRow name="Rohan" leads={53} bookings={9} closeRate={17} responseTime="3h 45m" />
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-[#18181b] border-t border-[#27272a]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9f9fa9]">Team Average Close Rate:</span>
            <span className="text-lg">22%</span>
          </div>
        </div>
      </div>

      {/* Revenue Attribution */}
      <div className="bg-gradient-to-r from-[#9ae600]/10 to-[#9ae600]/5 border border-[#9ae600]/30 rounded-lg p-6">
        <h3 className="text-lg mb-4">Revenue Attribution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Total Ad Spend</div>
            <div className="text-2xl">₹2.4L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">Revenue from Leads</div>
            <div className="text-2xl text-[#9ae600]">₹21.5L</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">ROAS</div>
            <div className="text-2xl text-[#9ae600]">8.96x</div>
          </div>
          <div>
            <div className="text-xs text-[#9f9fa9] mb-1">LTV:CAC Ratio</div>
            <div className="text-2xl">14.2:1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// RULES TAB
function RulesTab() {
  return (
    <div className="space-y-6">
      {/* Rules Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg">Automation Rules</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Set it and forget it - automated campaign optimization</p>
        </div>
        <button className="px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      {/* Active Rules */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <h3 className="text-base">Active Rules (8)</h3>
          <button className="text-sm text-[#9ae600] hover:underline">View History</button>
        </div>
        <div className="divide-y divide-[#27272a]">
          <RuleCard
            name="High CPM Kill Switch"
            type="PAUSE"
            condition="If CPM > ₹600 for 24 hours"
            action="Pause campaign"
            status="active"
            triggered={3}
          />
          <RuleCard
            name="High CPA Protection"
            type="PAUSE"
            condition="If CPA > ₹1,200 AND spend > ₹5,000"
            action="Pause ad set"
            status="active"
            triggered={1}
          />
          <RuleCard
            name="Low ROAS Killer"
            type="PAUSE"
            condition="If ROAS < 3x for 48 hours AND spend > ₹10K"
            action="Pause campaign"
            status="active"
            triggered={2}
          />
          <RuleCard
            name="Scale Winner +20%"
            type="BUDGET"
            condition="If ROAS > 10x for 2 consecutive days"
            action="Increase daily budget by 20%"
            status="active"
            triggered={5}
          />
          <RuleCard
            name="Low CPA Scale"
            type="BUDGET"
            condition="If CPA < ₹500 for 3 days AND budget utilization > 95%"
            action="Increase budget by ₹500/day"
            status="active"
            triggered={2}
          />
          <RuleCard
            name="Weekend Boost"
            type="SCHEDULE"
            condition="Every Saturday-Sunday"
            action="Increase budget +50% on weekends"
            status="active"
            triggered={8}
          />
          <RuleCard
            name="Late Converter Restart"
            type="START"
            condition="If campaign paused AND new conversion attributed"
            action="Restart campaign"
            status="active"
            triggered={1}
          />
          <RuleCard
            name="Low CTR Pause"
            type="PAUSE"
            condition="If CTR < 0.5% for 48 hours"
            action="Pause ad set"
            status="paused"
            triggered={0}
          />
        </div>
      </div>

      {/* Pre-built Templates */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Recommended Rule Templates</h3>
        <p className="text-sm text-[#9f9fa9] mb-4">Pre-built rules based on Meta best practices and Zo Houses data</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RuleTemplate
            name="Meta Best Practice: Budget Protection"
            description="Pause campaigns if CPM &gt;₹600 or CPA &gt;₹1,200"
            type="PAUSE"
          />
          <RuleTemplate
            name="Zo Custom: Weekend Accommodation Boost"
            description="Increase accommodation ads +50% on Fri-Sun"
            type="SCHEDULE"
          />
          <RuleTemplate
            name="Meta Best Practice: Winner Scaling"
            description="Auto-scale campaigns with ROAS &gt;10x"
            type="BUDGET"
          />
          <RuleTemplate
            name="Zo Custom: Whitefield Event Cap"
            description="Pause event campaigns if &gt;2 bookings/week"
            type="PAUSE"
          />
        </div>
      </div>

      {/* Rule History */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Recent Rule Activity</h3>
        </div>
        <div className="divide-y divide-[#27272a]">
          <RuleLogEntry
            timestamp="2026-01-06 14:23"
            rule="High CPM Kill Switch"
            action="Paused campaign 'Old-Creative-V1'"
            reason="CPM ₹850 (target: ₹600)"
          />
          <RuleLogEntry
            timestamp="2026-01-06 09:15"
            rule="Scale Winner +20%"
            action="Increased budget 'Flo-Zone-Remote' from ₹1,500 to ₹1,800/day"
            reason="ROAS 12.4x (target: &gt;10x)"
          />
          <RuleLogEntry
            timestamp="2026-01-05 18:30"
            rule="Weekend Boost"
            action="Increased budget 'Koramangala-Rooms-March' by 50%"
            reason="Weekend schedule trigger"
          />
          <RuleLogEntry
            timestamp="2026-01-05 11:45"
            rule="High CPA Protection"
            action="Paused ad set 'Dorm-Broad-Targeting'"
            reason="CPA ₹1,350 (target: &lt;₹1,200)"
          />
        </div>
      </div>
    </div>
  );
}

// REUSABLE COMPONENTS

interface MetricCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}

function MetricCard({ label, value, subtitle, icon, color, iconColor }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${color} rounded-lg ${iconColor}`}>
          {icon}
        </div>
        <span className="text-xs text-[#9f9fa9]">{label}</span>
      </div>
      <div className="text-2xl mb-1">{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

interface FunnelStageProps {
  stage: string;
  value: string;
  percentage: number;
  next: string;
  rate: string;
  color: string;
  isFinal?: boolean;
}

function FunnelStage({ stage, value, percentage, next, rate, color, isFinal }: FunnelStageProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">{stage}</span>
          <span className="text-sm text-[#9f9fa9]">{value}</span>
        </div>
        <div className="w-full h-3 bg-[#27272a] rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
        </div>
      </div>
      {!isFinal && (
        <div className="flex items-center gap-2 text-xs text-[#71717b] min-w-[120px]">
          <ArrowRight className="w-3 h-3" />
          <div>
            <div>{next}</div>
            <div className="text-[#9ae600]">{rate}</div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProductRowProps {
  product: string;
  spend: string;
  leads: number;
  cpa: string;
  convRate: string;
  roas: string;
  roasGood?: boolean;
}

function ProductRow({ product, spend, leads, cpa, convRate, roas, roasGood }: ProductRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="p-4 text-sm">{product}</td>
      <td className="p-4 text-sm text-right">{spend}</td>
      <td className="p-4 text-sm text-right">{leads}</td>
      <td className="p-4 text-sm text-right">{cpa}</td>
      <td className="p-4 text-sm text-right">{convRate}</td>
      <td className={`p-4 text-sm text-right ${roasGood ? 'text-[#9ae600]' : ''}`}>{roas}</td>
    </tr>
  );
}

interface CampaignLeaderboardRowProps {
  campaign: string;
  roas: string;
  spend: string;
  revenue: string;
  status: string;
  rank: number;
}

function CampaignLeaderboardRow({ campaign, roas, spend, revenue, status, rank }: CampaignLeaderboardRowProps) {
  const roasValue = parseFloat(roas);
  const roasColor = roasValue > 8 ? 'text-[#9ae600]' : roasValue > 4 ? 'text-[#f0b100]' : 'text-[#fb2c36]';
  
  return (
    <div className="flex items-center gap-4 p-4 bg-[#18181b] border border-[#27272a] rounded hover:border-[#9ae600] transition-colors cursor-pointer">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${rank <= 3 ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#27272a] text-[#71717b]'} text-sm font-bold`}>
        {rank}
      </div>
      <div className="flex-1">
        <div className="text-sm mb-1">{campaign}</div>
        <div className="flex items-center gap-3 text-xs text-[#71717b]">
          <span>Spend: {spend}</span>
          <span>•</span>
          <span>Revenue: {revenue}</span>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg ${roasColor}`}>{roas}</div>
        <div className="text-xs text-[#71717b]">ROAS</div>
      </div>
    </div>
  );
}

interface AlertProps {
  type: 'error' | 'warning' | 'success';
  title: string;
  message: string;
  action: string;
}

function Alert({ type, title, message, action }: AlertProps) {
  const colors = {
    error: { bg: 'bg-[#fb2c36]/10', border: 'border-[#fb2c36]/30', icon: 'text-[#fb2c36]', button: 'bg-[#fb2c36]' },
    warning: { bg: 'bg-[#f0b100]/10', border: 'border-[#f0b100]/30', icon: 'text-[#f0b100]', button: 'bg-[#f0b100]' },
    success: { bg: 'bg-[#9ae600]/10', border: 'border-[#9ae600]/30', icon: 'text-[#9ae600]', button: 'bg-[#9ae600]' }
  };
  
  const style = colors[type];
  const Icon = type === 'error' ? AlertTriangle : type === 'warning' ? AlertTriangle : CheckCircle;
  
  return (
    <div className={`flex items-start gap-4 p-4 ${style.bg} border ${style.border} rounded`}>
      <Icon className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <div className="text-sm mb-1">{title}</div>
        <div className="text-xs text-[#9f9fa9]">{message}</div>
      </div>
      <button className={`px-3 py-1.5 ${style.button} text-black rounded text-xs hover:opacity-80 transition-opacity whitespace-nowrap`}>
        {action}
      </button>
    </div>
  );
}

interface CampaignRowProps {
  name: string;
  status: string;
  budget: string;
  spend: string;
  cpm: string;
  ctr: string;
  leads: number;
  cpa: string;
  roas: string;
  alert?: boolean;
}

function CampaignRow({ name, status, budget, spend, cpm, ctr, leads, cpa, roas, alert }: CampaignRowProps) {
  return (
    <tr className={`border-b border-[#27272a] hover:bg-[#18181b] ${alert ? 'bg-[#fb2c36]/5' : ''}`}>
      <td className="p-3">
        <input type="checkbox" className="rounded" />
      </td>
      <td className="p-3 text-sm">{name}</td>
      <td className="p-3">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
          status === 'active' ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#71717b]/10 text-[#71717b]'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-[#9ae600]' : 'bg-[#71717b]'}`}></div>
          {status}
        </span>
      </td>
      <td className="p-3 text-sm text-right text-[#9f9fa9]">{budget}</td>
      <td className="p-3 text-sm text-right">{spend}</td>
      <td className={`p-3 text-sm text-right ${alert ? 'text-[#fb2c36]' : ''}`}>{cpm}</td>
      <td className="p-3 text-sm text-right">{ctr}</td>
      <td className="p-3 text-sm text-right">{leads}</td>
      <td className="p-3 text-sm text-right">{cpa}</td>
      <td className="p-3 text-sm text-right text-[#9ae600]">{roas}</td>
      <td className="p-3">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-[#27272a] rounded" title="Edit">
            <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded" title="Pause">
            <Pause className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded" title="Duplicate">
            <Copy className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface CampaignStatProps {
  label: string;
  value: string;
  subtitle?: string;
  good?: boolean;
}

function CampaignStat({ label, value, subtitle, good }: CampaignStatProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded p-3">
      <div className="text-xs text-[#9f9fa9] mb-1">{label}</div>
      <div className={`text-lg ${good ? 'text-[#9ae600]' : ''}`}>{value}</div>
      {subtitle && <div className="text-xs text-[#71717b] mt-1">{subtitle}</div>}
    </div>
  );
}

interface AdSetRowProps {
  name: string;
  spend: string;
  leads: number;
  cpa: string;
  status: string;
}

function AdSetRow({ name, spend, leads, cpa, status }: AdSetRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded">
      <div className="flex-1">
        <div className="text-sm mb-1">{name}</div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
            status === 'active' ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#71717b]/10 text-[#71717b]'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-[#9ae600]' : 'bg-[#71717b]'}`}></div>
            {status}
          </span>
        </div>
      </div>
      <div className="flex gap-6 text-sm text-right">
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">Spend</div>
          <div>{spend}</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">Leads</div>
          <div>{leads}</div>
        </div>
        <div>
          <div className="text-xs text-[#9f9fa9] mb-1">CPA</div>
          <div className="text-[#9ae600]">{cpa}</div>
        </div>
      </div>
    </div>
  );
}

interface DiversityMetricProps {
  label: string;
  value: string;
  status: 'good' | 'warning';
  subtitle?: string;
}

function DiversityMetric({ label, value, status, subtitle }: DiversityMetricProps) {
  return (
    <div className="p-3 bg-[#18181b] border border-[#27272a] rounded">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#9f9fa9]">{label}</span>
        {status === 'good' ? (
          <CheckCircle className="w-3.5 h-3.5 text-[#9ae600]" />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5 text-[#f0b100]" />
        )}
      </div>
      <div className="text-sm">{value}</div>
      {subtitle && <div className="text-xs text-[#f0b100] mt-1">{subtitle}</div>}
    </div>
  );
}

interface CreativeCardProps {
  name: string;
  format: string;
  hookRate: number;
  holdRate: number;
  ctr: number;
  cpa: number;
  status: 'performing' | 'learning' | 'underperforming';
}

function CreativeCard({ name, format, hookRate, holdRate, ctr, cpa, status }: CreativeCardProps) {
  const borderColor = status === 'performing' ? 'border-[#9ae600]' : status === 'learning' ? 'border-[#f0b100]' : 'border-[#fb2c36]';
  
  return (
    <div className={`bg-[#18181b] border-2 ${borderColor} rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer`}>
      <div className="aspect-video bg-[#09090b] rounded mb-3 flex items-center justify-center">
        {format === 'Video' ? <Video className="w-8 h-8 text-[#9f9fa9]" /> : <ImageIcon className="w-8 h-8 text-[#9f9fa9]" />}
      </div>
      <div className="text-sm mb-2 truncate" title={name}>{name}</div>
      <div className="flex items-center justify-between text-xs text-[#9f9fa9] mb-3">
        <span>{format}</span>
        <span className={`px-2 py-0.5 rounded ${
          status === 'performing' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
          status === 'learning' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
          'bg-[#fb2c36]/10 text-[#fb2c36]'
        }`}>
          {status}
        </span>
      </div>
      <div className="space-y-1 text-xs">
        {format === 'Video' && (
          <>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Hook Rate:</span>
              <span className={hookRate >= 30 ? 'text-[#9ae600]' : 'text-[#fb2c36]'}>{hookRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717b]">Hold Rate:</span>
              <span className={holdRate >= 25 ? 'text-[#9ae600]' : 'text-[#f0b100]'}>{holdRate}%</span>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <span className="text-[#71717b]">CTR:</span>
          <span className={ctr >= 1 ? 'text-[#9ae600]' : ''}>{ctr}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#71717b]">CPA:</span>
          <span className={cpa <= 600 ? 'text-[#9ae600]' : ''}>₹{cpa}</span>
        </div>
      </div>
    </div>
  );
}

interface AudienceCardProps {
  type: string;
  name: string;
  size: string;
  campaigns: number;
  leads: number;
  cpa: string;
  roas: string;
  status: 'recommended' | 'performing' | 'active';
  description: string;
}

function AudienceCard({ type, name, size, campaigns, leads, cpa, roas, status, description }: AudienceCardProps) {
  const statusColors = {
    recommended: 'bg-[#9ae600]/10 border-[#9ae600]/30 text-[#9ae600]',
    performing: 'bg-[#06b6d4]/10 border-[#06b6d4]/30 text-[#06b6d4]',
    active: 'bg-[#f0b100]/10 border-[#f0b100]/30 text-[#f0b100]'
  };
  
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#9ae600] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={`inline-block px-2 py-1 rounded text-xs mb-2 ${statusColors[status]}`}>
            {type}
          </span>
          <h4 className="text-sm mb-1">{name}</h4>
          <p className="text-xs text-[#71717b]">{size}</p>
        </div>
      </div>
      <p className="text-xs text-[#9f9fa9] mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-[#71717b] mb-1">Campaigns</div>
          <div>{campaigns}</div>
        </div>
        <div>
          <div className="text-[#71717b] mb-1">Leads</div>
          <div>{leads}</div>
        </div>
        <div>
          <div className="text-[#71717b] mb-1">CPA</div>
          <div>{cpa}</div>
        </div>
        <div>
          <div className="text-[#71717b] mb-1">ROAS</div>
          <div className="text-[#9ae600]">{roas}</div>
        </div>
      </div>
    </div>
  );
}

interface AudienceComparisonRowProps {
  name: string;
  type: string;
  reach: string;
  frequency: string;
  ctr: string;
  cpa: string;
  roas: string;
}

function AudienceComparisonRow({ name, type, reach, frequency, ctr, cpa, roas }: AudienceComparisonRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4 text-sm">
        <span className="px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">{type}</span>
      </td>
      <td className="p-4 text-sm text-right">{reach}</td>
      <td className="p-4 text-sm text-right">{frequency}</td>
      <td className="p-4 text-sm text-right">{ctr}</td>
      <td className="p-4 text-sm text-right">{cpa}</td>
      <td className="p-4 text-sm text-right text-[#9ae600]">{roas}</td>
    </tr>
  );
}

interface ConversionStageProps {
  stage: string;
  count: string;
  next?: number;
  rate?: string;
  color: string;
  isFinal?: boolean;
}

function ConversionStage({ stage, count, next, rate, color, isFinal }: ConversionStageProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">{stage}</span>
          <span className="text-lg">{count}</span>
        </div>
        <div className={`w-full h-2 ${color} rounded-full`}></div>
      </div>
      {!isFinal && (
        <div className="flex items-center gap-2 text-xs text-[#71717b] min-w-[100px]">
          <ArrowRight className="w-4 h-4" />
          <div>
            <div>{next} next</div>
            <div className="text-[#9ae600]">{rate}</div>
          </div>
        </div>
      )}
    </div>
  );
}

interface LeadQualityCardProps {
  tier: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
}

function LeadQualityCard({ tier, count, percentage, color, description }: LeadQualityCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
      <div className={`w-full h-1 ${color} rounded-full mb-3`}></div>
      <div className="text-sm text-[#9f9fa9] mb-1">{tier}</div>
      <div className="text-2xl mb-1">{count}</div>
      <div className="text-xs text-[#71717b]">{percentage}% • {description}</div>
    </div>
  );
}

interface LeadSourceRowProps {
  campaign: string;
  leads: number;
  qualityPercent: number;
  closeRate: number;
  responseTime: string;
  qualityGood?: boolean;
  qualityBad?: boolean;
}

function LeadSourceRow({ campaign, leads, qualityPercent, closeRate, responseTime, qualityGood, qualityBad }: LeadSourceRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="p-4 text-sm">{campaign}</td>
      <td className="p-4 text-sm text-right">{leads}</td>
      <td className={`p-4 text-sm text-right ${qualityGood ? 'text-[#9ae600]' : qualityBad ? 'text-[#fb2c36]' : ''}`}>
        {qualityPercent}%
      </td>
      <td className="p-4 text-sm text-right">{closeRate}%</td>
      <td className="p-4 text-sm text-right text-[#9f9fa9]">{responseTime}</td>
    </tr>
  );
}

interface ResponseTimeBarProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
  status: 'good' | 'warning' | 'bad';
}

function ResponseTimeBar({ label, count, percentage, color, status }: ResponseTimeBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>{label}</span>
        <span className="text-[#9f9fa9]">{count} leads ({percentage}%)</span>
      </div>
      <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

interface SalesPersonRowProps {
  name: string;
  leads: number;
  bookings: number;
  closeRate: number;
  responseTime: string;
  good?: boolean;
}

function SalesPersonRow({ name, leads, bookings, closeRate, responseTime, good }: SalesPersonRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b]">
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4 text-sm text-right">{leads}</td>
      <td className="p-4 text-sm text-right">{bookings}</td>
      <td className={`p-4 text-sm text-right ${good ? 'text-[#9ae600]' : ''}`}>{closeRate}%</td>
      <td className="p-4 text-sm text-right text-[#9f9fa9]">{responseTime}</td>
    </tr>
  );
}

interface RuleCardProps {
  name: string;
  type: 'PAUSE' | 'START' | 'BUDGET' | 'SCHEDULE';
  condition: string;
  action: string;
  status: 'active' | 'paused';
  triggered: number;
}

function RuleCard({ name, type, condition, action, status, triggered }: RuleCardProps) {
  const typeColors = {
    PAUSE: 'bg-[#fb2c36]/10 text-[#fb2c36]',
    START: 'bg-[#9ae600]/10 text-[#9ae600]',
    BUDGET: 'bg-[#06b6d4]/10 text-[#06b6d4]',
    SCHEDULE: 'bg-[#f0b100]/10 text-[#f0b100]'
  };
  
  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs ${typeColors[type]}`}>{type}</span>
            <h4 className="text-sm">{name}</h4>
          </div>
          <div className="text-xs text-[#9f9fa9] mb-1">
            <strong>If:</strong> {condition}
          </div>
          <div className="text-xs text-[#9f9fa9]">
            <strong>Then:</strong> {action}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-[#71717b]">Triggered</div>
            <div className="text-sm">{triggered}x</div>
          </div>
          <button className={`p-2 rounded ${
            status === 'active' 
              ? 'bg-[#9ae600]/10 text-[#9ae600]' 
              : 'bg-[#71717b]/10 text-[#71717b]'
          }`}>
            {status === 'active' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

interface RuleTemplateProps {
  name: string;
  description: string;
  type: 'PAUSE' | 'START' | 'BUDGET' | 'SCHEDULE';
}

function RuleTemplate({ name, description, type }: RuleTemplateProps) {
  const typeColors = {
    PAUSE: 'bg-[#fb2c36]/10 text-[#fb2c36]',
    START: 'bg-[#9ae600]/10 text-[#9ae600]',
    BUDGET: 'bg-[#06b6d4]/10 text-[#06b6d4]',
    SCHEDULE: 'bg-[#f0b100]/10 text-[#f0b100]'
  };
  
  return (
    <div className="p-4 bg-[#18181b] border border-[#27272a] rounded hover:border-[#9ae600] transition-colors cursor-pointer">
      <span className={`inline-block px-2 py-1 rounded text-xs mb-2 ${typeColors[type]}`}>{type}</span>
      <h4 className="text-sm mb-2">{name}</h4>
      <p className="text-xs text-[#9f9fa9] mb-3">{description}</p>
      <button className="px-3 py-1.5 bg-[#9ae600] text-black rounded text-xs hover:bg-[#8bd500] transition-colors">
        Activate Rule
      </button>
    </div>
  );
}

interface RuleLogEntryProps {
  timestamp: string;
  rule: string;
  action: string;
  reason: string;
}

function RuleLogEntry({ timestamp, rule, action, reason }: RuleLogEntryProps) {
  return (
    <div className="p-4 hover:bg-[#18181b] transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 text-xs text-[#71717b]">
          <Clock className="w-3 h-3" />
          <span>{timestamp}</span>
        </div>
      </div>
      <div className="text-sm mb-1">{rule}</div>
      <div className="text-sm text-[#9f9fa9] mb-1">{action}</div>
      <div className="text-xs text-[#71717b]">Reason: {reason}</div>
    </div>
  );
}

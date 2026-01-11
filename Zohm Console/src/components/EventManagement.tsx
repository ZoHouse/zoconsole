import { Plus, Search, Filter, Calendar, DollarSign, Users, TrendingUp, Download, Eye, Edit, Trash2, MoreVertical, ChevronDown, BarChart3, PieChart, MapPin, Clock, Target, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface EventManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function EventManagement({ selectedProperty, onPropertyChange }: EventManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'events' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'meetup' | 'workshop' | 'cultural' | 'hacker-house' | 'networking' | 'conference' | 'co-working'>('all');
  const [houseFilter, setHouseFilter] = useState<'all' | 'BLRxZo' | 'SFOxZo' | 'DXBxZo' | 'WTFxZo' | 'SGPxZo'>('all');

  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview />}
          {activeView === 'events' && <EventsList searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} houseFilter={houseFilter} onHouseFilterChange={setHouseFilter} />}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'events' | 'analytics';
  onViewChange: (view: 'overview' | 'events' | 'analytics') => void;
}

function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Event Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage events across all Zo House properties</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Create Event</span>
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
          onClick={() => onViewChange('events')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'events'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Events
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          icon={<Calendar className="w-4 h-4" />}
          label="Total Events"
          value="420"
          subtitle="All time"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<DollarSign className="w-4 h-4" />}
          label="Total Revenue"
          value="$145,381"
          subtitle="All events"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<Users className="w-4 h-4" />}
          label="Total Attendance"
          value="2,098"
          subtitle="Citizens attended"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Avg Revenue/Event"
          value="$346.15"
          subtitle="Per event"
          color="text-[#f0b100]"
        />
        <MetricCard
          icon={<MapPin className="w-4 h-4" />}
          label="Active Houses"
          value="6"
          subtitle="Hosting events"
          color="text-[#d946ef]"
        />
        <MetricCard
          icon={<Clock className="w-4 h-4" />}
          label="Upcoming Events"
          value="0"
          subtitle="Next 30 days"
          color="text-[#71717b]"
        />
      </div>

      {/* Revenue by House & Events by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue by House */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Revenue by House</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Total revenue per property</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#27272a]">
                <tr>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">House</th>
                  <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Revenue</th>
                  <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Events</th>
                </tr>
              </thead>
              <tbody>
                <HouseRevenueRow house="BLRxZo" revenue={89050} events={191} />
                <HouseRevenueRow house="SFOxZo" revenue={17551} events={169} />
                <HouseRevenueRow house="DXBxZo" revenue={0} events={13} />
                <HouseRevenueRow house="DENxZo" revenue={0} events={5} />
                <HouseRevenueRow house="WTFxZo" revenue={32450} events={23} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Events by Type */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Events by Type</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Event distribution</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#27272a]">
                <tr>
                  <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Event Type</th>
                  <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Count</th>
                  <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <EventTypeRow type="Meetup" count={94} revenue={21309} />
                <EventTypeRow type="Workshop" count={18} revenue={2000} />
                <EventTypeRow type="Hacker House" count={6} revenue={8720} />
                <EventTypeRow type="Cultural" count={74} revenue={1700} />
                <EventTypeRow type="Co Working" count={40} revenue={0} />
                <EventTypeRow type="Conference" count={0} revenue={0} />
                <EventTypeRow type="Networking" count={4} revenue={3659} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top 10 Events by Revenue */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Top 10 Events by Revenue</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Highest earning events</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Event Name</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Revenue</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3">House</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <TopEventRow name="Superteam Residency" revenue={19938} house="WTFxZo" date="" />
              <TopEventRow name="DeFi Mania Hacker House" revenue={19000} house="BLRxZo" date="17/06/2024" />
              <TopEventRow name="Superteam Startup Village" revenue={10000} house="BLRxZo" date="" />
              <TopEventRow name="Sui Hacker House" revenue={10000} house="BLRxZo" date="01/11/2024" />
              <TopEventRow name="Stellar Builder Residency" revenue={7500} house="BLRxZo" date="10/07/2024" />
              <TopEventRow name="Algorand Live Hack" revenue={7225} house="BLRxZo" date="13/06/2025" />
              <TopEventRow name="Hacker House" revenue={6720} house="BLRxZo" date="02/05/2025" />
              <TopEventRow name="DeSci Mania" revenue={5000} house="BLRxZo" date="" />
              <TopEventRow name="FIFA Night" revenue={4750} house="SFOxZo" date="13/10/2024" />
              <TopEventRow name="Avax team 1 hackathon" revenue={4600} house="WTFxZo" date="30/08/2025" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface EventsListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'upcoming' | 'completed' | 'cancelled';
  onStatusFilterChange: (status: 'all' | 'upcoming' | 'completed' | 'cancelled') => void;
  typeFilter: 'all' | 'meetup' | 'workshop' | 'cultural' | 'hacker-house' | 'networking' | 'conference' | 'co-working';
  onTypeFilterChange: (type: 'all' | 'meetup' | 'workshop' | 'cultural' | 'hacker-house' | 'networking' | 'conference' | 'co-working') => void;
  houseFilter: 'all' | 'BLRxZo' | 'SFOxZo' | 'DXBxZo' | 'WTFxZo' | 'SGPxZo';
  onHouseFilterChange: (house: 'all' | 'BLRxZo' | 'SFOxZo' | 'DXBxZo' | 'WTFxZo' | 'SGPxZo') => void;
}

function EventsList({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, typeFilter, onTypeFilterChange, houseFilter, onHouseFilterChange }: EventsListProps) {
  const events = [
    { id: 1, date: '11/01/2024', name: 'Solana Ecosystem Call', link: 'https://lu.ma/solana', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 20, status: 'completed' },
    { id: 2, date: '15/01/2024', name: 'Sui Meetup', link: 'https://lu.ma/sui', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 25, status: 'completed' },
    { id: 3, date: '17/01/2024', name: 'Cinema', link: 'https://lu.ma/cinema', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 3, status: 'completed' },
    { id: 4, date: '19/01/2024', name: 'Bgnr BLR', link: 'https://lu.ma/bgnr', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 5, status: 'completed' },
    { id: 5, date: '20/01/2024', name: 'Easel Time', link: 'https://lu.ma/easel', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 4, status: 'completed' },
    { id: 6, date: '21/01/2024', name: 'Easy Listening Session', link: 'https://lu.ma/music', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 5, status: 'completed' },
    { id: 7, date: '25/01/2024', name: 'Karaoke Night', link: 'https://lu.ma/karaoke', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 14, status: 'completed' },
    { id: 8, date: '26/01/2024', name: 'Friday Night Poker Tourney', link: 'https://lu.ma/poker', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 6, status: 'completed' },
    { id: 9, date: '31/01/2024', name: 'Game Night', link: 'https://lu.ma/games', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 5, status: 'completed' },
    { id: 10, date: '02/02/2024', name: 'Easel Time', link: 'https://lu.ma/easel2', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 5, status: 'completed' },
    { id: 11, date: '02/02/2024', name: 'Sui House', link: 'https://lu.ma/suihouse', house: 'BLRxZo', type: 'Cultural', revenue: 0, expenses: 0, netProfit: 0, attendance: 8, status: 'completed' },
    { id: 12, date: '03/02/2024', name: 'Bgnr BLR', link: 'https://lu.ma/bgnr2', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 5, status: 'completed' },
    { id: 13, date: '03/02/2024', name: 'Sundowner', link: 'https://lu.ma/sundowner', house: 'BLRxZo', type: 'Meetup', revenue: 0, expenses: 0, netProfit: 0, attendance: 15, status: 'completed' },
    { id: 14, date: '04/02/2024', name: 'Blockchain Basics', link: 'https://lu.ma/blockchain', house: 'BLRxZo', type: 'Workshop', revenue: 0, expenses: 0, netProfit: 0, attendance: 12, status: 'completed' },
    { id: 15, date: '04/02/2024', name: 'Theatre Workshop', link: 'https://lu.ma/theatre', house: 'BLRxZo', type: 'Workshop', revenue: 0, expenses: 0, netProfit: 0, attendance: 4, status: 'completed' },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' ||
      event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type.toLowerCase().replace(' ', '-') === typeFilter;
    const matchesHouse = houseFilter === 'all' || event.house === houseFilter;
    return matchesSearch && matchesStatus && matchesType && matchesHouse;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search events by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* House Filter */}
          <div className="relative">
            <select
              value={houseFilter}
              onChange={(e) => onHouseFilterChange(e.target.value as any)}
              className="appearance-none w-full bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Houses</option>
              <option value="BLRxZo">BLRxZo</option>
              <option value="SFOxZo">SFOxZo</option>
              <option value="DXBxZo">DXBxZo</option>
              <option value="WTFxZo">WTFxZo</option>
              <option value="SGPxZo">SGPxZo</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value as any)}
              className="appearance-none w-full bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="meetup">Meetup</option>
              <option value="workshop">Workshop</option>
              <option value="cultural">Cultural</option>
              <option value="hacker-house">Hacker House</option>
              <option value="networking">Networking</option>
              <option value="conference">Conference</option>
              <option value="co-working">Co Working</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as any)}
              className="appearance-none w-full bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#18181b] border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Date</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Event Name</th>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Event Link</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">House</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Type</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Revenue</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Expenses</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Net Profit</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Attendance</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Status</th>
                <th className="text-center text-xs text-[#9f9fa9] px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Revenue & Attendance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Revenue Trend</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Monthly revenue over time</p>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between gap-2">
              <TrendBar label="Jan" value={12450} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="Feb" value={18200} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="Mar" value={25600} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="Apr" value={21300} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="May" value={28900} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="Jun" value={22100} maxValue={30000} color="bg-[#9ae600]" />
              <TrendBar label="Jul" value={16800} maxValue={30000} color="bg-[#9ae600]" />
            </div>
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
          <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-lg">Attendance Trend</h3>
            <p className="text-sm text-[#9f9fa9] mt-1">Monthly attendance over time</p>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-end justify-between gap-2">
              <TrendBar label="Jan" value={245} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="Feb" value={312} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="Mar" value={428} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="Apr" value={356} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="May" value={389} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="Jun" value={298} maxValue={500} color="bg-[#06b6d4]" />
              <TrendBar label="Jul" value={270} maxValue={500} color="bg-[#06b6d4]" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Type Distribution */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">Event Type Performance</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Comparing all event types</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Event Type</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Events</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Revenue</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Avg Revenue</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Attendance</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Avg Attendance</th>
              </tr>
            </thead>
            <tbody>
              <TypePerformanceRow type="Meetup" events={94} revenue={21309} avgRevenue={227} attendance={845} avgAttendance={9} />
              <TypePerformanceRow type="Workshop" events={18} revenue={2000} avgRevenue={111} attendance={234} avgAttendance={13} />
              <TypePerformanceRow type="Hacker House" events={6} revenue={8720} avgRevenue={1453} attendance={156} avgAttendance={26} />
              <TypePerformanceRow type="Cultural" events={74} revenue={1700} avgRevenue={23} attendance={567} avgAttendance={8} />
              <TypePerformanceRow type="Co Working" events={40} revenue={0} avgRevenue={0} attendance={189} avgAttendance={5} />
              <TypePerformanceRow type="Networking" events={4} revenue={3659} avgRevenue={915} attendance={107} avgAttendance={27} />
            </tbody>
          </table>
        </div>
      </div>

      {/* House Performance Comparison */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">House Performance Comparison</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">All properties side by side</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#27272a]">
              <tr>
                <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">House</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Events</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Revenue</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Avg Revenue</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Total Attendance</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Avg Attendance</th>
                <th className="text-right text-xs text-[#9f9fa9] px-4 py-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              <HousePerformanceRow house="BLRxZo" events={191} revenue={89050} avgRevenue={466} attendance={1234} avgAttendance={6} growth={18} />
              <HousePerformanceRow house="SFOxZo" events={169} revenue={17551} avgRevenue={104} attendance={523} avgAttendance={3} growth={-5} />
              <HousePerformanceRow house="DXBxZo" events={13} revenue={0} avgRevenue={0} attendance={87} avgAttendance={7} growth={12} />
              <HousePerformanceRow house="WTFxZo" events={23} revenue={32450} avgRevenue={1411} attendance={178} avgAttendance={8} growth={25} />
              <HousePerformanceRow house="SGPxZo" events={0} revenue={0} avgRevenue={0} attendance={0} avgAttendance={0} growth={0} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Best Performing Month */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#9ae600]/10 rounded">
              <TrendingUp className="w-5 h-5 text-[#9ae600]" />
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9]">Best Month</div>
              <div className="text-lg">May 2024</div>
            </div>
          </div>
          <div className="text-sm text-[#9f9fa9] mb-2">
            <div className="flex justify-between mb-1">
              <span>Revenue:</span>
              <span className="text-white">$28,900</span>
            </div>
            <div className="flex justify-between">
              <span>Events:</span>
              <span className="text-white">42</span>
            </div>
          </div>
        </div>

        {/* Most Popular Type */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#d946ef]/10 rounded">
              <Calendar className="w-5 h-5 text-[#d946ef]" />
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9]">Most Popular</div>
              <div className="text-lg">Meetup</div>
            </div>
          </div>
          <div className="text-sm text-[#9f9fa9] mb-2">
            <div className="flex justify-between mb-1">
              <span>Total Events:</span>
              <span className="text-white">94</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Attendance:</span>
              <span className="text-white">9 citizens</span>
            </div>
          </div>
        </div>

        {/* Top Revenue Generator */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#f0b100]/10 rounded">
              <DollarSign className="w-5 h-5 text-[#f0b100]" />
            </div>
            <div>
              <div className="text-xs text-[#9f9fa9]">Top Revenue Type</div>
              <div className="text-lg">Meetup</div>
            </div>
          </div>
          <div className="text-sm text-[#9f9fa9] mb-2">
            <div className="flex justify-between mb-1">
              <span>Total Revenue:</span>
              <span className="text-white">$21,309</span>
            </div>
            <div className="flex justify-between">
              <span>Avg per Event:</span>
              <span className="text-white">$227</span>
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

interface HouseRevenueRowProps {
  house: string;
  revenue: number;
  events: number;
}

function HouseRevenueRow({ house, revenue, events }: HouseRevenueRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{house}</td>
      <td className="px-4 py-3 text-sm text-right text-[#9ae600]">${revenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">{events}</td>
    </tr>
  );
}

interface EventTypeRowProps {
  type: string;
  count: number;
  revenue: number;
}

function EventTypeRow({ type, count, revenue }: EventTypeRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{type}</td>
      <td className="px-4 py-3 text-sm text-right">{count}</td>
      <td className="px-4 py-3 text-sm text-right text-[#9ae600]">${revenue.toLocaleString()}</td>
    </tr>
  );
}

interface TopEventRowProps {
  name: string;
  revenue: number;
  house: string;
  date: string;
}

function TopEventRow({ name, revenue, house, date }: TopEventRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{name}</td>
      <td className="px-4 py-3 text-sm text-right text-[#9ae600]">${revenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-center">
        <span className="px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">{house}</span>
      </td>
      <td className="px-4 py-3 text-sm text-right text-[#9f9fa9]">{date || '-'}</td>
    </tr>
  );
}

interface EventRowProps {
  event: {
    id: number;
    date: string;
    name: string;
    link: string;
    house: string;
    type: string;
    revenue: number;
    expenses: number;
    netProfit: number;
    attendance: number;
    status: string;
  };
}

function EventRow({ event }: EventRowProps) {
  const statusColors = {
    upcoming: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30',
    completed: 'bg-[#9ae600]/10 text-[#9ae600] border-[#9ae600]/30',
    cancelled: 'bg-[#fb2c36]/10 text-[#fb2c36] border-[#fb2c36]/30',
  };

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm whitespace-nowrap">{event.date}</td>
      <td className="px-4 py-3 text-sm">{event.name}</td>
      <td className="px-4 py-3 text-sm">
        <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#9ae600] hover:underline">
          <ExternalLink className="w-3 h-3" />
          <span className="text-xs">Link</span>
        </a>
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <span className="px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">{event.house}</span>
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <span className="text-xs text-[#9f9fa9]">{event.type}</span>
      </td>
      <td className="px-4 py-3 text-sm text-right">${event.revenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">${event.expenses.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">${event.netProfit.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">{event.attendance}</td>
      <td className="px-4 py-3 text-sm text-center">
        <span className={`px-2 py-1 rounded text-xs border ${statusColors[event.status as keyof typeof statusColors]}`}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <div className="flex items-center justify-center gap-1">
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded transition-colors" title="More">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface TrendBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

function TrendBar({ label, value, maxValue, color }: TrendBarProps) {
  const height = (value / maxValue) * 100;
  
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full flex items-end justify-center h-48">
        <div 
          className={`w-full ${color} rounded-t transition-all hover:opacity-80`}
          style={{ height: `${height}%` }}
        />
      </div>
      <div className="text-xs text-center">
        <div className="text-[#9f9fa9] mb-1">{label}</div>
        <div className="text-white">{value.toLocaleString()}</div>
      </div>
    </div>
  );
}

interface TypePerformanceRowProps {
  type: string;
  events: number;
  revenue: number;
  avgRevenue: number;
  attendance: number;
  avgAttendance: number;
}

function TypePerformanceRow({ type, events, revenue, avgRevenue, attendance, avgAttendance }: TypePerformanceRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{type}</td>
      <td className="px-4 py-3 text-sm text-right">{events}</td>
      <td className="px-4 py-3 text-sm text-right text-[#9ae600]">${revenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">${avgRevenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">{attendance}</td>
      <td className="px-4 py-3 text-sm text-right">{avgAttendance}</td>
    </tr>
  );
}

interface HousePerformanceRowProps {
  house: string;
  events: number;
  revenue: number;
  avgRevenue: number;
  attendance: number;
  avgAttendance: number;
  growth: number;
}

function HousePerformanceRow({ house, events, revenue, avgRevenue, attendance, avgAttendance, growth }: HousePerformanceRowProps) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-3 text-sm">{house}</td>
      <td className="px-4 py-3 text-sm text-right">{events}</td>
      <td className="px-4 py-3 text-sm text-right text-[#9ae600]">${revenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">${avgRevenue.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-right">{attendance}</td>
      <td className="px-4 py-3 text-sm text-right">{avgAttendance}</td>
      <td className="px-4 py-3 text-sm text-right">
        <span className={growth >= 0 ? 'text-[#9ae600]' : 'text-[#fb2c36]'}>
          {growth >= 0 ? '+' : ''}{growth}%
        </span>
      </td>
    </tr>
  );
}

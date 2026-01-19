import { ChevronDown, Search, Plus, MoreVertical, Mail, Phone, MapPin, TrendingUp, Clock, Award, CheckCircle2, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchDashboardStats, fetchDailyReports, fetchStaffList, type DashboardStats, type DailyReport, type StaffMember } from '../services/dashboard';

interface CrewProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

export function Crew({ selectedProperty, onPropertyChange, embedded = false }: CrewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  useEffect(() => {
    fetchDashboardStats(selectedProperty).then(setStats).catch(console.error);
    fetchDailyReports(undefined, selectedProperty).then(setReports).catch(console.error);
    fetchStaffList(selectedProperty).then(setStaffList).catch(console.error);
  }, [selectedProperty]);

  return (
    <>
      {!embedded && <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px] space-y-6">
          <StaffOverview stats={stats} />
          <PerformanceReports stats={stats} />
          <DailyReports reports={reports} />
          <StaffDirectory searchQuery={searchQuery} staffList={staffList} />
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

function Header({ searchQuery, onSearchChange, selectedProperty, onPropertyChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Crew Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage staff and team members</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Staff</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] flex-1 sm:flex-initial min-w-[140px]">
            <span className="text-xs sm:text-sm whitespace-nowrap">All Departments</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </div>

          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] flex-1 sm:flex-initial min-w-[140px]">
            <span className="text-xs sm:text-sm whitespace-nowrap">Status: All</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </div>
        </div>
      </div>
    </header>
  );
}

function StaffOverview({ stats }: { stats: DashboardStats | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <OverviewCard
        title="Total Staff"
        value={stats?.total_staff.toString() || '-'}
        subtitle="All crew members"
        color="text-[#9ae600]"
      />

      <OverviewCard
        title="Active atm"
        value={stats?.active_now.toString() || '-'}
        subtitle="Currently working"
        color="text-[#9ae600]"
      />

      <OverviewCard
        title="On Leave"
        value={stats?.on_leave.toString() || '-'}
        subtitle="Out today"
        color="text-[#f0b100]"
      />
    </div>
  );
}

interface OverviewCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

function OverviewCard({ title, value, subtitle, color }: OverviewCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className="text-xs text-[#9f9fa9] mb-3">{title}</div>
      <div className={`text-3xl mb-2 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

function PerformanceReports({ stats }: { stats: DashboardStats | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceCard
        title="Rev per Employee"
        value={stats?.revenue_per_employee ? `₹${stats.revenue_per_employee}` : '-'}
        subtitle="Points (Last 30 days)"
        color="text-[#06b6d4]"
      />

      <PerformanceCard
        title="Top Performer"
        value={stats?.top_performer?.name || '-'}
        subtitle={stats?.top_performer?.points ? `${stats.top_performer.points} points` : '-'}
        color="text-[#f0b100]"
      />
    </div>
  );
}

interface PerformanceCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

function PerformanceCard({ title, value, subtitle, color }: PerformanceCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className="text-xs text-[#9f9fa9] mb-3">{title}</div>
      <div className={`text-3xl mb-2 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}

function DailyReports({ reports = [] }: { reports?: DailyReport[] }) {
  if (!reports.length) return null;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
        <div>
          <h3 className="text-lg">Daily Performance Reports</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">{today}</p>
        </div>
        <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
        {reports.map((report) => (
          <div key={report.staff_id} className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4 hover:border-[#9ae600] transition-colors">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#27272a]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shrink-0">
                <span className="text-xs">{report.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm">{report.name}</div>
                <div className="text-xs text-[#9f9fa9]">{report.role}</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-[#27272a]">
              <div>
                <div className="text-xs text-[#9f9fa9]">Zones</div>
                <div className="text-lg text-[#9ae600]">{report.zones_completed}</div>
              </div>
              <div>
                <div className="text-xs text-[#9f9fa9]">Tasks</div>
                <div className="text-lg text-[#06b6d4]">{report.tasks_completed}</div>
              </div>
              <div>
                <div className="text-xs text-[#9f9fa9]">Points</div>
                <div className="text-lg text-[#f0b100]">{report.points}</div>
              </div>
            </div>

            {/* Work Time */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9f9fa9] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Work Time
                </span>
                <span className="text-white">{report.work_time}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9f9fa9]">Breaks</span>
                <span className="text-white">{report.breaks_time}</span>
              </div>
            </div>

            {/* Zones Detail */}
            <div className="space-y-2">
              <div className="text-xs text-[#9f9fa9] mb-2">Zones Cleaned:</div>
              {report.detailed_zones.map((zone, idx) => (
                <div key={idx} className="text-xs bg-[#09090b] p-2 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white">• {zone.name}</span>
                    <span className="text-[#9ae600]">{zone.points}</span>
                  </div>
                  <div className="text-[#71717b] text-[10px]">{zone.time}</div>
                </div>
              ))}
            </div>

            {/* Action */}
            <button className="w-full mt-4 px-3 py-2 bg-[#09090b] border border-[#27272a] rounded text-xs hover:bg-[#27272a] transition-colors flex items-center justify-center gap-2">
              <FileText className="w-3 h-3" />
              View Full Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StaffDirectoryProps {
  searchQuery: string;
  staffList: StaffMember[];
}

function StaffDirectory({ searchQuery, staffList }: StaffDirectoryProps) {
  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = searchQuery === '' ||
      staff.staff_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a]">
        <h3 className="text-lg">Staff Directory</h3>
        <p className="text-sm text-[#9f9fa9] mt-1">{filteredStaff.length} team members</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272a]">
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Name</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Role</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Department</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Property</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Contact</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3">Status</th>
              <th className="text-left text-xs text-[#9f9fa9] px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <StaffRow key={staff.staff_id} staff={staff} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StaffRow({ staff }: { staff: StaffMember }) {
  const avatar = staff.staff_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
            <span className="text-xs">{avatar}</span>
          </div>
          <div>
            <div className="text-sm text-white">{staff.staff_name}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#d4d4d8]">{staff.role}</div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-[#d4d4d8]">{staff.department}</div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-[#9f9fa9]">
          <MapPin className="w-3 h-3" />
          {staff.property_id}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          {staff.email && (
            <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
              <Mail className="w-3 h-3" />
              {staff.email}
            </div>
          )}
          {staff.phone_number && (
            <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
              <Phone className="w-3 h-3" />
              {staff.phone_number}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${staff.status === 'active'
          ? 'bg-[#9ae600]/10 text-[#9ae600]'
          : 'bg-[#f0b100]/10 text-[#f0b100]'
          }`}>
          {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-4">
        <button className="p-1 hover:bg-[#27272a] rounded transition-colors">
          <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
        </button>
      </td>
    </tr>
  );
}
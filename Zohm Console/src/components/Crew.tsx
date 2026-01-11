import { ChevronDown, Search, Plus, MoreVertical, Mail, Phone, MapPin, TrendingUp, Clock, Award, CheckCircle2, FileText } from 'lucide-react';
import { useState } from 'react';

interface CrewProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

export function Crew({ selectedProperty, onPropertyChange, embedded = false }: CrewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {!embedded && <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px] space-y-6">
          <StaffOverview />
          <PerformanceReports />
          <DailyReports />
          <StaffDirectory searchQuery={searchQuery} selectedProperty={selectedProperty} />
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

function StaffOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <OverviewCard
        title="Total Staff"
        value="9"
        subtitle="All crew members"
        color="text-[#9ae600]"
      />
      
      <OverviewCard
        title="Active atm"
        value="8"
        subtitle="Currently working"
        color="text-[#9ae600]"
      />
      
      <OverviewCard
        title="On Leave"
        value="1"
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

function PerformanceReports() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PerformanceCard
        title="Rev per Employee"
        value="₹42.5K"
        subtitle="Last 30 days"
        color="text-[#06b6d4]"
      />

      <PerformanceCard
        title="Top Performer"
        value="Inderjeet"
        subtitle="12,340 points"
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

function DailyReports() {
  const reports = [
    {
      id: 1,
      name: "Indrajeet Kushwaha",
      role: "Housekeeping",
      avatar: "IK",
      zones: 3,
      tasks: 24,
      points: 10519,
      workTime: "3h 17m",
      breaks: "0m",
      zonesDetail: [
        { name: "Dining Area", time: "118min", points: "+3527 pts" },
        { name: "Schelling Point", time: "7min", points: "+3043 pts" },
        { name: "Zo Studio", time: "72min", points: "+3949 pts" },
      ]
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Sous Chef",
      avatar: "PS",
      zones: 2,
      tasks: 18,
      points: 8945,
      workTime: "4h 22m",
      breaks: "15m",
      zonesDetail: [
        { name: "Main Kitchen", time: "165min", points: "+4720 pts" },
        { name: "Prep Station", time: "97min", points: "+4225 pts" },
      ]
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "House Captain",
      avatar: "RV",
      zones: 1,
      tasks: 32,
      points: 12340,
      workTime: "5h 45m",
      breaks: "20m",
      zonesDetail: [
        { name: "Reception", time: "345min", points: "+12340 pts" },
      ]
    },
    {
      id: 4,
      name: "Karan Malhotra",
      role: "Vibe Curator",
      avatar: "KM",
      zones: 4,
      tasks: 15,
      points: 9876,
      workTime: "3h 55m",
      breaks: "10m",
      zonesDetail: [
        { name: "Pool Area", time: "85min", points: "+2845 pts" },
        { name: "Gym", time: "45min", points: "+1980 pts" },
        { name: "Common Areas", time: "62min", points: "+2651 pts" },
        { name: "Rooftop", time: "43min", points: "+2400 pts" },
      ]
    },
  ];

  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
        <div>
          <h3 className="text-lg">Daily Performance Reports</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Thursday, January 01, 2026</p>
        </div>
        <button className="text-sm text-[#9ae600] hover:underline flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4 hover:border-[#9ae600] transition-colors">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#27272a]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shrink-0">
                <span className="text-xs">{report.avatar}</span>
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
                <div className="text-lg text-[#9ae600]">{report.zones}</div>
              </div>
              <div>
                <div className="text-xs text-[#9f9fa9]">Tasks</div>
                <div className="text-lg text-[#06b6d4]">{report.tasks}</div>
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
                <span className="text-white">{report.workTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9f9fa9]">Breaks</span>
                <span className="text-white">{report.breaks}</span>
              </div>
            </div>

            {/* Zones Detail */}
            <div className="space-y-2">
              <div className="text-xs text-[#9f9fa9] mb-2">Zones Cleaned:</div>
              {report.zonesDetail.map((zone, idx) => (
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
  selectedProperty: string;
}

function StaffDirectory({ searchQuery, selectedProperty }: StaffDirectoryProps) {
  const staffMembers = [
    {
      id: 1,
      name: "Arjun Patel",
      role: "House Captain",
      department: "Operations",
      property: "zo-house-bali",
      propertyName: "Zo House Bali",
      email: "arjun.p@zoworld.com",
      phone: "+91 98765 43210",
      status: "Active",
      avatar: "AP"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Chef",
      department: "Cafe",
      property: "zo-house-bali",
      propertyName: "Zo House Bali",
      email: "priya.s@zoworld.com",
      phone: "+91 98765 43211",
      status: "Active",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Indrajeet Kushwaha",
      role: "Housekeeping",
      department: "Operations",
      property: "zo-house-portugal",
      propertyName: "Zo House Portugal",
      email: "indrajeet.k@zoworld.com",
      phone: "+91 98765 43212",
      status: "Active",
      avatar: "IK"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Sous Chef",
      department: "Cafe",
      property: "zo-house-thailand",
      propertyName: "Zo House Thailand",
      email: "sneha.r@zoworld.com",
      phone: "+91 98765 43213",
      status: "On Leave",
      avatar: "SR"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Vibe Curator",
      department: "Vibe Curation",
      property: "zo-house-tulum",
      propertyName: "Zo House Tulum",
      email: "vikram.s@zoworld.com",
      phone: "+91 98765 43214",
      status: "Active",
      avatar: "VS"
    },
    {
      id: 6,
      name: "Anjali Gupta",
      role: "Sales",
      department: "Sales",
      property: "all",
      propertyName: "HQ - Mumbai",
      email: "anjali.g@zoworld.com",
      phone: "+91 98765 43215",
      status: "Active",
      avatar: "AG"
    },
    {
      id: 7,
      name: "Karan Malhotra",
      role: "Vibe Curator",
      department: "Vibe Curation",
      property: "zo-house-barcelona",
      propertyName: "Zo House Barcelona",
      email: "karan.m@zoworld.com",
      phone: "+91 98765 43216",
      status: "Active",
      avatar: "KM"
    },
    {
      id: 8,
      name: "Rahul Verma",
      role: "House Captain",
      department: "Operations",
      property: "all",
      propertyName: "HQ - Mumbai",
      email: "rahul.v@zoworld.com",
      phone: "+91 98765 43217",
      status: "Active",
      avatar: "RV"
    },
    {
      id: 9,
      name: "Meera Nair",
      role: "Housekeeping",
      department: "Operations",
      property: "zo-house-bali",
      propertyName: "Zo House Bali",
      email: "meera.n@zoworld.com",
      phone: "+91 98765 43218",
      status: "Active",
      avatar: "MN"
    },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = searchQuery === '' || 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProperty = selectedProperty === 'all' || staff.property === selectedProperty || staff.property === 'all';
    
    return matchesSearch && matchesProperty;
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
              <StaffRow key={staff.id} staff={staff} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface Staff {
  id: number;
  name: string;
  role: string;
  department: string;
  property: string;
  propertyName: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
}

function StaffRow({ staff }: { staff: Staff }) {
  return (
    <tr className="border-b border-[#27272a] hover:bg-[#18181b] transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
            <span className="text-xs">{staff.avatar}</span>
          </div>
          <div>
            <div className="text-sm text-white">{staff.name}</div>
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
          {staff.propertyName}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
            <Mail className="w-3 h-3" />
            {staff.email}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
            <Phone className="w-3 h-3" />
            {staff.phone}
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
          staff.status === 'Active' 
            ? 'bg-[#9ae600]/10 text-[#9ae600]' 
            : 'bg-[#f0b100]/10 text-[#f0b100]'
        }`}>
          {staff.status}
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
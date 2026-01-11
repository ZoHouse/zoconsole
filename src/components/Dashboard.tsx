import { ChevronDown } from 'lucide-react';
import { Users } from 'lucide-react';

interface DashboardProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function Dashboard({ selectedProperty, onPropertyChange }: DashboardProps) {
  return (
    <>
      <Header selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <StatsGrid />
      </main>
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

function Header({ selectedProperty, onPropertyChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Zohm</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Vibe Check Central</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] whitespace-nowrap">
            <span className="text-sm">Today</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        title="Total Bookings"
        value="2118"
        subtitle="-583"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="GBV"
        value="₹70.53L"
        subtitle="-₹21.15L"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="Cities"
        value="1"
        subtitle="4 inactive"
        subtitleColor="text-[#71717b]"
      />
      
      <StatCard
        title="Zo Houses"
        value="2"
        subtitle="4 inactive"
        subtitleColor="text-[#fb2c36]"
      />
      
      <MetricCard
        icon={<Users className="w-5 h-5 text-[#9ae600]" />}
        title="Citizens"
        value="5,14,155"
        subtitle="15,51,228 shadow citizens"
        subtitleColor="text-[#71717b]"
      />
      
      <StatCard
        title="Nodes"
        value="22/344"
        subtitle="308 pending • 14 rejected"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="POA"
        value="0/0"
        subtitle="0 inactive • 0 expired"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="Events"
        value="0/0"
        subtitle="0 inactive"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="Portals"
        value="0/0"
        subtitle="0 inactive"
        subtitleColor="text-[#fb2c36]"
      />
      
      <StatCard
        title="Rating"
        value="0.0 (0)"
        subtitle="0.0"
        subtitleColor="text-[#f0b100]"
        valueColor="text-[#f0b100]"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  valueColor?: string;
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  subtitleColor = 'text-[#fb2c36]',
  valueColor = 'text-[#9ae600]'
}: StatCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors">
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className={`text-2xl mb-1 ${valueColor}`}>{value}</div>
      <div className={`text-xs ${subtitleColor}`}>{subtitle}</div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  valueColor?: string;
}

function MetricCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  subtitleColor = 'text-[#fb2c36]',
  valueColor = 'text-[#9ae600]'
}: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-colors">
      <div className="text-xs text-[#9f9fa9] mb-2">{title}</div>
      <div className={`text-2xl mb-1 ${valueColor}`}>{value}</div>
      <div className={`text-xs ${subtitleColor}`}>{subtitle}</div>
      <div className="mt-2">{icon}</div>
    </div>
  );
}
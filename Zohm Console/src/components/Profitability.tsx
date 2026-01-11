import { ChevronDown } from 'lucide-react';

interface ProfitabilityProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

export function Profitability({ selectedProperty, onPropertyChange, embedded = false }: ProfitabilityProps) {
  return (
    <>
      {!embedded && <Header selectedProperty={selectedProperty} onPropertyChange={onPropertyChange} />}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px]">
          <MetricsOverview />
          <div className="mt-6">
            <RevenueBreakdown />
          </div>
        </div>
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
          <h1 className="text-xl sm:text-2xl">Profitability</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Revenue and cost analysis</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] whitespace-nowrap">
            <span className="text-xs sm:text-sm">Last 30 Days</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value="₹45.2L"
        change="+12.5%"
        changeType="positive"
      />
      
      <MetricCard
        title="Total Costs"
        value="₹28.8L"
        change="+8.2%"
        changeType="negative"
      />
      
      <MetricCard
        title="Net Profit"
        value="₹16.4L"
        change="+18.9%"
        changeType="positive"
      />
      
      <MetricCard
        title="Profit Margin"
        value="36.3%"
        change="+2.1%"
        changeType="positive"
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

function MetricCard({ title, value, change, changeType }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className="text-xs text-[#9f9fa9] mb-3">{title}</div>
      <div className="text-3xl text-[#9ae600] mb-2">{value}</div>
      <div className={`text-sm ${changeType === 'positive' ? 'text-[#9ae600]' : 'text-[#fb2c36]'}`}>
        {change} from last period
      </div>
    </div>
  );
}

function RevenueBreakdown() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Revenue by Category</h3>
        <div className="space-y-4">
          <RevenueItem label="Room Bookings" value="₹32.5L" percentage={72} />
          <RevenueItem label="Cafe & F&B" value="₹8.2L" percentage={18} />
          <RevenueItem label="Events" value="₹3.1L" percentage={7} />
          <RevenueItem label="Other Services" value="₹1.4L" percentage={3} />
        </div>
      </div>
      
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">Cost Breakdown</h3>
        <div className="space-y-4">
          <CostItem label="Property & Utilities" value="₹9.2L" percentage={32} />
          <CostItem label="Staff Costs" value="₹11.5L" percentage={40} />
          <CostItem label="Operations & Supplies" value="₹3.8L" percentage={13} />
          <CostItem label="Maintenance & Repairs" value="₹2.1L" percentage={7} />
          <CostItem label="Marketing & Administration" value="₹1.6L" percentage={6} />
          <CostItem label="Guest Services & Other" value="₹0.6L" percentage={2} />
        </div>
      </div>
    </div>
  );
}

interface RevenueItemProps {
  label: string;
  value: string;
  percentage: number;
}

function RevenueItem({ label, value, percentage }: RevenueItemProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[#d4d4d8]">{label}</span>
        <span className="text-sm text-[#9ae600]">{value}</span>
      </div>
      <div className="w-full bg-[#27272a] rounded-full h-2">
        <div 
          className="bg-[#9ae600] h-2 rounded-full transition-all" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CostItemProps {
  label: string;
  value: string;
  percentage: number;
}

function CostItem({ label, value, percentage }: CostItemProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[#d4d4d8]">{label}</span>
        <span className="text-sm text-[#fb2c36]">{value}</span>
      </div>
      <div className="w-full bg-[#27272a] rounded-full h-2">
        <div 
          className="bg-[#fb2c36] h-2 rounded-full transition-all" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
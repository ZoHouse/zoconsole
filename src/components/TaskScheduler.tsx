import { Plus, Search, Edit, Trash2, Send, Clock, Camera, ChevronDown, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchNodeData, getUniqueZonesFromTasks, type HousekeepingTask, type Zone } from '../services/nodes';


interface TaskSchedulerProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function TaskScheduler({ selectedProperty, onPropertyChange }: TaskSchedulerProps) {
  // const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all'); // Removed tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [tasks, setTasks] = useState<HousekeepingTask[]>([]);
  const [zones, setZones] = useState<{ id: string; name: string; floor: string }[]>([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  useEffect(() => {
    if (!selectedProperty || selectedProperty === 'all') return;

    fetchNodeData(selectedProperty)
      .then(nodeData => {
        setTasks(nodeData.housekeeping_tasks);
        // Get unique zones from tasks for filtering
        const uniqueZones = getUniqueZonesFromTasks(nodeData.housekeeping_tasks);
        setZones(uniqueZones);
        // Calculate stats from housekeeping tasks
        const taskCount = nodeData.housekeeping_tasks?.length || 0;
        setActiveTasksCount(taskCount);
        setCompletedTasksCount(0); // No status in current API
        setPendingTasksCount(taskCount);
      })
      .catch(console.error);
  }, [selectedProperty]);

  const filteredTasks = (tasks || []).filter(task => {
    const matchesSearch = (task.template_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.use_case || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.zone_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || task.zone_id === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      <div className="max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl">Daily Task Management</h2>
            <p className="text-sm text-[#9f9fa9] mt-1">Manage predefined tasks for distribution</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Active Tasks"
            value={activeTasksCount.toString()}
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="Active Crew"
            value="-"
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Tasks Completed"
            value={completedTasksCount.toString()}
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Tasks Pending"
            value={pendingTasksCount.toString()}
            color="text-[#f0b100]"
          />
        </div>

        {/* Filters and Tabs */}
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[#27272a]">
            {/* Tabs */}
            {/* Tabs - Removed as per request */}
            <div className="flex px-4 py-3 border-r border-[#27272a]">
              <span className="text-sm font-medium text-white">All Tasks</span>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2 p-3 sm:p-0 sm:pr-4 border-t sm:border-t-0 border-[#27272a]">
              <div className="flex-1 sm:flex-initial relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-[#09090b] border border-[#27272a] rounded pl-10 pr-4 py-2 text-sm text-white placeholder-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="appearance-none bg-[#09090b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600]"
                >
                  <option value="all">All Zones</option>
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.floor})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
              </div>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="overflow-x-auto">
            <TasksTable tasks={filteredTasks} />
          </div>
        </div>
      </div>
    </main>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#9f9fa9]">{label}</span>
        <div className={`p-2 bg-[#27272a] rounded ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}

interface TasksTableProps {
  tasks: HousekeepingTask[];
}

function TasksTable({ tasks }: TasksTableProps) {
  return (
    <table className="w-full min-w-[900px]">
      <thead className="bg-[#09090b] border-b border-[#27272a]">
        <tr>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Zone ID</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Zone Name</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Floor</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Template ID</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Template Name</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Use Case</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id || index} className="border-b border-[#27272a] hover:bg-[#27272a]/30 transition-colors">
            <td className="px-4 py-3 text-sm text-[#9ae600]">{task.zone_id}</td>
            <td className="px-4 py-3 text-sm">{task.zone_name}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9]">{task.floor}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9]">{task.template_id}</td>
            <td className="px-4 py-3 text-sm font-medium">{task.template_name}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9] max-w-xs truncate">{task.use_case}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-[#3a3a3a] rounded transition-colors">
                  <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
                </button>
                <button className="p-1.5 hover:bg-[#3a3a3a] rounded transition-colors">
                  <Send className="w-3.5 h-3.5 text-[#9ae600]" />
                </button>
                <button className="p-1.5 hover:bg-[#3a3a3a] rounded transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-[#fb2c36]" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
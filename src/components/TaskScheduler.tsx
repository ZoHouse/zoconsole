import { Plus, Search, Edit, Trash2, Send, Clock, Camera, ChevronDown, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchTasks, type Task } from '../services/dashboard';

interface TaskSchedulerProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function TaskScheduler({ selectedProperty, onPropertyChange }: TaskSchedulerProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  useEffect(() => {
    fetchTasks(selectedProperty)
      .then(fetchedTasks => {
        setTasks(fetchedTasks);
        // Calculate basic stats from fetched tasks
        setActiveTasksCount(fetchedTasks.filter(t => t.status === 'scheduled' || t.status === 'in_progress').length);
        setCompletedTasksCount(fetchedTasks.filter(t => t.status === 'completed').length);
        setPendingTasksCount(fetchedTasks.filter(t => t.status === 'pending' || t.status === 'scheduled').length);
      })
      .catch(console.error);
  }, [selectedProperty]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = (task.task_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.task_description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.zone_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || task.zone_id === selectedZone;
    // Priority logic might need adjustment if priority is not standard.
    // Assuming priority is number if present, otherwise default to something or ignore.
    const priority = task.priority || 999;

    const matchesTab = activeTab === 'all' ||
      (activeTab === 'high' && priority <= 2) ||
      (activeTab === 'medium' && priority > 2 && priority <= 5) ||
      (activeTab === 'low' && priority > 5);
    return matchesSearch && matchesZone && matchesTab;
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
            <div className="flex overflow-x-auto">
              {['all', 'high', 'medium', 'low'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab
                    ? 'border-[#9ae600] text-white'
                    : 'border-transparent text-[#9f9fa9] hover:text-white'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab !== 'all' ? 'Priority' : 'Tasks'}
                </button>
              ))}
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
                  <option value="ZONE001">Degen Lounge</option>
                  <option value="ZONE002">Dining Area</option>
                  <option value="ZONE003">Warp Zone</option>
                  <option value="ZONE004">Zo Studio</option>
                  <option value="ZONE005">Bathrooms</option>
                  <option value="ZONE006">Kitchen</option>
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
  tasks: Task[];
}

function TasksTable({ tasks }: TasksTableProps) {
  return (
    <table className="w-full min-w-[1200px]">
      <thead className="bg-[#09090b] border-b border-[#27272a]">
        <tr>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Zone ID</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Zone Name</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Task ID</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Title</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Description</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Priority</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Est. Time</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Photo</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Assigned To</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Status</th>
          <th className="text-left px-4 py-3 text-xs text-[#9f9fa9]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="border-b border-[#27272a] hover:bg-[#27272a]/30 transition-colors">
            <td className="px-4 py-3 text-sm">{task.zone_id || '-'}</td>
            <td className="px-4 py-3 text-sm">{task.zone_name || '-'}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9]">{task.task_id}</td>
            <td className="px-4 py-3 text-sm">{task.task_name}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9] max-w-xs truncate">{task.task_description}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${(task.priority || 999) <= 2
                  ? 'bg-[#fb2c36]/10 text-[#fb2c36]'
                  : (task.priority || 999) <= 5
                    ? 'bg-[#f0b100]/10 text-[#f0b100]'
                    : 'bg-[#9f9fa9]/10 text-[#9f9fa9]'
                }`}>
                {task.priority || '-'}
              </span>
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex items-center gap-1 text-[#9f9fa9]">
                <Clock className="w-3.5 h-3.5" />
                {task.estimated_time || '-'}
              </div>
            </td>
            <td className="px-4 py-3">
              {task.photo_required === 'yes' ? (
                <div className="flex items-center gap-1 text-[#9ae600]">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs">Yes</span>
                </div>
              ) : (
                <span className="text-xs text-[#71717b]">No</span>
              )}
            </td>
            <td className="px-4 py-3 text-sm">{task.assigned_to || '-'}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${task.status === 'completed'
                  ? 'bg-[#9ae600]/10 text-[#9ae600]'
                  : 'bg-[#f0b100]/10 text-[#f0b100]'
                }`}>
                {task.status || 'Pending'}
              </span>
            </td>
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
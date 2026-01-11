import { Plus, Search, Edit, Trash2, Send, Clock, Camera, ChevronDown, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useState } from 'react';

interface TaskSchedulerProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function TaskScheduler({ selectedProperty, onPropertyChange }: TaskSchedulerProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6">
      <div className="max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl">Daily Task Management</h2>
            <p className="text-sm text-[#9f9fa9] mt-1">Manage predefined tasks for WhatsApp bot distribution</p>
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
            value="26"
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="Active Crew"
            value="12"
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Tasks Completed"
            value="18"
            color="text-[#9ae600]"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Tasks Pending (24h)"
            value="6"
            color="text-[#f0b100]"
          />
        </div>

        {/* Filters and Tabs */}
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[#27272a]">
            {/* Tabs */}
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'all'
                    ? 'border-[#9ae600] text-white'
                    : 'border-transparent text-[#9f9fa9] hover:text-white'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setActiveTab('high')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'high'
                    ? 'border-[#9ae600] text-white'
                    : 'border-transparent text-[#9f9fa9] hover:text-white'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setActiveTab('medium')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'medium'
                    ? 'border-[#9ae600] text-white'
                    : 'border-transparent text-[#9f9fa9] hover:text-white'
                }`}
              >
                Medium Priority
              </button>
              <button
                onClick={() => setActiveTab('low')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'low'
                    ? 'border-[#9ae600] text-white'
                    : 'border-transparent text-[#9f9fa9] hover:text-white'
                }`}
              >
                Low Priority
              </button>
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
            <TasksTable searchQuery={searchQuery} selectedZone={selectedZone} activeTab={activeTab} />
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
  searchQuery: string;
  selectedZone: string;
  activeTab: 'all' | 'high' | 'medium' | 'low';
}

function TasksTable({ searchQuery, selectedZone, activeTab }: TasksTableProps) {
  const tasks = [
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-1',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Maria Chen'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-2',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 2,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'completed',
      assignedTo: 'John Smith'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-3',
      title: 'Meeting Pod',
      description: 'Remove any clutter and clean the meeting pod',
      priority: 3,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Sarah Johnson'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-4',
      title: 'Sitting Area',
      description: 'Reshape beanbags/cushions, Clean coffee table, Restock Supplies',
      priority: 4,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Mike Davis'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-5',
      title: 'Console table',
      description: 'Clean and arrange console table',
      priority: 5,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'completed',
      assignedTo: 'Emma Wilson'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-6',
      title: 'Garbage',
      description: 'Collect garbage and replace new garbage bags',
      priority: 3,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'David Lee'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-7',
      title: 'Balcony',
      description: 'Clean and arrange seating in balcony',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Lisa Brown'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-8',
      title: 'Dusting',
      description: 'Dust the applewheels from ceiling',
      priority: 6,
      estimatedMinutes: 10,
      requiresPhoto: true,
      status: 'completed',
      assignedTo: 'Tom Anderson'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-9',
      title: 'Floor',
      description: 'Dusting and Mop Floor after removing doormats',
      priority: 7,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Amy Taylor'
    },
    {
      zoneId: 'ZONE001',
      zoneName: 'Degen Lounge',
      areaPriority: 1,
      taskId: '1.ZONE001-10',
      title: 'Inspection',
      description: 'Check all lights, plug sockets, projector, wifi modem is working',
      priority: 8,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Chris Martin'
    },
    {
      zoneId: 'ZONE002',
      zoneName: 'Dining Area',
      areaPriority: 2,
      taskId: '2.ZONE002-1',
      title: 'Dining table',
      description: 'Clean Tables and Chairs, Restock Supplies',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Maria Chen'
    },
    {
      zoneId: 'ZONE002',
      zoneName: 'Dining Area',
      areaPriority: 2,
      taskId: '2.ZONE002-2',
      title: 'Dusting',
      description: 'Dust the applewheels from ceiling',
      priority: 6,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'completed',
      assignedTo: 'John Smith'
    },
    {
      zoneId: 'ZONE002',
      zoneName: 'Dining Area',
      areaPriority: 2,
      taskId: '2.ZONE002-3',
      title: 'Floor',
      description: 'Dusting and Mop Floor after removing doormats',
      priority: 7,
      estimatedMinutes: 10,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Sarah Johnson'
    },
    {
      zoneId: 'ZONE002',
      zoneName: 'Dining Area',
      areaPriority: 2,
      taskId: '2.ZONE002-4',
      title: 'Inspection',
      description: 'Check all lights, plug sockets, projector, wifi modem is working',
      priority: 8,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Mike Davis'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-1',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Emma Wilson'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-2',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'completed',
      assignedTo: 'David Lee'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-3',
      title: 'Garbage',
      description: 'Collect garbage and replace new garbage bags',
      priority: 3,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Lisa Brown'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-4',
      title: 'Dusting',
      description: 'Dust the applewheels from ceiling',
      priority: 6,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'completed',
      assignedTo: 'Tom Anderson'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-5',
      title: 'Floor',
      description: 'Dusting and Mop Floor after removing doormats',
      priority: 5,
      estimatedMinutes: 10,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Amy Taylor'
    },
    {
      zoneId: 'ZONE003',
      zoneName: 'Warp Zone',
      areaPriority: 3,
      taskId: '3.ZONE003-6',
      title: 'Inspection',
      description: 'Check all lights, plug sockets, projector, wifi modem is working',
      priority: 6,
      estimatedMinutes: 5,
      requiresPhoto: false,
      status: 'scheduled',
      assignedTo: 'Chris Martin'
    },
    {
      zoneId: 'ZONE004',
      zoneName: 'Zo Studio',
      areaPriority: 4,
      taskId: '4.ZONE004-1',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'scheduled',
      assignedTo: 'Maria Chen'
    },
    {
      zoneId: 'ZONE004',
      zoneName: 'Zo Studio',
      areaPriority: 4,
      taskId: '4.ZONE004-2',
      title: 'Workstation',
      description: 'Clean and arrange the work chair, table, pen stand, table lamp, desk mat, water bottle, extension board, and',
      priority: 1,
      estimatedMinutes: 5,
      requiresPhoto: true,
      status: 'completed',
      assignedTo: 'John Smith'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.zoneName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || task.zoneId === selectedZone;
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'high' && task.priority <= 2) ||
                       (activeTab === 'medium' && task.priority > 2 && task.priority <= 5) ||
                       (activeTab === 'low' && task.priority > 5);
    return matchesSearch && matchesZone && matchesTab;
  });

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
        {filteredTasks.map((task, index) => (
          <tr key={index} className="border-b border-[#27272a] hover:bg-[#27272a]/30 transition-colors">
            <td className="px-4 py-3 text-sm">{task.zoneId}</td>
            <td className="px-4 py-3 text-sm">{task.zoneName}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9]">{task.taskId}</td>
            <td className="px-4 py-3 text-sm">{task.title}</td>
            <td className="px-4 py-3 text-sm text-[#9f9fa9] max-w-xs truncate">{task.description}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                task.priority <= 2
                  ? 'bg-[#fb2c36]/10 text-[#fb2c36]'
                  : task.priority <= 5
                  ? 'bg-[#f0b100]/10 text-[#f0b100]'
                  : 'bg-[#9f9fa9]/10 text-[#9f9fa9]'
              }`}>
                {task.priority}
              </span>
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex items-center gap-1 text-[#9f9fa9]">
                <Clock className="w-3.5 h-3.5" />
                {task.estimatedMinutes}m
              </div>
            </td>
            <td className="px-4 py-3">
              {task.requiresPhoto ? (
                <div className="flex items-center gap-1 text-[#9ae600]">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs">Yes</span>
                </div>
              ) : (
                <span className="text-xs text-[#71717b]">No</span>
              )}
            </td>
            <td className="px-4 py-3 text-sm">{task.assignedTo}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                task.status === 'completed'
                  ? 'bg-[#9ae600]/10 text-[#9ae600]'
                  : 'bg-[#f0b100]/10 text-[#f0b100]'
              }`}>
                {task.status}
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
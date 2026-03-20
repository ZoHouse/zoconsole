import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Play, MapPin, Clock, ChevronDown, X, GripVertical, CheckCircle2, Edit2, Send, User, Camera, Bot, ListChecks, FileText, Layers, Package, ChevronRight } from 'lucide-react';
import { CreateTaskModal, CreateTemplateModal, CreatePlaylistModal } from './TaskTemplatePlaylistModals';
import { fetchNodeData, fetchPlaylists, fetchTasks, fetchTemplates, getUniqueZonesFromTasks, getUniqueTemplatesFromTasks, createTask, createTemplate, createZoneTemplate, createPlaylist, type HousekeepingTask, type Zone, type NodeTemplate, type CreateTaskPayload, type CreateTemplatePayload, type CreateZoneTemplatePayload, type CreatePlaylistPayload, type APIPlaylist, type APITask, type APITemplateItem, type NodeData } from '../services/nodes';

interface PlaylistManagerProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  embedded?: boolean;
}

// Individual Task
interface Task {
  id: string;
  name: string;
  description?: string;
  requiresPhoto: boolean;
  aiVerification: boolean;
  estimatedMinutes: number;
  templateId: string;
  status: 'active' | 'archived';
}

// Template = Zone-assigned collection of ordered tasks
interface Template {
  id: string;
  name: string;
  description?: string;
  zone: {
    id: string;
    name: string;
    type: 'studio' | 'dorm' | 'private_room' | 'common';
    floor: string;
  };
  tasks: {
    taskId: string;
    order: number;
  }[];
  totalTasks: number;
  totalMinutes: number;
  photosRequired: number;
  status: 'active' | 'draft' | 'archived';
}

// Playlist = Collection of templates
interface Playlist {
  id: string;
  name: string;
  description?: string;
  type: 'room_turnover' | 'deep_clean' | 'event_setup' | 'event_breakdown' | 'emergency' | 'custom';
  priority: 'urgent' | 'normal' | 'low';
  templateIds: string[];
  lastUsed?: string;
  usageCount: number;
  totalTasks: number;
  totalTimeMins: number;
  photosRequired: number;
  status: 'active' | 'draft' | 'archived';
  assignedTo?: string;
  completionRate?: number;
}

type TabView = 'tasks' | 'templates' | 'playlists';

export function PlaylistManager({ selectedProperty, onPropertyChange, embedded = true }: PlaylistManagerProps) {
  const [activeTab, setActiveTab] = useState<TabView>('playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);

  // Accordion states for dropdown behavior
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([]);

  // API Data State
  const [housekeepingTasks, setHousekeepingTasks] = useState<HousekeepingTask[]>([]);
  const [apiZones, setApiZones] = useState<{ id: string; name: string; floor: string; type: string }[]>([]);

  const [apiPlaylists, setApiPlaylists] = useState<APIPlaylist[]>([]);
  const [apiTasks, setApiTasks] = useState<APITask[]>([]);
  const [apiTemplateItems, setApiTemplateItems] = useState<APITemplateItem[]>([]);

  // Fetch node data on property change
  useEffect(() => {
    if (!selectedProperty || selectedProperty === 'all') return;

    setIsLoading(true);

    Promise.all([
      fetchNodeData(selectedProperty),
      fetchPlaylists(selectedProperty),
      fetchTasks(selectedProperty),
      fetchTemplates(selectedProperty)
    ])
      .then(([nodeData, playlists, tasks, templateItems]) => {
        setHousekeepingTasks(nodeData.housekeeping_tasks);
        setApiPlaylists(playlists);
        setApiTasks(tasks);
        setApiTemplateItems(templateItems);

        refreshZonesData(nodeData);


      })
      .catch((err) => { console.error('DEBUG: Fetch failed', err); })
      .finally(() => setIsLoading(false));
  }, [selectedProperty]);

  // Helper to refresh zones by merging explicit list and task-derived data
  const refreshZonesData = (nodeData: NodeData) => {
    const zoneMap = new Map<string, { id: string; name: string; floor: string; type: string }>();

    // 1. Add task-derived zones (baseline)
    const uniqueFromTasks = getUniqueZonesFromTasks(nodeData.housekeeping_tasks);
    uniqueFromTasks.forEach((z: { id: string; name: string; floor: string }) => {
      zoneMap.set(z.id, {
        id: z.id,
        name: z.name,
        floor: z.floor,
        type: 'common'
      });
    });

    // 2. Add/Override with explicit zones (better metadata)
    if (nodeData.zones && nodeData.zones.length > 0) {
      nodeData.zones.forEach((z: Zone) => {
        zoneMap.set(z.id, {
          id: z.id,
          name: z.name,
          floor: z.floor,
          type: z.zone_type || 'common'
        });
      });
    }

    setApiZones(Array.from(zoneMap.values()));
  };

  // Transform API data to component-compatible format
  const tasks: Task[] = apiTasks.map(task => ({
    id: task.task_id, // Use logical ID like CK-001
    name: task.task_name,
    description: task.task_description,
    requiresPhoto: task.photo_required?.toLowerCase() === 'yes',
    aiVerification: true, // Default
    estimatedMinutes: parseInt(task.estimated_time || '5'),
    templateId: '', // Tasks from the library are independent until assigned
    status: 'active' as const
  }));

  // Build templates from zone-template groupings (Zone Assignments)
  // Transform apiTemplateItems into a Template Library (grouped by template_id)
  const templates: Template[] = Object.values(apiTemplateItems.reduce((acc, item) => {
    // Lookup full task details for each item to get photo requirements, etc.
    const taskDetails = apiTasks.find(t => t.task_id === item.task_id);
    const requiresPhoto = taskDetails?.photo_required?.toLowerCase() === 'yes';

    if (!acc[item.template_id]) {
      // Find a representative zone for this template from its assignments (housekeeping_tasks)
      const assignment = housekeepingTasks.find(lt => lt.template_id === item.template_id);
      const zoneDetails = assignment ? apiZones.find(z => z.id === assignment.zone_id) : null;

      acc[item.template_id] = {
        id: item.template_id,
        name: item.template_name,
        description: `Template: ${item.template_name}`,
        zone: zoneDetails ? {
          id: zoneDetails.id,
          name: zoneDetails.name,
          type: zoneDetails.type as any,
          floor: zoneDetails.floor
        } : {
          id: 'library',
          name: 'Library',
          type: 'common' as const,
          floor: '-'
        },
        tasks: [],
        totalTasks: 0,
        totalMinutes: 0,
        photosRequired: 0,
        status: 'active' as const
      };
    }

    // Add task to this template
    acc[item.template_id].tasks.push({
      taskId: item.task_id,
      name: item.task_name,
      order: parseInt(item.item_order),
      estimatedMinutes: parseInt(item.total_est_time || taskDetails?.estimated_time || '0'),
      requiresPhoto: requiresPhoto,
      aiVerification: true // Default for real tasks
    });

    // Update stats
    acc[item.template_id].totalTasks++;
    acc[item.template_id].totalMinutes += parseInt(item.total_est_time || taskDetails?.estimated_time || '0');
    if (requiresPhoto) {
      acc[item.template_id].photosRequired++;
    }

    return acc;
  }, {} as Record<string, any>)) // using any for temp accumulator structure matching
    .map(template => ({
      ...template,
      tasks: template.tasks.sort((a: any, b: any) => a.order - b.order)
    }));







  // Build selectable templates for Dropdowns (using actual API templates)
  const selectableTemplates: Template[] = templates;

  // Transform API playlists to component Playlists
  const playlists: Playlist[] = apiPlaylists.map(pl => {
    // Parse template IDs - try multiple fields as DB schema might vary or field usage might differ
    const tIds = (pl.template_ids || pl.templates_included || '').split(',').filter(Boolean);

    // Calculate tasks count by finding tasks that belong to these templates
    const tasksInPlaylist = housekeepingTasks.filter(task => tIds.includes(task.template_id));

    return {
      id: pl.id,
      name: pl.playlist_type === 'custom' ? (pl.id.slice(0, 8)) : pl.playlist_type, // Fallback name
      description: pl.playlist_type,
      type: (['room_turnover', 'deep_clean', 'event_setup', 'event_breakdown', 'emergency', 'custom'].includes(pl.playlist_type) ? pl.playlist_type : 'custom') as any,
      priority: (['urgent', 'normal', 'low'].includes(pl.priority) ? pl.priority : 'normal') as any,
      templateIds: tIds,
      usageCount: 0,
      totalTasks: tasksInPlaylist.length,
      totalTimeMins: parseInt(pl.est_time || '0'),
      photosRequired: 0, // Property not available in current API response
      status: 'active',
    };
  });

  const getPriorityConfig = (priority: 'urgent' | 'normal' | 'low') => {
    switch (priority) {
      case 'urgent':
        return { emoji: '🔴', label: 'URGENT', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10' };
      case 'normal':
        return { emoji: '🟢', label: 'NORMAL', color: 'text-[#9ae600]', bg: 'bg-[#9ae600]/10' };
      case 'low':
        return { emoji: '⚫', label: 'LOW', color: 'text-[#71717b]', bg: 'bg-[#71717b]/10' };
    }
  };

  const getZoneTypeIcon = (type: string) => {
    switch (type) {
      case 'studio': return '🏢';
      case 'dorm': return '🛏️';
      case 'private_room': return '🚪';
      case 'common': return '🏛️';
      default: return '📍';
    }
  };

  const handleUsePlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setShowAssignModal(true);
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1400px]">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-6 border-b border-[#27272a]">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'tasks'
                ? 'text-[#9ae600]'
                : 'text-[#71717b] hover:text-white'
                }`}
            >
              <ListChecks className="w-4 h-4" />
              Tasks
              {activeTab === 'tasks' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9ae600]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'templates'
                ? 'text-[#9ae600]'
                : 'text-[#71717b] hover:text-white'
                }`}
            >
              <FileText className="w-4 h-4" />
              Templates
              {activeTab === 'templates' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9ae600]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('playlists')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'playlists'
                ? 'text-[#9ae600]'
                : 'text-[#71717b] hover:text-white'
                }`}
            >
              <Layers className="w-4 h-4" />
              Playlists
              {activeTab === 'playlists' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9ae600]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            {/* TASKS TAB */}
            {activeTab === 'tasks' && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Task Library</h2>
                    <p className="text-sm text-[#9f9fa9]">Individual tasks that can be added to templates</p>
                  </div>
                  <button
                    onClick={() => setShowCreateTaskModal(true)}
                    className="px-4 py-2 bg-[#9ae600] text-black rounded-lg font-medium hover:bg-[#8bd500] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Task
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
                  />
                </div>

                {/* Tasks List - Dropdown/Accordion Style */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {tasks.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((task) => {
                      const isExpanded = expandedTasks.includes(task.id);
                      const taskTemplate = templates.find(t => t.id === task.templateId);

                      return (
                        <div key={task.id} className="bg-[#0d0d0d] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#71717b] transition-all">
                          {/* Header - Always Visible */}
                          <button
                            onClick={() => {
                              setExpandedTasks(prev =>
                                prev.includes(task.id)
                                  ? prev.filter(id => id !== task.id)
                                  : [...prev, task.id]
                              );
                            }}
                            className="w-full p-4 flex items-center gap-3 text-left hover:bg-[#18181b]/50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-[#9ae600]" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[#9f9fa9]" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium truncate">{task.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-[#9f9fa9] flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {task.estimatedMinutes}m
                                </span>
                                {task.requiresPhoto && (
                                  <span className="text-xs text-[#9ae600] flex items-center gap-1">
                                    <Camera className="w-3 h-3" />
                                    Photo
                                  </span>
                                )}
                                {task.aiVerification && (
                                  <span className="text-xs text-[#06b6d4] flex items-center gap-1">
                                    <Bot className="w-3 h-3" />
                                    AI
                                  </span>
                                )}
                              </div>
                            </div>

                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                }
                              }}
                              className="p-2 hover:bg-[#27272a] rounded transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
                            </div>
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="border-t border-[#27272a] p-4 bg-[#18181b]/30 space-y-3">
                              {task.description && (
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Description</div>
                                  <div className="text-sm">{task.description}</div>
                                </div>
                              )}

                              <div>
                                <div className="text-xs text-[#9f9fa9] mb-1">Assigned Template</div>
                                <div className="p-2 bg-[#0d0d0d] rounded flex items-center gap-2">
                                  {taskTemplate && (
                                    <>
                                      <span className="text-base">{getZoneTypeIcon(taskTemplate.zone.type)}</span>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium">{taskTemplate.name}</div>
                                        <div className="text-xs text-[#71717b]">{taskTemplate.zone.name}</div>
                                      </div>
                                    </>
                                  )}
                                  {!taskTemplate && (
                                    <span className="text-sm text-[#71717b]">Template not found</span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Estimated Time</div>
                                  <div className="text-sm font-medium">{task.estimatedMinutes} minutes</div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Status</div>
                                  <div className="text-sm font-medium capitalize">{task.status}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${task.requiresPhoto ? 'bg-[#9ae600]' : 'bg-[#71717b]'}`} />
                                  <span className="text-xs">Photo Required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${task.aiVerification ? 'bg-[#06b6d4]' : 'bg-[#71717b]'}`} />
                                  <span className="text-xs">AI Verification</span>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <button className="flex-1 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#9ae600] hover:text-[#9ae600] transition-colors">
                                  <Edit2 className="w-3 h-3 inline mr-1" />
                                  Edit Task
                                </button>
                                <button className="flex-1 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#ef4444] hover:text-[#ef4444] transition-colors">
                                  Archive
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TEMPLATES TAB */}
            {activeTab === 'templates' && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Template Library</h2>
                    <p className="text-sm text-[#9f9fa9]">Zone-assigned collections of tasks</p>
                  </div>
                  <button
                    onClick={() => setShowCreateTemplateModal(true)}
                    className="px-4 py-2 bg-[#9ae600] text-black rounded-lg font-medium hover:bg-[#8bd500] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Template
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
                  />
                </div>

                {/* Templates List - Dropdown/Accordion Style */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {templates.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((template) => {
                      const isExpanded = expandedTemplates.includes(template.id);
                      const templateTasks = tasks.filter(task =>
                        template.tasks.some(t => t.taskId === task.id)
                      ).sort((a, b) => {
                        const orderA = template.tasks.find(t => t.taskId === a.id)?.order || 0;
                        const orderB = template.tasks.find(t => t.taskId === b.id)?.order || 0;
                        return orderA - orderB;
                      });

                      return (
                        <div key={template.id} className="bg-[#0d0d0d] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#71717b] transition-all">
                          {/* Header - Always Visible */}
                          <button
                            onClick={() => {
                              setExpandedTemplates(prev =>
                                prev.includes(template.id)
                                  ? prev.filter(id => id !== template.id)
                                  : [...prev, template.id]
                              );
                            }}
                            className="w-full p-4 flex items-center gap-3 text-left hover:bg-[#18181b]/50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-[#9ae600]" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[#9f9fa9]" />
                              )}
                            </div>

                            <span className="text-base">{getZoneTypeIcon(template.zone.type)}</span>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium truncate">{template.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-[#9f9fa9]">{template.zone.name}</span>
                                <span className="text-xs text-[#71717b]">•</span>
                                <span className="text-xs text-[#9f9fa9]">{template.totalTasks} tasks</span>
                                <span className="text-xs text-[#71717b]">•</span>
                                <span className="text-xs text-[#9f9fa9]">{template.totalMinutes}m</span>
                              </div>
                            </div>

                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                }
                              }}
                              className="p-2 hover:bg-[#27272a] rounded transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
                            </div>
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="border-t border-[#27272a] p-4 bg-[#18181b]/30 space-y-4">
                              {template.description && (
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Description</div>
                                  <div className="text-sm">{template.description}</div>
                                </div>
                              )}

                              {/* Zone Info */}
                              <div>
                                <div className="text-xs text-[#9f9fa9] mb-2">Zone Assignment</div>
                                <div className="p-3 bg-[#0d0d0d] rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">{getZoneTypeIcon(template.zone.type)}</span>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium">{template.zone.name}</div>
                                      <div className="text-xs text-[#71717b] mt-0.5">{template.zone.floor}</div>
                                      <div className="text-xs text-[#9f9fa9] mt-1 capitalize">{template.zone.type.replace('_', ' ')}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Task List */}
                              <div>
                                <div className="text-xs text-[#9f9fa9] mb-2">Tasks in Template ({templateTasks.length})</div>
                                <div className="space-y-2">
                                  {templateTasks.map((task, index) => (
                                    <div key={task.id} className="p-2 bg-[#0d0d0d] rounded-lg flex items-center gap-3">
                                      <div className="w-6 h-6 rounded-full bg-[#9ae600]/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-medium text-[#9ae600]">{index + 1}</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm truncate">{task.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-xs text-[#9f9fa9]">{task.estimatedMinutes}m</span>
                                          {task.requiresPhoto && (
                                            <span className="text-xs text-[#9ae600] flex items-center gap-1">
                                              <Camera className="w-3 h-3" />
                                            </span>
                                          )}
                                          {task.aiVerification && (
                                            <span className="text-xs text-[#06b6d4] flex items-center gap-1">
                                              <Bot className="w-3 h-3" />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Stats Summary */}
                              <div className="grid grid-cols-3 gap-3 p-3 bg-[#0d0d0d] rounded-lg">
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Total Time</div>
                                  <div className="text-sm font-medium">{template.totalMinutes} min</div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Photos</div>
                                  <div className="text-sm font-medium flex items-center gap-1">
                                    <Camera className="w-3 h-3 text-[#9ae600]" />
                                    {template.photosRequired}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-[#9f9fa9] mb-1">Status</div>
                                  <div className="text-sm font-medium capitalize">{template.status}</div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <button className="flex-1 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#9ae600] hover:text-[#9ae600] transition-colors">
                                  <Edit2 className="w-3 h-3 inline mr-1" />
                                  Edit Template
                                </button>
                                <button className="flex-1 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#9ae600] hover:text-[#9ae600] transition-colors">
                                  Duplicate
                                </button>
                                <button className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#ef4444] hover:text-[#ef4444] transition-colors">
                                  Archive
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* PLAYLISTS TAB */}
            {activeTab === 'playlists' && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Playlist Library</h2>
                    <p className="text-sm text-[#9f9fa9]">Collections of templates ready to assign to staff</p>
                  </div>
                  <button
                    onClick={() => setShowCreatePlaylistModal(true)}
                    className="px-4 py-2 bg-[#9ae600] text-black rounded-lg font-medium hover:bg-[#8bd500] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Playlist
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
                  <input
                    type="text"
                    placeholder="Search playlists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#71717b]"
                  />
                </div>

                {/* Playlists Grid */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((playlist) => {
                      const priorityConfig = getPriorityConfig(playlist.priority);
                      const playlistTemplates = templates.filter(t => playlist.templateIds.includes(t.id));

                      return (
                        <div key={playlist.id} className="bg-[#0d0d0d] border border-[#27272a] rounded-lg p-4 hover:border-[#71717b] transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-base">{priorityConfig.emoji}</span>
                              <h3 className="text-sm font-medium truncate">{playlist.name}</h3>
                            </div>
                            <button className="p-1 hover:bg-[#27272a] rounded transition-colors">
                              <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
                            </button>
                          </div>

                          {playlist.description && (
                            <p className="text-xs text-[#71717b] mb-3">{playlist.description}</p>
                          )}

                          {playlist.lastUsed && (
                            <p className="text-xs text-[#71717b] mb-3">Last used: {playlist.lastUsed}</p>
                          )}

                          {/* Templates in this playlist */}
                          <div className="mb-3 space-y-1">
                            {playlistTemplates.map(template => (
                              <div key={template.id} className="text-xs p-2 bg-[#18181b] rounded flex items-center gap-2">
                                <span>{getZoneTypeIcon(template.zone.type)}</span>
                                <span className="flex-1 truncate">{template.name}</span>
                              </div>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                            <div>
                              <div className="text-[#9f9fa9] mb-1">Templates</div>
                              <div className="font-medium">{playlist.templateIds.length}</div>
                            </div>
                            <div>
                              <div className="text-[#9f9fa9] mb-1">Tasks</div>
                              <div className="font-medium">{playlist.totalTasks}</div>
                            </div>
                            <div>
                              <div className="text-[#9f9fa9] mb-1">Time</div>
                              <div className="font-medium">~{playlist.totalTimeMins}m</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUsePlaylist(playlist)}
                              className="flex-1 px-3 py-1.5 bg-[#9ae600] text-black rounded text-xs font-medium hover:bg-[#8bd500] transition-colors"
                            >
                              Assign
                            </button>
                            <button className="flex-1 px-3 py-1.5 bg-[#18181b] border border-[#27272a] rounded text-xs font-medium hover:border-[#71717b] transition-colors">
                              Edit
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Assignment Modal */}
      {showAssignModal && selectedPlaylist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#09090b] border border-[#27272a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#09090b] border-b border-[#27272a] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Assign Playlist to Staff</h2>
                  <p className="text-sm text-[#9f9fa9]">{selectedPlaylist.name}</p>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 hover:bg-[#27272a] rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Staff Selection */}
              <div>
                <label className="block text-sm text-[#9f9fa9] mb-3">
                  Select Staff Member <span className="text-[#ef4444]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: '1', name: 'Priya Kumar', role: 'Lead Housekeeper', available: true },
                    { id: '2', name: 'Arjun Mehta', role: 'Housekeeper', available: true },
                    { id: '3', name: 'Neha Sharma', role: 'Housekeeper', available: false },
                    { id: '4', name: 'Rajesh Patel', role: 'Maintenance', available: true },
                  ].map((staff) => (
                    <button
                      key={staff.id}
                      disabled={!staff.available}
                      className={`p-4 rounded-lg border text-left transition-all ${staff.available
                        ? 'border-[#27272a] hover:border-[#9ae600] hover:bg-[#9ae600]/5'
                        : 'border-[#27272a] opacity-50 cursor-not-allowed'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#9ae600]/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-[#9ae600]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{staff.name}</div>
                          <div className="text-xs text-[#71717b]">{staff.role}</div>
                          {!staff.available && (
                            <div className="text-xs text-[#ef4444] mt-1">Currently busy</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Override */}
              <div>
                <label className="block text-sm text-[#9f9fa9] mb-3">Priority Override</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['urgent', 'normal', 'low'] as const).map((priority) => {
                    const config = getPriorityConfig(priority);
                    return (
                      <button
                        key={priority}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${selectedPlaylist.priority === priority
                          ? `border-[#9ae600] ${config.bg}`
                          : 'bg-[#18181b] border-[#27272a] hover:border-[#71717b]'
                          }`}
                      >
                        <span className="text-base">{config.emoji}</span>
                        <span className={selectedPlaylist.priority === priority ? config.color : 'text-[#9f9fa9]'}>
                          {config.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm text-[#9f9fa9] mb-2">Deadline</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-[#9ae600]"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm text-[#9f9fa9] mb-2">Special Instructions (Optional)</label>
                <textarea
                  placeholder="Any special notes for the staff member..."
                  rows={3}
                  className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600] resize-none"
                />
              </div>

              {/* WhatsApp Workflow Indicator */}
              <div className="bg-[#06b6d4]/5 border border-[#06b6d4]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#06b6d4]/10 rounded-lg">
                    <Bot className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span>Task Assistant Workflow</span>
                      <span className="text-xs px-2 py-0.5 bg-[#06b6d4]/20 text-[#06b6d4] rounded">WhatsApp</span>
                    </h4>
                    <div className="space-y-2 text-xs text-[#9f9fa9]">
                      <div className="flex items-start gap-2">
                        <span className="text-[#06b6d4] mt-0.5">1.</span>
                        <span>Task Assistant sends tasks <strong>one-by-one</strong> via WhatsApp</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#06b6d4] mt-0.5">2.</span>
                        <span>Staff completes each task and <strong>uploads photo proof</strong></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#06b6d4] mt-0.5">3.</span>
                        <span><strong>AI verifies</strong> photo quality automatically</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#06b6d4] mt-0.5">4.</span>
                        <span>Next task unlocks after verification</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#9ae600] mt-0.5">5.</span>
                        <span className="text-[#9ae600]">Captain performs <strong>3 daily physical audits</strong> to verify bot reports</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playlist Summary */}
              <div className="bg-[#0d0d0d] border border-[#27272a] rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3">Playlist Overview</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#9f9fa9]">Templates:</span>
                    <span className="ml-2 font-medium">{selectedPlaylist.templateIds.length}</span>
                  </div>
                  <div>
                    <span className="text-[#9f9fa9]">Total Tasks:</span>
                    <span className="ml-2 font-medium">{selectedPlaylist.totalTasks}</span>
                  </div>
                  <div>
                    <span className="text-[#9f9fa9]">Est. Time:</span>
                    <span className="ml-2 font-medium">~{selectedPlaylist.totalTimeMins} mins</span>
                  </div>
                  <div>
                    <span className="text-[#9f9fa9]">Photos Required:</span>
                    <span className="ml-2 font-medium flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      {selectedPlaylist.photosRequired}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#09090b] border-t border-[#27272a] p-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-6 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm font-medium hover:border-[#71717b] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Assign playlist:', selectedPlaylist);
                  setShowAssignModal(false);
                }}
                className="px-6 py-2.5 bg-[#9ae600] text-black rounded-lg text-sm font-medium hover:bg-[#8bd500] transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Assign via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onSave={async (task) => {
          try {
            // Generate a unique task_id
            const taskId = `T${Date.now().toString(36).toUpperCase()}`;
            const payload: CreateTaskPayload = {
              node_id: selectedProperty?.toLowerCase(),
              task_id: taskId,
              task_name: task.name || '',
              task_description: task.description,
              photo_required: task.requiresPhoto ? 'yes' : 'no',
              estimated_time: `${task.estimatedMinutes}m`,
              category: 'general'
            };
            const response = await createTask(payload);
            console.log('Task created successfully:', payload);

            // If a template was selected, link the task to it
            if (task.templateId) {
              const assignedTemplate = selectableTemplates.find(t => t.id === task.templateId);
              if (assignedTemplate) {
                const linkPayload: CreateTemplatePayload = {
                  node_id: selectedProperty?.toLowerCase(),
                  template_id: assignedTemplate.id,
                  template_name: assignedTemplate.name,
                  task_id: response.task_id, // Use the ID returned from API
                  task_name: payload.task_name,
                  total_est_time: payload.estimated_time
                };
                await createTemplate(linkPayload);
                console.log('Linked task to template:', linkPayload);
              }
            }

            // Refresh data
            if (selectedProperty && selectedProperty !== 'all') {
              const nodeData = await fetchNodeData(selectedProperty);
              setHousekeepingTasks(nodeData.housekeeping_tasks);

              refreshZonesData(nodeData);

              const templateItems = await fetchTemplates(selectedProperty);
              setApiTemplateItems(templateItems);
            }
            setShowCreateTaskModal(false);
          } catch (error) {
            console.error('Failed to create task:', error);
            alert('Failed to create task. Please try again.');
          }
        }}
        templates={selectableTemplates}
      />

      {/* Create Template Modal */}
      <CreateTemplateModal
        isOpen={showCreateTemplateModal}
        onClose={() => setShowCreateTemplateModal(false)}
        onSave={async (template) => {
          try {
            const templateId = `TPL${Date.now().toString(36).toUpperCase()}`;
            // 1. Create the template
            const payload: CreateTemplatePayload = {
              node_id: selectedProperty?.toLowerCase(),
              template_id: templateId,
              template_name: template.name || '',
              total_est_time: `${template.totalMinutes || 0}m`
            };
            await createTemplate(payload);
            console.log('Template created successfully:', payload);

            // 2. Link template to zone
            if (template.zone) {
              const zonePayload: CreateZoneTemplatePayload = {
                node_id: selectedProperty?.toLowerCase(),
                zone_id: template.zone.id,
                zone_name: template.zone.name,
                floor: template.zone.floor,
                template_id: templateId,
                template_name: template.name || '',
                use_case: template.description || ''
              };
              await createZoneTemplate(zonePayload);
              console.log('Linked template to zone:', zonePayload);
            }

            // Refresh data
            if (selectedProperty && selectedProperty !== 'all') {
              const nodeData = await fetchNodeData(selectedProperty);
              setHousekeepingTasks(nodeData.housekeeping_tasks);

              refreshZonesData(nodeData);

              const templateItems = await fetchTemplates(selectedProperty);
              setApiTemplateItems(templateItems);
            }
            setShowCreateTemplateModal(false);
          } catch (error) {
            console.error('Failed to create template:', error);
            alert('Failed to create template. Please try again.');
          }
        }}
        tasks={tasks}
        zones={apiZones}
      />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreatePlaylistModal}
        onClose={() => setShowCreatePlaylistModal(false)}
        onSave={async (playlist) => {
          try {
            const payload: CreatePlaylistPayload = {
              node_id: selectedProperty?.toLowerCase(),
              playlist_type: playlist.type || 'custom',
              templates_included: (playlist.templateIds || []).join(','),
              priority: playlist.priority === 'urgent' ? 'high' : (playlist.priority || 'normal'),
              est_time: `${(playlist as any).totalTimeMins || 0}m`
            };
            await createPlaylist(payload);
            console.log('Playlist created successfully:', payload);
            // Refresh data
            if (selectedProperty && selectedProperty !== 'all') {
              const nodeData = await fetchNodeData(selectedProperty);
              setHousekeepingTasks(nodeData.housekeeping_tasks);

              refreshZonesData(nodeData);

              const templateItems = await fetchTemplates(selectedProperty);
              setApiTemplateItems(templateItems);
            }
            setShowCreatePlaylistModal(false);
          } catch (error) {
            console.error('Failed to create playlist:', error);
            alert('Failed to create playlist. Please try again.');
          }
        }}
        templates={templates}
      />
    </>
  );
}

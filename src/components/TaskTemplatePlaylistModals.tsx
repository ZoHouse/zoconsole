import { X, Plus, GripVertical, Camera, Bot, Upload, Check, Search, Filter } from 'lucide-react';
import { useState } from 'react';

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

interface Template {
  id: string;
  name: string;
  description?: string;
  zone: {
    id: string;
    name: string;
    type: string;
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

interface Playlist {
  id: string;
  name: string;
  description?: string;
  type: 'room_turnover' | 'deep_clean' | 'event_setup' | 'event_breakdown' | 'emergency' | 'custom';
  priority: 'urgent' | 'normal' | 'low';
  templateIds: string[];
  status: 'active' | 'draft' | 'archived';
}

// CREATE TASK MODAL
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  templates?: Template[];
}

export function CreateTaskModal({ isOpen, onClose, onSave, templates = [] }: CreateTaskModalProps) {
  const [taskData, setTaskData] = useState<Partial<Task>>({
    name: '',
    description: '',
    requiresPhoto: false,
    aiVerification: false,
    estimatedMinutes: 5,
    templateId: '',
    status: 'active'
  });

  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  if (!isOpen) return null;

  const getZoneTypeIcon = (type: string) => {
    switch (type) {
      case 'studio': return '🏢';
      case 'dorm': return '🛏️';
      case 'private_room': return '🚪';
      case 'common': return '🏛️';
      default: return '📍';
    }
  };

  const handleSave = () => {
    onSave(taskData);
    onClose();
  };

  const selectedTemplate = templates.find(t => t.id === taskData.templateId);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#09090b] border-b border-[#27272a] p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
              <p className="text-sm text-[#9f9fa9]">Add a new task to your library</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#27272a] rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Name */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">
              Task Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              value={taskData.name}
              onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
              placeholder="e.g., Scrub toilet bowl"
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">Description (Optional)</label>
            <textarea
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              placeholder="Brief description or instructions..."
              rows={3}
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600] resize-none"
            />
          </div>

          {/* Template Assignment */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-3">
              Assign to Template <span className="text-[#ef4444]">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                className="w-full px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-left cursor-pointer hover:border-[#71717b] transition-all"
              >
                {selectedTemplate ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getZoneTypeIcon(selectedTemplate.zone.type)}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{selectedTemplate.name}</div>
                      <div className="text-xs text-[#71717b]">{selectedTemplate.zone.floor}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-[#71717b]">Select a template</span>
                )}
              </button>
              {showTemplateDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0d0d0d] border border-[#27272a] rounded-lg max-h-80 overflow-y-auto z-10 shadow-xl">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setTaskData({ ...taskData, templateId: template.id });
                        setShowTemplateDropdown(false);
                      }}
                      className={`w-full p-4 text-left transition-all border-b border-[#27272a] last:border-b-0 ${taskData.templateId === template.id
                        ? 'bg-[#9ae600]/5'
                        : 'hover:bg-[#18181b]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getZoneTypeIcon(template.zone.type)}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{template.name}</div>
                          <div className="text-xs text-[#71717b]">{template.zone.floor}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Estimated Time */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">Estimated Time (minutes)</label>
            <input
              type="number"
              value={taskData.estimatedMinutes}
              onChange={(e) => setTaskData({ ...taskData, estimatedMinutes: parseInt(e.target.value) })}
              min="1"
              max="120"
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Photo & AI Verification */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 bg-[#0d0d0d] border border-[#27272a] rounded-lg cursor-pointer hover:border-[#71717b] transition-all">
              <input
                type="checkbox"
                checked={taskData.requiresPhoto}
                onChange={(e) => setTaskData({ ...taskData, requiresPhoto: e.target.checked })}
                className="w-5 h-5 rounded border-[#27272a] text-[#9ae600] focus:ring-[#9ae600] focus:ring-offset-0 bg-[#18181b]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#9ae600]" />
                  <span className="text-sm font-medium">Requires Photo</span>
                </div>
                <p className="text-xs text-[#71717b] mt-1">Staff must upload a photo when completing this task</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-[#0d0d0d] border border-[#27272a] rounded-lg cursor-pointer hover:border-[#71717b] transition-all">
              <input
                type="checkbox"
                checked={taskData.aiVerification}
                onChange={(e) => setTaskData({ ...taskData, aiVerification: e.target.checked })}
                className="w-5 h-5 rounded border-[#27272a] text-[#06b6d4] focus:ring-[#06b6d4] focus:ring-offset-0 bg-[#18181b]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#06b6d4]" />
                  <span className="text-sm font-medium">AI Verification</span>
                </div>
                <p className="text-xs text-[#71717b] mt-1">AI will verify photo quality before approving completion</p>
              </div>
            </label>
          </div>

          {/* Reference Image Upload */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">Reference Image (Optional)</label>
            <div className="border-2 border-dashed border-[#27272a] rounded-lg p-6 text-center hover:border-[#71717b] transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-[#9f9fa9] mx-auto mb-2" />
              <p className="text-sm text-[#9f9fa9]">Click to upload or drag and drop</p>
              <p className="text-xs text-[#71717b] mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#09090b] border-t border-[#27272a] p-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm font-medium hover:border-[#71717b] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!taskData.name || !taskData.templateId}
            className="px-6 py-2.5 bg-[#9ae600] text-black rounded-lg text-sm font-medium hover:bg-[#8bd500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

// CREATE TEMPLATE MODAL
interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Partial<Template>) => void;
  tasks: Task[];
  zones: { id: string; name: string; type: string; floor: string }[];
}

export function CreateTemplateModal({ isOpen, onClose, onSave, tasks, zones }: CreateTemplateModalProps) {
  const [templateData, setTemplateData] = useState<Partial<Template>>({
    name: '',
    description: '',
    zone: undefined,
    tasks: [],
    status: 'draft'
  });

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);

  if (!isOpen) return null;



  const handleTaskToggle = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSave = () => {
    const orderedTasks = selectedTasks.map((taskId, index) => ({
      taskId,
      order: index + 1
    }));

    const totalMinutes = selectedTasks.reduce((sum, taskId) => {
      const task = tasks.find(t => t.id === taskId);
      return sum + (task?.estimatedMinutes || 0);
    }, 0);

    const photosRequired = selectedTasks.filter(taskId => {
      const task = tasks.find(t => t.id === taskId);
      return task?.requiresPhoto;
    }).length;

    const completeTemplate = {
      ...templateData,
      tasks: orderedTasks,
      totalTasks: selectedTasks.length,
      totalMinutes,
      photosRequired
    };

    onSave(completeTemplate);
    onClose();
  };

  const getZoneTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'studio': return '🏢';
      case 'dorm': return '🛏️';
      case 'private_room': return '🚪';
      case 'common': return '🏛️';
      default: return '📍';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#09090b] border-b border-[#27272a] p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Create New Template</h2>
              <p className="text-sm text-[#9f9fa9]">Zone-assigned collection of tasks</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#27272a] rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Template Name */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">
              Template Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              value={templateData.name}
              onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
              placeholder="e.g., Private Room - Bedding"
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">Description (Optional)</label>
            <textarea
              value={templateData.description}
              onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
              placeholder="Brief description of this template..."
              rows={2}
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600] resize-none"
            />
          </div>

          {/* Zone Assignment */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-3">
              Assign to Zone <span className="text-[#ef4444]">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                className="w-full px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-lg text-left cursor-pointer hover:border-[#71717b] transition-all"
              >
                {templateData.zone ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getZoneTypeIcon(templateData.zone.type)}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{templateData.zone.name}</div>
                      <div className="text-xs text-[#71717b]">{templateData.zone.floor}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-[#71717b]">Select a zone</span>
                )}
              </button>
              {showZoneDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0d0d0d] border border-[#27272a] rounded-lg max-h-80 overflow-y-auto z-10 shadow-xl">
                  {zones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => {
                        setTemplateData({ ...templateData, zone });
                        setShowZoneDropdown(false);
                      }}
                      className={`w-full p-4 text-left transition-all border-b border-[#27272a] last:border-b-0 ${templateData.zone?.id === zone.id
                        ? 'bg-[#9ae600]/5'
                        : 'hover:bg-[#18181b]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getZoneTypeIcon(zone.type)}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{zone.name}</div>
                          <div className="text-xs text-[#71717b]">{zone.floor}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Tasks */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-3">
              Select Tasks <span className="text-[#71717b]">({selectedTasks.length} selected)</span>
            </label>
            <div className="bg-[#0d0d0d] border border-[#27272a] rounded-lg max-h-80 overflow-y-auto">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-3 p-4 border-b border-[#27272a] last:border-b-0 hover:bg-[#18181b] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleTaskToggle(task.id)}
                    className="w-5 h-5 rounded border-[#27272a] text-[#9ae600] focus:ring-[#9ae600] focus:ring-offset-0 bg-[#18181b]"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{task.name}</div>
                    <div className="flex items-center gap-3 text-xs text-[#9f9fa9]">
                      <span>~{task.estimatedMinutes} mins</span>
                      {task.requiresPhoto && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-[#9ae600]">
                            <Camera className="w-3 h-3" />
                            Photo
                          </div>
                        </>
                      )}
                      {task.aiVerification && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-[#06b6d4]">
                            <Bot className="w-3 h-3" />
                            AI
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Template Summary */}
          {selectedTasks.length > 0 && (
            <div className="bg-[#9ae600]/5 border border-[#9ae600]/30 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3 text-[#9ae600]">Template Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-[#9f9fa9]">Total Tasks:</span>
                  <span className="ml-2 font-medium">{selectedTasks.length}</span>
                </div>
                <div>
                  <span className="text-[#9f9fa9]">Est. Time:</span>
                  <span className="ml-2 font-medium">
                    ~{selectedTasks.reduce((sum, taskId) => {
                      const task = tasks.find(t => t.id === taskId);
                      return sum + (task?.estimatedMinutes || 0);
                    }, 0)} mins
                  </span>
                </div>
                <div>
                  <span className="text-[#9f9fa9]">Photos:</span>
                  <span className="ml-2 font-medium flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {selectedTasks.filter(taskId => {
                      const task = tasks.find(t => t.id === taskId);
                      return task?.requiresPhoto;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#09090b] border-t border-[#27272a] p-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm font-medium hover:border-[#71717b] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!templateData.name || !templateData.zone || selectedTasks.length === 0}
            className="px-6 py-2.5 bg-[#9ae600] text-black rounded-lg text-sm font-medium hover:bg-[#8bd500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
}

// CREATE PLAYLIST MODAL
interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (playlist: Partial<Playlist>) => void;
  templates: Template[];
}

export function CreatePlaylistModal({ isOpen, onClose, onSave, templates }: CreatePlaylistModalProps) {
  const [playlistData, setPlaylistData] = useState<Partial<Playlist>>({
    name: '',
    description: '',
    templateIds: [],
    status: 'draft'
  });

  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [zoneTypeFilter, setZoneTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleTemplateToggle = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
    } else {
      setSelectedTemplates([...selectedTemplates, templateId]);
    }
  };

  const handleSave = () => {
    const totalTasks = selectedTemplates.reduce((sum, templateId) => {
      const template = templates.find(t => t.id === templateId);
      return sum + (template?.totalTasks || 0);
    }, 0);

    const totalMinutes = selectedTemplates.reduce((sum, templateId) => {
      const template = templates.find(t => t.id === templateId);
      return sum + (template?.totalMinutes || 0);
    }, 0);

    const photosRequired = selectedTemplates.reduce((sum, templateId) => {
      const template = templates.find(t => t.id === templateId);
      return sum + (template?.photosRequired || 0);
    }, 0);

    const completePlaylist = {
      ...playlistData,
      templateIds: selectedTemplates,
      totalTasks,
      totalTimeMins: totalMinutes,
      photosRequired,
      usageCount: 0
    };

    onSave(completePlaylist);
    onClose();
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

  // Filter templates based on search and zone type
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.zone.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZoneType = zoneTypeFilter === 'all' || template.zone.type === zoneTypeFilter;
    return matchesSearch && matchesZoneType;
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#09090b] border-b border-[#27272a] p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Create New Playlist</h2>
              <p className="text-sm text-[#9f9fa9]">Collection of templates ready to assign</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#27272a] rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Playlist Name */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">
              Playlist Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              value={playlistData.name}
              onChange={(e) => setPlaylistData({ ...playlistData, name: e.target.value })}
              placeholder="e.g., Standard Room Turnover"
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-2">Description (Optional)</label>
            <textarea
              value={playlistData.description}
              onChange={(e) => setPlaylistData({ ...playlistData, description: e.target.value })}
              placeholder="Brief description of when to use this playlist..."
              rows={2}
              className="w-full px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600] resize-none"
            />
          </div>

          {/* Select Templates */}
          <div>
            <label className="block text-sm text-[#9f9fa9] mb-3">
              Select Templates <span className="text-[#71717b]">({selectedTemplates.length} selected)</span>
            </label>

            {/* Search and Filters */}
            <div className="mb-3 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717b]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates or zones..."
                  className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600]"
                />
              </div>

              {/* Zone Type Filters */}
              <div className="flex gap-2">
                <button
                  onClick={() => setZoneTypeFilter('all')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${zoneTypeFilter === 'all'
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#18181b] text-[#9f9fa9] border border-[#27272a] hover:border-[#71717b]'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setZoneTypeFilter('private_room')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${zoneTypeFilter === 'private_room'
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#18181b] text-[#9f9fa9] border border-[#27272a] hover:border-[#71717b]'
                    }`}
                >
                  <span>🚪</span> Private Room
                </button>
                <button
                  onClick={() => setZoneTypeFilter('studio')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${zoneTypeFilter === 'studio'
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#18181b] text-[#9f9fa9] border border-[#27272a] hover:border-[#71717b]'
                    }`}
                >
                  <span>🏢</span> Studio
                </button>
                <button
                  onClick={() => setZoneTypeFilter('dorm')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${zoneTypeFilter === 'dorm'
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#18181b] text-[#9f9fa9] border border-[#27272a] hover:border-[#71717b]'
                    }`}
                >
                  <span>🛏️</span> Dorm
                </button>
                <button
                  onClick={() => setZoneTypeFilter('common')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${zoneTypeFilter === 'common'
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#18181b] text-[#9f9fa9] border border-[#27272a] hover:border-[#71717b]'
                    }`}
                >
                  <span>🏛️</span> Common
                </button>
              </div>
            </div>

            {/* Template List */}
            <div className="bg-[#0d0d0d] border border-[#27272a] rounded-lg max-h-80 overflow-y-auto">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <label
                    key={template.id}
                    className="flex items-center gap-3 p-4 border-b border-[#27272a] last:border-b-0 hover:bg-[#18181b] cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => handleTemplateToggle(template.id)}
                      className="w-5 h-5 rounded border-[#27272a] text-[#9ae600] focus:ring-[#9ae600] focus:ring-offset-0 bg-[#18181b]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{getZoneTypeIcon(template.zone.type)}</span>
                        <span className="text-sm font-medium">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#9f9fa9]">
                        <span>{template.zone.name}</span>
                        <span>•</span>
                        <span>{template.totalTasks} tasks</span>
                        <span>•</span>
                        <span>~{template.totalMinutes} mins</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {template.photosRequired}
                        </div>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="p-4 text-sm text-[#71717b] text-center">No templates found</div>
              )}
            </div>
          </div>

          {/* Playlist Summary */}
          {selectedTemplates.length > 0 && (
            <div className="bg-[#9ae600]/5 border border-[#9ae600]/30 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3 text-[#9ae600]">Playlist Summary</h4>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-[#9f9fa9]">Templates:</span>
                  <span className="ml-2 font-medium">{selectedTemplates.length}</span>
                </div>
                <div>
                  <span className="text-[#9f9fa9]">Total Tasks:</span>
                  <span className="ml-2 font-medium">
                    {selectedTemplates.reduce((sum, templateId) => {
                      const template = templates.find(t => t.id === templateId);
                      return sum + (template?.totalTasks || 0);
                    }, 0)}
                  </span>
                </div>
                <div>
                  <span className="text-[#9f9fa9]">Est. Time:</span>
                  <span className="ml-2 font-medium">
                    ~{selectedTemplates.reduce((sum, templateId) => {
                      const template = templates.find(t => t.id === templateId);
                      return sum + (template?.totalMinutes || 0);
                    }, 0)} mins
                  </span>
                </div>
                <div>
                  <span className="text-[#9f9fa9]">Photos:</span>
                  <span className="ml-2 font-medium flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {selectedTemplates.reduce((sum, templateId) => {
                      const template = templates.find(t => t.id === templateId);
                      return sum + (template?.photosRequired || 0);
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#09090b] border-t border-[#27272a] p-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm font-medium hover:border-[#71717b] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!playlistData.name || selectedTemplates.length === 0}
            className="px-6 py-2.5 bg-[#9ae600] text-black rounded-lg text-sm font-medium hover:bg-[#8bd500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
}

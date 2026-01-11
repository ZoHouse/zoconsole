import { Monitor, Wifi, WifiOff, Play, Pause, Upload, Grid3x3, List, MapPin, Clock, Eye, Image, Video, FileText, TrendingUp, Calendar, Plus, Edit, Trash2, MoreVertical, Power, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface PortalsProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function Portals({ selectedProperty, onPropertyChange }: PortalsProps) {
  const [activeView, setActiveView] = useState<'screens' | 'content' | 'schedule'>('screens');

  return (
    <>
      <Header 
        selectedProperty={selectedProperty} 
        onPropertyChange={onPropertyChange}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px]">
          {activeView === 'screens' && <ScreensView selectedProperty={selectedProperty} />}
          {activeView === 'content' && <ContentLibrary />}
          {activeView === 'schedule' && <ScheduleView />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  activeView: 'screens' | 'content' | 'schedule';
  onViewChange: (view: 'screens' | 'content' | 'schedule') => void;
}

function Header({ selectedProperty, onPropertyChange, activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl">Digital Portals</h1>
            <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage digital screens and content across all properties</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Removed PropertyFilter - now in sidebar */}
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => onViewChange('screens')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
              activeView === 'screens'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4 inline mr-2" />
            Screens
          </button>
          <button
            onClick={() => onViewChange('content')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
              activeView === 'content'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Image className="w-4 h-4 inline mr-2" />
            Content Library
          </button>
          <button
            onClick={() => onViewChange('schedule')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
              activeView === 'schedule'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Schedule
          </button>
        </div>
      </div>
    </header>
  );
}

interface Screen {
  id: string;
  name: string;
  location: string;
  zone: string;
  status: 'online' | 'offline' | 'error';
  resolution: string;
  orientation: 'landscape' | 'portrait';
  currentContent: string;
  uptime: string;
  lastSync: string;
  type: 'wayfinder' | 'info' | 'ads' | 'sales';
}

function ScreensView({ selectedProperty }: { selectedProperty: string }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const screens: Screen[] = [
    {
      id: '1',
      name: 'Lobby Main Display',
      location: 'Zo House Bali',
      zone: 'Main Entrance',
      status: 'online',
      resolution: '1920x1080',
      orientation: 'landscape',
      currentContent: 'Welcome Screen + Events',
      uptime: '99.8%',
      lastSync: '2 min ago',
      type: 'wayfinder'
    },
    {
      id: '2',
      name: 'Elevator Hall Screen',
      location: 'Zo House Bali',
      zone: 'Floor 2',
      status: 'online',
      resolution: '1080x1920',
      orientation: 'portrait',
      currentContent: 'Daily Schedule',
      uptime: '98.5%',
      lastSync: '5 min ago',
      type: 'info'
    },
    {
      id: '3',
      name: 'Cafe Menu Board',
      location: 'Zo House Bali',
      zone: 'Cafe Area',
      status: 'online',
      resolution: '1920x1080',
      orientation: 'landscape',
      currentContent: 'Menu & Specials',
      uptime: '100%',
      lastSync: '1 min ago',
      type: 'sales'
    },
    {
      id: '4',
      name: 'Coworking Info',
      location: 'Zo House Portugal',
      zone: 'Workspace',
      status: 'online',
      resolution: '1920x1080',
      orientation: 'landscape',
      currentContent: 'Community Updates',
      uptime: '97.2%',
      lastSync: '3 min ago',
      type: 'info'
    },
    {
      id: '5',
      name: 'Rooftop Events',
      location: 'Zo House Portugal',
      zone: 'Rooftop',
      status: 'offline',
      resolution: '1080x1920',
      orientation: 'portrait',
      currentContent: 'Event Calendar',
      uptime: '92.1%',
      lastSync: '2 hours ago',
      type: 'ads'
    },
    {
      id: '6',
      name: 'Reception Wayfinder',
      location: 'Zo House Thailand',
      zone: 'Reception',
      status: 'online',
      resolution: '1920x1080',
      orientation: 'landscape',
      currentContent: 'Interactive Map',
      uptime: '99.9%',
      lastSync: '1 min ago',
      type: 'wayfinder'
    },
    {
      id: '7',
      name: 'Pool Area Display',
      location: 'Zo House Thailand',
      zone: 'Pool Deck',
      status: 'error',
      resolution: '1920x1080',
      orientation: 'landscape',
      currentContent: 'Pool Schedule',
      uptime: '85.3%',
      lastSync: '15 min ago',
      type: 'info'
    },
    {
      id: '8',
      name: 'Gym Entrance',
      location: 'Zo House Bali',
      zone: 'Fitness Center',
      status: 'online',
      resolution: '1080x1920',
      orientation: 'portrait',
      currentContent: 'Class Schedule',
      uptime: '96.7%',
      lastSync: '4 min ago',
      type: 'info'
    }
  ];

  const filteredScreens = selectedProperty === 'all' 
    ? screens 
    : screens.filter(s => s.location === selectedProperty);

  const stats = {
    total: filteredScreens.length,
    online: filteredScreens.filter(s => s.status === 'online').length,
    offline: filteredScreens.filter(s => s.status === 'offline').length,
    error: filteredScreens.filter(s => s.status === 'error').length
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#9ae600]/10 rounded-lg">
              <Monitor className="w-5 h-5 text-[#9ae600]" />
            </div>
            <span className="text-sm text-[#9f9fa9]">Total Screens</span>
          </div>
          <div className="text-2xl">{stats.total}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#06b6d4]/10 rounded-lg">
              <Wifi className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <span className="text-sm text-[#9f9fa9]">Online</span>
          </div>
          <div className="text-2xl">{stats.online}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#71717b]/10 rounded-lg">
              <WifiOff className="w-5 h-5 text-[#71717b]" />
            </div>
            <span className="text-sm text-[#9f9fa9]">Offline</span>
          </div>
          <div className="text-2xl">{stats.offline}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#fb2c36]/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#fb2c36]" />
            </div>
            <span className="text-sm text-[#9f9fa9]">Errors</span>
          </div>
          <div className="text-2xl">{stats.error}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Screen</span>
        </button>
      </div>

      {/* Screens */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScreens.map(screen => (
            <ScreenCard key={screen.id} screen={screen} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#09090b] border-b border-[#27272a]">
                <tr>
                  <th className="text-left p-4 text-sm">Name</th>
                  <th className="text-left p-4 text-sm">Location</th>
                  <th className="text-left p-4 text-sm">Zone</th>
                  <th className="text-left p-4 text-sm">Status</th>
                  <th className="text-left p-4 text-sm">Content</th>
                  <th className="text-left p-4 text-sm">Uptime</th>
                  <th className="text-left p-4 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredScreens.map(screen => (
                  <tr key={screen.id} className="border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          screen.status === 'online' ? 'bg-[#06b6d4]/10' :
                          screen.status === 'error' ? 'bg-[#fb2c36]/10' :
                          'bg-[#71717b]/10'
                        }`}>
                          <Monitor className={`w-4 h-4 ${
                            screen.status === 'online' ? 'text-[#06b6d4]' :
                            screen.status === 'error' ? 'text-[#fb2c36]' :
                            'text-[#71717b]'
                          }`} />
                        </div>
                        <div>
                          <div className="text-sm text-white">{screen.name}</div>
                          <div className="text-xs text-[#71717b]">{screen.resolution}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{screen.location}</td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{screen.zone}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                        screen.status === 'online' ? 'bg-[#06b6d4]/10 text-[#06b6d4]' :
                        screen.status === 'error' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
                        'bg-[#71717b]/10 text-[#71717b]'
                      }`}>
                        {screen.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        {screen.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{screen.currentContent}</td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{screen.uptime}</td>
                    <td className="p-4">
                      <button className="p-2 hover:bg-[#3a3a3a] rounded">
                        <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

interface ScreenCardProps {
  screen: Screen;
}

function ScreenCard({ screen }: ScreenCardProps) {
  const typeColors = {
    wayfinder: 'bg-[#06b6d4]/10 text-[#06b6d4]',
    info: 'bg-[#9ae600]/10 text-[#9ae600]',
    ads: 'bg-[#f0b100]/10 text-[#f0b100]',
    sales: 'bg-[#fb2c36]/10 text-[#fb2c36]'
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#9ae600] transition-colors group">
      {/* Screen Preview */}
      <div className={`aspect-video bg-[#09090b] flex items-center justify-center border-b border-[#27272a] ${
        screen.orientation === 'portrait' ? 'aspect-[9/16]' : ''
      }`}>
        <Monitor className={`w-12 h-12 ${
          screen.status === 'online' ? 'text-[#06b6d4]' :
          screen.status === 'error' ? 'text-[#fb2c36]' :
          'text-[#71717b]'
        }`} />
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-sm text-white mb-1">{screen.name}</h3>
            <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
              <MapPin className="w-3 h-3" />
              <span>{screen.zone}</span>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
            screen.status === 'online' ? 'bg-[#06b6d4]/10 text-[#06b6d4]' :
            screen.status === 'error' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
            'bg-[#71717b]/10 text-[#71717b]'
          }`}>
            {screen.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {screen.status}
          </span>
        </div>

        {/* Type Badge */}
        <span className={`inline-block px-2 py-1 rounded text-xs mb-3 ${typeColors[screen.type]}`}>
          {screen.type.charAt(0).toUpperCase() + screen.type.slice(1)}
        </span>

        {/* Details */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717b]">Current Content:</span>
            <span className="text-[#9f9fa9]">{screen.currentContent}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717b]">Resolution:</span>
            <span className="text-[#9f9fa9]">{screen.resolution}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717b]">Uptime:</span>
            <span className="text-[#9f9fa9]">{screen.uptime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#71717b]">
            <Clock className="w-3 h-3" />
            <span>Last sync: {screen.lastSync}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button className="flex-1 px-3 py-2 bg-[#06b6d4]/10 text-[#06b6d4] rounded text-xs hover:bg-[#06b6d4]/20 transition-colors flex items-center justify-center gap-1">
            <Upload className="w-3 h-3" />
            <span>Push Content</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1 mt-3 pt-3 border-t border-[#27272a] opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-[#27272a] rounded" title="Edit">
            <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-2 hover:bg-[#27272a] rounded" title="Restart">
            <RefreshCw className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-2 hover:bg-[#27272a] rounded" title="Power">
            <Power className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-2 hover:bg-[#27272a] rounded ml-auto" title="Delete">
            <Trash2 className="w-3.5 h-3.5 text-[#fb2c36]" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ContentItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'playlist';
  category: 'wayfinder' | 'info' | 'ads' | 'sales';
  size: string;
  duration?: string;
  uploadedAt: string;
  usedBy: number;
  status: 'active' | 'draft' | 'archived';
}

function ContentLibrary() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'document' | 'playlist'>('all');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      name: 'Welcome Screen Animation',
      type: 'video',
      category: 'wayfinder',
      size: '24.5 MB',
      duration: '30s',
      uploadedAt: '2 days ago',
      usedBy: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Daily Events Infographic',
      type: 'image',
      category: 'info',
      size: '2.1 MB',
      uploadedAt: '1 day ago',
      usedBy: 5,
      status: 'active'
    },
    {
      id: '3',
      name: 'Cafe Menu Board',
      type: 'document',
      category: 'sales',
      size: '1.8 MB',
      uploadedAt: '3 days ago',
      usedBy: 1,
      status: 'active'
    },
    {
      id: '4',
      name: 'Property Tour Video',
      type: 'video',
      category: 'ads',
      size: '85.2 MB',
      duration: '2m 15s',
      uploadedAt: '1 week ago',
      usedBy: 2,
      status: 'active'
    },
    {
      id: '5',
      name: 'Interactive Floor Map',
      type: 'image',
      category: 'wayfinder',
      size: '5.3 MB',
      uploadedAt: '5 days ago',
      usedBy: 4,
      status: 'active'
    },
    {
      id: '6',
      name: 'Morning Playlist',
      type: 'playlist',
      category: 'info',
      size: '45.2 MB',
      duration: '15m',
      uploadedAt: '2 weeks ago',
      usedBy: 6,
      status: 'active'
    },
    {
      id: '7',
      name: 'Special Offers Banner',
      type: 'image',
      category: 'ads',
      size: '3.2 MB',
      uploadedAt: '1 day ago',
      usedBy: 3,
      status: 'draft'
    },
    {
      id: '8',
      name: 'Community Guidelines',
      type: 'document',
      category: 'info',
      size: '950 KB',
      uploadedAt: '3 weeks ago',
      usedBy: 2,
      status: 'archived'
    }
  ];

  const filteredContent = filter === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Content Library</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">{filteredContent.length} items</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Content</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          All Content
        </button>
        <button
          onClick={() => setFilter('image')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            filter === 'image'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Image className="w-4 h-4 inline mr-2" />
          Images
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            filter === 'video'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Video className="w-4 h-4 inline mr-2" />
          Videos
        </button>
        <button
          onClick={() => setFilter('document')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            filter === 'document'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Documents
        </button>
        <button
          onClick={() => setFilter('playlist')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            filter === 'playlist'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Play className="w-4 h-4 inline mr-2" />
          Playlists
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredContent.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
}

function ContentCard({ item }: ContentCardProps) {
  const typeIcons = {
    image: Image,
    video: Video,
    document: FileText,
    playlist: Play
  };

  const Icon = typeIcons[item.type];

  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#9ae600] transition-colors group">
      {/* Thumbnail */}
      <div className="aspect-video bg-[#09090b] flex items-center justify-center border-b border-[#27272a]">
        <Icon className="w-12 h-12 text-[#71717b]" />
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm text-white flex-1">{item.name}</h3>
          <span className={`inline-block px-2 py-1 rounded text-xs ml-2 ${
            item.status === 'active' ? 'bg-[#06b6d4]/10 text-[#06b6d4]' :
            item.status === 'draft' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
            'bg-[#71717b]/10 text-[#71717b]'
          }`}>
            {item.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717b]">Size:</span>
            <span className="text-[#9f9fa9]">{item.size}</span>
          </div>
          {item.duration && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#71717b]">Duration:</span>
              <span className="text-[#9f9fa9]">{item.duration}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717b]">Used by:</span>
            <span className="text-[#9f9fa9]">{item.usedBy} screen{item.usedBy !== 1 ? 's' : ''}</span>
          </div>
          <div className="text-xs text-[#71717b]">
            Uploaded {item.uploadedAt}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors">
            Preview
          </button>
          <button className="flex-1 px-3 py-2 bg-[#06b6d4]/10 text-[#06b6d4] rounded text-xs hover:bg-[#06b6d4]/20 transition-colors">
            Deploy
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1 mt-3 pt-3 border-t border-[#27272a] opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-[#27272a] rounded" title="Edit">
            <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-2 hover:bg-[#27272a] rounded ml-auto" title="Delete">
            <Trash2 className="w-3.5 h-3.5 text-[#fb2c36]" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ScheduleEntry {
  id: string;
  screenName: string;
  content: string;
  startTime: string;
  endTime: string;
  days: string[];
  priority: 'low' | 'medium' | 'high';
}

function ScheduleView() {
  const schedules: ScheduleEntry[] = [
    {
      id: '1',
      screenName: 'Lobby Main Display',
      content: 'Welcome Screen + Events',
      startTime: '06:00',
      endTime: '22:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      priority: 'high'
    },
    {
      id: '2',
      screenName: 'Cafe Menu Board',
      content: 'Breakfast Menu',
      startTime: '07:00',
      endTime: '11:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      priority: 'high'
    },
    {
      id: '3',
      screenName: 'Cafe Menu Board',
      content: 'Lunch Menu',
      startTime: '11:00',
      endTime: '16:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      priority: 'high'
    },
    {
      id: '4',
      screenName: 'Cafe Menu Board',
      content: 'Dinner Menu',
      startTime: '16:00',
      endTime: '22:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      priority: 'high'
    },
    {
      id: '5',
      screenName: 'Rooftop Events',
      content: 'Weekend Party Promo',
      startTime: '18:00',
      endTime: '23:00',
      days: ['Fri', 'Sat'],
      priority: 'medium'
    },
    {
      id: '6',
      screenName: 'Coworking Info',
      content: 'Productivity Tips',
      startTime: '09:00',
      endTime: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Content Schedule</h2>
          <p className="text-sm text-[#9f9fa9] mt-1">{schedules.length} active schedules</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Schedule</span>
        </button>
      </div>

      {/* Schedule List */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#09090b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm">Screen</th>
                <th className="text-left p-4 text-sm">Content</th>
                <th className="text-left p-4 text-sm">Time</th>
                <th className="text-left p-4 text-sm">Days</th>
                <th className="text-left p-4 text-sm">Priority</th>
                <th className="text-left p-4 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id} className="border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/50">
                  <td className="p-4 text-sm text-white">{schedule.screenName}</td>
                  <td className="p-4 text-sm text-[#9f9fa9]">{schedule.content}</td>
                  <td className="p-4 text-sm text-[#9f9fa9]">
                    {schedule.startTime} - {schedule.endTime}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {schedule.days.map(day => (
                        <span key={day} className="px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] text-xs rounded">
                          {day}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      schedule.priority === 'high' ? 'bg-[#fb2c36]/10 text-[#fb2c36]' :
                      schedule.priority === 'medium' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
                      'bg-[#06b6d4]/10 text-[#06b6d4]'
                    }`}>
                      {schedule.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-[#3a3a3a] rounded">
                        <Edit className="w-4 h-4 text-[#9f9fa9]" />
                      </button>
                      <button className="p-2 hover:bg-[#3a3a3a] rounded">
                        <Trash2 className="w-4 h-4 text-[#fb2c36]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

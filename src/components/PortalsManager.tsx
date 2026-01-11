import { Plus, Search, Filter, Monitor, Wifi, WifiOff, Grid3x3, List, MapPin, Calendar, Edit, Trash2, MoreVertical, Power, RefreshCw, Eye, Upload, AlertTriangle, Image, Video, FileText, Music, Clock, X } from 'lucide-react';
import { useState } from 'react';

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

interface PortalsManagerProps {
  selectedProperty: string;
}

export function PortalsManager({ selectedProperty }: PortalsManagerProps) {
  const [activePortalTab, setActivePortalTab] = useState<'screens' | 'assets' | 'playlists' | 'schedule'>('screens');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl">Digital Portals</h2>
        <p className="text-sm text-[#9f9fa9] mt-1">Manage digital screens, content, and scheduling</p>
      </div>

      {/* Portal Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActivePortalTab('screens')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            activePortalTab === 'screens'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Screens
          </div>
        </button>
        <button
          onClick={() => setActivePortalTab('assets')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            activePortalTab === 'assets'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Assets
          </div>
        </button>
        <button
          onClick={() => setActivePortalTab('playlists')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            activePortalTab === 'playlists'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            Playlists
          </div>
        </button>
        <button
          onClick={() => setActivePortalTab('schedule')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors ${
            activePortalTab === 'schedule'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </div>
        </button>
      </div>

      {/* Content */}
      {activePortalTab === 'screens' && <ScreensTab selectedProperty={selectedProperty} viewMode={viewMode} setViewMode={setViewMode} />}
      {activePortalTab === 'assets' && <AssetsTab />}
      {activePortalTab === 'playlists' && <PlaylistsTab />}
      {activePortalTab === 'schedule' && <ScheduleTab />}
    </div>
  );
}

// Screens Tab Component
interface ScreensTabProps {
  selectedProperty: string;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

function ScreensTab({ selectedProperty, viewMode, setViewMode }: ScreensTabProps) {
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
    : screens.filter(s => s.location.toLowerCase().includes(selectedProperty.toLowerCase()));

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
              <AlertTriangle className="w-5 h-5 text-[#fb2c36]" />
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
                  <th className="text-left p-4 text-sm">Zone</th>
                  <th className="text-left p-4 text-sm">Status</th>
                  <th className="text-left p-4 text-sm">Content</th>
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

// Assets Tab Component
function AssetsTab() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');

  const assets = [
    { id: '1', name: 'Welcome Banner.jpg', type: 'image', size: '2.4 MB', dimensions: '1920x1080', uploadedAt: '2 days ago', usedIn: 3 },
    { id: '2', name: 'Event Promo.mp4', type: 'video', size: '45.2 MB', dimensions: '1920x1080', uploadedAt: '1 week ago', usedIn: 5 },
    { id: '3', name: 'Menu Board.jpg', type: 'image', size: '1.8 MB', dimensions: '1920x1080', uploadedAt: '3 days ago', usedIn: 1 },
    { id: '4', name: 'Community Guidelines.pdf', type: 'document', size: '890 KB', dimensions: 'A4', uploadedAt: '1 month ago', usedIn: 2 },
    { id: '5', name: 'Yoga Class.jpg', type: 'image', size: '3.1 MB', dimensions: '1080x1920', uploadedAt: '5 days ago', usedIn: 2 },
    { id: '6', name: 'DJ Night Loop.mp4', type: 'video', size: '78.5 MB', dimensions: '1920x1080', uploadedAt: '2 weeks ago', usedIn: 4 },
    { id: '7', name: 'Cafe Specials.jpg', type: 'image', size: '1.2 MB', dimensions: '1920x1080', uploadedAt: '1 day ago', usedIn: 1 },
    { id: '8', name: 'House Rules.jpg', type: 'image', size: '956 KB', dimensions: '1080x1920', uploadedAt: '1 week ago', usedIn: 3 },
  ];

  const filteredAssets = filterType === 'all' ? assets : assets.filter(a => a.type === filterType);

  const stats = {
    total: assets.length,
    images: assets.filter(a => a.type === 'image').length,
    videos: assets.filter(a => a.type === 'video').length,
    documents: assets.filter(a => a.type === 'document').length,
    totalSize: '135.4 MB'
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Total Assets</div>
          <div className="text-2xl">{stats.total}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Images</div>
          <div className="text-2xl text-[#9ae600]">{stats.images}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Videos</div>
          <div className="text-2xl text-[#06b6d4]">{stats.videos}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Documents</div>
          <div className="text-2xl text-[#f0b100]">{stats.documents}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Total Size</div>
          <div className="text-2xl text-[#d946ef]">{stats.totalSize}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              filterType === 'all'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5 ${
              filterType === 'image'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            Images
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5 ${
              filterType === 'video'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Videos
          </button>
          <button
            onClick={() => setFilterType('document')}
            className={`px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5 ${
              filterType === 'document'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Documents
          </button>
          
          <div className="h-6 w-px bg-[#27272a] mx-1"></div>
          
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
          <Upload className="w-4 h-4" />
          <span>Upload Assets</span>
        </button>
      </div>

      {/* Assets Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#09090b] border-b border-[#27272a]">
                <tr>
                  <th className="text-left p-4 text-sm">Name</th>
                  <th className="text-left p-4 text-sm">Type</th>
                  <th className="text-left p-4 text-sm">Size</th>
                  <th className="text-left p-4 text-sm">Dimensions</th>
                  <th className="text-left p-4 text-sm">Uploaded</th>
                  <th className="text-left p-4 text-sm">Used In</th>
                  <th className="text-left p-4 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map(asset => (
                  <tr key={asset.id} className="border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          asset.type === 'image' ? 'bg-[#9ae600]/10' :
                          asset.type === 'video' ? 'bg-[#06b6d4]/10' :
                          'bg-[#f0b100]/10'
                        }`}>
                          {asset.type === 'image' && <Image className="w-4 h-4 text-[#9ae600]" />}
                          {asset.type === 'video' && <Video className="w-4 h-4 text-[#06b6d4]" />}
                          {asset.type === 'document' && <FileText className="w-4 h-4 text-[#f0b100]" />}
                        </div>
                        <span className="text-sm">{asset.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[#9f9fa9] capitalize">{asset.type}</td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{asset.size}</td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{asset.dimensions}</td>
                    <td className="p-4 text-sm text-[#9f9fa9]">{asset.uploadedAt}</td>
                    <td className="p-4 text-sm">
                      <span className="px-2 py-1 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">
                        {asset.usedIn} playlists
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-[#3a3a3a] rounded" title="Preview">
                          <Eye className="w-4 h-4 text-[#9f9fa9]" />
                        </button>
                        <button className="p-1.5 hover:bg-[#3a3a3a] rounded" title="Edit">
                          <Edit className="w-4 h-4 text-[#9f9fa9]" />
                        </button>
                        <button className="p-1.5 hover:bg-[#3a3a3a] rounded" title="Delete">
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
      )}
    </div>
  );
}

// Asset Card Component
interface AssetCardProps {
  asset: {
    id: string;
    name: string;
    type: string;
    size: string;
    dimensions: string;
    uploadedAt: string;
    usedIn: number;
  };
}

function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#9ae600] transition-colors group">
      {/* Asset Preview */}
      <div className="aspect-video bg-[#09090b] flex items-center justify-center border-b border-[#27272a]">
        {asset.type === 'image' && <Image className="w-12 h-12 text-[#9ae600]" />}
        {asset.type === 'video' && <Video className="w-12 h-12 text-[#06b6d4]" />}
        {asset.type === 'document' && <FileText className="w-12 h-12 text-[#f0b100]" />}
      </div>

      <div className="p-3">
        <div className="text-sm text-white mb-1 truncate" title={asset.name}>{asset.name}</div>
        <div className="flex items-center justify-between text-xs text-[#9f9fa9] mb-2">
          <span>{asset.size}</span>
          <span>{asset.dimensions}</span>
        </div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-[#71717b]">{asset.uploadedAt}</span>
          <span className="px-2 py-0.5 bg-[#9ae600]/10 text-[#9ae600] rounded">{asset.usedIn} uses</span>
        </div>

        {/* Actions */}
        <div className="flex gap-1 pt-2 border-t border-[#27272a] opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex-1 px-2 py-1.5 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" />
            Preview
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded" title="Edit">
            <Edit className="w-3.5 h-3.5 text-[#9f9fa9]" />
          </button>
          <button className="p-1.5 hover:bg-[#27272a] rounded" title="Delete">
            <Trash2 className="w-3.5 h-3.5 text-[#fb2c36]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Playlists Tab Component
function PlaylistsTab() {
  const playlists = [
    { id: '1', name: 'Morning Welcome', items: 5, duration: '2:30', screens: 3, status: 'active', lastUpdated: '2 days ago' },
    { id: '2', name: 'Cafe Promotions', items: 8, duration: '4:00', screens: 1, status: 'active', lastUpdated: '1 week ago' },
    { id: '3', name: 'Evening Events', items: 6, duration: '3:15', screens: 5, status: 'active', lastUpdated: '3 days ago' },
    { id: '4', name: 'Weekend Specials', items: 4, duration: '2:00', screens: 2, status: 'draft', lastUpdated: '1 day ago' },
    { id: '5', name: 'Community Updates', items: 10, duration: '5:30', screens: 4, status: 'active', lastUpdated: '5 days ago' },
    { id: '6', name: 'Nighttime Ambient', items: 3, duration: '10:00', screens: 2, status: 'active', lastUpdated: '1 month ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Total Playlists</div>
          <div className="text-2xl">{playlists.length}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Active</div>
          <div className="text-2xl text-[#9ae600]">{playlists.filter(p => p.status === 'active').length}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Drafts</div>
          <div className="text-2xl text-[#f0b100]">{playlists.filter(p => p.status === 'draft').length}</div>
        </div>
        <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
          <div className="text-xs text-[#9f9fa9] mb-1">Total Items</div>
          <div className="text-2xl text-[#06b6d4]">{playlists.reduce((acc, p) => acc + p.items, 0)}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-[#9f9fa9]">
          Manage content playlists for digital screens
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Playlist</span>
        </button>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

// Playlist Card Component
interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    items: number;
    duration: string;
    screens: number;
    status: string;
    lastUpdated: string;
  };
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4 hover:border-[#9ae600] transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#9ae600]/10 rounded-lg">
            <Music className="w-5 h-5 text-[#9ae600]" />
          </div>
          <div>
            <h3 className="text-sm text-white mb-1">{playlist.name}</h3>
            <span className={`inline-block px-2 py-0.5 rounded text-xs ${
              playlist.status === 'active'
                ? 'bg-[#9ae600]/10 text-[#9ae600]'
                : 'bg-[#f0b100]/10 text-[#f0b100]'
            }`}>
              {playlist.status}
            </span>
          </div>
        </div>
        <button className="p-1.5 hover:bg-[#27272a] rounded">
          <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#71717b]">Items:</span>
          <span className="text-[#9f9fa9]">{playlist.items}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#71717b]">Duration:</span>
          <span className="text-[#9f9fa9]">{playlist.duration}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#71717b]">Screens:</span>
          <span className="text-[#9f9fa9]">{playlist.screens} active</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#71717b]">
          <Clock className="w-3 h-3" />
          <span>Updated {playlist.lastUpdated}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-[#27272a]">
        <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
          <Edit className="w-3 h-3" />
          Edit
        </button>
        <button className="flex-1 px-3 py-2 bg-[#06b6d4]/10 text-[#06b6d4] rounded text-xs hover:bg-[#06b6d4]/20 transition-colors flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" />
          Schedule
        </button>
      </div>
    </div>
  );
}

// Schedule Tab Component
function ScheduleTab() {
  const schedules = [
    { id: '1', screen: 'Lobby Main Display', playlist: 'Morning Welcome', startTime: '06:00', endTime: '12:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], status: 'active' },
    { id: '2', screen: 'Lobby Main Display', playlist: 'Evening Events', startTime: '17:00', endTime: '23:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], status: 'active' },
    { id: '3', screen: 'Cafe Menu Board', playlist: 'Cafe Promotions', startTime: '08:00', endTime: '22:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], status: 'active' },
    { id: '4', screen: 'Coworking Info', playlist: 'Community Updates', startTime: '09:00', endTime: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], status: 'active' },
    { id: '5', screen: 'Reception Wayfinder', playlist: 'Weekend Specials', startTime: '00:00', endTime: '23:59', days: ['Sat', 'Sun'], status: 'draft' },
    { id: '6', screen: 'Pool Area Display', playlist: 'Nighttime Ambient', startTime: '20:00', endTime: '06:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg">Content Schedule</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">Manage when playlists appear on screens</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Schedule List */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#09090b] border-b border-[#27272a]">
              <tr>
                <th className="text-left p-4 text-sm">Screen</th>
                <th className="text-left p-4 text-sm">Playlist</th>
                <th className="text-left p-4 text-sm">Time Slot</th>
                <th className="text-left p-4 text-sm">Days</th>
                <th className="text-left p-4 text-sm">Status</th>
                <th className="text-left p-4 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id} className="border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[#06b6d4]" />
                      <span className="text-sm">{schedule.screen}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#9ae600]" />
                      <span className="text-sm">{schedule.playlist}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-[#9f9fa9]">
                      <Clock className="w-4 h-4" />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {schedule.days.map(day => (
                        <span key={day} className="px-2 py-0.5 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">
                          {day}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      schedule.status === 'active'
                        ? 'bg-[#9ae600]/10 text-[#9ae600]'
                        : 'bg-[#f0b100]/10 text-[#f0b100]'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[#3a3a3a] rounded" title="Edit">
                        <Edit className="w-4 h-4 text-[#9f9fa9]" />
                      </button>
                      <button className="p-1.5 hover:bg-[#3a3a3a] rounded" title="Delete">
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

      {/* Quick Schedule View */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-4">
        <h3 className="text-sm mb-4">Today's Schedule Overview</h3>
        <div className="space-y-3">
          <TimelineSlot time="06:00 - 12:00" screen="Lobby Main Display" playlist="Morning Welcome" color="bg-[#9ae600]" />
          <TimelineSlot time="08:00 - 22:00" screen="Cafe Menu Board" playlist="Cafe Promotions" color="bg-[#06b6d4]" />
          <TimelineSlot time="09:00 - 18:00" screen="Coworking Info" playlist="Community Updates" color="bg-[#f0b100]" />
          <TimelineSlot time="17:00 - 23:00" screen="Lobby Main Display" playlist="Evening Events" color="bg-[#d946ef]" />
        </div>
      </div>
    </div>
  );
}

// Timeline Slot Component
interface TimelineSlotProps {
  time: string;
  screen: string;
  playlist: string;
  color: string;
}

function TimelineSlot({ time, screen, playlist, color }: TimelineSlotProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#09090b] border border-[#27272a] rounded-lg">
      <div className={`w-1 h-12 rounded-full ${color}`}></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs text-[#9f9fa9] mb-1">
          <Clock className="w-3 h-3" />
          <span>{time}</span>
        </div>
        <div className="text-sm text-white">{screen}</div>
        <div className="text-xs text-[#71717b]">{playlist}</div>
      </div>
      <button className="p-2 hover:bg-[#27272a] rounded">
        <MoreVertical className="w-4 h-4 text-[#9f9fa9]" />
      </button>
    </div>
  );
}

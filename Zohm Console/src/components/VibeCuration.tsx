import { ChevronDown, Eye, Volume2, Wind, Coffee as CoffeeIcon, Hand, Zap, TrendingUp, Music, Lightbulb, Thermometer, Play, Pause, Send, MessageSquare, Users, CheckCircle2, Clock, Instagram, Facebook, Twitter, Bell, Image, Video, FileText, X, Upload, Monitor, Wifi, WifiOff, Grid3x3, List, MapPin, Calendar, Plus, Edit, Trash2, MoreVertical, Power, RefreshCw, Sunrise, Sunset, Moon, Sun, AlertTriangle, Tv } from 'lucide-react';
import { useState } from 'react';
import { PortalsManager } from './PortalsManager';

interface VibeCurationProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  subView?: 'comms' | 'portals' | 'sound' | 'lights';
  onSubViewChange?: (view: 'comms' | 'portals' | 'sound' | 'lights') => void;
}

export function VibeCuration({ selectedProperty, onPropertyChange, subView: externalSubView, onSubViewChange }: VibeCurationProps) {
  const [internalSubView, setInternalSubView] = useState<'comms' | 'portals' | 'sound' | 'lights'>('comms');
  
  const subView = externalSubView || internalSubView;
  const handleSubViewChange = (view: 'comms' | 'portals' | 'sound' | 'lights') => {
    if (onSubViewChange) {
      onSubViewChange(view);
    } else {
      setInternalSubView(view);
    }
  };

  return (
    <>
      <Header 
        selectedProperty={selectedProperty} 
        onPropertyChange={onPropertyChange}
        subView={subView}
        onSubViewChange={handleSubViewChange}
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px]">
          {subView === 'comms' && <CommunicationHub />}
          {subView === 'portals' && <PortalsManager selectedProperty={selectedProperty} />}
          {subView === 'sound' && <SoundControls selectedProperty={selectedProperty} />}
          {subView === 'lights' && <LightControls selectedProperty={selectedProperty} />}
        </div>
      </main>
    </>
  );
}

interface HeaderProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  subView: 'comms' | 'portals' | 'sound' | 'lights';
  onSubViewChange: (view: 'comms' | 'portals' | 'sound' | 'lights') => void;
}

function Header({ selectedProperty, onPropertyChange, subView, onSubViewChange }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl">Vibe Curation</h1>
            <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">Manage sensory experience and atmosphere</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] whitespace-nowrap">
              <span className="text-xs sm:text-sm">Live</span>
              <div className="w-2 h-2 rounded-full bg-[#9ae600] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => onSubViewChange('comms')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'comms'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Comms
          </button>
          <button
            onClick={() => onSubViewChange('portals')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'portals'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Portals
          </button>
          <button
            onClick={() => onSubViewChange('sound')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'sound'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Sound
          </button>
          <button
            onClick={() => onSubViewChange('lights')}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              subView === 'lights'
                ? 'bg-[#9ae600] text-black'
                : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Lights
          </button>
        </div>
      </div>
    </header>
  );
}

interface SoundControlsProps {
  selectedProperty: string;
}

function SoundControls({ selectedProperty }: SoundControlsProps) {
  const [activeView, setActiveView] = useState<'speakers' | 'playlists'>('speakers');

  const speakers = [
    {
      id: '1',
      name: 'Main Lobby Speakers',
      zone: 'Main Entrance',
      status: 'playing' as const,
      volume: 60,
      currentTrack: 'Sunset Dreams',
      playlist: 'Chill Vibes Mix',
      connected: true
    },
    {
      id: '2',
      name: 'Rooftop Terrace Sound System',
      zone: 'Rooftop',
      status: 'paused' as const,
      volume: 45,
      currentTrack: 'Evening Jazz',
      playlist: 'Jazz Lounge',
      connected: true
    },
    {
      id: '3',
      name: 'Co-working Space Audio',
      zone: 'Co-working Area',
      status: 'playing' as const,
      volume: 30,
      currentTrack: 'Focus Flow',
      playlist: 'Deep Focus',
      connected: true
    },
    {
      id: '4',
      name: 'Cafe Speakers',
      zone: 'Cafe Area',
      status: 'playing' as const,
      volume: 50,
      currentTrack: 'Morning Coffee',
      playlist: 'Cafe Acoustic',
      connected: true
    },
    {
      id: '5',
      name: 'Pool Area Sound',
      zone: 'Pool Deck',
      status: 'stopped' as const,
      volume: 0,
      currentTrack: '-',
      playlist: 'Beach Vibes',
      connected: false
    },
    {
      id: '6',
      name: 'Gym Audio System',
      zone: 'Fitness Center',
      status: 'playing' as const,
      volume: 70,
      currentTrack: 'Energy Boost',
      playlist: 'Workout Beats',
      connected: true
    }
  ];

  const playlists = [
    {
      id: '1',
      name: 'Chill Vibes Mix',
      tracks: 42,
      duration: '2h 45m',
      genre: 'Lounge',
      activeZones: 2,
      thumbnail: '🎵'
    },
    {
      id: '2',
      name: 'Jazz Lounge',
      tracks: 38,
      duration: '3h 12m',
      genre: 'Jazz',
      activeZones: 1,
      thumbnail: '🎷'
    },
    {
      id: '3',
      name: 'Deep Focus',
      tracks: 56,
      duration: '4h 20m',
      genre: 'Ambient',
      activeZones: 1,
      thumbnail: '🎧'
    },
    {
      id: '4',
      name: 'Cafe Acoustic',
      tracks: 45,
      duration: '3h 05m',
      genre: 'Acoustic',
      activeZones: 1,
      thumbnail: '☕'
    },
    {
      id: '5',
      name: 'Beach Vibes',
      tracks: 52,
      duration: '3h 30m',
      genre: 'Tropical',
      activeZones: 0,
      thumbnail: '🏖️'
    },
    {
      id: '6',
      name: 'Workout Beats',
      tracks: 60,
      duration: '4h 00m',
      genre: 'Electronic',
      activeZones: 1,
      thumbnail: '💪'
    },
    {
      id: '7',
      name: 'Evening Sunset',
      tracks: 35,
      duration: '2h 25m',
      genre: 'Downtempo',
      activeZones: 0,
      thumbnail: '🌅'
    },
    {
      id: '8',
      name: 'Night Vibes',
      tracks: 48,
      duration: '3h 45m',
      genre: 'Chillout',
      activeZones: 0,
      thumbnail: '🌙'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl">Sound Management</h2>
        <p className="text-sm text-[#9f9fa9] mt-1">Control speakers and playlists across all zones</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveView('speakers')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeView === 'speakers'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          Speakers
        </button>
        <button
          onClick={() => setActiveView('playlists')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeView === 'playlists'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Music className="w-4 h-4" />
          Playlists
        </button>
      </div>

      {/* Speakers View */}
      {activeView === 'speakers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#9f9fa9]">
              {speakers.filter(s => s.connected).length} of {speakers.length} speakers online
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
              <Plus className="w-4 h-4" />
              Add Speaker
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {speakers.map(speaker => (
              <div 
                key={speaker.id} 
                className={`bg-[#1a1a1a] border rounded-lg p-5 transition-colors ${
                  speaker.connected ? 'border-[#27272a]' : 'border-[#fb2c36]/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm">{speaker.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        speaker.status === 'playing' ? 'bg-[#9ae600]/10 text-[#9ae600]' :
                        speaker.status === 'paused' ? 'bg-[#f0b100]/10 text-[#f0b100]' :
                        'bg-[#71717b]/10 text-[#71717b]'
                      }`}>
                        {speaker.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
                      <MapPin className="w-3 h-3" />
                      <span>{speaker.zone}</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    speaker.connected ? 'bg-[#9ae600]/10' : 'bg-[#fb2c36]/10'
                  }`}>
                    <Volume2 className={`w-5 h-5 ${
                      speaker.connected ? 'text-[#9ae600]' : 'text-[#fb2c36]'
                    }`} />
                  </div>
                </div>

                {speaker.connected && (
                  <>
                    <div className="bg-[#09090b] rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-3 h-3 text-[#9ae600]" />
                        <span className="text-sm">{speaker.currentTrack}</span>
                      </div>
                      <div className="text-xs text-[#71717b]">{speaker.playlist}</div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#71717b]">Volume</span>
                        <span className="text-sm">{speaker.volume}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={speaker.volume}
                        className="w-full h-2 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#9ae600]"
                        readOnly
                      />
                    </div>

                    <div className="flex gap-2">
                      {speaker.status === 'playing' ? (
                        <button className="flex-1 px-3 py-2 bg-[#f0b100]/10 text-[#f0b100] rounded text-xs hover:bg-[#f0b100]/20 transition-colors flex items-center justify-center gap-1">
                          <Pause className="w-3 h-3" />
                          Pause
                        </button>
                      ) : (
                        <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
                          <Play className="w-3 h-3" />
                          Play
                        </button>
                      )}
                      <button className="px-3 py-2 bg-[#27272a] text-[#9f9fa9] rounded text-xs hover:bg-[#3a3a3a] transition-colors">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {!speaker.connected && (
                  <div className="flex items-center justify-center py-4 text-sm text-[#fb2c36]">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Disconnected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playlists View */}
      {activeView === 'playlists' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#9f9fa9]">
              {playlists.length} playlists available
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
              <Plus className="w-4 h-4" />
              Create Playlist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {playlists.map(playlist => (
              <div 
                key={playlist.id} 
                className="bg-[#1a1a1a] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#9ae600] transition-colors group cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-[#9ae600]/20 to-[#06b6d4]/20 flex items-center justify-center border-b border-[#27272a]">
                  <span className="text-5xl">{playlist.thumbnail}</span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{playlist.name}</h3>
                      <div className="text-xs text-[#71717b]">{playlist.genre}</div>
                    </div>
                    {playlist.activeZones > 0 && (
                      <span className="px-2 py-0.5 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs">
                        Playing
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#71717b]">Tracks:</span>
                      <span className="text-[#9f9fa9]">{playlist.tracks}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#71717b]">Duration:</span>
                      <span className="text-[#9f9fa9]">{playlist.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#71717b]">Active zones:</span>
                      <span className="text-[#9f9fa9]">{playlist.activeZones}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
                      <Play className="w-3 h-3" />
                      Play
                    </button>
                    <button className="px-3 py-2 bg-[#27272a] text-[#9f9fa9] rounded text-xs hover:bg-[#3a3a3a] transition-colors">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface LightSchedule {
  id: string;
  zone: string;
  schedule: string;
  startTime: string;
  endTime: string;
  brightness: number;
  color: string;
  days: string[];
  enabled: boolean;
}

interface LightStatus {
  id: string;
  zone: string;
  status: 'on' | 'off';
  brightness: number;
  color: string;
  temperature: string;
  connected: boolean;
}

function LightControls({ selectedProperty }: { selectedProperty: string }) {
  const [activeView, setActiveView] = useState<'status' | 'schedules'>('status');

  const lightStatuses: LightStatus[] = [
    {
      id: '1',
      zone: 'Main Lobby',
      status: 'on',
      brightness: 80,
      color: 'Warm White',
      temperature: '3000K',
      connected: true
    },
    {
      id: '2',
      zone: 'Co-working Space',
      status: 'on',
      brightness: 100,
      color: 'Daylight',
      temperature: '5000K',
      connected: true
    },
    {
      id: '3',
      zone: 'Rooftop Terrace',
      status: 'on',
      brightness: 40,
      color: 'Amber',
      temperature: '2200K',
      connected: true
    },
    {
      id: '4',
      zone: 'Cafe Area',
      status: 'on',
      brightness: 70,
      color: 'Warm White',
      temperature: '2700K',
      connected: true
    },
    {
      id: '5',
      zone: 'Guest Rooms',
      status: 'off',
      brightness: 0,
      color: 'Soft Amber',
      temperature: '2000K',
      connected: true
    },
    {
      id: '6',
      zone: 'Pool Area',
      status: 'on',
      brightness: 60,
      color: 'Blue-Cyan',
      temperature: '6500K',
      connected: true
    },
    {
      id: '7',
      zone: 'Gym Entrance',
      status: 'on',
      brightness: 90,
      color: 'Cool White',
      temperature: '4500K',
      connected: true
    },
    {
      id: '8',
      zone: 'Reception',
      status: 'off',
      brightness: 0,
      color: 'Neutral',
      temperature: '4000K',
      connected: false
    }
  ];

  const lightSchedules: LightSchedule[] = [
    {
      id: '1',
      zone: 'Main Lobby',
      schedule: 'Morning Energize',
      startTime: '06:00',
      endTime: '10:00',
      brightness: 80,
      color: 'Warm White',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      enabled: true
    },
    {
      id: '2',
      zone: 'Co-working Space',
      schedule: 'Focus Mode',
      startTime: '09:00',
      endTime: '18:00',
      brightness: 100,
      color: 'Daylight',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      enabled: true
    },
    {
      id: '3',
      zone: 'Rooftop Terrace',
      schedule: 'Evening Ambiance',
      startTime: '18:00',
      endTime: '23:00',
      brightness: 40,
      color: 'Amber',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      enabled: true
    },
    {
      id: '4',
      zone: 'Cafe Area',
      schedule: 'Breakfast Glow',
      startTime: '07:00',
      endTime: '11:00',
      brightness: 70,
      color: 'Warm White',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      enabled: true
    },
    {
      id: '5',
      zone: 'Guest Rooms',
      schedule: 'Night Mode',
      startTime: '22:00',
      endTime: '06:00',
      brightness: 10,
      color: 'Soft Amber',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      enabled: false
    },
    {
      id: '6',
      zone: 'Pool Area',
      schedule: 'Sunset Vibes',
      startTime: '17:00',
      endTime: '21:00',
      brightness: 60,
      color: 'Blue-Cyan',
      days: ['Fri', 'Sat', 'Sun'],
      enabled: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl">Light Controls</h2>
        <p className="text-sm text-[#9f9fa9] mt-1">Monitor and schedule lighting across all zones</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveView('status')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeView === 'status'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          Status
        </button>
        <button
          onClick={() => setActiveView('schedules')}
          className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeView === 'schedules'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#1a1a1a] border border-[#27272a] text-[#9f9fa9] hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Schedules
        </button>
      </div>

      {/* Status View */}
      {activeView === 'status' && (
        <div className="space-y-4">
          {/* Quick Scene Controls */}
          <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
            <h3 className="text-lg mb-4">Quick Scenes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-3 p-4 bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
                <Sunrise className="w-6 h-6 text-[#f0b100]" />
                <span className="text-sm">Morning</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
                <Sun className="w-6 h-6 text-[#9ae600]" />
                <span className="text-sm">Daytime</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
                <Sunset className="w-6 h-6 text-[#fb2c36]" />
                <span className="text-sm">Evening</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-4 bg-[#09090b] border border-[#27272a] rounded-lg hover:border-[#9ae600] transition-colors">
                <Moon className="w-6 h-6 text-[#06b6d4]" />
                <span className="text-sm">Night</span>
              </button>
            </div>
          </div>

          {/* Light Status by Zone */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#9f9fa9]">
                {lightStatuses.filter(l => l.connected).length} of {lightStatuses.length} zones connected
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lightStatuses.map(light => (
                <div 
                  key={light.id} 
                  className={`bg-[#1a1a1a] border rounded-lg p-5 transition-colors ${
                    light.connected ? 'border-[#27272a]' : 'border-[#fb2c36]/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm">{light.zone}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          light.status === 'on' ? 'bg-[#9ae600]/10 text-[#9ae600]' : 'bg-[#71717b]/10 text-[#71717b]'
                        }`}>
                          {light.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-[#71717b]">{light.color} • {light.temperature}</div>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      light.connected && light.status === 'on' ? 'bg-[#9ae600]/10' : 'bg-[#71717b]/10'
                    }`}>
                      <Lightbulb className={`w-5 h-5 ${
                        light.connected && light.status === 'on' ? 'text-[#9ae600]' : 'text-[#71717b]'
                      }`} />
                    </div>
                  </div>

                  {light.connected && (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#71717b]">Brightness</span>
                          <span className="text-sm">{light.brightness}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={light.brightness}
                          className="w-full h-2 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#9ae600]"
                          readOnly
                        />
                      </div>

                      <div className="flex gap-2">
                        {light.status === 'on' ? (
                          <button className="flex-1 px-3 py-2 bg-[#71717b]/10 text-[#9f9fa9] rounded text-xs hover:bg-[#71717b]/20 transition-colors flex items-center justify-center gap-1">
                            <Power className="w-3 h-3" />
                            Turn Off
                          </button>
                        ) : (
                          <button className="flex-1 px-3 py-2 bg-[#9ae600]/10 text-[#9ae600] rounded text-xs hover:bg-[#9ae600]/20 transition-colors flex items-center justify-center gap-1">
                            <Power className="w-3 h-3" />
                            Turn On
                          </button>
                        )}
                        <button className="px-3 py-2 bg-[#27272a] text-[#9f9fa9] rounded text-xs hover:bg-[#3a3a3a] transition-colors">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}

                  {!light.connected && (
                    <div className="flex items-center justify-center py-4 text-sm text-[#fb2c36]">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Disconnected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedules View */}
      {activeView === 'schedules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#9f9fa9]">
              {lightSchedules.filter(s => s.enabled).length} active schedules
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#9ae600] text-black rounded text-sm hover:bg-[#8bd500] transition-colors">
              <Plus className="w-4 h-4" />
              New Schedule
            </button>
          </div>

          <div className="space-y-3">
            {lightSchedules.map(schedule => (
              <div 
                key={schedule.id} 
                className={`bg-[#1a1a1a] border rounded-lg p-5 transition-colors ${
                  schedule.enabled ? 'border-[#9ae600]/30' : 'border-[#27272a]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-sm">{schedule.schedule}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        schedule.enabled 
                          ? 'bg-[#9ae600]/10 text-[#9ae600]' 
                          : 'bg-[#71717b]/10 text-[#71717b]'
                      }`}>
                        {schedule.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9f9fa9]">
                      <MapPin className="w-3 h-3" />
                      <span>{schedule.zone}</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={schedule.enabled} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9ae600]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <div className="text-xs text-[#71717b] mb-1">Time</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3 text-[#9f9fa9]" />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#71717b] mb-1">Brightness</div>
                    <div className="text-sm">{schedule.brightness}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#71717b] mb-1">Color</div>
                    <div className="text-sm">{schedule.color}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#71717b] mb-1">Days</div>
                    <div className="flex gap-1">
                      {schedule.days.slice(0, 3).map(day => (
                        <span key={day} className="px-1.5 py-0.5 bg-[#9ae600]/10 text-[#9ae600] text-xs rounded">
                          {day}
                        </span>
                      ))}
                      {schedule.days.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-[#71717b]/10 text-[#71717b] text-xs rounded">
                          +{schedule.days.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-[#27272a]">
                  <button className="px-3 py-1.5 bg-[#27272a] text-[#9f9fa9] rounded text-xs hover:bg-[#3a3a3a] transition-colors flex items-center gap-1">
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button className="px-3 py-1.5 bg-[#27272a] text-[#9f9fa9] rounded text-xs hover:bg-[#3a3a3a] transition-colors flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Test
                  </button>
                  <button className="px-3 py-1.5 bg-[#fb2c36]/10 text-[#fb2c36] rounded text-xs hover:bg-[#fb2c36]/20 transition-colors flex items-center gap-1 ml-auto">
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CommunicationHub() {
  const [message, setMessage] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [attachedMedia, setAttachedMedia] = useState<Array<{ id: string; name: string; type: string; size: string; url?: string }>>([]);

  const groups = [
    { id: 'current-residents', name: 'Current Residents', count: 48 },
    { id: 'weekend-guests', name: 'Weekend Guests', count: 22 },
    { id: 'event-attendees', name: 'Event Attendees', count: 35 },
    { id: 'long-term-stays', name: 'Long Term Stays', count: 15 },
    { id: 'vip-members', name: 'VIP Members', count: 12 }
  ];

  const platforms = [
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageSquare className="w-4 h-4" />, color: 'text-[#25D366]' },
    { id: 'telegram', name: 'Telegram', icon: <Send className="w-4 h-4" />, color: 'text-[#0088cc]' },
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: 'text-[#E4405F]' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-4 h-4" />, color: 'text-[#1877F2]' },
    { id: 'twitter', name: 'Twitter', icon: <Twitter className="w-4 h-4" />, color: 'text-[#1DA1F2]' }
  ];

  const templates = [
    {
      id: 'vibe-update',
      name: 'Vibe Update',
      message: '🎵 Evening vibes are ON! Join us at the rooftop terrace for live music at 7 PM. Great energy and good company await! ✨'
    },
    {
      id: 'event-announcement',
      name: 'Event Announcement',
      message: '🎉 Special Event Alert! Movie night under the stars tonight at 9 PM. Free popcorn for everyone! See you there! 🍿'
    },
    {
      id: 'activity-invite',
      name: 'Activity Invite',
      message: '🏐 Beach volleyball match starting in 30 minutes at the outdoor court! All skill levels welcome. Let\'s have some fun! 🌞'
    },
    {
      id: 'feedback-request',
      name: 'Feedback Request',
      message: '💭 How\'s your experience today? We\'d love to hear your feedback about the vibe and atmosphere. Drop us a message! 🙏'
    }
  ];

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId) ? prev.filter(id => id !== platformId) : [...prev, platformId]
    );
  };

  const selectTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setMessage(template.message);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newMedia = Array.from(files).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file',
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file)
      }));
      setAttachedMedia(prev => [...prev, ...newMedia]);
    }
  };

  const removeMedia = (id: string) => {
    setAttachedMedia(prev => prev.filter(media => media.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSend = () => {
    // Mock sending logic
    console.log('Sending message:', message);
    console.log('To groups:', selectedGroups);
    console.log('Via platforms:', selectedPlatforms);
    // Reset form
    setMessage('');
    setSelectedGroups([]);
    setSelectedPlatforms([]);
    setSelectedTemplate('');
    setAttachedMedia([]);
  };

  const totalRecipients = groups
    .filter(g => selectedGroups.includes(g.id))
    .reduce((sum, g) => sum + g.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl">Communication Hub</h2>
        <p className="text-sm text-[#9f9fa9] mt-1">Send messages and updates to resident groups across multiple platforms</p>
      </div>

      {/* Message Composer */}
      <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-5">
        <h3 className="text-lg mb-4">Compose Message</h3>
        
        {/* Templates */}
        <div className="mb-4">
          <label className="text-sm text-[#9f9fa9] mb-2 block">Quick Templates</label>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  selectedTemplate === template.id
                    ? 'bg-[#9ae600] text-black'
                    : 'bg-[#27272a] text-[#9f9fa9] hover:bg-[#3a3a3a]'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="text-sm text-[#9f9fa9] mb-2 block">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 px-4 py-3 bg-[#09090b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#71717b] resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#71717b]">{message.length} characters</span>
          </div>
        </div>

        {/* Select Groups */}
        <div className="mb-4">
          <label className="text-sm text-[#9f9fa9] mb-2 block">Select Groups</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => toggleGroup(group.id)}
                className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-colors ${
                  selectedGroups.includes(group.id)
                    ? 'bg-[#9ae600]/20 border-[#9ae600] border text-white'
                    : 'bg-[#27272a] border border-transparent text-[#9f9fa9] hover:bg-[#3a3a3a]'
                }`}
              >
                <span className="truncate">{group.name}</span>
                <span className={`ml-2 ${selectedGroups.includes(group.id) ? 'text-[#9ae600]' : 'text-[#71717b]'}`}>
                  {group.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Select Platforms */}
        <div className="mb-4">
          <label className="text-sm text-[#9f9fa9] mb-2 block">Select Platforms</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors ${
                  selectedPlatforms.includes(platform.id)
                    ? 'bg-[#9ae600]/20 border-[#9ae600] border text-white'
                    : 'bg-[#27272a] border border-transparent text-[#9f9fa9] hover:bg-[#3a3a3a]'
                }`}
              >
                <div className={selectedPlatforms.includes(platform.id) ? platform.color : 'text-[#71717b]'}>
                  {platform.icon}
                </div>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Attach Media */}
        <div className="mb-4">
          <label className="text-sm text-[#9f9fa9] mb-2 block">Attach Media</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors bg-[#27272a] border border-[#3a3a3a] text-[#9f9fa9] hover:bg-[#3a3a3a] cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </label>
          </div>
          {attachedMedia.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm text-[#9f9fa9] mb-1">Attached Media:</h4>
              <div className="flex flex-wrap gap-2">
                {attachedMedia.map(media => (
                  <div
                    key={media.id}
                    className="flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors bg-[#27272a] border border-[#3a3a3a] text-[#9f9fa9]"
                  >
                    <div className="w-4 h-4">
                      {media.type === 'image' ? <Image className="w-4 h-4" /> : media.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <span className="truncate max-w-[120px]">{media.name}</span>
                    <span className="text-[#71717b]">({media.size})</span>
                    <button
                      onClick={() => removeMedia(media.id)}
                      className="ml-2 text-[#9f9fa9] hover:text-[#fb2c36]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Send Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#27272a]">
          <div className="text-sm">
            <span className="text-[#9f9fa9]">Recipients: </span>
            <span className="text-white">{totalRecipients} people</span>
            {selectedPlatforms.length > 0 && (
              <>
                <span className="text-[#9f9fa9]"> on </span>
                <span className="text-white">{selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!message || selectedGroups.length === 0 || selectedPlatforms.length === 0}
            className="flex items-center gap-2 px-6 py-2 bg-[#9ae600] text-black rounded hover:bg-[#8bd500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
          >
            <Send className="w-4 h-4" />
            <span className="text-sm">Send Message</span>
          </button>
        </div>
      </div>
    </div>
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

function PortalsSection({ selectedProperty }: { selectedProperty: string }) {
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
    : screens.filter(s => s.location.toLowerCase().includes(selectedProperty.toLowerCase()));

  const stats = {
    total: filteredScreens.length,
    online: filteredScreens.filter(s => s.status === 'online').length,
    offline: filteredScreens.filter(s => s.status === 'offline').length,
    error: filteredScreens.filter(s => s.status === 'error').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl">Digital Portals</h2>
        <p className="text-sm text-[#9f9fa9] mt-1">Manage digital screens and content displays across the property</p>
      </div>

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

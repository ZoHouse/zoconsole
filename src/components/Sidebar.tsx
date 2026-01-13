import {
  LayoutDashboard,
  DollarSign,
  Users,
  Compass,
  Sparkles,
  Coffee,
  TrendingUp,
  Megaphone,
  Menu,
  X,
  Search,
  ChevronDown,
  Building,
  Home,
  Target,
  Bot,
  Calendar,
  Wifi,
  Crown,
  UserCircle,
} from "lucide-react";

interface SidebarProps {
  activeTab:
    | "dashboard"
    | "profitability"
    | "crew"
    | "captains-deck"
    | "vibe-curation"
    | "cafe"
    | "sales"
    | "marketing"
    | "quest-management"
    | "node-management"
    | "city-management"
    | "agent-management"
    | "event-management"
    | "iot-hub"
    | "founders"
    | "users";
  onTabChange: (
    tab:
      | "dashboard"
      | "profitability"
      | "crew"
      | "captains-deck"
      | "vibe-curation"
      | "cafe"
      | "sales"
      | "marketing"
      | "quest-management"
      | "node-management"
      | "city-management"
      | "agent-management"
      | "event-management"
      | "iot-hub"
      | "founders"
      | "users"
  ) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  sidebarOpen,
  setSidebarOpen,
  selectedProperty,
  onPropertyChange,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Menu Button - Bottom Left */}
      <button
        className="lg:hidden fixed bottom-20 left-6 z-50 p-4 bg-[#9ae600] text-black rounded-full shadow-lg hover:bg-[#8bd500] transition-all"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        w-64 bg-[#09090b] border-r border-[#27272a] flex flex-col
        fixed lg:static inset-y-0 left-0 z-40
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#27272a]">
          <div className="flex items-center gap-2 text-[#9f9fa9] mb-4">
            <span className="text-[16px]">
              Zo House Console
            </span>
            <span className="text-xs">→</span>
          </div>

          {/* Quick Search */}
          <div className="flex items-center gap-2 text-[#d4d4d8] cursor-pointer hover:text-white">
            <Search className="w-4 h-4" />
            <span className="text-sm">Quick Search</span>
            <span className="ml-auto text-xs text-[#71717b] hidden sm:inline">
              ⌘ + K
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Admin Section */}
          <div className="mb-6">
            <div className="text-xs text-[#71717b] mb-2 px-2">Admin</div>
            <div className="space-y-1">
              <button
                onClick={() => onTabChange("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => onTabChange("city-management")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "city-management"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Building className="w-5 h-5 flex-shrink-0" />
                <span>City Management</span>
              </button>
              <button
                onClick={() => onTabChange("node-management")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "node-management"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                <span>Node Management</span>
              </button>
              <button
                onClick={() => onTabChange("quest-management")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "quest-management"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Target className="w-5 h-5 flex-shrink-0" />
                <span>Quest Management</span>
              </button>
              <button
                onClick={() => onTabChange("agent-management")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "agent-management"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Bot className="w-5 h-5 flex-shrink-0" />
                <span>Agent Management</span>
              </button>
              <button
                onClick={() => onTabChange("event-management")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "event-management"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span>Event Management</span>
              </button>
              <button
                onClick={() => onTabChange("iot-hub")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "iot-hub"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Wifi className="w-5 h-5 flex-shrink-0" />
                <span>IoT Hub</span>
              </button>
              <button
                onClick={() => onTabChange("founders")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "founders"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <Crown className="w-5 h-5 flex-shrink-0" />
                <span>Founders</span>
              </button>
              <button
                onClick={() => onTabChange("users")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeTab === "users"
                    ? "bg-[#9ae600] text-black"
                    : "text-white hover:bg-[#27272a]"
                }`}
              >
                <UserCircle className="w-5 h-5 flex-shrink-0" />
                <span>Users</span>
              </button>
            </div>
          </div>

          {/* Property Filter */}
          <div className="mb-4">
            <div className="relative">
              <select
                value={selectedProperty}
                onChange={(e) => onPropertyChange(e.target.value)}
                className="appearance-none w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded cursor-pointer hover:bg-[#27272a] text-sm text-white focus:outline-none focus:border-[#9ae600] pr-10"
              >
                <option value="blr-zo" className="bg-[#18181b]">BLRxZo</option>
                <option value="wtf-zo" className="bg-[#18181b]">WTFxZo</option>
                <option value="sfo-zo" className="bg-[#18181b]">SFOxZo</option>
                <option value="dxb-zo" className="bg-[#18181b]">DXBxZo</option>
                <option value="sgp-zo" className="bg-[#18181b]">SGPxZo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <NavItem
              icon={<Compass className="w-4 h-4" />}
              label="Captain's Deck"
              active={activeTab === "captains-deck" || activeTab === "profitability" || activeTab === "crew"}
              onClick={() => onTabChange("captains-deck")}
            />
            <NavItem
              icon={<Sparkles className="w-4 h-4" />}
              label="Vibe Curation"
              active={activeTab === "vibe-curation"}
              onClick={() => onTabChange("vibe-curation")}
            />
            <NavItem
              icon={<Coffee className="w-4 h-4" />}
              label="Cafe"
              active={activeTab === "cafe"}
              onClick={() => onTabChange("cafe")}
            />
            <NavItem
              icon={<TrendingUp className="w-4 h-4" />}
              label="Sales"
              active={activeTab === "sales"}
              onClick={() => onTabChange("sales")}
            />
            <NavItem
              icon={<Megaphone className="w-4 h-4" />}
              label="Marketing"
              active={activeTab === "marketing"}
              onClick={() => onTabChange("marketing")}
            />
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xs">SZ</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">samurai.zo</div>
              <div className="text-xs text-[#71717b]">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer ${
        active
          ? "bg-[#27272a] text-white"
          : "text-[#9f9fa9] hover:text-white hover:bg-[#18181b]"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
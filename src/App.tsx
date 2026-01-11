import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Profitability } from "./components/Profitability";
import { Crew } from "./components/Crew";
import { CaptainsDeck } from "./components/CaptainsDeck";
import { VibeCuration } from "./components/VibeCuration";
import { Cafe } from "./components/Cafe";
import { Sales } from "./components/Sales";
import { Marketing } from "./components/Marketing";
import { QuestManagement } from "./components/QuestManagement";
import { NodeManagement } from "./components/NodeManagement";
import { CityManagement } from "./components/CityManagement";
import { AgentManagement } from "./components/AgentManagement";
import { EventManagement } from "./components/EventManagement";
import { IoTHub } from "./components/IoTHub";
import { useAuth } from "./contexts/AuthContext";
import { Login } from "./components/auth/Login";

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<
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
  >("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("blr-zo");

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#9ae600]/30 border-t-[#9ae600] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {activeTab === "dashboard" && (
          <Dashboard
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "profitability" && (
          <Profitability
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "crew" && (
          <Crew
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "captains-deck" && (
          <CaptainsDeck
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "vibe-curation" && (
          <VibeCuration
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "cafe" && (
          <Cafe
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "sales" && (
          <Sales
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "marketing" && (
          <Marketing
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "quest-management" && (
          <QuestManagement
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "node-management" && (
          <NodeManagement
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "city-management" && (
          <CityManagement
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "agent-management" && (
          <AgentManagement
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "event-management" && (
          <EventManagement
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
        {activeTab === "iot-hub" && (
          <IoTHub
            selectedProperty={selectedProperty}
            onPropertyChange={setSelectedProperty}
          />
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AgentsPage } from './pages/AgentsPage';
import { WikiPage } from './pages/WikiPage';
import { AutomationPage } from './pages/AutomationPage';
import { SettingsPage } from './pages/SettingsPage';
import { CommandsPage } from './pages/CommandsPage';

export default function App() {
  return (
    <HashRouter>
      <div className="flex h-screen p-6 overflow-hidden" style={{ backgroundColor: '#0a0a1a' }}>
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

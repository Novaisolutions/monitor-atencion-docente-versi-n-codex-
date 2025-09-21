import { useMemo, useState } from 'react';
import { AppShell } from './app/layouts/app-shell';
import { DashboardView } from './app/views/dashboard/dashboard-view';
import { CrmView } from './app/views/crm/crm-view';
import { ChatView } from './app/views/chat/chat-view';
import { AssistantView } from './app/views/assistant/assistant-view';
import type { ModuleKey } from './app/config/navigation';

const modules: Record<ModuleKey, () => JSX.Element> = {
  dashboard: DashboardView,
  crm: CrmView,
  chat: ChatView,
  assistant: AssistantView,
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
  const CurrentModule = useMemo(() => modules[activeModule] ?? DashboardView, [activeModule]);

  return (
    <AppShell activeModule={activeModule} onModuleChange={setActiveModule}>
      <CurrentModule />
    </AppShell>
  );
}

import type { LucideIcon } from 'lucide-react';
import { BarChart3, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';

export type ModuleKey = 'dashboard' | 'crm' | 'chat' | 'assistant';

export type NavigationItem = {
  key: ModuleKey;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  {
    key: 'dashboard',
    label: 'Panel general',
    description: 'Salud operativa de toda la atención docente',
    icon: BarChart3,
  },
  {
    key: 'crm',
    label: 'CRM Docentes',
    description: 'Pipeline de casos académicos y canalizaciones',
    icon: GraduationCap,
  },
  {
    key: 'chat',
    label: 'Conversaciones',
    description: 'Seguimiento omnicanal y alertas de sentimiento',
    icon: MessageSquare,
  },
  {
    key: 'assistant',
    label: 'IA Esthela',
    description: 'Insights inteligentes y recomendaciones accionables',
    icon: Sparkles,
  },
];

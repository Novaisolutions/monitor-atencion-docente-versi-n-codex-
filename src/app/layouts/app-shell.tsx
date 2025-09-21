import type { ReactNode } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { navigationItems, type ModuleKey, type NavigationItem } from '../config/navigation';
import { cn, getGreeting } from '../../lib/utils';
import { Separator } from '../../components/ui/separator';

const today = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date());

type AppShellProps = {
  children: ReactNode;
  activeModule: ModuleKey;
  onModuleChange: (module: ModuleKey) => void;
};

export function AppShell({ children, activeModule, onModuleChange }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-6 py-8">
        <aside className="hidden w-72 flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.5)] backdrop-blur lg:flex">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-400">CENYCA</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Monitor Atención Docente</h1>
              <p className="mt-2 text-sm text-slate-400">Orquesta la experiencia docente con métricas en tiempo real.</p>
            </div>
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <NavigationButton
                  key={item.key}
                  item={item}
                  active={activeModule === item.key}
                  onClick={() => onModuleChange(item.key)}
                />
              ))}
            </nav>
          </div>
          <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/50 p-4">
            <div className="flex items-center gap-3">
              <Avatar name="Coordinación Académica" size="sm" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Hoy</p>
                <p className="text-sm font-medium text-white">{today}</p>
              </div>
            </div>
            <Separator className="bg-white/5" />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Productividad estimada</span>
              <Badge tone="info" className="text-[11px]">87%</Badge>
            </div>
            <Button className="w-full" variant="soft">
              Exportar resumen diario
            </Button>
          </div>
        </aside>
        <section className="flex flex-1 flex-col">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.55)] backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">{getGreeting()}, equipo académico</p>
                <h2 className="text-2xl font-semibold text-white">{getModuleLabel(activeModule)}</h2>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="info" className="hidden md:inline-flex">
                  Sincronizado hace 4 min
                </Badge>
                <Button variant="ghost" className="hidden md:inline-flex">
                  Descargar reporte
                </Button>
                <Button>
                  Registrar actualización
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full bg-white/5 px-3 py-1">Seguridad RLS activa</span>
              <span className="rounded-full bg-white/5 px-3 py-1">Integración WhatsApp Web</span>
              <span className="rounded-full bg-white/5 px-3 py-1">Esthela monitoreando 24/7</span>
            </div>
          </header>
          <main className="flex-1 pb-8">{children}</main>
        </section>
      </div>
    </div>
  );
}

type NavigationButtonProps = {
  item: NavigationItem;
  active: boolean;
  onClick: () => void;
};

function NavigationButton({ item, active, onClick }: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-4 rounded-2xl border border-transparent bg-white/5 px-4 py-4 text-left transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:shadow-[0_20px_45px_rgba(37,99,235,0.25)]',
        active &&
          'border-blue-500/40 bg-blue-500/10 shadow-[0_20px_45px_rgba(37,99,235,0.25)] text-white hover:text-white'
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/60 text-blue-300 transition-all group-hover:bg-blue-500/20 group-hover:text-blue-200">
        <item.icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{item.label}</p>
        <p className="text-xs text-slate-400">{item.description}</p>
      </div>
    </button>
  );
}

function getModuleLabel(module: ModuleKey) {
  const match = navigationItems.find((item) => item.key === module);
  return match ? match.label : 'Panel general';
}

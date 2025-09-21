import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { overviewMetrics, activityTimeline, engagementByPlantel } from '../../data/mock-data';
import { cn, formatNumber, formatPercentage } from '../../../lib/utils';

export function DashboardView() {
  return (
    <div className="space-y-6">
      <MetricGrid />
      <div className="grid gap-6 lg:grid-cols-3">
        <OperationalQualityCard className="lg:col-span-2" />
        <PlantelEngagementCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <ActivityTimelineCard className="lg:col-span-2" />
        <HighlightsCard />
      </div>
    </div>
  );
}

function MetricGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {overviewMetrics.map((metric) => (
        <Card key={metric.id} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          <CardHeader className="relative">
            <CardTitle>{metric.label}</CardTitle>
            <CardDescription>{metric.helper}</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-3xl font-semibold text-white">
              {formatNumber(metric.value)}
              {metric.unitLabel ? <span className="text-sm font-medium text-slate-400"> {metric.unitLabel}</span> : null}
            </p>
          </CardContent>
          <CardFooter className="relative">
            <MetricTrend change={metric.change} changeUnit={metric.changeUnit} positiveChangeIsGood={metric.positiveChangeIsGood} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

type MetricTrendProps = {
  change: number;
  changeUnit?: string;
  positiveChangeIsGood?: boolean;
};

function MetricTrend({ change, changeUnit, positiveChangeIsGood = true }: MetricTrendProps) {
  const isPositiveChange = change >= 0;
  const isImprovement = positiveChangeIsGood ? isPositiveChange : !isPositiveChange;
  const TrendIcon = isImprovement ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="flex items-center gap-2">
      <TrendIcon className={cn('h-4 w-4', isImprovement ? 'text-emerald-400' : 'text-rose-400')} />
      <span className={cn('font-medium', isImprovement ? 'text-emerald-300' : 'text-rose-300')}>
        {isPositiveChange && change > 0 ? '+' : ''}
        {change}
        {changeUnit ? ` ${changeUnit}` : ''}
      </span>
      <span className="text-xs text-slate-400">vs. semana previa</span>
    </div>
  );
}

type OperationalQualityCardProps = {
  className?: string;
};

function OperationalQualityCard({ className }: OperationalQualityCardProps) {
  return (
    <Card className={cn('border-white/5', className)}>
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-300" />
          <CardTitle>Calidad operativa semanal</CardTitle>
        </div>
        <CardDescription>
          Balance entre satisfacción docente, oportunidad de respuesta y cumplimiento de protocolos Esthela.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <ProgressItem label="Satisfacción docente" value={92} helper="Objetivo 90%" />
          <ProgressItem label="Compromisos cumplidos" value={88} helper="vs. semana anterior" tone="emerald" />
          <ProgressItem label="Alertas resueltas" value={74} helper="en menos de 48h" tone="blue" />
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h4 className="text-sm font-semibold text-white">Observaciones destacadas</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-400" />
              8 casos críticos resueltos con acompañamiento coordinado (Coyoacán y Satélite).
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-400" />
              Tiempo de espera promedio mejoró 6 minutos gracias a plantillas inteligentes.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-400" />
              Esthela detectó 3 casos sensibles y escaló automáticamente a coordinación.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

type ProgressItemProps = {
  label: string;
  value: number;
  helper: string;
  tone?: 'emerald' | 'blue';
};

function ProgressItem({ label, value, helper, tone = 'emerald' }: ProgressItemProps) {
  const toneClass = tone === 'emerald' ? 'from-emerald-500/60 to-emerald-400/40' : 'from-blue-500/60 to-blue-400/40';

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5">
        <div className={cn('h-full rounded-full bg-gradient-to-r', toneClass)} style={{ width: `${value}%` }} />
      </div>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

function PlantelEngagementCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compromiso por plantel</CardTitle>
        <CardDescription>Comparativa de interacción, satisfacción y escalaciones activas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {engagementByPlantel.map((metric) => (
          <div key={metric.plantel} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{metric.plantel}</p>
                <p className="text-xs text-slate-400">{formatPercentage(metric.engagement / 100)} de interacción</p>
              </div>
              <Badge tone={metric.escalationRate <= 7 ? 'success' : 'warning'}>
                {metric.escalationRate <= 7 ? 'Estable' : 'Atención'}
              </Badge>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-400">
              <ProgressInline label="Satisfacción" value={metric.satisfaction} tone="emerald" />
              <ProgressInline label="Engagement" value={metric.engagement} tone="blue" />
              <ProgressInline label="Escalaciones" value={metric.escalationRate} tone="amber" max={20} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

type ProgressInlineProps = {
  label: string;
  value: number;
  tone?: 'emerald' | 'blue' | 'amber';
  max?: number;
};

function ProgressInline({ label, value, tone = 'emerald', max = 100 }: ProgressInlineProps) {
  const toneClass = {
    emerald: 'bg-emerald-400/70',
    blue: 'bg-blue-400/70',
    amber: 'bg-amber-400/70',
  }[tone];

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="font-medium text-white">{formatPercentage(value / max)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5">
        <div className={cn('h-full rounded-full', toneClass)} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

type ActivityTimelineCardProps = {
  className?: string;
};

function ActivityTimelineCard({ className }: ActivityTimelineCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
        <CardDescription>Últimos movimientos registrados en CRM docentes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {activityTimeline.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="relative flex h-full w-12 flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/60">
                <Clock3 className="h-4 w-4 text-blue-300" />
              </div>
              <div className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-blue-500/40 via-white/5 to-transparent" />
            </div>
            <div className="flex-1 rounded-2xl border border-white/5 bg-slate-900/50 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-white">{activity.title}</p>
                <span className="text-xs text-slate-400">{activity.timestamp}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{activity.coordinator}</p>
              <p className="mt-2 text-sm text-slate-300">{activity.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function HighlightsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores clave</CardTitle>
        <CardDescription>Resumen automático proporcionado por Esthela.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        <HighlightItem
          icon={<TrendingUp className="h-4 w-4 text-emerald-300" />}
          title="Tiempo de respuesta optimizado"
          description="Coordinación redujo los tiempos promedio a 18 minutos manteniendo satisfacción del 92%."
        />
        <HighlightItem
          icon={<Sparkles className="h-4 w-4 text-blue-300" />}
          title="Esthela automatizó 42% de respuestas iniciales"
          description="Se liberaron 18 horas operativas que se reorientaron a casos estratégicos."
        />
        <HighlightItem
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-300" />}
          title="Protocolos cumplidos"
          description="El 95% de las canalizaciones siguió el flujo de calidad de CENYCA sin incidencias."
        />
      </CardContent>
    </Card>
  );
}

type HighlightItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function HighlightItem({ icon, title, description }: HighlightItemProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/60">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

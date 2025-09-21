import { BrainCircuit, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { assistantAlerts, assistantHighlights, assistantRecommendations } from '../../data/mock-data';

export function AssistantView() {
  return (
    <div className="space-y-6">
      <Card className="border-white/5">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-300" />
              <CardTitle>Esthela · Asistente IA</CardTitle>
            </div>
            <CardDescription>
              Inteligencia educativa que analiza sentimiento, prioriza riesgos y propone acciones accionables en segundos.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="success">IA activa 24/7</Badge>
            <Badge tone="info">Última actualización hace 3 min</Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Protocolos de seguridad RLS aplicados
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <BrainCircuit className="h-3.5 w-3.5" /> Modelos entrenados en cultura CENYCA
          </span>
        </CardFooter>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Insights estratégicos</CardTitle>
            <CardDescription>Aprendizajes priorizados para coordinar la experiencia docente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assistantHighlights.map((insight) => (
              <div key={insight.id} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{insight.title}</p>
                    <p className="text-xs text-slate-400">Impacto {insight.impact.toUpperCase()}</p>
                  </div>
                  <Badge tone={insight.impact === 'alto' ? 'warning' : 'info'}>
                    Prioridad {insight.impact === 'alto' ? 'alta' : 'media'}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-slate-300">{insight.description}</p>
                <p className="mt-2 text-xs text-blue-200">Recomendación: {insight.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertas críticas</CardTitle>
              <CardDescription>Acciones que requieren seguimiento inmediato.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {assistantAlerts.map((alert, index) => (
                <div key={alert} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3">
                  <Target className="mt-1 h-4 w-4 text-amber-300" />
                  <div>
                    <p className="font-medium text-white">Alerta #{index + 1}</p>
                    <p className="text-xs text-slate-400">{alert}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="soft">
                Ver tablero de riesgos
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Acciones sugeridas</CardTitle>
              <CardDescription>Automatizaciones recomendadas para elevar la experiencia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {assistantRecommendations.map((recommendation) => (
                <div key={recommendation} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3">
                  <Zap className="mt-1 h-4 w-4 text-blue-300" />
                  <p className="text-xs text-slate-400">{recommendation}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Implementar automatización
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

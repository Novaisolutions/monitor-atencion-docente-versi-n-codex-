import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardList, GraduationCap, Users } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Avatar } from '../../../components/ui/avatar';
import { pipeline } from '../../data/mock-data';
import { formatNumber, getUrgencyLevel } from '../../../lib/utils';

type PriorityTone = 'success' | 'warning' | 'info';

const priorityToneMap: Record<'alta' | 'media' | 'baja', PriorityTone> = {
  alta: 'warning',
  media: 'info',
  baja: 'success',
};

export function CrmView() {
  const totalCases = pipeline.reduce((acc, stage) => acc + stage.cases.length, 0);
  const highPriority = pipeline
    .flatMap((stage) => stage.cases)
    .filter((item) => item.prioridad === 'alta').length;

  return (
    <div className="space-y-6">
      <Card className="border-white/5">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-300" />
              <CardTitle>Embudo de atención docente</CardTitle>
            </div>
            <CardDescription>
              Control centralizado de consultas, incidencias y acompañamientos con trazabilidad completa.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="info">{formatNumber(totalCases)} casos en seguimiento</Badge>
            <Badge tone={highPriority > 0 ? 'warning' : 'success'}>
              {highPriority} prioridad alta
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <ClipboardList className="h-3.5 w-3.5" /> Protocolos CENYCA activos
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <Users className="h-3.5 w-3.5" /> Coordinación supervisando {pipeline.length} etapas
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> SLA cumplido en 91%
          </span>
        </CardFooter>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {pipeline.map((stage) => (
          <Card key={stage.id} className="flex flex-col border-white/5">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>{stage.title}</CardTitle>
                  <CardDescription>{stage.description}</CardDescription>
                </div>
                <Badge tone="info">{stage.cases.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              {stage.cases.map((caseItem) => (
                <div key={caseItem.id} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{caseItem.docente}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{caseItem.id}</p>
                    </div>
                    <Badge tone={priorityToneMap[caseItem.prioridad]}>{caseItem.prioridad}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full bg-white/5 px-3 py-1">{caseItem.plantel}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{caseItem.categoria}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{caseItem.updatedAt}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <Avatar name={caseItem.responsable} size="sm" />
                      <div>
                        <p className="font-medium text-white">{caseItem.responsable}</p>
                        <p>{getUrgencyLevel(caseItem.categoria)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="gap-1 px-2 text-xs">
                      Ver detalle
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {stage.cases.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">
                  <AlertTriangle className="mb-2 h-5 w-5 text-slate-500" />
                  <p>Sin casos registrados en esta etapa.</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

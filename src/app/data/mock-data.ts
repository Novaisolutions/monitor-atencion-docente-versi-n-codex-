import { formatDisplayName, formatPercentage, timeAgo } from '../../lib/utils';

export type OverviewMetric = {
  id: string;
  label: string;
  value: number;
  unitLabel?: string;
  helper: string;
  change: number;
  changeUnit?: string;
  positiveChangeIsGood?: boolean;
};

export const overviewMetrics: OverviewMetric[] = [
  {
    id: 'activeCases',
    label: 'Casos activos',
    value: 48,
    unitLabel: 'casos',
    helper: 'coordinación en seguimiento',
    change: -12,
    changeUnit: '%',
  },
  {
    id: 'satisfaction',
    label: 'Satisfacción docente',
    value: 92,
    unitLabel: '%',
    helper: 'promedio últimos 30 días',
    change: 4.5,
    changeUnit: 'pts',
  },
  {
    id: 'firstResponse',
    label: 'Tiempo de primera respuesta',
    value: 18,
    unitLabel: 'min',
    helper: 'objetivo 25 min',
    change: -6,
    changeUnit: 'min',
    positiveChangeIsGood: false,
  },
  {
    id: 'conversion',
    label: 'Canalizaciones resueltas',
    value: 31,
    unitLabel: 'casos',
    helper: 'última semana',
    change: 9,
    changeUnit: 'casos',
  },
];

export type ActivityEvent = {
  id: string;
  type: 'seguimiento' | 'canalización' | 'alerta' | 'reconocimiento';
  title: string;
  coordinator: string;
  timestamp: string;
  detail: string;
};

export const activityTimeline: ActivityEvent[] = [
  {
    id: 'activity-1',
    type: 'seguimiento',
    title: 'Seguimiento completado',
    coordinator: 'María López',
    timestamp: timeAgo(new Date(Date.now() - 1000 * 60 * 35)),
    detail: 'Caso #458 (Bachillerato Coyoacán) actualizado con nuevo plan de acción',
  },
  {
    id: 'activity-2',
    type: 'canalización',
    title: 'Canalización aceptada',
    coordinator: 'Luis Hernández',
    timestamp: timeAgo(new Date(Date.now() - 1000 * 60 * 52)),
    detail: 'Coordinación académica aprobó la estrategia para Docente #332',
  },
  {
    id: 'activity-3',
    type: 'alerta',
    title: 'Alerta de inasistencias',
    coordinator: 'Sistema automático',
    timestamp: timeAgo(new Date(Date.now() - 1000 * 60 * 75)),
    detail: 'Docente Ana García acumula 3 incidencias sin seguimiento en 48h',
  },
  {
    id: 'activity-4',
    type: 'reconocimiento',
    title: 'Reconocimiento Esthela',
    coordinator: 'IA Esthela',
    timestamp: timeAgo(new Date(Date.now() - 1000 * 60 * 120)),
    detail: 'Interacción destacada con satisfacción del 98% (Plantel Satélite)',
  },
];

export type EngagementMetric = {
  plantel: string;
  engagement: number;
  satisfaction: number;
  escalationRate: number;
};

export const engagementByPlantel: EngagementMetric[] = [
  {
    plantel: 'Coyoacán',
    engagement: 87,
    satisfaction: 94,
    escalationRate: 6,
  },
  {
    plantel: 'Satélite',
    engagement: 82,
    satisfaction: 92,
    escalationRate: 8,
  },
  {
    plantel: 'Querétaro',
    engagement: 76,
    satisfaction: 89,
    escalationRate: 11,
  },
];

export type PipelineCase = {
  id: string;
  docente: string;
  plantel: string;
  categoria: 'consulta' | 'incidencia' | 'seguimiento';
  prioridad: 'alta' | 'media' | 'baja';
  updatedAt: string;
  responsable: string;
};

export type PipelineStage = {
  id: string;
  title: string;
  description: string;
  cases: PipelineCase[];
};

export const pipeline: PipelineStage[] = [
  {
    id: 'nuevo',
    title: 'Nuevas consultas',
    description: 'Casos con menos de 2 horas de haber ingresado',
    cases: [
      {
        id: 'CRM-482',
        docente: formatDisplayName('gonzalez, paola'),
        plantel: 'Satélite',
        categoria: 'consulta',
        prioridad: 'media',
        updatedAt: 'hace 25 min',
        responsable: 'Luis Hernández',
      },
      {
        id: 'CRM-479',
        docente: formatDisplayName('escamilla, roberto'),
        plantel: 'Coyoacán',
        categoria: 'incidencia',
        prioridad: 'alta',
        updatedAt: 'hace 14 min',
        responsable: 'María López',
      },
    ],
  },
  {
    id: 'en-progreso',
    title: 'En acompañamiento',
    description: 'Seguimiento activo con coordinadores y Esthela',
    cases: [
      {
        id: 'CRM-465',
        docente: formatDisplayName('méndez, sofía'),
        plantel: 'Querétaro',
        categoria: 'seguimiento',
        prioridad: 'media',
        updatedAt: 'hace 3 h',
        responsable: 'Carlos Ruiz',
      },
      {
        id: 'CRM-453',
        docente: formatDisplayName('ramírez, laura'),
        plantel: 'Satélite',
        categoria: 'consulta',
        prioridad: 'baja',
        updatedAt: 'hace 1 h',
        responsable: 'IA Esthela',
      },
    ],
  },
  {
    id: 'resueltas',
    title: 'Resueltas',
    description: 'Casos con cierre registrado y satisfacción evaluada',
    cases: [
      {
        id: 'CRM-441',
        docente: formatDisplayName('franco, hilda'),
        plantel: 'Coyoacán',
        categoria: 'incidencia',
        prioridad: 'alta',
        updatedAt: 'hace 6 h',
        responsable: 'Luis Hernández',
      },
      {
        id: 'CRM-437',
        docente: formatDisplayName('ortega, miguel'),
        plantel: 'Satélite',
        categoria: 'consulta',
        prioridad: 'media',
        updatedAt: 'hace 9 h',
        responsable: 'María López',
      },
    ],
  },
];

export type ChatMessage = {
  id: string;
  sender: 'docente' | 'coordinador' | 'asistente';
  name: string;
  timestamp: string;
  body: string;
  channel: 'whatsapp' | 'llamada' | 'correo';
};

export type ChatThread = {
  id: string;
  docente: string;
  plantel: string;
  mood: 'positivo' | 'neutral' | 'en riesgo';
  unread: number;
  lastInteraction: string;
  tags: string[];
  messages: ChatMessage[];
};

export const chatThreads: ChatThread[] = [
  {
    id: 'chat-1',
    docente: formatDisplayName('garcía, ana'),
    plantel: 'Coyoacán',
    mood: 'positivo',
    unread: 0,
    lastInteraction: 'hace 5 min',
    tags: ['seguimiento', 'whatsapp'],
    messages: [
      {
        id: 'msg-1',
        sender: 'docente',
        name: formatDisplayName('garcía, ana'),
        timestamp: '09:40',
        channel: 'whatsapp',
        body: '¡Gracias por el seguimiento! Ya quedó resuelto el reporte de plataforma.',
      },
      {
        id: 'msg-2',
        sender: 'coordinador',
        name: 'María López',
        timestamp: '09:42',
        channel: 'whatsapp',
        body: 'Excelente, quedo atenta si necesitas alguna otra cosa, Ana.',
      },
    ],
  },
  {
    id: 'chat-2',
    docente: formatDisplayName('camacho, fernando'),
    plantel: 'Satélite',
    mood: 'neutral',
    unread: 2,
    lastInteraction: 'hace 18 min',
    tags: ['incidencia', 'prioridad'],
    messages: [
      {
        id: 'msg-3',
        sender: 'docente',
        name: formatDisplayName('camacho, fernando'),
        timestamp: '08:55',
        channel: 'whatsapp',
        body: 'Aún no puedo acceder al aula virtual del grupo 3C, ¿pueden apoyarme?',
      },
      {
        id: 'msg-4',
        sender: 'coordinador',
        name: 'Luis Hernández',
        timestamp: '09:10',
        channel: 'whatsapp',
        body: 'Estamos revisando con sistemas, te actualizo en breve. ¿Algo más urgente?',
      },
      {
        id: 'msg-5',
        sender: 'docente',
        name: formatDisplayName('camacho, fernando'),
        timestamp: '09:22',
        channel: 'whatsapp',
        body: 'Solo esa incidencia, gracias.',
      },
    ],
  },
  {
    id: 'chat-3',
    docente: formatDisplayName('romero, lucía'),
    plantel: 'Querétaro',
    mood: 'en riesgo',
    unread: 3,
    lastInteraction: 'hace 40 min',
    tags: ['alerta', 'inasistencias'],
    messages: [
      {
        id: 'msg-6',
        sender: 'asistente',
        name: 'Esthela',
        timestamp: '08:20',
        channel: 'correo',
        body: 'Detectamos 3 inasistencias consecutivas. Sugerimos contactar al docente para validar situación.',
      },
      {
        id: 'msg-7',
        sender: 'coordinador',
        name: 'Carlos Ruiz',
        timestamp: '08:32',
        channel: 'llamada',
        body: 'Realicé llamada de seguimiento. Pendiente de respuesta, se acordó nueva sesión mañana.',
      },
    ],
  },
];

export type AssistantInsight = {
  id: string;
  title: string;
  description: string;
  impact: 'alto' | 'medio' | 'bajo';
  action: string;
};

export const assistantHighlights: AssistantInsight[] = [
  {
    id: 'insight-1',
    title: 'Incremento de satisfacción',
    description: 'Las respuestas priorizadas redujeron los tiempos de espera un 18% esta semana.',
    impact: 'alto',
    action: 'Mantener protocolo de respuesta rápida para planteles Coyoacán y Satélite.',
  },
  {
    id: 'insight-2',
    title: 'Casos con riesgo emocional',
    description: '3 docentes manifestaron señales de desmotivación. Esthela generó guías de acompañamiento.',
    impact: 'alto',
    action: 'Asignar seguimiento personalizado con coordinación académica.',
  },
  {
    id: 'insight-3',
    title: 'Optimización de canalizaciones',
    description: 'El 74% de los casos canalizados se resolvieron en menos de 48h.',
    impact: 'medio',
    action: 'Replicar protocolo en planteles Querétaro y en línea.',
  },
];

export const assistantAlerts = [
  'Docente Lucía Romero requiere seguimiento adicional por ausencias consecutivas.',
  'Coordinación Satélite solicita refuerzo en capacitación de plataforma Moodle.',
  'Se detectaron 2 casos con sentimiento negativo en últimas 24h.',
];

export const assistantRecommendations = [
  'Programar recordatorio automático para casos con más de 24h sin actualización.',
  'Enviar resumen semanal a dirección académica con métricas de satisfacción.',
  `Crear cápsula de video microlearning para dudas frecuentes (aprovecha ${formatPercentage(0.63)} de efectividad).`,
];

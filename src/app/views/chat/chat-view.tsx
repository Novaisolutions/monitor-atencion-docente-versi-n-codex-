import { useMemo, useState } from 'react';
import { MessageCircle, PhoneCall, Send, Sparkles, Tag } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Avatar } from '../../../components/ui/avatar';
import { chatThreads } from '../../data/mock-data';
import { cn, truncateText } from '../../../lib/utils';

const moodTone: Record<'positivo' | 'neutral' | 'en riesgo', { tone: 'success' | 'info' | 'warning'; label: string }> = {
  positivo: { tone: 'success', label: 'Satisfacción alta' },
  neutral: { tone: 'info', label: 'Seguimiento normal' },
  'en riesgo': { tone: 'warning', label: 'Atención prioritaria' },
};

export function ChatView() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0]?.id ?? '');
  const activeThread = useMemo(() => chatThreads.find((thread) => thread.id === activeThreadId) ?? chatThreads[0], [activeThreadId]);

  return (
    <div className="space-y-6">
      <Card className="border-white/5">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-300" />
              <CardTitle>Conversaciones docentes</CardTitle>
            </div>
            <CardDescription>
              Historial omnicanal con sincronización en tiempo real y análisis de sentimiento por Esthela.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="info">{chatThreads.length} conversaciones activas</Badge>
            <Badge tone="warning">{chatThreads.filter((thread) => thread.mood === 'en riesgo').length} con alerta</Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" /> Esthela sugiriendo respuestas contextuales
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <PhoneCall className="h-3.5 w-3.5" /> Registro de llamadas integrado
          </span>
        </CardFooter>
      </Card>

      <Card className="border-white/5">
        <CardContent className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-3">
            {chatThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThreadId(thread.id)}
                className={cn(
                  'w-full rounded-2xl border border-transparent bg-white/5 p-4 text-left transition-all hover:border-blue-500/40 hover:bg-blue-500/10',
                  activeThread?.id === thread.id && 'border-blue-500/50 bg-blue-500/10 shadow-[0_20px_45px_rgba(37,99,235,0.25)]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{thread.docente}</p>
                    <p className="text-xs text-slate-400">{thread.plantel}</p>
                  </div>
                  <Badge tone={moodTone[thread.mood].tone}>{moodTone[thread.mood].label}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  {thread.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                      <Tag className="h-3.5 w-3.5" /> {tag}
                    </span>
                  ))}
                  {thread.unread > 0 ? <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-200">{thread.unread} nuevos</span> : null}
                  <span>{thread.lastInteraction}</span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  {truncateText(thread.messages[thread.messages.length - 1]?.body ?? '', 120)}
                </p>
              </button>
            ))}
          </div>

          {activeThread ? <Conversation thread={activeThread} /> : null}
        </CardContent>
      </Card>
    </div>
  );
}

type ConversationProps = {
  thread: (typeof chatThreads)[number];
};

function Conversation({ thread }: ConversationProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={thread.docente} />
          <div>
            <p className="text-sm font-semibold text-white">{thread.docente}</p>
            <p className="text-xs text-slate-400">{thread.plantel} · Último contacto {thread.lastInteraction}</p>
          </div>
        </div>
        <Badge tone={moodTone[thread.mood].tone}>{moodTone[thread.mood].label}</Badge>
      </div>
      <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-white/5 bg-slate-950/40 p-4">
        {thread.messages.map((message) => (
          <div
            key={message.id}
            className={cn('flex flex-col gap-1 rounded-2xl border border-white/5 px-4 py-3 text-sm shadow-lg',
              message.sender === 'docente' ? 'self-start bg-slate-900/80 text-slate-200' : 'self-end bg-blue-500/20 text-blue-100'
            )}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-white">{message.name}</span>
              <span>{message.timestamp}</span>
            </div>
            <p>{message.body}</p>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Canal: {message.channel}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <p className="mb-2 text-xs text-slate-400">Responder como coordinación</p>
        <div className="flex items-center gap-3">
          <textarea
            className="min-h-[60px] flex-1 resize-none rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
            placeholder="Escribe una respuesta profesional..."
          />
          <Button className="gap-2 px-4">
            Enviar
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

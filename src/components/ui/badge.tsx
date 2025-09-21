import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type BadgeTone = 'info' | 'success' | 'warning' | 'neutral';

const toneClasses: Record<BadgeTone, string> = {
  info: 'bg-blue-500/15 text-blue-200 border border-blue-500/30',
  success: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-200 border border-amber-500/30',
  neutral: 'bg-white/5 text-slate-300 border border-white/10',
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide', toneClasses[tone], className)}
      {...props}
    />
  );
}

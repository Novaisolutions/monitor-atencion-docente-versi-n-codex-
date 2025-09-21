import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  muted?: boolean;
};

export function Card({ className, muted, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.35)] backdrop-blur',
        muted && 'bg-slate-900/40',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex items-start justify-between gap-3', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold tracking-tight text-slate-100', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-slate-400', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 flex items-center justify-between gap-3 text-sm text-slate-400', className)} {...props} />;
}

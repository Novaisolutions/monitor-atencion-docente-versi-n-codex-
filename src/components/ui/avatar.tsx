import type { HTMLAttributes } from 'react';
import { getInitials } from '../../lib/utils';
import { cn } from '../../lib/utils';

type Status = 'online' | 'offline' | 'pending';

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  status?: Status;
  size?: 'sm' | 'md';
};

const statusClasses: Record<Status, string> = {
  online: 'bg-emerald-400',
  offline: 'bg-rose-500',
  pending: 'bg-amber-400',
};

const sizeClasses = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-12 w-12 text-base',
};

export function Avatar({ name, status = 'online', size = 'md', className, ...props }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex items-center justify-center rounded-full bg-slate-800 font-medium text-slate-100', sizeClasses[size], className)} {...props}>
      {getInitials(name)}
      <span className={cn('absolute -bottom-1 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-slate-950', statusClasses[status])} />
    </div>
  );
}

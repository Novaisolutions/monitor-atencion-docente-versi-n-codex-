import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type SeparatorProps = HTMLAttributes<HTMLDivElement>;

export function Separator({ className, ...props }: SeparatorProps) {
  return <div className={cn('h-px w-full bg-white/10', className)} {...props} />;
}

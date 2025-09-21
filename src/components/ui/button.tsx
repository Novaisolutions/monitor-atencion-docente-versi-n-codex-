import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'soft';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-500/90 hover:bg-blue-500 text-white shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.45)]',
  ghost:
    'bg-transparent text-slate-200 hover:text-white hover:bg-white/5 border border-white/10 shadow-none',
  soft: 'bg-slate-800/70 text-slate-100 hover:bg-slate-800 border border-white/5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: boolean;
  href?: string; // when set, renders a real <a href> instead of a <button> — for internal page navigation, so the link is crawlable
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon = false,
  className = '',
  href,
  onClick,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 group overflow-hidden tracking-wide";

  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 border border-transparent",
    outline: "bg-transparent text-white border border-zinc-800 hover:border-zinc-500",
    ghost: "bg-transparent text-zinc-400 hover:text-white"
  };

  const content = (
    <>
      {/* Button Shine Effect (Vercel Style) for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}

      <span className="relative z-20 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if (href) {
    // onClick here is the SPA navigate call (same convention as NavLink's onNavigate) —
    // intercept a plain left-click to keep the smooth client-side transition, but let
    // modifier-clicks (new tab, etc.) fall through to the real href untouched.
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      (onClick as unknown as (() => void) | undefined)?.();
    };
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
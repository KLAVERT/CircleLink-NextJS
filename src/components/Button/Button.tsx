'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'blue' | 'error' | 'outline' | 'white';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ariaLabel,
  href,
  target,
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] border border-[var(--color-border)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-tertiary)]',
    ghost: 'bg-transparent hover:bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
    success: 'bg-[var(--color-success)] hover:bg-[var(--color-success)] text-white',
    blue: 'bg-[var(--color-quinary)] hover:bg-[var(--color-senary)] text-white',
    error: 'bg-[var(--color-error)] hover:bg-[var(--color-error)] text-white',
    outline: 'bg-transparent border border-[var(--color-quinary)] text-[var(--color-text-primary)] hover:bg-[var(--color-quinary)]/10',
    white: 'bg-white text-[var(--color-accent-cool)] hover:bg-[var(--color-bg-surface)]'
  };

  const commonProps = {
    disabled,
    'aria-label': ariaLabel,
    className: `
      ${baseStyles}
      ${variants[variant]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `,
  };

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      {...commonProps}
    >
      {children}
    </button>
  );
} 
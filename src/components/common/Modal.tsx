import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
}

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-[95vw] h-[92vh]',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full ${maxWidthClass} max-h-[90vh] flex flex-col rounded-2xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-salud-dark-surface dark:bg-salud-dark-surface light:bg-salud-light-surface shadow-2xl overflow-hidden z-10`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-salud-dark-border/60 dark:border-salud-dark-border/60 light:border-salud-light-border/60 bg-salud-dark-card/40 dark:bg-salud-dark-card/40 light:bg-salud-light-card/40">
          <div>
            <h3 id="modal-title" className="text-lg font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text flex items-center gap-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-salud-dark-muted dark:text-salud-dark-muted light:text-salud-light-muted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-salud-dark-muted hover:text-salud-dark-text dark:text-salud-dark-muted dark:hover:text-salud-dark-text light:text-salud-light-muted light:hover:text-salud-light-text hover:bg-slate-800/50 transition-colors"
            aria-label="關閉視窗"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

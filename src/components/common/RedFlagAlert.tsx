import React from 'react';
import { AlertOctagon, PhoneCall, ShieldAlert, X } from 'lucide-react';

interface Props {
  title?: string;
  messages: string[];
  isEmergency?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const RedFlagAlert: React.FC<Props> = ({
  title = 'Red Flag 醫療安全警戒 (STOP NORMAL FLOW)',
  messages,
  isEmergency = true,
  onDismiss,
  className = '',
}) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-xl border border-red-500/60 bg-gradient-to-br from-red-950/80 via-red-900/40 to-black/60 p-4 sm:p-5 shadow-crimson-glow text-white ${className}`}
    >
      {/* Ambient background beam */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 shrink-0 mt-0.5">
          {isEmergency ? <AlertOctagon className="w-5 h-5 animate-pulse" /> : <ShieldAlert className="w-5 h-5" />}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-red-200 tracking-wide flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/30 text-red-200 font-mono uppercase tracking-wider">
                Medical Alert
              </span>
            </h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-red-400 hover:text-white p-1 rounded transition-colors"
                aria-label="關閉警訊"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-red-200/90 font-medium leading-relaxed">
            系統偵測到可能需要緊急或專科醫療評估之臨床訊號。健康平台的模擬與建議在此情境下<strong className="underline decoration-red-400 font-semibold">完全不適用</strong>：
          </p>

          <ul className="space-y-1.5 pl-1">
            {messages.map((msg, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-red-100 font-sans">
                <span className="text-red-400 font-bold mt-0.5">▪</span>
                <span>{msg}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-red-300">
            <span className="flex items-center gap-1 font-semibold text-white bg-red-600/50 px-2.5 py-1 rounded-md border border-red-400/40">
              <PhoneCall className="w-3.5 h-3.5" /> 緊急醫療救助：請立即撥打 119 或至急診室就醫
            </span>
            <span className="text-red-300/80">
              醫療免責：Salud 僅供健康教育，不可作為個人臨床診斷或急救處方。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

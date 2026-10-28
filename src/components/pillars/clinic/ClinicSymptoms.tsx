import React from 'react';
import { AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import { findCondition, getDepartment } from '../../../data/clinical';
import { SYMPTOMS } from '../../../data/clinical/symptoms';
import { Card } from './clinicUi';

/**
 * 「我該掛哪一科？」: pick a symptom → red flags first → first stop → pattern-based routes.
 * Hash: clinic/by/symptom[/<symptomId>]
 */
export const SymptomNavigator: React.FC<{ symptomId?: string; go: (h: string) => void }> = ({ symptomId, go }) => {
  const active = SYMPTOMS.find((s) => s.id === symptomId);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        台灣可以直接掛專科，但掛錯科常常要多跑一趟。選一個最困擾你的症狀：先看<b className="text-red-600">紅色警訊</b>（有任何一項就直接急診或 119），沒有的話再依你的情況找對應科別與照護路徑。
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2" role="list">
        {SYMPTOMS.map((s) => (
          <button
            key={s.id}
            role="listitem"
            aria-current={s.id === symptomId}
            onClick={() => go(`clinic/by/symptom/${s.id}`)}
            className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
              s.id === symptomId
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface text-slate-700 dark:text-slate-300 hover:border-emerald-400'
            }`}
          >
            <span aria-hidden="true">{s.emoji}</span> {s.name_zh}
          </button>
        ))}
      </div>

      {active ? (
        <div className="space-y-3" id="symptom-detail">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/70 dark:bg-red-950/20">
            <h2 className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" /> {active.name_zh}：有以下任何一項，立即急診或撥 119
            </h2>
            <ul className="mt-2 space-y-1.5">
              {active.emergency_zh.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-red-900 dark:text-red-200">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1 text-xs text-red-800 dark:text-red-300">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> 119 救護 · 1925 安心專線 · 1966 長照專線 · 毒藥物諮詢 02-2875-7525（臺北榮總）
            </p>
          </Card>
          <Card>
            <h2 className="font-bold text-slate-900 dark:text-white">🚪 沒有紅色警訊，第一站</h2>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{active.first_zh}</p>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">🔎 依你的情況，最可能的科別</h3>
            <ul className="mt-2 space-y-2">
              {active.routes.map((r) => {
                const dept = getDepartment(r.dept);
                const cond = r.cond ? findCondition(r.cond)?.cond : undefined;
                if (!dept) return null;
                return (
                  <li key={r.when_zh}>
                    <button
                      onClick={() => go(cond ? `clinic/${dept.id}/${cond.id}` : `clinic/${dept.id}`)}
                      className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2.5 hover:border-emerald-400 flex gap-3 items-center"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-slate-800 dark:text-slate-200">「{r.when_zh}」</span>
                        <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="rounded-full bg-emerald-600 text-white px-2 py-0.5 font-semibold">{dept.name_zh}</span>
                          {cond && <span className="text-emerald-800 dark:text-emerald-300">→ {cond.name_zh}</span>}
                        </span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      ) : (
        <Card className="text-sm text-slate-500">👆 先選一個症狀。這裡不是診斷工具；它幫你判斷「要不要急」與「先掛哪一科」。</Card>
      )}
    </div>
  );
};

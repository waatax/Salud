import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Activity, ArrowRight, Sparkles, Check } from 'lucide-react';
import { MOBILITY_SCREEN_TESTS } from '../../data/mobilityData';

export const SimMobilityScreen: React.FC = () => {
  const { language } = useLanguage();

  // Test status: pass (true) or restricted (false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({
    ANKLE_DORSIFLEXION: true,
    THOMAS_HIP_TEST: false,
    THORACIC_ROTATION: true,
    OVERHEAD_WALL_SLIDE: false,
  });

  const toggleTest = (id: string) => {
    setTestResults((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const passCount = Object.values(testResults).filter(Boolean).length;
  const totalCount = MOBILITY_SCREEN_TESTS.length;
  const scorePct = Math.round((passCount / totalCount) * 100);

  const getMobilityGrade = (score: number) => {
    if (score === 100) return { labelZh: '卓越活動度 (Kinetic Freedom)', labelEn: 'Optimal Mobility & Joint Freedom', color: 'text-emerald-400', riskZh: '動力鏈關節活動度完整，各關節代償機率極低。', riskEn: 'Full kinetic chain mobility; minimal compensation risk.' };
    if (score >= 75) return { labelZh: '良好偏輕度受限 (Mild Limitation)', labelEn: 'Mild Joint Restrictions', color: 'text-cyan-400', riskZh: '部分單一關節存在活動度短缺，建議加強針對性矯正。', riskEn: 'Isolated restriction present; targeted correction advised.' };
    if (score >= 50) return { labelZh: '中度關節受限與代償 (Moderate Compensations)', labelEn: 'Moderate Kinetic Compensation', color: 'text-amber-400', riskZh: '多個關鍵轉軸受限，大重量重訓與跑步時容易出現鄰近關節代償損耗。', riskEn: 'Key pivots limited; adjacent joints absorb excessive shear.' };
    return { labelZh: '高度受傷風險 (High Mechanical Vulnerability)', labelEn: 'High Injury Vulnerability', color: 'text-rose-400', riskZh: '主要動力樞紐嚴重僵硬，強烈建議在重訓前優先完成矯正處方。', riskEn: 'Severe stiffness across multiple joints; corrective protocol critical.' };
  };
  const gradeInfo = getMobilityGrade(scorePct);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-salud-cyan" />
            {language === 'zh-TW' ? '四大關鍵關節活動度自檢與神經矯正處方' : '4-Point Joint Mobility Screen & Corrective Routine'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Ankle Dorsiflexion, Hip Flexor, Thoracic Rotation & Overhead Shoulder Biomechanical Assessment
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-700 text-cyan-300">
          SFMA / FRC Protocol
        </span>
      </div>

      {/* Screen Overview & Score Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '通過檢測項目' : 'Tests Passed'}</span>
          <div className="my-2">
            <span className="text-4xl font-extrabold text-white font-mono">{passCount}</span>
            <span className="text-base text-slate-400 font-mono ml-1">/ {totalCount}</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                scorePct >= 75 ? 'bg-emerald-500' : scorePct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${scorePct}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 sm:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '綜合活動度評級' : 'Mobility Diagnostic'}</span>
            <span className={`text-xs font-mono font-bold ${gradeInfo.color}`}>
              {language === 'zh-TW' ? gradeInfo.labelZh : gradeInfo.labelEn}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed my-2">
            {language === 'zh-TW' ? gradeInfo.riskZh : gradeInfo.riskEn}
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-salud-cyan" />
            <span>
              {language === 'zh-TW'
                ? '點擊下方檢測卡片切換「通過 / 受限」，系統將即時產生專屬神經抑制拉伸處方。'
                : 'Toggle pass/restricted for each test to generate tailored neuro-corrective drills.'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOBILITY_SCREEN_TESTS.map((test) => {
          const isPassed = testResults[test.id];

          return (
            <div
              key={test.id}
              onClick={() => toggleTest(test.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isPassed
                  ? 'bg-slate-800/60 border-emerald-500/50 hover:border-emerald-400'
                  : 'bg-rose-950/20 border-rose-500/50 hover:border-rose-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-salud-cyan block">
                    {test.target_joint}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {language === 'zh-TW' ? test.name_zh : test.name_en}
                  </h4>
                </div>
                <button
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono flex items-center gap-1 shrink-0 ${
                    isPassed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {isPassed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {language === 'zh-TW' ? '達標 通過' : 'Pass'}
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      {language === 'zh-TW' ? '活動受限' : 'Restricted'}
                    </>
                  )}
                </button>
              </div>

              {/* Passing Standard */}
              <div className="mt-2.5 p-2 rounded-xl bg-slate-900/60 text-[11px] text-slate-300">
                <span className="font-semibold text-slate-400">{language === 'zh-TW' ? '合格標準：' : 'Standard: '}</span>
                {language === 'zh-TW' ? test.passing_standard_zh : test.passing_standard_en}
              </div>

              {/* Clinical Rationale & Compensations */}
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                {language === 'zh-TW' ? test.clinical_rationale_zh : test.clinical_rationale_en}
              </p>

              {/* Corrective Action highlight if restricted */}
              {!isPassed && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-300 font-bold">
                      {language === 'zh-TW' ? '推薦矯正處方：' : 'Corrective Action: '}
                    </strong>
                    {language === 'zh-TW' ? test.corrective_action_zh : test.corrective_action_en}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Prescription Summary */}
      {passCount < totalCount && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'zh-TW' ? '客製化每日活動度提升課表 (每日 8–10 分鐘)' : 'Daily Corrective Mobility Prescription (8-10 min)'}</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            {MOBILITY_SCREEN_TESTS.filter((t) => !testResults[t.id]).map((item, idx) => (
              <div key={item.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-white mr-1.5">
                    {language === 'zh-TW' ? item.name_zh.split(' (')[0] : item.name_en.split(' (')[0]}:
                  </strong>
                  <span className="text-amber-200">
                    {language === 'zh-TW' ? item.corrective_action_zh : item.corrective_action_en}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

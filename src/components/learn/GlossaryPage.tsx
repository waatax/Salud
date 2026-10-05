import React, { useMemo, useState } from 'react';
import { Search, ArrowRight, AlertTriangle, Table as TableIcon, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { GLOSSARY, GLOSSARY_CATEGORIES } from '../../data/learning/glossary';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../../knowledge/terms/terminology';
import { PageHeader } from './learnUi';
import { QuickTips } from './QuickTips';

type Cat = (typeof GLOSSARY_CATEGORIES)[number] | 'all' | 'acronym';

export const GlossaryPage: React.FC = () => {
  const { go } = useNavigation();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<Cat>('all');
  const needle = q.trim().toLowerCase();

  const entries = useMemo(
    () =>
      GLOSSARY.filter(
        (g) =>
          (cat === 'all' || g.category === cat) &&
          (!needle || `${g.term} ${g.zh} ${g.plain_zh}`.toLowerCase().includes(needle))
      ),
    [cat, needle]
  );

  const acronyms = useMemo(
    () =>
      Object.values(CANONICAL_TERMINOLOGY_REGISTRY).filter(
        (t) =>
          (cat === 'all' || cat === 'acronym') &&
          (!needle || `${t.term} ${t.primary_expansion_zh} ${t.context_guidance_zh}`.toLowerCase().includes(needle))
      ),
    [cat, needle]
  );

  const showGlossary = cat !== 'acronym';

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="健康小辭典"
        title="看不懂的名詞，一句話說清楚"
        lead="報告、藥袋、診間與新聞裡常見的醫學名詞，用不帶術語的白話解釋；另外整理了容易混淆的縮寫。"
      />

      <QuickTips sectionKey="glossary" />

      {/* 高混淆醫學名詞與縮寫對照矩陣總表 */}
      <MedicalConfusionMatrixTable />

      <label className="relative block max-w-lg">
        <span className="sr-only">搜尋名詞</span>
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋：eGFR、糖尿病前期、NNT…"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2.5 text-[15px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
      </label>

      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依類別篩選">
        {(['all', ...GLOSSARY_CATEGORIES, 'acronym'] as Cat[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              cat === c
                ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {c === 'all' ? '全部' : c === 'acronym' ? '易混淆縮寫' : c}
          </button>
        ))}
      </div>

      {showGlossary && (
        <dl className="grid md:grid-cols-2 gap-3">
          {entries.map((g) => (
            <div key={g.term} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-1.5 shadow-xs">
              <dt className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">{g.term}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{g.zh}</span>
              </dt>
              <dd className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{g.plain_zh}</dd>
              {g.related_hash && (
                <dd>
                  <button onClick={() => go(g.related_hash!)} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                    相關課程
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}

      {acronyms.length > 0 && (
        <section aria-labelledby="acr-h" className="space-y-3">
          <h2 id="acr-h" className="text-lg font-bold text-slate-900 dark:text-white">易混淆縮寫與偽科學用語</h2>
          <dl className="grid md:grid-cols-2 gap-3">
            {acronyms.map((t) => (
              <div key={t.term} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 space-y-1.5 shadow-xs">
                <dt className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">{t.term}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t.primary_expansion_zh}</span>
                </dt>
                {t.secondary_expansions_zh && t.secondary_expansions_zh.length > 0 && (
                  <dd className="text-xs text-slate-500 dark:text-slate-400">也可能指：{t.secondary_expansions_zh.join('、')}</dd>
                )}
                <dd className="text-sm leading-6 text-slate-700 dark:text-slate-300">{t.context_guidance_zh}</dd>
                <dd className="flex gap-1.5 text-sm leading-6 text-amber-900 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t.ambiguity_warning_zh}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {showGlossary && entries.length === 0 && acronyms.length === 0 && (
        <p className="text-sm text-slate-500">找不到符合的名詞。</p>
      )}
    </div>
  );
};

/** 高混淆醫學名詞與縮寫雙向對比矩陣表 */
const MedicalConfusionMatrixTable: React.FC = () => {
  const confusionPairs = [
    {
      pair: 'eGFR vs EGFR',
      termA: 'eGFR (腎絲球濾過率估計值)',
      termB: 'EGFR (表皮生長因子受體)',
      difference: '小寫 e 是腎功能排毒能力 (mL/min)；大寫 EGFR 是癌症標靶用藥基因突變標記。兩者相差十萬八千里！',
      tip: '看到報告數字 60–90 是腎功能；看到切片陽性是肺癌標靶基因。',
    },
    {
      pair: 'ApoB vs LDL-C',
      termA: 'ApoB (載脂蛋白B)',
      termB: 'LDL-C (低密度膽固醇濃度)',
      difference: 'LDL-C 測的是車廂裡乘客的「總重量」；ApoB 測的是路上「魚雷車輛的總台數」。車多容易撞壞血管。',
      tip: '三酸甘油酯偏高時，LDL-C 易被低估；ApoB 是最精準的心梗預測指標。',
    },
    {
      pair: 'HbA1c vs FPG',
      termA: 'HbA1c (糖化血色素)',
      termB: 'FPG (空腹單次血糖)',
      difference: 'FPG 只代表「抽血當下那一秒」的血糖（容易受前一晚飲食影響）；HbA1c 是紅血球「過去 3 個月」平均泡糖程度。',
      tip: '臨時抱佛腳少吃甜食無法作弊 HbA1c，它是長期控糖的照妖鏡。',
    },
    {
      pair: '骨質疏鬆 vs 退化性關節炎',
      termA: '骨質疏鬆症 (Osteoporosis)',
      termB: '退化性關節炎 (Osteoarthritis)',
      difference: '骨質疏鬆是「骨頭內部空洞無痛」，直到骨折才知；關節炎是「關節軟骨磨損發炎」，走路上下樓梯會劇烈疼痛。',
      tip: '膝蓋痛看骨科多是關節炎；預防骨質疏鬆需做 DXA 骨密度檢查。',
    },
    {
      pair: 'GI vs GL',
      termA: 'GI (升糖指數)',
      termB: 'GL (升糖負荷)',
      difference: 'GI 看食物吸收的「速度質量」（西瓜 GI 高）；GL 同時乘上該食物的「實際含醣份量」（西瓜含水量 90%，吃一小片 GL 很低）。',
      tip: '算血糖要看 GL：再高 GI 的食物，只要份量極小，整體血糖波動依然受控。',
    },
  ];

  return (
    <section aria-labelledby="confuse-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <TableIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="confuse-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          一秒看懂：診間與報告最常見高混淆名詞對照表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[120px]">對組</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">名詞 A</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">名詞 B</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[200px]">核心本質差異</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[180px]">💡 秒懂辨析口訣</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {confusionPairs.map((cp, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-emerald-800 dark:text-emerald-300 align-top">{cp.pair}</td>
                <td className="py-3 px-3.5 text-slate-800 dark:text-slate-200 align-top font-medium">{cp.termA}</td>
                <td className="py-3 px-3.5 text-slate-800 dark:text-slate-200 align-top font-medium">{cp.termB}</td>
                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 align-top leading-relaxed">{cp.difference}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed font-medium bg-emerald-50/30 dark:bg-emerald-950/10">
                  {cp.tip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

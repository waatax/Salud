import React from 'react';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import {
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  AlertTriangle,
  Library,
  Database,
  ExternalLink,
  Sparkles,
  FileText,
  AlertOctagon,
  Award,
  Layers,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';

/**
 * AboutGovernancePage — Salud 醫學實證原則與編輯方針 (Editorial Policy & Evidence Governance)
 *
 * 堅守科學真實性、嚴謹文獻溯源、同儕評審標準與讀者安全優先。
 * 全面去除虛擬專家角色，回歸純粹的國際一線醫學指引與 Oxford CEBM / GRADE 實證標準。
 */
export const AboutGovernancePage: React.FC = () => {
  const { language } = useLanguage();
  const { selectPillar, openMeta, openSynergy } = useNavigation();
  const { openModal } = useModal();
  const zh = language === 'zh-TW';

  return (
    <div className="space-y-10 animate-fade-in pb-16 font-sans">
      <button
        onClick={() => selectPillar('home')}
        className="btn-tactile inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{zh ? '回到首頁與健康內容' : 'Back to health content'}</span>
      </button>

      {/* ── 旗艦標頭：編輯與實證方針 ── */}
      <header className="p-6 sm:p-10 rounded-3xl border border-emerald-200/90 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-salud-dark-card dark:to-slate-950 space-y-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {zh ? 'Salud 醫學實證原則與編輯方針' : 'Salud Editorial Policy & Evidence Standards'}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
            2024–2026 臨床指引校準
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {zh ? '這些內容是怎麼來的？我們如何確保每一句都嚴謹可信' : 'How this content is created: Our evidence standards'}
        </h1>

        <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
          <p>
            {zh
              ? 'Salud 是一座為公眾打造的開放式健康教育平台。我們堅持「信達雅」的核心精神：每一條健康建議均嚴格錨定同儕評審之一線臨床醫學文獻與國際醫學會指引，杜絕未經驗證的誇大宣稱與利益衝突。'
              : 'Salud is an open health education platform built for everyone. Every recommendation is anchored in peer-reviewed primary clinical literature and international clinical practice guidelines, free from commercial bias and unverified claims.'}
          </p>
          <p>
            {zh
              ? '我們採用國際通行的 Oxford CEBM 證據層級與 GRADE 建議強度分級：Grade A 代表高品質系統性回顧、Cochrane 報告或大型隨機對照試驗；Grade D/E 代表生理化學機轉推論或臨床經驗，在所有頁面上均明確標示其證據侷限，提供完全透明的科學依據。'
              : 'We adhere to the Oxford CEBM levels of evidence and GRADE recommendation grades: Grade A represents systematic reviews, Cochrane evidence or large RCTs; Grade D/E represents mechanistic reasoning or clinical practice experience, explicitly disclosed with its limitations across all topics.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => openMeta('evidence')}
            className="btn-tactile px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Library className="w-4 h-4" />
            <span>{zh ? '瀏覽實證來源與分級資料庫' : 'Browse Evidence Library'}</span>
          </button>
          <button
            onClick={() => openMeta('explore')}
            className="btn-tactile px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold flex items-center gap-2 hover:border-emerald-500 transition-colors"
          >
            <Database className="w-4 h-4" />
            <span>{zh ? '檢索知識點資料庫 (Explore)' : 'Knowledge Explorer'}</span>
          </button>
          <button
            onClick={openSynergy}
            className="btn-tactile px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold flex items-center gap-2 hover:border-emerald-500 transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>{zh ? '跨主題交互作用矩陣' : 'Cross-topic Interactions'}</span>
          </button>
        </div>
      </header>

      {/* ── 醫療免責聲明與紅旗警訊防護 ── */}
      <section className="p-6 rounded-3xl border border-amber-300/80 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{zh ? '醫療安全界線與讀者防護原則' : 'Medical Safety Boundary & Patient Safety'}</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90">
          {zh
            ? 'Salud 提供的是科普健康衛教資訊，絕不構成醫療診斷、治療方案或個人化用藥處方。任何藥物增減、停藥、特殊檢驗與疾病治療決定，均應與合格主治醫師當面討論。若出現突發胸痛、呼吸急促、單側肢體無力、劇烈頭痛或急性腹痛等紅旗警訊，請勿耽擱，立即撥打 119 或至急診就醫。'
            : 'Salud provides educational health literacy, not medical diagnosis, treatment protocols, or personalized prescriptions. Always consult your attending clinician before initiating, altering, or discontinuing any medical regimen. For red-flag symptoms such as acute chest pressure, sudden dyspnea, unilateral weakness, or severe sudden headache, seek emergency medical care immediately.'}
        </p>
        <button
          onClick={() => openModal('emergency')}
          className="inline-flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 hover:underline pt-1"
        >
          <AlertOctagon className="w-4 h-4 text-red-600" />
          <span>{zh ? '查看完整「紅旗警訊：何時要立刻就醫」手冊 →' : 'View Red-Flag Warning Manual →'}</span>
        </button>
      </section>

      {/* ── 四大核心實證支柱 ── */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
            {zh ? 'Salud 四大核心實證支柱' : 'Four Foundational Pillars of Salud Evidence'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {zh ? '從文獻檢索到排版渲染，每個環節皆遵循循證醫學規範' : 'Following evidence-based medicine standards from synthesis to UI'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {zh ? '1. 國際一線學會指引為依歸' : '1. Premier Clinical Guidelines'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {zh
                ? '內文優先採用美國心臟學會 (ACC/AHA)、歐洲心臟病學會 (ESC)、美國糖尿病學會 (ADA)、KDIGO 腎臟病指引、世界衛生組織 (WHO) 與台灣衛生福利部國民健康署最新指引，確保建議具備臨床代表性。'
                : 'Recommendations prioritize consensus guidelines from ACC/AHA, ESC, ADA, KDIGO, WHO, and Taiwan Health Promotion Administration (HPA).'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {zh ? '2. Oxford CEBM & GRADE 實證分級' : '2. CEBM & GRADE Grading'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {zh
                ? '杜絕「以動物實驗推導人體劑量」或「以機轉推論代替臨床硬終點」。所有建議透明標註 A 到 E 級，讓讀者一眼明瞭該健康行為是鐵證如山，抑或仍處於科學前沿探索期。'
                : 'Eliminates misleading extrapolations. All insights are transparently graded A through E so readers distinguish solid clinical proof from exploratory hypotheses.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {zh ? '3. 2024–2026 動態文獻滾動更新' : '3. Continuous 2024–2026 Reviews'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {zh
                ? '醫學是不斷推進的演進科學。Salud 追蹤近三年發表之重大里程碑試驗（例如 GLP-1 藥物心腎保護臨床試驗、史丹佛呼吸生理嘆氣試驗、ApoB 早期篩檢更新），並將修正紀錄公開於最新實證專區。'
                : 'Medicine evolves continuously. We track recent milestone trials (e.g., SELECT GLP-1 trial, cyclic sighing neurobiology, ApoB threshold updates) with logged revisions.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {zh ? '4. 零利益衝突與透明度承諾' : '4. Zero Conflict of Interest'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {zh
                ? '無保健食品分潤、無業配贊助、無隱藏演算法置入。所有飲食法評估與營養保健品評級，皆依據 Cochrane 與大型 RCT 數據客觀呈現，揭露可能無效或弊大於利之成分。'
                : 'No supplement sponsorships, affiliate commissions, or algorithmic promotions. Nutritional evaluations objectively reflect Cochrane reviews and RCT outcomes.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 證據等級對照表 ── */}
      <section className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white">
            {zh ? 'Salud 實證等級標準對照表' : 'Evidence Grading Standards (GRADE & CEBM)'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono text-[11px]">
                <th className="py-2.5 px-3">{zh ? '等級' : 'Grade'}</th>
                <th className="py-2.5 px-3">{zh ? '證據強度定義' : 'Evidence Strength'}</th>
                <th className="py-2.5 px-3">{zh ? '典型文獻類型' : 'Typical Study Types'}</th>
                <th className="py-2.5 px-3">{zh ? '平台呈現方式' : 'Display Standard'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 px-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Grade A
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                  {zh ? '極高實證 (High Certainty)' : 'High Certainty'}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {zh ? '多中心大型隨機對照試驗 (RCT)、Cochrane 系統性回顧、國際一線學會臨床共識指引' : 'Multi-center RCTs, Cochrane reviews, major society guidelines'}
                </td>
                <td className="py-3 px-3 text-emerald-700 dark:text-emerald-400 font-medium">
                  {zh ? '強烈建議，結論極難被未來試驗翻轉' : 'Strong recommendation, robust proof'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                    Grade B
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                  {zh ? '高度實證 (Moderate to High)' : 'Moderate to High'}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {zh ? '單一良好設計 RCT、大型前瞻性世代研究（如 NHS、Framingham 世代研究）' : 'Well-designed RCTs, large prospective cohort studies'}
                </td>
                <td className="py-3 px-3 text-sky-700 dark:text-sky-400 font-medium">
                  {zh ? '具備可信臨床證據，普遍適用於大眾' : 'Reliable clinical basis, broad applicability'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Grade C
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                  {zh ? '中度觀察 (Moderate / Observational)' : 'Moderate / Observational'}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {zh ? '病例對照研究、回溯性分析、橫斷面觀察或小樣本試驗' : 'Case-control studies, retrospective analyses, small trials'}
                </td>
                <td className="py-3 px-3 text-amber-700 dark:text-amber-400 font-medium">
                  {zh ? '具相關性但尚未確立明確因果關係' : 'Correlation observed; causality pending'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                    Grade D
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                  {zh ? '機轉推論 (Mechanistic Reasoning)' : 'Mechanistic Reasoning'}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {zh ? '生物化學機制推論、細胞與動物模型、離體藥理學反應' : 'Biochemical mechanisms, in vitro & animal models'}
                </td>
                <td className="py-3 px-3 text-orange-700 dark:text-orange-400 font-medium">
                  {zh ? '具理論依據，但在人體臨床效果可能受限' : 'Theoretical basis; clinical efficacy unproven'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                    Grade E
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                  {zh ? '實踐經驗 (Practice Experience)' : 'Clinical Practice Experience'}
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {zh ? '臨床實務操作習慣、個案報告、新興生活介入方式' : 'Clinical practice habits, case reports, emerging tactics'}
                </td>
                <td className="py-3 px-3 text-rose-700 dark:text-rose-400 font-medium">
                  {zh ? '頁面明確標註「尚待人體驗證」，僅供參考' : 'Explicitly tagged as unproven; exploratory only'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 核心期刊資料庫與文獻索引 ── */}
      <section className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
            {zh ? '引述之全球頂級同儕評審期刊範疇' : 'Landmark Peer-Reviewed Journals Cited'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          {zh
            ? 'Salud 全站各章節所標記之 DOI 與學術論文，均直接源自國際權威醫學出版物，包括但不限於：新英格蘭醫學期刊 (NEJM)、刺胳針 (The Lancet)、美國醫學會雜誌 (JAMA)、英國醫學期刊 (BMJ)、循環 (Circulation)、細胞代謝 (Cell Metabolism)、自然醫學 (Nature Medicine)、運動醫學 (Sports Medicine) 及 Cochrane 系統性回顧資料庫。'
            : 'Primary references and DOIs cited across Salud are sourced from peer-reviewed medical journals including NEJM, The Lancet, JAMA, BMJ, Circulation, Cell Metabolism, Nature Medicine, Sports Medicine, and the Cochrane Database of Systematic Reviews.'}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {['NEJM', 'The Lancet', 'JAMA', 'BMJ', 'Circulation', 'Cell Metabolism', 'Nature Medicine', 'Cochrane Library', 'JACC', 'Diabetes Care'].map((journal) => (
            <span
              key={journal}
              className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300"
            >
              {journal}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

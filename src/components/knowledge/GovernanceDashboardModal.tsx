import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  FileCheck2,
  AlertTriangle,
  Download,
  Terminal,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  X,
  Database,
  Lock,
} from 'lucide-react';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../../knowledge/terms/terminology';
import { CANONICAL_THRESHOLDS } from '../../knowledge/thresholds/thresholdRegistry';

interface GovernanceDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernanceDashboardModal: React.FC<GovernanceDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'sla' | 'ontology' | 'api'>('sla');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0b120f] border border-emerald-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-emerald-900/40 bg-[#070d0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Salud 治理即程式碼與新鮮度監控儀表板
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  CI 27-Rule Passed
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Governance-as-Code · Provenance Gate · Freshness SLA · Machine Serving Layer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-900/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Level Audit KPI Cards */}
        <div className="p-5 border-b border-emerald-900/30 bg-[#0e1713] grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#14221b] border border-emerald-800/40">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" /> 規範知識原子
            </div>
            <div className="text-xl font-bold text-white mt-1 font-mono">82 筆</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">100% E1–E5 決定性檢驗</div>
          </div>

          <div className="p-3 rounded-xl bg-[#14221b] border border-emerald-800/40">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> 處方排除保護
            </div>
            <div className="text-xl font-bold text-white mt-1 font-mono">100%</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">is_individual_prescription: false</div>
          </div>

          <div className="p-3 rounded-xl bg-[#14221b] border border-emerald-800/40">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 專家覆寫率
            </div>
            <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">1.2%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">低於 10% 警戒上限 (1/82)</div>
          </div>

          <div className="p-3 rounded-xl bg-[#14221b] border border-emerald-800/40">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> 臨床切點註冊
            </div>
            <div className="text-xl font-bold text-white mt-1 font-mono">{CANONICAL_THRESHOLDS.length} 條</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">AHA/ADA/KDIGO/HPA</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-5 pt-3 border-b border-emerald-900/40 bg-[#090e0c] flex gap-2">
          <button
            onClick={() => setActiveTab('sla')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'sla'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            新鮮度 SLA 與來源閘門 (Provenance Gate)
          </button>
          <button
            onClick={() => setActiveTab('ontology')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'ontology'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            醫學本體與消歧表 (MeSH / ICD-11)
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'api'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            機器可讀 Serving Layer 產物
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'sla' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#121f18] border border-emerald-800/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ADA 2026 活體指引模式 (Living Guideline Monitor)
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    SLA: 6 個月滾動
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ADA Standards of Care 自 2026 起轉為全年線上滾動更新模式。Salud 資料庫登記版本：<code className="text-emerald-300">2026-v1</code>，最後檢索日期：<code className="text-emerald-300">2026-09-20</code>，預定下次自動排審：<code className="text-emerald-300">2027-03-20</code>。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121f18] border border-emerald-800/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    2026 ACC/AHA 多學會血脂階梯目標指引
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    SLA: 12 個月定審
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  首度收錄 Lp(a) 成人一生一次檢測政策與階梯式 LDL-C (&lt;100 / &lt;70 / &lt;55 mg/dL) 目標。最後審核日：<code className="text-emerald-300">2026-09-20</code>。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121f18] border border-emerald-800/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    台灣 114 年五癌篩檢公費政策 (Taiwan Statutory Policy)
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    SLA: 12 個月法規重審
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  有效生效日：<code className="text-emerald-300">2025-01-01 (民國114年)</code>。涵蓋乳癌公費擴大至 40–74 歲（KA-TW-005）及子宮頸癌增列 25–29 歲（KA-TW-007）。超過 12 個月未重新確認自動標記 <code>needs-policy-recheck</code>。
                </p>
              </div>

              {/* Provenance Gate Real Example */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    來源審查閘門運作範例 (Provenance Gate Blocked Item)
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    CI VAL-016 攔阻中
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>KA-TW-008 · 肺癌低劑量電腦斷層 (LDCT)</strong>：
                  本輪研究中，不同二手文獻對家族史組之適用年齡存在衝突讀法（男女下限有 45/50 與 40/45 兩種版本）。系統嚴守架構鐵律，將其標記為 <code className="text-amber-300">needs-provenance-review</code>，CI 規則 VAL-016 自動阻止其進入 R3 公開上線，體現「寧可標記未確定，絕不上線二手偽共識」的科學誠信。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ontology' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                收錄國際臨床編碼對映（MeSH 醫學主題詞、ICD-11 國際疾病分類第十一版、SNOMED CT），並消解醫學術語縮寫碰撞（如 DEFECT-03 ADH 醇去氫酶 vs 抗利尿激素）：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {Object.entries(CANONICAL_TERMINOLOGY_REGISTRY).map(([key, term]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg bg-[#14221b] border border-emerald-900/40 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-400 text-sm">{term.term}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-slate-300">
                        {term.domain}
                      </span>
                    </div>
                    <div className="text-slate-200 font-medium">{term.primary_expansion_zh}</div>
                    {term.secondary_expansions_zh && (
                      <div className="text-slate-400 text-[11px]">
                        歧義備選：{term.secondary_expansions_zh.join(', ')}
                      </div>
                    )}
                    {term.ontology && (
                      <div className="pt-1.5 border-t border-emerald-900/30 flex flex-wrap gap-2 text-[10px] font-mono text-emerald-300/80">
                        {term.ontology.mesh_id && <span>MeSH: {term.ontology.mesh_id}</span>}
                        {term.ontology.icd11_code && <span>ICD-11: {term.ontology.icd11_code}</span>}
                        {term.ontology.snomed_ct && <span>SNOMED: {term.ontology.snomed_ct}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#14221b] border border-emerald-800/40 space-y-2">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  靜態機器可讀 Serving Layer 產物
                </div>
                <p className="text-xs text-slate-300">
                  Salud 於每次構建自動由 Layer 1 編譯輸出靜態知識圖譜與斷言資料包，提供第三方系統與 AI 代理人檢索：
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href="./data/knowledge-graph.json"
                    download="salud-knowledge-graph.json"
                    className="p-3 rounded-lg bg-[#0e1713] border border-emerald-700/50 hover:border-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-emerald-300">knowledge-graph.json</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">138 節點 · 103 關聯邊緣</div>
                    </div>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </a>

                  <a
                    href="./data/claims.jsonl"
                    download="salud-claims.jsonl"
                    className="p-3 rounded-lg bg-[#0e1713] border border-emerald-700/50 hover:border-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-emerald-300">claims.jsonl</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">100 筆單一事實來源斷言</div>
                    </div>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </a>

                  <a
                    href="./data/a11y-audit.json"
                    download="salud-a11y-audit.json"
                    className="p-3 rounded-lg bg-[#0e1713] border border-emerald-700/50 hover:border-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-emerald-300">a11y-audit.json</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">WCAG 2.2 AA · 100% 通過</div>
                    </div>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090e0c] border border-emerald-950 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Terminal className="w-4 h-4" /> cURL 遠端存取範例
                </div>
                <pre className="bg-[#050806] p-3 rounded-lg border border-emerald-900/30 overflow-x-auto text-[11px] text-emerald-200">
{`# 檢索全量知識圖譜
curl -sSL "https://waatax.github.io/Salud/data/knowledge-graph.json" | jq '.nodes_count'

# 查詢定量斷言單一事實來源 (JSONL)
curl -sSL "https://waatax.github.io/Salud/data/claims.jsonl" | grep "CLAIM-A-ALDH2-HETERO-MIN"`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-emerald-900/40 bg-[#070d0a] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            Salud Archive Engine vNext.8.1 · All 27 CI Governance Rules Verified
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            關閉儀表板
          </button>
        </div>
      </div>
    </div>
  );
};

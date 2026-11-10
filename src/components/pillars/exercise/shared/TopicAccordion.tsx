import React, { useState } from 'react';
import { useLanguage } from '../../../../i18n';
import { EvidenceBadge } from '../../../common/EvidenceBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { EvidenceGrade } from '../../../../types';

/**
 * Generic Topic Accordion — WP3 shared component.
 *
 * Extracts the repeated expand/collapse topic card pattern
 * used across all 9 exercise discipline panels.
 * Each topic renders:
 *   - Header: ID badge + evidence grade + title + one-liner
 *   - Expanded: Two detail sections (mechanisms + actions)
 */

export interface TopicItem {
  id: string;
  title_zh: string;
  title_en: string;
  one_liner_zh: string;
  one_liner_en: string;
  evidence_grade: EvidenceGrade;
}

export interface DetailSection {
  /** Bilingual array of bullet points */
  items_zh: string[];
  items_en: string[];
  /** Section heading */
  label_zh: string;
  label_en: string;
  /** Accent color for the section background/text */
  accentBg: string;       // e.g. 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30'
  accentBorder: string;   // e.g. 'border-nature-sky-200 dark:border-nature-sky-800/60'
  accentText: string;     // e.g. 'text-nature-sky-800 dark:text-nature-sky-300'
  bulletColor: string;    // e.g. 'text-salud-cyan'
  bulletSymbol?: string;  // e.g. '•' or '✓'
}

interface Props<T extends TopicItem = TopicItem> {
  topics: T[];
  /** Returns the detail sections for a given topic */
  getDetailSections: (topic: T) => DetailSection[];
  /** Default expanded topic ID */
  defaultExpanded?: string;
  /** Accent color for the card hover border */
  hoverBorderColor?: string;
  /** Accent color for the topic ID badge */
  idColor?: string;
}

export function TopicAccordion<T extends TopicItem = TopicItem>({
  topics,
  getDetailSections,
  defaultExpanded,
  hoverBorderColor = 'hover:border-salud-cyan/60',
  idColor = 'text-salud-cyan',
}: Props<T>) {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(
    defaultExpanded || (topics.length > 0 ? topics[0].id : null)
  );
  const [expandAll, setExpandAll] = useState<boolean>(false);

  return (
    <div className="space-y-3.5">
      {topics.length > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>點擊任一卡片展開生理機轉與實作建議（共 {topics.length} 主題）</span>
          <button
            type="button"
            onClick={() => setExpandAll((v) => !v)}
            className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            {expandAll ? '收合為單一卡片' : '展開全部主題'}
          </button>
        </div>
      )}
      {topics.map((topic) => {
        const isExpanded = expandAll || expandedId === topic.id;
        const sections = isExpanded ? getDetailSections(topic) : [];

        return (
          <div
            key={topic.id}
            className={`p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all ${hoverBorderColor}`}
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              onClick={() => {
                if (expandAll) {
                  setExpandAll(false);
                  setExpandedId(topic.id);
                } else {
                  setExpandedId(isExpanded ? null : topic.id);
                }
              }}
              className="w-full flex items-start justify-between gap-3 text-left"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-xs font-bold ${idColor}`}>{topic.id}</span>
                  <EvidenceBadge grade={topic.evidence_grade} />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                </h4>
                <p className={`text-xs sm:text-sm ${idColor} font-medium leading-relaxed`}>
                  💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                </p>
              </div>

              <span
                className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {isExpanded && sections.length > 0 && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm leading-relaxed">
                {sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3.5 sm:p-4 rounded-xl ${section.accentBg} border ${section.accentBorder} space-y-2`}
                  >
                    <strong className={`${section.accentText} font-bold block`}>
                      {language === 'zh-TW' ? section.label_zh : section.label_en}
                    </strong>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                      {(language === 'zh-TW' ? section.items_zh : section.items_en).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${section.bulletColor} font-bold shrink-0`}>
                            {section.bulletSymbol || '•'}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

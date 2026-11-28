import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft, X, Clock, Trash2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal, ModalId } from '../../context/ModalContext';
import type { SearchDoc, SearchGroup } from '../../data/learning/searchIndex';
import { useDialogFocus } from '../../hooks/useDialogFocus';

type SearchModule = typeof import('../../data/learning/searchIndex');

const RECENT_KEY = 'salud_recent_searches_v1';

function readRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string' && x.trim().length > 0).slice(0, 5) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(term: string): string[] {
  const clean = term.trim();
  if (!clean) return readRecentSearches();
  const next = [clean, ...readRecentSearches().filter((t) => t !== clean)].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage limits */
  }
  return next;
}

const FOUR_PILLAR_CHIPS = [
  { label: '健康飲食', query: '飲食', tone: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' },
  { label: '營養補給品', query: '補給品', tone: 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800' },
  { label: '運動體能', query: '運動', tone: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800' },
  { label: '預防與就醫', query: '預防', tone: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800' },
];

const SUGGESTIONS = ['乳清蛋白', '肌酸', '維生素 D3', '洋車前子', '手麻', '高血壓', 'LDL', '糖化血色素', '失眠', '脂肪肝', '減重藥', '肌力訓練'];

/**
 * Site-wide search (Ctrl/⌘ K, or "/"). The index is built once on first open from the
 * same data the pages render, so every result is a real destination.
 */
export const SearchPalette: React.FC = () => {
  const { go } = useNavigation();
  const { isOpen, openModal, closeModal, searchSeed } = useModal();
  const open = isOpen('search');
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(readRecentSearches);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef, open);
  const listRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<SearchDoc[] | null>(null);
  const modRef = useRef<SearchModule | null>(null);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.isComposing || e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open ? closeModal('search') : openModal('search');
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        openModal('search');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, openModal, closeModal]);

  useEffect(() => {
    if (!open || docsRef.current || loadFailed) return;
    // The index pulls in every topic's data, so it is fetched on first open only.
    import('../../data/learning/searchIndex').then((mod) => {
      modRef.current = mod;
      docsRef.current = mod.buildSearchIndex();
      setReady(true);
    }).catch(() => setLoadFailed(true));
  }, [open, loadFailed]);

  useEffect(() => {
    if (!open) return;
    setQuery(searchSeed);
    setRecent(readRecentSearches());
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, searchSeed]);

  const results = useMemo(
    () => (open && ready && docsRef.current && modRef.current ? modRef.current.searchDocs(docsRef.current, query) : []),
    [open, query, ready]
  );

  const grouped = useMemo(() => {
    const byGroup = new Map<string, SearchDoc[]>();
    for (const r of results) {
      if (!byGroup.has(r.group)) byGroup.set(r.group, []);
      byGroup.get(r.group)!.push(r);
    }
    // Results arrive sorted by score, and Map keeps insertion order, so groups are listed
    // by their best match: a title hit in 飲食章節 outranks a keyword hit in 課程.
    return Array.from(byGroup.entries()).map(([group, items]) => ({ group: group as SearchGroup, items }));
  }, [results]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const choose = (doc: SearchDoc) => {
    if (query.trim()) setRecent(saveRecentSearch(query));
    closeModal('search');
    if (doc.target.startsWith('modal:')) {
      openModal(doc.target.slice('modal:'.length) as ModalId);
    } else {
      go(doc.target);
    }
  };

  const clearRecent = () => {
    setRecent([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {
      /* ignore */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal('search');
      return;
    }
    if (e.target !== inputRef.current || flat.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      choose(flat[active]);
    }
  };

  const useSuggestion = (value: string) => {
    setQuery(value);
    inputRef.current?.focus();
  };

  let idx = -1;

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="搜尋 Salud">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-fade-in" onClick={() => closeModal('search')} />
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-fade-in" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋症狀、檢驗數值、疾病或課程…"
            className="flex-1 min-w-0 bg-transparent py-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            role="combobox"
            aria-label="搜尋健康知識"
            aria-expanded={flat.length > 0}
            aria-controls={flat.length > 0 ? 'search-results' : undefined}
            aria-activedescendant={flat[active] ? `sr-${flat[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="清除搜尋文字"
            >
              清除
            </button>
          )}
          <button type="button" onClick={() => closeModal('search')} className="grid min-h-11 min-w-11 place-items-center rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white" aria-label="關閉搜尋">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[60dvh] overflow-y-auto overscroll-contain p-2">
          {!query.trim() ? (
            <div className="p-3 space-y-4">
              {recent.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      最近搜尋
                    </p>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" aria-hidden="true" />
                      清除紀錄
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => useSuggestion(term)}
                        className="min-h-10 rounded-full border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/70 dark:bg-emerald-950/30 px-3 py-1 text-sm font-medium text-emerald-900 dark:text-emerald-200 hover:border-emerald-500"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">依主題搜尋</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FOUR_PILLAR_CHIPS.map((c) => (
                    <button
                      key={c.query}
                      type="button"
                      onClick={() => useSuggestion(c.query)}
                      className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold text-center ${c.tone}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">常查的症狀與數值</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => useSuggestion(s)}
                      className="min-h-11 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : loadFailed ? (
            <div className="space-y-2 p-6 text-center text-sm text-slate-600 dark:text-slate-300">
              <p role="status">搜尋索引暫時無法載入。</p>
              <button type="button" className="discovery-secondary" onClick={() => window.location.reload()}>重新載入網站</button>
            </div>
          ) : !ready ? (
            <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400" role="status">
              正在載入搜尋索引…
            </p>
          ) : flat.length === 0 ? (
            <p role="status" className="p-6 text-center text-sm text-slate-600 dark:text-slate-400">
              找不到「{query}」。試試更短的關鍵字，例如「血壓」「睡眠」。
            </p>
          ) : (
            <div id="search-results" role="listbox" aria-label="搜尋結果">
            {grouped.map((g) => (
              <div key={g.group} className="mb-2" role="group" aria-label={g.group}>
                <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{g.group}</p>
                {g.items.map((doc) => {
                  idx += 1;
                  const i = idx;
                  const isActive = i === active;
                  return (
                    <button
                      type="button"
                      key={doc.id}
                      id={`sr-${doc.id}`}
                      data-idx={i}
                      role="option"
                      tabIndex={-1}
                      aria-selected={isActive}
                      onMouseMove={() => setActive(i)}
                      onClick={() => choose(doc)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                        isActive ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-base leading-snug text-slate-900 dark:text-white">{doc.title}</span>
                        {doc.subtitle && <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{doc.subtitle}</span>}
                      </span>
                      {isActive && <CornerDownLeft className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-4 border-t border-slate-200 dark:border-slate-800 px-4 py-2 text-[0.75rem] text-slate-500 dark:text-slate-400">
          <span><kbd className="font-mono">↑↓</kbd> 選擇</span>
          <span><kbd className="font-mono">Enter</kbd> 開啟</span>
          <span><kbd className="font-mono">Esc</kbd> 關閉</span>
        </div>
      </div>
    </div>
  );
};

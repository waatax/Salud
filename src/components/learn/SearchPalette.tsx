import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal, ModalId } from '../../context/ModalContext';
import type { SearchDoc, SearchGroup } from '../../data/learning/searchIndex';

type SearchModule = typeof import('../../data/learning/searchIndex');

const SUGGESTIONS = ['高血壓', 'LDL', '糖化血色素', '失眠', '脂肪肝', '減重藥', '肌力訓練', '腎臟', '癌症篩檢', '咖啡因'];

/**
 * Site-wide search (Ctrl/⌘ K, or "/"). The index is built once on first open from the
 * same data the pages render, so every result is a real destination.
 */
export const SearchPalette: React.FC = () => {
  const { go } = useNavigation();
  const { isOpen, openModal, closeModal } = useModal();
  const open = isOpen('search');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<SearchDoc[] | null>(null);
  const modRef = useRef<SearchModule | null>(null);
  const [ready, setReady] = useState(false);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
    if (!open) return;
    // The index pulls in every topic's data, so it is fetched on first open only.
    if (!docsRef.current) {
      import('../../data/learning/searchIndex').then((mod) => {
        modRef.current = mod;
        docsRef.current = mod.buildSearchIndex();
        setReady(true);
      });
    }
    setQuery('');
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

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
    closeModal('search');
    if (doc.target.startsWith('modal:')) {
      openModal(doc.target.slice('modal:'.length) as ModalId);
    } else {
      go(doc.target);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      choose(flat[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeModal('search');
    }
  };

  let idx = -1;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="搜尋 Salud">
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
            aria-expanded={flat.length > 0}
            aria-controls="search-results"
            aria-activedescendant={flat[active] ? `sr-${flat[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button onClick={() => closeModal('search')} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white" aria-label="關閉搜尋">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={listRef} id="search-results" role="listbox" className="max-h-[60vh] overflow-y-auto overscroll-contain p-2">
          {!query.trim() ? (
            <div className="p-3 space-y-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">大家常搜尋</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : !ready ? (
            <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400" role="status">
              正在載入搜尋索引…
            </p>
          ) : flat.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              找不到「{query}」。試試更短的關鍵字，例如「血壓」「睡眠」。
            </p>
          ) : (
            grouped.map((g) => (
              <div key={g.group} className="mb-2" role="group" aria-label={g.group}>
                <p className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{g.group}</p>
                {g.items.map((doc) => {
                  idx += 1;
                  const i = idx;
                  const isActive = i === active;
                  return (
                    <button
                      key={doc.id}
                      id={`sr-${doc.id}`}
                      data-idx={i}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(i)}
                      onClick={() => choose(doc)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                        isActive ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-[15px] text-slate-900 dark:text-white truncate">{doc.title}</span>
                        {doc.subtitle && <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{doc.subtitle}</span>}
                      </span>
                      {isActive && <CornerDownLeft className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="hidden sm:flex items-center gap-4 border-t border-slate-200 dark:border-slate-800 px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span><kbd className="font-mono">↑↓</kbd> 選擇</span>
          <span><kbd className="font-mono">Enter</kbd> 開啟</span>
          <span><kbd className="font-mono">Esc</kbd> 關閉</span>
        </div>
      </div>
    </div>
  );
};

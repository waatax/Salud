# Changelog

## v4.0.0 — 2026-09-28 · 學習優先的全面改版

### Added
- **立即上手 quick tips on every section**: 30 sections, 140 tips (4–5 each, always including at least one `move` and one `eat` tip), shown on every hub, body system, sport, diet chapter and learner page.
- **My action plan** (`useActionPlan`): add any tip, starter task or lesson "do today" item; tick it off daily on the home page with a 7-day count.
- **4-week starter plan** (`#start`): pre-exercise safety self-check plus weekly move / eat / sleep / mind tasks.
- **Learning layer** for lay readers: learning home (`#home`) with nine goal entry points, 7 tracks / 54 plain-language lessons (`#learn`), check-up guide with 23 lab explainers, a quick-read calculator and Taiwan's publicly funded screening schedule (`#checkup`), 28 evidence updates from 2024–2026 (`#updates`), and a 43-term glossary (`#glossary`).
- Site-wide search palette (Ctrl/⌘ K or `/`) over lessons, conditions, labs, updates, glossary, diet chapters and sports.
- Local, per-browser learning progress (`useLearningProgress`), with "continue where you left off".
- Pure hash router (`src/config/routes.ts`) and `useHashTab`, giving every hub tab and body-system section a shareable deep link.
- Content expansion of at least +10% in every one of the 29 existing modules (1,080 → 1,218 units), measured by `npm run content:metrics` against `scripts/content-baseline.json`.
- New chapter pages PAGE-W-13, PAGE-O-13, PAGE-A-14; 2026 body-system expansion (`src/data/systems/expansion2026.ts`).
- Tests: routing, dead-link detection across lessons/search/glossary, lesson completeness, lab-band classifiers.

### Changed
- Navigation regrouped: 開始學習 → 認識身體 → 吃・動・睡・心 → 預防與健康目標. Header reduced to search + three learning links; mobile bottom bar reduced to five fixed targets; sidebar is sticky.
- Theme follows the OS until the reader chooses (new storage key `salud-theme-choice`).
- Font stacks fall back to Noto Sans TC / PingFang TC / Microsoft JhengHei.
- Floating reading dock reduced to a single back-to-top button.
- Topic hubs and the search index are lazy-loaded and data is no longer forced into one eager chunk: first-load JS fell from ~1.38 MB to ~0.29 MB gzipped (−79%).
- Search groups are ordered by their best-scoring result; quick tips and the starter plan are searchable.
- Header learning links are now 4 週啟動 · 學習路徑 · 看懂健檢.
- Chapter page and knowledge-point counts are computed from data.

### Fixed
- Pinch-zoom re-enabled (removed `user-scalable=no`).
- Pages now open at the top after navigation, including Back/Forward.
- Taiwan LDCT screening eligibility updated to the 2025 rules (20 pack-years; family history men 45–74, women 40–74); KA-TW-008 released from provenance hold after checking the MOHW announcement.
- Corrected DOI and authorship of the 2026 ACC/AHA dyslipidemia guideline.
- PANIC_TRIAGE mental-health topics were never rendered; they now appear in the triage tab.
- Hard-coded counts (longevity compounds and quizzes, obesity myths) now follow the data.
- Revisiting a hub (e.g. clicking 增肌減脂 again) returns to its overview tab; switching body system resets to the system overview.
- Self-check tools in the mobile drawer close the drawer before opening their dialog.

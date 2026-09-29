# Changelog

## v4.1.0 — 2026-09-29 · 全區段實用健康技巧與動吃深度整合 (Immediate Health Action & Move/Eat Integration)

### Added
- **39 全區段「立即上手」實用 TIP 整合**：涵蓋學習路徑 7 大主線（`learn:basics`, `learn:body`, `learn:eat`, `learn:move`, `learn:rest`, `learn:checkup`, `learn:prevent`）、4 週健康啟動計畫（`start`）、健康小辭典（`glossary`）、8 大人體系統、飲食與三大章節（水 W、油 O、酒 A、保健品）、9 大運動專項及全體健康支柱。
- **全區段動吃雙核心原則（Move & Eat Rule）**：全站 39 個區段全面擴充至各 5 則實用技巧（共 195 則獨立具體行動，均具體給出執行劑量與花費時間），每個區段必備至少一則「🏃 開始運動」與一則「🥗 注意飲食」技巧，讓所有人無論瀏覽哪個頁面都能立即著手改善健康。
- **QuickTips 分類篩選與首步推薦標籤**：
  - 新增分類即時切換標籤：`全部`、`🏃 開始運動`、`🥗 注意飲食`、`💡 習慣與安全`，一秒聚焦當下想改變的行為。
  - 第一項技巧標註「🌟 今日第一步推薦」高亮標籤，提供零阻力起步錨點（如 10 分鐘快走、進食順序、換掉一杯糖飲）。
- **學習介面深度掛載**：
  - `TrackView` 於路徑總表與各別學習路徑首頁完整渲染對應實用技巧。
  - `GlossaryPage` 增設查名詞後的實用轉化技巧（拍照存檔、化解焦慮、門診 3 好問題）。
  - `StarterPlanPage` 升級為專屬 `start` 啟動技巧。

### Changed
- 實用技巧單元數從 159 擴增至 224（+40.9%），總字數提升至 11,656 字。
- 全站總知識與行動點數自 1,431 提升至 1,496（超前 baseline +38.5%）。

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

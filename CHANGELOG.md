# Changelog

## v4.3.0 — 2026-10-06 · 黏著度生態系、全域 18+ 試算工具箱、個人健康背包與全頁面深度優化 (Habit-Forming Engagement, Simulators Hub & Knowledge Architecture Overhaul)

### Added
- **每日生活健康打卡與微習慣系統（Daily Health Streak & Micro-Habits Engine）**：
  - 新增 `useHealthStreak` hook，精確計算使用者連續打卡天數（Streak）、歷史足跡與 4 階成長成就徽章（自律起步 3 天、週間大師 7 天、原子習慣 14 天、卓越健康 30 天）。
  - 全新 `DailyStreakCard` 元件：整合即時慶祝彩帶動畫（confetti）、累計打卡統計與輪播式「每日健康微習慣（1-Minute Micro-Habit）」，涵蓋晨起溫水、飯後散步、午後截斷咖啡因、史丹佛生理嘆氣等具體生活醫學處方。
- **全域 18+ 款互動健康試算工具箱（Interactive Simulators Hub Modal）**：
  - 徹底解決模擬器分散於各專章、難以直接查找的痛點，全新建立 `SimulatorsModal`。
  - 依「水分與飲食」、「運動體能」、「睡眠身心」、「心血代謝延壽」4 大分類完整收錄 18+ 款醫學試算工具（包含水分需求、食用油發煙點、BAC 酒精代謝、Zone 2 心率區間、跑步配速、重訓 1RM、關節活動度、咖啡因半衰期、史丹佛生理嘆氣、真實體重旅程、健康壽命預測、722 連續血壓等）。
  - 支援關鍵字即時模糊搜尋與一鍵跨專章直達體驗。
- **個人健康背包與收藏庫（Learning Backpack & Bookmarks Modal）**：
  - 全新 `useBookmarks` 跨頁面同步 hook 與 `LearningBackpackModal` 介面。
  - 三大專屬分頁：「知識書籤收藏（Bookmarked Pages）」、「今日行動計畫（Action Plan）」與「打卡成就徽章（Streaks & Badges）」。
  - 頂部導覽列（`Header`）、側邊欄（`Sidebar`）與浮動閱讀工具列（`FloatingReadingDock`）均配備即時背包按鈕與動態未讀計數角標。
- **身分與生活型態對焦快篩（Persona-Based Health Journey Navigator）**：
  - 首頁全新增設「久坐外食上班族」、「運動訓練與體態族」、「健檢報告紅字族」、「失眠多夢高壓族」、「熟齡健康與家人守護」5 大典型身分情境導引卡，降低大眾認知門檻，一鍵直達最佳契合課程與實踐方針。

### Optimized & Fixed
- **醫學知識專頁（Knowledge Page）全面升級**：
  - **修復前後頁跨章導航**：解決過往 `prevPage` 與 `nextPage` 僅綁定 Chapter W 導致 Chapter O（油脂）與 Chapter A（酒精）上下篇標題未正確呈現之歷史缺陷，全面升級為全章節動態自適應匹配。
  - **置頂章節快速跳轉導航列（Sticky In-Page TOC Quick Jump Bar）**：在閱讀長篇醫學專頁時，提供平滑捲動膠囊按鈕，讀者可隨時一秒直達「00 核心導讀」、「01 原子知識點」、「02 實證圖解」、「03 互動試算」、「05 台灣在地」、「06 闢謠迷思」、「07 今日處方」、「10 自檢測驗」與「11 實證校驗」。
  - **30 秒快速掌握核心重點卡（30-Second Fast Takeaway Card）**：頁首提煉核心結論與立即行動要點，滿足快節奏現代人「先看結論、再深究機轉」的高效習慣。
  - **一鍵加入今日行動計畫（Action Plan Deep Integration）**：Section 07「今天就能做」的三層建議（Tier 1 核心基礎 / Tier 2 進階強化 / Tier 3 專家精準）全面配備「+ 加入今日計畫」按鈕，與首頁及背包行動清單無縫雙向連動。
  - **一鍵複製與社群分享摘要（One-Tap Summary Share & Copy）**：支援一鍵複製精華卡片與專屬深度連結至剪貼簿，方便發送至 LINE 或社群分享給親友長輩。
- **架構與導航一致性提升**：
  - 全站 147 個組件 100% 通過 WCAG 2.2 AA 無障礙測試，29 條 Governance-as-Code 治理規則與 21 項測試零缺失通過。

## v4.2.0 — 2026-09-29 · UI/UX 閱讀色調、五段字級與行動響應最佳化 (Reading Comfort, 5-Scale Typography & Responsive Ergonomics)

### Added
- **5 段式精準無障礙字級切換系統（5-Scale Dynamic Typography Engine）**：
  - 由原 3 段擴充為 5 段顆粒度設定：`精簡 90%` (14.5px)、`標準 100%` (16px)、`舒適 112%` (17.5px)、`放大 125%` (19.5px)、`特大 138%` (21.5px)。
  - `FontSizeContext` 全新內建 `increaseFontSize`、`decreaseFontSize`、`scalePercent` 與百分比精準標籤，完全向後相容儲存設定。
- **手機端直式即時字級控制器（Mobile Direct Font Controls）**：
  - 徹底解決手機端需深層進入選單才能調整字級的痛點，將 `FontSizeToggle` 直接解放於頂部導覽列，在直式手機螢幕上一鍵切換。
  - `FloatingReadingDock` 升級為雙工閱讀助理，滾動後右下角直接提供「字級循環調整鈕」與「平滑回頂部」，單手大拇指即可在閱讀長文中隨心所欲調整字型大小。
- **排版舒適性工具類**：
  - 新增 `.reading-container`（最佳 68ch 行寬限制）與 `.text-reading`（1.75–1.8 倍放鬆行高與 0.012em 微字距），避免長行過寬造成的眼動疲勞。

### Changed
- **色調閱讀舒適度校正（Soothing Nature Palette & Low-Glare Tokens）**：
  - 淺色模式：將刺眼純白底色校準為溫潤植物紙白（`#F8FAF8`），搭配層次卡片底色（`#F2F7F4`）、柔和邊框（`#DFE8E2`）與深岩灰文字（`#0F172A`，對比度 >15:1），大幅降低手機與高亮度螢幕上的藍光眩光感。
  - 深色模式：優化為深邃林影黑曜色（`#0A110E`）與暗玉色卡片（`#15231C`），文字採用暖白（`#F1F6F3`），消除 OLED 藍黑硬對比造成的暗室閱讀疲勞。
- **手機直式版面底部安全避讓與留白強化**：
  - `AppShell` 的主要內容區塊由原先固定 `py-6` 升級為 `pt-4 pb-28 sm:py-6 lg:pb-12`，確保手機端固定底部導航列（`MobileNav`，56px + 安全區）絕不會遮擋任何頁面底部內文、操作按鈕或頁腳。
  - `FloatingReadingDock` 採用動態安全區域避讓（`bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]`），在各型 iPhone 與 Android 全面屏上保持適度間隙。

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

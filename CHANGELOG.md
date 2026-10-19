# Changelog

## v4.8 — 2026-10-19 · 營養課綱全面補齊 (Nutrition Curriculum Completion, SALUD Spec §5.1)

### Added
- **8 個核心專章依課綱補足頁數**（原各 3 頁 → 共 +54 頁、+216 個知識點、+65 題測驗）：E 能量 10 頁、P 蛋白質 8 頁、C 碳水與纖維 10 頁、S 糖 8 頁、N 鈉鉀血壓 8 頁、M 微量營養素 12 頁、D 飲食模式 10 頁、F 標示與外食 12 頁。新主題包含 BMR 估算與活動係數、能量平衡 vs 碳水胰島素模型、食慾荷爾蒙、安全減重速度、體重維持、超加工食品、RED-S 與 GLP-1 藥物營養安全閘；肌少症 AWGS 2019、合成窗、腎臟安全閘（KDOQI 2020）、台灣餐桌份量、蛋白粉選購；醣類結構、全穀、餐後血糖、肝醣與運動補給、FODMAP、醣類份數、增纖計畫；游離糖、隱藏糖、蛀牙、甜味偏好、兒少糖與糖稅；鈉上限與換算、鉀與高血鉀安全閘、722 居家血壓、鹽敏感、減鹽實戰；維生素 D、鈣、B12 與葉酸、碘、鋅硒、鎂、抗氧化補充劑試驗、藥物交互作用、族群補充地圖；證據判讀、我的餐盤、DIRECT、hPDI、NOVA 與 BMJ 2024、時間營養學、個人化 PDCA；過敏原、添加物 ADI、健康食品宣稱、早餐店／夜市／自助餐、食品安全、加工肉與隔夜菜、預算飲食。
- **資料驅動圖表引擎 `CurriculumChart`**：9 種圖型（長條、堆疊、甜甜圈、流程、階梯紅綠燈、比較、矩陣、時間軸、曲線），含圖示、深色模式、手機版面與自動產生的無障礙等價資料表與長描述；E–F 全部 156 張圖解改為專屬圖表（取代通用佔位圖），W/O/A 145 張亦改用同一引擎。
- 全站搜尋納入全部 11 章知識頁（含知識點一句話與標籤）。
- `scripts/curriculum-audit.ts` 課綱稽核與 `curriculum.test.ts`（頁數達標、KP/測驗一致、專屬圖表、篩選標籤、學習路徑、搜尋可達）。

### Fixed（PDCA 檢核發現）
- 11 章「分類篩選」標籤與頁面 category 不一致導致篩選結果為 0；臨床常數連結與學習路徑未涵蓋所有頁面。
- KP-N-001 每日鈉上限更正為衛福部 2,400 mg（WHO < 2,000 mg）；KP-F-004 高糖紅燈門檻更正為每 100 g > 22.5 g；KP-D-002 補充 2023 年 MIND 隨機試驗未見顯著認知差異，證據等級 A → B。
- KP 引用非本頁圖解的交叉引用、W-11 缺第二張圖。

### CAP-D 七輪優化紀錄
1. 建立圖表引擎＋E 章補齊；瀏覽器檢查發現 5 步流程圖在中寬度斷字 → 改為響應式網格。
2. P、C 章補齊；新增「KP 圖解必須在本頁」稽核規則。
3. S、N 章補齊；修正交叉引用。
4. M 章補齊（3 → 12 頁）。
5. D、F 章補齊；修正鈉上限、糖紅燈、MIND 證據過度宣稱。
6. 全站搜尋納入 11 章、新增課綱測驗；與 W/O/A 圖解並行工作整合（修正一處無效圖表欄位）。
7. 瀏覽器實測 11 章頁面圖表渲染、375 px 手機無水平捲動、主控台無錯誤；測試 33/33、治理驗證 0 項、正式建置通過。

## v4.7 — 2026-10-18 · 睡眠・呼吸・正念 身心修復專區 (Sleep, Breath & Mindfulness Course Zone)

### Added
- **新專區 `#mindbody`（10 章課程，CourseShell 模板）**：總覽（自律神經迴路）→ 睡眠的科學（兩歷程模型、一夜睡眠圖）→ 睡好的 24 小時（CBT-I）→ 呼吸生理 → **卡帕拉巴提呼吸法**（Kapalabhati／頭顱清明調息）→ **吐納與健身氣功六字訣** → **正念冥想** → 睡前整合處方與半夜醒來決策圖 → **CAP-D 四週自我迭代計畫** → 安全與就醫。每章附目標、重點回顧、迷思破解、小測驗與 3–7 篇參考文獻（共 32 篇，含 AASM 2021、ACP 2016、歐洲失眠指引 2023、JAMA／BMJ／Science／Sci Rep 試驗與統合分析）。
- **15 張互動圖解（每章至少 1 張）**：自律神經惡性／良性循環、兩歷程模型（可切換熬夜情境，綠區顯示 S＞C 睡眠閘門）、Hypnogram、光照勒克斯對數圖、呼吸性竇性心律不整（6 vs 15 次／分）、呼吸頻率光譜（煞車 vs 油門）、卡帕拉巴提波形、腹部幫浦側面圖、六字訣輪盤（含口型示意）、吐納細勻深長四週階梯、正念注意力循環、冥想／呼吸法效果量 dot-and-whisker、半夜醒來決策圖、CAP-D 輪、練習 × 身體狀況安全矩陣。
- **5 個練習工具**：24 小時作息規劃器（依起床時間倒推晨光、咖啡因截止、晚餐、溫水澡與睡前流程）、呼吸引導器（共振 4-6、生理嘆息、吐納、4-7-8、箱式、卡帕拉巴提入門節拍器＋禁忌確認閘門與夜間提醒）、正念計時器（呼吸覺察、身體掃描、三分鐘呼吸空間、慈心，Web Audio 鐘聲）、卡帕拉巴提適合度快篩、CAP-D 睡眠日記（7 晚睡眠效率 → 依 CBT-I 規則建議下週上床時間，僅存於本機）。
- 立即上手 5 則（`mindbody`）、四大維度臨床處方、搜尋（新群組「睡眠呼吸正念」，可用 卡帕拉巴提／卡酪梨／火呼吸／吐納／六字訣／正念 等詞找到）、睡眠與心理呼吸專區導流橫幅、「睡好與心理」小課延伸連結、醫學指南針工具入口。
- 純函數 `src/utils/sleepDiary.ts`（睡眠效率與 CBT-I 窗口調整）與 `mindbody.test.ts`（7 項測試：路由別名、章節完整性、文獻存在、禁忌矩陣、作息時間、搜尋可達、睡眠窗口規則）。

### CAP-D 七輪優化紀錄（Check → Act → Plan → Do）
1. **正確性**：兩歷程模型原本 C 曲線谷底落在早上 9 點（生理錯誤），改以節點＋Catmull-Rom 平滑重建，綠區只在夜間出現；自律神經天平改為「主導側下沉」；睡眠日記運算抽成純函數並修正睡眠限制規則（初次窗口 ≈ 平均睡著時間、最少 5 小時）。
2. **標籤碰撞**：作息時間軸改為編號標記＋分層避讓並與清單對應；呼吸光譜改三列交錯標籤；RSA 加註心跳起伏幅度；波形註解貼近曲線。
3. **插圖品質**：腹部幫浦重繪為坐姿側面雙格圖（胸口不動、橫膈與腹部方向）；六字訣加入口型示意；安全矩陣固定欄寬；移除睡眠圖重複圖例。
4. **手機版**：實測 375px 時圖中文字僅 5–6px → 寬圖改為最小繪圖寬度＋左右滑動（附提示），文字維持 ≥ 9px；全章節無水平溢出。
5. **無障礙**：卡帕拉巴提每秒 2 次的相位文字改為只朗讀輪次（避免螢幕閱讀器洗版）；六字訣輪盤加鍵盤焦點環；淺色主題逐圖檢查。
6. **醫學內容校對**：Goyal 2014 效果量更正為「小效果、中等證據強度」；膠淋巴清除標註為動物研究；長者睡眠時數改引 NSF 2015。
7. **上線品質**：精簡專區標題與側欄名稱、圖表捲動容器列印時不裁切、正式建置確認專區為獨立延遲載入區塊（gzip 約 34 KB＋資料 20 KB，不影響首頁載入）。

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

# Salud — Knowledge & Best Practice Archive
## 深度研究＋七輪迭代後 Implementation Plan vNext.7

> 研究日期：2026-09-22
> 目標：將 Salud 從「實證健康內容網站」升級為「可追溯、可搜尋、可維護、可持續更新的 Health Knowledge + Best Practice Archive」。
> 研究基準：目前公開的 Salud GitHub / GitHub Pages 程式與資料結構，並以 WHO、CDC、AHA/ACC、ADA、USPSTF、AASM、台灣國民健康署／TFDA、PubMed 等公開證據交叉核對。

---

# 0. 最終結論

Salud 的下一階段不應再以「增加更多文章」為主要工作。

目前 Phase 1 已經相當有份量：W 水與體液 56 KP、O 脂肪與食用油 59 KP、A 酒精與代謝毒理 73 KP，共 188 個已編排的原子化知識點；W/O/A 合計 37 個知識頁，且具有大量圖解、模擬器與安全閘。這個基礎已經足夠作為第一批 Reference Dataset。

真正需要升級的是：

```text
Navigation
    ≠
Taxonomy
    ≠
Knowledge Point
    ≠
Claim
    ≠
Evidence
    ≠
Best Practice
    ≠
Tool
```

最終目標模型：

```text
DOMAIN
  ↓
TOPIC
  ↓
ENTITY
  ↓
KNOWLEDGE POINT
  ↓
CLAIM
  ↓
EVIDENCE
  ↓
BEST PRACTICE
  ↓
TOOL / SIMULATOR
```

---

# 1. 現況實際盤點

## 1.1 產品定位

README 將 Salud 定位為「實證健康人體模擬與知識平台」，核心產品原則為 Mechanistic、Manipulable、Modest：講清楚機制、讓數字可以互動、不做未驗證的個人疾病預測，並要求模擬器具有 uncertainty band 與適用邊界。

這個方向應保留，而且是 Salud 的差異化核心。

## 1.2 現有 KnowledgePoint

現有 `KnowledgePoint` 已具備：

- id / page_id
- title / one_liner
- kp_type
- depth
- statement
- why_it_matters
- common_misconception
- evidence_grade A–E
- claim_ids
- figure_ids
- quiz_ids
- prerequisites
- contradicts
- applies_population
- applies_region
- excludes
- safety_flag
- sim_hook
- last_reviewed
- reviewed_by

這已經超越普通文章 CMS，但目前仍是「KP 為中心的內容模型」，尚未完全成為「Claim–Evidence–Best Practice 可追溯知識模型」。

## 1.3 現有 Evidence Library

目前 evidence library 是把 guideline 與 study 正規化到一個搜尋介面，核心資料仍偏向 Source Catalog：title、publisher、year、grade、URL、takeaway、topic。

下一版必須將：

```text
Source
Evidence Record
Claim
```

三者拆開。

---

# 2. 七輪迭代總表

| Round | 審核焦點 | 主要發現 | 最終改動 |
|---|---|---|---|
| R1 | 全站盤點 | 內容多，但 Topic / Claim / Evidence 關係未完全標準化 | 建立 Knowledge Object v2 |
| R2 | Taxonomy | Pillar、category、tag、topic 混在不同層級 | 建立 Topic / Entity Registry |
| R3 | Evidence | A–E 可能被誤解為正式 GRADE；Source 與 Claim 未充分分離 | 建立 evidence_type / certainty / recommendation_strength |
| R4 | 實際 KP 醫學查核 | 發現固定喝水、WUT 判斷、酒水 chaser、部分 ALDH2/烹調主張過度確定 | 建立 KP Migration Queue |
| R5 | Best Practice / Safety | action 文案與群體證據之間仍有落差 | Best Practice 必須有 population / contraindication / evidence chain |
| R6 | UIUX / Search | 現有 reader flow 很豐富，但治理資訊與讀者資訊混在一起 | Reader / Expert / Governance 三層 View |
| R7 | Implementation / QA | 缺少完整度、來源新鮮度、孤兒節點與高風險內容 CI | 建立 Archive CI + Coverage Matrix + Review Queue |

---

# 3. R1 — 全站盤點：從 Article Site 改成 Knowledge Archive

## 發現

目前 Salud 已經有：

- Health Pillars
- Human Systems
- Chapters
- Knowledge Points
- Figures
- Quizzes
- Myths
- Best Practices
- Red Flags
- Simulators
- Evidence Library

問題不是「沒有內容」，而是相同健康概念可能透過不同資料結構存在。

## R1 決策

建立唯一的 Knowledge Registry。

所有 reader-facing page 最終只負責組裝：

```text
Topic
+ Entity
+ KP
+ Claim
+ Evidence
+ Best Practice
+ Figure
+ Tool
```

Page 不應再成為資料的唯一 source of truth。

---

# 4. R2 — Taxonomy：Pillar 與 Topic 完全分離

目前 navigation 已有 10 個 health pillar，且程式明確要求 primary navigation 僅承載讀者健康內容，project governance 不進主導航。

這個方向正確，保留。

但下一版增加：

## Topic Registry

```ts
interface Topic {
  id: string
  slug: string
  name_zh: string
  name_en: string

  parent_id?: string

  type:
    | 'domain'
    | 'condition'
    | 'symptom'
    | 'biomarker'
    | 'intervention'
    | 'behavior'
    | 'lifestyle'
    | 'population'
    | 'tool'

  aliases: string[]
  mesh_ids?: string[]
  icd11_codes?: string[]

  description: string
  related_topic_ids: string[]
  related_entity_ids: string[]

  status: 'active' | 'deprecated' | 'redirect'
}
```

### 原則

- Pillar = 如何瀏覽
- Topic = 知識如何分類
- Entity = 具體健康概念
- Tag = 不再作為主要 semantic index

MeSH / ICD-11 可作外部標準映射，不直接取代 Salud 自己的 reader-friendly vocabulary。

---

# 5. R3 — Evidence Architecture：由 Source Catalog 升級為 Evidence Chain

## 舊模型

```text
Knowledge Point → Source
```

## 新模型

```text
Knowledge Point
      ↓
Claim
      ↓
Evidence Record
      ↓
Source
```

### Claim

```ts
interface Claim {
  id: string
  statement: string

  topic_ids: string[]
  entity_ids: string[]

  evidence_ids: string[]

  population?: string
  context?: string
  limitations?: string[]

  evidence_type?: string
  certainty?: 'high' | 'moderate' | 'low' | 'very_low' | 'not_rated'
  recommendation_strength?: 'strong' | 'conditional' | 'not_applicable'

  last_reviewed: string
  next_review: string

  status: 'active' | 'needs-review' | 'retired'
}
```

## Evidence Grade 修正

Salud A–E 可以保留為內部 `salud_evidence_tier`，但不得讓使用者誤解成正式 GRADE。

新欄位：

```text
evidence_type
certainty
recommendation_strength
salud_evidence_tier
```

---

# 6. R4 — 實際知識點醫學查核

本輪不是抽象設計，而是直接抽查目前 W / O / A 資料。

## 6.1 W-001：成人總體水

目前：成人總體水約 50–60% 體重，並指出體脂越高比例越低。

### 判定

**KEEP + NUANCE**

原因：這是合理的基礎生理知識，但不能被轉化成每個人的固定值。

### 新寫法方向

> 成人總體水比例通常約落在 50–60% 的範圍，但會受年齡、性別、體脂比例與瘦體組織量影響。

---

## 6.2 W PAGE-W-01：固定「進冷氣房前喝 200 mL」

目前頁面 life_hack 為：進冷氣房前先喝 200 mL 水。

### 判定

**REMOVE AS BEST PRACTICE**

### 原因

缺少足夠證據支持「進冷氣房前固定 200 mL」為一般人的必要行為。CDC 的現行健康飲水說明強調需求會因年齡、性別、懷孕、活動量、發燒、嘔吐、腹瀉與炎熱環境等而變化，而不是固定一個進冷氣房前劑量。

### 建議取代

> 冷氣、乾燥與高溫都可能影響體液需求；以日常口渴、活動量、環境與尿量等多項線索調整即可。不要把 200 mL 視為固定醫療處方。

---

## 6.3 W-PAGE-03： 「不要等口渴」

目前 page copy 把口渴描述成「已經代償一陣子，因此不要等口渴」。

### 判定

**REVISE**

一般健康成人不應被教育成必須持續在沒有口渴的情況下強迫喝水。CDC 目前資料強調每日水需求存在個體差異；耐力運動情境則有 exercise-associated hyponatremia 共識建議避免過度飲水，並支持依口渴飲水。

### 新 copy

> 口渴是身體重要的飲水訊號之一，但並非唯一判斷工具；高溫、長時間運動、發燒、嘔吐腹瀉或高風險疾病時，需要更完整評估。

---

## 6.4 W-PAGE-05： 「體重 × 30–35 mL」

目前把 30–35 mL/kg 描述為「每日基礎水分公式」。

### 判定

**DEMOTE FROM RULE → ESTIMATE ONLY**

National Academies 的 reference AI 是總水分，且包含飲水、其他飲品與食物，並依年齡與性別而不同；CDC 2026 也明確指出需求會隨年齡、性別、孕哺、活動與環境變化。

### 新資料模型

不要：

```text
water_need = weight * 35
```

而應：

```text
baseline_estimate
+
food_fluid_contribution
+
activity_adjustment
+
heat_adjustment
+
illness_adjustment
-
clinical_fluid_restriction
```

且對心衰竭、CKD、肝硬化、SIADH 等族群必須進入 safety gate。

---

## 6.5 W-PAGE-06：WUT「兩項出現就代表缺水」

目前內容把 Weight / Urine / Thirst 組合成近似診斷規則。

### 判定

**REPLACE**

尿液顏色的確是可用的實務線索，但系統性回顧指出其效度存在限制，且受到族群、測量方法與環境影響；運動水合 review 也指出 spot urine color / USG 有限制。

### 新模型

```text
Hydration Clues

A. Morning weight trend
B. Thirst
C. Urine color / frequency
D. Exercise / heat exposure
E. Symptoms

→ contextual interpretation
→ not a diagnosis
```

---

## 6.6 W-PAGE-08：固定「1 小時 / 0.8–1.0 L 腎臟上限」

目前 KP 把健康腎臟每小時排水能力寫成約 0.8–1.0 L。

### 判定

**REVISE TO CONTEXTUAL RANGE**

臨床資料支持健康成人若短時間大量攝入低張液體，約 1 L/h 的攝入就可能造成低鈉血症；但腎臟水排泄能力受到溶質攝取、腎功能、ADH 與個體條件影響，不應把 1 L/h 當作精密的個人安全上限。

### 新 copy

> 大量快速喝水可能超過身體當下排除自由水的能力；風險會受腎功能、ADH、溶質攝取與飲水速度影響，因此不要把「1 L/h」當成個人安全上限。

---

## 6.7 W-PAGE-10：咖啡與茶「可完全計入水量」

### 判定

**KEEP + DOSE QUALIFIER**

一般、習慣飲用者的小至中等咖啡因量通常不會讓淨水分平衡惡化；但是高劑量咖啡因仍可能增加急性利尿，因此「完全等同白水」過於絕對。

### 新 copy

> 日常咖啡或茶通常仍會貢獻液體攝取；不必因為含咖啡因就全部排除，但高咖啡因劑量不應與純水視為完全相同。

---

## 6.8 W-PAGE-10 / 酒精：「一杯酒配一杯水」

### 判定

**REMOVE AS HANGOVER / ALCOHOL-DETOX BEST PRACTICE**

2024 systematic review 指出喝水對隔日宿醉的改善有限；2026 randomized crossover study 也發現飲酒期間加水並沒有改變乙醇/乙醛動力學或隔日症狀。

水可以補充液體，但不能被描述成「降低乙醛」、「解酒」或「大幅降低宿醉」。

---

# 7. O — 脂肪與食用油 KP Audit

## O-023：WHO 2023 SFA <10%E、TFA <1%E

### 判定

**KEEP**

WHO 2023 guideline 支持成人與兒童的相關攝取上限與以不飽和脂肪取代飽和脂肪。

### UX 修正

不要只顯示「10%E = 22 g」；必須同時顯示：

```text
10%E 是相對於總熱量的比例。
2000 kcal diet → 約 22 g SFA/day
不同總熱量 → 不同克數
```

---

## O-024：飲食膽固醇「比飽和脂肪重要性小」

### 判定

**KEEP + MODERNIZE**

2026 ACC/AHA dyslipidemia guideline 將重點放在減少飽和脂肪、增加不飽和脂肪，並指出這種替代對 LDL-C 的影響比單純限制膳食膽固醇更一致。

但不要再使用：「人體 75–80% 都自己製造，所以吃蛋沒差」這種過度簡化因果。

### 新 copy

> 對多數人而言，降低飽和脂肪並用不飽和脂肪取代，是降低 LDL-C 較一致的飲食策略；個體反應仍可能不同，已有高 LDL-C、FH 等情況者應以實際血脂與臨床指引調整。

---

## O-037～040：Smoke Point

這一組非常值得保留，但目前有「把煙點、氧化穩定性、健康結果直接串成一個排名」的風險。

### 判定

**SPLIT INTO THREE CLAIMS**

```text
A. Smoke point = 烹調過熱的實務訊號
B. Oxidative stability = 另一個化學變數
C. Long-term health = 取決於整體脂肪酸替代與飲食模式
```

2024 review 指出油脂受熱會發生 thermoxidation、polymerization、hydrolysis 等變化；但煙點不能單獨代表長期健康效果。

### 新 Best Practice

不要：

> 「這罐油煙點最高，所以最健康。」

改為：

> 選油時同時看脂肪酸組成、使用溫度、油品新鮮度與是否重複高溫使用；煙點只是其中一個烹調品質指標。

---

# 8. A — Alcohol / ALDH2 Audit

## A-019：酒精與乙醛 Group 1

### 判定

**KEEP**

IARC 將酒精飲料與與酒精飲料相關的乙醛歸入 Group 1 carcinogen；WHO 明確指出對癌症風險無法建立安全攝取量。

注意：

> Group 1 代表「證據充分」，不是代表不同 Group 1 物質具有相同毒性大小。

這一點要保留，避免聳動化。

---

## A-014：ALDH2 *1/*2 = 10–20% 活性；*2/*2 = 0%

### 判定

**HIGH-PRIORITY REVERIFY**

這類數值應改成：

```text
enzyme activity: range
phenotype: variable
population: East Asian enriched
source: primary pharmacogenomic literature
```

不能把單一實驗數值變成所有人的固定生理常數。

---

## A-015：台灣 45–47% prevalence

### 判定

**KEEP ONLY WITH POPULATION-SPECIFIC SOURCE**

Archive 必須記錄：

- sample year
- ethnicity / ancestry
- sample size
- sampling method
- allele frequency vs genotype prevalence
- uncertainty interval

不能只有「台灣 45–47%」五個字。

---

## A-016：喝酒臉紅就是 ALDH2 缺失

### 判定

**REVISE**

臉紅可作為重要警示線索，但不能取代基因檢測，也不能把「臉紅」當成基因診斷。

新 copy：

> 飲酒後明顯臉紅與 ALDH2 低活性高度相關，但臉紅本身不是基因型確診工具。

---

## A-Taiwan：70% 酒精棉片自測

### 判定

**REMOVE COMPLETELY**

目前資料提出用 70% 酒精貼片做基因狀態自測。這種方式不應作為 Salud 的 health diagnostic recommendation。

替代：

```text
flush response
→ risk education
→ drinking reduction / avoidance
→ clinical or pharmacogenomic testing only when clinically appropriate
```

---

## A-03：「臉紅者定期食道癌胃鏡篩檢」

### 判定

**REMOVE AS GENERIC SCREENING RULE**

台灣國民健康署目前公費癌症篩檢清單並不把「ALDH2 臉紅者年過 40」列成一般民眾的固定食道鏡篩檢政策。

應改成：

> 若有吞嚥困難、吞嚥疼痛、持續胸骨後不適或其他警訊，應接受醫療評估；高風險個體是否需要額外檢查由醫療專業人員依個人風險判斷。

---

# 9. R5 — Best Practice 架構

Best Practice 不再只是 `do_this` 字串。

## 新資料模型

```ts
interface BestPractice {
  id: string
  title_zh: string
  title_en?: string

  topic_ids: string[]
  entity_ids: string[]

  what_to_do: string
  why: string

  target_population?: string
  frequency?: string
  duration?: string
  dose?: string

  contraindications?: string[]
  safety_notes?: string[]
  red_flags?: string[]

  claim_ids: string[]
  evidence_ids: string[]

  certainty?: string
  recommendation_strength?: string

  local_context?: string

  last_reviewed: string
  next_review: string

  status: 'active' | 'needs-review' | 'retired'
}
```

## Best Practice 五段式

```text
WHO
→ WHAT
→ WHY
→ HOW
→ WHEN NOT TO
```

每一個 action 都必須能回答「適用誰」與「不適用誰」。

---

# 10. R6 — UIUX：Reader / Expert / Governance 三層

## Reader Mode

讀者只需要看到：

```text
一句話結論
↓
為什麼
↓
怎麼做
↓
注意什麼
↓
何時就醫
↓
證據
```

## Evidence Mode

```text
Claim
Evidence Type
Certainty
Population
Limitations
Source
Review date
```

## Governance Mode

```text
AI generated
AI checks
Schema validation
Clinical review
Source freshness
Change history
```

AI metadata不要佔據一般讀者的主要閱讀層級。

---

# 11. 新增 /explore

新首頁核心 search 不應只搜 article title。

Search object：

```text
Topic
Entity
Knowledge Point
Claim
Best Practice
Evidence
Tool
```

Filters：

```text
Health Topic
Condition
Population
Region
Evidence Type
Evidence Certainty
Knowledge Type
Best Practice
Red Flag
Last Reviewed
```

---

# 12. R7 — Archive Governance / CI

## 12.1 Coverage Matrix

每個主要 Topic 必須能量測：

| Coverage | Requirement |
|---|---|
| Overview | required |
| Mechanism | required for mechanism topics |
| Risk | required for conditions |
| Symptoms | required for conditions |
| Diagnosis | required for conditions |
| Prevention | required where evidence exists |
| Best Practice | required for actionable topics |
| Red Flags | required for clinically relevant conditions |
| Evidence | required for factual claims |
| Tools | optional, only when validated |

## 12.2 Content QA Metrics

不是「醫療品質分數」，而是 archive governance metrics：

```text
Topic coverage
Claim traceability
Evidence coverage
Best Practice traceability
Safety metadata coverage
Freshness coverage
Accessibility coverage
Broken reference count
Orphan object count
```

## 12.3 CI 必查

```text
orphan topic
orphan entity
orphan KP
orphan claim
orphan evidence
orphan source
missing source on critical claim
missing population
missing review date
missing safety metadata
broken relation
broken figure reference
broken tool reference
expired high-risk source
invalid threshold
unsupported numeric claim
```

---

# 13. Source Registry v2

目前 source catalog 中存在若干需要「重新驗證 provenance」的紀錄。

特別是：

- `SRC-TW-HPA-WATER` 使用 generic HPA URL，且其精確標題／描述目前無法以直接可追溯頁面穩定驗證。
- `SRC-TWFDA-FRYOIL` 描述應直接連到現行 GHP / TFDA 官方規範，而非只連 `https://www.fda.gov.tw/`。

### Migration rule

每個 source 必須：

```text
canonical_url
publisher
publication_date
version
retrieved_date
jurisdiction
source_type
supersedes
status
```

若無法找到原始文件，不能只保留「看起來合理的摘要」。

狀態改為：

```text
needs-provenance-review
```

---

# 14. 數值資料：建立 Threshold Registry

所有：

- blood pressure
- glucose
- HbA1c
- LDL-C
- sodium
- potassium
- BMI
- temperature
- sleep duration
- exercise minutes
- screening age
- nutrient upper/lower limit

不能散落在文章字串中。

## Threshold model

```ts
interface Threshold {
  id: string
  parameter: string
  value: number
  unit: string
  comparator: string

  population: string
  context?: string

  source_ids: string[]
  guideline_version?: string

  effective_from?: string
  effective_to?: string
}
```

## 為何重要

醫療界線可能因：

- guideline version
- age
- pregnancy
- disease status
- measurement context
- population

而不同。

所以「一個數字」永遠不能脫離 context。

---

# 15. 新增 Current Guideline Layer

由於 Salud 是 living archive，不應只放永久性 reference。

每個重要主題應拆成：

```text
Foundational Science
Current Guideline
Current Taiwan Policy
Evidence Update
```

例如血壓：

- physiology
- diagnosis
- treatment threshold
- 2025 AHA/ACC guideline
- Taiwan practice context
- measurement method

2025 AHA/ACC guideline 已更新成人高血壓管理，overall treatment goal 為 <130/80 mm Hg，但也有 pregnancy、institutional care、life expectancy 等例外情境；Salud 若新增/更新高血壓內容，必須以 context-aware threshold object 儲存，而不能只在文章寫一個固定數字。

---

# 16. Taiwan Context Layer

這是 Salud 的重要差異化能力。

每個重要主題新增：

```text
Global Evidence
↓
Taiwan Guideline
↓
Taiwan Public Health Policy
↓
Taiwan Healthcare Practice
```

例如 colorectal screening：

截至 2026-09，台灣國民健康署的公費大腸癌篩檢為：45–74 歲，以及 40–44 歲具家族史者，每 2 年 1 次定量免疫法糞便潛血檢查。

這種內容必須儲存在 `TaiwanPolicyObject`，而不是塞進一般 paragraph，因為政策可能更新。

---

# 17. 真正的「Knowledge Point 完整性標準」

每一個 KP 都必須具備：

## A. Semantic

- topic
- entity
- type
- population
- context

## B. Evidence

- claim
- evidence
- source
- source version
- certainty

## C. Safety

- safety flag
- exclusions
- contraindications if relevant
- red flags if relevant

## D. Teaching

- one-liner
- explanation
- misconception if relevant
- figure if visual explanation improves comprehension

## E. Action

- best practice if actionable
- how to apply
- when not to apply

## F. Maintenance

- last reviewed
- next review
- reviewer
- change log

---

# 18. KP Type vNext

目前 `mechanism / number / comparison / action / myth / risk / context` 不夠完整。

建議增加：

```text
mechanism
number
comparison
action
myth
risk
context
symptom
diagnostic
screening
red_flag
threshold
prevention
best_practice
tool
```

這能避免「screening」只能被硬塞進 `action` 或 `number`。

---

# 19. Figure Architecture vNext

目前 FigureMeta 已經有：

- caption
- alt_text
- long_description
- data_table
- data_source_ids
- source_version
- evidence_grade
- reviewer

這套設計應保留。

再增加：

```text
supports_claim_ids
illustrates_kp_ids
figure_purpose
```

Figure 不再只是 illustration，而是「Claim-aware evidence visualization」。

---

# 20. Simulator Governance

所有 simulator 必須有：

```text
Input
Assumption
Model
Output
Uncertainty
Population
Excluded population
Clinical warning
Source
Last validated
```

禁止：

```text
calculator output = diagnosis
calculator output = disease probability
calculator output = personal medical prescription
```

若是教育性 sandbox，UI 必須明確寫：

> educational model / not a diagnostic tool

---

# 21. 內容優先級

不要先增加「最多流量」內容，而應先建立高風險、高連結度的核心節點。

## Tier 1 — Core Health Graph

```text
Blood Pressure
Glucose
Lipids
Weight / Obesity
Physical Activity
Sleep
Diet Quality
Sodium
Alcohol
Smoking
Kidney
Cardiovascular Risk
```

## Tier 2 — Prevention

```text
Cancer Screening
Vaccination
Falls
Bone Health
Oral Health
Mental Health
```

## Tier 3 — Specialized

```text
Supplements
Longevity
Gut Microbiome
Sports Performance
Advanced Nutrition
```

---

# 22. 最重要的 Content Expansion Template

今後新增任何主題，一律先建立：

```text
TOPIC

1. Definition
2. Mechanism
3. Risk factors
4. Symptoms / signs
5. Measurement
6. Diagnosis / screening
7. Prevention
8. Best practices
9. Red flags
10. Common myths
11. Evidence
12. Taiwan context
13. Tool
14. Related knowledge
```

這樣才能真正形成「Archive Coverage」。

---

# 23. 7-Round RPDCA Final Process

## Round 1 — Discover

盤點所有 page、KP、claim、source、figure、tool。

## Round 2 — Normalize

Topic / Entity / Claim / Evidence / Best Practice 正規化。

## Round 3 — Verify

對所有 critical claim 進行 evidence verification。

## Round 4 — Safety

檢查 red flag、contraindication、population、exclusion。

## Round 5 — Explain

檢查 reader comprehension、mechanism figure、plain language。

## Round 6 — Experience

搜尋、filter、mobile、accessibility、related knowledge。

## Round 7 — Govern

CI、coverage、freshness、provenance、versioning、change log。

每輪完成後才允許 publish。

---

# 24. Migration Queue — 現有資料優先處理

## P0 — 必修

1. W-PAGE-01 固定 200 mL life_hack
2. W-PAGE-03「不要等口渴」過度絕對化
3. W-PAGE-05 `30–35 mL/kg` 由 rule 改 estimate
4. W-PAGE-06 WUT 兩項即缺水
5. W-PAGE-08 0.8–1.0 L/h 絕對上限語氣
6. W-PAGE-10 酒＋水的解酒/宿醉宣稱
7. A-Taiwan 酒精貼片基因自測
8. A-03 年過 40 食道鏡一般篩檢規則
9. 所有 unsupported numeric claims
10. 所有沒有 canonical source URL 的 critical claim

## P1 — 高價值

1. O-PAGE-08 smoke point / oxidative stability 拆 claim
2. O-024 dietary cholesterol wording modernize
3. ALDH2 genotype numeric ranges reverify
4. Taiwan ALDH2 prevalence source normalization
5. Human System exaggerated taglines review
6. 「腸漏」等容易被健康產業濫用的概念加 terminology guard

## P2 — 長期

1. 完整 Topic Registry
2. MeSH mapping
3. ICD-11 mapping
4. Threshold Registry
5. Taiwan Policy Registry
6. Evidence Update feed
7. Knowledge Graph UI

---

# 25. Suggested Folder Architecture

```text
src/
├── app/
├── components/
├── pages/
│
├── knowledge/
│   ├── topics/
│   ├── entities/
│   ├── claims/
│   ├── evidence/
│   ├── best-practices/
│   ├── relations/
│   ├── thresholds/
│   ├── policies/
│   └── figures/
│
├── registry/
│   ├── topicRegistry.ts
│   ├── entityRegistry.ts
│   ├── claimRegistry.ts
│   ├── evidenceRegistry.ts
│   ├── bestPracticeRegistry.ts
│   ├── thresholdRegistry.ts
│   └── taiwanPolicyRegistry.ts
│
├── validation/
│   ├── schema/
│   ├── provenance/
│   ├── coverage/
│   ├── safety/
│   ├── freshness/
│   └── accessibility/
│
├── search/
├── graph/
└── tools/
```

---

# 26. Acceptance Criteria

## Archive Integrity

```text
0 orphan KP
0 orphan Claim
0 orphan Evidence
0 broken relation
0 broken source reference
```

## Critical Content

```text
100% critical claims have evidence
100% high-risk content has safety metadata
100% numeric critical claims have context + source
100% Taiwan policy claims have effective date
```

## Freshness

```text
Every critical guideline has next_review
Every policy object has effective date
Superseded sources are explicitly marked
```

## UX

```text
Reader can reach answer in <= 3 interactions
Reader can see source from every critical claim
Reader can discover related knowledge without returning Home
Reader can distinguish evidence from advice
```

## Accessibility

WCAG 2.2 AA as engineering baseline; AAA may be used selectively where feasible, but the project should avoid claiming blanket AAA compliance unless the whole site has actually been audited against the success criteria.

---

# 27. Editorial Language Rules

禁止：

- 「一定」
- 「保證」
- 「完全不會」
- 「只要 X 就 Y」
- 「人體固定需要 X」
- 「這個數字就是你的安全上限」
- 「天然所以安全」
- 「AI 專家認證所以可信」

除非有明確限定條件與 evidence。

優先：

- 「對多數人而言」
- 「在這個族群中」
- 「現有證據支持」
- 「證據仍有限」
- 「此數值依情境而異」
- 「這是教育性模型，不是診斷」
- 「如有 X 情況，應接受專業評估」

---

# 28. Evidence Priority Rules

每一 Claim 依下列順序找 source：

```text
1. Current national guideline / policy
2. Current international guideline
3. Systematic review / meta-analysis
4. RCT / large cohort
5. Major academic review
6. Textbook / foundational source
7. Expert consensus
8. Secondary health site
```

Secondary health websites 不應成為 critical medical claim 的 primary evidence。

---

# 29. 最終產品定位

Salud 不應是：

> 一個「健康文章集合」。

也不只是：

> 一個「有漂亮圖表與模擬器的醫療科普網站」。

而應成為：

> **A structured, evidence-traceable, population-aware, continually maintained Health Knowledge & Best Practice Archive.**

真正的核心資產是：

```text
Topic
→ Entity
→ Knowledge Point
→ Claim
→ Evidence
→ Best Practice
→ Tool
→ Taiwan Context
→ Version / Review History
```

---

# 30. 研究依據與現行重要錨點

## Salud 原始資料

- Salud README / Product Ethos / current chapter counts
  - https://raw.githubusercontent.com/waatax/Salud/main/README.md
- KnowledgePoint / KnowledgePage / FigureMeta type definitions
  - https://raw.githubusercontent.com/waatax/Salud/main/src/types/index.ts
- W chapter
  - https://raw.githubusercontent.com/waatax/Salud/main/src/data/chapterW.ts
- O chapter
  - https://raw.githubusercontent.com/waatax/Salud/main/src/data/chapterO.ts
- A chapter
  - https://raw.githubusercontent.com/waatax/Salud/main/src/data/chapterA.ts
- Sources catalog
  - https://raw.githubusercontent.com/waatax/Salud/main/src/data/sources.ts

## Current evidence checked

### Hydration
- CDC, About Water and Healthier Drinks, 2026-03-05
  https://www.cdc.gov/healthy-weight-growth/water-healthy-drinks/index.html
- National Academies, Dietary Reference Intakes for Water
  https://nap.nationalacademies.org/read/10925/chapter/2
- Exercise-associated hyponatremia consensus
  https://pubmed.ncbi.nlm.nih.gov/26227507/
- Hydration monitoring / urine color systematic review
  https://pubmed.ncbi.nlm.nih.gov/32330109/
- Drinking strategies / thirst
  https://pubmed.ncbi.nlm.nih.gov/23121349/

### Fat / oils
- WHO Healthy Diet
  https://www.who.int/news-room/fact-sheets/detail/healthy-diet
- WHO saturated/trans fat guideline, 2023
  https://www.who.int/publications/i/item/9789240073630
- 2026 ACC/AHA dyslipidemia guideline
  https://www.jacc.org/doi/10.1016/j.jacc.2025.11.016
- 2024 review: vegetable oils and frying degradation
  https://www.mdpi.com/2304-8158/13/24/4186
- TFDA frying-oil management / TPC 25%
  https://www.fda.gov.tw/

### Alcohol
- WHO Alcohol
  https://www.who.int/news-room/fact-sheets/detail/alcohol
- WHO/IARC alcohol cancer risk
  https://cdn.who.int/media/docs/default-source/documents/health-topics/cancer/2023-who-alcohol-health-cancer-risks-lancet-pub-health-8-e6.pdf
- 2024 review: water and hangover
  https://pubmed.ncbi.nlm.nih.gov/39069212/
- 2026 randomized crossover water-chaser study
  https://pubmed.ncbi.nlm.nih.gov/42375618/

### Activity / sleep / metabolic health
- WHO Physical Activity
  https://www.who.int/initiatives/behealthy/physical-activity
- AASM adult sleep consensus
  https://aasm.org/seven-or-more-hours-of-sleep-per-night-a-health-necessity-for-adults
- ADA Standards of Care in Diabetes 2026 — Diagnosis and Classification
  https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes
- AHA 2025 High Blood Pressure Guideline summary
  https://professional.heart.org/en/science-news/2025-high-blood-pressure-guideline/top-things-to-know

### Taiwan public health
- Taiwan HPA colorectal cancer screening, current page updated 2026-09-09
  https://www.hpa.gov.tw/Pages/List.aspx?nodeid=190
- Taiwan HPA colorectal screening FAQ / eligibility
  https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=5053&pid=20022

---

# 31. Final Implementation Order

## Sprint Group A — Schema Foundation

1. Add Topic Registry
2. Add Entity Registry
3. Add Claim Registry
4. Add Evidence Registry
5. Add BestPractice Registry
6. Add Relation Registry
7. Add Threshold Registry
8. Add Taiwan Policy Registry

## Sprint Group B — Migrate W/O/A

優先完成目前 188 個已存在 KP 的 schema mapping，不新增大量新內容。

## Sprint Group C — Fix the P0 Migration Queue

先處理所有：

- hydration overclaims
- alcohol detox / hangover claims
- unsupported diagnostic rules
- hard numeric limits
- unverified screening rules

## Sprint Group D — Explore / Search

建立統一 Knowledge Search。

## Sprint Group E — Governance

建立 Coverage / Freshness / Provenance / Safety dashboard。

## Sprint Group F — Content Expansion

完成：

- cardiovascular
- hypertension
- dyslipidemia
- glucose / diabetes
- obesity
- exercise
- sleep
- nutrition
- cancer screening

再擴展到 specialized topics。

---

# 32. Definition of Done

Salud vNext.7 完成的定義不是「網站有更多頁面」，而是：

```text
Every important knowledge point
        ↓
has a topic
        ↓
has a claim
        ↓
has traceable evidence
        ↓
has applicability / exclusions
        ↓
has safety context when needed
        ↓
has a maintainable review date
        ↓
can be discovered through search
        ↓
can be connected to related knowledge
        ↓
can be converted into best practice
        ↓
can be updated without rewriting the entire site
```

這才是 Salud 從「網站」進化成「健康知識資產庫」的核心完成條件。

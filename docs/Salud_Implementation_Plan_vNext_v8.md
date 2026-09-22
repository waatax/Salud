# Salud — Knowledge & Best Practice Archive
## 深度研究 ＋ 第八代七輪迭代 Implementation Plan vNext.8

> 研究日期：2026-09-22
> 上一版：`Salud_Implementation_Plan_vNext_v7.md`（架構藍圖層）
> 本版定位：**把 v7 的藍圖降維成「可編譯、可驗證、可引用」的實作規格**，並首次交付一份**明確知識點資料包（Canonical Knowledge Pack）**。
> 研究基準：本機 repo 實際程式碼（`v3.0.0`，`src/` 共 65,949 行）逐行對帳 ＋ 2025–2026 現行指引交叉核對（AHA/ACC、ACC/AHA Multisociety、ADA、WHO、KDIGO、IARC、AASM、台灣 HPA/TFDA、PubMed）。

---

# 0. v7 → v8 的關鍵差異（先看這一段）

v7 的問題不是方向錯，而是**停在名詞層**。它定義了 `Topic / Claim / Evidence / BestPractice / Threshold` 這些物件「應該存在」，但沒有回答四個實作上必答的問題：

| v7 未回答 | v8 的答案 |
|---|---|
| 「明確知識點」到底長什麼樣？誰來認定「明確」？ | §6 `KnowledgeAtom v3` 的 `assertion_kind` ＋ §10 **Canonical Knowledge Pack（82 條可引用知識點）**。量化斷言若未綁定 `QuantitativeClaim` 物件，CI 直接拒收。 |
| `certainty` 由誰填？人手填不會又變成第二個假 GRADE 嗎？ | §7 `certainty` 改為**由 EvidenceRecord 推導的函數**（`deriveCertainty()`），人手只能 `override` 且必須寫理由，CI 檢查 override 比率。 |
| 「不要把 1 L/h 當安全上限」很好，那該怎麼存？ | §8 `QuantitativeClaim` 帶 `value_kind`（point / range / distribution / bound / heuristic）＋ `derivation` ＋ `uncertainty` ＋ `misuse_guard`。數字自己會說「我不是你的上限」。 |
| 舊的 188 個 KP 與 12 個 Hub 要怎麼不中斷地搬？ | §13 **Adapter-First 遷移**：`src/knowledge/` 成為 SoT，既有 `KnowledgePage` 降級為由 `buildPageFromRegistry()` 生成的 **view**，UI 一行不改即可先跑起來。 |

另外 v8 新增三個 v7 完全沒有的架構層：

1. **Numeric & Unit Engine**（§8）— 讓所有醫學數字帶單位、族群、情境、不確定度與「禁止誤用」語意。
2. **Safety & Contraindication Graph**（§9）— 安全閘從字串變成可機器求值的謂詞，模擬器輸入直接被攔。
3. **Machine-Readable Serving Layer**（§11）— 輸出 `knowledge-graph.json` / `claims.jsonl`，讓 Salud 成為**可被引用的資料來源**，而不只是一個人類網站。

---

# 1. 本輪最重要的實證發現：程式碼層的真實對帳

v7 是對「資料模型」做審查；v8 直接對 `src/` 逐檔對帳。以下每一條都有 `file:line`，可直接修。

## 1.1 同一個事實，在三個檔案有三個不同數字（DEFECT-01，最高優先）

ALDH2 的生理數值在 repo 中至少出現在三處，且彼此矛盾：

| 位置 | 內容 | 問題 |
|---|---|---|
| `src/data/chapterA.ts:397` | 「*1/*2 血中乙醛可達正常人的 5 至 6 倍，*2/*2 甚至飆升至數十倍」 | 倍數為點值，未帶劑量／族群／量測方法 |
| `src/data/dietaryNutrientsData.ts:585` | 「酵素活性僅剩不到 10%，血中乙醛濃度飆升數十倍」 | 與上一條的倍數不一致 |
| `src/data/chapterA.ts:453` | 「風險倍數強烈取決於飲酒公克數與吸菸分層，**絕非單一固定值**」 | 這一條是對的，但它直接否證了另外兩條 |

同一個 repo 在同一個主題上同時主張「絕非固定值」與「就是數十倍」。這不是文案問題，是**缺少單一事實來源**的結構問題 —— 也是本版把 Registry 從「nice to have」升格為「P0 阻擋項」的唯一理由。

## 1.2 同一頁內，頁面文案否證了自己的知識點（DEFECT-02）

`PAGE-W-05`：

- `src/data/chapterW.ts:587` `life_hack`：「**每日基礎水分公式**：體重 (kg) × 30~35 mL」
- `src/data/chapterW.ts:653` `KP-W-021`：「體重乘 30–35 mL **只是經驗法則** … 在實證醫學證據等級上屬於有限專家共識」

KP 已經做對了（甚至 `evidence_grade: 'C'`、並警告 120 kg 者會算出 4.2 L）。但 `life_hack` 這個獨立字串欄位繞過了 KP，把同一個數字重新升格成「公式」。

**架構結論：只要 `life_hack` / `clinical_pearl` / `plain_analogy` / `do_this` 是自由字串，KP 的 evidence grade 就永遠管不到它們。** v8 因此要求這些欄位必須宣告 `derived_from_kp` 或 `derived_from_bp`（§6.4），CI 檢查未綁定的自由文案。

## 1.3 術語碰撞：ADH 在相鄰兩行代表兩種不同的東西（DEFECT-03）

`src/data/dietaryNutrientsData.ts`：

- `:583`「乙醇進入肝臟經由乙醇去氫酶 (**ADH**) 氧化為乙醛」
- `:587`「酒精抑制抗利尿激素 (**ADH**) 造成強迫性脫水」

同一個 `biochemical_mechanisms_zh` 陣列內，`ADH` 先指 alcohol dehydrogenase、再指 antidiuretic hormone。對讀者而言這是直接的理解破壞。→ §12 `TerminologyRegistry`（縮寫必須唯一、歧義縮寫必須在首次出現處展開）。

## 1.4 未被支持的量級與偽診斷（DEFECT-04 ~ DEFECT-09）

| ID | 位置 | 內容 | 判定 |
|---|---|---|---|
| D-04 | `chapterA.ts:496` | 「用棉花沾 70% 藥用酒精貼手臂 15 分鐘，若發紅**約 70% 機率**帶有變異」 | **REMOVE**。這同時是（a）未經驗證的自我基因檢測流程、（b）一個被憑空給出的 PPV 數字。v7 已要求移除自測法，但這個 70% 的診斷效能數字 v7 並未點出，危害更大。 |
| D-05 | `chapterA.ts:514` | `tier3`：「年過 40 歲應定期諮詢胃腸鏡食道癌篩檢」 | **REPLACE**。台灣公費五癌篩檢清單不含此項（§11.2 Taiwan Policy Registry 可機器比對）。改為症狀導向就醫建議。 |
| D-06 | `dietaryNutrientsData.ts:600` | 「消化道癌症（**食道癌風險飆升 50 倍**）」 | **REMOVE MAGNITUDE**。50 倍是極端分層（重度飲酒＋吸菸＋*1/*2）的上界，不能作為「慢性過量飲酒」的一般描述。 |
| D-07 | `dietaryNutrientsData.ts:642` | 「風險較正常基因者高出**數十倍**」 | **REPLACE WITH EFFECT OBJECT**。須帶劑量分層、吸菸分層、研究設計。 |
| D-08 | `dietaryPatterns.ts:317` | 「未補充者 **100% 走向**神經病變」 | **REVISE**。B12 缺乏確實可致不可逆神經病變，但 100% 發生率無實證，且違反本專案自訂語言規則。 |
| D-09 | `dietaryNutrientsData.ts:47` | 「游離果糖 **100% 進入肝臟**直接進入脂肪合成路徑」 | **REVISE**。果糖首過代謝以肝臟為主但非 100%，且 DNL 的定量貢獻在一般攝取量下有限。 |

## 1.5 語言規則本身有 bug（DEFECT-10）

v7 §27 禁止「完全不會」。但 `src/data/chapterA.ts:1872` 寫的是：

> 「減害協議…「**完全不會**」降低酒精作為 Group 1 致癌物引發…的基因突變機率。」

這句話在醫學上是**正確且必要的保護性陳述**（減害不等於降低致癌風險）。v7 的規則會誤殺它。

**v8 修正：語言規則必須帶極性（polarity-aware）。** 絕對化語彙在「否證一個保健宣稱」的方向上是允許的，在「承諾一個健康效益」的方向上禁止。→ §12.2 給出可執行的規則表。

## 1.6 效應量缺少定義（DEFECT-11）

`src/data/expertBestPractices.ts:1043`：「`RR = 5.13` (每日 >4 單位者食道癌暴增 413%)」

RR 5.13 存在但缺少：比較基準（vs 不飲酒？vs 輕度？）、「單位」的定義（台灣杯？NIAAA standard drink 14 g？）、是否校正吸菸、研究設計與族群。**RR 沒有 comparator 就沒有意義。** → §7.3 `EvidenceRecord.effect` 為結構化物件，`comparator` 為必填。

## 1.7 專案自我宣稱超出已驗證範圍（DEFECT-12）

`README.md:30`：「嚴格遵守 WCAG 2.2 **AAA** 高對比度標準」。repo 內沒有任何無障礙稽核產物、沒有 `scripts/`、沒有測試框架（`package.json` 僅 `dev` / `build` / `preview`）、`.github/workflows/` 僅 `deploy.yml`。v7 已建議改為 AA baseline，但 README 尚未修改，且**目前沒有任何 CI 能防止這類宣稱回歸**。

---

# 2. 第八代七輪迭代總表

| Round | 焦點 | 核心發現 | 交付物 |
|---|---|---|---|
| **R8.1** | Code Reality Audit | 藍圖與程式碼脫鉤；同一事實三處三值；頁面文案否證自身 KP | §1 的 12 個 DEFECT ＋ §14 逐行 Migration Queue |
| **R8.2** | Knowledge Atom v3 | 「明確知識點」需要可判定的定義，否則「明確」是形容詞不是規格 | §6 `assertion_kind` ＋ `KnowledgeAtom` schema ＋ 完整性閘 |
| **R8.3** | Evidence Computability | 手填 certainty 只是把假 GRADE 換個欄位名 | §7 `deriveCertainty()` 純函數 ＋ `EvidenceRecord.effect` 結構化 |
| **R8.4** | Numeric & Unit Engine | 醫學數字的危險不在數值，在脫離情境與被誤用 | §8 `QuantitativeClaim` ＋ `misuse_guard` ＋ Threshold Registry 種子資料 |
| **R8.5** | Safety Graph | 安全閘目前是人類讀的字串，模擬器攔不住 | §9 可求值 `Predicate` ＋ `SafetyGate` ＋ 模擬器合約 |
| **R8.6** | Retrieval & Serving | Archive 若不可被機器引用，就無法成為資產 | §10 Canonical Knowledge Pack ＋ §11 JSON-LD / JSONL 輸出 ＋ /explore 規格 |
| **R8.7** | Governance-as-Code | 沒有 CI 的治理章節等於沒有治理 | §12 語言／術語規則引擎 ＋ §15 24 條 VAL 規則 ＋ 風險分級 Freshness SLA |

---

# 3. R8.1 — 架構最終形：三層分離

v7 的鏈是線性的。實作上它必須是**三層**，否則 UI 會持續反向污染資料。

```text
┌─ LAYER 3  SERVING（可替換，不得儲存事實）
│   KnowledgePage view · Hub view · /explore · Simulator UI
│   knowledge-graph.json · claims.jsonl · sitemap
└─────────────────▲──────────────────────────────
                  │  buildPageFromRegistry() / selectors
┌─ LAYER 2  COMPOSITION（純函數，無 I/O）
│   deriveCertainty() · evaluateSafetyGate() · resolveThreshold()
│   coverageMatrix() · freshnessReport() · orphanScan()
└─────────────────▲──────────────────────────────
                  │  只讀
┌─ LAYER 1  SOURCE OF TRUTH（唯一可寫事實層）
│   Topic · Entity · KnowledgeAtom · Claim · QuantitativeClaim
│   EvidenceRecord · Source · BestPractice · Threshold
│   TaiwanPolicy · SafetyGate · Figure · Tool · Terminology
└────────────────────────────────────────────────
```

**三條不可違反的鐵律：**

1. Layer 3 不得含有 Layer 1 沒有的事實。任何數字、任何建議、任何族群限定都必須有 id 可追。
2. Layer 2 必須是純函數。`certainty`、`coverage`、`safety` 都是**算出來的**，不是填出來的 —— 因為填出來的東西會腐爛，算出來的東西會隨證據自動更新。
3. Layer 1 的每一筆記錄都必須能回答：**誰說的（source）、對誰成立（population）、什麼時候失效（next_review）、被誤用會怎樣（misuse_guard）**。

---

# 4. R8.2 — 「明確知識點」的可判定定義

這是本版對使用者需求「加入明確知識點」的正面回答。**「明確」不是文案風格，是一個可由 CI 判定的性質。**

一個知識點是「明確的」，若且唯若下列五項全部成立：

```text
E1  可歸類  assertion_kind ∈ {qualitative, quantitative, comparative,
                              procedural, diagnostic_boundary, policy, mechanism}
E2  可定量  若 assertion_kind = quantitative | diagnostic_boundary | policy
            → 必須綁定 ≥1 個 QuantitativeClaim 或 Threshold（不得只在句子裡寫數字）
E3  可歸屬  applicability.population 為結構化物件，非自由字串
E4  可追溯  claim → evidence → source 鏈完整，且 source.provenance_level ≥ verified-secondary
            （critical 內容要求 verified-primary）
E5  可反證  misuse_guard 明確寫出「這個知識點最常被誤用成什麼」
```

E5 是 v8 新增、也是最被低估的一項。Salud 的實際風險不是寫錯，而是**寫對了卻被讀成處方**。`30–35 mL/kg` 的問題不在數值，在於它被寫成「公式」（§1.2）。E5 讓「防誤用」成為資料的一部分，而不是文案的自覺。

## 4.1 KnowledgeAtom v3 Schema

```ts
export type AssertionKind =
  | 'qualitative'          // 方向性陳述，無關鍵數字
  | 'quantitative'         // 帶數值／範圍
  | 'comparative'          // A 相對於 B
  | 'procedural'           // 怎麼做
  | 'diagnostic_boundary'  // 切點／分級／判讀界線
  | 'policy'               // 政策／給付／法規
  | 'mechanism';           // 機制鏈

export type ProvenanceLevel =
  | 'verified-primary'      // 原始指引／原始論文，canonical_url 可直達具體文件
  | 'verified-secondary'    // 權威機構之衍生說明頁
  | 'unverified'            // 尚未查核
  | 'needs-provenance-review'; // 曾用過但無法穩定回溯

export type RiskClass =
  | 'R0'  // 一般教育內容
  | 'R1'  // 行為建議，低風險
  | 'R2'  // 涉及數值判讀、族群限定、藥食交互
  | 'R3'; // 涉及診斷／篩檢／劑量／危及生命情境

export interface Applicability {
  age_min?: number;
  age_max?: number;
  sex?: ('male' | 'female' | 'any')[];
  region: string[];                 // ['TW', 'global']
  physiological_state?: string[];   // ['pregnancy', 'lactation', 'athlete']
  include_conditions?: string[];    // entity_id
  exclude_conditions: string[];     // entity_id — 必填，空陣列必須是刻意的
  notes?: string;
}

export interface KnowledgeAtom {
  id: string;                       // KA-<DOMAIN>-<NNN>
  legacy_kp_ids: string[];          // 對映舊 KP-W-021 等，遷移期必填

  title: string;
  one_liner: string;                // ≤ 40 字
  assertion_kind: AssertionKind;
  depth: 'L1' | 'L2' | 'L3';
  risk_class: RiskClass;

  statement: string;
  why_it_matters: string;
  mechanism_chain?: string[];       // 機制型：逐步因果，每步可獨立標註證據
  common_misconception?: string;
  misuse_guard: string;             // ← E5，必填

  topic_ids: string[];
  entity_ids: string[];
  claim_ids: string[];              // ≥1
  quantitative_claim_ids: string[]; // E2 條件下 ≥1
  threshold_ids: string[];
  figure_ids: string[];
  best_practice_ids: string[];
  safety_gate_ids: string[];
  tool_ids: string[];

  applicability: Applicability;

  prerequisites: string[];          // KA id — 構成學習拓撲
  contradicts: string[];            // KA id — 必須雙向，CI 檢查對稱性
  supersedes?: string[];

  salud_evidence_tier?: 'A'|'B'|'C'|'D'|'E'; // 保留為內部相容欄位，UI 不得標示為 GRADE
  derived_certainty?: Certainty;              // 由 Layer 2 計算，不得手填
  certainty_override?: { value: Certainty; reason: string; by: string };

  last_reviewed: string;
  next_review: string;              // 由 risk_class 決定 SLA（§15.3）
  reviewed_by: string[];
  change_log: ChangeLogEntry[];
  status: 'active' | 'needs-review' | 'retired';
}
```

## 4.2 文案欄位必須有來源（修 DEFECT-02）

```ts
export interface DerivedCopy {
  text: string;
  derived_from: string;            // KA id 或 BP id — 必填
  copy_kind: 'life_hack' | 'clinical_pearl' | 'plain_analogy' | 'hook' | 'tier_action';
  simplification_note?: string;    // 若比來源更絕對，必須說明為何仍可接受
}
```

CI 規則 `VAL-011`：任何 `DerivedCopy` 若其 `text` 含數值，而 `derived_from` 所指 KA 的 `assertion_kind ≠ quantitative`，即為 error。這一條規則單獨就能攔住 §1.2 的 `life_hack` 缺陷。

---

# 5. R8.3 — 讓 certainty 變成算出來的

## 5.1 為什麼不能手填

v7 正確指出 A–E 會被誤讀成 GRADE，於是新增 `certainty` 欄位。但如果 `certainty` 還是人手填，v8 只是把同一個問題搬到新欄位 —— 188 個 KP × 人工判斷 = 188 個不可稽核的意見。

## 5.2 EvidenceRecord：讓判斷的**輸入**變成資料

```ts
export type StudyDesign =
  | 'guideline-recommendation' | 'systematic-review' | 'meta-analysis'
  | 'rct' | 'crossover-rct' | 'prospective-cohort' | 'case-control'
  | 'cross-sectional' | 'mechanistic-lab' | 'case-series'
  | 'expert-consensus' | 'modelling';

export type Domain = 'low' | 'moderate' | 'high' | 'unclear';

export interface EffectEstimate {
  measure: 'RR' | 'OR' | 'HR' | 'MD' | 'SMD' | 'AR' | 'prevalence' | 'none';
  point?: number;
  ci_low?: number;
  ci_high?: number;
  unit?: string;
  comparator: string;              // ← 必填。修 DEFECT-11
  exposure_definition?: string;    // 「1 單位」到底是幾克純酒精
  adjusted_for?: string[];         // ['smoking', 'betel nut', 'age']
}

export interface EvidenceRecord {
  id: string;
  source_id: string;
  design: StudyDesign;
  n?: number;
  population_described: string;    // 原文族群，照抄不美化
  effect?: EffectEstimate;

  risk_of_bias: Domain;
  directness: Domain;             // 研究族群/終點與本 claim 的距離
  consistency: Domain;
  precision: Domain;
  publication_bias?: Domain;

  applicability_caveats: string[]; // 例：「僅 ALDH2 野生型男性」
  retrieved_date: string;
}
```

## 5.3 deriveCertainty()：純函數，可測試

```ts
// Layer 2 · 無 I/O · 100% 單元測試覆蓋
export function deriveCertainty(records: EvidenceRecord[]): Certainty {
  if (records.length === 0) return 'not_rated';

  const base: Record<StudyDesign, number> = {
    'guideline-recommendation': 4, 'systematic-review': 4, 'meta-analysis': 4,
    'rct': 4, 'crossover-rct': 3,
    'prospective-cohort': 2, 'case-control': 2, 'cross-sectional': 1,
    'mechanistic-lab': 1, 'case-series': 1, 'expert-consensus': 1, 'modelling': 1,
  };

  let score = Math.max(...records.map(r => base[r.design]));

  // 降級：任一關鍵領域為 high 即扣分（取最佳研究的領域評分）
  const best = records.find(r => base[r.design] === score)!;
  for (const d of [best.risk_of_bias, best.directness,
                   best.consistency, best.precision]) {
    if (d === 'high') score -= 1;
    else if (d === 'unclear') score -= 0.5;
  }

  // 升級：多個獨立高等級設計一致
  const strong = records.filter(r => base[r.design] >= 3);
  if (strong.length >= 2 && strong.every(r => r.consistency === 'low')) score += 0.5;

  if (score >= 3.5) return 'high';
  if (score >= 2.5) return 'moderate';
  if (score >= 1.5) return 'low';
  return 'very_low';
}
```

**設計要點：** `directness` 是本函數最重要的欄位，而 v7 完全沒有它。舉例（§10.C-07）：反駁「酒配水解酒」的 2026 隨機交叉試驗設計良好，但受試者是 **13 名 ALDH2 野生型日本男性**。對「台灣近半數 ALDH2 缺失者」這個 claim 而言 `directness = 'high'`（距離大），必須降級。少了這個欄位，Salud 會用一份 n=13 的研究對一個它並未涵蓋的族群下高確定性結論 —— 那和它正在反駁的過度宣稱是同一種錯誤。

## 5.4 治理指標

`certainty_override_rate` 必須 < 10%，且每一筆 override 進 Review Queue。若超過 10%，代表 `deriveCertainty()` 的權重需要調整，而不是繼續 override。

---

# 6. R8.4 — Numeric & Unit Engine

## 6.1 QuantitativeClaim

```ts
export type ValueKind =
  | 'point'        // 單一定義值（如診斷切點 A1C 6.5%）
  | 'range'        // 生理區間（如總體水 50–60%）
  | 'bound'        // 上限／下限（如 SFA <10%E）
  | 'distribution' // 帶分布的族群統計
  | 'heuristic';   // 拇指法則 — UI 必須以不同樣式呈現

export interface QuantitativeClaim {
  id: string;
  parameter: string;              // 'total_body_water_fraction'
  value_kind: ValueKind;
  value?: number;
  low?: number;
  high?: number;
  unit: string;                   // UCUM：'%', 'mg/dL', 'mL/kg/d', 'mmHg', 'g/d'
  comparator?: '<' | '<=' | '=' | '>=' | '>' | 'range';

  relative_to?: string;           // '%E' → 'total_energy_intake'（修 O-023 的克數陷阱）
  derivation?: string;            // 「2000 kcal × 10% ÷ 9 kcal/g ≈ 22 g」
  uncertainty?: { kind: 'ci95'|'sd'|'expert-range'|'none'; low?: number; high?: number };

  applicability: Applicability;
  guideline_version?: string;
  effective_from?: string;
  effective_to?: string;

  evidence_ids: string[];
  misuse_guard: string;           // 必填
  is_individual_prescription: false; // 型別層級的常數 — 永遠為 false
}
```

`is_individual_prescription: false` 被寫成**字面型別**：任何試圖把某個數字宣告為個人處方的 commit 會直接編譯失敗。這比在 UI 加免責聲明強得多。

## 6.2 `relative_to` 解決一個 v7 只提到卻沒建模的真實陷阱

WHO 的 SFA <10%E 是**比例**。目前把它顯示為「22 g」對 1200 kcal 的長者與 3000 kcal 的運動員都是錯的。`relative_to: '%E'` ＋ `derivation` 讓 UI 有義務同時渲染比例與該使用者情境下的克數，並標註換算式。

## 6.3 `value_kind: 'heuristic'` 是 §1.2 的結構性解法

`30–35 mL/kg` 被標記為 `heuristic` 後：

- UI 以「經驗法則」樣式呈現（虛線框、灰階、不可作為模擬器主輸出）
- `misuse_guard`：「不可外推至極端體重；120 kg 者會得出 4.2 L，超過多數人的安全攝取步調」
- `SIM-HYDRATION` 不得以此為 baseline 公式，只能作為對照參考線

---

# 7. R8.5 — Safety & Contraindication Graph

## 7.1 可求值的謂詞

```ts
export type Predicate =
  | { op: 'has_condition'; entity_id: string }
  | { op: 'age_gte'; value: number }
  | { op: 'age_lt'; value: number }
  | { op: 'sex_is'; value: 'male' | 'female' }
  | { op: 'state_is'; value: string }              // pregnancy 等
  | { op: 'param_gt'; parameter: string; value: number; unit: string }
  | { op: 'param_lt'; parameter: string; value: number; unit: string }
  | { op: 'medication'; atc: string }
  | { op: 'and'; all: Predicate[] }
  | { op: 'or'; any: Predicate[] }
  | { op: 'not'; of: Predicate };

export interface SafetyGate {
  id: string;
  severity: 'info' | 'caution' | 'gated' | 'hard_block';
  trigger: Predicate;
  applies_to: { atom_ids?: string[]; bp_ids?: string[]; tool_ids?: string[] };
  reader_message: string;
  clinical_rationale: string;
  evidence_ids: string[];
  red_flag_symptoms?: string[];
  escalation: 'self_monitor' | 'consult_clinician' | 'urgent_care' | 'emergency_119';
  last_reviewed: string;
}
```

## 7.2 模擬器合約（把 v7 §20 的禁令變成型別）

```ts
export interface SimulatorContract<I, O> {
  id: string;
  inputs_schema: JSONSchema;
  assumptions: string[];            // 逐條可引用
  model_description: string;
  evidence_ids: string[];

  output_kind: 'educational_estimate';   // 字面型別 — 不存在 'diagnosis' 選項
  uncertainty_band: (o: O) => { low: number; high: number; basis: string };

  excluded_population: Predicate;   // 命中即拒絕輸出，不是只顯示警語
  gates: string[];                  // SafetyGate id
  last_validated: string;
  validation_method: string;        // 對照哪個資料集／指引驗證
}
```

關鍵差異：`excluded_population` 是**謂詞**。`SIM-HYDRATION` 目前有「限水族群安全閘」，但那是人類讀的提示；改為謂詞後，心衰竭／CKD G4–G5／肝硬化／SIADH 使用者輸入即被攔在計算之前。

## 7.3 對現有模擬器的具體要求

| Simulator | 必須新增的 `excluded_population` | 必須新增的 uncertainty basis |
|---|---|---|
| `SIM-HYDRATION` | HF、CKD G4–G5、肝硬化併腹水、SIADH、臨床限水醫囑 | 現有 ±0.3 L 需寫明來源與推導 |
| `SIM-BAC` | < 18 歲、懷孕、服用 metronidazole/cefotetan 等會引發 disulfiram 反應者、ALDH2 *2/*2 | Widmark 模型的 r 值族群變異 |
| `SIM-OIL-SWAP` | 需極低脂飲食之胰臟疾病者 | 油品脂肪酸組成之批次變異 |
| `SIM-COOK-TEMP` | — | 煙點量測法差異（精製度、游離脂肪酸含量） |
| `SIM-WEIGHT-TRAJECTORY` | 懷孕、進食障礙病史、< 18 歲 | 代謝適應係數的個體變異 |

`SIM-BAC` 的 ALDH2 *2/*2 排除是本輪新增的重要安全發現：BAC 模型描述的是**乙醇**動力學，對 ALDH2 缺失者而言，真正的毒性負擔是**乙醛**，BAC 數值正常不代表安全。給 *2/*2 使用者一個「還在安全範圍」的 BAC 讀數，是模型適用邊界外的誤導。

---

# 8. R8.6 — Canonical Knowledge Pack（明確知識點資料包）

以下 82 條為 v8 交付的**可引用知識點種子**。格式：

> **`KA-id`** · `assertion_kind` · `risk_class` · 陳述 · 〔族群〕 · 〔來源〕 · 〔certainty〕 · ⚠ misuse_guard

所有標 `⚑` 者為 `needs-provenance-review`，**不得在完成原始文件回溯前上線**。這正是架構的用處：知識點可以先入庫，但無法繞過閘門發佈。

## 8.A 血壓（Tier 1 核心節點，repo 目前最薄弱）

- **KA-BP-001** · diagnostic_boundary · R3 — 成人血壓分級（2025 AHA/ACC）：正常 <120/<80；升高 120–129/<80；第 1 期 130–139 或 80–89；第 2 期 ≥140 或 ≥90 mmHg。〔成人，global〕〔AHA/ACC 2025〕〔high〕 ⚠ 單次診間量測不足以分級；須符合標準量測程序之多次平均。
- **KA-BP-002** · policy · R3 — 2025 指引維持一般成人治療目標 **<130/80 mmHg**。〔成人〕〔AHA/ACC 2025〕〔high〕 ⚠ 懷孕、機構照護、預期餘命有限者另有考量，不可一律套用。
- **KA-BP-003** · quantitative · R2 — 2025 指引改用 **PREVENT** 風險方程，高風險閾值由 pooled cohort equations 的 10 年 ≥10% 下調為 PREVENT 10 年 **≥7.5%**。〔成人〕〔AHA/ACC 2025〕〔moderate〕 ⚠ PREVENT 與 PCE 分數不可互換比較；閾值改變不等於風險本身改變。
- **KA-BP-004** · procedural · R2 — 第 1 期高血壓且低心血管風險（PREVENT <7.5%）者，先行 **3–6 個月**生活型態調整；若平均血壓仍 ≥130/80 再起始藥物。〔成人〕〔AHA/ACC 2025〕〔moderate〕 ⚠ 已有 CVD、CKD、糖尿病或 PREVENT ≥7.5% 者不適用此觀察期。
- **KA-BP-005** · mechanism · R1 — 機制鏈：鈉負荷↑ → 細胞外液量↑ → 心輸出↑／血管阻力重設 → 壓力自然尿鈉排泄曲線右移 → 維持恆定所需血壓↑。〔一般生理〕〔教科書層級〕〔moderate〕 ⚠ 鈉敏感性個體差異大，不可推論「每個人減鈉都會降同樣幅度」。

## 8.B 血糖（Tier 1）

- **KA-GL-001** · diagnostic_boundary · R3 — 糖尿病診斷任一項成立：A1C **≥6.5%**（≥48 mmol/mol）；FPG **≥126 mg/dL**（≥7.0 mmol/L）；75 g OGTT 2 小時 PG **≥200 mg/dL**；或典型高血糖症狀／高血糖危症下隨機血糖 ≥200 mg/dL。〔成人〕〔ADA SoC 2026 §2〕〔high〕 ⚠ 無症狀者需兩項異常結果（同一樣本之兩種檢驗或兩次採樣）方能確診；A1C 須用 NGSP 認證方法。
- **KA-GL-002** · diagnostic_boundary · R3 — 糖尿病前期：A1C **5.7–6.4%**；IFG 為 FPG 100–125 mg/dL；IGT 為 OGTT 2 小時 140–199 mg/dL。〔成人〕〔ADA SoC 2026〕〔high〕 ⚠ 「糖尿病前期」是風險狀態，不是疾病診斷，也不代表必然進展。
- **KA-GL-003** · policy · R2 — 建議所有成人自 **35 歲**起篩檢糖尿病前期與第 2 型糖尿病。〔成人，US 指引〕〔ADA SoC 2026〕〔high〕 ⚠ 有過重／肥胖及其他風險因子者更早；此為美國指引，台灣成人預防保健之給付年齡另計（KA-TW-006）。
- **KA-GL-004** · context · R2 — ADA 2026 起改為**活體指引（living guideline）**模式，全年線上更新。〔—〕〔ADA 2026〕〔high〕 ⚠ 架構含意：任何引用 ADA 的 Threshold 必須帶 `guideline_version` 與 `retrieved_date`，年度快照式引用已不再足夠。
- **KA-GL-005** · quantitative · R2 — A1C 反映約前 **8–12 週**平均血糖，主要受紅血球壽命與更新速率影響。〔一般成人〕〔教科書層級〕〔moderate〕 ⚠ 血液疾病、近期輸血、缺鐵、懷孕、血紅素變異體與尿毒症均可使 A1C 失真 —— 這些情境下 A1C 不可作為單一判讀依據。

## 8.C 血脂（Tier 1）

- **KA-LP-001** · diagnostic_boundary · R3 — 2026 ACC/AHA/多學會血脂指引採階梯式 LDL-C 目標：一般為 **<100 mg/dL**；具特定風險因子或曾發生事件者 **<70 mg/dL**；極高風險者 **<55 mg/dL**（並搭配 non-HDL-C <85 mg/dL）。〔成人〕〔2026 ACC/AHA Multisociety〕〔high〕 ⚠ 「目標」屬治療決策範疇，非自我判讀門檻；風險分層須由臨床評估。
- **KA-LP-002** · policy · R2 — 2026 指引首次建議**每位成人一生至少量測一次 Lp(a)**，並對家族進行階梯式檢測。〔成人〕〔2026 ACC/AHA Multisociety〕〔high〕 ⚠ Lp(a) 主要由基因決定，目前生活型態調整對其影響有限；高值的意義在於**風險分層**，不是「需要立刻降 Lp(a)」。
- **KA-LP-003** · quantitative · R2 — Lp(a) **>125 nmol/L** 約對應 1.4 倍、**>250 nmol/L** 約對應 ≥2 倍 ASCVD 風險。〔成人〕〔2026 指引〕〔moderate〕 ⚠ nmol/L 與 mg/dL 不可用固定係數互換（顆粒大小異質性）；跨檢驗室比較前須確認單位與方法。
- **KA-LP-004** · quantitative · R2 — 已達 LDL-C 與 non-HDL-C 目標後，apoB 量測在 **TG >200 mg/dL**、糖尿病、或 LDL-C 已 <70 mg/dL 者最有助於再分層；apoB 檢驗已標準化且不受空腹狀態影響。〔成人〕〔2026 指引〕〔moderate〕 ⚠ apoB 是每顆緻密顆粒計數一次的「顆粒數」指標，與 LDL-C 這個「膽固醇含量」指標不是同一件事，兩者不一致（discordance）才是它的價值所在。
- **KA-LP-005** · comparative · R2 — 以不飽和脂肪**等熱量替代**飽和脂肪對 LDL-C 的降幅，比單純限制膳食膽固醇更一致。〔多數成人〕〔2026 血脂指引；WHO 2023〕〔moderate〕 ⚠ 不可簡化為「膽固醇吃多少都沒差」；家族性高膽固醇血症、已知高 LDL-C 者及膳食膽固醇高反應者須個別評估。（取代 repo 中「人體 75–80% 自己製造」的因果簡化）

## 8.D 鈉、鉀與體液

- **KA-NA-001** · bound · R2 — WHO 建議成人每日鈉 **<2000 mg**（相當於食鹽 <5 g），鉀 **≥3510 mg**。〔成人〕〔WHO 2013 鈉／鉀指引〕〔high〕 ⚠ 鉀建議**不適用**於 CKD 中晚期、使用 RAAS 抑制劑或保鉀型利尿劑者 —— 對這些族群高鉀可能致命。任何「多吃鉀」的 Best Practice 必須綁定 `SafetyGate`。
- **KA-W-001** · range · R2 — 成人總體水約占體重 **50–60%**，比例隨年齡、性別、體脂與瘦體組織量變動。〔成人〕〔生理學教科書層級〕〔moderate〕 ⚠ 這是族群範圍，不是任何個人的固定值，也不可反推「你該喝多少」。
- **KA-W-002** · range · R2 — 美國 National Academies 的**總水分** AI：男性 **3.7 L/d**、女性 **2.7 L/d**，且已**包含食物與所有飲品**。〔健康成人，US〕〔NASEM (IOM) 2005〕〔high〕 ⚠ AI 是族群參考攝取量，不是個人目標；把它讀成「每天要喝 3.7 L 白水」會系統性高估需求約 20–30%（食物來源）。
- **KA-W-003** · range · R2 — EFSA 參考值（溫和氣候、中度活動）：男性總水 **2.5 L/d**、女性 **2.0 L/d**。〔成人，EU〕〔EFSA 2010〕〔high〕 ⚠ 與 KA-W-002 的差異主要來自族群與方法學，不是「其中一個錯了」——並列呈現兩者本身就是重要的知識點。
- **KA-W-004** · heuristic · R2 — 「體重(kg) × 30–35 mL/d」為台灣常見**經驗法則**，非官方指引。〔一般成人〕〔專家共識層級〕〔low〕 ⚠ 不可外推至極端體重（120 kg → 4.2 L）；不可作為模擬器 baseline；不得標示為「公式」。（直接取代 `chapterW.ts:587`）
- **KA-W-005** · qualitative · R2 — 口渴是重要且在多數日常情境下足夠的飲水訊號；高溫作業、長時間運動、發燒、嘔吐腹瀉、高齡口渴感遲鈍與特定疾病情境下需要更完整評估。〔成人〕〔CDC；EAH 共識 2015〕〔moderate〕 ⚠ 「不要等口渴」對一般健康成人是**過度絕對化**；耐力運動情境的國際共識恰恰支持「依口渴飲水」以避免運動相關低血鈉。（直接取代 `chapterW.ts:288`）
- **KA-W-006** · comparative · R2 — 水合線索應多元並置：晨起體重趨勢、口渴、尿色／頻率、運動與熱暴露、症狀 —— 合起來做**情境判讀**，不構成診斷規則。〔成人〕〔尿液指標系統性回顧 2020〕〔low〕 ⚠ 「三項中出現兩項即代表缺水」是被創造出來的診斷規則，無實證支持；尿色受 B 群維生素、含咖啡因飲品、藥物與晨尿濃縮影響。（直接取代 `chapterW.ts:752` 的 WUT 兩項規則）
- **KA-W-007** · bound · R3 ⚑ — 短時間大量攝入低張液體可能超過當下排除自由水的能力而導致低鈉血症；排水能力受腎功能、溶質攝取、ADH（抗尿激素）抑制程度與飲水速率共同決定。〔成人〕〔needs-provenance-review：需回溯原始腎臟生理量測文獻〕〔low〕 ⚠ 現行 repo 的「0.8–1.0 L/h」不可作為個人安全上限；本知識點在取得原始文獻前只能以定性方式呈現。（取代 `chapterW.ts:1068`）
- **KA-W-008** · quantitative · R2 — 失水超過體重 **2%** 即開始削弱有氧運動表現。〔運動員／運動情境〕〔ACSM 2007 Position Stand〕〔moderate〕 ⚠ 此閾值來自運動表現終點，不是健康或臨床脫水的診斷閾值。
- **KA-W-009** · procedural · R2 — 運動相關低鈉血症（EAH）國際共識：長時間運動應**依口渴飲水**，避免超量強灌低張液體。〔耐力運動者〕〔EAH 共識 2015〕〔high〕 ⚠ 這條與「運動要多喝水」的常識相反，且方向是**救命的**：EAH 死亡案例多來自過度飲水，不是脫水。
- **KA-W-010** · qualitative · R1 — 日常份量的咖啡與茶仍會淨貢獻液體攝取；但高劑量咖啡因可增加急性排尿，與純水並非完全等同。〔習慣飲用之成人〕〔淨水分平衡研究〕〔moderate〕 ⚠ 兩個方向的誤讀都要防：「含咖啡因所以完全不算水」與「咖啡完全等於水」皆不成立。

## 8.E 脂肪與食用油

- **KA-O-001** · bound · R2 — WHO 2023 指引：成人與兒童飽和脂肪酸攝取 **<10%E**、反式脂肪 **<1%E**，並應以不飽和脂肪取代。〔成人與兒童，global〕〔WHO 2023〕〔high〕 ⚠ `%E` 是相對總熱量的比例。`relative_to: '%E'`，UI 必須同時顯示換算式（2000 kcal → 約 22 g SFA/d）與「不同總熱量得到不同克數」。
- **KA-O-002** · comparative · R2 — 所有天然植物油與動物脂都是 SFA／MUFA／PUFA 的**混合體**；「好油／壞油」描述的是比例光譜上的主導者。〔—〕〔USDA FDC；TFDA 食品成分資料庫〕〔high〕 ⚠ 不存在 100% 單一脂肪酸的天然食用油。
- **KA-O-003** · qualitative · R2 — 煙點是**烹調過熱的實務訊號**，與（a）油脂的氧化穩定性、（b）長期健康結果，是三件不同的事，不可串成單一排名。〔—〕〔2024 植物油加熱降解回顧〕〔moderate〕 ⚠ 「煙點最高所以最健康」是把三個變數壓成一個維度；煙點還受精製度與游離脂肪酸含量影響，同一種油不同批次可差數十度。
- **KA-O-004** · policy · R3 — 台灣油炸油稽查實務：先以**酸價**初篩，酸價 **>2.0** 者加驗**總極性化合物（TPC）**，TPC **>25%** 為不符規定。檢驗方法為 2011 年公告之食用油脂總極性化合物檢驗方法（署授食字第 1001900044 號）。〔台灣餐飲業〕〔衛福部／TFDA〕〔moderate〕 ⚑ 需以 canonical 法規／公告頁面取代目前 `sources.ts` 中的 `https://www.fda.gov.tw/` 首頁連結。 ⚠ 這是**業者稽查標準**，不是家庭廚房的判讀工具；家用情境的可行訊號是油色深化、黏稠、起泡與異味。
- **KA-O-005** · quantitative · R1 — 1 茶匙油 ≈ 5 g ≈ 45 kcal。〔—〕〔食品成分資料庫〕〔high〕 ⚠ 換算值，非建議攝取量。

## 8.F 酒精與 ALDH2

- **KA-A-001** · qualitative · R3 — IARC 將酒精飲料及與酒精飲料相關之乙醛列為 **Group 1 致癌物**；WHO 明確指出就癌症風險而言無法建立安全攝取量。〔—〕〔IARC；WHO〕〔high〕 ⚠ Group 1 代表「致癌性證據充分」，**不代表**不同 Group 1 物質的毒性強度相同。不要用「和石綿同級」這類聳動類比。
- **KA-A-002** · range · R2 — ALDH2 rs671（Glu504Lys）之 *2/*2 基因型酵素活性近 **0%**；*1/*2 的殘餘活性在不同量測方法與組織下報告為 **約 10% 至 17–38%** 之間。〔東亞族群〕〔藥物基因體學原始文獻〕〔moderate〕 ⚠ 這是**方法學依賴的範圍**，不是固定生理常數。repo 現行的「10–20%」與「不到 10%」都是把範圍偽裝成點值（修 DEFECT-01）。
- **KA-A-003** · distribution · R2 — rs671 變異在東亞不同次族群的發生率約 **30–57%**；台灣為全球最高之一，約 **45–47%** 的人口為 ALDH2 活性下降者。〔台灣／東亞〕〔ALDH2 流病文獻；台灣世代研究〕〔moderate〕 ⚠ **必須區分「等位基因頻率（allele frequency）」與「基因型／帶因者盛行率（genotype prevalence）」**。「47% 帶有 A 等位基因」指的是帶因者比例，對應的等位基因頻率約 0.27–0.30 —— 兩者混用會在 Hardy-Weinberg 推算上產生成倍誤差。Registry 必須分欄儲存，並記錄 sample year / ancestry / n / 抽樣方法 / 不確定區間。
- **KA-A-004** · qualitative · R3 — 飲酒後明顯臉紅與 ALDH2 低活性高度相關，是有價值的**風險警示線索**，但不是基因型確診工具。〔東亞族群〕〔ALDH2 文獻〕〔moderate〕 ⚠ **禁止**任何自我基因檢測流程與其診斷效能數字。`chapterA.ts:496` 的「70% 酒精棉花貼 15 分鐘 → 約 70% 機率帶有變異」須完全移除：它既是未經驗證的自測法，又給了一個憑空的 PPV（修 DEFECT-04）。
- **KA-A-005** · comparative · R3 — ALDH2 缺失併中重度飲酒（尤加上吸菸）與食道鱗狀細胞癌風險顯著上升，且風險倍數**強烈取決於酒精克數與吸菸分層**。〔東亞族群〕〔病例對照／世代研究〕〔moderate〕 ⚠ 「50 倍」「數十倍」不可作為一般性描述（修 DEFECT-06/07）。任何倍數必須帶 `EffectEstimate.comparator` 與 `exposure_definition`。
- **KA-A-006** · policy · R3 — 台灣公費五癌篩檢清單**不包含**以「ALDH2 臉紅＋年過 40」為條件的一般性食道內視鏡篩檢。〔台灣〕〔HPA 篩檢政策〕〔high〕 ⚠ 正確的替代是**症狀導向**：吞嚥困難／疼痛、持續胸骨後不適、體重不明下降者應接受醫療評估；高風險個體是否加做檢查由臨床專業依個人風險判斷。（修 DEFECT-05）
- **KA-A-007** · qualitative · R2 — 「喝酒配水」不能被描述為降低乙醛、解酒或大幅減輕宿醉。2026 年一項隨機交叉試驗（**n=13，ALDH2 野生型日本男性**，清酒相當純酒精 1.3 g/kg，水 15 mL/kg，追蹤 15 小時）顯示：交替飲水未改變呼氣乙醇與乙醛的時間曲線，精神動作速度與隔日症狀亦無有意義改善；2024 系統性回顧同樣指出飲水對宿醉的改善有限。〔見 misuse_guard 的適用限制〕〔Front Pharmacol 2026；2024 系統性回顧〕〔low–moderate〕 ⚠ **雙向誤用都要防**：（a）不可繼續宣稱配水能解酒（修 `chapterW.ts:1385`）；（b）**也不可**把這份 n=13 全男性、全 ALDH2 野生型的研究當成對台灣近半數 ALDH2 缺失者的高確定性結論 —— `directness = high`，certainty 須降級。水仍可補充液體，這一點未被否證。
- **KA-A-008** · qualitative · R2 — 「酒量變好」反映中樞神經對酒精的耐受（GABA／NMDA 受體代償），ALDH2 的酵素活性並未改變，乙醛的組織暴露不因此減少。〔長期飲酒者〕〔神經藥理學文獻〕〔moderate〕 ⚠ 耐受性提升會導致攝入量增加，淨致癌暴露可能**上升**。
- **KA-A-009** · qualitative · R3 — 任何減害措施（配水、墊胃、控速）只能削平急性血中酒精峰值與隔日負擔，不會降低酒精作為 Group 1 致癌物的長期風險 —— 致癌風險對應的是**純酒精總克數**。〔—〕〔IARC/WHO〕〔high〕 ⚠ 這是**允許使用絕對化語彙的方向**（否證保健宣稱），見 §12.2 極性規則。反向誤用是把減害協議讀成「照做就可以多喝」。

## 8.G 身體組成與體位（台灣）

- **KA-TW-001** · diagnostic_boundary · R2 — 台灣成人體位標準（18 歲以上）：過輕 BMI <18.5；正常 18.5 ≤ BMI <24；過重 24 ≤ BMI <27；肥胖 BMI ≥27。〔台灣成人〕〔衛福部／HPA〕〔high〕 ⚠ 台灣切點**低於** WHO 國際切點（25／30），因東亞族群在較低 BMI 即呈現代謝風險上升。跨國文獻比較時不可混用兩套切點 —— 這是 repo 中最容易產生隱性錯誤的一組數字。
- **KA-TW-002** · diagnostic_boundary · R2 — 腹部肥胖：男性腰圍 ≥90 cm、女性 ≥80 cm。即使 BMI 未超標，腰圍超標仍屬風險族群。〔台灣成人〕〔衛福部〕〔high〕 ⚠ 量測位置與時機（肋骨下緣與髂骨上緣中線、呼氣末）會造成數公分差異，須在 Threshold 的 `context` 欄位記錄量測方法。
- **KA-TW-003** · quantitative · R1 — BMI 不區分脂肪與瘦體組織、不反映脂肪分布。〔—〕〔方法學共識〕〔high〕 ⚠ 高瘦體組織者可能被誤分類為過重；這不代表 BMI 在族群層級無用，而是個人判讀需搭配腰圍與臨床評估。

## 8.H 腎臟

- **KA-KD-001** · diagnostic_boundary · R3 — CKD 定義為腎臟結構或功能異常持續 **≥3 個月**且對健康有影響；分類採 **CGA**（Cause、GFR 分期 G1–G5、白蛋白尿分期 A1–A3）。〔成人〕〔KDIGO 2024〕〔high〕 ⚠ 單次 eGFR 偏低不等於 CKD —— 「持續 3 個月」是定義的一部分，這也是最常被跳過的一項。
- **KA-KD-002** · diagnostic_boundary · R3 — GFR 分期（mL/min/1.73 m²）：G1 ≥90、G2 60–89、G3a 45–59、G3b 30–44、G4 15–29、G5 <15。白蛋白尿分期（UACR, mg/g）：A1 <30、A2 30–300、A3 >300。〔成人〕〔KDIGO 2024〕〔high〕 ⚠ G1／G2 若無其他腎損傷標記則不構成 CKD；風險由 GFR × 白蛋白尿的**熱圖矩陣**共同決定，不可只看 eGFR 一個軸。
- **KA-KD-003** · procedural · R3 — Salud 的體液與鉀相關 Best Practice 必須以 KDIGO 分期作為 `SafetyGate` 的謂詞參數。〔台灣成人〕〔架構決策〕〔—〕 ⚠ 「多喝水」與「多吃鉀」對 G4–G5 族群方向相反且可能危險。這是 §9 安全圖譜存在的主要理由。

## 8.I 身體活動與睡眠

- **KA-PA-001** · range · R2 — WHO 2020：成人每週應進行 **150–300 分鐘**中等強度、或 **75–150 分鐘**高強度有氧活動，或等量組合。〔成人〕〔WHO 2020〕〔high〕 ⚠ 這是族群健康建議的區間，非「達到 300 分鐘才算合格」；由 0 提升到任何量的效益斜率最陡。
- **KA-PA-002** · procedural · R2 — 成人每週應有 **≥2 天**針對所有主要肌群的中等或更高強度肌力訓練。〔成人〕〔WHO 2020〕〔high〕 ⚠ 肌力訓練的建議常在「有氧為主」的敘事中被省略，而它對長者失能與代謝結果有獨立效益。
- **KA-PA-003** · procedural · R2 — 長者應在上述基礎上加入強調**平衡與協調**的活動以降低跌倒風險。〔≥65 歲〕〔WHO 2020〕〔high〕 ⚠ —
- **KA-PA-004** · qualitative · R1 — WHO 建議減少久坐行為，但**證據不足以訂出久坐時數閾值**。〔所有年齡〕〔WHO 2020〕〔moderate〕 ⚠ 任何「久坐超過 X 小時就會 Y」的具體數字目前都缺乏指引層級支持；這是誠實說「沒有數字」的範例。
- **KA-SL-001** · bound · R2 — AASM 共識：成人為維持最佳健康，應規律睡眠 **≥7 小時/夜**。〔成人〕〔AASM 共識〕〔moderate〕 ⚠ 這是族群下界建議，不是「睡 7 小時就足夠」也不是「睡 6.5 小時必然生病」；長期睡眠需求個體差異存在，且共識未訂上界建議。

## 8.J 台灣公共衛生政策（`TaiwanPolicyObject` 種子）

政策物件必須帶 `effective_from`、`policy_version`、`canonical_url`、`retrieved_date`，並在 UI 上與醫學證據**視覺分離** —— 政策會改，生理不會。

- **KA-TW-004** · policy · R3 — **大腸癌**：45–74 歲，以及 40–44 歲具一親等（父母、子女、兄弟姊妹）大腸癌家族史者，每 **2 年 1 次**定量免疫法糞便潛血檢查（FIT）。〔台灣〕〔HPA〕〔high〕 ⚠ FIT 陽性須接受大腸鏡確診；FIT 陰性不排除症狀者需就醫。
- **KA-TW-005** · policy · R3 — **乳癌**：自 114 年（2025）起由原 45–69 歲擴大為 **40–74 歲**婦女，每 **2 年 1 次**乳房 X 光攝影。〔台灣〕〔HPA／衛福部〕〔high〕 ⚠ 本項在 2025 年改變過 —— 任何引用舊「45–69」範圍的內容即為過期政策，這正是 Policy Registry 需要 `supersedes` 欄位的原因。
- **KA-TW-006** · policy · R3 — **口腔癌**：30 歲以上有嚼檳榔（含已戒）或吸菸習慣者；18 歲以上有嚼檳榔（含已戒）習慣之原住民，每 **2 年 1 次**口腔黏膜檢查。〔台灣〕〔HPA〕〔high〕 ⚠ —
- **KA-TW-007** · policy · R3 — **子宮頸癌**：114 年起增列 **25–29 歲**女性每 **3 年 1 次**子宮頸抹片檢查。〔台灣〕〔HPA〕〔moderate〕 ⚑ 30 歲以上族群之現行補助頻率須以 HPA canonical 頁面確認後方可上線。
- **KA-TW-008** · policy · R3 ⚑ — **肺癌 LDCT**：具肺癌家族史者與重度吸菸者（20 包-年以上）每 2 年 1 次低劑量電腦斷層。〔台灣〕〔HPA〕〔needs-provenance-review〕 ⚠ **本輪研究中，不同二手來源對適用年齡區間給出互相衝突的讀法**（家族史組的男女年齡下限有 45/50 與 40/45 兩種版本）。依 §4 E4，此項**不得上線**，直到取得 HPA canonical 公告確認。這是 Provenance Gate 的第一個真實攔阻案例，也是本架構價值的最佳示範：**寧可標記為不可發佈，也不要發佈一個看起來合理的年齡。**
- **KA-TW-009** · context · R2 — 台灣口腔癌與食道癌發生率長年居國際前列，主因為菸、酒、檳榔的併用暴露。〔台灣〕〔癌症登記／HPA〕〔moderate〕 ⚠ 三者併用為**相乘**而非相加效應；單獨戒除其中之一仍有顯著效益，不應被解讀為「要全戒才有用」。

## 8.K 架構型知識點（給維護者，不面向讀者）

- **KA-META-001** — 任何在 repo 中出現 **≥2 次**的醫學數字，必須有唯一 `QuantitativeClaim` id；重複出現處只能引用 id。（DEFECT-01 的結構性防線）
- **KA-META-002** — 任何縮寫在同一資料陣列中若可能有多種展開（ADH、CRP、PT、BP…），必須在 `TerminologyRegistry` 註冊且首次出現處展開。（DEFECT-03）
- **KA-META-003** — 任何效應量（RR/OR/HR）必須帶 `comparator` 與 `exposure_definition`，否則 CI error。（DEFECT-11）
- **KA-META-004** — 任何專案自我宣稱（無障礙等級、審閱狀態、KP 數量）必須有對應的自動化產出物支撐，否則須改為 baseline 陳述。（DEFECT-12）
- **KA-META-005** — 政策知識點與生理知識點在 UI 上必須視覺可區分，且政策物件必須顯示 `effective_from`。

---

# 9. R8.6（續）— Serving Layer：讓 Archive 可被引用

## 9.1 機器可讀輸出

build 時由 Layer 1 生成，納入部署產物：

```text
dist/
├── api/
│   ├── knowledge-graph.json     // 完整節點與關係（JSON-LD，@type 對映 schema.org/MedicalEntity）
│   ├── atoms.jsonl              // 一行一個 KnowledgeAtom，含 claim/evidence/source id
│   ├── claims.jsonl             // 一行一個 Claim ＋ derived_certainty ＋ population
│   ├── thresholds.json          // 可被外部工具直接查詢的數值切點
│   ├── taiwan-policies.json     // 帶 effective_from / supersedes
│   ├── terminology.json
│   └── coverage.json            // 治理指標快照
└── (現有站台檔案)
```

**為什麼這一層值得做：** Salud 真正稀缺的資產不是頁面，而是「帶族群、帶不確定度、帶台灣政策情境、帶誤用防護的結構化健康知識」。以 JSONL 形式輸出後，它可以被引用、被 diff、被第三方工具（含語言模型檢索）當作有出處的來源使用；而 `misuse_guard` 與 `applicability` 欄位正是一般健康網站被檢索時最容易丟失的部分。

## 9.2 /explore 規格（比 v7 更具體）

檢索單位為 **KnowledgeAtom**（不是頁面），並支援三種模式：

```text
1. 事實檢索   「成人血壓第一期是多少」→ 直接回傳 KA-BP-001 ＋ 來源 ＋ 量測前提
2. 族群檢索   「CKD 可以做的水分建議」→ 以 Applicability 謂詞過濾，自動隱藏被 SafetyGate 攔下的 BP
3. 反向檢索   「我聽說喝水能解酒」→ 命中 KA-A-007 的 misuse_guard，回傳否證與其適用限制
```

Facets：`topic` / `risk_class` / `assertion_kind` / `certainty` / `population` / `region` / `provenance_level` / `last_reviewed`。

**`provenance_level` 作為公開 facet** 是 v8 的刻意設計：讓讀者可以只看 `verified-primary` 的內容。願意公開自己哪裡還沒查完的知識庫，比宣稱全部都查過的知識庫可信。

## 9.3 三層 View 的具體分工（細化 v7 §10）

| | Reader | Evidence | Governance |
|---|---|---|---|
| 進入方式 | 預設 | 每個 claim 旁的「來源」 | `/governance`，不進主導航 |
| 顯示 | one_liner → why → how → 注意 → 何時就醫 | claim / design / n / effect＋comparator / certainty 推導過程 / population / caveats / source＋版本 | coverage 矩陣、freshness、provenance 分布、orphan、override 清單、change log |
| 數字呈現 | 帶單位與 `relative_to`；`heuristic` 以虛線樣式 | 完整不確定區間 | 各 risk_class 的 SLA 達成率 |
| AI metadata | 不顯示 | 不顯示 | 完整顯示 |

Evidence View 必須顯示 **certainty 的推導過程**（哪個設計、哪個領域被降級），而不只是結果。這使 `deriveCertainty()` 成為對讀者可稽核的邏輯，而不是另一個黑盒等級。

---

# 10. R8.7 — Governance-as-Code

## 10.1 語言規則引擎（極性感知，修 DEFECT-10）

```ts
interface LanguageRule {
  id: string;
  pattern: RegExp;
  polarity: 'promissory' | 'refutational' | 'any';
  severity: 'error' | 'warn';
  message: string;
  allowed_if?: 'has_qualifier' | 'has_claim_id' | 'never';
}
```

| 規則 | 樣式 | 極性 | 處置 |
|---|---|---|---|
| `LANG-001` | 一定／保證／絕對可以 | promissory | error |
| `LANG-002` | 完全不會／絕對不會 | promissory | error |
| `LANG-002b` | 完全不會／絕對不會 | **refutational** | **allow**（否證保健宣稱時允許，如 `chapterA.ts:1872`） |
| `LANG-003` | 只要 X 就 Y | any | error |
| `LANG-004` | 人體固定需要／你的安全上限 | any | error |
| `LANG-005` | 天然所以安全／無副作用 | any | error |
| `LANG-006` | AI 專家認證／AI 驗證所以可信 | any | error |
| `LANG-007` | 排毒／解毒（非藥理學語境） | any | warn ＋ 要求 terminology guard |
| `LANG-008` | 100%／數十倍／飆升 N 倍 | any | error，除非綁定 `EffectEstimate` |

極性判定方式：規則比對同一句內是否存在否證標記（「不能被描述為」「並不會」「無法」「不等於」）且該句所屬 KA 的 `assertion_kind` 為 `qualitative` 並帶 `misuse_guard`。實作上先以句級啟發式 ＋ 人工 allowlist（`language-allowlist.json`，每筆須寫理由）落地，避免第一版就過度工程化。

## 10.2 TerminologyRegistry（修 DEFECT-03）

```ts
interface TerminologyEntry {
  term: string;
  abbreviation?: string;
  ambiguous_with?: string[];       // ADH → ['alcohol dehydrogenase', 'antidiuretic hormone']
  canonical_zh: string;
  canonical_en: string;
  must_expand_on_first_use: boolean;
  guard?: {                        // 易被健康產業濫用的概念
    reason: string;
    required_framing: string;      // 「腸漏」→ 須說明學術用語為 intestinal permeability，
                                   //   且「腸漏症」非公認臨床診斷
  };
}
```

首批必須註冊：ADH、BP、PT、CRP、TPC、AI（Adequate Intake vs 人工智慧 —— 在本專案中這個碰撞特別現實）、腸漏、排毒、酸性體質、代謝型態、身體年齡。

## 10.3 風險分級 Freshness SLA

v7 的「每個 critical guideline 有 next_review」沒有給週期。v8 給：

| risk_class | 內容類型 | review 週期 | 來源過期 | 過期處置 |
|---|---|---|---|---|
| R3 | 診斷切點、篩檢政策、劑量、危及生命 | **6 個月** | >18 個月 | CI **error**，UI 顯示「待更新」橫幅 |
| R2 | 數值判讀、族群限定 | 12 個月 | >30 個月 | CI error |
| R1 | 行為建議 | 18 個月 | >48 個月 | CI warn |
| R0 | 一般教育 | 24 個月 | — | warn |

台灣政策物件另有獨立規則：`effective_from` 超過 12 個月未重新確認即標記 `needs-policy-recheck`。KA-TW-005（乳癌篩檢 2025 年才擴大年齡）就是這條規則存在的理由。

## 10.4 24 條 CI 驗證規則

```text
結構
VAL-001  orphan：Topic/Entity/Atom/Claim/Evidence/Source/Threshold 無入邊或無出邊
VAL-002  broken relation：任何 id 參照不存在
VAL-003  contradicts 必須雙向對稱
VAL-004  prerequisites 不得成環
VAL-005  legacy_kp_ids 必須覆蓋全部 188 個舊 KP（遷移期）

明確性（§4 的 E1–E5）
VAL-006  assertion_kind 必填
VAL-007  quantitative / diagnostic_boundary / policy 必須綁定 QuantitativeClaim 或 Threshold
VAL-008  statement 含數值 regex 命中但無 quantitative_claim_ids → error
VAL-009  applicability.exclude_conditions 必須存在（可為空陣列，但需刻意宣告）
VAL-010  misuse_guard 必填且 ≥ 20 字
VAL-011  DerivedCopy 含數值時，其 derived_from 之 KA 必須為 quantitative（修 DEFECT-02）

證據
VAL-012  critical（R2/R3）claim 必須有 ≥1 EvidenceRecord
VAL-013  EffectEstimate 必須有 comparator ＋ exposure_definition（修 DEFECT-11）
VAL-014  certainty 不得手填；override 必須有 reason ＋ by
VAL-015  override 比率 > 10% → error
VAL-016  R3 內容之 source.provenance_level 必須為 verified-primary

數值
VAL-017  unit 必須為 UCUM 白名單成員
VAL-018  relative_to 為 '%E' 時必須有 derivation
VAL-019  value_kind='heuristic' 不得被任何 SimulatorContract 引用為 baseline
VAL-020  Threshold 之 effective_from 不得晚於引用它的內容之 last_reviewed

安全與語言
VAL-021  R3 內容必須綁定 ≥1 SafetyGate
VAL-022  SimulatorContract.excluded_population 必須為可求值 Predicate（非字串）
VAL-023  LANG-001~008 規則掃描（極性感知）
VAL-024  freshness SLA 依 risk_class（§10.3）
```

執行方式（配合現有極簡 toolchain）：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run validate && tsc -b && vite build",
    "validate": "tsx scripts/validate.ts",
    "validate:report": "tsx scripts/validate.ts --report=governance",
    "export:api": "tsx scripts/exportApi.ts",
    "test": "vitest run"
  }
}
```

`deploy.yml` 在 build 前插入 `npm run validate`。**error 級規則阻擋部署** —— 這是 v7 與 v8 最實際的差別：治理必須能讓部署失敗，否則它只是文件。

---

# 11. Source Registry v2 與 provenance 修正

現行 `src/data/sources.ts` 有 21 筆 `SourceItem`，欄位為 `{id, title, publisher, year, grade, url, description}`。缺少版本、檢索日、管轄區與取代關係。

```ts
export interface SourceV2 {
  id: string;
  title: string;
  publisher: string;
  canonical_url: string;           // 必須直達具體文件，非機構首頁
  doi?: string;
  pmid?: string;
  publication_date: string;
  version?: string;                // 'ADA SoC 2026'、'署授食字第1001900044號'
  retrieved_date: string;
  jurisdiction?: string[];
  source_type: 'guideline' | 'policy' | 'regulation' | 'systematic-review'
             | 'primary-study' | 'database' | 'textbook' | 'agency-explainer';
  provenance_level: ProvenanceLevel;
  supersedes?: string[];
  superseded_by?: string[];
  status: 'active' | 'superseded' | 'needs-provenance-review';
  salud_evidence_tier?: 'A'|'B'|'C'|'D'|'E';   // 相容欄位，UI 不得標為 GRADE
}
```

## 11.1 必須處理的既有 source

| id | 問題 | 處置 |
|---|---|---|
| `SRC-TWFDA-FRYOIL` | `url` 為 `https://www.fda.gov.tw/`（機構首頁） | 改指向油炸油稽查公告／檢驗方法公告（署授食字第 1001900044 號），`status: needs-provenance-review` 直到完成 |
| `SRC-TW-HPA-WATER` | generic HPA URL，標題／描述無法穩定回溯 | `needs-provenance-review`；在完成前，引用它的 R2/R3 內容依 VAL-016 不得上線 |
| `SRC-IOM-2005` | 指向 catalog 頁 | 改為可直達的章節 URL，並補 `version` 與 `retrieved_date` |
| `SRC-ALDH2-EPI` `SRC-PHARMACOGENOMICS` | 泛稱來源，無法對應 KA-A-002/003 所需的 n／族群／抽樣方法 | 拆為具體 `primary-study`，每筆帶 PMID |
| 新增 | 2025 AHA/ACC 高血壓、2026 ACC/AHA 血脂、ADA SoC 2026、KDIGO 2024、WHO 2020 身體活動、WHO 2013 鈉鉀、HPA 五癌篩檢各項、Front Pharmacol 2026 水與宿醉（PMID 42375618） | 以 `verified-primary` 建檔 |

**原則不變且加嚴：** 找不到原始文件時，不保留「看起來合理的摘要」。`status: needs-provenance-review` ＋ VAL-016 會讓引用它的 R3 內容自動無法發佈 —— KA-TW-008 就是第一個被這條規則攔下的真實案例。

---

# 12. Adapter-First 遷移策略（讓 UI 一行不改）

v7 的 Sprint Group A–F 是正確順序，但沒說「搬遷期間站台怎麼活著」。這是實作上最大的風險。

## 12.1 四階段

```text
Phase 0  並行（不動 UI）
  新增 src/knowledge/**（SoT）、src/registry/**、src/validation/**、scripts/validate.ts
  既有 src/data/** 完全不動 → 站台行為零變化
  交付：CI 可跑、可產出 coverage.json（先只 warn）

Phase 1  反向對映（建立雙向驗證）
  為 188 個舊 KP 建立 KnowledgeAtom 骨架，legacy_kp_ids 指回舊 id
  撰寫 scripts/reconcile.ts：比對「舊 KP 文字中的數字」與「新 QuantitativeClaim」
  → 這個腳本會自動找出其餘的 DEFECT-01 類型矛盾。手工審 65,949 行不可行，比對腳本可行。
  交付：reconcile 報告（預期產出數十筆需裁決項）

Phase 2  Adapter 接管渲染
  實作 buildPageFromRegistry(pageId): KnowledgePage
  已遷移章節（先 W）由 registry 生成 KnowledgePage 物件餵給現有元件
  → UI 元件、Hub、模擬器一行不改
  舊 chapterW.ts 轉為 fixture，用於 snapshot 比對（確認無資訊遺失）
  交付：W 章節完全由 registry 驅動；O、A 依序

Phase 3  收斂
  chapterW/O/A.ts 刪除；自由字串欄位全部改為 DerivedCopy
  VAL-005 由 warn 升為 error
  啟用 /explore、/api 輸出、Governance View
```

Phase 2 的 Adapter 是整個計畫能否落地的關鍵：它讓「資料模型重構」與「UI 重構」解耦。v7 隱含要求兩者同時進行，那是一次高風險的大爆炸式改寫。

## 12.2 目錄結構（相對 v7 的修正）

```text
src/
├── knowledge/                 ← Layer 1，SoT，純資料
│   ├── topics/  entities/  atoms/  claims/  quantitative/
│   ├── evidence/  sources/  best-practices/
│   ├── thresholds/  policies/  safety-gates/
│   ├── figures/  tools/  terminology/
│   └── index.ts
├── compose/                   ← Layer 2，純函數（v7 原名 registry，但它其實是計算層）
│   ├── deriveCertainty.ts     · resolveThreshold.ts
│   ├── evaluatePredicate.ts   · evaluateSafetyGate.ts
│   ├── buildPageFromRegistry.ts   ← 遷移關鍵
│   ├── coverageMatrix.ts      · freshnessReport.ts
│   └── __tests__/             ← 100% 覆蓋，這層錯了全站皆錯
├── validation/
│   ├── rules/                 ← VAL-001..024，一檔一規則
│   ├── language/              ← LANG 規則 ＋ allowlist
│   └── runner.ts
├── search/  graph/
├── components/  pages/        ← Layer 3（既有）
└── data/                      ← 遷移期保留，Phase 3 清空
scripts/
├── validate.ts  reconcile.ts  exportApi.ts  freshnessReport.ts
```

與 v7 的差異：`registry/` 改名 `compose/` 並明確定義為**無 I/O 純函數層**，且要求 `__tests__` 全覆蓋。命名不是小事 —— 叫 registry 會誘使人往裡面塞資料，於是計算層與資料層再次糊在一起。

---

# 13. Migration Queue（逐行可執行）

## P0 — 阻擋發佈（12 項，全部有 file:line）

| # | 位置 | 動作 | 取代為 |
|---|---|---|---|
| 1 | `chapterA.ts:496` | 刪除 70% 酒精棉花自測法與「約 70% 機率」 | KA-A-004 |
| 2 | `chapterA.ts:514` | 移除「年過 40 胃腸鏡篩檢」tier3 | KA-A-006 症狀導向 |
| 3 | `dietaryNutrientsData.ts:600` | 刪除「食道癌風險飆升 50 倍」 | KA-A-005 ＋ EffectEstimate |
| 4 | `dietaryNutrientsData.ts:642` | 刪除「高出數十倍」 | KA-A-005 |
| 5 | `chapterA.ts:397` | 倍數改為帶劑量／量測法之範圍 | KA-A-002 |
| 6 | `dietaryNutrientsData.ts:585` | 「活性僅剩不到 10%」改為範圍 ＋ 與 #5 統一引用同一 QuantitativeClaim | KA-A-002 |
| 7 | `chapterW.ts:21` | 移除「進冷氣房前先喝 200ml」 | 多線索調整敘述 |
| 8 | `chapterW.ts:288` | 移除「不要等口渴」 | KA-W-005 |
| 9 | `chapterW.ts:587` | `life_hack` 不得稱「公式」；改 DerivedCopy 綁 KA-W-004 | KA-W-004（heuristic） |
| 10 | `chapterW.ts:752` | 移除 WUT「兩項即缺水」規則 | KA-W-006 |
| 11 | `chapterW.ts:1068` | 移除 0.8–1.0 L/h 作為個人上限 | KA-W-007（定性，待 provenance） |
| 12 | `chapterW.ts:1385` | 移除「配水大幅降低宿醉」 | KA-A-007（含其自身適用限制） |

## P1 — 高價值（10 項）

1. `dietaryNutrientsData.ts:583/587` ADH 術語碰撞 → TerminologyRegistry
2. `dietaryPatterns.ts:317`「100% 走向神經病變」
3. `dietaryNutrientsData.ts:47`「果糖 100% 進入肝臟」
4. `expertBestPractices.ts:1043` RR=5.13 補 comparator ／ exposure_definition ／ adjusted_for
5. `README.md:30` WCAG AAA → AA baseline ＋ 建立無障礙稽核產出
6. `chapterW.ts:1219` 自製補液配方：對照 WHO ORS／居家補液建議校正劑量，移除「快數倍」量級宣稱，加 SafetyGate（嬰幼兒／腎病／心衰）
7. O 章煙點群組拆為三個 claim（KA-O-003）
8. O-024 膳食膽固醇文案現代化（KA-LP-005）
9. `chapterA.ts:1872` 加入 LANG-002b allowlist 並註明理由（保護性否證）
10. 各 Human System 誇大 tagline 審查

## P2 — 架構完成

Topic/Entity Registry 全量、MeSH／ICD-11 對映、Threshold Registry 全量、Taiwan Policy Registry 全量、Evidence Update feed、Knowledge Graph UI、`/api` 輸出、Governance View。

---

# 14. 內容優先級（修正 v7）

v7 的 Tier 1 列了 12 個主題，但沒說**為什麼先做這些**。v8 的排序依據是**節點連結度 × 風險**，而非流量：

| 優先 | 主題 | 理由 |
|---|---|---|
| **1** | 血壓 | 連結度最高（腎、心、鈉、體重、運動皆指向它）；repo 目前最薄；2025 指引剛改版 |
| **2** | 腎功能分期 | 是 W 章所有體液建議的 `SafetyGate` 參數來源。**沒有它，現有的水分內容就沒有安全底座** |
| **3** | 血脂／ApoB／Lp(a) | repo 已有 CardiometabolicHub 的深度內容，但缺 Threshold 化；2026 指引剛改版 |
| **4** | 血糖 | 切點明確、誤讀多、ADA 轉為 living guideline 需架構支援 |
| **5** | 鈉／鉀 | 與血壓、腎臟形成第一個完整的「三角安全圖譜」，是驗證 §9 設計的最佳測試案例 |
| 6 | 體位／肥胖 | 台灣切點與國際不同，是 Threshold `applicability` 的示範案例 |
| 7 | 身體活動、睡眠 | 已有內容，主要工作是 Threshold 化與去絕對化 |
| 8 | 癌症篩檢（台灣） | Policy Registry 的主戰場，且 P0 #2 已依賴它 |

**順序 2 是本版最重要的優先級修正**：v7 把 Kidney 排在第 11 位，但 W 章（56 KP、已發佈）的每一條補水建議都需要腎功能分期作為排除謂詞。先做腎臟，W 章的安全閘才有底座；反之則是把已發佈的高風險內容繼續懸空。

---

# 15. Acceptance Criteria（可量測版）

```text
結構完整性
  orphan 節點 = 0                          （VAL-001）
  broken 參照 = 0                          （VAL-002）
  contradicts 對稱率 = 100%                （VAL-003）
  188 個 legacy KP 覆蓋率 = 100%           （VAL-005）

明確性（本版核心）
  assertion_kind 標註率 = 100%
  量化型 KA 綁定 QuantitativeClaim 率 = 100%   （VAL-007）
  statement 含數值但未綁定者 = 0               （VAL-008）
  misuse_guard 覆蓋率 = 100%                   （VAL-010）
  含數值之 DerivedCopy 綁定率 = 100%           （VAL-011）
  repo 中重複出現的醫學數字之唯一 id 化 = 100%  （KA-META-001）

證據
  R2/R3 內容有 EvidenceRecord = 100%
  R3 內容 provenance_level = verified-primary = 100%   （VAL-016）
  EffectEstimate 具 comparator = 100%
  certainty 手填數 = 0；override 率 < 10%
  needs-provenance-review 之 R3 內容上線數 = 0         ← KA-TW-008 檢驗此條

安全
  R3 內容綁定 SafetyGate = 100%
  SimulatorContract.excluded_population 為 Predicate = 100%
  模擬器輸出型別為 educational_estimate = 100%（型別強制）

新鮮度
  R3 內容逾期數 = 0（6 個月 SLA）
  政策物件具 effective_from = 100%
  superseded 來源明確標記 = 100%

讀者體驗
  任一事實問題 ≤ 3 次互動可達
  每個 critical claim 一鍵可見來源與 certainty 推導
  可在不回首頁的情況下走訪相關知識
  讀者能區分「證據」與「建議」與「政策」

無障礙
  WCAG 2.2 AA 為工程基線，並有 CI 產出的稽核報告支撐；
  不得宣稱全站 AAA，除非全部成功標準已實際稽核。
```

---

# 16. Definition of Done（v8）

v7 的 DoD 描述了知識點的理想狀態。v8 加上**可驗證性**這一層 —— 一個無法被自動檢查的完成定義，不是完成定義。

```text
每一個重要知識點
  ↓ 有 assertion_kind，且若為量化型，數字存在 QuantitativeClaim 而非句子裡
  ↓ 有結構化的適用族群與排除條件
  ↓ 有 claim → evidence → source 的完整鏈，且來源可直達原始文件
  ↓ 有由證據推導（而非手填）的 certainty，推導過程對讀者可見
  ↓ 有 misuse_guard，說明它最常被誤讀成什麼
  ↓ 有依風險分級的 review SLA，逾期會讓 CI 失敗
  ↓ 高風險者綁定可機器求值的 SafetyGate
  ↓ 可被搜尋、可被機器引用、可被連結到相關知識
  ↓ 可被更新而不需重寫整站
  ↓ 以上每一條都有對應的 VAL 規則，且 error 級規則能阻擋部署
```

最後一行是 v7 與 v8 的真正分界：**v7 寫下了標準，v8 讓違反標準的 commit 無法部署。**

---

# 17. 研究依據

## 17.1 本機程式碼（v3.0.0，逐行對帳）

`README.md` · `package.json` · `.github/workflows/deploy.yml` · `src/types/index.ts` · `src/data/sources.ts` · `src/data/chapters.ts` · `src/data/chapterW.ts` · `src/data/chapterO.ts` · `src/data/chapterA.ts` · `src/data/dietaryNutrientsData.ts` · `src/data/dietaryPatterns.ts` · `src/data/expertBestPractices.ts` · `src/data/humanSystemsData.ts` · `src/data/systems/*` · `src/components/**`

## 17.2 本輪新增核對之現行指引

### 心血管代謝
- 2025 AHA/ACC 高血壓指引（分級維持 ≥130/80；目標 <130/80；PREVENT 10 年 ≥7.5%；第 1 期低風險者 3–6 個月生活型態試行）
  https://www.acc.org/latest-in-cardiology/articles/2025/10/01/01/new-in-clinical-guidance-hbp
  https://www.ahajournals.org/doi/10.1161/HYPERTENSIONAHA.125.25418
- 2026 ACC/AHA/多學會血脂指引（LDL-C <100/<70/<55；non-HDL <85；Lp(a) 一生一次；apoB 再分層）
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000001423
  https://www.jacc.org/doi/10.1016/j.jacc.2026.02.4872
- ADA Standards of Care in Diabetes 2026 §2 診斷與分類；2026 起轉為 living guideline
  https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes
  https://diabetesjournals.org/care/article/49/Supplement_1/S6/163930/Summary-of-Revisions-Standards-of-Care-in-Diabetes

### 腎臟
- KDIGO 2024 CKD 指引（CGA 分類、G1–G5、A1–A3、≥3 個月、風險熱圖）
  https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf

### 營養與體液
- WHO 2023 飽和脂肪與反式脂肪指引 https://www.who.int/publications/i/item/9789240073630
- WHO 2013 鈉／鉀指引（鈉 <2000 mg、鉀 ≥3510 mg） https://www.who.int/news/item/31-01-2013-who-issues-new-guidance-on-dietary-salt-and-potassium
- NASEM (IOM) 2005 水與電解質 DRI（男 3.7 L／女 2.7 L 總水） https://nap.nationalacademies.org/read/10925/chapter/2
- EFSA 2010 水參考值（男 2.5 L／女 2.0 L） https://www.efsa.europa.eu/en/efsajournal/pub/1459
- CDC 健康飲水說明 https://www.cdc.gov/healthy-weight-growth/water-healthy-drinks/index.html
- 運動相關低鈉血症第三次國際共識（依口渴飲水） https://pubmed.ncbi.nlm.nih.gov/26227507/
- 水合監測／尿液指標系統性回顧 https://pubmed.ncbi.nlm.nih.gov/32330109/
- 2024 植物油油炸降解回顧 https://www.mdpi.com/2304-8158/13/24/4186

### 身體活動與睡眠
- WHO 2020 身體活動與久坐行為指引（150–300／75–150；≥2 天肌力；長者平衡；久坐無量化閾值）
  https://pubmed.ncbi.nlm.nih.gov/33239350/
  https://iris.who.int/server/api/core/bitstreams/faa83413-d89e-4be9-bb01-b24671aef7ca/content
- AASM 成人睡眠共識（≥7 小時） https://aasm.org/seven-or-more-hours-of-sleep-per-night-a-health-necessity-for-adults

### 酒精與 ALDH2
- WHO 酒精 fact sheet https://www.who.int/news-room/fact-sheets/detail/alcohol
- WHO/IARC 酒精與癌症風險（無安全攝取量） https://cdn.who.int/media/docs/default-source/documents/health-topics/cancer/2023-who-alcohol-health-cancer-risks-lancet-pub-health-8-e6.pdf
- ALDH2 Glu504Lys 疾病風險回顧（活性 ~0% 與 17–38%；東亞 35–57%） https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4600480/
- ALDH2 變異之族群與疾病分布 https://journals.biologists.com/dmm/article/15/6/dmm049601/275799/ALDH2-variance-in-disease-and-populations
- 台灣世代研究：ALDH2 rs671 與 ADH1B rs1229984 對習慣性飲酒的影響（台灣約 47% 帶 A 等位基因） https://pmc.ncbi.nlm.nih.gov/articles/PMC13419686/
- **飲酒期間飲水不能緩解宿醉**（隨機 2×2 交叉，n=13 ALDH2 野生型日本男性，清酒 1.3 g/kg 純酒精 ＋ 水 15 mL/kg，追蹤 15 小時；呼氣乙醇與乙醛時間曲線無差異，隔日症狀無改善）
  https://pubmed.ncbi.nlm.nih.gov/42375618/
  https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2026.1852528/full
- 2024 水與宿醉系統性回顧 https://pubmed.ncbi.nlm.nih.gov/39069212/

### 台灣公共衛生與法規
- 衛福部：114 年起擴大癌症篩檢 https://www.mohw.gov.tw/cp-2704-80948-1.html
- 衛福部：乳癌篩檢年齡擴大至 40–74 歲 https://www.mohw.gov.tw/cp-16-81672-1.html
- 衛福部：擴大推動五癌篩檢 https://www.mohw.gov.tw/cp-7178-82502-1.html
- 國民健康署：114 年起擴大癌症篩檢 https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=4809&pid=18712 ⚑（本輪自 proxy 無法直接存取，二手來源對 LDCT 年齡有衝突讀法 → KA-TW-008 標記為 needs-provenance-review）
- 衛福部：衛生單位持續把關油炸油衛生安全（酸價 >2.0 加驗 TPC；TPC >25% 不符規定） https://www.mohw.gov.tw/cp-3213-23273-1.html
- 國民健康署：成人健康體位標準（BMI 18.5／24／27；腰圍 90／80 cm） https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=542&pid=9737

> 引用紀律：以上每一筆在進入 `src/knowledge/sources/` 時，都必須補齊 `canonical_url`、`publication_date`、`version`、`retrieved_date`、`jurisdiction`、`provenance_level`。凡標 ⚑ 者 `status = needs-provenance-review`，依 VAL-016 其所支撐的 R3 內容不得上線。

---

# 18. 最終產品定位（v8 收斂）

Salud 不是健康文章集合，也不只是有漂亮圖表與模擬器的科普網站。它要成為：

> **一個結構化、證據可追溯、族群感知、防誤用、持續維護，且可被機器引用的 Health Knowledge & Best Practice Archive。**

核心資產鏈：

```text
Topic → Entity → KnowledgeAtom
      → Claim → QuantitativeClaim → EvidenceRecord → Source(provenance)
      → BestPractice → SafetyGate → Tool(contract)
      → Threshold → TaiwanPolicy(effective_from)
      → Terminology → misuse_guard
      → derived certainty → review SLA → change log
      → machine-readable export
```

而 v8 真正新增的，是鏈條上兩個最容易被忽略卻最決定可信度的環節：

1. **`misuse_guard`** —— 承認「寫對了也會被讀錯」，並把防線寫進資料。
2. **`derived certainty` ＋ `provenance_level` 閘門** —— 讓「我還不確定」與「我還沒查完」成為系統的一級狀態，而不是編輯的沉默。

一個健康知識庫的可信度，不取決於它宣稱自己多確定，而取決於它能不能**誠實、結構化、自動化地說出自己哪裡還不確定**。KA-TW-008 被自家 CI 攔在門外的那一刻，才是這個架構開始有價值的時候。

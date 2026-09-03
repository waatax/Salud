# Salud｜Evidence-Based Health Simulation & Knowledge Platform (v0.2)

> **Salud 讓你看見身體裡正在發生的事，動手改一個變因，然後用真實資料檢查你猜得對不對。**

[![Deploy to GitHub Pages](https://github.com/waatax/Salud/actions/workflows/deploy.yml/badge.svg)](https://github.com/waatax/Salud/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live_Site-waatax.github.io%2FSalud-06B6D4?style=flat&logo=github)](https://waatax.github.io/Salud/)
[![Spec Version](https://img.shields.io/badge/Spec-v0.2-F59E0B)](./SALUD_Spec_v0.2.md)

---

## 🌟 產品定位與核心哲學 (Product Ethos)

Salud 定位為**實證健康人體模擬與知識平台**，專為重視科學機轉、想要掌握自身健康數據的人群打造。

三個不可妥協的產品性格：
- **Mechanistic（講機制）**：不只給結論，給「為什麼」——每個知識頁至少配置 1 張生理/化學機制圖解。
- **Manipulable（可操作）**：抽象數字要能被使用者「動手操作」——每個篇章配置專屬即時互動模擬器。
- **Modest（誠實克制）**：不確定就說不確定——所有模擬器輸出必帶不確定區間（Uncertainty Band）與適用邊界，絕不做未經驗證的個人化疾病預測或虛假「身體年齡」評分。

---

## 🎨 視覺美學：Futuristic & Warm（溫暖未來感醫學美學）

- **雙調性配色系統**：
  - **Dark Mode（預設推薦，前沿科研感）**：Deep Obsidian / Cosmic Slate 深黑太空格調，點綴生命溫暖琥珀金（Amber Gold `#F59E0B`）、細胞體液發光青（Bioluminescent Cyan `#06B6D4`）與警示血紅（Blood Crimson `#EF4444`）。
  - **Light Mode（清爽溫潤紙本感）**：溫潤象牙米白（Ivory Cream `#FAF8F5`）搭配深板岩深灰（Deep Slate），提供頂級醫學圖書館般的舒適閱讀體驗。
- **圖解標準（Spec §4）**：
  - 線條主導（Line-led）、等距剖面（Isometric）、有限填色、留白充足。
  - 嚴格遵守 WCAG 2.2 AA 高對比度與灰階可讀性（即使去除色彩，資訊層級依然清晰）。
  - 所有向量圖解支援**全螢幕放大檢視**與**無障礙等價資料表（Equivalent Accessible Data Table）**切換。

---

## 📚 系統架構與 Phase 1 雙篇章

### 1. Chapter W｜水與體液平衡 (Fluid & Water Homeostasis)
- **12 個標準知識頁**，包含 56 個原子化知識點（KP-W-001 ~ KP-W-056）
- **核心圖解**：
  - `FIG-W-01-02` 體液的三個房間（細胞內液 67%、組織間液 25%、血漿 8% 比例剖面）
  - `FIG-W-03-01/02` 下視丘滲透受器 1% 警報與腎臟 Aquaporin-2 水通道嵌合回收機制
  - `FIG-W-04-01` 24 小時水分動態收支平衡圖（Sankey）
  - `FIG-W-06-01` 臨床 8 級尿液顏色水合尺規（Armstrong Scale）
  - `FIG-W-07-01` 脫水階梯（1% 口渴至 7%+ 致命中暑）
  - `FIG-W-08-02/03` 運動相關低血鈉（EAH）與脫水症狀重疊警戒
- **專屬模擬器**：`SIM-HYDRATION`（24 小時水分收支動態模擬器，內建限水族群安全閘與 ±0.3L 不確定區間）。

### 2. Chapter O｜脂肪與食用油 (Dietary Fats & Edible Oils)
- **12 個標準知識頁**，包含 59 個原子化知識點（KP-O-001 ~ KP-O-059）
- **核心圖解**：
  - `FIG-O-02-01` 碳鏈分子結構對照（SFA 直鏈 vs MUFA 順式折角 vs PUFA 柔軟雙折角 vs 反式脂肪）
  - `FIG-O-05-01` 等熱量替代框架（Isocaloric substitution）
  - `FIG-O-07-01` **16 種常見食用油脂肪酸組成 100% 堆疊橫條旗艦圖**（支援單元/多元/飽和/發煙點互動排序與搜尋）
  - `FIG-O-08-03` 家庭烹飪溫度帶與各油品發煙點疊合尺規
  - `FIG-O-10-02` 台灣外食隱形油熱點（雞排、蔥油餅、貢丸湯、大冰奶）
  - `FIG-O-11-02` 1 茶匙油 = 5g = 45 kcal 實物對照（約半顆蛋熱量）
- **專屬模擬器**：
  - `SIM-OIL-SWAP`（等熱量換油模擬器，支援 16 種油品、茶匙用量、WHO 10%E 參考線）
  - `SIM-COOK-TEMP`（這道菜該用什麼油，內建回鍋油總極性物累積警告）

---

## 🛡️ 專家治理結構：Expert Council (22 席)

遵循醫學專業分工，由 22 席專家共同擔任內容治理角色模型：
- **EC-01** Medical Director（醫療總監，終審安全閘）
- **EC-13** Nephrology / Fluid & Electrolyte Specialist（腎臟科與電解質專科醫師）
- **EC-14** Lipid Scientist / Food Oil Chemist（脂質科學與食用油化學家）
- **EC-15** Food Science & Culinary Technologist（食品科學與烹飪技術專家）
- **EC-16** Environmental / Thermal Physiology（環境與熱生理學家）
- **EC-17** Medical / Scientific Illustrator（醫學科學插畫總監）
- **EC-19** Learning Experience Designer（學習體驗架構師）
- **EC-20** Health Communication / zh-TW Science Writer（繁體中文科普主筆）
- **EC-21** Behavioral Scientist（行為科學架構師）
- **EC-22** Regulatory / Legal Taiwan TFDA（台灣食品法規與合規審查）

---

## 🚀 本地開發與構建 (Development & Build)

```bash
# 安裝依賴
npm install

# 啟動本機開發伺服器
npm run dev

# 執行型別檢查與生產環境建置
npm run build
```

---

## 🌐 線上預覽與 GitHub Pages 部署

本專案建置產物託管於 GitHub Pages：
👉 [https://waatax.github.io/Salud/](https://waatax.github.io/Salud/)

---

## ⚖️ 醫療免責聲明 (Medical Disclaimer)

Salud 為健康教育、人體機制模擬、風險辨識與生活型態管理平台，**不得作為個人醫療診斷、處方或取代專業醫療諮詢**。若您患有心衰竭、慢性腎臟病、肝硬化等需嚴格限水疾病，或正在服用降血脂、利尿劑處方藥物，請務必遵循合格專科醫師開立之醫囑指引。

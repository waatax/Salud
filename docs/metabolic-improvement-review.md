# 體重、三高與猛健樂：七輪改善紀錄

完成整理：2026-11-06。醫學來源查核：2026-11-05。

範圍是現有 Salud 專案的內容與體驗改善，並非全站所有醫學敘述的逐句重新審查，也不是臨床療效驗證。既有猛健樂十二節專章持續沿用，這次強化入口、限制說明與容易誤讀的決策細節。

| 輪次 | 問題與規劃 | 實作、檢查與校正 |
| --- | --- | --- |
| 1 知識架構 | 多個專區入口分散，初學者難以排序 | 首頁新增四種情境，連接健檢、三高、減脂保肌與猛健樂；使用既有深度章節，避免重複建立互相矛盾的指南。新增路由測試通過。 |
| 2 醫療依據 | 療效評估時間可能被誤解 | 查核 Lilly 2026-08 仿單、NICE／NHS、國健署、NIDDK、WHO、NHLBI、CDC 與 ACC/AHA。把 NICE 評估點改為最高耐受劑量滿六個月，並強調不是自動停藥規則；增加回歸測試。 |
| 3 體重與三高 | 紅字容易被當成診斷或個人目標 | 補充參考值、診斷與治療目標三者的區別；修正 LDL 過度歸因於遺傳的說法。維持共用檢驗門檻與既有報告工具。 |
| 4 猛健樂效益與風險 | 最高劑量、快速減重及停藥數據容易被過度推論 | 強調營養、肌力、耐受度與長期維持；修正自行延後／降低劑量的語氣；補充 SGLT2 生病日與酮酸中毒風險、原始安全來源；說明停藥事後分析不能當作個人安全門檻。 |
| 5 圖解與行動 | 讀完知識後缺少可執行的出口 | 加上四步流程與有文字替代的餐盤圖，標明份量示意與適用限制。新增五項行動清單、完成安排數、複製與清除；不儲存健康資料。 |
| 6 操作體驗 | 首頁資訊密度與章節鍵盤操作負擔 | 首頁熱門入口縮至六個，核心入口移到打卡前。情境按鈕提供選取狀態與讀屏更新；章節按鈕至少 44px，跳轉後移動鍵盤焦點並尊重減少動態偏好。 |
| 7 回歸與校正 | 必須分清程式檢查與真正使用體驗 | 原有 72 項測試通過；新增兩項測試及受影響專章共 14 項通過。TypeScript 與正式建置通過。治理檢查 0 錯誤／0 警告；靜態可及性工具六項檢查通過，不代表完整 WCAG 認證。建置發現測試的可空路由型別問題後已修正。 |

## 主要來源

- [Lilly：Zepbound 美國完整仿單](https://pi.lilly.com/us/zepbound-uspi.pdf)
- [NICE TA1026 官方文件](https://www.nice.org.uk/guidance/ta1026/documents/674-2)
- [國健署：722 血壓管理](https://www.mohw.gov.tw/cp-7401-87239-1.html)
- [NIDDK：糖尿病檢驗與診斷](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis)
- [WHO：身體活動](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity)
- [NHLBI：DASH 飲食](https://www.nhlbi.nih.gov/health/dash-eating-plan)
- [CDC：餐盤法](https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html)
- [ACC/AHA：2026 血脂指引重點](https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia/top-things-to-know)
- [Medsafe：SGLT2 與酮酸中毒風險](https://www.medsafe.govt.nz/profs/PUArticles/December2024/Reminder-risk-factors-for-ketoacidosis-with-SGLT-2-inhibitors.html)

## 驗證限制與後續檢查

- 內嵌瀏覽器本機連線逾時，本機 Chrome 控制授權逾時，故尚未完成實際畫面、手機尺寸、深色模式、複製功能及鍵盤全流程的瀏覽器驗證。響應式與焦點行為目前只有原始碼檢查。
- 正式建置成功，但仍有大型 JavaScript 分包與混用靜態／動態匯入警告；尚未量測實際載入速度。
- 未進行真人可用性測試、醫師逐頁複核、臨床結果追蹤或部署。不能宣稱已證明改善健康結果，亦不能視為全站醫學內容已全部查核。
- 後續優先：360px／桌面畫面，四種情境切換、清單複製／清除，章節跳轉後 Tab 焦點，手機橫向溢位與深色模式。

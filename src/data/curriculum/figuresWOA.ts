import type { CurriculumFigure } from '../curriculumFigures';

/**
 * Bespoke curriculum figures for Chapters W, O, and A (133 figures).
 * Every figure provides clinical takeaway, grade, accessibility data table and data-driven chart.
 */
export const FIGURES_WOA: Record<string, CurriculumFigure> = {
  "FIG-W-01-03": {
    "title": "細胞膜兩側的水分滲透壓驅動機制",
    "caption": "水分子沿著滲透壓梯度經由水通道蛋白穿透細胞膜。",
    "takeaway": "水分子永遠朝著溶質濃度高的地方移動，以維持細胞內外滲透壓均等。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "細胞外液溶質濃度上升",
          "detail": "如攝取過多鹽分或大量出汗",
          "tone": "warn",
          "icon": "🧂"
        },
        {
          "label": "產生跨膜滲透壓差",
          "detail": "細胞外滲透壓 > 細胞內滲透壓",
          "tone": "warn",
          "icon": "⚡"
        },
        {
          "label": "水分經 AQP 水通道外流",
          "detail": "水分子從細胞內部被抽出至細胞外液",
          "tone": "bad",
          "icon": "💧"
        },
        {
          "label": "細胞脫水萎縮啟動口渴",
          "detail": "刺激下視丘滲透壓受器發出訊號",
          "tone": "bad",
          "icon": "🧠"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-03-03": {
    "title": "咽喉吞嚥神經信號提前關閉口渴感",
    "caption": "大腦咽喉迷走神經傳導在水分尚未吸收前先行終止口渴感。",
    "takeaway": "喝水當下口渴立即舒緩是神經反射，真正補充細胞仍需 30 分鐘。",
    "grade": "B",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "液體濕潤咽喉黏膜",
          "detail": "機械與溫度受器感應冰涼液體",
          "tone": "good",
          "icon": "👅"
        },
        {
          "label": "舌咽與迷走神經傳導",
          "detail": "直接投射至大腦下視丘口渴中樞",
          "tone": "info",
          "icon": "🧠"
        },
        {
          "label": "口渴感知即刻被抑制",
          "detail": "防止單次狂飲過量引發水中毒",
          "tone": "good",
          "icon": "🛡️"
        },
        {
          "label": "等待胃腸吸收體液平衡",
          "detail": "20–40 分鐘後血漿滲透壓真正校正",
          "tone": "good",
          "icon": "💧"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-03-04": {
    "title": "迷思：等到口渴才喝水就太晚了？",
    "caption": "人體口渴機制的演化防護精密性 vs 特殊極端情境對照。",
    "takeaway": "常溫常態下「渴了才喝」對健康成人完全及時；長者、高溫運動才需定時主動補水。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "一般健康成人日常情境",
          "icon": "✅",
          "tone": "good",
          "points": [
            "口渴感在體水流失 1–2% 時準確啟動",
            "演化數百萬年的精密口渴生理保護",
            "順應口渴喝水即可維持理想體液",
            "不需整天焦慮強迫灌水"
          ]
        },
        {
          "title": "需主動定時補水的例外情境",
          "icon": "⚠️",
          "tone": "warn",
          "points": [
            "高齡長者（下視丘口渴受器敏感度退化）",
            "高溫烈日下馬拉松或重度體力勞動",
            "幼兒（無法清晰表達口渴感受）",
            "嚴重嘔吐腹瀉急性脫水病患"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-09-03": {
    "title": "運動飲料 6–8% 碳水化合物的黃金吸收秘密",
    "caption": "低於 4% 供能不足、高於 10% 延緩胃排空之滲透壓區間。",
    "takeaway": "6–8% 糖鹽比例能最大化活化 SGLT-1 幫浦，帶水帶鈉入血速度超越純水。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 碳水濃度",
      "max": 15,
      "ref": {
        "value": 6.5,
        "label": "黃金等滲水合區間 6–8%"
      },
      "items": [
        {
          "label": "純開水 (0% 碳水)",
          "value": 0.1,
          "display": "0% (無 SGLT-1 加速)",
          "tone": "good",
          "icon": "💧"
        },
        {
          "label": "低滲補液水 (2–4% 碳水)",
          "value": 3,
          "display": "2–4% (快速補水)",
          "tone": "good",
          "icon": "⚡"
        },
        {
          "label": "標準等滲運動飲料 (6–8% 糖鹽)",
          "value": 6.8,
          "display": "6–8% (水與能量雙吸收極限)",
          "tone": "good",
          "icon": "🏃"
        },
        {
          "label": "一般可樂 / 汽水 / 果汁 (10–12%)",
          "value": 11.5,
          "display": "10–12% (高滲透延遲胃排空)",
          "tone": "bad",
          "icon": "🥤"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-02-01": {
    "title": "下視丘滲透壓受器與口渴觸發閾值",
    "caption": "血漿滲透壓上升與抗利尿激素 (ADH) 及口渴機制的觸發點。",
    "takeaway": "血漿滲透壓上升僅 1% 就會啟動 ADH 保水，上升 2–3% 才感到口渴。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "280–290 mOsm/kg",
          "label": "理想水合區間",
          "detail": "基礎滲透平衡，體液代謝正常運作",
          "tone": "good",
          "icon": "💧"
        },
        {
          "range": "290–294 mOsm/kg",
          "label": "滲透壓閥值 (上升 1%)",
          "detail": "下視丘釋放 ADH，腎臟開始濃縮尿液保水",
          "tone": "ok",
          "icon": "🧠"
        },
        {
          "range": "> 295 mOsm/kg",
          "label": "口渴感知閥 (上升 2–3%)",
          "detail": "意識察覺口渴，此時體重已流失約 1–2% 水分",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "> 305 mOsm/kg",
          "label": "急性脫水警戒",
          "detail": "心輸出量下降、體溫調節受阻，易頭暈疲倦",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-02-02": {
    "title": "ADH 血管加壓素在腎臟集尿管的保水機制",
    "caption": "水通道蛋白 AQP2 在腎小管上皮細胞膜的穿梭機制。",
    "takeaway": "ADH 指揮水通道蛋白鑲嵌到管腔膜，將原本要排出的尿水重吸收回血液。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "血漿滲透壓上升",
          "detail": "下視丘滲透壓受器偵測",
          "tone": "warn",
          "icon": "🩸"
        },
        {
          "label": "腦垂腺後葉分泌 ADH",
          "detail": "進入全身血液循環",
          "tone": "info",
          "icon": "🧠"
        },
        {
          "label": "結合 V2 受體",
          "detail": "腎集尿管上皮細胞活化 cAMP",
          "tone": "good",
          "icon": "🔬"
        },
        {
          "label": "AQP2 水通道蛋白鑲嵌",
          "detail": "大量水分重吸收回微血管，尿液高度濃縮",
          "tone": "good",
          "icon": "🚰"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-02-03": {
    "title": "口渴感覺的延遲反應與時間差",
    "caption": "喝水後口渴消除到細胞水分完全恢復的生理時間軸。",
    "takeaway": "喉嚨被潤濕讓口渴在 3 分鐘內暫歇，但全身水分需要 30–60 分鐘才能真正補充。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "分鐘",
      "max": 60,
      "items": [
        {
          "label": "口腔咽喉神經反射",
          "value": 3,
          "display": "1–3 分鐘",
          "tone": "good",
          "icon": "👅",
          "note": "大腦提早停止口渴訊號"
        },
        {
          "label": "胃腸道排空吸收",
          "value": 15,
          "display": "10–20 分鐘",
          "tone": "ok",
          "icon": "🥛",
          "note": "水分湧入微血管網"
        },
        {
          "label": "血漿滲透壓校正",
          "value": 30,
          "display": "20–35 分鐘",
          "tone": "ok",
          "icon": "🩸",
          "note": "血液水分濃度恢復"
        },
        {
          "label": "細胞內液 ICW 完全再水合",
          "value": 60,
          "display": "45–60 分鐘",
          "tone": "good",
          "icon": "💧",
          "note": "深層細胞全面修復"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-03-01": {
    "title": "人體 24 小時水分動態收支平衡",
    "caption": "70kg 健康成人每日水分輸入與輸出途徑（毫升/日）。",
    "takeaway": "水進與水出精準維持在約 2,500 mL 動態平衡，腎臟是調節的核心水龍頭。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "水分輸入 (約 2,500 mL)",
          "icon": "📥",
          "tone": "good",
          "points": [
            "液體飲品 (開水、茶等)：1,500 mL (60%)",
            "三餐固體食物所含水分：700 mL (28%)",
            "體內代謝內生水 (粒線體合成)：300 mL (12%)"
          ]
        },
        {
          "title": "水分輸出 (約 2,500 mL)",
          "icon": "📤",
          "tone": "warn",
          "points": [
            "腎臟尿液排出：1,500 mL (60%)",
            "皮膚與呼吸不感蒸發：800 mL (32%)",
            "消化道糞便帶出：200 mL (8%)"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-03-02": {
    "title": "每日水分流失途徑占比對照",
    "caption": "一般常態下各器官排泄水分的基準比例。",
    "takeaway": "即使整天靜坐不流汗，呼吸與皮膚仍在默默蒸發 800–1,000 mL 的水分。",
    "grade": "A",
    "chart": {
      "kind": "donut",
      "unit": "mL",
      "center": "2,500 mL",
      "items": [
        {
          "label": "尿液 (可調節)",
          "value": 1500,
          "display": "60% (1,500 mL)",
          "tone": "good",
          "icon": "🚽"
        },
        {
          "label": "呼吸不感蒸發",
          "value": 400,
          "display": "16% (400 mL)",
          "tone": "warn",
          "icon": "🫁"
        },
        {
          "label": "皮膚不感蒸發",
          "value": 400,
          "display": "16% (400 mL)",
          "tone": "warn",
          "icon": "🧴"
        },
        {
          "label": "腸道糞便排出",
          "value": 200,
          "display": "8% (200 mL)",
          "tone": "neutral",
          "icon": "💩"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-04-02": {
    "title": "冷氣房與乾燥環境不感蒸發倍增效應",
    "caption": "不同相對濕度環境下，8 小時人體不感蒸發水分散失量（mL）。",
    "takeaway": "冷氣房濕度常低於 45%，不知不覺中比常溫多蒸發一整杯水。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "mL / 8小時",
      "max": 600,
      "items": [
        {
          "label": "一般舒適環境 (濕度 65%)",
          "value": 280,
          "display": "280 mL",
          "tone": "good",
          "icon": "🌿"
        },
        {
          "label": "強效冷氣辦公室 (濕度 40%)",
          "value": 480,
          "display": "480 mL (+71%)",
          "tone": "warn",
          "icon": "🏢"
        },
        {
          "label": "高空飛機客艙 (濕度 15%)",
          "value": 580,
          "display": "580 mL (+107%)",
          "tone": "bad",
          "icon": "✈️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-05-01": {
    "title": "「一日八杯水」迷思的起源與現代指引",
    "caption": "1945 年美國報告斷章取義 vs 現代權威實證指引。",
    "takeaway": "八杯水（約 2,000 mL）原本就包含食物中的水，不是非得強迫喝下八大杯純水。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "坊間八杯水迷思",
          "icon": "❌",
          "tone": "bad",
          "points": [
            "每人固定 8 杯 (2,000 mL)",
            "食物與茶不算在內",
            "強迫狂灌以為能洗腎排毒"
          ]
        },
        {
          "title": "現代醫學與 DRIs 指引",
          "icon": "✅",
          "tone": "good",
          "points": [
            "依體重 30–35 mL/kg 彈性補充",
            "食物已提供 20–30% 水分",
            "觀察尿色與排尿頻率"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-05-02": {
    "title": "常見天然食物含水量百分比",
    "caption": "原型蔬菜、水果、蛋肉與全穀飯的天然含水量對照。",
    "takeaway": "吃一盤黃瓜或西瓜相當於喝下一大杯富含電解質的水。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 水分",
      "max": 100,
      "items": [
        {
          "label": "黃瓜 / 冬瓜 / 生菜",
          "value": 96,
          "display": "95–96%",
          "tone": "good",
          "icon": "🥒"
        },
        {
          "label": "西瓜 / 柑橘 / 芭樂",
          "value": 90,
          "display": "88–92%",
          "tone": "good",
          "icon": "🍉"
        },
        {
          "label": "雞蛋 / 豆腐",
          "value": 75,
          "display": "75–80%",
          "tone": "ok",
          "icon": "🥚"
        },
        {
          "label": "熟糙米飯 / 白飯",
          "value": 65,
          "display": "60–68%",
          "tone": "ok",
          "icon": "🍚"
        },
        {
          "label": "全麥麵包 / 堅果",
          "value": 20,
          "display": "5–35%",
          "tone": "warn",
          "icon": "🥖"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-05-03": {
    "title": "尿液顏色與水合狀態八階自評卡 (WUT/Armstrong)",
    "caption": "以晨起或白日排尿顏色自我辨識體液狀態（1–8 階）。",
    "takeaway": "1–3 階淡麥黃為理想狀態；4–6 階代表中度脫水；7–8 階為嚴重脫水警訊。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "等級 1–2 (清澈淡麥)",
          "label": "過度水合或極佳狀態",
          "detail": "尿液清淡如水，若排尿頻繁可略減飲水量",
          "tone": "good",
          "icon": "💧"
        },
        {
          "range": "等級 3 (透明黃色)",
          "label": "黃金理想水合水準",
          "detail": "細胞與血液體液充沛，代謝循環最佳狀態",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "等級 4–5 (深黃/琥珀)",
          "label": "輕度至中度脫水",
          "detail": "ADH 正在加倍保水，需在 1 小時內補充 300–500 mL 水分",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "等級 6–8 (烏龍茶/深褐)",
          "label": "重度缺水 / 橫紋肌溶解紅旗",
          "detail": "體液嚴重不足，若伴隨肌肉痠痛需警惕急性腎損傷",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-06-01": {
    "title": "臨床 WUT 脫水三指標自我判讀矩陣",
    "caption": "Weight (體重)、Urine (尿色)、Thirst (口渴) 交叉判定體液狀態。",
    "takeaway": "符合任一項需警惕，符合兩項以上脫水機率高達 90%。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "晨起體重變化 (W)",
        "晨尿顏色階數 (U)",
        "晨起口渴感受 (T)",
        "水合判讀結論"
      ],
      "rows": [
        {
          "label": "狀態 1 (優良)",
          "icon": "🟢",
          "cells": [
            "波動 < 1%",
            "1–3 階 (淡黃)",
            "無明顯口渴",
            {
              "text": "水合充沛，按常規補水",
              "tone": "good"
            }
          ]
        },
        {
          "label": "狀態 2 (注意)",
          "icon": "🟡",
          "cells": [
            "下降 1–2%",
            "4–5 階 (深黃)",
            "偶有口渴",
            {
              "text": "輕度脫水，補水 400–600 mL",
              "tone": "warn"
            }
          ]
        },
        {
          "label": "狀態 3 (警戒)",
          "icon": "🔴",
          "cells": [
            "下降 > 2%",
            "6–8 階 (茶褐)",
            "強烈口乾舌燥",
            {
              "text": "嚴重脫水，需電解質水介入",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-06-02": {
    "title": "晨起體重每日波動與水分流失量對照",
    "caption": "短期體重急劇下降超過 1% 多為體液流失而非脂肪減少。",
    "takeaway": "昨晚跑步後掉了 1 公斤？那是 1 公升的汗水，千萬別誤認成減肥成功。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "% 體重",
      "max": 5,
      "items": [
        {
          "label": "正常生理波動 (<1%)",
          "value": 0.8,
          "display": "< 1% (約 0.5 kg)",
          "tone": "good",
          "icon": "⚖️"
        },
        {
          "label": "輕度運動後缺水 (1–2%)",
          "value": 1.8,
          "display": "1–2% (約 1.2 kg)",
          "tone": "warn",
          "icon": "🏃"
        },
        {
          "label": "高溫勞動明顯脫水 (3–4%)",
          "value": 3.5,
          "display": "3–4% (約 2.5 kg)",
          "tone": "bad",
          "icon": "🥵"
        },
        {
          "label": "嚴重脫水臨床危急 (>5%)",
          "value": 5,
          "display": "> 5% (約 3.5 kg)",
          "tone": "bad",
          "icon": "🏥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-06-03": {
    "title": "尿比重 (USG) 檢驗數值與脫水嚴重度",
    "caption": "臨床折射計量測尿比重與水分滲透壓等級。",
    "takeaway": "尿比重超過 1.025 代表腎臟已處於極限濃縮狀態。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "< 1.010",
          "label": "良好充盈水合",
          "detail": "溶質濃度低，腎臟正常排水",
          "tone": "good",
          "icon": "💧"
        },
        {
          "range": "1.010 – 1.020",
          "label": "正常體液平衡",
          "detail": "健康成人常規水準",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "1.021 – 1.029",
          "label": "早期臨床脫水",
          "detail": "腎臟積極濃縮尿液，需主動補充液體",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "≥ 1.030",
          "label": "顯著嚴重脫水",
          "detail": "血液高滲透，腎小管重吸收極限",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-07-01": {
    "title": "咖啡與茶的淨水合指數（BHI 試驗）",
    "caption": "國際水分水合指數 (Beverage Hydration Index) 相對純水的保水率。",
    "takeaway": "常規飲用黑咖啡與無糖茶，淨水合效果與純水無顯著差異，破除脫水迷思。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "BHI 相對指數",
      "max": 1.5,
      "ref": {
        "value": 1,
        "label": "純水基準 = 1.0"
      },
      "items": [
        {
          "label": "口服電解質補液 ORS",
          "value": 1.5,
          "display": "1.50 (高保水)",
          "tone": "good",
          "icon": "🧪"
        },
        {
          "label": "全脂鮮乳 / 低脂乳",
          "value": 1.4,
          "display": "1.40 (高保水)",
          "tone": "good",
          "icon": "🥛"
        },
        {
          "label": "純開水 (基準)",
          "value": 1,
          "display": "1.00 (基準)",
          "tone": "good",
          "icon": "💧"
        },
        {
          "label": "無糖茶飲 (綠茶/紅茶)",
          "value": 1,
          "display": "1.00 (同純水)",
          "tone": "good",
          "icon": "🍵"
        },
        {
          "label": "適量美式黑咖啡",
          "value": 0.98,
          "display": "0.98 (同純水)",
          "tone": "good",
          "icon": "☕"
        },
        {
          "label": "拉格啤酒 (5% 酒精)",
          "value": 0.75,
          "display": "0.75 (淨脫水)",
          "tone": "bad",
          "icon": "🍺"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-07-02": {
    "title": "酒精濃度與利尿排泄倍率機轉",
    "caption": "不同酒精度數飲品引發下視丘 ADH 抑制後的排尿倍率。",
    "takeaway": "酒精抑制抗利尿激素，每喝 1 克純酒精會額外排出約 10 mL 尿液。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "攝入酒精乙醇",
          "detail": "迅速通過血腦屏障",
          "tone": "bad",
          "icon": "🍷"
        },
        {
          "label": "抑制下視丘分泌 ADH",
          "detail": "抗利尿激素濃度急劇歸零",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "集尿管 AQP2 關閉",
          "detail": "水分無法重吸收，大量衝入膀胱",
          "tone": "bad",
          "icon": "🚽"
        },
        {
          "label": "排尿量 > 攝入量",
          "detail": "引發急性高滲透脫水與隔日宿醉",
          "tone": "warn",
          "icon": "🤕"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-07-03": {
    "title": "高糖手搖飲的胃排空延遲與滲透壓負擔",
    "caption": "高果糖糖漿飲料如何阻礙水分快速吸收。",
    "takeaway": "含糖量高於 8% 的飲料會引發逆滲透，把血管裡的水反抽進腸胃道。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "等滲飲品 (糖 < 6%)",
          "icon": "⚡",
          "tone": "good",
          "points": [
            "胃排空迅速（10–15 分鐘）",
            "SGLT-1 共同運輸帶水入血",
            "快速恢復有效血容量"
          ]
        },
        {
          "title": "高糖手搖飲料 (糖 > 10%)",
          "icon": "🧋",
          "tone": "bad",
          "points": [
            "胃排空延遲 30–60 分鐘",
            "高滲透抽回腸道引發脹氣",
            "代謝高果糖加重肝臟負擔"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-08-01": {
    "title": "運動相關低血鈉 (EAH) 致命機轉路徑",
    "caption": "長途耐力運動狂灌純水引發腦水腫之病理發展。",
    "takeaway": "水中毒不是脫水，而是狂喝無鹽純水稀釋了血鈉，導致水分湧入腦細胞。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "過量飲用純水",
          "detail": "超過出汗量與腎臟最大排水速度",
          "tone": "bad",
          "icon": "🚰"
        },
        {
          "label": "血鈉急性稀釋 (<130 mmol/L)",
          "detail": "細胞外液滲透壓驟降",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "label": "水分子往細胞內灌注",
          "detail": "依滲透差湧入低滲腦神經細胞",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "急性腦水腫與腦疝脫",
          "detail": "頭痛、抽搐、意識混亂甚至致命",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-08-02": {
    "title": "低血鈉症狀嚴重度臨床階梯",
    "caption": "血清鈉離子濃度與臨床急症表徵。",
    "takeaway": "血鈉低於 125 mmol/L 屬於致死性急症，切勿誤當成中暑繼續灌水！",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "135–145 mmol/L",
          "label": "正常血鈉區間",
          "detail": "細胞內外液滲透平衡",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "130–134 mmol/L",
          "label": "輕度運動低血鈉",
          "detail": "輕微腹脹、噁心、輕度乏力",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "125–129 mmol/L",
          "label": "中度低血鈉警訊",
          "detail": "嚴重搏動性頭痛、嘔吐、步態不穩",
          "tone": "bad",
          "icon": "🤢"
        },
        {
          "range": "< 125 mmol/L",
          "label": "重度致命腦水腫",
          "detail": "抽搐、癲癇發作、昏迷、腦疝",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-08-03": {
    "title": "耐力運動補水雙策略實證對照",
    "caption": "定額強制狂飲 vs 依口渴補水（Drink to Thirst）的安全性評估。",
    "takeaway": "耐力路跑請依口渴補水，每小時不宜超過 400–800 mL。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "傳統排程強制狂飲",
          "icon": "❌",
          "tone": "bad",
          "points": [
            "每站強灌 2–3 大杯純水",
            "無視個人出汗率差異",
            "EAH 水中毒首要元兇"
          ]
        },
        {
          "title": "依口渴補水 (Drink to Thirst)",
          "icon": "✅",
          "tone": "good",
          "points": [
            "感到口渴時再小口飲水",
            "每小時 400–800 mL",
            "出汗多搭配電解質"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-09-01": {
    "title": "慢性輕度脫水對認知與反應時間的衝擊",
    "caption": "脫水 1–2% 對大腦專注力、工作記憶與警覺性的實驗數據。",
    "takeaway": "體重流失 1.5% 水分，注意力與警覺度下降達 20%，疲勞感增加 50%。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "% 表現下降",
      "max": 30,
      "items": [
        {
          "label": "注意力集中度",
          "value": 22,
          "display": "−22%",
          "tone": "warn",
          "icon": "🎯"
        },
        {
          "label": "短期工作記憶",
          "value": 18,
          "display": "−18%",
          "tone": "warn",
          "icon": "🧠"
        },
        {
          "label": "精細動作與反應時間",
          "value": 15,
          "display": "−15%",
          "tone": "warn",
          "icon": "⚡"
        },
        {
          "label": "自覺頭痛發生率",
          "value": 28,
          "display": "+28%",
          "tone": "bad",
          "icon": "🤕"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-09-02": {
    "title": "水合狀態對情緒與活力感之影響矩陣",
    "caption": "臨床補水對照實驗前後的主觀情緒量表變化。",
    "takeaway": "下午覺得昏昏欲睡、容易煩躁？先喝 300 mL 溫水往往比喝咖啡更有效。",
    "grade": "B",
    "chart": {
      "kind": "matrix",
      "cols": [
        "主觀指標",
        "輕度脫水狀態 (流失 1.3%)",
        "充分水合狀態",
        "臨床建議"
      ],
      "rows": [
        {
          "label": "清醒與活力感",
          "icon": "⚡",
          "cells": [
            "低落、倦怠昏睡",
            {
              "text": "飽滿敏捷",
              "tone": "good"
            },
            "午後定時喝水"
          ]
        },
        {
          "label": "焦慮與易怒度",
          "icon": "😤",
          "cells": [
            "顯著上升",
            {
              "text": "情緒平穩",
              "tone": "good"
            },
            "會議前先補 200mL"
          ]
        },
        {
          "label": "自覺頭痛機率",
          "icon": "🤕",
          "cells": [
            "偏頭痛風險增高",
            {
              "text": "大幅下降",
              "tone": "good"
            },
            "冷氣房不可忘記"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-10-01": {
    "title": "熱痙攣、熱衰竭到熱中暑的三階梯病理",
    "caption": "熱危害由輕至重三階段的生理分水嶺與急救對策。",
    "takeaway": "熱衰竭到熱中暑（體溫>40°C、停止出汗意識不清）是一線之隔的致命跳躍！",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "第一階：熱痙攣",
          "label": "局部肌肉痛性痙攣",
          "detail": "大量流汗失鈉，補充電解質水與陰涼休息即可緩解",
          "tone": "ok",
          "icon": "🦵"
        },
        {
          "range": "第二階：熱衰竭",
          "label": "頭暈心悸、大量流汗濕冷",
          "detail": "核心體溫 < 40°C，需平躺抬高下肢、積極降溫補液",
          "tone": "warn",
          "icon": "🥵"
        },
        {
          "range": "第三階：熱中暑 (致命)",
          "label": "核心體溫 > 40°C，中樞混亂",
          "detail": "體溫調節癱瘓、停止出汗、抽搐昏迷，立刻 119！",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-10-02": {
    "title": "高溫高濕環境下的熱危害指數 (Heat Index) 矩陣",
    "caption": "氣溫與相對濕度交互作用下的體感溫度警戒區。",
    "takeaway": "台灣濕度常達 80%，氣溫 32°C 體感就飆破 42°C，極易引發急性熱傷害！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "相對濕度 50%",
        "相對濕度 65%",
        "相對濕度 80%",
        "相對濕度 90% (台灣常態)"
      ],
      "rows": [
        {
          "label": "氣溫 30°C",
          "icon": "🌤️",
          "cells": [
            "體感 31°C (注意)",
            "體感 33°C (注意)",
            {
              "text": "體感 38°C (極度警戒)",
              "tone": "warn"
            },
            {
              "text": "體感 41°C (危險)",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "氣溫 33°C",
          "icon": "☀️",
          "cells": [
            "體感 35°C (警戒)",
            {
              "text": "體感 40°C (危險)",
              "tone": "warn"
            },
            {
              "text": "體感 48°C (極度危險)",
              "tone": "bad"
            },
            {
              "text": "體感 54°C (致命)",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "氣溫 36°C",
          "icon": "🔥",
          "cells": [
            {
              "text": "體感 42°C (危險)",
              "tone": "warn"
            },
            {
              "text": "體感 50°C (極度危險)",
              "tone": "bad"
            },
            {
              "text": "體感 62°C (極端致命)",
              "tone": "bad"
            },
            {
              "text": "體感 > 65°C",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-10-03": {
    "title": "熱中暑現場急救黃金 30 分鐘降溫法",
    "caption": "等待救護車期間快速將核心體溫降至 39°C 以下的標準程序。",
    "takeaway": "冷水浸泡法降溫速度比吹風扇快 10 倍，是運動醫學公認的救命金標準。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "辨識紅旗警訊",
          "detail": "體溫高燒 + 意識混亂或嗜睡，立刻撥打 119",
          "tone": "bad",
          "icon": "🚨"
        },
        {
          "label": "移至陰涼通風處",
          "detail": "鬆脫全身緊繃衣物，解開領口皮帶",
          "tone": "warn",
          "icon": "🌳"
        },
        {
          "label": "積極全身物理降溫",
          "detail": "冰水浸泡或以濕冷毛巾包裹身體並強力通風",
          "tone": "good",
          "icon": "🧊"
        },
        {
          "label": "頸部、腋下、鼠蹊置冰",
          "detail": "大動脈經過處加速血液回流降溫",
          "tone": "good",
          "icon": "❄️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-11-01": {
    "title": "特殊族群水分管理：常人多喝水 vs 限水族群鐵律",
    "caption": "一般成人健康補水與心衰竭/透析病患嚴格限水邊界的臨床對照。",
    "takeaway": "心衰竭與末期腎病患者「多喝水排毒」是致命威脅，每日限額必須嚴格精算。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "一般健康成人",
          "icon": "💧",
          "tone": "good",
          "points": [
            "每日總水約 30–35 mL/kg",
            "多餘水分由腎臟排出",
            "口渴主動補水"
          ]
        },
        {
          "title": "心衰竭 / 血液透析病友",
          "icon": "⛔",
          "tone": "bad",
          "points": [
            "每日限額：昨日尿量 + 500 mL",
            "喝多引發急性肺水腫掛急診",
            "3天增重 2kg 須即刻回診"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-11-02": {
    "title": "哺乳期與各生命階段水分需求比較",
    "caption": "各生理階段每日建議總水分攝入量（mL/日，含食物水）。",
    "takeaway": "哺乳期母乳 87% 是水，每天建議比平時額外多補充約 700–800 mL。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "mL / 日",
      "max": 3500,
      "items": [
        {
          "label": "健康成人女性基準",
          "value": 2200,
          "display": "2,200 mL",
          "tone": "good",
          "icon": "👩"
        },
        {
          "label": "健康成人男性基準",
          "value": 2700,
          "display": "2,700 mL",
          "tone": "good",
          "icon": "👨"
        },
        {
          "label": "懷孕中後期女性",
          "value": 2500,
          "display": "2,500 mL (+300)",
          "tone": "good",
          "icon": "🤰"
        },
        {
          "label": "產後哺乳期媽媽",
          "value": 3000,
          "display": "3,000 mL (+800)",
          "tone": "good",
          "icon": "🤱"
        },
        {
          "label": "高齡長者 (口渴退化)",
          "value": 1800,
          "display": "1,800–2,000 mL",
          "tone": "warn",
          "icon": "👴"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-12-01": {
    "title": "台灣海島型氣候下的水分流失環境對照",
    "caption": "室外濕熱大蒸籠 vs 室內冷氣除濕機的體液消耗特徵。",
    "takeaway": "戶外汗滴無法散熱，室內乾風默默抽乾；兩大情境需動態補水。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "戶外亞熱帶濕熱環境 (濕度 > 75%)",
          "icon": "☀️",
          "tone": "warn",
          "points": [
            "汗水整顆滴落無法蒸發散熱",
            "鈉隨汗水流失引發痙攣",
            "需帶電解質水定時小啜"
          ]
        },
        {
          "title": "室內冷氣乾燥環境 (濕度 40–50%)",
          "icon": "🏢",
          "tone": "info",
          "points": [
            "呼吸皮膚不感蒸發加倍",
            "體表乾爽容易「完全不渴」",
            "上下午各喝完 500mL 水瓶"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-12-02": {
    "title": "水分紀錄與游離糖紀錄雙軌拆分法",
    "caption": "手搖飲進胃裡：補進了水分，但同時灌入致病游離糖。",
    "takeaway": "喝大杯全糖冬瓜青茶補水？水進了細胞，但 12 顆方糖也塞爆了肝臟！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "水分軌道 (代謝需要)",
          "icon": "💧",
          "tone": "good",
          "points": [
            "有效液體體積：約 700 mL",
            "供應細胞內外液滲透稀釋",
            "維持腎臟正常排尿過濾"
          ]
        },
        {
          "title": "游離糖軌道 (代謝炸彈)",
          "icon": "⚠️",
          "tone": "bad",
          "points": [
            "吞入添加糖：高達 50–65 克 (10–13 顆方糖)",
            "遠超 WHO 每日 25 克上限 2 倍以上",
            "在肝臟啟動 DNL 累積脂肪肝"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-12-03": {
    "title": "台灣四大常見生活型態專屬水合對策矩陣",
    "caption": "機車通勤、辦公室內勤、外送勞動與百岳登山的生活化指引。",
    "takeaway": "因地制宜切換補水模式，才是生活化的健康實踐。",
    "grade": "B",
    "chart": {
      "kind": "matrix",
      "cols": [
        "情境特徵",
        "潛在水合風險",
        "黃金實踐行動",
        "攜帶裝備"
      ],
      "rows": [
        {
          "label": "機車通勤族",
          "icon": "🛵",
          "cells": [
            "全罩安全帽 + 停等紅燈熱輻射",
            "體感溫度極高、出汗快",
            "出門前先喝 200 mL 水",
            "隨身輕量水壺"
          ]
        },
        {
          "label": "辦公室久坐族",
          "icon": "💻",
          "cells": [
            "冷氣乾燥 + 久坐專注忘記喝",
            "下班頭痛疲倦、尿液深濃",
            "定時起身倒水、尿色維持淡黃",
            "500 mL 刻度馬克杯"
          ]
        },
        {
          "label": "戶外外送/工地",
          "icon": "🏗️",
          "cells": [
            "烈日暴曬 + 重度出汗失鹽",
            "熱衰竭與電解質抽筋",
            "雙水壺：一壺水、一壺稀釋電解質",
            "1,500 mL 保溫大水壺"
          ]
        },
        {
          "label": "百岳登山者",
          "icon": "🧗",
          "cells": [
            "高海拔乾燥 + 呼吸急促大失水",
            "高山症與血液濃縮血栓",
            "行進間吸管水袋小口啜飲",
            "胸前水袋 + 保溫瓶"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-13-01": {
    "title": "極端熱浪高溫日心血管與腎臟急診風險",
    "caption": "氣溫超過 35°C 時急診相關疾病住院率相對於常溫天之上升幅度。",
    "takeaway": "熱浪是無形殺手，長者與慢性病患需主動避暑補水。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 急診風險上升",
      "max": 40,
      "items": [
        {
          "label": "急性腎損傷 (AKI)",
          "value": 32,
          "display": "+32%",
          "tone": "bad",
          "icon": "🫘"
        },
        {
          "label": "熱衰竭與中暑",
          "value": 38,
          "display": "+38%",
          "tone": "bad",
          "icon": "🌡️"
        },
        {
          "label": "心肌梗塞 / 心衰竭惡化",
          "value": 20,
          "display": "+20%",
          "tone": "bad",
          "icon": "🫀"
        },
        {
          "label": "缺血性腦中風",
          "value": 18,
          "display": "+18%",
          "tone": "bad",
          "icon": "🧠"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-W-13-02": {
    "title": "新型代謝藥物使用者的水分安全閘矩陣",
    "caption": "GLP-1 減重針劑與 SGLT2 排糖抑制劑的脫水風險對照。",
    "takeaway": "用藥期間口渴感知降低或尿糖多帶水，生病吃不下時務必啟動「生病日規則」。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "藥物類別",
        "主要生理機制",
        "脫水風險成因",
        "安全防護規則"
      ],
      "rows": [
        {
          "label": "GLP-1 減重針",
          "icon": "💉",
          "cells": [
            "延緩胃排空、中樞抑制食慾",
            "口渴感下降 + 嘔吐腹瀉",
            {
              "text": "定時小口喝水，防範急性腎損傷",
              "tone": "warn"
            }
          ]
        },
        {
          "label": "SGLT2 抑制劑",
          "icon": "💊",
          "cells": [
            "阻斷腎臟回收葡萄糖，尿糖排出",
            "滲透性利尿每日多排 400 mL 水",
            {
              "text": "嘔吐腹瀉時啟動生病日暫停規則",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "草酸鈣腎結石者",
          "icon": "💎",
          "cells": [
            "尿中草酸與鈣結晶成石",
            "飲水過少導致尿液高度過飽和",
            {
              "text": "目標每日尿量達 2.5 公升以上",
              "tone": "good"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-01-01": {
    "title": "膳食脂肪 95% 以上是三酸甘油酯結構圖",
    "caption": "1 個三碳甘油骨架接上 3 條長短與飽和度不同的脂肪酸分子。",
    "takeaway": "脂肪的熔點、耐熱性與心血管效應，完全由這三條脂肪酸的雙鍵決定。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "三碳甘油分子骨架 (Glycerol)",
          "detail": "三個碳原子各帶一個羥基 (-OH)",
          "tone": "info",
          "icon": "🦴"
        },
        {
          "label": "形成三個酯鍵 (Ester Bonds)",
          "detail": "脫水縮合分別連接三條脂肪酸",
          "tone": "good",
          "icon": "🔗"
        },
        {
          "label": "三條脂肪酸尾巴 (4–24 碳)",
          "detail": "碳鏈長度、雙鍵位置主宰全部物性",
          "tone": "good",
          "icon": "🧬"
        },
        {
          "label": "構成 95% 膳食油脂與體脂肪",
          "detail": "人體能量密度最高的濃縮燃料庫 (9 kcal/g)",
          "tone": "good",
          "icon": "🧈"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-01-03": {
    "title": "「油 (Oil)」與「脂 (Fat)」的室溫熔點分界",
    "caption": "常溫 20–25°C 下因碳鏈飽和度導致的液態 vs 固態物理形態。",
    "takeaway": "常溫呈液態叫「油」，呈固態膏狀叫「脂」；本質都是三酸甘油酯。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "熔點 < 0°C (極度低溫凝固)",
          "label": "多元不飽和油 (PUFA 多)",
          "detail": "亞麻仁油、魚油，冰箱冷藏依然清澈液態",
          "tone": "good",
          "icon": "💧"
        },
        {
          "range": "熔點 0–15°C (低溫開始結晶)",
          "label": "單元不飽和油 (MUFA 多)",
          "detail": "特級初榨橄欖油、苦茶油，冷藏呈雲霧凝態",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "range": "熔點 25–45°C (室溫呈膏固狀)",
          "label": "飽和脂肪 (SFA 多)",
          "detail": "豬油、牛油、椰子油、棕櫚油，常溫即凝固",
          "tone": "warn",
          "icon": "🧈"
        },
        {
          "range": "熔點 > 50°C (高熔點硬脂)",
          "label": "工業完全氫化油",
          "detail": "人工工業硬脂，耐熱耐儲存",
          "tone": "bad",
          "icon": "🧱"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-02-03": {
    "title": "化學代碼解碼：C18:2 n-6 到底代表什麼",
    "caption": "國際脂肪酸命名法：碳鏈長度、雙鍵個數與首個雙鍵位置解析。",
    "takeaway": "學會看懂代碼：C18 代表 18 碳，:2 代表 2 個雙鍵，n-6 代表 Omega-6 家族。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "化學代號標記",
        "生化實質含義",
        "直白白話解讀",
        "常見代表食物"
      ],
      "rows": [
        {
          "label": "C18:0 (硬脂酸)",
          "icon": "🥩",
          "cells": [
            "18 碳、0 個雙鍵",
            "純飽和脂肪酸，直鏈排列緊密",
            "牛排、巧克力可可脂"
          ]
        },
        {
          "label": "C18:1 n-9 (油酸)",
          "icon": "🫒",
          "cells": [
            "18 碳、1 個雙鍵、第 9 碳",
            "Omega-9 單元不飽和脂肪 (MUFA)",
            "特級初榨橄欖油、苦茶油"
          ]
        },
        {
          "label": "C18:2 n-6 (亞麻油酸)",
          "icon": "🌻",
          "cells": [
            "18 碳、2 個雙鍵、第 6 碳",
            "Omega-6 必需多元不飽和脂肪 (PUFA)",
            "大豆油、玉米油、葵花油"
          ]
        },
        {
          "label": "C18:3 n-3 (α-亞麻酸)",
          "icon": "🌱",
          "cells": [
            "18 碳、3 個雙鍵、第 3 碳",
            "Omega-3 必需多元不飽和脂肪",
            "亞麻仁油、紫蘇油、奇亞籽"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-03-03": {
    "title": "台灣在地高 CP 值 Omega-3 魚種排行榜",
    "caption": "每 100 克魚肉所含 EPA + DHA 毫克數與市場價格性價比。",
    "takeaway": "不必花大錢買進口鮭魚！台灣在地的鯖魚與秋刀魚 Omega-3 含量遠勝鮭魚！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "mg EPA+DHA / 100g",
      "max": 5500,
      "ref": {
        "value": 500,
        "label": "每日健康建議攝取量 500 mg"
      },
      "items": [
        {
          "label": "台灣鯖魚 (花腹鯖/白腹鯖)",
          "value": 5000,
          "display": "4,500–5,200 mg (超高CP值冠軍)",
          "tone": "good",
          "icon": "🐟"
        },
        {
          "label": "秋刀魚",
          "value": 3500,
          "display": "3,000–3,800 mg (平價之王)",
          "tone": "good",
          "icon": "🐟"
        },
        {
          "label": "野生/養殖鮭魚 (Salmon)",
          "value": 2200,
          "display": "2,000–2,500 mg",
          "tone": "good",
          "icon": "🍣"
        },
        {
          "label": "台灣虱目魚肚 (油脂豐厚)",
          "value": 1800,
          "display": "1,500–2,000 mg",
          "tone": "good",
          "icon": "🍲"
        },
        {
          "label": "金槍魚/鮪魚赤身 (瘦肉部位)",
          "value": 300,
          "display": "200–400 mg (偏少)",
          "tone": "ok",
          "icon": "🍣"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-03-04": {
    "title": "迷思：Omega-6 與 Omega-3 必須精準維持 4:1？",
    "caption": "臨床醫學與公衛指引對 Omega 比例的現代科學解讀。",
    "takeaway": "比起執著於精確數學比例，更重要的第一步是「增加深海魚攝取、減少油炸加工品」。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "過度教條式的迷思",
          "icon": "📐",
          "tone": "warn",
          "points": [
            "每餐拿計算機精算 Omega 6:3 比例",
            "把大豆油當成致命毒藥完全不敢碰",
            "以為只要吃比例對的油就不會生病"
          ]
        },
        {
          "title": "現代心血管醫學實踐",
          "icon": "🥗",
          "tone": "good",
          "points": [
            "每週固定吃 2–3 次深海高脂魚（補足 Omega-3 底線）",
            "烹調油換成富含 MUFA 的橄欖油或苦茶油",
            "減少洋芋片、鹹酥雞等高溫氧化種子油",
            "整體飲食品質自然帶動抗發炎平衡"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-01-02": {
    "title": "三酸甘油酯 (TAG) 水解與消化吸收歷程",
    "caption": "胰脂酶將 1 個甘油接 3 條脂肪酸分子拆解為游離脂肪酸並吸收。",
    "takeaway": "吃進的油脂 95% 是三酸甘油酯，在小腸拆解後於腸細胞重新包裝送入乳糜微粒。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "三酸甘油酯進十二指腸",
          "detail": "肝臟膽鹽乳化形成微膠粒",
          "tone": "info",
          "icon": "🧈"
        },
        {
          "label": "胰脂酶定向水解",
          "detail": "切斷 sn-1 與 sn-3 酯鍵，產出游離脂肪酸與 2-單酸甘油酯",
          "tone": "good",
          "icon": "✂️"
        },
        {
          "label": "腸上皮細胞被動擴散",
          "detail": "穿透小腸微絨毛吸收",
          "tone": "good",
          "icon": "🔬"
        },
        {
          "label": "再酯化包裝為乳糜微粒",
          "detail": "進入淋巴管，送入全身循環",
          "tone": "good",
          "icon": "🩸"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-02-01": {
    "title": "脂肪酸碳鏈雙鍵化學結構特性對照",
    "caption": "飽和脂肪酸、單元不飽和 MUFA 與多元不飽和 PUFA 的碳鏈構型。",
    "takeaway": "雙鍵越多熔點越低、常溫越呈液態，但抗高溫氧化能力也越脆弱。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "碳鏈雙鍵數",
        "常溫物理外觀",
        "化學熱穩定度",
        "代表常見食用油"
      ],
      "rows": [
        {
          "label": "飽和脂肪 (SFA)",
          "icon": "🥩",
          "cells": [
            "無雙鍵 (C-C 單鍵)",
            "固體 / 膏狀",
            {
              "text": "極高 (耐熱耐煎炸)",
              "tone": "good"
            },
            "牛油、豬油、椰子油"
          ]
        },
        {
          "label": "單元不飽和 (MUFA)",
          "icon": "🫒",
          "cells": [
            "1 個雙鍵 (Omega-9)",
            "液態清澈",
            {
              "text": "高 (適合家常快炒)",
              "tone": "good"
            },
            "特級初榨橄欖油、苦茶油"
          ]
        },
        {
          "label": "多元不飽和 (PUFA)",
          "icon": "🐟",
          "cells": [
            "2 個以上雙鍵 (O3/O6)",
            "高度液態流動",
            {
              "text": "低 (易氧化變質)",
              "tone": "warn"
            },
            "大豆油、亞麻仁油、魚油"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-02-02": {
    "title": "常用食用油脂肪酸比例組成橫向長條圖",
    "caption": "各大食用油之飽和 (SFA)、單元 (MUFA) 與多元 (PUFA) 脂肪酸百分比。",
    "takeaway": "橄欖油與苦茶油富含 70–80% 油酸 MUFA，是心血管最友善的穩定用油。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 單元不飽和 (MUFA)",
      "max": 90,
      "items": [
        {
          "label": "苦茶油 (茶油)",
          "value": 82,
          "display": "82% MUFA (耐高溫)",
          "tone": "good",
          "icon": "🍵"
        },
        {
          "label": "特級初榨橄欖油",
          "value": 75,
          "display": "75% MUFA (多酚高)",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "label": "高油酸葵花油",
          "value": 80,
          "display": "80% MUFA (精煉耐炸)",
          "tone": "good",
          "icon": "🌻"
        },
        {
          "label": "芥花油 (Canola)",
          "value": 62,
          "display": "62% MUFA",
          "tone": "good",
          "icon": "🌼"
        },
        {
          "label": "大豆沙拉油",
          "value": 24,
          "display": "24% MUFA (PUFA 60%)",
          "tone": "warn",
          "icon": "🫘"
        },
        {
          "label": "自榨新鮮豬油",
          "value": 44,
          "display": "44% MUFA (SFA 39%)",
          "tone": "warn",
          "icon": "🐖"
        },
        {
          "label": "純椰子油",
          "value": 6,
          "display": "6% MUFA (SFA 90%)",
          "tone": "bad",
          "icon": "🥥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-03-01": {
    "title": "天然順式雙鍵 vs 人工反式雙鍵立體構型對照",
    "caption": "順式 (Cis) 彎折碳鏈與反式 (Trans) 剛性直鏈的生物膜效應。",
    "takeaway": "反式脂肪把原本彎曲的分子拉直，讓細胞膜硬化並阻礙 LDL 受體回收。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "天然不飽和脂肪 (Cis 順式)",
          "icon": "🌱",
          "tone": "good",
          "points": [
            "氫原子在雙鍵同側",
            "碳鏈呈 120° 角度自然彎折",
            "維持細胞膜高流動性與彈性",
            "促進肝細胞正常回收 LDL"
          ]
        },
        {
          "title": "人工氫化油 (Trans 反式)",
          "icon": "⚠️",
          "tone": "bad",
          "points": [
            "氫原子在雙鍵異側",
            "碳鏈被硬拉直如飽和脂肪",
            "插入細胞膜引發動脈內皮硬化",
            "強烈抑制 LDL 受體表現"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-03-02": {
    "title": "反式脂肪對血脂的雙向破壞打擊",
    "caption": "反式脂肪在拉高壞膽固醇 (LDL-C) 同時拉低好膽固醇 (HDL-C)。",
    "takeaway": "沒有任何安全閾值！每日熱量每 2% 來自反式脂肪，心血管疾病風險飆升 23%。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 變動幅度",
      "max": 30,
      "items": [
        {
          "label": "壞膽固醇 LDL-C",
          "value": 15,
          "display": "+15% (升高硬化)",
          "tone": "bad",
          "icon": "📈"
        },
        {
          "label": "好膽固醇 HDL-C",
          "value": 10,
          "display": "−10% (下降損耗)",
          "tone": "bad",
          "icon": "📉"
        },
        {
          "label": "三酸甘油酯 TG",
          "value": 18,
          "display": "+18% (升高肝脂)",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "label": "冠心病整體死亡風險",
          "value": 23,
          "display": "+23% (大幅飆升)",
          "tone": "bad",
          "icon": "💔"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-04-01": {
    "title": "Omega-6 vs Omega-3 的體內發炎翹翹板",
    "caption": "花生四烯酸 (AA) 促發炎 vs EPA/DHA 抗發炎消退素的生化競爭。",
    "takeaway": "兩者共享同組去飽和酶 COX/LOX，Omega-6 太多會直接封殺 Omega-3 的抗發炎路徑。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "Omega-6 途徑 (亞麻油酸 → 花生四烯酸 AA)",
          "icon": "🔥",
          "tone": "warn",
          "points": [
            "外食大豆油、玉米油含量極高",
            "代謝為 PGE2、TXA2、LTB4",
            "促進血小板凝集、血管收縮與發炎",
            "慢性過量與動脈粥狀硬化相關"
          ]
        },
        {
          "title": "Omega-3 途徑 (ALA → EPA / DHA)",
          "icon": "🌊",
          "tone": "good",
          "points": [
            "深海魚油、藻油、奇亞籽",
            "代謝為 PGE3、Resolvins (消退素)",
            "抗血小板過度凝集、血管放鬆舒張",
            "強效終結血管微發炎級聯反應"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-04-02": {
    "title": "演化黃金攝取比例 vs 現代外食 Omega 6:3 失衡",
    "caption": "人類遠古飲食的 Omega 6:3 比例 vs 現代精煉種子油氾濫後的懸殊落差。",
    "takeaway": "黃金比例應小於 4:1，現代外食往往高達 15:1 甚至 20:1，讓身體處於慢性微發炎。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "Omega 6 : 3 比例",
      "max": 20,
      "ref": {
        "value": 4,
        "label": "黃金安全比例 ≤ 4:1"
      },
      "items": [
        {
          "label": "演化遠古狩獵採集飲食",
          "value": 1,
          "display": "1:1 (理想平衡)",
          "tone": "good",
          "icon": "🏹"
        },
        {
          "label": "地中海沿岸傳統飲食",
          "value": 3,
          "display": "2:1 – 4:1 (健康抗炎)",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "label": "現代都市常態飲食",
          "value": 12,
          "display": "10:1 – 15:1 (促發炎)",
          "tone": "warn",
          "icon": "🏙️"
        },
        {
          "label": "重度加工外食外送族",
          "value": 20,
          "display": "16:1 – 20:1 (嚴重失衡)",
          "tone": "bad",
          "icon": "🛵"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-04-03": {
    "title": "植物性 ALA 轉化為 EPA 與 DHA 的轉化率瓶頸",
    "caption": "亞麻仁油中的 α-亞麻酸 (ALA) 在人體肝臟酵素鏈轉換率。",
    "takeaway": "植物 ALA 轉成 DHA 效率不到 1%，純素食者需透過微藻油補充活性 DHA。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 轉化率",
      "max": 10,
      "items": [
        {
          "label": "ALA 轉化為 EPA",
          "value": 7,
          "display": "5–8% (偏低)",
          "tone": "warn",
          "icon": "🧪"
        },
        {
          "label": "ALA 轉化為 DHA",
          "value": 0.8,
          "display": "< 1% (極端低下)",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "直接攝取深海魚油 / 藻油",
          "value": 10,
          "display": "100% (直接利用)",
          "tone": "good",
          "icon": "🐟"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-05-01": {
    "title": "飽和脂肪攝取與心血管疾病風險大型統合分析",
    "caption": "考科藍 (Cochrane) 與 AHA 統合分析：以不飽和脂肪取代飽和脂肪的獲益。",
    "takeaway": "飽和脂肪壓制在總熱量 10% 以下（約 20 克），能顯著降低心肌梗塞風險。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 心血管事件降低",
      "max": 30,
      "items": [
        {
          "label": "以 PUFA 多元不飽和取代 SFA",
          "value": 25,
          "display": "−25% (保護最顯著)",
          "tone": "good",
          "icon": "🐟"
        },
        {
          "label": "以 MUFA 單元不飽和取代 SFA",
          "value": 15,
          "display": "−15% (顯著獲益)",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "label": "以全穀雜糧高纖碳水取代 SFA",
          "value": 10,
          "display": "−10% (有益)",
          "tone": "ok",
          "icon": "🌾"
        },
        {
          "label": "以精製白糖/精製澱粉取代 SFA",
          "value": 0,
          "display": "0% (反增加三酸甘油酯)",
          "tone": "bad",
          "icon": "🍰"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-05-02": {
    "title": "置換飽和脂肪的血脂與死亡率效應",
    "caption": "不同營養素取代 5% 飽和脂肪熱量的心血管死亡率風險比 (HR)。",
    "takeaway": "換成好油（PUFA/MUFA）降死亡率，換成蛋糕手搖飲反而心血管更危險。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "成功置換：換成不飽和植物油",
          "icon": "✅",
          "tone": "good",
          "points": [
            "LDL-C 下降 8–12 mg/dL",
            "冠心病發作率下降 18–25%",
            "動脈血管內皮舒張功能改善"
          ]
        },
        {
          "title": "弄巧成拙：換成低脂高糖食品",
          "icon": "❌",
          "tone": "bad",
          "points": [
            "三酸甘油酯反向飆升 20%",
            "好膽固醇 HDL-C 明顯下跌",
            "心血管整體硬化死亡率未見下降"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-05-03": {
    "title": "WHO 2023 全球脂質指引數值錨點",
    "caption": "成人每日各類脂肪熱量占比的上限與建議範圍（以 2,000 kcal 計算）。",
    "takeaway": "總脂肪 15–30%，飽和脂肪 < 10%（約 22 克），反式脂肪嚴禁 < 1%。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 總熱量上限",
      "max": 35,
      "items": [
        {
          "label": "總脂肪攝取區間",
          "value": 30,
          "display": "20–30% (45–65 克)",
          "tone": "ok",
          "icon": "🍽️"
        },
        {
          "label": "飽和脂肪上限 (SFA)",
          "value": 10,
          "display": "< 10% (約 22 克)",
          "tone": "warn",
          "icon": "🧈"
        },
        {
          "label": "高血脂心血管高危族 SFA",
          "value": 6,
          "display": "< 6% (約 13 克)",
          "tone": "bad",
          "icon": "❤️‍🩹"
        },
        {
          "label": "反式脂肪上限 (Trans)",
          "value": 1,
          "display": "< 1% (理想為 0)",
          "tone": "bad",
          "icon": "🚫"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-05-04": {
    "title": "膳食膽固醇 vs 飽和脂肪對血中 LDL-C 衝擊比",
    "caption": "吃進的膽固醇僅貢獻 20% 血膽固醇；飽和脂肪透過破壞 LDL 受體貢獻更大。",
    "takeaway": "一顆水煮蛋的膽固醇無罪；五花肉、炸雞排裡的高飽和油才是真正的元兇。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "膳食膽固醇 (如蛋黃、蝦子)",
          "icon": "🥚",
          "tone": "ok",
          "points": [
            "健康人腸道吸收有負回饋抑制",
            "僅貢獻血中膽固醇約 15–20%",
            "大部分人適度攝取不會讓 LDL 暴衝"
          ]
        },
        {
          "title": "飽和脂肪與反式脂肪",
          "icon": "🥩",
          "tone": "bad",
          "points": [
            "強烈壓制肝細胞表面 LDL-Receptor",
            "阻斷血液中壞膽固醇清除回收",
            "是推升動脈斑塊硬化的頭號動力"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-06-01": {
    "title": "工業部分氫化植物油 (PHO) 製造機轉",
    "caption": "植物油高溫高壓通氫氣以延長貨架期，副產物即為反式脂肪。",
    "takeaway": "為了讓植物油像奶油一樣固化、耐炸不壞，卻造出心血管頭號殺手。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "大豆或玉米液態油",
          "detail": "富含天然順式雙鍵 PUFA",
          "tone": "info",
          "icon": "🫘"
        },
        {
          "label": "高溫加壓鎳觸媒通氫",
          "detail": "部分雙鍵飽和化",
          "tone": "warn",
          "icon": "⚙️"
        },
        {
          "label": "雙鍵立體構型翻轉",
          "detail": "順式 Cis 扭轉為剛性反式 Trans",
          "tone": "bad",
          "icon": "🧪"
        },
        {
          "label": "生成酥油與人造奶油",
          "detail": "常溫固態、耐炸、保存期極長",
          "tone": "bad",
          "icon": "🥐"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-06-02": {
    "title": "反式脂肪對全身動脈硬化進程階梯",
    "caption": "反式脂肪攝入量與心血管死亡風險的劑量反應階梯。",
    "takeaway": "世界各國已全面禁止部分氫化油，它是醫學界少數共識「零容忍」的成分。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "0 g/日",
          "label": "理想安全境界",
          "detail": "完全排除工業反式脂肪",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "1–2 g/日 (半個廉價牛角包)",
          "label": "早期內皮微發炎",
          "detail": "TNF-α 與 CRP 發炎指標上升",
          "tone": "warn",
          "icon": "🥐"
        },
        {
          "range": "3–5 g/日",
          "label": "動脈硬化斑塊加速",
          "detail": "LDL 氧化沉積於冠狀動脈",
          "tone": "bad",
          "icon": "💔"
        },
        {
          "range": "> 5 g/日",
          "label": "致命心血管高危險群",
          "detail": "猝死與心肌梗塞風險上升逾 50%",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-06-03": {
    "title": "台灣法規「反式脂肪標示為 0」的隱形累積陷阱",
    "caption": "每 100g 反式脂肪低於 0.3g 可合法標示為 0 之盲點。",
    "takeaway": "成分表若出現「氫化植物油、酥油、人造奶油、植物乳膏」，即使標示 0 也藏有微量殘留！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "台灣現行法規標準",
          "icon": "⚖️",
          "tone": "info",
          "points": [
            "每 100 克食品中含量 ≤ 0.3 克",
            "即可在營養標示上標為「0」",
            "防範極微量檢驗誤差"
          ]
        },
        {
          "title": "消費者的累積風險",
          "icon": "⚠️",
          "tone": "bad",
          "points": [
            "吃一包 200g 夾心餅乾可能吞進 0.5g",
            "一天吃兩三樣點心就累積超標",
            "務必翻到背面檢查「成分表原料」"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-07-01": {
    "title": "特級初榨橄欖油 (EVOO) 發煙點與耐熱真相",
    "caption": "低游離脂肪酸 (<0.8%) 與高抗氧化多酚賦予的高溫熱穩定性。",
    "takeaway": "高品質 EVOO 發煙點高達 190–210°C，家常中溫快炒（160–180°C）安全穩定。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "°C 溫度",
      "max": 220,
      "items": [
        {
          "label": "家常水油拌炒水沸點",
          "value": 100,
          "display": "100°C (絕對安全)",
          "tone": "good",
          "icon": "🥬"
        },
        {
          "label": "家常中小火快炒 / 煎魚",
          "value": 160,
          "display": "150–170°C (安全範圍)",
          "tone": "good",
          "icon": "🍳"
        },
        {
          "label": "特級初榨橄欖油發煙點",
          "value": 200,
          "display": "190–210°C (臨界點)",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "label": "大火熱油爆炒至冒白煙",
          "value": 215,
          "display": "> 210°C (破壞多酚產生醛)",
          "tone": "bad",
          "icon": "🔥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-07-02": {
    "title": "家庭廚房依烹調溫度配置用油矩陣",
    "caption": "低溫涼拌、家常炒菜、高溫煎炸的三階油品配置策略。",
    "takeaway": "廚房只需備兩罐油：一罐涼拌小炒的初榨橄欖油/苦茶油，一罐高溫煎炸的高油酸葵花油。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "烹飪手法",
        "鍋內典型溫度",
        "最佳推薦油種",
        "嚴格禁止油種"
      ],
      "rows": [
        {
          "label": "涼拌、沾食、滴湯",
          "icon": "🥗",
          "cells": [
            "常溫 – 40°C",
            "亞麻仁油、特級初榨橄欖油、紫蘇油",
            {
              "text": "無限制",
              "tone": "good"
            }
          ]
        },
        {
          "label": "水炒、家常中小火快炒",
          "icon": "🍳",
          "cells": [
            "100 – 170°C",
            "苦茶油、特級初榨橄欖油、芥花油",
            {
              "text": "亞麻仁油 (嚴禁加熱)",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "高溫爆炒、深層油炸",
          "icon": "🍗",
          "cells": [
            "180 – 200°C",
            "精製酪梨油、高油酸葵花油、苦茶油",
            {
              "text": "未精煉初榨油、奶油",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-07-03": {
    "title": "椰子油迷思：中鏈脂肪酸 (MCT) vs 心血管代價",
    "caption": "天然椰子油富含月桂酸 (C12)，臨床試驗顯著推升 LDL-C 壞膽固醇。",
    "takeaway": "純 MCT 油不等於椰子油；椰子油 90% 是飽和脂肪，不能當萬靈丹天天狂喝。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "純醫療級 MCT 油 (C8/C10)",
          "icon": "🧪",
          "tone": "info",
          "points": [
            "辛酸與癸酸，直通門靜脈吸收",
            "迅速在肝臟生成酮體供能",
            "主要用於特定癲癇或臨床營養"
          ]
        },
        {
          "title": "天然椰子油 (含 50% 月桂酸 C12)",
          "icon": "🥥",
          "tone": "warn",
          "points": [
            "月桂酸大半走乳糜微粒淋巴吸收",
            "臨床統合分析證實顯著升高 LDL-C",
            "心血管指引皆不建議高量日常攝取"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-08-01": {
    "title": "發煙點的化學本質與油煙毒性路徑",
    "caption": "油品被加熱至發煙點以上時甘油熱解為致癌丙烯醛 (Acrolein)。",
    "takeaway": "看到鍋子冒白煙代表油脂已裂解！吸入油煙更是女性肺癌的重要誘因。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "加熱超過發煙點",
          "detail": "游離脂肪酸快速氧化斷裂",
          "tone": "warn",
          "icon": "🔥"
        },
        {
          "label": "甘油脫水分解",
          "detail": "產生刺鼻有毒氣體「丙烯醛 (Acrolein)」",
          "tone": "bad",
          "icon": "💨"
        },
        {
          "label": "生成揮發性過氧化物",
          "detail": "油煙吸入刺激呼吸道黏膜",
          "tone": "bad",
          "icon": "🫁"
        },
        {
          "label": "鍋內殘油極性分子暴增",
          "detail": "油品顏色變深變稠，致癌物沉積",
          "tone": "bad",
          "icon": "🍳"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-08-02": {
    "title": "氧化穩定性 (OSI) vs 發煙點的實測差異",
    "caption": "發煙點高不等於耐熱！富含多酚的橄欖油氧化分解物遠少於精煉種子油。",
    "takeaway": "發煙點只是外在指標，「脂肪酸穩定度（MUFA多）與多酚含量」才是抗劣變關鍵。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "特級初榨橄欖油 (EVOO)",
          "icon": "🫒",
          "tone": "good",
          "points": [
            "發煙點約 195–210°C (中高)",
            "75% 單元不飽和脂肪 (不易斷鍵)",
            "天然多酚與維生素 E 充當人肉盾牌",
            "高溫加熱產生的極性有害物最少"
          ]
        },
        {
          "title": "精煉玉米油 / 大豆油",
          "icon": "🌽",
          "tone": "warn",
          "points": [
            "發煙點高達 230°C (看似極高)",
            "60% 多元不飽和 PUFA (化學鍵脆弱)",
            "精煉過程中天然抗氧化劑幾乎脫除",
            "高溫長時間煎炸迅速氧化產生有毒醛類"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-08-03": {
    "title": "常見食用油安全發煙點橫向尺度對照",
    "caption": "各大油品從未精煉到精煉之典型發煙點（°C）。",
    "takeaway": "亞麻仁油只有 107°C 嚴禁加熱；酪梨油與苦茶油超過 230°C 最耐高溫。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "°C 發煙點",
      "max": 260,
      "items": [
        {
          "label": "精煉酪梨油",
          "value": 250,
          "display": "250°C (超耐熱)",
          "tone": "good",
          "icon": "🥑"
        },
        {
          "label": "苦茶油 (茶籽油)",
          "value": 230,
          "display": "230°C (耐高溫炒)",
          "tone": "good",
          "icon": "🍵"
        },
        {
          "label": "高油酸葵花油",
          "value": 225,
          "display": "225°C (精煉耐炸)",
          "tone": "good",
          "icon": "🌻"
        },
        {
          "label": "特級初榨橄欖油 (EVOO)",
          "value": 200,
          "display": "190–210°C (中溫炒)",
          "tone": "good",
          "icon": "🫒"
        },
        {
          "label": "未精煉初榨芝麻油",
          "value": 175,
          "display": "175°C (中低溫提味)",
          "tone": "ok",
          "icon": "🌱"
        },
        {
          "label": "天然無水牛油 / 豬油",
          "value": 185,
          "display": "185°C",
          "tone": "ok",
          "icon": "🧈"
        },
        {
          "label": "未精煉亞麻仁油",
          "value": 107,
          "display": "107°C (嚴禁加熱，僅涼拌)",
          "tone": "bad",
          "icon": "⚠️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-08-04": {
    "title": "家常油炸與熱炒的五大安全守則",
    "caption": "降低油品熱裂解與雜環胺致癌物生成的防護 SOP。",
    "takeaway": "食材水分吸乾防油爆、熱鍋冷油不過度加熱、油炸後立刻撈除油渣。",
    "grade": "B",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "擦乾食材表面水分",
          "detail": "水分會加速高溫油脂水解劣變",
          "tone": "good",
          "icon": "🧻"
        },
        {
          "label": "油溫控制在 170–180°C",
          "detail": "以木筷試油：周圍冒密集細小氣泡即為合適溫度",
          "tone": "good",
          "icon": "🥢"
        },
        {
          "label": "隨時撈除沉底焦黑油渣",
          "detail": "炭化碳粒會催化整鍋油加速酸敗",
          "tone": "warn",
          "icon": "🥄"
        },
        {
          "label": "絕不反覆回鍋使用多次",
          "detail": "家用炸油最多二次使用，不可混入新油長期使用",
          "tone": "bad",
          "icon": "🚫"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-09-01": {
    "title": "油脂氧化的四大隱形催化殺手矩陣",
    "caption": "光照、高溫、氧氣與過渡金屬如何加速油品酸敗。",
    "takeaway": "好油買回家放瓦斯爐旁邊曬太陽？不到兩週整瓶油就充斥自由基！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "催化因子",
        "破壞機轉",
        "日常最常見犯錯情境",
        "防禦對策"
      ],
      "rows": [
        {
          "label": "光照 (紫外線/日光燈)",
          "icon": "☀️",
          "cells": [
            "激發葉綠素光敏劑產生單線態氧",
            "買透明塑膠瓶裝並擺在窗台邊",
            {
              "text": "選深色玻璃瓶裝或暗櫃存放",
              "tone": "good"
            }
          ]
        },
        {
          "label": "溫度 (熱源輻射)",
          "icon": "🔥",
          "cells": [
            "每升高 10°C 氧化速率倍增",
            "大容量油壺直接擺在瓦斯爐火旁",
            {
              "text": "遠離爐灶，置於背光陰涼處",
              "tone": "good"
            }
          ]
        },
        {
          "label": "氧氣 (空氣接觸)",
          "icon": "💨",
          "cells": [
            "空氣中 21% 氧引發自由基鏈反應",
            "瓶蓋未轉緊、長期使用敞口倒油嘴",
            {
              "text": "用畢即緊旋瓶蓋，買小瓶裝",
              "tone": "good"
            }
          ]
        },
        {
          "label": "金屬離子 (鐵/銅離子)",
          "icon": "🔩",
          "cells": [
            "Fenton 反應引爆過氧化反應",
            "使用生鏽鐵罐或金屬油嘴盛裝",
            {
              "text": "純玻璃或食品級不鏽鋼容器",
              "tone": "good"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-09-02": {
    "title": "油耗味的生化形成與揮發性醛類毒性",
    "caption": "脂質過氧化鏈反應：氫過氧化物裂解為己醛與有毒烯醛。",
    "takeaway": "聞到油耗味時，代表過氧化物已大量分解為有毒醛類，請果斷丟棄勿食！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "雙鍵位置脫氫引發",
          "detail": "自由基攻擊形成脂質自由基 (L•)",
          "tone": "warn",
          "icon": "⚡"
        },
        {
          "label": "結合氧氣形成過氧自由基",
          "detail": "生成氫過氧化物 (LOOH)，無味但極不穩定",
          "tone": "warn",
          "icon": "💥"
        },
        {
          "label": "碳鏈斷裂分解為二次產物",
          "detail": "生成己醛、丙烯醛、4-HNE 等揮發性分子",
          "tone": "bad",
          "icon": "🧪"
        },
        {
          "label": "發出刺鼻油耗「油臭味」",
          "detail": "攝入體內攻擊腸胃黏膜細胞與肝臟",
          "tone": "bad",
          "icon": "🤢"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-09-03": {
    "title": "台灣餐飲業炸油「總極性化合物」管制標準",
    "caption": "衛福部食藥署法規：油炸油總極性化合物 (TPM) ≥ 25% 必須強制換油。",
    "takeaway": "總極性化合物每上升 5%，致動脈硬化毒素倍增，夜市重複回鍋油是重災區。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "< 10% TPM",
          "label": "新鮮初次使用油",
          "detail": "油色金黃透亮，黏度低，無泡沫積聚",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "10–15% TPM",
          "label": "正常油炸工作油",
          "detail": "風味與色澤最佳狀態",
          "tone": "good",
          "icon": "🍟"
        },
        {
          "range": "16–24% TPM",
          "label": "老化警戒油",
          "detail": "油色加深、黏稠度增加、油炸時油煙變大",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "≥ 25% TPM (法定違法)",
          "label": "劣變回鍋油 (強制開罰)",
          "detail": "充滿高毒性多聚體與致癌物，依法必須立即整鍋廢棄換新",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-09-04": {
    "title": "居家食用油科學保存四大黃金原則",
    "caption": "深色、密封、低溫、小容量的四重保鮮屏障。",
    "takeaway": "買油挑「小瓶深色玻璃裝」，用完隨手蓋緊放抽屜，是好油保鮮的不二法門。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "保鮮效益指數",
      "max": 100,
      "items": [
        {
          "label": "購買深色遮光玻璃瓶 (防光)",
          "value": 95,
          "display": "95 分 (防光化裂解)",
          "tone": "good",
          "icon": "🍾"
        },
        {
          "label": "放置陰涼櫥櫃避開爐火 (防熱)",
          "value": 90,
          "display": "90 分 (抑制氧化倍率)",
          "tone": "good",
          "icon": "🚪"
        },
        {
          "label": "使用後立即轉緊旋蓋 (防氧)",
          "value": 85,
          "display": "85 分 (阻隔新鮮空氣)",
          "tone": "good",
          "icon": "🔒"
        },
        {
          "label": "挑選 250–500mL 內小包裝 (防久存)",
          "value": 80,
          "display": "80 分 (1–2 個月內用畢)",
          "tone": "good",
          "icon": "🛒"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-10-01": {
    "title": "台灣成人每日油脂平均攝取量 vs 建議標準",
    "caption": "國民營養健康狀況變遷調查：外食人口油脂攝取嚴重過剩現況。",
    "takeaway": "台灣成人男性每日吃進油脂近 85 克，熱量占比飆破 36%，遠超 30% 建議上限。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "公克 / 日",
      "max": 95,
      "ref": {
        "value": 55,
        "label": "每日健康建議量 ≈ 50–55 克"
      },
      "items": [
        {
          "label": "國健署每日建議上限 (2000 kcal)",
          "value": 55,
          "display": "50–55 克 (約 10–11 茶匙)",
          "tone": "good",
          "icon": "🎯"
        },
        {
          "label": "台灣成人女性平均攝取",
          "value": 68,
          "display": "68 克 (超標 25%)",
          "tone": "warn",
          "icon": "👩"
        },
        {
          "label": "台灣成人男性平均攝取",
          "value": 85,
          "display": "85 克 (超標 55%)",
          "tone": "bad",
          "icon": "👨"
        },
        {
          "label": "常吃炸排骨便當外食族",
          "value": 95,
          "display": "90–100 克 (嚴重超標一倍)",
          "tone": "bad",
          "icon": "🍱"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-10-02": {
    "title": "台灣外食八大隱形油脂重災區排行榜",
    "caption": "單份小吃/餐點所含隱形油脂總量（公克）。",
    "takeaway": "鍋貼、蔥油餅、肉燥飯不是只有澱粉！內餡高達一半是高飽和豬板油！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "g 油脂 / 份",
      "max": 45,
      "items": [
        {
          "label": "炸排骨/炸雞排便當",
          "value": 42,
          "display": "38–45 克 (快達全天限額)",
          "tone": "bad",
          "icon": "🍱"
        },
        {
          "label": "鍋貼 10 顆 (加淋油煎)",
          "value": 36,
          "display": "32–38 克 (肥絞肉內餡)",
          "tone": "bad",
          "icon": "🥟"
        },
        {
          "label": "大份蔥抓餅加蛋",
          "value": 30,
          "display": "28–32 克 (麵皮層層酥油)",
          "tone": "bad",
          "icon": "🫓"
        },
        {
          "label": "麻辣鍋一人份 (浮油湯底)",
          "value": 35,
          "display": "30–40 克 (牛油辣油)",
          "tone": "bad",
          "icon": "🍲"
        },
        {
          "label": "傳統肉燥飯大碗",
          "value": 25,
          "display": "22–28 克 (肥豬皮高脂)",
          "tone": "warn",
          "icon": "🍚"
        },
        {
          "label": "台式麵包 (肉鬆沙拉/菠蘿)",
          "value": 22,
          "display": "20–25 克 (酥油美乃滋)",
          "tone": "warn",
          "icon": "🍞"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-10-03": {
    "title": "炸物裹粉厚度與吸油率巨幅差異對照",
    "caption": "食材清炸、裹薄粉、裹厚粉漿油炸後的吸油率百分比。",
    "takeaway": "厚粉漿（如脆皮雞排）吸油率達 20% 以上，一口咬下一半都是油！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 食材重量吸油率",
      "max": 25,
      "items": [
        {
          "label": "清炸 (不裹粉，如炸豆皮/豆腐)",
          "value": 6,
          "display": "4–7% (低吸油)",
          "tone": "ok",
          "icon": "🥢"
        },
        {
          "label": "乾粉油炸 (地瓜粉/太白粉薄裹)",
          "value": 10,
          "display": "8–12% (中吸油)",
          "tone": "warn",
          "icon": "🍗"
        },
        {
          "label": "麵包粉油炸 (日式炸豬排)",
          "value": 16,
          "display": "14–18% (高吸油)",
          "tone": "bad",
          "icon": "🍤"
        },
        {
          "label": "濕漿裹粉 (美式脆皮/卡啦炸雞)",
          "value": 22,
          "display": "18–25% (巨量吸油)",
          "tone": "bad",
          "icon": "🍟"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-10-04": {
    "title": "營養標示「每份」vs「每 100g」防詐避坑對照",
    "caption": "業者將一份切細縮小（例如一包零食標示為 8 份）以製造低脂假象。",
    "takeaway": "先看「本包裝含幾份」！一包洋芋片寫每份脂肪 5g，整包吃完其實是 40g！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "業者標示伎倆：「每份」視角",
          "icon": "👁️",
          "tone": "warn",
          "points": [
            "刻意把整包含量切成 5–8 份",
            "「每份脂肪僅 4.5 克」看似很安全",
            "熱量「僅 90 大卡」降低戒心"
          ]
        },
        {
          "title": "科學解碼：「整包吃完」真相",
          "icon": "🔍",
          "tone": "bad",
          "points": [
            "實際本包裝含 6 份",
            "整包吃下肚：4.5 × 6 = 27 克油脂！",
            "直接達到全天油脂攝取上限的一半"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-11-01": {
    "title": "台灣每日飲食指南油脂與堅果種子份量配置",
    "caption": "每日 3–6 茶匙食用油搭配 1 份原型堅果種子的均衡標準。",
    "takeaway": "好油要吃，但要「限量吃」；1 份堅果種子等於 1 湯匙或 5 顆腰果。",
    "grade": "A",
    "chart": {
      "kind": "donut",
      "unit": "份量",
      "center": "4–7 茶匙",
      "items": [
        {
          "label": "早午晚三餐烹調用油",
          "value": 4,
          "display": "3–5 茶匙 (15–25g)",
          "tone": "good",
          "icon": "🍳"
        },
        {
          "label": "原型無調味堅果種子",
          "value": 1,
          "display": "1 份 (約 1 湯匙)",
          "tone": "good",
          "icon": "🥜"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-11-02": {
    "title": "1 茶匙油的具體物理換算與廚房實物",
    "caption": "1 茶匙 (tsp) = 5 毫升 = 約 4.5 公克純油 = 約 40 大卡。",
    "takeaway": "炒一盤菜隨手倒兩大圈油就超標 4 茶匙（160 大卡），善用量匙或油醋噴霧瓶。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "毫升 (mL)",
      "max": 15,
      "items": [
        {
          "label": "1 茶匙 (1 tsp) 基準份量",
          "value": 5,
          "display": "5 mL (4.5g / 40 kcal)",
          "tone": "good",
          "icon": "🥄"
        },
        {
          "label": "1 湯匙 (1 tbsp) = 3 茶匙",
          "value": 15,
          "display": "15 mL (13.5g / 120 kcal)",
          "tone": "warn",
          "icon": "🥄"
        },
        {
          "label": "外食自助餐炒青菜殘油量",
          "value": 12,
          "display": "10–14 mL (浸油過量)",
          "tone": "bad",
          "icon": "🥬"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-11-03": {
    "title": "原型堅果種子 vs 精煉純油的微量營養防護網",
    "caption": "吃整顆堅果不僅吃到好油，還保留了膳食纖維、鎂、維生素 E 與植化素。",
    "takeaway": "純油是純熱量，堅果是營養全家桶；用一把堅果取代部分炒菜油。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "精煉純食用油 (如純大豆油/玉米油)",
          "icon": "🧴",
          "tone": "ok",
          "points": [
            "純脂肪純熱量 (100% 脂肪)",
            "無膳食纖維、無蛋白質",
            "維生素 E 多在精煉高溫中流失",
            "缺乏植物固醇與礦物質保護"
          ]
        },
        {
          "title": "原型無調味堅果 (核桃/杏仁/南瓜籽)",
          "icon": "🌰",
          "tone": "good",
          "points": [
            "約 50% 好油，伴隨 20% 優質蛋白質",
            "富含膳食纖維與天然鎂離子",
            "含有豐富抗氧化維生素 E 與白藜蘆醇",
            "植物固醇競爭抑制腸道膽固醇吸收"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-12-01": {
    "title": "血中膽固醇來源比例：肝臟自體合成 vs 飲食吸收",
    "caption": "體內膽固醇 75–80% 來自肝臟合成，飲食直接吸收僅佔 20–25%。",
    "takeaway": "體檢膽固醇過高，主因不是吃太多蛋黃，而是飽和脂肪促使肝臟狂產膽固醇！",
    "grade": "A",
    "chart": {
      "kind": "donut",
      "unit": "% 來源",
      "center": "100% 膽固醇",
      "items": [
        {
          "label": "肝臟與周邊自體合成",
          "value": 78,
          "display": "75–80% (體內主導)",
          "tone": "warn",
          "icon": "🫀"
        },
        {
          "label": "三餐飲食直接吸收",
          "value": 22,
          "display": "20–25% (次要影響)",
          "tone": "ok",
          "icon": "🍳"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-12-02": {
    "title": "植物油家常水炒安全性與溫度監測實測",
    "caption": "水油拌炒鍋內溫度被水分沸點箝制在 100°C 之熱力學優勢。",
    "takeaway": "「先放半碗水煮滾、再下菜下油拌炒」，油溫永遠不會超過 100°C，安全零油煙！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "傳統大火乾鍋熱油熱炒",
          "icon": "🍳",
          "tone": "bad",
          "points": [
            "油溫直衝 180–220°C 冒白煙",
            "破壞油品多酚，引發脂質過氧化",
            "產生致癌油煙危害肺部"
          ]
        },
        {
          "title": "健康水油拌炒法 (水炒菜)",
          "icon": "🥬",
          "tone": "good",
          "points": [
            "水分沸點物理箝制鍋溫在 100°C",
            "任何油品（含初榨橄欖油）皆不劣變",
            "完全無油煙，保留最多水溶性維生素"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-12-03": {
    "title": "豬油飽和脂肪 vs 植物油心血管硬化風險長程追蹤",
    "caption": "傳統豬油 (39% SFA) vs 富含單元不飽和植物油的心血管預後對照。",
    "takeaway": "「阿公阿嬤吃豬油沒事」是因為當年農耕勞動極大；現代久坐族狂吃豬油會塞住血管。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "農耕時代阿公阿嬤的環境",
          "icon": "🌾",
          "tone": "info",
          "points": [
            "整天繁重農務，熱量嚴重赤字匱乏",
            "肉類油脂極罕見，偶爾沾食豬油",
            "體重偏瘦，無超加工食品與精緻糖"
          ]
        },
        {
          "title": "現代都市久坐族的真實處境",
          "icon": "🏙️",
          "tone": "bad",
          "points": [
            "每日久坐 8 小時以上，體力消耗極低",
            "三餐外食熱量過剩，內臟脂肪超標",
            "豬油的高飽和脂肪直接推升 LDL 斑塊"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-12-04": {
    "title": "脂肪攝取 vs 熱量平衡與體脂堆積本質",
    "caption": "打破「吃油直接長肥肉」直覺謬誤：過量果糖與精緻澱粉同樣走 DNL 變成脂肪。",
    "takeaway": "決定體脂的是「全天總熱量赤字」；適度好油反而提供飽足感，阻止暴飲暴食。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "吃進食物熱量",
          "detail": "無論來自油脂、碳水化合物或蛋白質",
          "tone": "info",
          "icon": "🍽️"
        },
        {
          "label": "全日總能量平衡判定",
          "detail": "攝取 > 消耗 (熱量盈餘) vs 攝取 < 消耗 (赤字)",
          "tone": "warn",
          "icon": "⚖️"
        },
        {
          "label": "盈餘時：過量碳水走 DNL 轉油",
          "detail": "肝臟將葡萄糖果糖壓成脂肪儲存",
          "tone": "bad",
          "icon": "🫃"
        },
        {
          "label": "赤字時：脂肪分解氧化供能",
          "detail": "好油脂提供寶貴飽足感，助長效減重",
          "tone": "good",
          "icon": "✨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-13-01": {
    "title": "NOVA 超加工食品四分級與種子油本質辨析",
    "caption": "NOVA 分類法：決定健康危害的是「超加工 UPF 工業添加」，而非種子油本身。",
    "takeaway": "大豆油拿來炒青菜（第 2 類烹調用油）無害；做成重調味洋芋片泡麵（第 4 類 UPF）才危險！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "NOVA 分級",
        "定義與加工程度",
        "代表食物範例",
        "心血管與代謝衝擊"
      ],
      "rows": [
        {
          "label": "第 1 類：原型未加工",
          "icon": "🥦",
          "cells": [
            "天然新鮮食材、未經工業轉化",
            "生鮮肉品、整顆堅果、新鮮蔬果",
            {
              "text": "心血管保護基石",
              "tone": "good"
            }
          ]
        },
        {
          "label": "第 2 類：烹調用原料",
          "icon": "🫒",
          "cells": [
            "從天然物壓榨提煉的純油脂、糖、鹽",
            "壓榨橄欖油、芥花油、食鹽",
            {
              "text": "適度烹調健康安全",
              "tone": "good"
            }
          ]
        },
        {
          "label": "第 3 類：常規加工食品",
          "icon": "🥖",
          "cells": [
            "1 類加 2 類簡單製成、傳統保存",
            "傳統歐式麵包、起司、魚罐頭",
            {
              "text": "可適量納入飲食",
              "tone": "ok"
            }
          ]
        },
        {
          "label": "第 4 類：超加工食品 (UPF)",
          "icon": "🍟",
          "cells": [
            "工業重組、添加香精色素乳化劑",
            "洋芋片、微波即食炸物、碳酸飲料",
            {
              "text": "心血管與全因死亡顯著上升",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-O-13-02": {
    "title": "2025–2026 最新國際脂質醫學指引共識總整",
    "caption": "美國心臟學會 (AHA) 與歐洲動脈粥狀硬化學會 (EAS) 最新實證指引要點。",
    "takeaway": "最新指引強調「整體飲食品質優於單一脂肪獵巫」，以地中海不飽和油為金標準。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "堅定推薦的第一線好油",
          "icon": "🏆",
          "tone": "good",
          "points": [
            "特級初榨橄欖油 (EVOO) 與苦茶油",
            "每日 1 份無調味多樣化原型堅果",
            "深海富油魚種 (鯖魚、鮭魚、秋刀魚)",
            "高油酸植物油作為高溫烹調首選"
          ]
        },
        {
          "title": "建議嚴格限制的高危脂質",
          "icon": "🛑",
          "tone": "bad",
          "points": [
            "完全排除工業部分氫化油 (反式脂肪)",
            "飽和脂肪壓制在總熱量 10% (高危族 < 6%)",
            "避開回鍋油炸物與深層油炸加工品",
            "警惕以椰子油/牛油作為日常主要炒菜油"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-01-02": {
    "title": "胃部與小腸的酒精吸收速度對照",
    "caption": "胃黏膜直接吸收 20% vs 小腸近端吸收 80% 之解剖生理差異。",
    "takeaway": "小腸微絨毛吸收面積巨大，一旦酒液滑出幽門進入小腸，血液酒精濃度將瞬間暴衝。",
    "grade": "A",
    "chart": {
      "kind": "donut",
      "unit": "% 吸收占比",
      "center": "100% 酒精",
      "items": [
        {
          "label": "小腸近端 (十二指腸/空腸)",
          "value": 80,
          "display": "80% (急速海綿吸收)",
          "tone": "bad",
          "icon": "🌪️"
        },
        {
          "label": "胃黏膜 (胃體與胃竇)",
          "value": 20,
          "display": "20% (初步微血管滲透)",
          "tone": "warn",
          "icon": "🫁"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-01-03": {
    "title": "空腹飲酒 vs 飽腹飲酒之血中酒精濃度 (BAC) 曲線",
    "caption": "同等攝取 2 標準杯後，空腹與飽腹狀態下 3 小時內的 BAC 動態對照。",
    "takeaway": "空腹喝酒 30 分鐘內攀登致命高峰；先吃高脂高蛋白餐食能削去 50% 峰值高度。",
    "grade": "A",
    "chart": {
      "kind": "curve",
      "x": {
        "label": "飲酒後時間",
        "unit": "小時",
        "min": 0,
        "max": 3,
        "ticks": [
          0,
          0.5,
          1,
          1.5,
          2,
          2.5,
          3
        ]
      },
      "y": {
        "label": "血中酒精濃度 BAC",
        "unit": "mg/dL",
        "min": 0,
        "max": 100,
        "ticks": [
          0,
          20,
          40,
          60,
          80,
          100
        ]
      },
      "series": [
        {
          "name": "空腹飲酒 (快速衝頂)",
          "tone": "bad",
          "points": [
            [
              0,
              0
            ],
            [
              0.5,
              85
            ],
            [
              1,
              70
            ],
            [
              1.5,
              50
            ],
            [
              2,
              35
            ],
            [
              2.5,
              20
            ],
            [
              3,
              5
            ]
          ]
        },
        {
          "name": "餐後飽腹飲酒 (峰值壓低延遲)",
          "tone": "good",
          "points": [
            [
              0,
              0
            ],
            [
              0.5,
              30
            ],
            [
              1,
              45
            ],
            [
              1.5,
              40
            ],
            [
              2,
              30
            ],
            [
              2.5,
              18
            ],
            [
              3,
              5
            ]
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-01-04": {
    "title": "碳酸氣泡調酒加速胃排空效應",
    "caption": "調和可樂、氣泡水或香檳二氧化碳氣體對幽門括約肌的物理刺激。",
    "takeaway": "碳酸氣泡膨脹胃壁、刺激幽門提早開啟，讓酒液以兩倍速傾瀉入小腸。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "純酒 / 非碳酸調酒 (水割/果汁調酒)",
          "icon": "🥃",
          "tone": "ok",
          "points": [
            "幽門正常節律蠕動",
            "酒液在胃內停留約 30–45 分鐘",
            "血中酒精濃度爬升較平緩"
          ]
        },
        {
          "title": "碳酸調酒 (威士忌蘇打 / 汽水調酒)",
          "icon": "🥂",
          "tone": "bad",
          "points": [
            "CO2 氣體加壓刺激胃壁機械受體",
            "幽門反射性早開，胃排空加快 50%",
            "酒精瞬間湧入小腸吸乾，極易迅速酒醉"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-01-05": {
    "title": "體脂率與全身含水量對 BAC 濃度的稀釋效應",
    "caption": "相同體重 (70kg) 的精壯男性 vs 高體脂女性飲用同等酒精之 BAC 差異。",
    "takeaway": "酒精親水不親脂！肌肉量多者水分多稀釋快；體脂高者血液酒精濃度高出 30% 以上。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "BAC 濃度 (mg/dL)",
      "max": 90,
      "items": [
        {
          "label": "低體脂高肌男性 (全身水 62%)",
          "value": 50,
          "display": "50 mg/dL (稀釋池大)",
          "tone": "good",
          "icon": "🏋️"
        },
        {
          "label": "一般體脂成人男性 (全身水 55%)",
          "value": 60,
          "display": "60 mg/dL",
          "tone": "ok",
          "icon": "👨"
        },
        {
          "label": "一般成人女性 (全身水 48%)",
          "value": 72,
          "display": "72 mg/dL (水少濃縮)",
          "tone": "warn",
          "icon": "👩"
        },
        {
          "label": "高體脂久坐族 (全身水 42%)",
          "value": 85,
          "display": "85 mg/dL (濃度暴衝)",
          "tone": "bad",
          "icon": "⚠️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-02-02": {
    "title": "酒精代謝引發 NADH/NAD+ 比例飆升阻斷脂質氧化",
    "caption": "肝細胞質 ADH 與粒線體 ALDH2 雙氧化產生巨量 NADH 之生化連鎖反應。",
    "takeaway": "肝臟為了解酒耗盡了所有 NAD+，導致三餐脂肪完全無法燃燒，全數囤積成脂肪肝！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "乙醇與乙醛被氧化",
          "detail": "還原當量將 NAD+ 大量轉為 NADH",
          "tone": "info",
          "icon": "🧪"
        },
        {
          "label": "NADH/NAD+ 比值暴增 10 倍",
          "detail": "肝細胞氧化還原電位嚴重失衡",
          "tone": "warn",
          "icon": "⚡"
        },
        {
          "label": "脂肪酸 β-氧化直接斷電停擺",
          "detail": "克氏循環與粒線體燃脂功能凍結",
          "tone": "bad",
          "icon": "🛑"
        },
        {
          "label": "脂肪酸被迫回流合成三酸甘油酯",
          "detail": "肝細胞油滴狂飆，引發急性酒精性脂肪肝",
          "tone": "bad",
          "icon": "🫀"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-02-03": {
    "title": "粒線體 CYP2E1 備用途徑誘導與活性氧自由基 ROS 暴增",
    "caption": "長期慢性飲酒或單次大量暴飲活化 CYP2E1 代謝的毒理代價。",
    "takeaway": "「酒量練出來」只是逼肝臟啟動 CYP2E1，產生的巨量自由基正在瘋狂摧毀肝細胞膜。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "常態飲酒或血中高酒精濃度",
          "detail": "ADH 飽和，啟動微粒體 MEOS 途徑",
          "tone": "warn",
          "icon": "🍷"
        },
        {
          "label": "CYP2E1 酵素受質誘導增生 4 倍",
          "detail": "雖然加快清除微量酒精",
          "tone": "warn",
          "icon": "⚙️"
        },
        {
          "label": "副產物：超氧陰離子與過氧化氫 ROS",
          "detail": "活性氧爆發引發脂質過氧化",
          "tone": "bad",
          "icon": "💥"
        },
        {
          "label": "粒線體 DNA 斷裂與肝細胞壞死",
          "detail": "走向肝纖維化與肝硬化不歸路",
          "tone": "bad",
          "icon": "🫀"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-02-04": {
    "title": "肝臟酒精清除的「零階動力學」定速特性",
    "caption": "人體肝臟每小時清除純酒精公克數為固定值，不受血液濃度高低影響。",
    "takeaway": "喝再濃、喝再多，肝臟一小時只能清除約 8–10 克純酒精（1 杯），沒有任何東西能加速！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "g 純酒精 / 小時",
      "max": 15,
      "items": [
        {
          "label": "70kg 健康成人肝臟固定清除速率",
          "value": 9,
          "display": "8–10 克 / 小時 (定速常數)",
          "tone": "info",
          "icon": "⏱️"
        },
        {
          "label": "喝 1 罐啤酒 (13g 酒精) 所需解毒時間",
          "value": 1.5,
          "display": "1.5 小時",
          "tone": "ok",
          "icon": "🍺"
        },
        {
          "label": "喝 3 杯紅酒 (36g 酒精) 所需解毒時間",
          "value": 4,
          "display": "4.0 小時",
          "tone": "warn",
          "icon": "🍷"
        },
        {
          "label": "半瓶威士忌 (120g 酒精) 所需解毒時間",
          "value": 13,
          "display": "13–15 小時 (到隔天中午)",
          "tone": "bad",
          "icon": "🥃"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-02-05": {
    "title": "中樞神經耐受度提高 vs 實質器官毒性脫鉤對照",
    "caption": "「千杯不醉」的真相：大腦鈍化了，但肝臟、胰臟與食道承受的細胞毒性毫無減輕。",
    "takeaway": "自覺「沒醉」不代表器官沒受損！耐受性讓人喝下致死劑量卻渾然不知。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "大腦中樞神經系統 (神經耐受)",
          "icon": "🧠",
          "tone": "warn",
          "points": [
            "GABA 受體下調、NMDA 受體增生",
            "主觀眩暈感與步態不穩逐漸遲鈍",
            "自以為「酒量變好、千杯不倒」",
            "導致危險酒駕與持續暴飲"
          ]
        },
        {
          "title": "肝臟、胃黏膜與食道 (毒性依舊)",
          "icon": "🫀",
          "tone": "bad",
          "points": [
            "DNA 受損率隨純酒精總量單調上升",
            "乙醛一級致癌物累積完全相同",
            "心肌細胞毒性與動脈內皮發炎不變",
            "肝硬化與癌症風險反而倍增"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-03-01": {
    "title": "正常 ALDH2 vs 突變型 ALDH2*2 乙醛氧化酵素活性",
    "caption": "Glu504Lys 點突變造成粒線體乙醛去氫酶活性的毀滅性崩跌。",
    "takeaway": "帶有一個突變基因活性只剩 10–30%，帶兩個突變基因活性近乎為 0！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 酵素催化活性",
      "max": 100,
      "items": [
        {
          "label": "野生正常型 (*1/*1)",
          "value": 100,
          "display": "100% (正常迅速解毒)",
          "tone": "good",
          "icon": "🧬"
        },
        {
          "label": "異型合子突變 (*1/*2) 台灣 40%",
          "value": 20,
          "display": "10–30% (乙醛急劇蓄積)",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "label": "同型合子突變 (*2/*2) 台灣 7%",
          "value": 2,
          "display": "< 2% (一口酒即毒性中風)",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-03-02": {
    "title": "全球主要地區人口 ALDH2 缺失盛行率對比",
    "caption": "東亞人群特有的基因突變：台灣盛行率高居全球榜首（近 47%）。",
    "takeaway": "每兩位台灣人就有一位帶有 ALDH2 缺陷，台灣根本沒有拚酒的基因本錢！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 人口盛行率",
      "max": 50,
      "items": [
        {
          "label": "台灣 (全球最高紀錄)",
          "value": 47,
          "display": "45–47% (全球第一)",
          "tone": "bad",
          "icon": "🇹🇼"
        },
        {
          "label": "中國東南沿海 (福建/廣東)",
          "value": 38,
          "display": "35–40%",
          "tone": "bad",
          "icon": "🇨🇳"
        },
        {
          "label": "日本",
          "value": 30,
          "display": "30%",
          "tone": "warn",
          "icon": "🇯🇵"
        },
        {
          "label": "南韓",
          "value": 25,
          "display": "25%",
          "tone": "warn",
          "icon": "🇰🇷"
        },
        {
          "label": "歐美白人 / 非洲黑人",
          "value": 0.5,
          "display": "< 1% (極罕見)",
          "tone": "good",
          "icon": "🌍"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-03-03": {
    "title": "「喝酒臉紅」的急性乙醛毒性連鎖反應",
    "caption": "乙醛刺激肥大細胞釋放組織胺並擴張全身微血管之病理機制。",
    "takeaway": "喝酒臉紅不是代表血液循環好或代謝快，而是一級致癌物乙醛中毒的求救訊號！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "乙醇快速氧化為乙醛",
          "detail": "體內 ALDH2 缺乏無法分解",
          "tone": "warn",
          "icon": "🍷"
        },
        {
          "label": "乙醛濃度暴衝至常人 5–10 倍",
          "detail": "充斥血液衝擊血管壁",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "label": "刺激微血管肥大細胞釋放組織胺",
          "detail": "顏面與上半身微血管劇烈擴張充血",
          "tone": "bad",
          "icon": "😳"
        },
        {
          "label": "心悸脈搏加速、搏動性跳痛",
          "detail": "血壓短暫劇跌後反彈，自主神經受損",
          "tone": "bad",
          "icon": "❤️‍🔥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-03-04": {
    "title": "ALDH2 缺失者持續飲酒的食道癌與頭頸癌風險倍率",
    "caption": "帶有 ALDH2 突變者每週飲酒超過 200 克純酒精之食道鱗狀上皮癌相對風險 (RR)。",
    "takeaway": "喝酒臉紅還天天喝？食道癌風險飆升達 40–100 倍，是醫學界最驚人的致癌加乘！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "食道癌相對風險倍數",
      "max": 60,
      "ref": {
        "value": 1,
        "label": "不飲酒正常人 = 1.0"
      },
      "items": [
        {
          "label": "正常基因不飲酒者",
          "value": 1,
          "display": "1.0 (基準)",
          "tone": "good",
          "icon": "🌿"
        },
        {
          "label": "正常基因大量飲酒者",
          "value": 7,
          "display": "7.0 倍",
          "tone": "warn",
          "icon": "🍺"
        },
        {
          "label": "ALDH2 缺失偶爾少量飲酒",
          "value": 12,
          "display": "10–15 倍",
          "tone": "bad",
          "icon": "🍷"
        },
        {
          "label": "ALDH2 缺失規律飲酒 (每天 2 杯)",
          "value": 50,
          "display": "40–50 倍 (極度致命)",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-03-05": {
    "title": "停止飲酒對黏膜癌化進程的逆轉效益階梯",
    "caption": "戒酒後食道與口腔黏膜慢性 DNA 損傷的修復時間軸。",
    "takeaway": "基因型是天生的，但戒酒能立即中止乙醛攻擊；戒酒 5 年癌化風險減半！",
    "grade": "B",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "戒酒 1 個月",
          "label": "黏膜急性發炎消退",
          "detail": "微血管充血減輕，逆轉胃炎與口臭",
          "tone": "good",
          "icon": "🌱"
        },
        {
          "range": "戒酒 1 年",
          "label": "DNA 異常修復加速",
          "detail": "肝功能指數與脂肪肝顯著改善",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "戒酒 5 年",
          "label": "頭頸癌風險腰斬",
          "detail": "食道上皮發育不良率下降 50%",
          "tone": "good",
          "icon": "🛡️"
        },
        {
          "range": "戒酒 15–20 年",
          "label": "恢復至接近常人水準",
          "detail": "各器官癌症風險幾乎與終生不飲酒者一致",
          "tone": "good",
          "icon": "🏆"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-04-01": {
    "title": "IARC 國際癌症研究署 Group 1 一級致癌物分類表",
    "caption": "世界衛生組織 IARC 將「酒精飲料」與「乙醛」列於確定致癌最高等級。",
    "takeaway": "酒精與石綿、菸草、黃麴毒素同列 Group 1，具有不容爭辯的人體致癌因果性。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "致癌物類別",
        "IARC 等級定義",
        "同級代表物質",
        "主要目標器官"
      ],
      "rows": [
        {
          "label": "酒精飲料及代謝乙醛",
          "icon": "🍷",
          "cells": [
            "Group 1 (確定人體致癌)",
            "菸草、石綿、甲醛、砒霜",
            {
              "text": "口腔、食道、肝臟、大腸、乳房",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "紅肉高溫加熱物",
          "icon": "🥩",
          "cells": [
            "Group 2A (極可能致癌)",
            "高溫油炸廢氣、丙烯醯胺",
            {
              "text": "大腸直腸",
              "tone": "warn"
            }
          ]
        },
        {
          "label": "咖啡與茶飲",
          "icon": "☕",
          "cells": [
            "Group 3 (無致癌證據)",
            "純水、維生素 C",
            {
              "text": "無致癌性，反而具抗氧化效益",
              "tone": "good"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-04-02": {
    "title": "乙醛共價結合 DNA 形成雙加合物破壞複製機轉",
    "caption": "乙醛 (CH3CHO) 攻擊鳥嘌呤 (Guanine) 形成 DNA-DNA 鏈間交聯。",
    "takeaway": "乙醛如同一把生鏽鐵鎖把 DNA 雙螺旋鏈死死鎖住，導致細胞分裂時基因斷裂突變。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "細胞質乙醛擴散入細胞核",
          "detail": "高活性親電子基團",
          "tone": "bad",
          "icon": "🔬"
        },
        {
          "label": "攻擊鳥嘌呤 N2 位置",
          "detail": "生成 N2-乙基-去氧鳥苷 (N2-Et-dG)",
          "tone": "bad",
          "icon": "🧬"
        },
        {
          "label": "形成致命 DNA 鏈間交聯 (ICL)",
          "detail": "複製叉癱瘓停滯，雙鏈斷裂",
          "tone": "bad",
          "icon": "⛓️"
        },
        {
          "label": "抑癌基因 p53 突變失效",
          "detail": "細胞脫離生長管控，演變為惡性腫瘤",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-04-03": {
    "title": "酒精作為有機溶劑與香菸致癌物的加乘毒性",
    "caption": "菸酒齊下時口腔與下咽黏膜通透性增加之雙重加成效應。",
    "takeaway": "單喝酒風險 2 倍、單抽菸 3 倍，菸酒同時來風險不是 5 倍，而是暴增 30–50 倍！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "單一暴露風險",
          "icon": "🚬",
          "tone": "warn",
          "points": [
            "單純吸菸：致癌物難以快速穿透完整黏膜保護屏障",
            "單純飲酒：乙醛局部侵蝕，但黏膜自我修復機制尚存",
            "相對食道癌風險：約 2–4 倍"
          ]
        },
        {
          "title": "菸酒協同致命打擊",
          "icon": "☠️",
          "tone": "bad",
          "points": [
            "酒精作為有機溶劑直接溶解黏膜角質保護層",
            "香菸中的亞硝胺與多環芳香烴長驅直入基底幹細胞",
            "相對頭頸癌與食道癌風險暴衝 30–50 倍以上！"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-04-04": {
    "title": "酒精明確具因果關聯的七大癌症",
    "caption": "全球癌症流行病學明確證實由酒精攝入驅動的 7 大解剖癌症。",
    "takeaway": "酒精致癌不限於消化道！女性乳癌有 16% 與飲酒有直接因果關係。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 歸因風險上升",
      "max": 40,
      "items": [
        {
          "label": "食道鱗狀細胞癌",
          "value": 38,
          "display": "+38% (最敏感)",
          "tone": "bad",
          "icon": "🫁"
        },
        {
          "label": "口腔癌與咽喉癌",
          "value": 30,
          "display": "+30%",
          "tone": "bad",
          "icon": "👄"
        },
        {
          "label": "女性乳癌",
          "value": 16,
          "display": "+16% (雌激素升高驅動)",
          "tone": "bad",
          "icon": "🎀"
        },
        {
          "label": "大腸直腸癌",
          "value": 20,
          "display": "+20%",
          "tone": "bad",
          "icon": "🫘"
        },
        {
          "label": "原發性肝癌",
          "value": 25,
          "display": "+25% (硬化背景)",
          "tone": "bad",
          "icon": "🫀"
        },
        {
          "label": "胃癌",
          "value": 15,
          "display": "+15%",
          "tone": "bad",
          "icon": "🥣"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-04-05": {
    "title": "女性乳癌風險與酒精攝取之單調劑量反應曲線",
    "caption": "每天飲酒量與女性乳腺癌相對風險 (RR) 曲線（無安全門檻）。",
    "takeaway": "每天多喝 1 標準杯（10g 酒精），乳癌風險便上升 10%，沒有「安全飲酒量」。",
    "grade": "A",
    "chart": {
      "kind": "curve",
      "x": {
        "label": "每日純酒精攝取",
        "unit": "克 (g)",
        "min": 0,
        "max": 40,
        "ticks": [
          0,
          10,
          20,
          30,
          40
        ]
      },
      "y": {
        "label": "乳癌相對風險 (RR)",
        "unit": "倍數",
        "min": 1,
        "max": 1.5,
        "ticks": [
          1,
          1.1,
          1.2,
          1.3,
          1.4,
          1.5
        ]
      },
      "series": [
        {
          "name": "乳腺癌發生率 (直線單調爬升)",
          "tone": "bad",
          "points": [
            [
              0,
              1
            ],
            [
              10,
              1.1
            ],
            [
              20,
              1.22
            ],
            [
              30,
              1.35
            ],
            [
              40,
              1.48
            ]
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-05-01": {
    "title": "傳統流行病學「J 曲線」迷思的起源",
    "caption": "早期觀察性研究顯示「少量飲酒者心血管死亡率低於完全不飲酒者」之表象。",
    "takeaway": "「睡前喝紅酒護心」是上世紀最大的醫學統計偏誤產物，已被現代遺傳學徹底推翻。",
    "grade": "A",
    "chart": {
      "kind": "curve",
      "x": {
        "label": "每日飲酒量",
        "unit": "標準杯",
        "min": 0,
        "max": 6,
        "ticks": [
          0,
          1,
          2,
          4,
          6
        ]
      },
      "y": {
        "label": "心血管事件死亡率",
        "unit": "相對風險",
        "min": 0.6,
        "max": 2,
        "ticks": [
          0.6,
          0.8,
          1,
          1.2,
          1.5,
          2
        ]
      },
      "series": [
        {
          "name": "傳統觀察性研究 (虛假 J 曲線)",
          "tone": "warn",
          "dashed": true,
          "points": [
            [
              0,
              1
            ],
            [
              1,
              0.82
            ],
            [
              2,
              0.85
            ],
            [
              4,
              1.25
            ],
            [
              6,
              1.95
            ]
          ]
        },
        {
          "name": "現代嚴格校正 / 基因 MR 研究 (單調上升線)",
          "tone": "bad",
          "points": [
            [
              0,
              1
            ],
            [
              1,
              1.05
            ],
            [
              2,
              1.15
            ],
            [
              4,
              1.45
            ],
            [
              6,
              2.1
            ]
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-05-02": {
    "title": "J 曲線兩大統計偏誤徹底拆解",
    "caption": "病態戒酒者混淆 (Sick Quitter) 與健康使用者混雜 (Healthy User)。",
    "takeaway": "把因生重病才戒酒的人當作「不飲酒對照組」，才製造出「喝酒反而健康」的假象！",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "偏誤一：病態戒酒者混淆 (Sick Quitter Bias)",
          "icon": "🏥",
          "tone": "bad",
          "points": [
            "對照組「不喝酒者」混入許多已患嚴重心臟病、糖尿病或末期肝病而被迫戒酒的人",
            "導致對照組基礎死亡率虛高",
            "顯得少量喝酒的人「相對健康」"
          ]
        },
        {
          "title": "偏誤二：健康使用者混雜 (Healthy User Bias)",
          "icon": "🎾",
          "tone": "bad",
          "points": [
            "每天喝 1 杯紅酒的人，多屬於中高社經地位",
            "日常更有預算吃高纖原型食物、固定運動",
            "是良好的生活型態保護了心臟，而不是紅酒裡的酒精！"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-05-03": {
    "title": "孟德爾隨機化 (Mendelian Randomization) 因果推論原理",
    "caption": "利用受精卵基因隨機分配天然克服混雜偏誤的現代研究設計。",
    "takeaway": "基因型從受精就決定且不受生活習慣混雜，分析數十萬人證實：酒精越多，血管越爛。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "受精卵基因型隨機分配",
          "detail": "自然賦予 ALDH2 / ADH1B 代謝基因",
          "tone": "good",
          "icon": "🧬"
        },
        {
          "label": "決定終生生理飲酒傾向",
          "detail": "基因決定代謝難受度，天然分組",
          "tone": "info",
          "icon": "👥"
        },
        {
          "label": "排除社經地位、飲食與運動混雜",
          "detail": "如同天然執行的雙盲隨機對照試驗",
          "tone": "good",
          "icon": "⚖️"
        },
        {
          "label": "揭露真實因果關係",
          "detail": "證實血壓與心血管風險自零起算單調遞增",
          "tone": "good",
          "icon": "🔬"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-05-04": {
    "title": "孟德爾隨機化研究：收縮壓與心房顫動隨酒精單調遞增",
    "caption": "Lancet 50 萬人基因世代追蹤：酒精攝取量與心血管危害的真實因果線。",
    "takeaway": "每週飲酒每增加 4 杯，心房顫動風險上升 8%，收縮壓持續攀升，毫無保護拐點。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 風險上升",
      "max": 35,
      "items": [
        {
          "label": "心房顫動 (Afib) 發生率",
          "value": 24,
          "display": "+24% (心律不整)",
          "tone": "bad",
          "icon": "🫀"
        },
        {
          "label": "出血性腦中風",
          "value": 32,
          "display": "+32% (腦血管破裂)",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "缺血性腦中風",
          "value": 18,
          "display": "+18% (動脈血栓)",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "label": "抗藥性高血壓",
          "value": 28,
          "display": "+28% (血壓難控)",
          "tone": "bad",
          "icon": "📈"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-05-05": {
    "title": "全球主要公衛機構低風險飲酒指引收緊趨勢",
    "caption": "加拿大、WHO、美國、英國近年全面調降飲酒建議上限。",
    "takeaway": "加拿大指引率先宣示：每週超過 2 杯即有健康風險，每週 6 杯以上步入高危險區！",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "每週 0 杯 (0 克)",
          "label": "零風險基準線",
          "detail": "唯一對健康與防癌最安全之境界",
          "tone": "good",
          "icon": "🏆"
        },
        {
          "range": "每週 1–2 杯 (10–20 克)",
          "label": "低風險區間",
          "detail": "酒精影響輕微，多數人可自體代謝修復",
          "tone": "ok",
          "icon": "🌿"
        },
        {
          "range": "每週 3–6 杯 (30–60 克)",
          "label": "中度風險區間",
          "detail": "乳癌、大腸癌、高血壓風險確立上升",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "每週 ≥ 7 杯 (> 70 克)",
          "label": "顯著高風險區間",
          "detail": "心臟病、中風、脂肪肝與全因死亡率全面飆升",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-06-01": {
    "title": "乙醇在中樞神經系統的受體作用機轉",
    "caption": "正向調節 GABA-A 抑制性受體與拮抗 NMDA 興奮性受體。",
    "takeaway": "酒精是大腦全域「中樞神經抑制劑」，初期看似興奮只是因為大腦前額葉剎車被麻醉了！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "乙醇分子結合 GABA-A 受體",
          "detail": "促使氯離子通道開放，神經元超極化靜默",
          "tone": "bad",
          "icon": "🧬"
        },
        {
          "label": "異位阻斷 NMDA 麩胺酸受體",
          "detail": "抑制鈣離子內流，阻斷神經突觸點火",
          "tone": "bad",
          "icon": "🔌"
        },
        {
          "label": "優先麻痺大腦前額皮質",
          "detail": "失去理性自制與風險評估（脫抑制）",
          "tone": "warn",
          "icon": "🧠"
        },
        {
          "label": "下行抑制小腦與腦幹",
          "detail": "步態蹣跚、說話含糊，嚴重時抑制呼吸中樞致命",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-06-02": {
    "title": "飲酒「斷片」海馬迴 LTP 記憶編碼中斷機制",
    "caption": "酒精阻斷海馬迴長程增強作用 (Long-Term Potentiation) 導致記憶錄音機關機。",
    "takeaway": "斷片不是「喝醉睡著」，而是人清醒在講話走動，但大腦錄音機早已被拔掉電源！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "短時間急速暴飲",
          "detail": "BAC 衝破 0.15–0.20 mg/dL",
          "tone": "bad",
          "icon": "🥃"
        },
        {
          "label": "海馬迴 CA1 區神經元被麻醉",
          "detail": "NMDA 受體完全癱瘓",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "LTP 長程增強突觸可塑性歸零",
          "detail": "短期記憶無法固化為長期記憶",
          "tone": "bad",
          "icon": "📼"
        },
        {
          "label": "隔天醒來出現「記憶黑洞」",
          "detail": "神經元並未儲存那幾小時的任何檔案",
          "tone": "warn",
          "icon": "🕳️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-06-03": {
    "title": "前半夜 REM 抑制與後半夜交感神經反彈曲線",
    "caption": "整夜睡眠腦電波 PSG 實測：看似快速入睡，實質前半夜無夢、後半夜驚醒頻頻。",
    "takeaway": "睡前酒偷走了關鍵的快速動眼期 REM，後半夜心率飆升、自律神經全面失衡。",
    "grade": "A",
    "chart": {
      "kind": "curve",
      "x": {
        "label": "入睡時間",
        "unit": "小時",
        "min": 0,
        "max": 8,
        "ticks": [
          0,
          2,
          4,
          6,
          8
        ]
      },
      "y": {
        "label": "自律交感神經興奮度 / 心率",
        "unit": "bpm",
        "min": 50,
        "max": 90,
        "ticks": [
          50,
          60,
          70,
          80,
          90
        ]
      },
      "series": [
        {
          "name": "睡前飲酒 (後半夜心跳狂飆與微覺醒)",
          "tone": "bad",
          "points": [
            [
              0,
              65
            ],
            [
              2,
              58
            ],
            [
              4,
              75
            ],
            [
              6,
              85
            ],
            [
              8,
              80
            ]
          ]
        },
        {
          "name": "清醒健康睡眠 (平穩深層修復)",
          "tone": "good",
          "points": [
            [
              0,
              62
            ],
            [
              2,
              55
            ],
            [
              4,
              54
            ],
            [
              6,
              56
            ],
            [
              8,
              60
            ]
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-06-04": {
    "title": "咽喉肌肉鬆弛與睡眠呼吸中止症惡化階梯",
    "caption": "酒精對上呼吸道擴張肌運動神經元的抑制，導致打鼾加劇與血氧驟跌。",
    "takeaway": "有打鼾或睡眠呼吸中止的人睡前飲酒，夜間窒息缺氧次數倍增，猝死風險升高。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "平時清醒睡眠",
          "label": "上呼吸道肌肉張力良好",
          "detail": "氣道暢通，血氧飽和度穩定在 96–98%",
          "tone": "good",
          "icon": "🫁"
        },
        {
          "range": "少量飲酒 (1 杯)",
          "label": "咽部組織輕微下塌",
          "detail": "打鼾音量增大，偶發輕度低通氣",
          "tone": "ok",
          "icon": "💤"
        },
        {
          "range": "中度飲酒 (2–3 杯)",
          "label": "呼吸中止指數 AHI 惡化",
          "detail": "軟顎塌陷堵塞氣道，窒息暫停頻繁",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "大量飲酒 (> 4 杯)",
          "label": "嚴重夜間低血氧紅旗",
          "detail": "血氧暴跌至 80% 以下，自律心臟交感休克",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-06-05": {
    "title": "睡前小酌助眠迷思 vs 臨床睡眠多項生理檢查 PSG",
    "caption": "入睡潛伏期縮短的假象 vs 睡眠結構破碎毀滅的真實代價。",
    "takeaway": "酒精是「鎮靜麻醉劑」而不是助眠藥！隔天精神恍惚正是因為大腦整晚沒修復。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "飲酒者的主觀錯覺",
          "icon": "😴",
          "tone": "warn",
          "points": [
            "喝了酒躺平 10 分鐘就昏睡過去",
            "覺得「好放鬆、可以快速斷電」",
            "以為酒精是天然救命安眠藥"
          ]
        },
        {
          "title": "PSG 儀器量測的客觀真相",
          "icon": "🔬",
          "tone": "bad",
          "points": [
            "深層慢波睡眠與 REM 期被腰斬 40%",
            "後半夜微覺醒次數高達 15–20 次",
            "心率整夜高於平常 15 bpm，HRV 暴跌",
            "隔日清晨認知遲鈍、頭昏腦脹"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-07-01": {
    "title": "酒精性肝病四部曲病理光譜",
    "caption": "單純脂肪肝 → 酒精性肝炎 → 肝纖維化 → 失代償性肝硬化。",
    "takeaway": "脂肪肝階段 100% 可逆；一旦跨過肝纖維化進入肝硬化，病程便無法回頭。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "單純性酒精性脂肪肝",
          "detail": "肝細胞油滴堆積，及時戒酒 4–6 週可完全自體逆轉",
          "tone": "ok",
          "icon": "🫀"
        },
        {
          "label": "酒精性肝炎",
          "detail": "肝細胞壞死腫脹、白血球浸潤，出現黃疸與 AST/ALT 飆升",
          "tone": "warn",
          "icon": "🔥"
        },
        {
          "label": "進行性肝纖維化",
          "detail": "肝星狀細胞分泌大量膠原蛋白疤痕組織，肝臟變硬",
          "tone": "bad",
          "icon": "🧱"
        },
        {
          "label": "失代償性肝硬化 / 肝癌",
          "detail": "腹水、食道靜脈曲張大出血、肝性腦病變，危及生命",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-07-02": {
    "title": "酒精破壞腸道屏障與內毒素 LPS 入門靜脈活化肝發炎",
    "caption": "乙醇溶解小腸緊密連接蛋白 (Claudin/Occludin) 造成「腸漏現象」。",
    "takeaway": "腸道細菌毒素湧入肝臟，活化庫弗細胞釋放大量促發炎細胞激素毀滅肝細胞。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "酒精乙醇沖刷小腸黏膜",
          "detail": "破壞上皮細胞緊密連接 (Tight Junctions)",
          "tone": "bad",
          "icon": "🥃"
        },
        {
          "label": "革蘭氏陰性菌內毒素 LPS 滲漏",
          "detail": "穿透破損腸壁湧入腸繫膜微血管",
          "tone": "bad",
          "icon": "🦠"
        },
        {
          "label": "經由門靜脈大量灌注肝臟",
          "detail": "活化肝臟庫弗細胞 (Kupffer Cells) TLR4",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "label": "釋放巨量 TNF-α 與 IL-6 細胞激素",
          "detail": "引爆急性酒精性肝炎與細胞壞死",
          "tone": "bad",
          "icon": "🔥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-07-03": {
    "title": "酒精性肝硬化門脈高壓與食道靜脈曲張大出血階梯",
    "caption": "硬化組織阻礙血液回流心臟，造成側支循環靜脈瘤破裂之致命風險。",
    "takeaway": "吐血如噴泉是肝硬化最駭人的急症，早期戒酒才能保全生命。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "門靜脈壓力正常 (<5 mmHg)",
          "label": "肝循環通暢",
          "detail": "血液正常經肝竇過濾回流下腔靜脈",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "6–9 mmHg",
          "label": "早期門脈高壓",
          "detail": "肝實質纖維化阻力增大，脾臟輕度腫大",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "10–12 mmHg (臨床顯著門脈高壓)",
          "label": "食道胃底靜脈曲張形成",
          "detail": "血液被迫開闢側支，食道微血管怒張如蚯蚓",
          "tone": "bad",
          "icon": "🩸"
        },
        {
          "range": "> 12 mmHg (破裂出血極限)",
          "label": "致死性食道靜脈破裂吐血",
          "detail": "突發巨量噴血休克，急診死亡率逾 30%",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-07-04": {
    "title": "戒酒 4–8 週對肝功能與血脂之可逆逆轉幅度",
    "caption": "單純脂肪肝或輕度肝炎病友嚴格戒酒 60 天後的生化指標改善。",
    "takeaway": "肝臟是全身再生能力最強的器官，只要及時停酒，數週內就能看到驚人奇蹟。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "% 指標改善幅度",
      "max": 60,
      "items": [
        {
          "label": "肝臟三酸甘油酯油滴容積",
          "value": 50,
          "display": "−50% (脂肪肝大幅逆轉)",
          "tone": "good",
          "icon": "🫀"
        },
        {
          "label": "血清丙胺酸轉胺酶 (ALT)",
          "value": 45,
          "display": "−45% (肝發炎趨緩)",
          "tone": "good",
          "icon": "📉"
        },
        {
          "label": "γ-麩胺醯轉移酶 (GGT)",
          "value": 55,
          "display": "−55% (解毒負擔歸零)",
          "tone": "good",
          "icon": "🧪"
        },
        {
          "label": "空腹胰島素阻抗 HOMA-IR",
          "value": 35,
          "display": "−35% (血糖代謝改善)",
          "tone": "good",
          "icon": "⚡"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-07-05": {
    "title": "急性暴飲誘發急性胰臟炎的酵素原自體消化機轉",
    "caption": "酒精刺激胰管括約肌痙攣並促發胰蛋白酶原在腺泡內提早活化。",
    "takeaway": "一次週末狂飲就可能誘發急性胰臟炎，劇烈上腹痛如刀割，併發壞死死亡率極高！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "單次急性暴飲 (> 5 標準杯)",
          "detail": "血液酒精與代謝產物毒性刺激",
          "tone": "bad",
          "icon": "🥃"
        },
        {
          "label": "奧狄氏括約肌痙攣水腫",
          "detail": "胰液排入十二指腸管道受阻逆流",
          "tone": "bad",
          "icon": "🚫"
        },
        {
          "label": "胰蛋白酶原在腺泡內提早自體活化",
          "detail": "強效消化酵素把胰臟自身當肉吃",
          "tone": "bad",
          "icon": "💥"
        },
        {
          "label": "急性壞死性胰臟炎引爆全身 SIRS",
          "detail": "劇烈上腹痛穿透背部、多重器官衰竭",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-08-01": {
    "title": "各大酒種 1 個標準杯 (10g 純酒精) 容量等價換算",
    "caption": "酒精體積公式：容量 (mL) × 酒精濃度 (ABV%) × 0.789 ÷ 100 = 純酒精克數。",
    "takeaway": "別再被「啤酒濃度低」騙了！一大瓶 600mL 啤酒就含有 2.4 個標準杯的純酒精！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "mL 液體容量",
      "max": 260,
      "items": [
        {
          "label": "一般拉格啤酒 (5.0%)",
          "value": 250,
          "display": "250 mL (小玻璃杯)",
          "tone": "info",
          "icon": "🍺"
        },
        {
          "label": "佐餐紅酒 / 白酒 (12.5%)",
          "value": 100,
          "display": "100 mL (小半杯)",
          "tone": "info",
          "icon": "🍷"
        },
        {
          "label": "日本清酒 / 燒酒 (18.0%)",
          "value": 70,
          "display": "70 mL (小清酒杯)",
          "tone": "info",
          "icon": "🍶"
        },
        {
          "label": "威士忌 / 白蘭地 (40.0%)",
          "value": 31,
          "display": "31 mL (單份烈酒 Shot)",
          "tone": "info",
          "icon": "🥃"
        },
        {
          "label": "金門高粱酒 (58.0%)",
          "value": 22,
          "display": "22 mL (一口小茅台杯)",
          "tone": "info",
          "icon": "🔥"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-08-02": {
    "title": "啤酒誘發痛風的雙重打擊機制",
    "caption": "高嘌呤原料加上乙醇代謝乳酸競爭性抑制腎臟排泄尿酸。",
    "takeaway": "啤酒是所有酒類中最容易引爆痛風的元兇：一邊灌進嘌呤，一邊把腎臟排尿酸關死！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "啤酒麥芽酵母發酵",
          "detail": "富含高濃度鳥苷等易吸收嘌呤",
          "tone": "warn",
          "icon": "🌾"
        },
        {
          "label": "肝臟代謝酒精生成乳酸",
          "detail": "血液乳酸濃度顯著上升",
          "tone": "warn",
          "icon": "🧪"
        },
        {
          "label": "乳酸在腎小管競爭 URAT1",
          "detail": "強烈抑制尿酸排出，尿酸排泄量暴跌 40%",
          "tone": "bad",
          "icon": "🚫"
        },
        {
          "label": "血液尿酸過飽和結晶析出",
          "detail": "白血球吞噬結晶，引爆大腳趾關節劇痛",
          "tone": "bad",
          "icon": "🦶"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-08-03": {
    "title": "「啤酒肚」的成因矩陣：液體熱量、低飽足與油炸配菜",
    "caption": "啤酒熱量密度不高，但大容量易灌入 + 刺激食慾促使下酒菜暴食。",
    "takeaway": "喝啤酒胖的不是麥汁，而是不知不覺灌下的 800 大卡酒精加上整盤炸熱炒！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "影響維度",
        "生化機制",
        "外食情境實測",
        "累積代價"
      ],
      "rows": [
        {
          "label": "液體熱量大體積",
          "icon": "🍺",
          "cells": [
            "每公克純酒精提供 7 大卡純能量",
            "聚會暢飲三四罐 500mL 啤酒",
            {
              "text": "輕鬆吞入 500–600 大卡",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "完全缺乏飽足感",
          "icon": "⏳",
          "cells": [
            "液態熱量無法刺激胃張力受體釋放 PYY",
            "喝完三罐依然飢腸轆轆",
            {
              "text": "毫無正餐飽腹感",
              "tone": "warn"
            }
          ]
        },
        {
          "label": "下酒菜油脂疊加",
          "icon": "🍗",
          "cells": [
            "酒精優先被肝臟燃燒，下酒菜脂肪全部原封不動存進肚子",
            "搭配熱炒鹹酥雞、滷味、烤肉",
            {
              "text": "內臟脂肪暴增形成典型啤酒肚",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-08-04": {
    "title": "紅酒白藜蘆醇的劑量落差：多酚無法抵消乙醇致癌性",
    "caption": "老鼠抗老試驗等效劑量 vs 一瓶 750mL 紅酒白藜蘆醇含量。",
    "takeaway": "要達到動物實驗的抗衰老劑量，人體每天必須喝上千瓶紅酒！",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "毫克 (mg) 白藜蘆醇",
      "max": 500,
      "items": [
        {
          "label": "一整瓶 750mL 紅酒所含含量",
          "value": 2.5,
          "display": "1–5 mg (微量)",
          "tone": "ok",
          "icon": "🍷"
        },
        {
          "label": "囓齒動物抗老研究換算人體劑量",
          "value": 500,
          "display": "250–500 mg (需喝百瓶)",
          "tone": "bad",
          "icon": "🐁"
        },
        {
          "label": "伴隨喝下的乙醇致癌物總量",
          "value": 450,
          "display": "400+ 瓶致死酒精毒性",
          "tone": "bad",
          "icon": "☠️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-08-05": {
    "title": "紅酒誘發劇烈頭痛的三大生化嫌疑犯矩陣",
    "caption": "生物胺 (組織胺/酪胺)、亞硫酸鹽與類黃酮對腦血管的擴張刺激。",
    "takeaway": "喝半杯紅酒就偏頭痛？那是二胺氧化酶 DAO 不足無法分解生物胺，不是酒量差。",
    "grade": "B",
    "chart": {
      "kind": "matrix",
      "cols": [
        "嫌疑物質",
        "來源成因",
        "頭痛生理機轉",
        "防禦對策"
      ],
      "rows": [
        {
          "label": "生物胺 (組織胺/酪胺)",
          "icon": "🧀",
          "cells": [
            "連皮帶籽長時間浸皮發酵產生",
            "體內 DAO 酵素不足，引發腦血管搏動擴張",
            {
              "text": "換喝白酒或伏特加清蒸餾酒",
              "tone": "good"
            }
          ]
        },
        {
          "label": "亞硫酸鹽 (Sulfites)",
          "icon": "🧪",
          "cells": [
            "酒莊用於抗氧化防腐添加",
            "誘發特異過敏體質者氣喘與神經性頭痛",
            {
              "text": "挑選標示無二氧化硫添加自然酒",
              "tone": "good"
            }
          ]
        },
        {
          "label": "槲皮素葡萄糖苷酸",
          "icon": "🍇",
          "cells": [
            "葡萄果皮吸收陽光合成之多酚",
            "抑制 ALDH2 酵素活性，導致微量乙醛蓄積",
            {
              "text": "偏頭痛體質者應嚴格避免紅酒",
              "tone": "warn"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-09-01": {
    "title": "中度濃度酒精 (15–25%) 的快速穿透效應",
    "caption": "清酒、韓式燒酒與調酒的濃度最易突破胃黏膜防禦。",
    "takeaway": "15–25% 是胃吸收效率最快的「甜蜜點」；度數不高卻讓人最快喝到斷片。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "< 5% (一般啤酒)",
          "label": "大體積排空延遲",
          "detail": "大量水分稀釋，吸收速率受限於胃容量",
          "tone": "ok",
          "icon": "🍺"
        },
        {
          "range": "15–25% (清酒/燒酒/調酒)",
          "label": "胃腸急速吸收甜蜜點",
          "detail": "刺激胃排空且濃度足夠穿透微血管，BAC 上升最陡峭！",
          "tone": "bad",
          "icon": "🍶"
        },
        {
          "range": "> 40% (高粱/威士忌純飲)",
          "label": "高濃度幽門痙攣延遲",
          "detail": "化學性腐蝕刺激引發幽門暫時緊閉，反而延遲排空",
          "tone": "warn",
          "icon": "🥃"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-09-02": {
    "title": "平價韓式燒酒人工甜味劑遮蔽苦味之暴飲陷阱",
    "caption": "果味燒酒與添加甜味劑如何瓦解人體天然防禦警覺。",
    "takeaway": "甜味遮蔽了刺鼻乙醇感，像喝果汁般一瓶接一瓶，不知不覺吞下半瓶烈酒的酒精！",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "傳統純飲蒸餾烈酒 (如高粱/伏特加)",
          "icon": "🥃",
          "tone": "info",
          "points": [
            "高度乙醇帶來強烈灼熱刺痛感",
            "大腦本能產生防禦警戒，小口慢啜",
            "難以短時間一口氣豪飲"
          ]
        },
        {
          "title": "平價水果調味燒酒 (13–16% ABV)",
          "icon": "🍹",
          "tone": "bad",
          "points": [
            "添加高量果糖或甜味劑壓制苦澀辣感",
            "酸甜順口讓人當成果汁豪飲",
            "一瓶 360mL 相當於一口氣灌下 4 杯標準烈酒！"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-09-03": {
    "title": "高度數烈酒 (>40%) 對上消化道黏膜之化學腐蝕路徑",
    "caption": "高濃度乙醇直接使細胞膜脫水、蛋白質變性並破壞黏液屏障。",
    "takeaway": "空腹一口乾杯 58 度高粱，相當於用有機溶劑直接灼燒食道黏膜！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "58 度高粱酒直接接觸食道",
          "detail": "局部乙醇濃度超標，吸取細胞膜水分",
          "tone": "bad",
          "icon": "🔥"
        },
        {
          "label": "黏膜上皮蛋白質瞬時凝固變性",
          "detail": "黏液防護屏障被物理性溶解剝離",
          "tone": "bad",
          "icon": "🧪"
        },
        {
          "label": "黏膜下神經末梢與微血管暴露",
          "detail": "引發急性紅腫糜爛與胸骨後灼痛",
          "tone": "bad",
          "icon": "⚡"
        },
        {
          "label": "基底幹細胞代償性反覆增生",
          "detail": "突變機率倍增，走向食道鱗狀細胞癌",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-09-04": {
    "title": "深色陳年烈酒同系物 (Congeners) 與宿醉嚴重度對照",
    "caption": "波本威士忌、白蘭地深色雜醇油 vs 伏特加純酒精的隔日宿醉評分。",
    "takeaway": "同系物越複雜（深色木桶陳釀），宿醉頭痛越劇烈；但純酒精總量永遠是關鍵。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "主觀宿醉嚴重度評分 (0–10)",
      "max": 10,
      "items": [
        {
          "label": "純蒸餾伏特加 (極少同系物)",
          "value": 3.2,
          "display": "3.2 分 (輕度反應)",
          "tone": "ok",
          "icon": "🍸"
        },
        {
          "label": "一般拉格啤酒",
          "value": 4.5,
          "display": "4.5 分",
          "tone": "ok",
          "icon": "🍺"
        },
        {
          "label": "白葡萄酒",
          "value": 5,
          "display": "5.0 分",
          "tone": "warn",
          "icon": "🥂"
        },
        {
          "label": "深色紅葡萄酒",
          "value": 6.8,
          "display": "6.8 分 (單寧與胺類)",
          "tone": "warn",
          "icon": "🍷"
        },
        {
          "label": "波本威士忌 / 白蘭地",
          "value": 8.5,
          "display": "8.5 分 (高同系物雜醇)",
          "tone": "bad",
          "icon": "🥃"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-10-01": {
    "title": "宿醉四大致病病理成因矩陣",
    "caption": "脫水、發炎反應、低血糖與胃黏膜刺激的交織衝擊。",
    "takeaway": "宿醉不是單純「缺水」，更是全身免疫系統被酒精引爆的嚴重急性微發炎！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "病理成因",
        "生化機轉",
        "典型症狀表徵",
        "實證處置方案"
      ],
      "rows": [
        {
          "label": "體液高滲透脫水",
          "icon": "💧",
          "cells": [
            "ADH 抑制引發利尿，細胞脫水",
            "口乾舌燥、眼眶痠澀、搏動性頭痛",
            {
              "text": "口服電解質補液水 (ORS)",
              "tone": "good"
            }
          ]
        },
        {
          "label": "全身急性微發炎",
          "icon": "🔥",
          "cells": [
            "前列腺素與細胞激素 (IL-6) 飆升",
            "全身骨節痠痛、極度倦怠無力",
            {
              "text": "充分睡眠休息，時間修復",
              "tone": "good"
            }
          ]
        },
        {
          "label": "肝臟低血糖狀態",
          "icon": "🍬",
          "cells": [
            "NADH/NAD+ 失衡阻斷糖質新生",
            "冷汗手抖、心慌、頭暈腦鈍",
            {
              "text": "補充易吸收澱粉 (燕麥/清粥)",
              "tone": "good"
            }
          ]
        },
        {
          "label": "胃酸刺激與糜爛",
          "icon": "🥣",
          "cells": [
            "高濃度乙醇破壞胃壁屏障",
            "反胃噁心、胃灼熱乾嘔",
            {
              "text": "溫和流質飲食，避開刺激物",
              "tone": "good"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-10-02": {
    "title": "市售解酒產品宣稱 vs 高品質臨床人體 RCT 證據對照",
    "caption": "解酒糖、薑黃素、枳椇子、牛磺酸的宣稱 vs 考科藍系統性回顧結論。",
    "takeaway": "考科藍明確指出：沒有任何補充品能加速酒精清除！「神效解酒」全是行銷噱頭。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "坊間解酒產品廣告宣稱",
          "icon": "💊",
          "tone": "warn",
          "points": [
            "「應酬前吞兩顆，千杯不醉」",
            "「專利草本配方，加速肝臟解毒 3 倍」",
            "「隔天完全無宿醉感」"
          ]
        },
        {
          "title": "考科藍 (Cochrane) 實證審查",
          "icon": "🔬",
          "tone": "bad",
          "points": [
            "系統回顧所有已發表人體臨床 RCT",
            "無任何高品質證據證實能加速血液酒精清除",
            "僅可能微弱減輕輕微胃部不適",
            "反而給予飲酒者虛假安全感而更加過量暴飲！"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-10-03": {
    "title": "「回魂酒」延後戒斷的成癮惡性循環",
    "caption": "宿醉隔天早上再喝一杯酒（Hair of the Dog）的神經成癮陷阱。",
    "takeaway": "回魂酒只是用新一輪大腦麻醉暫時蓋住戒斷症狀，是走向酒精依賴的危險紅旗！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "宿醉隔晨大腦處於急性戒斷",
          "detail": "NMDA 興奮性反彈，手抖焦慮煩躁",
          "tone": "warn",
          "icon": "🤕"
        },
        {
          "label": "喝下「回魂酒」",
          "detail": "酒精再次壓制 NMDA 受體",
          "tone": "bad",
          "icon": "🍺"
        },
        {
          "label": "短暫自覺「頭不痛、手不抖了」",
          "detail": "誤以為回魂酒有奇效",
          "tone": "warn",
          "icon": "✨"
        },
        {
          "label": "陷入神經成癮惡性循環",
          "detail": "大腦結構永久改變，演變為慢性酒精成癮",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-10-04": {
    "title": "實證支持的宿醉急救四重奏 (RESTS SOP)",
    "caption": "醫學界唯一認可的宿醉處置：水分、電解質、碳水化合物與時間。",
    "takeaway": "喝大杯電解質水、吃一碗熱燕麥粥、在暗房好好睡一覺，時間是最好的解藥。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "第一步：補充水分與電解質",
          "detail": "慢飲 500 mL 等滲電解質水或清湯",
          "tone": "good",
          "icon": "💧"
        },
        {
          "label": "第二步：補充好消化碳水化合物",
          "detail": "吃香蕉、全麥吐司或清粥，穩定血糖",
          "tone": "good",
          "icon": "🍌"
        },
        {
          "label": "第三步：避免高油脂與辛辣食物",
          "detail": "減輕已被灼傷的胃黏膜負擔",
          "tone": "good",
          "icon": "🥣"
        },
        {
          "label": "第四步：充足睡眠與時間修復",
          "detail": "等待肝臟定速代謝，不可劇烈運動",
          "tone": "good",
          "icon": "🛌"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-10-05": {
    "title": "宿醉隔日嚴格禁止事項安全矩陣",
    "caption": "高溫三溫暖烤箱、超負荷劇烈訓練、亂吞止痛藥的致死風險。",
    "takeaway": "宿醉去洗三溫暖「逼汗排毒」？脫水加重加上血管劇烈擴張，極易猝死！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "危險禁忌行為",
        "坊間常見迷思",
        "真實生理致死代價",
        "正確替代做法"
      ],
      "rows": [
        {
          "label": "高溫烤箱 / 蒸氣室",
          "icon": "🧖",
          "cells": [
            "以熱出汗可以加速排毒",
            "極度加重脫水，血壓驟跌心肌梗塞猝死",
            {
              "text": "溫水淋浴，安靜平躺",
              "tone": "good"
            }
          ]
        },
        {
          "label": "長跑 / 重裝阻力訓練",
          "icon": "🏃",
          "cells": [
            "運動排汗讓腦袋清醒",
            "橫紋肌溶解與急性腎衰竭風險大增",
            {
              "text": "僅適合輕緩散步",
              "tone": "good"
            }
          ]
        },
        {
          "label": "吞服普拿疼止痛藥",
          "icon": "💊",
          "cells": [
            "快速解除宿醉頭痛",
            "肝臟 CYP2E1 生成大量 NAPQI 肝衰竭",
            {
              "text": "多喝水、冷敷額頭",
              "tone": "good"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-11-01": {
    "title": "普拿疼 (乙醯胺酚) 遇上酒精：致命性肝壞死機轉",
    "caption": "酒精活化 CYP2E1 促使乙醯胺酚轉化為毒性代謝物 NAPQI 之致死途徑。",
    "takeaway": "喝酒前後絕對嚴禁吃普拿疼！解毒穀胱甘肽耗盡時，短短幾顆就可能摧毀整個肝臟！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "服用乙醯胺酚（普拿疼）",
          "detail": "正常 90% 走安全硫酸化/葡萄糖醛酸化",
          "tone": "info",
          "icon": "💊"
        },
        {
          "label": "酒精誘導 CYP2E1 活性暴增",
          "detail": "大量轉化為強毒性 NAPQI 代謝物",
          "tone": "bad",
          "icon": "🧪"
        },
        {
          "label": "肝內抗氧化穀胱甘肽被掏空",
          "detail": "NAPQI 無法結合解毒，直接攻擊肝細胞蛋白",
          "tone": "bad",
          "icon": "💥"
        },
        {
          "label": "急性廣泛性大片肝細胞壞死",
          "detail": "猛爆性肝衰竭，需要緊急換肝搶救",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-11-02": {
    "title": "NSAIDs 止痛藥遇上酒精：上消化道急性大出血路徑",
    "caption": "布洛芬 (Ibuprofen)、阿斯匹靈抑制前列腺素加上酒精溶解胃黏膜。",
    "takeaway": "宿醉頭痛狂吞布洛芬？胃壁雙重潰爛，急診每週都有喝酒吃消炎藥吐血的案例！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "酒精直接腐蝕胃黏膜",
          "detail": "溶解保護性黏液層",
          "tone": "bad",
          "icon": "🥃"
        },
        {
          "label": "吞服 NSAIDs 抑制 COX-1 酵素",
          "detail": "保護胃壁的前列腺素合成完全中斷",
          "tone": "bad",
          "icon": "💊"
        },
        {
          "label": "胃酸長驅直入灼燒黏膜下血管",
          "detail": "形成深層多發性急性胃潰瘍",
          "tone": "bad",
          "icon": "🔥"
        },
        {
          "label": "上消化道急性噴血與黑便",
          "detail": "突發失血性休克，危及生命",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-11-03": {
    "title": "安眠鎮靜藥物 (BZD/Z-drugs) 遇上酒精之雙重 CNS 抑制",
    "caption": "酒精與安眠藥在 GABA-A 受體的致命協同作用。",
    "takeaway": "吃安眠藥配酒是致命禁忌！大腦呼吸中樞完全麻痺，常在睡夢中無聲窒息死亡。",
    "grade": "A",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "單一安眠藥物作用",
          "icon": "💊",
          "tone": "warn",
          "points": [
            "在醫師處方劑量下引導睡意",
            "呼吸中樞具備安全代償反饋",
            "次晨正常甦醒代謝"
          ]
        },
        {
          "title": "安眠藥物 ＋ 酒精 (致命加乘)",
          "icon": "☠️",
          "tone": "bad",
          "points": [
            "雙雙結合在 GABA-A 受體不同異位點",
            "氯離子通道持續大開，神經電位全面歸零",
            "腦幹呼吸驅動受阻，夜間窒息呼吸停止",
            "國際諸多名人因此引發致命意外悲劇"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-11-04": {
    "title": "降血糖藥物與降血壓藥物遇上酒精之交互反應矩陣",
    "caption": "磺醯尿素類引發致命低血糖、降壓藥加成引發姿勢性低血壓昏厥。",
    "takeaway": "糖尿病患空腹喝酒，夜間極易出現無意識的致命低血糖昏迷！",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "藥物類別",
        "交互生理機轉",
        "臨床主要風險",
        "用藥安全警戒"
      ],
      "rows": [
        {
          "label": "磺醯尿素類 / 胰島素",
          "icon": "💉",
          "cells": [
            "酒精抑制肝臟糖質新生，無糖可釋放",
            {
              "text": "致命性夜間嚴重低血糖昏迷",
              "tone": "bad"
            },
            "絕對不可空腹飲酒"
          ]
        },
        {
          "label": "第一線降血壓藥物",
          "icon": "🩸",
          "cells": [
            "酒精初期血管擴張，與降壓藥協同加成",
            {
              "text": "突發姿勢性低血壓、暈眩跌倒骨折",
              "tone": "warn"
            },
            "服藥與飲酒嚴格錯開"
          ]
        },
        {
          "label": "頭孢菌素類 / 甲硝唑",
          "icon": "💊",
          "cells": [
            "抑制 ALDH2 酵素引發「雙硫侖樣反應」",
            {
              "text": "心悸胸悶、呼吸困難、休克",
              "tone": "bad"
            },
            "服藥期間與停藥3天內嚴禁碰酒"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-01": {
    "title": "社交飲酒的三大防線：飲前、飲中、飲後減害 SOP",
    "caption": "【強制宣告】減害策略無法消除癌症因果風險，唯一真正安全量為 0。",
    "takeaway": "若非喝不可，落實「吃飽墊胃、定速配水、睡前停酒」三大防線。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "飲前防線：高蛋白高纖維墊胃",
          "detail": "延緩胃排空，削去 BAC 高峰 50%",
          "tone": "good",
          "icon": "🥪"
        },
        {
          "label": "飲中防線：1:1 酒水同行",
          "detail": "每喝一口酒配一杯水，速率 < 1 杯/小時",
          "tone": "good",
          "icon": "💧"
        },
        {
          "label": "避開氣泡與甜味調酒",
          "detail": "防範胃排空倍增與甜味遮蔽過量",
          "tone": "good",
          "icon": "🚫"
        },
        {
          "label": "飲後防線：睡前 4 小時停酒",
          "detail": "確保入睡時 BAC 降至 0，保護後半夜睡眠",
          "tone": "good",
          "icon": "🛌"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-02": {
    "title": "飲酒前高蛋白高纖維餐食延緩胃排空幅度",
    "caption": "不同墊胃食物延緩胃內酒精滯留時間對照（分鐘）。",
    "takeaway": "出發聚餐前先吞一顆茶葉蛋或喝一杯無糖豆漿，能大幅延緩小腸吸收速度。",
    "grade": "B",
    "chart": {
      "kind": "bars",
      "unit": "分鐘 胃排空半衰期",
      "max": 60,
      "items": [
        {
          "label": "完全空腹狀態",
          "value": 12,
          "display": "10–15 分鐘 (極速衝小腸)",
          "tone": "bad",
          "icon": "⚡"
        },
        {
          "label": "單純吃餅乾/甜點 (精緻碳水)",
          "value": 20,
          "display": "20 分鐘 (延緩有限)",
          "tone": "warn",
          "icon": "🍪"
        },
        {
          "label": "吃高纖蔬菜堅果沙拉",
          "value": 38,
          "display": "35–40 分鐘",
          "tone": "good",
          "icon": "🥗"
        },
        {
          "label": "吃水煮蛋 / 牛排 / 豆漿 (高蛋白脂肪)",
          "value": 55,
          "display": "50–60 分鐘 (防禦最佳)",
          "tone": "good",
          "icon": "🥚"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-03": {
    "title": "飲酒速率控制：每小時不超過 1 標準杯之生理餘裕",
    "caption": "飲用速度與肝臟零階清除速率相匹配之 BAC 累積模擬。",
    "takeaway": "每小時喝 1 杯，血液酒精不會無限堆積；每小時灌 3 杯，兩小時就達急性中毒。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "≤ 1 標準杯 / 小時",
          "label": "肝臟定速代謝平衡區",
          "detail": "肝臟清除速度 ≈ 攝入速度，BAC 維持低水準",
          "tone": "good",
          "icon": "✨"
        },
        {
          "range": "2 標準杯 / 小時",
          "label": "開始超載蓄積",
          "detail": "肝臟清除飽和，血液濃度每小時穩定爬升",
          "tone": "warn",
          "icon": "⚠️"
        },
        {
          "range": "3–4 標準杯 / 小時",
          "label": "急性暴飲危險區",
          "detail": "大腦小腦機能嚴重受損，出現語言含糊與斷片",
          "tone": "bad",
          "icon": "🚨"
        },
        {
          "range": "≥ 5 標準杯 / 2小時 (Binge)",
          "label": "急性酒精中毒致死紅線",
          "detail": "嘔吐誤吸、呼吸抑制昏迷，需急診洗胃插管",
          "tone": "bad",
          "icon": "☠️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-04": {
    "title": "「1:1 酒水同行法」維持有效細胞水合機制",
    "caption": "每飲用一份酒精飲品，隨後喝下一大杯等體積常溫開水。",
    "takeaway": "左手拿酒杯、右手拿水杯，稀釋黏膜濃度，主動防禦利尿脫水與隔日宿醉。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "連續純喝酒 (無補水)",
          "icon": "🍷",
          "tone": "bad",
          "points": [
            "高濃度乙醇反覆灼燒食道黏膜",
            "抗利尿激素 ADH 被封鎖，持續淨失水",
            "血液高滲透濃縮，大腦細胞失水劇烈",
            "隔天必定迎來頭痛欲裂之嚴重宿醉"
          ]
        },
        {
          "title": "嚴格 1:1 酒水同行",
          "icon": "💧",
          "tone": "good",
          "points": [
            "即刻物理稀釋食道與胃內酒精濃度",
            "抵消酒精利尿帶走的體液流失",
            "自然拉長兩杯酒之間的間隔時間",
            "大幅減輕隔日清晨血管性抽痛"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-05": {
    "title": "避免碳酸氣泡調酒與低糖調酒加速吸收矩陣",
    "caption": "調酒配方對胃排空與熱量認知的影響對照。",
    "takeaway": "無糖可樂調酒 (Diet Coke) 胃排空最快，血中酒精濃度比正常可樂更高！",
    "grade": "B",
    "chart": {
      "kind": "matrix",
      "cols": [
        "調酒調配型態",
        "胃排空速率",
        "血中酒精峰值 (BAC)",
        "減害建議"
      ],
      "rows": [
        {
          "label": "碳酸氣泡水調酒 (Highball)",
          "icon": "🥂",
          "cells": [
            "極快 (CO2 刺激幽門)",
            {
              "text": "衝頂極快",
              "tone": "bad"
            },
            "慢速啜飲，不可當汽水暢飲"
          ]
        },
        {
          "label": "無糖代糖汽水調酒",
          "icon": "🥤",
          "cells": [
            "比含糖汽水更快 (缺乏熱量阻滯)",
            {
              "text": "BAC 峰值高出 18%",
              "tone": "bad"
            },
            "切勿以為熱量低就多喝"
          ]
        },
        {
          "label": "水割 (天然水加冰塊純調)",
          "icon": "🥃",
          "cells": [
            "平緩穩定",
            {
              "text": "濃度被稀釋安全",
              "tone": "good"
            },
            "日本居酒屋最佳減害首選"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-06": {
    "title": "睡前 4 小時完全停酒捍衛後半夜深層修復",
    "caption": "酒精清除倒數計時：確保進入臥室上床前血液酒精濃度歸零。",
    "takeaway": "晚上 11 點睡覺，最晚 7 點後就不再碰酒，把酒精在睡前完全代謝乾淨。",
    "grade": "A",
    "chart": {
      "kind": "curve",
      "x": {
        "label": "晚間時間",
        "unit": "點鐘",
        "min": 18,
        "max": 24,
        "ticks": [
          18,
          19,
          20,
          21,
          22,
          23,
          24
        ]
      },
      "y": {
        "label": "體內殘留純酒精",
        "unit": "克 (g)",
        "min": 0,
        "max": 30,
        "ticks": [
          0,
          10,
          20,
          30
        ]
      },
      "series": [
        {
          "name": "19:00 停酒 (入睡前歸零，保護睡眠)",
          "tone": "good",
          "points": [
            [
              18,
              25
            ],
            [
              19,
              25
            ],
            [
              20,
              18
            ],
            [
              21,
              10
            ],
            [
              22,
              2
            ],
            [
              23,
              0
            ],
            [
              24,
              0
            ]
          ]
        },
        {
          "name": "22:00 仍續杯 (酒精帶入睡夢，睡眠毀滅)",
          "tone": "bad",
          "points": [
            [
              18,
              0
            ],
            [
              19,
              10
            ],
            [
              20,
              20
            ],
            [
              21,
              25
            ],
            [
              22,
              30
            ],
            [
              23,
              22
            ],
            [
              24,
              15
            ]
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-12-07": {
    "title": "補充維生素 B 群與 NAC 的科學真實邊界",
    "caption": "飲酒前後吞 B 群不能提升解毒酵素，只能防止長期酗酒之維生素匱乏。",
    "takeaway": "維生素 B 群是代謝輔酶，不是解酒特效藥；吞了 B 群狂喝依然致癌傷肝。",
    "grade": "B",
    "chart": {
      "kind": "compare",
      "columns": [
        {
          "title": "保健品的真實輔助價值",
          "icon": "💊",
          "tone": "info",
          "points": [
            "酒精代謝會消耗維生素 B1 (硫胺素)",
            "長期飲酒者易發生 B1 缺乏致韋尼克腦病",
            "適量補充 B 群有助維持基礎神經代謝"
          ]
        },
        {
          "title": "不可信的偽科學神話",
          "icon": "🚫",
          "tone": "bad",
          "points": [
            "「吃了 B 群就能把酒量提升一倍」",
            "「吞 NAC 可以完全抵消乙醛毒性」",
            "把保健品當作肆無忌憚拚酒的許可證"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-13-01": {
    "title": "WHO 簡式酒精使用障礙篩檢量表 (AUDIT-C)",
    "caption": "三題快速自我篩檢飲用頻率、飲用量與暴飲頻率（總分 0–12 分）。",
    "takeaway": "男性 ≥ 4 分、女性 ≥ 3 分即為酒精使用障礙陽性警戒，需專業諮詢。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "AUDIT-C 三道核心題目",
        "0分 (無風險)",
        "1–2分 (輕度)",
        "3–4分 (警戒危險)"
      ],
      "rows": [
        {
          "label": "Q1：你多常喝含酒精飲料？",
          "icon": "📅",
          "cells": [
            "從不",
            "每月 1 次或更少",
            {
              "text": "每週 2–3 次以上",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "Q2：平時喝酒的日子一天喝幾杯？",
          "icon": "🥃",
          "cells": [
            "1–2 杯",
            "3–4 杯",
            {
              "text": "5 杯以上 (暴飲)",
              "tone": "bad"
            }
          ]
        },
        {
          "label": "Q3：一次喝 6 杯以上的頻率？",
          "icon": "🚨",
          "cells": [
            "從不",
            "少於每月 1 次",
            {
              "text": "每週或每天發生",
              "tone": "bad"
            }
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-13-02": {
    "title": "酒精依賴的大腦神經迴路重塑機制",
    "caption": "腹側被蓋區 (VTA) 多巴胺獎勵迴路劫持與杏仁核負向情緒驅動。",
    "takeaway": "酒精成癮不是意志力薄弱，而是大腦神經線路被化學重塑的器質性慢性病！",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "酒精引爆伏隔核多巴胺釋放",
          "detail": "產生短暫強烈欣快感與放鬆錯覺",
          "tone": "warn",
          "icon": "✨"
        },
        {
          "label": "前額葉大腦控制中樞萎縮",
          "detail": "抑制衝動與決策能力神經連接削弱",
          "tone": "bad",
          "icon": "🧠"
        },
        {
          "label": "杏仁核應激神經元過度敏化",
          "detail": "不喝酒時充斥煩躁、焦慮與空虛感",
          "tone": "bad",
          "icon": "⚡"
        },
        {
          "label": "強迫性渴求 (Craving) 驅動",
          "detail": "喝酒從「追求快樂」變成「逃避痛苦」",
          "tone": "bad",
          "icon": "⛓️"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-13-03": {
    "title": "酒精戒斷綜合徵 (AWS) 病程與震顫譫妄警訊階梯",
    "caption": "長期重度飲酒者突然中斷飲酒後 6 至 72 小時的神經風暴。",
    "takeaway": "長期酗酒者「自行突然戒酒」具致死風險！需住院使用 BZD 醫療監督戒斷。",
    "grade": "A",
    "chart": {
      "kind": "ladder",
      "items": [
        {
          "range": "停酒 6–12 小時 (輕度)",
          "label": "自主神經興奮過度",
          "detail": "雙手明顯顫抖、大汗淋漓、失眠、心悸心慌",
          "tone": "warn",
          "icon": "🤲"
        },
        {
          "range": "停酒 12–24 小時 (中度)",
          "label": "酒精性幻覺症",
          "detail": "短暫聽幻覺、視幻覺（看到蟲在爬），意識尚清楚",
          "tone": "bad",
          "icon": "👻"
        },
        {
          "range": "停酒 24–48 小時 (重度)",
          "label": "戒斷性癲癇大發作",
          "detail": "全身強直陣攣抽搐，具窒息猝死風險",
          "tone": "bad",
          "icon": "⚡"
        },
        {
          "range": "停酒 48–72 小時 (致命紅旗)",
          "label": "震顫譫妄 (Delirium Tremens)",
          "detail": "深度意識障礙、狂躁、高燒虛脫，死亡率高達 15–20%！",
          "tone": "bad",
          "icon": "🚨"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-13-04": {
    "title": "台灣戒酒醫療資源與社會支持網絡路徑",
    "caption": "衛福部酒癮治療補助方案與戒酒無名會 (AA) 雙軌求助管道。",
    "takeaway": "衛福部每年提供最高 4 萬元酒癮醫療補助，就診精神科/身心科踏出第一步。",
    "grade": "A",
    "chart": {
      "kind": "flow",
      "steps": [
        {
          "label": "察覺飲酒失控問題",
          "detail": "AUDIT-C 超標或家人提醒工作受損",
          "tone": "warn",
          "icon": "👁️"
        },
        {
          "label": "就診指定酒癮治療機構",
          "detail": "醫學中心或精神專科醫院成癮防制科",
          "tone": "good",
          "icon": "🏥"
        },
        {
          "label": "申請衛福部酒癮治療補助",
          "detail": "每年最高 4 萬元藥物與心理諮商補助",
          "tone": "good",
          "icon": "📋"
        },
        {
          "label": "加入互助團體長期維持",
          "detail": "戒酒無名會 (AA Taiwan) 同儕同理支持",
          "tone": "good",
          "icon": "🤝"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-14-01": {
    "title": "2025 年美國衛生總署飲酒癌症警告重大變革",
    "caption": "美國衛生總署署長 (Surgeon General) 2025 年發布之劃時代公共衛生公告。",
    "takeaway": "這是半世紀以來最大的酒精公衛轉向：酒精與香菸同罪，是第三大可預防致癌物。",
    "grade": "A",
    "chart": {
      "kind": "matrix",
      "cols": [
        "公告核心主題",
        "官方實證指引定調",
        "公共衛生倡議方向",
        "對公眾之行動呼籲"
      ],
      "rows": [
        {
          "label": "第三大致癌死因",
          "icon": "⚠️",
          "cells": [
            "酒精僅次於菸草與肥胖，每年造成 2 萬名美國人癌症死亡",
            {
              "text": "酒瓶包裝加印癌症警語",
              "tone": "bad"
            },
            "知情才有真正的選擇權"
          ]
        },
        {
          "label": "乳癌強烈因果性",
          "icon": "🎀",
          "cells": [
            "約 16% 女性乳癌與飲酒直接相關，少量亦有風險",
            {
              "text": "女性低風險標準更趨嚴格",
              "tone": "bad"
            },
            "育齡與更年期女性應少碰"
          ]
        },
        {
          "label": "零安全劑量共識",
          "icon": "🛑",
          "cells": [
            "徹底告別「每天一杯紅酒延年益壽」的舊時代行銷神話",
            {
              "text": "官方指引走向「越少越好」",
              "tone": "good"
            },
            "不喝最好，少喝更好"
          ]
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  },
  "FIG-A-14-02": {
    "title": "全球主要國家低風險飲酒指引最新收緊趨勢",
    "caption": "各國每日/每週建議攝取上限逐年腰斬之全球公衛轉折。",
    "takeaway": "全球科學界指引趨勢完全一致：調降飲酒額度，邁向「能不喝就不喝」。",
    "grade": "A",
    "chart": {
      "kind": "bars",
      "unit": "標準杯 / 週 (上限)",
      "max": 15,
      "items": [
        {
          "label": "舊時代傳統指引 (2010 年前)",
          "value": 14,
          "display": "14 杯 / 週 (每天 2 杯)",
          "tone": "warn",
          "icon": "📜"
        },
        {
          "label": "英國 NHS 現代指引 (2016)",
          "value": 6,
          "display": "6 杯 / 週 (14 單位)",
          "tone": "ok",
          "icon": "🇬🇧"
        },
        {
          "label": "澳洲 NHMRC 最新指引 (2020)",
          "value": 5,
          "display": "< 5 杯 / 週",
          "tone": "ok",
          "icon": "🇦🇺"
        },
        {
          "label": "加拿大 CCSA 權威指引 (2023)",
          "value": 2,
          "display": "≤ 2 杯 / 週 (極低風險)",
          "tone": "good",
          "icon": "🇨🇦"
        },
        {
          "label": "WHO 歐洲區最新立場 (2023–2026)",
          "value": 0,
          "display": "0 杯 (無安全門檻)",
          "tone": "good",
          "icon": "🌍"
        }
      ]
    },
    "sources": [
      "SRC-CURR-2026"
    ]
  }
};

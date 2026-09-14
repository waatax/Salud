import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  HeartPulse,
  Brain,
  ShieldCheck,
  RotateCcw,
  Printer,
  Flame,
  Moon,
  Sun,
  Coffee,
  Dumbbell
} from 'lucide-react';

interface AssessmentState {
  chronotype: 'LARK' | 'INTERMEDIATE' | 'OWL' | 'SHIFT';
  metabolic: 'HEALTHY' | 'SKINNY_FAT' | 'PRE_METABOLIC' | 'EOSS_HIGH';
  stress: 'HIGH_SYMPATHETIC' | 'BRAIN_FOG' | 'EMOTIONAL_EATING' | 'RESILIENT';
  posture: 'SEDENTARY_DESK' | 'LOW_ACTIVITY' | 'ACTIVE_TIGHT' | 'ADVANCED';
  goal: 'METABOLIC_RESET' | 'LONGEVITY_REPAIR' | 'POSTURE_LIBERATION' | 'PEAK_FOCUS';
}

const STORAGE_KEY = 'salud_ultrahealth_blueprint_v1';

export const PersonalHealthBlueprint: React.FC = () => {
  const [profile, setProfile] = useState<AssessmentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      chronotype: 'INTERMEDIATE',
      metabolic: 'PRE_METABOLIC',
      stress: 'HIGH_SYMPATHETIC',
      posture: 'SEDENTARY_DESK',
      goal: 'METABOLIC_RESET'
    };
  });

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const handleReset = () => {
    const defaultProfile: AssessmentState = {
      chronotype: 'INTERMEDIATE',
      metabolic: 'PRE_METABOLIC',
      stress: 'HIGH_SYMPATHETIC',
      posture: 'SEDENTARY_DESK',
      goal: 'METABOLIC_RESET'
    };
    setProfile(defaultProfile);
  };

  // Generated Blueprint Details based on Profile
  const getCircadianSchedule = () => {
    switch (profile.chronotype) {
      case 'LARK':
        return {
          wakeTime: '06:00',
          sunlightWindow: '06:15 - 06:45 (早晨 10,000+ lux 自然光重置視交叉核 SCN)',
          caffeineCutoff: '12:30 嚴格截斷 (保護腺苷受體清運)',
          workoutWindow: '16:00 - 17:30 (核心體溫頂峰，肌力爆發最佳)',
          dinnerEnd: '18:30 前完成 (保留 3.5 小時胃排空與生長激素脈衝)',
          screenOff: '21:00 濾藍光 (褪黑激素自然分泌上升)',
          sleepTime: '22:00 (進入深層慢波睡眠，膠淋巴清運腦廢物)'
        };
      case 'OWL':
        return {
          wakeTime: '08:30',
          sunlightWindow: '08:45 - 09:30 (強烈戶外光照 + 晨間冷水洗臉抑止褪黑激素)',
          caffeineCutoff: '14:30 截斷',
          workoutWindow: '17:30 - 19:00 (皮質醇自然下降期，適合 Zone 2 或大肌群阻抗)',
          dinnerEnd: '20:00 前完成',
          screenOff: '23:30 濾藍光',
          sleepTime: '00:30 (維持穩定 7.5 小時睡眠週期)'
        };
      case 'SHIFT':
        return {
          wakeTime: '彈性 (依班次鎖定主要睡眠塊 7H)',
          sunlightWindow: '主醒來 30 分鐘內尋求高照度光盒或戶外日光',
          caffeineCutoff: '入睡前 8 小時嚴格截斷 (以 L-茶氨酸或薄荷代替)',
          workoutWindow: '值勤前 2 小時 (啟動交感神經與核心肌群)',
          dinnerEnd: '大睡眠前 4 小時避免高脂大餐 (防止胃食道逆流與夜間心率過高)',
          screenOff: '回寢全程佩戴 99% 防藍光琥珀眼鏡 + 遮光眼罩',
          sleepTime: '維持完全黑暗與 19-21°C 恆溫睡眠環境'
        };
      case 'INTERMEDIATE':
      default:
        return {
          wakeTime: '07:00',
          sunlightWindow: '07:15 - 07:45 (戶外 10,000 lux 自然光照，校正日夜中樞)',
          caffeineCutoff: '13:30 截斷 (咖啡因半衰期 5-7 小時防護)',
          workoutWindow: '17:00 - 18:30 (關節滑液與神經傳導效率巔峰)',
          dinnerEnd: '19:15 前完成',
          screenOff: '22:00 阻斷藍光',
          sleepTime: '23:00 (保證 4-5 個完整睡眠週期)'
        };
    }
  };

  const getMicroHabits = () => {
    const list = [];
    if (profile.metabolic === 'PRE_METABOLIC' || profile.metabolic === 'EOSS_HIGH') {
      list.push({
        name: '飯後 10 分鐘比目魚肌幫浦 / 慢走',
        trigger: '放下筷子的那一刻',
        action: '站立慢走或坐姿比目魚肌提踵 (Soleus Pushup) 連續 10 分鐘',
        benefit: '平抑飯後血糖峰值達 30-40%，大幅降低胰島素分泌負擔'
      });
    } else {
      list.push({
        name: '晨起 500ml 溫鹽水補水',
        trigger: '雙腳踩下床地的瞬間',
        action: '飲用加入微量天然海鹽的溫水 500ml',
        benefit: '補足夜間隱性脫水，啟動胃結腸反射與交感神經溫和甦醒'
      });
    }

    if (profile.stress === 'HIGH_SYMPATHETIC' || profile.stress === 'BRAIN_FOG') {
      list.push({
        name: '0.1Hz 生理共振箱式呼吸 (Box Breathing)',
        trigger: '午後 14:00 或感到焦慮緊繃時',
        action: '吸氣 4 秒 - 屏息 4 秒 - 吐氣 4 秒 - 屏息 4 秒，循環 5 分鐘',
        benefit: '活化迷走神經，降低心率與唾液皮質醇，迅速重置大腦專注力'
      });
    } else {
      list.push({
        name: '午後 90 秒伸展衝動阻斷',
        trigger: '下午想抓零食或分心時',
        action: '起立做開胸伸展 3 次 + 喝一大口冰水',
        benefit: '多巴胺路徑重定向，中斷習慣性無意識糖分攝取'
      });
    }

    if (profile.posture === 'SEDENTARY_DESK' || profile.posture === 'LOW_ACTIVITY') {
      list.push({
        name: '每久坐 50 分鐘釋放髖屈肌',
        trigger: '番茄鐘響或會議結束時',
        action: '弓箭步下沉骨盆，每側維持 30 秒伸展髂腰肌',
        benefit: '解除骨盆前傾夾擊，防止臀大肌失憶症與下背慢性代償'
      });
    } else {
      list.push({
        name: '睡前 3 分鐘脊椎減壓旋轉',
        trigger: '換上睡衣躺在瑜伽墊上時',
        action: '仰臥抱膝左右緩慢傾倒各 10 次，搭配深長吐氣',
        benefit: '釋放腰椎小面關節壓力，引導副交感神經深度放鬆'
      });
    }
    return list;
  };

  const getPhysioPrescription = () => {
    switch (profile.posture) {
      case 'SEDENTARY_DESK':
        return {
          title: '久坐辦公族：上交叉烏龜頸與下交叉骨盆復位處方',
          focusArea: '深頸屈肌、下斜方肌、臀中肌、髂腰肌',
          moves: [
            { name: '靠牆收下巴 (Chin Tuck)', sets: '每日 3 組 × 10 次', tip: '後腦貼牆，水平後推，嚴禁低頭' },
            { name: '胸椎滾筒伸展 (Thoracic Extension)', sets: '每日 2 組 × 60 秒', tip: '滾筒橫置胸椎中段，雙手抱頭仰臥微伸展' },
            { name: '單腳臀橋 (Single-Leg Glute Bridge)', sets: '每側 3 組 × 12 次', tip: '腳跟蹬地，由臀大肌主導頂髖，避免腰椎借力' }
          ]
        };
      case 'ACTIVE_TIGHT':
        return {
          title: '運動緊繃者：關節活動度 (Mobility) 與筋膜滑動平衡',
          focusArea: '胸椎旋轉度、足踝背屈 (Ankle Dorsiflexion)、髖關節內外旋',
          moves: [
            { name: '世界上最偉大的伸展 (World’s Greatest Stretch)', sets: '每側 5 次循環', tip: '結合弓箭步、胸椎旋轉與後腿後側伸展' },
            { name: '90/90 髖關節切換 (90/90 Hip Switch)', sets: '左右交替各 10 次', tip: '坐姿軀幹直挺，緩慢外旋與內旋交替' },
            { name: '足踝膝碰牆測量伸展', sets: '每側 3 組 × 45 秒', tip: '腳跟不離地，膝蓋向前碰牆增加關節囊活動空間' }
          ]
        };
      default:
        return {
          title: '全身動力鏈活化與抗引力基底強化',
          focusArea: '核心腹橫肌、菱形肌、足底內在肌群',
          moves: [
            { name: '死蟲式 (Dead Bug)', sets: '左右交替各 12 次 × 3 組', tip: '下背緊貼地面無縫隙，緩慢延伸對側手腳' },
            { name: '俯臥 Y-T-W 伸展', sets: '各字母維持 5 秒 × 8 組', tip: '以肩胛骨內收下壓為主動力，非手臂蠻力' },
            { name: '短足運動 (Short Foot Exercise)', sets: '站姿每足 3 組 × 15 次', tip: '大拇趾球、小拇趾球與腳跟三點著地，抬起足弓' }
          ]
        };
    }
  };

  const getCrossPillarSynergy = () => {
    switch (profile.goal) {
      case 'METABOLIC_RESET':
        return {
          pillar: '肥胖與體重科學專區 (Obesity Hub)',
          actionName: 'EOSS 分級自測與蛋白質槓桿飲食',
          recommendation: '前往肥胖專區檢視您的 EOSS 臨床分級，搭配 1.6~2.0g/kg 蛋白質防禦骨骼肌，並啟動 15 分鐘衝動衝浪認知抑制器。',
          targetTab: 'obesity'
        };
      case 'LONGEVITY_REPAIR':
        return {
          pillar: '長壽與抗老化醫學專區 (Longevity Hub)',
          actionName: '12 大衰老標誌與表觀遺傳時鐘調控',
          recommendation: '前往長壽專區了解 mTOR / AMPK 養分感測調控，每週安排 150-180 分鐘 Zone 2 心肺訓練與每週 2-3 次芬蘭式桑拿激效適應。',
          targetTab: 'longevity'
        };
      case 'POSTURE_LIBERATION':
        return {
          pillar: '骨骼肌與運動專區 (Musculoskeletal Pillar)',
          actionName: '筋膜鏈張力平衡與抗阻訓練最低有效量',
          recommendation: '進入物治自救庫建立每週 2 次全身複合式肌力訓練（深蹲、羅馬尼亞硬舉、臥推/伏地挺身），穩固關節軟骨。',
          targetTab: 'physio'
        };
      case 'PEAK_FOCUS':
      default:
        return {
          pillar: '腦神經與睡眠修復專區 (Neurology & Sleep)',
          actionName: '皮質醇喚醒反應 (CAR) 與深層慢波睡眠鞏固',
          recommendation: '嚴格落實早晨 30 分鐘自然光照喚醒大腦視交叉核，傍晚啟動藍光阻斷，並透過 0.1Hz 共振呼吸將大腦自律神經迅速切入副交感修復態。',
          targetTab: 'protocol'
        };
    }
  };

  const schedule = getCircadianSchedule();
  const microHabits = getMicroHabits();
  const physioRx = getPhysioPrescription();
  const crossPillar = getCrossPillarSynergy();

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `【Salud 個人超健康專屬藍圖】
晝夜型態：${profile.chronotype} | 代謝狀態：${profile.metabolic} | 首要目標：${profile.goal}
起床時間：${schedule.wakeTime} | 咖啡因截斷：${schedule.caffeineCutoff}
黃金運動：${schedule.workoutWindow} | 入睡時間：${schedule.sleepTime}
專屬習慣：${microHabits.map(h => h.name).join('、')}
動力鏈處方：${physioRx.title}`;

    navigator.clipboard?.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Profile Customizer Card */}
      <div className="rounded-3xl border border-amber-500/30 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-lg backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Personal Ultra-Health Blueprint Assessment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
              個人超健康客製藍圖與表型評估診斷
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              勾選您的個人生理表型，系統將即刻合算量身定做的 24H 晝夜節律表、原子微習慣與動力鏈急救處方。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              className="btn-tactile px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1 hover:border-amber-500"
              title="重設為預設值"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重設評估</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="btn-tactile px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm hover:bg-amber-400"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCopied ? '已複製摘要！' : '複製藍圖摘要'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-tactile px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs hidden sm:flex items-center gap-1 hover:border-cyan-500"
              title="列印保存"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>列印</span>
            </button>
          </div>
        </div>

        {/* 5-Step Phenotype Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          {/* Dimension 1: Chronotype */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[11px] font-mono">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>1. 晝夜時型 (Chronotype)</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'LARK', label: '晨型百靈鳥 (早起)' },
                { id: 'INTERMEDIATE', label: '中間型 (常規 07-23)' },
                { id: 'OWL', label: '夜型貓頭鷹 (晚睡晚起)' },
                { id: 'SHIFT', label: '輪班 / 跨時區工作者' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProfile({ ...profile, chronotype: opt.id as any })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all text-[11px] ${
                    profile.chronotype === opt.id
                      ? 'bg-amber-500/20 border-amber-500 font-bold text-amber-900 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension 2: Metabolic */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[11px] font-mono">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>2. 代謝與體態狀態</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'HEALTHY', label: '健康勻稱 (EOSS 0)' },
                { id: 'SKINNY_FAT', label: '隱形肥胖 / 泡芙肌少' },
                { id: 'PRE_METABOLIC', label: '腹部脂肪 / 飯後嗜睡' },
                { id: 'EOSS_HIGH', label: '代謝負荷重 (高血壓/脂)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProfile({ ...profile, metabolic: opt.id as any })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all text-[11px] ${
                    profile.metabolic === opt.id
                      ? 'bg-rose-500/20 border-rose-500 font-bold text-rose-900 dark:text-rose-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension 3: Stress & Autonomic */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[11px] font-mono">
              <Brain className="w-3.5 h-3.5 text-purple-500" />
              <span>3. 自律神經與壓力負荷</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'HIGH_SYMPATHETIC', label: '慢性緊繃 / 肩頸僵硬' },
                { id: 'BRAIN_FOG', label: '午後腦霧 / 疲憊昏睡' },
                { id: 'EMOTIONAL_EATING', label: '夜間壓力型暴飲暴食' },
                { id: 'RESILIENT', label: '平衡良好 / 調適穩定' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProfile({ ...profile, stress: opt.id as any })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all text-[11px] ${
                    profile.stress === opt.id
                      ? 'bg-purple-500/20 border-purple-500 font-bold text-purple-900 dark:text-purple-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension 4: Posture */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[11px] font-mono">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>4. 日常活動與動力鏈</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'SEDENTARY_DESK', label: '久坐辦公桌 (>8H/天)' },
                { id: 'LOW_ACTIVITY', label: '低活動量 (<5000步)' },
                { id: 'ACTIVE_TIGHT', label: '常運動但關節極度緊繃' },
                { id: 'ADVANCED', label: '體能進階求突破' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProfile({ ...profile, posture: opt.id as any })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all text-[11px] ${
                    profile.posture === opt.id
                      ? 'bg-cyan-500/20 border-cyan-500 font-bold text-cyan-900 dark:text-cyan-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension 5: Goal */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[11px] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>5. 個人首要核心目標</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'METABOLIC_RESET', label: '重啟代謝與減脂控糖' },
                { id: 'LONGEVITY_REPAIR', label: '細胞自噬與延緩衰老' },
                { id: 'POSTURE_LIBERATION', label: '解救腰背痛與動力鏈' },
                { id: 'PEAK_FOCUS', label: '大腦高專注與深層睡眠' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProfile({ ...profile, goal: opt.id as any })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all text-[11px] ${
                    profile.goal === opt.id
                      ? 'bg-emerald-500/20 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Synthesized Blueprint Output */}
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-900 dark:text-white">
          <ShieldCheck className="w-5 h-5 text-cyan-500" />
          <span>根據您的體質與表型診斷，客製生成的「個人超健康精準實踐處方箋」</span>
        </div>

        {/* Section 1: Custom Circadian Timeline Card */}
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-transparent p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                個人專屬 24H 晝夜作息時序 (Circadian Timing Protocol)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold">
              目標起床：{schedule.wakeTime} ｜ 入睡：{schedule.sleepTime}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                <Sun className="w-4 h-4" />
                <span>晨間光照喚醒視窗</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.sunlightWindow}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-orange-600 dark:text-orange-400">
                <Coffee className="w-4 h-4" />
                <span>咖啡因安全截斷臨界點</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.caffeineCutoff}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <Dumbbell className="w-4 h-4" />
                <span>最佳運動訓練黃金時段</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.workoutWindow}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                <Flame className="w-4 h-4" />
                <span>晚餐進食視窗截止點</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.dinnerEnd}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                <Moon className="w-4 h-4" />
                <span>藍光阻斷與褪黑激素激發</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.screenOff}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400">
                <Brain className="w-4 h-4" />
                <span>深層慢波睡眠鞏固</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {schedule.sleepTime}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Top 3 Tailored Micro-Habits Card */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-transparent p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                個人專屬 3 大高槓桿原子微習慣 (Habit Stacking Matrix)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              無痛阻力 · 立即堆疊
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {microHabits.map((habit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    微習慣 #{idx + 1}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {habit.name}
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div>
                    <span className="text-amber-500 font-bold">觸發錨點：</span>
                    {habit.trigger}
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold">微動作：</span>
                    {habit.action}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ★ 生理回饋：{habit.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Kinetic Chain Physio Rx Card */}
        <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-slate-900/40 to-transparent p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                物理治療動力鏈弱點急救處方箋 (Kinetic Chain Rehabilitation)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
              EC-02 / EC-05 審定
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{physioRx.title}</span>
              <span className="text-slate-500 dark:text-slate-400 ml-2">
                （重點修復靶向：<span className="text-rose-400 font-mono">{physioRx.focusArea}</span>）
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {physioRx.moves.map((move, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{move.name}</span>
                    <span className="text-[10px] font-mono text-rose-500 font-bold">{move.sets}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    💡 實務要領：{move.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Cross-Pillar Synergy Link Card */}
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-slate-900/40 to-transparent p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                跨專區協同連結指引：{crossPillar.pillar}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
              {crossPillar.actionName}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {crossPillar.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

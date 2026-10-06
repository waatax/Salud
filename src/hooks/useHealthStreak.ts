import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const KEY = 'salud_daily_streak_v1';
const EVENT = 'salud:streak';

export interface DailyStreakState {
  streak: number;
  totalCheckIns: number;
  lastDate: string;
  history: string[];
}

const EMPTY_STREAK: DailyStreakState = {
  streak: 0,
  totalCheckIns: 0,
  lastDate: '',
  history: [],
};

const getLocalDateKey = (d = new Date()) => {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

const getYesterdayDateKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateKey(d);
};

export interface HealthMicroHabit {
  title: string;
  desc: string;
  targetHash: string;
  tag: string;
}

export const DAILY_HABITS: HealthMicroHabit[] = [
  {
    title: '早晨第一杯 300ml 溫水',
    desc: '喚醒消化道胃結腸反射，補充整夜睡眠經由呼吸與皮膚流失的水分。',
    targetHash: 'W/PAGE-W-01',
    tag: '水分平衡',
  },
  {
    title: '飯後 10 分鐘溫和散步',
    desc: '利用骨骼肌收縮攝取葡萄糖，實證可平抑 30% 餐後血糖波峰，減少胰島素震盪。',
    targetHash: 'learn/eat/L-EAT-01',
    tag: '血糖管理',
  },
  {
    title: '午後 2 點後切換為無咖啡因飲品',
    desc: '咖啡因半衰期長達 5–7 小時，提早截斷咖啡因可保護今晚深層慢波睡眠與腦淋巴排毒。',
    targetHash: 'sleep',
    tag: '深度睡眠',
  },
  {
    title: '工作每 50 分鐘做 2 次史丹佛生理嘆氣',
    desc: '吸氣到底後再追加一小口快吸，隨後緩慢長吐氣，立刻重設交感神經，啟動迷走神經煞車。',
    targetHash: 'mental',
    tag: '自律神經',
  },
  {
    title: '正餐執行 2:1:1「菜→肉→飯」進食順序',
    desc: '先以膳食纖維鋪底延緩排空，再吃蛋白質與複合澱粉，有效阻斷飯後昏睡。',
    targetHash: 'diet/patterns',
    tag: '營養餐盤',
  },
  {
    title: '累積 15 分鐘 Zone 2 微喘有氧運動',
    desc: '在能說出完整句子但不耐長篇大論的強度下運動，刺激心肌與骨骼肌粒線體生合成。',
    targetHash: 'exercise',
    tag: '粒線體有氧',
  },
  {
    title: '睡前 45 分鐘調暗燈光、遠離高藍光螢幕',
    desc: '減少視網膜視黑素細胞受光刺激，讓松果體自然分泌褪黑激素，縮短入睡潛伏期。',
    targetHash: 'sleep',
    tag: '晝夜節律',
  },
];

function loadStreak(): DailyStreakState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : EMPTY_STREAK;
  } catch {
    return EMPTY_STREAK;
  }
}

function saveStreak(data: DailyStreakState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore storage errors */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useHealthStreak() {
  const [streakData, setStreakData] = useState<DailyStreakState>(loadStreak);

  useEffect(() => {
    const sync = () => setStreakData(loadStreak());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const today = getLocalDateKey();
  const checkedInToday = streakData.lastDate === today;

  // Day index for rotating habit
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const todayHabit = DAILY_HABITS[dayOfYear % DAILY_HABITS.length];

  const checkIn = useCallback(() => {
    const current = loadStreak();
    const currentDate = getLocalDateKey();

    if (current.lastDate === currentDate) {
      return false; // Already checked in today
    }

    const yesterday = getYesterdayDateKey();
    let newStreak = 1;

    if (current.lastDate === yesterday) {
      newStreak = current.streak + 1;
    } else if (current.lastDate === currentDate) {
      newStreak = current.streak;
    }

    const updated: DailyStreakState = {
      streak: newStreak,
      totalCheckIns: current.totalCheckIns + 1,
      lastDate: currentDate,
      history: [...current.history, currentDate].slice(-60), // Keep last 60 days
    };

    saveStreak(updated);
    setStreakData(updated);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#10B981', '#06B6D4', '#F59E0B', '#6366F1'],
      });
    } catch {
      /* ignore */
    }

    return true;
  }, []);

  return {
    streak: streakData.streak,
    totalCheckIns: streakData.totalCheckIns,
    checkedInToday,
    todayHabit,
    checkIn,
  };
}

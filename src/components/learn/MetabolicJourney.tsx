import React, { useId, useState } from 'react';
import { ArrowRight, Check, ClipboardList, HeartPulse, Scale, ShieldCheck, Utensils } from 'lucide-react';
import { METABOLIC_PATHS, METABOLIC_REFERENCES, METABOLIC_WEEK_TASKS } from '../../data/metabolicJourney';
import { copyText } from '../../utils/copyText';

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600';

/** An editorial front door to the existing deep chapters; choices never persist health data. */
export const MetabolicJourney: React.FC = () => {
  const uid = useId();
  const [selected, setSelected] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const path = METABOLIC_PATHS[selected];
  const toggle = (index: number) => {
    setChecked(previous => previous.includes(index) ? previous.filter(n => n !== index) : [...previous, index]);
    setMessage('');
  };
  const exportPlan = async () => {
    const plan = ['我的體重與三高行動清單', `閱讀方向：${path.label}`, ...METABOLIC_WEEK_TASKS.map((task, index) => `${checked.includes(index) ? '☑' : '☐'} ${task}`), '此為衛教整理，個人治療與追蹤依醫師評估。'].join('\n');
    setMessage(await copyText(plan) ? '已複製，可貼到備忘錄或帶去回診。' : '無法自動複製，請選取下方清單文字。');
  };
  return (
    <section aria-labelledby={`${uid}-title`} className="metabolic-journey overflow-hidden rounded-3xl border border-emerald-200 bg-white text-slate-800 dark:border-emerald-900 dark:bg-salud-dark-surface dark:text-slate-200">
      <header className="border-b border-emerald-100 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300"><HeartPulse className="h-4 w-4" aria-hidden="true" /> 體重 × 血壓 × 血糖 × 血脂</p>
        <h2 id={`${uid}-title`} className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">把健康知識，接成自己的下一步</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">先選你現在的情境。用幾分鐘掌握重點，再進入圖解、工具與完整證據。</p>
        <ol className="mt-5 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4" aria-label="學習與實踐流程">
          {['看懂數字', '吃對與練好', '討論治療', '追蹤再調整'].map((label, index) => <li key={label} className="flex items-center gap-2 rounded-xl bg-white p-3 dark:bg-slate-900"><span className="font-bold tabular-nums text-emerald-700 dark:text-emerald-400">0{index + 1}</span>{label}</li>)}
        </ol>
      </header>
      <div className="p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4" aria-label="選擇目前情境">
          {METABOLIC_PATHS.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls={`${uid}-content`} onClick={() => setSelected(index)} className={`${focus} min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${selected === index ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-500 dark:bg-emerald-600' : 'border-slate-200 bg-white hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900'}`}>{item.label}</button>)}
        </div>
        <p role="status" className="sr-only">目前閱讀：{path.title}</p>
        <div id={`${uid}-content`} className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article>
            <p className="text-xs font-semibold tracking-wider text-emerald-800 dark:text-emerald-300">你的閱讀起點 · {selected + 1} / 4</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{path.title}</h3>
            <p className="mt-3 text-base leading-7">{path.summary}</p>
            <p className="mt-4 border-l-2 border-emerald-500 pl-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{path.concept}</p>
            <ol className="mt-5 space-y-4">
              {path.actions.map((action, index) => <li key={action} className="flex gap-3 text-sm leading-7"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">{index + 1}</span><span>{action}</span></li>)}
            </ol>
            <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-7 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100"><ShieldCheck className="mr-1 inline h-4 w-4" aria-hidden="true" /><strong>先注意：</strong>{path.caution}</p>
            <a href={`#${path.hash}`} className={`${focus} mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800`}>{path.next}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <details className="mt-4 text-sm">
              <summary className={`${focus} min-h-11 cursor-pointer py-3 font-semibold`}>查看這段的依據與適用限制</summary>
              <p className="mb-2 text-xs leading-6 text-slate-500 dark:text-slate-400">整理與查核：2026-11-05。一般成人衛教；個人目標、台灣適應症及藥品操作須由醫療團隊確認。</p>
              <ul className="space-y-2">{path.refs.map(key => <li key={key}><a className={`${focus} inline-block py-1 text-emerald-800 underline underline-offset-4 dark:text-emerald-300`} href={METABOLIC_REFERENCES[key].url} target="_blank" rel="noopener noreferrer">{METABOLIC_REFERENCES[key].title}（另開視窗）</a></li>)}</ul>
            </details>
          </article>
          <aside className="space-y-4" aria-label="飲食圖解與行動清單">
            <figure className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
              <figcaption className="flex items-center gap-2 font-bold"><Utensils className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /> 一餐的直覺起點</figcaption>
              <div className="mx-auto my-4 grid aspect-square w-full max-w-[230px] grid-cols-2 gap-1 overflow-hidden rounded-full border-4 border-white shadow-sm dark:border-slate-700" role="img" aria-label="示意餐盤：一半非澱粉蔬菜，四分之一蛋白質食物，四分之一全穀雜糧。不是固定熱量或處方。">
                <div className="row-span-2 flex items-center justify-center bg-emerald-100 pl-3 text-center text-sm font-bold leading-7 text-emerald-950">½<br />非澱粉<br />蔬菜</div>
                <div className="flex items-center justify-center bg-amber-100 pr-3 pt-4 text-center text-sm font-bold leading-6 text-amber-950">¼<br />豆魚蛋肉</div>
                <div className="flex items-center justify-center bg-sky-100 pb-4 pr-3 text-center text-sm font-bold leading-6 text-sky-950">¼<br />全穀雜糧</div>
              </div>
              <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">比例是便於理解的示意，總量依需求調整；另安排適量水果、乳品或替代品與油脂。腎病、孕期或營養不良者需個別規劃。</p>
              <a href={METABOLIC_REFERENCES.plate.url} target="_blank" rel="noopener noreferrer" className={`${focus} inline-block min-h-11 py-3 text-xs text-slate-600 underline dark:text-slate-400`}>依 CDC 餐盤法整理（另開視窗）</a>
              <a href="#diet/patterns" className={`${focus} mt-2 inline-block min-h-11 py-3 text-sm font-semibold text-emerald-800 underline underline-offset-4 dark:text-emerald-300`}>比較地中海與 DASH 飲食</a>
            </figure>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="flex items-center gap-2 font-bold"><ClipboardList className="h-4 w-4" aria-hidden="true" />這週先安排這些</h3>
              <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">勾選表示已安排，並非已達成健康目標。只保留在目前頁面。</p>
              <fieldset className="mt-2 space-y-1"><legend className="sr-only">本週行動清單</legend>{METABOLIC_WEEK_TASKS.map((task, index) => <label key={task} className="flex min-h-11 cursor-pointer items-start gap-2 py-2 text-sm leading-6"><input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} className="mt-1 h-4 w-4 shrink-0 accent-emerald-700" /><span>{task}</span></label>)}</fieldset>
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300"><Check className="h-4 w-4" aria-hidden="true" />已安排 {checked.length} / {METABOLIC_WEEK_TASKS.length} 項</p>
              <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={exportPlan} className={`${focus} min-h-11 rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-600`}>複製回診清單</button><button type="button" disabled={!checked.length} onClick={() => { setChecked([]); setMessage('已清除勾選。'); }} className={`${focus} min-h-11 rounded-lg px-3 text-sm underline disabled:opacity-40`}>清除</button></div>
              <p role="status" className="mt-2 text-xs leading-6">{message}</p>
            </div>
          </aside>
        </div>
        <footer className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-700"><a href="#checkup" className={`${focus} inline-flex min-h-11 items-center gap-2 font-semibold`}><ClipboardList className="h-4 w-4" aria-hidden="true" />健檢怎麼看</a><a href="#cardiometabolic/THREE_HIGHS" className={`${focus} inline-flex min-h-11 items-center gap-2 font-semibold`}><HeartPulse className="h-4 w-4" aria-hidden="true" />三高完整指南</a><a href="#obesity/TIRZEPATIDE_PROTOCOL" className={`${focus} inline-flex min-h-11 items-center gap-2 font-semibold`}><Scale className="h-4 w-4" aria-hidden="true" />猛健樂完整指南</a></footer>
      </div>
    </section>
  );
};

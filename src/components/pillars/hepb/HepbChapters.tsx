import React from 'react';
import {
  HEPB_KEY_NUMBERS,
  TRANSMISSION,
  VACCINE_GUIDE,
  HBV_MARKERS,
  HBV_PHASES,
  TREAT_WHEN,
  HBV_DRUGS,
  NHI_NOTES,
  MONITOR_PLAN,
  HCC_RISKS,
  HEPB_RED_FLAGS,
  LIFE_DO,
  FAMILY_STEPS,
} from '../../../data/hepbData';
import { URGENCY_META } from '../../../data/spineData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import { UrgencyBadge } from '../spine/SpineTools';
import { VirusFigure, LiverProgressionFigure, ChronicityChart, TaiwanImpactChart, MtctTimeline, PhasesFigure, SerologyDecoder } from './HepbFigures';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>;

export const HepbOverview: React.FC = () => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {HEPB_KEY_NUMBERS.map((n) => (
        <div key={n.label} className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3">
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-0.5">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
    <P>
      B 型肝炎是由 B 型肝炎病毒（HBV）感染肝細胞引起的疾病。成人感染後多數能自行清除病毒，但在<strong>嬰幼兒時期感染</strong>的人，大部分會變成「慢性帶原」——病毒長期住在肝臟，可能幾十年都沒有症狀，卻在背後慢慢造成發炎、纖維化，最後走到肝硬化或肝癌。
    </P>
    <FigureFrame number="圖 1-1" title="B 肝病毒的構造，以及每一項檢驗在驗哪一部分" source="標準病毒學（Dane 顆粒結構）">
      <VirusFigure />
    </FigureFrame>
    <FigureFrame number="圖 1-2" title="慢性 B 肝可能的進程" source="WHO 2024；EASL 2017" caption="不是每個帶原者都會走到最後一步。持續的高病毒量與肝發炎會加速這條路；抗病毒治療與定期追蹤，可以讓路途停下來或在早期發現問題。">
      <LiverProgressionFigure />
    </FigureFrame>
    <div className="grid gap-4 lg:grid-cols-2">
      <FigureFrame number="圖 1-3" title="台灣疫苗計畫的成果" source="Ni YH & Chen DS（台北市兒童血清調查）" note={false} caption="台灣 1984 年起為新生兒接種 B 肝疫苗，1986 年全面實施，是全球第一個全國性計畫；兒童肝癌也隨之明顯下降（Chang 1997, NEJM）。">
        <TaiwanImpactChart />
      </FigureFrame>
      <Callout kind="tip" title="誰最需要篩檢？">
        <p>
          <strong>民國 75 年（1986 年）以前出生</strong>的人在嬰兒期沒有疫苗保護，是「疫苗斷層世代」。國健署自 2025 年 8 月起，提供民國 75 年以前出生、79 歲以下民眾終身一次免費 B、C 肝篩檢（原住民 40 歲起），抽血免空腹，可在成人健檢時一起做。
        </p>
        <p>另外，家人是帶原者、曾接受輸血或洗腎、準備懷孕、準備化療或使用免疫抑制藥物的人，也都應該篩檢。</p>
      </Callout>
    </div>
  </div>
);

export const HepbSpread: React.FC = () => (
  <div className="space-y-6">
    <DataTable
      title="表 2-1　會傳染 vs 不會傳染"
      source="WHO 2024；US CDC"
      columns={[
        { key: 'route', header: '途徑', className: 'min-w-[110px]', render: (r) => <span>{r.yes ? '⚠️ ' : '✅ '}{r.route}</span> },
        { key: 'how', header: '情境', className: 'min-w-[180px]' },
        { key: 'risk', header: '說明', className: 'min-w-[180px]' },
      ]}
      rows={TRANSMISSION}
      rowKey={(r) => r.route}
      rowTone={(r) => (r.yes ? 'warn' : 'good')}
    />
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <FigureFrame number="圖 2-1" title="越小感染，越容易變成慢性帶原" source="US CDC" note={false} caption="這就是為什麼「阻斷母子傳染」與「新生兒疫苗」是 B 肝防治最重要的兩件事。">
        <ChronicityChart />
      </FigureFrame>
      <FigureFrame number="圖 2-2" title="帶原媽媽保護寶寶的 5 個步驟" source="衛福部疾管署；健保署（2018 年起孕婦高病毒量給付）" note={false}>
        <MtctTimeline />
      </FigureFrame>
    </div>
    <Callout kind="evidence" title="研究怎麼說：第三孕期服藥的效果">
      <p>台灣研究顯示，e 抗原陽性、高病毒量的帶原孕婦在第三孕期服用 tenofovir，搭配寶寶出生後的免疫球蛋白與疫苗，可把母子傳染率從約 10% 再降到約 1–2%。</p>
    </Callout>
    <DataTable
      title="表 2-2　B 肝疫苗：誰要打、怎麼打"
      columns={[
        { key: 'who', header: '對象', className: 'min-w-[150px]' },
        { key: 'what', header: '接種方式', className: 'min-w-[160px]' },
        { key: 'note', header: '補充說明', className: 'min-w-[200px]' },
      ]}
      rows={VACCINE_GUIDE}
      rowKey={(r) => r.who}
    />
  </div>
);

export const HepbTests: React.FC = () => (
  <div className="space-y-6">
    <SerologyDecoder />
    <DataTable
      title="表 3-1　B 肝相關檢驗一覽"
      source="WHO 2024；AASLD 2018"
      columns={[
        { key: 'marker', header: '檢驗', className: 'min-w-[110px]' },
        { key: 'zh', header: '中文名稱', className: 'min-w-[110px]' },
        { key: 'meaning', header: '代表什麼', className: 'min-w-[220px]' },
        { key: 'normal', header: '參考', className: 'min-w-[130px]' },
      ]}
      rows={HBV_MARKERS}
      rowKey={(r) => r.marker}
    />
    <Callout kind="note" title="帶原者第一次完整評估會做什麼？">
      <ul className="space-y-1">
        <li>• 抽血：e 抗原／e 抗體、HBV DNA（病毒量）、ALT、血小板、胎兒蛋白，並同時驗 C 肝抗體；國際指引也建議至少驗一次 D 型肝炎抗體。</li>
        <li>• 腹部超音波：看肝臟表面、質地與有沒有腫瘤。</li>
        <li>• 纖維化評估：FIB-4／APRI 抽血公式，或肝臟纖維掃描（彈性超音波）。</li>
      </ul>
    </Callout>
  </div>
);

export const HepbPhases: React.FC = () => (
  <div className="space-y-6">
    <P>醫師會用三個指標判斷你目前在哪個階段：<strong>e 抗原</strong>（病毒活不活躍）、<strong>HBV DNA</strong>（病毒有多少）、<strong>ALT</strong>（肝臟是否正在發炎）。階段不是固定的，可能隨年齡與免疫狀態轉換，所以追蹤的意義就是「抓住轉換的時間點」。</P>
    <FigureFrame number="圖 4-1" title="慢性 B 肝的五個階段" source="EASL 2017 臨床實務指引" note="長條為相對高低示意，不代表實際數值。">
      <PhasesFigure />
    </FigureFrame>
    <DataTable
      title="表 4-1　五個階段的特徵與處理"
      source="EASL 2017；AASLD 2018"
      columns={[
        { key: 'name', header: '階段', className: 'min-w-[140px]' },
        { key: 'eag', header: 'e 抗原' },
        { key: 'dna', header: '病毒量', className: 'min-w-[130px]' },
        { key: 'alt', header: 'ALT' },
        { key: 'liver', header: '肝臟狀態', className: 'min-w-[130px]' },
        { key: 'plan', header: '處理', className: 'min-w-[170px]' },
      ]}
      rows={HBV_PHASES}
      rowKey={(r) => r.name}
      rowTone={(r) => (r.plan.includes('需要抗病毒') ? 'warn' : undefined)}
    />
  </div>
);

export const HepbTreatment: React.FC = () => (
  <div className="space-y-6">
    <DataTable
      title="表 5-1　什麼時候建議開始治療？"
      source="WHO 2024；EASL 2017；AASLD 2018；健保署"
      columns={[
        { key: 'who', header: '情況', className: 'min-w-[130px]' },
        { key: 'rule', header: '建議', className: 'min-w-[220px]' },
        { key: 'src', header: '依據', className: 'min-w-[110px]' },
      ]}
      rows={TREAT_WHEN}
      rowKey={(r) => r.who}
      rowTone={(r) => r.tone}
    />
    <DataTable
      title="表 5-2　常用的 B 肝抗病毒藥"
      source="WHO 2024；AASLD 2018；各藥品仿單"
      columns={[
        { key: 'name', header: '藥名', className: 'min-w-[140px]' },
        { key: 'brand', header: '商品名', className: 'min-w-[120px]' },
        { key: 'how', header: '用法', className: 'min-w-[140px]' },
        { key: 'pros', header: '優點', className: 'min-w-[160px]' },
        { key: 'watch', header: '注意事項', className: 'min-w-[170px]' },
        { key: 'grade', header: '證據', render: (r) => <GradePill grade={r.grade} withLabel={false} /> },
      ]}
      rows={HBV_DRUGS}
      rowKey={(r) => r.name}
    />
    <Callout kind="redflag" title="千萬不要自行停藥">
      <p>停藥後病毒可能在數週到數月內快速反彈，引發嚴重肝炎發作，肝硬化患者甚至可能肝衰竭。是否停藥、何時停藥，必須由醫師依 e 抗原、病毒量與肝臟狀態評估，停藥後第一年需每 1–3 個月抽血。</p>
    </Callout>
    <Callout kind="note" title="健保給付重點（歷次放寬）">
      <ul className="space-y-1">
        {NHI_NOTES.map((n) => (
          <li key={n}>• {n}</li>
        ))}
      </ul>
    </Callout>
    <Callout kind="evidence" title="研究前線：功能性治癒（Bepirovirsen，第三期試驗）">
      <p>
        現有口服藥能壓制病毒，但很少讓表面抗原消失。反義寡核苷酸新藥 bepirovirsen 在 1,800 多位已服用口服藥的患者中進行第三期 B-Well 試驗（NEJM 2026），表面抗原 ≤3,000 IU/mL 者約 19%、≤1,000 IU/mL 者約 26% 在停藥後仍維持表面抗原消失與病毒測不到（安慰劑組 0%）。目前仍在各國審查中，台灣尚未上市。
      </p>
    </Callout>
  </div>
);

export const HepbMonitor: React.FC = () => (
  <div className="space-y-6">
    <DataTable
      title="表 6-1　不同狀況的追蹤頻率"
      source="AASLD 2018；EASL 2017"
      columns={[
        { key: 'who', header: '狀況', className: 'min-w-[150px]' },
        { key: 'freq', header: '頻率', className: 'min-w-[100px]' },
        { key: 'items', header: '項目', className: 'min-w-[220px]' },
      ]}
      rows={MONITOR_PLAN}
      rowKey={(r) => r.who}
    />
    <Callout kind="note" title="肝癌風險較高的人">
      <div className="flex flex-wrap gap-1.5">
        {HCC_RISKS.map((r) => (
          <span key={r} className="rounded-full border border-slate-300 dark:border-slate-600 px-2.5 py-0.5 text-[13px]">
            {r}
          </span>
        ))}
      </div>
      <p className="text-[13px]">有越多項，追蹤就越不能中斷。早期肝癌可以手術切除或電燒，治療效果遠優於晚期。</p>
    </Callout>
    <section className="space-y-3" aria-label="B 肝警訊">
      <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">出現這些情況，請就醫</h3>
      <div className="grid gap-3 lg:grid-cols-3">
        {HEPB_RED_FLAGS.map((t) => (
          <div key={t.level} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <UrgencyBadge level={t.level} />
              <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{URGENCY_META[t.level].label}</span>
            </div>
            <ul className="space-y-1 text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
              {t.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const HepbLife: React.FC = () => (
  <div className="space-y-6">
    <div className="grid gap-3 sm:grid-cols-2">
      {LIFE_DO.map((l, i) => (
        <article key={l.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 text-xs font-bold inline-flex items-center justify-center tabular-nums">
            {i + 1}
          </span>
          <div>
            <h4 className="font-bold text-[15px] text-slate-900 dark:text-white">{l.title}</h4>
            <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">{l.why}</p>
          </div>
        </article>
      ))}
    </div>
    <DataTable
      title="表 7-1　家人篩檢與懷孕準備"
      columns={[
        { key: 'who', header: '對象', className: 'min-w-[130px]' },
        { key: 'what', header: '建議', className: 'min-w-[240px]' },
      ]}
      rows={FAMILY_STEPS}
      rowKey={(r) => r.who}
    />
    <Callout kind="tip" title="飲食怎麼吃？">
      <p>B 肝沒有特別的「禁忌食物」，原則和一般健康飲食相同：以蔬菜、全穀、豆魚蛋肉均衡為主，避免酒精與含糖飲料、控制體重以防脂肪肝。避免生食貝類（可能感染 A 肝）。乙醯胺酚（普拿疼）在一般劑量下可以使用；有肝硬化或每天喝酒者，用藥前請先問醫師。</p>
    </Callout>
  </div>
);

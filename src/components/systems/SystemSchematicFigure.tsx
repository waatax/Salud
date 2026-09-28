import React, { useState } from 'react';
import { HumanSystem } from '../../types';
import { Sparkles, Info, X, ChevronRight, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

interface Props {
  system: HumanSystem;
  onSelectOrgan?: (organName: string) => void;
  selectedOrgan?: string;
}

interface LandmarkInfo {
  nameZh: string;
  nameEn: string;
  anatomyDetail: string;
  physiologyRole: string;
  clinicalSignificance: string;
  molecules?: string[];
  themeColor?: string;
}

export const SystemSchematicFigure: React.FC<Props> = ({
  system,
  onSelectOrgan,
  selectedOrgan: externalSelectedOrgan,
}) => {
  const [internalSelectedOrgan, setInternalSelectedOrgan] = useState<string | null>(null);
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  const activeOrganName = externalSelectedOrgan || internalSelectedOrgan;

  const handleSelect = (organName: string) => {
    if (activeOrganName === organName) {
      setInternalSelectedOrgan(null);
      if (onSelectOrgan) onSelectOrgan('');
    } else {
      setInternalSelectedOrgan(organName);
      if (onSelectOrgan) onSelectOrgan(organName);
    }
  };

  // Base human anatomical silhouette in standard anterior anatomical position (Netter reference)
  const renderAnatomicalSilhouette = () => (
    <g id="anatomical-base-silhouette" opacity="0.32" className="text-slate-400 dark:text-slate-600">
      {/* Cranium & Head */}
      <path
        d="M200 24 C178 24 168 40 168 62 C168 84 178 98 190 102 L190 114 L210 114 L210 102 C222 98 232 84 232 62 C232 40 222 24 200 24 Z"
        fill="currentColor"
      />
      {/* Torso, Arms & Lower Extremities in true anatomical position */}
      <path
        d="M190 114 C170 118 136 128 122 142 C114 150 106 178 102 225 L118 228 C122 188 128 162 136 154 L138 270 L108 274 L104 350 L118 352 L122 290 L138 290 L138 340 C138 358 144 372 154 382 L154 496 L174 496 L178 392 L194 392 L194 496 L206 496 L206 392 L222 392 L226 496 L246 496 L246 382 C256 372 262 358 262 340 L262 290 L278 290 L282 352 L296 350 L292 274 L262 270 L264 154 C272 162 278 188 282 228 L298 225 C294 178 286 150 278 142 C264 128 230 118 210 114 Z"
        fill="currentColor"
      />
      {/* Median Sagittal Axis (正中矢狀參考軸線) */}
      <line x1="200" y1="26" x2="200" y2="496" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
      {/* Clavicular Horizontal Line (鎖骨水平參考線) */}
      <line x1="130" y1="124" x2="270" y2="124" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
      {/* Transpyloric Plane (幽門平面 L1 參考線) */}
      <line x1="140" y1="240" x2="260" y2="240" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.35" />
      {/* Intertubercular Plane (結節間平面 L5 骨盆參考線) */}
      <line x1="145" y1="330" x2="255" y2="330" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.35" />
    </g>
  );

  // Common SVG Gradients & Filters
  const renderDefs = () => (
    <defs>
      {/* Digestive System Gradients */}
      <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="70%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="gallbladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="pancreasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>

      {/* Respiratory System Gradients */}
      <linearGradient id="lungRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.88" />
        <stop offset="70%" stopColor="#0284C7" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="lungLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.88" />
        <stop offset="70%" stopColor="#0284C7" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#075985" stopOpacity="0.95" />
      </linearGradient>

      {/* Nervous System Gradients */}
      <linearGradient id="cortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="60%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="cerebellumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>

      {/* Cardiovascular System Gradients */}
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="50%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id="venaCavaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>

      {/* Renal System Gradients */}
      <linearGradient id="kidneyRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="kidneyLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>

      {/* Endocrine System Gradients */}
      <linearGradient id="thyroidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="adrenalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>

      {/* Glow Filters */}
      <filter id="active-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. DIGESTIVE SYSTEM (消化與腸道菌群系統)
  // Anatomical standards: J-shaped stomach with fundus & pylorus; C-loop duodenum;
  // Liver with large right lobe, left lobe crossing midline, falciform ligament;
  // Emerald gallbladder under right lobe; Pancreas head nestled in duodenum;
  // Colon frame with cecum, appendix, haustra segments, and sigmoid curve.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderDigestiveSystem = () => {
    const isLiverSelected = activeOrganName?.includes('肝') || activeOrganName?.includes('膽');
    const isStomachSelected = activeOrganName?.includes('胃');
    const isSmallIntSelected = activeOrganName?.includes('小腸');
    const isColonSelected = activeOrganName?.includes('大腸') || activeOrganName?.includes('結腸');
    const isPancreasSelected = activeOrganName?.includes('胰');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="消化系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Esophagus (食道) descending through esophageal hiatus at T10 */}
        <g id="esophagus-group">
          <path d="M200 95 L200 185" stroke="#F59E0B" strokeWidth="6.5" strokeLinecap="round" opacity="0.8" />
          {/* Peristaltic wave markers */}
          <path d="M198 120 L202 120 M198 140 L202 140 M198 160 L202 160" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        </g>

        {/* 2. Liver (肝臟): Large anatomical wedge, right lobe (viewer's left) + left lobe spanning midline */}
        <g
          id="liver-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('肝臟與膽囊')}
          filter={isLiverSelected ? 'url(#active-glow)' : undefined}
          opacity={isLiverSelected ? 1 : 0.9}
        >
          {/* Right & Left Lobes of Liver */}
          <path
            d="M128 200 C120 180 148 168 185 168 C215 168 238 182 242 196 C245 208 235 220 215 222 C185 224 150 226 132 216 C124 212 124 204 128 200 Z"
            fill="url(#liverGrad)"
            stroke={isLiverSelected ? '#FDE68A' : '#78350F'}
            strokeWidth={isLiverSelected ? 2.5 : 1}
          />
          {/* Falciform Ligament (鐮狀韌帶分界線) */}
          <path d="M185 168 Q182 195 186 222" stroke="#FEF3C7" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.65" />

          {/* 3. Gallbladder (膽囊): Pear-shaped reservoir under inferior right lobe */}
          <path
            d="M164 220 C160 216 156 224 158 232 C160 238 168 240 170 234 C172 226 168 218 164 220 Z"
            fill="url(#gallbladderGrad)"
            stroke="#ECFDF5"
            strokeWidth="1.2"
          />
          {/* Cystic & Common Bile Duct (膽囊管與總膽管入十二指腸) */}
          <path d="M165 224 Q172 232 182 246" stroke="#059669" strokeWidth="2" fill="none" />
        </g>

        {/* 4. Stomach (胃): Authentic J-shape with Cardia, Fundus dome, Greater & Lesser curvatures, Pylorus */}
        <g
          id="stomach-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('胃')}
          filter={isStomachSelected ? 'url(#active-glow)' : undefined}
          opacity={isStomachSelected ? 1 : 0.92}
        >
          <path
            d="M198 185 C222 170 248 175 250 205 C252 230 238 252 210 256 C194 258 182 250 184 242 C186 236 200 232 208 226 C218 218 222 206 216 198 C210 190 200 188 198 185 Z"
            fill="url(#stomachGrad)"
            stroke={isStomachSelected ? '#FFFFFF' : '#9A3412'}
            strokeWidth={isStomachSelected ? 2.5 : 1.2}
          />
          {/* Gastric Rugae (胃黏膜皺襞紋理) */}
          <path d="M228 195 Q236 218 225 238 M216 198 Q222 218 212 235" stroke="#FED7AA" strokeWidth="1" fill="none" opacity="0.6" />
          {/* Pyloric Sphincter (幽門括約肌環) */}
          <circle cx="184" cy="242" r="3.5" fill="#DC2626" opacity="0.8" />
        </g>

        {/* 5. Pancreas (胰臟) & Duodenum (十二指腸 C 型環) */}
        <g
          id="pancreas-duodenum"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('胰臟')}
          filter={isPancreasSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Duodenal C-Loop (十二指腸 C 型環抱持胰頭) */}
          <path
            d="M184 242 C172 245 168 258 174 270 C180 280 196 282 208 276"
            stroke="#F59E0B"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Pancreatic Head, Body and Tail (胰頭、胰體、胰尾延伸至脾臟) */}
          <path
            d="M178 260 C182 254 196 252 215 250 C230 248 244 244 246 242 C247 245 232 254 212 258 C194 262 182 268 178 260 Z"
            fill="url(#pancreasGrad)"
            stroke={isPancreasSelected ? '#FFFFFF' : '#B45309'}
            strokeWidth={isPancreasSelected ? 2 : 1}
          />
          {/* Main Pancreatic Duct of Wirsung (主胰管) */}
          <path d="M182 260 L238 245" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.8" />
        </g>

        {/* 6. Small Intestine (小腸: 空腸與迴腸盤旋於腹中央) */}
        <g
          id="small-intestine-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('小腸')}
          filter={isSmallIntSelected ? 'url(#active-glow)' : undefined}
        >
          <path
            d="M180 280 Q215 276 220 288 Q172 296 226 306 Q170 316 222 326 Q174 336 210 342 Q180 348 160 342"
            fill="none"
            stroke="#F59E0B"
            strokeWidth={isSmallIntSelected ? 12 : 9.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isSmallIntSelected ? 1 : 0.9}
          />
          {/* Mesenteric plicae hints */}
          <path
            d="M185 284 Q210 282 215 292 Q178 300 220 310"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>

        {/* 7. Large Intestine / Colon (大腸與結腸完整解剖框框): Cecum, Appendix, Ascending, Transverse, Descending, Sigmoid, Rectum with Haustra */}
        <g
          id="colon-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('大腸與結腸')}
          filter={isColonSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Vermiform Appendix (闌尾) */}
          <path d="M148 358 Q144 368 140 372" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Colon Frame (結腸管壁，具備結腸袋分節特徵) */}
          <path
            d="M148 355 C142 345 142 325 144 300 C146 270 144 248 148 232 C152 222 170 230 195 234 C218 236 242 225 252 222 C258 226 256 255 255 285 C254 315 256 335 250 346 C242 358 224 358 214 366 C206 374 204 388 200 395"
            fill="none"
            stroke={isColonSelected ? '#EA580C' : '#B45309'}
            strokeWidth={isColonSelected ? 15 : 12.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isColonSelected ? 1 : 0.88}
          />

          {/* Taenia Coli (結腸帶中心縱肌帶) */}
          <path
            d="M146 345 L146 240 Q198 238 250 230 L253 340 Q228 356 202 392"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        </g>

        {/* Dynamic Pulse Hotspots with Netter Anatomical Precision */}
        <g className="cursor-pointer" onClick={() => handleSelect('肝臟與膽囊')}>
          <circle cx="162" cy="228" r="10" fill="#10B981" opacity="0.25" className="animate-ping" />
          <circle cx="162" cy="228" r="4.5" fill="#047857" />
          <text x="112" y="232" className="text-[9.5px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">膽囊與肝膽工廠</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('胃')}>
          <circle cx="232" cy="210" r="11" fill="#F59E0B" opacity="0.28" className="animate-ping" />
          <circle cx="232" cy="210" r="5" fill="#D97706" />
          <text x="248" y="214" className="text-[9.5px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">J型胃酸胃體</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('胰臟')}>
          <circle cx="198" cy="254" r="10" fill="#FBBF24" opacity="0.3" className="animate-ping" />
          <circle cx="198" cy="254" r="4.5" fill="#D97706" />
          <text x="214" y="258" className="text-[9px] font-mono fill-amber-800 dark:fill-amber-200 font-bold">十二指腸胰頭C環</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('大腸與結腸')}>
          <circle cx="146" cy="355" r="11" fill="#EA580C" opacity="0.25" className="animate-ping" />
          <circle cx="146" cy="355" r="4.5" fill="#B45309" />
          <text x="82" y="358" className="text-[9px] font-mono fill-orange-700 dark:fill-orange-300 font-bold">盲腸闌尾微生態</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('小腸')}>
          <circle cx="200" cy="315" r="12" fill="#F59E0B" opacity="0.3" className="animate-ping" />
          <circle cx="200" cy="315" r="5" fill="#F59E0B" />
          <text x="200" y="338" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">小腸 30m² 吸收網</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. RESPIRATORY SYSTEM (呼吸系統)
  // Anatomical standards: Larynx with thyroid cartilage; Trachea with C-rings;
  // Asymmetrical Carina: Right main bronchus shorter, wider, steeper ~25°;
  // Left main bronchus longer, narrower, shallower ~45°;
  // Right lung has 3 lobes (horizontal & oblique fissures);
  // Left lung has 2 lobes, oblique fissure, cardiac notch, and lingula;
  // Diaphragm dual domes, right dome higher than left.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderRespiratorySystem = () => {
    const isTracheaSelected = activeOrganName?.includes('氣管') || activeOrganName?.includes('支氣管');
    const isAlveoliSelected = activeOrganName?.includes('肺泡') || activeOrganName?.includes('肺');
    const isDiaphragmSelected = activeOrganName?.includes('橫膈');
    const isBrainstemSelected = activeOrganName?.includes('腦幹') || activeOrganName?.includes('化學受器');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="呼吸系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Larynx & Thyroid Cartilage (喉部、甲狀軟骨喉結與環狀軟骨) */}
        <g
          id="larynx-group"
          className="cursor-pointer"
          onClick={() => handleSelect('氣管與支氣管樹')}
          filter={isTracheaSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Thyroid cartilage (Adam's apple / 甲狀軟骨) */}
          <path d="M192 92 L200 97 L208 92 L206 108 L194 108 Z" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
          {/* Cricoid cartilage (環狀軟骨) */}
          <rect x="194" y="109" width="12" height="4" rx="1.5" fill="#0369A1" />
        </g>

        {/* 2. Trachea with patent C-shaped Cartilaginous Rings (氣管與軟骨環) */}
        <g id="trachea-group">
          <path d="M200 113 L200 170" stroke="#06B6D4" strokeWidth="8" strokeLinecap="round" />
          {/* 7 Distinct Cartilage C-Rings */}
          {[120, 128, 136, 144, 152, 160, 168].map((y, idx) => (
            <line key={idx} x1="195" y1={y} x2="205" y2={y} stroke="#E0F2FE" strokeWidth="1.8" opacity="0.85" />
          ))}
        </g>

        {/* 3. Carina & Primary Bronchi Bifurcation (氣管隆起與真實非對稱主支氣管) */}
        {/* Right bronchus: wider (8px), shorter (20px), steeper ~25° */}
        {/* Left bronchus: narrower (6px), longer (32px), shallower ~45° passing under aorta */}
        <g id="bronchi-bifurcation">
          <path d="M200 170 L180 192" stroke="#06B6D4" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M200 170 L228 196" stroke="#06B6D4" strokeWidth="5" strokeLinecap="round" />

          {/* Intrapulmonary Secondary Lobar Bronchi Arborization (支氣管樹分枝) */}
          {/* Right Lobar Bronchi: Superior, Middle, Inferior */}
          <path d="M180 192 L160 178 M180 192 L150 205 M180 192 L162 232" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M160 178 L148 172 M160 178 L152 186 M150 205 L138 214 M162 232 L150 252" stroke="#BAE6FD" strokeWidth="1.6" strokeLinecap="round" />

          {/* Left Lobar Bronchi: Superior (with lingular branch) and Inferior */}
          <path d="M228 196 L248 182 M228 196 L238 228 M228 196 L248 242" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M248 182 L260 176 M248 182 L258 190 M238 228 L232 248 M248 242 L260 258" stroke="#BAE6FD" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* 4. Right Lung (右肺: 3 葉，水平裂與斜裂) */}
        <g
          id="right-lung"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('肺泡與微毛細血管膜')}
          filter={isAlveoliSelected ? 'url(#active-glow)' : undefined}
          opacity={isAlveoliSelected ? 1 : 0.88}
        >
          {/* Right Lung Body */}
          <path
            d="M172 152 C158 152 142 168 132 195 C122 222 120 256 128 278 C134 286 160 286 178 280 C182 258 184 218 178 185 C176 168 180 152 172 152 Z"
            fill="url(#lungRightGrad)"
            stroke={isAlveoliSelected ? '#FFFFFF' : '#0284C7'}
            strokeWidth={isAlveoliSelected ? 2.5 : 1}
          />
          {/* Horizontal Fissure (水平裂: 分隔上葉與中葉) */}
          <path d="M126 215 C144 212 162 210 178 206" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
          {/* Oblique Fissure (斜裂: 分隔中葉與下葉) */}
          <path d="M168 175 Q150 235 138 282" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
          {/* Alveolar Cluster dots (3億肺泡囊微點陣) */}
          <circle cx="140" cy="188" r="2" fill="#FFFFFF" opacity="0.5" />
          <circle cx="152" cy="192" r="2.5" fill="#FFFFFF" opacity="0.5" />
          <circle cx="135" cy="240" r="2.2" fill="#FFFFFF" opacity="0.5" />
          <circle cx="148" cy="255" r="2" fill="#FFFFFF" opacity="0.5" />
        </g>

        {/* 5. Left Lung (左肺: 2 葉，具備明顯的心切跡 Cardiac Notch 與舌葉 Lingula) */}
        <g
          id="left-lung"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('肺泡與微毛細血管膜')}
          filter={isAlveoliSelected ? 'url(#active-glow)' : undefined}
          opacity={isAlveoliSelected ? 1 : 0.88}
        >
          {/* Left Lung Body with deep Cardiac Notch (心切跡) */}
          <path
            d="M228 152 C242 152 258 168 268 195 C278 222 280 256 272 284 C264 294 240 294 228 286 C234 278 238 268 236 256 C232 238 214 230 216 205 C218 185 220 168 228 152 Z"
            fill="url(#lungLeftGrad)"
            stroke={isAlveoliSelected ? '#FFFFFF' : '#0284C7'}
            strokeWidth={isAlveoliSelected ? 2.5 : 1}
          />
          {/* Oblique Fissure (左肺斜裂: 分隔上葉與下葉) */}
          <path d="M232 175 Q252 235 264 286" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
          {/* Lingula (舌葉標註弧線) */}
          <path d="M234 262 Q226 274 230 284" stroke="#BAE6FD" strokeWidth="1.2" fill="none" opacity="0.75" />
          {/* Alveolar Cluster dots */}
          <circle cx="260" cy="188" r="2" fill="#FFFFFF" opacity="0.5" />
          <circle cx="248" cy="192" r="2.5" fill="#FFFFFF" opacity="0.5" />
          <circle cx="258" cy="245" r="2" fill="#FFFFFF" opacity="0.5" />
          <circle cx="248" cy="265" r="2.2" fill="#FFFFFF" opacity="0.5" />
        </g>

        {/* 6. Cardiac Silhouette Shadow in Cardiac Notch (心臟在心切跡的相對解剖投影) */}
        <path
          d="M202 208 C192 200 185 212 188 225 C192 242 215 258 224 254 C234 248 232 225 220 215 C214 208 206 208 202 208 Z"
          fill="#EF4444"
          opacity="0.2"
        />

        {/* 7. Diaphragm (橫膈膜雙穹頂: 右高左低，中心腱 Central Tendon) */}
        <g
          id="diaphragm-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('橫膈膜與肋間肌')}
          filter={isDiaphragmSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Right dome reaches y=278 (higher due to liver); Left dome reaches y=288 */}
          <path
            d="M120 300 C130 274 165 274 195 284 C205 286 235 284 280 305"
            fill="none"
            stroke={isDiaphragmSelected ? '#38BDF8' : '#0284C7'}
            strokeWidth={isDiaphragmSelected ? 8 : 6}
            strokeLinecap="round"
          />
          {/* Central Tendon (中心腱) */}
          <ellipse cx="198" cy="284" rx="16" ry="3.5" fill="#F8FAFC" opacity="0.75" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('氣管與支氣管樹')}>
          <circle cx="200" cy="140" r="10" fill="#06B6D4" opacity="0.3" className="animate-ping" />
          <circle cx="200" cy="140" r="4.5" fill="#0891B2" />
          <text x="214" y="144" className="text-[9.5px] font-mono fill-cyan-700 dark:fill-cyan-300 font-bold">氣管纖毛電梯</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('肺泡與微毛細血管膜')}>
          <circle cx="146" cy="240" r="12" fill="#0284C7" opacity="0.32" className="animate-ping" />
          <circle cx="146" cy="240" r="5" fill="#0369A1" />
          <text x="75" y="244" className="text-[9px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">右肺三葉+3億肺泡</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('肺泡與微毛細血管膜')}>
          <circle cx="226" cy="235" r="11" fill="#0284C7" opacity="0.3" className="animate-ping" />
          <circle cx="226" cy="235" r="4.5" fill="#0369A1" />
          <text x="242" y="238" className="text-[9px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">左心切跡與舌葉</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('橫膈膜與肋間肌')}>
          <circle cx="198" cy="284" r="12" fill="#0284C7" opacity="0.3" className="animate-ping" />
          <circle cx="198" cy="284" r="5" fill="#0284C7" />
          <text x="198" y="318" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">雙穹頂橫膈腹式呼吸泵</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. NERVOUS SYSTEM (神經系統)
  // Anatomical standards: Cerebrum with 4 lobes (frontal, parietal, occipital, temporal)
  // and sulci/gyri; Cerebellum with horizontal folia; Brainstem (pons, medulla);
  // Spinal cord with cervical & lumbar enlargements, conus medullaris, cauda equina;
  // Brachial & Lumbosacral plexuses; Thick Sciatic nerve;
  // Actual physical Vagus nerve (迷走神經) trajectory descending through neck/thorax.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderNervousSystem = () => {
    const isCortexSelected = activeOrganName?.includes('大腦') || activeOrganName?.includes('海馬');
    const isGlymphaticSelected = activeOrganName?.includes('膠淋巴');
    const isHypothalamusSelected = activeOrganName?.includes('下視丘') || activeOrganName?.includes('腦下垂體');
    const isVagusSelected = activeOrganName?.includes('迷走');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="神經系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Cerebrum (大腦皮質四葉結構) */}
        <g
          id="cerebrum-group"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('大腦皮質與海馬迴')}
          filter={isCortexSelected ? 'url(#active-glow)' : undefined}
          opacity={isCortexSelected ? 1 : 0.92}
        >
          {/* Cerebrum Contour */}
          <path
            d="M172 45 C164 56 162 76 172 88 C182 98 218 98 228 88 C238 76 236 56 228 45 C218 34 182 34 172 45 Z"
            fill="url(#cortexGrad)"
            stroke={isCortexSelected ? '#FFFFFF' : '#5B21B6'}
            strokeWidth={isCortexSelected ? 2.5 : 1.2}
          />
          {/* Cerebral Sulci & Gyri (中央溝、側溝與腦回紋理) */}
          <path d="M185 52 Q196 46 210 52 M178 68 Q200 64 222 68 M182 82 Q200 86 218 80" stroke="#DDD6FE" strokeWidth="1.8" fill="none" opacity="0.8" />
          <path d="M198 46 L200 92" stroke="#EDE9FE" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        </g>

        {/* 2. Cerebellum (小腦: 葉片狀水平細紋結構，主管平衡與運動微調) */}
        <g id="cerebellum-group" className="cursor-pointer" onClick={() => handleSelect('大腦皮質與海馬迴')}>
          <path
            d="M214 84 C210 92 216 102 226 100 C234 98 236 88 230 84 C224 80 218 80 214 84 Z"
            fill="url(#cerebellumGrad)"
            stroke="#6D28D9"
            strokeWidth="1"
          />
          {/* Folia lines */}
          <path d="M216 88 Q225 86 232 90 M218 94 Q226 92 230 96" stroke="#F5F3FF" strokeWidth="0.8" opacity="0.8" />
        </g>

        {/* 3. Brainstem (腦幹: 中腦、具膨大腹側的腦橋 Pons、延腦 Medulla) */}
        <g id="brainstem-group">
          {/* Pons (腦橋前凸) */}
          <ellipse cx="198" cy="94" rx="4" ry="3" fill="#7C3AED" />
          {/* Medulla Oblongata (延腦) */}
          <path d="M200 97 L200 110" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* 4. Spinal Cord (脊髓主幹: 頸膨大、腰膨大、脊髓圓錐與馬尾) */}
        <g id="spinal-cord-group">
          {/* Cervical Enlargement (頸膨大 C4-T1) */}
          <path d="M200 110 L200 142" stroke="#8B5CF6" strokeWidth="7.5" strokeLinecap="round" />
          {/* Thoracic Spinal Cord (胸段脊髓) */}
          <path d="M200 142 L200 240" stroke="#8B5CF6" strokeWidth="5.5" strokeLinecap="round" />
          {/* Lumbar Enlargement (腰膨大 T11-L1) */}
          <path d="M200 240 L200 268" stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round" />
          {/* Conus Medullaris (脊髓圓錐 at L1-L2) */}
          <path d="M200 268 L200 282" stroke="#A78BFA" strokeWidth="4" strokeLinecap="round" />
          {/* Cauda Equina (馬尾神經纖維束) */}
          <path d="M200 282 Q194 315 190 345 M200 282 L200 350 M200 282 Q206 315 210 345" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        </g>

        {/* 5. Vagus Nerve Trajectory (迷走神經實體下行路徑: 貫穿頸部、心肺叢至腹腔腸腦軸) */}
        <g
          id="vagus-nerve-path"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('迷走神經與自主神經系')}
          filter={isVagusSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Bilateral Vagus descent */}
          <path
            d="M196 100 Q188 135 186 175 Q184 210 188 245 Q192 270 190 300"
            stroke="#A78BFA"
            strokeWidth={isVagusSelected ? 3 : 2}
            strokeDasharray="4 2.5"
            fill="none"
          />
          <path
            d="M204 100 Q212 135 214 175 Q216 210 212 245 Q208 270 210 300"
            stroke="#A78BFA"
            strokeWidth={isVagusSelected ? 3 : 2}
            strokeDasharray="4 2.5"
            fill="none"
          />
        </g>

        {/* 6. Peripheral Nerves & Plexuses (臂神經叢、肋間神經、腰薦神經叢與粗大坐骨神經) */}
        <g id="peripheral-nerves">
          {/* Brachial Plexus (臂神經叢放射至雙臂橈/正中/尺神經) */}
          <path d="M198 126 Q160 135 125 185 L112 270 M198 134 Q155 155 120 225" stroke="#8B5CF6" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M202 126 Q240 135 275 185 L288 270 M202 134 Q245 155 280 225" stroke="#8B5CF6" strokeWidth="2.4" fill="none" strokeLinecap="round" />

          {/* Intercostal Nerves (胸椎肋間神經) */}
          <path d="M198 165 Q165 175 142 205 M198 190 Q165 200 144 230 M198 215 Q165 225 146 250" stroke="#C4B5FD" strokeWidth="1.4" fill="none" opacity="0.75" />
          <path d="M202 165 Q235 175 258 205 M202 190 Q235 200 256 230 M202 215 Q235 225 254 250" stroke="#C4B5FD" strokeWidth="1.4" fill="none" opacity="0.75" />

          {/* Sciatic Nerve (人體最粗大之坐骨神經向下延伸至小腿腓/脛神經) */}
          <path d="M192 340 Q182 385 176 470 M176 440 L168 490" stroke="#7C3AED" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M208 340 Q218 385 224 470 M224 440 L232 490" stroke="#7C3AED" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('大腦皮質與海馬迴')}>
          <circle cx="200" cy="62" r="14" fill="#8B5CF6" opacity="0.32" className="animate-ping" />
          <circle cx="200" cy="62" r="6" fill="#6D28D9" />
          <text x="245" y="66" className="text-[10px] font-mono fill-purple-700 dark:fill-purple-300 font-bold">大腦與海馬迴</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('迷走神經與自主神經系')}>
          <circle cx="186" cy="210" r="11" fill="#A78BFA" opacity="0.32" className="animate-ping" />
          <circle cx="186" cy="210" r="5" fill="#7C3AED" />
          <text x="80" y="214" className="text-[9.5px] font-mono fill-purple-700 dark:fill-purple-300 font-bold">迷走神經副交感煞車</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('大腦皮質與海馬迴')}>
          <circle cx="200" cy="180" r="10" fill="#8B5CF6" opacity="0.3" className="animate-ping" />
          <circle cx="200" cy="180" r="4.5" fill="#8B5CF6" />
          <text x="214" y="184" className="text-[9px] font-mono fill-purple-700 dark:fill-purple-300 font-bold">脊髓中樞頸腰膨大</text>
        </g>

        <g className="cursor-pointer">
          <circle cx="178" cy="420" r="11" fill="#7C3AED" opacity="0.25" className="animate-ping" />
          <circle cx="178" cy="420" r="5" fill="#6D28D9" />
          <text x="75" y="424" className="text-[9.5px] font-mono fill-slate-700 dark:fill-slate-300 font-bold">坐骨神經反射幹</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CARDIOVASCULAR SYSTEM (心血管系統)
  // Anatomical standards: Conical heart tilted leftward (apex at 5th intercostal space);
  // 4 distinct chambers (RA, RV, LA, LV); Ascending aorta + aortic arch with 3 branches
  // (Brachiocephalic, Left Common Carotid, Left Subclavian);
  // Pulmonary trunk crossing in front of aorta to left/right pulmonary arteries;
  // SVC & IVC entering RA; 4 Pulmonary veins entering LA;
  // LAD coronary artery; Windkessel aorta; Calf soleus venous pump.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderCardiovascularSystem = () => {
    const isHeartSelected = activeOrganName?.includes('心臟') || activeOrganName?.includes('心肌');
    const isEndoSelected = activeOrganName?.includes('內皮');
    const isArterySelected = activeOrganName?.includes('主動脈') || activeOrganName?.includes('動脈');
    const isVeinSelected = activeOrganName?.includes('靜脈') || activeOrganName?.includes('肌肉泵');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="心血管系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Systemic Great Vessels: Descending Aorta & Inferior Vena Cava (IVC) */}
        <g id="abdominal-great-vessels">
          {/* Inferior Vena Cava (IVC, 下腔靜脈, 藍) running on right side of spine */}
          <path d="M191 190 L191 325" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          {/* Abdominal Aorta (腹主動脈, 紅) running slightly left of IVC */}
          <path d="M205 185 L205 320" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" />

          {/* L4 Bifurcation into Common Iliac Vessels (髂總動脈與髂總靜脈分叉至雙腿) */}
          <path d="M205 320 Q195 345 178 460" stroke="#DC2626" strokeWidth="4" fill="none" />
          <path d="M205 320 Q215 345 228 460" stroke="#DC2626" strokeWidth="4" fill="none" />
          <path d="M191 325 Q182 348 168 460" stroke="#2563EB" strokeWidth="4" fill="none" />
          <path d="M191 325 Q205 348 218 460" stroke="#2563EB" strokeWidth="4" fill="none" />
        </g>

        {/* 2. Superior Vena Cava (SVC, 上腔靜脈) entering Right Atrium */}
        <g id="superior-vena-cava">
          <path d="M188 140 L188 190" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          {/* Left & Right Brachiocephalic Veins (頭臂靜脈匯入 SVC) */}
          <path d="M188 140 L170 120 M188 140 L212 122" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* 3. Aortic Arch & Its 3 Classic Great Branches (主動脈弓及其三大分支: 頭臂幹、左總頸、左鎖骨下) */}
        <g
          id="aortic-arch"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('彈性主動脈與阻力小動脈')}
          filter={isArterySelected ? 'url(#active-glow)' : undefined}
        >
          {/* Main Aortic Arch Loop */}
          <path d="M202 185 C202 145 222 145 222 170 L205 210" stroke="url(#aortaGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* 3 Supra-aortic Branches (三大分支) */}
          {/* 1. Brachiocephalic trunk (頭臂動脈幹) */}
          <path d="M206 150 L195 125" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
          {/* 2. Left common carotid artery (左總頸動脈) */}
          <path d="M214 148 L212 120" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          {/* 3. Left subclavian artery (左鎖骨下動脈) */}
          <path d="M220 152 L235 125" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

          {/* Subclavian / Brachial Arteries radiating to arms */}
          <path d="M195 125 Q160 135 120 230" stroke="#DC2626" strokeWidth="2.6" fill="none" />
          <path d="M235 125 Q265 135 285 230" stroke="#DC2626" strokeWidth="2.6" fill="none" />
        </g>

        {/* 4. Pulmonary Trunk & Pulmonary Arteries (肺動脈幹: 自右室發出跨越主動脈，分送缺氧血至左右肺) */}
        <g id="pulmonary-trunk">
          {/* Pulmonary trunk in blue/purple */}
          <path d="M198 185 C198 168 208 165 212 165" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Right & Left Pulmonary Arteries branching under aortic arch */}
          <path d="M212 165 L170 172 M212 165 L245 174" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />
          {/* 4 Pulmonary Veins (肺靜脈紅血回流左心房) */}
          <circle cx="178" cy="188" r="2.8" fill="#EF4444" />
          <circle cx="178" cy="195" r="2.8" fill="#EF4444" />
          <circle cx="230" cy="188" r="2.8" fill="#EF4444" />
          <circle cx="230" cy="195" r="2.8" fill="#EF4444" />
        </g>

        {/* 5. Heart (心臟: 4 腔室與左偏軸心，左心室心尖位於左第五肋間隙) */}
        <g
          id="heart-organ"
          className="cursor-pointer transition-all hover:opacity-100"
          onClick={() => handleSelect('心臟肌肉與心包膜')}
          filter={isHeartSelected ? 'url(#active-glow)' : undefined}
          opacity={isHeartSelected ? 1 : 0.94}
        >
          {/* Right Atrium (右心房) */}
          <path d="M182 188 C172 195 172 210 184 218 L194 214 L192 188 Z" fill="#EF4444" opacity="0.85" />
          {/* Right Ventricle (右心室) */}
          <path d="M184 218 C192 235 204 242 214 240 L212 214 L184 218 Z" fill="#DC2626" />
          {/* Left Ventricle & Cardiac Apex (左心室心肌與心尖) */}
          <path
            d="M212 214 L214 240 C222 242 232 235 230 216 C228 200 220 192 212 190 Z"
            fill="url(#heartGrad)"
            stroke={isHeartSelected ? '#FFFFFF' : '#991B1B'}
            strokeWidth={isHeartSelected ? 2.5 : 1.2}
          />
          {/* Anterior Interventricular Sulcus with Left Anterior Descending Artery (LAD 前降支) */}
          <path d="M212 195 Q208 218 218 242" stroke="#FEF08A" strokeWidth="2" fill="none" />
          {/* Right Coronary Artery (RCA) */}
          <path d="M188 200 Q192 214 186 226" stroke="#FEF08A" strokeWidth="1.6" fill="none" />
        </g>

        {/* 6. Soleus Venous Pump in Calves (小腿比目魚肌第二心臟靜脈泵) */}
        <g
          id="calf-pump"
          className="cursor-pointer"
          onClick={() => handleSelect('靜脈瓣膜與肌肉泵')}
          filter={isVeinSelected ? 'url(#active-glow)' : undefined}
        >
          <ellipse cx="170" cy="425" rx="8" ry="24" fill="#2563EB" opacity="0.35" />
          {/* Venous valve indicators */}
          <path d="M167 418 L170 422 L173 418 M167 432 L170 436 L173 432" stroke="#60A5FA" strokeWidth="1.8" fill="none" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('心臟肌肉與心包膜')}>
          <circle cx="218" cy="225" r="15" fill="#EF4444" opacity="0.35" className="animate-ping" />
          <circle cx="218" cy="225" r="6.5" fill="#B91C1C" />
          <text x="248" y="228" className="text-[10px] font-mono fill-red-700 dark:fill-red-300 font-bold">左心室心尖+LAD冠脈</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('彈性主動脈與阻力小動脈')}>
          <circle cx="212" cy="146" r="11" fill="#DC2626" opacity="0.32" className="animate-ping" />
          <circle cx="212" cy="146" r="5" fill="#DC2626" />
          <text x="105" y="148" className="text-[9.5px] font-mono fill-red-700 dark:fill-red-300 font-bold">主動脈弓三大幹</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('靜脈瓣膜與肌肉泵')}>
          <circle cx="170" cy="425" r="12" fill="#2563EB" opacity="0.3" className="animate-ping" />
          <circle cx="170" cy="425" r="5" fill="#1D4ED8" />
          <text x="75" y="428" className="text-[9.5px] font-mono fill-blue-700 dark:fill-blue-300 font-bold">比目魚肌第二心臟靜脈泵</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. ENDOCRINE SYSTEM (內分泌系統)
  // Anatomical standards: Host organ outlines (brain, trachea, kidneys, pancreas);
  // Hypothalamus & Pituitary in sella turcica; Pineal gland;
  // Butterfly Thyroid gland + 4 posterior Parathyroid glands; Retrosternal Thymus;
  // Pyramidal/crescent Adrenal glands seated accurately atop kidneys;
  // Pancreatic islets; Skeletal muscle myokine network; Gonadal axis.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderEndocrineSystem = () => {
    const isPancreasSelected = activeOrganName?.includes('胰島');
    const isThyroidSelected = activeOrganName?.includes('甲狀腺');
    const isAdrenalSelected = activeOrganName?.includes('腎上腺');
    const isMuscleSelected = activeOrganName?.includes('骨骼肌');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="內分泌系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* Anatomical Context Host Organs (淡色載體背景) */}
        <g id="host-organs-context" opacity="0.25">
          {/* Cranial vault & Sella Turcica */}
          <path d="M185 68 Q200 60 215 68" stroke="#94A3B8" strokeWidth="2" fill="none" />
          {/* Trachea tube behind thyroid */}
          <rect x="195" y="110" width="10" height="40" fill="#94A3B8" />
          {/* Kidneys under adrenals */}
          <ellipse cx="160" cy="256" rx="14" ry="22" fill="#94A3B8" />
          <ellipse cx="240" cy="246" rx="14" ry="22" fill="#94A3B8" />
        </g>

        {/* 1. Hypothalamus & Pituitary Gland (下視丘與腦下垂體) */}
        <g id="pituitary-gland" className="cursor-pointer">
          <circle cx="200" cy="72" r="5" fill="#10B981" />
          {/* Infundibulum stalk (垂體柄) */}
          <line x1="200" y1="65" x2="200" y2="70" stroke="#34D399" strokeWidth="1.5" />
        </g>

        {/* 2. Pineal Gland (松果體: 晝夜節律褪黑激素核心) */}
        <g id="pineal-gland" className="cursor-pointer">
          <circle cx="206" cy="62" r="3.2" fill="#6EE7B7" />
        </g>

        {/* 3. Thyroid & 4 Parathyroid Glands (甲狀腺與 4 顆副甲狀腺) */}
        <g
          id="thyroid-organ"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('甲狀腺')}
          filter={isThyroidSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Butterfly-shaped Thyroid (甲狀腺雙葉與峽部) */}
          <path
            d="M185 125 C180 118 175 132 182 144 C190 140 200 138 210 140 C218 132 220 118 215 125 C206 130 194 130 185 125 Z"
            fill="url(#thyroidGrad)"
            stroke={isThyroidSelected ? '#FFFFFF' : '#047857'}
            strokeWidth={isThyroidSelected ? 2.5 : 1}
          />
          {/* 4 Parathyroid Glands (4 顆副甲狀腺: 調控血鈣磷平衡) */}
          <circle cx="182" cy="126" r="2" fill="#FBBF24" />
          <circle cx="184" cy="140" r="2" fill="#FBBF24" />
          <circle cx="216" cy="126" r="2" fill="#FBBF24" />
          <circle cx="214" cy="140" r="2" fill="#FBBF24" />
        </g>

        {/* 4. Thymus Gland (胸腺) */}
        <g id="thymus-endocrine">
          <path d="M195 160 C190 152 188 168 196 176 C204 176 212 168 205 152 Z" fill="#0D9488" opacity="0.8" />
        </g>

        {/* 5. Adrenal Glands (腎上腺: 坐落於雙腎上極，分泌皮質醇與腎上腺素) */}
        <g
          id="adrenals-organ"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('腎上腺皮質與髓質')}
          filter={isAdrenalSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Right Adrenal (右腎上腺金字塔形) */}
          <path d="M152 236 L162 224 L172 236 Z" fill="url(#adrenalGrad)" stroke="#78350F" strokeWidth="1" />
          {/* Left Adrenal (左腎上腺新月形) */}
          <path d="M230 228 C234 218 248 218 252 228 L241 230 Z" fill="url(#adrenalGrad)" stroke="#78350F" strokeWidth="1" />
        </g>

        {/* 6. Endocrine Pancreatic Islets of Langerhans (胰島組織 α/β 細胞) */}
        <g
          id="pancreatic-islets"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('胰島組織')}
          filter={isPancreasSelected ? 'url(#active-glow)' : undefined}
        >
          <path d="M182 258 Q210 252 235 258" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
          {/* Micro-islet clusters (胰島微團) */}
          <circle cx="192" cy="256" r="2" fill="#FFFFFF" />
          <circle cx="204" cy="254" r="2.2" fill="#FFFFFF" />
          <circle cx="218" cy="256" r="2" fill="#FFFFFF" />
        </g>

        {/* 7. Skeletal Muscle Myokine Endocrine Network (骨骼肌內分泌器官網) */}
        <g
          id="skeletal-muscle-myokine"
          className="cursor-pointer"
          onClick={() => handleSelect('骨骼肌作為內分泌器官')}
          filter={isMuscleSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Deltoid & Quadriceps Myokine indicators */}
          <path d="M132 152 Q122 175 116 210" stroke="#059669" strokeWidth="4" strokeDasharray="3 3" opacity="0.65" />
          <path d="M268 152 Q278 175 284 210" stroke="#059669" strokeWidth="4" strokeDasharray="3 3" opacity="0.65" />
          <path d="M165 370 Q160 410 168 450" stroke="#059669" strokeWidth="5" strokeDasharray="4 3" opacity="0.75" />
          <path d="M235 370 Q240 410 232 450" stroke="#059669" strokeWidth="5" strokeDasharray="4 3" opacity="0.75" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('甲狀腺')}>
          <circle cx="200" cy="132" r="12" fill="#059669" opacity="0.32" className="animate-ping" />
          <circle cx="200" cy="132" r="5" fill="#047857" />
          <text x="235" y="136" className="text-[10px] font-mono fill-emerald-700 dark:fill-emerald-300 font-bold">甲狀腺與副甲狀腺</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('腎上腺皮質與髓質')}>
          <circle cx="162" cy="230" r="11" fill="#F59E0B" opacity="0.32" className="animate-ping" />
          <circle cx="162" cy="230" r="5" fill="#D97706" />
          <text x="80" y="234" className="text-[10px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">腎上腺皮質醇軸</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('胰島組織')}>
          <circle cx="204" cy="256" r="13" fill="#10B981" opacity="0.35" className="animate-ping" />
          <circle cx="204" cy="256" r="5" fill="#059669" />
          <text x="240" y="260" className="text-[10px] font-mono fill-emerald-800 dark:fill-emerald-200 font-bold">胰島 β 胰島素庫</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. IMMUNE & LYMPHATIC SYSTEM (免疫與淋巴系統)
  // Anatomical standards: Primary lymphoid (Bone marrow in sternum/femur & Thymus);
  // Secondary lymphoid (Spleen in left hypochondrium, GALT in gut);
  // True lymphatic drainage topography: Cisterna Chyli at L2 collecting lower lymph;
  // Thoracic Duct ascending to drain into Left Subclavian Vein;
  // Right lymphatic duct draining into Right Subclavian Vein; Grouped lymph nodes.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderImmuneSystem = () => {
    const isMarrowSelected = activeOrganName?.includes('骨髓') || activeOrganName?.includes('胸腺');
    const isNodesSelected = activeOrganName?.includes('淋巴結') || activeOrganName?.includes('淋巴管');
    const isSpleenSelected = activeOrganName?.includes('脾臟');
    const isGaltSelected = activeOrganName?.includes('GALT') || activeOrganName?.includes('腸道');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="免疫與淋巴系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Bone Marrow (紅骨髓造血幹細胞與 B 細胞成熟地: 胸骨、骨盆髂骨翼與股骨近端) */}
        <g
          id="bone-marrow"
          className="cursor-pointer"
          onClick={() => handleSelect('骨髓與胸腺')}
          filter={isMarrowSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Sternal Marrow (胸骨紅骨髓) */}
          <rect x="197" y="145" width="6" height="32" rx="2" fill="#E11D48" opacity="0.75" />
          {/* Iliac Crest Marrow (髂骨骨髓採集核心區) */}
          <path d="M152 322 Q168 316 182 324" stroke="#E11D48" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M248 322 Q232 316 218 324" stroke="#E11D48" strokeWidth="4" fill="none" opacity="0.7" />
          {/* Femoral Heads (股骨頭紅骨髓) */}
          <circle cx="152" cy="342" r="5" fill="#E11D48" opacity="0.6" />
          <circle cx="248" cy="342" r="5" fill="#E11D48" opacity="0.6" />
        </g>

        {/* 2. Thymus (胸腺: 胸骨後 T 細胞選汰所) */}
        <g
          id="thymus-organ"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('骨髓與胸腺')}
          filter={isMarrowSelected ? 'url(#active-glow)' : undefined}
        >
          <path
            d="M194 152 C188 142 185 162 194 172 C204 172 214 162 206 142 Z"
            fill="#0D9488"
            stroke={isMarrowSelected ? '#FFFFFF' : '#115E59'}
            strokeWidth={isMarrowSelected ? 2 : 1}
          />
        </g>

        {/* 3. Spleen (脾臟: 左上腹第 9-11 肋深處，最大血液濾網與 B 細胞庫) */}
        <g
          id="spleen-organ"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('脾臟')}
          filter={isSpleenSelected ? 'url(#active-glow)' : undefined}
        >
          <path
            d="M236 212 C248 202 260 216 256 232 C248 244 236 234 236 212 Z"
            fill="#0F766E"
            stroke={isSpleenSelected ? '#5EEAD4' : '#042F2E'}
            strokeWidth={isSpleenSelected ? 2.5 : 1}
          />
          {/* Splenic artery & vein */}
          <path d="M228 224 L236 224" stroke="#EF4444" strokeWidth="1.5" />
          <path d="M228 228 L236 228" stroke="#3B82F6" strokeWidth="1.5" />
        </g>

        {/* 4. Cisterna Chyli & Thoracic Duct (乳糜池與人體最大主淋巴幹——胸導管真實引流拓撲) */}
        <g
          id="thoracic-duct-system"
          className="cursor-pointer"
          onClick={() => handleSelect('淋巴結與淋巴管網')}
          filter={isNodesSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Cisterna Chyli (乳糜池 at L2) */}
          <ellipse cx="198" cy="275" rx="4" ry="7" fill="#14B8A6" opacity="0.85" />
          {/* Lower Extremity Lymphatics draining into Cisterna Chyli */}
          <path d="M165 348 Q185 315 196 282" stroke="#2DD4BF" strokeWidth="1.8" strokeDasharray="3 2" fill="none" />
          <path d="M235 348 Q215 315 200 282" stroke="#2DD4BF" strokeWidth="1.8" strokeDasharray="3 2" fill="none" />

          {/* Thoracic Duct (胸導管) ascending along spine and arching into Left Subclavian Vein */}
          <path
            d="M198 268 L197 140 Q198 128 218 124"
            stroke="#14B8A6"
            strokeWidth={isNodesSelected ? 2.8 : 2}
            strokeDasharray="4 2"
            fill="none"
          />
          {/* Left Subclavian Vein Angle indicator */}
          <circle cx="218" cy="124" r="3.5" fill="#0284C7" />

          {/* Right Lymphatic Duct (右淋巴導管匯入右靜脈角) */}
          <path d="M186 135 L182 124" stroke="#14B8A6" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
          <circle cx="182" cy="124" r="3" fill="#0284C7" />
        </g>

        {/* 5. GALT (腸道相關淋巴組織 / Peyer Patches) */}
        <g
          id="galt-organ"
          className="cursor-pointer"
          onClick={() => handleSelect('腸道相關淋巴組織')}
          filter={isGaltSelected ? 'url(#active-glow)' : undefined}
        >
          {[
            [188, 295], [205, 290], [195, 305], [210, 308], [198, 318]
          ].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="3.2" fill="#2DD4BF" stroke="#0F766E" strokeWidth="0.8" />
          ))}
        </g>

        {/* 6. Anatomical Clustered Lymph Nodes (頸、腋、腹股溝淋巴結群) */}
        <g id="lymph-node-clusters">
          {/* Cervical nodes */}
          {[[185, 105], [186, 114], [214, 105], [213, 114]].map(([x, y], idx) => (
            <circle key={`c-${idx}`} cx={x} cy={y} r="2.8" fill="#14B8A6" />
          ))}
          {/* Axillary nodes */}
          {[[145, 155], [148, 164], [255, 155], [252, 164]].map(([x, y], idx) => (
            <circle key={`a-${idx}`} cx={x} cy={y} r="3" fill="#14B8A6" />
          ))}
          {/* Inguinal nodes */}
          {[[164, 345], [172, 352], [236, 345], [228, 352]].map(([x, y], idx) => (
            <circle key={`i-${idx}`} cx={x} cy={y} r="3.2" fill="#14B8A6" />
          ))}
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('骨髓與胸腺')}>
          <circle cx="198" cy="160" r="12" fill="#0D9488" opacity="0.32" className="animate-ping" />
          <circle cx="198" cy="160" r="5" fill="#0F766E" />
          <text x="214" y="164" className="text-[10px] font-mono fill-teal-700 dark:fill-teal-300 font-bold">胸腺T細胞學校</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('脾臟')}>
          <circle cx="245" cy="225" r="12" fill="#0F766E" opacity="0.32" className="animate-ping" />
          <circle cx="245" cy="225" r="5" fill="#042F2E" />
          <text x="260" y="228" className="text-[10px] font-mono fill-teal-700 dark:fill-teal-300 font-bold">脾臟血液濾網</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('淋巴結與淋巴管網')}>
          <circle cx="218" cy="124" r="10" fill="#14B8A6" opacity="0.3" className="animate-ping" />
          <circle cx="218" cy="124" r="4" fill="#0284C7" />
          <text x="110" y="127" className="text-[9px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">胸導管匯入左鎖骨下</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('腸道相關淋巴組織')}>
          <circle cx="200" cy="305" r="13" fill="#14B8A6" opacity="0.35" className="animate-ping" />
          <circle cx="200" cy="305" r="5" fill="#0D9488" />
          <text x="200" y="335" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">GALT 腸道 70% 免疫群</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. MUSCULOSKELETAL SYSTEM (肌肉骨骼系統)
  // Anatomical standards: Real skeleton with cranium, vertebral column curves,
  // sternum & ribs, clavicles, scapulae, pelvic girdle (ilium, pubis, ischium),
  // femur, patella, tibia, fibula;
  // Key functional muscles: Deltoid, Pectoralis Major, Rectus Abdominis with
  // tendinous intersections, Quadriceps with patellar ligament, Gastrocnemius & Achilles tendon.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderMusculoskeletalSystem = () => {
    const isBoneSelected = activeOrganName?.includes('骨骼') || activeOrganName?.includes('骨髓腔');
    const isMuscleSelected = activeOrganName?.includes('骨骼肌') || activeOrganName?.includes('肌纖維');
    const isCartilageSelected = activeOrganName?.includes('軟骨') || activeOrganName?.includes('滑液');
    const isTendonSelected = activeOrganName?.includes('肌腱') || activeOrganName?.includes('韌帶');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="肌肉骨骼系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Complete Skeletal System (骨骼支架: 脊柱、胸骨肋骨、骨盆與長骨) */}
        <g
          id="skeletal-framework"
          className="cursor-pointer transition-all"
          onClick={() => handleSelect('骨骼架構與骨髓腔')}
          filter={isBoneSelected ? 'url(#active-glow)' : undefined}
          opacity={isBoneSelected ? 1 : 0.85}
        >
          {/* Cranium Outline */}
          <circle cx="200" cy="55" r="22" stroke="#93C5FD" strokeWidth="2.5" fill="none" />

          {/* Cervical & Thoracic Spine with natural curvature */}
          <path d="M200 78 L200 120 M200 120 L200 240 M200 240 L200 300" stroke="#60A5FA" strokeWidth="5.5" strokeLinecap="round" />

          {/* Clavicles (鎖骨 S 型曲線) */}
          <path d="M198 122 Q165 118 135 128 M202 122 Q235 118 265 128" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Sternum (胸骨柄、胸骨體與劍突) */}
          <path d="M200 125 L200 178" stroke="#DBEAFE" strokeWidth="6" strokeLinecap="round" />
          <circle cx="200" cy="182" r="2" fill="#DBEAFE" />

          {/* 12 Pairs of Ribs forming Thoracic Cage (胸廓肋骨) */}
          {[138, 150, 162, 174, 186, 198].map((y, idx) => (
            <g key={`rib-${idx}`}>
              <path d={`M198 ${y} C165 ${y - 4} 145 ${y + 10} 140 ${y + 20}`} stroke="#93C5FD" strokeWidth="2.2" fill="none" />
              <path d={`M202 ${y} C235 ${y - 4} 255 ${y + 10} 260 ${y + 20}`} stroke="#93C5FD" strokeWidth="2.2" fill="none" />
            </g>
          ))}

          {/* Pelvis (骨盆: 髂骨翼、恥骨聯合、坐骨切跡) */}
          <path
            d="M160 295 C145 285 140 310 152 332 C162 342 195 342 200 338 C205 342 238 342 248 332 C260 310 255 285 240 295 C222 288 178 288 160 295 Z"
            fill="#BFDBFE"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.85"
          />

          {/* Femur Bones (股骨: 股骨頭、股骨頸、骨幹) */}
          <path d="M165 338 L160 435 M235 338 L240 435" stroke="#60A5FA" strokeWidth="6.5" strokeLinecap="round" />

          {/* Patella (髕骨) */}
          <circle cx="160" cy="438" r="4.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1" />
          <circle cx="240" cy="438" r="4.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1" />

          {/* Tibia & Fibula (脛骨與腓骨) */}
          <path d="M158 444 L158 495 M242 444 L242 495" stroke="#60A5FA" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M152 446 L152 492 M248 446 L248 492" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 2. Functional Muscle Groups (核心肌群解剖覆蓋) */}
        <g
          id="muscle-groups"
          className="cursor-pointer transition-all"
          onClick={() => handleSelect('骨骼肌纖維')}
          filter={isMuscleSelected ? 'url(#active-glow)' : undefined}
          opacity={isMuscleSelected ? 0.95 : 0.72}
        >
          {/* Deltoids (三角肌) */}
          <path d="M135 126 C124 135 116 160 125 180 C130 170 135 155 138 135 Z" fill="#2563EB" />
          <path d="M265 126 C276 135 284 160 275 180 C270 170 265 155 262 135 Z" fill="#2563EB" />

          {/* Pectoralis Major (胸大肌) */}
          <path d="M142 138 C160 142 195 142 196 165 C178 172 152 170 135 155 Z" fill="#1D4ED8" />
          <path d="M258 138 C240 142 205 142 204 165 C222 172 248 170 265 155 Z" fill="#1D4ED8" />

          {/* Rectus Abdominis with Tendinous Intersections (腹直肌與六塊腹肌腱劃) */}
          <rect x="188" y="185" width="10" height="85" rx="3" fill="#1D4ED8" />
          <rect x="202" y="185" width="10" height="85" rx="3" fill="#1D4ED8" />
          <line x1="188" y1="205" x2="212" y2="205" stroke="#93C5FD" strokeWidth="1" />
          <line x1="188" y1="225" x2="212" y2="225" stroke="#93C5FD" strokeWidth="1" />
          <line x1="188" y1="245" x2="212" y2="245" stroke="#93C5FD" strokeWidth="1" />

          {/* Quadriceps Femoris (股四頭肌) */}
          <path d="M152 345 C146 375 146 410 156 428 C166 428 174 395 170 345 Z" fill="#1D4ED8" />
          <path d="M248 345 C254 375 254 410 244 428 C234 428 226 395 230 345 Z" fill="#1D4ED8" />

          {/* 3. Tendons & Ligaments (肌腱韌帶: 髕骨韌帶與阿基里斯腱) */}
          <path d="M160 435 L160 448 M240 435 L240 448" stroke="#F8FAFC" strokeWidth="3.2" strokeLinecap="round" />
          {/* Achilles Tendon (阿基里斯腱) */}
          <path d="M156 480 L156 498 M244 480 L244 498" stroke="#F8FAFC" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('骨骼架構與骨髓腔')}>
          <circle cx="200" cy="220" r="12" fill="#3B82F6" opacity="0.32" className="animate-ping" />
          <circle cx="200" cy="220" r="5" fill="#1D4ED8" />
          <text x="215" y="224" className="text-[10px] font-mono fill-blue-700 dark:fill-blue-300 font-bold">脊椎壓電重塑(Wolff)</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('骨骼肌纖維')}>
          <circle cx="160" cy="385" r="13" fill="#1D4ED8" opacity="0.35" className="animate-ping" />
          <circle cx="160" cy="385" r="5" fill="#1D4ED8" />
          <text x="58" y="388" className="text-[9.5px] font-mono fill-blue-800 dark:fill-blue-200 font-bold">股四頭肌快肌儲槽</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('肌腱、韌帶與筋膜網')}>
          <circle cx="156" cy="488" r="10" fill="#60A5FA" opacity="0.3" className="animate-ping" />
          <circle cx="156" cy="488" r="4" fill="#F8FAFC" />
          <text x="58" y="492" className="text-[9px] font-mono fill-slate-700 dark:fill-slate-300 font-bold">阿基里斯腱張力整合格</text>
        </g>
      </svg>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. RENAL & URINARY SYSTEM (泌尿與腎臟系統)
  // Anatomical standards: Right kidney is placed LOWER (T12-L3) than left kidney (T11-L2)
  // due to liver mass; Renal hilum with cortex, medullary pyramids, calyces, pelvis;
  // Renal arteries directly from abdominal aorta, renal veins to IVC (left renal vein
  // crossing anterior to aorta); Adrenal glands on superior poles;
  // Ureters descending retroperitoneally into posterolateral bladder wall at an oblique angle;
  // Bladder with detrusor muscle, trigone, and urethra.
  // ─────────────────────────────────────────────────────────────────────────────
  const renderRenalSystem = () => {
    const isGlomSelected = activeOrganName?.includes('腎絲球');
    const isTubuleSelected = activeOrganName?.includes('腎小管') || activeOrganName?.includes('亨利');
    const isAqpSelected = activeOrganName?.includes('集尿管') || activeOrganName?.includes('Aquaporin');
    const isJgaSelected = activeOrganName?.includes('近腎絲球') || activeOrganName?.includes('RAAS');

    return (
      <svg viewBox="0 0 400 520" className="w-full h-full max-h-[480px] mx-auto select-none" aria-label="泌尿與腎臟系統醫學解剖圖">
        {renderDefs()}
        {renderAnatomicalSilhouette()}

        {/* 1. Abdominal Aorta & Inferior Vena Cava (IVC) with Renal Vessels (腎動脈與腎靜脈實體相連) */}
        <g id="renal-vasculature">
          {/* IVC (下腔靜脈, 藍) */}
          <path d="M192 170 L192 340" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          {/* Abdominal Aorta (腹主動脈, 紅) */}
          <path d="M208 170 L208 340" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" />

          {/* Right Renal Artery (右腎動脈: 自主動脈發出，經下腔靜脈後方穿入右腎門) */}
          <path d="M208 248 L170 248" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          {/* Left Renal Artery (左腎動脈: 自主動脈發出直接穿入較高之左腎門) */}
          <path d="M208 238 L232 238" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />

          {/* Right Renal Vein (右腎靜脈: 較短，直接注入 IVC) */}
          <path d="M170 252 L192 252" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
          {/* Left Renal Vein (左腎靜脈: 較長，橫跨腹主動脈前方注入 IVC，解剖胡桃鉗現象) */}
          <path d="M232 242 L192 242" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* 2. Adrenal Glands (腎上腺: 緊扣雙腎上極) */}
        <g id="adrenals-renal">
          {/* Right Adrenal atop lower right kidney */}
          <path d="M152 232 L162 222 L172 232 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          {/* Left Adrenal atop higher left kidney */}
          <path d="M228 222 L238 212 L248 222 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* 3. Right Kidney (右腎: 位置較低 T12-L3，因肝臟重量推擠；蠶豆形、腎門凹陷) */}
        <g
          id="right-kidney"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('腎絲球濾過膜')}
          filter={isGlomSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Right Kidney Silhouette */}
          <path
            d="M162 232 C142 228 132 248 136 268 C140 286 160 288 170 274 C175 264 172 250 166 244 C164 240 168 234 162 232 Z"
            fill="url(#kidneyRightGrad)"
            stroke={isGlomSelected ? '#FFFFFF' : '#0369A1'}
            strokeWidth={isGlomSelected ? 2.5 : 1.2}
          />
          {/* Internal Medullary Pyramids (腎髓質錐體層次) */}
          <path d="M145 245 L152 252 L145 258 Z M144 262 L152 266 L146 274 Z" fill="#0284C7" opacity="0.8" />
          {/* Renal Pelvis (腎盂漏斗口) */}
          <path d="M166 256 L168 270" stroke="#BAE6FD" strokeWidth="2.5" />
        </g>

        {/* 4. Left Kidney (左腎: 位置較高 T11-L2) */}
        <g
          id="left-kidney"
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleSelect('腎小管與亨利氏環')}
          filter={isTubuleSelected ? 'url(#active-glow)' : undefined}
        >
          {/* Left Kidney Silhouette */}
          <path
            d="M238 222 C258 218 268 238 264 258 C260 276 240 278 230 264 C225 254 228 240 234 234 C236 230 232 224 238 222 Z"
            fill="url(#kidneyLeftGrad)"
            stroke={isTubuleSelected ? '#FFFFFF' : '#0369A1'}
            strokeWidth={isTubuleSelected ? 2.5 : 1.2}
          />
          {/* Internal Medullary Pyramids */}
          <path d="M255 235 L248 242 L255 248 Z M256 252 L248 256 L254 264 Z" fill="#0284C7" opacity="0.8" />
          {/* Renal Pelvis */}
          <path d="M234 246 L232 260" stroke="#BAE6FD" strokeWidth="2.5" />
        </g>

        {/* 5. Ureters (輸尿管: 自腎盂發出，沿腰大肌後腹腔下行，以斜角角度穿入膀胱壁防逆流) */}
        <g id="ureters-group">
          {/* Right Ureter */}
          <path
            d="M168 270 Q178 335 192 374"
            stroke="#38BDF8"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Left Ureter */}
          <path
            d="M232 260 Q222 335 208 374"
            stroke="#38BDF8"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ureteral peristalsis drops */}
          <circle cx="178" cy="325" r="1.5" fill="#FFFFFF" />
          <circle cx="222" cy="320" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 6. Urinary Bladder (膀胱: 逼尿肌球囊、輸尿管開口與膀胱三角 Trigone) */}
        <g id="urinary-bladder" className="cursor-pointer" onClick={() => handleSelect('集尿管與 Aquaporin-2')}>
          {/* Bladder Wall */}
          <path
            d="M180 375 C180 360 220 360 220 375 C222 392 208 402 200 405 C192 402 178 392 180 375 Z"
            fill="#0284C7"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          {/* Bladder Trigone (膀胱三角標記) */}
          <path d="M192 376 L208 376 L200 392 Z" fill="#0369A1" stroke="#BAE6FD" strokeWidth="0.8" />
          {/* Urethra (尿道下行排出) */}
          <path d="M200 405 L200 422" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Pulse Hotspots */}
        <g className="cursor-pointer" onClick={() => handleSelect('腎絲球濾過膜')}>
          <circle cx="152" cy="255" r="13" fill="#0284C7" opacity="0.35" className="animate-ping" />
          <circle cx="152" cy="255" r="5.5" fill="#0369A1" />
          <text x="65" y="259" className="text-[9.5px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">右低位+100萬腎元</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('腎小管與亨利氏環')}>
          <circle cx="248" cy="245" r="13" fill="#0284C7" opacity="0.35" className="animate-ping" />
          <circle cx="248" cy="245" r="5.5" fill="#0369A1" />
          <text x="268" y="249" className="text-[9.5px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">左高位+RAAS血壓泵</text>
        </g>

        <g className="cursor-pointer" onClick={() => handleSelect('集尿管與 Aquaporin-2')}>
          <circle cx="200" cy="385" r="12" fill="#0369A1" opacity="0.32" className="animate-ping" />
          <circle cx="200" cy="385" r="5" fill="#0284C7" />
          <text x="200" y="426" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">膀胱蓄尿三角與斜角閥門</text>
        </g>
      </svg>
    );
  };

  // Render SVG based on system id
  const renderCurrentSystemSvg = () => {
    switch (system.id) {
      case 'digestive':
        return renderDigestiveSystem();
      case 'respiratory':
        return renderRespiratorySystem();
      case 'nervous':
        return renderNervousSystem();
      case 'cardiovascular':
        return renderCardiovascularSystem();
      case 'endocrine':
        return renderEndocrineSystem();
      case 'immune':
        return renderImmuneSystem();
      case 'musculoskeletal':
        return renderMusculoskeletalSystem();
      case 'renal':
      default:
        return renderRenalSystem();
    }
  };

  // Find currently active organ metadata for detail card
  const selectedOrganData = system.major_organs.find(
    (org) => activeOrganName && org.name_zh.includes(activeOrganName.split(' ')[0])
  ) || system.major_organs[0];

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-50/60 dark:from-slate-900/90 dark:via-salud-dark-card/80 dark:to-slate-950 p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center overflow-hidden shadow-inner">
      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: system.theme_color }} />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 font-bold">
            {system.name_en} · Anatomical Model
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
          Netter 醫學標準向量拓撲
        </span>
      </div>

      {/* Main SVG Anatomical Display */}
      <div className="w-full max-w-[360px] pt-3 pb-2 transition-transform duration-300">
        {renderCurrentSystemSvg()}
      </div>

      {/* Instruction Footnote */}
      <p className="text-[11px] font-mono text-slate-400 text-center pb-2">
        ※ 點擊圖中器官輪廓或動態脈衝熱點，即時解析解剖拓撲、生化機轉與臨床病理
      </p>

      {/* Interactive Anatomical & Clinical Inspector Card (解剖構造即時剖析卡) */}
      <div className="w-full mt-2 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-md space-y-2.5 transition-all">
        <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0"
              style={{ backgroundColor: system.theme_color }}
            />
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {selectedOrganData.name_zh}
              </h4>
              <span className="text-[10px] font-mono text-slate-400 block truncate">
                {selectedOrganData.name_en}
              </span>
            </div>
          </div>
          {activeOrganName && (
            <button
              onClick={() => handleSelect('')}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
              title="清除選取"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Physiological Function & Biochemical Mechanism */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>核心生理機轉 (Physiological Mechanism)</span>
          </span>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {selectedOrganData.role_zh}
          </p>
        </div>

        {/* Clinical Note & Pathology Warning */}
        <div className="rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 p-2.5 space-y-0.5">
          <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
            <Stethoscope className="w-3 h-3" />
            <span>臨床診斷與病理關聯 (Clinical Significance)</span>
          </span>
          <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
            {selectedOrganData.clinical_note_zh}
          </p>
        </div>
      </div>
    </div>
  );
};

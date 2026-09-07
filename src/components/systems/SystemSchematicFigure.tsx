import React, { useState } from 'react';
import { HumanSystem } from '../../types';

interface Props {
  system: HumanSystem;
  onSelectOrgan?: (organName: string) => void;
}

export const SystemSchematicFigure: React.FC<Props> = ({ system, onSelectOrgan }) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // System-specific anatomical vector schematics & pulse hotspots
  const renderSystemSvg = () => {
    switch (system.id) {
      case 'digestive':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="消化系統解剖圖">
            <defs>
              <linearGradient id="digGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Human body outline reference */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Esophagus */}
            <path d="M200 120 L200 190" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

            {/* Liver (Right lobe) */}
            <path
              d="M150 195 C175 185 205 190 210 205 C210 225 185 235 145 225 C135 220 135 205 150 195 Z"
              fill="#D97706"
              opacity="0.85"
              className="transition-all hover:opacity-100 cursor-pointer"
              onClick={() => onSelectOrgan && onSelectOrgan('肝臟與膽囊')}
            />

            {/* Stomach (Left) */}
            <path
              d="M195 200 C235 190 255 220 240 245 C220 260 190 250 185 230 C185 215 190 205 195 200 Z"
              fill="url(#digGrad)"
              filter="url(#glow-amber)"
              className="transition-all hover:scale-105 cursor-pointer"
              onClick={() => onSelectOrgan && onSelectOrgan('胃')}
            />

            {/* Pancreas (Behind stomach) */}
            <path d="M185 235 Q215 230 230 240" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 3" />

            {/* Small Intestine Complex */}
            <path
              d="M175 260 Q225 255 220 275 Q170 285 225 295 Q175 305 220 315 Q180 325 210 335"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer hover:stroke-amber-400"
              onClick={() => onSelectOrgan && onSelectOrgan('小腸')}
            />

            {/* Colon / Large Intestine Frame */}
            <path
              d="M155 330 L155 250 Q155 240 170 240 L230 240 Q245 240 245 250 L245 340 L225 365"
              fill="none"
              stroke="#B45309"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
              className="cursor-pointer hover:stroke-amber-600"
              onClick={() => onSelectOrgan && onSelectOrgan('大腸與結腸')}
            />

            {/* Pulse Hotspots */}
            <g className="cursor-pointer" onClick={() => setActiveNode(0)}>
              <circle cx="200" cy="120" r="10" fill="#F59E0B" opacity="0.2" className="animate-ping" />
              <circle cx="200" cy="120" r="5" fill="#F59E0B" />
              <text x="215" y="124" className="text-[10px] font-mono fill-slate-700 dark:fill-slate-200 font-bold">食道與賁門</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActiveNode(1)}>
              <circle cx="165" cy="205" r="12" fill="#D97706" opacity="0.25" className="animate-ping" />
              <circle cx="165" cy="205" r="6" fill="#D97706" />
              <text x="110" y="209" className="text-[10px] font-mono fill-amber-600 dark:fill-amber-400 font-bold">肝膽工廠</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActiveNode(2)}>
              <circle cx="225" cy="225" r="12" fill="#F59E0B" opacity="0.3" className="animate-ping" />
              <circle cx="225" cy="225" r="6" fill="#F59E0B" />
              <text x="245" y="228" className="text-[10px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">胃酸活化區</text>
            </g>

            <g className="cursor-pointer" onClick={() => setActiveNode(3)}>
              <circle cx="200" cy="295" r="14" fill="#F59E0B" opacity="0.25" className="animate-ping" />
              <circle cx="200" cy="295" r="6" fill="#F59E0B" />
              <text x="200" y="320" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">小腸 30m² 吸收網</text>
            </g>
          </svg>
        );

      case 'respiratory':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="呼吸系統解剖圖">
            <defs>
              <linearGradient id="respGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Trachea */}
            <path d="M200 110 L200 180" stroke="#06B6D4" strokeWidth="9" strokeLinecap="round" />
            <path d="M195 125 L205 125 M195 140 L205 140 M195 155 L205 155 M195 170 L205 170" stroke="white" strokeWidth="2" opacity="0.6" />

            {/* Bronchi bifurcation */}
            <path d="M200 180 Q180 195 160 210 M200 180 Q220 195 240 210" stroke="#06B6D4" strokeWidth="6" strokeLinecap="round" />

            {/* Right Lung (anatomical right, left on viewer) */}
            <path
              d="M130 190 C160 180 185 195 180 260 C175 300 130 310 115 280 C105 260 110 200 130 190 Z"
              fill="url(#respGrad)"
              className="transition-all hover:opacity-90 cursor-pointer"
              onClick={() => onSelectOrgan && onSelectOrgan('肺泡與微毛細血管膜')}
            />

            {/* Left Lung (has cardiac notch) */}
            <path
              d="M270 190 C240 180 215 195 220 245 C225 260 215 275 225 295 C240 310 270 300 285 280 C295 260 290 200 270 190 Z"
              fill="url(#respGrad)"
              className="transition-all hover:opacity-90 cursor-pointer"
              onClick={() => onSelectOrgan && onSelectOrgan('肺泡與微毛細血管膜')}
            />

            {/* Diaphragm muscle dome */}
            <path
              d="M105 320 Q200 285 295 320"
              fill="none"
              stroke="#0284C7"
              strokeWidth="7"
              strokeLinecap="round"
              className="cursor-pointer hover:stroke-cyan-400"
              onClick={() => onSelectOrgan && onSelectOrgan('橫膈膜與肋間肌')}
            />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="200" cy="140" r="10" fill="#06B6D4" opacity="0.3" className="animate-ping" />
              <circle cx="200" cy="140" r="5" fill="#06B6D4" />
              <text x="215" y="144" className="text-[10px] font-mono fill-cyan-700 dark:fill-cyan-300 font-bold">氣管纖毛梯</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="150" cy="245" r="14" fill="#06B6D4" opacity="0.3" className="animate-ping" />
              <circle cx="150" cy="245" r="6" fill="#06B6D4" />
              <text x="80" y="248" className="text-[10px] font-mono fill-cyan-700 dark:fill-cyan-300 font-bold">3億肺泡囊</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="200" cy="300" r="12" fill="#0284C7" opacity="0.3" className="animate-ping" />
              <circle cx="200" cy="300" r="6" fill="#0284C7" />
              <text x="200" y="340" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">橫膈腹式呼吸泵</text>
            </g>
          </svg>
        );

      case 'nervous':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="神經系統解剖圖">
            <defs>
              <linearGradient id="nerveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>

            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Brain (Cortex & Lobes) */}
            <path
              d="M175 60 C170 70 165 85 175 100 C185 110 215 110 225 100 C235 85 230 70 225 60 C215 50 185 50 175 60 Z"
              fill="url(#nerveGrad)"
              className="cursor-pointer hover:opacity-90 transition-all"
              onClick={() => onSelectOrgan && onSelectOrgan('大腦皮質與海馬迴')}
            />
            {/* Brain convolutions */}
            <path d="M185 75 Q200 70 215 75 M180 90 Q200 95 220 90" stroke="#C4B5FD" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Brain stem & Spinal cord */}
            <path d="M200 105 L200 320" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" />

            {/* Peripheral nerve roots branching out */}
            <path d="M200 150 Q160 160 120 220 M200 150 Q240 160 280 220" stroke="#A78BFA" strokeWidth="2.5" fill="none" />
            <path d="M200 180 Q150 190 130 250 M200 180 Q250 190 270 250" stroke="#A78BFA" strokeWidth="2.5" fill="none" />
            <path d="M200 230 Q160 240 170 300 M200 230 Q240 240 230 300" stroke="#A78BFA" strokeWidth="2" fill="none" />
            <path d="M200 310 Q180 360 170 450 M200 310 Q220 360 230 450" stroke="#8B5CF6" strokeWidth="3" fill="none" />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="200" cy="75" r="14" fill="#8B5CF6" opacity="0.3" className="animate-ping" />
              <circle cx="200" cy="75" r="6" fill="#8B5CF6" />
              <text x="245" y="80" className="text-[10px] font-mono fill-purple-700 dark:fill-purple-300 font-bold">大腦與海馬迴</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="200" cy="180" r="10" fill="#8B5CF6" opacity="0.3" className="animate-ping" />
              <circle cx="200" cy="180" r="5" fill="#8B5CF6" />
              <text x="215" y="184" className="text-[10px] font-mono fill-purple-700 dark:fill-purple-300 font-bold">脊髓中樞神經</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="170" cy="240" r="10" fill="#A78BFA" opacity="0.3" className="animate-ping" />
              <circle cx="170" cy="240" r="5" fill="#A78BFA" />
              <text x="75" y="244" className="text-[10px] font-mono fill-slate-700 dark:fill-slate-300 font-bold">迷走神經副交感</text>
            </g>
          </svg>
        );

      case 'cardiovascular':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="心血管系統解剖圖">
            <defs>
              <linearGradient id="cardioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
            </defs>

            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Aorta arch */}
            <path d="M200 180 C200 150 220 150 220 170 L220 320" stroke="#DC2626" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Vena Cava */}
            <path d="M185 150 L185 320" stroke="#2563EB" strokeWidth="8" fill="none" strokeLinecap="round" />

            {/* Heart Muscle Pump */}
            <path
              d="M185 185 C170 175 160 190 165 210 C175 235 205 255 215 250 C230 240 235 205 220 190 C210 180 195 180 185 185 Z"
              fill="url(#cardioGrad)"
              className="cursor-pointer hover:scale-105 transition-all shadow-md"
              onClick={() => onSelectOrgan && onSelectOrgan('心臟肌肉與心包膜')}
            />

            {/* Major Arteries branching to legs */}
            <path d="M220 320 Q200 350 180 460" stroke="#DC2626" strokeWidth="4" fill="none" />
            <path d="M185 320 Q200 350 220 460" stroke="#2563EB" strokeWidth="4" fill="none" />

            {/* Arms branching */}
            <path d="M210 160 Q240 170 280 240" stroke="#DC2626" strokeWidth="3" fill="none" />
            <path d="M190 160 Q160 170 120 240" stroke="#DC2626" strokeWidth="3" fill="none" />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="195" cy="210" r="16" fill="#EF4444" opacity="0.35" className="animate-ping" />
              <circle cx="195" cy="210" r="7" fill="#EF4444" />
              <text x="235" y="215" className="text-[10px] font-mono fill-red-700 dark:fill-red-300 font-bold">心肌泵與冠動脈</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="210" cy="155" r="10" fill="#DC2626" opacity="0.3" className="animate-ping" />
              <circle cx="210" cy="155" r="5" fill="#DC2626" />
              <text x="110" y="158" className="text-[10px] font-mono fill-red-700 dark:fill-red-300 font-bold">主動脈弓彈性</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="180" cy="400" r="10" fill="#2563EB" opacity="0.3" className="animate-ping" />
              <circle cx="180" cy="400" r="5" fill="#2563EB" />
              <text x="80" y="404" className="text-[10px] font-mono fill-blue-700 dark:fill-blue-300 font-bold">比目魚肌靜脈泵</text>
            </g>
          </svg>
        );

      case 'endocrine':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="內分泌系統解剖圖">
            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Pituitary gland */}
            <circle cx="200" cy="85" r="5" fill="#10B981" />

            {/* Thyroid (Butterfly shape) */}
            <path
              d="M185 130 C180 125 175 135 185 145 C195 140 205 140 215 145 C225 135 220 125 215 130 C205 135 195 135 185 130 Z"
              fill="#059669"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onSelectOrgan && onSelectOrgan('甲狀腺')}
            />

            {/* Adrenal glands (sitting atop kidneys) */}
            <path d="M165 240 L175 230 L185 240 Z" fill="#F59E0B" />
            <path d="M215 240 L225 230 L235 240 Z" fill="#F59E0B" />

            {/* Pancreas Islets */}
            <path
              d="M185 245 Q215 240 230 250"
              stroke="#10B981"
              strokeWidth="7"
              strokeLinecap="round"
              className="cursor-pointer hover:stroke-emerald-400"
              onClick={() => onSelectOrgan && onSelectOrgan('胰島組織')}
            />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="200" cy="85" r="10" fill="#10B981" opacity="0.3" className="animate-ping" />
              <text x="215" y="88" className="text-[10px] font-mono fill-emerald-700 dark:fill-emerald-300 font-bold">腦下垂體主控</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="200" cy="135" r="12" fill="#059669" opacity="0.3" className="animate-ping" />
              <text x="235" y="138" className="text-[10px] font-mono fill-emerald-700 dark:fill-emerald-300 font-bold">甲狀腺代謝閥</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="205" cy="245" r="14" fill="#10B981" opacity="0.35" className="animate-ping" />
              <text x="235" y="260" className="text-[10px] font-mono fill-emerald-800 dark:fill-emerald-200 font-bold">胰島 β 胰島素</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="175" cy="235" r="10" fill="#F59E0B" opacity="0.3" className="animate-ping" />
              <text x="90" y="238" className="text-[10px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">腎上腺皮質醇</text>
            </g>
          </svg>
        );

      case 'immune':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="免疫與淋巴系統解剖圖">
            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Thymus (Behind sternum) */}
            <path
              d="M195 160 C190 150 185 170 195 180 C205 180 215 170 205 150 Z"
              fill="#0D9488"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onSelectOrgan && onSelectOrgan('骨髓與胸腺')}
            />

            {/* Spleen */}
            <path
              d="M230 215 C245 205 255 220 250 235 C240 245 230 235 230 215 Z"
              fill="#0F766E"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onSelectOrgan && onSelectOrgan('脾臟')}
            />

            {/* Lymph nodes dots scattered */}
            {[
              [185, 125], [215, 125], [160, 165], [240, 165], [180, 270], [220, 270], [180, 340], [220, 340]
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="3.5" fill="#14B8A6" />
            ))}

            {/* Lymphatic drainage vessels */}
            <path d="M160 165 L185 125 L200 160 L215 125 L240 165" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <path d="M180 340 L195 280 L220 340" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="200" cy="165" r="12" fill="#0D9488" opacity="0.3" className="animate-ping" />
              <text x="215" y="168" className="text-[10px] font-mono fill-teal-700 dark:fill-teal-300 font-bold">胸腺 T細胞訓練所</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="240" cy="225" r="12" fill="#0F766E" opacity="0.3" className="animate-ping" />
              <text x="255" y="228" className="text-[10px] font-mono fill-teal-700 dark:fill-teal-300 font-bold">脾臟血液濾網</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="200" cy="285" r="14" fill="#14B8A6" opacity="0.35" className="animate-ping" />
              <text x="200" y="315" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">GALT 腸道 70% 免疫群</text>
            </g>
          </svg>
        );

      case 'musculoskeletal':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="肌肉骨骼系統解剖圖">
            <defs>
              <linearGradient id="mskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>

            {/* Bone skeleton lines */}
            <path d="M200 65 L200 110" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
            <path d="M140 145 L260 145" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
            <path d="M200 145 L200 320" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" />
            {/* Ribs */}
            <path d="M165 175 Q200 190 235 175 M160 195 Q200 210 240 195 M165 215 Q200 230 235 215" stroke="#93C5FD" strokeWidth="3" fill="none" />
            {/* Pelvis */}
            <path d="M170 310 C185 295 215 295 230 310 C240 330 220 340 200 335 C180 340 160 330 170 310 Z" fill="#93C5FD" opacity="0.8" />
            {/* Femurs */}
            <path d="M180 335 L170 420 M220 335 L230 420" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" />

            {/* Muscle bundles overlay (Translucent) */}
            <path
              d="M150 140 Q130 180 120 230 Q140 230 150 160 Z"
              fill="url(#mskGrad)"
              opacity="0.75"
              className="cursor-pointer hover:opacity-100"
            />
            <path
              d="M250 140 Q270 180 280 230 Q260 230 250 160 Z"
              fill="url(#mskGrad)"
              opacity="0.75"
              className="cursor-pointer hover:opacity-100"
            />
            {/* Quadriceps */}
            <path
              d="M165 340 C155 370 155 400 165 415 C175 415 185 390 180 340 Z"
              fill="url(#mskGrad)"
              opacity="0.85"
              className="cursor-pointer hover:opacity-100"
              onClick={() => onSelectOrgan && onSelectOrgan('骨骼肌纖維')}
            />
            <path
              d="M235 340 C245 370 245 400 235 415 C225 415 215 390 220 340 Z"
              fill="url(#mskGrad)"
              opacity="0.85"
              className="cursor-pointer hover:opacity-100"
              onClick={() => onSelectOrgan && onSelectOrgan('骨骼肌纖維')}
            />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="200" cy="220" r="12" fill="#3B82F6" opacity="0.3" className="animate-ping" />
              <text x="215" y="224" className="text-[10px] font-mono fill-blue-700 dark:fill-blue-300 font-bold">脊椎與沃爾夫重塑</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="170" cy="380" r="14" fill="#1D4ED8" opacity="0.35" className="animate-ping" />
              <text x="65" y="384" className="text-[10px] font-mono fill-blue-800 dark:fill-blue-200 font-bold">股四頭肌快肌庫存</text>
            </g>
          </svg>
        );

      case 'renal':
      default:
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[460px] mx-auto select-none" aria-label="泌尿與腎臟系統解剖圖">
            <defs>
              <linearGradient id="renalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>

            {/* Outline */}
            <path
              d="M200 40 C225 40 240 60 240 90 C240 115 225 130 200 130 C175 130 160 115 160 90 C160 60 175 40 200 40 Z
                 M160 110 Q110 140 100 240 L120 250 Q130 180 160 150 L160 380 Q160 450 140 480 L165 480 Q185 430 190 340
                 L210 340 Q215 430 235 480 L260 480 Q240 450 240 380 L240 150 Q270 180 280 250 L300 240 Q290 140 240 110 Z"
              fill="currentColor"
              className="text-slate-200/60 dark:text-slate-800/40"
            />

            {/* Aorta and Vena Cava between kidneys */}
            <path d="M193 180 L193 330" stroke="#DC2626" strokeWidth="6" fill="none" />
            <path d="M207 180 L207 330" stroke="#2563EB" strokeWidth="6" fill="none" />

            {/* Right Kidney (anatomical right, left on screen, slightly lower) */}
            <path
              d="M160 230 C145 220 135 240 140 260 C145 275 165 275 170 260 C175 245 170 235 160 230 Z"
              fill="url(#renalGrad)"
              className="cursor-pointer hover:scale-110 transition-transform shadow-lg"
              onClick={() => onSelectOrgan && onSelectOrgan('腎絲球濾過膜')}
            />

            {/* Left Kidney (slightly higher) */}
            <path
              d="M240 220 C255 210 265 230 260 250 C255 265 235 265 230 250 C225 235 230 225 240 220 Z"
              fill="url(#renalGrad)"
              className="cursor-pointer hover:scale-110 transition-transform shadow-lg"
              onClick={() => onSelectOrgan && onSelectOrgan('腎小管與亨利氏環')}
            />

            {/* Ureters running to bladder */}
            <path d="M165 265 Q180 320 195 355" stroke="#38BDF8" strokeWidth="3" fill="none" strokeDasharray="3 2" />
            <path d="M235 255 Q220 320 205 355" stroke="#38BDF8" strokeWidth="3" fill="none" strokeDasharray="3 2" />

            {/* Urinary Bladder */}
            <ellipse
              cx="200"
              cy="365"
              rx="22"
              ry="16"
              fill="#0284C7"
              opacity="0.85"
              className="cursor-pointer hover:opacity-100"
            />

            {/* Hotspots */}
            <g className="cursor-pointer">
              <circle cx="155" cy="250" r="14" fill="#0284C7" opacity="0.35" className="animate-ping" />
              <circle cx="155" cy="250" r="6" fill="#0284C7" />
              <text x="75" y="254" className="text-[10px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">100萬腎元濾過</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="245" cy="240" r="14" fill="#0284C7" opacity="0.35" className="animate-ping" />
              <circle cx="245" cy="240" r="6" fill="#0284C7" />
              <text x="265" y="244" className="text-[10px] font-mono fill-sky-700 dark:fill-sky-300 font-bold">RAAS血壓恆定</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="200" cy="365" r="12" fill="#0369A1" opacity="0.3" className="animate-ping" />
              <circle cx="200" cy="365" r="5" fill="#0369A1" />
              <text x="200" y="398" textAnchor="middle" className="text-[10px] font-mono fill-slate-800 dark:fill-slate-100 font-bold">膀胱蓄尿與排出</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-950 p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center overflow-hidden shadow-inner">
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: system.theme_color }} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          {system.name_en} · Anatomical Model
        </span>
      </div>

      <div className="w-full max-w-[340px] pt-4 pb-2">
        {renderSystemSvg()}
      </div>

      <p className="text-[11px] font-mono text-slate-400 text-center pt-2">
        ※ 點擊圖中動態脈衝熱點可連動查看各器官之生化機制與病理風險
      </p>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, ShieldAlert, BookOpen, Scale, Sparkles, Filter } from 'lucide-react';
import { KnowledgeAtom } from '../../types/knowledge';

interface KnowledgeGraphViewProps {
  atoms: KnowledgeAtom[];
  onSelectAtom: (atomId: string) => void;
}

interface GraphNode {
  id: string;
  label: string;
  type: 'domain' | 'atom' | 'predicate' | 'threshold' | 'policy';
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  color: string;
  radius: number;
  atomData?: KnowledgeAtom;
  details?: string;
}

interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

const DOMAINS: Record<string, { nameZh: string; color: string }> = {
  blood_pressure: { nameZh: '血壓心血管', color: '#10B981' },
  glucose: { nameZh: '血糖與代謝', color: '#3B82F6' },
  lipids: { nameZh: '血脂與動脈', color: '#8B5CF6' },
  hydration: { nameZh: '水分與電解質', color: '#06B6D4' },
  diet: { nameZh: '膳食與脂肪', color: '#F59E0B' },
  alcohol: { nameZh: '酒精與ALDH2', color: '#EF4444' },
  body_comp: { nameZh: '體位與肥胖', color: '#EC4899' },
  renal: { nameZh: '腎臟生理', color: '#14B8A6' },
  activity: { nameZh: '身體活動', color: '#84CC16' },
  sleep: { nameZh: '睡眠醫學', color: '#6366F1' },
  taiwan_policy: { nameZh: '台灣公共政策', color: '#F97316' },
  methodology: { nameZh: '實證方法學', color: '#64748B' },
};

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ atoms, onSelectAtom }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  // Compute Layout (Polar Cluster Around Center)
  const { nodes, edges } = useMemo(() => {
    const nodeList: GraphNode[] = [];
    const edgeList: GraphEdge[] = [];
    const centerX = 500;
    const centerY = 450;

    const filteredAtoms = selectedDomain === 'all'
      ? atoms
      : atoms.filter((a) => a.topic === selectedDomain);

    // 1. Group by domain
    const domainKeys = Array.from(new Set(filteredAtoms.map((a) => a.topic)));
    const domainAngleStep = (2 * Math.PI) / Math.max(1, domainKeys.length);

    domainKeys.forEach((domainKey, dIdx) => {
      const angle = dIdx * domainAngleStep;
      const domainRadius = selectedDomain === 'all' ? 220 : 0;
      const domainX = centerX + domainRadius * Math.cos(angle);
      const domainY = centerY + domainRadius * Math.sin(angle);
      const domainMeta = DOMAINS[domainKey] || { nameZh: domainKey, color: '#10B981' };

      // Domain Hub Node
      const domainNodeId = `DOM-${domainKey}`;
      nodeList.push({
        id: domainNodeId,
        label: domainMeta.nameZh,
        type: 'domain',
        x: domainX,
        y: domainY,
        color: domainMeta.color,
        radius: 22,
        details: `${domainMeta.nameZh} 知識中樞`,
      });

      // Child Atoms in orbit around domain hub
      const domainAtoms = filteredAtoms.filter((a) => a.topic === domainKey);
      const atomAngleStep = (2 * Math.PI) / Math.max(1, domainAtoms.length);
      const atomOrbitRadius = selectedDomain === 'all' ? 95 : 240;

      domainAtoms.forEach((atom, aIdx) => {
        const atomAngle = aIdx * atomAngleStep;
        const atomX = domainX + atomOrbitRadius * Math.cos(atomAngle);
        const atomY = domainY + atomOrbitRadius * Math.sin(atomAngle);

        const isNeedsReview = atom.status === 'needs-provenance-review';
        const color = isNeedsReview ? '#F59E0B' : domainMeta.color;

        nodeList.push({
          id: atom.id,
          label: atom.id,
          type: 'atom',
          x: atomX,
          y: atomY,
          color,
          radius: 13,
          atomData: atom,
          details: atom.statement_zh,
        });

        // Edge between domain and atom
        edgeList.push({
          source: domainNodeId,
          target: atom.id,
          relation: 'contains',
        });

        // Safety Predicates
        if (atom.safety_predicate_ids && atom.safety_predicate_ids.length > 0) {
          atom.safety_predicate_ids.forEach((pid, pIdx) => {
            const predNodeId = `PRED-${atom.id}-${pid}`;
            const predX = atomX + 45 * Math.cos(atomAngle + pIdx * 0.5);
            const predY = atomY + 45 * Math.sin(atomAngle + pIdx * 0.5);

            nodeList.push({
              id: predNodeId,
              label: '安全閘',
              type: 'predicate',
              x: predX,
              y: predY,
              color: '#EF4444',
              radius: 9,
              details: `安全攔截謂詞：${pid}`,
            });

            edgeList.push({
              source: atom.id,
              target: predNodeId,
              relation: 'guarded_by',
            });
          });
        }

        // Thresholds
        if (atom.threshold_ids && atom.threshold_ids.length > 0) {
          atom.threshold_ids.slice(0, 1).forEach((tid) => {
            const thNodeId = `TH-${atom.id}-${tid}`;
            const thX = atomX - 40 * Math.cos(atomAngle);
            const thY = atomY - 40 * Math.sin(atomAngle);

            nodeList.push({
              id: thNodeId,
              label: '切點',
              type: 'threshold',
              x: thX,
              y: thY,
              color: '#06B6D4',
              radius: 8,
              details: `臨床診斷切點：${tid}`,
            });

            edgeList.push({
              source: atom.id,
              target: thNodeId,
              relation: 'has_threshold',
            });
          });
        }
      });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [atoms, selectedDomain]);

  // Helper map for edge lookup
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <div className="bg-[#0e1613] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
      {/* Graph Toolbar */}
      <div className="p-4 border-b border-emerald-900/40 bg-[#090e0c]/90 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              全域醫學知識網絡圖譜
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {nodes.length} 節點 · {edges.length} 關聯
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              點擊知識原子（圓點）即可深入檢視三層臨床證據與安全警示
            </p>
          </div>
        </div>

        {/* Domain Filter & Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#14201a] border border-emerald-800/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-transparent border-none text-emerald-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0e1613] text-slate-200">全領域網絡 (All Domains)</option>
              {Object.entries(DOMAINS).map(([k, v]) => (
                <option key={k} value={k} className="bg-[#0e1613] text-slate-200">
                  {v.nameZh}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-[#14201a] border border-emerald-800/40 rounded-lg overflow-hidden">
            <button
              onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-emerald-900/30 transition-colors"
              title="放大"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-emerald-900/30 transition-colors"
              title="縮小"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-emerald-900/30 transition-colors"
              title="重設縮放"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="relative w-full h-[620px] bg-[#070b09] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 900"
          className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <defs>
            {/* Background Mesh Grid */}
            <pattern id="graphGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10251c" strokeWidth="0.5" />
            </pattern>
            {/* Radial Glows */}
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="900" fill="url(#graphGrid)" />

          {/* Edges */}
          <g className="edges opacity-40">
            {edges.map((edge, idx) => {
              const src = nodeMap.get(edge.source);
              const tgt = nodeMap.get(edge.target);
              if (!src || !tgt) return null;

              const isGuarded = edge.relation === 'guarded_by';
              const isThreshold = edge.relation === 'has_threshold';
              const strokeColor = isGuarded ? '#EF4444' : isThreshold ? '#06B6D4' : '#2D4F3E';
              const strokeDash = isGuarded ? '3,3' : 'none';

              return (
                <line
                  key={`edge-${idx}`}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={strokeColor}
                  strokeWidth={isGuarded ? 1.5 : 1}
                  strokeDasharray={strokeDash}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const isSelected = activeNode?.id === node.id;
              const isDomain = node.type === 'domain';
              const isAtom = node.type === 'atom';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => {
                    setActiveNode(node);
                    if (node.atomData) {
                      onSelectAtom(node.atomData.id);
                    }
                  }}
                  className="cursor-pointer transition-transform duration-200 hover:scale-125"
                >
                  {/* Glow circle for domain hubs */}
                  {isDomain && (
                    <circle r={node.radius + 12} fill="url(#hubGlow)" opacity="0.6" />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={node.radius}
                    fill={node.color}
                    fillOpacity={isDomain ? 0.9 : 0.85}
                    stroke={isSelected ? '#FFFFFF' : '#070b09'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="shadow-lg"
                  />

                  {/* Label */}
                  {isDomain ? (
                    <text
                      y={node.radius + 14}
                      textAnchor="middle"
                      fill="#E2E8F0"
                      fontSize="11"
                      fontWeight="bold"
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {node.label}
                    </text>
                  ) : isAtom ? (
                    <text
                      y={-node.radius - 4}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                      className="pointer-events-none select-none opacity-80"
                    >
                      {node.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Selected Node Drawer / Tooltip overlay */}
        {activeNode && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-[#121c17]/95 border border-emerald-500/40 backdrop-blur-md rounded-xl p-4 shadow-2xl z-20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {activeNode.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/50 text-slate-300">
                  {activeNode.type === 'domain'
                    ? '領域中樞'
                    : activeNode.type === 'predicate'
                    ? '安全防護謂詞'
                    : activeNode.type === 'threshold'
                    ? '臨床切點'
                    : '規範知識原子'}
                </span>
              </div>
              <button
                onClick={() => setActiveNode(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
              {activeNode.details}
            </p>

            {activeNode.atomData && (
              <div className="mt-3 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-mono">
                  確定度：{activeNode.atomData.derived_certainty.toUpperCase()}
                </span>
                <button
                  onClick={() => onSelectAtom(activeNode.atomData!.id)}
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition-colors shadow"
                >
                  檢視完整三層卡片 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Graph Legend */}
        <div className="absolute top-4 right-4 bg-[#0e1613]/90 border border-emerald-900/50 backdrop-blur rounded-lg p-3 text-xs space-y-1.5 hidden sm:block pointer-events-none">
          <div className="font-semibold text-slate-300 mb-1">圖譜圖例</div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 領域中樞 / 規範知識原子
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 安全攔截謂詞 (Safety Predicate)
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> 臨床診斷切點 (Threshold)
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 待原始文獻審查 (Needs Review)
          </div>
        </div>
      </div>
    </div>
  );
};

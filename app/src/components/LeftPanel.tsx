import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Database, Link2, LayoutGrid, Layers, GitBranch, Network, BookOpen } from 'lucide-react';
import { useOntologyStore } from '@/store/useOntologyStore';
import { concepts, constraints, DOMAIN_COLORS, getDomainCount, getLevelCount } from '@/data/ontology';

const DOMAINS = [
  '法律法规体系',
  '城市管理对象',
  '城市部件',
  '城市管理事件',
  '执法场景',
  '行政行为',
  '违法类型',
  '处罚类型',
  '裁量规则',
  '证据类型',
  '行政主体',
  '行政相对人',
  '执法程序',
  '空间区域',
  '事件状态',
  '协同处置',
];

export default function LeftPanel() {
  const filteredDomains = useOntologyStore((s) => s.filteredDomains);
  const toggleDomain = useOntologyStore((s) => s.toggleDomain);
  const selectAllDomains = useOntologyStore((s) => s.selectAllDomains);
  const clearAllDomains = useOntologyStore((s) => s.clearAllDomains);
  const activeView = useOntologyStore((s) => s.activeView);
  const setActiveView = useOntologyStore((s) => s.setActiveView);

  const levelDistribution = useMemo(() => {
    const total = concepts.length;
    return [1, 2, 3, 4].map((level) => ({
      level,
      label: `L${level}`,
      count: getLevelCount(level),
      percent: (getLevelCount(level) / total) * 100,
      color: level === 1 ? '#3B8DFF' : level === 2 ? '#34D399' : level === 3 ? '#F5A623' : '#A78BFA',
    }));
  }, []);

  const lawCount = useMemo(
    () => concepts.filter((c) => c.domain === '法律法规体系' && c.level === 3).length,
    []
  );

  const stats = useMemo(() => [
    { label: '概念总数', value: concepts.length, icon: Database, trend: null },
    { label: '语义约束', value: constraints.length, icon: Link2, trend: null },
    { label: '概念域', value: DOMAINS.length, icon: LayoutGrid, trend: null },
    { label: '层级深度', value: Math.max(...concepts.map((concept) => concept.level)), icon: Layers, trend: null },
  ], []);

  const containerVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const moduleVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2 + i * 0.08,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col overflow-y-auto shrink-0"
      style={{
        width: 260,
        backgroundColor: '#0B0F1A',
        borderRight: '1px solid #1E293B',
      }}
    >
      {/* Module 1: Statistics */}
      <motion.div variants={moduleVariants} custom={0} initial="hidden" animate="visible" className="p-4">
        <h3 className="text-[13px] font-semibold mb-1" style={{ color: '#E8ECF1' }}>本体统计</h3>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-md p-3"
              style={{ backgroundColor: '#1B2333' }}
            >
              <stat.icon size={16} style={{ color: '#4B5563' }} />
              <div className="text-[22px] font-bold font-mono mt-1" style={{ color: '#E8ECF1' }}>
                {stat.value}
              </div>
              <div className="text-[11px]" style={{ color: '#94A3B8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ backgroundColor: '#1E293B' }} />

      {/* Module 2: View Switch */}
      <motion.div variants={moduleVariants} custom={1} initial="hidden" animate="visible" className="px-4 py-3">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
          视图模式
        </h4>
        <div className="flex flex-col gap-1">
          {[
            { key: 'tree' as const, label: '概念层级树', icon: GitBranch },
            { key: 'graph' as const, label: '语义关系图', icon: Network },
          ].map((view) => {
            const isActive = activeView === view.key;
            return (
              <button
                key={view.key}
                onClick={() => setActiveView(view.key)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-[13px] transition-colors duration-150"
                style={{
                  color: isActive ? '#F5A623' : '#94A3B8',
                  backgroundColor: isActive ? 'rgba(245, 166, 35, 0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid #F5A623' : '2px solid transparent',
                }}
              >
                <view.icon size={15} />
                {view.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ backgroundColor: '#1E293B' }} />

      {/* Module 3: Domain Filter */}
      <motion.div variants={moduleVariants} custom={2} initial="hidden" animate="visible" className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>
            概念域
          </h4>
          <div className="flex gap-2">
            <button onClick={selectAllDomains} className="text-[10px] hover:underline" style={{ color: '#3B8DFF' }}>
              全选
            </button>
            <button onClick={clearAllDomains} className="text-[10px] hover:underline" style={{ color: '#3B8DFF' }}>
              清除
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {DOMAINS.map((domain) => {
            const checked = filteredDomains.includes(domain);
            const count = getDomainCount(domain);
            const color = DOMAIN_COLORS[domain]?.text || '#94A3B8';
            return (
              <label
                key={domain}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer transition-colors duration-100"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
              >
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: checked ? '#F5A623' : 'transparent',
                    border: checked ? 'none' : '1px solid #2A3548',
                  }}
                  onClick={() => toggleDomain(domain)}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#0B0F1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[12px] flex-1" style={{ color: '#94A3B8' }}>{domain}</span>
                <span className="text-[11px] font-mono" style={{ color: '#4B5563' }}>{count}</span>
              </label>
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ backgroundColor: '#1E293B' }} />

      {/* Module 4: Level Distribution */}
      <motion.div variants={moduleVariants} custom={3} initial="hidden" animate="visible" className="px-4 py-3">
        <h4 className="text-[11px] font-semibold mb-3" style={{ color: '#94A3B8' }}>层级分布</h4>
        <div className="flex flex-col gap-2">
          {levelDistribution.map((item) => (
            <div key={item.level} className="flex items-center gap-2">
              <span className="text-[12px] w-16 shrink-0" style={{ color: '#94A3B8' }}>
                {item.label}
              </span>
              <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{ backgroundColor: '#1B2333' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + item.level * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="h-full rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <span className="text-[11px] font-mono w-6 text-right shrink-0" style={{ color: '#4B5563' }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-4 h-px" style={{ backgroundColor: '#1E293B' }} />

      {/* Module 5: Law Sources */}
      <motion.div variants={moduleVariants} custom={4} initial="hidden" animate="visible" className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-semibold" style={{ color: '#94A3B8' }}>法律法规来源</h4>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: '#1B2333', color: '#94A3B8' }}
          >
            {lawCount}部
          </span>
        </div>
        <div className="flex flex-col max-h-[200px] overflow-y-auto">
          {concepts
            .filter((c) => c.domain === '法律法规体系' && c.level === 3)
            .slice(0, 6)
            .map((law) => (
              <div key={law.id} className="flex items-center gap-1.5 py-1.5">
                <BookOpen size={12} style={{ color: '#4B5563', flexShrink: 0 }} />
                <span className="text-[12px] truncate" style={{ color: '#94A3B8' }}>
                  《{law.name.replace(/[《》]/g, '')}》
                </span>
              </div>
            ))}
          <button
            className="text-[10px] text-left mt-1 hover:underline"
            style={{ color: '#3B8DFF' }}
            onClick={() => setActiveView('laws')}
          >
            展开全部 ({lawCount})
          </button>
        </div>
      </motion.div>
    </motion.aside>
  );
}

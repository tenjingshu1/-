import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { laws, LEVEL_COLORS } from '@/data/ontology';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  '法律': { bg: 'rgba(59, 141, 255, 0.15)', text: '#3B8DFF' },
  '行政法规': { bg: 'rgba(52, 211, 153, 0.15)', text: '#34D399' },
  '部门规章': { bg: 'rgba(245, 166, 35, 0.15)', text: '#F5A623' },
  '技术标准': { bg: 'rgba(167, 139, 250, 0.15)', text: '#A78BFA' },
};

function LawCard({ law, index }: { law: typeof laws[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const categoryColor = CATEGORY_COLORS[law.category] || { bg: '#1B2333', text: '#94A3B8' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="rounded-md overflow-hidden"
      style={{
        backgroundColor: '#1B2333',
        border: '1px solid #2A3548',
      }}
    >
      {/* Card Header */}
      <div
        className="p-3.5 cursor-pointer transition-colors duration-100"
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className="inline-flex items-center justify-center rounded-full font-mono text-[9px] font-medium shrink-0"
              style={{
                width: 22,
                height: 14,
                backgroundColor: LEVEL_COLORS[law.level]?.bg,
                color: LEVEL_COLORS[law.level]?.text,
                border: `1px solid ${LEVEL_COLORS[law.level]?.border}`,
              }}
            >
              L{law.level}
            </span>
            <h3 className="text-[14px] font-semibold truncate" style={{ color: '#E8ECF1' }}>
              {law.shortName}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: categoryColor.bg,
                color: categoryColor.text,
              }}
            >
              {law.category}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: '#1B2333', color: '#34D399', border: '1px solid rgba(52, 211, 153, 0.3)' }}
            >
              {law.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[12px] font-mono" style={{ color: '#4B5563' }}>{law.code}</span>
          <span style={{ color: '#1E293B' }}>|</span>
          <span className="text-[12px]" style={{ color: '#94A3B8' }}>施行: {law.effectiveDate}</span>
        </div>

        <p className="text-[12px] mt-1.5 line-clamp-2" style={{ color: '#94A3B8' }}>
          {law.scope}
        </p>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div
              className="px-3.5 pb-3.5 pt-0"
              style={{ borderTop: '1px solid #1E293B' }}
            >
              <div className="pt-3 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-[11px] w-[80px] shrink-0 text-right" style={{ color: '#94A3B8' }}>全称</span>
                  <span className="text-[13px]" style={{ color: '#E8ECF1' }}>{law.name}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[11px] w-[80px] shrink-0 text-right" style={{ color: '#94A3B8' }}>适用范围</span>
                  <span className="text-[13px]" style={{ color: '#E8ECF1' }}>{law.scope}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[11px] w-[80px] shrink-0 text-right" style={{ color: '#94A3B8' }}>相关概念</span>
                  <div className="flex flex-wrap gap-1">
                    {law.conceptIds.slice(0, 6).map((cid) => (
                      <span
                        key={cid}
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: '#162033', color: '#3B8DFF' }}
                      >
                        {cid}
                      </span>
                    ))}
                    {law.conceptIds.length > 6 && (
                      <span className="text-[10px]" style={{ color: '#4B5563' }}>+{law.conceptIds.length - 6}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LawLibrary() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(laws.map((l) => l.category));
    return Array.from(cats);
  }, []);

  const filteredLaws = useMemo(() => {
    if (!categoryFilter) return laws;
    return laws.filter((l) => l.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex flex-col h-full overflow-y-auto p-5"
    >
      {/* Header + Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={18} style={{ color: '#F5A623' }} />
          <h2 className="text-[16px] font-bold" style={{ color: '#E8ECF1' }}>法律法规库</h2>
          <span className="text-[12px] font-mono" style={{ color: '#4B5563' }}>共 {filteredLaws.length} 部</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCategoryFilter(null)}
          className="text-[11px] px-2.5 py-1 rounded-full transition-colors duration-100"
          style={{
            backgroundColor: !categoryFilter ? '#F5A623' : '#1B2333',
            color: !categoryFilter ? '#0B0F1A' : '#94A3B8',
            border: '1px solid #2A3548',
          }}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
            className="text-[11px] px-2.5 py-1 rounded-full transition-colors duration-100"
            style={{
              backgroundColor: categoryFilter === cat ? CATEGORY_COLORS[cat]?.bg : '#1B2333',
              color: categoryFilter === cat ? CATEGORY_COLORS[cat]?.text : '#94A3B8',
              border: '1px solid #2A3548',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Law Cards */}
      <div className="flex flex-col gap-2">
        {filteredLaws.map((law, i) => (
          <LawCard key={law.id} law={law} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

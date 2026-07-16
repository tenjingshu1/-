import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { constraints, RELATION_COLORS } from '@/data/ontology';

function ConfidenceDots({ confidence }: { confidence: number }) {
  const filled = Math.round(confidence * 5);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.2, ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number] }}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: i < filled ? '#F5A623' : '#1E293B',
          }}
        />
      ))}
    </div>
  );
}

export default function ConstraintsView() {
  const stats = useMemo(() => {
    const high = constraints.filter((c) => c.confidence > 0.9).length;
    const mid = constraints.filter((c) => c.confidence >= 0.7 && c.confidence <= 0.9).length;
    const low = constraints.filter((c) => c.confidence < 0.7).length;
    return { total: constraints.length, high, mid, low };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex flex-col h-full overflow-y-auto p-5"
    >
      {/* Stats Bar */}
      <div
        className="flex items-center gap-6 mb-5 px-4 py-3 rounded-lg"
        style={{ backgroundColor: '#111827', border: '1px solid #1E293B' }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} style={{ color: '#F5A623' }} />
          <span className="text-[12px]" style={{ color: '#94A3B8' }}>总约束数</span>
          <span className="text-[16px] font-bold font-mono" style={{ color: '#E8ECF1' }}>{stats.total}</span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: '#1E293B' }} />
        <div className="flex items-center gap-1.5">
          <span className="text-[11px]" style={{ color: '#34D399' }}>高置信度 (&gt;0.9)</span>
          <span className="text-[13px] font-bold font-mono" style={{ color: '#34D399' }}>{stats.high}</span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: '#1E293B' }} />
        <div className="flex items-center gap-1.5">
          <span className="text-[11px]" style={{ color: '#F5A623' }}>中置信度 (0.7-0.9)</span>
          <span className="text-[13px] font-bold font-mono" style={{ color: '#F5A623' }}>{stats.mid}</span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: '#1E293B' }} />
        <div className="flex items-center gap-1.5">
          <span className="text-[11px]" style={{ color: '#94A3B8' }}>低置信度 (&lt;0.7)</span>
          <span className="text-[13px] font-bold font-mono" style={{ color: '#94A3B8' }}>{stats.low}</span>
        </div>
      </div>

      {/* Constraints Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {constraints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.04,
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="rounded-md p-3"
            style={{
              backgroundColor: '#1B2333',
              border: '1px solid #2A3548',
            }}
          >
            {/* Constraint number */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono" style={{ color: '#4B5563' }}>
                #{c.id.replace('c-', '').padStart(3, '0')}
              </span>
              <ConfidenceDots confidence={c.confidence} />
            </div>

            {/* Rule: source -> relation -> target */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[13px] font-medium" style={{ color: '#E8ECF1' }}>
                {c.sourceName}
              </span>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${RELATION_COLORS[c.relationType] || '#94A3B8'}20`,
                  color: RELATION_COLORS[c.relationType] || '#94A3B8',
                  border: `1px solid ${RELATION_COLORS[c.relationType] || '#94A3B8'}40`,
                }}
              >
                {c.relationType}
              </span>
              <span className="text-[13px] font-medium" style={{ color: '#E8ECF1' }}>
                {c.targetName}
              </span>
            </div>

            {/* Requirement */}
            <div className="text-[11px] mb-1.5 pl-2" style={{ color: '#94A3B8', borderLeft: '2px solid #1E293B' }}>
              {c.requirement}
            </div>

            {/* Source law + confidence */}
            <div className="flex items-center justify-between">
              <span className="text-[10px]" style={{ color: '#3B8DFF' }}>
                {c.sourceLaw}
              </span>
              <span className="text-[11px] font-mono" style={{ color: '#F5A623' }}>
                {c.confidence.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

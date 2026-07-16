import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, AlignLeft, Copy, ExternalLink } from 'lucide-react';
import { useOntologyStore } from '@/store/useOntologyStore';
import {
  getConceptById,
  getChildren,
  getIncomingRelations,
  LEVEL_COLORS,
  RELATION_COLORS,
} from '@/data/ontology';

export default function DetailPanel() {
  const selectedConceptId = useOntologyStore((s) => s.selectedConceptId);
  const setSelectedConceptId = useOntologyStore((s) => s.setSelectedConceptId);

  const concept = useMemo(
    () => (selectedConceptId ? getConceptById(selectedConceptId) : undefined),
    [selectedConceptId]
  );

  const children = useMemo(
    () => (concept ? getChildren(concept.id) : []),
    [concept]
  );

  const incomingRelations = useMemo(
    () => (concept ? getIncomingRelations(concept.id) : []),
    [concept]
  );

  const allRelations = useMemo(() => {
    if (!concept) return [];
    const grouped = new Map<string, Array<{ targetId: string; targetName: string; confidence: number }>>();
    for (const r of concept.relations) {
      const existing = grouped.get(r.type) || [];
      existing.push({ targetId: r.targetId, targetName: r.targetName, confidence: r.confidence });
      grouped.set(r.type, existing);
    }
    for (const r of incomingRelations) {
      const existing = grouped.get(r.type) || [];
      existing.push({ targetId: r.sourceId, targetName: r.sourceName, confidence: r.confidence });
      grouped.set(r.type, existing);
    }
    return Array.from(grouped.entries());
  }, [concept, incomingRelations]);

  const handleChildClick = (childId: string) => {
    setSelectedConceptId(childId);
  };

  const handleRelationClick = (targetId: string) => {
    setSelectedConceptId(targetId);
  };

  return (
    <motion.aside
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex flex-col overflow-y-auto shrink-0"
      style={{
        width: 380,
        backgroundColor: '#111827',
        borderLeft: '1px solid #1E293B',
      }}
    >
      <AnimatePresence mode="wait">
        {!concept ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -8 }}
            className="flex flex-col items-center justify-center flex-1 gap-3"
          >
            <MousePointerClick size={48} style={{ color: '#4B5563', opacity: 0.3 }} />
            <span className="text-[14px]" style={{ color: '#4B5563' }}>
              选择一个概念查看详情
            </span>
            <span className="text-[12px]" style={{ color: '#4B5563' }}>
              点击左侧概念树中的任意节点
            </span>
          </motion.div>
        ) : (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="p-5"
          >
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center justify-center rounded-md font-mono text-[12px] font-semibold px-2 py-0.5"
                  style={{
                    backgroundColor: LEVEL_COLORS[concept.level]?.bg,
                    color: LEVEL_COLORS[concept.level]?.text,
                    border: `1px solid ${LEVEL_COLORS[concept.level]?.border}`,
                  }}
                >
                  L{concept.level}
                </span>
                <h2 className="text-[18px] font-bold" style={{ color: '#E8ECF1' }}>
                  {concept.name}
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-mono" style={{ color: '#3B8DFF' }}>
                  {concept.code}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-md transition-colors duration-100"
                    style={{ color: '#4B5563' }}
                    title="复制编码"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#4B5563'; }}
                    onClick={() => navigator.clipboard.writeText(concept.code)}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Definition */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2">
                <AlignLeft size={14} style={{ color: '#94A3B8' }} />
                <h3 className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>
                  定义
                </h3>
              </div>
              <blockquote
                className="text-[14px] leading-relaxed pl-3 py-1"
                style={{
                  color: '#E8ECF1',
                  borderLeft: '2px solid #1E293B',
                }}
              >
                {concept.definition}
              </blockquote>
            </div>

            {/* Properties */}
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold mb-2" style={{ color: '#94A3B8' }}>属性</h3>
              <table className="w-full">
                <tbody>
                  {[
                    { key: '概念域', value: concept.domain },
                    { key: '层级', value: `L${concept.level}` },
                    { key: '编码', value: concept.code },
                    { key: '子概念数', value: `${children.length}` },
                    ...(concept.sourceLaw ? [{ key: '来源法规', value: concept.sourceLaw }] : []),
                  ].map((row, i) => (
                    <motion.tr
                      key={row.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className="border-b"
                      style={{ borderColor: '#1E293B', height: 32 }}
                    >
                      <td
                        className="text-[11px] text-right pr-3 w-[100px]"
                        style={{ color: '#94A3B8' }}
                      >
                        {row.key}
                      </td>
                      <td className="text-[13px]" style={{ color: '#E8ECF1' }}>
                        {row.value}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Children */}
            {children.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[12px] font-semibold" style={{ color: '#94A3B8' }}>子概念</h3>
                  <span
                    className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: '#1B2333', color: '#94A3B8' }}
                  >
                    {children.length}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {children.map((child, i) => (
                    <motion.button
                      key={child.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => handleChildClick(child.id)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-left transition-colors duration-100"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                    >
                      <span
                        className="inline-flex items-center justify-center rounded-full font-mono text-[9px] font-medium shrink-0"
                        style={{
                          width: 24,
                          height: 14,
                          backgroundColor: LEVEL_COLORS[child.level]?.bg,
                          color: LEVEL_COLORS[child.level]?.text,
                          border: `1px solid ${LEVEL_COLORS[child.level]?.border}`,
                        }}
                      >
                        L{child.level}
                      </span>
                      <span className="text-[13px] flex-1" style={{ color: '#E8ECF1' }}>
                        {child.name}
                      </span>
                      <span className="text-[11px] font-mono" style={{ color: '#4B5563' }}>
                        {child.code}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Relations */}
            {allRelations.length > 0 && (
              <div>
                <h3 className="text-[12px] font-semibold mb-2" style={{ color: '#94A3B8' }}>语义关系</h3>
                <div className="flex flex-col gap-3">
                  {allRelations.map(([type, targets], i) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.2 }}
                      className="pb-3"
                      style={{ borderBottom: '1px solid #1E293B' }}
                    >
                      <span
                        className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-1.5"
                        style={{
                          backgroundColor: `${RELATION_COLORS[type]}20`,
                          color: RELATION_COLORS[type],
                          border: `1px solid ${RELATION_COLORS[type]}40`,
                        }}
                      >
                        {type}
                      </span>
                      <div className="flex flex-col gap-1">
                        {targets.map((t) => (
                          <button
                            key={t.targetId}
                            onClick={() => handleRelationClick(t.targetId)}
                            className="flex items-center gap-1 text-left transition-colors duration-100 px-1 py-0.5 rounded"
                            style={{ color: '#3B8DFF' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                          >
                            <span className="text-[13px] hover:underline">{t.targetName}</span>
                            <ExternalLink size={10} style={{ color: '#4B5563', opacity: 0.5 }} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

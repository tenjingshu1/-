import { useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, FolderOpen, FolderClosed } from 'lucide-react';
import { useOntologyStore } from '@/store/useOntologyStore';
import {
  concepts,
  LEVEL_COLORS,
  searchConcepts,
  getChildren,
  type Concept,
} from '@/data/ontology';

function LevelBadge({ level }: { level: number }) {
  const colors = LEVEL_COLORS[level];
  if (!colors) return null;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-mono text-[10px] font-medium shrink-0"
      style={{
        width: 28,
        height: 16,
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      L{level}
    </span>
  );
}

function TreeNode({
  concept,
  depth = 0,
}: {
  concept: Concept;
  depth?: number;
}) {
  const selectedConceptId = useOntologyStore((s) => s.selectedConceptId);
  const setSelectedConceptId = useOntologyStore((s) => s.setSelectedConceptId);
  const expandedNodeIds = useOntologyStore((s) => s.expandedNodeIds);
  const toggleExpanded = useOntologyStore((s) => s.toggleExpanded);
  const searchQuery = useOntologyStore((s) => s.searchQuery);
  const filteredDomains = useOntologyStore((s) => s.filteredDomains);

  const isExpanded = expandedNodeIds.has(concept.id);
  const isSelected = selectedConceptId === concept.id;
  const children = getChildren(concept.id);
  const hasChildren = children.length > 0;

  // Search highlight
  const isSearchMatch = useMemo(() => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase();
    return (
      concept.name.toLowerCase().includes(q) ||
      concept.code.toLowerCase().includes(q) ||
      concept.definition.toLowerCase().includes(q)
    );
  }, [searchQuery, concept]);

  // Filter by domain
  if (!filteredDomains.includes(concept.domain)) return null;

  const nodeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected node into view
  useEffect(() => {
    if (isSelected && nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleExpanded(concept.id);
    },
    [concept.id, toggleExpanded]
  );

  const handleSelect = useCallback(() => {
    setSelectedConceptId(concept.id);
  }, [concept.id, setSelectedConceptId]);

  return (
    <div>
      <div
        ref={nodeRef}
        onClick={handleSelect}
        className="flex items-center gap-1.5 cursor-pointer transition-colors duration-100 relative"
        style={{
          paddingLeft: 8 + depth * 20,
          paddingRight: 8,
          height: 36,
          backgroundColor: isSelected
            ? '#1E293B'
            : isSearchMatch
            ? 'rgba(245, 166, 35, 0.1)'
            : 'transparent',
          borderLeft: isSelected ? '3px solid #F5A623' : '3px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#162033';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            (e.currentTarget as HTMLElement).style.backgroundColor = isSearchMatch
              ? 'rgba(245, 166, 35, 0.1)'
              : 'transparent';
          }
        }}
      >
        {/* Expand/Collapse icon */}
        <div
          className="flex items-center justify-center shrink-0 cursor-pointer"
          style={{ width: 20, height: 20 }}
          onClick={hasChildren ? handleToggle : undefined}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={16} style={{ color: isSelected ? '#F5A623' : '#4B5563' }} />
            ) : (
              <ChevronRight size={16} style={{ color: '#4B5563' }} />
            )
          ) : (
            <div style={{ width: 16 }} />
          )}
        </div>

        {/* Level Badge */}
        <LevelBadge level={concept.level} />

        {/* Concept Name */}
        <span
          className="text-[14px] truncate"
          style={{
            color: isSelected ? '#E8ECF1' : isSearchMatch ? '#F5A623' : '#E8ECF1',
            fontWeight: isSelected || isSearchMatch ? 600 : 500,
          }}
        >
          {concept.name}
        </span>

        {/* Concept Code */}
        <span
          className="text-[12px] font-mono truncate shrink-0"
          style={{ color: '#4B5563', marginLeft: 4 }}
        >
          {concept.code}
        </span>

        {/* Children count */}
        {hasChildren && !isExpanded && (
          <span
            className="text-[11px] font-mono rounded-full px-1.5 py-0.5 ml-auto shrink-0"
            style={{ backgroundColor: '#1B2333', color: '#4B5563' }}
          >
            {children.length}
          </span>
        )}
      </div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            {children.map((child, i) => (
              <motion.div
                key={child.id}
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.03,
                  ease: [0, 0, 0.2, 1] as [number, number, number, number],
                }}
              >
                <TreeNode
                  concept={child}
                  depth={depth + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConceptTree() {
  const searchQuery = useOntologyStore((s) => s.searchQuery);
  const expandedNodeIds = useOntologyStore((s) => s.expandedNodeIds);
  const expandAll = useOntologyStore((s) => s.expandAll);
  const collapseAll = useOntologyStore((s) => s.collapseAll);
  const filteredDomains = useOntologyStore((s) => s.filteredDomains);

  const rootConcepts = useMemo(
    () => concepts.filter((c) => c.parentId === null),
    []
  );

  // When search query changes, expand matching nodes
  useEffect(() => {
    if (searchQuery) {
      const matches = searchConcepts(searchQuery);
      const idsToExpand = new Set<string>();
      for (const m of matches) {
        let current: Concept | undefined = m;
        while (current) {
          idsToExpand.add(current.id);
          current = current.parentId
            ? concepts.find((c) => c.id === current!.parentId)
            : undefined;
        }
      }
      expandAll(Array.from(idsToExpand));
    }
  }, [searchQuery, expandAll]);

  const visibleCount = useMemo(() => {
    const countVisible = (concepts: Concept[]): number => {
      let count = 0;
      for (const c of concepts) {
        if (!filteredDomains.includes(c.domain)) continue;
        count++;
        if (expandedNodeIds.has(c.id)) {
          count += countVisible(getChildren(c.id));
        }
      }
      return count;
    };
    return countVisible(rootConcepts);
  }, [expandedNodeIds, filteredDomains, rootConcepts]);

  const totalConcepts = concepts.filter((c) =>
    filteredDomains.includes(c.domain)
  ).length;

  const allIds = useMemo(() => concepts.map((c) => c.id), []);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-3 shrink-0"
        style={{
          height: 40,
          backgroundColor: '#111827',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => expandAll(allIds)}
            className="p-1 rounded-sm transition-colors duration-100"
            style={{ color: '#94A3B8' }}
            title="全部展开"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            <FolderOpen size={16} />
          </button>
          <button
            onClick={() => collapseAll()}
            className="p-1 rounded-sm transition-colors duration-100"
            style={{ color: '#94A3B8' }}
            title="全部折叠"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            <FolderClosed size={16} />
          </button>
        </div>
        <span className="text-[11px]" style={{ color: '#4B5563' }}>
          显示 {visibleCount}/{totalConcepts} 个概念
        </span>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto">
        {rootConcepts.map((root) => (
          <TreeNode key={root.id} concept={root} depth={0} />
        ))}

        {/* Empty state */}
        {visibleCount === 0 && (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4B5563"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <span className="text-[14px]" style={{ color: '#4B5563' }}>
              未找到匹配概念
            </span>
            <span className="text-[12px]" style={{ color: '#4B5563' }}>
              尝试其他关键词或清除筛选条件
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, GitBranch, Network, ShieldCheck, BookOpen } from 'lucide-react';
import { useOntologyStore, type ActiveView } from '@/store/useOntologyStore';

const tabs: { key: ActiveView; label: string; icon: typeof GitBranch }[] = [
  { key: 'tree', label: '概念树', icon: GitBranch },
  { key: 'graph', label: '关系图谱', icon: Network },
  { key: 'constraints', label: '约束', icon: ShieldCheck },
  { key: 'laws', label: '法规库', icon: BookOpen },
];

export default function Header() {
  const searchQuery = useOntologyStore((s) => s.searchQuery);
  const setSearchQuery = useOntologyStore((s) => s.setSearchQuery);
  const activeView = useOntologyStore((s) => s.activeView);
  const setActiveView = useOntologyStore((s) => s.setActiveView);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        setActiveView(tabs[Number.parseInt(e.key) - 1].key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActiveView]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex items-center justify-between px-4 shrink-0 z-50"
      style={{
        height: 56,
        backgroundColor: '#111827',
        borderBottom: '1px solid #1E293B',
        boxShadow: 'inset 0 -1px 0 rgba(245, 166, 35, 0.1)',
      }}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <img src="/logo-icon.svg" alt="Logo" className="w-7 h-7" />
        <span className="text-[13px] font-semibold hidden lg:inline" style={{ color: '#94A3B8' }}>
          面向社会治理的AI语义可信引擎
        </span>
        <span className="hidden lg:inline" style={{ color: '#4B5563' }}>·</span>
        <span className="text-sm font-bold" style={{ color: '#E8ECF1' }}>
          城管领域本体库
        </span>
        <span
          className="hidden md:inline-block text-[11px] font-mono px-2 py-0.5 rounded"
          style={{ color: '#4B5563', backgroundColor: '#162033' }}
        >
          Urban Management Ontology
        </span>
      </div>

      {/* Center: Search */}
      <div className="flex items-center">
        <div
          className="flex items-center gap-2 rounded-md border transition-all duration-200"
          style={{
            width: searchQuery ? 420 : 360,
            backgroundColor: '#0D1219',
            borderColor: searchQuery ? '#F5A623' : '#2A3548',
            boxShadow: searchQuery ? '0 0 0 2px rgba(245, 166, 35, 0.4), 0 0 0 4px rgba(245, 166, 35, 0.1)' : 'none',
            padding: '8px 12px',
          }}
        >
          <Search size={16} style={{ color: '#4B5563', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索概念名称、编码、定义关键词..."
            className="bg-transparent border-none outline-none w-full text-[13px]"
            style={{ color: '#E8ECF1' }}
          />
          {searchQuery && (
            <span className="text-[11px] font-mono whitespace-nowrap" style={{ color: '#94A3B8' }}>
              搜索中...
            </span>
          )}
        </div>
      </div>

      {/* Right: View Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = activeView === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key)}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[13px] transition-colors duration-150"
              style={{
                color: isActive ? '#E8ECF1' : '#94A3B8',
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? '#162033' : 'transparent',
              }}
            >
              <tab.icon size={15} />
              <span className="hidden md:inline">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-1.5 right-1.5 h-0.5 rounded-full"
                  style={{ backgroundColor: '#F5A623' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.header>
  );
}

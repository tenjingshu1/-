import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import ConceptTree from '@/components/ConceptTree';
import RelationGraph from '@/components/RelationGraph';
import ConstraintsView from '@/components/ConstraintsView';
import LawLibrary from '@/components/LawLibrary';
import DetailPanel from '@/components/DetailPanel';
import { useOntologyStore } from '@/store/useOntologyStore';

function MainContent() {
  const activeView = useOntologyStore((s) => s.activeView);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="flex-1 overflow-hidden"
      >
        {activeView === 'tree' && <ConceptTree />}
        {activeView === 'graph' && <RelationGraph />}
        {activeView === 'constraints' && <ConstraintsView />}
        {activeView === 'laws' && <LawLibrary />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  // Listen for graph selection events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        useOntologyStore.getState().setSelectedConceptId(detail);
      }
    };
    window.addEventListener('ontology-select-concept', handler);
    return () => window.removeEventListener('ontology-select-concept', handler);
  }, []);

  return (
    <div
      className="flex flex-col w-screen overflow-hidden"
      style={{ backgroundColor: '#0B0F1A', height: '100dvh' }}
    >
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <LeftPanel />

        {/* Center Panel */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ backgroundColor: '#0B0F1A' }}
        >
          <motion.div
            initial={{ scaleX: 0.95, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col flex-1 overflow-hidden origin-left"
          >
            <MainContent />
          </motion.div>
        </div>

        {/* Right Panel - Detail */}
        <DetailPanel />
      </div>
    </div>
  );
}

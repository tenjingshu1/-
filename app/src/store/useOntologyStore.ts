import { create } from 'zustand';

export type ActiveView = 'tree' | 'graph' | 'constraints' | 'laws';

interface OntologyState {
  // Selection
  selectedConceptId: string | null;
  setSelectedConceptId: (id: string | null) => void;

  // View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Tree expansion
  expandedNodeIds: Set<string>;
  toggleExpanded: (id: string) => void;
  expandNode: (id: string) => void;
  collapseNode: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;

  // Domain filters
  filteredDomains: string[];
  toggleDomain: (domain: string) => void;
  selectAllDomains: () => void;
  clearAllDomains: () => void;

  // Highlighted path
  highlightedPath: string[];
  setHighlightedPath: (path: string[]) => void;

  // Graph config
  graphConfig: { layout: 'force' | 'hierarchical'; showLabels: boolean };
  setGraphConfig: (config: Partial<{ layout: 'force' | 'hierarchical'; showLabels: boolean }>) => void;
}

export const useOntologyStore = create<OntologyState>((set) => ({
  selectedConceptId: null,
  setSelectedConceptId: (id) => set({ selectedConceptId: id }),

  activeView: 'tree',
  setActiveView: (view) => set({ activeView: view }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  expandedNodeIds: new Set([
    'legal-norm-system',
    'national-law',
    'administrative-regulation',
    'departmental-rule',
    'technical-standard',
    'enforcement-scene',
    'administrative-action',
    'violation-type',
    'penalty-type',
    'evidence-type',
    'administrative-subject',
    'administrative-object',
    'enforcement-procedure',
  ]),
  toggleExpanded: (id) =>
    set((state) => {
      const next = new Set(state.expandedNodeIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { expandedNodeIds: next };
    }),
  expandNode: (id) =>
    set((state) => {
      const next = new Set(state.expandedNodeIds);
      next.add(id);
      return { expandedNodeIds: next };
    }),
  collapseNode: (id) =>
    set((state) => {
      const next = new Set(state.expandedNodeIds);
      next.delete(id);
      return { expandedNodeIds: next };
    }),
  expandAll: (ids) =>
    set((state) => {
      const next = new Set(state.expandedNodeIds);
      for (const id of ids) next.add(id);
      return { expandedNodeIds: next };
    }),
  collapseAll: () => set({ expandedNodeIds: new Set() }),

  filteredDomains: [
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
],
  toggleDomain: (domain) =>
    set((state) => {
      const next = state.filteredDomains.includes(domain)
        ? state.filteredDomains.filter((d) => d !== domain)
        : [...state.filteredDomains, domain];
      return { filteredDomains: next };
    }),
  selectAllDomains: () =>
    set({
      filteredDomains: [
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
],
    }),
  clearAllDomains: () => set({ filteredDomains: [] }),

  highlightedPath: [],
  setHighlightedPath: (path) => set({ highlightedPath: path }),

  graphConfig: { layout: 'force', showLabels: true },
  setGraphConfig: (config) =>
    set((state) => ({ graphConfig: { ...state.graphConfig, ...config } })),
}));

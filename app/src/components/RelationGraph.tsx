import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useOntologyStore } from '@/store/useOntologyStore';
import { getGraphData, RELATION_COLORS } from '@/data/ontology';

export default function RelationGraph() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [zoom, setZoom] = useState(100);
  const selectedConceptId = useOntologyStore((s) => s.selectedConceptId);

  const { nodes, links } = useMemo(() => getGraphData(), []);

  // Type-safe line style helper
  const getLineType = (type: string): 'solid' | 'dashed' | 'dotted' => {
    if (type === 'dashed') return 'dashed';
    if (type === 'dotted') return 'dotted';
    return 'solid';
  };

  // Initialize ECharts
  useEffect(() => {
    if (!chartRef.current) return;

    const instance = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });
    chartInstance.current = instance;

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#1B2333',
        borderColor: '#2A3548',
        borderWidth: 1,
        textStyle: { color: '#E8ECF1', fontSize: 12 },
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            return `<div style="font-weight:600">${params.data.name}</div>
                    <div style="font-size:11px;color:#94A3B8;font-family:monospace">${params.data.code}</div>
                    <div style="font-size:11px;color:#94A3B8;margin-top:4px">${params.data.domain}</div>`;
          }
          return `<div style="font-size:11px">${params.data.relationType}</div>`;
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation: true,
          animationDuration: 800,
          roam: true,
          draggable: true,
          zoom: 1,
          center: ['50%', '50%'],
          data: nodes.map((n) => ({
            ...n,
            itemStyle: {
              ...n.itemStyle,
              borderWidth: 2,
              borderColor: '#0B0F1A',
              shadowBlur: selectedConceptId === n.id ? 12 : 0,
              shadowColor: 'rgba(245, 166, 35, 0.4)',
            },
            emphasis: {
              itemStyle: {
                borderColor: '#F5A623',
                borderWidth: 3,
                shadowBlur: 16,
                shadowColor: 'rgba(245, 166, 35, 0.5)',
              },
              scale: 1.3,
            },
          })),
          links: links.map((l) => ({
            source: l.source,
            target: l.target,
            relationType: l.relationType,
            lineStyle: {
              color: l.lineStyle.color,
              width: l.lineStyle.width,
              type: getLineType(l.lineStyle.type),
            },
            label: l.label,
            emphasis: {
              lineStyle: { width: 3, opacity: 0.8 },
            },
          })),
          force: {
            repulsion: 600,
            gravity: 0.15,
            edgeLength: [80, 180],
            layoutAnimation: true,
          },
          label: {
            show: true,
            position: 'bottom',
            color: '#E8ECF1',
            fontSize: 11,
            fontFamily: 'Noto Sans SC, sans-serif',
          },
          lineStyle: {
            curveness: 0.2,
            opacity: 0.4,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: { width: 3, opacity: 0.8 },
          },
        },
      ],
    };

    instance.setOption(option);

    // Click handler
    instance.on('click', (params: any) => {
      if (params.dataType === 'node') {
        // We'll dispatch selection through a custom event
        window.dispatchEvent(new CustomEvent('ontology-select-concept', { detail: params.data.id }));
      }
    });

    // Zoom tracking
    instance.on('finished', () => {
      const opt = instance.getOption() as any;
      if (opt?.series?.[0]?.zoom) {
        setZoom(Math.round(opt.series[0].zoom * 100));
      }
    });

    const handleResize = () => instance.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      instance.dispose();
      chartInstance.current = null;
    };
  }, [nodes, links]);

  // Listen for selection events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        const store = useOntologyStore.getState();
        store.setSelectedConceptId(detail);
      }
    };
    window.addEventListener('ontology-select-concept', handler);
    return () => window.removeEventListener('ontology-select-concept', handler);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (!chartInstance.current) return;
    const opt = chartInstance.current.getOption() as any;
    const currentZoom = opt?.series?.[0]?.zoom || 1;
    const newZoom = Math.min(currentZoom * 1.2, 3);
    chartInstance.current.setOption({ series: [{ zoom: newZoom }] });
    setZoom(Math.round(newZoom * 100));
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!chartInstance.current) return;
    const opt = chartInstance.current.getOption() as any;
    const currentZoom = opt?.series?.[0]?.zoom || 1;
    const newZoom = Math.max(currentZoom / 1.2, 0.25);
    chartInstance.current.setOption({ series: [{ zoom: newZoom }] });
    setZoom(Math.round(newZoom * 100));
  }, []);

  const handleReset = useCallback(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption({
      series: [{ zoom: 1, center: ['50%', '50%'] }],
    });
    setZoom(100);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative flex-1 h-full"
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />

      {/* Zoom Controls */}
      <div
        className="absolute bottom-4 right-4 flex flex-col gap-1 rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#1B2333',
          border: '1px solid #2A3548',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <button
          onClick={handleZoomIn}
          className="p-2 transition-colors duration-100"
          style={{ color: '#94A3B8' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; (e.currentTarget as HTMLElement).style.color = '#E8ECF1'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
        >
          <ZoomIn size={16} />
        </button>
        <div className="text-center text-[10px] font-mono py-0.5" style={{ color: '#4B5563' }}>
          {zoom}%
        </div>
        <button
          onClick={handleZoomOut}
          className="p-2 transition-colors duration-100"
          style={{ color: '#94A3B8' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; (e.currentTarget as HTMLElement).style.color = '#E8ECF1'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleReset}
          className="p-2 transition-colors duration-100"
          style={{ color: '#94A3B8', borderTop: '1px solid #1E293B' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#162033'; (e.currentTarget as HTMLElement).style.color = '#E8ECF1'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 rounded-lg p-3"
        style={{
          backgroundColor: '#1B2333',
          border: '1px solid #2A3548',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="text-[11px] font-semibold mb-2" style={{ color: '#94A3B8' }}>关系类型</div>
        <div className="flex flex-col gap-1">
          {Object.entries(RELATION_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-6 h-0.5 rounded"
                style={{
                  backgroundColor: color,
                  opacity: 0.7,
                  borderTop: type === 'is-a' || type === 'is-regulated-by' ? '1px dashed' : 'none',
                }}
              />
              <span className="text-[10px] font-mono" style={{ color: '#94A3B8' }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] px-3 py-1.5 rounded-md pointer-events-none"
        style={{ backgroundColor: 'rgba(27, 35, 51, 0.8)', color: '#94A3B8', border: '1px solid #2A3548' }}
      >
        拖拽节点调整布局 · 滚轮缩放 · 点击查看详情
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Urban Management Ontology Data
// ============================================

export interface Concept {
  id: string;
  name: string;
  code: string;
  level: 1 | 2 | 3 | 4;
  domain: string;
  definition: string;
  parentId: string | null;
  childrenIds: string[];
  relations: Relation[];
  sourceLaw: string | null;
  sourceFile?: string;
  properties: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Relation {
  type: 'is-a' | 'applies-to' | 'has-procedure' | 'has-violation' |
        'has-penalty' | 'requires-evidence' | 'is-enforced-by' |
        'is-targeted-at' | 'is-regulated-by' | 'has-subject';
  targetId: string;
  targetName: string;
  confidence: number;
  sourceLaw?: string;
  sourceFile?: string;
}

export interface Law {
  id: string;
  name: string;
  shortName: string;
  code: string;
  level: 1 | 2 | 3 | 4;
  category: string;
  effectiveDate: string;
  status: '现行有效' | '已废止' | '即将施行';
  scope: string;
  sourceFile?: string;
  conceptIds: string[];
}

export interface Constraint {
  id: string;
  sourceId: string;
  sourceName: string;
  relationType: string;
  targetId: string;
  targetName: string;
  requirement: string;
  sourceLaw: string;
  confidence: number;
}

// ============================================
// Level Color Mapping
// ============================================

export const LEVEL_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'rgba(59, 141, 255, 0.15)', text: '#3B8DFF', border: 'rgba(59, 141, 255, 0.3)' },
  2: { bg: 'rgba(52, 211, 153, 0.15)', text: '#34D399', border: 'rgba(52, 211, 153, 0.3)' },
  3: { bg: 'rgba(245, 166, 35, 0.15)', text: '#F5A623', border: 'rgba(245, 166, 35, 0.3)' },
  4: { bg: 'rgba(167, 139, 250, 0.15)', text: '#A78BFA', border: 'rgba(167, 139, 250, 0.3)' },
};

export const DOMAIN_LEVEL_MAP: Record<string, number> = {
  '法律法规体系': 1,
  '城市管理对象': 2,
  '城市部件': 3,
  '城市管理事件': 4,
  '执法场景': 5,
  '行政行为': 6,
  '违法类型': 7,
  '处罚类型': 8,
  '裁量规则': 9,
  '证据类型': 10,
  '行政主体': 11,
  '行政相对人': 12,
  '执法程序': 13,
  '空间区域': 14,
  '事件状态': 15,
  '协同处置': 16,
};

export const DOMAIN_COLORS: Record<string, { bg: string; text: string }> = {
  '法律法规体系': { bg: '#3B8DFF26', text: '#3B8DFF' },
  '城市管理对象': { bg: '#10B98126', text: '#10B981' },
  '城市部件': { bg: '#2DD4BF26', text: '#2DD4BF' },
  '城市管理事件': { bg: '#F9731626', text: '#F97316' },
  '执法场景': { bg: '#34D39926', text: '#34D399' },
  '行政行为': { bg: '#F5A62326', text: '#F5A623' },
  '违法类型': { bg: '#A78BFA26', text: '#A78BFA' },
  '处罚类型': { bg: '#F472B626', text: '#F472B6' },
  '裁量规则': { bg: '#FB718526', text: '#FB7185' },
  '证据类型': { bg: '#F8717126', text: '#F87171' },
  '行政主体': { bg: '#22D3EE26', text: '#22D3EE' },
  '行政相对人': { bg: '#A3E63526', text: '#A3E635' },
  '执法程序': { bg: '#94A3B826', text: '#94A3B8' },
  '空间区域': { bg: '#38BDF826', text: '#38BDF8' },
  '事件状态': { bg: '#C084FC26', text: '#C084FC' },
  '协同处置': { bg: '#FBBF2426', text: '#FBBF24' },
};

export const RELATION_COLORS: Record<string, string> = {
  'is-a': '#94A3B8',
  'applies-to': '#3B8DFF',
  'has-procedure': '#34D399',
  'has-violation': '#A78BFA',
  'has-penalty': '#F472B6',
  'requires-evidence': '#F87171',
  'is-enforced-by': '#22D3EE',
  'is-targeted-at': '#A3E635',
  'is-regulated-by': '#6B7280',
  'has-subject': '#F5A623',
};

// ============================================
// Concepts Data
// ============================================

export const concepts: Concept[] = [
  // ========== L1 Root Concepts (9) ==========
  {
    id: 'legal-norm-system', name: '法律法规体系', code: 'UM-Legal', level: 1, domain: '法律法规体系',
    definition: '城管领域全部法律法规的集合体系，包括国家法律、行政法规、部门规章和技术标准四个层级。',
    parentId: null, childrenIds: ['national-law','administrative-regulation','departmental-rule','technical-standard'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '1' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'enforcement-scene', name: '执法场景', code: 'UM-Scene', level: 1, domain: '执法场景',
    definition: '城管执法涉及的7大业务领域，涵盖市容环境、园林绿化、市政设施、违法建设、环境保护、交通秩序和市场监管。',
    parentId: null, childrenIds: ['scene-001','scene-002','scene-003','scene-004','scene-005','scene-006','scene-007'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '2' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'administrative-action', name: '行政行为', code: 'UM-Action', level: 1, domain: '行政行为',
    definition: '城管部门依法实施的行政活动，包括行政处罚、行政强制、行政许可和行政检查四大类。',
    parentId: null, childrenIds: ['action-001','action-002','action-003','action-004','action-005','action-006','action-007'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '3' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'violation-type', name: '违法类型', code: 'UM-Violation', level: 1, domain: '违法类型',
    definition: '城市管理中的各类违法行为分类体系，覆盖占道经营、违法建设、环境污染等11大类违法行为。',
    parentId: null, childrenIds: ['viol-001','viol-002','viol-003','viol-004','viol-005','viol-006','viol-007','viol-008','viol-009','viol-010','viol-011','viol-012','viol-013','viol-014','viol-015','viol-016','viol-017','viol-018','viol-019','viol-020','viol-021','viol-022','viol-023','viol-024','viol-025','viol-026','viol-027','viol-028','viol-029','viol-030','viol-031','viol-032'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '4' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'penalty-type', name: '处罚类型', code: 'UM-Penalty', level: 1, domain: '处罚类型',
    definition: '行政处罚与行政强制的措施种类，包括警告、罚款、没收、责令停产停业、暂扣吊销许可证等。',
    parentId: null, childrenIds: ['pen-001','pen-002','pen-003','pen-004','pen-005','pen-006','pen-007','pen-008','pen-009','pen-010','pen-011','pen-012'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '5' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evidence-type', name: '证据类型', code: 'UM-Evidence', level: 1, domain: '证据类型',
    definition: '行政执法中收集和使用的证据材料分类，包括笔录、视听资料、物证、鉴定意见、电子数据等。',
    parentId: null, childrenIds: ['evd-001','evd-002','evd-003','evd-004','evd-005','evd-006','evd-007','evd-008','evd-009','evd-010','evd-011','evd-012','evd-013','evd-014'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '6' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'administrative-subject', name: '行政主体', code: 'UM-Subject', level: 1, domain: '行政主体',
    definition: '依法行使城管职权的组织机构，包括城市管理综合执法局、执法支队、街道办事处及联合执法单位。',
    parentId: null, childrenIds: ['subj-001','subj-002','subj-003','subj-004','subj-005','subj-006','subj-007','subj-008','subj-009','subj-010','subj-011'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '7' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'administrative-object', name: '行政相对人', code: 'UM-Target', level: 1, domain: '行政相对人',
    definition: '城管执法行为所指向的对象，包括自然人、法人和其他组织三类。',
    parentId: null, childrenIds: ['tgt-001','tgt-002','tgt-003','tgt-004','tgt-005','tgt-006','tgt-007','tgt-008','tgt-009'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '8' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'enforcement-procedure', name: '执法程序', code: 'UM-Procedure', level: 1, domain: '执法程序',
    definition: '城管执法的法定程序流程，从立案、调查取证到作出决定、送达执行和结案归档的完整程序链条。',
    parentId: null, childrenIds: ['proc-001','proc-002','proc-003','proc-004','proc-005','proc-006','proc-007','proc-008','proc-009','proc-010','proc-011','proc-012','proc-013','proc-014','proc-015','proc-016'],
    relations: [], sourceLaw: null,
    properties: { category: 'root', domainOrder: '9' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },

  // ========== 法律法规体系 children ==========
  // L2: NationalLaw
  {
    id: 'national-law', name: '国家法律', code: 'UM-Legal-L1', level: 2, domain: '法律法规体系',
    definition: '由全国人民代表大会及其常务委员会制定的法律规范。',
    parentId: 'legal-norm-system', childrenIds: ['legal-002','legal-003','legal-004','legal-005','legal-006','legal-007','legal-008','legal-009','legal-010','legal-011','legal-012','legal-013'],
    relations: [], sourceLaw: null,
    properties: { category: 'subcategory' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  // L3 laws under NationalLaw
    {
    id: 'legal-002', name: '行政处罚法', code: 'UM-Legal-002', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国行政处罚法》，2021年修订，规范行政处罚的设定和实施，保障和监督行政机关有效实施行政管理。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'action-001', targetName: '行政处罚', confidence: 0.99, sourceLaw: '《行政处罚法》' }],
    sourceLaw: '《中华人民共和国行政处罚法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-003', name: '行政强制法', code: 'UM-Legal-003', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国行政强制法》，2012年施行，规范行政强制的设定和实施，保障和监督行政机关依法履行职责。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'action-002', targetName: '行政强制', confidence: 0.99, sourceLaw: '《行政强制法》' }],
    sourceLaw: '《中华人民共和国行政强制法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-004', name: '行政复议法', code: 'UM-Legal-004', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国行政复议法》，2024年修订，防止和纠正违法的或者不当的行政行为，保护公民、法人和其他组织的合法权益。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'proc-007', targetName: '送达执行', confidence: 0.90, sourceLaw: '《行政复议法》' }],
    sourceLaw: '《中华人民共和国行政复议法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-005', name: '行政诉讼法', code: 'UM-Legal-005', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国行政诉讼法》，2017年修正，保证人民法院公正、及时审理行政案件，解决行政争议。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'proc-008', targetName: '结案归档', confidence: 0.85, sourceLaw: '《行政诉讼法》' }],
    sourceLaw: '《中华人民共和国行政诉讼法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-006', name: '行政许可法', code: 'UM-Legal-006', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国行政许可法》，2019年修正，规范行政许可的设定和实施，保护公民、法人和其他组织的合法权益。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'action-003', targetName: '行政许可', confidence: 0.95, sourceLaw: '《行政许可法》' }],
    sourceLaw: '《中华人民共和国行政许可法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-007', name: '城乡规划法', code: 'UM-Legal-007', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国城乡规划法》，2019年修正，加强城乡规划管理，协调城乡空间布局。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-004', targetName: '违法建设治理', confidence: 0.98, sourceLaw: '《城乡规划法》' }],
    sourceLaw: '《中华人民共和国城乡规划法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-008', name: '环境保护法', code: 'UM-Legal-008', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国环境保护法》，2014年修订，保护和改善环境，防治污染和其他公害。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-005', targetName: '环境保护执法', confidence: 0.95, sourceLaw: '《环境保护法》' }],
    sourceLaw: '《中华人民共和国环境保护法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-009', name: '大气污染防治法', code: 'UM-Legal-009', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国大气污染防治法》，2018年修正，防治大气污染，保护和改善生活环境和生态环境。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'viol-007', targetName: '餐饮油烟超标', confidence: 0.95, sourceLaw: '《大气污染防治法》' }],
    sourceLaw: '《中华人民共和国大气污染防治法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-010', name: '噪声污染防治法', code: 'UM-Legal-010', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国噪声污染防治法》，2022年施行，防治噪声污染，保障公众健康。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'viol-009', targetName: '噪声超标扰民', confidence: 0.95, sourceLaw: '《噪声污染防治法》' }],
    sourceLaw: '《中华人民共和国噪声污染防治法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-011', name: '固体废物污染环境防治法', code: 'UM-Legal-011', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国固体废物污染环境防治法》，2020年修订，防治固体废物污染环境，维护生态安全。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'viol-006', targetName: '垃圾违规处置', confidence: 0.92, sourceLaw: '《固体废物污染环境防治法》' }],
    sourceLaw: '《中华人民共和国固体废物污染环境防治法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-012', name: '道路交通安全法', code: 'UM-Legal-012', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国道路交通安全法》，2021年修正，维护道路交通秩序，预防和减少交通事故。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-006', targetName: '交通秩序管理', confidence: 0.88, sourceLaw: '《道路交通安全法》' }],
    sourceLaw: '《中华人民共和国道路交通安全法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-013', name: '国家赔偿法', code: 'UM-Legal-013', level: 3, domain: '法律法规体系',
    definition: '《中华人民共和国国家赔偿法》，2012年修正，保障公民、法人和其他组织享有依法取得国家赔偿的权利。',
    parentId: 'national-law', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-procedure', targetName: '执法程序', confidence: 0.80, sourceLaw: '《国家赔偿法》' }],
    sourceLaw: '《中华人民共和国国家赔偿法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  // L2: AdministrativeRegulation
  {
    id: 'administrative-regulation', name: '行政法规', code: 'UM-Legal-L2', level: 2, domain: '法律法规体系',
    definition: '由国务院根据宪法和法律制定的行政管理法规。',
    parentId: 'legal-norm-system', childrenIds: ['legal-014','legal-015','legal-016','legal-017','legal-018'],
    relations: [], sourceLaw: null,
    properties: { category: 'subcategory' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-014', name: '城市市容和环境卫生管理条例', code: 'UM-Legal-014', level: 3, domain: '法律法规体系',
    definition: '国务院颁布的行政法规，加强城市市容和环境卫生管理，创造清洁、优美的城市工作、生活环境。',
    parentId: 'administrative-regulation', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.98, sourceLaw: '《城市市容和环境卫生管理条例》' }],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-015', name: '城市绿化条例', code: 'UM-Legal-015', level: 3, domain: '法律法规体系',
    definition: '国务院颁布的行政法规，促进城市绿化事业的发展，改善生态环境，美化生活环境。',
    parentId: 'administrative-regulation', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-002', targetName: '园林绿化管理', confidence: 0.97, sourceLaw: '《城市绿化条例》' }],
    sourceLaw: '《城市绿化条例》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-016', name: '城市道路管理条例', code: 'UM-Legal-016', level: 3, domain: '法律法规体系',
    definition: '国务院颁布的行政法规，加强城市道路管理，保障城市道路完好，充分发挥城市道路功能。',
    parentId: 'administrative-regulation', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-003', targetName: '市政设施管理', confidence: 0.97, sourceLaw: '《城市道路管理条例》' }],
    sourceLaw: '《城市道路管理条例》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-017', name: '国有土地上房屋征收与补偿条例', code: 'UM-Legal-017', level: 3, domain: '法律法规体系',
    definition: '国务院颁布的行政法规，规范国有土地上房屋征收与补偿活动，维护公共利益。',
    parentId: 'administrative-regulation', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-004', targetName: '违法建设治理', confidence: 0.85, sourceLaw: '《房屋征收与补偿条例》' }],
    sourceLaw: '《国有土地上房屋征收与补偿条例》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-018', name: '无证无照经营查处办法', code: 'UM-Legal-018', level: 3, domain: '法律法规体系',
    definition: '国务院颁布的行政法规，维护社会主义市场经济秩序，促进公平竞争。',
    parentId: 'administrative-regulation', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-007', targetName: '市场监管协管', confidence: 0.95, sourceLaw: '《无证无照经营查处办法》' }],
    sourceLaw: '《无证无照经营查处办法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
        // L2: DepartmentalRule
  {
    id: 'departmental-rule', name: '部门规章', code: 'UM-Legal-L3', level: 2, domain: '法律法规体系',
    definition: '由国务院各部、委员会、中国人民银行、审计署和具有行政管理职能的直属机构制定的规章。',
    parentId: 'legal-norm-system', childrenIds: ['legal-022','legal-023','legal-024','legal-025','legal-026','legal-027'],
    relations: [], sourceLaw: null,
    properties: { category: 'subcategory' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-022', name: '城市管理执法办法', code: 'UM-Legal-022', level: 3, domain: '法律法规体系',
    definition: '住房和城乡建设部发布的部门规章，规范城市管理执法活动，提高执法和服务水平。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-scene', targetName: '执法场景', confidence: 0.95, sourceLaw: '《城市管理执法办法》' }],
    sourceLaw: '《城市管理执法办法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-023', name: '城市管理执法行为规范', code: 'UM-Legal-023', level: 3, domain: '法律法规体系',
    definition: '住房和城乡建设部发布的部门规章，规范城市管理执法人员行为，推进严格规范公正文明执法。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'administrative-subject', targetName: '行政主体', confidence: 0.90, sourceLaw: '《城市管理执法行为规范》' }],
    sourceLaw: '《城市管理执法行为规范》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-024', name: '城市公园管理办法', code: 'UM-Legal-024', level: 3, domain: '法律法规体系',
    definition: '住房和城乡建设部发布的部门规章，加强城市公园管理，促进公园事业健康发展。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-002', targetName: '园林绿化管理', confidence: 0.92, sourceLaw: '《城市公园管理办法》' }],
    sourceLaw: '《城市公园管理办法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-025', name: '城市生活垃圾管理办法', code: 'UM-Legal-025', level: 3, domain: '法律法规体系',
    definition: '住房和城乡建设部发布的部门规章，加强城市生活垃圾管理，改善城市环境。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.93, sourceLaw: '《城市生活垃圾管理办法》' }],
    sourceLaw: '《城市生活垃圾管理办法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-026', name: '执法制式服装和标志标识管理办法', code: 'UM-Legal-026', level: 3, domain: '法律法规体系',
    definition: '财政部、司法部等发布的部门规章，加强综合行政执法制式服装和标志管理。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'administrative-subject', targetName: '行政主体', confidence: 0.75, sourceLaw: '《执法制式服装和标志标识管理办法》' }],
    sourceLaw: '《城市管理执法制式服装和标志标识管理办法》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-027', name: '行政处罚程序规定', code: 'UM-Legal-027', level: 3, domain: '法律法规体系',
    definition: '住房和城乡建设部发布的部门规章，规范城市管理行政处罚程序。',
    parentId: 'departmental-rule', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-procedure', targetName: '执法程序', confidence: 0.95, sourceLaw: '《行政处罚程序规定》' }],
    sourceLaw: '《住房和城乡建设行政处罚程序规定》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  // L2: TechnicalStandard
  {
    id: 'technical-standard', name: '技术标准', code: 'UM-Legal-L4', level: 2, domain: '法律法规体系',
    definition: '在城市管理领域施行的国家标准和行业标准，为执法提供技术依据。',
    parentId: 'legal-norm-system', childrenIds: ['legal-028','legal-029','legal-030','legal-031','legal-032','legal-033','legal-034','legal-035'],
    relations: [], sourceLaw: null,
    properties: { category: 'subcategory' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-028', name: '数字化城市管理信息系统', code: 'UM-Legal-028', level: 3, domain: '法律法规体系',
    definition: '国家标准GB/T 30428，规范数字化城市管理信息系统的建设、运行和数据管理。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-scene', targetName: '执法场景', confidence: 0.85, sourceLaw: '《数字化城市管理信息系统》' }],
    sourceLaw: '《GB/T 30428.2-2013 数字化城市管理信息系统 第2部分：管理部件》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-029', name: '城市容貌标准', code: 'UM-Legal-029', level: 3, domain: '法律法规体系',
    definition: '国家标准GB/T 30953，规定城市容貌的术语和定义、评价指标和要求。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.92, sourceLaw: '《城市容貌标准》' }],
    sourceLaw: '《城市容貌标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-030', name: '道路清扫保洁与质量评价标准', code: 'UM-Legal-030', level: 3, domain: '法律法规体系',
    definition: '行业标准CJJ/T 126，规范城市道路清扫保洁作业及其质量评价。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.90, sourceLaw: '《道路清扫保洁与质量评价标准》' }],
    sourceLaw: '《城市道路清扫保洁与质量评价标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-031', name: '生活垃圾分类收集设施配置规范', code: 'UM-Legal-031', level: 3, domain: '法律法规体系',
    definition: '地方标准，规范生活垃圾分类收集设施的配置要求和管理。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.88, sourceLaw: '《生活垃圾分类收集设施配置规范》' }],
    sourceLaw: '《城市生活垃圾分类收集设施配置规范》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-032', name: '城市运行管理服务平台 第2部分', code: 'UM-Legal-032', level: 3, domain: '法律法规体系',
    definition: '国家标准GB/T 30428.2，规范城市运行管理服务平台的数据交换和共享。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-scene', targetName: '执法场景', confidence: 0.82, sourceLaw: '《城市运行管理服务平台标准》' }],
    sourceLaw: '《城市运行管理服务平台 管理监督指标及评价标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-033', name: '环境卫生设施设置标准', code: 'UM-Legal-033', level: 3, domain: '法律法规体系',
    definition: '行业标准CJJ 27，规范环境卫生设施的设置原则、要求和标准。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.88, sourceLaw: '《环境卫生设施设置标准》' }],
    sourceLaw: '《环境卫生设施设置标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-034', name: '生活垃圾焚烧污染控制标准', code: 'UM-Legal-034', level: 3, domain: '法律法规体系',
    definition: '国家标准GB 18485，规定生活垃圾焚烧厂的污染物排放限值和监测要求。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'viol-006', targetName: '垃圾违规处置', confidence: 0.85, sourceLaw: '《生活垃圾焚烧污染控制标准》' }],
    sourceLaw: '《生活垃圾焚烧污染控制标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'legal-035', name: '城市运行管理服务平台 管理监督指标及评价标准', code: 'UM-Legal-035', level: 3, domain: '法律法规体系',
    definition: '国家标准，规范城市运行管理服务的评价指标和方法。',
    parentId: 'technical-standard', childrenIds: [],
    relations: [{ type: 'applies-to', targetId: 'enforcement-scene', targetName: '执法场景', confidence: 0.80, sourceLaw: '《城市运行管理服务评价标准》' }],
    sourceLaw: '《城市运行管理服务平台 管理监督指标及评价标准》',
    properties: { effectiveDate: '', status: '' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },

  // ========== 执法场景 children (7 L2) ==========
  {
    id: 'scene-001', name: '市容环境卫生管理', code: 'UM-Scene-001', level: 2, domain: '执法场景',
    definition: '对城市道路、公共场所、建筑物外立面、户外广告、环境卫生、垃圾清运等方面的管理执法。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-001', targetName: '占道经营违规', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-002', targetName: '违法设置户外广告', confidence: 0.93 },
      { type: 'has-violation', targetId: 'viol-012', targetName: '出店经营违规', confidence: 0.93 },
      { type: 'has-violation', targetId: 'viol-013', targetName: '乱堆乱放', confidence: 0.92 },
      { type: 'has-violation', targetId: 'viol-014', targetName: '乱贴乱画', confidence: 0.90 },
      { type: 'has-violation', targetId: 'viol-015', targetName: '运输车辆沿途遗撒', confidence: 0.90 },
      { type: 'has-violation', targetId: 'viol-016', targetName: '损坏环境卫生设施', confidence: 0.90 },
      { type: 'has-violation', targetId: 'viol-006', targetName: '垃圾违规处置', confidence: 0.92 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.95 },
      { type: 'is-regulated-by', targetId: 'legal-014', targetName: '城市市容和环境卫生管理条例', confidence: 0.98 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-002', name: '园林绿化管理', code: 'UM-Scene-002', level: 2, domain: '执法场景',
    definition: '对城市绿地、树木、古树名木、公园等园林绿化资源的保护和管理执法。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-004', targetName: '破坏城市绿地', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-017', targetName: '擅自占用城市绿地', confidence: 0.94 },
      { type: 'has-violation', targetId: 'viol-018', targetName: '擅自砍伐迁移树木', confidence: 0.94 },
      { type: 'has-violation', targetId: 'viol-019', targetName: '损坏古树名木', confidence: 0.90 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.90 },
      { type: 'is-regulated-by', targetId: 'legal-015', targetName: '城市绿化条例', confidence: 0.97 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-003', name: '市政设施管理', code: 'UM-Scene-003', level: 2, domain: '执法场景',
    definition: '对城市道路占用挖掘、桥梁管线、照明设施、排水设施等市政基础设施的管理。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-005', targetName: '城市道路违规', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-005-001', targetName: '擅自占用道路', confidence: 0.94 },
      { type: 'has-violation', targetId: 'viol-005-002', targetName: '擅自挖掘道路', confidence: 0.94 },
      { type: 'has-violation', targetId: 'viol-020', targetName: '损坏城市道路设施', confidence: 0.92 },
      { type: 'has-violation', targetId: 'viol-021', targetName: '擅自依附道路设施搭建管线', confidence: 0.88 },
      { type: 'has-violation', targetId: 'viol-022', targetName: '未按规定恢复城市道路', confidence: 0.90 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.92 },
      { type: 'is-regulated-by', targetId: 'legal-016', targetName: '城市道路管理条例', confidence: 0.97 },
    ],
    sourceLaw: '《城市道路管理条例》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-004', name: '违法建设治理', code: 'UM-Scene-004', level: 2, domain: '执法场景',
    definition: '对违法建设行为的查处、临时建筑管理和规划核实等执法活动。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-003', targetName: '违法建设', confidence: 0.98 },
      { type: 'has-violation', targetId: 'viol-003-001', targetName: '未批先建', confidence: 0.96 },
      { type: 'has-violation', targetId: 'viol-003-002', targetName: '超期临建', confidence: 0.94 },
      { type: 'has-violation', targetId: 'viol-023', targetName: '未按规划许可内容建设', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-024', targetName: '擅自改变临时建设用途', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.95 },
      { type: 'is-regulated-by', targetId: 'legal-007', targetName: '城乡规划法', confidence: 0.98 },
    ],
    sourceLaw: '《城乡规划法》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-005', name: '环境保护执法', code: 'UM-Scene-005', level: 2, domain: '执法场景',
    definition: '对大气污染、噪声污染、固废污染等环境违法行为的执法活动。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-007', targetName: '餐饮油烟超标', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-008', targetName: '露天焚烧', confidence: 0.92 },
      { type: 'has-violation', targetId: 'viol-009', targetName: '噪声超标扰民', confidence: 0.93 },
      { type: 'has-violation', targetId: 'viol-025', targetName: '施工扬尘污染', confidence: 0.90 },
      { type: 'has-violation', targetId: 'viol-026', targetName: '向水体倾倒废弃物', confidence: 0.88 },
      { type: 'has-violation', targetId: 'viol-027', targetName: '固体废物露天堆放', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-005', targetName: '生态环境部门', confidence: 0.90 },
      { type: 'is-regulated-by', targetId: 'legal-008', targetName: '环境保护法', confidence: 0.95 },
    ],
    sourceLaw: '《环境保护法》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-006', name: '交通秩序管理', code: 'UM-Scene-006', level: 2, domain: '执法场景',
    definition: '对占道停车、非机动车停放、非法营运等交通秩序的协管执法。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-010', targetName: '车辆违规停放', confidence: 0.93 },
      { type: 'has-violation', targetId: 'viol-028', targetName: '非机动车乱停放', confidence: 0.92 },
      { type: 'has-violation', targetId: 'viol-029', targetName: '占用停车泊位堆物', confidence: 0.88 },
      { type: 'has-violation', targetId: 'viol-030', targetName: '占用盲道消防通道', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', confidence: 0.88 },
      { type: 'is-regulated-by', targetId: 'legal-012', targetName: '道路交通安全法', confidence: 0.88 },
    ],
    sourceLaw: '《道路交通安全法》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'scene-007', name: '市场监管协管', code: 'UM-Scene-007', level: 2, domain: '执法场景',
    definition: '对无证无照经营、流动摊贩等市场秩序的协助管理和执法。',
    parentId: 'enforcement-scene', childrenIds: [],
    relations: [
      { type: 'has-violation', targetId: 'viol-011', targetName: '无证无照经营', confidence: 0.95 },
      { type: 'has-violation', targetId: 'viol-031', targetName: '流动摊贩无照经营', confidence: 0.92 },
      { type: 'has-violation', targetId: 'viol-032', targetName: '占道促销经营', confidence: 0.88 },
      { type: 'has-violation', targetId: 'viol-001', targetName: '占道经营违规', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.88 },
      { type: 'is-regulated-by', targetId: 'legal-018', targetName: '无证无照经营查处办法', confidence: 0.95 },
    ],
    sourceLaw: '《无证无照经营查处办法》',
    properties: { category: 'scene' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },

  // ========== 行政行为 children (4 L2 + L3) ==========
  {
    id: 'action-001', name: '行政处罚', code: 'UM-Action-001', level: 2, domain: '行政行为',
    definition: '行政机关依法对违反行政管理秩序的公民、法人或者其他组织，以减损权益或者增加义务的方式予以惩戒的行为。',
    parentId: 'administrative-action', childrenIds: ['action-001-001','action-001-002','action-001-003','action-001-004','action-001-005'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-001', targetName: '立案', confidence: 0.95 },
      { type: 'has-procedure', targetId: 'proc-002', targetName: '调查取证', confidence: 0.95 },
      { type: 'has-procedure', targetId: 'proc-003', targetName: '告知陈述申辩', confidence: 0.95 },
      { type: 'has-procedure', targetId: 'proc-005', targetName: '作出决定', confidence: 0.95 },
      { type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.99 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-001-001', name: '警告', code: 'UM-Action-001-001', level: 3, domain: '行政行为', definition: '对违法行为人进行谴责和告诫的申诫罚，是最轻的行政处罚形式。', parentId: 'action-001', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.99 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-001-002', name: '罚款', code: 'UM-Action-001-002', level: 3, domain: '行政行为', definition: '强制违法行为人在一定期限内向国家缴纳一定数量货币的财产罚。', parentId: 'action-001', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.99 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-001-003', name: '没收违法所得', code: 'UM-Action-001-003', level: 3, domain: '行政行为', definition: '将违法行为人通过违法途径和方法取得的财产收归国有的财产罚。', parentId: 'action-001', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-003', targetName: '没收违法所得财物', confidence: 0.99 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-001-004', name: '责令停产停业', code: 'UM-Action-001-004', level: 3, domain: '行政行为', definition: '强制命令违法行为人暂时停止生产经营活动的行为罚。', parentId: 'action-001', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-004', targetName: '责令停产停业', confidence: 0.99 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-001-005', name: '暂扣吊销许可证', code: 'UM-Action-001-005', level: 3, domain: '行政行为', definition: '暂时扣留或撤销违法行为人从事某种活动的资格证书或许可文件的能力罚。', parentId: 'action-001', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-005', targetName: '暂扣吊销许可证', confidence: 0.99 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-002', name: '行政强制', code: 'UM-Action-002', level: 2, domain: '行政行为',
    definition: '行政机关在行政管理过程中，为制止违法行为、防止证据损毁、避免危害发生、控制危险扩大等情形，依法对公民的人身自由实施暂时性限制，或者对公民、法人或者其他组织的财物实施暂时性控制的行为。',
    parentId: 'administrative-action', childrenIds: ['action-002-001','action-002-002','action-002-003','action-002-004'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-002', targetName: '调查取证', confidence: 0.92 },
      { type: 'has-procedure', targetId: 'proc-007', targetName: '送达执行', confidence: 0.95 },
      { type: 'is-regulated-by', targetId: 'legal-003', targetName: '行政强制法', confidence: 0.99 },
    ],
    sourceLaw: '《行政强制法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-002-001', name: '查封场所设施财物', code: 'UM-Action-002-001', level: 3, domain: '行政行为', definition: '对涉案的场所、设施或者财物加贴封条，就地封存，禁止转移和处分的强制措施。', parentId: 'action-002', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-006', targetName: '查封扣押', confidence: 0.98 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-002-002', name: '扣押财物', code: 'UM-Action-002-002', level: 3, domain: '行政行为', definition: '将涉案财物转移至法定地点进行保管，禁止处分的强制措施。', parentId: 'action-002', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-006', targetName: '查封扣押', confidence: 0.98 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-002-003', name: '代履行', code: 'UM-Action-002-003', level: 3, domain: '行政行为', definition: '行政机关依法作出要求当事人履行排除妨碍、恢复原状等义务的行政决定，当事人逾期不履行，行政机关或者第三人代为履行，并向当事人收取代履行费用的强制执行方式。', parentId: 'action-002', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-007', targetName: '代履行', confidence: 0.98 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-002-004', name: '加处罚款滞纳金', code: 'UM-Action-002-004', level: 3, domain: '行政行为', definition: '对逾期不履行金钱给付义务的当事人，每日按一定比例加处罚款或滞纳金的执行罚措施。', parentId: 'action-002', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-003', name: '行政许可', code: 'UM-Action-003', level: 2, domain: '行政行为',
    definition: '行政机关根据公民、法人或者其他组织的申请，经依法审查，准予其从事特定活动的行为。',
    parentId: 'administrative-action', childrenIds: ['action-003-001','action-003-002','action-003-003','action-003-004'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-001', targetName: '立案', confidence: 0.85 },
      { type: 'is-regulated-by', targetId: 'legal-006', targetName: '行政许可法', confidence: 0.95 },
    ],
    sourceLaw: '《行政许可法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-003-001', name: '占道许可', code: 'UM-Action-003-001', level: 3, domain: '行政行为', definition: '准许单位和个人临时占用城市道路的行政许可。', parentId: 'action-003', childrenIds: [], relations: [], sourceLaw: '《城市道路管理条例》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-003-002', name: '户外广告许可', code: 'UM-Action-003-002', level: 3, domain: '行政行为', definition: '准许单位和个人设置户外广告的行政许可。', parentId: 'action-003', childrenIds: [], relations: [], sourceLaw: '《城市市容和环境卫生管理条例》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-003-003', name: '临时搭建许可', code: 'UM-Action-003-003', level: 3, domain: '行政行为', definition: '准许单位和个人临时搭建建筑物、构筑物或其他设施的行政许可。', parentId: 'action-003', childrenIds: [], relations: [], sourceLaw: '《城乡规划法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-003-004', name: '挖掘道路许可', code: 'UM-Action-003-004', level: 3, domain: '行政行为', definition: '准许单位和个人挖掘城市道路的行政许可。', parentId: 'action-003', childrenIds: [], relations: [], sourceLaw: '《城市道路管理条例》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-004', name: '行政检查', code: 'UM-Action-004', level: 2, domain: '行政行为',
    definition: '行政机关依法对公民、法人或者其他组织遵守法律、法规、规章情况进行的检查监督活动。',
    parentId: 'administrative-action', childrenIds: ['action-004-001','action-004-002','action-004-003'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-002', targetName: '调查取证', confidence: 0.90 },
      { type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.85 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-004-001', name: '日常巡查', code: 'UM-Action-004-001', level: 3, domain: '行政行为', definition: '执法人员按照既定路线和时间对管辖区域进行的常规巡视检查。', parentId: 'action-004', childrenIds: [], relations: [], sourceLaw: '《城市管理执法办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-004-002', name: '专项检查', code: 'UM-Action-004-002', level: 3, domain: '行政行为', definition: '针对特定领域、特定问题或特定时段开展的专门检查活动。', parentId: 'action-004', childrenIds: [], relations: [], sourceLaw: '《城市管理执法办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-004-003', name: '联合检查', code: 'UM-Action-004-003', level: 3, domain: '行政行为', definition: '两个或以上执法部门联合开展的检查活动。', parentId: 'action-004', childrenIds: [], relations: [{ type: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', confidence: 0.85 }], sourceLaw: '《城市管理执法办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-005', name: '责令改正', code: 'UM-Action-005', level: 2, domain: '行政行为',
    definition: '行政机关责令违法行为人在规定期限内停止违法行为、恢复合法状态或采取补救措施的执法行为。',
    parentId: 'administrative-action', childrenIds: ['action-005-001','action-005-002'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-012', targetName: '责令改正', confidence: 0.96 },
      { type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.90 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-005-001', name: '责令限期改正', code: 'UM-Action-005-001', level: 3, domain: '行政行为', definition: '要求当事人在明确期限内完成拆除、清理、整改、恢复原状等改正义务。', parentId: 'action-005', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-008', targetName: '责令限期改正', confidence: 0.95 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-005-002', name: '责令停止违法行为', code: 'UM-Action-005-002', level: 3, domain: '行政行为', definition: '要求违法行为人立即停止占用、施工、排放、经营等正在发生的违法行为。', parentId: 'action-005', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-011', targetName: '责令停止违法行为', confidence: 0.95 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-006', name: '行政告知', code: 'UM-Action-006', level: 2, domain: '行政行为',
    definition: '行政机关在作出处理决定前后依法告知当事人事实、理由、依据、权利义务和救济途径的程序性行为。',
    parentId: 'administrative-action', childrenIds: ['action-006-001','action-006-002'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-003', targetName: '告知陈述申辩', confidence: 0.96 },
      { type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.96 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-006-001', name: '处罚事先告知', code: 'UM-Action-006-001', level: 3, domain: '行政行为', definition: '作出行政处罚决定前告知拟处罚内容及事实、理由、依据和陈述申辩权。', parentId: 'action-006', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-003', targetName: '告知陈述申辩', confidence: 0.98 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-006-002', name: '听证告知', code: 'UM-Action-006-002', level: 3, domain: '行政行为', definition: '对较大数额罚款、责令停产停业、吊销许可证等事项告知当事人依法享有听证权利。', parentId: 'action-006', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-004', targetName: '听证', confidence: 0.96 }], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'action-007', name: '行政协助', code: 'UM-Action-007', level: 2, domain: '行政行为',
    definition: '城管部门与规划、住建、公安、市场监管、生态环境等部门围绕案件线索、专业认定和联合处置开展的协同执法行为。',
    parentId: 'administrative-action', childrenIds: ['action-007-001','action-007-002'],
    relations: [
      { type: 'has-procedure', targetId: 'proc-015', targetName: '案件移送', confidence: 0.92 },
      { type: 'is-regulated-by', targetId: 'legal-022', targetName: '城市管理执法办法', confidence: 0.90 },
    ],
    sourceLaw: '《城市管理执法办法》',
    properties: { category: 'action' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'action-007-001', name: '联合执法协助', code: 'UM-Action-007-001', level: 3, domain: '行政行为', definition: '多个行政机关根据职责分工，对同一违法线索开展联合检查、联合处置或专业协查。', parentId: 'action-007', childrenIds: [], relations: [{ type: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', confidence: 0.85 }], sourceLaw: '《城市管理执法办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'action-007-002', name: '案件移送协助', code: 'UM-Action-007-002', level: 3, domain: '行政行为', definition: '对不属于本机关管辖或涉嫌其他违法犯罪的案件，依法移送有管辖权机关处理。', parentId: 'action-007', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-015', targetName: '案件移送', confidence: 0.94 }], sourceLaw: '《城市管理执法办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },

  // ========== 违法类型 children (11 L2 + some L3) ==========
  {
    id: 'viol-001', name: '占道经营违规', code: 'UM-Viol-001', level: 2, domain: '违法类型',
    definition: '单位和个人未经批准，擅自占用城市道路、桥梁、广场等公共场所从事经营活动的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.90 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 },
      { type: 'is-targeted-at', targetId: 'tgt-001', targetName: '自然人', confidence: 0.92 },
      { type: 'is-targeted-at', targetId: 'tgt-002', targetName: '法人', confidence: 0.85 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-002', name: '违法设置户外广告', code: 'UM-Viol-002', level: 2, domain: '违法类型',
    definition: '未经审批擅自设置户外广告，或设置的户外广告不符合城市容貌标准和安全规范的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.85 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-003', name: '违法建设', code: 'UM-Viol-003', level: 2, domain: '违法类型',
    definition: '未取得建设工程规划许可证或者未按照建设工程规划许可证的规定进行建设的行为。',
    parentId: 'violation-type', childrenIds: ['viol-003-001','viol-003-002'],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.95 },
      { type: 'has-penalty', targetId: 'pen-004', targetName: '责令停产停业', confidence: 0.88 },
      { type: 'has-penalty', targetId: 'pen-006', targetName: '查封扣押', confidence: 0.90 },
      { type: 'has-penalty', targetId: 'pen-009', targetName: '限期拆除', confidence: 0.96 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-011', targetName: '规划许可材料', confidence: 0.94 },
      { type: 'is-targeted-at', targetId: 'tgt-006', targetName: '建设单位', confidence: 0.90 },
      { type: 'is-enforced-by', targetId: 'subj-007', targetName: '自然资源和规划主管部门', confidence: 0.86 },
    ],
    sourceLaw: '《城乡规划法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'viol-003-001', name: '未批先建', code: 'UM-Viol-003-001', level: 3, domain: '违法类型', definition: '在未取得建设工程规划许可证的情况下擅自开工建设的行为。', parentId: 'viol-003', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.95 }], sourceLaw: '《城乡规划法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-003-002', name: '超期临建', code: 'UM-Viol-003-002', level: 3, domain: '违法类型', definition: '临时建筑超过批准期限仍未拆除的行为。', parentId: 'viol-003', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 }], sourceLaw: '《城乡规划法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'viol-004', name: '破坏城市绿地', code: 'UM-Viol-004', level: 2, domain: '违法类型',
    definition: '擅自占用城市绿地、砍伐树木、破坏绿化设施等损害城市绿化的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 },
      { type: 'has-penalty', targetId: 'pen-010', targetName: '恢复原状', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-013', targetName: '现场勘验图', confidence: 0.86 },
      { type: 'is-enforced-by', targetId: 'subj-010', targetName: '园林绿化主管部门', confidence: 0.92 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-005', name: '城市道路违规', code: 'UM-Viol-005', level: 2, domain: '违法类型',
    definition: '擅自占用、挖掘城市道路，或在城市道路范围内进行损害道路设施的活动。',
    parentId: 'violation-type', childrenIds: ['viol-005-001','viol-005-002'],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'has-penalty', targetId: 'pen-010', targetName: '恢复原状', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-013', targetName: '现场勘验图', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-006', targetName: '住房和城乡建设主管部门', confidence: 0.84 },
    ],
    sourceLaw: '《城市道路管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'viol-005-001', name: '擅自占用道路', code: 'UM-Viol-005-001', level: 3, domain: '违法类型', definition: '未经批准擅自占用城市道路堆放物料、搭建构筑物或停放车辆的行为。', parentId: 'viol-005', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 }], sourceLaw: '《城市道路管理条例》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-005-002', name: '擅自挖掘道路', code: 'UM-Viol-005-002', level: 3, domain: '违法类型', definition: '未经批准擅自挖掘城市道路铺设管线或进行其他施工的行为。', parentId: 'viol-005', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 }], sourceLaw: '《城市道路管理条例》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'viol-006', name: '垃圾违规处置', code: 'UM-Viol-006', level: 2, domain: '违法类型',
    definition: '未按规定分类投放、收集、运输、处置生活垃圾、建筑垃圾或餐厨垃圾的行为。',
    parentId: 'violation-type', childrenIds: ['viol-006-001','viol-006-002','viol-006-003'],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.85 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'has-penalty', targetId: 'pen-012', targetName: '责令清除清理', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
      { type: 'is-enforced-by', targetId: 'subj-011', targetName: '环境卫生主管部门', confidence: 0.88 },
    ],
    sourceLaw: '《城市生活垃圾管理办法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'viol-006-001', name: '生活垃圾违规', code: 'UM-Viol-006-001', level: 3, domain: '违法类型', definition: '未按规定分类投放、收集或运输生活垃圾的行为。', parentId: 'viol-006', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 }], sourceLaw: '《城市生活垃圾管理办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-006-002', name: '建筑垃圾违规', code: 'UM-Viol-006-002', level: 3, domain: '违法类型', definition: '未按规定处置建筑垃圾，随意倾倒、堆放或运输建筑垃圾的行为。', parentId: 'viol-006', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 }], sourceLaw: '《固体废物污染环境防治法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-006-003', name: '餐厨垃圾违规', code: 'UM-Viol-006-003', level: 3, domain: '违法类型', definition: '未按规定收集、运输、处置餐厨垃圾，或将餐厨垃圾排入下水道的违规行为。', parentId: 'viol-006', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 }], sourceLaw: '《城市生活垃圾管理办法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'viol-007', name: '餐饮油烟超标', code: 'UM-Viol-007', level: 2, domain: '违法类型',
    definition: '餐饮服务业经营者排放油烟超过国家规定的排放标准，或未安装油烟净化设施的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'has-penalty', targetId: 'pen-004', targetName: '责令停产停业', confidence: 0.85 },
      { type: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-010', targetName: '检测报告', confidence: 0.96 },
      { type: 'is-enforced-by', targetId: 'subj-005', targetName: '生态环境部门', confidence: 0.88 },
      { type: 'is-targeted-at', targetId: 'tgt-008', targetName: '餐饮经营者', confidence: 0.94 },
    ],
    sourceLaw: '《大气污染防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-008', name: '露天焚烧', code: 'UM-Viol-008', level: 2, domain: '违法类型',
    definition: '在露天场所焚烧秸秆、落叶、垃圾等产生烟尘污染的物质的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.88 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.95 },
    ],
    sourceLaw: '《大气污染防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-009', name: '噪声超标扰民', code: 'UM-Viol-009', level: 2, domain: '违法类型',
    definition: '在商业经营、建筑施工和社会生活中产生超过国家规定环境噪声排放标准的噪声，干扰他人正常生活的行为。',
    parentId: 'violation-type', childrenIds: ['viol-009-001','viol-009-002','viol-009-003'],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.88 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', confidence: 0.90 },
    ],
    sourceLaw: '《噪声污染防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'viol-009-001', name: '商业噪声', code: 'UM-Viol-009-001', level: 3, domain: '违法类型', definition: '商业经营活动中使用高音喇叭或产生高噪声设备，干扰周围居民生活的行为。', parentId: 'viol-009', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 }], sourceLaw: '《噪声污染防治法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-009-002', name: '施工噪声', code: 'UM-Viol-009-002', level: 3, domain: '违法类型', definition: '建筑施工过程中产生超过规定标准的噪声，或未在规定时段施工的行为。', parentId: 'viol-009', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.92 }], sourceLaw: '《噪声污染防治法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'viol-009-003', name: '社会生活噪声', code: 'UM-Viol-009-003', level: 3, domain: '违法类型', definition: '在公共场所组织娱乐、集会等活动产生过大音量，或在家中产生噪声干扰他人的行为。', parentId: 'viol-009', childrenIds: [], relations: [{ type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.88 }], sourceLaw: '《噪声污染防治法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'viol-010', name: '车辆违规停放', code: 'UM-Viol-010', level: 2, domain: '违法类型',
    definition: '机动车、非机动车未按规定停放在指定区域，占用人行道、消防通道、盲道等的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.85 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', confidence: 0.85 },
    ],
    sourceLaw: '《道路交通安全法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-011', name: '无证无照经营', code: 'UM-Viol-011', level: 2, domain: '违法类型',
    definition: '经营者未依法取得营业执照或许可证擅自从事经营活动的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'has-penalty', targetId: 'pen-003', targetName: '没收违法所得财物', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.92 },
    ],
    sourceLaw: '《无证无照经营查处办法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-012', name: '出店经营违规', code: 'UM-Viol-012', level: 2, domain: '违法类型',
    definition: '沿街商铺、餐饮门店等经营主体超出店内经营边界，在门前、人行道、公共通道摆放商品、桌椅或从事经营活动的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.86 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.91 },
      { type: 'has-penalty', targetId: 'pen-008', targetName: '责令限期改正', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.90 },
      { type: 'is-targeted-at', targetId: 'tgt-005', targetName: '沿街商户', confidence: 0.94 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-013', name: '乱堆乱放', code: 'UM-Viol-013', level: 2, domain: '违法类型',
    definition: '在道路、广场、绿地、楼道周边等公共区域擅自堆放物料、杂物、废弃物，影响市容秩序和通行安全的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.85 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-014', name: '乱贴乱画', code: 'UM-Viol-014', level: 2, domain: '违法类型',
    definition: '在建筑物、构筑物、公共设施、树木、墙体等载体上擅自张贴、刻画、涂写宣传品或小广告的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.84 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.92 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-015', name: '运输车辆沿途遗撒', code: 'UM-Viol-015', level: 2, domain: '违法类型',
    definition: '运输砂石、渣土、垃圾、流体物料等车辆未采取密闭覆盖措施，造成沿途泄漏、遗撒、污染道路的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.92 },
      { type: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', confidence: 0.86 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-016', name: '损坏环境卫生设施', code: 'UM-Viol-016', level: 2, domain: '违法类型',
    definition: '擅自拆除、迁移、占用、损坏公共厕所、垃圾收集容器、垃圾转运设施等环境卫生设施的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-004', targetName: '物证', confidence: 0.86 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-017', name: '擅自占用城市绿地', code: 'UM-Viol-017', level: 2, domain: '违法类型',
    definition: '未经批准占用城市绿地、绿化带、草坪、花坛等绿化用地，或改变绿化用地用途的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-018', name: '擅自砍伐迁移树木', code: 'UM-Viol-018', level: 2, domain: '违法类型',
    definition: '未经城市绿化主管部门批准，擅自砍伐、迁移、修剪城市树木，影响城市绿化资源的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.93 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.90 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-019', name: '损坏古树名木', code: 'UM-Viol-019', level: 2, domain: '违法类型',
    definition: '损伤、砍伐、迁移、买卖古树名木，或破坏古树名木保护设施和生长环境的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', confidence: 0.86 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-020', name: '损坏城市道路设施', code: 'UM-Viol-020', level: 2, domain: '违法类型',
    definition: '损坏城市道路、桥涵、路灯、护栏、井盖、排水等市政道路附属设施的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.91 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《城市道路管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-021', name: '擅自依附道路设施搭建管线', code: 'UM-Viol-021', level: 2, domain: '违法类型',
    definition: '未经批准依附城市道路、桥梁、杆体、管线等市政设施架设管线、搭建设施或者悬挂物品的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《城市道路管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-022', name: '未按规定恢复城市道路', code: 'UM-Viol-022', level: 2, domain: '违法类型',
    definition: '经批准挖掘、占用城市道路后，未按规定期限、质量标准恢复道路原状或清理现场的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《城市道路管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-023', name: '未按规划许可内容建设', code: 'UM-Viol-023', level: 2, domain: '违法类型',
    definition: '虽取得建设工程规划许可，但未按照许可的位置、面积、高度、用途、外立面等内容进行建设的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.94 },
      { type: 'has-penalty', targetId: 'pen-004', targetName: '责令停产停业', confidence: 0.86 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.92 },
    ],
    sourceLaw: '《城乡规划法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-024', name: '擅自改变临时建设用途', code: 'UM-Viol-024', level: 2, domain: '违法类型',
    definition: '临时建设未按批准内容使用，擅自改变用途、规模、位置，或未按规定期限拆除的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《城乡规划法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-025', name: '施工扬尘污染', code: 'UM-Viol-025', level: 2, domain: '违法类型',
    definition: '施工工地未采取围挡、覆盖、洒水、冲洗等抑尘措施，造成扬尘污染的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《大气污染防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-026', name: '向水体倾倒废弃物', code: 'UM-Viol-026', level: 2, domain: '违法类型',
    definition: '向城市河道、湖泊、排水沟渠等水体倾倒垃圾、渣土、废弃物或者排放污染物的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《固体废物污染环境防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-027', name: '固体废物露天堆放', code: 'UM-Viol-027', level: 2, domain: '违法类型',
    definition: '在城市公共区域、施工场地、空旷区域等场所露天堆放、倾倒、遗撒固体废物，影响环境卫生和生态环境的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《固体废物污染环境防治法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-028', name: '非机动车乱停放', code: 'UM-Viol-028', level: 2, domain: '违法类型',
    definition: '非机动车、共享单车未在规定区域停放，占用人行道、盲道、出入口、消防通道等公共通行空间的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.84 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.86 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《道路交通安全法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-029', name: '占用停车泊位堆物', code: 'UM-Viol-029', level: 2, domain: '违法类型',
    definition: '在道路停车泊位、非机动车停放区等交通附属空间堆放杂物、设置障碍物，妨碍车辆停放和道路秩序的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.82 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.84 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.86 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-030', name: '占用盲道消防通道', code: 'UM-Viol-030', level: 2, domain: '违法类型',
    definition: '车辆、摊点、杂物、设施等占用盲道、消防通道、应急通道，影响通行和公共安全的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.86 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
      { type: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', confidence: 0.82 },
    ],
    sourceLaw: '《道路交通安全法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-031', name: '流动摊贩无照经营', code: 'UM-Viol-031', level: 2, domain: '违法类型',
    definition: '流动摊贩未依法取得营业执照或相关许可，在道路、广场、学校周边等区域从事经营活动的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.90 },
      { type: 'has-penalty', targetId: 'pen-003', targetName: '没收违法所得财物', confidence: 0.86 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《无证无照经营查处办法》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'viol-032', name: '占道促销经营', code: 'UM-Viol-032', level: 2, domain: '违法类型',
    definition: '商铺、市场主体未经批准在门前道路、人行道、广场等公共空间摆放促销物品、设置展台或开展促销活动的行为。',
    parentId: 'violation-type', childrenIds: [],
    relations: [
      { type: 'has-penalty', targetId: 'pen-001', targetName: '警告', confidence: 0.84 },
      { type: 'has-penalty', targetId: 'pen-002', targetName: '罚款', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'violation' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },

  // ========== 处罚类型 children (7 L2) ==========
  {
    id: 'pen-001', name: '警告', code: 'UM-Pen-001', level: 2, domain: '处罚类型',
    definition: '对违法行为人进行谴责和告诫的申诫罚，是最轻的行政处罚形式。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [{ type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-002', name: '罚款', code: 'UM-Pen-002', level: 2, domain: '处罚类型',
    definition: '强制违法行为人在一定期限内向国家缴纳一定数量货币的财产罚。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-002', targetName: '询问笔录', confidence: 0.88 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.85 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-003', name: '没收违法所得财物', code: 'UM-Pen-003', level: 2, domain: '处罚类型',
    definition: '将违法行为人通过违法途径和方法取得的财产以及用于违法行为的工具、物品收归国有。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-004', targetName: '物证', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-004', name: '责令停产停业', code: 'UM-Pen-004', level: 2, domain: '处罚类型',
    definition: '强制命令违法行为人暂时或永久停止生产经营活动的行为罚。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.93 },
      { type: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', confidence: 0.85 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-005', name: '暂扣吊销许可证', code: 'UM-Pen-005', level: 2, domain: '处罚类型',
    definition: '暂时扣留或永久撤销违法行为人从事某种活动的资格证书或许可文件的能力罚。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-006', targetName: '电子数据', confidence: 0.80 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-006', name: '查封扣押', code: 'UM-Pen-006', level: 2, domain: '处罚类型',
    definition: '行政强制措施，对涉案场所、设施或财物加贴封条就地封存，或转移至法定地点进行保管。',
    parentId: 'penalty-type', childrenIds: ['pen-006-001','pen-006-002'],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-004', targetName: '物证', confidence: 0.92 },
    ],
    sourceLaw: '《行政强制法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'pen-006-001', name: '查封场所设施', code: 'UM-Pen-006-001', level: 3, domain: '处罚类型', definition: '对涉案场所或设施加贴封条，就地封存，禁止使用和处分的强制措施。', parentId: 'pen-006', childrenIds: [], relations: [{ type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'pen-006-002', name: '扣押财物', code: 'UM-Pen-006-002', level: 3, domain: '处罚类型', definition: '将涉案财物转移至法定地点进行保管，禁止处分的强制措施。', parentId: 'pen-006', childrenIds: [], relations: [{ type: 'requires-evidence', targetId: 'evd-004', targetName: '物证', confidence: 0.92 }], sourceLaw: '《行政强制法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'pen-007', name: '代履行', code: 'UM-Pen-007', level: 2, domain: '处罚类型',
    definition: '行政机关或第三人代替不履行义务的当事人履行义务，并向当事人收取代履行费用的强制执行方式。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-002', targetName: '询问笔录', confidence: 0.85 },
    ],
    sourceLaw: '《行政强制法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-008', name: '责令限期改正', code: 'UM-Pen-008', level: 2, domain: '处罚类型',
    definition: '要求当事人在限定期限内纠正违法状态，常用于占道经营、乱堆乱放、广告设置、垃圾处置等可整改事项。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'has-procedure', targetId: 'proc-012', targetName: '责令改正', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-009', targetName: '责令改正文书', confidence: 0.92 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-009', name: '限期拆除', code: 'UM-Pen-009', level: 2, domain: '处罚类型',
    definition: '对违法建设、违法搭建、违规广告设施等要求当事人在规定期限内自行拆除的处理措施。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-011', targetName: '规划许可材料', confidence: 0.92 },
      { type: 'has-procedure', targetId: 'proc-013', targetName: '催告', confidence: 0.86 },
    ],
    sourceLaw: '《城乡规划法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-010', name: '恢复原状', code: 'UM-Pen-010', level: 2, domain: '处罚类型',
    definition: '要求当事人恢复被损坏或改变的绿地、道路、市政设施、环境卫生设施等原有状态。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-013', targetName: '现场勘验图', confidence: 0.90 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《城市绿化条例》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-011', name: '责令停止违法行为', code: 'UM-Pen-011', level: 2, domain: '处罚类型',
    definition: '要求违法行为人立即停止正在实施的违法施工、经营、排放、焚烧、占用等行为。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'has-procedure', targetId: 'proc-012', targetName: '责令改正', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.90 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'pen-012', name: '责令清除清理', code: 'UM-Pen-012', level: 2, domain: '处罚类型',
    definition: '要求当事人清除违法堆放物、遗撒物、废弃物、张贴物或占道物品，恢复公共空间秩序。',
    parentId: 'penalty-type', childrenIds: [],
    relations: [
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.92 },
      { type: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', confidence: 0.88 },
    ],
    sourceLaw: '《城市市容和环境卫生管理条例》',
    properties: { category: 'penalty' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },

  // ========== 证据类型 children (7 L2 + L3) ==========
  {
    id: 'evd-001', name: '现场笔录', code: 'UM-Evd-001', level: 2, domain: '证据类型',
    definition: '行政执法人员对违法行为现场进行检查、勘验时制作的文字记录，是行政执法中最基础、最常用的证据形式。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evd-002', name: '询问笔录', code: 'UM-Evd-002', level: 2, domain: '证据类型',
    definition: '行政执法人员对违法行为当事人、证人进行询问时制作的文字记录。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evd-003', name: '视听资料', code: 'UM-Evd-003', level: 2, domain: '证据类型',
    definition: '通过摄影、录音、录像等技术手段记录的声音、图像信息。',
    parentId: 'evidence-type', childrenIds: ['evd-003-001','evd-003-002','evd-003-003'],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'evd-003-001', name: '照片', code: 'UM-Evd-003-001', level: 3, domain: '证据类型', definition: '通过照相设备拍摄的静态图像，用于记录违法行为现场状况、物证外观等。', parentId: 'evd-003', childrenIds: [], relations: [], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-003-002', name: '视频', code: 'UM-Evd-003-002', level: 3, domain: '证据类型', definition: '通过摄像设备录制的动态影像，用于记录违法行为过程、执法过程等。', parentId: 'evd-003', childrenIds: [], relations: [], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-003-003', name: '录音', code: 'UM-Evd-003-003', level: 3, domain: '证据类型', definition: '通过录音设备记录的声音信息，用于记录当事人陈述、证人证言等。', parentId: 'evd-003', childrenIds: [], relations: [], sourceLaw: '《行政处罚法》', properties: {}, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  {
    id: 'evd-004', name: '物证', code: 'UM-Evd-004', level: 2, domain: '证据类型',
    definition: '能够以其存在形式、外部特征、内在属性证明违法行为真实情况的物品和痕迹。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evd-005', name: '鉴定意见', code: 'UM-Evd-005', level: 2, domain: '证据类型',
    definition: '具有法定鉴定资格的机构和人员就案件中的专门性问题进行鉴定后出具的书面意见。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evd-006', name: '电子数据', code: 'UM-Evd-006', level: 2, domain: '证据类型',
    definition: '以电子形式生成、发送、接收或存储的能够证明案件事实的信息，包括电子邮件、聊天记录、电子证照等。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'evd-007', name: '证人证言', code: 'UM-Evd-007', level: 2, domain: '证据类型',
    definition: '了解案件情况的非当事人就其所了解的案件事实向行政机关所作的陈述。',
    parentId: 'evidence-type', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'evd-008', name: '行政检查记录', code: 'UM-Evd-008', level: 2, domain: '证据类型', definition: '执法人员开展日常巡查、专项检查、联合检查时形成的检查情况记录。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-011', targetName: '现场勘验', confidence: 0.88 }], sourceLaw: '《城市管理执法办法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-009', name: '责令改正文书', code: 'UM-Evd-009', level: 2, domain: '证据类型', definition: '载明违法事实、整改要求、整改期限和法律依据的责令改正通知、整改通知等执法文书。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-012', targetName: '责令改正', confidence: 0.92 }], sourceLaw: '《行政处罚法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-010', name: '检测报告', code: 'UM-Evd-010', level: 2, domain: '证据类型', definition: '具有资质的检测或监测机构出具的噪声、油烟、扬尘、污染物排放等检测结论材料。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-009', targetName: '大气污染防治法', confidence: 0.88 }], sourceLaw: '《大气污染防治法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-011', name: '规划许可材料', code: 'UM-Evd-011', level: 2, domain: '证据类型', definition: '建设工程规划许可证、临时建设批准文件、规划核实意见等用于认定违法建设的许可材料。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-007', targetName: '城乡规划法', confidence: 0.95 }], sourceLaw: '《城乡规划法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-012', name: '送达回证', code: 'UM-Evd-012', level: 2, domain: '证据类型', definition: '证明行政执法文书已经依法送达当事人的签收、留置、邮寄、公告送达等回证材料。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-007', targetName: '送达执行', confidence: 0.95 }], sourceLaw: '《行政处罚法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-013', name: '现场勘验图', code: 'UM-Evd-013', level: 2, domain: '证据类型', definition: '对违法建设位置、道路占用范围、绿地损毁面积、设施损坏范围等进行标绘的现场图件。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'has-procedure', targetId: 'proc-011', targetName: '现场勘验', confidence: 0.92 }], sourceLaw: '《住房和城乡建设行政处罚程序规定》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'evd-014', name: '证据先行登记保存清单', code: 'UM-Evd-014', level: 2, domain: '证据类型', definition: '在证据可能灭失或以后难以取得时，对相关物品、资料依法登记保存形成的清单。', parentId: 'evidence-type', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.92 }], sourceLaw: '《行政处罚法》', properties: { category: 'evidence' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },

  // ========== 行政主体 children (5 L2) ==========
  {
    id: 'subj-001', name: '城市管理综合执法局', code: 'UM-Subj-001', level: 2, domain: '行政主体',
    definition: '依法独立行使城市管理领域相对集中行政处罚权的行政机关，是城管执法的主要责任主体。',
    parentId: 'administrative-subject', childrenIds: [],
    relations: [{ type: 'has-subject', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.95 }],
    sourceLaw: '《城市管理执法办法》',
    properties: { category: 'subject', role: '主要执法主体' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'subj-002', name: '城市管理行政执法支队', code: 'UM-Subj-002', level: 2, domain: '行政主体',
    definition: '受城市管理综合执法局委托，具体承担城市管理执法任务的执法机构。',
    parentId: 'administrative-subject', childrenIds: [],
    relations: [{ type: 'has-subject', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.90 }],
    sourceLaw: '《城市管理执法办法》',
    properties: { category: 'subject', role: '执法执行机构' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'subj-003', name: '街道办事处', code: 'UM-Subj-003', level: 2, domain: '行政主体',
    definition: '区、县人民政府的派出机关，协助城市管理执法部门开展基层执法工作。',
    parentId: 'administrative-subject', childrenIds: [],
    relations: [{ type: 'has-subject', targetId: 'scene-007', targetName: '市场监管协管', confidence: 0.85 }],
    sourceLaw: '《城市管理执法办法》',
    properties: { category: 'subject', role: '协助执法' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'subj-004', name: '公安机关', code: 'UM-Subj-004', level: 2, domain: '行政主体',
    definition: '与城市管理部门开展联合执法，主要负责治安管理、交通秩序管理和涉嫌犯罪案件的移送处理。',
    parentId: 'administrative-subject', childrenIds: [],
    relations: [{ type: 'has-subject', targetId: 'scene-006', targetName: '交通秩序管理', confidence: 0.88 }],
    sourceLaw: '《道路交通安全法》',
    properties: { category: 'subject', role: '联合执法' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'subj-005', name: '生态环境部门', code: 'UM-Subj-005', level: 2, domain: '行政主体',
    definition: '与城市管理部门开展联合执法，主要负责环境污染监测、排污许可管理和环保行政处罚。',
    parentId: 'administrative-subject', childrenIds: [],
    relations: [{ type: 'has-subject', targetId: 'scene-005', targetName: '环境保护执法', confidence: 0.90 }],
    sourceLaw: '《环境保护法》',
    properties: { category: 'subject', role: '联合执法' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'subj-006', name: '住房和城乡建设主管部门', code: 'UM-Subj-006', level: 2, domain: '行政主体', definition: '负责城市建设、市政设施、建筑施工、房屋市政工程等行业监管，并与城管部门开展执法协同。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-003', targetName: '市政设施管理', confidence: 0.88 }], sourceLaw: '《城市道路管理条例》', properties: { category: 'subject', role: '行业主管部门' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'subj-007', name: '自然资源和规划主管部门', code: 'UM-Subj-007', level: 2, domain: '行政主体', definition: '负责国土空间规划、建设工程规划许可和规划核实等事项，是违法建设认定的重要协同主体。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-004', targetName: '违法建设治理', confidence: 0.92 }], sourceLaw: '《城乡规划法》', properties: { category: 'subject', role: '专业认定主体' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'subj-008', name: '市场监督管理部门', code: 'UM-Subj-008', level: 2, domain: '行政主体', definition: '负责市场主体登记、无照经营查处、食品经营许可等市场秩序监管事项。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-007', targetName: '市场监管协管', confidence: 0.92 }], sourceLaw: '《无证无照经营查处办法》', properties: { category: 'subject', role: '联合执法' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'subj-009', name: '消防救援机构', code: 'UM-Subj-009', level: 2, domain: '行政主体', definition: '在占用消防通道、影响消防安全、违法搭建存在火灾风险等场景中提供专业监管和执法协同。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-006', targetName: '交通秩序管理', confidence: 0.82 }], sourceLaw: '《城市管理执法办法》', properties: { category: 'subject', role: '联合执法' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'subj-010', name: '园林绿化主管部门', code: 'UM-Subj-010', level: 2, domain: '行政主体', definition: '负责城市绿地、树木、古树名木、公园绿化资源保护管理及专业认定。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-002', targetName: '园林绿化管理', confidence: 0.94 }], sourceLaw: '《城市绿化条例》', properties: { category: 'subject', role: '行业主管部门' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'subj-011', name: '环境卫生主管部门', code: 'UM-Subj-011', level: 2, domain: '行政主体', definition: '负责生活垃圾、环境卫生设施、道路清扫保洁、垃圾收运处置等环境卫生管理事项。', parentId: 'administrative-subject', childrenIds: [], relations: [{ type: 'has-subject', targetId: 'scene-001', targetName: '市容环境卫生管理', confidence: 0.90 }], sourceLaw: '《城市生活垃圾管理办法》', properties: { category: 'subject', role: '行业主管部门' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },

  // ========== 行政相对人 children (3 L2) ==========
  {
    id: 'tgt-001', name: '自然人', code: 'UM-Tgt-001', level: 2, domain: '行政相对人',
    definition: '以个人身份作为城管执法行为对象的公民个体。',
    parentId: 'administrative-object', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'tgt-002', name: '法人', code: 'UM-Tgt-002', level: 2, domain: '行政相对人',
    definition: '依法设立，具有民事权利能力和民事行为能力，作为城管执法行为对象的企业、事业单位和社会团体。',
    parentId: 'administrative-object', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'tgt-003', name: '其他组织', code: 'UM-Tgt-003', level: 2, domain: '行政相对人',
    definition: '不具有法人资格但依法能够以自己名义从事活动的组织，如个体工商户、合伙企业、农村承包经营户等。',
    parentId: 'administrative-object', childrenIds: [],
    relations: [],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'tgt-004', name: '个体工商户', code: 'UM-Tgt-004', level: 2, domain: '行政相对人', definition: '以个人或家庭名义依法登记经营的主体，常见于摊点经营、沿街经营和无照经营查处场景。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-018', targetName: '无证无照经营查处办法', confidence: 0.90 }], sourceLaw: '《无证无照经营查处办法》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'tgt-005', name: '沿街商户', code: 'UM-Tgt-005', level: 2, domain: '行政相对人', definition: '在临街店铺、门店、摊位等经营载体开展经营活动的行政相对人。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-014', targetName: '城市市容和环境卫生管理条例', confidence: 0.88 }], sourceLaw: '《城市市容和环境卫生管理条例》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'tgt-006', name: '建设单位', code: 'UM-Tgt-006', level: 2, domain: '行政相对人', definition: '组织实施建设工程、临时建设或相关建设活动的单位，是违法建设治理中的常见责任主体。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-007', targetName: '城乡规划法', confidence: 0.94 }], sourceLaw: '《城乡规划法》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'tgt-007', name: '施工单位', code: 'UM-Tgt-007', level: 2, domain: '行政相对人', definition: '承担建筑施工、市政施工、拆除施工等活动的企业或组织，常涉及围挡、扬尘、渣土、道路挖掘等事项。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-016', targetName: '城市道路管理条例', confidence: 0.86 }], sourceLaw: '《城市道路管理条例》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'tgt-008', name: '餐饮经营者', code: 'UM-Tgt-008', level: 2, domain: '行政相对人', definition: '从事餐饮服务的经营主体，常涉及餐饮油烟、出店经营、餐厨垃圾处置等城管事项。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-009', targetName: '大气污染防治法', confidence: 0.90 }], sourceLaw: '《大气污染防治法》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'tgt-009', name: '物业服务企业', code: 'UM-Tgt-009', level: 2, domain: '行政相对人', definition: '在小区、商业综合体等区域承担物业服务的企业，常与垃圾收集、公共区域堆物、绿化维护等事项相关。', parentId: 'administrative-object', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-022', targetName: '城市生活垃圾管理办法', confidence: 0.84 }], sourceLaw: '《城市生活垃圾管理办法》', properties: { category: 'target' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },

  // ========== 执法程序 children (8 L2) ==========
  {
    id: 'proc-001', name: '立案', code: 'UM-Proc-001', level: 2, domain: '执法程序',
    definition: '城管执法部门对发现或受理的违法线索进行初步审查，认为需要追究行政法律责任，决定作为行政案件进行调查处理的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '1' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-002', name: '调查取证', code: 'UM-Proc-002', level: 2, domain: '执法程序',
    definition: '城管执法部门对已立案的行政案件，通过询问、勘验、检查、鉴定、抽样取证等方式全面、客观、公正地收集证据的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [
      { type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 },
      { type: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', confidence: 0.95 },
    ],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '2' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-003', name: '告知陈述申辩', code: 'UM-Proc-003', level: 2, domain: '执法程序',
    definition: '城管执法部门在作出行政处罚决定之前，告知当事人拟作出的行政处罚内容及事实、理由、依据，并告知当事人依法享有的陈述、申辩权利的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '3' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-004', name: '听证', code: 'UM-Proc-004', level: 2, domain: '执法程序',
    definition: '在作出较大数额罚款、责令停产停业、吊销许可证等重大行政处罚决定之前，应当事人要求举行的公开听证程序。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '4' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-005', name: '法制审核', code: 'UM-Proc-005', level: 2, domain: '执法程序',
    definition: '在作出重大执法决定前，由执法部门法制机构对决定的合法性、合理性进行审核的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.93 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '5' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-006', name: '作出决定', code: 'UM-Proc-006', level: 2, domain: '执法程序',
    definition: '城管执法部门根据调查取证结果和法制审核意见，依法作出行政处罚决定或其他处理决定的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '6' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-007', name: '送达执行', code: 'UM-Proc-007', level: 2, domain: '执法程序',
    definition: '将行政处罚决定书依法送达当事人，并督促当事人在规定期限内履行处罚决定的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '7' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  {
    id: 'proc-008', name: '结案归档', code: 'UM-Proc-008', level: 2, domain: '执法程序',
    definition: '行政处罚案件执行完毕或依法终结后，将案件材料整理归档的程序环节。',
    parentId: 'enforcement-procedure', childrenIds: [],
    relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.90 }],
    sourceLaw: '《行政处罚法》',
    properties: { category: 'procedure', stepOrder: '8' }, createdAt: '2024-01-15', updatedAt: '2024-06-20',
  },
  { id: 'proc-009', name: '简易程序', code: 'UM-Proc-009', level: 2, domain: '执法程序', definition: '对事实清楚、证据确凿且适用较轻处罚的案件，执法人员可以依法当场作出处罚决定的程序。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-002', targetName: '行政处罚法', confidence: 0.95 }], sourceLaw: '《行政处罚法》', properties: { category: 'procedure', stepOrder: '9' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-010', name: '普通程序', code: 'UM-Proc-010', level: 2, domain: '执法程序', definition: '对不适用简易程序的行政处罚案件，按照立案、调查、告知、审核、决定、送达、执行、归档等环节办理的程序。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-027', targetName: '行政处罚程序规定', confidence: 0.95 }], sourceLaw: '《住房和城乡建设行政处罚程序规定》', properties: { category: 'procedure', stepOrder: '10' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-011', name: '现场勘验', code: 'UM-Proc-011', level: 2, domain: '执法程序', definition: '对违法建设、占道、绿地损毁、设施损坏等现场位置、范围、状态进行查看、测量、拍摄和记录的程序环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'requires-evidence', targetId: 'evd-013', targetName: '现场勘验图', confidence: 0.94 }], sourceLaw: '《住房和城乡建设行政处罚程序规定》', properties: { category: 'procedure', stepOrder: '11' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-012', name: '责令改正', code: 'UM-Proc-012', level: 2, domain: '执法程序', definition: '在发现违法状态后，依法制作并送达责令改正、限期整改、停止违法行为等文书的程序环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'requires-evidence', targetId: 'evd-009', targetName: '责令改正文书', confidence: 0.95 }], sourceLaw: '《行政处罚法》', properties: { category: 'procedure', stepOrder: '12' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-013', name: '催告', code: 'UM-Proc-013', level: 2, domain: '执法程序', definition: '当事人逾期不履行行政决定时，行政机关在强制执行前依法书面催告其履行义务的程序环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-003', targetName: '行政强制法', confidence: 0.95 }], sourceLaw: '《行政强制法》', properties: { category: 'procedure', stepOrder: '13' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-014', name: '强制执行申请', code: 'UM-Proc-014', level: 2, domain: '执法程序', definition: '当事人不履行行政决定且行政机关无直接强制执行权时，依法申请人民法院强制执行的程序环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-003', targetName: '行政强制法', confidence: 0.92 }], sourceLaw: '《行政强制法》', properties: { category: 'procedure', stepOrder: '14' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-015', name: '案件移送', code: 'UM-Proc-015', level: 2, domain: '执法程序', definition: '对不属于本机关管辖、需要其他部门处理或涉嫌犯罪的案件线索，依法移送有权机关的程序环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-022', targetName: '城市管理执法办法', confidence: 0.88 }], sourceLaw: '《城市管理执法办法》', properties: { category: 'procedure', stepOrder: '15' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
  { id: 'proc-016', name: '信用记录归集', code: 'UM-Proc-016', level: 2, domain: '执法程序', definition: '对依法作出的行政处罚、行政强制等执法结果进行记录、归集、公示或共享的后续管理环节。', parentId: 'enforcement-procedure', childrenIds: [], relations: [{ type: 'is-regulated-by', targetId: 'legal-022', targetName: '城市管理执法办法', confidence: 0.82 }], sourceLaw: '《城市管理执法办法》', properties: { category: 'procedure', stepOrder: '16' }, createdAt: '2024-01-15', updatedAt: '2024-06-20' },

  // ========== 城市管理双主干与支撑域扩展（2026-07-07） ==========
  {
    "id": "city-management-object",
    "name": "城市管理对象",
    "code": "UM-Object",
    "level": 1,
    "domain": "城市管理对象",
    "definition": "城市管理中被规范、保护、巡查和处置的静态管理对象，包括道路空间、临街经营载体、公共开放区域、建构筑物、户外设施、绿化设施、环卫设施、水域岸线、施工现场和交通附属设施。",
    "parentId": null,
    "childrenIds": [
      "obj-001",
      "obj-002",
      "obj-003",
      "obj-004",
      "obj-005",
      "obj-006",
      "obj-007",
      "obj-008",
      "obj-009",
      "obj-010"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "2"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "city-component",
    "name": "城市部件",
    "code": "UM-Component",
    "level": 1,
    "domain": "城市部件",
    "definition": "数字化城市管理和网格巡查中可定位、可编码、可报修、可监管的城市设施部件，是事件发现、派遣和处置的静态承载单元。",
    "parentId": null,
    "childrenIds": [
      "comp-001",
      "comp-002",
      "comp-003",
      "comp-004",
      "comp-005",
      "comp-006",
      "comp-007",
      "comp-008"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "3"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "city-management-event",
    "name": "城市管理事件",
    "code": "UM-Event",
    "level": 1,
    "domain": "城市管理事件",
    "definition": "城市运行和城管执法中发生的动态问题、违法事实、设施异常和处置任务，连接对象、部件、主体、行为、证据、程序和处罚结果。",
    "parentId": null,
    "childrenIds": [
      "evt-001",
      "evt-002",
      "evt-003",
      "evt-004",
      "evt-005",
      "evt-006",
      "evt-007",
      "evt-008",
      "evt-009"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "4"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "spatial-area",
    "name": "空间区域",
    "code": "UM-Space",
    "level": 1,
    "domain": "空间区域",
    "definition": "用于划定城管巡查、执法、管控、责任和风险边界的空间单元，包括道路、街区、小区、公园、工地、岸线和重点区域。",
    "parentId": null,
    "childrenIds": [
      "space-001",
      "space-002",
      "space-003",
      "space-004",
      "space-005"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "14"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "event-status",
    "name": "事件状态",
    "code": "UM-Status",
    "level": 1,
    "domain": "事件状态",
    "definition": "城管事件从发现、核查、立案、处置到结案归档全过程中的状态集合，用于过程跟踪、时效控制和闭环评价。",
    "parentId": null,
    "childrenIds": [
      "status-001",
      "status-002",
      "status-003",
      "status-004"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "15"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collaborative-disposal",
    "name": "协同处置",
    "code": "UM-Collaboration",
    "level": 1,
    "domain": "协同处置",
    "definition": "跨部门、跨层级、跨系统的联合处置机制，用于城管、街道、住建、生态环境、公安交管、市场监管等主体之间的职责衔接。",
    "parentId": null,
    "childrenIds": [
      "collab-001",
      "collab-002",
      "collab-003",
      "collab-004",
      "collab-005"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "16"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "discretion-rule",
    "name": "裁量规则",
    "code": "UM-Discretion",
    "level": 1,
    "domain": "裁量规则",
    "definition": "对违法行为适用处罚、从轻减轻、首违不罚、责令改正、限期拆除、强制执行等结果进行裁量约束的规则体系。",
    "parentId": null,
    "childrenIds": [
      "disc-001",
      "disc-002",
      "disc-003",
      "disc-004",
      "disc-005"
    ],
    "relations": [],
    "sourceLaw": null,
    "properties": {
      "category": "root",
      "domainOrder": "9"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001",
    "name": "城市道路及通行空间",
    "code": "UM-Object-001",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "机动车道、人行道路、非机动车道、背街小巷、道路交叉口等通行空间，是占道经营、乱堆物料和车辆乱停放高发区域。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-001-001",
      "obj-001-002",
      "obj-001-003",
      "obj-001-004",
      "obj-001-005",
      "obj-001-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-001",
    "name": "机动车道",
    "code": "UM-Object-001-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "机动车道是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-002",
    "name": "人行道路",
    "code": "UM-Object-001-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "人行道路是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-003",
    "name": "非机动车道",
    "code": "UM-Object-001-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "非机动车道是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-004",
    "name": "背街小巷",
    "code": "UM-Object-001-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "背街小巷是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-005",
    "name": "道路交叉口",
    "code": "UM-Object-001-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "道路交叉口是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-001-006",
    "name": "过街通道",
    "code": "UM-Object-001-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "过街通道是城市道路及通行空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-001",
        "targetName": "城市道路及通行空间",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002",
    "name": "临街经营类场所",
    "code": "UM-Object-002",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "沿街商铺、临时摊点和门前责任区等经营载体，是出店经营、占道促销、门前乱堆乱放的重点监管对象。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-002-001",
      "obj-002-002",
      "obj-002-003",
      "obj-002-004",
      "obj-002-005",
      "obj-002-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-001",
    "name": "临街餐饮商铺",
    "code": "UM-Object-002-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "临街餐饮商铺是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-002",
    "name": "临街零售商铺",
    "code": "UM-Object-002-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "临街零售商铺是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-003",
    "name": "汽修五金商铺",
    "code": "UM-Object-002-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "汽修五金商铺是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-004",
    "name": "合规便民疏导点",
    "code": "UM-Object-002-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "合规便民疏导点是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-005",
    "name": "流动摊贩点位",
    "code": "UM-Object-002-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "流动摊贩点位是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-002-006",
    "name": "门前三包责任区",
    "code": "UM-Object-002-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "门前三包责任区是临街经营类场所下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-002",
        "targetName": "临街经营类场所",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003",
    "name": "城市公共开放区域",
    "code": "UM-Object-003",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "面向公众开放使用的城市空间，用于统一公共秩序、市容环境和公共活动管控。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-003-001",
      "obj-003-002",
      "obj-003-003",
      "obj-003-004",
      "obj-003-005",
      "obj-003-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-001",
    "name": "城市广场",
    "code": "UM-Object-003-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "城市广场是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-002",
    "name": "休闲游园",
    "code": "UM-Object-003-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "休闲游园是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-003",
    "name": "公园外围区域",
    "code": "UM-Object-003-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "公园外围区域是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-004",
    "name": "社区公共院落",
    "code": "UM-Object-003-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "社区公共院落是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-005",
    "name": "小区公共通道",
    "code": "UM-Object-003-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "小区公共通道是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-003-006",
    "name": "城乡结合部空旷区域",
    "code": "UM-Object-003-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "城乡结合部空旷区域是城市公共开放区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-003",
        "targetName": "城市公共开放区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004",
    "name": "建构筑物及外立面",
    "code": "UM-Object-004",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "建筑外墙、围挡、围墙、护栏和临时搭建物等实体结构，涉及违法建设、乱贴乱画和违规悬挂。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-004-001",
      "obj-004-002",
      "obj-004-003",
      "obj-004-004",
      "obj-004-005",
      "obj-004-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-001",
    "name": "居民楼栋外立面",
    "code": "UM-Object-004-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "居民楼栋外立面是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-002",
    "name": "商住楼宇外立面",
    "code": "UM-Object-004-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "商住楼宇外立面是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-003",
    "name": "工地围墙",
    "code": "UM-Object-004-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "工地围墙是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-004",
    "name": "实体围挡",
    "code": "UM-Object-004-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "实体围挡是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-005",
    "name": "沿街围墙",
    "code": "UM-Object-004-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "沿街围墙是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-004-006",
    "name": "临时搭建物",
    "code": "UM-Object-004-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "临时搭建物是建构筑物及外立面下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-004",
        "targetName": "建构筑物及外立面",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005",
    "name": "市容户外设施",
    "code": "UM-Object-005",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "设置在城市户外空间的广告、招牌、亭棚、箱柜、指示和宣传设施。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-005-001",
      "obj-005-002",
      "obj-005-003",
      "obj-005-004",
      "obj-005-005",
      "obj-005-006",
      "obj-005-007",
      "obj-005-008"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-001",
    "name": "户外广告",
    "code": "UM-Object-005-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "户外广告是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-002",
    "name": "门头招牌",
    "code": "UM-Object-005-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "门头招牌是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-003",
    "name": "灯箱",
    "code": "UM-Object-005-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "灯箱是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-004",
    "name": "公交候车亭",
    "code": "UM-Object-005-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "公交候车亭是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-005",
    "name": "报刊亭",
    "code": "UM-Object-005-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "报刊亭是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-006",
    "name": "便民服务亭",
    "code": "UM-Object-005-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "便民服务亭是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-007",
    "name": "快递柜",
    "code": "UM-Object-005-007",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "快递柜是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-005-008",
    "name": "宣传栏",
    "code": "UM-Object-005-008",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "宣传栏是市容户外设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-005",
        "targetName": "市容户外设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006",
    "name": "园林绿化设施与区域",
    "code": "UM-Object-006",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "绿地、树木、花坛和景观小品等绿化保护对象，涉及侵占、损毁、践踏和违规占用。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-006-001",
      "obj-006-002",
      "obj-006-003",
      "obj-006-004",
      "obj-006-005",
      "obj-006-006",
      "obj-006-007",
      "obj-006-008"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-001",
    "name": "城市绿地",
    "code": "UM-Object-006-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "城市绿地是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-002",
    "name": "草坪",
    "code": "UM-Object-006-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "草坪是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-003",
    "name": "绿化带",
    "code": "UM-Object-006-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "绿化带是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-004",
    "name": "行道树",
    "code": "UM-Object-006-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "行道树是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-005",
    "name": "景观树木",
    "code": "UM-Object-006-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "景观树木是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-006",
    "name": "绿篱",
    "code": "UM-Object-006-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "绿篱是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-007",
    "name": "花坛花池",
    "code": "UM-Object-006-007",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "花坛花池是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-006-008",
    "name": "景观小品",
    "code": "UM-Object-006-008",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "景观小品是园林绿化设施与区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-006",
        "targetName": "园林绿化设施与区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007",
    "name": "环卫设施及配套区域",
    "code": "UM-Object-007",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "公共厕所、垃圾容器、收集点和转运站等环境卫生设施及其周边配套区域。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-007-001",
      "obj-007-002",
      "obj-007-003",
      "obj-007-004",
      "obj-007-005",
      "obj-007-006",
      "obj-007-007"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-001",
    "name": "公共厕所",
    "code": "UM-Object-007-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "公共厕所是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-002",
    "name": "环卫工具房",
    "code": "UM-Object-007-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "环卫工具房是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-003",
    "name": "垃圾桶",
    "code": "UM-Object-007-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "垃圾桶是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-004",
    "name": "果皮箱",
    "code": "UM-Object-007-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "果皮箱是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-005",
    "name": "垃圾收集点",
    "code": "UM-Object-007-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "垃圾收集点是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-006",
    "name": "垃圾转运站",
    "code": "UM-Object-007-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "垃圾转运站是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-007-007",
    "name": "建筑垃圾临时堆放点",
    "code": "UM-Object-007-007",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "建筑垃圾临时堆放点是环卫设施及配套区域下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-007",
        "targetName": "环卫设施及配套区域",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008",
    "name": "城市水域及岸线",
    "code": "UM-Object-008",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "城区河道、湖泊、水体岸坡和亲水平台等涉水空间。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-008-001",
      "obj-008-002",
      "obj-008-003",
      "obj-008-004",
      "obj-008-005",
      "obj-008-006",
      "obj-008-007"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-001",
    "name": "城市河道",
    "code": "UM-Object-008-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "城市河道是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-002",
    "name": "河涌",
    "code": "UM-Object-008-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "河涌是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-003",
    "name": "湖泊",
    "code": "UM-Object-008-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "湖泊是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-004",
    "name": "临水步道",
    "code": "UM-Object-008-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "临水步道是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-005",
    "name": "河道岸坡",
    "code": "UM-Object-008-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "河道岸坡是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-006",
    "name": "亲水平台",
    "code": "UM-Object-008-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "亲水平台是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-008-007",
    "name": "水域周边滩地",
    "code": "UM-Object-008-007",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "水域周边滩地是城市水域及岸线下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-008",
        "targetName": "城市水域及岸线",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009",
    "name": "施工现场及工地附属",
    "code": "UM-Object-009",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "建筑施工、拆迁、市政施工等临时管控对象及其出入口、围挡和物料堆放区域。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-009-001",
      "obj-009-002",
      "obj-009-003",
      "obj-009-004",
      "obj-009-005",
      "obj-009-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-001",
    "name": "建筑施工工地",
    "code": "UM-Object-009-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "建筑施工工地是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-002",
    "name": "拆迁工地",
    "code": "UM-Object-009-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "拆迁工地是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-003",
    "name": "工地围挡",
    "code": "UM-Object-009-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "工地围挡是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-004",
    "name": "施工出入口",
    "code": "UM-Object-009-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "施工出入口是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-005",
    "name": "渣土堆放区",
    "code": "UM-Object-009-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "渣土堆放区是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-009-006",
    "name": "建材临时堆放区",
    "code": "UM-Object-009-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "建材临时堆放区是施工现场及工地附属下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-009",
        "targetName": "施工现场及工地附属",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010",
    "name": "交通附属设施",
    "code": "UM-Object-010",
    "level": 2,
    "domain": "城市管理对象",
    "definition": "道路配套的隔离、防护、停车、信号和监控设施。",
    "parentId": "city-management-object",
    "childrenIds": [
      "obj-010-001",
      "obj-010-002",
      "obj-010-003",
      "obj-010-004",
      "obj-010-005",
      "obj-010-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-object",
        "targetName": "城市管理对象",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-001",
    "name": "道路隔离栏",
    "code": "UM-Object-010-001",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "道路隔离栏是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-002",
    "name": "防护栏",
    "code": "UM-Object-010-002",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "防护栏是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-003",
    "name": "非机动车停放区",
    "code": "UM-Object-010-003",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "非机动车停放区是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-004",
    "name": "停车泊位",
    "code": "UM-Object-010-004",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "停车泊位是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-005",
    "name": "交通信号灯",
    "code": "UM-Object-010-005",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "交通信号灯是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "obj-010-006",
    "name": "监控杆体",
    "code": "UM-Object-010-006",
    "level": 3,
    "domain": "城市管理对象",
    "definition": "监控杆体是交通附属设施下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "obj-010",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "obj-010",
        "targetName": "交通附属设施",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001",
    "name": "道路交通部件",
    "code": "UM-Component-001",
    "level": 2,
    "domain": "城市部件",
    "definition": "保障道路通行和交通秩序的城市部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-001-001",
      "comp-001-002",
      "comp-001-003",
      "comp-001-004",
      "comp-001-005",
      "comp-001-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-001",
    "name": "路灯杆",
    "code": "UM-Component-001-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "路灯杆是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-002",
    "name": "交通标志牌",
    "code": "UM-Component-001-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "交通标志牌是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-003",
    "name": "路名牌",
    "code": "UM-Component-001-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "路名牌是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-004",
    "name": "隔离护栏",
    "code": "UM-Component-001-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "隔离护栏是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-005",
    "name": "防撞柱",
    "code": "UM-Component-001-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "防撞柱是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-001-006",
    "name": "减速带",
    "code": "UM-Component-001-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "减速带是道路交通部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-001",
        "targetName": "道路交通部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002",
    "name": "市政公用部件",
    "code": "UM-Component-002",
    "level": 2,
    "domain": "城市部件",
    "definition": "市政道路、排水、供水、燃气和照明等设施部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-002-001",
      "comp-002-002",
      "comp-002-003",
      "comp-002-004",
      "comp-002-005",
      "comp-002-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-001",
    "name": "雨水井盖",
    "code": "UM-Component-002-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "雨水井盖是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-002",
    "name": "污水井盖",
    "code": "UM-Component-002-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "污水井盖是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-003",
    "name": "检查井",
    "code": "UM-Component-002-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "检查井是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-004",
    "name": "雨水篦子",
    "code": "UM-Component-002-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "雨水篦子是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-005",
    "name": "消防栓",
    "code": "UM-Component-002-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "消防栓是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-002-006",
    "name": "路灯箱变",
    "code": "UM-Component-002-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "路灯箱变是市政公用部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-002",
        "targetName": "市政公用部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003",
    "name": "环卫部件",
    "code": "UM-Component-003",
    "level": 2,
    "domain": "城市部件",
    "definition": "环境卫生收集、转运和保洁相关部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-003-001",
      "comp-003-002",
      "comp-003-003",
      "comp-003-004",
      "comp-003-005",
      "comp-003-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-001",
    "name": "分类垃圾桶",
    "code": "UM-Component-003-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "分类垃圾桶是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-002",
    "name": "果皮箱",
    "code": "UM-Component-003-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "果皮箱是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-003",
    "name": "垃圾房",
    "code": "UM-Component-003-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "垃圾房是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-004",
    "name": "垃圾转运箱",
    "code": "UM-Component-003-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "垃圾转运箱是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-005",
    "name": "公厕指示牌",
    "code": "UM-Component-003-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "公厕指示牌是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-003-006",
    "name": "环卫车辆停放点",
    "code": "UM-Component-003-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "环卫车辆停放点是环卫部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-003",
        "targetName": "环卫部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004",
    "name": "园林绿化部件",
    "code": "UM-Component-004",
    "level": 2,
    "domain": "城市部件",
    "definition": "绿化维护、景观展示和绿地保护类部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-004-001",
      "comp-004-002",
      "comp-004-003",
      "comp-004-004",
      "comp-004-005",
      "comp-004-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-001",
    "name": "树池",
    "code": "UM-Component-004-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "树池是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-002",
    "name": "树木支撑架",
    "code": "UM-Component-004-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "树木支撑架是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-003",
    "name": "绿化护栏",
    "code": "UM-Component-004-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "绿化护栏是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-004",
    "name": "喷灌设施",
    "code": "UM-Component-004-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "喷灌设施是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-005",
    "name": "景观灯",
    "code": "UM-Component-004-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "景观灯是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-004-006",
    "name": "花箱",
    "code": "UM-Component-004-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "花箱是园林绿化部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-004",
        "targetName": "园林绿化部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005",
    "name": "市容广告部件",
    "code": "UM-Component-005",
    "level": 2,
    "domain": "城市部件",
    "definition": "户外广告和店招店牌相关部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-005-001",
      "comp-005-002",
      "comp-005-003",
      "comp-005-004",
      "comp-005-005",
      "comp-005-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-001",
    "name": "广告牌面",
    "code": "UM-Component-005-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "广告牌面是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-002",
    "name": "广告支架",
    "code": "UM-Component-005-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "广告支架是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-003",
    "name": "电子显示屏",
    "code": "UM-Component-005-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "电子显示屏是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-004",
    "name": "门头牌匾",
    "code": "UM-Component-005-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "门头牌匾是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-005",
    "name": "灯箱支架",
    "code": "UM-Component-005-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "灯箱支架是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-005-006",
    "name": "临时宣传架",
    "code": "UM-Component-005-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "临时宣传架是市容广告部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-005",
        "targetName": "市容广告部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006",
    "name": "公共服务部件",
    "code": "UM-Component-006",
    "level": 2,
    "domain": "城市部件",
    "definition": "公交、便民和公共服务配套部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-006-001",
      "comp-006-002",
      "comp-006-003",
      "comp-006-004",
      "comp-006-005",
      "comp-006-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-001",
    "name": "公交站牌",
    "code": "UM-Component-006-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "公交站牌是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-002",
    "name": "公交候车棚",
    "code": "UM-Component-006-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "公交候车棚是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-003",
    "name": "报刊亭",
    "code": "UM-Component-006-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "报刊亭是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-004",
    "name": "便民服务亭",
    "code": "UM-Component-006-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "便民服务亭是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-005",
    "name": "快递柜",
    "code": "UM-Component-006-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "快递柜是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-006-006",
    "name": "共享单车停放桩",
    "code": "UM-Component-006-006",
    "level": 3,
    "domain": "城市部件",
    "definition": "共享单车停放桩是公共服务部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-006",
        "targetName": "公共服务部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007",
    "name": "水域岸线部件",
    "code": "UM-Component-007",
    "level": 2,
    "domain": "城市部件",
    "definition": "河湖岸线安全、清洁和亲水服务相关部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-007-001",
      "comp-007-002",
      "comp-007-003",
      "comp-007-004",
      "comp-007-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007-001",
    "name": "亲水栏杆",
    "code": "UM-Component-007-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "亲水栏杆是水域岸线部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-007",
        "targetName": "水域岸线部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007-002",
    "name": "岸线警示牌",
    "code": "UM-Component-007-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "岸线警示牌是水域岸线部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-007",
        "targetName": "水域岸线部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007-003",
    "name": "水位标尺",
    "code": "UM-Component-007-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "水位标尺是水域岸线部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-007",
        "targetName": "水域岸线部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007-004",
    "name": "排水口",
    "code": "UM-Component-007-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "排水口是水域岸线部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-007",
        "targetName": "水域岸线部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-007-005",
    "name": "亲水平台护栏",
    "code": "UM-Component-007-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "亲水平台护栏是水域岸线部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-007",
        "targetName": "水域岸线部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008",
    "name": "工地管控部件",
    "code": "UM-Component-008",
    "level": 2,
    "domain": "城市部件",
    "definition": "施工现场外围和出入口管理部件。",
    "parentId": "city-component",
    "childrenIds": [
      "comp-008-001",
      "comp-008-002",
      "comp-008-003",
      "comp-008-004",
      "comp-008-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-component",
        "targetName": "城市部件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008-001",
    "name": "工地围挡板",
    "code": "UM-Component-008-001",
    "level": 3,
    "domain": "城市部件",
    "definition": "工地围挡板是工地管控部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-008",
        "targetName": "工地管控部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008-002",
    "name": "喷淋降尘设施",
    "code": "UM-Component-008-002",
    "level": 3,
    "domain": "城市部件",
    "definition": "喷淋降尘设施是工地管控部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-008",
        "targetName": "工地管控部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008-003",
    "name": "车辆冲洗平台",
    "code": "UM-Component-008-003",
    "level": 3,
    "domain": "城市部件",
    "definition": "车辆冲洗平台是工地管控部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-008",
        "targetName": "工地管控部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008-004",
    "name": "渣土覆盖网",
    "code": "UM-Component-008-004",
    "level": 3,
    "domain": "城市部件",
    "definition": "渣土覆盖网是工地管控部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-008",
        "targetName": "工地管控部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "comp-008-005",
    "name": "施工告示牌",
    "code": "UM-Component-008-005",
    "level": 3,
    "domain": "城市部件",
    "definition": "施工告示牌是工地管控部件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "comp-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "comp-008",
        "targetName": "工地管控部件",
        "confidence": 1
      },
      {
        "type": "applies-to",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001",
    "name": "占道秩序事件",
    "code": "UM-Event-001",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "发生在道路、人行道、门前三包责任区等空间的占用通行资源事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-001-001",
      "evt-001-002",
      "evt-001-003",
      "evt-001-004",
      "evt-001-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001-001",
    "name": "店外占道经营事件",
    "code": "UM-Event-001-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "店外占道经营事件是占道秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-001",
        "targetName": "占道秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001-002",
    "name": "流动摊贩占道事件",
    "code": "UM-Event-001-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "流动摊贩占道事件是占道秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-001",
        "targetName": "占道秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001-003",
    "name": "占道堆物事件",
    "code": "UM-Event-001-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "占道堆物事件是占道秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-001",
        "targetName": "占道秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001-004",
    "name": "占道促销事件",
    "code": "UM-Event-001-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "占道促销事件是占道秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-001",
        "targetName": "占道秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-001-005",
    "name": "占用停车泊位堆物事件",
    "code": "UM-Event-001-005",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "占用停车泊位堆物事件是占道秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-001",
        "targetName": "占道秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002",
    "name": "市容环境事件",
    "code": "UM-Event-002",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "影响城市容貌、环境卫生和公共秩序的事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-002-001",
      "evt-002-002",
      "evt-002-003",
      "evt-002-004",
      "evt-002-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002-001",
    "name": "乱贴乱画事件",
    "code": "UM-Event-002-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "乱贴乱画事件是市容环境事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-002",
        "targetName": "市容环境事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002-002",
    "name": "垃圾外溢事件",
    "code": "UM-Event-002-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "垃圾外溢事件是市容环境事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-002",
        "targetName": "市容环境事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002-003",
    "name": "乱倒垃圾事件",
    "code": "UM-Event-002-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "乱倒垃圾事件是市容环境事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-002",
        "targetName": "市容环境事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002-004",
    "name": "门前乱堆乱放事件",
    "code": "UM-Event-002-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "门前乱堆乱放事件是市容环境事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-002",
        "targetName": "市容环境事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-002-005",
    "name": "条幅违规悬挂事件",
    "code": "UM-Event-002-005",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "条幅违规悬挂事件是市容环境事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-002",
        "targetName": "市容环境事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-003",
    "name": "违法建设事件",
    "code": "UM-Event-003",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "未经许可或违反规划建设、搭建、扩建和拆除管控要求的事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-003-001",
      "evt-003-002",
      "evt-003-003",
      "evt-003-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-003-001",
    "name": "违法搭建事件",
    "code": "UM-Event-003-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "违法搭建事件是违法建设事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-003",
        "targetName": "违法建设事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-003-002",
    "name": "临时建筑超期事件",
    "code": "UM-Event-003-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "临时建筑超期事件是违法建设事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-003",
        "targetName": "违法建设事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-003-003",
    "name": "擅自改变外立面事件",
    "code": "UM-Event-003-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "擅自改变外立面事件是违法建设事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-003",
        "targetName": "违法建设事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-003-004",
    "name": "违法占地建设事件",
    "code": "UM-Event-003-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "违法占地建设事件是违法建设事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-003",
        "targetName": "违法建设事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-004",
    "name": "园林绿化事件",
    "code": "UM-Event-004",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "侵占、损毁、破坏绿化设施和绿化资源的事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-004-001",
      "evt-004-002",
      "evt-004-003",
      "evt-004-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-004-001",
    "name": "践踏绿地事件",
    "code": "UM-Event-004-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "践踏绿地事件是园林绿化事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-004",
        "targetName": "园林绿化事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-004-002",
    "name": "损毁树木事件",
    "code": "UM-Event-004-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "损毁树木事件是园林绿化事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-004",
        "targetName": "园林绿化事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-004-003",
    "name": "占用绿化带经营事件",
    "code": "UM-Event-004-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "占用绿化带经营事件是园林绿化事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-004",
        "targetName": "园林绿化事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-004-004",
    "name": "擅自砍伐树木事件",
    "code": "UM-Event-004-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "擅自砍伐树木事件是园林绿化事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-004",
        "targetName": "园林绿化事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005",
    "name": "环境污染事件",
    "code": "UM-Event-005",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "由油烟、噪声、扬尘、焚烧和固废等导致环境影响的事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-005-001",
      "evt-005-002",
      "evt-005-003",
      "evt-005-004",
      "evt-005-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005-001",
    "name": "餐饮油烟扰民事件",
    "code": "UM-Event-005-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "餐饮油烟扰民事件是环境污染事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-005",
        "targetName": "环境污染事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005-002",
    "name": "施工噪声扰民事件",
    "code": "UM-Event-005-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "施工噪声扰民事件是环境污染事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-005",
        "targetName": "环境污染事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005-003",
    "name": "露天焚烧事件",
    "code": "UM-Event-005-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "露天焚烧事件是环境污染事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-005",
        "targetName": "环境污染事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005-004",
    "name": "渣土扬尘事件",
    "code": "UM-Event-005-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "渣土扬尘事件是环境污染事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-005",
        "targetName": "环境污染事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-005-005",
    "name": "水体倾倒垃圾事件",
    "code": "UM-Event-005-005",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "水体倾倒垃圾事件是环境污染事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-005",
        "targetName": "环境污染事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006",
    "name": "市政设施事件",
    "code": "UM-Event-006",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "市政道路、井盖、护栏、照明、排水等设施损坏或占用事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-006-001",
      "evt-006-002",
      "evt-006-003",
      "evt-006-004",
      "evt-006-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006-001",
    "name": "井盖缺失事件",
    "code": "UM-Event-006-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "井盖缺失事件是市政设施事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-006",
        "targetName": "市政设施事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006-002",
    "name": "护栏损坏事件",
    "code": "UM-Event-006-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "护栏损坏事件是市政设施事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-006",
        "targetName": "市政设施事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006-003",
    "name": "路灯故障事件",
    "code": "UM-Event-006-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "路灯故障事件是市政设施事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-006",
        "targetName": "市政设施事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006-004",
    "name": "道路破损事件",
    "code": "UM-Event-006-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "道路破损事件是市政设施事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-006",
        "targetName": "市政设施事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-006-005",
    "name": "排水口堵塞事件",
    "code": "UM-Event-006-005",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "排水口堵塞事件是市政设施事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-006",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-006",
        "targetName": "市政设施事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-007",
    "name": "户外广告事件",
    "code": "UM-Event-007",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "户外广告、门头招牌、灯箱等设施违规设置或维护不到位事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-007-001",
      "evt-007-002",
      "evt-007-003",
      "evt-007-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-007-001",
    "name": "违规设置户外广告事件",
    "code": "UM-Event-007-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "违规设置户外广告事件是户外广告事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-007",
        "targetName": "户外广告事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-007-002",
    "name": "招牌破损事件",
    "code": "UM-Event-007-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "招牌破损事件是户外广告事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-007",
        "targetName": "户外广告事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-007-003",
    "name": "广告设施倾斜事件",
    "code": "UM-Event-007-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "广告设施倾斜事件是户外广告事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-007",
        "targetName": "户外广告事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-007-004",
    "name": "电子屏亮度扰民事件",
    "code": "UM-Event-007-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "电子屏亮度扰民事件是户外广告事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-007",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-007",
        "targetName": "户外广告事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-008",
    "name": "交通秩序事件",
    "code": "UM-Event-008",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "非机动车、共享单车、停车泊位等城市交通秩序相关事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-008-001",
      "evt-008-002",
      "evt-008-003",
      "evt-008-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-008-001",
    "name": "非机动车乱停放事件",
    "code": "UM-Event-008-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "非机动车乱停放事件是交通秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-008",
        "targetName": "交通秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-008-002",
    "name": "共享单车淤积事件",
    "code": "UM-Event-008-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "共享单车淤积事件是交通秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-008",
        "targetName": "交通秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-008-003",
    "name": "占用盲道停车事件",
    "code": "UM-Event-008-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "占用盲道停车事件是交通秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-008",
        "targetName": "交通秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-008-004",
    "name": "停车泊位违规占用事件",
    "code": "UM-Event-008-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "停车泊位违规占用事件是交通秩序事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-008",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-008",
        "targetName": "交通秩序事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-009",
    "name": "工地施工事件",
    "code": "UM-Event-009",
    "level": 2,
    "domain": "城市管理事件",
    "definition": "工地围挡、出入口、车辆冲洗、渣土运输和建材堆放相关事件。",
    "parentId": "city-management-event",
    "childrenIds": [
      "evt-009-001",
      "evt-009-002",
      "evt-009-003",
      "evt-009-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "city-management-event",
        "targetName": "城市管理事件",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-009-001",
    "name": "工地围挡破损事件",
    "code": "UM-Event-009-001",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "工地围挡破损事件是工地施工事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-009",
        "targetName": "工地施工事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-009-002",
    "name": "渣土遗撒事件",
    "code": "UM-Event-009-002",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "渣土遗撒事件是工地施工事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-009",
        "targetName": "工地施工事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-009-003",
    "name": "建材占道堆放事件",
    "code": "UM-Event-009-003",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "建材占道堆放事件是工地施工事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-009",
        "targetName": "工地施工事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "evt-009-004",
    "name": "车辆带泥上路事件",
    "code": "UM-Event-009-004",
    "level": 3,
    "domain": "城市管理事件",
    "definition": "车辆带泥上路事件是工地施工事件下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "evt-009",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "evt-009",
        "targetName": "工地施工事件",
        "confidence": 1
      },
      {
        "type": "requires-evidence",
        "targetId": "evidence-type",
        "targetName": "证据类型",
        "confidence": 0.86
      },
      {
        "type": "has-procedure",
        "targetId": "enforcement-procedure",
        "targetName": "执法程序",
        "confidence": 0.82
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001",
    "name": "道路空间",
    "code": "UM-Space-001",
    "level": 2,
    "domain": "空间区域",
    "definition": "道路红线内与通行、停放、市政设施相关的空间。",
    "parentId": "spatial-area",
    "childrenIds": [
      "space-001-001",
      "space-001-002",
      "space-001-003",
      "space-001-004",
      "space-001-005",
      "space-001-006"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "spatial-area",
        "targetName": "空间区域",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-001",
    "name": "主干道",
    "code": "UM-Space-001-001",
    "level": 3,
    "domain": "空间区域",
    "definition": "主干道是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-002",
    "name": "次干道",
    "code": "UM-Space-001-002",
    "level": 3,
    "domain": "空间区域",
    "definition": "次干道是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-003",
    "name": "支路",
    "code": "UM-Space-001-003",
    "level": 3,
    "domain": "空间区域",
    "definition": "支路是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-004",
    "name": "背街小巷",
    "code": "UM-Space-001-004",
    "level": 3,
    "domain": "空间区域",
    "definition": "背街小巷是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-005",
    "name": "人行道空间",
    "code": "UM-Space-001-005",
    "level": 3,
    "domain": "空间区域",
    "definition": "人行道空间是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-001-006",
    "name": "非机动车道空间",
    "code": "UM-Space-001-006",
    "level": 3,
    "domain": "空间区域",
    "definition": "非机动车道空间是道路空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-001",
        "targetName": "道路空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002",
    "name": "商业经营空间",
    "code": "UM-Space-002",
    "level": 2,
    "domain": "空间区域",
    "definition": "经营活动密集、占道和市容问题高发的空间。",
    "parentId": "spatial-area",
    "childrenIds": [
      "space-002-001",
      "space-002-002",
      "space-002-003",
      "space-002-004",
      "space-002-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "spatial-area",
        "targetName": "空间区域",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002-001",
    "name": "商业街区",
    "code": "UM-Space-002-001",
    "level": 3,
    "domain": "空间区域",
    "definition": "商业街区是商业经营空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-002",
        "targetName": "商业经营空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002-002",
    "name": "夜市周边",
    "code": "UM-Space-002-002",
    "level": 3,
    "domain": "空间区域",
    "definition": "夜市周边是商业经营空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-002",
        "targetName": "商业经营空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002-003",
    "name": "农贸市场周边",
    "code": "UM-Space-002-003",
    "level": 3,
    "domain": "空间区域",
    "definition": "农贸市场周边是商业经营空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-002",
        "targetName": "商业经营空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002-004",
    "name": "学校医院周边",
    "code": "UM-Space-002-004",
    "level": 3,
    "domain": "空间区域",
    "definition": "学校医院周边是商业经营空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-002",
        "targetName": "商业经营空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-002-005",
    "name": "沿街门店区域",
    "code": "UM-Space-002-005",
    "level": 3,
    "domain": "空间区域",
    "definition": "沿街门店区域是商业经营空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-002",
        "targetName": "商业经营空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-003",
    "name": "社区居住空间",
    "code": "UM-Space-003",
    "level": 2,
    "domain": "空间区域",
    "definition": "居民小区和社区公共活动空间。",
    "parentId": "spatial-area",
    "childrenIds": [
      "space-003-001",
      "space-003-002",
      "space-003-003",
      "space-003-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "spatial-area",
        "targetName": "空间区域",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-003-001",
    "name": "居住小区",
    "code": "UM-Space-003-001",
    "level": 3,
    "domain": "空间区域",
    "definition": "居住小区是社区居住空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-003",
        "targetName": "社区居住空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-003-002",
    "name": "社区公共通道",
    "code": "UM-Space-003-002",
    "level": 3,
    "domain": "空间区域",
    "definition": "社区公共通道是社区居住空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-003",
        "targetName": "社区居住空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-003-003",
    "name": "小区出入口",
    "code": "UM-Space-003-003",
    "level": 3,
    "domain": "空间区域",
    "definition": "小区出入口是社区居住空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-003",
        "targetName": "社区居住空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-003-004",
    "name": "老旧小区院落",
    "code": "UM-Space-003-004",
    "level": 3,
    "domain": "空间区域",
    "definition": "老旧小区院落是社区居住空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-003",
        "targetName": "社区居住空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-004",
    "name": "公共游憩空间",
    "code": "UM-Space-004",
    "level": 2,
    "domain": "空间区域",
    "definition": "市民游憩、集会和开放活动空间。",
    "parentId": "spatial-area",
    "childrenIds": [
      "space-004-001",
      "space-004-002",
      "space-004-003",
      "space-004-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "spatial-area",
        "targetName": "空间区域",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-004-001",
    "name": "城市广场空间",
    "code": "UM-Space-004-001",
    "level": 3,
    "domain": "空间区域",
    "definition": "城市广场空间是公共游憩空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-004",
        "targetName": "公共游憩空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-004-002",
    "name": "公园游园空间",
    "code": "UM-Space-004-002",
    "level": 3,
    "domain": "空间区域",
    "definition": "公园游园空间是公共游憩空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-004",
        "targetName": "公共游憩空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-004-003",
    "name": "滨水开放空间",
    "code": "UM-Space-004-003",
    "level": 3,
    "domain": "空间区域",
    "definition": "滨水开放空间是公共游憩空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-004",
        "targetName": "公共游憩空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-004-004",
    "name": "公共绿地空间",
    "code": "UM-Space-004-004",
    "level": 3,
    "domain": "空间区域",
    "definition": "公共绿地空间是公共游憩空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-004",
        "targetName": "公共游憩空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005",
    "name": "重点管控空间",
    "code": "UM-Space-005",
    "level": 2,
    "domain": "空间区域",
    "definition": "因安全、秩序、民生或投诉高发需要重点巡查的区域。",
    "parentId": "spatial-area",
    "childrenIds": [
      "space-005-001",
      "space-005-002",
      "space-005-003",
      "space-005-004",
      "space-005-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "spatial-area",
        "targetName": "空间区域",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005-001",
    "name": "重点路段",
    "code": "UM-Space-005-001",
    "level": 3,
    "domain": "空间区域",
    "definition": "重点路段是重点管控空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-005",
        "targetName": "重点管控空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005-002",
    "name": "严管街区",
    "code": "UM-Space-005-002",
    "level": 3,
    "domain": "空间区域",
    "definition": "严管街区是重点管控空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-005",
        "targetName": "重点管控空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005-003",
    "name": "窗口地区",
    "code": "UM-Space-005-003",
    "level": 3,
    "domain": "空间区域",
    "definition": "窗口地区是重点管控空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-005",
        "targetName": "重点管控空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005-004",
    "name": "城乡结合部",
    "code": "UM-Space-005-004",
    "level": 3,
    "domain": "空间区域",
    "definition": "城乡结合部是重点管控空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-005",
        "targetName": "重点管控空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "space-005-005",
    "name": "门前三包责任区",
    "code": "UM-Space-005-005",
    "level": 3,
    "domain": "空间区域",
    "definition": "门前三包责任区是重点管控空间下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "space-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "space-005",
        "targetName": "重点管控空间",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001",
    "name": "发现受理状态",
    "code": "UM-Status-001",
    "level": 2,
    "domain": "事件状态",
    "definition": "事件从线索发现到进入办理系统的初始状态。",
    "parentId": "event-status",
    "childrenIds": [
      "status-001-001",
      "status-001-002",
      "status-001-003",
      "status-001-004",
      "status-001-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "event-status",
        "targetName": "事件状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001-001",
    "name": "智能识别",
    "code": "UM-Status-001-001",
    "level": 3,
    "domain": "事件状态",
    "definition": "智能识别是发现受理状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-001",
        "targetName": "发现受理状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001-002",
    "name": "群众投诉",
    "code": "UM-Status-001-002",
    "level": 3,
    "domain": "事件状态",
    "definition": "群众投诉是发现受理状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-001",
        "targetName": "发现受理状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001-003",
    "name": "巡查发现",
    "code": "UM-Status-001-003",
    "level": 3,
    "domain": "事件状态",
    "definition": "巡查发现是发现受理状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-001",
        "targetName": "发现受理状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001-004",
    "name": "案件受理",
    "code": "UM-Status-001-004",
    "level": 3,
    "domain": "事件状态",
    "definition": "案件受理是发现受理状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-001",
        "targetName": "发现受理状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-001-005",
    "name": "重复件合并",
    "code": "UM-Status-001-005",
    "level": 3,
    "domain": "事件状态",
    "definition": "重复件合并是发现受理状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-001",
        "targetName": "发现受理状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002",
    "name": "核查立案状态",
    "code": "UM-Status-002",
    "level": 2,
    "domain": "事件状态",
    "definition": "对事件真实性、管辖权和违法事实进行确认的状态。",
    "parentId": "event-status",
    "childrenIds": [
      "status-002-001",
      "status-002-002",
      "status-002-003",
      "status-002-004",
      "status-002-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "event-status",
        "targetName": "事件状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002-001",
    "name": "待核查",
    "code": "UM-Status-002-001",
    "level": 3,
    "domain": "事件状态",
    "definition": "待核查是核查立案状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-002",
        "targetName": "核查立案状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002-002",
    "name": "核查通过",
    "code": "UM-Status-002-002",
    "level": 3,
    "domain": "事件状态",
    "definition": "核查通过是核查立案状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-002",
        "targetName": "核查立案状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002-003",
    "name": "不予受理",
    "code": "UM-Status-002-003",
    "level": 3,
    "domain": "事件状态",
    "definition": "不予受理是核查立案状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-002",
        "targetName": "核查立案状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002-004",
    "name": "立案处理中",
    "code": "UM-Status-002-004",
    "level": 3,
    "domain": "事件状态",
    "definition": "立案处理中是核查立案状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-002",
        "targetName": "核查立案状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-002-005",
    "name": "退回补正",
    "code": "UM-Status-002-005",
    "level": 3,
    "domain": "事件状态",
    "definition": "退回补正是核查立案状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-002",
        "targetName": "核查立案状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003",
    "name": "处置执行状态",
    "code": "UM-Status-003",
    "level": 2,
    "domain": "事件状态",
    "definition": "事件进入现场处置、整改、处罚或强制执行的状态。",
    "parentId": "event-status",
    "childrenIds": [
      "status-003-001",
      "status-003-002",
      "status-003-003",
      "status-003-004",
      "status-003-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "event-status",
        "targetName": "事件状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003-001",
    "name": "责令改正中",
    "code": "UM-Status-003-001",
    "level": 3,
    "domain": "事件状态",
    "definition": "责令改正中是处置执行状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-003",
        "targetName": "处置执行状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003-002",
    "name": "限期整改中",
    "code": "UM-Status-003-002",
    "level": 3,
    "domain": "事件状态",
    "definition": "限期整改中是处置执行状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-003",
        "targetName": "处置执行状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003-003",
    "name": "行政处罚中",
    "code": "UM-Status-003-003",
    "level": 3,
    "domain": "事件状态",
    "definition": "行政处罚中是处置执行状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-003",
        "targetName": "处置执行状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003-004",
    "name": "强制执行中",
    "code": "UM-Status-003-004",
    "level": 3,
    "domain": "事件状态",
    "definition": "强制执行中是处置执行状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-003",
        "targetName": "处置执行状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-003-005",
    "name": "协同处置中",
    "code": "UM-Status-003-005",
    "level": 3,
    "domain": "事件状态",
    "definition": "协同处置中是处置执行状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-003",
        "targetName": "处置执行状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004",
    "name": "结案评价状态",
    "code": "UM-Status-004",
    "level": 2,
    "domain": "事件状态",
    "definition": "事件处置完成后的复核、评价、归档和复议状态。",
    "parentId": "event-status",
    "childrenIds": [
      "status-004-001",
      "status-004-002",
      "status-004-003",
      "status-004-004",
      "status-004-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "event-status",
        "targetName": "事件状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004-001",
    "name": "已整改",
    "code": "UM-Status-004-001",
    "level": 3,
    "domain": "事件状态",
    "definition": "已整改是结案评价状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-004",
        "targetName": "结案评价状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004-002",
    "name": "复核通过",
    "code": "UM-Status-004-002",
    "level": 3,
    "domain": "事件状态",
    "definition": "复核通过是结案评价状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-004",
        "targetName": "结案评价状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004-003",
    "name": "结案归档",
    "code": "UM-Status-004-003",
    "level": 3,
    "domain": "事件状态",
    "definition": "结案归档是结案评价状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-004",
        "targetName": "结案评价状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004-004",
    "name": "超期未办结",
    "code": "UM-Status-004-004",
    "level": 3,
    "domain": "事件状态",
    "definition": "超期未办结是结案评价状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-004",
        "targetName": "结案评价状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "status-004-005",
    "name": "复议诉讼中",
    "code": "UM-Status-004-005",
    "level": 3,
    "domain": "事件状态",
    "definition": "复议诉讼中是结案评价状态下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "status-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "status-004",
        "targetName": "结案评价状态",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-001",
    "name": "城管街道协同",
    "code": "UM-Collaboration-001",
    "level": 2,
    "domain": "协同处置",
    "definition": "城市管理综合执法部门与街道、社区网格之间的发现、派遣和整改协同。",
    "parentId": "collaborative-disposal",
    "childrenIds": [
      "collab-001-001",
      "collab-001-002",
      "collab-001-003",
      "collab-001-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collaborative-disposal",
        "targetName": "协同处置",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-001-001",
    "name": "街道派单",
    "code": "UM-Collaboration-001-001",
    "level": 3,
    "domain": "协同处置",
    "definition": "街道派单是城管街道协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-001",
        "targetName": "城管街道协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-001-002",
    "name": "社区协查",
    "code": "UM-Collaboration-001-002",
    "level": 3,
    "domain": "协同处置",
    "definition": "社区协查是城管街道协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-001",
        "targetName": "城管街道协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-001-003",
    "name": "网格巡查联动",
    "code": "UM-Collaboration-001-003",
    "level": 3,
    "domain": "协同处置",
    "definition": "网格巡查联动是城管街道协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-001",
        "targetName": "城管街道协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-001-004",
    "name": "门前三包联管",
    "code": "UM-Collaboration-001-004",
    "level": 3,
    "domain": "协同处置",
    "definition": "门前三包联管是城管街道协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-001",
        "targetName": "城管街道协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-002",
    "name": "城管住建协同",
    "code": "UM-Collaboration-002",
    "level": 2,
    "domain": "协同处置",
    "definition": "涉及施工工地、建筑垃圾、燃气、排水和物业事项的住建协同。",
    "parentId": "collaborative-disposal",
    "childrenIds": [
      "collab-002-001",
      "collab-002-002",
      "collab-002-003",
      "collab-002-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collaborative-disposal",
        "targetName": "协同处置",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-002-001",
    "name": "工地扬尘协同",
    "code": "UM-Collaboration-002-001",
    "level": 3,
    "domain": "协同处置",
    "definition": "工地扬尘协同是城管住建协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-002",
        "targetName": "城管住建协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-002-002",
    "name": "建筑垃圾协同",
    "code": "UM-Collaboration-002-002",
    "level": 3,
    "domain": "协同处置",
    "definition": "建筑垃圾协同是城管住建协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-002",
        "targetName": "城管住建协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-002-003",
    "name": "燃气安全协同",
    "code": "UM-Collaboration-002-003",
    "level": 3,
    "domain": "协同处置",
    "definition": "燃气安全协同是城管住建协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-002",
        "targetName": "城管住建协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-002-004",
    "name": "物业小区协同",
    "code": "UM-Collaboration-002-004",
    "level": 3,
    "domain": "协同处置",
    "definition": "物业小区协同是城管住建协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-002",
        "targetName": "城管住建协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-003",
    "name": "城管生态环境协同",
    "code": "UM-Collaboration-003",
    "level": 2,
    "domain": "协同处置",
    "definition": "涉及油烟、噪声、焚烧、水污染等生态环境事项的协同。",
    "parentId": "collaborative-disposal",
    "childrenIds": [
      "collab-003-001",
      "collab-003-002",
      "collab-003-003",
      "collab-003-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collaborative-disposal",
        "targetName": "协同处置",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-003-001",
    "name": "油烟检测协同",
    "code": "UM-Collaboration-003-001",
    "level": 3,
    "domain": "协同处置",
    "definition": "油烟检测协同是城管生态环境协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-003",
        "targetName": "城管生态环境协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-003-002",
    "name": "噪声监测协同",
    "code": "UM-Collaboration-003-002",
    "level": 3,
    "domain": "协同处置",
    "definition": "噪声监测协同是城管生态环境协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-003",
        "targetName": "城管生态环境协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-003-003",
    "name": "露天焚烧协同",
    "code": "UM-Collaboration-003-003",
    "level": 3,
    "domain": "协同处置",
    "definition": "露天焚烧协同是城管生态环境协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-003",
        "targetName": "城管生态环境协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-003-004",
    "name": "水体污染协同",
    "code": "UM-Collaboration-003-004",
    "level": 3,
    "domain": "协同处置",
    "definition": "水体污染协同是城管生态环境协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-003",
        "targetName": "城管生态环境协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-004",
    "name": "城管公安交管协同",
    "code": "UM-Collaboration-004",
    "level": 2,
    "domain": "协同处置",
    "definition": "涉及交通秩序、车辆停放、道路安全和阻碍执法的协同。",
    "parentId": "collaborative-disposal",
    "childrenIds": [
      "collab-004-001",
      "collab-004-002",
      "collab-004-003",
      "collab-004-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collaborative-disposal",
        "targetName": "协同处置",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-004-001",
    "name": "违停联管",
    "code": "UM-Collaboration-004-001",
    "level": 3,
    "domain": "协同处置",
    "definition": "违停联管是城管公安交管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-004",
        "targetName": "城管公安交管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-004-002",
    "name": "交通疏导协同",
    "code": "UM-Collaboration-004-002",
    "level": 3,
    "domain": "协同处置",
    "definition": "交通疏导协同是城管公安交管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-004",
        "targetName": "城管公安交管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-004-003",
    "name": "阻碍执法处置",
    "code": "UM-Collaboration-004-003",
    "level": 3,
    "domain": "协同处置",
    "definition": "阻碍执法处置是城管公安交管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-004",
        "targetName": "城管公安交管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-004-004",
    "name": "道路安全隐患协同",
    "code": "UM-Collaboration-004-004",
    "level": 3,
    "domain": "协同处置",
    "definition": "道路安全隐患协同是城管公安交管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-004",
        "targetName": "城管公安交管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-005",
    "name": "城管市场监管协同",
    "code": "UM-Collaboration-005",
    "level": 2,
    "domain": "协同处置",
    "definition": "涉及无证无照经营、食品安全、经营主体资格等事项的协同。",
    "parentId": "collaborative-disposal",
    "childrenIds": [
      "collab-005-001",
      "collab-005-002",
      "collab-005-003",
      "collab-005-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collaborative-disposal",
        "targetName": "协同处置",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-005-001",
    "name": "无照经营移送",
    "code": "UM-Collaboration-005-001",
    "level": 3,
    "domain": "协同处置",
    "definition": "无照经营移送是城管市场监管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-005",
        "targetName": "城管市场监管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-005-002",
    "name": "餐饮经营协同",
    "code": "UM-Collaboration-005-002",
    "level": 3,
    "domain": "协同处置",
    "definition": "餐饮经营协同是城管市场监管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-005",
        "targetName": "城管市场监管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-005-003",
    "name": "市场周边整治",
    "code": "UM-Collaboration-005-003",
    "level": 3,
    "domain": "协同处置",
    "definition": "市场周边整治是城管市场监管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-005",
        "targetName": "城管市场监管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "collab-005-004",
    "name": "摊群点治理协同",
    "code": "UM-Collaboration-005-004",
    "level": 3,
    "domain": "协同处置",
    "definition": "摊群点治理协同是城管市场监管协同下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "collab-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "collab-005",
        "targetName": "城管市场监管协同",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-001",
    "name": "不予处罚规则",
    "code": "UM-Discretion-001",
    "level": 2,
    "domain": "裁量规则",
    "definition": "符合首违不罚、轻微免罚、及时改正等条件时适用的不予处罚规则。",
    "parentId": "discretion-rule",
    "childrenIds": [
      "disc-001-001",
      "disc-001-002",
      "disc-001-003",
      "disc-001-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "discretion-rule",
        "targetName": "裁量规则",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-001-001",
    "name": "首违不罚",
    "code": "UM-Discretion-001-001",
    "level": 3,
    "domain": "裁量规则",
    "definition": "首违不罚是不予处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-001",
        "targetName": "不予处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-001-002",
    "name": "轻微免罚",
    "code": "UM-Discretion-001-002",
    "level": 3,
    "domain": "裁量规则",
    "definition": "轻微免罚是不予处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-001",
        "targetName": "不予处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-001-003",
    "name": "及时改正免罚",
    "code": "UM-Discretion-001-003",
    "level": 3,
    "domain": "裁量规则",
    "definition": "及时改正免罚是不予处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-001",
        "targetName": "不予处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-001-004",
    "name": "违法事实不能成立",
    "code": "UM-Discretion-001-004",
    "level": 3,
    "domain": "裁量规则",
    "definition": "违法事实不能成立是不予处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-001",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-001",
        "targetName": "不予处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-002",
    "name": "从轻减轻规则",
    "code": "UM-Discretion-002",
    "level": 2,
    "domain": "裁量规则",
    "definition": "根据危害后果、主观过错、整改态度等因素从轻或减轻处罚的规则。",
    "parentId": "discretion-rule",
    "childrenIds": [
      "disc-002-001",
      "disc-002-002",
      "disc-002-003",
      "disc-002-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "discretion-rule",
        "targetName": "裁量规则",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-002-001",
    "name": "主动消除危害",
    "code": "UM-Discretion-002-001",
    "level": 3,
    "domain": "裁量规则",
    "definition": "主动消除危害是从轻减轻规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-002",
        "targetName": "从轻减轻规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-002-002",
    "name": "配合调查取证",
    "code": "UM-Discretion-002-002",
    "level": 3,
    "domain": "裁量规则",
    "definition": "配合调查取证是从轻减轻规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-002",
        "targetName": "从轻减轻规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-002-003",
    "name": "受他人胁迫违法",
    "code": "UM-Discretion-002-003",
    "level": 3,
    "domain": "裁量规则",
    "definition": "受他人胁迫违法是从轻减轻规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-002",
        "targetName": "从轻减轻规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-002-004",
    "name": "未造成严重后果",
    "code": "UM-Discretion-002-004",
    "level": 3,
    "domain": "裁量规则",
    "definition": "未造成严重后果是从轻减轻规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-002",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-002",
        "targetName": "从轻减轻规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-003",
    "name": "一般裁量规则",
    "code": "UM-Discretion-003",
    "level": 2,
    "domain": "裁量规则",
    "definition": "对常见违法事项按违法情节、面积、次数、金额、持续时间等划分处罚档次的规则。",
    "parentId": "discretion-rule",
    "childrenIds": [
      "disc-003-001",
      "disc-003-002",
      "disc-003-003",
      "disc-003-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "discretion-rule",
        "targetName": "裁量规则",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-003-001",
    "name": "违法面积裁量",
    "code": "UM-Discretion-003-001",
    "level": 3,
    "domain": "裁量规则",
    "definition": "违法面积裁量是一般裁量规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-003",
        "targetName": "一般裁量规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-003-002",
    "name": "违法次数裁量",
    "code": "UM-Discretion-003-002",
    "level": 3,
    "domain": "裁量规则",
    "definition": "违法次数裁量是一般裁量规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-003",
        "targetName": "一般裁量规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-003-003",
    "name": "持续时间裁量",
    "code": "UM-Discretion-003-003",
    "level": 3,
    "domain": "裁量规则",
    "definition": "持续时间裁量是一般裁量规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-003",
        "targetName": "一般裁量规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-003-004",
    "name": "经营收益裁量",
    "code": "UM-Discretion-003-004",
    "level": 3,
    "domain": "裁量规则",
    "definition": "经营收益裁量是一般裁量规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-003",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-003",
        "targetName": "一般裁量规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-004",
    "name": "从重处罚规则",
    "code": "UM-Discretion-004",
    "level": 2,
    "domain": "裁量规则",
    "definition": "对拒不改正、妨碍执法、屡次违法、造成严重后果等情形从重处罚的规则。",
    "parentId": "discretion-rule",
    "childrenIds": [
      "disc-004-001",
      "disc-004-002",
      "disc-004-003",
      "disc-004-004"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "discretion-rule",
        "targetName": "裁量规则",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-004-001",
    "name": "拒不改正",
    "code": "UM-Discretion-004-001",
    "level": 3,
    "domain": "裁量规则",
    "definition": "拒不改正是从重处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-004",
        "targetName": "从重处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-004-002",
    "name": "阻碍执法",
    "code": "UM-Discretion-004-002",
    "level": 3,
    "domain": "裁量规则",
    "definition": "阻碍执法是从重处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-004",
        "targetName": "从重处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-004-003",
    "name": "多次违法",
    "code": "UM-Discretion-004-003",
    "level": 3,
    "domain": "裁量规则",
    "definition": "多次违法是从重处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-004",
        "targetName": "从重处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-004-004",
    "name": "造成重大影响",
    "code": "UM-Discretion-004-004",
    "level": 3,
    "domain": "裁量规则",
    "definition": "造成重大影响是从重处罚规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-004",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-004",
        "targetName": "从重处罚规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005",
    "name": "强制执行规则",
    "code": "UM-Discretion-005",
    "level": 2,
    "domain": "裁量规则",
    "definition": "限期拆除、代履行、查封扣押和申请法院强制执行等强制规则。",
    "parentId": "discretion-rule",
    "childrenIds": [
      "disc-005-001",
      "disc-005-002",
      "disc-005-003",
      "disc-005-004",
      "disc-005-005"
    ],
    "relations": [
      {
        "type": "is-a",
        "targetId": "discretion-rule",
        "targetName": "裁量规则",
        "confidence": 1
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "branch"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005-001",
    "name": "限期拆除",
    "code": "UM-Discretion-005-001",
    "level": 3,
    "domain": "裁量规则",
    "definition": "限期拆除是强制执行规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-005",
        "targetName": "强制执行规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005-002",
    "name": "强制拆除",
    "code": "UM-Discretion-005-002",
    "level": 3,
    "domain": "裁量规则",
    "definition": "强制拆除是强制执行规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-005",
        "targetName": "强制执行规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005-003",
    "name": "代履行",
    "code": "UM-Discretion-005-003",
    "level": 3,
    "domain": "裁量规则",
    "definition": "代履行是强制执行规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-005",
        "targetName": "强制执行规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005-004",
    "name": "查封扣押",
    "code": "UM-Discretion-005-004",
    "level": 3,
    "domain": "裁量规则",
    "definition": "查封扣押是强制执行规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-005",
        "targetName": "强制执行规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },
  {
    "id": "disc-005-005",
    "name": "申请法院执行",
    "code": "UM-Discretion-005-005",
    "level": 3,
    "domain": "裁量规则",
    "definition": "申请法院执行是强制执行规则下的标准概念，用于城管语义识别、对象定位、事件归类、规则匹配和协同处置。",
    "parentId": "disc-005",
    "childrenIds": [],
    "relations": [
      {
        "type": "is-a",
        "targetId": "disc-005",
        "targetName": "强制执行规则",
        "confidence": 1
      },
      {
        "type": "has-penalty",
        "targetId": "penalty-type",
        "targetName": "处罚类型",
        "confidence": 0.9
      }
    ],
    "sourceLaw": null,
    "properties": {
      "category": "leaf"
    },
    "createdAt": "2026-07-07",
    "updatedAt": "2026-07-07"
  },

];


const SOURCE_FILE_MAP: Record<string, string> = {
  '《中华人民共和国行政处罚法》': 'L0 国家法律层/中华人民共和国行政处罚法.pdf',
  '《中华人民共和国行政强制法》': 'L0 国家法律层/中华人民共和国行政强制法.pdf',
  '《中华人民共和国行政复议法》': 'L0 国家法律层/中华人民共和国行政复议法_20230901.docx',
  '《中华人民共和国行政诉讼法》': 'L0 国家法律层/中华人民共和国行政诉讼法_20170627.docx',
  '《中华人民共和国行政许可法》': 'L0 国家法律层/中华人民共和国行政许可法.pdf',
  '《中华人民共和国城乡规划法》': 'L0 国家法律层/中华人民共和国城乡规划法.pdf',
  '《中华人民共和国环境保护法》': 'L0 国家法律层/中华人民共和国环境保护法_20140424.docx',
  '《中华人民共和国大气污染防治法》': 'L0 国家法律层/中华人民共和国大气污染防治法.pdf',
  '《中华人民共和国噪声污染防治法》': 'L0 国家法律层/中华人民共和国噪声污染防治法.pdf',
  '《中华人民共和国固体废物污染环境防治法》': 'L0 国家法律层/中华人民共和国固体废物污染环境防治法.pdf',
  '《中华人民共和国道路交通安全法》': 'L0 国家法律层/中华人民共和国道路交通安全法_20210429.docx',
  '《中华人民共和国国家赔偿法》': 'L0 国家法律层/中华人民共和国国家赔偿法_20121026.docx',
  '《国有土地上房屋征收与补偿条例》': 'L1 行政法规层/国有土地上房屋征收与补偿条例_20110121.docx',
  '《城市市容和环境卫生管理条例》': 'L1 行政法规层/城市市容和环境卫生管理条例.pdf',
  '《城市绿化条例》': 'L1 行政法规层/城市绿化条例.pdf',
  '《城市道路管理条例》': 'L1 行政法规层/城市道路管理条例.pdf',
  '《无证无照经营查处办法》': 'L1 行政法规层/无证无照经营查处办法_20170806.docx',
  '《城市管理执法办法》': 'L2 部门规章国家级规范性文件/城市管理执法办法.docx',
  '《城市管理执法行为规范》': 'L2 部门规章国家级规范性文件/城市管理执法行为规范.docx',
  '《城市公园管理办法》': 'L2 部门规章国家级规范性文件/城市公园管理办法.docx',
  '《城市生活垃圾管理办法》': 'L2 部门规章国家级规范性文件/城市生活垃圾管理办法.docx',
  '《城市管理执法制式服装和标志标识管理办法》': 'L2 部门规章国家级规范性文件/城市管理执法制式服装和标志标识管理办法.doc',
  '《住房和城乡建设行政处罚程序规定》': 'L2 部门规章国家级规范性文件/住房和城乡建设行政处罚程序规定.docx',
  '《GB/T 30428.2-2013 数字化城市管理信息系统 第2部分：管理部件》': 'L3 国家行业技术标准/GB／T 30428.2-2013 数字化城市管理信息系统 第2部分：管理部件.pdf',
  '《城市容貌标准》': 'L3 国家行业技术标准/城市容貌标准.pdf',
  '《城市道路清扫保洁与质量评价标准》': 'L3 国家行业技术标准/城市道路清扫保洁与质量评价标准.pdf',
  '《城市生活垃圾分类收集设施配置规范》': 'L3 国家行业技术标准/城市生活垃圾分类收集设施配置规范.pdf',
  '《城市运行管理服务平台 第2部分》': 'L3 国家行业技术标准/住房城乡建设部办公厅关于国家标准《城市运行管理服务 平台　第2部分.pdf',
  '《城市运行管理服务平台 管理监督指标及评价标准》': 'L3 国家行业技术标准/城市运行管理服务平台 管理监督指标及评价标准.pdf',
  '《环境卫生设施设置标准》': 'L3 国家行业技术标准/环境卫生设施设置标准.pdf',
  '《生活垃圾焚烧污染控制标准》': 'L3 国家行业技术标准/生活垃圾焚烧污染控制标准.pdf',
};

function toSourceFile(sourceLaw: string | null | undefined): string | undefined {
  if (!sourceLaw) return undefined;
  return SOURCE_FILE_MAP[sourceLaw];
}

function toLawDisplayName(c: Concept): string {
  return c.sourceLaw || `《${c.name.replace(/[《》]/g, '')}》`;
}
// ============================================
// Laws Data
// ============================================

export const laws: Law[] = concepts
  .filter((c) => c.domain === '法律法规体系' && c.level >= 3)
  .map((c) => ({
    id: c.id,
    name: toLawDisplayName(c),
    shortName: toLawDisplayName(c),
    code: c.code,
    level: c.level as 1 | 2 | 3 | 4,
    category: c.parentId === 'national-law' ? '法律' : c.parentId === 'administrative-regulation' ? '行政法规' : c.parentId === 'departmental-rule' ? '部门规章' : '技术标准',
    effectiveDate: c.properties.effectiveDate || '2017-01-01',
    status: (c.properties.status as '现行有效' | '已废止' | '即将施行') || '现行有效',
    scope: c.definition.substring(0, 60) + '...',
    sourceFile: toSourceFile(c.sourceLaw),
    conceptIds: c.relations.map((r) => r.targetId),
  }));

// ============================================
// Constraints Data
// ============================================

export const constraints: Constraint[] = [
  { id: 'c-001', sourceId: 'viol-001', sourceName: '占道经营违规', relationType: 'has-penalty', targetId: 'pen-002', targetName: '罚款', requirement: 'requires-evidence 包含 现场笔录', sourceLaw: '《行政处罚法》第37条', confidence: 0.98 },
  { id: 'c-002', sourceId: 'viol-001', sourceName: '占道经营违规', relationType: 'has-penalty', targetId: 'pen-001', targetName: '警告', requirement: '初次违法且危害后果轻微并及时改正的，可以不予行政处罚', sourceLaw: '《行政处罚法》第33条', confidence: 0.95 },
  { id: 'c-003', sourceId: 'viol-003', sourceName: '违法建设', relationType: 'has-penalty', targetId: 'pen-006', targetName: '查封扣押', requirement: '对正在实施的违法建设，可以查封施工现场', sourceLaw: '《行政强制法》第44条', confidence: 0.96 },
  { id: 'c-004', sourceId: 'viol-007', sourceName: '餐饮油烟超标', relationType: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', requirement: '需由具有资质的检测机构出具油烟排放检测报告', sourceLaw: '《大气污染防治法》第81条', confidence: 0.97 },
  { id: 'c-005', sourceId: 'action-001', sourceName: '行政处罚', relationType: 'has-procedure', targetId: 'proc-003', targetName: '告知陈述申辩', requirement: '作出处罚决定前必须告知当事人拟处罚内容及事实、理由、依据', sourceLaw: '《行政处罚法》第44条', confidence: 0.99 },
  { id: 'c-006', sourceId: 'action-001', sourceName: '行政处罚', relationType: 'has-procedure', targetId: 'proc-004', targetName: '听证', requirement: '较大数额罚款、责令停产停业、吊销许可证应当告知听证权利', sourceLaw: '《行政处罚法》第63条', confidence: 0.98 },
  { id: 'c-007', sourceId: 'viol-011', sourceName: '无证无照经营', relationType: 'has-penalty', targetId: 'pen-003', targetName: '没收违法所得财物', requirement: '对无证无照经营行为，没收违法所得并处以下罚款', sourceLaw: '《无证无照经营查处办法》第13条', confidence: 0.96 },
  { id: 'c-008', sourceId: 'viol-009', sourceName: '噪声超标扰民', relationType: 'requires-evidence', targetId: 'evd-005', targetName: '鉴定意见', requirement: '需由环境监测机构出具噪声检测报告', sourceLaw: '《噪声污染防治法》第59条', confidence: 0.95 },
  { id: 'c-009', sourceId: 'viol-002', sourceName: '违法设置户外广告', relationType: 'has-penalty', targetId: 'pen-002', targetName: '罚款', requirement: '责令限期拆除，逾期不拆除的依法强制拆除', sourceLaw: '《城市市容和环境卫生管理条例》第36条', confidence: 0.94 },
  { id: 'c-010', sourceId: 'viol-004', sourceName: '破坏城市绿地', relationType: 'has-penalty', targetId: 'pen-002', targetName: '罚款', requirement: '可以并处绿地建设费用1-3倍的罚款', sourceLaw: '《城市绿化条例》第27条', confidence: 0.93 },
  { id: 'c-011', sourceId: 'viol-005', sourceName: '城市道路违规', relationType: 'has-penalty', targetId: 'pen-002', targetName: '罚款', requirement: '擅自占用或挖掘城市道路的，责令限期改正', sourceLaw: '《城市道路管理条例》第27条', confidence: 0.95 },
  { id: 'c-012', sourceId: 'viol-006', sourceName: '垃圾违规处置', relationType: 'has-penalty', targetId: 'pen-002', targetName: '罚款', requirement: '对单位处5万-50万元罚款，对个人处100-500元罚款', sourceLaw: '《固体废物污染环境防治法》第111条', confidence: 0.96 },
  { id: 'c-013', sourceId: 'viol-008', sourceName: '露天焚烧', relationType: 'requires-evidence', targetId: 'evd-003', targetName: '视听资料', requirement: '需拍摄焚烧现场照片或视频作为证据', sourceLaw: '《大气污染防治法》第77条', confidence: 0.92 },
  { id: 'c-014', sourceId: 'viol-010', sourceName: '车辆违规停放', relationType: 'is-enforced-by', targetId: 'subj-004', targetName: '公安机关', requirement: '机动车违停由公安交管部门管辖，非机动车由城管部门管辖', sourceLaw: '《道路交通安全法》第56条', confidence: 0.90 },
  { id: 'c-015', sourceId: 'action-002', sourceName: '行政强制', relationType: 'has-procedure', targetId: 'proc-005', targetName: '法制审核', requirement: '行政强制措施实施前须经法制审核', sourceLaw: '《行政强制法》第18条', confidence: 0.95 },
  { id: 'c-016', sourceId: 'pen-006', sourceName: '查封扣押', relationType: 'requires-evidence', targetId: 'evd-004', targetName: '物证', requirement: '须制作查封扣押清单并由当事人签字确认', sourceLaw: '《行政强制法》第24条', confidence: 0.97 },
  { id: 'c-017', sourceId: 'pen-007', sourceName: '代履行', relationType: 'requires-evidence', targetId: 'evd-001', targetName: '现场笔录', requirement: '代履行前应送达决定书，代履行时制作现场笔录', sourceLaw: '《行政强制法》第51条', confidence: 0.94 },
  { id: 'c-018', sourceId: 'scene-005', sourceName: '环境保护执法', relationType: 'has-subject', targetId: 'subj-005', targetName: '生态环境部门', requirement: '大气污染、噪声污染执法需生态环境部门配合监测', sourceLaw: '《环境保护法》第10条', confidence: 0.92 },
  { id: 'c-019', sourceId: 'proc-006', sourceName: '作出决定', relationType: 'has-procedure', targetId: 'proc-005', targetName: '法制审核', requirement: '重大执法决定未经法制审核或审核未通过的，不得作出决定', sourceLaw: '《行政处罚法》第58条', confidence: 0.98 },
  { id: 'c-020', sourceId: 'viol-003', sourceName: '违法建设', relationType: 'has-penalty', targetId: 'pen-004', targetName: '责令停产停业', requirement: '对无法采取改正措施消除影响的，限期拆除或没收实物', sourceLaw: '《城乡规划法》第64条', confidence: 0.96 },
  { id: 'c-021', sourceId: 'viol-001', sourceName: '占道经营违规', relationType: 'is-targeted-at', targetId: 'tgt-001', targetName: '自然人', requirement: '流动摊贩违法主体一般为自然人', sourceLaw: '《行政处罚法》第4条', confidence: 0.90 },
  { id: 'c-022', sourceId: 'viol-007', sourceName: '餐饮油烟超标', relationType: 'is-targeted-at', targetId: 'tgt-002', targetName: '法人', requirement: '餐饮企业违法主体为法人或其他组织', sourceLaw: '《大气污染防治法》第81条', confidence: 0.92 },
  { id: 'c-023', sourceId: 'scene-001', sourceName: '市容环境卫生管理', relationType: 'is-regulated-by', targetId: 'legal-014', targetName: '城市市容和环境卫生管理条例', requirement: '市容环卫管理主要依据该行政法规', sourceLaw: '《城市市容和环境卫生管理条例》', confidence: 0.99 },
  { id: 'c-024', sourceId: 'action-003', sourceName: '行政许可', relationType: 'has-procedure', targetId: 'proc-001', targetName: '立案', requirement: '行政许可申请受理后应当登记立案', sourceLaw: '《行政许可法》第32条', confidence: 0.88 },
  { id: 'c-025', sourceId: 'pen-005', sourceName: '暂扣吊销许可证', relationType: 'requires-evidence', targetId: 'evd-006', targetName: '电子数据', requirement: '电子证照数据需同步注销或冻结', sourceLaw: '《行政处罚法》第9条', confidence: 0.85 },
  { id: 'c-026', sourceId: 'viol-006', sourceName: '垃圾违规处置', relationType: 'has-violation', targetId: 'viol-006-001', targetName: '生活垃圾违规', requirement: '未按规定分类投放生活垃圾的个人可处以罚款', sourceLaw: '《城市生活垃圾管理办法》第16条', confidence: 0.93 },
  { id: 'c-027', sourceId: 'proc-008', sourceName: '结案归档', relationType: 'has-procedure', targetId: 'proc-007', targetName: '送达执行', requirement: '案件执行完毕后方可结案归档', sourceLaw: '《城市管理执法办法》第29条', confidence: 0.95 },
  { id: 'c-028', sourceId: 'scene-004', sourceName: '违法建设治理', relationType: 'is-enforced-by', targetId: 'subj-001', targetName: '城市管理综合执法局', requirement: '违法建设查处由城管综合执法局牵头', sourceLaw: '《城市管理执法办法》第8条', confidence: 0.94 },
  { id: 'c-029', sourceId: 'action-004', sourceName: '行政检查', relationType: 'has-procedure', targetId: 'proc-002', targetName: '调查取证', requirement: '行政检查中发现的违法行为应及时调查取证', sourceLaw: '《行政处罚法》第54条', confidence: 0.93 },
  { id: 'c-030', sourceId: 'viol-009', sourceName: '噪声超标扰民', relationType: 'has-penalty', targetId: 'pen-001', targetName: '警告', requirement: '初次违反且及时改正的，可给予警告处罚', sourceLaw: '《噪声污染防治法》第61条', confidence: 0.90 },
];

// ============================================
// Utility functions
// ============================================

export function getConceptById(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

export function getChildren(parentId: string): Concept[] {
  return concepts.filter((c) => c.parentId === parentId);
}

export function getDomainCount(domain: string): number {
  return concepts.filter((c) => c.domain === domain && c.level > 1).length;
}

export function getLevelCount(level: number): number {
  return concepts.filter((c) => c.level === level).length;
}

export function searchConcepts(query: string): Concept[] {
  const lower = query.toLowerCase();
  return concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.code.toLowerCase().includes(lower) ||
      c.definition.toLowerCase().includes(lower)
  );
}

export function getConceptPath(conceptId: string): string[] {
  const path: string[] = [];
  let current = getConceptById(conceptId);
  while (current) {
    path.unshift(current.id);
    current = current.parentId ? getConceptById(current.parentId) : undefined;
  }
  return path;
}

export function getRelationsForConcept(conceptId: string): Relation[] {
  const concept = getConceptById(conceptId);
  return concept?.relations || [];
}

export function getIncomingRelations(conceptId: string): Array<{ type: string; sourceId: string; sourceName: string; confidence: number }> {
  const incoming: Array<{ type: string; sourceId: string; sourceName: string; confidence: number }> = [];
  for (const c of concepts) {
    for (const r of c.relations) {
      if (r.targetId === conceptId) {
        incoming.push({ type: r.type, sourceId: c.id, sourceName: c.name, confidence: r.confidence });
      }
    }
  }
  return incoming;
}

// Build adjacency list for graph
export function getGraphData() {
  const nodes = concepts.map((c) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    level: c.level,
    domain: c.domain,
    symbolSize: c.level === 1 ? 24 : c.level === 2 ? 18 : c.level === 3 ? 14 : 10,
    itemStyle: {
      color: DOMAIN_COLORS[c.domain]?.text || '#94A3B8',
    },
    label: {
      show: true,
      formatter: c.name,
      fontSize: c.level <= 2 ? 12 : 10,
    },
  }));

  const links: Array<{
    source: string;
    target: string;
    relationType: string;
    lineStyle: { color: string; type: string; width: number };
    label: { show: boolean; formatter: string; fontSize: number };
  }> = [];

  // Parent-child links (is-a)
  for (const c of concepts) {
    if (c.parentId) {
      links.push({
        source: c.parentId,
        target: c.id,
        relationType: 'is-a',
        lineStyle: { color: '#94A3B8', type: 'dashed', width: 1 },
        label: { show: false, formatter: 'is-a', fontSize: 9 },
      });
    }
  }

  // Semantic relation links
  for (const c of concepts) {
    for (const r of c.relations) {
      links.push({
        source: c.id,
        target: r.targetId,
        relationType: r.type,
        lineStyle: {
          color: RELATION_COLORS[r.type] || '#94A3B8',
          type: 'solid',
          width: 1.5,
        },
        label: { show: false, formatter: r.type, fontSize: 9 },
      });
    }
  }

  return { nodes, links };
}






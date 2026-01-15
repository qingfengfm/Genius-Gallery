
import { Artefact } from './types';

/**
 * 远程表格同步配置说明:
 * 1. 在 Google Sheets 中创建一个表格，表头顺序: ID, Name, ChineseName, Origin, Material, Status, Description, SvgPath, ImageUrl, Likes, Dislikes
 * 2. 填写作品数据。
 * 3. 点击 "文件" -> "共享" -> "发布到网络"。
 * 4. 选择 "整个文档" 和 "逗号分隔值 (.csv)"。
 * 5. 复制生成的链接并替换下方的 REMOTE_TABLE_URL。
 */
export const REMOTE_TABLE_URL = 'https://www.kdocs.cn/l/coDjIMkIZRks'; 

export const ARTEFACTS_RAW: Artefact[] = [
  {
    id: 'ICOSA-001',
    name: 'ANCIENT ICOSAHEDRON',
    chineseName: '虚实之境',
    origin: 'UNKNOWN',
    material: 'CRYSTAL MATRIX',
    status: 'STABLE',
    description: '古老的建筑与数学礼仪的结合，流光溢彩的艺术品。',
    svgPath: 'M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z M50 10 L50 90 M10 30 L90 30 M10 70 L90 70 M50 10 L10 70 M50 10 L90 70 M50 90 L10 30 M50 90 L90 30',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000',
    likes: 42,
    dislikes: 2,
    comments: []
  },
  {
    id: 'GEAR-402',
    name: 'ANCIENT GEARS',
    chineseName: '古老之轮',
    origin: 'FORGOTTEN SECTOR',
    material: 'METALLIC OXIDE',
    status: 'ACTIVE',
    description: '通过节点修复的能量系统中的古代零件。',
    svgPath: 'M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 M50 20 V10 M50 80 V90 M20 50 H10 M80 50 H90 M28 28 L20 20 M72 72 L80 80 M72 28 L80 20 M28 72 L20 80',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    likes: 128,
    dislikes: 5,
    comments: []
  },
  {
    id: 'CRYST-003',
    name: 'GLOWING CRYSTALS',
    chineseName: '暗雷之石',
    origin: 'ASTEROID BELT',
    material: 'PURE PHOTON',
    status: 'VIBRANT',
    description: '生物荧光结构，发出恒定波长的能量脉冲。',
    svgPath: 'M40 80 L30 40 L45 20 L60 40 L50 80 Z M65 85 L55 50 L65 35 L75 50 L70 85 Z',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
    likes: 89,
    dislikes: 0,
    comments: []
  },
  {
    id: 'ARCH-104',
    name: 'ARTHITACT',
    chineseName: '几何构型',
    origin: 'GRID WORLD',
    material: 'VOID MATTER',
    status: 'STABLE',
    description: '三种结构化建筑与几何离群值。',
    svgPath: 'M30 80 V40 H70 V80 M50 40 V15 M30 40 L50 15 L70 40',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    likes: 21,
    dislikes: 1,
    comments: []
  },
  {
    id: 'PYRAM-005',
    name: 'ARTITRACT MODEL',
    chineseName: '沙漠模型',
    origin: 'DESERT QUADRANT',
    material: 'SAND STONE',
    status: 'INERT',
    description: '代表古代沙漠世界建筑的数学模型。',
    svgPath: 'M50 20 L20 70 L80 70 Z M50 20 L35 70 M50 20 L65 70 M20 70 H80',
    imageUrl: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=1000',
    likes: 55,
    dislikes: 4,
    comments: []
  }
];


import { Artefact } from './types';

/**
 * 远程表格同步配置说明:
 * 1. 在 Google Sheets 中创建一个表格，表头顺序: ID, Name, ChineseName, Origin, Material, Status, Description, SvgPath, ImageUrl, Likes, Dislikes
 * 2. 填写作品数据。
 * 3. 点击 "文件" -> "共享" -> "发布到网络"。
 * 4. 选择 "整个文档" 和 "逗号分隔值 (.csv)"。
 * 5. 复制生成的链接并替换下方的 REMOTE_TABLE_URL。
 */
export const REMOTE_TABLE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQFBDTyiiBNOrnyaC8Mr_lGDsY53TrKdma_iMO-Jabb-mSWCS0RsSY47s7gRZ4pUFGzkc3cPRqPnia3/pub?output=csv'; 

export const ARTEFACTS_RAW: Artefact[] = [
  {
    id: '2个字，动物',
    name: '2个字，动物',
    chineseName: '牛蛙',
    origin: '66',
    material: '2026-01-13',
    status:'' ,
    description:'' ,
    svgPath:'' ,
    imageUrl: 'https://pic1.imgdb.cn/item/69662903363e238a1ffcc310.png',
    likes: 0,
    dislikes: 12,
    comments: []
  },
  {
    id: '2个字，人体',
    name: '2个字，人体',
    chineseName: '脐带',
    origin: '66',
    material: '2026-01-13',
    status:'' ,
    description: '球球：射精',
    svgPath:'' ,
    imageUrl: 'https://pic1.imgdb.cn/item/696766d50d2f7a6c41ee1fe7.jpg',
    likes: 0,
    dislikes: 12,
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

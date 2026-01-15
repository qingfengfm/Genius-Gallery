
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
[
  {
    "id": "2个字，动物",
    "name": "2个字，动物",
    "chineseName": "牛蛙",
    "origin": "66",
    "material": "2026-01-13",
    "status": "",
    "description": "",
    "svgPath": "",
    "imageUrl": "https://pic1.imgdb.cn/item/69662903363e238a1ffcc310.png",
    "likes": 0,
    "dislikes": 12,
    "comments": []
  },
  {
    "id": "2个字，人体",
    "name": "2个字，人体",
    "chineseName": "脐带",
    "origin": "66",
    "material": "2026-01-13",
    "status": "",
    "description": "球球：射精",
    "svgPath": "",
    "imageUrl": "https://pic1.imgdb.cn/item/696766d50d2f7a6c41ee1fe7.jpg",
    "likes": 5,
    "dislikes": 1,
    "comments": []
  },
  {
    "id": "3个字，历史人物",
    "name": "3个字，历史人物",
    "chineseName": "贾宝玉",
    "origin": "小赖",
    "material": "2026-01-13",
    "status": "",
    "description": "",
    "svgPath": "",
    "imageUrl": "https://pic1.imgdb.cn/item/696766c80d2f7a6c41ee1fcd.jpg",
    "likes": 3,
    "dislikes": 2,
    "comments": []
  },
  {
    "id": "3个字，节日",
    "name": "3个字，节日",
    "chineseName": "儿童节",
    "origin": "小赖",
    "material": "2026-01-13",
    "status": "",
    "description": "",
    "svgPath": "",
    "imageUrl": "https://pic1.imgdb.cn/item/6967669c0d2f7a6c41ee1f67.jpg",
    "likes": 2,
    "dislikes": 5,
    "comments": []
  },
  {
    "id": "3个字，食品",
    "name": "3个字，食品",
    "chineseName": "绿豆糕",
    "origin": "老马",
    "material": "2026-01-13",
    "status": "",
    "description": "",
    "svgPath": "",
    "imageUrl": "https://pic1.imgdb.cn/item/69676acb0d2f7a6c41ee23e3.jpg",
    "likes": 0,
    "dislikes": 6,
    "comments": []
  }
]
];

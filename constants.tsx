
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

];

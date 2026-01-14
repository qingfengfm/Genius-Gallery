
import { Artefact, Comment } from '../types';

/**
 * 将 CSV 字符串转换为 Artefact 数组
 * 预期 CSV 列顺序: ID, Name, ChineseName, Origin, Material, Status, Description, SvgPath, ImageUrl, Likes, Dislikes
 */
export const parseCSVData = (csvText: string): Artefact[] => {
  const lines = csvText.split('\n');
  const result: Artefact[] = [];
  
  // 跳过表头
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
    if (row.length < 9) continue;

    const [id, name, chineseName, origin, material, status, description, svgPath, imageUrl, likes, dislikes] = row;
    
    result.push({
      id,
      name,
      chineseName,
      origin,
      material,
      status: status || 'STABLE',
      description,
      svgPath,
      imageUrl: imageUrl || '',
      likes: parseInt(likes) || 0,
      dislikes: parseInt(dislikes) || 0,
      comments: []
    });
  }
  return result;
};

/**
 * 从远程 URL 获取数据
 */
export const fetchRemoteArtefacts = async (url: string): Promise<Artefact[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const text = await response.text();
    return parseCSVData(text);
  } catch (error) {
    console.error('Failed to fetch remote data:', error);
    throw error;
  }
};

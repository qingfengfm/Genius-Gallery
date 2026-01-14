
export enum ViewType {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  DETAIL = 'DETAIL'
}

export interface Comment {
  id: string;
  author: string; // Added author field
  text: string;
  timestamp: number;
}

export interface Artefact {
  id: string;
  name: string;
  chineseName: string;
  origin: string;
  material: string;
  status: string;
  description: string;
  svgPath: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

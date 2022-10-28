export interface AdType {
  id: number;
  img: string;
  advertiser: string;
  link: string;
  status: "OPEN" | "CLOSE";
}
export interface PositiveDataType {
  stat: string;
  긍정: number;
}

export interface NegativeDataType {
  stat: string;
  부정: number;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  hasChild: boolean;
}

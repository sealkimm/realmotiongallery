export interface Category {
  id: number;
  type: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  borderColor: string;
}

// 이거 categories 파일에 있을 내용 맞나???
export interface Example {
  id: number;
  type: string;
  title: string;
  description: string;
  image: string;
}

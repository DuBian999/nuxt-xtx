export interface Category {
  id: number;
  name: string;
  icon: string;
  parentId: number;
  children?: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  icon: string;
  categoryId: number;
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

import { Category } from './category.model';

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  category: Category;
}
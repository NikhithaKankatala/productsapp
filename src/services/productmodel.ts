export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    status: 'Active' | 'Inactive';
    description: string;
    image: string;
    stock: number;
  }
  
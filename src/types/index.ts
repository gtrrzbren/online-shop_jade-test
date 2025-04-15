
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }
  
 
  export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
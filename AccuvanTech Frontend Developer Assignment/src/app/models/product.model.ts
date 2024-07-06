export interface Product {
    id?: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    availability: {
      inStock: boolean;
      quantity: number;
    };
    attributes: { key: string, value: string }[];
  }
  
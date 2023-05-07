export interface IProduct {
  id: number | null;
    productId: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
  }
  
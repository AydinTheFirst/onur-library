export interface Book {
  _id: string;
  name: string;
  categoryId: string;
  author: string;
  createdAt: number;
  barcode: string;
  location: {
    cabinet: string;
    shelf: string;
  };
  notes: string;
  images: string[];
  qrCode?: string;
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: number;
}

export interface License {
  _id: string;
  key: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

export interface User {
  _id: string;
  displayName: string;
  username: string;
  email: string;
  password: string;
  tokenId: string;
  createdAt: number;
  isAdmin: boolean;
  licenseId: string;
  phoneNumber: string;
}

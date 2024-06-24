import { BookModel, IBook } from "@/database/models/Book";
import { CategoryModel } from "@/database/models/Category";

const categories = await CategoryModel.find();

const randomCategory = () => {
  return categories[
    Math.floor(Math.random() * categories.length)
  ]._id.toString();
};

const books: IBook[] = [
  {
    name: "The Lord of the Rings",
    categoryId: randomCategory(),
    author: "J.R.R. Tolkien",
    createdAt: Date.now(),
    barcode: "123456789",
    location: {
      cabinet: "A",
      shelf: "1",
    },
    notes: "A great book",
    images: [],
    qrCode: "123456789",
  },
  {
    name: "Harry Potter",
    categoryId: randomCategory(),
    author: "J.K. Rowling",
    createdAt: Date.now(),
    barcode: "123456789",
    location: {
      cabinet: "A",
      shelf: "1",
    },
    notes: "A great book",
    images: [],
    qrCode: "123456789",
  },
  {
    name: "The Hobbit",
    categoryId: randomCategory(),
    author: "J.R.R. Tolkien",
    createdAt: Date.now(),
    barcode: "123456789",
    location: {
      cabinet: "A",
      shelf: "1",
    },
    notes: "A great book",
    images: [],
    qrCode: "123456789",
  },

  {
    name: "The Great Gatsby",
    categoryId: randomCategory(),
    author: "F. Scott Fitzgerald",
    createdAt: Date.now(),
    barcode: "123456789",
    location: {
      cabinet: "A",
      shelf: "1",
    },
    notes: "A great book",
    images: [],
    qrCode: "123456789",
  },

  {
    name: "To Kill a Mockingbird",
    categoryId: randomCategory(),
    author: "Harper Lee",
    createdAt: Date.now(),
    barcode: "123456789",
    location: {
      cabinet: "A",
      shelf: "1",
    },
    notes: "A great book",
    images: [],
    qrCode: "123456789",
  },
];

export const migrateBooks = async () => {
  await BookModel.deleteMany({});
  await BookModel.insertMany(books);
};

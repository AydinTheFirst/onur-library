import { BookCard } from "@/components/BookCard";
import { useHttp } from "@/hooks/useHttp";
import { Book, Category } from "@/types";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/react";
import React, { Key, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";

export const Books = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const { data: books } = useHttp<Book[]>("/books");
  const { data: categories } = useHttp<Category[]>("/categories");

  useEffect(() => {
    if (books) setFilteredBooks(books);
  }, [books]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!books) return;
    const value = e.target.value.toLowerCase();
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(value),
    );
    setFilteredBooks(filtered);
  };

  const handleCategoryChange = (key: Key) => {
    if (!books) return;
    const value = key.toString();
    toast.info(`Kategori: ${value}`);
    if (!value) setFilteredBooks(books);
    if (value === "all") return setFilteredBooks(books);
    const filtered = books.filter((book) => book.categoryId === value);
    setFilteredBooks(filtered);
  };

  if (!books || !categories) return;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1>Books</h1>

        <div className="flex gap-3">
          <Autocomplete
            placeholder="Kategori seçin"
            onSelectionChange={(key: Key | null) => handleCategoryChange(key!)}
          >
            <AutocompleteItem key="all" value="">
              Tümü
            </AutocompleteItem>
            <AutocompleteSection>
              {categories.map((category) => (
                <AutocompleteItem key={category._id} value={category._id}>
                  {category.name}
                </AutocompleteItem>
              ))}
            </AutocompleteSection>
          </Autocomplete>

          <Input
            placeholder="Search books..."
            startContent={<FaSearch />}
            className="w-[200px]"
            onChange={handleSearch}
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

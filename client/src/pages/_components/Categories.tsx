import { BookCard } from "@/components/BookCard";
import { useHttp } from "@/hooks/useHttp";
import { Book, Category } from "@/types";

export const Categories = () => {
  const { data: categories } = useHttp<Category[]>("/categories");

  if (!categories) return;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <CategorySection key={category._id} category={category} />
        ))}
      </ul>
    </div>
  );
};

const CategorySection = ({ category }: { category: Category }) => {
  const { data: books } = useHttp<Book[]>(`/categories/${category._id}/books`);

  if (!books) return;

  return (
    <>
      <h2>{category.name}</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

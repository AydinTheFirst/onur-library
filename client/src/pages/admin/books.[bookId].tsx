import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { http, httpError } from "@/lib/http";
import { Book, Category } from "@/types";
import { sleep } from "@/utils";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const url = bookId === "new" ? "" : `/books/${bookId}`;
  const { data: book, isLoading } = useHttp<Book>(url);
  const { data: categories } = useHttp<Category[]>("/categories");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    data.location = {
      cabinet: data["location.cabinet"],
      shelf: data["location.shelf"],
    };

    try {
      book
        ? await http.put(`/books/${bookId}`, data)
        : await http.post("/books", data);
      toast.success("Başarıyla kaydedildi");
      await sleep(1000);
      navigate("/admin?tab=books");
    } catch (error) {
      httpError(error);
    }
  };

  if (isLoading || !categories) return;

  return (
    <HomeLayout>
      <div className="grid place-items-center">
        <Card className="w-full max-w-xl">
          <CardBody>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                label="Adı"
                name="name"
                defaultValue={book?.name}
                isRequired
              />
              <Input
                label="Yazarı"
                name="author"
                defaultValue={book?.author}
                isRequired
              />
              <Select
                label="Kategori"
                name="categoryId"
                defaultSelectedKeys={[book?.categoryId || ""]}
              >
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Bulunduğu Dolap"
                name="location.cabinet"
                defaultValue={book?.location.cabinet}
                isRequired
              />

              <Input
                label="Bulunduğu Raf"
                name="location.shelf"
                defaultValue={book?.location.shelf}
                isRequired
              />

              <Input
                label="Barkod"
                name="barcode"
                defaultValue={book?.barcode}
                isRequired
              />

              <Button type="submit" color="primary" size="sm">
                Kaydet
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>{" "}
    </HomeLayout>
  );
};

export default ViewBook;

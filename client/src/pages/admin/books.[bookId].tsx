import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { http, httpError } from "@/lib/http";
import { Book, Category } from "@/types";
import { getFileUrl, sleep } from "@/utils";
import {
  Button,
  Card,
  CardBody,
  Input,
  Progress,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { mutate } from "swr";

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
            <br />
            {book && <UpdateImages book={book} />}
          </CardBody>
        </Card>
      </div>{" "}
    </HomeLayout>
  );
};

const UpdateImages = ({ book }: { book: Book }) => {
  const [isLoading, setIsLoading] = useState(0);

  const handleImagesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await http.patch(`/books/${book._id}/images`, formData, {
        onUploadProgress: (progressEvent) => {
          setIsLoading((progressEvent.loaded / progressEvent.total!) * 100);
        },
      });
      toast.success("Başarıyla kaydedildi");
      await sleep(1000);
      mutate(`/books/${book._id}`);
    } catch (error) {
      httpError(error);
    }

    setIsLoading(0);
  };

  const deleteImage = async (image: string) => {
    const confirm = window.confirm("Silmek istediğinize emin misiniz?");
    if (!confirm) return;

    try {
      await http.delete(`/books/${book._id}/images/${image}`);
      toast.success("Başarıyla silindi");
      await sleep(1000);
      mutate(`/books/${book._id}`);
    } catch (error) {
      httpError(error);
    }
  };

  if (isLoading > 0) {
    return (
      <div className="grid place-items-center">
        <Progress
          label={`Yükleniyor lütfen bekleyin...`}
          value={isLoading}
          showValueLabel
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {book.images.map((image) => (
          <div className="relative">
            <img
              key={image}
              src={getFileUrl(image)}
              alt="resim"
              className="h-32 w-32 object-cover"
            />
            <Button
              color="danger"
              size="sm"
              className="absolute right-0 top-0"
              isIconOnly
              onClick={() => deleteImage(image)}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </div>
      <br />
      <form onSubmit={handleImagesSubmit} className="grid gap-3">
        <input type="file" name="images" accept="image/*" multiple />
        <Button type="submit" color="primary" size="sm">
          Resimleri Kaydet
        </Button>
      </form>
    </>
  );
};

export default ViewBook;

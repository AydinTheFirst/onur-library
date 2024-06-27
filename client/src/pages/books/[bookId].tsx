import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { Book } from "@/types";
import { Card, CardBody, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const ViewBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book } = useHttp<Book>(`/books/${bookId}`);

  if (!book) return null;

  return (
    <HomeLayout>
      <div className="grid place-items-center">
        <Card className="w-full max-w-xl">
          <CardBody className="grid gap-3">
            <Input label="İsim" value={book.name} isReadOnly />
            <Input label="Yazar" value={book.author} isReadOnly />

            <Input label="Kategori" value={book.category.name} isReadOnly />

            <Input
              label="Bulunduğu Dolap"
              value={book.location.cabinet}
              isReadOnly
            />
            <Input
              label="Bulunduğu Raf"
              value={book.location.shelf}
              isReadOnly
            />

            <Input label="Barkod" value={book.barcode} isReadOnly />

            <div className="grid h-40 w-full rounded bg-gray-200 text-black">
              <div className="grid grid-cols-3 place-items-center">
                <div>
                  <img
                    src={book.qrCode}
                    alt={book.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>{book.name}</div>
                <div
                  style={{
                    transform: "rotate(-90deg)",
                  }}
                >
                  {book.category.name}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </HomeLayout>
  );
};

export default ViewBook;

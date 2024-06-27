import { Book } from "@/types";
import { getFileUrl } from "@/utils";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const BookCard = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <Card shadow="sm" isPressable onPress={handlePress}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={book.name}
          className="h-[140px] w-full object-cover"
          src={getFileUrl(book.images[0])}
        />
      </CardBody>
      <CardFooter className="justify-between text-small">
        <b>{book.name}</b>
      </CardFooter>
    </Card>
  );
};

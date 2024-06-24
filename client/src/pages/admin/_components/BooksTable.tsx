import { useHttp } from "@/hooks/useHttp";
import { Book } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const BooksTable = () => {
  const navigate = useNavigate();
  const { data: books } = useHttp<Book[]>("/books");

  if (!books) return;

  const rows = books.map((book) => ({
    key: book._id,
    name: book.name,
    author: book.author,
    category: book.category.name,
  }));

  const columns = [
    {
      key: "name",
      label: "İsim",
    },
    {
      key: "author",
      label: "Yazar",
    },
    {
      key: "category",
      label: "Kategori",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      onRowAction={(key) => navigate(`/admin/books/${key.toString()}`)}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

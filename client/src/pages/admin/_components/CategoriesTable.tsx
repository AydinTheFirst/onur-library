import { useHttp } from "@/hooks/useHttp";
import { Category } from "@/types";
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

export const CategoriesTable = () => {
  const navigate = useNavigate();
  const { data: categories } = useHttp<Category[]>("/categories");

  if (!categories) return;

  const rows = categories.map((category) => ({
    key: category._id,
    name: category.name,
    description: category.description,
  }));

  const columns = [
    {
      key: "name",
      label: "İsim",
    },
    {
      key: "description",
      label: "Açıklama",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      onRowAction={(key) => navigate(`/admin/categories/${key.toString()}`)}
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

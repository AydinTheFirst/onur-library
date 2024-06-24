import { useHttp } from "@/hooks/useHttp";
import { License, User } from "@/types";
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

export const LicensesTable = () => {
  const navigate = useNavigate();
  const { data: licenses } = useHttp<License[]>("/licenses");
  const { data: users } = useHttp<User[]>("/users");

  if (!licenses) return;

  const rows = licenses.map((license) => ({
    key: license._id,
    name: license.key,
    user: users?.find((user) => user._id === license.userId)?.username,
    createdAt: new Date(license.createdAt).toLocaleDateString(),
    expiresAt: new Date(license.expiresAt).toLocaleDateString(),
  }));

  const columns = [
    {
      key: "name",
      label: "Anahtar",
    },
    {
      key: "user",
      label: "Kullanıcı",
    },
    {
      key: "createdAt",
      label: "Oluşturulma Tarihi",
    },
    {
      key: "expiresAt",
      label: "Bitiş Tarihi",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      onRowAction={(key) => navigate(`/admin/licenses/${key.toString()}`)}
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

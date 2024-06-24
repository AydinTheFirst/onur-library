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

export const UsersTable = () => {
  const navigate = useNavigate();
  const { data: users } = useHttp<User[]>("/users");
  const { data: licenses } = useHttp<License[]>("/licenses");

  if (!users) return;

  const rows = users.map((user) => ({
    key: user._id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    Lisans: licenses?.find((license) => license.userId === user._id)?.key,
  }));

  const columns = [
    {
      key: "username",
      label: "Kullanıcı Adı",
    },
    {
      key: "displayName",
      label: "Ad Soyad",
    },
    {
      key: "email",
      label: "E-posta",
    },
    {
      key: "Lisans",
      label: "Lisans",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      onRowAction={(key) => navigate(`/admin/users/${key.toString()}`)}
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

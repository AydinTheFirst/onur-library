import { Center } from "@/components/Center";
import { useHttp } from "@/hooks/useHttp";
import { User } from "@/types";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { data: me } = useHttp<User>("/auth/@me");

  if (!me) return null;

  if (!me.isAdmin) {
    return (
      <Center>
        <h1 className="text-center text-4xl font-bold">403</h1>
      </Center>
    );
  }

  return <Outlet />;
};

export default AdminLayout;

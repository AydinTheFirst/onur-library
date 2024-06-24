import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { http, httpError } from "@/lib/http";
import { User } from "@/types";
import { sleep } from "@/utils";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const url = userId === "new" ? "" : `/users/${userId}`;
  const { data: user, isLoading } = useHttp<User>(url);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      user
        ? await http.put(`/users/${userId}`, data)
        : await http.post("/users", data);
      toast.success("Başarıyla kaydedildi");
      await sleep(1000);
      navigate("/admin?tab=users");
    } catch (error) {
      httpError(error);
    }
  };

  if (isLoading) return;

  return (
    <HomeLayout>
      <div className="grid place-items-center">
        <Card className="w-full max-w-xl">
          <CardBody>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                label="Kullanıcı Adı"
                name="username"
                defaultValue={user?.username}
                isRequired
              />
              <Input
                label="Email"
                name="email"
                defaultValue={user?.email}
                isRequired
              />

              <Input
                label="İsim"
                name="displayName"
                defaultValue={user?.displayName}
                isRequired
              />

              <Input
                label="Telefon Numarası"
                name="phoneNumber"
                defaultValue={user?.phoneNumber}
                isRequired
              />

              <Input
                label="Şifre"
                name="password"
                defaultValue={user?.password}
                isRequired
              />
              <Button type="submit" color="primary" size="sm">
                Kaydet
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </HomeLayout>
  );
};

export default ViewUser;

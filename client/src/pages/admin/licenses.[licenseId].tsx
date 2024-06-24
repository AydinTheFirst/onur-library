import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { http, httpError } from "@/lib/http";
import { License, User } from "@/types";
import { generateKey, sleep } from "@/utils";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewLicense = () => {
  const navigate = useNavigate();
  const { licenseId } = useParams<{ licenseId: string }>();
  const url = licenseId === "new" ? "" : `/licenses/${licenseId}`;
  const { data: license, isLoading } = useHttp<License>(url);
  const { data: users } = useHttp<User[]>("/users");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (!license) return;
    setKey(license.key);
  }, [license]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    data.createdAt = new Date(data.createdAt).getTime();
    data.expiresAt = new Date(data.expiresAt).getTime();

    try {
      license
        ? await http.put(`/licenses/${licenseId}`, data)
        : await http.post("/licenses", data);
      toast.success("Başarıyla kaydedildi");
      await sleep(1000);
      navigate("/admin?tab=licenses");
    } catch (error) {
      httpError(error);
    }
  };

  const generate = () => {
    const key = generateKey(10);
    toast.success("Anahtar oluşturuldu: " + key);
    setKey(key);
  };

  const getInputDate = (timestamp?: number) => {
    if (!timestamp) timestamp = Date.now();
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  if (isLoading || !users) return;

  return (
    <HomeLayout>
      <div className="grid place-items-center">
        <Card className="w-full max-w-xl">
          <CardBody>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                label="Anahtar"
                name="key"
                value={key}
                isRequired
                endContent={
                  <Button
                    type="button"
                    size="sm"
                    color="primary"
                    onClick={generate}
                  >
                    Oluştur
                  </Button>
                }
              />
              <Select
                label="Kullanıcı"
                name="userId"
                defaultSelectedKeys={[license?.userId || ""]}
              >
                {users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.username}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Başlangıç Tarihi"
                name="createdAt"
                type="date"
                defaultValue={getInputDate(license?.createdAt)}
                isRequired
              />

              <Input
                label="Bitiş Tarihi"
                name="expiresAt"
                type="date"
                defaultValue={getInputDate(license?.expiresAt)}
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

export default ViewLicense;

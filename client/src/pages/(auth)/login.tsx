import { PasswordInput } from "@/components/PasswordInput";
import { http, httpError } from "@/lib/http";
import { useNavigate } from "@/router";
import { sleep } from "@/utils";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const res = await http.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Giriş başarılı!");
      await sleep(1000);
      navigate("/");
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <div className="container h-screen">
      <div className="grid h-full place-items-center">
        <Card className="w-full max-w-md">
          <CardBody>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                label="Mail / Kullanıcı Adı"
                name="username"
                type="text"
                placeholder="Mail / Kullanıcı Adı"
                isRequired
              />

              <PasswordInput label="Şifre" name="password" isRequired />

              <Button type="submit" color="primary">
                Giriş Yap
              </Button>
            </form>
            <br />
            <p className="text-center">
              Hesabınız yok mu?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary"
              >
                Kayıt ol
              </button>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;

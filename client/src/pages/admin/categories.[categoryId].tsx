import { useHttp } from "@/hooks/useHttp";
import { HomeLayout } from "@/layouts/HomeLayout";
import { http, httpError } from "@/lib/http";
import { Category } from "@/types";
import { sleep } from "@/utils";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const url = categoryId === "new" ? "" : `/categories/${categoryId}`;
  const { data: category, isLoading } = useHttp<Category>(url);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      category
        ? await http.put(`/categories/${categoryId}`, data)
        : await http.post("/categories", data);
      toast.success("Başarıyla kaydedildi");
      await sleep(1000);
      navigate("/admin?tab=categories");
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
                label="Name"
                name="name"
                defaultValue={category?.name}
                isRequired
              />
              <Input
                label="Description"
                name="description"
                defaultValue={category?.description}
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

export default ViewCategory;

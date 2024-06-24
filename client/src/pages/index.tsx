import { HomeLayout } from "@/layouts/HomeLayout";
import { Book } from "@/types";
import { Books } from "./_components/Books";
import { useHttp } from "@/hooks/useHttp";

const Home = () => {
  const { data: books } = useHttp<Book[]>("/books");

  if (!books) return;

  return (
    <HomeLayout>
      <Books />
    </HomeLayout>
  );
};

export default Home;

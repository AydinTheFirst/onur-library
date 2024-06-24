import { HomeLayout } from "@/layouts/HomeLayout";
import { Button, ButtonGroup, Tab, Tabs } from "@nextui-org/react";
import { BooksTable } from "./_components/BooksTable";
import { CategoriesTable } from "./_components/CategoriesTable";
import { LicensesTable } from "./_components/LicensesTable";
import { UsersTable } from "./_components/UsersTable";
import { Key, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    if (!tab) return;
    setActiveTab(tab);
  }, []);

  const handleTabChange = (key: Key) => {
    setActiveTab(key.toString());
    navigate(`/admin?tab=${key.toString()}`);
  };

  const activeComponent = () => {
    switch (activeTab) {
      case "users":
        return <UsersTable />;
      case "categories":
        return <CategoriesTable />;
      case "books":
        return <BooksTable />;
      case "licenses":
        return <LicensesTable />;
      default:
        return <UsersTable />;
    }
  };

  return (
    <HomeLayout>
      <h1>Admin</h1>
      <br />
      <div className="flex flex-wrap items-center justify-between gap-10 overflow-auto">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => handleTabChange(key)}
          color="primary"
        >
          <Tab key={"users"} title="Users" />
          <Tab key={"categories"} title="Categories" />
          <Tab key={"books"} title="Books"></Tab>
          <Tab key={"licenses"} title="Licenses" />
        </Tabs>
        <ButtonGroup size="sm" color="primary" variant="shadow">
          <Button as={Link} to={"/admin/users/new"}>
            Kullanıcı Ekle
          </Button>
          <Button as={Link} to={"/admin/categories/new"}>
            Kategori Ekle
          </Button>
          <Button as={Link} to={"/admin/books/new"}>
            Kitap Ekle
          </Button>
          <Button as={Link} to={"/admin/licenses/new"}>
            Lisans Ekle
          </Button>
        </ButtonGroup>
      </div>
      <br />
      {activeComponent()}
    </HomeLayout>
  );
};

export default Admin;

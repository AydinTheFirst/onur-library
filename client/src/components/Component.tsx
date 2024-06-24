import { Section } from "./Section";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import { toast } from "sonner";

export const Component = ({ children }: { children: React.ReactNode }) => {
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Register",
      path: "/register",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Users",
      path: "/dashboard/users",
    },
    {
      name: "404",
      path: "/404",
    },
  ];

  const pathname = useLocation()
    .pathname.split("/")
    .filter((path) => path);

  const Nav = () => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem to={"/"} as={Link}>
          Home
        </BreadcrumbItem>
        {pathname.map((path, index) => (
          <BreadcrumbItem key={index + path} href={`/${path}`}>
            {path}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    );
  };

  const handleClick = () => {
    const isError = Math.random() > 0.5;
    toast[isError ? "error" : "success"](
      isError ? "An error occurred" : "Success!",
    );
  };
  return (
    <Section>
      <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
        AydinTheFirst's React Template
      </h1>
      <br />
      <div>
        <Button onClick={handleClick}>Trigger Toast</Button>
      </div>
      <br />
      {children}
      <br />
      <h2 className="text-center text-xl font-bold">
        <Nav />
      </h2>
      <br />
      <div className="flex flex-wrap gap-3">
        {pages.map((page) => (
          <Link key={page.name} to={page.path}>
            {page.name}
          </Link>
        ))}
      </div>
    </Section>
  );
};

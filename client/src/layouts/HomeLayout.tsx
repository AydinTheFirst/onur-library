import { Navbar } from "./Navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container my-10">{children}</main>
    </>
  );
};

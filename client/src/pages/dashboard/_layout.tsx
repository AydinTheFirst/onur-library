import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="fixed left-0 top-0 flex h-16 w-full items-center justify-center bg-gradient-to-r from-primary-400 to-primary-500 text-white">
        <h1>Dashboard</h1>
      </div>
      <Outlet />
    </>
  );
};

export default DashboardLayout;

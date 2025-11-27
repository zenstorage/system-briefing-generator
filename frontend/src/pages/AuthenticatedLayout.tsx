import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AuthenticatedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;

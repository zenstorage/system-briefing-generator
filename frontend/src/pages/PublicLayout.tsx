import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const PublicLayout = () => {
  return (
    <>
      <Header showAuthButtons={false} />
      <Outlet />
    </>
  );
};

export default PublicLayout;

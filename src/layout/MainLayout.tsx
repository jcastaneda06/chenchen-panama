import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";

const pageNames: { [key: string]: string } = {
  "/planilla-asamblea": "Planilla Asamblea",
  "/canal": "Canal",
  "/": "",
};

const MainLayout = () => {
  const pathname = useLocation().pathname;
  console.log(pathname);
  return (
    <>
      <Navbar />
      <main className="mx-4 sm:mx-16 md:mx-24 lg:mx-64 pt-4">
        <h1 className="text-2xl font-bold">{pageNames[pathname]}</h1>
        {pathname !== "/" && (
          <span className="block border-b border-b-gray-300 w-full h-[1px] mb-4" />
        )}
        <Outlet />
      </main>
    </>
  );
};

MainLayout.displayName = "MainLayout";

export default MainLayout;

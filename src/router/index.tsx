import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import PlanillaAsamblea from "../pages/PlanillaAsamblea";
import Canal from "../pages/Canal";
import Navbar from "../components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "planilla-asamblea",
        element: <PlanillaAsamblea />,
      },
      {
        path: "canal",
        element: <Canal />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

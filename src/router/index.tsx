import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PlanillaAsamblea from "../pages/PlanillaAsamblea";
import Canal from "../pages/Canal";
import MainLayout from "../layout/MainLayout";
import Suggestions from "../pages/Suggestions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      {
        path: "sugerencias",
        element: <Suggestions />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

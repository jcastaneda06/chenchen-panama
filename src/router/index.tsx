import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PlanillaAsamblea from "../pages/PlanillaAsamblea";
import Documents from "../pages/Documents";
import MainLayout from "../layout/MainLayout";
import Suggestions from "../pages/Suggestions";
import RetirementCalculator from "../pages/RetirementCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "planilla-asamblea",
        element: <PlanillaAsamblea />,
      },
      {
        path: "documentos",
        element: <Documents />,
      },
      {
        path: "calculo-jubilacion",
        element: <RetirementCalculator />,
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

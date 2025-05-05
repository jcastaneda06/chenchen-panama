import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="flex">
      <Analytics />
      <div className="flex-col w-full">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

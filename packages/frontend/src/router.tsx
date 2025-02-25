import { createBrowserRouter } from "react-router";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "",
    element: <App page={"LOLCAT"} />,
  },
  {
    path: "about",
    element: <App page={"ABOUT"} />,
  },
]);

export default router;

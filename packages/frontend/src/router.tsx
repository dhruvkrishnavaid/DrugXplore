import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <App page={"LOLCAT"} />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "about",
    element: <App page={"ABOUT"} />,
  },
  {
    path: "profile",
    element: <App page={<Profile />} />,
  },
]);

export default router;

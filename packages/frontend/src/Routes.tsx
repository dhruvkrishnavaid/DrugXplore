import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import useAuthStore from "./hooks/useAuthStore";
import { User } from "firebase/auth";
import { RouterProvider } from "react-router/dom";

const router = (user: User | undefined) =>
  createBrowserRouter([
    {
      path: "",
      element: user ? <App page={"LOLCAT"} /> : <Landing />,
    },
    {
      path: "explore",
      element: <App page={"EXPLORE"} />,
    },
    {
      path: "history",
      element: <App page={"HISTORY"} />,
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

const Routes = () => {
  const authStore = useAuthStore();
  return <RouterProvider router={router(authStore.user)} />;
};

export default Routes;

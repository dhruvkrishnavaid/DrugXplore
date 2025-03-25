import { createBrowserRouter } from "react-router";
import App from "./App";
import Ayurveda from "./pages/Ayurveda";
import Discovery from "./pages/Discovery";
import Existing from "./pages/Existing";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <Landing />,
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
    path: "app",
    children: [
      {
        path: "",
        children: [{ path: "", element: <App page={"DASHBOARD"} /> }],
      },
      {
        path: "explore",
        children: [{ path: "", element: <App page={"EXPLORE"} /> }],
      },
      {
        path: "history",
        children: [{ path: "", element: <App page={"HISTORY"} /> }],
      },
      {
        path: "about",
        element: <App page={"ABOUT"} />,
      },
      {
        path: "generate",
        children: [
          {
            path: "",
            element: <App page={"GENERATE"} />,
          },
          {
            path: "ayurveda",
            element: <App page={<Ayurveda />} />,
          },
          {
            path: "discovery",
            element: <App page={<Discovery />} />,
          },
          {
            path: "existing",
            element: <App page={<Existing />} />,
          },
        ],
      },
      {
        path: "profile",
        children: [{ path: "", element: <App page={<Profile />} /> }],
      },
    ],
  },
]);

export default router;

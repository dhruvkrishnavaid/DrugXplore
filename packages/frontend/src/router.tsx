import { createBrowserRouter } from "react-router";
import App from "./App";
import Ayurveda from "./pages/Ayurveda";
import Discovery from "./pages/Discovery";
import Error from "./pages/Error";
import Existing from "./pages/Existing";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import Saved from "./pages/Saved";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <Landing />,
    errorElement: <Error />,
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
        path: "saved",
        children: [{ path: "", element: <App page={<Saved />} /> }],
      },
      {
        path: "about",
        element: <App page={"ABOUT"} />,
      },
      {
        path: "generate",
        children: [
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
      {
        path: ":type/:uid/results/:file",
        children: [{ path: "", element: <App page={<Results />} /> }],
      },
    ],
  },
]);

export default router;

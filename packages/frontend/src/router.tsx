import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const App = lazy(() => import("./App"));
const Ayurveda = lazy(() => import("./pages/Ayurveda"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Discovery = lazy(() => import("./pages/Discovery"));
const Error = lazy(() => import("./pages/Error"));
const Existing = lazy(() => import("./pages/Existing"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Results = lazy(() => import("./pages/Results"));
const Saved = lazy(() => import("./pages/Saved"));
const Signup = lazy(() => import("./pages/Signup"));

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
    path: ":type/:uid/results/:file",
    children: [{ path: "", element: <Results /> }],
  },
  {
    path: "app",
    children: [
      {
        path: "",
        children: [{ path: "", element: <App page={<Dashboard />} /> }],
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

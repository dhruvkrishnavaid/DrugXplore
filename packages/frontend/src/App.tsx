import { useEffect } from "react";
import { useNavigate } from "react-router";
import Bottombar from "./components/Bottombar";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./hooks/useAuthStore";
import { AppProps } from "./types";

const App = ({ page }: AppProps) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStore.user) {
      navigate("/login");
    }
  }, [authStore.user, navigate]);

  if (authStore.user) {
    return (
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col items-center w-full min-h-screen pb-16 md:pb-0 md:ml-80">
          {page}
        </div>
        <Bottombar />
      </div>
    );
  }
};

export default App;

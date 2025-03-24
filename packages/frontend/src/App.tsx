import { useNavigate } from "react-router";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./hooks/useAuthStore";
import { useEffect } from "react";

const App = ({ page }: { page: React.ReactNode }) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStore.token) {
      navigate("/login");
    }
  }, [authStore.token, navigate]);

  if (authStore.token) {
    return (
      <div className="flex bg-background">
        <Sidebar />
        <div className="flex flex-col items-center justify-center w-full min-h-screen ml-80">
          {page}
        </div>
      </div>
    );
  }
};

export default App;

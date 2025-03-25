import { useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./hooks/useAuthStore";

const App = ({ page }: { page: React.ReactNode }) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStore.user) {
      navigate("/login");
    }
  }, [authStore.user, navigate]);

  if (authStore.user) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center w-full min-h-screen ml-80">
          {page}
        </div>
      </div>
    );
  }
};

export default App;

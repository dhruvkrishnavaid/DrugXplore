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
      <div className="flex divide-x">
        <Sidebar />
        <div className="w-full ml-80 bg-neutral-50 min-h-screen flex flex-col items-center justify-center">
          {page}
        </div>
      </div>
    );
  }
};

export default App;

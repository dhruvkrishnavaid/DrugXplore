import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthStore from "../hooks/useAuthStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStore = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <div className="fixed flex flex-col h-screen p-2 w-80">
      <div className="flex flex-col h-full bg-white shadow-lg rounded-3xl">
        <div className="w-full p-6 font-black text-center">
          <h1 className="text-3xl signature">DrugXplore</h1>
        </div>

        <div className="flex flex-col items-center h-full gap-4">
          <ul className="flex flex-col w-full">
            <Link
              to="/"
              className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                isActive("/") && "text-primary font-extrabold bg-neutral-100"
              }`}
            >
              <div
                className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                  isActive("/") && "w-1.5"
                }`}
              ></div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/explore"
              className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                isActive("/explore") &&
                "text-primary font-extrabold bg-neutral-100"
              }`}
            >
              <div
                className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                  isActive("/explore") && "w-1.5"
                }`}
              ></div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
              </svg>
              Explore
            </Link>
            <Link
              to="/history"
              className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                isActive("/history") &&
                "text-primary font-extrabold bg-neutral-100"
              }`}
            >
              <div
                className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                  isActive("/history") && "w-1.5"
                }`}
              ></div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8l0 4l2 2" />
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
              </svg>
              History
            </Link>
          </ul>
          <div className="flex w-full p-4 mt-auto gap-2">
            <div className="w-12 h-12 rounded-full">
              <img
                className="w-12 h-12 rounded-full"
                src={authStore.user?.photoURL || ""}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col max-w-46">
              <span className="font-medium truncate">
                {authStore.user?.displayName}
              </span>
              <span className="truncate text-neutral-500">
                {authStore.user?.email}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-4 cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed top-0 left-0 z-20 w-screen h-screen bg-opacity-50"
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 100, dur: 300 }}
                exit={{ y: 10, opacity: 0 }}
                className="absolute z-10 p-4 bg-white border rounded-lg shadow-xl border-neutral-100 bottom-16 left-70"
              >
                <div className="flex flex-col items-start justify-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center justify-between w-full gap-2 hover:text-primary transition-colors duration-300 "
                  >
                    View Profile
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                    </svg>
                  </Link>
                  <button
                    onClick={authStore.logout}
                    className="flex items-center justify-between w-full text-red-500 cursor-pointer gap-2"
                  >
                    <span>Logout</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;

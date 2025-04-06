import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthStore from "../hooks/useAuthStore";

const Sidebar = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(true);
  const authStore = useAuthStore();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <div className="fixed flex-col hidden h-screen p-2 md:flex w-80">
      <div className="flex flex-col h-full bg-white shadow-lg rounded-3xl">
        <div className="w-full p-6 font-black text-center">
          <h1 className="signature">DrugXplore</h1>
        </div>

        <div className="flex flex-col items-center h-full gap-4">
          <div className="flex flex-col w-full">
            <Link
              to="/app"
              className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                isActive("/app") && "text-primary font-extrabold bg-neutral-100"
              }`}
            >
              <div
                className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                  isActive("/app") && "w-1.5"
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
            <div className="flex flex-col w-full">
              <button
                onClick={() => setIsGenerateOpen(!isGenerateOpen)}
                className="relative flex p-4 cursor-pointer hover:bg-neutral-100 gap-1 text-neutral-500"
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
                  className={`transform transition-transform duration-300 ${
                    isGenerateOpen && "rotate-360"
                  }`}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                </svg>
                <span>Generate</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`ml-auto transform transition-transform duration-300 ${
                    isGenerateOpen && "rotate-180"
                  }`}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </button>
              <AnimatePresence>
                {isGenerateOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -35 }}
                    animate={{ opacity: 1, height: "auto", dur: 300, y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -35 }}
                    className="relative flex flex-col text-neutral-500"
                  >
                    <Link
                      to="/app/generate/discovery"
                      className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                        isActive("/app/generate/discovery") &&
                        "text-primary font-extrabold bg-neutral-100"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                          isActive("/app/generate/discovery") && "w-1.5"
                        }`}
                      ></div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 2a1 1 0 0 1 0 2v4.826l3.932 10.814l.034 .077a1.7 1.7 0 0 1 -.002 1.193l-.07 .162a1.7 1.7 0 0 1 -1.213 .911l-.181 .017h-11l-.181 -.017a1.7 1.7 0 0 1 -1.285 -2.266l.039 -.09l3.927 -10.804v-4.823a1 1 0 1 1 0 -2h6zm-2 2h-2v4h2v-4z" />
                      </svg>
                      New Discovery
                    </Link>
                    <Link
                      to="/app/generate/ayurveda"
                      className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                        isActive("/app/generate/ayurveda") &&
                        "text-primary font-extrabold bg-neutral-100"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                          isActive("/app/generate/ayurveda") && "w-1.5"
                        }`}
                      ></div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
                      </svg>
                      From Ayurvedic Sources
                    </Link>
                    <Link
                      to="/app/generate/existing"
                      className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                        isActive("/app/generate/existing") &&
                        "text-primary font-extrabold bg-neutral-100"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                          isActive("/app/generate/existing") && "w-1.5"
                        }`}
                      ></div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.207 3.793a5.95 5.95 0 0 1 0 8.414l-8 8a5.95 5.95 0 0 1 -8.414 -8.414l8 -8a5.95 5.95 0 0 1 8.414 0m-7 1.414l-4.294 4.293l5.586 5.586l4.294 -4.292a3.95 3.95 0 1 0 -5.586 -5.586" />
                      </svg>
                      From Existing Medicines
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/app/saved"
              className={`hover:bg-neutral-100 flex gap-1 p-4 relative text-neutral-500 transition-all duration-300 ${
                isActive("/app/saved") &&
                "text-primary font-extrabold bg-neutral-100"
              }`}
            >
              <div
                className={`absolute top-0 right-0 h-full w-0 transition-all duration-300 rounded-r-xl bg-primary rounded-full ${
                  isActive("/app/saved") && "w-1.5"
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
                <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                <path d="M12 12l8 -4.5" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-8 -4.5" />
                <path d="M16 5.25l-8 4.5" />
              </svg>
              Saved
            </Link>
          </div>
          <div className="flex w-full p-4 mt-auto gap-2">
            {authStore.user?.photoURL && (
              <div className="w-12 h-12 rounded-full">
                <img
                  className="w-12 h-12 rounded-full"
                  src={authStore.user?.photoURL}
                  alt="Profile"
                />
              </div>
            )}
            <div className="flex flex-col max-w-46">
              {authStore.user?.displayName && (
                <span className="font-medium truncate">
                  {authStore.user?.displayName}
                </span>
              )}
              <span className="truncate text-neutral-500">
                {authStore.user?.email}
              </span>
            </div>
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
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
          {isOptionsOpen && (
            <div
              onClick={() => setIsOptionsOpen(false)}
              className="fixed top-0 left-0 z-20 w-screen h-screen bg-opacity-50"
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 100, dur: 300 }}
                exit={{ y: 10, opacity: 0 }}
                className="absolute z-10 bg-white rounded-lg shadow-xl bottom-16 left-70"
              >
                <div className="flex flex-col items-start justify-center">
                  <button
                    onClick={authStore.logout}
                    className="flex items-center justify-between w-full p-4 text-red-500 rounded-lg cursor-pointer hover:bg-red-100 min-w-56 transition-colors duration-300 gap-2"
                  >
                    <span>Logout</span>
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

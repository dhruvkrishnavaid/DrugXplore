import { useQueries, useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import getAyurveda from "../functions/getAyurveda";
import getDiscovery from "../functions/getDiscovery";
import getExisting from "../functions/getExisting";
import getGreeting from "../functions/getGreeting";
import app from "../hooks/firebase";
import { AyurvedicRes, DiscoveryRes, ExistingRes } from "../types";

const Dashboard = () => {
  const auth = getAuth(app);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const results = useQueries({
    queries: [
      {
        queryKey: ["saved", "discovery"],
        queryFn: () => getDiscovery(auth),
      },
      {
        queryKey: ["saved", "ayurveda"],
        queryFn: () => getAyurveda(auth),
      },
      {
        queryKey: ["saved", "existing"],
        queryFn: () => getExisting(auth),
      },
    ],
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["greeting"],
    queryFn: getGreeting,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      )}
      {!isLoading && data && (
        <>
          <div className="py-4 text-4xl font-bold">{data.text}</div>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setIsGenerateOpen(!isGenerateOpen)}
              onMouseEnter={() => setIsGenerateOpen(true)}
              onMouseLeave={() => setIsGenerateOpen(false)}
              className="relative flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer group gap-1"
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
                className="transform transition-transform duration-300 group-hover:rotate-360"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
              </svg>
              <span>Generate</span>
              <AnimatePresence>
                {isGenerateOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -35 }}
                    animate={{ opacity: 1, height: "auto", dur: 300, y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -35 }}
                    className="absolute flex flex-col bg-white border rounded-lg shadow-xl top-11/12 lg:left-1/2 w-2xs border-neutral-200"
                  >
                    <Link
                      to="/app/generate/discovery"
                      className="relative flex p-4 rounded-lg gap-1 transition-all duration-300 hover:text-primary hover:font-extrabold hover:bg-neutral-100"
                    >
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
                      className="relative flex p-4 rounded-lg gap-1 transition-all duration-300 hover:text-primary hover:font-extrabold hover:bg-neutral-100"
                    >
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
                      className="relative flex p-4 rounded-lg gap-1 transition-all duration-300 hover:text-primary hover:font-extrabold hover:bg-neutral-100"
                    >
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
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg gap-1 transition-all duration-300 hover:text-primary hover:font-extrabold hover:bg-neutral-50"
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
                <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                <path d="M12 12l8 -4.5" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-8 -4.5" />
                <path d="M16 5.25l-8 4.5" />
              </svg>
              Saved
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full py-4 text-4xl font-bold">
              Pick up where you left
            </div>
            <div className="w-full grid gap-4 sm:grid-cols-2 md:grid-cols-none lg:grid-cols-2 md:w-full sm:lg:w-fit xl:grid-cols-3 2xl:grid-cols-5">
              {results[0].data
                ?.slice(0, 2)
                .map((i: DiscoveryRes, index: number) => (
                  <Link
                    to={`/app/${i.path}`}
                    key={index}
                    className="flex flex-col w-full h-24 p-4 bg-white border rounded-lg shadow-md sm:lg:mx-auto gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 md:w-full sm:lg:w-3xs hover:shadow-lg"
                  >
                    <div className="text-lg font-bold">{i.name}</div>
                    <div className="text-sm truncate text-neutral-700">
                      {i.description}
                    </div>
                  </Link>
                ))}
              {results[1].data
                ?.slice(0, 2)
                .map((i: AyurvedicRes, index: number) => (
                  <Link
                    to={`/app/${i.path}`}
                    key={index}
                    className="flex flex-col w-full h-24 p-4 bg-white border rounded-lg shadow-md sm:lg:mx-auto gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 md:w-full sm:lg:w-3xs hover:shadow-lg"
                  >
                    <div className="text-lg font-bold">{i.name}</div>
                    <div className="text-sm truncate text-neutral-700">
                      {i.description}
                    </div>
                  </Link>
                ))}
              {results[2].data
                ?.slice(0, 2)
                .map((i: ExistingRes, index: number) => (
                  <Link
                    to={`/app/${i.path}`}
                    key={index}
                    className="flex flex-col w-full h-24 p-4 bg-white border rounded-lg shadow-md sm:lg:mx-auto gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 md:w-full sm:lg:w-3xs hover:shadow-lg"
                  >
                    <div className="text-lg font-bold">{i.name}</div>
                    <div className="text-sm truncate text-neutral-700">
                      {i.description}
                    </div>
                  </Link>
                ))}
            </div>
            {results[0].data?.length === 0 &&
              results[1].data?.length === 0 &&
              results[2].data?.length === 0 && (
                <div className="flex items-center justify-center w-full p-4 h-min">
                  Start saving the results to see them here!
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

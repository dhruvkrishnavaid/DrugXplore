import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore/lite";
import Markdown from "markdown-to-jsx";
import { Link, useLocation, useParams } from "react-router";
import { db } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Results = () => {
  const { type, uid, file } = useParams<{
    type: string;
    uid: string;
    file: string;
  }>();

  const location = useLocation();
  const authStore = useAuthStore();
  const user = authStore.user;

  const getResults = async () => {
    if (type && uid && file) {
      const docRef = doc(db, type, uid, "results", file);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [type, uid, "results", file],
    queryFn: getResults,
  });

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
        </div>
      )}
      {!(location.pathname.split("/")[1] === "app") ? (
        <Link
          to={user ? "/app" : "/"}
          state={{ from: location.pathname }}
          className="signature pointer-events-auto! absolute top-4 right-6 z-50"
        >
          DrugXplore
        </Link>
      ) : (
        <>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/${type}/${uid}/results/${file}`,
              );
              alert(
                "URL copied to clipboard! You can now share it with others.",
              );
            }}
            className="fixed z-50 flex p-4 bg-white rounded-full shadow-lg cursor-pointer gap-2 top-4 right-6 text-tertiary transition-colors duration-300 w-fit hover:text-white hover:bg-tertiary group"
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
              <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
              <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            </svg>
            <span className="hidden group-hover:flex w-fit">Copy URL</span>
          </button>
          <button
            onClick={() => window.history.back()}
            className="sticky z-50 flex p-4 bg-white rounded-full shadow-lg cursor-pointer gap-2 top-4 left-6 text-tertiary transition-colors duration-300 w-min  hover:text-white hover:bg-tertiary"
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
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            <span className="hidden lg:flex w-min">Back</span>
          </button>
        </>
      )}
      {isError && <p>Error</p>}
      {data && (
        <>
          <div className="text-4xl font-bold w-fit">{data.name}</div>
          <div className="w-fit">
            <div className="text-xl font-bold">Description:</div>
            {data.description}
          </div>
          <div className="w-fit">
            {type === "discovery" && (
              <div>
                <div className="text-xl font-bold">Target Disease:</div>
                {data.target_disease ? data.target_disease : "None"}
                <div className="text-xl font-bold">Extraction Method:</div>
                {data.desired_extraction_method
                  ? data.desired_extraction_method
                  : "None"}
                <div className="text-xl font-bold">Medicine Name:</div>
                {data.medicine ? data.medicine : "None"}
                <div className="text-xl font-bold">Active Compounds:</div>
                {data.active_compounds.toString().length > 0
                  ? data.active_compounds.join(", ")
                  : "None"}
                <div className="text-xl font-bold">Regions of Interest:</div>
                {data.regions_of_interest.toString().length > 0
                  ? data.regions_of_interest.join(", ")
                  : "None"}
              </div>
            )}
            {type === "ayurveda" && (
              <div>
                <div className="text-xl font-bold">Symptoms:</div>
                {data.symptoms.toString().length > 0
                  ? data.symptoms.join(", ")
                  : "None"}
              </div>
            )}
            {type === "existing" && (
              <div>
                <div className="text-xl font-bold">Symptoms:</div>
                {data.symptoms.toString().length > 0
                  ? data.symptoms.join(", ")
                  : "None"}

                <div className="text-xl font-bold">Medicines:</div>
                {data.medicines.toString().length > 0
                  ? data.medicines.join(", ")
                  : "None"}
              </div>
            )}
          </div>
          <div className="w-full">
            <Markdown>{data.result.text}</Markdown>
          </div>
        </>
      )}
      {!(location.pathname.split("/")[1] === "app") && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <Link
            to={user ? `/app/${type}/${uid}/results/${file}` : "/login"}
            state={{ from: location.pathname }}
            className="flex px-4 py-2 font-bold text-white rounded cursor-pointer gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
          >
            View in dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Results;

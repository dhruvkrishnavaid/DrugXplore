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
          <div className="w-10 h-10 border-4 border-tertiary rounded-full animate-spin border-t-transparent"></div>
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
        <button
          onClick={() => window.history.back()}
          className="sticky flex gap-2 top-4 left-6 z-50 p-4 bg-white text-tertiary transition-colors duration-300 cursor-pointer w-min shadow-lg  hover:text-white hover:bg-tertiary rounded-full"
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
      )}
      {isError && <p>Error</p>}
      {data && (
        <>
          <div className="w-fit text-4xl font-bold">{data.name}</div>
          <div className="w-fit">
            <div className="font-bold text-xl">Description:</div>
            {data.description}
          </div>
          <div className="w-fit">
            {type === "discovery" && (
              <div>
                <div className="font-bold text-xl">Target Disease:</div>
                {data.target_disease ? data.target_disease : "None"}
                <div className="font-bold text-xl">Extraction Method:</div>
                {data.desired_extraction_method
                  ? data.desired_extraction_method
                  : "None"}
                <div className="font-bold text-xl">Medicine Name:</div>
                {data.medicine ? data.medicine : "None"}
                <div className="font-bold text-xl">Active Compounds:</div>
                {data.active_compounds.toString().length > 0
                  ? data.active_compounds.join(", ")
                  : "None"}
                <div className="font-bold text-xl">Regions of Interest:</div>
                {data.regions_of_interest.toString().length > 0
                  ? data.regions_of_interest.join(", ")
                  : "None"}
              </div>
            )}
            {type === "ayurveda" && (
              <div>
                <div className="font-bold text-xl">Symptoms:</div>
                {data.symptoms.toString().length > 0
                  ? data.symptoms.join(", ")
                  : "None"}
              </div>
            )}
            {type === "existing" && (
              <div>
                <div className="font-bold text-xl">Symptoms:</div>
                {data.symptoms.toString().length > 0
                  ? data.symptoms.join(", ")
                  : "None"}

                <div className="font-bold text-xl">Medicines:</div>
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

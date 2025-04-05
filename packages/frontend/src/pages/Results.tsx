import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore/lite";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router";
import { db } from "../hooks/firebase";

const Results = () => {
  const { type, uid, file } = useParams<{
    type: string;
    uid: string;
    file: string;
  }>();

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

  console.log(type);
  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="w-10 h-10 border-4 border-tertiary rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
      {isError && <p>Error</p>}
      {data && (
        <>
          <div className="w-full text-4xl font-bold">{data.name}</div>
          <div className="w-full">
            <div className="font-bold text-xl">Description:</div>
            {data.description}
          </div>
          <div className="w-full">
            {type === "discovery" && (
              <div>
                <div className="font-bold text-xl">Target Disease:</div>
                {data.target_disease ? data.target_disease : "None"}
                <div className="font-bold text-xl">Extraction Method:</div>
                {data.desired_extraction_method
                  ? data.desired_extraction_method
                  : "None"}
                <div className="font-bold text-xl">Medicine Name:</div>
                {data.medicine
                  ? data.medicine
                  : "None"}
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
    </div>
  );
};

export default Results;

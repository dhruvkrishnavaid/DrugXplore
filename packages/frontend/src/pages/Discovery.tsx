import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";
import Markdown from "markdown-to-jsx";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import AddInput from "../components/AddInput";
import Popup from "../components/Popup";
import app, { db } from "../hooks/firebase";

const Discovery = () => {
  const [medicine_name, setMedicineName] = useState("");
  const [active_compounds, setActiveCompounds] = useState<string[]>([""]);
  const [target_disease, setTargetDisease] = useState("");
  const [desired_extraction_method, setDesiredExtractionMethod] = useState("");
  const [regions_of_interest, setRegionsOfInterest] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string } | null>(null);
  const [regionsCount, setRegionsCount] = useState(1);
  const [activeCount, setActiveCount] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const uid = getAuth(app).currentUser?.uid;

  // todo: sanitize user input
  const getResults = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/discovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target_disease,
          desired_extraction_method,
          medicine_name,
          active_compounds,
          regions_of_interest,
        }),
      });
      setLoading(false);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const saveResults = async () => {
    if (name && description) {
      if (uid) {
        try {
          await addDoc(collection(db, "discovery", uid, "results"), {
            name,
            description,
            target_disease,
            desired_extraction_method,
            medicine_name,
            active_compounds,
            regions_of_interest,
            result,
          });
          setShowPopup(false);
          alert("Results saved successfully!");
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      alert("Please enter a name and description to save the results");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-6 gap-6">
      <h1 className="text-4xl font-bold text-center">New Discovery</h1>
      <p className="text-center">
        Discover new medicines based upon target disease and extraction methods.
        Customize using regions of interest, active compounds, or pre-existing
        drug names.
      </p>
      <div className="w-full">
        <form className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold">
              Target Disease<span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="target disease"
              id="target disease"
              required={true}
              placeholder="Target Disease"
              value={target_disease}
              onChange={(e) => setTargetDisease(e.target.value)}
              className="w-full p-2 bg-white border rounded-lg outline-none md:max-w-lg border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold">
              Desired Extraction Method<span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="desired extraction method"
              id="desired extraction method"
              required={true}
              placeholder="Desired Extraction Method"
              value={desired_extraction_method}
              onChange={(e) => setDesiredExtractionMethod(e.target.value)}
              className="w-full p-2 bg-white border rounded-lg outline-none md:max-w-lg border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold">Medicine Name</span>
            <input
              type="text"
              name="medicine name"
              id="medicine name"
              placeholder="Medicine Name"
              value={medicine_name}
              onChange={(e) => setMedicineName(e.target.value)}
              className="w-full p-2 bg-white border rounded-lg outline-none md:max-w-lg border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <AddInput
            title="Active Compounds"
            placeholder="Active Compound"
            count={activeCount}
            inputs={active_compounds}
            setCount={setActiveCount}
            setInputs={setActiveCompounds}
            buttonText="Add Active Compound"
          />
          <AddInput
            title="Regions of Interest"
            placeholder="Region of Interest"
            count={regionsCount}
            inputs={regions_of_interest}
            setCount={setRegionsCount}
            setInputs={setRegionsOfInterest}
            buttonText="Add Region of Interest"
          />
          <div className="flex justify-evenly gap-4">
            <button
              type="button"
              disabled={
                loading ||
                !target_disease.length ||
                !desired_extraction_method.length
              }
              onClick={getResults}
              className="flex px-4 py-2 font-bold text-white rounded cursor-pointer gap-2 bg-secondary hover:bg-primary transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-secondary/80"
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
                <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                <path d="M15 6l3 3" />
                <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
              </svg>
              Get Results
            </button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center w-full text-center h-min gap-2">
          <span className="flex gap-5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="flex items-center">Loading...</span>
          </span>
        </div>
      )}
      {result && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h2 className="text-2xl font-bold">Results</h2>
          <Markdown>{result.text}</Markdown>
          {!loading && (
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="flex px-4 py-2 font-bold text-white rounded cursor-pointer gap-2 bg-secondary w-fit hover:bg-primary transition-colors duration-300"
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
                <path d="M5 12l5 5l10 -10" />
              </svg>
              Save Results
            </button>
          )}
          <AnimatePresence>
            {showPopup && (
              <Popup
                title="Save Results"
                onClose={() => {
                  setShowPopup(false);
                }}
                hasButtons
                primaryAction={{
                  label: "Save",
                  onClick: saveResults,
                }}
                secondaryAction={{
                  label: "Cancel",
                  onClick: () => {
                    setName("");
                    setDescription("");
                    setShowPopup(false);
                  },
                }}
              >
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 bg-white border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 bg-white border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
                  />
                </div>
              </Popup>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Discovery;

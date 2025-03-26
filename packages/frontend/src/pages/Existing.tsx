import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";
import Markdown from "markdown-to-jsx";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Popup from "../components/Popup";
import app, { db } from "../hooks/firebase";

const Existing = () => {
  const uid = getAuth(app).currentUser?.uid;
  const [symptomsCount, setSymptomsCount] = useState(1);
  const [medicinesCount, setMedicinesCount] = useState(1);
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [medicines, setMedicines] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string } | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // todo: sanitize user input
  const getResults = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/existing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms, medicines }),
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
          await addDoc(collection(db, "existing", uid, "results"), {
            name,
            description,
            symptoms,
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
      <h1 className="text-4xl font-bold text-center">
        From Existing Medicines
      </h1>
      <p className="text-center">
        Existing medicines are drugs that have been approved by regulatory
        authorities for the treatment of specific diseases or conditions.
        Existing medicines are also known as approved drugs, licensed drugs, or
        prescription drugs.
      </p>
      <div className="w-full">
        <form className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-bold">Symptoms</span>
            <button
              type="button"
              onClick={() => setSymptomsCount(symptomsCount + 1)}
              className="items-center hidden px-4 py-2 font-bold text-white rounded cursor-pointer lg:flex gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
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
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Add Symptom
            </button>
          </div>
          {[...Array(symptomsCount)].map((_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <input
                type="text"
                placeholder={`Symptom ${i + 1}`}
                value={symptoms[i]}
                onChange={(e) => {
                  const newSymptoms = [...symptoms];
                  newSymptoms[i] = e.target.value;
                  setSymptoms(newSymptoms);
                }}
                className="w-full max-w-lg p-2 bg-white border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
              />
              {symptomsCount > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newSymptoms = [...symptoms];
                    newSymptoms.splice(i, 1);
                    setSymptoms(newSymptoms);
                    setSymptomsCount(symptomsCount - 1);
                  }}
                  className="flex items-center justify-center p-2 text-red-500 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
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
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-evenly gap-4">
            <button
              type="button"
              onClick={() => setSymptomsCount(symptomsCount + 1)}
              className="flex px-4 py-2 font-bold text-white rounded cursor-pointer lg:hidden gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
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
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Add Symptom
            </button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-bold">Medicines</span>
            <button
              type="button"
              onClick={() => setMedicinesCount(medicinesCount + 1)}
              className="items-center hidden px-4 py-2 font-bold text-white rounded cursor-pointer lg:flex gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
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
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Add Medicine
            </button>
          </div>
          {[...Array(medicinesCount)].map((_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <input
                type="text"
                placeholder={`Medicine ${i + 1}`}
                value={medicines[i]}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[i] = e.target.value;
                  setMedicines(newMedicines);
                }}
                className="w-full max-w-lg p-2 bg-white border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
              />
              {medicinesCount > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newMedicines = [...medicines];
                    newMedicines.splice(i, 1);
                    setSymptoms(newMedicines);
                    setMedicinesCount(medicinesCount - 1);
                  }}
                  className="flex items-center justify-center p-2 text-red-500 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
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
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-evenly gap-4">
            <button
              type="button"
              onClick={() => setMedicinesCount(medicinesCount + 1)}
              className="flex px-4 py-2 font-bold text-white rounded cursor-pointer gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
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
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Add Medicine
            </button>
          </div>
          <div className="flex justify-evenly gap-4">
            <button
              type="button"
              disabled={
                loading ||
                (!symptoms.toString().length && !medicines.toString().length)
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

export default Existing;

import { useQueries } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { Link } from "react-router";
import app, { db } from "../hooks/firebase";
import { AyurvedicRes, DiscoveryRes, ExistingRes } from "../types";

const Saved = () => {
  const auth = getAuth(app);
  const getAyurveda = async () => {
    const collectionRef = collection(
      db,
      "ayurveda",
      auth.currentUser!.uid,
      "results",
    );
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data: DocumentData = [];
    querySnapshot.forEach((doc) =>
      data.push({ ...doc.data(), path: doc.ref.path }),
    );
    return data;
  };
  const getDiscovery = async () => {
    const collectionRef = collection(
      db,
      "discovery",
      auth.currentUser!.uid,
      "results",
    );
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data: DocumentData = [];
    querySnapshot.forEach((doc) =>
      data.push({ ...doc.data(), path: doc.ref.path }),
    );
    return data;
  };
  const getExisting = async () => {
    const collectionRef = collection(
      db,
      "existing",
      auth.currentUser!.uid,
      "results",
    );
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data: DocumentData = [];
    querySnapshot.forEach((doc) =>
      data.push({ ...doc.data(), path: doc.ref.path }),
    );
    return data;
  };
  const results = useQueries({
    queries: [
      {
        queryKey: ["saved", "discovery"],
        queryFn: getDiscovery,
      },
      {
        queryKey: ["saved", "ayurveda"],
        queryFn: getAyurveda,
      },
      {
        queryKey: ["saved", "existing"],
        queryFn: getExisting,
      },
    ],
  });

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      {(results[0].isLoading ||
        results[1].isLoading ||
        results[2].isLoading) && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
        </div>
      )}
      {results[0].data?.length ||
      results[1].data?.length ||
      results[2].data?.length ? (
        <>
          <div className="w-full text-4xl font-bold">New Discovery</div>
          {results[0].isLoading && (
            <div className="flex items-center justify-center w-full p-4 h-min">
              <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
            </div>
          )}
          {results[0].data?.length ? (
            <div className="items-center justify-center grid gap-4 sm:grid-cols-2 md:grid-cols-none lg:grid-cols-2 w-fit xl:grid-cols-3 2xl:grid-cols-5">
              {results[0].data?.map((i: DiscoveryRes, index: number) => (
                <Link
                  to={`/app/${i.path}`}
                  key={index}
                  className="flex flex-col h-24 p-4 mx-auto bg-white border rounded-lg shadow-md gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 w-3xs hover:shadow-lg"
                >
                  <div className="text-lg font-bold">{i.name}</div>
                  <div className="text-sm truncate text-neutral-700">
                    {i.description}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 h-min">
              Start saving the results to see them here!
            </div>
          )}
          <hr className="my-4" />
          <div className="w-full text-4xl font-bold">
            From Ayurvedic Sources
          </div>
          {results[1].isLoading && (
            <div className="flex items-center justify-center w-full p-4 h-min">
              <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
            </div>
          )}
          {results[1].data?.length ? (
            <div className="items-center justify-center grid gap-4 sm:grid-cols-2 md:grid-cols-none lg:grid-cols-2 w-fit xl:grid-cols-3 2xl:grid-cols-5">
              {results[1].data?.map((i: AyurvedicRes, index: number) => (
                <Link
                  to={`/app/${i.path}`}
                  key={index}
                  className="flex flex-col h-24 p-4 mx-auto bg-white border rounded-lg shadow-md gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 w-3xs hover:shadow-lg"
                >
                  <div className="text-lg font-bold">{i.name}</div>
                  <div className="text-sm truncate text-neutral-700">
                    {i.description}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 h-min">
              Start saving the results to see them here!
            </div>
          )}
          <hr className="my-4" />
          <div className="w-full text-4xl font-bold">
            From Existing Medicines
          </div>
          {results[2].isLoading && (
            <div className="flex items-center justify-center w-full p-4 h-min">
              <div className="w-10 h-10 border-4 rounded-full border-tertiary animate-spin border-t-transparent"></div>
            </div>
          )}
          {results[2].data?.length ? (
            <div className="items-center justify-center grid gap-4 sm:grid-cols-2 md:grid-cols-none lg:grid-cols-2 w-fit xl:grid-cols-3 2xl:grid-cols-5">
              {results[2].data?.map((i: ExistingRes, index: number) => (
                <Link
                  to={`/app/${i.path}`}
                  key={index}
                  className="flex flex-col h-24 p-4 mx-auto bg-white border rounded-lg shadow-md gap-2 border-tertiary hover:bg-tertiary/50 transition-all duration-300 w-3xs hover:shadow-lg"
                >
                  <div className="text-lg font-bold">{i.name}</div>
                  <div className="text-sm truncate text-neutral-700">
                    {i.description}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 h-min">
              Start saving the results to see them here!
            </div>
          )}
        </>
      ) : (
        !(
          results[0].isLoading ||
          results[1].isLoading ||
          results[2].isLoading
        ) && (
          <div className="flex flex-col items-center justify-center w-full p-4 gap-4 h-min">
            <img src="/52220.png" alt="No Results" className="w-full" />
            <div className="text-4xl font-bold">No Results Saved Yet</div>
            Start saving your results to see them here!
          </div>
        )
      )}
    </div>
  );
};

export default Saved;

import { useQueries } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  query,
} from "firebase/firestore/lite";
import app, { db } from "../hooks/firebase";

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
    querySnapshot.forEach((doc) => data.push(doc.data()));
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
    querySnapshot.forEach((doc) => data.push(doc.data()));
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
    querySnapshot.forEach((doc) => data.push(doc.data()));
    return data;
  };
  const results = useQueries({
    queries: [
      { queryKey: ["saved", "ayurveda"], queryFn: getAyurveda },
      { queryKey: ["saved", "discovery"], queryFn: getDiscovery },
      { queryKey: ["saved", "existing"], queryFn: getExisting },
    ],
  });
  // TODO: Create different return types for every query
  return (
    <div>
      {results[2].data?.map(
        (i: { name: string; description: string }, index: number) => (
          <>
            <div key={index}>{i.name}</div>
            <div>{i.description}</div>
            <hr className="my-4" />
          </>
        ),
      )}
    </div>
  );
};

export default Saved;

import { Auth } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { db } from "../hooks/firebase";

const getDiscovery = async (auth: Auth) => {
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

export default getDiscovery;

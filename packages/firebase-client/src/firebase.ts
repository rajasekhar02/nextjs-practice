import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

const servicesAvailable = {
  storage,
  db,
};

export default servicesAvailable;

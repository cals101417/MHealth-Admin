import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_MESSAGING_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESSAGING_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;

/*
REACT_APP_FIREBASE_API_KEY="AIzaSyDhvzrnVIVO7Cw76EnAuboMytMsmxxp8tc"
REACT_APP_FIREBASE_AUTH_DOMAIN="m-health-v2.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="m-health-v2"
REACT_APP_FIREBASE_STORAGE_BUCKET="m-health-v2.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=735249998972
REACT_APP_FIREBASE_MESSAGING_APP_ID="1:735249998972:web:3aca95344aaf800f0195f9"
*/

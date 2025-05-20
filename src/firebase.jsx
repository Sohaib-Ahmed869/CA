// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyDCfrf4npemD5T0ZzPcfRv3Kiq--Vs3m1A",
//   authDomain: "certifiedaustralia1.firebaseapp.com",
//   projectId: "certifiedaustralia1",
//   storageBucket: "certifiedaustralia1.appspot.com",
//   messagingSenderId: "803606042865",
//   appId: "1:803606042865:web:e80a85af2ec46a9aa43150",
//   measurementId: "G-ESBEFL4ZJ9"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAlDj_YjopzasGvveP1VNxJsMOk-fBICO8",
  authDomain: "testca-e3e5e.firebaseapp.com",
  projectId: "testca-e3e5e",
  storageBucket: "testca-e3e5e.firebasestorage.app",
  messagingSenderId: "92801329690",
  appId: "1:92801329690:web:6daa5db44133212b3bffa3",
  measurementId: "G-V2Z5CZHSPQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();

export default app;

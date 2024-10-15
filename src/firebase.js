// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByzUmNr2OliVkqqhLCbSXtP5SpWRTTALw",
  authDomain: "yumfoods-b52da.firebaseapp.com",
  projectId: "yumfoods-b52da",
  storageBucket: "yumfoods-b52da.appspot.com",
  messagingSenderId: "706334459549",
  appId: "1:706334459549:web:8bc682c3ca79af865df674",
  measurementId: "G-ZMD2XNTVXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app
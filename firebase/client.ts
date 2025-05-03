// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyArwvauAJAjEr8sQrNjksjiyjzBRxff-Wg',
  authDomain: 'interview-prep-7aa5d.firebaseapp.com',
  projectId: 'interview-prep-7aa5d',
  storageBucket: 'interview-prep-7aa5d.firebasestorage.app',
  messagingSenderId: '258569115463',
  appId: '1:258569115463:web:2821cb58aae5fdf22f9e62',
  measurementId: 'G-9QCRHQQG61',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

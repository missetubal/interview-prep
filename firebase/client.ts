import { getAnalytics } from 'firebase/analytics';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase/firestore';
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
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

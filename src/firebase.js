import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase_config';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
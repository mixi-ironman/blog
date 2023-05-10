import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyCBhgD_D9aX5WhzSo5Sx08QUjJfk0kdofo',
    authDomain: 'monkey-blog-6a178.firebaseapp.com',
    projectId: 'monkey-blog-6a178',
    storageBucket: 'monkey-blog-6a178.appspot.com',
    messagingSenderId: '893443985813',
    appId: '1:893443985813:web:2af6a6133ba26f7683269c',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

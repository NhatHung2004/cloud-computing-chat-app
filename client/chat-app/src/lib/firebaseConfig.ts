// utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBazcgd4nm1bovAiyHunJrlWMEbtE7r1Aw",
    authDomain: "chat-web-app-2df73.firebaseapp.com",
    projectId: "chat-web-app-2df73",
    storageBucket: "chat-web-app-2df73.firebasestorage.app",
    messagingSenderId: "563937479660",
    appId: "1:563937479660:web:ea3a7d0eba66f690248ec9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBowCm4VFpQ5AkuiMGco5OexDDRF-vRcls",
  authDomain: "authonecart-33b56.firebaseapp.com",
  projectId: "authonecart-33b56",
  storageBucket: "authonecart-33b56.firebasestorage.app",
  messagingSenderId: "252790946757",
  appId: "1:252790946757:web:e7d19e0a09b04f0651a9ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});


export { auth, provider };